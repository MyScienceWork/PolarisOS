<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_roles')}}</span>
                    <div slot="body" v-intro="lang('l_backoffice_read_zone')">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.role"
                            :search-path="state.paths.reads.role"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="role"
                            :matrix-row-size="2"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                <action-button
                                v-intro="lang('l_backoffice_edit_button_help')"
                                v-intro-if="props.row_id === 0 && props.id === 0"
                                class="has-text-blue"
                                tag="a"
                                v-scroll-to="'#mwidget'"
                                @action-click="update(props.info, 'role', transform_role)"
                                >
                                <i class="fa fa-pencil"></i>
                                </action-button>
                                <action-button
                                v-intro="lang('l_backoffice_model_button_help')"
                                v-intro-if="props.row_id === 0 && props.id === 0"
                                class="has-text-orange"
                                tag="a"
                                v-scroll-to="'#mwidget'"
                                @action-click="use_as_model(props.info, 'role', transform_role)"
                                >
                                <i class="fa fa-clone"></i>
                                </action-button>
                                <action-button
                                v-intro="lang('l_backoffice_remove_button_help')"
                                v-intro-if="props.row_id === 0 && props.id === 0"
                                class="has-text-red"
                                tag="a"
                                confirmation="Are you sure?"
                                :two-steps="true"
                                @action-click="remove(props.info, 'role')"
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
                    <span slot="title">{{lang('l_add_or_modify_role')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.role" 
                            :post_path="state.paths.creations.role" 
                            :put_path="state.paths.creations.role"
                            :get_form="state.sinks.reads.role"
                            :get_path="state.paths.reads.role"
                        >
                            <finput 
                            name="name" 
                            :label="lang('b_name')" 
                            :is-required="true" 
                            :placeholder="lang('b_name')" 
                            type="text" 
                            :form="state.sinks.creations.role" 
                            :help="lang('l_back_entity_name_help')" 
                            />
                            <finput 
                            name="id" 
                            :label="lang('b_id')" 
                            :is-required="true" 
                            :placeholder="lang('b_id')" 
                            type="text" 
                            :form="state.sinks.creations.role"
                            :help="lang('l_back_entity_id_help')"
                            />
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_rights_system_entities')}}</span>
                                <div slot="body">
                                    <article class="message is-info">
                                        <div class="message-body" v-html="lang('l_rights_system_entities_help')">
                                        </div>
                                    </article>
                                    <b-table :data="system_entities">
                                        <template slot-scope="props">
                                            <b-table-column field="type" :label="lang('l_e_entity_type')" centered sortable>
                                                {{props.row.type}}
                                            </b-table-column>    
                                            <b-table-column field="entity.c" :label="lang('b_create')" centered>
                                                <finput :name="`orights.${props.row.type}.c`" label="" placeholder="" type="checkbox" :form="state.sinks.creations.role" />
                                            </b-table-column>    
                                            <b-table-column field="entity.r" :label="lang('b_read')" centered>
                                                <finput :name="`orights.${props.row.type}.r`" label="" placeholder="" type="checkbox" :form="state.sinks.creations.role" />
                                            </b-table-column>    
                                            <b-table-column field="entity.u" :label="lang('b_update')" centered>
                                                <finput :name="`orights.${props.row.type}.u`" label="" placeholder="" type="checkbox" :form="state.sinks.creations.role" />
                                            </b-table-column>    
                                            <b-table-column field="entity.d" :label="lang('b_delete')" centered>
                                                <finput :name="`orights.${props.row.type}.d`" label="" placeholder="" type="checkbox" :form="state.sinks.creations.role" />
                                            </b-table-column>    
                                        </template>
                                    </b-table>
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_rights_custom_entities')}}</span>
                                <div slot="body">
                                    <article class="message is-info">
                                        <div class="message-body" v-html="lang('l_rights_custom_entities_help')">
                                        </div>
                                    </article>
                                    <b-table :data="custom_entities">
                                        <template slot-scope="props">
                                            <b-table-column field="type" :label="lang('l_e_entity_type')" centered sortable>
                                                {{ props.row.type}}
                                            </b-table-column>    
                                            <b-table-column field="entity.c" :label="lang('b_create')" centered>
                                                <finput :name="`orights.${props.row.type}.c`" label="" placeholder="" type="checkbox" :form="state.sinks.creations.role" />
                                            </b-table-column>    
                                            <b-table-column field="entity.r" :label="lang('b_read')" centered>
                                                <finput :name="`orights.${props.row.type}.r`" label="" placeholder="" type="checkbox" :form="state.sinks.creations.role" />
                                            </b-table-column>    
                                            <b-table-column field="entity.u" :label="lang('b_update')" centered>
                                                <finput :name="`orights.${props.row.type}.u`" label="" placeholder="" type="checkbox" :form="state.sinks.creations.role" />
                                            </b-table-column>    
                                            <b-table-column field="entity.d" :label="lang('b_delete')" centered>
                                                <finput :name="`orights.${props.row.type}.d`" label="" placeholder="" type="checkbox" :form="state.sinks.creations.role" />
                                            </b-table-column>    
                                        </template>
                                    </b-table>
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_rights_pages')}}</span>
                                <div slot="body">
                                    <article class="message is-info">
                                        <div class="message-body" v-html="lang('l_rights_pages_help')">
                                        </div>
                                    </article>
                                    <b-table :data="pages">
                                        <template slot-scope="props">
                                            <b-table-column field="type" :label="lang('l_e_entity_type')" centered sortable>
                                                {{props.row.type}}
                                            </b-table-column>    
                                            <b-table-column field="entity.r" :label="lang('b_read')" centered>
                                                <finput :name="`orights.${props.row.type}.r`" label="" placeholder="" type="checkbox" :form="state.sinks.creations.role" />
                                            </b-table-column>    
                                        </template>
                                    </b-table>
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
module.exports = require('./Role');
</script>
