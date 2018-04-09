<template>
<div>
    <nav class="navbar is-transparent">
        <div class="navbar-menu is-vcentered">
            <div class="navbar-start">
                <form @submit.prevent="search">
                    <div class="field has-addons">
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
                        <p class="control">
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
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link swap">
                            {{lang('f_items_per_page')}}
                        </a>

                        <div class="navbar-dropdown">
                            <a v-for="s in sizeList" :class="['navbar-item swap', {'is-active': state.seso.size === s}]" @click.prevent="size(s)">
                                {{s}} 
                            </a>
                        </div>
                    </div>

                    <div class="navbar-item has-dropdown is-hoverable" v-if="sortList.length > 0">
                        <a class="navbar-link swap">
                            {{lang('f_sort_by')}}
                        </a>

                        <div class="navbar-dropdown">
                            <a v-for="item in sortList" :class="['navbar-item swap', {'is-active': state.seso.sort === item.key}]" @click.prevent="sort(item.key, get_order(item.key))">
                                {{lang(item.lang)}}
                                <span class="icon">
                                    <template v-if="state.seso.sort === item.key">
                                        <i v-if="get_order(item.key) === 'desc'" class="fa fa-long-arrow-down"></i>
                                        <i v-else="get_order(item.key) === 'asc'" class="fa fa-long-arrow-up"></i>
                                    </template>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    </nav>
    <div v-if="getAllResults">
        <slot name="search-results"
            :results="content"
        >
        </slot>
    </div>
    <div v-else class="columns is-centered" v-for="row in matrix_content">
        <div class="column"
            v-for="(info, idx) in row" 
        >
            <slot 
                name="search-result"
                :id="idx"
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
                :per-page="state.seso.size">
            </b-pagination>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./Searching');
</script>
