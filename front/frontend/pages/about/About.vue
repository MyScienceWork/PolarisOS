<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column has-text-centered is-8">
                <h4 class="title is-4">{{lang('l_about_info')}}</h4>
                <p v-html="lang('l_about_help')"></p>
            </div>
        </div>
            <div v-for="about in content_about" class="columns is-centered">
                <div class="column is-8">
                    <widget v-if="about.is_legacy_notice" :collapsed.sync="displayLegacyNotice">
                        <span slot="title">{{lang(about.question)}}</span>
                        <div slot="body">
                            <p v-html="lang(about.answer)" />
                        </div>
                    </widget>
                    <widget v-else :collapsed="true">
                        <span slot="title">{{lang(about.question)}}</span>
                        <div slot="body">
                            <p v-html="lang(about.answer)" />
                        </div>
                    </widget>
                </div>
            </div>
    </div>
</div>
</template>

<script>
module.exports = require('./About');
</script>
