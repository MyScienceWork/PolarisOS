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
                    <div class="column is-10">
                        <widget-stats form="test_form" :infos="[]" />
                    </div>
                </div>
            </div>
            <div class="tile is-parent is-2 is-vertical">
                <p class="tile is-child">
                    <b-dropdown position="is-bottom-left">
                        <a class="navbar-item" slot="trigger">
                            <span>Corentin Ribeyre</span>
                            <b-icon icon="caret-down"></b-icon>
                        </a>

                        <b-dropdown-item has-link>
                            <router-link class="dropdown-item" to="/u/1/profile">{{lang('f_my_profile')}}</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item has-link>
                            <router-link class="dropdown-item" to="/u/1/deposits">{{lang('f_my_deposit', {}, 'other')}}</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>{{lang('f_registered_search', {}, 'other')}}</b-dropdown-item>
                        <b-dropdown-item has-link>{{lang('f_logout')}}</b-dropdown-item>
                    </b-dropdown>
                </p>
                <p class="tile is-child">
                <a href='#'>FR</a>&nbsp;|&nbsp;<a href='#'>EN</a>
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
