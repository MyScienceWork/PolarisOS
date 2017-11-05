<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="columns is-centered">
                            <div class="column has-text-centered">
                                <stepper :number-of-steps="4">
                                    <template slot="step-content" slot-scope="props">
                                        <first-deposit-step v-if="props.id === 0" />                                        
                                        <second-deposit-step v-if="props.id === 1" />                                        
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
