<template>
    <component :is="tag" @click="click">
        <slot v-if="!state.confirm">

        </slot>
        <span v-else v-html="confirmation">
        </span>
    </component>
</template>

<script>
    module.exports = require('./ActionButton');
</script>
