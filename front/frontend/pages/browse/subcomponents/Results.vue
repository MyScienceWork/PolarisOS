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
                  <router-link :alt="lang('f_view_publication')" :title="lang('f_view_publication')" :to="`/view/${info._id}`">
                    <span class="icon is-small"><i class="fa fa-external-link"></i></span>
                  </router-link>
                  <strong>{{ info.title }}</strong>
                  <span class="tag is-info">{{ lang(_oa_find(info, 'denormalization.group.label')) }}</span>
                </p>
                <p>
                  <span>{{ info.denormalization.authors | join('researcher.full_name') | truncate(30) }}</span>
                </p>
                <p>
                  <span>{{ _oa_find(info, 'denormalization.journal.name') }}</span>
                </p>
            </div>
        </article>
    </div>
</template>

<script>
    module.exports = require('./Results');
</script>
