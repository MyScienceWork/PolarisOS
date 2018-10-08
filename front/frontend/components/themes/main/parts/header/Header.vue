<template>
<div class="hero-head">
    <div class="container is-fluid">
        <div class="is-vcentered tile is-ancestor">
            <div class="tile is-parent is-2 is-vertical is-hidden-touch">
                <div class="tile image is-child">
                    <router-link to="/"><img :src='$store.state.global_config.gui.logo_left' alt='LogoLeft' title='Organization Logo' /></router-link>
                </div>
            </div>
            <div class="tile is-parent is-8 is-vertical has-header-top-margin">
                <div v-if="$store.state.global_config.gui.logo_center" class="column has-text-centered">
                    <img :src='$store.state.global_config.gui.logo_center' alt='LogoCenter' title='App Logo' />
                </div>
                <div v-else class="column is-10 has-text-centered has-header-top-margin">
                    <p class="title is-3">{{lang('l_site_title')}}</p>
                    <p class="subtitle is-5">{{lang('l_site_punchline')}}</p>
                    <!--<widget-stats form="test_form" :infos="[]" />-->
                </div>
            </div>
            <div class="tile is-parent is-2 is-vertical has-header-top-margin">
                <login-lang :languages="languages" :back-to-website="true" :website="lang('l_back_to_website_url')" />
            </div>
            <!-- <search class="is-fixed-right" :show-advanced-search="false" :show-favorites="false" key="header-searchbar" :collapsible="true" /> -->
        </div>
    </div>
    <navbar :menu="menu" />
</div>
</template>

<script>
    module.exports = require('./Header');
</script>
