<template>
<div :class="[form.horizontal_display ? 'columns is-gapless' : '']">
    <template v-if="form.addons && form.fields.length > 0">
        <component
            :is="get_component(form.fields[0].type)"
            v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'password-sha1', 'number', 'price', 'textarea', 'html-editor', 'date-year', 'multi-select', 'select', 'color'].indexOf(form.fields[0].type) !== -1"
            :label="lang(form.fields[0].label || '')"
            :name="get_name(form.fields[0].name)"
            :key="get_name(form.fields[0].name)"
            :placeholder="lang(form.fields[0].placeholder || '')"
            :type="form.fields[0].type"
            :form="cform"
            :has-addons="form.addons"
            :readonly="readonly || form.fields[0].readonly || state.isConditionalReadonly"
            :conditional-readonly="form.fields[0].conditional_readonly"
            :duplicate_warning="form.fields[0].duplicate_warning"
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
            :search-size="generate_ajax_search(form.fields[0], 'size')"
            :search-fields="generate_ajax_search(form.fields[0], 'fields')"
            :translate-through-hlang="form.fields[0].datasource ? form.fields[0].datasource.use_hlang : false"
            :translatable="form.fields[0].datasource ? form.fields[0].datasource.translatable : false"
        >
            <template slot="input-addons">
                <slot name="top-form-addons"></slot>
                <template v-for="(field, i) in form.fields.slice(1)">
                    <finput
                    v-if="['checkbox', 'text', 'email', 'phone', 'password', 'password-sha1', 'number', 'price', 'textarea', 'time', 'date', 'date-year', 'html-editor'].indexOf(field.type) !== -1"
                    :label="lang(field.label || '')"
                    :name="get_name(field.name)"
                    :placeholder="lang(field.placeholder || '')"
                    :type="field.type"
                    :form="cform"
                    :is-addon="true"
                    :conditional-readonly="field.conditional_readonly"
                    :readonly="readonly || field.readonly || state.isConditionalReadonly"
                    :duplicate_warning="field.duplicate_warning"
                    :is-required="field.required"
                    :key="get_name(field.name)"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :view-validation-texts="false"
                    :year-range-start="field.range ? field.range.start : 0"
                    :year-range-end="field.range ? field.range.end : 0"
                    :year-step="field.range ? field.range.step : 1"
                    :min-date="field.range ? state.selected_date[field.range.start_date] : null"
                    :max-date="field.range ? state.selected_date[field.range.end_date] : null"
                    @date-value-change="update_date"
                    @checkbox-value-change="update_checkbox"
                    />
                    <finput
                    v-else-if="['hidden'].indexOf(field.type) !== -1"
                    :name="get_name(field.name)"
                    :type="field.type"
                    :form="cform"
                    :is-addon="true"
                    :hidden-value="field.hiddenValue"
                    :template="field.template"
                    :readonly="readonly || field.readonly || state.isConditionalReadonly"
                    :is-required="field.required"
                    :key="get_name(field.name)"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :view-validation-texts="false"
                    label=""
                    />
                    <fselect
                    v-else-if="field.type === 'select' || field.type === 'multi-select'"
                    class="control is-expanded"
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
                    :conditional-readonly="field.conditional_readonly"
                    :readonly="readonly || field.readonly || state.isConditionalReadonly"
                    :is-required="field.required"
                    :key="get_name(field.name)"
                    :multi="field.type === 'multi-select'"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :view-validation-texts="false"
                    :translate-through-hlang="field.datasource.use_hlang"
                    :translatable="field.datasource.translatable"
                    :search-size="generate_ajax_search(field, 'size')"
                    :search-fields="generate_ajax_search(field, 'fields')"
                    :ajax-query="field.datasource.query"
                    :ajax-filters="generate_ajax_filter(field)"
                    :prefetch-in-ajax="field.datasource.filter !== undefined"
                    />
                    <fradio
                    v-else-if="field.type === 'radio'"
                    :key="get_name(field.name)"
                    :label="lang(field.label || '')"
                    :name="get_name(field.name)"
                    :form="cform"
                    :fieldLabel="generate_select_label(field)"
                    :fieldValue="generate_select_value(field)"
                    :options="generate_select_options(field)"
                    :ajax="field.datasource.ajax"
                    :ajax-url="generate_ajax_url(field)"
                    :ajax-value-url="generate_ajax_url(field, 'value')"
                    :conditional-readonly="field.conditional_readonly"
                    :readonly="readonly || field.readonly || state.isConditionalReadonly"
                    :is-required="field.required"
                    :help="field.help ? field.help.content : ''"
                    :modal_help="field.help ? field.help.use_modal : false"
                    :translate-through-hlang="field.datasource.use_hlang"
                    :translatable="field.datasource.translatable"
                    :ajax-query="field.datasource.query"
                    :ajax-filters="generate_ajax_filter(field)"
                    :prefetch-in-ajax="field.datasource.filter !== undefined"
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
        <fvariadic-element v-if="field.multiple" class="field" :use-icons="false" :name="field.multiple_name" :form="cform" :single="field.single_multiple" :readonly="field.readonly">
            <template slot="variadic" slot-scope="props">
                <finput
                v-if="['checkbox', 'text', 'email', 'phone', 'password', 'password-sha1', 'number', 'price', 'textarea', 'time', 'date', 'date-year', 'html-editor'].indexOf(field.type) !== -1"
                :label="!field.single_multiple || `${props.order}` == 0 ? lang(field.label || '') : ''"
                :name="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :placeholder="lang(field.placeholder || '')"
                :type="field.type"
                :form="cform"
                :has-addons="field.single_multiple"
                :readonly="readonly || field.readonly"
                :conditional-readonly="field.conditional_readonly"
                :duplicate_warning="field.duplicate_warning"
                :is-required="field.required"
                :key="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :help="field.help && (!field.single_multiple || `${props.order}` == 0) ? field.help.content : ''"
                :modal_help="field.help && (!field.single_multiple || `${props.order}` == 0) ? field.help.use_modal : false"
                :view-validation-texts="false"
                :year-range-start="field.range ? field.range.start : 0"
                :year-range-end="field.range ? field.range.end : 0"
                :year-step="field.range ? field.range.step : 1"
                :min-date="field.range ? state.selected_date[field.range.start_date] : null"
                :max-date="field.range ? state.selected_date[field.range.end_date] : null"
                @date-value-change="update_date"
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
                :name="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :type="field.type"
                :form="cform"
                :is-addon="true"
                :hidden-value="field.hiddenValue"
                :template="field.template"
                label=""
                :readonly="readonly || field.readonly"
                :is-required="field.required"
                :key="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :view-validation-texts="false"
                />
                <fcolor
                v-else-if="['color'].indexOf(field.type) !== -1"
                :name="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :form="cform"
                :label="(!field.single_multiple || `${props.order}` == 0) ? lang(field.label || '') : ''"
                :readonly="readonly || field.readonly"
                :is-required="field.required"
                :key="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :help="field.help && (!field.single_multiple || `${props.order}` == 0) ? field.help.content : ''"
                :modal_help="field.help && (!field.single_multiple || `${props.order}` == 0) ? field.help.use_modal : false"
                :view-validation-texts="false"
                />
                <fstatic
                v-else-if="['static-html', 'static-text', 'static-list'].indexOf(field.type) !== -1"
                :name="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :type="field.type"
                :form="cform"
                :label="(!field.single_multiple || `${props.order}` == 0) ? lang(field.label || '') : ''"
                :key="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :help="field.help && (!field.single_multiple || `${props.order}` == 0) ? field.help.content : ''"
                :modal_help="field.help && (!field.single_multiple || `${props.order}` == 0) ? field.help.use_modal : false"
                :template="field.hiddenValue"
                />
                <fselect
                v-else-if="field.type === 'select' || field.type === 'multi-select'"
                :label="`${props.order}` == 0 ? lang(field.label || '') : ''"
                :placeholder="lang(field.placeholder || '')"
                :name="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :form="cform"
                :fieldLabel="generate_select_label(field)"
                :fieldValue="generate_select_value(field)"
                :options="generate_select_options(field)"
                :ajax="field.datasource.ajax"
                :ajax-url="generate_ajax_url(field)"
                :ajax-value-url="generate_ajax_url(field, 'value')"
                :readonly="readonly || field.readonly"
                :conditional-readonly="field.conditional_readonly"
                :is-required="field.required"
                :has-addons="field.single_multiple"
                :key="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :multi="field.type === 'multi-select'"
                :help="field.help && `${props.order}` == 0 ? field.help.content : ''"
                :modal_help="field.help && `${props.order}` == 0 ? field.help.use_modal : false"
                :view-validation-texts="false"
                :translate-through-hlang="field.datasource.use_hlang"
                :translatable="field.datasource.translatable"
                :search-size="generate_ajax_search(field, 'size')"
                :search-fields="generate_ajax_search(field, 'fields')"
                :ajax-filters="generate_ajax_filter(field)"
                :prefetch-in-ajax="field.datasource.filter !== undefined"
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
                <fradio
                v-else-if="field.type === 'radio'"
                :label="(!field.single_multiple || `${props.order}` == 0) ? lang(field.label || '') : ''"
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
                :help="field.help && (!field.single_multiple || `${props.order}` == 0) ? field.help.content : ''"
                :modal_help="field.help && (!field.single_multiple || `${props.order}` == 0) ? field.help.use_modal : false"
                :translate-through-hlang="field.datasource.use_hlang"
                :translatable="field.datasource.translatable"
                :ajax-filters="generate_ajax_filter(field)"
                :prefetch-in-ajax="field.datasource.filter !== undefined"
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
                :files="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :name="field.file.file_name"
                :master="field.file.master_name"
                :url="field.file.url_name"
                :readonly="readonly || field.readonly"
                :key="get_name(`${props.fname}.${props.order}.${field.name}`)"
                :keeper_sink="field.file.keeper_sink"
                :restore_files="field.file.restore"
                :keep_files="field.file.keep"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                @analyze-file="dropzone_analyze_file"
                :allow-grobid="allowGrobid"
                />
                <fimporter
                v-else-if="field.type === 'importer'"
                :form="cform"
                :file_format="field.file_format"
                />
                <template v-else-if="field.type === 'subform' && field.subform != null">
                    <template v-if="form_is_of_type('widget', field)">
                        <widget :collapsed="field.subform_information.widget_collapsed">
                            <span slot="title">{{lang(field.subform_information.title)}}</span>
                            <div slot="body">
                                <dynamic-form
                                    :form="field.subform"
                                    :cform="cform"
                                    :prefix="`${props.fname}.${props.order}`"
                                    :single="field.single_multiple"
                                    :readonly="readonly"
                                    :key="`${props.fname}.${props.order}`"
                                    @crud-form-change="crud_form_change"
                                    @dropzone-analyze-file="dropzone_analyze_file"
                                    :allow-grobid="allowGrobid"
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
                            :prefix="`${props.fname}.${props.order}`"
                            :single="field.single_multiple"
                            :readonly="readonly"
                            :key="`${props.fname}.${props.order}`"
                            v-if="!form_is_of_type('hidden', field) || state.show[field.name]"
                            @crud-form-change="crud_form_change"
                            @dropzone-analyze-file="dropzone_analyze_file"
                            :allow-grobid="allowGrobid"
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
            v-if="['checkbox', 'text', 'email', 'phone', 'password', 'password-sha1', 'number', 'price', 'textarea', 'time', 'date', 'date-year', 'html-editor'].indexOf(field.type) !== -1"
            :class="[form.horizontal_display ? 'column is-pulled-bottom' : '', form.horizontal_display && field.columns_used ? 'is-'+field.columns_used : '']"
            :label="lang(field.label || '')"
            :name="get_name(field.name)"
            :placeholder="lang(field.placeholder || '')"
            :type="field.type"
            :form="cform"
            :key="get_name(field.name)"
            :readonly="readonly || field.readonly || state.isConditionalReadonly"
            :duplicate_warning="field.duplicate_warning"
            :conditional-readonly="field.conditional_readonly"
            :is-required="field.required"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            :year-range-start="field.range ? field.range.start : 0"
            :year-range-end="field.range ? field.range.end : 0"
            :year-step="field.range ? field.range.step : 1"
            :min-date="field.range ? state.selected_date[field.range.start_date] : null"
            :max-date="field.range ? state.selected_date[field.range.end_date] : null"
            @date-value-change="update_date"
            />
            <finput
            v-else-if="['hidden'].indexOf(field.type) !== -1"
            :key="get_name(field.name)"
            :name="get_name(field.name)"
            :type="field.type"
            :form="cform"
            :is-addon="true"
            :hidden-value="field.hiddenValue"
            :template="field.template"
            label=""
            :readonly="readonly || field.readonly || state.isConditionalReadonly"
            :conditional-readonly="field.conditional_readonly"
            :is-required="field.required"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            />
            <fcolor
            v-else-if="['color'].indexOf(field.type) !== -1"
            :name="get_name(field.name)"
            :form="cform"
            :label="lang(field.label || '')"
            :conditional-readonly="field.conditional_readonly"
            :readonly="readonly || field.readonly || state.isConditionalReadonly"
            :is-required="field.required"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            />
            <fstatic
                v-else-if="['static-html', 'static-text', 'static-list'].indexOf(field.type) !== -1"
                :class="[form.horizontal_display ? 'column is-pulled-bottom' : '', form.horizontal_display && field.columns_used ? 'is-'+field.columns_used : '']"
                :name="get_name(field.name)"
                :type="field.type"
                :form="cform"
                :label="lang(field.label || '')"
                :key="get_name(field.name)"
                :help="field.help ? field.help.content : ''"
                :modal_help="field.help ? field.help.use_modal : false"
                :template="field.hiddenValue"
            />
            <fselect
            v-else-if="field.type === 'select' || field.type === 'multi-select'"
            :label="lang(field.label || '')"
            :class="[form.horizontal_display ? 'column is-pulled-bottom' : '', form.horizontal_display && field.columns_used ? 'is-'+field.columns_used : '']"
            :placeholder="lang(field.placeholder || '')"
            :name="get_name(field.name)"
            :key="get_name(field.name)"
            :form="cform"
            :fieldLabel="generate_select_label(field)"
            :fieldValue="generate_select_value(field)"
            :options="generate_select_options(field)"
            :ajax="field.datasource.ajax"
            :ajax-url="generate_ajax_url(field)"
            :ajax-value-url="generate_ajax_url(field, 'value')"
            :readonly="readonly || field.readonly || state.isConditionalReadonly"
            :conditional-readonly="field.conditional_readonly"
            :is-required="field.required"
            :multi="field.type === 'multi-select'"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :view-validation-texts="false"
            :translate-through-hlang="field.datasource.use_hlang"
            :translatable="field.datasource.translatable"
            :search-size="generate_ajax_search(field, 'size')"
            :search-fields="generate_ajax_search(field, 'fields')"
            :ajax-query="field.datasource.query"
            :ajax-filters="generate_ajax_filter(field)"
            :prefetch-in-ajax="field.datasource.filter !== undefined"
            />
            <fradio
            v-else-if="field.type === 'radio'"
            :label="lang(field.label || '')"
            :class="[form.horizontal_display ? 'column is-pulled-bottom' : '', form.horizontal_display && field.columns_used ? 'is-'+field.columns_used : '']"
            :name="get_name(field.name)"
            :form="cform"
            :fieldLabel="generate_select_label(field)"
            :fieldValue="generate_select_value(field)"
            :conditional-readonly="field.conditional_readonly"
            :options="generate_select_options(field)"
            :ajax="field.datasource.ajax"
            :ajax-url="generate_ajax_url(field)"
            :ajax-value-url="generate_ajax_url(field, 'value')"
            :readonly="readonly || field.readonly || state.isConditionalReadonly"
            :is-required="field.required"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            :translate-through-hlang="field.datasource.use_hlang"
            :translatable="field.datasource.translatable"
            :ajax-filters="generate_ajax_filter(field)"
            :prefetch-in-ajax="field.datasource.filter !== undefined"
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
            :class="[form.horizontal_display ? 'column is-pulled-bottom' : '', form.horizontal_display && field.columns_used ? 'is-'+field.columns_used : '']"
            :form="cform"
            :files="get_name(field.name)"
            :key="get_name(field.name)"
            :name="field.file.file_name"
            :master="field.file.master_name"
            :url="field.file.url_name"
            :conditional-readonly="field.conditional_readonly"
            :readonly="readonly || field.readonly || state.isConditionalReadonly"
            :keeper_sink="field.file.keeper_sink"
            :restore_files="field.file.restore"
            :keep_files="field.file.keep"
            :help="field.help ? field.help.content : ''"
            :modal_help="field.help ? field.help.use_modal : false"
            @analyze-file="dropzone_analyze_file"
            :allow-grobid="allowGrobid"
            />
            <fimporter
            v-else-if="field.type === 'importer'"
            :form="cform"
            :importer="field.importer"
            />
            <template v-else-if="field.type === 'subform' && field.subform != null">
                <template v-if="form_is_of_type('widget', field)">
                    <widget :collapsed="field.subform_information.widget_collapsed">
                        <span slot="title">{{lang(field.subform_information.title)}}</span>
                        <div slot="body">
                            <dynamic-form
                                :form="field.subform"
                                :cform="cform"
                                :prefix="prefix"
                                :single="field.single_multiple"
                                :conditional-readonly="field.conditional_readonly"
                                :readonly="readonly || field.readonly || state.isConditionalReadonly"
                                :key="get_name(field.name)"
                                @crud-form-change="crud_form_change"
                                @dropzone-analyze-file="dropzone_analyze_file"
                                :allow-grobid="allowGrobid"
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
                        :prefix="prefix"
                        :single="field.single_multiple"
                        :conditional-readonly="field.conditional_readonly"
                        :readonly="readonly || field.readonly || state.isConditionalReadonly"
                        :key="get_name(field.name)"
                        @crud-form-change="crud_form_change"
                        @dropzone-analyze-file="dropzone_analyze_file"
                        :allow-grobid="allowGrobid"
                    >
                    </dynamic-form>
                </template>
            </template>
            <template v-else-if="field.type === 'dynamic-list'">
                <fdata-table-searching
                    :search-sink="cform"
                    :result-sink="state.sinks.reads.dynamic_list[field.name]"
                    :search-path="state.paths.reads.dynamic_list"
                    :search-query="dynamic_list_search_query[field.name]"
                    :use-default-query="false"
                    search-type="dynamic-list"
                    :checkable="true"
                    :checked-rows="state.checked_rows[field.name]"
                    :columns="dynamic_list_columns[field.name]"
                    @column-checkbox-update="on_column_update"
                    @table-checked-rows-update="on_checked_rows_update"
                    @update-data-from-api="on_update_data_from_api"
                    :show-search="false"
                    :enable-pagination="false"
                    :read-only="read_only[field.name]"
                    :auto-search="false"
                    :name="field.name"
                >
                    <template slot="rows" slot-scope="props">
                        <b-table-column v-for="(value, key) in state.columns[field.name]"
                                        :field="value.sort"
                                        :label="lang(value.title, {}, value.lang)"
                                        :visible="value.visible"
                                        :sortable="value.sortable"
                                        :centered="value.centered">
                                            <span
                                                    :class="`tag ${value.tag_class}`"
                                                    v-if="value.is_tag"
                                                    :inner-html.prop="props.row | find(value.field) | need_translation(value.translate, hlang, lang) | truncate(value.truncate) | show_lang_key(value.show_lang_key, _oa_find(props.row, value.field)) | format(value)"
                                            >
                                            </span>
                            <div v-else
                                 :inner-html.prop="props.row | find(value.field) | need_translation(value.translate, hlang, lang) | truncate(value.truncate) | show_lang_key(value.show_lang_key, _oa_find(props.row, value.field)) | format(value)"
                            >
                            </div>
                        </b-table-column>
                    </template>
                </fdata-table-searching>
            </template>
        </template>
    </template>
</div>
</template>

<script>
    module.exports = require('./DynamicForm');
</script>
