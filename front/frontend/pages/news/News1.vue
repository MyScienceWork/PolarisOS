<template>
<div class="hero-body">
    <div class="container is-fluid">
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
