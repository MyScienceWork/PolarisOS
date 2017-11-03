<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('b_list_datasources')}}</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                            <div v-for="content in row" class="column">
                                <widget>
                                    <span slot="title">
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(content)"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        :confirmation="lang('b_are_sure')"
                                        :two-steps="true"
                                        @action-click="remove(content, 'datatemplate')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        <router-link
                                        class="button is-small button-background-green"
                                        :to="`/admin/datasource/${content.name}`"
                                        >
                                        <i class="fa fa-eye"></i>
                                        </router-link>
                                        {{content.label}} ({{content.name}}) 
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
                <span slot="title">{{lang('b_add_datasource')}}</span>
                    <div slot="body">
                        <fform 
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.rform"
                            >
                            <finput name="name" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.cform" />
                            <finput name="label" :label="lang('b_label')" :is-required="true" :placeholder="lang('b_label')" type="text" :form="state.cform" />
                            <finput name="type" :label="lang('b_type')" :is-required="true" :placeholder="lang('b_type')" type="text" :form="state.cform" />
                            <fselect 
                                name="form" 
                                :label="lang('b_form')" 
                                :is-required="true" 
                                :options="forms"
                                :fieldLabel="label"
                                :fieldValue="name"
                                :form="state.cform" 
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
module.exports = require('./Datasource');
</script>
