<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-3 card-equal-height">
                <div class="card">
                   <div class="card-image">
                       <!--
                       <figure class="image">
                          <img :src="avatar" :alt="fullname">
                        </figure>
                         -->
                    </div>
                </div>
                <!-- card image user profile -->
                <h4 class="has-small-top-margin title is-4">{{fullname}}</h4>
                <div v-if="!user.public_profile">
                    <p>{{lang('l_profile_not_public')}}</p>
                </div>
                <div class="" v-else-if="affiliations.length > 0">
                    <!--<h5 class="title is-5">{{lang('l_affiliation', {}, 'other')}}</h5>-->
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
            <div class="column is-9">
                <div class="card card-equal-height">
                    <div class="is-hidden-tablet" v-if="state.loggedIn">
                        <b-dropdown position="is-bottom-left">
                            <button class="has-small-top-margin has-small-bottom-margin button is-red" slot="trigger">
                                <span class="icon is-small">
                                    <i class="fa fa-bars"></i>
                                </span>
                            </button>

                            <b-dropdown-item has-link
                                :class="{'is-active': state.current_tab === 0}"
                            >
                                <a @click.prevent="update_tab(0)">{{lang('l_overview')}}</a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link
                                :class="{'is-active': state.current_tab === 1}"
                            >
                                <a @click.prevent="update_tab(1)">{{lang('l_my_account')}}</a>
                            </b-dropdown-item>

                            <b-dropdown-item has-link
                                :class="{'is-active': state.current_tab === 2}"
                            >
                                <a @click.prevent="update_tab(2)">{{lang('f_my_deposit', {}, 'other')}}</a>
                            </b-dropdown-item>

                            <b-dropdown-item has-link
                                :class="{'is-active': state.current_tab === 3}"
                            >
                                <a @click.prevent="update_tab(3)">
                                    {{lang('f_bibliographic_report', {}, 'other')}}
                                </a>
                            </b-dropdown-item>
                            <!--
                            <b-dropdown-item has-link
                                             :class="{'is-active': state.current_tab === 4}"
                            >
                                <a @click.prevent="update_tab(4)">{{lang('f_my_projects', {}, 'other')}}</a>
                            </b-dropdown-item>
                            -->
                        </b-dropdown>
                    </div>
                    <div class="tabs is-centered is-toggle is-hidden-mobile" v-if="state.loggedIn">
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
                                    {{lang('f_bibliographic_report', {}, 'other')}}
                                </a>
                            </li>
                            <!--
                            <li :class="{'is-active': state.current_tab === 4, 'is-red': true}">
                                <a @click.prevent="update_tab(4)">
                                    {{lang('f_registered_search', {}, 'other')}}
                                </a>
                                </li>
                                -->
                            <!--
                            <li :class="{'is-active': state.current_tab === 4, 'is-red': true}">
                                <a @click.prevent="update_tab(4)">{{lang('f_my_projects', {}, 'other')}}</a>
                            </li>
                            -->
                        </ul>
                    </div>
                    <div v-if="state.current_tab === 0"> <!-- overview -->
                        <div class="columns is-centered" v-if="affiliations.length === 0 && (!author || !author._id)">
                            <p v-html="lang('l_no_information_for_author_yet')" />
                        </div>
                        <div class="columns is-centered" v-if="author && author._id">
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
                                        :show-advanced-search.sync="show_advanced_search"
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
                                        :show-status="loggedIn"
                                        :default-sorts="['-dates.publication']"
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
                        <!--<hr class="hr-section" /> -->
                        <h5 class="subtitle is-5 has-no-bottom-margin">
                            {{lang('f_user_identifier_&_external_profile')}}
                            <b-tooltip class="is-dark" :label="lang('l_user_identifier_help')" multilined
                                v-if="lang('l_user_identifier_help').trim() !== ''"
                            >
                                <span class="icon has-text-info">
                                  <i class="fa fa-question-circle"></i>
                                </span>
                            </b-tooltip>
                        </h5>
                        <dynamic-form :form="user_forms('user_front_external_ids')" :cform="state.sinks.creations.user"/>
                        <button
                            @click.prevent="save('user')"
                            class="button button-background-green has-small-top-margin has-small-bottom-margin">
                            {{lang('f_save_user_profile')}}
                        </button>
                        <article class="message is-success" v-if="state.statuses.creations.user === 'ok'">
                            <div class="message-body">
                                {{lang('f_user_save_success')}}
                            </div>
                        </article>
                        <article class="message is-danger" v-if="state.statuses.creations.user === 'nok'">
                            <div class="message-body">
                                {{lang('f_user_save_failed')}}
                            </div>
                        </article>
                        <h4 class="title is-4 has-medium-top-margin has-no-bottom-margin">{{lang('f_user_affiliations', {}, 'other')}}</h4>
                        <hr class="hr-section" />

                        <div v-if="author && author._id">
                            <div class="message is-info">
                                <div class="message-body">{{lang('l_user_affiliations_status')}}</div>
                            </div>
                            <dynamic-form :form="user_forms('user_front_affiliations')" :cform="state.sinks.creations.author"/>
                            <a
                                @click.prevent="save('author')"
                                class="button button-background-green has-small-top-margin has-small-bottom-margin">
                                {{lang('f_save_affiliations')}}
                            </a>
                            <article class="message is-success" v-if="state.statuses.creations.author === 'ok'">
                                <div class="message-body">
                                    {{lang('f_affiliations_save_success')}}
                                </div>
                            </article>
                            <article class="message is-danger" v-if="state.statuses.creations.author === 'nok'">
                                <div class="message-body">
                                    {{lang('f_affiliations_save_failed')}}
                                </div>
                            </article>
                        </div>
                        <div v-else>
                            <p class="has-text-centered" v-html="lang('f_no_author_connected')"></p>
                            <div class="field is-grouped">
                                <div class="control">
                                    <a
                                        type="submit" @click.prevent="send_author_request"
                                        class="button button-background-blue"
                                        >{{lang('f_click_here_to_send_author_request')}}
                                    </a>
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
                                    :show-advanced-search.sync="show_advanced_search"
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
                                :search-query="deposit_query"
                                search-type="publication"
                                :use-default-query="true"
                                :default-query="default_deposit_query"
                                :show-status="true"
                                :default-sorts="['-dates.publication']"
                                />
                            </div>
                        </div>
                    </div> <!-- my deposits -->
                    <div v-else-if="state.current_tab === 3"> <!-- bibliographic reports -->
                        <div class="columns">
                            <div class="column">
                                <bibliographic-export />
                            </div>
                        </div>
                    </div>
                    <div v-else-if="state.current_tab === 4"> <!-- my projects -->
                        <project></project>
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
