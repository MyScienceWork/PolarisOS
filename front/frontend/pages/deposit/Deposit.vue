<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="columns is-centered">
                            <div class="column">
                                <stepper :number-of-steps="5">
                                    <template slot="step-title" slot-scope="props">
                                        {{lang('f_deposit_step')}} {{props.id+1}}
                                    </template>
                                    <template slot="step-details" slot-scope="props">
                                        {{lang('f_deposit_step_details_' + props.id)}} 
                                    </template>
                                    <template slot="step-content" slot-scope="props">
                                        <first-deposit-step 
                                            :typology-form="state.rform"
                                            :documentType="state.typology_child_path"
                                            v-if="props.id === 0"
                                            @typology-child-change="update_typology_child"
                                        />                                        
                                        <second-deposit-step 
                                            v-if="props.id === 1 && state.typology_child != null"
                                            :form="forms[state.typology_child.form]"
                                        />
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
