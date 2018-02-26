<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_forms')}}</span>
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
                                        @action-click="remove(content, 'form')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{content.label}} ({{content.name}}) 
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
                <span slot="title">{{lang('l_add_or_modify_form')}}</span>
                    <div slot="body">
                        <fform 
                            :name="state.forms.csink" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.forms.rsink"
                            >
                            <finput name="name" :label="lang('b_form_name')" :is-required="true" :placeholder="lang('b_form_name')" type="text" :form="state.forms.csink" />
                            <finput name="label" :label="lang('b_label')" :placeholder="lang('b_label')" type="text" :form="state.forms.csink" :is-required="true" />
                            <finput rows="5" name="description" :label="lang('b_form_description')" :placeholder="lang('b_form_description')" type="textarea" :form="state.forms.csink" />
                            <finput 
                                name="addons" 
                                :label="lang('b_has_addons')"
                                type="checkbox"
                                :form="state.forms.csink"
                            />
                            <fvariadic-element name="fields" :form="state.forms.csink" :tabs="true">
                                <template slot="variadic" slot-scope="props">
                                    <finput :name="`${props.fname}.${props.id}.name`" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.forms.csink" />
                                    <finput :name="`${props.fname}.${props.id}.required`" :label="lang('b_field_required')" :is-required="true" :placeholder="lang('b_field_required')" type="checkbox" :form="state.forms.csink" />
                                    <finput :name="`${props.fname}.${props.id}.help.content`" :label="lang('l_help')" :placeholder="lang('l_help')" type="text" :form="state.forms.csink" :is-required="true" />
                                    <finput :name="`${props.fname}.${props.id}.help.use_modal`" :label="lang('l_show_help_as_modal')" :placeholder="lang('l_show_help_as_modal')" type="checkbox" :form="state.forms.csink" :is-required="true" />
                                    <finput v-if="state.selected_types[props.id] !== 'hidden'" :name="`${props.fname}.${props.id}.label`" :label="lang('b_label')" :is-required="true" :placeholder="lang('b_label')" type="text" :form="state.forms.csink" />
                                    <finput :name="`${props.fname}.${props.id}.order`" :label="lang('b_field_order')" :is-required="true" :placeholder="lang('b_field_order')" type="number" :form="state.forms.csink" />
                                    <finput :name="`${props.fname}.${props.id}.multiple`" :label="lang('b_field_multiple')" :placeholder="lang('b_field_multiple')" type="checkbox" :form="state.forms.csink" />
                                    <finput :name="`${props.fname}.${props.id}.multiple_name`" :label="lang('b_field_multiple_name')" :placeholder="lang('b_field_multiple_name')" type="text" :form="state.forms.csink" />
                                    <finput 
                                        :name="`${props.fname}.${props.id}.single_multiple`" 
                                        :label="lang('b_single_multiple')"
                                        type="checkbox"
                                        :form="state.forms.csink"
                                    />
                                    <fselect 
                                        :name="`${props.fname}.${props.id}.type`" 
                                        :label="lang('b_field_type')" 
                                        :is-required="true" 
                                        :options="fieldtypes" 
                                        :form="state.forms.csink" 
                                        v-on:select-change="(val) => {type_change(val, props.id)}"
                                    />
                                    <div v-if="props.id in state.selected_types"> 
                                        <div v-if="['select', 'multi-select'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput 
                                            :name="`${props.fname}.${props.id}.placeholder`" 
                                            :key="`${props.fname}.${props.id}.placeholder`" 
                                            :label="lang('b_placeholder')" :is-required="true" :placeholder="lang('b_placeholder')" type="text" :form="state.forms.csink" />
                                            <hr />
                                            <h4 class="title h4">{{lang('l_use_range')}}</h4>
                                            <finput 
                                            :name="`${props.fname}.${props.id}.range.enabled`" 
                                            :key="`${props.fname}.${props.id}.range.enabled`" 
                                            :label="lang('l_range_enabled')"
                                            type="checkbox"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.range.start`" 
                                            :key="`${props.fname}.${props.id}.range.start`" 
                                            :label="lang('l_range_start')"
                                            :is-required="true"
                                            :placeholder="lang('l_range_start')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.range.end`" 
                                            :key="`${props.fname}.${props.id}.range.end`" 
                                            :label="lang('l_range_end')"
                                            :is-required="true"
                                            :placeholder="lang('l_range_end')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.range.step`" 
                                            :key="`${props.fname}.${props.id}.range.step`" 
                                            :label="lang('l_range_step')"
                                            :placeholder="lang('l_range_step')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.range.sort`" 
                                            :key="`${props.fname}.${props.id}.range.sort`" 
                                            :label="lang('l_sort')"
                                            :placeholder="lang('l_sort')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            </hr>
                                            <h4 class="title h4">{{lang('l_use_datasource')}}</h4>
                                            <fselect 
                                            :name="`${props.fname}.${props.id}.datasource.name`" 
                                            :key="`${props.fname}.${props.id}.datasource.name`" 
                                            :label="lang('b_datasource_name')" :is-required="true"
                                            :options="entities"
                                            fieldLabel="type"
                                            fieldValue="type"
                                            :form="state.forms.csink" />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.fetch_from_sink`" 
                                            :key="`${props.fname}.${props.id}.datasource.fetch_from_sink`" 
                                            :label="lang('b_datasource_fetch_from_sink')"
                                            type="checkbox"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.sink`" 
                                            :key="`${props.fname}.${props.id}.datasource.sink`" 
                                            :label="lang('b_datasource_sink')"
                                            :is-required="false"
                                            :placeholder="lang('b_datasource_sink')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.label`" 
                                            :key="`${props.fname}.${props.id}.datasource.label`" 
                                            :label="lang('b_datasource_label')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_label')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.value`" 
                                            :key="`${props.fname}.${props.id}.datasource.value`" 
                                            :label="lang('b_datasource_value')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_value')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.sort`" 
                                            :key="`${props.fname}.${props.id}.datasource.sort`" 
                                            :label="lang('l_sort')"
                                            :is-required="true"
                                            :placeholder="lang('l_sort')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.action_text`" 
                                            :key="`${props.fname}.${props.id}.datasource.action_text`" 
                                            :label="lang('b_datasource_action_text')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_action_text')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.header_text`" 
                                            :key="`${props.fname}.${props.id}.datasource.header_text`" 
                                            :label="lang('b_datasource_header_text')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_header_text')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.help_text`" 
                                            :key="`${props.fname}.${props.id}.datasource.help_text`" 
                                            :label="lang('b_datasource_help_text')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_help_text')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.ajax`" 
                                            :key="`${props.fname}.${props.id}.datasource.ajax`" 
                                            :label="lang('b_datasource_ajax')"
                                            type="checkbox"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.ajax_path`" 
                                            :key="`${props.fname}.${props.id}.datasource.ajax_path`" 
                                            :label="lang('b_datasource_ajax_path')"
                                            :placeholder="lang('b_datasource_ajax_path')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.ajax_value_path`" 
                                            :key="`${props.fname}.${props.id}.datasource.ajax_value_path`" 
                                            :label="lang('b_datasource_ajax_value_path')"
                                            :placeholder="lang('b_datasource_ajax_value_path')"
                                            type="text"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.translatable`" 
                                            :key="`${props.fname}.${props.id}.datasource.translatable`" 
                                            :label="lang('b_datasource_translatable')"
                                            type="checkbox"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.add`" 
                                            :key="`${props.fname}.${props.id}.datasource.add`" 
                                            :label="lang('b_datasource_add')"
                                            type="checkbox"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.modify`" 
                                            :key="`${props.fname}.${props.id}.datasource.modify`" 
                                            :label="lang('b_datasource_modify')"
                                            type="checkbox"
                                            :form="state.forms.csink"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.remove`" 
                                            :key="`${props.fname}.${props.id}.datasource.remove`" 
                                            :label="lang('b_datasource_remove')"
                                            type="checkbox"
                                            :form="state.forms.csink"
                                            />
                                            <fselect 
                                            :name="`${props.fname}.${props.id}.datasource.form`" 
                                            :key="`${props.fname}.${props.id}.datasource.form`" 
                                            :label="lang('b_form')" 
                                            :is-required="true"
                                            :options="content"
                                            fieldLabel="label"
                                            fieldValue="_id"
                                            :form="state.forms.csink" />
                                            <card color="red">
                                                <div slot="card-content">
                                                    <finput 
                                                    :name="`${props.fname}.${props.id}.datasource.form_paths.get`" 
                                                    :key="`${props.fname}.${props.id}.datasource.form_paths.get`" 
                                                    :label="lang('b_datasource_get_path')"
                                                    :placeholder="lang('b_datasource_get_path')"
                                                    type="text"
                                                    :form="state.forms.csink"
                                                    />
                                                    <finput 
                                                    :name="`${props.fname}.${props.id}.datasource.form_paths.delete`" 
                                                    :key="`${props.fname}.${props.id}.datasource.form_paths.delete`" 
                                                    :label="lang('b_datasource_remove_path')"
                                                    :placeholder="lang('b_datasource_remove_path')"
                                                    type="text"
                                                    :form="state.forms.csink"
                                                    />
                                                    <finput 
                                                    :key="`${props.fname}.${props.id}.datasource.form_paths.post`" 
                                                    :name="`${props.fname}.${props.id}.datasource.form_paths.post`" 
                                                    :label="lang('b_datasource_post_path')"
                                                    :placeholder="lang('b_datasource_post_path')"
                                                    type="text"
                                                    :form="state.forms.csink"
                                                    />
                                                    <finput 
                                                    :name="`${props.fname}.${props.id}.datasource.form_paths.put`" 
                                                    :key="`${props.fname}.${props.id}.datasource.form_paths.put`" 
                                                    :label="lang('b_datasource_put_path')"
                                                    :placeholder="lang('b_datasource_put_path')"
                                                    type="text"
                                                    :form="state.forms.csink"
                                                    />
                                                </div>
                                            </card>
                                        </div>
                                        <div v-else-if="['text', 'phone', 'number', 'email', 'password', 'html-editor'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput 
                                            :name="`${props.fname}.${props.id}.placeholder`" 
                                            :key="`${props.fname}.${props.id}.placeholder`" 
                                            :label="lang('b_placeholder')" :is-required="true" :placeholder="lang('b_placeholder')" type="text" :form="state.forms.csink" />
                                        </div>
                                        <div v-else-if="['hidden'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput 
                                            :name="`${props.fname}.${props.id}.hiddenValue`" 
                                            :key="`${props.fname}.${props.id}.hiddenValue`" 
                                            :label="lang('b_hidden_value')" :is-required="true" :placeholder="lang('b_hidden_value')" type="text" :form="state.forms.csink" />
                                        </div>
                                        <div v-else-if="['subform'].indexOf(state.selected_types[props.id]) !== -1">
                                            <fselect 
                                            :name="`${props.fname}.${props.id}.subform`" 
                                            :key="`${props.fname}.${props.id}.subform`" 
                                            :label="lang('b_subform')" 
                                            :is-required="true"
                                            :options="content"
                                            fieldLabel="label"
                                            fieldValue="_id"
                                            :form="state.forms.csink" />
                                        </div>
                                        <div v-else-if="['file'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput 
                                                :key="`${props.fname}.${props.id}.file.file_name`" 
                                                :label="lang('b_deposit_fieldname')" :is-required="true" :placeholder="lang('b_deposit_fieldname')" type="text" :form="state.forms.csink" />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.file.master_name`" 
                                            :key="`${props.fname}.${props.id}.file.master_name`" 
                                            :label="lang('b_master_fieldname')" :is-required="true" :placeholder="lang('b_master_fieldname')" type="text" :form="state.forms.csink" />
                                            <finput 
                                                :name="`${props.fname}.${props.id}.file.url_name`" 
                                                :key="`${props.fname}.${props.id}.file.url_name`" 
                                                :label="lang('b_url_fieldname')" :is-required="true" :placeholder="lang('b_url_fieldname')" type="text" :form="state.forms.csink" />
                                            <finput 
                                                :key="`${props.fname}.${props.id}.file.keeper_sink`" 
                                                :label="lang('b_keeper_sink')" :placeholder="lang('b_keeper_sink')" type="text" :form="state.forms.csink" />
                                            <finput 
                                                :name="`${props.fname}.${props.id}.file.keep`" 
                                                :key="`${props.fname}.${props.id}.file.keep`" 
                                                :label="lang('b_keep_files_across_components')" type="checkbox" :form="state.forms.csink" />
                                            <finput :name="`${props.fname}.${props.id}.file.restore`" 
                                                :label="lang('b_restore_files_across_components')" type="checkbox" :form="state.forms.csink" />
                                        </div>
                                        <div v-else-if="['importer'].indexOf(state.selected_types[props.id]) !== -1">
                                            <fselect 
                                            :name="`${props.fname}.${props.id}.importer`" 
                                            :key="`${props.fname}.${props.id}.importer`" 
                                            :label="lang('b_importer')" 
                                            :is-required="true"
                                            :options="importers"
                                            fieldLabel="name"
                                            fieldValue="_id"
                                            :form="state.forms.csink" />
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
