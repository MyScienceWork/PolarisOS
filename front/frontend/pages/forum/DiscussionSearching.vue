<template>
    <div class="container">
        <div class= "columns is-offset-2 is-8">
            <nav class="navbar column is-full">
                <div class="navbar-menu is-vcentered">
                    <div class="navbar-start">
                        <form @submit.prevent="search">
                            <div class="field has-addons">
                                <p class="control has-icons-left is-expanded">
                                    <finput type="text" :placeholder="lang('l_search_discussion')" name="search" :form="searchSink" label="" :is-addon="true" />
                                    <span class="icon is-left">
                                        <i class="fa fa-search"></i>
                                    </span>
                                </p>
                                <p class="control">
                                    <a class="button is-info" :alt="lang('l_search')" :title="lang('l_search')" @click="search">
                                        <span class="icon">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </a>
                                </p>
                                <p class="control" v-if="filters.length > 0">
                                    <a class="button is-info" :alt="lang('l_filter')" :title="lang('l_filter')">
                                        <span class="icon">
                                            <i class="fa fa-filter"></i>
                                        </span>
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div class="navbar-end">
                        <b-dropdown>
                            <a class="navbar-link swap" slot="trigger">
                                {{lang('f_items_per_page')}}
                            </a>
                            <b-dropdown-item v-for="s in sizeList" :class="['navbar-item', {'is-active': state.seso.size === s}]" @click="() => size(s)">
                                    {{s}}
                                </b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </nav>
        </div>
        <div class="columns is-full">
            <slot  name="search-discussions-results" :results="content">
            </slot>
        </div>
        <div class="columns is-centered">
            <div class="column is-narrow is-centered">
                <b-pagination
                    v-if="total > state.seso.size"
                    :total="total"
                    :current.sync="currentPage"
                    :simple="true"
                    :rounded="false"
                    :per-page="state.seso.size">
                </b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    const _ = require('lodash');
    module.exports = _.merge({}, {name: 'DiscussionSearching'}, require('../../../common/components/main/forms/searching/Searching'));
</script>
