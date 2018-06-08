<template>
<div class="hero-body">
    <div class="container is-fluid">
        <!-- <div class="columns is-centered" style="border: 3px blue solid;">
        </div> -->
        <div class="columns is-centered">
            <div class="column is-3">
                <aside class="menu">
                    <ul class="menu-list">
                        <li v-for="(obj, idx) in navs">
                            <span @click="state.active_results = false">
                            <router-link
                                :class="['swap is-purple', {'is-active': current_nav.type === obj.type}]"
                                :to="`/browse?${obj.query}`">
                            {{lang(obj.text)}}
                            </router-link></span>
                        </li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <!--<div class="columns is-centered">
                    <div class="column has-text-centered is-8">
                        <h4 class="title is-4">{{lang('f_browse_info')}}</h4>
                        <p v-html="lang('f_browse_help')"></p>
                    </div>
                </div>-->
                <div class="columns">
                    <div class="column">
                        <category :filters.sync="state.filters" :active-results.sync="state.active_results" />
                    </div>
                </div>
                <div class="columns is-centered"
                    v-if="state.active_results"
                >
                    <div class="column">
                        <div class="card info-card-purple">
                            <search-results
                            id="msearchresults"
                                :search-sink="state.sinks.creations.search"
                                :result-sink="state.sinks.reads.publication"
                                :search-path="state.paths.reads.publication"
                                :filters="state.filters"
                                :search-when-filters-change="true"
                                :use-default-query="true"
                                search-type="publication"
                                :search-query="search_query"
                                :default-query="default_query"
                                :search-on-mount="false"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Browse');
</script>
