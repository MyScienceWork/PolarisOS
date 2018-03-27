<template>
    <div class="card-content">
        <nav class="navbar is-transparent">
        <div class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link swap">
                        {{lang('f_export_publication')}}
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item swap" @click="export_format('bibtex', $event)"> 
                            {{lang('f_export_bibtex')}}
                        </a>
                        <a class="navbar-item swap" @click="export_format('csv', $event)">
                            {{lang('f_export_csv')}}
                        </a>
                        <a class="navbar-item swap" @click="export_format('ris', $event)">
                            {{lang('f_export_ris')}}
                        </a>
                    </div>
                </div>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link swap">
                        {{lang('f_items_per_page')}}
                    </a>

                    <div class="navbar-dropdown">
                        <a :class="['navbar-item swap', {'is-active': state.seso.size === 2}]" @click.prevent="size(2)">
                            2 
                        </a>
                        <a :class="['navbar-item swap', {'is-active': state.seso.size === 20}]" @click.prevent="size(20)">
                            20
                        </a>
                        <a :class="['navbar-item swap', {'is-active': state.seso.size === 50}]" @click.prevent="size(50)">
                            50
                        </a>
                        <a :class="['navbar-item swap', {'is-active':state.seso.size === 100}]" @click.prevent="size(100)">
                            100 
                        </a>
                    </div>
                </div>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link swap">
                        {{lang('f_sort_by')}}
                    </a>

                    <div class="navbar-dropdown">
                        <a :class="['navbar-item swap', {'is-active': state.seso.sort === 'dates.publication'}]" @click.prevent="sort('dates.publication', get_order('dates.publication'))">
                            {{lang('f_sort_by_year')}}
                            <span class="icon">
                                <template v-if="state.seso.sort === 'dates.publication'">
                                    <i v-if="get_order('dates.publication') === 'desc'" class="fa fa-long-arrow-down"></i>
                                    <i v-else="get_order('dates.publication') === 'asc'" class="fa fa-long-arrow-up"></i>
                                </template>
                            </span>
                        </a>
                        <a :class="['navbar-item swap', {'is-active': state.seso.sort === 'type'}]" @click.prevent="sort('type', get_order(('type')))">
                            {{lang('f_sort_by_publication_type')}}
                            <span class="icon">
                                <template v-if="state.seso.sort === 'type'">
                                    <i v-if="get_order('type') === 'desc'" class="fa fa-long-arrow-down"></i>
                                    <i v-else="get_order('type') === 'asc'" class="fa fa-long-arrow-up"></i>
                                </template>
                            </span>
                        </a>
                        <a :class="['navbar-item swap', {'is-active': state.seso.sort === 'dates.deposit'}]" @click.prevent="sort('dates.deposit', get_order('dates.deposit'))">
                            {{lang('f_sort_by_deposit_year')}} 
                            <span class="icon">
                                <template v-if="state.seso.sort === 'dates.deposit'">
                                    <i v-if="get_order('dates.deposit') === 'desc'" class="fa fa-long-arrow-down"></i>
                                    <i v-else="get_order('dates.deposit') === 'asc'" class="fa fa-long-arrow-up"></i>
                                </template>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </nav>
        <results 
            :is-selectable="true" 
            :user="user" 
            :logged-in="state.loggedIn"
            :items="content"
            :export-sink="state.sinks.reads.export"
        />
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
