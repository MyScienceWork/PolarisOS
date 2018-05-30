<template>
<div class="hero-body">
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-12 has-text-centered">
                <h4 class="title is-4"> USPC News </h4>
            </div>
        </div>
        <div v-if="state.isAdministrator" class="column is-2 is-offset-9">
            <router-link :to="`/news/create/news`">
                <a class="button is-info">{{lang('l_new_news')}}</a>
            </router-link>
        </div>
        <div v-for="mnew in news">
            <div class="columns is-three-fifths is-offset-one-fifth">
                <div class="column is-full">
                    <div class="card is-full">
                        <header class="card-header">
                            <router-link :to="`/news/${mnew._id}`">
                            <p class="card-header-title">
                                {{mnew.title}}
                            </p>
                            <p v-if="mnew.creator" class="subtitle is-6 is-pulled-right">
                                {{mnew.creator.fullName}}
                                 <time :datetime="mnew.createdAt">{{format_date(mnew.createdAt, 'fromNow')}}</time>
                            </p>
                            </router-link>
                        </header>
                        <div class="card-content">
                            <div class="columns">
                                <div class="column is-narrow">
                                    <figure class="image is-128x128">
                                        <img :src="mnew.picturePath" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="column">
                                    <div class="content">
                                        {{mnew.header}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./News');
</script>
