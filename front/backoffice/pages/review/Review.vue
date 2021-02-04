<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_review_publication')}}</span>
                <div slot="body">
                        <div class="columns">
                            <div class="column">
                                <div class="level">
                                    <div class="level-left">
                                        <a :href='get_bulk_link()'>{{lang('l_bulk_edition')}}</a>
                                    </div>
                                    <div class="level-right">
                                        <a href='#' @click="state.show_import_modal = !state.show_import_modal" class="has-text-info">
                                            <template v-if="!state.show_import_modal">{{lang('l_import_publications')}}</template>
                                            <template v-else>{{lang('l_close_import_publications')}}</template>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-collapse :open.sync="state.show_import_modal">
                                    <publication-import />
                                </b-collapse>
                            </div>
                        </div>
                        <fdata-table-searching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.publication"
                            :search-path="state.paths.reads.publication"
                            :search-query="search_query"
                            :use-default-query="true"
                            search-type="publication"
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
                                <b-table-column field="denormalization.state.label" :label="lang('l_p_state')" :visible="state.columns['denormalization.state.label'].visible">
                                    {{props.row.denormalization.state.label | truncate(40)}}
                                </b-table-column>
                                <b-table-column field="depositor" :label="lang('l_p_action', {}, 'other')" centered>
                                  <a target="_blank" class="has-text-green" :href="`${host}/deposit?type=review&_id=${props.row._id}`">{{lang('l_review_review_action')}}</a><br />
                                  <action-button
                                      class="has-text-red"
                                      tag="a"
                                      :confirmation="lang('l_remove_confirmation')"
                                      :two-steps="true"
                                      @action-click="remove(props.row, 'publication')"
                                  >{{lang('l_review_remove_button')}}</action-button>
                                </b-table-column>
                            </template>
                            <template slot="detail" slot-scope="props">
                                <div class="has-medium-font">
                                    <p class="has-small-bottom-margin"><span class="tag is-info">{{lang(props.row.denormalization.type.label)}}</span></p>
                                    <h4 class="title is-4">{{lang('l_general_information')}}</h4>
                                    <p><strong>{{lang('l_publication_title')}}</strong> {{props.row.title}}</p>
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
module.exports = require('./Review');
</script>
