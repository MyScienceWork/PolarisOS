<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_charts')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.chart"
                            :search-path="state.paths.reads.chart"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="chart"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(props.info, 'chart')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(props.info, 'chart')"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    :confirmation="lang('l_remove_confirmation')"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'chart')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
                                    {{props.info.name}} 
                                </span>
                                <div slot="body">
                                </div>
                            </widget>
                        </fsearching>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget id="mwidget">
                    <span slot="title">
                    {{lang('l_add_or_modify_chart_configuration')}}
                    </span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.chart" 
                            :post_path="state.paths.creations.chart" 
                            :put_path="state.paths.creations.chart"
                            :get_path="state.paths.reads.chart"
                            :get_form="state.sinks.reads.chart"
                        >
                            <finput 
                                name="name" 
                                :label="lang('b_name')" 
                                :is-required="true" 
                                :placeholder="lang('b_name')" 
                                type="text" 
                                :form="state.sinks.creations.chart" 
                            />
                            <widget>
                                <span slot="title">
                                    {{lang('l_query_and_aggregation')}}
                                </span>
                                <div slot="body">
                                    <finput 
                                        rows="30" name="query" 
                                        :label="lang('l_query_content_json')" 
                                        :is-required="true" 
                                        type="ide-editor" :form="state.sinks.creations.chart"
                                    />
                                    <finput 
                                        rows="30" name="aggregation" 
                                        :label="lang('l_aggregation_content_json')" 
                                        :is-required="true" 
                                        type="ide-editor" :form="state.sinks.creations.chart"
                                    />
                                </div>
                            </widget>
                            <widget>
                                <span slot="title">
                                    {{lang('l_chart_configuration')}}
                                </span>
                                <div slot="body">
                                    <fselect
                                        name="chart" 
                                        :label="lang('l_chart_type')" 
                                        :is-required="true"
                                        :options="chart_types"
                                        :form="state.sinks.creations.chart" 
                                    />
                                    <finput 
                                        name="title" 
                                        :label="lang('l_chart_title')" 
                                        :is-required="true" 
                                        type="text" 
                                        :form="state.sinks.creations.chart"
                                    />
                                    <finput 
                                        name="suntitle" 
                                        :label="lang('l_chart_subtitle')" 
                                        type="text" 
                                        :form="state.sinks.creations.chart"
                                    />
                                    <widget :collapsed="true">
                                        <span slot="title">
                                            {{lang('l_chart_format')}}
                                        </span>
                                        <div slot="body">

                                        </div>
                                    </widget>
                                    <widget :collapsed="true">
                                        <span slot="title">
                                            {{lang('l_chart_axis')}}
                                        </span>
                                        <div slot="body">
                                        </div>
                                    </widget>
                                </div>
                            </widget>
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./ChartConfiguration');
</script>
