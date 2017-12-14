<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title"></span>
                    <div slot="body">
                        <div class="columns is-centered" v-if="contentLength > 0">
                            <div class="column">
                                <table class="table is-bordered">
                                    <thead>
                                        <tr>
                                            <th>{{lang('b_title')}}</th>
                                            <th>{{lang('b_authors')}}</th>
                                            <th>{{lang('b_publication_status')}}</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in content">
                                            <td>{{row.titles[0].content}}</td>
                                            <td>{{row.authors.map(a => a._id.fullname).join(', ')}}</td>
                                            <td>{{row.status}}</td>
                                            <td>
                                                <a
                                                class="button is-small button-background-green"
                                                :href="`/deposit?_id=${row._id}&mode=review`"
                                                >
                                                <i class="fa fa-pencil"></i>
                                                </a>
                                                <action-button
                                                class="button is-small button-background-red"
                                                confirmation="Are you sure?"
                                                :two-steps="true"
                                                @action-click="remove(row, 'publication')"
                                                >
                                                <i class="fa fa-times"></i>
                                                </action-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="contentLength" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Review');
</script>
