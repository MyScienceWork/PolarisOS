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
                            </template>
                            <template slot="detail" slot-scope="props">
                                <div class="has-medium-font">
                                    <p class="has-small-bottom-margin"><span class="tag is-info">{{lang(props.row.denormalization.type.label)}}</span></p>
                                    <p class="has-small-bottom-margin"><span class="tag is-info">{{lang(find_subtype(props.row))}}</span></p>
                                    <h4 class="title is-4">{{lang('l_general_information')}}</h4>
                                    <p><strong>{{lang('l_dataset_title')}}</strong> {{props.row.title}}</p>
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
