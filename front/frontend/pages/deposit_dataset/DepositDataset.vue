<template>
<div class="hero-body">
    <finput
        type='hidden'
        label=''
        :hiddenValue="dataset_id"
        name="parent"
        :form="state.sinks.creations.dataset"
        v-if="in_mode('new_version')"
    />
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="columns is-centered">
                            <div class="column">
                                <stepper :number-of-steps="state.total_steps" id="deposit-stepper" @step-change="update_step">
                                    <template slot="step-title" slot-scope="props">
                                        {{lang('f_deposit_step')}} {{props.id+1}}
                                    </template>
                                    <template slot="step-details" slot-scope="props">
                                        {{lang('f_deposit_step_details_' + props.id)}}
                                    </template>
                                    <template slot="step-content" slot-scope="props">
                                            <div v-if="state.show_loader">
                                                <loader class="is-absolute"></loader>
                                            </div>
                                            <div v-else>
                                                <first-deposit-step
                                                    v-if="state.current_step === 0"
                                                    :key="state.current_step"

                                                    :creation-sink="state.sinks.creations.dataset"
                                                    :import-sink="state.sinks.creations.import"
                                                    :upload-form="upload_form"
                                                    :import-form="import_form"
                                                    :dataset-type="dataset_type"
                                                    :typology-options="typology_options"
                                                    :subtypology-options="subtypology_options"
                                                    :modification-mode="in_mode('modify') || in_mode('modify-nf')"
                                                    :no-deposited-files="in_mode('modify-nf')"
                                                    :review-mode="in_mode('review')"
                                                    :analyze-state="state.analyze_state"
                                                    :import-state="state.import_state"

                                                    @typology-change="update_typology_form"
                                                    @import-from-id="import_from_id"
                                                    @analyze-from-file="analyze_from_file"
                                                />
                                                <second-deposit-step
                                                    v-if="state.current_step === 1"
                                                    :creation-sink="state.sinks.creations.dataset"
                                                    :dataset-specs="state.sinks.creations.specs"
                                                    :key="state.current_step"
                                                    subform-name="required"
                                                    :validated="!unvalidated"
                                                    :deposit-form="state.deposit_form_name"
                                                    :review="in_mode('review')"
                                                    @refetch-form="refetch_form"
                                                />
                                                <second-deposit-step
                                                    v-if="state.current_step === 2 && !unvalidated"
                                                    :creation-sink="state.sinks.creations.dataset"
                                                    :dataset-specs="state.sinks.creations.specs"
                                                    :key="state.current_step"
                                                    subform-name="optional"
                                                    :validated="!unvalidated"
                                                    :deposit-form="state.deposit_form_name"
                                                    :review="in_mode('review')"
                                                    @refetch-form="refetch_form"
                                                />
                                                <second-deposit-step
                                                    v-if="state.current_step === 3"
                                                    :key="state.current_step"
                                                    :creation-sink="state.sinks.creations.dataset"
                                                    :dataset-specs="state.sinks.creations.specs"
                                                    subform-name="permission"
                                                    :validated="!unvalidated"
                                                    :deposit-form="state.deposit_form_name"
                                                    :review="in_mode('review')"
                                                    @refetch-form="refetch_form"
                                                />
                                                <review-deposit-step
                                                    :creation-sink="state.sinks.creations.dataset"
                                                    :dataset-specs="state.sinks.creations.specs"
                                                    v-if="state.current_step === 4"
                                                    :key="state.current_step"
                                                    :success="success"
                                                    :review="in_mode('review')"
                                                />
                                            </div>
                                    </template>
                                    <template slot="step-buttons" slot-scope="props">
                                        <div class="field is-grouped is-pulled-right">
                                            <div class="control">
                                                <button
                                                    :disabled="success"
                                                    @click.prevent="give_up" class="button">{{lang('f_give_up_button')}}</button>
                                            </div>
                                            <div class="control" v-if="props.step > 0">
                                                <button
                                                    :disabled="success"
                                                    @click.prevent="previous(props.previous, props.step, props.numberOfSteps)" class="button">{{lang('f_previous_button_step')}}</button>
                                            </div>
                                            <div class="control" v-if="unvalidated">
                                                <button
                                                    @click.prevent="next(props.next, props.step, props.numberOfSteps)"
                                                    :disabled="success"
                                                    class="button">{{lang('f_validate_button_step')}}</button>
                                            </div>
                                            <div class="control" v-else-if="props.step < props.numberOfSteps-1">
                                                <button @click.prevent="next(props.next, props.step, props.numberOfSteps)"
                                                    :disabled="success"
                                                    class="button">{{lang('f_next_button_step')}}</button>
                                            </div>
                                            <div class="control" v-else>
                                                <button @click.prevent="next(props.next, props.step, props.numberOfSteps)"
                                                    :disabled="success"
                                                    v-if="!in_mode('review')"
                                                    class="button">{{lang('f_finish_button_step')}}</button>
                                                <button @click.prevent="open_review_modal(props)"
                                                    :disabled="success"
                                                    v-else-if="in_mode('review')"
                                                    class="button">{{lang('f_finish_review_step')}}</button>
                                            </div>
                                        </div>
                                    </template>
                                </stepper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <review-modal
        @review-dataset="review_dataset"
        :sink="state.sinks.creations.dataset"
        :show.sync="state.show_review_modal"
    />
    <b-modal :active.sync="state.show_give_up_modal">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{lang('l_please_confirm')}}</p>
                <button class="delete" aria-label="close" @click.prevent="state.show_give_up_modal = false"></button>
            </header>
            <div class="modal-card-body">
                <div class="columns">
                    <div class="column">
                        <h4 class="has-text-centered title is-4">{{lang('l_sure_give_up')}}</h4>
                    </div>
                </div>
            </div>
            <footer class="modal-card-foot">
                <button class="button is-info" @click.prevent="give_up">{{lang('l_give_up_deposit')}}</button>
                <button class="button" @click.prevent="state.show_give_up_modal = false">{{lang('b_cancel')}}</button>
            </footer>
        </div>
    </b-modal>
</div>
</template>

<script>
module.exports = require('./DepositDataset');
</script>
