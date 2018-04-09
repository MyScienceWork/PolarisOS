<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_review_publication')}}</span>
                <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.publication"
                            :search-path="state.paths.reads.publication"
                            :search-query="search_query"
                            :use-default-query="true"
                            search-type="query"
                            :get-all-results="true"
                        >
                            <table class="table" slot="search-results" slot-scope="props">
                                <thead>
                                    <tr>
                                        <th>{{lang('l_publication_id')}}</th>
                                        <th>{{lang('l_publication_author', {}, 'other')}}</th>
                                        <th>{{lang('l_publication_title')}}</th>
                                        <th>{{lang('l_publication_year')}}</th>
                                        <th>{{lang('l_publication_status')}}</th>
                                        <th>{{lang('l_publication_update')}}</th>
                                        <th>{{lang('l_publication_depositor')}}</th>
                                        <th>{{lang('l_publication_action')}}</th>
                                        <th>{{lang('l_publication_reviewer')}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!--<tr v-for="info in props.results">
                                        <td>{{info._id}}</td>
                                        <td></td>
                                        <td>{{info.title.content}}</td>
                                        <td>{{date_format(info.dates.publication)}}</td>
                                        <td>{{lang(`l_${info.status}}_status`)}}</td>
                                        <td>{{date_format(info.dates.modification)}}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>-->
                                </tbody>
                            </table>
                        </fsearching>
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
