<template>
    <div class="hero-body">
        <div class="container is-fluid">
            <div class="columns">
                <div class="column is-6">
                    <!-- last deposit publication -->
                    <!--
                    <card color="orange" class="card-equal-height">
                        <template slot="card-title">
                            {{lang('l_last_deposits')}}
                        </template>
                        <div
                                slot="card-extra-header"
                                class="is-pulled-right"
                        >
                            <rss-feed-icon
                                    entity="publication"
                                    :sort="['-dates.deposit', '-dates.update']"
                                    :query="lastDepositsQuery"
                                    :mapping="rssMapping"
                                    :lang-code="$store.state.interfaceLang"
                            />
                        </div>
                        <div slot="card-content">
                            <last-deposits :items="items" />
                            <div class="level has-medium-bottom-margin has-medium-top-margin">
                                <div class="level-left">
                                </div>
                                <div class="level-right">
                                    <router-link class="level-item" to="/browse?b=dates.publication&entity=&view=list&aggt=date&label=&agge=publication&aggf=dates.publication">{{lang('l_see_more')}}</router-link>
                                </div>
                            </div>
                        </div>
                    </card>
                    -->
                    <!-- last deposit dataset -->
                    <card color="orange" class="card-equal-height">
                        <template slot="card-title">
                            {{lang('l_last_deposits_dataset')}}
                        </template>
                        <div
                                slot="card-extra-header"
                                class="is-pulled-right"
                        >
                        </div>
                        <div slot="card-content">
                            <last-deposits-dataset :items="items_dataset" />
                        </div>
                    </card>
                </div>
                <div class="column is-6">
                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <card color="red" class="">
                                <template slot="card-title">
                                    {{lang('l_search')}}
                                </template>
                                <search slot="card-content" :search-sink="state.sinks.reads.search" :show-favorites="false" />
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
                            <widget-stats :items="stats" />
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
