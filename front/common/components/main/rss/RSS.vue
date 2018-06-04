<template>
    <a :class="`icon ${iconSize} share-icon`" target='_blank' :title="lang('l_rss_feed')" :href='url'>
        <i :class="`fa fa-rss-square ${iconFontSize}`"></i>
    </a>
</template>

<script>
   module.exports = require('./RSS'); 
</script>
