<template>
    <div class="column">
        <h5 class="title is-4">{{lang('l_publication', {}, 'other')}}</h5>
        <div class="columns is-centered">
            <div class="column is-10">
                <search-bar 
                :search-sink="state.sinks.creations.publication_search"
                :default-search="search_param_in_query"
                :use-favorites="false"
                color="red"
                placeholder="l_search_in_publications"
                />
            </div>
        </div>
        <hr />
        <div class="columns is-centered">
            <div class="column">
                <search-results 
                :search-sink="state.sinks.creations.publication_search"
                :result-sink="state.sinks.reads.publication"
                :search-path="state.paths.reads.publication"
                :search-query="search_publications_query"
                search-type="publication"
                :use-default-query="true"
                :default-query="default_search_publications_query"
                />
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./Publication');
</script>
