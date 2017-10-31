<template>
<div class="field">
    <label :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
    <div class="control">
        <v-select
            :multiple="multi"
            :options="state.options"
            :label="fieldLabel"
            :on-change="onChange"
            :value="state.selected"
            class="input"
        >
        </v-select>
    </div> 
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
