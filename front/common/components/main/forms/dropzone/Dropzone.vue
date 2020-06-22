<template>
    <vue-dropzone
    v-on:vdropzone-file-added="dropzone_added"
    v-on:vdropzone-complete="dropzone_complete"
    v-on:vdropzone-error="dropzone_error"
    v-on:vdropzone-success="dropzone_success"
    v-on:vdropzone-upload-progress="dropzone_progress"
    v-on:vdropzone-removed-file="dropzone_remove"
    class="pos-dropzone"
    id="dropzone"
    ref="dropzone"
    :options="dropzoneData"
    :include-styling="false">
        <div slot="inside">
            <slot :files="state.files">
                <div class="columns" v-if="!readonly">
                    <div class="column">
                        <div class="level">
                            <div class="level-left">
                            </div>
                            <div class="level-right">
                                <div class="dz-message">
                                    <a href='javascript:undefined'>{{lang('dropzone_click_here_to_upload')}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="dz-message" style="display:none">
                </div>
                <div class="is-clearfix" v-if="!readonly">
                    <div v-for="(filename, i) in state.files.order">
                        <finput
                            :name="`${files}.${i}.${name}`"
                            label="" type="hidden"
                            :form="form"
                            :hidden-value="state.files.content[filename].name || ''"
                        />
                        <finput
                            :readonly="readonly"
                            :name="`${files}.${i}.${name}`"
                            :label="lang('b_file_deposit_name')"
                            type="text"
                            :placeholder="lang('dropzone_file_deposit_name')"
                            :form="form"
                            :help="filename_help(filename)"
                            :default="state.files.content[filename].name"
                            :has-addons="true"
                        >
                            <template slot="input-addons">
                                <p class="control" v-if="$store.state.global_config.upload.allowRemoveFiles && !readonly">
                                    <b-tooltip class="is-dark" :label="lang('l_dropzone_remove_file_help')" multilined>
                                        <a class="button is-danger"
                                            @click="removeFile(filename, $event)"
                                        >
                                            <span class="icon">
                                                <i class="fa fa-trash"></i>
                                            </span>
                                        </a>
                                    </b-tooltip>
                                </p>
                                <p class="control">
                                    <b-tooltip class="is-dark" :label="lang('l_dropzone_analyze_file_help')" multilined>
                                        <a class="button is-info" @click.prevent="analyze(state.files.content[filename].pathOnServer)">
                                            <span class="icon">
                                                <i class="fa fa-gear"></i>
                                            </span>
                                        </a>
                                    </b-tooltip>
                                </p>
                            </template>
                        </finput>
                        <finput
                            :name="`${files}.${i}.${url}`"
                            label="" type="hidden"
                            :form="form"
                            :hidden-value="state.files.content[filename].pathOnServer || ''"
                            />
                        <finput
                            :name="`${files}.${i}.preview_url`"
                            label="" type="hidden"
                            :form="form"
                            :hidden-value="state.files.content[filename].previewUrl || ''"
                            />
                        <div v-if="state.files.content[filename].upload.progress < 100 && state.files.content[filename].status !== 'error'">
                            <span>{{lang('b_file_status')}} </span><progress class="progress is-link" :value="state.files.content[filename].upload.progress" max="100">{{state.files.content[filename].upload.progress}}%</progress>
                        </div>
                        <div v-else>
                            <span>{{lang('b_file_status')}} </span><span v-html="lang('dropzone_status_'+state.files.content[filename].status)"></span><br /><span v-if="state.files.content[filename].errorMessage">({{state.files.content[filename].errorMessage}})</span>
                        </div>
                        <finput
                        :readonly="readonly"
                        :name="`${files}.${i}.${master}`"
                        :label="lang('b_file_master')"
                        :help="lang('l_master_file_help')"
                        @value-change="(v) => update_master_files(i, v)"
                        v-if="i in state.master_files || Object.keys(state.master_files).length === 0"
                        type="checkbox" :form="form" />
                        <finput
                        :readonly="readonly"
                        :name="`${files}.${i}.not_${master}`"
                        :label="lang('b_file_not_master')"
                        v-if="!(i in state.master_files)"
                        :help="lang('l_not_master_file_help')"
                        type="checkbox" :form="form" />
                        <finput
                            :name="`${files}.${i}.size`"
                            label=""
                            type="hidden"
                            :form="form"
                            :hidden-value="parseFloat(state.files.content[filename].size / 1024).toFixed(2)"
                        />
                        <div
                            v-if="state.files.content[filename].previewUrl"
                            class="columns is-centered">
                            <div class="column is-6">
                                <img v-if="state.files.content[filename].previewUrl"
                                     :src='`/download/${state.files.content[filename].previewUrl}`'
                                     alt='Thumbnail' class="pos-thumbnail-preview"
                                />
                            </div>
                        </div>
                        <div
                            v-if="state.files.content[filename].tree">
                            <ul>
                                <div>{{lang('b_files')}}</div>
                                <div v-for="file in state.files.content[filename].tree">
                                    <li>{{file.entryName}}</li>
                                </div>
                            </ul>
                        </div>
                        <hr />
                    </div>
                </div>
                <div v-else>
                    <table class="table is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>{{lang('l_original_filename')}}</th>
                                <th>{{lang('l_filename')}}</th>
                                <th>{{lang('l_principal_file')}}</th>
                                <th>{{lang('l_filesize')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(filename, i) in state.files.order">
                                <td>{{state.files.content[filename].name}}</td>
                                <td>
                                    <finput
                                        :readonly="readonly"
                                        :name="`${files}.${i}.${name}`"
                                        label=""
                                        type="text"
                                        placeholder=""
                                        :form="form"
                                    />
                                </td>
                                <td>
                                    <finput
                                    :readonly="readonly"
                                    :name="`${files}.${i}.${master}`"
                                    label=""
                                    type="checkbox" :form="form" />
                                    <finput
                                        :readonly="readonly"
                                        :name="`${files}.${i}.size`"
                                        label=""
                                        type="hidden"
                                        :form="form"
                                        :hidden-value="parseFloat(state.files.content[filename].size / 1024).toFixed(2)"
                                    />
                                    <finput
                                        :readonly="readonly"
                                        :name="`${files}.${i}.${url}`"
                                        label="" type="hidden"
                                        :form="form"
                                        :hidden-value="state.files.content[filename].pathOnServer || ''"
                                        />
                                    <finput
                                        :readonly="readonly"
                                        :name="`${files}.${i}.preview_url`"
                                        label="" type="hidden"
                                        :form="form"
                                        :hidden-value="state.files.content[filename].previewUrl || ''"
                                        />
                                </td>
                                <td>{{parseFloat(state.files.content[filename].size / 1024).toFixed(2)}} KB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </slot>
        </div>
    </vue-dropzone>
</template>

<script>
    module.exports = require('./Dropzone');
</script>
