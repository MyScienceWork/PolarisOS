<template>
<div class="form-group">
    <label :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
    <v-select
        :multiple="multi"
        :options="state.options"
        :label="fieldLabel"
        :on-change="onChange"
        :value="state.selected"
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
