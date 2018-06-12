<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_mail_templates')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.mail_template"
                            :search-path="state.paths.reads.mail_template"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            search-type="mail_template"
                        >
                            <widget slot="search-result" slot-scope="props">
                            <span slot="title">{{props.info.name}} ({{props.info.id}}) 
                                    <action-button
                                    class="has-text-blue"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="update(props.info, 'mail_template')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-orange"
                                    tag="a"
                                    v-scroll-to="'#mwidget'"
                                    @action-click="use_as_model(props.info, 'mail_template')"
                                    >
                                    <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                    class="has-text-red"
                                    tag="a"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'mail_template')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
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
                <span slot="title">{{lang('l_add_or_modify_mail_template')}}</span>
                    <div slot="body">
                        <fform 
                            :name="state.sinks.creations.mail_template" 
                            :post_path="state.paths.creations.mail_template" 
                            :put_path="state.paths.creations.mail_template"
                            :get_path="state.paths.reads.mail_template"
                            :get_form="state.sinks.reads.mail_template"
                        >
                            <finput 
                                name="name" 
                                :label="lang('l_name')" 
                                :is-required="true" 
                                :placeholder="lang('l_name')" 
                                type="text" 
                                :form="state.sinks.creations.mail_template" 
                            />
                            <finput 
                                name="id" 
                                :label="lang('l_id')" 
                                :is-required="true" 
                                :placeholder="lang('l_id')" 
                                type="text" 
                                :form="state.sinks.creations.mail_template" 
                            />
                            <finput 
                                name="subject" 
                                :label="lang('l_mail_subject')" 
                                :is-required="true" 
                                :placeholder="lang('l_mail_subject')" 
                                type="text" 
                                :form="state.sinks.creations.mail_template" 
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
                                name="body" 
                                :label="lang('l_mail_message')" 
                                :is-required="true" 
                                :placeholder="lang('l_mail_message')" 
                                type="ide-editor" 
                                ide-lang="html"
                                :form="state.sinks.creations.mail_template"
                                :rows="30"
                                v-if="state.need_ide"
                            />
                            <finput 
                                name="body" 
                                :label="lang('l_mail_message')" 
                                :is-required="true" 
                                :placeholder="lang('l_mail_message')" 
                                type="html-editor" 
                                :form="state.sinks.creations.mail_template"
                                v-else
                            />
                            <widget :collapsed="true">
                                <span slot="title">
                                    {{lang('l_recipient', {}, 'other')}}
                                </span>
                                <div slot="body">
                                </div>
                            </widget>
                            <widget :collapsed="true">
                                <span slot="title">
                                    {{lang('l_trigger', {}, 'other')}}
                                </span>
                                <div slot="body">
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
module.exports = require('./MailTemplate');
</script>
