<template>
<div>
    <article class="media" v-for="(info, idx) in items">
        <div class="media-content">
            <p v-html="info.html" />
            <div class="is-pulled-right level is-mobile">
                <div class="level-left">
                    <div class="level-left">
                        <router-link class="level-item" :alt="lang('f_view_publication')" :title="lang('f_view_publication')" :to="`/view/${info._id}`">
                        <span class="icon is-small"><i class="fa fa-eye"></i></span>
                        </router-link>
                        <a class="level-item" :alt="lang('f_download_file')" :title="lang('f_download_file')">
                            <span class="icon is-small"><i class="fa fa-unlock-alt"></i></span>
                        </a>
                        <router-link class="level-item" :alt="lang('f_use_as_model')" :title="lang('f_use_as_model')" :to="`/deposit?type=model&_id=${info._id}`">
                            <span class="icon is-small"><i class="fa fa-book"></i></span>
                        </router-link>
                        <a class="level-item" :alt="lang('f_modify_publication')" :title="lang('f_modify_publication')">
                            <span class="icon is-small"><i class="fa fa-pencil"></i></span>
                        </a>
                        <a class="level-item" :alt="lang('f_share_on_fb')" :title="lang('f_share_on_fb')">
                            <span class="icon is-small"><i class="fa fa-facebook-official"></i></span>
                        </a>
                        <a class="level-item" :alt="lang('f_share_on_twitter')" :title="lang('f_share_on_twitter')">
                            <span class="icon is-small"><i class="fa fa-twitter"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </article>
</div>
</template>

<script>
    module.exports = require('./LastDeposits');
</script>
