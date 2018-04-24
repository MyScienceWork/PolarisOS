<template>
<div class="card-content">
    <div class="level" v-if="content.length > 0">
        <div class="level-left">{{total}} {{lang('l_number_search_results', {}, total)}}</div>
        <div class="level-right">
            <div class="level-item">
                <div class="field has-addons">
                    <p class="control">
                        <b-dropdown hoverable>
                            <a class="button" slot="trigger">
                                <span class="icon is-small">
                                    <i class="fa fa-download"></i>
                                </span>
                                <span>{{lang('f_export_publication')}}</span>
                            </a>
                            <b-dropdown-item has-link>
                                <a class="navbar-item swap" @click.prevent="export_format('bibtex')"> 
                                    {{lang('f_export_bibtex')}}
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link>
                                <a class="navbar-item swap" @click.prevent="export_format('csv')">
                                    {{lang('f_export_csv')}}
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link>
                                <a class="navbar-item swap" @click.prevent="export_format('ris')">
                                    {{lang('f_export_ris')}}
                                </a>
                            </b-dropdown-item>
                            <hr class="dropdown-divider">
                            <b-dropdown-item has-link>
                                <a class="navbar-item swap" @click.prevent="export_format('csl', 'apa')">
                                    {{lang('f_export_csl')}} (APA)
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link>
                                <a class="navbar-item swap" @click.prevent="export_format('csl', 'vancouver')">
                                    {{lang('f_export_csl')}} (Vancouver)
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link>
                                <a class="navbar-item swap" @click.prevent="export_format('csl', 'havard1')">
                                    {{lang('f_export_csl')}} (Harvard (1))
                                </a>
                            </b-dropdown-item>
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
                            <b-dropdown-item has-link>
                                <a :class="['navbar-item swap', {'is-active': state.seso.size === 2}]" @click.prevent="size(2)">
                                    2 
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link>
                                <a :class="['navbar-item swap', {'is-active': state.seso.size === 20}]" @click.prevent="size(20)">
                                    20
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link>
                                <a :class="['navbar-item swap', {'is-active': state.seso.size === 50}]" @click.prevent="size(50)">
                                    50
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link>
                                <a :class="['navbar-item swap', {'is-active':state.seso.size === 100}]" @click.prevent="size(100)">
                                    100 
                                </a>
                            </b-dropdown-item>
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
                            <b-dropdown-item has-link>
                                <a :class="['navbar-item swap', {'is-active': state.seso.sort === 'dates.publication'}]" @click.prevent="sort('dates.publication', get_order('dates.publication'))">
                                    {{lang('f_sort_by_year')}}
                                    <span class="icon">
                                        <template v-if="state.seso.sort === 'dates.publication'">
                                            <i v-if="get_order('dates.publication') === 'desc'" class="fa fa-long-arrow-down"></i>
                                            <i v-else="get_order('dates.publication') === 'asc'" class="fa fa-long-arrow-up"></i>
                                        </template>
                                    </span>
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link>
                                <a :class="['navbar-item swap', {'is-active': state.seso.sort === 'type'}]" @click.prevent="sort('type', get_order(('type')))">
                                    {{lang('f_sort_by_publication_type')}}
                                    <span class="icon">
                                        <template v-if="state.seso.sort === 'type'">
                                            <i v-if="get_order('type') === 'desc'" class="fa fa-long-arrow-down"></i>
                                            <i v-else="get_order('type') === 'asc'" class="fa fa-long-arrow-up"></i>
                                        </template>
                                    </span>
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link>
                                <a :class="['navbar-item swap', {'is-active': state.seso.sort === 'dates.deposit'}]" @click.prevent="sort('dates.deposit', get_order('dates.deposit'))">
                                    {{lang('f_sort_by_deposit_year')}} 
                                    <span class="icon">
                                        <template v-if="state.seso.sort === 'dates.deposit'">
                                            <i v-if="get_order('dates.deposit') === 'desc'" class="fa fa-long-arrow-down"></i>
                                            <i v-else="get_order('dates.deposit') === 'asc'" class="fa fa-long-arrow-up"></i>
                                        </template>
                                    </span>
                                </a>
                            </b-dropdown-item>
                        </b-dropdown>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <results 
    :is-selectable="true" 
    :user="user" 
    :logged-in="state.loggedIn"
    :items="content"
    :export-sink="state.sinks.reads.export"
    v-if="content.length > 0"
    />
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
</template>

<script>
    module.exports = require('./SearchResults');
</script>
