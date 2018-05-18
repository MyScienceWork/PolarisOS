<template>
<div class="hero-body">
    <div class="container">
        <div v-for="mnew in news">
            <div class="columns is-three-fifths is-offset-one-fifth">
                <div class="column is-full">
                    <div class="card is-full">
                        <header class="card-header">
                            <router-link :to="`/news/${mnew._id}`">
                            <p class="card-header-title">
                                {{mnew.title}}
                            </p>
                            <p class="subtitle is-6 is-pulled-right">
                                {{mnew.creator.fullName}}
                                 <time :datetime="mnew.updatedAt">{{format_date(mnew.updatedAt, 'fromNow')}}</time>
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
