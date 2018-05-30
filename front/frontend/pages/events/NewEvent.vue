<template>
    <div class="hero-body">
        <div class="container">
            <article class="message is-centered">
                <div class="message-header has-text-centered">
                    <p>{{lang('l_new_event')}}</p>
                </div>
                <div class="message-body">
                    <fform
                        :name="state.sinks.creations.event"
                        :post_path="state.paths.creations.event"
                        :put_path="state.paths.creations.event"
                        :get_path="state.paths.reads.event"
                        :get_form="state.sinks.reads.event"
                    >
                    <dynamic-form :form="event_form" :cform="state.sinks.creations.event"/>
                    </fform>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    module.exports = require('./NewEvent');
</script>
