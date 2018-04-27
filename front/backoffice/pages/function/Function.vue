<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_list_functions')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.function"
                            :search-path="state.paths.reads.function"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="function"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(props.info, 'function')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(props.info, 'function')"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'function')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
                                    {{props.info.name}} ({{props.info.type}}) 
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
                    <span slot="title">{{lang('l_add_or_modify_function')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.function" 
                            :post_path="state.paths.creations.function" 
                            :put_path="state.paths.creations.function"
                            :get_path="state.paths.reads.function"
                            :get_form="state.sinks.reads.function"
                            >
                                <finput name="name" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.sinks.creations.function" />
                                <finput name="type" :label="lang('b_type')" :is-required="true" :placeholder="lang('b_type')" type="text" :form="state.sinks.creations.function" />
                                <h4 class="title is-3">{{lang('b_function_argument', {}, 'other')}}</h4>
                                <hr />
                                <fvariadic-element 
                                    name="arguments" 
                                    :form="state.sinks.creations.function" 
                                    :tabs="true">
                                    <template slot="variadic" slot-scope="props">
                                        <finput 
                                            :name="`${props.fname}.${props.id}.name`"
                                            :label="lang('b_name')" 
                                            :is-required="true" 
                                            :placeholder="lang('b_name')" 
                                            type="text" 
                                            :form="state.sinks.creations.function"
                                        />
                                        <finput 
                                            :name="`${props.fname}.${props.id}.type`"
                                            :label="lang('b_type')" 
                                            :is-required="true" 
                                            :placeholder="lang('b_type')" 
                                            type="text" 
                                            :form="state.sinks.creations.function"
                                        />
                                        <finput 
                                            :name="`${props.fname}.${props.id}.default`"
                                            :label="lang('b_default_value')" 
                                            :is-required="true" 
                                            :placeholder="lang('b_default_value')" 
                                            type="text" 
                                            :form="state.sinks.creations.function" 
                                        />
                                    </template>
                                    </fvariadic-element>
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Function');
</script>
