<template>
    <div class="main-container">
        <div class="padding-md">
            <widget>
                <span slot="title">Choose your suborganization</span>
                <div slot="body">
                    <div class="row">
                        <div class="col col-md-8 col-md-offset-2">
                            <fselect name="suborganization" label="" :is-required="false" 
                            placeholder="Choose your suborganization"
                            :options="content_suborganization"
                            fieldLabel="name"
                            fieldValue="_id"
                            :form="state.sinks.reads.suborganization_chooser"
                            @select-change="changeSuborganization"
                            />
                        </div>
                    </div>
                </div>
            </widget>
            <widget v-if="state.suborganization != null && has_r_access('statistics')">
                <span slot="title">Statistics</span>
                <div slot="body">
                    <div class="row">
                        <div class="col col-md-4">
                            <finput 
                            name="start" 
                            label="Start period" 
                            :is-required="true" 
                            placeholder="Start period" 
                            type="datetime" 
                            :form="state.sinks.creations.chart" 
                            :tz="state.tz"
                            />
                        </div>
                        <div class="col col-md-4">
                            <finput 
                            name="end" 
                            label="End period" 
                            :is-required="true" 
                            placeholder="End period" 
                            type="datetime" 
                            :form="state.sinks.creations.chart" 
                            :tz="state.tz"
                            />
                        </div>
                        <div class="col col-md-4">
                            <label>*</label>
                            <div>
                                <button class="btn btn-success" @click.prevent="load_stats">
                                    Load 
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-3">
                            <div class="statistic-box bg-primary m-bottom-md">
								<div class="statistic-title">
                                    Avg. Waiting<br />Time 
								</div>

								<div class="statistic-value">
                                    {{'mam_waiting' in state && state.mam_waiting.length > 0 ? 
                                        Math.floor(state.mam_waiting[1]) : '?'}} min	
								</div>

								<div class="statistic-icon-background">
									<i class="fa fa-clock-o"></i>
								</div>
							</div>
                        </div>
                        <div class="col col-md-3">
                            <div class="statistic-box bg-danger m-bottom-md">
								<div class="statistic-title">
                                    Max Waiting<br/>Time 
								</div>

								<div class="statistic-value">
                                    {{'mam_waiting' in state && state.mam_waiting.length > 0 ? 
                                        Math.floor(state.mam_waiting[2]) : '?'}} min	
								</div>

								<div class="statistic-icon-background">
									<i class="fa fa-clock-o"></i>
								</div>
							</div>
                        </div>
                        <div class="col col-md-3">
                            <div class="statistic-box bg-primary m-bottom-md">
								<div class="statistic-title">
								    Avg. Processing Time 
								</div>

								<div class="statistic-value">
                                    {{'mam_processing' in state && state.mam_processing.length > 0 ? 
                                        Math.floor(state.mam_processing[1]) : '?'}} min	
								</div>

								<div class="statistic-icon-background">
									<i class="fa fa-cogs"></i>
								</div>
							</div>
                        </div>
                        <div class="col col-md-3">
                            <div class="statistic-box bg-danger m-bottom-md">
								<div class="statistic-title">
								    Max Processing Time 
								</div>

								<div class="statistic-value">
                                    {{'mam_processing' in state && state.mam_processing.length > 0 ? 
                                        Math.floor(state.mam_processing[2]) : '?'}} min	
								</div>

								<div class="statistic-icon-background">
									<i class="fa fa-cogs"></i>
								</div>
							</div>
                        </div>
                    </div>
                    <div class="row" v-if="false">
                        <div class="col col-md-12">
                            <widget>
                                <span slot="title">Raw Data</span>
                                <div slot="body">
                                    <div class="row">
                                    </div>
                                </div>
                            </widget>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-12">
                            <widget>
                                <span slot="title">Registered customers over the period</span>
                                <div slot="body">
                                    <div class="row">
                                        <Histogram 
                                            id="chart_registration" 
                                            title="" 
                                            :timezone="state.tz"
                                            serieName="Registrations" 
                                            :serieData="state.chart_registrations"
                                            :headerFormat="`{point.key:${state.resolution}}<br />`"
                                            pointFormat="<b>{point.y} customers</b>"
                                            :x-axis="{'type': 'datetime'}"
                                            :y-axis="{'title': {'text': 'Registrations'}}"
                                        />
                                    </div>
                                </div>
                            </widget>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-12">
                            <widget>
                                <span slot="title">Called customers over the period</span>
                                <div slot="body">
                                    <div class="row">
                                        <Histogram 
                                            id="chart_callings" 
                                            title="" 
                                            serieName="Callings" 
                                            :timezone="state.tz"
                                            :serieData="state.chart_callings"
                                            :headerFormat="`{point.key:${state.resolution}}<br />`"
                                            pointFormat="<b>{point.y} customers</b>"
                                            :x-axis="{'type': 'datetime'}"
                                            :y-axis="{'title': {'text': 'Calls'}}"
                                        />
                                    </div>
                                </div>
                            </widget>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-6">
                            <widget>
                                <span slot="title">Customers' repartition per desk</span>
                                <div slot="body">
                                    <div class="row">
                                        <Pie 
                                            id="chart_customer_desk" 
                                            title="" 
                                            :timezone="state.tz"
                                            serieName="Customers per desk" 
                                            :serieData="state.chart_pie_desk"
                                            pointFormat="{series.name}: <b>{point.percentage:.1f}%</b>"
                                        />
                                    </div>
                                </div>
                            </widget>
                        </div>
                        <div class="col col-md-6">
                            <widget>
                                <span slot="title">Customer's registration per machine</span>
                                <div slot="body">
                                    <div class="row">
                                        <Pie 
                                            id="chart_customer_machine" 
                                            title="" 
                                            :timezone="state.tz"
                                            serieName="Registration per machine" 
                                            :serieData="state.chart_pie_machine"
                                            pointFormat="{series.name}: <b>{point.percentage:.1f}%</b>"
                                        />
                                    </div>
                                </div>
                            </widget>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-6">
                            <widget>
                                <span slot="title">Customers' repartition per prequalification</span>
                                <div slot="body">
                                    <div class="row">
                                        <Pie 
                                            id="chart_customer_prequalification" 
                                            title="" 
                                            :timezone="state.tz"
                                            serieName="Customers per prequalification" 
                                            :serieData="state.chart_pie_prequalification"
                                            pointFormat="{series.name}: <b>{point.percentage:.1f}%</b>"
                                        />
                                    </div>
                                </div>
                            </widget>
                        </div>
                        <div class="col col-md-6">
                            <widget>
                                <span slot="title">Customer's registration per registration type</span>
                                <div slot="body">
                                    <div class="row">
                                        <Pie 
                                            id="chart_customer_registration_type" 
                                            title="" 
                                            :timezone="state.tz"
                                            serieName="Registration per registration type" 
                                            :serieData="state.chart_pie_rtype"
                                            pointFormat="{series.name}: <b>{point.percentage:.1f}%</b>"
                                        />
                                    </div>
                                </div>
                            </widget>
                        </div>
                    </div>
                </div>
            </widget>
        </div>
    </div>
</template>

<script>
module.exports = require('./Stat');
</script>
