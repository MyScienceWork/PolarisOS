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
                            <fselect
                                name="entity" 
                                :label="lang('l_entity')" 
                                :placeholder="lang('l_entity')" 
                                :is-required="true"
                                :options="entities"
                                field-label="type"
                                field-value="type"
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
                                    <fvariadic-element name="aggregations" :form="state.sinks.creations.chart" :tabs="true">
                                        <template slot="variadic" slot-scope="props">
                                            <finput 
                                                rows="30" :name="`${props.fname}.${props.order}.aggregation`" 
                                                :label="lang('l_aggregation_content_json')" 
                                                :is-required="true" 
                                                type="ide-editor" :form="state.sinks.creations.chart"
                                            />
                                            <finput 
                                                :name="`${props.fname}.${props.order}.name`"
                                                :label="lang('l_chart_aggregation_name')" 
                                                :placeholder="lang('l_chart_aggregation_name')" 
                                                type="text" 
                                                :form="state.sinks.creations.chart"
                                            />
                                            <fselect
                                                :name="`${props.fname}.${props.order}.entity`"
                                                :label="lang('l_aggregation_entity')" 
                                                :placeholder="lang('l_aggregation_entity')" 
                                                :options="entities"
                                                field-label="type"
                                                field-value="type"
                                                :form="state.sinks.creations.chart" 
                                            />
                                            <finput 
                                                :name="`${props.fname}.${props.order}.field_entity`"
                                                :label="lang('l_chart_aggregation_field_entity')" 
                                                :placeholder="lang('l_chart_aggregation_field_entity')" 
                                                type="text" 
                                                :form="state.sinks.creations.chart"
                                            />
                                            <fcolor
                                                :name="`${props.fname}.${props.order}.color`"
                                                :form="state.sinks.creations.chart"
                                                :label="lang('l_chart_aggregation_color')" 
                                            />
                                        </template>
                                    </fvariadic-element>
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
                                        :placeholder="lang('l_chart_title')" 
                                        :is-required="true" 
                                        type="text" 
                                        :form="state.sinks.creations.chart"
                                    />
                                    <finput 
                                        name="subtitle" 
                                        :label="lang('l_chart_subtitle')" 
                                        :placeholder="lang('l_chart_subtitle')" 
                                        type="text" 
                                        :form="state.sinks.creations.chart"
                                    />
                                    <widget :collapsed="true">
                                        <span slot="title">
                                            {{lang('l_chart_format')}}
                                        </span>
                                        <div slot="body">
                                            <finput 
                                                name="format.header" 
                                                :label="lang('l_chart_format_header')" 
                                                :placeholder="lang('l_chart_format_header')" 
                                                type="text" 
                                                :form="state.sinks.creations.chart"
                                            />
                                            <finput 
                                                name="format.footer" 
                                                :label="lang('l_chart_format_footer')" 
                                                :placeholder="lang('l_chart_format_footer')" 
                                                type="text" 
                                                :form="state.sinks.creations.chart"
                                            />
                                            <finput 
                                                name="format.point" 
                                                :label="lang('l_chart_format_point')" 
                                                :placeholder="lang('l_chart_format_point')" 
                                                type="text" 
                                                :form="state.sinks.creations.chart"
                                            />
                                            <finput 
                                                name="tooltip.shared" 
                                                :label="lang('l_chart_shared_tooltip')" 
                                                type="checkbox" 
                                                :form="state.sinks.creations.chart"
                                            />
                                            <finput 
                                                name="tooltip.use_html" 
                                                :label="lang('l_chart_tooltip_use_html')" 
                                                type="checkbox" 
                                                :form="state.sinks.creations.chart"
                                            />
                                        </div>
                                    </widget>
                                    <widget :collapsed="true">
                                        <span slot="title">
                                            {{lang('l_chart_axis')}}
                                        </span>
                                        <div slot="body">
                                            <h4 class="title is-4">{{lang('l_chart_x_axis')}}</h4>
                                            <hr />
                                            <finput 
                                                name="axis.x.title" 
                                                :label="lang('l_chart_axis_title')" 
                                                :placeholder="lang('l_chart_axis_title')" 
                                                type="text" 
                                                :form="state.sinks.creations.chart"
                                            />
                                            <h4 class="title is-4">{{lang('l_chart_y_axis')}}</h4>
                                            <hr />
                                            <finput 
                                                name="axis.y.title" 
                                                :label="lang('l_chart_axis_title')" 
                                                :placeholder="lang('l_chart_axis_title')" 
                                                type="text"
                                                :is-required="true"
                                                :form="state.sinks.creations.chart"
                                            />
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
