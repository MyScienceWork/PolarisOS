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
                                        {{content.firstname}} {{content.lastname}} 
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
                            <finput name="firstname" :label="lang('b_firstname')" :is-required="true" :placeholder="lang('b_firstname')" type="text" :form="state.forms.csink" />
                            <finput name="lastname" :label="lang('b_lastname')" :is-required="true" :placeholder="lang('b_lastname')" type="text" :form="state.forms.csink" />
                            <fvariadic-element name="emails" :form="state.forms.csink" :tabs="true">
                                <template slot="variadic" slot-scope="props">
                                    <finput :name="`${props.fname}.${props.id}.email`" :label="lang('b_email')" :is-required="true" :placeholder="lang('b_email')" type="email" :form="state.forms.csink" />
                                    <finput :name="`${props.fname}.${props.id}.master`" :label="lang('b_principal_email')" placeholder="" type="checkbox" :form="state.forms.csink" />
                                </template>
                            </fvariadic-element>
                            <finput name="password" :label="lang('b_password')" :is-required="true" :placeholder="lang('b_password')" type="password-sha1" :form="state.forms.csink" />
                            <fselect 
                                name="roles" 
                                :label="lang('b_role', {}, 'other')" 
                                :is-required="true" 
                                :options="roles" 
                                :form="state.forms.csink"
                                fieldValue="_id"
                                fieldLabel="name"
                                :multi="true"
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
module.exports = require('./User');
</script>
