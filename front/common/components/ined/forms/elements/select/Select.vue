<template>
    <div :class="['field', {'is-hidden': isHidden}]">
        <label 
            v-if="label.trim().length > 0"
            :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <div :class="['field', {'has-addons': hasAddons}]">
            <div :class="['control', {'is-expanded': hasAddons}]">
                <ul v-if="readonly && multi">
                    <li v-for="selected in readonlyValue">{{selected}}</li> 
                </ul>
                <p v-else-if="readonly">{{readonlyValue}}</p>
                <v-select
                    v-else
                    :multiple="multi"
                    :options="state.options"
                    :on-change="onChange"
                    :value="state.selected"
                    :class="['input', {'readonly': readonly}]"
                >
                </v-select>
            </div> 
            <slot v-if="hasAddons" name="input-addons" />
            </slot>
        </div>
        <div v-if="validations.length > 0">
            <p v-for="text in validations" class="redify inline-block">
                {{lang(text)}}
            </p>
        </div>
    </div>
</template>

<script>
module.exports = require('./Select');
</script>
