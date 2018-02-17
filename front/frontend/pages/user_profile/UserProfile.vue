<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-3 card-equal-height">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" :alt="user.fullname || 'No user'">
                        </figure>
                    </div>
                </div> <!-- card image user profile -->
                <h4 class="title is-4">{{user.firstname || ''}} {{user.lastname || ''}}</h4>
                <h5 v-if="user.about_me" class="title is-5">{{lang('l_about_me')}}</h5>
                <p v-if="user.about_me">{{user.about_me}}</p>
                <h5 class="title is-5">{{lang('l_get_social')}}</h5>
            </div>
            <div class="column is-9">
                <div class="card card-equal-height">
                    <div class="tabs is-centered is-toggle" v-if="state.loggedIn">
                        <ul>
                            <li :class="{'is-active': state.current_tab === 0, 'is-red': true}">
                                <a @click.prevent="update_tab(0)">{{lang('l_overview')}}</a>
                            </li>
                            <li :class="{'is-active': state.current_tab === 1, 'is-red': true}">
                                <a @click.prevent="update_tab(1)">{{lang('l_my_account')}}</a>
                            </li>
                            <li :class="{'is-active': state.current_tab === 2, 'is-red': true}">
                                <a @click.prevent="update_tab(2)">{{lang('f_my_deposit', {}, 'other')}}</a>
                            </li>
                            <li :class="{'is-active': state.current_tab === 3, 'is-red': true}">
                                <a @click.prevent="update_tab(3)">
                                    {{lang('f_registered_search', {}, 'other')}}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div v-if="state.current_tab === 0"> <!-- overview -->
                        <div class="columns is-centered">
                            <div class="column" v-if="last_deposits.length > 0">
                                <h5 class="title is-5">{{lang('l_last_deposits')}}</h5>
                                <last-deposits :items="[]" />  
                            </div>
                            <div class="column" v-else>
                                <h5 class="has-text-centered title is-5">{{lang('l_no_deposits_yet')}}</h5>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="state.current_tab === 1"> <!-- account -->
                    </div>
                    <div v-else-if="state.current_tab === 2"> <!-- my deposits -->
                    </div>
                </div> <!-- card details -->
            </div>
        </div> <!-- columns -->
    </div>
</div>
</template>

<script>
module.exports = require('./UserProfile');
</script>
