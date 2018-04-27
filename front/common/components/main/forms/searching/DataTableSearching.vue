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
        <section v-if="Object.keys(columns).length > 0">
            <p class="has-small-top-margin has-small-bottom-margin">{{lang('l_show_columns')}}</p>
            <b-field grouped group-multiline>
                <div v-for="(val, key) in columns" v-if="!columns[key].force" 
                    :key="key"
                    class="control"
                >
                    <b-checkbox type="is-info" :value="columns[key].visible" @input="(c) => on_checkbox_update(key, c)">
                        {{ lang(columns[key].title, {}, columns[key].lang || 'n/a') }}
                    </b-checkbox>
                </div>
            </b-field>
        </section>
        <b-table
            :data="content"
            :loading="state.loading"
            backend-sorting
            default-sort-direction="asc"
            :default-sort="default_sort"
            :class="tableClasses"
            :detailed="detailed"
            :checked-rows="checkedRows"
            @check="on_checked_rows_update"
            @check-all="on_checked_rows_update"
            :detail-key="detailKey"
            :checkable="checkable"
            @sort="sort">

            <template slot-scope="props">
                <slot name="rows" v-bind="props">
                </slot>
            </template>
            <template slot="detail" slot-scope="props">
                <slot name="detail" v-bind="props">
                </slot>
            </template>
        </b-table>
        <div class="level">
            <div class="level-left">
            </div>
            <div class="level-right">
                <div class="level-item">
                    <b-pagination
                        v-if="total > state.seso.size"
                        :total="total"
                        :current.sync="currentPage"
                        :simple="true"
                        :rounded="false"
                        :per-page="state.seso.size"
                    >
                    </b-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const _ = require('lodash');
    module.exports = _.merge({}, {name: 'DataTableSearching'}, require('./Searching'));
</script>
