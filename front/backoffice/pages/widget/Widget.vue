<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_widgets')}}</span>
                    <div slot="body">
                        <div v-for="row in read_content_widget" class="columns is-centered">
                            <div v-for="info in row" class="column">
                                <widget>
                                    <span slot="title">{{info.name}} 
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(info, 'widget')"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(info, 'widget')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                    </span>
                                    <div slot="body">
                                    </div>
                                </widget>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="length_widget" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_add_or_modify_widget')}}</span>
                    <div slot="body">
                    <fform 
                        :name="state.sinks.creations.widget" 
                        :post_path="state.paths.creations.widget" 
                        :put_path="state.paths.creations.widget" 
                        :get_path="state.paths.reads.widget" 
                        :get_form="state.sinks.reads.widget"
                    >
                        <finput 
                        name="name" 
                        label="Widget name" 
                        :is-required="true" 
                        placeholder="Widget name" 
                        type="text" 
                        :form="state.sinks.creations.widget" 
                        />
                        <finput 
                        name="file" 
                        label="Widget component" 
                        :is-required="true" 
                        placeholder="Widget component" 
                        type="text" 
                        :form="state.sinks.creations.widget" 
                        />
                        <widget>
                        <span slot="title">{{lang('l_widget_text', {}, 'other')}}</span>
                            <div slot="body">
                                <fvariadic-element name="texts" :form="state.sinks.creations.widget" :is-required="false" :tabs="true">
                                    <template slot="variadic" slot-scope="props">
                                        <finput 
                                        :name="`${props.fname}.${props.order}.name`" 
                                        label="Text name" 
                                        :is-required="true" 
                                        placeholder="Text name" 
                                        type="text" 
                                        :form="state.sinks.creations.widget" 
                                        />
                                        <finput 
                                        :name="`${props.fname}.${props.order}.help`" 
                                        label="Text help" 
                                        :is-required="true" 
                                        placeholder="Text help" 
                                        type="text" 
                                        :form="state.sinks.creations.widget" 
                                        />
                                    </template>
                                </fvariadic-element>
                            </div>
                        </widget>
                        <widget>
                        <span slot="title">{{lang('l_widget_variable', {}, 'other')}}</span>
                            <div slot="body">
                                <fvariadic-element name="variables" :form="state.sinks.creations.widget" :is-required="false" :tabs="true">
                                    <template slot="variadic" slot-scope="props">
                                        <finput 
                                        :name="`${props.fname}.${props.order}.name`" 
                                        label="Variable name" 
                                        :is-required="true" 
                                        placeholder="Variable name" 
                                        type="text" 
                                        :form="state.sinks.creations.widget" 
                                        />
                                        <fselect 
                                        :name="`${props.fname}.${props.order}.type`" 
                                        label="Variable type" 
                                        :is-required="true" 
                                        placeholder="Variable type" 
                                        :options="variable_types" 
                                        :form="state.sinks.creations.widget" 
                                        />
                                        <finput 
                                        :name="`${props.fname}.${props.order}.value`" 
                                        label="Default value"
                                        :is-required="true" 
                                        placeholder="Default value" 
                                        type="text" 
                                        :form="state.sinks.creations.widget" 
                                        />
                                        <finput 
                                        :name="`${props.fname}.${props.order}.help`" 
                                        label="Variable help" 
                                        :is-required="true" 
                                        placeholder="Variable help" 
                                        type="text" 
                                        :form="state.sinks.creations.widget" 
                                        />
                                    </template>
                                </fvariadic-element>
                            </div>
                        </widget>
                        <widget>
                            <span slot="title">{{lang('l_widget_event', {}, 'other')}}</span>
                            <div slot="body">
                                <fvariadic-element name="events" :form="state.sinks.creations.widget" :is-required="false" :tabs="true">
                                    <template slot="variadic" slot-scope="props">
                                        <finput 
                                        :name="`${props.fname}.${props.order}.name`" 
                                        label="Event name" 
                                        :is-required="true" 
                                        placeholder="Event name" 
                                        type="text" 
                                        :form="state.sinks.creations.widget" 
                                        />
                                        <finput 
                                        :name="`${props.fname}.${props.order}.help`" 
                                        label="Event help" 
                                        :is-required="true" 
                                        placeholder="Event help" 
                                        type="text" 
                                        :form="state.sinks.creations.widget" 
                                        />
                                    </template>
                                </fvariadic-element>
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
module.exports = require('./Widget');
</script>
