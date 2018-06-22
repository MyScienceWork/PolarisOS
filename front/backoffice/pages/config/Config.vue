<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_global_configuration')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.config"
                            :search-path="state.paths.reads.config"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="config"
                            :change-with-create-success="true"
                            :form-create-success="state.sinks.creations.config"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(props.info, 'config')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(props.info, 'config')"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'config')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
                                    {{props.info.environment}} 
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
                <span slot="title">{{lang('l_add_or_modify_global_configuration')}}</span>
                    <div slot="body">
                        <fform 
                            :name="state.sinks.creations.config" 
                            :post_path="state.paths.creations.config" 
                            :put_path="state.paths.creations.config"
                            :get_path="state.paths.reads.config"
                            :get_form="state.sinks.reads.config"
                        >
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_general_setting', {}, 'other')}}</span>
                                <div slot="body">
                                    <finput
                                        name="base_url" 
                                        :label="lang('l_pos_base_url')" 
                                        :placeholder="lang('l_pos_base_url')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        type="text"
                                    />
                                    <fselect 
                                        name="environment" :label="lang('b_environment')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        :options="state.environments" 
                                    />
                                    <fselect 
                                        name="langs" :label="lang('b_lang',{}, 'other')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        :multi="true"
                                        :options="state.langs" 
                                    />
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_ui_setting', {}, 'other')}}</span>
                                <div slot="body">
                                    <finput
                                        name="gui.logo" 
                                        :label="lang('l_ui_logo')" 
                                        :placeholder="lang('l_ui_logo')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        type="text"
                                    />
                                    <finput
                                        name="gui.css_template" 
                                        :label="lang('l_ui_css_template')" 
                                        :placeholder="lang('l_ui_css_template')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        type="text"
                                    />
                                    <div class="field">
                                        <div class="checkbox">
                                            <label for="dont-care">
                                                <input
                                                type="checkbox"
                                                name="dont-care"
                                                v-model="state.need_ide"
                                                />
                                                {{lang('l_need_ide')}} 
                                            </label>
                                        </div>
                                    </div>
                                    <finput 
                                    name="gui.cover_page" 
                                    :label="lang('l_cover_page')" 
                                    :is-required="true" 
                                    :placeholder="lang('l_cover_page')" 
                                    type="ide-editor" 
                                    ide-lang="html"
                                    :form="state.sinks.creations.config"
                                    :rows="30"
                                    v-if="state.need_ide"
                                    />
                                    <finput 
                                    name="gui.cover_page" 
                                    :label="lang('l_cover_page')" 
                                    :is-required="true" 
                                    :placeholder="lang('l_cover_page')" 
                                    type="html-editor" 
                                    :form="state.sinks.creations.config"
                                    v-else
                                    />
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_api_setting', {}, 'other')}}</span>
                                <div slot="body">
                                    <widget :collapsed="true">
                                        <span slot="title">HAL</span>
                                        <div slot="body">
                                            <finput
                                                name="api.hal.url" 
                                                :label="lang('l_hal_url')" 
                                                :placeholder="lang('l_hal_url')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="text"
                                            />
                                            <finput
                                                name="api.hal.login" 
                                                :label="lang('l_hal_login')" 
                                                :placeholder="lang('l_hal_login')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="text"
                                            />
                                            <finput
                                                name="api.hal.password" 
                                                :label="lang('l_hal_password')" 
                                                :placeholder="lang('l_hal_password')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="password"
                                            />
                                        </div>
                                    </widget>
                                    <widget :collapsed="true">
                                        <span slot="title">Handle.net</span>
                                        <div slot="body">
                                            <finput
                                                name="api.handle.enabled" 
                                                :label="lang('l_handle_enabled')" 
                                                :form="state.sinks.creations.config" 
                                                type="checkbox"
                                            />
                                            <finput
                                                name="api.handle.ip" 
                                                :label="lang('l_handle_ip')" 
                                                :placeholder="lang('l_handle_ip')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="text"
                                            />
                                            <finput
                                                name="api.handle.port" 
                                                :label="lang('l_handle_port')" 
                                                :placeholder="lang('l_handle_port')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="number"
                                            />
                                            <finput
                                                name="api.handle.prefix" 
                                                :label="lang('l_handle_prefix')" 
                                                :placeholder="lang('l_handle_prefix')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="text"
                                            />
                                            <finput
                                                name="api.handle.admin_handle" 
                                                :label="lang('l_handle_admin_login')" 
                                                :placeholder="lang('l_handle_admin_login')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="text"
                                            />
                                            <finput
                                                name="api.handle.admin_password" 
                                                :label="lang('l_handle_admin_password')" 
                                                :placeholder="lang('l_handle_admin_password')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="password"
                                            />
                                        </div>
                                    </widget>
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_upload_setting', {}, 'other')}}</span>
                                <div slot="body">
                                    <finput
                                        name="upload.maxFileSizeInMB" 
                                        :label="lang('b_config_maxFileSizeInMB')" 
                                        :placeholder="lang('b_config_maxFileSizeInMB')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        type="text"
                                    />
                                    <finput
                                        name="upload.allowRemoveFiles" 
                                        :label="lang('b_config_allowRemoveFiles')" 
                                        :form="state.sinks.creations.config" 
                                        type="checkbox"
                                    />
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_email_setting', {}, 'other')}}</span>
                                <div slot="body">
                                    <finput
                                        name="mail.default_sender" 
                                        :label="lang('l_config_mail_default_sender')" 
                                        :placeholder="lang('l_config_mail_default_sender')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        type="text"
                                    />
                                    <finput
                                        name="mail.smtp.host" 
                                        :label="lang('l_config_smtp_host')" 
                                        :placeholder="lang('l_config_smtp_host')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        type="text"
                                    />
                                    <finput
                                        name="mail.smtp.port" 
                                        :label="lang('l_config_smtp_port')" 
                                        :placeholder="lang('l_config_smtp_port')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        type="number"
                                    />
                                    <finput
                                        name="mail.smtp.secure" 
                                        :label="lang('l_config_smtp_secure')" 
                                        :form="state.sinks.creations.config" 
                                        type="checkbox"
                                    />
                                    <finput
                                        name="mail.smtp.auth.user" 
                                        :label="lang('l_config_smtp_auth_user')" 
                                        :placeholder="lang('l_config_smtp_auth_user')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        type="text"
                                    />
                                    <finput
                                        name="mail.smtp.auth.pass" 
                                        :label="lang('l_config_smtp_auth_password')" 
                                        :placeholder="lang('l_config_smtp_auth_password')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        type="password"
                                    />
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_auth_setting', {}, 'other')}}</span>
                                <div slot="body">
                                    <fselect 
                                        name="authentication.default_assigned_role" :label="lang('l_default_assigned_role')" 
                                        :is-required="true" 
                                        :form="state.sinks.creations.config" 
                                        :options="roles"
                                        field-label="name"
                                        field-value="_id"
                                    />
                                    <finput
                                        name="authentication.default_cas_sso" 
                                        :label="lang('l_config_use_cas_sso_by_default')" 
                                        :form="state.sinks.creations.config" 
                                        type="checkbox"
                                    />
                                    <widget :collapsed="true">
                                        <span slot="title">{{lang('l_cas_sso')}}</span>
                                        <div slot="body">
                                            <finput
                                                name="authentication.use_cas_sso" 
                                                :label="lang('l_config_use_cas_sso')" 
                                                :form="state.sinks.creations.config" 
                                                type="checkbox"
                                            />
                                            <finput
                                                name="authentication.cas_sso.base" 
                                                :label="lang('l_config_cas_base_url')" 
                                                :placeholder="lang('l_config_cas_base_url')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="text"
                                            />
                                            <finput
                                                name="authentication.cas_sso.service" 
                                                :label="lang('l_config_cas_service_url')" 
                                                :placeholder="lang('l_config_cas_service_url')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="text"
                                            />
                                        </div>
                                    </widget>
                                    <widget :collapsed="true">
                                        <span slot="title">{{lang('l_ldap')}}</span>
                                        <div slot="body">
                                            <finput
                                                name="authentication.use_ldap" 
                                                :label="lang('l_config_use_ldap')" 
                                                :form="state.sinks.creations.config" 
                                                type="checkbox"
                                            />
                                            <finput
                                                name="authentication.ldap.base" 
                                                :label="lang('l_config_ldap_base_url')" 
                                                :placeholder="lang('l_config_ldap_base_url')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="text"
                                            />
                                            <finput
                                                name="authentication.ldap.dns" 
                                                :label="lang('l_config_ldap_dn')" 
                                                :placeholder="lang('l_config_ldap_dn')" 
                                                :is-required="true" 
                                                :form="state.sinks.creations.config" 
                                                type="text"
                                            />
                                            <fvariadic-element name="authentication.ldap.attributes" :form="state.sinks.creations.config" :tabs="true">
                                                <template slot="variadic" slot-scope="props">
                                                    <finput 
                                                        :name="`${props.fname}.${props.order}.key`" 
                                                        :label="lang('l_ldap_attribute_name')" 
                                                        :is-required="true" 
                                                        :placeholder="lang('l_ldap_attribute_name')" 
                                                        type="text" 
                                                        :form="state.sinks.creations.config" 
                                                    />
                                                    <finput 
                                                        :name="`${props.fname}.${props.order}.value`" 
                                                        :label="lang('l_pos_user_field')" 
                                                        :is-required="true" 
                                                        :placeholder="lang('l_pos_user_field')" 
                                                        type="text" 
                                                        :form="state.sinks.creations.config" 
                                                    />
                                                </template>
                                            </fvariadic-element>
                                        </div>
                                    </widget>
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
module.exports = require('./Config');
</script>
