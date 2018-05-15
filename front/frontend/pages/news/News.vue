<template>
<div class="hero-body">
    <div class="container">
        <div v-for="mnew in news">
            <div class="columns is-three-fifths is-offset-one-fifth">
                <div class="column is-full">
                    <div class="card is-full">
                        <header class="card-header">
                            <p class="card-header-title">
                                {{mnew.title}}
                            </p>
                            <p class="subtitle is-6 is-pulled-right">
                                {{mnew.creator.fullName}}
                                 <time :datetime="mnew.updatedAt">{{mnew.updatedAt}}</time>
                            </p>
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
                                        {{mnew.body}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns"></div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./News');
</script>
