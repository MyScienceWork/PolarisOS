<template>
<div class="hero-body">
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
                                        <fform
                                            :name="state.publication.sink" 
                                            :post_path="path" 
                                            :put_path="path" 
                                            :get_path="state.publication.read_path"
                                            :has-buttons="false"
                                            get_form="dummy_sink"
                                            :show-errors="false"
                                            :mode="form_mode"
                                            :validate-step="state.current_step"
                                            :no_reinitialize_after_success="true"
                                            @form-success-reset="go_after_success"
                                        >
                                            <first-deposit-step
                                                :creation-sink="state.publication.sink"
                                                :typology-sink="state.typology.sink"
                                                :subtypology-sink="state.typology.subsink"
                                                v-if="state.current_step === 0"
                                                :key="state.current_step"
                                                :validated="!unvalidated"
                                                @typology-change="update_typology_form"
                                                :publication-specs="state.publication.specs"
                                                :deposit-form="state.deposit_form_name"
                                                :review="is_review_mode"
                                                :new-version="is_new_version_mode"
                                                :model="is_model_mode"
                                                :modification="is_modification_mode"
                                                :parent-publication="publication_id"
                                            />
                                            <second-deposit-step 
                                                v-if="state.current_step === 1"
                                                :creation-sink="state.publication.sink"
                                                :publication-specs="state.publication.specs"
                                                :key="state.current_step"
                                                subform-name="required"
                                                :validated="!unvalidated"
                                                :deposit-form="state.deposit_form_name"
                                                :review="is_review_mode"
                                            />
                                            <second-deposit-step 
                                                v-if="state.current_step === 2 && !unvalidated"
                                                :creation-sink="state.publication.sink"
                                                :publication-specs="state.publication.specs"
                                                :key="state.current_step"
                                                subform-name="optional"
                                                :validated="!unvalidated"
                                                :deposit-form="state.deposit_form_name"
                                                :review="is_review_mode"
                                            />
                                            <second-deposit-step 
                                                v-if="state.current_step === 3"
                                                :creation-sink="state.publication.sink"
                                                :publication-specs="state.publication.specs"
                                                :key="state.current_step"
                                                subform-name="permission"
                                                :validated="!unvalidated"
                                                :deposit-form="state.deposit_form_name"
                                                :review="is_review_mode"
                                            />
                                            <review-deposit-step 
                                                v-if="state.current_step === 4"
                                                :key="state.current_step"
                                                :publication-specs="state.publication.specs"
                                                :creation-sink="state.publication.sink"
                                                :success="success"
                                                :review="is_review_mode"
                                            />
                                        </fform>
                                    </template>
                                    <template slot="step-buttons" slot-scope="props">
                                        <div class="field is-grouped is-pulled-right">
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
                                                    v-if="!is_review_mode"
                                                    class="button">{{lang('f_finish_button_step')}}</button>
                                                <button @click.prevent="open_review_modal(props)" 
                                                    :disabled="success"
                                                    v-else-if="is_review_mode"
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
        @review-publication="review_publication"
        :sink="state.publication.sink"
    />
</div>
</template>

<script>
module.exports = require('./Deposit');
</script>
