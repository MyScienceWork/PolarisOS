<template>
    <div class="hero-body">
        <div class="container has-text-centered">
            <login-choice :backoffice="true" />
        </div>
    </div>
</template>

<script>
    module.exports = require('./LoginChoice');
</script>
