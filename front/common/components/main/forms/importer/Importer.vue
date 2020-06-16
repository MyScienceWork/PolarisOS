<template>
    <div class="column">
        <div class="column">
            <span slot="title">{{lang('l_setup_import')}}</span>
            <div class="columns is-centered">
                <div class="column">
                    <div class="level-left">
                        <fdropzone
                                :form="form"
                                files="files"
                                name="filepath"
                                master="is_master"
                                url="url"
                                :restore_files="false"
                                :keep_files="false"
                                :show_master_checkboxes="false"
                                class="has-no-padding" />
                    </div>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="columns is-centered">
                <div class="column">
                    <div class="level-left">
                        <button
                                type="submit" @click.prevent="import_publications"
                                class="button is-info has-small-bottom-margin">
                            {{lang('l_upload_bimport')}}
                        </button>
                        <div v-if="state.error" class="has-small-top-margin">
                            <article class="message is-danger"><div class="content message-body">{{lang(state.error)}}</div></article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget :collapsed="false">
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
    module.exports = require('./Importer');
</script>
