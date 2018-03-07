<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns" v-if="content_item && Object.keys(content_item).length > 0">
            <div class="column is-8">
                <div class="card card-equal-height card-with-tag">
                    <div class="card-header">
                        <div class="card-header-title">
                        </div>
                        <a href='#' class="card-header-icon card-header-tag" v-for="tt in titles" @click.prevent="activate_lang('title', tt.lang)">
                            <span :class="['tag is-purple', {'is-active': state.current_title.lang === tt.lang}]">{{tt.lang}}</span>
                        </a>
                    </div>
                    <div class="card-content content">
                        <h3 class="title is-3">{{state.current_title.content}}</h3>
                        <h5 class="title is-5" v-if="state.current_subtitle !== ''">{{state.current_subtitle.content}}</h5>
                        <p v-html="authors"></p>
                        <!--<p>
                        <strong>Olivier Michalon<sup>1</sup></strong>, 
                        <strong>Corentin Ribeyre<sup>2</sup></strong>, 
                        <strong>Marie Candito<sup>3</sup></strong>, 
                        <strong>Alexis Nasr<sup>1</sup></strong>
                        </p>-->
                        <!--<ol>
                            <li>LIF - Laboratoire d'informatique fondamentale de Marseille</li>
                            <li>Département de Linguistique - Université de Genève</li>
                            <li>ALPAGE - Analyse Linguistique Profonde à Grande Echelle</li>
                        </ol>-->
                        <p><strong v-html="lang('f_publication_type')"></strong> {{lang(content_item.denormalization.type.label)}}</p>
                        <p v-if="journal">{{journal}}</p>
                        <p v-if="book">{{book}}</p>
                        <p v-if="chapter">{{chapter}}</p>
                        <p v-if="conference">{{conference}}</p>
                        <p v-if="other_document">{{other_document}}</p>
                        <div class="card card-with-tag" v-if="state.current_abstract.content !== ''">
                            <div class="card-header">
                                <div class="card-header-title">
                                </div>
                                <a href='#' class="card-header-icon card-header-tag" v-for="ab in abstracts" @click.prevent="activate_lang('abstract', ab.lang)">
                                    <span :class="['tag is-purple', {'is-active': state.current_abstract.lang === ab.lang}]">{{ab.lang}}</span>
                                </a>
                            </div>
                            <div class="card-content">
                                <h4 class="subtitle is-5"><strong>{{lang('f_abstract')}}</strong></h4>
                                <p>
                                {{state.current_abstract}}
                                </p>
                            </div>
                        </div>
                        <p v-if="keywords('user')"><strong v-html="lang('f_publication_keyword', {}, 'other')"></strong> {{keywords('user')}}</p>
                        <p v-if="themes.length > 0"><strong v-html="lang('f_publication_theme', {}, 'other')"></strong>: {{themes.join(', ')}}</p>
                        <p><strong v-html="lang('f_publication_id')"></strong></p>
                        <p><a class="has-text-info" href='#' @click.prevent="see_more_metadata">{{lang('f_see_more_metadata')}}</a></p>
                        <div v-if="state.more_metadata">
                            <widget :collapsed="true">
                                <span slot="title">{{lang('f_publication_description')}}</span>
                                <div slot="body">
                                </div>
                            </widget>
                            <widget v-if="ids.length > 0" :collapsed="true">
                                <span slot="title">{{lang('f_publication_id_title')}}</span>
                                <div slot="body">
                                    <p v-for="id in ids"><strong>{{id.type.toUpperCase()}}</strong> : {{id._id}}</p>
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('f_publication_rights')}}</span>
                                <div slot="body">
                                    <p v-if="publication_version"><strong v-html="lang('f_publication_version')"></strong> {{lang(publication_version)}}</p>
                                    <p v-if="access_level"><strong v-html="lang('f_publication_access_level')"></strong> {{lang(access_level)}}</p>
                                    <p v-if="embargo"><strong v-html="lang('f_publication_embargo')"></strong></p>
                                    <p v-if="license"><strong v-html="lang('f_publication_license')"></strong> {{lang(license)}}</p>
                                    <p v-if="url"><strong v-html="lang('f_publication_url')"></strong> {{content_item.url}}</p>
                                    <p v-if="resources"></p>
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('f_publication_indexing')}}</span>
                                <div slot="body">
                                    <p v-if="keywords('user')"><strong v-html="lang('f_publication_keyword', {}, 'other')"></strong> {{keywords('user')}}</p>
                                    <p v-if="keywords('demovoc')"><strong v-html="lang('f_publication_demovoc_keyword', {}, 'other')"></strong> {{keywords('demovoc')}}</p>
                                    <p><strong v-html="lang('f_publication_theme', {}, 'other')"></strong> {{themes.join (', ')}}</p>
                                </div>
                            </widget>
                            <widget v-if="teams || collection || projects.length > 0 || surveys.length > 0" :collapsed="true">
                                <span slot="title">{{lang('f_publication_collection')}}</span>
                                <div slot="body">
                                    <p v-if="teams"><strong v-html="lang('f_publication_team')"></strong> {{lang(teams)}}</p>
                                    <p v-if="collection"><strong v-html="lang('f_publication_collection')"></strong> </p>
                                    <p v-if="projects.length > 0"><strong v-html="lang('f_publication_project', {}, 'other')"></strong> </p>
                                    <p v-if="surveys.length > 0"><strong v-html="lang('f_publication_surveys', {}, 'other')"></strong> </p>
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('f_publication_information')}}</span>
                                <div slot="body">
                                    <p><strong v-html="lang('f_publication_depositor')"></strong>: </p>
                                    <p><strong v-html="lang('f_publication_id')"></strong>: </p>
                                    <p><strong v-html="lang('f_publication_deposit_date')"></strong>: </p>
                                    <p><strong v-html="lang('f_publication_last_modification_date')"></strong>: </p>
                                    <p><strong v-html="lang('f_publication_version')"></strong>: </p>
                                </div>
                            </widget>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="columns is-centered" v-if="content_item.files && content_item.files.length > 0">
                    <div class="column">
                        <div class="card info-card info-card-purple">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_file')}}</p>
                            </header>
                            <div 
                                class="card-content has-text-centered"
                                v-if="is_files_accessible"    
                            >
                                <a :href="generate_download_link('master')" class="swap">
                                    <span class="icon is-large">
                                        <i class="fa fa-file fa-3x"></i>
                                    </span>

                                </a>
                                <a v-if="has_extra_files" class="swap" :href="generate_download_link('all')">{{lang('f_click_here_to_download_extra_files')}}</a>
                            </div>
                            <div class="card-content has-text-centered" v-else>
                                <a @click.prevent="state.copyRequest = !state.copyRequest" class="swap" href=''>{{lang('f_click_here_to_request_copy')}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered" v-if="license">
                    <div class="column">
                        <div class="card info-card info-card-red">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_license')}}</p>
                            </header>
                            <div class="card-content">
                                <p>{{lang(license)}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <div class="card info-card info-card-purple">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_citation')}}</p>
                            </header>
                            <div class="card-content">
                                <p v-html="content_item.html"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <div class="card info-card info-card-red">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_share')}}</p>
                            </header>
                            <div class="card-content has-text-centered">
                                <a class="icon facebook-color is-large">
                                    <i class="fa fa-facebook-official fa-2x"></i>
                                </a>
                                <a class="icon twitter-color is-large">
                                    <i class="fa fa-twitter fa-2x"></i>
                                </a>
                                <a class="icon linkedin-color is-large">
                                    <i class="fa fa-linkedin fa-2x"></i>
                                </a>
                                <a class="swap icon is-large">
                                    <i class="fa fa-envelope fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns is-centered" v-else>
            <div class="column is-8">
                <p v-html="lang('l_unexisting_item_view')"></p>
            </div>
        </div>
        <copy-requester
            :logged-in="state.loggedIn"
            :trigger.sync="state.copyRequest"
        />
    </div>
</div>
</template>

<script>
module.exports = require('./View');
</script>
