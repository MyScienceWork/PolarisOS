<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_entities')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.entity"
                            :search-path="state.paths.reads.entity"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="entity"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <router-link
                                    class="has-text-green"
                                    :to="`/admin/entity/${props.info.type}`"
                                    >
                                        <i class="fa fa-eye"></i>
                                    </router-link>
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(props.info, 'entity')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(props.info, 'entity')"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'entity')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
                                    {{props.info.type}} 
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
                    <span slot="title">
                    {{lang('l_add_or_modify_entity')}}
                    </span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.entity" 
                            :post_path="state.paths.creations.entity" 
                            :put_path="state.paths.creations.entity"
                            :get_path="state.paths.reads.entity"
                            :get_form="state.sinks.reads.entity"
                        >
                        <finput name="type" :label="lang('b_entity_name')" :is-required="true" :placeholder="lang('b_entity_name')" type="text" :form="state.sinks.creations.entity" />
                        <fselect
                            name="form" 
                            :label="lang('b_form_name')" 
                            :is-required="true"
                            :options="forms || []"
                            fieldLabel="name"
                            fieldValue="_id"
                            :form="state.sinks.creations.entity" 
                        />
                        <fselect
                            name="pipelines" 
                            :label="lang('b_pipeline_name', {}, 'other')" 
                            :is-required="true"
                            :options="pipelines || []"
                            fieldLabel="name"
                            fieldValue="_id"
                            :form="state.sinks.creations.entity"
                            :multi="true"
                        />
                        <finput rows="30" name="mapping" :label="lang('b_entity_mapping')" :is-required="true" type="ide-editor" :form="state.sinks.creations.entity" />
                        <finput rows="30" name="settings" :label="lang('b_entity_settings')" :is-required="true" type="ide-editor" :form="state.sinks.creations.entity" />
                        <finput name="update_settings" :label="lang('b_update_settings')" placeholder="" type="checkbox" :form="state.sinks.creations.entity" />
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Entity');
</script>
