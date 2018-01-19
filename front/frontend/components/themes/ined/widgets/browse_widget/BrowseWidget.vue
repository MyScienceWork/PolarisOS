<template>
    <div>
        <template v-if="boxed">
            <div :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
                <header class="card-header">
                    <p class="card-header-title" v-html="lang(title)"></p>
                </header>
                <div class="card-content">
                    <div class="columns is-centered">
                        <div class="column">
                            <article class="media">
                                <div class="media-content">
                                    <div class="content">
                                        <ul class="list-icon">
                                            <li class="fa-book"><a href='#'>WP de l'INED</a></li>
                                            <li class="fa-book"><a href='#'>La fécondité en Allemagne en 1900</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="columns is-centered">
                <div class="column has-text-centered is-8">
                    <h4 class="title is-4">{{lang('f_browse_info')}}</h4>
                    <p v-html="lang('f_browse_help')"></p>
                </div>
            </div>
            <div class="columns is-centered">
                <nav class="navbar is-transparent">
                    <div class="navbar-menu">
                        <div class="navbar-start">
                            <router-link v-for="(obj, idx) in state.navigation" :class="['swap', 'navbar-item', {'is-active': current_nav.type === obj.type}]" :to="`/browse?b=${obj.type}&i=${idx}`">{{lang(obj.text)}}</router-link>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="field is-grouped" v-if="current_nav.select">
                <div class="control is-expanded">
                    <v-select
                        :key="current_nav.type"
                        :multiple="true"
                        :options="select_options"
                        :placeholder="lang('b_browse_select')"
                        :on-change="onChange"
                        :value="state.selected"
                        class="input"
                    >
                    </v-select>
                </div> 
                <div class="control">
                    <router-link class="icon has-text-info is-medium" :alt="lang('f_search')" :title="lang('f_search')" :to="`/browse?${search}`">
                        <i class="fa fa-search fa-2x"></i>
                    </router-link>
                </div>
            </div>
            <hr v-if="current_nav.indexer != null" />
            <div class="columns is-centered" v-if="current_nav.indexer != null">
                <div class="column">
                    <indexer v-on:indexer-change="onIndexerChange" v-if="current_nav.indexer === 'alpha'" :class="extraClasses.split(' ').filter(c => c != '')" :alphabet="Object.keys(indexer_options).sort()"/>
                    <indexer v-on:indexer-change="onIndexerChange" v-else-if="current_nav.indexer === 'numeric'" :class="extraClasses.split(' ').filter(c => c != '')" :alphabet="['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']"/>
                </div>
            </div>
            <div class="columns is-multiline" v-if="current_nav.indexer != null && state.selected_indexer in indexer_options">
                <div class="column is-6" v-for="item in indexer_options[state.selected_indexer]">
                    <template v-if="current_nav.template === 'author-template'">
                        <widget-media :info="item" />
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    module.exports = require('./BrowseWidget');
</script>
