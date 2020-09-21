<template>
<div class="card info-card-purple" v-if="state.display_results">
<div class="card-content is-flex-mobile">
    <div class="level" v-if="content.length > 0">
        <div v-if="!display_l_for_list" class="level-left"><input type='checkbox' class="has-medium-right-margin" v-model="state.select_all_to_export" />
            <h4 class="is-subtitle is-2">
                <strong>{{ state.seso.size < total ? state.seso.size : total }} {{lang('l_number_search_results', {}, total)}}</strong>
                <strong>({{ total }} {{lang('l_total')}})</strong>
            </h4>
        </div>
        <div class="level-right">
            <div class="level-item is-hidden-tablet">
                <b-dropdown position="is-bottom-left">
                    <button class="button is-purple has-small-right-margin" slot="trigger">
                        <span class="icon is-small"><i class="fa fa-bars"></i></span>
                    </button>

                    <b-dropdown-item custom>
                        <ul class="menu-list">
                            <li>
                                <b-collapse :open.sync="state.mobile_dropdown.first">
                                    <a role="button" slot="trigger">
                                        <span class="icon is-small">
                                            <i v-if="state.mobile_dropdown.first" class="fa fa-chevron-down"></i>
                                            <i v-else class="fa fa-chevron-up"></i>
                                        </span>
                                        <span class="swap menu-text">{{lang('f_export_publication')}}</span>
                                    </a>
                                    <ul>
                                        <li v-for="data in export_data">
                                            <a class="swap" @click.prevent="export_format(data.value)">
                                                {{data.label}}
                                            </a>
                                        </li>
                                    </ul>
                                </b-collapse>
                            </li>
                            <li>
                                <b-collapse :open.sync="state.mobile_dropdown.second">
                                    <a role="button" slot="trigger">
                                        <span class="icon is-small">
                                            <i v-if="state.mobile_dropdown.second" class="fa fa-chevron-down"></i>
                                            <i v-else class="fa fa-chevron-up"></i>
                                        </span>
                                        <span class="swap menu-text">{{lang('f_items_per_page')}}</span>
                                    </a>
                                    <ul>
                                        <li v-for="per_page in items_per_page_options">
                                            <a :class="['swap', {'is-active': state.seso.size === per_page}]" @click.prevent="size(per_page)">
                                                {{per_page}}
                                            </a>
                                        </li>
                                    </ul>
                                </b-collapse>
                            </li>
                            <li>
                                <b-collapse :open.sync="state.mobile_dropdown.third">
                                    <a role="button" slot="trigger">
                                        <span class="icon is-small">
                                            <i v-if="state.mobile_dropdown.third" class="fa fa-chevron-down"></i>
                                            <i v-else class="fa fa-chevron-up"></i>
                                        </span>
                                        <span class="menu-text">{{lang('f_sort_by')}}</span>
                                    </a>
                                    <ul>
                                        <li v-for="sorting in sorting_options">
                                            <a :class="['swap', {'is-active': state.seso.sort === sorting.value}]" @click.prevent="sort(sorting.value, get_order(sorting.value))">
                                                {{sorting.label}}
                                                <span class="icon">
                                                    <template v-if="state.seso.sort === sorting.value">
                                                        <i v-if="get_order(sorting.value) === 'desc'" class="fa fa-long-arrow-down"></i>
                                                        <i v-else="get_order(sorting.value) === 'asc'" class="fa fa-long-arrow-up"></i>
                                                    </template>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </b-collapse>
                            </li>
                        </ul>
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="level-item is-hidden-mobile">
                <div class="field has-addons">
                    <p class="control">
                        <b-dropdown hoverable>
                            <a class="button" slot="trigger">
                                <span class="icon is-small">
                                    <i class="fa fa-download"></i>
                                </span>
                                <span>{{lang('f_export_publication')}}</span>
                            </a>
                            <template>
                                <b-dropdown-item has-link v-for="data in export_data">
                                    <a class="navbar-item swap" @click.prevent="export_format(data.value)">
                                        {{data.label}}
                                    </a>
                                </b-dropdown-item>
                                <hr class="dropdown-divider">
                                <b-dropdown-item has-link v-for="obj in csl_export_styles" >
                                    <a class="navbar-item swap" @click.prevent="export_format('csl', obj.value)">
                                        {{lang('f_export_csl')}} ({{obj.label}})
                                    </a>
                                </b-dropdown-item>
                            </template>
                        </b-dropdown>
                    </p>
                    <p class="control">
                        <b-dropdown hoverable>
                            <a class="button" slot="trigger">
                                <span class="icon is-small">
                                    <i class="fa fa-list-ol"></i>
                                </span>
                                <span>
                                    {{lang('f_items_per_page')}}
                                </span>
                            </a>
                            <template v-for="per_page in items_per_page_options">
                                <b-dropdown-item has-link>
                                    <a :class="['navbar-item swap', {'is-active': state.seso.size === per_page}]" @click.prevent="size(per_page)">
                                        {{per_page}}
                                    </a>
                                </b-dropdown-item>
                            </template>
                        </b-dropdown>
                    </p>
                    <p class="control">
                        <b-dropdown hoverable>
                            <a class="button" slot="trigger">
                                <span class="icon is-small">
                                    <i class="fa fa-sort"></i>
                                </span>
                                <span>
                                    {{lang('f_sort_by')}}
                                </span>
                            </a>
                            <template v-for="sorting in sorting_options">
                                <b-dropdown-item has-link>
                                    <a :class="['navbar-item swap', {'is-active': state.seso.sort === sorting.value}]" @click.prevent="sort(sorting.value, get_order(sorting.value))">
                                        {{sorting.label}}
                                        <span class="icon">
                                            <template v-if="state.seso.sort === sorting.value">
                                                <i v-if="get_order(sorting.value) === 'desc'" class="fa fa-long-arrow-down"></i>
                                                <i v-else="get_order(sorting.value) === 'asc'" class="fa fa-long-arrow-up"></i>
                                            </template>
                                        </span>
                                    </a>
                                </b-dropdown-item>
                            </template>
                        </b-dropdown>
                    </p>
                </div>
            </div>
        </div>
    </div>
        <div v-if="display_l_for_list" class="columns">
            <div class="column">
                <div class="level-left"><input type='checkbox' class="has-medium-right-margin" v-model="state.select_all_to_export" />
                    <h4 class="is-subtitle is-2">
                        <strong>{{total}} {{lang('l_number_search_results', {}, total)}}</strong><span> {{lang('l_for')}}</span>
                        <span v-if="display_l_for_list" v-html="join_list(catName)"></span><br/>
                    </h4>
                </div>
            </div>
        </div>
    </div>
    <results
    :is-selectable="true"
    :show-status="showStatus"
    :user="user"
    :logged-in="state.loggedIn"
    :items="content"
    :export-sink="state.sinks.reads.export"
    v-if="content.length > 0"
    />
    <div v-else-if="!content_received">
        <div class="columns is-centered">
            <loader />
        </div>
    </div>
    <div v-else>
        <p class="has-text-centered" v-html="lang('l_no_search_results')"></p>
    </div>
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
</template>

<script>
    module.exports = require('./SearchResults');
</script>
