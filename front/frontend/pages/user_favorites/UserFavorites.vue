<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column has-text-centered is-8">
                <h4 class="title is-4">{{lang('f_favorites', {}, 'other')}}</h4>
                <p v-html="lang('f_favorites_help')"></p>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                <nav class="navbar is-transparent">
                    <div class="navbar-menu">
                        <div class="navbar-end">
                            <a class="swap icon navbar-item is-large">
                                <i class="fa fa-trash fa-2x"></i>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                <div class="card info-card info-card-red">
                    <div class="card-content">
                        <article class="media">
                            <div class="media-left">
                                <finput
                                name=""
                                type="checkbox"
                                form="dummy-form"
                                label=""
                                placeholder=""
                                />
                            </div>
                            <div class="media-content">
                                <p><strong>Publications de l'année 2017 dans les revues - Corentin Ribeyre</strong></p>
                                <div class="is-pulled-right level is-mobile">
                                    <div class="level-left">
                                        <a class="level-item">
                                            <span class="icon is-small"><i class="fa fa-refresh"></i></span>
                                        </a>
                                        <a class="level-item">
                                            <span class="icon is-small"><i class="fa fa-trash"></i></span>
                                        </a>
                                    </div>
                                </div>
                                <p><a href='#' @click="toggle(0, $event)">{{lang('f_see_more_details')}}</a></p>
                                <div class="card info-card" v-if="0 in state.views">
                                    <div class="card-content content">
                                        <p><strong>{{lang('f_authors')}}</strong> Corentin Ribeyre</p>
                                        <p><strong>{{lang('f_years')}}</strong> 2017</p>
                                        <p><strong>{{lang('f_publication_types')}}</strong> Article de revue</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="media">
                            <div class="media-left">
                                <finput
                                name=""
                                type="checkbox"
                                form="dummy-form"
                                label=""
                                placeholder=""
                                />
                            </div>
                            <div class="media-content">
                                <p><strong>Publications de l'année 2016 dans les revues - Corentin Ribeyre</strong></p>
                                <div class="is-pulled-right level is-mobile">
                                    <div class="level-left">
                                        <a class="level-item">
                                            <span class="icon is-small"><i class="fa fa-refresh"></i></span>
                                        </a>
                                        <a class="level-item">
                                            <span class="icon is-small"><i class="fa fa-trash"></i></span>
                                        </a>
                                    </div>
                                </div>
                                <p><a href='#' @click="toggle(1, $event)">{{lang('f_see_more_details')}}</a></p>
                                <div class="card info-card" v-if="1 in state.views">
                                    <div class="card-content content">
                                        <p><strong>{{lang('f_authors')}}</strong> Corentin Ribeyre</p>
                                        <p><strong>{{lang('f_years')}}</strong> 2016</p>
                                        <p><strong>{{lang('f_publication_types')}}</strong> Article de revue</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="media">
                            <div class="media-left">
                                <finput
                                name=""
                                type="checkbox"
                                form="dummy-form"
                                label=""
                                placeholder=""
                                />
                            </div>
                            <div class="media-content">
                                <p><strong>Publications de l'année 2015 dans les revues - Corentin Ribeyre</strong></p>
                                <div class="is-pulled-right level is-mobile">
                                    <div class="level-left">
                                        <a class="level-item">
                                            <span class="icon is-small"><i class="fa fa-refresh"></i></span>
                                        </a>
                                        <a class="level-item">
                                            <span class="icon is-small"><i class="fa fa-trash"></i></span>
                                        </a>
                                    </div>
                                </div>
                                <p><a href='#' @click="toggle(2, $event)">{{lang('f_see_more_details')}}</a></p>
                                <div class="card info-card" v-if="2 in state.views">
                                    <div class="card-content content">
                                        <p><strong>{{lang('f_authors')}}</strong> Corentin Ribeyre</p>
                                        <p><strong>{{lang('f_years')}}</strong> 2015</p>
                                        <p><strong>{{lang('f_publication_types')}}</strong> Article de revue</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./UserFavorites');
</script>
