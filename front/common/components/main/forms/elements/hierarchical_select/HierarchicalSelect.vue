<template>
    <div>
        <label :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <div class="field">
            <div class="select">
                <select :name="name" :readonly="readonly" v-model="state.value" @change="onChange">
                    <option v-if="title" disabled>{{title}}</option>
                    <template v-for="item in options">
                        <optgroup :label="item[fieldLabel]">
                            <option v-for="child in item[fieldChildren]" :value="child[fieldValue]">{{child[fieldChildLabel]}}</option>
                        </optgroup>
                    </template>
                </select>
            </div>
        </div>
        <div v-if="validations.length > 0">
            <p v-for="text in validations" class="redify inline-block">
                {{text}}
            </p>
        </div>
    </div>

</template>

<script>
    module.exports = require('./HierarchicalSelect');
</script>
