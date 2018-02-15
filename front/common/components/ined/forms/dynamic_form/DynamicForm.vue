<template>
<div>
    <template v-if="form.addons && form.fields.length > 0">
        <finput 
            v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea', 'html-editor'].indexOf(form.fields[0].type) !== -1"
            :label="lang(form.fields[0].label || '')"
            :name="get_name(form.fields[0].name)"
            :placeholder="lang(form.fields[0].placeholder || '')"
            :type="form.fields[0].type"
            :form="cform"
            :has-addons="form.addons"
            :readonly="readonly"
            :help="form.fields[0].help ? form.fields[0].help.content : ''"
            :modal_help="form.fields[0].help ? form.fields[0].help.use_modal : false"
            :is-required="form.fields[0].required"
            :view-validation-texts="false"
        >
            <template slot="input-addons">
                <slot name="top-form-addons"></slot>
                <template v-for="(field, i) in form.fields.slice(1)">
                    <finput 
                    v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea', 'time', 'date', 'html-editor'].indexOf(field.type) !== -1"
                    :label="lang(field.label || '')"
                    :name="get_name(field.name)"
                    :placeholder="lang(field.placeholder || '')"
                    :type="field.type"
                    :form="cform"
                    :is-addon="true"
                    :readonly="readonly"
                    :is-required="field.required"
                    :key="i"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :view-validation-texts="false"
                    />
                    <finput 
                    v-else-if="['hidden'].indexOf(field.type) !== -1"
                    :name="get_name(field.name)"
                    :type="field.type"
                    :form="cform"
                    :is-addon="true"
                    :hidden-value="field.hiddenValue"
                    :readonly="readonly"
                    :is-required="field.required"
                    :key="i"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :view-validation-texts="false"
                    />
                    <fselect 
                    v-else-if="field.type === 'select' || field.type === 'multi-select'"
                    :label="lang(field.label || '')"
                    :placeholder="lang(field.placeholder || '')"
                    :name="get_name(field.name)"
                    :form="cform"
                    :fieldLabel="field.datasource.label"
                    :fieldValue="field.datasource.value"
                    :options="datasource(field, field.datasource.ajax)"
                    :is-addon="true"
                    :readonly="readonly"
                    :is-required="field.required"
                    :key="i"
                    :multi="field.type === 'multi-select'"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :view-validation-texts="false"
                    />
                </template> 
                <slot name="form-addons"></slot>
            </template>
        </finput>
    </template>
    <template v-else v-for="(field, i) in form.fields">
        <fvariadic-element class="field" :name="field.multiple_name" :form="cform" v-if="field.multiple" :single="field.single_multiple">
            <template slot="variadic" slot-scope="props">
                <finput 
                v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea', 'time', 'date', 'html-editor'].indexOf(field.type) !== -1"
                :label="lang(field.label || '')"
                :name="get_name(`${props.fname}.${props.id}.${field.name}`)"
                :placeholder="lang(field.placeholder || '')"
                :type="field.type"
                :form="cform"
                :has-addons="field.single_multiple"
                :readonly="readonly"
                :is-required="field.required"
                :key="i"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :view-validation-texts="false"
                >
                    <template v-if="field.single_multiple && !readonly" slot="input-addons">
                        <div class="control">
                            <a class="button is-info" @click="props.add">+</a>
                        </div>
                        <div class="control">
                            <a class="button is-info" @click="props.remove(props.id, $event)">-</a>
                        </div>
                    </template>
                </finput>
                <finput 
                v-else-if="['hidden'].indexOf(field.type) !== -1"
                :name="get_name(field.name)"
                :type="field.type"
                :form="cform"
                :is-addon="true"
                :hidden-value="field.hiddenValue"
                :readonly="readonly"
                :is-required="field.required"
                :key="i"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :view-validation-texts="false"
                />
                <fselect 
                v-else-if="field.type === 'select' || field.type === 'multi-select'"
                :label="lang(field.label || '')"
                :placeholder="lang(field.placeholder || '')"
                :name="get_name(`${props.fname}.${props.id}.${field.name}`)"
                :form="cform"
                :fieldLabel="generate_select_label(field)"
                :fieldValue="generate_select_value(field)"
                :options="genrate_select_options(field)"
                :readonly="readonly"
                :is-required="field.required"
                :has-addons="field.single_multiple"
                :key="i"
                :multi="field.type === 'multi-select'"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :view-validation-texts="false"
                >
                    <template v-if="field.single_multiple && !readonly" slot="input-addons">
                        <div class="control">
                            <a class="button is-info" @click="props.add">+</a>
                        </div>
                        <div class="control">
                            <a class="button is-info" @click="props.remove(props.id, $event)">-</a>
                        </div>
                    </template>
                </fselect>
                <crud-form 
                    :text="field.datasource.action_text"
                    :header="field.datasource.header_text"
                    :help="field.datasource.help_text"
                    :form="field.datasource.form"
                    :get-path="field.datasource.form_paths.get"
                    :put-path="field.datasource.form_paths.put"
                    :post-path="field.datasource.form_paths.post"
                    @crud-form-change="crud_form_change"
                    v-if="field.datasource && (field.datasource.add || field.datasource.modify) && !readonly" 
                />
                <fdropzone 
                v-else-if="field.type === 'file'"
                :form="cform"
                :files="get_name(`${props.fname}.${props.id}.${field.name}`)"
                :name="field.file.file_name"
                :master="field.file.master_name"
                :url="field.file.url_name"
                :readonly="readonly"
                :key="i"
                :keeper_sink="field.file.keeper_sink"
                :restore_files="field.file.restore"
                :keep_files="field.file.keep"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                />
                <dynamic-form 
                    :form="field.subform" 
                    :cform="cform"
                    :prefix="`${props.fname}.${props.id}`"
                    v-else-if="field.type === 'subform' && field.subform != null"
                    :single="field.single_multiple"
                    :readonly="readonly"
                    :key="i"
                    @crud-form-change="crud_form_change"
                >
                    <template v-if="field.single_multiple && !readonly" slot="form-addons">
                        <div class="field has-addons">
                            <div class="control">
                                <a class="button is-info" @click="props.add">+</a>
                            </div>
                            <div class="control">
                                <a class="button is-info" @click="props.remove(props.id, $event)">-</a>
                            </div>
                        </div>
                    </template>
                </dynamic-form>
            </template>
        </fvariadic-element>
        <template v-else>
            <finput 
            v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea', 'time', 'date', 'html-editor'].indexOf(field.type) !== -1"
            :label="lang(field.label || '')"
            :name="get_name(field.name)"
            :placeholder="lang(field.placeholder || '')"
            :type="field.type"
            :form="cform"
            :readonly="readonly"
            :is-required="field.required"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            />
            <finput 
            v-else-if="['hidden'].indexOf(field.type) !== -1"
            :name="get_name(field.name)"
            :type="field.type"
            :form="cform"
            :is-addon="true"
            :hidden-value="field.hiddenValue"
            :readonly="readonly"
            :is-required="field.required"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            />
            <fselect 
            v-else-if="field.type === 'select' || field.type === 'multi-select'"
            :label="lang(field.label || '')"
            :placeholder="lang(field.placeholder || '')"
            :name="get_name(field.name)"
            :form="cform"
            :fieldLabel="field.datasource.label"
            :fieldValue="field.datasource.value"
            :options="datasource(field, field.datasource.ajax)"
            :readonly="readonly"
            :is-required="field.required"
            :multi="field.type === 'multi-select'"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            />
            <crud-form 
                :text="field.datasource.action_text"
                :header="field.datasource.header_text"
                :help="field.datasource.help_text"
                :form="field.datasource.form"
                :get-path="field.datasource.form_paths.get"
                :put-path="field.datasource.form_paths.put"
                :post-path="field.datasource.form_paths.post"
                @crud-form-change="crud_form_change"
                v-if="field.datasource && (field.datasource.add || field.datasource.modify) && !readonly" 
            />
            <fdropzone 
            v-else-if="field.type === 'file'"
            :form="cform"
            :files="get_name(field.name)"
            :name="field.file.file_name"
            :master="field.file.master_name"
            :url="field.file.url_name"
            :readonly="readonly"
            :keeper_sink="field.file.keeper_sink"
            :restore_files="field.file.restore"
            :keep_files="field.file.keep"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            />
            <dynamic-form 
                :form="field.subform" 
                :cform="cform"
                v-else-if="field.type === 'subform' && field.subform != null"
                :single="field.single_multiple"
                :readonly="readonly"
                @crud-form-change="crud_form_change"
            >
            </dynamic-form>
        </template>
    </template>
</div>
</template>

<script>
    module.exports = require('./DynamicForm');
</script>
