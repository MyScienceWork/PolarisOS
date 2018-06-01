<template>
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-12 has-text-centered">
                    <h4 class="title is-4"> USPC Forum </h4>
                </div>
            </div>
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
                        <fselect
                            name="author"
                            :label="lang('b_auhtor')"
                            :is-required="true"
                            :options="[]"
                            fieldLabel="fullName"
                            fieldValue="_id"
                            :form="state.sinks.creations.forum"
                            :ajax="true"
                            :ajax-url="`/api/public/v2/authors/search`"
                            :ajax-value-url="`/api/public/v2/authors/search`"
                        />
                        <div class="columns">
                            <div class="column">
                                <fselect
                                    name="disciplines"
                                    :label="lang('b_discipline_name')"
                                    :is-required="true"
                                    :options="[]"
                                    fielLabel="label"
                                    fieldValue="value"
                                    :multi="true"
                                    :form="state.sinks.creations.forum"
                                    :ajax="true"
                                    :ajax-url="`/api/public/v2/disciplines/search`"
                                    :ajax-value-url="state.paths.reads.discipline"
                                />
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-narrow">
                                <input type="checkbox" id="visible" v-model="state.restraineVisibility">
                                <label for="visible"> Restraine Visibility</label>
                            </div>
                        </div>
                        <div v-if="state.restraineVisibility" class="columns">
                            <div class="column">
                                <fselect
                                    name="usersAuthorized"
                                    :label="lang('b_auhorized_users')"
                                    :is-required="false"
                                    :options="[]"
                                    fieldLabel="lastname"
                                    fieldValue="_id"
                                    :multi="true"
                                    :form="state.sinks.creations.forum"
                                    :ajax="true"
                                    :ajax-url="`/api/public/v2/users/search`"
                                    :ajax-value-url="`/api/public/v2/users/search`"
                                />
                            </div>
                        </div>
                        <br/>
                        <finput
                            name="description"
                            type="textarea"
                            :placeholder="lang('l_post_description')"
                            :label="lang('l_post_description')"
                            :form="state.sinks.creations.forum"
                        />
                        <dynamic-form :form="forum_forms" :cform="state.sinks.creations.forum"/>
                    </fform>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
module.exports = require('./ForumNewSubject');
</script>
