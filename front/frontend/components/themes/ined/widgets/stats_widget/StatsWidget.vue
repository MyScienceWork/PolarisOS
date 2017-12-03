<template>
    <div :class="['card', 'info-card', 'stats-card', extraClasses]">
        <div class="card-content">
            <div class="columns is-centered">
                <div class="column">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-32x32">
                                <span class="icon is-large">
                                    <i class="fa fa-file-text fa-2x"></i>
                                </span>
                            </figure>
                        </div>
                        <div class="media-content is-uppercase">
                            <p class="title is-6">Dépôts</p>
                            <p class="subtitle is-6">12 000 références</p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-32x32">
                                <span class="icon is-large">
                                    <i class="fa fa-unlock-alt fa-2x"></i>
                                </span>
                            </figure>
                        </div>
                        <div class="media-content is-uppercase">
                            <p class="title is-6">Libre accès</p>
                            <p class="subtitle is-6">300 références</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="columns is-centered">
                <div class="column">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <span class="icon is-large">
                                    <i class="fa fa-book fa-2x"></i>
                                </span>
                            </figure>
                        </div>
                        <div class="media-content is-uppercase media-content-red">
                            <p class="subtitle is-6">Nombre de disciplines</p>
                            <p class="title is-5">50</p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <span class="icon is-large">
                                    <i class="fa fa-eye fa-2x"></i>
                                </span>
                            </figure>
                        </div>
                        <div class="media-content media-content-orange is-uppercase">
                            <p class="subtitle is-6">Visiteurs mensuels</p>
                            <p class="title is-5">400 550</p>
                        </div>
                    </div>
                </div>
            </div>-->
        </div>
    </div>
</template>

<script>
    module.exports = require('./StatsWidget');
</script>
