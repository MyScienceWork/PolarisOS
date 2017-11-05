<template>
<div>
    <div class="steps">
        <div 
            v-for="step in Array(numberOfSteps).fill().map((_, i) => i)"
            :class="{'step-item': true, 'is_completed': step > state.current_step, 'is-active': step === state.current_step}"
        >
            <div class="step-marker">
                <slot 
                    name="step-marker" 
                    :id="step"
                    >
                    <span v-if="step < state.current_step"><i class="fa fa-check"></i></span>
                    <span v-else>{{step+1}}</span>
                </slot>
            </div>
            <div class="step-details">
                <p class="step-title">
                    <slot 
                        name="step-title" 
                        :id="step"
                    >
                        Step {{step+1}} 
                    </slot>
                </p>
                <p>
                    <slot 
                        name="step-details" 
                        :id="step"
                    >
                        Details {{step+1}} 
                    </slot>
                </p>
            </div>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column">
            <slot name="step-content" :id="state.current_step">

            </slot>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column">
            <div class="field is-grouped is-pulled-right">
                <div class="control">
                    <button @click="previous" class="button">Previous</button>
                </div>
                <div class="control">
                    <button @click="next" class="button">Next</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./Stepper');
</script>
