<template>
<div>
    <div class="steps">
        <div 
            v-for="step in Array(numberOfSteps).fill().map((_, i) => i)"
            :class="{'step-item': true, [`is-${state.colors[step]}`]: true, 'is-completed': state.current_step > step, 'is-active': step === state.current_step}"
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
            <slot name="step-buttons" :go="go" :step="state.current_step" :previous="previous" :next="next" :number-of-steps="numberOfSteps">
                <div class="field is-grouped is-pulled-right">
                    <div class="control" v-if="state.current_step > 0">
                        <button @click.prevent="previous" class="button">{{lang('f_previous_button_step')}}</button>
                    </div>
                    <div class="control" v-if="state.current_step < numberOfSteps-1">
                        <button @click.prevent="next" class="button">{{lang('f_next_button_step')}}</button>
                    </div>
                    <div class="control" v-else>
                        <button @click.prevent="next" class="button">{{lang('f_finish_button_step')}}</button>
                    </div>
                </div>
            </slot>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./Stepper');
</script>
