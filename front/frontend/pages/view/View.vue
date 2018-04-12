<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns" v-if="content_item && Object.keys(content_item).length > 0">
            <div class="column is-8">
                <div class="card card-equal-height card-with-tag">
                    <div class="card-header">
                        <a href='#' class="card-header-icon card-header-tag is-left">
                            <span class="tag is-purple is-active">{{lang(content_item.denormalization.type.label)}}</span>
                        </a>
                        <div class="card-header-title">
                        </div>
                        <a href='#' class="card-header-icon card-header-tag" v-for="tt in titles" @click.prevent="activate_lang('title', tt.lang)">
                            <span :class="['tag is-purple', {'is-active': state.current_title.lang === tt.lang}]">{{tt.lang}}</span>
                        </a>
                    </div>
                    <div class="card-content content">
                        <h3 class="title is-3">{{state.current_title.content}}</h3>
                        <h5 class="title is-3" v-if="state.current_subtitle !== ''">{{state.current_subtitle.content}}</h5>
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
                        <!--<p>{{lang(content_item.denormalization.type.label)}}</p>-->
                        <p v-if="journal" v-html="journal"></p>
                        <p v-if="book" v-html="book"></p>
                        <p v-if="chapter" v-html="chapter"></p>
                        <p v-if="conference" v-html="conference"></p>
                        <p v-if="other_document" v-html="other_document"></p>
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
                                {{state.current_abstract.content}}
                                </p>
                            </div>
                        </div>
                        <p class="has-small-top-margin" v-if="keywords('user')"><strong v-html="lang('f_publication_keyword', {}, 'other')"></strong> {{keywords('user')}}</p>
                        <!--<p><strong v-html="lang('f_publication_id')"></strong></p>-->
                        <!--<p class="has-small-top-margin"><a class="" href='#' @click.prevent="see_more_metadata">{{state.more_metadata ? lang('f_see_less_metadata') : lang('f_see_more_metadata')}}</a></p>-->
                        <div>
                            <widget v-if="themes.length > 0 || keywords('user') || keywords('demovoc')" :collapsed="true">
                                <span slot="title">{{lang('f_publication_indexing')}}</span>
                                <div slot="body">
                                    <p v-if="keywords('user')"><strong v-html="lang('f_publication_keyword', {}, 'other')"></strong> {{keywords('user')}}</p>
                                    <p v-if="keywords('demovoc')"><strong v-html="lang('f_publication_demovoc_keyword', {}, 'other')"></strong> {{keywords('demovoc')}}</p>
                                    <p v-if="themes.length > 0"><strong v-html="lang('f_publication_theme', {}, 'other')"></strong>
                                        <ul>
                                            <li v-for="theme in themes">{{theme}}</li>
                                        </ul>
                                    </p>
                                </div>
                            </widget>
                            <widget v-if="ids.length > 0" :collapsed="true">
                                <span slot="title">{{lang('f_publication_id_title', {}, 'other')}}</span>
                                <div slot="body">
                                    <p v-for="id in ids"><strong>{{id.type.toUpperCase()}}</strong> : {{id._id}}</p>
                                </div>
                            </widget>
                            <widget v-if="publication_version || access_level || license || content_item.url || resources.length > 0" :collapsed="true">
                                <span slot="title">{{lang('f_publication_rights')}}</span>
                                <div slot="body">
                                    <p v-if="publication_version"><strong v-html="lang('f_publication_version')"></strong> {{lang(publication_version)}}</p>
                                    <p v-if="access_level"><strong v-html="lang('f_publication_access_level')"></strong> {{lang(access_level)}}</p>
                                    <p v-if="embargo"><strong v-html="lang('f_publication_embargo')"></strong> {{embargo}}</p>
                                    <p v-if="license"><strong v-html="lang('f_publication_license')"></strong> {{lang(license)}}</p>
                                    <p v-if="content_item.url"><strong v-html="lang('f_publication_url')"></strong> {{content_item.url}}</p>
                                    <p v-if="resources.length > 0">
                                        <strong v-html="lang('f_publication_resource', {}, 'other')"></strong>
                                        <ul>
                                            <li v-for="r in resources">({{r.type}}) {{r.url}}</li>
                                        </ul>
                                    </p>
                                </div>
                            </widget>
                            <widget v-if="teams.length > 0 || collection || projects.length > 0 || surveys.length > 0" :collapsed="true">
                                <span slot="title">{{lang('f_publication_collection', {}, 'other')}}</span>
                                <div slot="body">
                                    <p v-if="teams && teams.length > 0"><strong v-html="lang('f_publication_team', {}, 'other')"></strong>
                                        <ul>
                                            <li v-for="t in teams">
                                                {{lang(t)}}
                                            </li>
                                        </ul>
                                    </p>
                                    <p v-if="collection"><strong v-html="lang('f_publication_collection')"></strong> {{lang(collection)}}</p>
                                    <p v-if="projects.length > 0"><strong v-html="lang('f_publication_project', {}, 'other')"></strong> 
                                        <ul>
                                            <li v-for="p in projects">
                                                {{lang(p)}}
                                            </li>
                                        </ul>
                                    </p>
                                    <p v-if="surveys.length > 0"><strong v-html="lang('f_publication_survey', {}, 'other')"></strong>
                                        <ul>
                                            <li v-for="p in surveys">
                                                {{lang(p)}}
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('f_publication_information')}}</span>
                                <div slot="body">
                                    <p v-if="depositor"><strong v-html="lang('f_publication_depositor')"></strong> {{depositor.firstname}} {{depositor.lastname}}</p>
                                    <!--<p><strong v-html="lang('f_publication_id')"></strong>: </p>-->
                                    <p><strong v-html="lang('f_publication_deposit_date')"></strong> {{date('deposit', 'DD/MM/YYYY')}}</p>
                                    <p><strong v-html="lang('f_publication_last_modification_date')"></strong> {{date('update', 'DD/MM/YYYY')}}</p>
                                    <p><strong v-html="lang('f_publication_deposit_version')"></strong> {{content_item.version}} </p>
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
                                <div>
                                    <b-tooltip class="is-dark" :label="lang('l_master_file_download_help')" multilined>
                                        <a :href="generate_download_link('master')" class="swap">
                                            <span class="icon is-large">
                                                <i class="fa fa-file fa-3x"></i>
                                            </span>

                                        </a>
                                    </b-tooltip>
                                </div>
                                <p class="has-small-top-margin" v-if="has_extra_files">
                                    <a class="swap has-small-top-margin" @click.prevent="state.show_extra_files = !state.show_extra_files">
                                        {{lang('f_click_here_to_download_extra_files')}}
                                    </a>
                                </p>

                                <div class="has-small-top-margin" v-if="state.show_extra_files">
                                    <p class="title is-5">{{lang('f_select_extra_files_to_download')}}</p>
                                    <div class="field has-addons" v-for="file in content_item.files">
                                        <p class="control is-expanded">
                                            <a class="button is-static is-fullwidth">
                                                {{$lodash.truncate(file.name)}}
                                            </a>
                                        </p>
                                        <div class="control">
                                            <div class="input">
                                                <input type="checkbox" v-model="state.selected_files[file.name].s" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field is-grouped">
                                        <div class="control">
                                            <a class="button" :href='multi_download_link'>{{lang('f_download')}}</a>
                                        </div>
                                        <div class="control">
                                            <button class="button is-primary" @click.prevent="select_all_extra_files(!is_all_extra_files_selected)">{{is_all_extra_files_selected ?  lang('f_deselect_all') : lang('f_select_all')}}</button>
                                        </div>
                                    </div>
                                </div>
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
                        <div class="card info-card info-card-purple">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_export')}}</p>
                            </header>
                            <div class="card-content">
                                <p class="has-text-centered"><a @click.prevent="run_export('csv')">CSV</a> | 
                                <a @click.prevent="run_export('bibtex')">BibTeX</a> | 
                                <a @click.prevent="run_export('ris')">RIS (EndNote)</a></p> 
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
