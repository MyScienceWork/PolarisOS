<template>
    <div>
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
            v-if="!state.in_progress"
            >{{lang('l_download_bexport')}}</button>
        <div v-else>
            <article class="message is-info"><div class="message-body">{{lang('l_import_in_progress')}}</div></article>
        </div>
    </div>
</template>

<script>
    module.exports = require('./PublicationImport');
</script>
