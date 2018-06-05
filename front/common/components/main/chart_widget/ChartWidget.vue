<template>
<div>
    <div class="columns is-centered">
        <div class="column">
            <div class="field">
                <label>{{lang('l_chart_type')}}<span class="redify">*</span></label>
                <div class="control"> 
                    <v-select 
                        :options="state.charts"
                        :value="state.choosen_chart"
                        :on-change="update_chart"
                    />
                </div>
            </div>
            <div class="field">
                <div class="control"> 
                    <label class="checkbox has-small-right-margin">
                        <input type="checkbox" v-model="state.dates.activated">
                        {{lang('l_use_dates')}} 
                    </label>
                </div>
            </div>
            <div class="field is-grouped" v-if="state.dates.activated">
                <div class="control"> 
                    <label>{{lang('l_start_date_stat')}}<span class="redify">*</span></label>
                    <div class="control">
                        <b-datepicker
                            v-model="state.dates.start"
                            :first-day-of-week="1"
                            :readonly="false"
                        />
                    </div>
                </div>
                <div class="control">
                    <label>{{lang('l_end_date_stat')}}<span class="redify">*</span></label>
                    <div class="control">
                        <b-datepicker
                            v-model="state.dates.end"
                            :first-day-of-week="1"
                            :readonly="false"
                        />
                    </div>
                </div>
            </div>
            <div class="field">
                <div class="control"> 
                    <a href='#' @click.prevent="load_chart" class="button is-success">
                        {{lang('l_load_chart')}}
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="columns is-centered" v-if="data">
        <div class="column">
            <Histogram 
                v-if="info.chart === 'histogram'"
                :id="state.sinks.creations.chart"
                serieName="lang(info.aggregations[0].name || '') | render(state.dates)" 
                :title="lang(info.title)" 
                :subtitle="lang(info.subtitle || '') | render(state.dates)" 
                :serieData="data.series"
                :headerFormat="info.format.header"
                :pointFormat="info.format.point"
                :x-axis="{'type': 'datetime'}"
                :y-axis="{'title': {'text': this.info.axis.y.title}}"
            />
            <Pie
                v-else-if="info.chart === 'pie'"
                :id="state.sinks.creations.chart"
                :title="lang(info.title) | render(state.dates)"
                :subtitle="lang(info.subtitle || '') | render(state.dates)" 
                :serieName="lang(info.aggregations[0].name || '')" 
                :serieData="data.series"
                :pointFormat="info.format.point"
            />
            <Bar
                v-else-if="info.chart === 'bar'"
                :id="state.sinks.creations.chart"
                :title="lang(info.title) | render(state.dates)"
                :subtitle="lang(info.subtitle || '') | render(state.dates)"
                :series="data.series"
                :x-axis="data.xaxis"
                :y-axis="{min: 0,title: {text: this.info.axis.y.title }}"
                :headerFormat="info.format.header"
                :pointFormat="info.format.point"
                :footerFormat="info.format.footer"
                :tooltip-shared="info.tooltip.shared || true"
                :tooltip-use-html="info.tooltip.use_html || true"
            />
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./ChartWidget');
</script>
