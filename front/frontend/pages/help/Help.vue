<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column has-text-centered is-8">
                <h4 class="title is-4">{{lang('l_help_info')}}</h4>
                <p v-html="lang('l_help_help')"></p>
            </div>
        </div>
        <div v-for="faq in content_faq" class="columns is-centered">
            <div class="column is-8">
                <widget :collapsed="true">
                    <strong slot="title" class="is-uppercase has-text-blue">{{lang(faq.question)}}</strong>
                    <div slot="body">
                        <p v-html="lang(faq.answer)" />
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Help');
</script>
