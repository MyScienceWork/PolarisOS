<template>
  <div class="msw-loader">
    <div class="loader-square secondary-color" :style="css.secondary" />
    <div class="loader-square secondary-color" :style="css.secondary" />
    <div class="loader-square secondary-color loader-last" :style="css.secondary" />
    <div class="loader-square primary-color loader-clear" :style="css.primary" />
    <div class="loader-square primary-color" :style="css.primary" />
    <div class="loader-square primary-color loader-last" :style="css.primary" />
    <div class="loader-square secondary-color loader-clear" :style="css.secondary" />
    <div class="loader-square secondary-color" :style="css.secondary" />
    <div class="loader-square secondary-color loader-last" :style="css.secondary" />
  </div>
</template>

<script>
module.exports = require('./Loader');
</script>
