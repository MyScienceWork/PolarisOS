<template>
    <div>
        <div class="columns">
            <div class="column">
                <widget >
                    <span slot="title">{{lang('l_setup_import')}}</span>
                    <div slot="body">
                        <template  v-if="!state.in_progress && !state.succeeded">
                            <article class="message is-info has-small-bottom-margin">
                                <div class="content message-body" v-html="lang('l_how_to_import_help')"></div>
                            </article>
                            <finput
                                :form="this.state.sinks.creations.import"
                                name="name"
                                :label="lang('l_name_bimport')"
                                :placeholder="lang('l_name_bimport')"
                                type="text"
                            />
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
                                class="button is-info has-small-bottom-margin"
                            >
                                {{lang('l_upload_bimport')}}
                            </button>
                        </template>
                        <div v-else-if="state.in_progress">
                            <article class="message is-info"><div class="content message-body">{{lang('l_import_submitted')}}</div></article>
                        </div>
                        <div v-else-if="state.succeeded">
                            <article class="message is-success"><div class="content message-body">{{lang('l_import_created')}}</div></article>
                        </div>
                        <div v-if="state.error" class="has-small-top-margin">
                            <article class="message is-danger"><div class="content message-body">{{lang(state.error)}}</div></article>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget :collapsed="true">
                    <span slot="title">{{lang('l_import_report_view')}}</span>
                    <div slot="body">
                        <article class="message is-info has-small-bottom-margin">
                            <div class="content message-body" v-html="lang('l_how_to_review_import_help')"></div>
                        </article>
                        <fdata-table-searching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.system_report"
                            :search-path="state.paths.reads.system_report"
                            :use-default-query="true"
                            :search-query="es_query_content"
                            search-type="system_report"
                            table-classes="has-small-font"
                            :detailed="true"
                            detail-key="_id"
                            :change-with-create-success="true"
                            :columns="state.columns"
                            :form-create-success="state.sinks.creations.system_report"
                            search-query-string-name="sr"
                            seso-query-string-name="rseso"
                            @column-checkbox-update="on_column_update"
                        >
                            <template slot="rows" slot-scope="props">
                                <b-table-column 
                                    field="name.raw" 
                                    :label="lang(state.columns.name.title)" 
                                    :visible="state.columns.name.visible" 
                                    :sortable="state.columns.name.sortable"
                                >
                                    {{props.row.name}}
                                </b-table-column>
                                <b-table-column 
                                    field="created_at" 
                                    :label="lang(state.columns.created_at.title)" 
                                    centered 
                                    :visible="state.columns.created_at.visible" 
                                    :sortable="state.columns.created_at.sortable"
                                >
                                    <span class="tag is-light">
                                        {{props.row.created_at | format_date('fromNow') }}
                                    </span>
                                </b-table-column>
                                <b-table-column 
                                    field="report.success" 
                                    :label="lang(state.columns['report.success'].title)" 
                                    centered 
                                    :visible="state.columns['report.success'].visible" 
                                    :sortable="state.columns['report.success'].sortable"
                                >
                                    <span class="tag is-success">
                                        {{_oa_find(props.row, 'report.success', 0)}}
                                    </span>
                                </b-table-column>
                                <b-table-column 
                                    field="report.errors" 
                                    :label="lang(state.columns['report.errors'].title)" 
                                    centered 
                                    :visible="state.columns['report.errors'].visible" 
                                    :sortable="state.columns['report.errors'].sortable"
                                >
                                    <span class="tag is-danger">
                                        {{_oa_find(props.row, 'report.errors', 0)}}
                                    </span>
                                </b-table-column>
                                <b-table-column 
                                    field="report.total" 
                                    :label="lang(state.columns['report.total'].title)" 
                                    centered 
                                    :visible="state.columns['report.total'].visible" 
                                    :sortable="state.columns['report.total'].sortable"
                                >
                                    <span class="tag is-info">
                                        {{_oa_find(props.row, 'report.total', 0)}}
                                    </span>
                                </b-table-column>
                                <b-table-column 
                                    field="status" 
                                    :label="lang(state.columns.status.title)" 
                                    centered 
                                    :visible="state.columns.status.visible" 
                                    :sortable="state.columns.status.sortable"
                                >
                                    <span class="tag is-light" v-if="props.row.status === 'on_wait'">
                                        {{lang(`l_${props.row.status}_report_status`)}}
                                    </span>
                                    <span class="tag is-info" v-else-if="props.row.status === 'in_progress'">
                                        {{lang(`l_${props.row.status}_report_status`)}}
                                    </span>
                                    <span class="tag is-danger" v-else-if="props.row.status === 'error'">
                                        {{lang(`l_${props.row.status}_report_status`)}}
                                    </span>
                                    <span class="tag is-success" v-else-if="props.row.status === 'done'">
                                        {{lang(`l_${props.row.status}_report_status`)}}
                                    </span>
                                    <span class="tag is-light" v-else>
                                        {{lang(`l_${props.row.status}_report_status`)}}
                                    </span>
                                </b-table-column>
                                <b-table-column 
                                    field="denormalization.requester.fullname.raw" 
                                    :label="lang(state.columns['denormalization.requester.fullname'].title)" 
                                    centered 
                                    :visible="state.columns['denormalization.requester.fullname'].visible" 
                                    :sortable="state.columns['denormalization.requester.fullname'].sortable"
                                >
                                        {{_oa_find(props.row, 'denormalization.requester.fullname', '')}}
                                </b-table-column>
                                <b-table-column field="actions" :label="lang('l_p_action', {}, 'other')" centered>
                                    <action-button
                                        class="icon has-text-red share-icon"
                                        tag="a"
                                        :confirmation="lang('l_are_you_sure')"
                                        :two-steps="true"
                                        @action-click="remove(props.row, 'system_report')"
                                    >
                                        <i class="fa fa-times"></i>
                                    </action-button>
                                </b-table-column>
                            </template>
                        </fdata-table-searching>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./PublicationImport');
</script>
