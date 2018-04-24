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
                        <p class="title is-3">{{lang('l_site_title')}}</p>
                        <p class="subtitle is-5">{{lang('l_site_punchline')}}</p>
                        <!--<widget-stats form="test_form" :infos="[]" />-->
                    </div>
                </div>
            </div>
            <div class="tile is-parent is-2 is-vertical">
                <login-lang :languages="languages" :back-to-website="true" website="https://www.ined.fr" />
            </div>
        </div>
        <div class="columns">
            <div class="column is-4 is-offset-8">
                <search :show-advanced-search="false" :show-favorites="false" key="header-searchbar" />
            </div>
        </div>
    </div>
    <navbar :menu="menu" />
</div>
</template>

<script>
    module.exports = require('./Header');
</script>
