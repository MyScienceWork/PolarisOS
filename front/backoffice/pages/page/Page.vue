<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_pages')}}</span>
                    <div slot="body">
                        <div v-for="row in content" class="columns is-centered">
                            <div class="column">
                                <widget>
                                    <span slot="title">{{row.key}} ({{row.lang}})
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
                    <span slot="title">{{lang('l_add_or_modify_page')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.forms.csink" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.forms.rsink"
                        >
                            <fselect name="template" :label="lang('l_template')" :is-required="true" 
                            :placeholder="lang('l_template')" :form="state.forms.csink" :options="[]" />
                            <widget>
                                <span slot="title">{{lang('l_header')}}</span>
                                <div slot="body">
                                    <finput name="header.has_header" :label="lang('l_has_header')" :is-required="true" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    <grid-layout
                                        :layout="state.layout"
                                        :col-num="12"
                                        :row-height="30"
                                        :is-draggable="true"
                                        :is-resizable="true"
                                        :is-mirrored="false"
                                        :vertical-compact="true"
                                        :margin="[10, 10]"
                                        :use-css-transforms="true"
                                    >
                                        <grid-item 
                                            v-for="item in state.layout"
                                            :x="item.x"
                                            :y="item.y"
                                            :w="item.w"
                                            :h="item.h"
                                            :i="item.i"
                                            class="card"
                                        >
                                            <div class="columns is-centered">
                                                <div class="column">
                                                        <fselect name="template" :label="lang('l_template')" :is-required="true" 
                                                        :placeholder="lang('l_template')" :form="state.forms.csink" :options="[]" />
                                                </div>
                                            </div>
                                        </grid-item>
                                    </grid-layout>
                                </div>
                            </widget>
                            <widget>
                                <span slot="title">{{lang('l_menu')}}</span>
                                <div slot="body">
                                    <finput name="has_menu" :label="lang('l_has_menu')" :is-required="true" placeholder="" type="checkbox" :form="state.forms.csink" />
                                </div>
                            </widget>
                            <widget>
                                <span slot="title">{{lang('l_main')}}</span>
                                <div slot="body">
                                </div>
                            </widget>
                            <widget>
                                <span slot="title">{{lang('l_footer')}}</span>
                                <div slot="body">
                                    <finput name="footer.has_footer" :label="lang('l_has_footer')" :is-required="true" placeholder="" type="checkbox" :form="state.forms.csink" />
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
module.exports = require('./Page');
</script>
