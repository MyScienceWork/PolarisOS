<template>
<div class="hero-body">
    <div class="container is-fluid" v-if="author">
        <div class="columns is-centered">
            <div class="column is-3 card-equal-height">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img v-if="author.avatar && author.avatar.trim() !== ''" :src="`/public/front/imgs/avatars/${author.avatar}`" :alt="user.fullName">
                            <img v-else src="/public/front/imgs/icons/person-placeholder.png" :alt="user.fullName">
                        </figure>
                    </div>
                </div> <!-- card image user profile -->
                <h4 class="has-small-top-margin title is-4">{{user.firstName || ''}} {{user.lastName || ''}}</h4>
            </div>
            <div class="column is-9">
                <div class="card card-equal-height">
                        <div class="columns is-centered" v-if="!author">
                            <p v-html="lang('l_no_information_for_author_yet')" />
                        </div>
                        <div v-else class="columns is-centered">
                            <div class="column">
                                <template v-if="author.summary">
                                    <div class="columns is-centered">
                                        <div class="column">
                                            <h5 class="title is-4">{{lang('l_summary')}}</h5>
                                            <p v-html="author.summary"></p>
                                        </div>
                                    </div>
                                </template>
                                
                                <template v-if="author.experiences && author.experiences.length > 0">
                                    <div class="columns is-centered">
                                        <div class="column">
                                            <h5 class="title is-4">{{lang('l_experience', {}, 'other')}}</h5>
                                            <article class="media" v-for="exp in author.experiences">
                                                <div class="media-content">
                                                    <div class="content">
                                                        <p>
                                                            <strong>{{lang(exp.title)}}</strong>
                                                            <br />
                                                            <span v-if="exp.end">{{exp.start}} - {{exp.end}}</span>
                                                            <span v-else>{{lang('l_from')}} {{exp.start}}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </template>
                                
                                <template v-if="author.studies && author.studies.length > 0">
                                    <div class="columns is-centered">
                                        <div class="column">
                                            <h5 class="title is-4">{{lang('l_study', {}, 'other')}}</h5>
                                            <article class="media" v-for="exp in author.studies">
                                                <div class="media-content">
                                                    <div class="content">
                                                        <p>
                                                            <strong>{{lang(exp.title)}}</strong>
                                                            <br />
                                                            <span v-if="exp.end && exp.end.trim() !== ''">{{exp.start}} - {{exp.end}}</span>
                                                            <span v-else>{{lang('l_in')}} {{exp.start}}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="hasAddress || hasExternal">
                                    <div class="columns is-centered">
                                        <div class="column">
                                            <h5 class="title is-4">{{lang('l_contact_me')}}</h5>
                                            <div v-if="hasAddress">
                                                <p class="has-small-bottom-margin has-text-vcentered">
                                                    <span class="icon is-medium">
                                                        <i class="fa fa-2x fa-envelope"></i> 
                                                    </span>
                                                    <span class="has-small-left-margin">{{author.address.address}}<span v-if="author.address.city">, {{author.address.city}}</span></span>
                                                </p>
                                            </div>
                                            <div v-if="hasExternal">
                                                <p v-if="author.external.orcid" class="has-text-vcentered has-small-bottom-margin">
                                                    <span class="icon is-medium">
                                                        <img src='/public/front/imgs/icons/orcid.png' alt='Orcid Icon' width="32" /> 
                                                    </span>
                                                    <a class="has-small-left-margin" :href='`https://orcid.org/${author.external.orcid}`'>{{author.external.orcid}}</a></p>
                                                <p v-if="author.external.skype" class="has-text-vcentered has-small-bottom-margin">
                                                    <span class="icon is-medium">
                                                        <i class="fa fa-2x fa-skype"></i> 
                                                    </span>
                                                    <span class="has-small-left-margin">{{author.external.skype}}</span></p>
                                                <p v-if="author.external.website" class="has-text-vcentered has-small-bottom-margin">
                                                    <span class="icon is-medium">
                                                        <i class="fa fa-2x fa-globe"></i> 
                                                    </span>
                                                    <a class="has-small-left-margin" :href='`${author.external.website}`'>{{author.external.website}}</a>
                                                </p>
                                                <p v-if="author.external.twitter" class="has-text-vcentered has-small-bottom-margin">
                                                    <span class="icon is-medium">
                                                        <i class="fa fa-2x fa-twitter"></i> 
                                                    </span>
                                                    <a class="has-small-left-margin" :href='`https://www.twitter.com/${author.external.twitter}`'>{{author.external.twitter}}</a>
                                                </p>
                                                <p v-if="author.external.linkedin" class="has-text-vcentered">
                                                    <span class="icon is-medium">
                                                        <i class="fa fa-2x fa-linkedin"></i> 
                                                    </span>
                                                    <a class="has-small-left-margin" :href='`https://www.linkedin.com/in/${author.external.linkedin}`'>{{author.external.linkedin}}</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="columns is-centered" v-if="author">
                            <div class="column">
                                <h5 class="title is-4">{{lang('l_publication', {}, 'other')}}</h5>
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
                </div> <!-- card details -->
            </div>
        </div> <!-- columns -->
    </div>
</div>
</template>

<script>
module.exports = require('./UserProfile');
</script>
