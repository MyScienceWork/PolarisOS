<template>
    <div> 
        <h4 class="title is-4 has-no-bottom-margin">{{lang('f_user_general_settings')}}</h4>
        <hr class="hr-section "/>
        <dynamic-form :form="user_forms('user_front_general_settings')" :cform="state.sinks.creations.user"/>

        <h4 class="title is-4 has-medium-top-margin has-no-bottom-margin">{{lang('f_user_affiliations')}}</h4>
        <hr class="hr-section" />

        <dynamic-form v-if="author" :form="user_forms('user_front_affiliations')" :cform="state.sinks.creations.user"/>
        <div v-else>
            <p>{{lang('f_no_author_connected')}}</p>
            <div class="field is-grouped">
                <div class="control">
                    <button 
                        type="submit" @click.prevent="send_author_request"
                        class="button button-background-blue"
                        >{{lang('f_click_here_to_send_author_request')}}</button>
                </div>
            </div>
            <article class="message is-success">
            <div class="message-body">
                {{lang('f_author_request_successfully_sent')}}
            </div>
            </article>
            <article class="message is-danger">
            <div class="message-body">
                {{lang('f_author_request_failed')}}
            </div>
            </article>
        </div>
        <h4 class="title is-4 has-medium-top-margin has-no-bottom-margin">{{lang('f_user_external_ids')}}</h4>
        <hr class="hr-section" />
        <dynamic-form :form="user_forms('user_front_external_ids')" :cform="state.sinks.creations.user"/>
    </div>
</template>

<script>
    module.exports = require('./Account');
</script>
