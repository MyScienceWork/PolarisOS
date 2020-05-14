<template>
    <b-modal :active="show">
        <div class="modal-card is-height-three-quarters">
            <header class="modal-card-head">
                <p class="modal-card-title">{{lang('l_review_modal')}}</p>
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
                            :label="lang('l_choose_project_status')"
                            :placeholder="lang('l_choose_project_status')"
                            :is-required="true"
                            :options="status_options"
                            :form="sink"
                            name="state"
                            :translatable="true"
                            fieldValue="_id"
                            fieldLabel="label"
                            :view-validation-texts="false"
                        />
                        <finput
                            :label="lang('l_email_remark')"
                            :form="sink"
                            :is-required="true"
                            :name="'history.'+index_comment+'.comment'"
                            :rows="10"
                            type="textarea"
                        />
                        <finput
                            label="l_history_date"
                            :form="sink"
                            :name="'history.'+index_comment+'.date'"
                            :hidden-value="updated_date"
                            type="hidden"
                        />
                        <finput
                            label="l_history_state"
                            :form="sink"
                            :name="'history.'+index_comment+'.state'"
                            :hidden-value="new_state"
                            type="hidden"
                        />
                    </div>
                </div>
            </div>
            <footer class="modal-card-foot">
            <button class="button is-info" @click.prevent="review_project">{{lang('b_validate')}}</button>
                <button class="button" @click.prevent="toggle(false)">{{lang('b_cancel')}}</button>
            </footer>
        </div>
    </b-modal>
</template>

<script>
    module.exports = require('./ReviewModal');
</script>
