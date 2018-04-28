<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_roles')}}</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                            <div v-for="content in row" class="column">
                                <widget>
                                    <span slot="title">
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(content, 'role')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(content, 'role')"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(content, 'role')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
                                        {{content.name}} 
                                    </span>
                                    <div slot="body">
                                    </div>
                                </widget>
                            </div>
                        </div>
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
                            :name="state.forms.csink" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.forms.rsink"
                        >
                            <finput name="name" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.forms.csink" />
                            <finput name="id" :label="lang('b_id')" :is-required="true" :placeholder="lang('b_id')" type="text" :form="state.forms.csink" />
                            <p class="title is-3">{{lang('b_rights')}}</p>
                            
                            <b-table :data="entities">
                                <template slot-scope="props">
                                    <b-table-column field="type" :label="lang('l_e_entity_type')" centered sortable>
                                        {{ props.row.type}}
                                        <finput :name="`rights.${props.row.i}.entity`" label="" placeholder="" type="hidden" :form="state.forms.csink" :hiddenValue="props.row.type" />
                                    </b-table-column>    
                                    <b-table-column field="entity.c" :label="lang('b_create')" centered>
                                        <finput :name="`rights.${props.row.i}.c`" label="" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    </b-table-column>    
                                    <b-table-column field="entity.r" :label="lang('b_read')" centered>
                                        <finput :name="`rights.${props.row.i}.r`" label="" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    </b-table-column>    
                                    <b-table-column field="entity.u" :label="lang('b_update')" centered>
                                        <finput :name="`rights.${props.row.i}.u`" label="" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    </b-table-column>    
                                    <b-table-column field="entity.d" :label="lang('b_delete')" centered>
                                        <finput :name="`rights.${props.row.i}.d`" label="" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    </b-table-column>    
                                </template>
                            </b-table>
                            <!--<div class="columns" v-for="(entity, i) in entities">
                                <div class="column">
                                    <p class="title is-5">{{lang('b_accessing')}} {{entity.type}}</p>
                                    <finput :name="`rights.${i}.entity`" label="" placeholder="" type="hidden" :form="state.forms.csink" :hiddenValue="entity.type" />
                                    <finput :name="`rights.${i}.c`" :label="lang('b_create')" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    <finput :name="`rights.${i}.r`" :label="lang('b_read')" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    <finput :name="`rights.${i}.u`" :label="lang('b_update')" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    <finput :name="`rights.${i}.d`" :label="lang('b_delete')" placeholder="" type="checkbox" :form="state.forms.csink" />
                                </div>
                            </div>-->
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
