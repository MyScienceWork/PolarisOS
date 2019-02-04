<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-12">
                <card color="next-color">
                    <div slot="card-content">
                        <div class="columns is-centered">
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <a class="button is-info" href="#" @click.prevent="add_chart">{{lang('l_add_custom_chart')}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns is-centered" 
                            v-for="(chart, i) in state.charts"
                            :key="i" 
                        >
                            <div class="column">
                                <widget 
                                    :is-removable="true" 
                                    @remove="() => remove_chart(i)"
                                >
                                    <span slot="title">Chart #{{i}}</span>
                                    <div slot="body">
                                        <chart-widget :charts="charts" :defaultState="chart" @update:defaultState="(info) => update_chart_info(i, info)" />
                                    </div>
                                </widget>
                            </div>
                        </div>
                        <div class="columns is-centered" v-if="state.charts && Object.keys(state.charts).length > 0">
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <a class="button is-success" href="#" @click.prevent="save_dashboard">{{lang('l_save_dashboard_configuration')}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Overview');
</script>
