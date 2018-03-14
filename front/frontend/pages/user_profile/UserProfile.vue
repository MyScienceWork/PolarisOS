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
                <h4 class="has-small-top-margin title is-4">{{user.firstname || ''}} {{user.lastname || ''}}</h4>
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
                    <div v-else-if="state.current_tab === 1"> <!-- account -->
                    </div>
                    <div v-else-if="state.current_tab === 2"> <!-- my deposits -->
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
