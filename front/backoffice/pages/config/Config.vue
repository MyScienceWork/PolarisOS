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
