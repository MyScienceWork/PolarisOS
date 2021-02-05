<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_review_dataset')}}</span>
                <div slot="body">
                        <fdata-table-searching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.dataset"
                            :search-path="state.paths.reads.dataset"
                            :search-query="search_query"
                            :use-default-query="true"
                            search-type="dataset"
                            :detailed="true"
                            detail-key="_id"
                            :columns="state.columns"
                            @column-checkbox-update="on_column_update"
                            @table-checked-rows-update="on_checked_rows_update"
                            :checkable="true"
                            :checked-rows="state.checked_rows"
                        >
                            <template slot="rows" slot-scope="props">
                                <b-table-column field="title.content" :label="lang('l_p_title')" :visible="state.columns['title'].visible">
                                    {{props.row.title | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="files" :label="lang('l_p_file', {}, 'other')" centered :visible="state.columns.files.visible">
                                    <span class="icon is-info">
                                        <a v-if="get_multi_download_link(props.row) != null" :href='get_multi_download_link(props.row)' title="Download file"><i class="fa fa-cloud-download"></i></a>
                                        <i v-else class="fa fa-times"></i>
                                    </span>
                                </b-table-column>
                                <b-table-column field="status" :label="lang('l_p_status')" sortable centered :visible="state.columns.status.visible">
                                    <span class="tag is-warning" v-if="props.row.status === 'pending'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-danger" v-else-if="props.row.status === 'rejected'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-info" v-else-if="props.row.status === 'incomplete'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-light" v-else-if="props.row.status === 'withdrawn'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-success" v-else>
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="depositor" :label="lang('l_p_action', {}, 'other')" centered :visible="state.columns.depositor.visible">
                                    <a target="_blank" class="has-text-green" :href="`${host}/deposit_dataset?type=review&_id=${props.row._id}`">{{lang('l_review_review_action')}}</a><br />
                                    <action-button
                                            class="has-text-red"
                                            tag="a"
                                            :confirmation="lang('l_remove_confirmation')"
                                            :two-steps="true"
                                            @action-click="remove(props.row, 'dataset')"
                                    >{{lang('l_review_remove_button')}}</action-button>
                                </b-table-column>
                            </template>
                            <template slot="detail" slot-scope="props">
                                <div class="has-medium-font">
                                    <h4 class="title is-4">{{lang('l_general_information')}}</h4>
                                    <dynamic-form :form="fform(state.sinks.creations.specs).content || {}" :cform="state.sinks.reads.dataset" :index="props.index" :readonly="true" />
                                </div>
                            </template>
                        </fdata-table-searching>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./ReviewDataset');
</script>
