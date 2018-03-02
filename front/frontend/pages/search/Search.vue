<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column has-text-centered is-8">
                <h4 class="title is-4">{{lang('f_search_info')}}</h4>
                <p v-html="lang('f_search_help')"></p>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-10">
                <search-bar 
                    :search-sink="state.sinks.creations.search"
                    :default-search="query_search"
                />
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                <div class="card info-card-purple">
                    <search-results 
                        :search-sink="state.sinks.creations.search"
                        :result-sink="state.sinks.reads.search"
                        :search-path="state.paths.creations.search"
                        :search-query="query"
                        search-type="publication"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Search');
</script>
