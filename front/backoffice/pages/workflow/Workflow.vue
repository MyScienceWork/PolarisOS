<template>
    <div class="holy-grail-content">
        <div class="container is-fluid">
            <div class="columns">
                <div class="column">
                    <widget>
                        <span slot="title">{{lang('l_list_of_workflow')}}</span>
                        <div slot="body">
                            <fsearching
                                    :search-sink="state.sinks.creations.search"
                                    :result-sink="state.sinks.reads.workflow"
                                    :search-path="state.paths.reads.workflow"
                                    :search-query="es_query_content"
                                    :use-default-query="true"
                                    search-type="workflow"
                                    :change-with-create-success="true"
                                    :form-create-success="state.sinks.creations.workflow"
                            >
                                <widget slot="search-result" slot-scope="props">
                                    <span slot="title">
                                        <action-button
                                                class="has-text-blue share-icon"
                                                tag="a"
                                                @action-click="update(props.info, 'workflow')"
                                                v-scroll-to="'#mwidget'"
                                        >
                                            <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                                class="has-text-orange share-icon"
                                                tag="a"
                                                @action-click="use_as_model(props.info, 'workflow')"
                                                v-scroll-to="'#mwidget'"
                                        >
                                            <i class="fa fa-clone"></i>
                                        </action-button>
                                        <action-button
                                                class="has-text-red share-icon"
                                                tag="a"
                                                confirmation="l_are_you_sure"
                                                :two-steps="true"
                                                @action-click="remove(props.info, 'workflow')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{props.info.label}} ({{props.info.name}})
                                    </span>
                                    <div slot="body">
                                    </div>
                                </widget>
                            </fsearching>
                        </div>
                    </widget>
                </div>
            </div>
            <div class="columns" v-if="has_cu_access('entity')">
                <div class="column">
                    <widget id="mwidget">
                    <span slot="title">
                    {{lang('l_add_or_modify_workflow')}}
                    </span>
                    <div slot="body">
                        <fform
                                :name="state.sinks.creations.workflow"
                                :post_path="state.paths.creations.workflow"
                                :put_path="state.paths.creations.workflow"
                                :get_path="state.paths.reads.workflow"
                                :get_form="state.sinks.reads.workflow"
                        >
                          <finput name="name" :label="lang('b_workflow_name')" :is-required="true" :placeholder="lang('b_workflow_name')" type="text" :form="state.sinks.creations.workflow" />
                            <finput name="label" :label="lang('b_label')" :is-required="true" :placeholder="lang('b_label')" type="text" :form="state.sinks.creations.workflow" />
                            <finput rows="5" name="description" :label="lang('b_workflow_description')" :placeholder="lang('b_workflow_description')" type="textarea" :form="state.sinks.creations.workflow" />
                            <fselect
                                    name="entity"
                                    :label="lang('b_entity_name')"
                                    :is-required="true"
                                    :options="entitys"
                                    fieldValue="type"
                                    fieldLabel="type"
                                    :form="state.sinks.creations.workflow"
                                    :translatable="true"
                            />
                            <fselect
                                    name="entity_state"
                                    :label="lang('b_entity_state')"
                                    :is-required="true"
                                    :options="entitys"
                                    fieldValue="type"
                                    fieldLabel="type"
                                    :form="state.sinks.creations.workflow"
                                    v-on:select-change="(val) => {update_entity_states(val)}"
                            />
                            <fselect
                                    name="initial_state"
                                    :label="lang('b_initial_state')"
                                    :is-required="true"
                                    :options="entity_states"
                                    fieldValue="_id"
                                    fieldLabel="label"
                                    :translatable="true"
                                    :help="lang('l_backoffice_initial_state_before_help')"
                                    :form="state.sinks.creations.workflow"
                            />
                            <fvariadic-element name="steps" :form="state.sinks.creations.workflow" :tabs="true">
                                <template slot="variadic" slot-scope="props">
                                    <fselect
                                        :name="`${props.fname}.${props.order}.type`"
                                        :label="lang('b_type')"
                                        :is-required="true"
                                        :options="step_types()"
                                        fieldValue="type"
                                        fieldLabel="label"
                                        :form="state.sinks.creations.workflow"
                                    />
                                    <finput :name="`${props.fname}.${props.order}.name`" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.sinks.creations.workflow" />
                                    <finput :name="`${props.fname}.${props.order}.label`" :label="lang('b_label')" :is-required="true" :placeholder="lang('b_label')" type="text" :form="state.sinks.creations.workflow" />
                                    <finput rows="5" :name="`${props.fname}.${props.order}.description`" :label="lang('b_description')" :placeholder="lang('b_description')" type="textarea" :form="state.sinks.creations.workflow" />
                                    <finput :name="`${props.fname}.${props.order}.order`" :label="lang('b_field_order')" :is-required="true" :placeholder="lang('b_field_order')" type="number" :form="state.sinks.creations.workflow" />
                                    <fselect
                                            :name="`${props.fname}.${props.order}.roles`"
                                            :label="lang('b_role', {}, 'other')"
                                            :is-required="true"
                                            :options="roles || []"
                                            :form="state.sinks.creations.workflow"
                                            field-value="_id"
                                            field-label="name"
                                            :multi="true"
                                            :translatable="true"
                                            :help="lang('l_backoffice_role_help')"
                                    />
                                    <finput :name="`${props.fname}.${props.order}.filter`" :label="lang('b_filter')" :is-required="true" :placeholder="lang('b_filter')" type="text" :form="state.sinks.creations.workflow" />
                                    <fselect
                                            :name="`${props.fname}.${props.order}.state_before`"
                                            :label="lang('b_state_before', {}, 'other')"
                                            :is-required="true"
                                            :options="entity_states"
                                            :form="state.sinks.creations.workflow"
                                            field-value="_id"
                                            field-label="label"
                                            :multi="true"
                                            :translatable="true"
                                            :help="lang('l_backoffice_entity_state_before_help')"
                                    />
                                    <fselect
                                            :name="`${props.fname}.${props.order}.state_after`"
                                            :label="lang('b_state_after', {}, 'other')"
                                            :is-required="true"
                                            :options="entity_states"
                                            :form="state.sinks.creations.workflow"
                                            field-value="_id"
                                            field-label="label"
                                            :multi="true"
                                            :translatable="true"
                                            :help="lang('l_backoffice_entity_state_after_help')"
                                    />
                                    <fvariadic-element name="conditions" :form="state.sinks.creations.workflow" :tabs="true">
                                      <template slot="variadic" slot-scope="props2">
                                        <finput :name="`${props.fname}.${props.order}.${props2.fname}.${props2.order}.condition`" :label="lang('b_condition')" :is-required="true" :placeholder="lang('b_condition')" type="text" :form="state.sinks.creations.workflow" />
                                        <fselect
                                            :name="`${props.fname}.${props.order}.${props2.fname}.${props2.order}.actions`"
                                            :label="lang('b_action')"
                                            :is-required="true"
                                            :options="actions"
                                            :multi="true"
                                            fieldValue="_id"
                                            fieldLabel="name"
                                            :form="state.sinks.creations.workflow"
                                        />
                                      </template>
                                    </fvariadic-element>
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
    module.exports = require('./Workflow');
</script>
