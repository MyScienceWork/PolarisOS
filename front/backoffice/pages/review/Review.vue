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
                            :sort-list="sort_list"
                        >
                            <div slot="search-results" slot-scope="props">
                                <widget :collapsed="true" v-for="info in props.results">
                                    <span slot="title">
                                        {{truncate(info.title.content)}} 
                                        ({{info._id}}) <small>{{lang(`l_${info.status}_status`)}}</small>
                                        <a
                                            class="button is-small button-background-green"
                                            :href="`${host}/deposit?type=review&_id=${info._id}`"
                                            target="_blank"
                                        >
                                            <i class="fa icon fa-eye"></i> 
                                        </a>
                                        <action-button
                                        class="button is-small button-background-red"
                                        :confirmation="lang('b_are_sure')"
                                        :two-steps="true"
                                        @action-click="remove(info, 'publication')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                    </span>
                                    <div slot="body">
                                        <p class="has-small-bottom-margin"><a class="has-text-green" :href="`${host}/deposit?type=review&_id=${info._id}`">{{lang('l_review_review_action')}}</a></p> 
                                        <h4 class="title is-4">{{lang('l_general_information')}}</h4>
                                        <p><strong>{{lang('l_publication_title')}}</strong> {{info.title.content}}</p> 
                                        <p><strong>{{lang('l_publication_author', {}, 'other')}}</strong> {{info.denormalization.authors.map(a => a._id.fullname).join(', ')}}</p> 
                                        <p><strong>{{lang('l_publication_year')}}</strong> {{date_format(info.dates.publication, 'DD/MM/YYYY')}}</p> 
                                        <p><strong>{{lang('l_publication_status')}}</strong> {{lang(`l_${info.status}_status`)}}</p> 
                                        <p><strong>{{lang('l_publication_update')}}</strong> {{date_format(info.dates.update)}}</p>
                                        <h4 class="title is-4 has-small-top-margin">{{lang('l_user_information')}}</h4>
                                        <p><strong>{{lang('l_publication_depositor')}}</strong> {{get_info(info, 'denormalization.depositor.firstname')}} {{get_info(info, 'denormalization.depositor.lastname')}}</p> 
                                        <p><strong>{{lang('l_publication_reviewer')}}</strong> {{get_info(info, 'denormalization.reviewer.firstname')}} {{get_info(info, 'denormalization.reviewer.lastname')}}
                                        </p> 
                                    </div>
                                </widget>
                            </div>
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
