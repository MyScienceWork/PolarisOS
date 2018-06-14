<template>
<div class="main-template" id="app" v-if="Object.keys($store.state.lang_content).length === 0"><loader class="is-absolute"></loader></div>
<div v-else id="app" :class="['holy-grail', $store.state.global_config.gui.css_template]">
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
