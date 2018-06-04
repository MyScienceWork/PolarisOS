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
                            <finput name="search_query" 
                                :label="lang('l_search_query')" 
                                :placeholder="lang('l_search_query')" 
                                :is-required="true" 
                                type="text" 
                                :form="state.sinks.creations.entity"
                            />
                            <widget :collapsed="true"> 
                                <span slot="title">{{lang('l_configure_backoffice_preview')}}</span>
                                <div slot="body">
                                    <fvariadic-element name="backoffice.columns" :form="state.sinks.creations.entity" :tabs="true">
                                        <template slot="variadic" slot-scope="props">
                                            <finput :name="`${props.fname}.${props.order}.field`" 
                                                :label="lang('l_mapping_field')" 
                                                :placeholder="lang('l_mapping_field')" 
                                                :is-required="true" 
                                                type="text" 
                                                :form="state.sinks.creations.entity"
                                            />
                                            <finput :name="`${props.fname}.${props.order}.title`" 
                                                :label="lang('l_column_title')" 
                                                :placeholder="lang('l_column_title')" 
                                                :is-required="true" 
                                                type="text" 
                                                :form="state.sinks.creations.entity"
                                            />
                                            <finput :name="`${props.fname}.${props.order}.sortable`" 
                                                :label="lang('l_column_sortable')" 
                                                type="checkbox" 
                                                :form="state.sinks.creations.entity"
                                            />
                                            <finput :name="`${props.fname}.${props.order}.sort`" 
                                                :label="lang('l_sort_field')" 
                                                :placeholder="lang('l_sort_field')" 
                                                :is-required="false" 
                                                type="text" 
                                                :form="state.sinks.creations.entity"
                                            />
                                            <finput :name="`${props.fname}.${props.order}.centered`" 
                                                :label="lang('l_column_content_centered')" 
                                                type="checkbox" 
                                                :form="state.sinks.creations.entity"
                                            />
                                            <finput :name="`${props.fname}.${props.order}.force`" 
                                                :label="lang('l_column_cannot_be_hidden')" 
                                                type="checkbox" 
                                                :form="state.sinks.creations.entity"
                                            />
                                            <finput :name="`${props.fname}.${props.order}.is_tag`" 
                                                :label="lang('l_column_content_is_tag')" 
                                                type="checkbox" 
                                                :form="state.sinks.creations.entity"
                                            />
                                            <finput :name="`${props.fname}.${props.order}.tag_class`" 
                                                :label="lang('l_column_content_tag_class')" 
                                                :placeholder="lang('l_column_content_tag_class')" 
                                                :is-required="false" 
                                                type="text" 
                                                :form="state.sinks.creations.entity"
                                            />
                                            <finput :name="`${props.fname}.${props.order}.truncate`" 
                                                :label="lang('l_column_content_truncate')" 
                                                :placeholder="lang('l_column_content_truncate')" 
                                                :is-required="false" 
                                                type="number"
                                                :default-value="0"
                                                :form="state.sinks.creations.entity"
                                            />
                                        </template>
                                    </fvariadic-element>
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_configure_mapping')}}</span>
                                <div slot="body">
                                    <tabber :tabs="[lang('l_interactive_mapping_mode'), lang('l_expert_mapping_mode')]">
                                        <template slot="body" slot-scope="tprops">
                                            <template v-if="tprops.id === 0">
                                                <mapping-builder :mappingName="mapping_name" :mapping.sync="mapping_object" />
                                            </template>
                                            <template v-else-if="tprops.id === 1">
                                                <finput 
                                                    rows="30" name="mapping" 
                                                    :label="lang('b_entity_mapping')" 
                                                    :is-required="true" 
                                                    type="ide-editor" :form="state.sinks.creations.entity"
                                                />
                                            </template>
                                        </template>
                                    </tabber>
                                    <hr />
                                    <finput rows="30" name="settings" :label="lang('b_entity_settings')" :is-required="true" type="ide-editor" :form="state.sinks.creations.entity" />
                                    <finput name="update_settings" :label="lang('b_update_settings')" placeholder="" type="checkbox" :form="state.sinks.creations.entity" />
                                </div>
                            </widget>
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
