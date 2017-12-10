<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="columns is-centered">
                            <div class="column">
                                <stepper :number-of-steps="state.total_steps" v-on:step-change="next_step">
                                    <template slot="step-title" slot-scope="props">
                                        {{lang('f_deposit_step')}} {{props.id+1}}
                                    </template>
                                    <template slot="step-details" slot-scope="props">
                                        {{lang('f_deposit_step_details_' + props.id)}} 
                                    </template>
                                    <template slot="step-content" slot-scope="props">
                                        <fform
                                            :name="state.publication.sink" 
                                            :post_path="state.publication.path" 
                                            :put_path="state.publication.path"
                                            :get_path="state.publication.read_path"
                                            :validate_path="state.publication.validate_path"
                                            :has-buttons="false"
                                            get_form="dummy_sink"
                                        >
                                            <first-deposit-step
                                                :creation-sink="state.publication.sink"
                                                :typology-sink="state.typology.sink"
                                                v-if="state.current_step === 0"
                                                :key="state.current_step"
                                                @typology-change="update_typology_form"
                                                :publication-specs="state.publication.specs"
                                            />
                                            <second-deposit-step 
                                                v-if="state.current_step === 1"
                                                :creation-sink="state.publication.sink"
                                                :publication-specs="state.publication.specs"
                                                :key="state.current_step"
                                                subform-name="required"
                                            />
                                            <second-deposit-step 
                                                v-if="state.current_step === 2 && !unvalidated"
                                                :creation-sink="state.publication.sink"
                                                :publication-specs="state.publication.specs"
                                                :key="state.current_step"
                                                subform-name="optional"
                                            />
                                            <second-deposit-step 
                                                v-if="state.current_step === 3"
                                                :creation-sink="state.publication.sink"
                                                :publication-specs="state.publication.specs"
                                                :key="state.current_step"
                                                subform-name="permission"
                                            />
                                            <review-deposit-step 
                                                v-if="state.current_step === 4"
                                                :key="state.current_step"
                                                :publication-specs="state.publication.specs"
                                                :creation-sink="state.publication.sink"
                                            />
                                        </fform>
                                    </template>
                                </stepper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Deposit');
</script>
