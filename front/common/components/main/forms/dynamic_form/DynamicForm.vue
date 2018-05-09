<template>
<div>
    <template v-if="form.addons && form.fields.length > 0">
        <component
            :is="['multi-select', 'select'].indexOf(form.fields[0].type) !== -1 ? 'fselect' : 'finput'"
            v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea', 'html-editor', 'date-year', 'multi-select', 'select'].indexOf(form.fields[0].type) !== -1"
            :label="lang(form.fields[0].label || '')"
            :name="get_name(form.fields[0].name)"
            :placeholder="lang(form.fields[0].placeholder || '')"
            :type="form.fields[0].type"
            :form="cform"
            :has-addons="form.addons"
            :readonly="readonly || form.fields[0].readonly"
            :help="form.fields[0].help ? form.fields[0].help.content : ''"
            :modal_help="form.fields[0].help ? form.fields[0].help.use_modal : false"
            :is-required="form.fields[0].required"
            :view-validation-texts="false"
            :year-range-start="form.fields[0].range ? form.fields[0].range.start : 0"
            :year-range-end="form.fields[0].range ? form.fields[0].range.end : 0"
            :year-step="form.fields[0].range ? form.fields[0].range.step : 1"
            :fieldLabel="generate_select_label(form.fields[0])"
            :fieldValue="generate_select_value(form.fields[0])"
            :options="generate_select_options(form.fields[0])"
            :ajax="form.fields[0].datasource ? form.fields[0].datasource.ajax : ''"
            :ajax-url="generate_ajax_url(form.fields[0])"
            :ajax-value-url="generate_ajax_url(form.fields[0], 'value')"
            :translate-through-hlang="form.fields[0].datasource.use_lang"
        >
            <template slot="input-addons">
                <slot name="top-form-addons"></slot>
                <template v-for="(field, i) in form.fields.slice(1)">
                    <finput 
                    v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea', 'time', 'date', 'date-year', 'html-editor'].indexOf(field.type) !== -1"
                    :label="lang(field.label || '')"
                    :name="get_name(field.name)"
                    :placeholder="lang(field.placeholder || '')"
                    :type="field.type"
                    :form="cform"
                    :is-addon="true"
                    :readonly="readonly || field.readonly"
                    :is-required="field.required"
                    :key="i"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :view-validation-texts="false"
                    :year-range-start="field.range ? field.range.start : 0"
                    :year-range-end="field.range ? field.range.end : 0"
                    :year-step="field.range ? field.range.step : 1"
                    />
                    <finput 
                    v-else-if="['hidden'].indexOf(field.type) !== -1"
                    :name="get_name(field.name)"
                    :type="field.type"
                    :form="cform"
                    :is-addon="true"
                    :hidden-value="field.hiddenValue"
                    :readonly="readonly || field.readonly"
                    :is-required="field.required"
                    :key="i"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :view-validation-texts="false"
                    label=""
                    />
                    <fselect 
                    v-else-if="field.type === 'select' || field.type === 'multi-select'"
                    :label="lang(field.label || '')"
                    :placeholder="lang(field.placeholder || '')"
                    :name="get_name(field.name)"
                    :form="cform"
                    :fieldLabel="generate_select_label(field)"
                    :fieldValue="generate_select_value(field)"
                    :options="generate_select_options(field)"
                    :ajax="field.datasource.ajax"
                    :ajax-url="generate_ajax_url(field)"
                    :ajax-value-url="generate_ajax_url(field, 'value')"
                    :is-addon="true"
                    :readonly="readonly || field.readonly"
                    :is-required="field.required"
                    :key="i"
                    :multi="field.type === 'multi-select'"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :view-validation-texts="false"
                    :translate-through-hlang="field.datasource.use_lang"
                    />
                </template> 
                <slot name="form-addons"></slot>
            </template>
        </component>
        <crud-form 
            :text="form.fields[0].datasource.action_text"
            :header="form.fields[0].datasource.header_text"
            :help="form.fields[0].datasource.help_text"
            :form="form.fields[0].datasource.form"
            :get-path="form.fields[0].datasource.form_paths.get"
            :put-path="form.fields[0].datasource.form_paths.put"
            :post-path="form.fields[0].datasource.form_paths.post"
            @crud-form-change="crud_form_change"
            v-if="form.fields[0].datasource && (form.fields[0].datasource.add || form.fields[0].datasource.modify) && !readonly" 
        />
    </template>
    <template v-else v-for="(field, i) in form.fields">
        <fvariadic-element class="field" :name="field.multiple_name" :form="cform" v-if="field.multiple" :single="field.single_multiple">
            <template slot="variadic" slot-scope="props">
                <finput 
                v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea', 'time', 'date', 'date-year', 'html-editor'].indexOf(field.type) !== -1"
                :label="lang(field.label || '')"
                :name="get_name(`${props.fname}.${props.id}.${field.name}`)"
                :placeholder="lang(field.placeholder || '')"
                :type="field.type"
                :form="cform"
                :has-addons="field.single_multiple"
                :readonly="readonly || field.readonly"
                :is-required="field.required"
                :key="i"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :view-validation-texts="false"
                :year-range-start="field.range ? field.range.start : 0"
                :year-range-end="field.range ? field.range.end : 0"
                :year-step="field.range ? field.range.step : 1"
                >
                    <template v-if="field.single_multiple && !readonly" slot="input-addons">
                        <div class="control">
                            <a class="button is-info" @click="props.add">+</a>
                        </div>
                        <div class="control">
                            <a class="button is-info" @click="props.remove(props.id, props.order)">-</a>
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
                label=""
                :readonly="readonly || field.readonly"
                :is-required="field.required"
                :key="i"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :view-validation-texts="false"
                />
                <fstatic
                v-else-if="['static-html', 'static-text', 'static-list'].indexOf(field.type) !== -1"
                :name="get_name(field.name)"
                :type="field.type"
                :form="cform"
                :label="lang(field.label || '')"
                :key="i"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :template="field.hiddenValue"
                />
                <fselect 
                v-else-if="field.type === 'select' || field.type === 'multi-select'"
                :label="lang(field.label || '')"
                :placeholder="lang(field.placeholder || '')"
                :name="get_name(`${props.fname}.${props.id}.${field.name}`)"
                :form="cform"
                :fieldLabel="generate_select_label(field)"
                :fieldValue="generate_select_value(field)"
                :options="generate_select_options(field)"
                :ajax="field.datasource.ajax"
                :ajax-url="generate_ajax_url(field)"
                :ajax-value-url="generate_ajax_url(field, 'value')"
                :readonly="readonly || field.readonly"
                :is-required="field.required"
                :has-addons="field.single_multiple"
                :key="i"
                :multi="field.type === 'multi-select'"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :view-validation-texts="false"
                :translate-through-hlang="field.datasource.use_lang"
                >
                    <template v-if="field.single_multiple && !readonly" slot="input-addons">
                        <div class="control">
                            <a class="button is-info" @click="props.add">+</a>
                        </div>
                        <div class="control">
                            <a class="button is-info" @click="props.remove(props.id, props.order)">-</a>
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
                :readonly="readonly || field.readonly"
                :key="i"
                :keeper_sink="field.file.keeper_sink"
                :restore_files="field.file.restore"
                :keep_files="field.file.keep"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                @analyze-file="dropzone_analyze_file"
                />
                <template v-else-if="field.type === 'subform' && field.subform != null">
                    <template v-if="form_is_of_type('widget', field)">
                        <widget>
                            <span slot="title">{{lang(field.subform_information.title)}}</span>
                            <div slot="body">
                                <dynamic-form 
                                    :form="field.subform" 
                                    :cform="cform"
                                    :prefix="`${props.fname}.${props.id}`"
                                    :single="field.single_multiple"
                                    :readonly="readonly"
                                    :key="i"
                                    @crud-form-change="crud_form_change"
                                    @dropzone-analyze-file="dropzone_analyze_file"
                                >
                                    <template v-if="field.single_multiple && !readonly" slot="form-addons">
                                        <div class="field has-addons">
                                            <div class="control">
                                                <a class="button is-info" @click="props.add">+</a>
                                            </div>
                                            <div class="control">
                                                <a class="button is-info" @click="props.remove(props.id, props.order)">-</a>
                                            </div>
                                        </div>
                                    </template>
                                </dynamic-form>
                            </div>
                        </widget>
                    </template>
                    <template v-else>
                        <template v-if="form_is_of_type('section', field)">
                            <h4 class="title is-4 has-no-bottom-margin">{{lang(field.subform_information.title)}}</h4>
                            <hr class="hr-section "/>
                        </template>
                        <template v-else-if="form_is_of_type('hidden', field)">
                            <p class="has-small-bottom-margin"><a @click.prevent="show_hidden_form(field)">{{lang(field.subform_information.title)}}</a></p>
                        </template>
                        <dynamic-form 
                            :form="field.subform" 
                            :cform="cform"
                            :prefix="`${props.fname}.${props.id}`"
                            :single="field.single_multiple"
                            :readonly="readonly"
                            :key="i"
                            v-if="!form_is_of_type('hidden', field) || state.show[field.name]"
                            @crud-form-change="crud_form_change"
                            @dropzone-analyze-file="dropzone_analyze_file"
                        >
                            <template v-if="field.single_multiple && !readonly" slot="form-addons">
                                <div class="field has-addons">
                                    <div class="control">
                                        <a class="button is-info" @click="props.add">+</a>
                                    </div>
                                    <div class="control">
                                        <a class="button is-info" @click="props.remove(props.id, props.order)">-</a>
                                    </div>
                                </div>
                            </template>
                        </dynamic-form>
                    </template>
                </template>
            </template>
        </fvariadic-element>
        <template v-else>
            <finput 
            v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea', 'time', 'date', 'date-year', 'html-editor'].indexOf(field.type) !== -1"
            :label="lang(field.label || '')"
            :name="get_name(field.name)"
            :placeholder="lang(field.placeholder || '')"
            :type="field.type"
            :form="cform"
            :readonly="readonly || field.readonly"
            :is-required="field.required"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            :year-range-start="field.range ? field.range.start : 0"
            :year-range-end="field.range ? field.range.end : 0"
            :year-step="field.range ? field.range.step : 1"
            />
            <finput 
            v-else-if="['hidden'].indexOf(field.type) !== -1"
            :name="get_name(field.name)"
            :type="field.type"
            :form="cform"
            :is-addon="true"
            :hidden-value="field.hiddenValue"
            label=""
            :readonly="readonly || field.readonly"
            :is-required="field.required"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            />
            <fstatic
                v-else-if="['static-html', 'static-text', 'static-list'].indexOf(field.type) !== -1"
                :name="get_name(field.name)"
                :type="field.type"
                :form="cform"
                :label="lang(field.label || '')"
                :key="i"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :template="field.hiddenValue"
            />
            <fselect 
            v-else-if="field.type === 'select' || field.type === 'multi-select'"
            :label="lang(field.label || '')"
            :placeholder="lang(field.placeholder || '')"
            :name="get_name(field.name)"
            :form="cform"
            :fieldLabel="generate_select_label(field)"
            :fieldValue="generate_select_value(field)"
            :options="generate_select_options(field)"
            :ajax="field.datasource.ajax"
            :ajax-url="generate_ajax_url(field)"
            :ajax-value-url="generate_ajax_url(field, 'value')"
            :readonly="readonly || field.readonly"
            :is-required="field.required"
            :multi="field.type === 'multi-select'"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            :translate-through-hlang="field.datasource.use_lang"
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
            :readonly="readonly || field.readonly"
            :keeper_sink="field.file.keeper_sink"
            :restore_files="field.file.restore"
            :keep_files="field.file.keep"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            @analyze-file="dropzone_analyze_file"
            />
            <template v-else-if="field.type === 'subform' && field.subform != null">
                <template v-if="form_is_of_type('widget', field)">
                    <widget>
                        <span slot="title">{{lang(field.subform_information.title)}}</span>
                        <div slot="body">
                            <dynamic-form 
                                :form="field.subform" 
                                :cform="cform"
                                :single="field.single_multiple"
                                :readonly="readonly"
                                @crud-form-change="crud_form_change"
                                @dropzone-analyze-file="dropzone_analyze_file"
                            >
                            </dynamic-form>
                        </div>
                    </widget>
                </template>
                <template v-else>
                    <template v-if="form_is_of_type('section', field)">
                        <h4 class="title is-4 has-no-bottom-margin">{{lang(field.subform_information.title)}}</h4>
                        <hr class="hr-section "/>
                    </template>
                    <template v-else-if="form_is_of_type('hidden', field)">
                        <p class="has-small-bottom-margin"><a @click.prevent="show_hidden_form(field)">{{lang(field.subform_information.title)}}</a></p>
                    </template>
                    <dynamic-form 
                        :form="field.subform" 
                        :cform="cform"
                        :single="field.single_multiple"
                        :readonly="readonly"
                        v-if="!form_is_of_type('hidden', field) || state.show[field.name]"
                        @crud-form-change="crud_form_change"
                        @dropzone-analyze-file="dropzone_analyze_file"
                    >
                    </dynamic-form>
                </template>
            </template>
        </template>
    </template>
</div>
</template>

<script>
    module.exports = require('./DynamicForm');
</script>
