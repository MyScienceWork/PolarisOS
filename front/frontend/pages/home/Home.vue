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
                    </div>
                    <div slot="card-content">
                        <ul>
                        <li v-for="item in items">{{item.html}}<br/><br/></li>
                        </ul>
                        <div class="level has-medium-bottom-margin has-medium-top-margin">
                            <div class="level-left">
                            </div>
                            <!--
                            <div class="level-right">
                                <router-link class="level-item" to="/">{{lang('l_see_more')}}</router-link>
                            </div>
                            -->
                        </div>
                    </div>
                </card>
            </div>
            <div class="column is-6">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <widget-stats :items="stats_submitted" />
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <widget-stats :items="stats_published" />
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <widget-stats :items="stats_reviewed_by_curator_1" />
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <widget-stats :items="stats_reviewed_by_curator_2" />
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <widget-stats :items="stats_rejected_by_curator_1" />
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <widget-stats :items="stats_rejected_by_curator_2" />
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
