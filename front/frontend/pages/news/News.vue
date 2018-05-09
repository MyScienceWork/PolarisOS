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
        <div v-for="mnew in news" class="card">
            <header class="card-header">
                <p class="card-header-title">
                    {{mnew.title}}
                </p>
                <p class="subtitle is-6 is-pulled-right">
                    {{mnew.creator}}
                     <time :datetime="mnew.startDate">{{mnew.startDate}} - {{mnew.endDate}}</time>
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
</template>

<script>
module.exports = require('./News');
</script>
