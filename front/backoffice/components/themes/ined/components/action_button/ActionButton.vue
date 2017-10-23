<template>
    <button @click="click">
        <slot v-if="!state.confirm">

        </slot>
        <span v-else>
            {{confirmation}}
        </span>
    </button>
</template>

<script>
    module.exports = require('./ActionButton');
</script>
