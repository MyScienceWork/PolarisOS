<template>
    <div :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
        <header class="card-header">
            <p class="card-header-title" v-html="lang(title)"></p>
        </header>
        <div class="card-content" v-html="lang(content)">
        </div>
    </div>
</template>

<script>
    module.exports = require('./TextWidget');
</script>
