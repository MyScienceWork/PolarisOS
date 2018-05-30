<template>
    <div class="hero-body">
        <div class="container">
            <article class="message is-centered">
                <div class="message-header has-text-centered">
                    <p>{{lang('l_new_news')}}</p>
                </div>
                <div class="message-body">
                    <fform
                        :name="state.sinks.creations.news"
                        :post_path="state.paths.creations.news"
                        :put_path="state.paths.creations.news"
                        :get_path="state.paths.reads.news"
                        :get_form="state.sinks.reads.news"
                    >
                    <dynamic-form :form="news_form" :cform="state.sinks.creations.news"/>
                    </fform>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    module.exports = require('./CreateNews');
</script>
