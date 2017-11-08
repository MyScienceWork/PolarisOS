<template>
    <div class="field">
        <template v-for="field in form.fields">
            <fvariadic-element class="field" :name="field.multiple_name" :form="cform" v-if="field.multiple">
                <template slot="variadic" slot-scope="props">
                    <finput 
                    v-if="['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea'].indexOf(field.type) !== -1"
                    :label="lang(field.label || '')"
                    :name="get_name(`${props.fname}.${props.id}.${field.name}`)"
                    :placeholder="lang(field.placeholder || '')"
                    :type="field.type"
                    :form="cform"
                    />
                    <dynamic-form 
                        :form="field.subform" 
                        :cform="cform"
                        :prefix="`${props.fname}.${props.id}`"
                        v-else-if="field.type === 'subform' && field.subform != null"
                    >
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
                />
                <dynamic-form 
                    :form="field.subform" 
                    :cform="cform"
                    v-else-if="field.type === 'subform' && field.subform != null"
                >
                </dynamic-form>
            </template>
        </template>
    </div>
</template>

<script>
    module.exports = require('./DynamicForm');
</script>
