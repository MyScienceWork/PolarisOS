<template>
    <div>
        <nav class="navbar is-transparent">
            <div class="navbar-menu is-vcentered">
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
        <b-table
            :data="content"
            :loading="state.loading"
            backend-sorting
            default-sort-direction="asc"
            :default-sort="default_sort"
            :class="tableClasses"
            :detailed="detailed"
            :detail-key="detailKey"
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
