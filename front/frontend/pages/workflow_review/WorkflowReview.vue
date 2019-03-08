<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <h4 class="title is-4">{{lang('l_workflow_info')}} {{lang(workflow_name())}}</h4>
                        <fdata-table-searching
                                v-if="state.sinks.reads[entity()]"
                                :search-sink="state.sinks.creations.search"
                                :result-sink="state.sinks.reads[entity()]"
                                :search-path="state.paths.reads[entity()]"
                                :search-query="search_query_with_state_filters"
                                :empty-search-query="empty_search_query_with_state_filters"
                                :use-default-query="false"
                                :search-type="entity()"
                                :detailed="true"
                                detail-key="_id"
                                :checkable="true"
                                :checked-rows="state.checked_rows"
                                :columns="state.columns"
                                @column-checkbox-update="on_column_update"
                                @table-checked-rows-update="on_checked_rows_update"
                                :change-with-create-success="true"
                                :form-create-success="state.sinks.creations[entity()]"
                        >
                            <template slot="rows" slot-scope="props">
                                <b-table-column v-for="(value, key) in state.columns"
                                                :field="value.sort"
                                                :label="lang(value.title, {}, value.lang)"
                                                :visible="value.visible"
                                                :sortable="value.sortable"
                                                :centered="value.centered">
                                            <span
                                                    :class="`tag ${value.tag_class}`"
                                                    v-if="value.is_tag"
                                                    :inner-html.prop="props.row | find(value.field) | need_translation(value.translate, hlang, lang) | truncate(value.truncate) | show_lang_key(value.show_lang_key, _oa_find(props.row, value.field)) | format(value)"
                                            >
                                            </span>
                                    <div v-else
                                         :inner-html.prop="props.row | find(value.field) | need_translation(value.translate, hlang, lang) | truncate(value.truncate) | show_lang_key(value.show_lang_key, _oa_find(props.row, value.field)) | format(value)"
                                    >
                                    </div>
                                </b-table-column>

                                <b-table-column field="actions" :label="lang('l_p_action', {}, 'other')" centered>
                                    <router-link :to="`/deposit_project_curator?type=review&_id=${props.row._id}&workflow=${workflow_name()}`">
                                    <a class="has-text-green">{{lang('l_review_review_action')}}</a><br />
                                    </router-link>
                                    <!--
                                    <action-button
                                            class="has-text-red"
                                            tag="a"
                                            :confirmation="lang('l_remove_confirmation')"
                                            :two-steps="true"
                                            @action-click="remove(props.row, entity())"
                                    >{{lang('l_review_remove_button')}}</action-button>
                                     -->
                                </b-table-column>
                            </template>
                        </fdata-table-searching>
                        <div v-else class="columns is-centered">
                            <loader/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./WorkflowReview');
</script>
