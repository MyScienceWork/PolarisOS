<template>
    <div class="hero-body">
        <div class="container">
            <article class="message is-centered">
                <div class="message-header has-text-centered">
                    <p>{{lang('l_new_subject')}}</p>
                </div>
                <div class="message-body">
                    <fform
                        :name="state.sinks.creations.forum"
                        :post_path="state.paths.creations.forum"
                        :put_path="state.paths.creations.forum"
                        :get_path="state.paths.reads.forum"
                        :get_form="state.sinks.reads.forum"
                    >
                        <finput
                            name="title"
                            :label="lang('b_discussion_title')"
                            :is-required="true"
                            :placeholder="lang('b_discussion_title')"
                            type="text"
                            :form="state.sinks.creations.forum"
                        />
                        <br/>
                        <div class="columns">
                            <div class="column">
                                <fselect
                                    name="discipline"
                                    :label="lang('b_discipline_name')"
                                    :is-required="true"
                                    :options="discipline || []"
                                    fielLabel="name"
                                    fieldValue="_id"
                                    :multi="true"
                                    :form="state.sinks.creations.forum"
                                    :ajax="true"
                                    :ajax-url="`/api/public/v2/disciplines/search`"
                                    :ajax-value-url="state.paths.reads.discipline"
                                />
                            </div>
                            <div class="column">
                                <fselect
                                    name="visibility"
                                    :label="lang('b_visibility_discussion')"
                                    :is-required="true"
                                    :options="[{value: 'polaris_member_restricted', label: 'Restrained to Polaris member'},
                                        {value: 'participant_restricted', label: 'Restrained to participant'}]"
                                    :form="state.sinks.creations.forum"
                                />
                            </div>
                        </div>
                        <br/><br/>
                        <finput
                            name="descitption"
                            type="html-editor"
                            :placeholder="lang('l_post_description')"
                            :label="lang('l_post_description')"
                            :form="state.sinks.creations.forum"
                        />
                        <dynamic-form :form="forum_forms" :cform="state.sinks.creations.forum"/>
                        <!-- <file-deposit-widget
                            :upload-form="uploadForm"
                            :sink="state.sinks.creations.forum"
                            @analyze-from-file="analyze_from_file"
                            :analyze-state="state.analyze_state"
                        /> -->
                    </fform>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
module.exports = require('./ForumNewSubject');
</script>
