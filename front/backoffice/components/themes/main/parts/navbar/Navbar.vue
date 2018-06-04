<template>
<div class="holy-grail-nav is-fullheight">
    <aside class="menu">
        <div v-for="(section, idx) in menus">
            <p :class="`menu-label menu-label-${state.colors[idx]}`">
                {{lang(section[0].section)}} 
            </p>
            <ul :class="`menu-list menu-list-${state.colors[idx]}`">
                <li v-for="item in section"><router-link exact active-class="is-active" :to="item.routes[0]">{{lang(item.name)}}</router-link></li>
            </ul>
        </div>
    </aside>
</div>
</template>

<script>
    module.exports = require('./Navbar');
</script>
