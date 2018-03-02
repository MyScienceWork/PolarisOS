<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card card-equal-height info-card-purple info-card">
                    <div class="card-content">
                        <category :filters.sync="state.filters" :nav-items="navs" /> 
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                <div class="card info-card-purple">
                    <search-results 
                        :search-sink="state.sinks.creations.search"
                        :result-sink="state.sinks.reads.publication"
                        :search-path="state.paths.reads.publication"
                        :filters="state.filters"
                        :search-when-filters-change="true"
                        :use-default-query="true"
                        search-type="publication"
                        search-query="{}"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Browse');
</script>
