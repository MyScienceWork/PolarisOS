<template>
<div v-if="stacked">
    <div class="columns is-centered">
        <div class="column">
            <slot name="first-part">

            </slot>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column has-vertically-aligned-content is-uppercase">
            <h1 class="text-with-line">{{lang('t_or')}}</h1>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column">
            <slot name="second-part">

            </slot>
        </div>
    </div>
</div>
<div v-else class="columns is-centered">
    <div class="column is-5">
        <slot name="first-part">

        </slot>
    </div>
    <div class="column has-vertically-aligned-content is-uppercase">
        <h1 class="text-with-line">{{lang('t_or')}}</h1>
    </div>
    <div class="column is-5">
        <slot name="second-part">

        </slot>
    </div>
</div>
</template>

<script>
    module.exports = require('./AlternativeWidget');
</script>
