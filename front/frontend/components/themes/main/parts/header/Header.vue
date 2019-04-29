<template>
<div class="hero-head">
    <div class="container is-fluid">
        <div class="columns is-ancestor is-centered">
            <div class="column is-vcentered is-2 is-hidden-touch">
                <div class="container is-vcentered">
                    <figure class="image is-vcentered">
                        <router-link to="/"><img :src='$store.state.global_config.gui.logo_left' alt='LogoLeft' title='Organization Logo' /></router-link>
                    </figure>
                </div>
            </div>
            <div v-if="$store.state.global_config.gui.logo_center" class="column is-vcentered has-text-centered is-8">
                <div class="container">
                    <img :src='$store.state.global_config.gui.logo_center' alt='LogoCenter' title='App Logo' />
                </div>
            </div>
            <div v-else class="column is-vertical has-text-centered">
                <p class="title is-3">{{lang('l_site_title')}}</p>
                <p class="subtitle is-5">{{lang('l_site_punchline')}}</p>
                <!--<widget-stats form="test_form" :infos="[]" />-->
            </div>
            <!--
            <div class="column is-vcentered container has-text-centered is-2 is-vertical">
                <div class="container">
                    <login-lang :languages="languages" :back-to-website="true" :website="lang('l_back_to_website_url')" />
                </div>
            </div>
            -->
            <!-- <search class="is-fixed-right" :show-advanced-search="false" :show-favorites="false" key="header-searchbar" :collapsible="true" /> -->
        </div>
    </div>
    <navbar :menu="menu" />
</div>
</template>

<script>
    module.exports = require('./Header');
</script>
