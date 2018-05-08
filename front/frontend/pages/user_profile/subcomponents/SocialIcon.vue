<template>
    <p 
        class="has-text-vcentered has-small-bottom-margin"
        v-if="hasImage"
    >
        <span class="icon is-medium">
            <img :src='imgUrl' alt='Icon' width="32" /> 
        </span>
        <a v-if="hasUrl" class="has-small-left-margin" 
            :href='url'>
            {{socialId}}
        </a>
        <span v-else class="has-small-left-margin">{{id}}</span>
    </p>
    <p 
        class="has-text-vcentered has-small-bottom-margin"
        v-else
    >
        <span class="icon is-medium">
            <i :class="['fa fa-2x', icon]"></i> 
        </span>
        <a v-if="hasUrl" class="has-small-left-margin" 
            :href='url'>
            {{socialId}}
        </a>
        <span v-else class="has-small-left-margin">{{id}}</span>
    </p>
</template>

<script>
module.exports = require('./SocialIcon');
</script>
