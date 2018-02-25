<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns" v-if="content_item && Object.keys(content_item).length > 0">
            <div class="column is-8">
                <div class="card card-equal-height">
                    <div class="card-content content">
                        <h3 class="title is-3">{{content_item.title.content}}</h3>
                        <p>
                        <strong>Olivier Michalon<sup>1</sup></strong>, 
                        <strong>Corentin Ribeyre<sup>2</sup></strong>, 
                        <strong>Marie Candito<sup>3</sup></strong>, 
                        <strong>Alexis Nasr<sup>1</sup></strong>
                        </p>
                        <!--<ol>
                            <li>LIF - Laboratoire d'informatique fondamentale de Marseille</li>
                            <li>Département de Linguistique - Université de Genève</li>
                            <li>ALPAGE - Analyse Linguistique Profonde à Grande Echelle</li>
                        </ol>-->
                        <div class="card card-with-tag" v-if="abstract(content_item.lang) !== ''">
                            <div class="card-header">
                                <div class="card-header-title">
                                </div>
                                <a href='#' class="card-header-icon card-header-tag" v-for="ab in abstracts">
                                    <span :class="['tag is-purple', {'is-active': !ab.lang || ab.lang === content_item.lang}]">{{ab.lang || content_item.lang}}</span>
                                </a>
                            </div>
                            <div class="card-content">
                                <h4 class="subtitle is-5"><strong>{{lang('f_abstract')}}</strong></h4>
                                <p>
                                {{abstract(content_item.lang)}}
                                </p>
                            </div>
                        </div>
                        <p></p>
                        <p><strong v-html="lang('f_publication_type')"></strong> {{lang(content_item.denormalization.type.label)}}</p>
                        <p>Coling 2016 - 26th International Conference on Computational Linguistics, Dec 2016, Osaka, Japan. The 26th International Conference on Computational Linguistics Proceedings of COLING 2016: Technical Papers, 2016</p>
                        <p><strong v-html="lang('f_publication_id')"></strong> ark:tt:12342432fezfe</p>
                        <p><a class="has-text-info" href=''>{{lang('f_see_more_metadata')}}</a></p>
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
                                <a href='generate_download_link("master")' class="swap">
                                    <span class="icon is-large">
                                        <i class="fa fa-file fa-3x"></i>
                                    </span>

                                </a>
                                <a v-if="has_extra_files" class="swap" href='generate_download_link("all")'>{{lang('f_click_here_to_download_extra_files')}}</a>
                            </div>
                            <div class="card-content has-text-centered" v-else>
                                <a @click.prevent="state.copyRequest = !state.copyRequest" class="swap" href=''>{{lang('f_click_here_to_request_copy')}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered" v-if="content_item.denormalization.diffusion.rights.license">
                    <div class="column">
                        <div class="card info-card info-card-red">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_license')}}</p>
                            </header>
                            <div class="card-content">
                                <p>{{lang(content_item.denormalization.diffusion.rights.license)}}</p>
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
