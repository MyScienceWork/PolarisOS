<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_list_user_items')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.user"
                            :search-path="state.paths.reads.user"
                            :search-query="search_query"
                            :use-default-query="true"
                            search-type="user"
                            :matrix-row-size="2"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">{{props.info.firstname}} {{props.info.lastname}}
                                    <action-button
                                    class="button is-small button-background-blue"
                                    @action-click="update(props.info, 'user')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="button is-small button-background-red"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'user')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
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
                <widget>
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
                            <fvariadic-element name="emails" :form="state.sinks.creations.user" :tabs="true">
                                <template slot="variadic" slot-scope="props">
                                    <finput :name="`${props.fname}.${props.id}.email`" :label="lang('b_email')" :is-required="true" :placeholder="lang('b_email')" type="email" :form="state.sinks.creations.user" />
                                    <finput :name="`${props.fname}.${props.id}.master`" :label="lang('b_principal_email')" placeholder="" type="checkbox" :form="state.sinks.creations.user" />
                                </template>
                            </fvariadic-element>
                            <finput name="password" :label="lang('b_password')" :is-required="true" :placeholder="lang('b_password')" type="password-sha1" :form="state.sinks.creations.user" />
                            <fselect 
                                name="roles" 
                                :label="lang('b_role', {}, 'other')" 
                                :is-required="true" 
                                :options="roles" 
                                :form="state.sinks.creations.user"
                                fieldValue="_id"
                                fieldLabel="name"
                                :multi="true"
                            />
                            <fselect 
                                name="author" 
                                :label="lang('l_author')" 
                                :is-required="true" 
                                :options="authors" 
                                :form="state.sinks.creations.user"
                                fieldValue="_id"
                                fieldLabel="fullname"
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
