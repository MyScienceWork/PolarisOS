<template>
<div class="hero-body" v-if="Object.keys(typology_order).length > 0 && Object.keys(subtypology_order).length > 0">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <search-results 
                    id="msearchresults"
                    :search-sink="state.sinks.creations.search"
                    :result-sink="state.sinks.reads.publication"
                    :search-path="state.paths.reads.publication"
                    :use-default-query="true"
                    search-type="publication"
                    :search-query="search_query"
                    :default-query="default_query"
                    :search-on-mount="true"
                    :default-sorts="default_sorts"
                />
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./ListForWebsite');
</script>
