<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-3 card-equal-height">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img :src="avatar" :alt="fullname">
                        </figure>
                    </div>
                </div> <!-- card image user profile -->
                <h4 class="has-small-top-margin title is-4">{{fullname}}</h4>
                <h5 v-if="user.about_me" class="title is-5">{{lang('l_about_me')}}</h5>
                <p v-if="user.about_me">{{user.about_me}}</p>
                <!--<h5 class="title is-5">{{lang('l_get_social')}}</h5>-->
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
                            <!--<li :class="{'is-active': state.current_tab === 3, 'is-red': true}">
                                <a @click.prevent="update_tab(3)">
                                    {{lang('f_registered_search', {}, 'other')}}
                                </a>
                                </li>-->
                        </ul>
                    </div>
                    <div v-if="state.current_tab === 0"> <!-- overview -->
                        <div class="columns is-centered" v-if="affiliations.length === 0 && !author">
                            <p v-html="lang('l_no_information_for_author_yet')" />
                        </div>
                        <div class="columns is-centered" v-if="affiliations.length > 0">
                            <div class="column">
                                <h5 class="title is-5">{{lang('l_affiliation', {}, 'other')}}</h5>
                                <article class="media" v-for="aff in affiliations">
                                    <div class="media-content">
                                        <div class="content">
                                            <p>
                                                <strong>{{lang(aff.institution.name)}}</strong>
                                                <br />
                                                <span v-if="aff.to">{{aff.from}} - {{aff.to}}</span>
                                                <span v-else>{{lang('l_from')}} {{aff.from}}</span>
                                                <br />
                                                <small v-for="team in aff.teams">{{lang(team._id)}}<br /></small>
                                                <small><strong>{{lang(aff.institution.country)}}</strong></small>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div class="columns is-centered" v-if="author">
                            <div class="column">
                                <h5 class="title is-5">{{lang('l_publication', {}, 'other')}}</h5>
                                <div class="columns is-centered">
                                    <div class="column is-10">
                                        <search-bar 
                                        :search-sink="state.sinks.creations.publication_search"
                                        :default-search="search_param_in_query"
                                        :use-favorites="false"
                                        color="red"
                                        placeholder="l_search_in_publications"
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div class="columns is-centered">
                                    <div class="column">
                                        <search-results 
                                        :search-sink="state.sinks.creations.publication_search"
                                        :result-sink="state.sinks.reads.publication"
                                        :search-path="state.paths.reads.publication"
                                        :search-query="search_publications_query"
                                        search-type="publication"
                                        :use-default-query="true"
                                        :default-query="default_search_publications_query"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="state.current_tab === 1 && state.loggedIn"> <!-- account -->
                        <h4 class="title is-4 has-no-bottom-margin">{{lang('f_user_general_settings')}}</h4>
                        <hr class="hr-section "/>
                        <dynamic-form :form="user_forms('user_front_general_settings')" :cform="state.sinks.creations.user"/>
                        
                        <h4 class="title is-4 has-medium-top-margin has-no-bottom-margin">{{lang('f_user_affiliations')}}</h4>
                        <hr class="hr-section" />
                        
                        <dynamic-form v-if="author" :form="user_forms('user_front_affiliations')" :cform="state.sinks.creations.user"/>
                        <div v-else>
                            <p>{{lang('f_no_author_connected')}}</p>
                            <div class="field is-grouped">
                                <div class="control">
                                    <button 
                                        type="submit" @click.prevent="send_author_request"
                                        class="button button-background-blue"
                                        >{{lang('f_click_here_to_send_author_request')}}</button>
                                </div>
                            </div>
                            <article class="message is-success">
                            <div class="message-body">
                                {{lang('f_author_request_successfully_sent')}}
                            </div>
                            </article>
                            <article class="message is-danger">
                            <div class="message-body">
                                {{lang('f_author_request_failed')}}
                            </div>
                            </article>
                        </div>
                        <h4 class="title is-4 has-medium-top-margin has-no-bottom-margin">{{lang('f_user_external_ids')}}</h4>
                        <hr class="hr-section" />
                        <dynamic-form :form="user_forms('user_front_external_ids')" :cform="state.sinks.creations.user"/>
                    </div> <!-- account -->
                    <div v-else-if="state.current_tab === 2 && state.loggedIn && user && user._id"> <!-- my deposits -->
                        <div class="columns is-centered">
                            <div class="column is-10">
                                <search-bar 
                                    :search-sink="state.sinks.creations.deposit_search"
                                    :default-search="search_param_in_query"
                                    :use-favorites="false"
                                    color="red"
                                    placeholder="l_search_in_deposits"
                                />
                            </div>
                        </div>
                        <hr />
                        <div class="columns is-centered">
                            <div class="column">
                                <search-results 
                                :search-sink="state.sinks.creations.deposit_search"
                                :result-sink="state.sinks.reads.deposit"
                                :search-path="state.paths.reads.publication"
                                :search-query="search_query"
                                search-type="publication"
                                :use-default-query="true"
                                :default-query="default_search_query"
                                />
                            </div>
                        </div>
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
