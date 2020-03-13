<template>
<div class="hero-foot">
    <footer>
        <div class="columns footer-disclaimer is-centered">
            <div class="column">
                <a :href="'//www.mysciencework.com/'" target="_blank">
                    <span v-html="lang('l_footer_disclaimer')"></span>
                </a>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
    module.exports = require('./Footer');
</script>
