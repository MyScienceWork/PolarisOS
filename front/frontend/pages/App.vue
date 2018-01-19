<template>
<loader id="app" v-if="Object.keys($store.state.lang_content).length === 0"></loader>
<div v-else id="app" class="hero is-fullheight">
    <router-view name="header"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
</div>
</template>

<script>
module.exports = require('./App'); 
</script>
