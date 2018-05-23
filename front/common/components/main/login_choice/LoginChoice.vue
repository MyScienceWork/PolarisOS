<template>
    <div v-if="!default_cas_sso">
        <div class="columns is-centered">
            <div class="column is-6">
                <h3 class="title has-text-grey">{{lang('f_login_choice_header')}}</h3>
                <p class="subtitle has-text-grey">{{lang('f_login_choice_explanation')}}</p>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-4">
                <card color="red" class="card-equal-height clickable-card-red has-cursor-pointer">
                    <router-link tag="div" :to="login_url" slot="card-content">
                        <h2 class="has-text-centered icon title is-2 is-large">
                            <i class="fa fa-users"></i>
                        </h2>
                        <p class="is-4 subtitle">
                            {{lang('l_use_default_login')}} 
                        </p>
                    </router-link>
                </card>
            </div>
            <div class="column is-2 is-vcentered is-justify-center" v-if="generate_cas_sso_url($route.query.redirect)">
                <p class="is-4 title"><strong>{{lang('l_or')}}</strong></p>
            </div>
            <div class="column is-4" v-if="generate_cas_sso_url($route.query.redirect)">
                <card color="red" class="card-equal-height clickable-card-red has-cursor-pointer">
                    <div slot="card-content" @click.prevent="redirect_to_cas(generate_cas_sso_url($route.query.redirect))">
                        <h2 class="has-text-centered icon title is-2 is-large">
                            <i class="fa fa-lock"></i>
                        </h2>
                        <p class="is-4 subtitle">
                            {{lang('l_use_cas_sso_login')}} 
                        </p>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = require('./LoginChoice')
</script>
