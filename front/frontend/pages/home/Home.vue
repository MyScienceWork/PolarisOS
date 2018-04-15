<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column is-6">
                <card color="orange" class="card-equal-height">
                    <template slot="card-title">
                        {{lang('l_last_deposits')}}
                    </template>
                    <div 
                        slot="card-extra-header" 
                        class="is-pulled-right"
                    >
                        <a class="icon is-large share-icon" target='_blank' :title="lang('l_rss_feed')" href='#'>
                            <i class="fa fa-rss-square fa-2x"></i>
                        </a>
                    </div>
                    <last-deposits :items="items" slot="card-content" />
                </card>
            </div>
            <div class="column is-6">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <card color="red" class="">
                            <template slot="card-title">
                                {{lang('l_search')}}
                            </template>
                            <search slot="card-content" />
                        </card>
                    </div>
                    <div class="column is-12">
                        <card color="purple">
                            <template slot="card-title">
                                {{lang('l_discover')}}
                            </template>
                            <discovery :nav-items="navs" slot="card-content" />
                        </card>
                    </div>
                    <div class="column is-12">
                        <widget-stats form="test_form" :infos="[]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Home');
</script>
