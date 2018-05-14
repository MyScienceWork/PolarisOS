<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_pipelines')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.pipeline"
                            :search-path="state.paths.reads.pipeline"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="pipeline"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    @action-click="update(props.info, 'pipeline')"
                                    v-scroll-to="'#mwidget'"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    @action-click="use_as_model(props.info, 'pipeline')"
                                    v-scroll-to="'#mwidget'"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'pipeline')"
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
                <span slot="title">{{lang('l_add_or_modify_pipeline')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.pipeline" 
                            :post_path="state.paths.creations.pipeline" 
                            :put_path="state.paths.creations.pipeline" 
                            :get_path="state.paths.reads.pipeline"
                            :get_form="state.sinks.reads.pipeline"
                        >
                            <finput name="name" :label="lang('b_pipeline_name')" :is-required="true" :placeholder="lang('b_pipeline_name')" type="text" :form="state.sinks.creations.pipeline" />
                            <tabber :tabs="[lang('b_defaults', {}, 'other'), lang('b_formatters', {}, 'other'), lang('b_completers', {}, 'other'), lang('b_transformers', {}, 'other'), lang('b_validations', {}, 'other')]">
                                <template slot="body" slot-scope="tprops">
                                    <template v-if="tprops.id === 0">
                                        <fvariadic-element
                                            :key="tprops.id"
                                            name="defaults" 
                                            :form="state.sinks.creations.pipeline" 
                                            :is-required="false"
                                            :tabs="true">
                                            <template slot="variadic" slot-scope="props">
                                                <finput :name="`${props.fname}.${props.order}.key`" 
                                                    :label="lang('b_name')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_name')" 
                                                    type="text" 
                                                    :form="state.sinks.creations.pipeline" 
                                                />
                                                <finput 
                                                    :name="`${props.fname}.${props.order}.value`" 
                                                    :label="lang('b_value')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_value')" 
                                                    type="text" 
                                                    :form="state.sinks.creations.pipeline" 
                                                />
                                            </template>
                                        </fvariadic-element>
                                    </template>
                                    <template v-else-if="tprops.id === 1">
                                        <fvariadic-element 
                                            name="formatters" 
                                            :form="state.sinks.creations.pipeline" 
                                            :tabs="true"
                                            :is-required="false"
                                            :key="tprops.id">
                                            <template slot="variadic" slot-scope="props">
                                                <finput 
                                                    :name="`${props.fname}.${props.order}.field`" 
                                                    :label="lang('b_field')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_field')" 
                                                    type="text" 
                                                    :form="state.sinks.creations.pipeline" 
                                                />
                                                <fselect
                                                    :name="`${props.fname}.${props.order}.function.name`" 
                                                    :label="lang('b_function_name')" 
                                                    :is-required="true"
                                                    :options="functions.formatter ? Object.values(functions.formatter) : []"
                                                    fieldLabel="name"
                                                    fieldValue="name"
                                                    :form="state.sinks.creations.pipeline" 
                                                    v-on:select-change="(val) => {function_change(val, 'formatter', props.id)}"
                                                />
                                                
                                                <div v-if="props.id in state.selected_functions.formatter">
                                                    <template v-for="(arg, i) in state.selected_functions.formatter[props.id].arguments">
                                                        <finput
                                                            :name="`${props.fname}.${props.order}.function.arguments.${i}.value`" 
                                                            :label="`${arg.name} (${arg.type})`" 
                                                            :placeholder="`${arg.name} (${arg.type})`" 
                                                            type="text" 
                                                            :form="state.sinks.creations.pipeline" 
                                                        /> 
                                                        <finput
                                                            :name="`${props.fname}.${props.order}.function.arguments.${i}.name`" 
                                                            type="hidden"
                                                            :hidden-value="arg.name"
                                                            :form="state.sinks.creations.pipeline" 
                                                        />
                                                        <finput
                                                            :name="`${props.fname}.${props.order}.function.arguments.${i}.type`" 
                                                            type="hidden"
                                                            :hidden-value="arg.type"
                                                            :form="state.sinks.creations.pipeline" 
                                                        />
                                                    </template>
                                                </div>
                                            </template>
                                        </fvariadic-element>
                                    </template>
                                    <template v-else-if="tprops.id === 2">
                                        <fvariadic-element 
                                            name="completers" 
                                            :form="state.sinks.creations.pipeline" 
                                            :tabs="true"
                                            :is-required="false"
                                            :key="tprops.id">
                                            <template slot="variadic" slot-scope="props">
                                                <finput 
                                                    :name="`${props.fname}.${props.order}.field`" 
                                                    :label="lang('b_field')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_field')" 
                                                    type="text" 
                                                    :form="state.sinks.creations.pipeline" 
                                                />
                                                <fselect
                                                    :name="`${props.fname}.${props.order}.function.name`" 
                                                    :label="lang('b_function_name')" 
                                                    :is-required="true"
                                                    :options="functions.completer ? Object.values(functions.completer) : []"
                                                    fieldLabel="name"
                                                    fieldValue="name"
                                                    :form="state.sinks.creations.pipeline" 
                                                    v-on:select-change="(val) => {function_change(val, 'completer', props.id)}"
                                                />
                                                <div v-if="props.id in state.selected_functions.completer">
                                                    <template v-for="(arg, i) in state.selected_functions.completer[props.id].arguments">
                                                        <finput
                                                            :name="`${props.fname}.${props.order}.function.arguments.${i}.value`" 
                                                            :label="`${arg.name} (${arg.type})`" 
                                                            :placeholder="`${arg.name} (${arg.type})`" 
                                                            type="text" 
                                                            :form="state.sinks.creations.pipeline" 
                                                        /> 
                                                        <finput
                                                            :name="`${props.fname}.${props.order}.function.arguments.${i}.name`" 
                                                            type="hidden"
                                                            :hidden-value="arg.name"
                                                            :form="state.sinks.creations.pipeline" 
                                                        />
                                                        <finput
                                                            :name="`${props.fname}.${props.order}.function.arguments.${i}.type`" 
                                                            type="hidden"
                                                            :hidden-value="arg.type"
                                                            :form="state.sinks.creations.pipeline" 
                                                        />
                                                    </template>
                                                </div>
                                            </template>
                                        </fvariadic-element>
                                    </template>
                                    <template v-else-if="tprops.id === 3">
                                        <fvariadic-element 
                                            name="transformers" 
                                            :form="state.sinks.creations.pipeline" 
                                            :tabs="true"
                                            :is-required="false"
                                            :key="tprops.id">
                                            <template slot="variadic" slot-scope="props">
                                            </template>
                                        </fvariadic-element>
                                    </template>
                                    <template v-else-if="tprops.id === 4">
                                        <fvariadic-element 
                                            name="validators" 
                                            :form="state.sinks.creations.pipeline" 
                                            :tabs="true"
                                            :is-required="false"
                                            :key="tprops.id">
                                            <template slot="variadic" slot-scope="props">
                                                <finput 
                                                    :name="`${props.fname}.${props.order}.field`" 
                                                    :label="lang('b_field')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_field')" 
                                                    type="text" 
                                                    :form="state.sinks.creations.pipeline" 
                                                />
                                                <fselect
                                                    :name="`${props.fname}.${props.order}.type`" 
                                                    :label="lang('b_validator_type')" 
                                                    :placeholder="lang('b_validator_type')"
                                                    :is-required="true"
                                                    :options="valtypes|| []"
                                                    :form="state.sinks.creations.pipeline" 
                                                />
                                                <finput 
                                                    :name="`${props.fname}.${props.order}.required`" 
                                                    :label="lang('b_field_required')" 
                                                    type="checkbox" 
                                                    :form="state.sinks.creations.pipeline" 
                                                />
                                            </template>
                                        </fvariadic-element>
                                    </template>
                                </template>
                            </tabber>
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Pipeline');
</script>
