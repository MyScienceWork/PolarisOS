<template>
<div class="hero-head">
    <div class="container is-fluid">
        <div class="tile is-ancestor has-header-top-margin">
            <div class="tile is-parent is-2 is-vertical is-hidden-touch">
                <div class="image tile is-child">
                    <router-link to="/"><img src='/public/front/imgs/logo/logo.svg' alt='Logo' title='App Logo' /></router-link>
                </div>
            </div>
            <div class="tile is-vertical is-parent">
                <div class="columns is-centered is-child">
                    <div class="column is-10 has-text-centered">
                        <p class="title is-3">OpenINED</p>
                        <p class="subtitle is-5">L'archive ouverte de l'Ined</p>
                        <!--<widget-stats form="test_form" :infos="[]" />-->
                    </div>
                </div>
            </div>
            <div class="tile is-parent is-2 is-vertical">
                <p class="tile is-child" v-if="fullname != null">
                    <b-dropdown position="is-bottom-left">
                        <a class="navbar-item" slot="trigger">
                            <span>{{fullname}}</span>
                            <b-icon icon="caret-down"></b-icon>
                        </a>

                        <b-dropdown-item has-link>
                            <router-link class="dropdown-item" to="/u/1/profile">{{lang('f_my_profile')}}</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item has-link>
                            <router-link class="dropdown-item" to="/search?author=1">{{lang('f_my_deposit', {}, 'other')}}</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item has-link>
                            <router-link class="dropdown-item" to="/u/1/favorites">
                                {{lang('f_registered_search', {}, 'other')}}
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item has-link>
                            <a class="dropdown-item" @click="logout">
                                {{lang('f_logout')}}
                            </a>
                        </b-dropdown-item>
                    </b-dropdown>
                </p>
                <p v-else class="tile is-child">
                    <router-link class="navbar-item" slot="trigger" to="/login?redirect=%2F">
                        <span>Log in</span>
                    </router-link>
                </p>
                <p class="tile is-child">
                    <a class="navbar-item" slot="trigger">
                        <span>FR</span>
                    </a>
                    <a class="navbar-item" slot="trigger">
                        <span>EN</span>
                    </a>
                </p>
            </div>
        </div>
    </div>
    <navbar />
</div>
</template>

<script>
    module.exports = require('./Header');
</script>
