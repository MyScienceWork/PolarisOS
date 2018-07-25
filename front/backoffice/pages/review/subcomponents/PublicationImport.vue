<template>
    <div>
        <div class="columns">
            <div class="column">
                <fselect
                    :form="this.state.sinks.creations.import"
                    name="filetype"
                    :label="lang('l_filetype_bimport')"
                    :placeholder="lang('l_filetype_bimport')"
                    :options="filetype_content"
                    :translatable="true"
                    :select-first-value="true"
                />
                <fdropzone 
                    :form="this.state.sinks.creations.import"
                    files="files"
                    name="filepath"
                    master="is_master"
                    url="url"
                    :restore_files="false"
                    :keep_files="false"
                    class="has-no-padding"
                >
                    <div slot-scope="props">
                        <div class="dz-message" v-if="props.files.order.length === 0">
                            <a class="has-text-info" href='javascript:undefined'>{{lang('dropzone_click_here_to_upload')}}</a> 
                        </div>
                        <div v-else v-for="(filename, i) in props.files.order">
                            <finput 
                                :readonly="true" 
                                name="filename" 
                                :label="lang('b_file_deposit_name')" 
                                type="text" 
                                :placeholder="lang('dropzone_file_deposit_name')" 
                                :form="state.sinks.creations.import"
                                :default="props.files.content[filename].name"
                            />
                            <finput 
                                name="url" 
                                label="" type="hidden" 
                                :form="state.sinks.creations.import" 
                                :hidden-value="props.files.content[filename].pathOnServer || ''" 
                            />
                        </div>
                    </div>
                </fdropzone>
                <button 
                    type="submit" @click.prevent="import_publications"
                    class="button is-info"
                    >{{lang('l_upload_bimport')}}</button>
                <!--<div v-else>
                    <article class="message is-info"><div class="message-body">{{lang('l_import_in_progress')}}</div></article>
                </div>-->
                <div v-if="state.error">
                    <article class="message is-danger"><div class="message-body">{{lang(state.error)}}</div></article>
                </div>
            </div>
        </div>
        <div class="columns" v-if="Object.keys(results).length > 0">
            <div class="column">
                <template v-if="results.total">
                    <article class="message is-success" v-if="results.total === results.success">
                        <div class="message-body">{{lang('l_import_success')}} {{results.total}}</div>
                    </article>
                    <article class="message is-danger" v-else-if="results.total === results.errors_count">
                        <div class="message-body">{{lang('l_import_failed')}} {{results.total}}</div>
                    </article>
                    <article class="message is-warning" v-else>
                        <div class="message-body">{{lang('l_import_partial_failed')}} {{results.success}} / {{results.total}}</div>
                    </article>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./PublicationImport');
</script>
