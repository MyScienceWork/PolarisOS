<template>
    <b-modal :active="show">
        <div class="modal-card is-height-three-quarters">
            <header class="modal-card-head">
                <p class="modal-card-title">{{lang('l_review_dataset_modal')}}</p>
                <button class="delete" aria-label="close" @click.prevent="toggle(false)"></button>
            </header>
            <div class="modal-card-body">
                <div class="columns">
                    <div class="column">
                        <h4 class="has-text-centered title is-4">{{lang('l_deposit_review_modal_title')}}</h4>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <p class="has-text-centered">{{lang('l_deposit_review_modal_help')}}</p>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <fselect
                            :label="lang('l_choose_dataset_status')"
                            :placeholder="lang('l_choose_dataset_status')"
                            :is-required="true"
                            :options="status_options | translate(lang, 'label')"
                            :form="sink"
                            name="status"
                            @select-change="status_review_change"
                            :view-validation-texts="false"
                        />
                        <finput
                            :label="lang('l_email_remark')"
                            :is-required="true"
                            :form="sink"
                            name="virtual_email"
                            :rows="10"
                            type="textarea"
                            v-if="state.status_review === 'incomplete' || state.status_review === 'rejected' || state.status_review === 'withdrawn'"
                        />
                        <finput
                            label=""
                            :form="sink"
                            name="review_mode"
                            type="hidden"
                            :hidden-value="true"
                        />
                    </div>
                </div>
            </div>
            <footer class="modal-card-foot">
            <button class="button is-info" @click.prevent="review_dataset">{{lang('b_validate')}}</button>
                <button class="button" @click.prevent="toggle(false)">{{lang('b_cancel')}}</button>
            </footer>
        </div>
    </b-modal>
</template>

<script>
    module.exports = require('./ReviewModal');
</script>
