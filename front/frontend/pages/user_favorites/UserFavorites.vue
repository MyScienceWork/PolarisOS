<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column has-text-centered is-8">
                <h4 class="title is-4">{{lang('f_favorites')}}</h4>
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
                                            <span class="icon is-small"><i class="fa fa-trash"></i></span>
                                        </a>
                                    </div>
                                </div>
                                <p><a href=''>{{lang('f_see_more_details')}}</a></p>
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
                                            <span class="icon is-small"><i class="fa fa-trash"></i></span>
                                        </a>
                                    </div>
                                </div>
                                <p><a href=''>{{lang('f_see_more_details')}}</a></p>
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
                                            <span class="icon is-small"><i class="fa fa-trash"></i></span>
                                        </a>
                                    </div>
                                </div>
                                <p><a href=''>{{lang('f_see_more_details')}}</a></p>
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
