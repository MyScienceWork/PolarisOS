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
                    <widget v-if="about._id === 'AWPPGoIGXcbhEDzS_3Yk'" :collapsed.sync="displayLegacyNotice">
                        <span slot="title">{{lang(about.subject)}}</span>
                        <div slot="body">
                            <p v-html="lang(about.description)" />
                        </div>
                    </widget>
                    <widget v-else :collapsed="true">
                        <span slot="title">{{lang(about.subject)}}</span>
                        <div slot="body">
                            <p v-html="lang(about.description)" />
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
