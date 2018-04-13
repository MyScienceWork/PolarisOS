<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_review_publication')}}</span>
                <div slot="body">
                        <fdata-table-searching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.publication"
                            :search-path="state.paths.reads.publication"
                            :search-query="search_query"
                            :use-default-query="true"
                            search-type="publication"
                            table-classes="has-small-font"
                            :detailed="true"
                            detail-key="_id"
                        >
                            <template slot="rows" slot-scope="props">
                                <b-table-column field="_id" :label="lang('l_id')" centered>
                                    <span class="tag is-light">
                                        {{props.row._id | truncate(10, '')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.authors._id.fullname" :label="lang('l_p_author', {}, 'other')">
                                    {{props.row.denormalization.authors | join('_id.fullname') | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="title.content" :label="lang('l_p_title')">
                                    {{props.row.title.content | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="dates.publication" :label="lang('l_p_year')" sortable centered>
                                    <span class="tag is-success">
                                        {{props.row.dates.publication | format_date('YYYY')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="status" :label="lang('l_p_status')" sortable centered>
                                    <span class="tag is-warning" v-if="props.row.status === 'pending'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-danger" v-else-if="props.row.status === 'rejected'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-info" v-else>
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="dates.update" :label="lang('l_p_update')" sortable centered>
                                    <span class="tag is-warning">
                                        {{props.row.dates.update | format_date('DD/MM/YYYY')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.depositor.lastname.raw" :label="lang('l_p_depositor')" sortable centered>
                                    {{get_info(props.row, 'denormalization.depositor.firstname')}} {{get_info(props.row, 'denormalization.depositor.lastname')}}
                                </b-table-column>
                                <b-table-column field="depositor" :label="lang('l_p_action', {}, 'other')" centered>
                                    <a target="_blank" class="has-text-green" :href="`${host}/deposit?type=review&_id=${props.row._id}`">{{lang('l_review_review_action')}}</a>
                                </b-table-column>
                                <b-table-column field="denormalization.reviewer.lastname.raw" :label="lang('l_p_reviewer')" sortable centered>
                                    {{get_info(props.row, 'denormalization.reviewer.firstname')}} {{get_info(props.row, 'denormalization.reviewer.lastname')}}
                                </b-table-column>
                            </template>
                            <template slot="detail" slot-scope="props">
                                <h4 class="title is-4">{{lang('l_general_information')}}</h4>
                                <p><strong>{{lang('l_publication_title')}}</strong> {{props.row.title.content}}</p> 
                                <p><strong>{{lang('l_publication_author', {}, 'other')}}</strong>
                                    {{props.row.denormalization.authors | join('_id.fullname')}}
                                </p> 
                                <p><strong>{{lang('l_publication_year')}}</strong> {{props.row.dates.publication | format_date('YYYY')}}</p> 
                                <p><strong>{{lang('l_publication_status')}}</strong> {{lang(`l_${props.row.status}_status`)}}</p> 
                                <p><strong>{{lang('l_publication_update')}}</strong> {{props.row.dates.update | format_date()}}</p>
                                <h4 class="title is-4 has-small-top-margin">{{lang('l_user_information')}}</h4>
                                <p><strong>{{lang('l_publication_depositor')}}</strong> {{get_info(props.row, 'denormalization.depositor.firstname')}} {{get_info(props.row, 'denormalization.depositor.lastname')}}</p> 
                                <p><strong>{{lang('l_publication_reviewer')}}</strong> {{get_info(props.row, 'denormalization.reviewer.firstname')}} {{get_info(props.row, 'denormalization.reviewer.lastname')}}
                                </p> 
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
