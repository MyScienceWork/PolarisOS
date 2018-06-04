<template>
<header class="section">
    <div class="container is-fluid is-marginless">
        <div class="tile is-ancestor">
            <div class="tile is-parent is-2 is-vertical is-hidden-touch">
                <div class="image tile is-child is-16by9">
                    <img :src='$store.state.global_config.gui.logo' alt='Logo' title='App Logo' />
                </div>
            </div>
            <div class="tile is-vertical">
            </div>
            <div class="tile is-parent is-2 is-vertical">
                <login-lang :website="lang('l_back_to_website_url')" :languages="languages" :back-to-website="true" :backoffice="true" />
            </div>
        </div>
    </div>
</header>
</template>

<script>
    module.exports = require('./Header');
</script>
