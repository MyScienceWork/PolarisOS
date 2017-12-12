<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">List of users</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                            <div v-for="content in row" class="column">
                                <widget>
                                    <span slot="title">
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(content)"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(content, 'pipeline')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{content.entity}} 
                                    </span>
                                    <div slot="body">
                                    </div>
                                </widget>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="contentLength" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title"></span>
                    <div slot="body">
                        <fform
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.rform"
                        >
                            <finput name="name" :label="lang('b_pipeline_name')" :is-required="true" :placeholder="lang('b_pipeline_name')" type="text" :form="state.cform" />
                            <finput name="entity" :label="lang('b_entity_name')" :is-required="true" :placeholder="lang('b_entity_name')" type="text" :form="state.cform" />
                            <tabber :tabs="[lang('b_defaults'), lang('b_formatters'), lang('b_completers'), lang('b_transformers'), lang('b_validations')]">
                                <template slot="tabs" slot-scope="tprops">
                                    <template v-if="tprops.id === 0">
                                        <fvariadic-element
                                            :key="tprops.id"
                                            name="defaults" 
                                            :form="state.cform" 
                                            :tabs="true">
                                            <template slot="variadic" slot-scope="props">
                                                <finput :name="`${props.fname}.${props.id}.key`" 
                                                    :label="lang('b_name')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_name')" 
                                                    type="text" 
                                                    :form="state.cform" 
                                                />
                                                <finput 
                                                    :name="`${props.fname}.${props.id}.value`" 
                                                    :label="lang('b_value')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_value')" 
                                                    type="text" 
                                                    :form="state.cform" 
                                                />
                                            </template>
                                        </fvariadic-element>
                                    </template>
                                    <template v-else-if="tprops.id === 1">
                                        <fvariadic-element 
                                            name="formatters" 
                                            :form="state.cform" 
                                            :tabs="true"
                                            :key="tprops.id">
                                            <template slot="variadic" slot-scope="props">
                                                <finput 
                                                    :name="`${props.fname}.${props.id}.field`" 
                                                    :label="lang('b_field')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_field')" 
                                                    type="text" 
                                                    :form="state.cform" 
                                                />
                                                <fselect
                                                    :name="`${props.fname}.${props.id}.function.name`" 
                                                    :label="lang('b_function_name')" 
                                                    :is-required="true"
                                                    :options="functions.formatter ? Object.values(functions.formatter) : []"
                                                    fieldLabel="name"
                                                    fieldValue="name"
                                                    :form="state.cform" 
                                                    v-on:select-change="(val) => {function_change(val, 'formatter', props.id)}"
                                                />
                                                
                                                <div v-if="props.id in state.selected_functions.formatter">
                                                    <template v-for="(arg, i) in state.selected_functions.formatter[props.id].arguments">
                                                        <finput
                                                            :name="`${props.fname}.${props.id}.function.arguments.${i}.value`" 
                                                            :label="`${arg.name} (${arg.type})`" 
                                                            :placeholder="`${arg.name} (${arg.type})`" 
                                                            type="text" 
                                                            :form="state.cform" 
                                                        /> 
                                                        <finput
                                                            :name="`${props.fname}.${props.id}.function.arguments.${i}.name`" 
                                                            type="hidden"
                                                            :hidden-value="arg.name"
                                                            :form="state.cform" 
                                                        />
                                                    </template>
                                                </div>
                                            </template>
                                        </fvariadic-element>
                                    </template>
                                    <template v-else-if="tprops.id === 2">
                                        <fvariadic-element 
                                            name="completers" 
                                            :form="state.cform" 
                                            :tabs="true"
                                            :key="tprops.id">
                                            <template slot="variadic" slot-scope="props">
                                                <finput 
                                                    :name="`${props.fname}.${props.id}.field`" 
                                                    :label="lang('b_field')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_field')" 
                                                    type="text" 
                                                    :form="state.cform" 
                                                />
                                                <fselect
                                                    :name="`${props.fname}.${props.id}.function.name`" 
                                                    :label="lang('b_function_name')" 
                                                    :is-required="true"
                                                    :options="functions.completer ? Object.values(functions.completer) : []"
                                                    fieldLabel="name"
                                                    fieldValue="name"
                                                    :form="state.cform" 
                                                    v-on:select-change="(val) => {function_change(val, 'completer', props.id)}"
                                                />
                                                <div v-if="props.id in state.selected_functions.completer">
                                                    <template v-for="(arg, i) in state.selected_functions.completer[props.id].arguments">
                                                        <finput
                                                            :name="`${props.fname}.${props.id}.function.arguments.${i}.value`" 
                                                            :label="`${arg.name} (${arg.type})`" 
                                                            :placeholder="`${arg.name} (${arg.type})`" 
                                                            type="text" 
                                                            :form="state.cform" 
                                                        /> 
                                                        <finput
                                                            :name="`${props.fname}.${props.id}.function.arguments.${i}.name`" 
                                                            type="hidden"
                                                            :hidden-value="arg.name"
                                                            :form="state.cform" 
                                                        />
                                                    </template>
                                                </div>
                                            </template>
                                        </fvariadic-element>
                                    </template>
                                    <template v-else-if="tprops.id === 3">
                                        <fvariadic-element 
                                            name="transformers" 
                                            :form="state.cform" 
                                            :tabs="true"
                                            :key="tprops.id">
                                            <template slot="variadic" slot-scope="props">
                                            </template>
                                        </fvariadic-element>
                                    </template>
                                    <template v-else-if="tprops.id === 4">
                                        <fvariadic-element 
                                            name="validators" 
                                            :form="state.cform" 
                                            :tabs="true"
                                            :key="tprops.id">
                                            <template slot="variadic" slot-scope="props">
                                                <finput 
                                                    :name="`${props.fname}.${props.id}.field`" 
                                                    :label="lang('b_field')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('b_field')" 
                                                    type="text" 
                                                    :form="state.cform" 
                                                />
                                                <fselect
                                                    :name="`${props.fname}.${props.id}.type`" 
                                                    :label="lang('b_validator_type')" 
                                                    :placeholder="lang('b_validator_type')"
                                                    :is-required="true"
                                                    :options="valtypes|| []"
                                                    :form="state.cform" 
                                                />
                                                <finput 
                                                    :name="`${props.fname}.${props.id}.required`" 
                                                    :label="lang('b_field_required')" 
                                                    type="checkbox" 
                                                    :form="state.cform" 
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
