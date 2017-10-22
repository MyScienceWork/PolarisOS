<template>
    <div class="form-group">
        <label :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <div>
            <button @click.prevent="state.show = !state.show" class="btn color-box" :style="`background-color: ${state.color.hex}`"></button>
            <div v-if="state.show" style="position:absolute; z-index:2;" v-on-click-away="away">
                <sketch-picker v-model="state.color" :hex="state.color.hex" />
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./Color');
</script>
