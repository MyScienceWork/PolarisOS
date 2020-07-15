<template>
<div>
    <article class="media is-flex-mobile pos-search-result" v-for="(info, idx) in items">
        <div class="media-content">
            <p class="has-small-bottom-margin">
                <span v-html="info.title"></span>
            </p>
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
    module.exports = require('./LastDeposits');
</script>
