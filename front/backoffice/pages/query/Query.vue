<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_queries')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.query"
                            :search-path="state.paths.reads.query"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="query"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(props.info, 'query')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(props.info, 'query')"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'query')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
                                    {{props.info.name}} ({{props.info.id}})
                                </span>
                                <div slot="body">
                                </div>
                            </widget>
                        </fsearching>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget id="mwidget">
                <span slot="title">{{lang('l_add_or_modify_query')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.query"
                            :post_path="state.paths.creations.query"
                            :put_path="state.paths.creations.query"
                            :get_path="state.paths.reads.query"
                            :get_form="state.sinks.reads.query"
                        >
                        <finput
                            name="name"
                            :label="lang('l_query_name')"
                            :is-required="true"
                            :placeholder="lang('l_query_name')"
                            type="text"
                            :form="state.sinks.creations.query"
                        />
                        <finput
                            name="id"
                            :label="lang('l_query_id')"
                            :is-required="true"
                            :placeholder="lang('l_query_id')"
                            type="text"
                            :form="state.sinks.creations.query"
                        />
                        <finput
                            rows="30"
                            name="content"
                            :label="lang('l_query_content_json')"
                            :is-required="true"
                            type="ide-editor"
                            :form="state.sinks.creations.query"
                        />
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Query');
</script>
