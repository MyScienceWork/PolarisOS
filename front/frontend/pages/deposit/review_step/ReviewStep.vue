<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content">
                <div class="columns is-centered">
                    <div class="column has-text-centered is-8">
                        <h4 class="title is-4">{{lang('f_deposit_review_step')}}</h4>
                        <p v-html="lang('f_deposit_review_step_help')"></p>
                    </div>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./ReviewStep');
</script>
