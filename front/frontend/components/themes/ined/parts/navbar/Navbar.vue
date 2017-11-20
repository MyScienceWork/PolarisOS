<template>
<nav role="navigation" aria-label="main navigation" class="navigation-menu">
    <div class="columns is-centered">
        <div
            v-for="(item, i) in state.routes"
            v-if="item.navbar"
            :class="`column navbar-item-${state.colors[i]} navbar-item ${active_idx == i ? 'is-active' : ''}`"
        >
            <router-link class="" :to='item.path'>{{lang(item.name)}}</router-link>
        </div>
    </div>
    <div v-if="active_idx !== -1" :class="`breadcrumb breadcrumb-${state.colors[active_idx]}`">
        <div class="breadcrumb-content">
            <router-link class="" to='/'><i class="fa fa-home"></i></router-link>
            <a>{{lang(state.routes[active_idx].name)}}</a>
        </div>
    </div>
</nav>
</template>

<script>
    module.exports = require('./Navbar');
</script>
