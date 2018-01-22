<template>
    <div :class="`card info-card info-card-${color}`">
        <header class="card-header">
            <p class="card-header-title">
                <slot name="card-title">
                </slot>
            </p>
        </header>
        <slot class="card-content" name="card-content">

        </slot>
        </div>
    </div>
</template>

<script>
    module.exports = require('./Card');
</script>
