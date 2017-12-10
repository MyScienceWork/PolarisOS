<template>
<div :class="['field', {'is-hidden': isHidden}]" v-if="label.trim().length > 0">
        <label :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <div class="control">
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
        <div v-if="validations.length > 0">
            <p v-for="text in validations" class="redify inline-block">
                {{text}}
            </p>
        </div>
    </div>
    <div v-else :class="['control', {'is-hidden': isHidden}]">
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
            :placeholder="placeholder"
            :class="['input', {'readonly': readonly}]"
        >
        </v-select>
        <div v-if="validations.length > 0">
            <p v-for="text in validations" class="redify inline-block">
                {{text}}
            </p>
        </div>
    </div> 
</template>

<script>
module.exports = require('./Select');
</script>
