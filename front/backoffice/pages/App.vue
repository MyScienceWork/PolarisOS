<template>
<loader class="is-absolute" id="app" v-if="Object.keys($store.state.global_config).length === 0 || Object.keys($store.state.lang_content).length === 0"></loader>
<div v-else id="app" class="holy-grail">
    <router-view name="header"></router-view>
    <div class="holy-grail-body">
        <router-view></router-view>
        <router-view name="navbar"></router-view>
    </div>
    <router-view name="footer"></router-view>
</div>
</template>

<script>
module.exports = require('./App');
</script>
