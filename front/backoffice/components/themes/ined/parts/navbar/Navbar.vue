<template>
<div class="holy-grail-nav is-fullheight">
<aside class="menu">
        <p class="menu-label menu-label-red">
        General
        </p>
        <ul class="menu-list menu-list-red">
            <li><router-link class="is-active" to="/admin">Overview</router-link></li>
            <li><a>Users</a></li>
            <li><a>Reviews</a></li>
        </ul>
        <p class="menu-label menu-label-orange">
        Administration
        </p>
        <ul class="menu-list menu-list-orange">
            <li>
            <a @click="show" :class="`${isShown ? 'is-active-dropdown' : ''}`">
                Data sources
                <span v-if="!isShown" class="is-pulled-right"><i class="fa fa-chevron-up"></i></span>
                <span v-else class="is-pulled-right"><i class="fa fa-chevron-down"></i></span>
            </a>
            <transition name="menu-dropdown">
                <ul class="menu-dropdown" v-if="isShown">
                    <li><a>INED Typology</a></li>
                    <li><a>Authors</a></li>
                    <li><a>Journals</a></li>
                </ul>
            </transition>
            </li>
            <li><a>Publications</a></li>
            <li><a>CSL Management</a></li>
        </ul>
        <p class="menu-label menu-label-purple">
        Advanced 
        </p>
        <ul class="menu-list menu-list-purple">
            <li>
                <a class="is-active-dropdown">
                    OAI-PMH
                    <span class="is-pulled-right"><i class="fa fa-chevron-down"></i></span>
                </a>
                <transition name="menu-dropdown">
                <ul class="menu-dropdown" v-if="true">
                    <li><a>CAIRN</a></li>
                    <li><a>ORBi</a></li>
                    <li><a>MyScienceWork</a></li>
                </ul>
                </transition>
            </li>
            <li><a>API management</a></li>
            <li><a>Handle management</a></li>
        </ul>
        </aside>
</div>
</template>

<script>
    module.exports = require('./Navbar');
</script>
