<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="columns is-centered">
                            <div class="column has-text-centered">
                                <div class="steps">
                                    <div class="step-item is-completed is-success">
                                        <div class="step-marker">
                                            <span class="icon">
                                                <i class="fa fa-check"></i>
                                            </span>
                                        </div>
                                        <div class="step-details">
                                            <p class="step-title">Step 1</p>
                                            <p>This is the first step of the process.</p>
                                        </div>
                                    </div>
                                    <div class="step-item is-active">
                                        <div class="step-marker"></div>
                                        <div class="step-details">
                                            <p class="step-title">Step 2</p>
                                            <p>This is the second step. You get here once you have completed the first step.</p>
                                        </div>
                                    </div>
                                    <div class="step-item">
                                        <div class="step-marker">3</div>
                                        <div class="step-details">
                                            <p class="step-title">Step 3</p>
                                            <p>This is the third step. One more last before the end.</p>
                                        </div>
                                    </div>
                                    <div class="step-item">
                                        <div class="step-marker">
                                            <span class="icon">
                                                <i class="fa fa-flag"></i>
                                            </span>
                                        </div>
                                        <div class="step-details">
                                            <p class="step-title">Step 4</p>
                                            <p>Final step. You have completed all the previous steps and end the process.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column is-6">
                                <div class="card">
                                    <div class="card-content">
                                    </div>
                                </div>
                            </div>
                            <div class="column is-6">
                                <div class="card">
                                    <div class="card-content">
                                    </div>
                                </div>
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
module.exports = require('./Home');
</script>
