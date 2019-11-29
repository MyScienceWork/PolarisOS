<template>
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-12 has-text-centered">
                    <h4 class="title is-4"> {{lang('l_create_research_trial')}} </h4>
                </div>
            </div>
            <article class="message is-centered">
                <div class="message-header has-text-centered">
                    <p>{{lang('l_create_research_trial')}}</p>
                </div>
                <div class="message-body">
                    <fform
                        :name="state.sinks.creations.research_trial"
                        :post_path="state.paths.creations.research_trial"
                        :put_path="state.paths.creations.research_trial"
                        :get_path="state.paths.reads.research_trial"
                        :get_form="state.sinks.reads.research_trial"
                    >
                    <dynamic-form :form="research_trial_form" :cform="state.sinks.creations.research_trial"/>
                    </fform>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    module.exports = require('./NewResearchTrial');
</script>
