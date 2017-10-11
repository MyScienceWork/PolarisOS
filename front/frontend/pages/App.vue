<template>
<div id="app" class="hero is-fullheight">
    <router-view name="header"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
</div>
</template>

<script>
module.exports = {
  name: 'App'
}
</script>
