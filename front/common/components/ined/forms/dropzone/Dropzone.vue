<template>
    <div>
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
        :options="dropzone" 
        :include-styling="false">
            <div slot="inside">
                <div class="columns is-pulled-right" v-if="!readonly">
                    <div class="column">
                        <div class="dz-message">
                            <a href='javascript:undefined'>{{lang('dropzone_click_here_to_upload')}}</a> 
                        </div>
                    </div>
                </div>
                <div v-else class="dz-message" style="display:none">
                </div>
                <div class="is-clearfix">
                    <div v-for="(filename, i) in state.files.order">
                        <finput 
                            :readonly="readonly" 
                            :name="`${files}.${i}.${name}`" 
                            :label="lang('b_file_deposit_name')" 
                            type="text" 
                            :placeholder="lang('dropzone_file_deposit_name')" 
                            :form="form"
                            :help="`${lang('b_file_original_name')} ${state.files.content[filename].name} (${parseFloat(state.files.content[filename].size / 1024).toFixed(2)} KB)`"
                            :has-addons="true"
                        >
                            <template slot="input-addons">       
                                <p class="control" v-if="$store.state.global_config.upload.allowRemoveFiles && !readonly">
                                    <a class="button is-danger" 
                                        @click="removeFile(filename, $event)"
                                        >
                                        <span class="icon">
                                            <i class="fa fa-trash"></i>
                                        </span>
                                    </a>
                                </p>
                                <p class="control">
                                    <a class="button is-info" @click.prevent="analyze(state.files.content[filename].pathOnServer)">
                                        <span class="icon">
                                            <i class="fa fa-gear"></i>
                                        </span>
                                    </a>
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
                        :readonly="readonly"
                        :name="`${files}.${i}.${master}`" 
                        :label="lang('b_file_master')" 
                        type="checkbox" :form="form" />

                        <div v-if="state.files.content[filename].upload.progress < 100 && state.files.content[filename].status !== 'error'">
                            <span>{{lang('b_file_status')}} </span><progress class="progress is-link" :value="state.files.content[filename].upload.progress" max="100">{{state.files.content[filename].upload.progress}}%</progress>
                        </div>
                        <div v-else>
                            <span>{{lang('b_file_status')}} </span><span v-html="lang('dropzone_status_'+state.files.content[filename].status)"></span><br /><span v-if="state.files.content[filename].errorMessage">({{state.files.content[filename].errorMessage}})</span> 
                        </div>
                
                        <hr />
                    </div>
                </div>
            </div>
        </vue-dropzone>
    </div>
</template>

<script>
    module.exports = require('./Dropzone');
</script>
