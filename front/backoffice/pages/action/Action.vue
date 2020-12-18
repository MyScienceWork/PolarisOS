<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_list_actions')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.action"
                            :search-path="state.paths.reads.action"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="action"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(props.info, 'action')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(props.info, 'action')"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'action')"
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
                    <span slot="title">{{lang('l_add_or_modify_action')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.action"
                            :post_path="state.paths.creations.action"
                            :put_path="state.paths.creations.action"
                            :get_path="state.paths.reads.action"
                            :get_form="state.sinks.reads.action"
                            >
                                <finput name="name" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.sinks.creations.action" />
                                <fselect
                                    name="type"
                                    :label="lang('l_type')"
                                    :placeholder="lang('l_type')"
                                    :is-required="true"
                                    :options="action_types()"
                                    field-label="label"
                                    field-value="type"
                                    :form="state.sinks.creations.action"
                                    :translatable="true"
                                    v-on:select-change="(val) => {update_type(val)}"
                                />
                                <fselect
                                    v-if="state.selected_type === 'email'"
                                    name="email_template"
                                    :label="lang('l_email_template')"
                                    :placeholder="lang('l_email_template')"
                                    :is-required="true"
                                    :options="emails"
                                    field-label="name"
                                    field-value="_id"
                                    :form="state.sinks.creations.action"
                                    :translatable="true"
                                />
                                <finput v-if="state.selected_type === 'email'" name="recipient" :label="lang('b_recipient')" :is-required="true" :placeholder="lang('b_recipient')" type="text" :form="state.sinks.creations.action" />
                                <fselect
                                    v-if="state.selected_type === 'change_state'"
                                    name="entity_state"
                                    :label="lang('b_entity_state')"
                                    :is-required="true"
                                    :options="entitys"
                                    fieldValue="type"
                                    fieldLabel="type"
                                    :form="state.sinks.creations.action"
                                    v-on:select-change="(val) => {update_entity_states(val)}"
                                />
                                <fselect
                                    v-if="state.selected_type === 'change_state'"
                                    name="state"
                                    :label="lang('b_next_state')"
                                    :is-required="true"
                                    :options="entity_states"
                                    fieldValue="_id"
                                    fieldLabel="label"
                                    :translatable="true"
                                    :help="lang('l_backoffice_state_help')"
                                    :form="state.sinks.creations.action"
                                />
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Action');
</script>
