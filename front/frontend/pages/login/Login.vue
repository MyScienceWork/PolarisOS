<template>
<div class="hero-body">
    <div class="container has-text-centered" v-if="!this.$route.query.ticket">
        <div class="columns is-centered">
            <div class="column is-6">
                <h3 class="title has-text-grey">{{lang('f_login_header')}}</h3>
                <p class="subtitle has-text-grey">{{lang('f_login_to_proceed')}}
                </p>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-4">
                <div class="box">
                    <form v-if="!state.forgot_password" >
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-large" :placeholder="lang('f_your_email')"
                                        autofocus="" type="email" v-model="state.email"
                                        @keyup.enter="authenticate"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-large"
                                        :placeholder="lang('f_your_password')"
                                        type="password" v-model="state.password"
                                        @keyup.enter="authenticate"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <label class="checkbox">
                                        <input type="checkbox">
                                        {{lang('f_remember_me')}}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <a @click="authenticate" class="button is-block is-info is-large">{{lang('f_login')}}</a>
                    </form>
                    <form v-else>
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-large" :placeholder="lang('f_your_email')"
                                               autofocus="" type="email" v-model="state.email"
                                               @keyup.enter="forgot_password"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a @click="forgot_password" class="button is-block is-info is-large">{{lang('f_forgot_password')}}</a>
                    </form>

                    <p class="redify" v-if="login_status === 'fail' && !state.forgot_password">{{lang('f_check_login')}}</p>
                    
                    <p v-if="forgot_password_status === 'success' && state.forgot_password">{{lang('f_password_sent')}}</p>
                    <p v-if="forgot_password_status !== 'success' && state.forgot_password">{{lang('f_check_email')}}</p>
                </div>
                <p class="has-text-grey">
                <!--<a class="has-text-grey" href="../">{{lang('f_signup')}}</a> &nbsp;·&nbsp;-->

                <a v-if="state.forgot_password" class="has-text-grey" @click="show_login" >{{lang('f_login')}}</a>
                <a v-if="!state.forgot_password" class="has-text-grey" @click="show_forgot_password" >{{lang('f_forgot_password')}}</a>
                </p>
            </div>
        </div>
    </div>
    <div class="container" v-else>
        <div class="columns is-centered">
            <loader></loader>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Login');
</script>
