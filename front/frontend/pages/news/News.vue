<template>
<div class="hero-body">
    <div class="container is-fluid">
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
