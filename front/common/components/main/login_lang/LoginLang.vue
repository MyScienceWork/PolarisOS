<template>
    <div>
        <p class="tile is-child has-text-centered" v-if="fullname != null">
            <b-dropdown position="is-bottom-left">
                <a class="navbar-item is-justify-center" slot="trigger">
                    <span>{{fullname}}</span>
                    <b-icon icon="caret-down"></b-icon>
                </a>

                <b-dropdown-item has-link class="has-text-centered">
                    <router-link v-if="!backoffice" class="dropdown-item" :to="`/u/${user_id}/profile`">{{lang('f_my_profile')}}</router-link>
                    <a v-else class="dropdown-item" :href="`/u/${user_id}/profile`" target="_blank">{{lang('f_my_profile')}}</a>
                </b-dropdown-item>
                <b-dropdown-item has-link class="has-text-centered">
                    <router-link  v-if="!backoffice" class="dropdown-item" :to="`/u/${user_id}/profile?t=2`">{{lang('f_my_deposit', {}, 'other')}}</router-link>
                    <a v-else class="dropdown-item" :href="`/u/${user_id}/profile?t=2`" target="_blank">{{lang('f_my_deposit', {}, 'other')}}</a>
                </b-dropdown-item>
                <b-dropdown-item class="has-text-centered" has-link v-if="'administrator' in roles">
                    <a v-if="!backoffice" class="dropdown-item" href="/admin" target="_blank">{{lang('f_admin')}}</a>
                    <router-link v-else class="dropdown-item" to="/admin">{{lang('f_admin')}}</router-link>
                </b-dropdown-item>
                <b-dropdown-item has-link class="has-text-centered">
                    <router-link  v-if="!backoffice" class="dropdown-item" :to="`/u/${user_id}/profile?t=3`">{{lang('f_bibliographic_report', {}, 'other')}}</router-link>
                    <a v-else class="dropdown-item" :href="`/u/${user_id}/profile?t=3`" target="_blank">{{lang('f_bibliographic_report', {}, 'other')}}</a>
                </b-dropdown-item>
                <!--<b-dropdown-item has-link class="has-text-centered">
                    <router-link class="dropdown-item" :to="`/u/${user_id}/profile?t=4`">
                        {{lang('f_registered_search', {}, 'other')}}
                    </router-link>
                    </b-dropdown-item>-->
                <b-dropdown-item has-link class="has-text-centered">
                    <a class="dropdown-item" @click="logout(backoffice)">
                        {{lang('f_logout')}}
                    </a>
                </b-dropdown-item>
            </b-dropdown>
        </p>
        <p v-else class="tile is-child has-text-centered">
            <router-link v-if="!backoffice" class="navbar-item is-justify-center" slot="trigger" to="/login/choice?redirect=%2F">
                <span>{{lang('f_login')}}</span>
            </router-link>
            <router-link v-else class="navbar-item is-justify-center" slot="trigger" to="/admin/login/choice?redirect=%2F">
                <span>{{lang('f_login')}}</span>
            </router-link>
        </p>
        <p class="tile is-child has-text-centered pipe-list" v-if="languages.length > 0">
            <ul>
                <li v-for="item in languages"><a class="has-text-red swap" @click.prevent="change_language(item)">{{item}}</a></li>
            </ul>
        </p>
        <p class="tile is-child has-text-centered" v-if="backToWebsite">
            <a class="has-text-red swap" :href='website' :title='website'>{{lang('l_go_to_website')}}</a>
        </p>
    </div>
</template>

<script>
    module.exports = require('./LoginLang');
</script>
