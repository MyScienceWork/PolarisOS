<template>
<div id="app" class="main-template" v-if="Object.keys($store.state.lang_content).length === 0">
    <loader class="is-absolute"></loader>
</div>
<div v-else id="app" :class="['hero', 'is-fullheight', $store.state.global_config.gui.css_template]">
    <router-view name="header" :menu="menu"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
</div>
</template>

<script>
module.exports = require('./App'); 
</script>
