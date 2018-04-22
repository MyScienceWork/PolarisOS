<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
        </div>
        <div class="columns is-centered">
            <div class="column is-3">
                <aside class="menu">
                    <ul class="menu-list">
                        <li v-for="(obj, idx) in navs">
                            <router-link
                                :class="['swap', {'is-active': current_nav.type === obj.type}]" 
                                :to="`/browse?b=${obj.type}&i=${idx}&entity=${obj.entity}`">
                            {{lang(obj.text)}}
                            </router-link>
                        </li>
                    </ul>
                </aside>
                <!--<category :filters.sync="state.filters" :nav-items="navs" /> -->
            </div>
            <div class="column">
                <div class="columns is-centered">
                    <div class="column has-text-centered is-8">
                        <h4 class="title is-4">{{lang('f_browse_info')}}</h4>
                        <p v-html="lang('f_browse_help')"></p>
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
    </div>
</div>
</template>

<script>
module.exports = require('./Browse');
</script>
