<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">List of users</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                            <div v-for="content in row" class="column">
                                <widget>
                                    <span slot="title">
                                        <router-link
                                        class="button is-small button-background-green"
                                        :to="`/admin/entity/${content.type}`"
                                        >
                                        <i class="fa fa-eye"></i>
                                        </router-link>
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(content)"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(content, 'entity')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{content.type}} 
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
                    <span slot="title"></span>
                    <div slot="body">
                        <fform
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.rform"
                        >
                        <finput name="type" :label="lang('b_entity_name')" :is-required="true" :placeholder="lang('b_entity_name')" type="text" :form="state.cform" />
                        <fselect
                            name="form" 
                            :label="lang('b_form_name')" 
                            :is-required="true"
                            :options="forms || []"
                            fieldLabel="name"
                            fieldValue="_id"
                            :form="state.cform" 
                        />
                        <fselect
                            name="pipeline" 
                            :label="lang('b_pipeline_name')" 
                            :is-required="true"
                            :options="pipelines || []"
                            fieldLabel="name"
                            fieldValue="_id"
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
module.exports = require('./Entity');
</script>
