<template>
    <div>
        <vue-dropzone 
        v-on:vdropzone-file-added="dropzone_added"
        v-on:vdropzone-complete="dropzone_complete"
        v-on:vdropzone-error="dropzone_error"
        v-on:vdropzone-success="dropzone_success"
        v-on:vdropzone-upload-progress="dropzone_progress"
        v-on:vdropzone-removed-file="dropzone_remove"
        class="dropzone pos-dropzone" 
        id="dropzone" 
        ref="dropzone" 
        :options="dropzone" 
        :include-styling="false">
            <div slot="inside">
                <div class="columns is-pulled-right">
                    <div class="column">
                        <div class="dz-message">
                            <a href='javascript:undefined'>{{lang('dropzone_click_here_to_upload')}}</a> 
                        </div>
                    </div>
                </div>
                <div class="responsive-table">
                    <table v-if="state.files.order.length > 0" class="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th>{{lang('b_file_original_name')}}</th>
                                <th>{{lang('b_file_deposit_name')}}</th>
                                <th>{{lang('b_file_status')}}</th>
                                <th>{{lang('b_file_size')}}</th>
                                <th>{{lang('b_file_master')}}</th>
                                <th v-if="$store.state.global_config.upload.allowRemoveFiles"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(filename, i) in state.files.order">
                                <td>{{state.files.content[filename].name}}</td>
                                <td>
                                    <finput :name="`${files}.${i}.${name}`" label="" type="text" :placeholder="lang('dropzone_file_deposit_name')" :form="form" />
                                    <finput 
                                        :name="`${files}.${i}.${url}`" 
                                        label="" type="hidden" 
                                        :form="form" 
                                        :hidden-value="state.files.content[filename].pathOnServer || ''" 
                                    />
                                </td>
                                <td v-if="state.files.content[filename].upload.progress < 100 && state.files.content[filename].status !== 'error'">
                                    <progress class="progress is-link" :value="state.files.content[filename].upload.progress" max="100">{{state.files.content[filename].upload.progress}}%</progress>
                                <td v-else>
                                    <span v-html="lang('dropzone_status_'+state.files.content[filename].status)"></span><br /><span v-if="state.files.content[filename].errorMessage">({{state.files.content[filename].errorMessage}})</span> 
                                </td>
                                <td>
                                    {{parseFloat(state.files.content[filename].size / 1024).toFixed(2)}} KB
                                </td>
                                <td>
                                    <finput
                                    :name="`${files}.${i}.${master}`" label="" type="checkbox" :form="form" />
                                </td>
                                <td v-if="$store.state.global_config.upload.allowRemoveFiles">
                                    <a class="has-text-danger" @click="removeFile(filename, $event)">
                                        <span class="icon"><i class="fa fa-trash"></i></span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </vue-dropzone>
    </div>
</template>

<script>
    module.exports = require('./Dropzone');
</script>
