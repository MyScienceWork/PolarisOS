<template>
    <div class="container">
        <div class= "columns is-offset-2 is-8">
            <nav class="navbar column is-full">
                <div class="navbar-menu is-vcentered">
                    <div class="navbar-start">
                        <form @submit.prevent="search">
                            <div class="field has-addons">
                                <p class="control has-icons-left is-expanded">
                                    <finput type="text" :placeholder="lang('l_search_user')" name="search" :form="searchSink" label="" :is-addon="true" />
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
            <slot  name="search-users-results" :results="content">
            </slot>
        </div>

<!--        <div class="container is-fluid">
            <div class="columns is-centered">
                <article v-for="usr in content" class="message column is-9">
                    <div class="columns">
                        <div class="column is-narrow">
                            <figure class="image is-128x128">
                        </figure>
                                <img :src="usr.author.avatar" alt="Placeholder image">
                        </div>
                        <div class="column">
                            <div class="title is-4">
                                {{usr.fullname}}
                            </div>
                            <div class="subtitle is-6">
                                {{usr.roles._id}}, {{usr.author.membership.institution}}
                            </div>
                            <div class="tags is-marginless">
                                <span v-for="tag in usr.author.tags" class="tag is-info is-marginless">
                                    {{tag}}
                                </span>
                            </div>
                            <p>{{usr.address.city}}, {{usr.address.country}}</p>
                        </div>
                    </div>
                </article>
            </div>
        </div>-->

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
    module.exports = _.merge({}, {name: 'UsersSearching'}, require('../../../common/components/main/forms/searching/Searching'));
</script>
