<template>
    <div class="hero-body">
        <div class="container is-fluid">
            <div class="columns is-centered">
                <div class="column is-10 has-text-centered">
                    <h4 class="title is-4">{{message.title}}</h4>
                    <h6 class="subtitle is-6">{{message.subtitle}}</h6>
                    <h6 class="subtitle is-6">{{format_date(message.startDate)}}  --  {{format_date(message.endDate)}}</h6>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-10 has-text-centered">
                    <span v-for="tag in message.tags" class="tag is-info">{{tag.value}}</span>
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
                            <!-- <p><strong>{{message.location.country}}, {{message.location.city}}</strong></p> -->
                            <p v-html="message.body"></p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = require('./EventPage');
</script>
