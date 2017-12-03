<template>
    <div v-if="boxed" :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
        <header class="card-header">
            <p class="card-header-title" v-html="lang(title)"></p>
        </header>
        <div class="card-content">
            <article class="media" v-for="(info, idx) in state.infos">
                <div class="media-content">
                    <template v-if="type === 'publication'">
                        <p v-html="info.master_content" />
                        <div class="is-pulled-right level is-mobile">
                            <div class="level-left">
                                <a class="level-item" :alt="lang('f_view_publication')" :title="lang('f_view_publication')">
                                    <span class="icon is-small"><i class="fa fa-eye"></i></span>
                                </a>
                                <a class="level-item" :alt="lang('f_download_file')" :title="lang('f_download_file')">
                                    <span class="icon is-small"><i class="fa fa-file"></i></span>
                                </a>
                                <a class="level-item" :alt="lang('f_use_as_model')" :title="lang('f_use_as_model')">
                                    <span class="icon is-small"><i class="fa fa-book"></i></span>
                                </a>
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
                    </template>
                </div>
            </article>
        </div>
    </div>
    <div v-else>
        <div :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
            <div class="card-content">
                <article class="media" v-for="(info, idx) in state.infos">
                    <div class="media-left">
                        <finput
                        :name="idx"
                        type="checkbox"
                        form="dummy-form"
                        label=""
                        />
                    </div>
                    <div class="media-content">
                        <template v-if="type === 'publication'">
                            <p v-html="info.master_content" />
                            <div class="is-pulled-right level is-mobile">
                                <div class="level-left">
                                    <a class="level-item" :alt="lang('f_view_publication')" :title="lang('f_view_publication')">
                                        <span class="icon is-small"><i class="fa fa-eye"></i></span>
                                    </a>
                                    <a class="level-item" :alt="lang('f_download_file')" :title="lang('f_download_file')">
                                        <span class="icon is-small"><i class="fa fa-file"></i></span>
                                    </a>
                                    <a class="level-item" :alt="lang('f_use_as_model')" :title="lang('f_use_as_model')">
                                        <span class="icon is-small"><i class="fa fa-book"></i></span>
                                    </a>
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
                        </template>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./ListWidget');
</script>
