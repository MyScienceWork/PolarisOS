<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('b_list_datainstances')}}</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in read_content_datainstance">
                            <div v-for="content in row" class="column">
                                <widget>
                                    <span slot="title">
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(content, entity())"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        :confirmation="lang('b_are_sure')"
                                        :two-steps="true"
                                        @action-click="remove(content, entity())"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{content.label || content.name || content.title || content.question || content.fullname}}
                                    </span>
                                    <div slot="body">
                                    </div>
                                </widget>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="length_datainstance" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('b_add_entity')}}</span>
                    <div slot="body">
                        <fform 
                            :name="state.sinks.creations[entity()]" 
                            :post_path="state.paths.creations[entity()]" 
                            :put_path="state.paths.creations[entity()]"
                            :get_path="state.paths.reads[entity()]"
                            :get_form="state.sinks.reads[entity()]"
                            >
                            <dynamic-form :form="fform(state.sinks.reads.form).content || {}" :cform="state.sinks.creations[entity()]" />
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>
<script>
module.exports = require('./EntityView');
</script>
