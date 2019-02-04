<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_list_user_items')}}</span>
                    <div slot="body" v-intro="lang('l_backoffice_read_zone')">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.user"
                            :search-path="state.paths.reads.user"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="user"
                            :matrix-row-size="2"
                            :change-with-create-success="true"
                            :form-create-success="state.sinks.creations.user"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(props.info, 'user')"
                                    v-intro="lang('l_backoffice_edit_button_help')"
                                    v-intro-if="props.row_id === 0 && props.id === 0"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(props.info, 'user')"
                                    v-intro="lang('l_backoffice_model_button_help')"
                                    v-intro-if="props.row_id === 0 && props.id === 0"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    v-intro="lang('l_backoffice_remove_button_help')"
                                    v-intro-if="props.row_id === 0 && props.id === 0"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'user')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
                                    {{props.info.firstname}} {{props.info.lastname}}
                                </span>
                                <div slot="body">
                                    <h4 class="title is-4">{{props.info.firstname}} {{props.info.lastname}}</h4>
                                </div>
                            </widget>
                        </fsearching>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget 
                    id="mwidget"
                    v-intro="lang('l_backoffice_modify_zone')"
                >
                <span slot="title">{{lang('l_add_modify_user')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.user" 
                            :post_path="state.paths.creations.user" 
                            :put_path="state.paths.creations.user"
                            :get_path="state.paths.reads.user"
                            :get_form="state.sinks.reads.user"
                        >
                            <finput name="firstname" :label="lang('b_firstname')" :is-required="true" :placeholder="lang('b_firstname')" type="text" :form="state.sinks.creations.user" />
                            <finput name="lastname" :label="lang('b_lastname')" :is-required="true" :placeholder="lang('b_lastname')" type="text" :form="state.sinks.creations.user" />
                            <fselect
                                name="preferred_language" 
                                :label="lang('l_preferred_language')" 
                                :is-required="true" 
                                :placeholder="lang('l_preferred_language')" 
                                :form="state.sinks.creations.user"
                                :options="langs"
                            />
                            <finput :help="lang('l_backoffice_uid_help')" name="uid" :label="lang('l_uid')" :is-required="true" :placeholder="lang('l_uid')" type="text" :form="state.sinks.creations.user" />
                            <finput :help="lang('l_backoffice_iid_help')" name="iid" :label="lang('l_iid')" :placeholder="lang('l_iid')" type="text" :form="state.sinks.creations.user" />
                            <finput 
                                name="sso" :label="lang('b_is_sso')" 
                                type="checkbox" :form="state.sinks.creations.user"
                                :help="lang('l_backoffice_sso_help')"
                            />
                            <finput 
                                name="ldap" :label="lang('b_is_ldap')" 
                                type="checkbox" :form="state.sinks.creations.user" 
                                :help="lang('l_backoffice_ldap_help')"
                            />
                            <fvariadic-element name="emails" :form="state.sinks.creations.user" :tabs="true">
                                <template slot="variadic" slot-scope="props">
                                    <finput :name="`${props.fname}.${props.order}.email`" :label="lang('b_email')" :is-required="true" :placeholder="lang('b_email')" type="email" :form="state.sinks.creations.user" />
                                    <finput :name="`${props.fname}.${props.order}.master`" :label="lang('b_principal_email')" placeholder="" type="checkbox" :form="state.sinks.creations.user" />
                                </template>
                            </fvariadic-element>
                            <finput name="hpassword" :label="lang('b_password')" :is-required="true" :placeholder="lang('b_password')" type="password-sha1" :form="state.sinks.creations.user" />
                            <finput name="retype_hpassword" :label="lang('b_retype_password')" :is-required="true" :placeholder="lang('b_retype_password')" type="password-sha1" :form="state.sinks.creations.user" />
                            <finput 
                                name="public_profile" :label="lang('b_is_profile_public')" 
                                type="checkbox" :form="state.sinks.creations.user" 
                            />
                            <fselect 
                                name="roles" 
                                :label="lang('b_role', {}, 'other')" 
                                :is-required="true" 
                                :options="roles" 
                                :form="state.sinks.creations.user"
                                fieldValue="_id"
                                fieldLabel="name"
                                :multi="true"
                                :translatable="true"
                                :help="lang('l_backoffice_role_help')"
                            />
                            <fselect 
                                name="author" 
                                :label="lang('l_author')" 
                                :is-required="true" 
                                :options="[]" 
                                :form="state.sinks.creations.user"
                                fieldValue="_id"
                                fieldLabel="fullname"
                                :ajax="true"
                                ajax-url="/api/public/v2/authors/search"
                                ajax-value-url="/api/public/v2/authors/search"
                                :help="lang('l_backoffice_author_help')"
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
