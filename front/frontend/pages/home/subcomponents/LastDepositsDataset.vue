<template>
<div>
    <article class="media is-flex-mobile pos-search-result" v-for="(info, idx) in items">
        <div class="media-content">
            <div class="has-small-bottom-margin">
                <a :href="`/view_dataset/${info._id}`"><span v-html="info.title"></span></a>
                <span> - </span>
                <span v-if="_oa_find(info, 'denormalization.author')" >
                    <span v-for="author in info.denormalization.author">{{ author.label.fullname }} - </span>
                </span>
                <span v-if="_oa_find(info, 'dates.deposit')">{{ parseInt(info.dates.deposit, 10) | format_date('MM/DD/YYYY') }}</span>
            </div>
            <div class="level-right level is-mobile is-hidden-mobile">
                <div class="level-left">
                    <router-link class="level-item" :alt="lang('f_view_publication')" :title="lang('f_view_publication')" :to="`/view_dataset/${info._id}`">
                        <span class="icon is-small"><i class="fa fa-eye"></i></span>
                    </router-link>
                </div>
            </div>
        </div>
    </article>
</div>
</template>

<script>
    module.exports = require('./LastDepositsDataset');
</script>
