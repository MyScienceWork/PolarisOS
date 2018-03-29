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
            <div class="column is-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>{{lang('l_subject', {}, 'other')}}</th>
                            <th>{{lang('l_reply', {}, 'other')}}</th>
                            <!--<th>{{lang('l_view', {}, 'other')}}</th>
                            <th>{{lang('l_activity')}}</th>-->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in discussions">
                            <th>
                                <p><router-link :to="`/forum/thread/${row._id}`">{{row.title}}</router-link><br /><small v-html="row.description"></small></p>
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
</div>
</template>

<script>
module.exports = require('./ForumDiscussion');
</script>
