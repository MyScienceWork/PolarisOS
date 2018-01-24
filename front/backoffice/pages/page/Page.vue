<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_pages')}}</span>
                    <div slot="body">
                        <div v-for="row in read_content_page" class="columns is-centered">
                            <div v-for="info in row" class="column">
                                <widget>
                                    <span slot="title">{{info.name}} ({{info.route}})
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(info, 'page')"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(info, 'page')"
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
                                <paginator class="pagination-purple" :skip="0" :number-of-items="length_page" :items-per-page="state.itemsPerPage" />
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
                            :name="state.sinks.creations.page" 
                            :post_path="state.paths.creations.page" 
                            :put_path="state.paths.creations.page" 
                            :get_path="state.paths.reads.page" 
                            :get_form="state.sinks.reads.page"
                        >
                            <fselect name="template" :label="lang('l_template')" :is-required="true" 
                            :placeholder="lang('l_template')" :form="state.sinks.creations.page" :options="[]" />
                            <widget>
                                <span slot="title">{{lang('l_header')}}</span>
                                <div slot="body">
                                    <finput name="header.has_header" :label="lang('l_has_header')" :is-required="true" placeholder="" type="checkbox" :form="state.sinks.creations.page" />
                                    <fgrid :widgets="content_widget"></fgrid>
                                </div>
                            </widget>
                            <widget>
                                <span slot="title">{{lang('l_menu')}}</span>
                                <div slot="body">
                                    <finput name="has_menu" :label="lang('l_has_menu')" :is-required="true" placeholder="" type="checkbox" :form="state.sinks.creations.page" />
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
                                    <finput name="footer.has_footer" :label="lang('l_has_footer')" :is-required="true" placeholder="" type="checkbox" :form="state.sinks.creations.page" />
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
