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
                    </div>
                    <div class="column" v-else>
                        <p v-html=""></p>
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
