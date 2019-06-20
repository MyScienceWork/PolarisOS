<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_list_of_forms')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.form"
                            :search-path="state.paths.reads.form"
                            :search-query="search_query"
                            :use-default-query="true"
                            search-type="form"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <action-button
                                    class="has-text-blue share-icon"
                                    tag="a"
                                    @action-click="update(props.info, 'form')"
                                    v-scroll-to="'#mwidget'"
                                    >
                                        <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange share-icon"
                                    tag="a"
                                    @action-click="use_as_model(props.info, 'form')"
                                    v-scroll-to="'#mwidget'"
                                    >
                                        <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red share-icon"
                                    tag="a"
                                    confirmation="l_are_you_sure"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'form')"
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
        <div class="columns">
            <div class="column">
                <widget id="mwidget">
                <span slot="title">{{lang('l_add_or_modify_form')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.form"
                            :post_path="state.paths.creations.form"
                            :put_path="state.paths.creations.form"
                            :get_path="state.paths.reads.form"
                            :get_form="state.sinks.reads.form"
                            >
                            <finput name="name" :label="lang('b_form_name')" :is-required="true" :placeholder="lang('b_form_name')" type="text" :form="state.sinks.creations.form" />
                            <finput name="label" :label="lang('b_label')" :placeholder="lang('b_label')" type="text" :form="state.sinks.creations.form" :is-required="true" />
                            <finput rows="5" name="description" :label="lang('b_form_description')" :placeholder="lang('b_form_description')" type="textarea" :form="state.sinks.creations.form" />
                            <finput
                                name="addons"
                                :label="lang('b_has_addons')"
                                type="checkbox"
                                :form="state.sinks.creations.form"
                            />
                            <fvariadic-element name="fields" :form="state.sinks.creations.form" :tabs="true">
                                <template slot="variadic" slot-scope="props">
                                    <finput :name="`${props.fname}.${props.order}.name`" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.sinks.creations.form" />
                                    <finput :name="`${props.fname}.${props.order}.required`" :label="lang('b_field_required')" :is-required="true" :placeholder="lang('b_field_required')" type="checkbox" :form="state.sinks.creations.form" />
                                    <finput :name="`${props.fname}.${props.order}.readonly`" :label="lang('l_field_readonly')" :is-required="true" :placeholder="lang('l_field_readonly')" type="checkbox" :form="state.sinks.creations.form" />
                                    <finput :name="`${props.fname}.${props.order}.duplicate_warning`" :label="lang('l_field_duplicate_warning')" :is-required="true" :placeholder="lang('l_field_duplicate_warning')" type="checkbox" :form="state.sinks.creations.form" />
                                    <finput :name="`${props.fname}.${props.order}.help.content`" :label="lang('l_help')" :placeholder="lang('l_help')" type="text" :form="state.sinks.creations.form" :is-required="true" />
                                    <finput :name="`${props.fname}.${props.order}.help.use_modal`" :label="lang('l_show_help_as_modal')" :placeholder="lang('l_show_help_as_modal')" type="checkbox" :form="state.sinks.creations.form" :is-required="true" />
                                    <finput v-if="state.selected_types[props.id] !== 'hidden'" :name="`${props.fname}.${props.order}.label`" :label="lang('b_label')" :is-required="true" :placeholder="lang('b_label')" type="text" :form="state.sinks.creations.form" />
                                    <finput :name="`${props.fname}.${props.order}.order`" :label="lang('b_field_order')" :is-required="true" :placeholder="lang('b_field_order')" type="number" :form="state.sinks.creations.form" />
                                    <finput :name="`${props.fname}.${props.order}.multiple`" :label="lang('b_field_multiple')" :placeholder="lang('b_field_multiple')" type="checkbox" :form="state.sinks.creations.form" />
                                    <finput :name="`${props.fname}.${props.order}.multiple_name`" :label="lang('b_field_multiple_name')" :placeholder="lang('b_field_multiple_name')" type="text" :form="state.sinks.creations.form" />
                                    <finput
                                        :name="`${props.fname}.${props.order}.single_multiple`"
                                        :label="lang('b_single_multiple')"
                                        type="checkbox"
                                        :form="state.sinks.creations.form"
                                    />
                                    <fselect
                                        :name="`${props.fname}.${props.order}.type`"
                                        :label="lang('b_field_type')"
                                        :is-required="true"
                                        :options="fieldtypes"
                                        :form="state.sinks.creations.form"
                                        v-on:select-change="(val) => {type_change(val, props.id)}"
                                    />
                                    <div v-if="props.id in state.selected_types">
                                        <div v-if="['select', 'multi-select', 'radio'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput
                                            :name="`${props.fname}.${props.order}.placeholder`"
                                            :key="`${props.fname}.${props.order}.placeholder`"
                                            :label="lang('b_placeholder')" :is-required="true" :placeholder="lang('b_placeholder')" type="text" :form="state.sinks.creations.form" />
                                            <hr />
                                            <h4 class="title h4">{{lang('l_use_range')}}</h4>
                                            <finput
                                            :name="`${props.fname}.${props.order}.range.enabled`"
                                            :key="`${props.fname}.${props.order}.range.enabled`"
                                            :label="lang('l_range_enabled')"
                                            type="checkbox"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.range.start`"
                                            :key="`${props.fname}.${props.order}.range.start`"
                                            :label="lang('l_range_start')"
                                            :is-required="true"
                                            :placeholder="lang('l_range_start')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.range.end`"
                                            :key="`${props.fname}.${props.order}.range.end`"
                                            :label="lang('l_range_end')"
                                            :is-required="true"
                                            :placeholder="lang('l_range_end')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.range.step`"
                                            :key="`${props.fname}.${props.order}.range.step`"
                                            :label="lang('l_range_step')"
                                            :placeholder="lang('l_range_step')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.range.sort`"
                                            :key="`${props.fname}.${props.order}.range.sort`"
                                            :label="lang('l_sort')"
                                            :placeholder="lang('l_sort')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            </hr>
                                            <h4 class="title h4">{{lang('l_use_datasource')}}</h4>
                                            <fselect
                                            :name="`${props.fname}.${props.order}.datasource.name`"
                                            :key="`${props.fname}.${props.order}.datasource.name`"
                                            :label="lang('b_datasource_name')" :is-required="true"
                                            :options="entities"
                                            fieldLabel="type"
                                            fieldValue="type"
                                            :form="state.sinks.creations.form" />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.fetch_from_sink`"
                                            :key="`${props.fname}.${props.order}.datasource.fetch_from_sink`"
                                            :label="lang('b_datasource_fetch_from_sink')"
                                            type="checkbox"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.sink`"
                                            :key="`${props.fname}.${props.order}.datasource.sink`"
                                            :label="lang('b_datasource_sink')"
                                            :is-required="false"
                                            :placeholder="lang('b_datasource_sink')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <fselect
                                            :name="`${props.fname}.${props.order}.datasource.query`"
                                            :key="`${props.fname}.${props.order}.datasource.query`"
                                            :label="lang('l_query')"
                                            :options="queries"
                                            fieldLabel="name"
                                            fieldValue="id"
                                            :form="state.sinks.creations.form" />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.info_in_sink`"
                                            :key="`${props.fname}.${props.order}.datasource.info_in_sink`"
                                            :label="lang('b_datasource_info_sink')"
                                            :is-required="false"
                                            :placeholder="lang('b_datasource_info_sink')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.label`"
                                            :key="`${props.fname}.${props.order}.datasource.label`"
                                            :label="lang('b_datasource_label')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_label')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.value`"
                                            :key="`${props.fname}.${props.order}.datasource.value`"
                                            :label="lang('b_datasource_value')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_value')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.sort`"
                                            :key="`${props.fname}.${props.order}.datasource.sort`"
                                            :label="lang('l_sort')"
                                            :is-required="true"
                                            :placeholder="lang('l_sort')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.search_fields`"
                                            :key="`${props.fname}.${props.order}.datasource.search_fields`"
                                            :help="lang('l_search_fields_help')"
                                            :label="lang('l_search_fields')"
                                            :placeholder="lang('l_search_fields')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.size`"
                                            :key="`${props.fname}.${props.order}.datasource.size`"
                                            :label="lang('l_size')"
                                            :is-required="false"
                                            :placeholder="lang('l_size')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.action_text`"
                                            :key="`${props.fname}.${props.order}.datasource.action_text`"
                                            :label="lang('b_datasource_action_text')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_action_text')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.header_text`"
                                            :key="`${props.fname}.${props.order}.datasource.header_text`"
                                            :label="lang('b_datasource_header_text')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_header_text')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.help_text`"
                                            :key="`${props.fname}.${props.order}.datasource.help_text`"
                                            :label="lang('b_datasource_help_text')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_help_text')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.ajax`"
                                            :key="`${props.fname}.${props.order}.datasource.ajax`"
                                            :label="lang('b_datasource_ajax')"
                                            type="checkbox"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.ajax_path`"
                                            :key="`${props.fname}.${props.order}.datasource.ajax_path`"
                                            :label="lang('b_datasource_ajax_path')"
                                            :placeholder="lang('b_datasource_ajax_path')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.ajax_value_path`"
                                            :key="`${props.fname}.${props.order}.datasource.ajax_value_path`"
                                            :label="lang('b_datasource_ajax_value_path')"
                                            :placeholder="lang('b_datasource_ajax_value_path')"
                                            type="text"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.translatable`"
                                            :key="`${props.fname}.${props.order}.datasource.translatable`"
                                            :label="lang('b_datasource_translatable')"
                                            type="checkbox"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.use_hlang`"
                                            :key="`${props.fname}.${props.order}.datasource.use_hlang`"
                                            :label="lang('b_datasource_use_hlang')"
                                            type="checkbox"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.add`"
                                            :key="`${props.fname}.${props.order}.datasource.add`"
                                            :label="lang('b_datasource_add')"
                                            type="checkbox"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.modify`"
                                            :key="`${props.fname}.${props.order}.datasource.modify`"
                                            :label="lang('b_datasource_modify')"
                                            type="checkbox"
                                            :form="state.sinks.creations.form"
                                            />
                                            <finput
                                            :name="`${props.fname}.${props.order}.datasource.remove`"
                                            :key="`${props.fname}.${props.order}.datasource.remove`"
                                            :label="lang('b_datasource_remove')"
                                            type="checkbox"
                                            :form="state.sinks.creations.form"
                                            />
                                            <fselect
                                            :name="`${props.fname}.${props.order}.datasource.form`"
                                            :key="`${props.fname}.${props.order}.datasource.form`"
                                            :label="lang('b_form')"
                                            :is-required="true"
                                            :options="forms"
                                            fieldLabel="label"
                                            fieldValue="_id"
                                            :form="state.sinks.creations.form" />
                                            <card color="red">
                                                <div slot="card-content">
                                                    <finput
                                                    :name="`${props.fname}.${props.order}.datasource.form_paths.get`"
                                                    :key="`${props.fname}.${props.order}.datasource.form_paths.get`"
                                                    :label="lang('b_datasource_get_path')"
                                                    :placeholder="lang('b_datasource_get_path')"
                                                    type="text"
                                                    :form="state.sinks.creations.form"
                                                    />
                                                    <finput
                                                    :name="`${props.fname}.${props.order}.datasource.form_paths.delete`"
                                                    :key="`${props.fname}.${props.order}.datasource.form_paths.delete`"
                                                    :label="lang('b_datasource_remove_path')"
                                                    :placeholder="lang('b_datasource_remove_path')"
                                                    type="text"
                                                    :form="state.sinks.creations.form"
                                                    />
                                                    <finput
                                                    :key="`${props.fname}.${props.order}.datasource.form_paths.post`"
                                                    :name="`${props.fname}.${props.order}.datasource.form_paths.post`"
                                                    :label="lang('b_datasource_post_path')"
                                                    :placeholder="lang('b_datasource_post_path')"
                                                    type="text"
                                                    :form="state.sinks.creations.form"
                                                    />
                                                    <finput
                                                    :name="`${props.fname}.${props.order}.datasource.form_paths.put`"
                                                    :key="`${props.fname}.${props.order}.datasource.form_paths.put`"
                                                    :label="lang('b_datasource_put_path')"
                                                    :placeholder="lang('b_datasource_put_path')"
                                                    type="text"
                                                    :form="state.sinks.creations.form"
                                                    />
                                                </div>
                                            </card>
                                        </div>
                                        <div v-else-if="['text', 'phone', 'number', 'email', 'password', 'html-editor', 'date-year', 'date'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput
                                            :name="`${props.fname}.${props.order}.placeholder`"
                                            :key="`${props.fname}.${props.order}.placeholder`"
                                            :label="lang('b_placeholder')" :is-required="true" :placeholder="lang('b_placeholder')" type="text" :form="state.sinks.creations.form" />
                                            <template v-if="state.selected_types[props.id] === 'date'">
                                                <finput
                                                        :name="`${props.fname}.${props.order}.range.start_date`"
                                                        :key="`${props.fname}.${props.order}.range.start_date`"
                                                        :label="lang('l_range_start')"
                                                        :placeholder="lang('l_range_start')"
                                                        type="text"
                                                        :form="state.sinks.creations.form"
                                                />
                                                <finput
                                                        :name="`${props.fname}.${props.order}.range.end_date`"
                                                        :key="`${props.fname}.${props.order}.range.end_date`"
                                                        :label="lang('l_range_end')"
                                                        :placeholder="lang('l_range_end')"
                                                        type="text"
                                                        :form="state.sinks.creations.form"
                                                />
                                            </template>
                                            <template v-if="state.selected_types[props.id] === 'date-year'">
                                                <finput
                                                :name="`${props.fname}.${props.order}.range.start`"
                                                :key="`${props.fname}.${props.order}.range.start`"
                                                :label="lang('l_range_start')"
                                                :is-required="true"
                                                :placeholder="lang('l_range_start')"
                                                type="text"
                                                :form="state.sinks.creations.form"
                                                />
                                                <finput
                                                :name="`${props.fname}.${props.order}.range.end`"
                                                :key="`${props.fname}.${props.order}.range.end`"
                                                :label="lang('l_range_end')"
                                                :is-required="true"
                                                :placeholder="lang('l_range_end')"
                                                type="text"
                                                :form="state.sinks.creations.form"
                                                />
                                                <finput
                                                :name="`${props.fname}.${props.order}.range.step`"
                                                :key="`${props.fname}.${props.order}.range.step`"
                                                :label="lang('l_range_step')"
                                                :placeholder="lang('l_range_step')"
                                                type="text"
                                                :form="state.sinks.creations.form"
                                                />
                                            </template>
                                        </div>
                                        <div v-else-if="['hidden'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput
                                            :name="`${props.fname}.${props.order}.hiddenValue`"
                                            :key="`${props.fname}.${props.order}.hiddenValue`"
                                            :label="lang('b_hidden_value')" :is-required="true" :placeholder="lang('b_hidden_value')" type="text" :form="state.sinks.creations.form" />
                                        </div>
                                        <div v-else-if="['static-html'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput
                                            :name="`${props.fname}.${props.order}.hiddenValue`"
                                            :key="`${props.fname}.${props.order}.hiddenValue`"
                                            :label="lang('l_html_template')"
                                            :is-required="true"
                                            :placeholder="lang('l_html_template')"
                                            type="textarea"
                                            :form="state.sinks.creations.form" />
                                        </div>
                                        <div v-else-if="['subform'].indexOf(state.selected_types[props.id]) !== -1">
                                            <fselect
                                            :name="`${props.fname}.${props.order}.subform`"
                                            :key="`${props.fname}.${props.order}.subform`"
                                            :label="lang('b_subform')"
                                            :is-required="true"
                                            :options="forms"
                                            fieldLabel="label"
                                            fieldValue="_id"
                                            :form="state.sinks.creations.form" />
                                            <fselect
                                            :name="`${props.fname}.${props.order}.subform_information.type`"
                                            :key="`${props.fname}.${props.order}.subform_information.type`"
                                            :label="lang('l_subform_type')"
                                            :is-required="true"
                                            :options="subform_types"
                                            @select-change="(val) => {subform_type_change(val, props.id)}"
                                            :form="state.sinks.creations.form" />
                                            <template v-if="['section', 'widget', 'hidden'].indexOf(state.selected_subform_types[props.id]) !== -1">
                                                <finput
                                                    :key="`${props.fname}.${props.order}.subform_information.title`"
                                                    :name="`${props.fname}.${props.order}.subform_information.title`"
                                                    :label="lang('l_subform_title')"
                                                    :is-required="true"
                                                    :placeholder="lang('l_subform_title')"
                                                    type="text"
                                                    :form="state.sinks.creations.form" />
                                            </template>
                                        </div>
                                        <div v-else-if="['file'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput
                                                :key="`${props.fname}.${props.order}.file.file_name`"
                                                :name="`${props.fname}.${props.order}.file.file_name`"
                                                :label="lang('b_deposit_fieldname')" :is-required="true" :placeholder="lang('b_deposit_fieldname')" type="text" :form="state.sinks.creations.form" />
                                            <finput
                                            :name="`${props.fname}.${props.order}.file.master_name`"
                                            :key="`${props.fname}.${props.order}.file.master_name`"
                                            :label="lang('b_master_fieldname')" :is-required="true" :placeholder="lang('b_master_fieldname')" type="text" :form="state.sinks.creations.form" />
                                            <finput
                                                :name="`${props.fname}.${props.order}.file.url_name`"
                                                :key="`${props.fname}.${props.order}.file.url_name`"
                                                :label="lang('b_url_fieldname')" :is-required="true" :placeholder="lang('b_url_fieldname')" type="text" :form="state.sinks.creations.form" />
                                            <finput
                                                :key="`${props.fname}.${props.order}.file.keeper_sink`"
                                                :label="lang('b_keeper_sink')" :placeholder="lang('b_keeper_sink')" type="text" :form="state.sinks.creations.form" />
                                            <finput
                                                :name="`${props.fname}.${props.order}.file.keep`"
                                                :key="`${props.fname}.${props.order}.file.keep`"
                                                :label="lang('b_keep_files_across_components')" type="checkbox" :form="state.sinks.creations.form" />
                                            <finput :name="`${props.fname}.${props.order}.file.restore`"
                                                :label="lang('b_restore_files_across_components')" type="checkbox" :form="state.sinks.creations.form" />
                                        </div>
                                        <div v-else-if="['importer'].indexOf(state.selected_types[props.id]) !== -1">
                                            <fselect
                                            :name="`${props.fname}.${props.order}.importer`"
                                            :key="`${props.fname}.${props.order}.importer`"
                                            :label="lang('b_importer')"
                                            :is-required="true"
                                            :options="importers"
                                            fieldLabel="name"
                                            fieldValue="_id"
                                            :form="state.sinks.creations.form" />
                                        </div>
                                        <div v-else-if="['dynamic-list'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput
                                                    :key="`${props.fname}.${props.order}.dynamic_list.host`"
                                                    :name="`${props.fname}.${props.order}.dynamic_list.host`"
                                                    :label="lang('b_dynamic_list_host')" :is-required="true" :placeholder="lang('b_dynamic_list_host')" type="text" :form="state.sinks.creations.form" />
                                            <finput
                                                    :key="`${props.fname}.${props.order}.dynamic_list.port`"
                                                    :name="`${props.fname}.${props.order}.dynamic_list.port`"
                                                    :label="lang('b_dynamic_list_port')" :is-required="true" :placeholder="lang('b_dynamic_list_port')" type="text" :form="state.sinks.creations.form" />
                                            <finput
                                                    :key="`${props.fname}.${props.order}.dynamic_list.uri`"
                                                    :name="`${props.fname}.${props.order}.dynamic_list.uri`"
                                                    :label="lang('b_dynamic_list_uri')" :is-required="true" :placeholder="lang('b_dynamic_list_uri')" type="text" :form="state.sinks.creations.form" />
                                            <fselect
                                                    :key="`${props.fname}.${props.order}.dynamic_list.method`"
                                                    :name="`${props.fname}.${props.order}.dynamic_list.method`"
                                                    :label="lang('b_dynamic_list_method')" :is-required="true" :placeholder="lang('b_dynamic_list_method')" type="text" :form="state.sinks.creations.form"
                                                    :options="api_method"
                                                    field-label="label"
                                                    field-value="label"
                                            />
                                            <finput
                                                    :key="`${props.fname}.${props.order}.dynamic_list.selected_mapping`"
                                                    :name="`${props.fname}.${props.order}.dynamic_list.selected_mapping`"
                                                    :label="lang('b_dynamic_list_selected_mapping')" :is-required="true" :placeholder="lang('b_dynamic_list_uri')" type="text" :form="state.sinks.creations.form" />
                                            <finput
                                                    :key="`${props.fname}.${props.order}.dynamic_list.read_only`"
                                                    :name="`${props.fname}.${props.order}.dynamic_list.read_only`"
                                                    :label="lang('b_read_only')"
                                                    type="checkbox"
                                                    :form="state.sinks.creations.form"
                                            />
                                            <span slot="title">
                                            {{lang('b_send_payload')}}
                                            </span>
                                            <fvariadic-element
                                                    :name="`${props.fname}.${props.order}.dynamic_list.send_payload`"
                                                    :form="state.sinks.creations.form"
                                                    :useIcons="false">
                                                <template slot="variadic" slot-scope="fprops">
                                                    <finput
                                                            :name="`${fprops.fname}.${fprops.order}.value`"
                                                            :label="lang('b_value')"
                                                            :is-required="true"
                                                            :placeholder="lang('b_value')"
                                                            type="text"
                                                            :form="state.sinks.creations.form" />
                                                </template>
                                            </fvariadic-element>
                                            <span slot="title">
                                            {{lang('b_result_table')}}
                                            </span>
                                            <fvariadic-element
                                                    :name="`${props.fname}.${props.order}.dynamic_list.result_table`"
                                                    :form="state.sinks.creations.form"
                                                    :useIcons="false">
                                                <template slot="variadic" slot-scope="fprops">
                                                    <finput
                                                            :name="`${fprops.fname}.${fprops.order}.field`"
                                                            :label="lang('b_field')"
                                                            :is-required="true"
                                                            :placeholder="lang('b_field')"
                                                            type="text"
                                                            :form="state.sinks.creations.form" />
                                                    <finput
                                                            :name="`${fprops.fname}.${fprops.order}.title`"
                                                            :label="lang('b_title')"
                                                            :is-required="true"
                                                            :placeholder="lang('b_title')"
                                                            type="text"
                                                            :form="state.sinks.creations.form" />
                                                    <finput
                                                            :name="`${fprops.fname}.${fprops.order}.sort`"
                                                            :label="lang('b_sort')"
                                                            :is-required="true"
                                                            :placeholder="lang('b_sort')"
                                                            type="number"
                                                            :form="state.sinks.creations.form" />
                                                </template>
                                            </fvariadic-element>
                                            <span slot="title">
                                            {{lang('b_result_mapping')}}
                                            </span>
                                            <fvariadic-element
                                                    :name="`${props.fname}.${props.order}.dynamic_list.result_mapping`"
                                                    :form="state.sinks.creations.form"
                                                    :useIcons="false">
                                                <template slot="variadic" slot-scope="fprops">
                                                    <finput
                                                            :name="`${fprops.fname}.${fprops.order}.value_payload`"
                                                            :label="lang('b_value_payload')"
                                                            :is-required="true"
                                                            :placeholder="lang('b_value_payload')"
                                                            type="text"
                                                            :form="state.sinks.creations.form" />
                                                    <finput
                                                            :name="`${fprops.fname}.${fprops.order}.value_form`"
                                                            :label="lang('b_value_form')"
                                                            :is-required="true"
                                                            :placeholder="lang('b_value_form')"
                                                            type="text"
                                                            :form="state.sinks.creations.form" />
                                                </template>
                                            </fvariadic-element>
                                            <!--
                                            <span slot="title">
                                            {{lang('b_result_table')}}
                                            </span>
                                            <fvariadic-element :name="`${props.fname}.${props.order}.dynamic_list.result_table`" :form="state.sinks.creations.form" :tabs="true">
                                                <template slot="variadic" slot-scope="props2">
                                                    <finput :name="`${props2.fname}.${props2.order}.value`" :label="lang('b_value')" :is-required="true" :placeholder="lang('b_value')" type="text" :form="state.sinks.creations.form" />
                                                    <finput :name="`${props2.fname}.${props2.order}.label`" :label="lang('b_label')" :is-required="true" :placeholder="lang('b_label')" type="text" :form="state.sinks.creations.form" />
                                                    <finput :name="`${props2.fname}.${props2.order}.order`" :label="lang('b_field_order')" :is-required="true" :placeholder="lang('b_field_order')" type="number" :form="state.sinks.creations.form" />
                                                </template>
                                            </fvariadic-element>
                                            <span slot="title">
                                            {{lang('b_result_mapping')}}
                                            </span>
                                            <fvariadic-element :name="`${props.fname}.${props.order}.dynamic_list.result_mapping`" :form="state.sinks.creations.form" :tabs="true">
                                                <template slot="variadic" slot-scope="props2">
                                                    <finput :name="`${props2.fname}.${props2.order}.value_payload`" :label="lang('b_value_payload')" :is-required="true" :placeholder="lang('b_value')" type="text" :form="state.sinks.creations.form" />
                                                    <finput :name="`${props2.fname}.${props2.order}.value_form`" :label="lang('b_value_form')" :is-required="true" :placeholder="lang('b_value')" type="text" :form="state.sinks.creations.form" />
                                                    <finput :name="`${props2.fname}.${props2.order}.order`" :label="lang('b_field_order')" :is-required="true" :placeholder="lang('b_field_order')" type="number" :form="state.sinks.creations.form" />
                                                </template>

                                            </fvariadic-element>
                                             -->
                                        </div>
                                    </div>
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
module.exports = require('./Form');
</script>
