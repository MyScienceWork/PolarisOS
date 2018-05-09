<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-10 has-text-centered">
                <h4 class="title is-4">{{message.title}}</h4>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-10 has-text-centered">
                <figure class="figure">
                    <p class="image">
                        <img :src="message.main_picture" alt="Picture"/>
                    </p>
                </figure>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-10">
                <article class="message is-link">
                    <div class="message-body">
                        <p><strong v-html="message.header"></strong></p>
                    </div>
                </article>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-10">
                <p v-html="message.content"></p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./NewsPage');
</script>
