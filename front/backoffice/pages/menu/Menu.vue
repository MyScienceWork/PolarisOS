<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_list_of_menus')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.menu"
                            :search-path="state.paths.reads.menu"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="menu"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(props.info, 'menu')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(props.info, 'menu')"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'menu')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
                                    {{props.info.name}}
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
                    <span slot="title">{{lang('l_add_or_modify_menu')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.menu" 
                            :post_path="state.paths.creations.menu" 
                            :put_path="state.paths.creations.menu" 
                            :get_path="state.paths.reads.menu" 
                            :get_form="state.sinks.reads.menu"
                        >
                            <finput name="name" :label="lang('l_menu_name')" :is-required="true" :placeholder="lang('l_menu_name')" type="text" :form="state.sinks.creations.menu" />
                            <fselect name="part" :label="lang('b_part_of_website')" :is-required="true" :placeholder="lang('b_part_of_website')" :form="state.sinks.creations.menu" :options="[{value: 'backoffice', label: 'Backoffice'}, {value: 'frontoffice', label: 'Frontoffice'}]"/>
                            <fvariadic-element name="elements" :form="state.sinks.creations.menu" :is-required="true" :draggable="true">
                                <template slot="variadic" slot-scope="fprops">
                                    <div class="card">
                                        <finput 
                                            :name="`${fprops.fname}.${fprops.order}.name`" 
                                            :label="lang('l_menu_element_name')" 
                                            :is-required="true" 
                                            :placeholder="lang('l_menu_element_name')" 
                                            type="text" 
                                            :form="state.sinks.creations.menu"
                                            :key="`${fprops.fname}.${fprops.id}.name`"
                                        />
                                        <finput 
                                            :name="`${fprops.fname}.${fprops.order}.icon`" 
                                            :key="`${fprops.fname}.${fprops.id}.icon`" 
                                            :label="lang('l_menu_icon')" 
                                            :is-required="true" 
                                            :placeholder="lang('l_menu_icon')" type="text" 
                                            :form="state.sinks.creations.menu"
                                        />
                                        <fselect 
                                            :name="`${fprops.fname}.${fprops.order}.page`" 
                                            :key="`${fprops.fname}.${fprops.id}.page`" 
                                            :label="lang('l_page')" 
                                            :placeholder="lang('l_page')" 
                                            :form="state.sinks.creations.menu" 
                                            :options="content_page" 
                                            :is-required="true"
                                            fieldLabel="route" 
                                            fieldValue="_id"
                                        />
                                        <finput 
                                            :name="`${fprops.fname}.${fprops.order}.query`" 
                                            :key="`${fprops.fname}.${fprops.id}.query`" 
                                            :label="lang('l_menu_query')" 
                                            :is-required="true" 
                                            :placeholder="lang('l_menu_query')" type="text" 
                                            :form="state.sinks.creations.menu"
                                        />
                                        <fvariadic-element 
                                            :name="`${fprops.fname}.${fprops.order}.submenus`" 
                                            :key="`${fprops.fname}.${fprops.id}.submenus`" 
                                            :form="state.sinks.creations.menu" 
                                            :draggable="true" 
                                            :is-required="false"
                                        >
                                            <template slot="variadic" slot-scope="props">
                                                <finput 
                                                    :name="`${props.fname}.${props.order}.name`" 
                                                    :key="`${props.fname}.${props.id}.name`" 
                                                    :label="lang('l_menu_name')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('l_menu_name')" 
                                                    type="text" 
                                                    :form="state.sinks.creations.menu"
                                                />
                                                <finput 
                                                    :name="`${props.fname}.${props.order}.icon`" 
                                                    :key="`${props.fname}.${props.id}.icon`" 
                                                    :label="lang('l_menu_icon')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('l_menu_icon')" 
                                                    type="text" 
                                                    :form="state.sinks.creations.menu" 
                                                />
                                                <fselect 
                                                    :name="`${props.fname}.${props.order}.page`" 
                                                    :key="`${props.fname}.${props.id}.page`" 
                                                    :label="lang('l_page')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('l_page')" 
                                                    fieldLabel="route" 
                                                    fieldValue="_id"
                                                    :form="state.sinks.creations.menu" 
                                                    :options="content_page"
                                                />
                                                <finput 
                                                    :name="`${props.fname}.${props.order}.query`" 
                                                    :key="`${props.fname}.${props.id}.query`" 
                                                    :label="lang('l_menu_query')" 
                                                    :is-required="true" 
                                                    :placeholder="lang('l_menu_query')" type="text" 
                                                    :form="state.sinks.creations.menu"
                                                />
                                            </template>
                                        </fvariadic-element>
                                    </div>
                                </template>
                            </fvariadic-element>
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Menu');
</script>
