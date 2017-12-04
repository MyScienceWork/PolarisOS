<template>
    <div class="field" v-if="label.trim().length > 0">
        <label :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <div class="control">
            <v-select
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
    <div v-else class="control">
        <v-select
            :multiple="multi"
            :options="state.options"
            :on-change="onChange"
            :value="state.selected"
            :placeholder="placeholder"
            :class="['input', {'readonly': readonly}]"
        >
        </v-select>
    </div> 
</template>

<script>
module.exports = require('./Select');
</script>
