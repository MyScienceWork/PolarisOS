<template>
<div class="hero-body">
    <div class="container">
        <div class="column is-three-fifths is-offset-one-fifth">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        title
                    </p>
                    <p class="subtitle is-6 is-pulled-right">
                        creator
                         <time datetime="2018">2017 - 2028</time>
                    </p>
                </header>
                <div class="card-content">
                    <div class="columns">
                        <div class="column  is-narrow">
                            <figure class="image is-128x128">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="column">
                            <div class="content">
                                Event description, card by default
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-multiline">
            <div class="column is-4">
                <div v-for="mnew in news" class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <img :src="mnew.main_picture" alt="News Picture">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="column">
                                    <time class="is-pulled-right" datetime=""></time>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <p><strong v-html="mnew.title"></strong></p>
                                    <p class=""><router-link class="has-text-info" :to='`/news/${mnew._id}`'>{{lang('l_see_more')}}</router-link></p>
                                </div>
                            </div>
                        </div>
                        <div class="media has-small-top-margin">
                            <div class="media-content">
                                <div class="media-content is-pulled-right">
                                    <p class="title is-4"><router-link :to="`/u/${mnew.author.authentication.key}/profile`">{{mnew.author.firstname}} {{mnew.author.lastname}}</router-link></p>
                                    <!--<p class="subtitle is-6">@johnsmith</p>-->
                                </div>
                                <div class="media-left is-pulled-right">
                                    <figure class="image is-48x48">
                                        <img src="/public/front/imgs/icons/person-placeholder.png" :alt="`${mnew.author.firstname} ${mnew.author.lastname}`">
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./News');
</script>
