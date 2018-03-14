<template>
    <div :class="`card info-card info-card-${color}`">
        <header class="card-header">
            <p class="card-header-title">
                <slot name="card-title">
                </slot>
            </p>
            </header>
            <div class="card-content">
                <slot name="card-content">

                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./Card');
</script>
