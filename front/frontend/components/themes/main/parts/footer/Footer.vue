<template>
<div class="hero-foot">
    <footer>
        <div class="columns footer-disclaimer is-centered">
            <div class="column">
                <router-link
                    :alt="lang('l_footer_disclaimer')"
                    :to="{ path: '/about', query: {legacy_notice: 'true'}}">
                    <span v-html="lang('l_footer_disclaimer')"></span>
                </router-link>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
    module.exports = require('./Footer');
</script>
