<template>
<div class="hero-body">
    <finput
        type='hidden'
        label=''
        :hiddenValue="publication_id"
        name="parent"
        :form="state.sinks.creations.publication"
        v-if="in_mode('new_version')"
    />
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="columns is-centered">
                            <div class="column">
                                <second-deposit-step
                                    :creation-sink="state.sinks.creations.publication"
                                    :publication-specs="state.sinks.creations.specs"
                                    key="0"
                                    subform-name="required"
                                    :validated="!unvalidated"
                                    :deposit-form="state.deposit_form_name"
                                    :review="in_mode('review')"
                                    @refetch-form="refetch_form"
                                />
                                <second-deposit-step
                                    :creation-sink="state.sinks.creations.publication"
                                    :publication-specs="state.sinks.creations.specs"
                                    key="1"
                                    subform-name="optional"
                                    :validated="!unvalidated"
                                    :deposit-form="state.deposit_form_name"
                                    :review="in_mode('review')"
                                    @refetch-form="refetch_form"
                                />
                                <second-deposit-step
                                    key="2"
                                    :creation-sink="state.sinks.creations.publication"
                                    :publication-specs="state.sinks.creations.specs"
                                    subform-name="permission"
                                    :validated="!unvalidated"
                                    :deposit-form="state.deposit_form_name"
                                    :review="in_mode('review')"
                                    @refetch-form="refetch_form"
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <b-modal :active.sync="state.show_give_up_modal">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{lang('l_please_confirm')}}</p>
                <button class="delete" aria-label="close"
                        @click.prevent="state.show_give_up_modal = false"></button>
            </header>
            <div class="modal-card-body">
                <div class="columns">
                    <div class="column">
                        <h4 class="has-text-centered title is-4">{{lang('l_sure_give_up')}}</h4>
                    </div>
                </div>
            </div>
            <footer class="modal-card-foot">
                <button class="button is-info" @click.prevent="give_up">
                    {{lang('l_give_up_deposit')}}</button>
                <button class="button" @click.prevent="state.show_give_up_modal = false">
                    {{lang('b_cancel')}}</button>
            </footer>
        </div>
    </b-modal>
</div>
</template>

<script>
module.exports = require('./Bulk');
</script>
