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
                    <span slot="title">Add or modify a user</span>
                    <div slot="body">
                        <fform 
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.rform"
                            >
                            <finput name="name" :label="lang('b_form_name')" :is-required="true" :placeholder="lang('b_form_name')" type="text" :form="state.cform" />
                            <finput name="label" :label="lang('b_label')" :placeholder="lang('b_label')" type="text" :form="state.cform" />
                            <finput rows="5" name="description" :label="lang('b_form_description')" :placeholder="lang('b_form_description_placeholder')" type="textarea" :form="state.cform" />
                            <finput 
                                name="addons" 
                                :label="lang('b_has_addons')"
                                type="checkbox"
                                :form="state.cform"
                            />
                            <fvariadic-element name="fields" :form="state.cform" :tabs="true">
                                <template slot="variadic" slot-scope="props">
                                    <finput :name="`${props.fname}.${props.id}.name`" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.cform" />
                                    <finput v-if="state.selected_types[props.id] !== 'hidden'" :name="`${props.fname}.${props.id}.label`" :label="lang('b_label')" :is-required="true" :placeholder="lang('b_label')" type="text" :form="state.cform" />
                                    <finput :name="`${props.fname}.${props.id}.order`" :label="lang('b_field_order')" :is-required="true" :placeholder="lang('b_field_order')" type="number" :form="state.cform" />
                                    <finput :name="`${props.fname}.${props.id}.multiple`" :label="lang('b_field_multiple')" :placeholder="lang('b_field_multiple')" type="checkbox" :form="state.cform" />
                                    <finput :name="`${props.fname}.${props.id}.multiple_name`" :label="lang('b_field_multiple_name')" :placeholder="lang('b_field_multiple_name')" type="text" :form="state.cform" />
                                    <finput 
                                        :name="`${props.fname}.${props.id}.single_multiple`" 
                                        :label="lang('b_single_multiple')"
                                        type="checkbox"
                                        :form="state.cform"
                                    />
                                    <fselect 
                                        :name="`${props.fname}.${props.id}.type`" 
                                        :label="lang('b_field_type')" 
                                        :is-required="true" 
                                        :options="fieldtypes" 
                                        :form="state.cform" 
                                        v-on:select-change="(val) => {type_change(val, props.id)}"
                                    />
                                    <div v-if="props.id in state.selected_types"> 
                                        <div v-if="state.selected_types[props.id] === 'select'">
                                            <finput :name="`${props.fname}.${props.id}.placeholder`" :label="lang('b_placeholder')" :is-required="true" :placeholder="lang('b_placeholder')" type="text" :form="state.cform" />
                                            <fselect 
                                            :name="`${props.fname}.${props.id}.datasource.name`" 
                                            :label="lang('b_datasource_name')" :is-required="true"
                                            :options="entities"
                                            fieldLabel="type"
                                            fieldValue="type"
                                            :form="state.cform" />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.label`" 
                                            :label="lang('b_datasource_label')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_label')"
                                            type="text"
                                            :form="state.cform"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.value`" 
                                            :label="lang('b_datasource_value')"
                                            :is-required="true"
                                            :placeholder="lang('b_datasource_value')"
                                            type="text"
                                            :form="state.cform"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.ajax`" 
                                            :label="lang('b_datasource_ajax')"
                                            type="checkbox"
                                            :form="state.cform"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.translatable`" 
                                            :label="lang('b_datasource_translatable')"
                                            type="checkbox"
                                            :form="state.cform"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.add`" 
                                            :label="lang('b_datasource_add')"
                                            type="checkbox"
                                            :form="state.cform"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.modify`" 
                                            :label="lang('b_datasource_modify')"
                                            type="checkbox"
                                            :form="state.cform"
                                            />
                                            <finput 
                                            :name="`${props.fname}.${props.id}.datasource.remove`" 
                                            :label="lang('b_datasource_remove')"
                                            type="checkbox"
                                            :form="state.cform"
                                            />
                                        </div>
                                        <div v-else-if="['text', 'phone', 'number', 'email', 'password'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput :name="`${props.fname}.${props.id}.placeholder`" :label="lang('b_placeholder')" :is-required="true" :placeholder="lang('b_placeholder')" type="text" :form="state.cform" />
                                        </div>
                                        <div v-else-if="['hidden'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput :name="`${props.fname}.${props.id}.hiddenValue`" :label="lang('b_hidden_value')" :is-required="true" :placeholder="lang('b_hidden_value')" type="text" :form="state.cform" />
                                        </div>
                                        <div v-else-if="['subform'].indexOf(state.selected_types[props.id]) !== -1">
                                            <fselect 
                                            :name="`${props.fname}.${props.id}.subform`" 
                                            :label="lang('b_subform')" 
                                            :is-required="true"
                                            :options="content"
                                            fieldLabel="label"
                                            fieldValue="_id"
                                            :form="state.cform" />
                                        </div>
                                        <div v-else-if="['file'].indexOf(state.selected_types[props.id]) !== -1">
                                            <finput :name="`${props.fname}.${props.id}.file.file_name`" :label="lang('b_deposit_fieldname')" :is-required="true" :placeholder="lang('b_deposit_fieldname')" type="text" :form="state.cform" />
                                            <finput :name="`${props.fname}.${props.id}.file.master_name`" :label="lang('b_master_fieldname')" :is-required="true" :placeholder="lang('b_master_fieldname')" type="text" :form="state.cform" />
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
