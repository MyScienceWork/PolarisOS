<template>
<div class="hero-body">
    <div class="container is-fluid">
        <!--<div class="columns is-centered">
            <div class="column has-text-centered is-8">
                <h4 class="title is-4">{{lang('f_search_info')}}</h4>
                <p v-html="lang('f_search_help')"></p>
            </div>
        </div>-->
        <div class="columns is-centered">
            <div class="column is-10">
                <search-bar
                    :search-sink="state.sinks.creations.search"
                    :default-search="query_search"
                    :show-advanced-search.sync="show_advanced_search"
                />
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                    <search-results
                        v-if="show_advanced_search"
                        key="advanced_search_results"
                        id="msearchresults"
                        :search-sink="state.sinks.creations.search"
                        :result-sink="state.sinks.reads.search"
                        :search-path="state.paths.creations.search"
                        search-query="{}"
                        :filters="advanced_filters"
                        :default-sorts="['-dates.deposit']"
                        search-type="dataset"
                    />
                    <search-results
                        v-else
                        key="simple_search_results"
                        id="msearchresults"
                        :search-sink="state.sinks.creations.search"
                        :result-sink="state.sinks.reads.search"
                        :search-path="state.paths.creations.search"
                        :search-query="query"
                        :default-sorts="['-dates.deposit']"
                        search-type="dataset"
                    />
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./SearchDataset');
</script>
