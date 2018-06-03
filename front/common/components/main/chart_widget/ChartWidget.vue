<template>
<div>
    <div class="columns is-centered">
        <div class="column">
            <div class="field">
                <label>{{lang('l_chart_type')}}<span class="redify">*</span></label>
                <div class="control"> 
                    <v-select 
                        :options="state.charts"
                        v-model="state.choosen_chart"
                        on-change="update_chart"
                    />
                </div>
            </div>
            <div class="field">
                <div class="control"> 
                    <label>{{lang('l_start_date_stat')}}<span class="redify">*</span></label>
                    <div class="control">
                        <b-datepicker
                            v-model="state.dates.end"
                            :first-day-of-week="1"
                            :placeholder="lang('l_start_date_stat')"
                        />
                    </div>
                    <label>{{lang('l_end_date_stat')}}<span class="redify">*</span></label>
                    <div class="control">
                        <b-datepicker
                            v-model="state.dates.start"
                            :first-day-of-week="1"
                            :placeholder="lang('l_end_date_stat')"
                        />
                    </div>
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
                serieName="Callings" 
                :title="info.title" 
                :subtitle="info.subtitle || ''" 
                :serieData="[]"
                :headerFormat="info.format.header"
                pointFormat="info.format.point"
                :x-axis="{'type': 'datetime'}"
                :y-axis="{'title': {'text': this.info.y_axis.title}}"
            />
            <Pie
                v-else-if="info.chart === 'pie'"
                :id="state.sinks.creations.chart"
                :title="info.title" 
                :subtitle="info.subtitle || ''" 
                :serieName="info.serie.name" 
                :serieData="[]"
                :pointFormat="info.format.point"
            />
            <Bar
                v-else-if="info.chart === 'bar'"
                :id="state.sinks.creations.chart"
                :title="info.title"
                :subtitle="info.subtitle || ''"
                :series="[]"
                :x-axis="{}"
                :y-axis="{min: 0,title: {text: this.info.y_axis.title }}"
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
