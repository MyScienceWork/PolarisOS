<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_menus')}}</span>
                    <div slot="body">
                        <div v-for="row in content" class="columns is-centered">
                            <div class="column">
                                <widget>
                                    <span slot="title">{{row.name}} ({{row.part}})
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(row, 'page')"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(row, 'page')"
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
                                <paginator class="pagination-purple" :skip="0" :number-of-items="contentLength" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_add_or_modify_menu')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.forms.csink" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.forms.rsink"
                        >
                            <finput name="name" :label="lang('l_menu_name')" :is-required="true" :placeholder="lang('l_menu_name')" type="text" :form="state.forms.csink" />
                            <fselect name="part" :label="lang('b_part_of_website')" :is-required="true" :placeholder="lang('b_part_of_website')" :form="state.forms.csink" :options="[{value: 'backoffice', label: 'Backoffice'}, {value: 'frontoffice', label: 'Frontoffice'}]"/>
                            <fvariadic-element name="elements" :form="state.forms.csink" :is-required="true" :draggable="true">
                                <template slot="variadic" slot-scope="fprops">
                                    <div class="card">
                                        <finput :name="`${fprops.fname}.${fprops.id}.name`" :label="lang('l_menu_element_name')" :is-required="true" :placeholder="lang('l_menu_element_name')" type="text" :form="state.forms.csink" />
                                        <finput :name="`${fprops.fname}.${fprops.id}.icon`" :label="lang('l_menu_icon')" :is-required="true" :placeholder="lang('l_menu_icon')" type="text" :form="state.forms.csink" />
                                        <fselect :name="`${fprops.fname}.${fprops.id}.page`" :label="lang('l_page')" :placeholder="lang('l_page')" :form="state.forms.csink" :options="[]" :is-required="true"/>
                                        <fvariadic-element :name="`${fprops.fname}.${fprops.id}.submenus`" :form="state.forms.csink" :tabs="true" :is-required="false">
                                            <template slot="variadic" slot-scope="props">
                                                <finput :name="`${props.fname}.${props.id}.name`" :label="lang('l_menu_name')" :is-required="true" :placeholder="lang('l_menu_name')" type="text" :form="state.forms.csink" />
                                                <finput :name="`${props.fname}.${props.id}.icon`" :label="lang('l_menu_icon')" :is-required="true" :placeholder="lang('l_menu_icon')" type="text" :form="state.forms.csink" />
                                                <fselect :name="`${props.fname}.${props.id}.page`" :label="lang('l_page')" :is-required="true" :placeholder="lang('l_page')" :form="state.forms.csink" :options="[]"/>
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
