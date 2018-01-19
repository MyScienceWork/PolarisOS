<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content" v-if="!success">
                <div class="columns is-centered">
                    <div class="column has-text-centered is-8">
                        <h4 class="title is-4">{{lang('f_deposit_review_step')}}</h4>
                        <p v-html="lang('f_deposit_review_step_help')"></p>
                    </div>
                </div>
                <dynamic-form :form="form || {}" :cform="creationSink" :readonly="true" />
            </div>
            <div class="card-content" v-else>
                <div class="columns is-centered">
                    <div class="column has-text-centered" v-html="lang('f_deposit_success')">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./ReviewStep');
</script>
