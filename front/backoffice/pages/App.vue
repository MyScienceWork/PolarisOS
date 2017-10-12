<template>
<div id="app" class="holy-grail">
    <router-view name="header"></router-view>
    <div class="holy-grail-body">
        <router-view></router-view>
        <router-view name="navbar"></router-view>
    </div>
    <router-view name="footer"></router-view>
</div>
</template>

<script>
module.exports = {
  name: 'App'
}
</script>
