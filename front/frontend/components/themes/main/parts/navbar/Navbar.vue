<template>
<nav role="navigation" aria-label="main navigation" :class="{ 'navigation-menu': true, 'navigation-menu-hidden': !showNavbar }">
    <div class="columns is-centered">
      <!--
        <router-link class="has-small-right-margin" to='/'> <span class="icon is-medium">
            <i class="fa fa-2x fa-home has-text-white" style="margin-top: 0.7em;"></i>
            </span>
        </router-link>
      -->
        <div
            v-for="(item, i) in menu_filtered_with_roles()"
            :class="`column is-paddingless navbar-item-${state.colors[i]} navbar-item ${active_idx == i ? 'is-active' : ''}`"
        >
            <b-dropdown hoverable v-if="item.submenus && item.submenus.length > 0" :class="`is-${state.colors[i]}`">
                <a
                    class="fullheight-center has-xmedium-padding"
                    @click.prevent="() => {}"
                    slot="trigger"
                >
                    {{lang(item.name)}}
                </a>
                <b-dropdown-item has-link v-for="(subitem, j) in item.submenus">
                    <router-link
                        class=""
                        :to='generate_route(subitem)'
                    >
                        {{lang(subitem.name)}}
                    </router-link>
                </b-dropdown-item>
            </b-dropdown>
            <router-link
                v-else
                class="fullheight-center has-xmedium-padding"
                :to="generate_route(item)"
            >
                {{lang(item.name)}}
            </router-link>
        </div>
            <search class="is-vcentered has-small-left-margin" :no-column="true" :show-advanced-search="false" :show-favorites="false" key="header-searchbar" :collapsible="true" />
        </div>
    </div>
    <div v-if="active_idx !== -1" :class="`breadcrumb breadcrumb-${state.colors[active_idx]}`">
        <div class="breadcrumb-content">
            <br/>
            <!-- <router-link class="" to='/'><i class="fa fa-home"></i></router-link> -->
            <!-- <a>{{lang(menu.elements[active_idx].name)}}</a> -->
        </div>
    </div>
</nav>
</template>

<script>
    module.exports = require('./Navbar');
</script>
