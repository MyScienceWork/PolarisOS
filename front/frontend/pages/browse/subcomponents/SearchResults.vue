<template>
    <div class="card-content">
        <finput
        name="type"
        type="hidden"
        placeholder=""
        :form="state.sinks.reads.export"
        label=""
        :hidden-value="state.export_type"
        />
        <nav class="navbar is-transparent">
        <div class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link swap">
                        {{lang('f_export_publication')}}
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item swap" @click="export_format('bibtex', $event)">
                            {{lang('f_export_bibtex')}}
                        </a>
                        <a class="navbar-item swap" @click="export_format('csv', $event)">
                            {{lang('f_export_csv')}}
                        </a>
                        <a class="navbar-item swap" @click="export_format('endnote', $event)">
                            {{lang('f_export_endnote')}}
                        </a>
                        <a class="navbar-item swap" @click="export_format('ris', $event)">
                            {{lang('f_export_ris')}}
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
        <article class="media" v-for="(info, idx) in content">
        <div class="media-left">
            <finput
            :name="info._id"
            type="checkbox"
            :form="state.sinks.reads.export"
            label=""
            />
        </div>
        <div class="media-content">
            <p>{{info.title.content}}</p>
            <div class="is-pulled-right level is-mobile">
                <div class="level-left">
                    <router-link class="level-item" :alt="lang('f_view_publication')" :title="lang('f_view_publication')" :to="`/view/${info._id}`">
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
        </div>
        </article>
    </div>
</template>

<script>
    module.exports = require('./SearchResults');
</script>
