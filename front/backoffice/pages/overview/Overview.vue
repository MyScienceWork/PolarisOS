<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-12">
                <card color="red">
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
                                        <chart-widget :charts="charts" />
                                    </div>
                                </widget>
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
