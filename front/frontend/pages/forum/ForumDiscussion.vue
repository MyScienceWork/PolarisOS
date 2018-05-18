<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-12 has-text-centered">
                <h4 class="title is-4">{{lang('l_forum_info')}}</h4>
                <p v-html="lang('l_forum_help')"></p>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-2 is-offset-9">
                <router-link :to="`/forum/newsubject`">
                    <a class="button is-info">{{lang('l_new_subject')}}</a>
                </router-link>
            </div>
        </div>

        <div class="columns is-centered">
            <discussions-searching
                v-if="es_query_contents['frontoffice-discussion-query'] && es_query_contents['frontoffice-discussion-default-query']"
                :search-sink="state.sinks.creations.search"
                :result-sink="state.sinks.reads.forum_discussion"
                :search-path="state.paths.reads.forum_discussion"
                :search-query="es_query_contents['frontoffice-discussion-query']"
                :use-default-query="true"
                :default-query="es_query_contents['frontoffice-discussion-default-query']"
                search-type="forum_discussion"
            >
            <div class="container is-full" slot="search-discussions-results" slot-scope="props">
                <div class="columns is-centered">
                    <div class="column is-narrow">
                        <table class="table is-striped is-hoverable">
                            <thead>
                                <tr>
                                    <th>{{lang('l_subject', {}, 'other')}}</th>
                                    <th>{{lang('l_reply', {}, 'other')}}</th>
                                    <!--<th>{{lang('l_view', {}, 'other')}}</th>
                                    <th>{{lang('l_activity')}}</th>-->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in props.results">
                                    <th>
                                        <p><router-link :to="`/forum/thread/${row._id}`">{{row.title}}</router-link><br />
                                            <span> by {{row.author.fullName}}, </span>
                                            <small> format_date(row.createdAt, 'fromNow') </small>
                                            <small v-html="row.description"></small></p>
                                    </th>
                                    <td>{{row.comments ? row.comments.length : 0}}</td>
                                    <!--<td>{{row.views}}</td>-->
                                    <!--<td>{{date_format(row.activity)}}</td>-->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </discussions-searching>
        </div>


        <!-- <div class="columns is-centered">
            <div class="column is-narrow">
                <table class="table is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th>{{lang('l_subject', {}, 'other')}}</th>
                            <th>{{lang('l_reply', {}, 'other')}}</th>
                            <!- -<th>{{lang('l_view', {}, 'other')}}</th>
                            <th>{{lang('l_activity')}}</th>- - >
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in discussions">
                            <th>
                                <p><router-link :to="`/forum/thread/${row._id}`">{{row.title}}</router-link><br />
                                    <span> by {{row.author.fullName}}, </span>
                                    <small> format_date(row.createdAt, 'fromNow') </small>
                                    <small v-html="row.description"></small></p>
                            </th>
                            <td>{{row.comments ? row.comments.length : 0}}</td>
                            <!- -<td>{{row.views}}</td>-->
                            <!--<td>{{date_format(row.activity)}}</td>- ->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> -->
    </div>
</div>
</template>

<script>
module.exports = require('./ForumDiscussion');
</script>
