<template>
<div>
    <nav class="navbar is-transparent">
        <div class="navbar-menu is-vcentered">
            <div class="navbar-start">
                <form @submit.prevent="search">
                    <div class="field has-addons" v-intro="lang('l_backoffice_search_help')">
                        <p class="control has-icons-left is-expanded">
                            <finput type="text" :placeholder="lang('l_search')" name="search" :form="searchSink" label="" :is-addon="true" />
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
                        <a class="navbar-link swap" slot="trigger" v-intro="lang('l_backoffice_items_per_page_help')">
                            {{lang('f_items_per_page')}}
                        </a>

                        <b-dropdown-item v-for="s in sizeList" :class="['navbar-item', {'is-active': state.seso.size === s}]" @click="() => size(s)">
                                {{s}} 
                            </b-dropdown-item>
                    </b-dropdown>

                    <b-dropdown position="is-bottom-left" v-if="sortList.length > 0" v-intro="lang('l_backoffice_sort_help')">
                        <a class="navbar-link swap" slot="trigger">
                            {{lang('f_sort_by')}}
                        </a>

                        <b-dropdown-item v-for="item in sortList" :class="['navbar-item', {'is-active': state.seso.sort === item.key}]" @click="() => sort(item.key, get_order(item.key))">
                            {{lang(item.lang)}}
                            <span class="icon">
                                <template v-if="state.seso.sort === item.key">
                                    <i v-if="get_order(item.key) === 'desc'" class="fa fa-long-arrow-down"></i>
                                    <i v-else="get_order(item.key) === 'asc'" class="fa fa-long-arrow-up"></i>
                                </template>
                            </span>
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
    </nav>
    <div v-if="getAllResults">
        <slot name="search-results"
            :results="content"
        >
        </slot>
    </div>
    <div v-else class="columns is-centered" v-for="(row, row_idx) in matrix_content">
        <div class="column"
            v-for="(info, idx) in row" 
        >
            <slot 
                name="search-result"
                :id="idx"
                :row_id="row_idx"
                :info="info"
            >
            </slot>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column">
            <b-pagination
                v-if="total > state.seso.size"
                :total="total"
                :current.sync="currentPage"
                :simple="true"
                :rounded="false"
                v-intro="lang('l_backoffice_pagination_help')"
                :per-page="state.seso.size">
            </b-pagination>
        </div>
    </div>
</div>
</template>

<script>
    const _ = require('lodash');
    module.exports = _.merge({}, {name: 'Searching'}, require('./Searching'));
</script>
