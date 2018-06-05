<template>
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-12 has-text-centered">
                    <h4 class="title is-4"> USPC Forum </h4>
                </div>
            </div>
            <article class="message is-centered">
                <div class="message-header has-text-centered">
                    <p>{{lang('l_new_subject')}}</p>
                </div>
                <div class="message-body">
                    <fform
                        :name="state.sinks.creations.forum"
                        :post_path="state.paths.creations.forum"
                        :put_path="state.paths.creations.forum"
                        :get_path="state.paths.reads.forum"
                        :get_form="state.sinks.reads.forum"
                    >
                        <dynamic-form :form="forum_forms" :cform="state.sinks.creations.forum"/>
                    </fform>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
module.exports = require('./ForumNewSubject');
</script>
