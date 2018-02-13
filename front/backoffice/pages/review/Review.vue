<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_review_publication')}}</span>
                    <div slot="body">
                        <div v-for="row in read_content_publication" class="columns is-centered">
                            <div v-for="info in row" class="column">
                                <widget>
                                <span slot="title">
                                    {{info.title.content}} ({{info.status}})
                                    <a
                                        class="button is-small button-background-green"
                                        :href="`${host}/deposit?type=review&_id=${info._id}`"
                                    >
                                        <i class="fa fa-eye"></i>
                                    </a>
                                    <action-button
                                    class="button is-small button-background-red"
                                    :confirmation="lang('b_are_sure')"
                                    :two-steps="true"
                                    @action-click="remove(info, 'publication')"
                                    >
                                        <i class="fa fa-times"></i>
                                    </action-button>
                                </span>
                                <div slot="body">
                                </div>
                                </widget>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="length_publication" :items-per-page="state.itemsPerPage" />
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
