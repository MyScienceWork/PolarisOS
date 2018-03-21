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
                                    <div class="columns is-centered">
                                        <div class="column">
                                            <h4 class="title is-4">{{lang('l_minimal_information_publication')}}</h4>
                                        </div>
                                    </div>
                                    <div class="columns is-centered">
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">{{lang('b_title')}}</label>
                                                <p class="control">
                                                    {{info.title.content}} 
                                                </p>
                                            </div>
                                            <div class="field" v-for="subtitle in info.subtitles">
                                                <label class="label">{{lang('b_subtitle')}} ({{subtitle.lang}})</label>
                                                <p class="control">
                                                    {{subtitle.content}} 
                                                </p>
                                            </div>
                                            <div class="field" v-for="ttitle in info.translated_titles">
                                                <label class="label">{{lang('b_translated_titles')}} ({{ttitle.lang}})</label>
                                                <p class="control">
                                                    {{ttitle.content}} 
                                                </p>
                                            </div>
                                            <div class="field">
                                                <label class="label">{{lang('b_title')}}</label>
                                                <p class="control">
                                                    {{info.title.content}} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
