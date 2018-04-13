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
                                        @action-click="remove(content, 'organization')"
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
                    <span slot="title">Add or modify a user</span>
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
                            <div class="columns" v-for="(entity, i) in entities">
                                <div class="column">
                                    <p class="title is-5">{{lang('b_accessing')}} {{entity.type}}</p>
                                    <finput :name="`rights.${i}.entity`" label="" placeholder="" type="hidden" :form="state.forms.csink" :hiddenValue="entity.type" />
                                    <finput :name="`rights.${i}.c`" :label="lang('b_create')" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    <finput :name="`rights.${i}.r`" :label="lang('b_read')" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    <finput :name="`rights.${i}.u`" :label="lang('b_update')" placeholder="" type="checkbox" :form="state.forms.csink" />
                                    <finput :name="`rights.${i}.d`" :label="lang('b_delete')" placeholder="" type="checkbox" :form="state.forms.csink" />
                                </div>
                            </div>
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
