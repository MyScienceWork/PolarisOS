<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-10 has-text-centered">
                <h4 class="title is-4">{{message.title}}</h4>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-centered">
                    <div class="message-body">
                        <p>{{message.author.fullName}}, {{message.createdAt}}</p>
                        <p><strong v-html="message.header"></strong></p>
                    </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-narrow">
                <figure class="figure">
                    <p class="image">
                        <img :src="message.main_picture" alt="Picture"/>
                    </p>
                </figure>
            </div>
            <div class="column is-10">
                <article class="message is-link">
                <p v-html="message.body"></p>
                </article>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./NewsPage');
</script>
