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
                <p v-html="message.description"></p>
            </div>
        </div>
        <article v-if="message.comments" class="media" v-for="item in message.comments">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="/public/front/imgs/icons/person-placeholder.png" alt="Picture"/>
                </p>
            </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong></strong>
                    <br>
                    <p>{{item}}</p>
                    <!-- <p v-html="item.content" /> -->
                    <br>
                    <small v-if="item.author">by {{item.author.fullName}}, {{date_format(item.created)}}</small>
                </p>
            </div>
        </div>
        </article>
        <article class="media">
            <figure class="media-left">
            <p class="image is-64x64">
                <img :src="avatar" :alt="user.fullname"/>
            </p>
            </figure>
            <div class="media-content">
                <finput
                    type="textarea"
                    :placeholder="lang('l_post_message')"
                    label=""
                    name="comments.content"
                    :form="state.sinks.creations.forum_discussion"
                />
                <div class="field">
                    <p class="control">
                        <button @click="send" class="button">{{lang('l_post_message_btn')}}</button>
                        <article class="message is-success" v-if="state.statuses.creations.forum_discussion === 'ok'">
                            <div class="message-body">
                                {{lang('f_comment_send_success')}}
                            </div>
                        </article>
                        <article class="message is-danger" v-if="state.statuses.creations.forum_discussion === 'nok'">
                            <div class="message-body">
                                {{lang('f_comment_send_failed')}}
                            </div>
                        </article>
                    </p>
                </div>
            </div>
        </article>
    </div>
</div>
</template>

<script>
module.exports = require('./Forum');
</script>
