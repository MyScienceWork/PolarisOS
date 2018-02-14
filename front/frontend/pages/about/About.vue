<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <card color="red" class="card-equal-height">
                    <template slot="card-title">
                        {{lang('l_ined_about_us_title')}}
                    </template>
                    <div slot="card-content">
                        <p v-html="lang('l_ined_history')" />
                    </div>
                </card>
            </div>
            <div class="column">
                <card color="red" class="card-equal-height">
                    <template slot="card-title">
                        {{lang('l_about_aoi_title')}}
                    </template>
                    <div slot="card-content">
                        <p v-html="lang('l_aoi_about')" />
                    </div>
                </card>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./About');
</script>
