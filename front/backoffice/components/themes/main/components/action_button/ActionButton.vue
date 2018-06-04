<template>
    <component :is="tag" @click="click">
        <slot v-if="!state.confirm">

        </slot>
        <span v-else v-html="lang('confirmation')">
        </span>
    </component>
</template>

<script>
    module.exports = require('./ActionButton');
</script>
