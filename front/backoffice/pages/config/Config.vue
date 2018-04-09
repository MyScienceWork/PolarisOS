<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_global_configuration')}}</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                            <div class="column" v-for="content in row">
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
                                        :confirmation="lang('b_sure')"
                                        :two-steps="true"
                                        @action-click="remove(content, 'config')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{content.environment}} 
                                    </span>
                                    <div slot="body">

                                    </div>
                                </widget>
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_add_or_modify_global_configuration')}}</span>
                    <div slot="body">
                        <fform 
                            :name="state.forms.csink" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.forms.rsink"
                        >
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_general_setting', {}, 'other')}}</span>
                                <div slot="body">
                                    <fselect 
                                        name="environment" :label="lang('b_environment')" 
                                        :is-required="true" 
                                        :form="state.forms.csink" 
                                        :options="state.environments" 
                                    />
                                    <fselect 
                                        name="langs" :label="lang('b_lang',{}, 'other')" 
                                        :is-required="true" 
                                        :form="state.forms.csink" 
                                        :multi="true"
                                        :options="state.langs" 
                                    />
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
                                        :form="state.forms.csink" 
                                        type="text"
                                    />
                                    <finput
                                        name="upload.allowRemoveFiles" 
                                        :label="lang('b_config_allowRemoveFiles')" 
                                        :form="state.forms.csink" 
                                        type="checkbox"
                                    />
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('l_email_setting', {}, 'other')}}</span>
                                <div slot="body">
                                    <finput
                                        name="mail.smtp.host" 
                                        :label="lang('l_config_smtp_host')" 
                                        :placeholder="lang('l_config_smtp_host')" 
                                        :is-required="true" 
                                        :form="state.forms.csink" 
                                        type="text"
                                    />
                                    <finput
                                        name="mail.smtp.port" 
                                        :label="lang('l_config_smtp_port')" 
                                        :placeholder="lang('l_config_smtp_port')" 
                                        :is-required="true" 
                                        :form="state.forms.csink" 
                                        type="number"
                                    />
                                    <finput
                                        name="mail.smtp.secure" 
                                        :label="lang('l_config_smtp_secure')" 
                                        :form="state.forms.csink" 
                                        type="checkbox"
                                    />
                                    <finput
                                        name="mail.smtp.auth.user" 
                                        :label="lang('l_config_smtp_auth_user')" 
                                        :placeholder="lang('l_config_smtp_auth_user')" 
                                        :is-required="true" 
                                        :form="state.forms.csink" 
                                        type="text"
                                    />
                                    <finput
                                        name="mail.smtp.auth.pass" 
                                        :label="lang('l_config_smtp_auth_password')" 
                                        :placeholder="lang('l_config_smtp_auth_password')" 
                                        :is-required="true" 
                                        :form="state.forms.csink" 
                                        type="password"
                                    />
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
