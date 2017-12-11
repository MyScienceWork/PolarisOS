<template>
<div class="field">
    <template v-if="form.addons && form.fields.length > 0">
        <finput 
            v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea'].indexOf(form.fields[0].type) !== -1"
            :label="lang(form.fields[0].label || '')"
            :name="get_name(form.fields[0].name, null)"
            :placeholder="lang(form.fields[0].placeholder || '')"
            :type="form.fields[0].type"
            :form="cform"
            :has-addons="form.addons"
            :readonly="readonly"
        >
            <template slot="input-addons">
                <template v-for="(field, i) in form.fields.slice(1)">
                    <finput 
                    v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea'].indexOf(field.type) !== -1"
                    :label="lang(field.label || '')"
                    :name="get_name(field.name, null)"
                    :placeholder="lang(field.placeholder || '')"
                    :type="field.type"
                    :form="cform"
                    :is-addon="true"
                    :readonly="readonly"
                    :is-required="field.required"
                    />
                    <finput 
                    v-else-if="['hidden'].indexOf(field.type) !== -1"
                    :name="get_name(field.name, null)"
                    :type="field.type"
                    :form="cform"
                    :is-addon="true"
                    :hidden-value="field.hiddenValue"
                    :readonly="readonly"
                    :is-required="field.required"
                    />
                    <fselect 
                    v-else-if="field.type === 'select'"
                    :label="lang(field.label || '')"
                    :placeholder="lang(field.placeholder || '')"
                    :name="get_name(field.name, null)"
                    :form="cform"
                    :fieldLabel="field.datasource.label"
                    :fieldValue="field.datasource.value"
                    :options="field.datasource.content || []"
                    :is-addon="true"
                    :readonly="readonly"
                    :is-required="field.required"
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
                v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea'].indexOf(field.type) !== -1"
                :label="lang(field.label || '')"
                :name="get_name(`${props.fname}.${props.id}.${field.name}`)"
                :placeholder="lang(field.placeholder || '')"
                :type="field.type"
                :form="cform"
                :has-addons="field.single_multiple"
                :readonly="readonly"
                :is-required="field.required"
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
                :name="get_name(field.name, null)"
                :type="field.type"
                :form="cform"
                :is-addon="true"
                :hidden-value="field.hiddenValue"
                :readonly="readonly"
                :is-required="field.required"
                />
                <fselect 
                v-else-if="field.type === 'select'"
                :label="lang(field.label || '')"
                :placeholder="lang(field.placeholder || '')"
                :name="get_name(`${props.fname}.${props.id}.${field.name}`)"
                :form="cform"
                :fieldLabel="field.datasource.label"
                :fieldValue="field.datasource.value"
                :options="field.datasource.content || []"
                :readonly="readonly"
                :is-required="field.required"
                />
                <fdropzone 
                v-else-if="field.type === 'file'"
                :form="cform"
                :files="get_name(`${props.fname}.${props.id}.${field.name}`)"
                :name="field.file.file_name"
                :master="field.file.master_name"
                :url="field.file.url_name"
                :readonly="readonly"
                />
                <dynamic-form 
                    :form="field.subform" 
                    :cform="cform"
                    :prefix="`${props.fname}.${props.id}`"
                    v-else-if="field.type === 'subform' && field.subform != null"
                    :single="field.single_multiple"
                    :readonly="readonly"
                >
                    <template v-if="field.single_multiple && !readonly" slot="form-addons">
                        <div class="control">
                            <a class="button is-info" @click="props.add">+</a>
                        </div>
                        <div class="control">
                            <a class="button is-info" @click="props.remove(props.id, $event)">-</a>
                        </div>
                    </template>
                </dynamic-form>
            </template>
        </fvariadic-element>
        <template v-else>
            <finput 
            v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea'].indexOf(field.type) !== -1"
            :label="lang(field.label || '')"
            :name="get_name(field.name, null)"
            :placeholder="lang(field.placeholder || '')"
            :type="field.type"
            :form="cform"
            :readonly="readonly"
            :is-required="field.required"
            />
            <finput 
            v-else-if="['hidden'].indexOf(field.type) !== -1"
            :name="get_name(field.name, null)"
            :type="field.type"
            :form="cform"
            :is-addon="true"
            :hidden-value="field.hiddenValue"
            :readonly="readonly"
            :is-required="field.required"
            />
            <fselect 
            v-else-if="field.type === 'select'"
            :label="lang(field.label || '')"
            :placeholder="lang(field.placeholder || '')"
            :name="get_name(field.name, null)"
            :form="cform"
            :fieldLabel="field.datasource.label"
            :fieldValue="field.datasource.value"
            :options="field.datasource.content || []"
            :readonly="readonly"
            :is-required="field.required"
            />
            <fdropzone 
            v-else-if="field.type === 'file'"
            :form="cform"
            :files="get_name(field.name, null)"
            :name="field.file.file_name"
            :master="field.file.master_name"
            :url="field.file.url_name"
            :readonly="readonly"
            />
            <dynamic-form 
                :form="field.subform" 
                :cform="cform"
                v-else-if="field.type === 'subform' && field.subform != null"
                :single="field.single_multiple"
                :readonly="readonly"
            >
            </dynamic-form>
        </template>
    </template>
</div>
</template>

<script>
    module.exports = require('./DynamicForm');
</script>
