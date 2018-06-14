<template>
<div class="holy-grail-nav is-fullheight">
    <aside class="menu">
        <div v-for="(section, idx) in accessible_menus">
            <p :class="`menu-label menu-label-${state.colors[idx]}`" v-if="section.length > 0">
                {{lang(section[0].section)}} 
            </p>
            <ul :class="`menu-list menu-list-${state.colors[idx]}`" v-if="section.length > 0">
                <li v-intro="lang(item.intro || 'l_backoffice_menu_generic_help')" v-for="item in section"><router-link exact active-class="is-active" :to="item.routes[0]">{{lang(item.name)}}</router-link></li>
            </ul>
        </div>
    </aside>
</div>
</template>

<script>
    module.exports = require('./Navbar');
</script>
