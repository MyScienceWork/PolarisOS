<template>
    <b-modal :active.sync="showModal">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{lang('l_request_copy_modal')}}</p>
                <button class="delete" aria-label="close" @click.prevent="showModal = false"></button>
            </header>
            <div class="modal-card-body">
                <div class="columns is-centered">
                    <div class="column" v-if="loggedIn">
                        <p v-html="lang('l_are_you_sure_request_copy')"></p>
                        <finput 
                            form="dummy"
                            name="fistname"
                            type="hidden"
                            :hidden-value="this.user.firstname"
                            :label="lang('l_firstname')"
                        />
                        <finput 
                            form="dummy"
                            name="lastname"
                            type="hidden"
                            :hidden-value="this.user.lastname"
                            :label="lang('l_lastname')"
                        />
                        <finput 
                            form="dummy"
                            name="email"
                            type="hidden"
                            :hidden-value="(this.user.emails.find(e => e.is_master) || this.user.emails[0]).email"
                            :label="lang('l_email')"
                        />
                    </div>
                    <div class="column" v-else>
                        <p v-html="lang('l_fill_form')"></p>
                        <finput 
                            form="dummy"
                            name="fistname"
                            type="text"
                            :label="lang('l_firstname')"
                            :placeholder="lang('l_firstname')"
                        />
                        <finput 
                            form="dummy"
                            name="lastname"
                            type="text"
                            :label="lang('l_lastname')"
                            :placeholder="lang('l_lastname')"
                        />
                        <finput 
                            form="dummy"
                            name="email"
                            type="text"
                            :label="lang('l_email')"
                            :placeholder="lang('l_email')"
                        />
                    </div>
                </div>
            </div>
            <footer class="modal-card-foot">
                <button class="button is-info" @click.prevent="send_request">{{lang('b_validate')}}</button>
                <button class="button" @click.prevent="showModal = false">{{lang('b_cancel')}}</button>
            </footer>
        </div>
    </b-modal>
</template>

<script>
    module.exports = require('./CopyRequester');
</script>
