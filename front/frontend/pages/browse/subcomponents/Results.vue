<template>
    <div>
        <article class="media is-flex-mobile pos-search-result" v-for="(info, idx) in items">
            <div class="media-left" v-if="isSelectable">
                <finput
                :name="info._id"
                type="checkbox"
                :form="exportSink"
                :key="info._id"
                label=""
                />
            </div>
            <div class="media-content">
                <p class="has-small-bottom-margin">
                    <span>{{ info.title }}</span>
                </p>
            </div>
        </article>
    </div>
</template>

<script>
    module.exports = require('./Results');
</script>
