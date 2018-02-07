<template>
    <div v-if="boxed" :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
        <header class="card-header">
            <p class="card-header-title" v-html="lang(title)"></p>
        </header>
        <div class="card-content">
            <article class="media" v-for="(info, idx) in items">
                <div class="media-content">
                    <template v-if="type === 'publication'">
                        <p v-html="info.html" />
                        <div class="is-pulled-right level is-mobile">
                            <div class="level-left">
                                <router-link class="level-item" :alt="lang('f_view_publication')" :title="lang('f_view_publication')" :to="`/view/${idx}`">
                                    <span class="icon is-small"><i class="fa fa-eye"></i></span>
                                </router-link>
                                <a class="level-item" :alt="lang('f_download_file')" :title="lang('f_download_file')">
                                    <span class="icon is-small"><i class="fa fa-unlock-alt"></i></span>
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
                    <template v-else-if="type === 'project'">
                        <p v-html="info.html" />
                    </template>
                </div>
            </article>
        </div>
    </div>
    <div v-else>
        <div :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
            <div class="card-content">
                <nav class="navbar is-transparent">
                    <div class="navbar-menu">
                        <div class="navbar-end">
                            <div class="navbar-item has-dropdown is-hoverable">
                                <a class="navbar-link swap">
                                    {{lang('f_export_publication')}}
                                </a>

                                <div class="navbar-dropdown">
                                    <a class="navbar-item swap">
                                        {{lang('f_export_csv')}}
                                    </a>
                                    <a class="navbar-item swap">
                                        {{lang('f_export_endnote')}}
                                    </a>
                                    <a class="navbar-item swap">
                                        {{lang('f_export_bibtex')}}
                                    </a>
                                </div>
                            </div>
                            <div class="navbar-item has-dropdown is-hoverable">
                                <a class="navbar-link swap">
                                    {{lang('f_items_per_page')}}
                                </a>

                                <div class="navbar-dropdown">
                                    <a class="navbar-item swap">
                                        20
                                    </a>
                                    <a class="navbar-item swap">
                                        50
                                    </a>
                                    <a class="navbar-item swap">
                                       100 
                                    </a>
                                </div>
                            </div>
                            <div class="navbar-item has-dropdown is-hoverable">
                                <a class="navbar-link swap">
                                    {{lang('f_sort_by')}}
                                </a>

                                <div class="navbar-dropdown">
                                    <a class="navbar-item swap">
                                        {{lang('f_sort_by_year')}}
                                    </a>
                                    <a class="navbar-item swap">
                                        {{lang('f_sort_by_publication_type')}}
                                    </a>
                                    <a class="navbar-item swap">
                                        {{lang('f_sort_by_deposit_year')}} 
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <article class="media" v-for="(info, idx) in items">
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
                            <p v-html="info.html" />
                            <div class="is-pulled-right level is-mobile">
                                <div class="level-left">
                                    <router-link class="level-item" :alt="lang('f_view_publication')" :title="lang('f_view_publication')" :to="`/view/${idx}`">
                                        <span class="icon is-small"><i class="fa fa-eye"></i></span>
                                    </router-link>
                                    <a class="level-item" :alt="lang('f_download_file')" :title="lang('f_download_file')">
                                        <span class="icon is-small"><i class="fa fa-unlock-alt"></i></span>
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
                        <template v-else-if="type === 'project'">
                            <p v-html="info.html" />
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
