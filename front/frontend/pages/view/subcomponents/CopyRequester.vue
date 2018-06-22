<template>
    <b-modal :active.sync="showModal">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{lang('l_request_copy_modal')}}</p>
                <button class="delete" aria-label="close" @click.prevent="closeModal"></button>
            </header>
            <div class="modal-card-body">
                <div class="columns is-centered">
                    <finput 
                        :form="state.sinks.creations.copy_request"
                        name="item"
                        type="hidden"
                        :hidden-value="item"
                        label="nope"
                    />
                    <div class="column" v-if="request_state === 'success_create'">
                        <p v-html="lang('l_success_copy_request')"></p>
                    </div>
                    <div class="column" v-else-if="request_state === 'error_generic'">
                        <p v-html="lang('l_error_copy_request')"></p>
                    </div>
                    <div class="column" v-else-if="loggedIn">
                        <p v-html="lang('l_are_you_sure_request_copy')"></p>
                        <finput 
                            :form="state.sinks.creations.copy_request"
                            name="firstname"
                            type="hidden"
                            :hidden-value="this.user.firstname"
                            :label="lang('l_firstname')"
                        />
                        <finput 
                            :form="state.sinks.creations.copy_request"
                            name="lastname"
                            type="hidden"
                            :hidden-value="this.user.lastname"
                            :label="lang('l_lastname')"
                        />
                        <finput 
                            :form="state.sinks.creations.copy_request"
                            name="email"
                            type="hidden"
                            :hidden-value="(this.user.emails.find(e => e.is_master) || this.user.emails[0]).email"
                            :label="lang('l_email')"
                        />
                    </div>
                    <div class="column" v-else>
                        <p v-html="lang('l_fill_form')"></p>
                        <finput 
                            :form="state.sinks.creations.copy_request"
                            name="firstname"
                            type="text"
                            :label="lang('l_firstname')"
                            :placeholder="lang('l_firstname')"
                        />
                        <finput 
                            :form="state.sinks.creations.copy_request"
                            name="lastname"
                            type="text"
                            :label="lang('l_lastname')"
                            :placeholder="lang('l_lastname')"
                        />
                        <finput 
                            :form="state.sinks.creations.copy_request"
                            name="email"
                            type="text"
                            :label="lang('l_email')"
                            :placeholder="lang('l_email')"
                        />
                    </div>
                </div>
            </div>
            <footer class="modal-card-foot">
                <template v-if="request_state !== 'success_create' && request_state !== 'error_generic'">
                    <button class="button is-info" 
                        @click.prevent="send_request">{{lang('b_validate')}}</button>
                    <button class="button" 
                        @click.prevent="closeModal">{{lang('b_cancel')}}</button>
                </template>
                <template v-else>
                    <button class="button is-info" 
                        @click.prevent="closeModal">{{lang('b_close')}}</button>
                </template>
            </footer>
        </div>
    </b-modal>
</template>

<script>
    module.exports = require('./CopyRequester');
</script>
