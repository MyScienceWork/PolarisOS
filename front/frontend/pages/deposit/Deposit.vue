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
                                            <p class="step-title">Etape 1</p>
                                            <p>Déposez vos fichiers et choississez vos droits de diffusions</p>
                                        </div>
                                    </div>
                                    <div class="step-item is-active">
                                        <div class="step-marker">2</div>
                                        <div class="step-details">
                                            <p class="step-title">Etape 2</p>
                                            <p>Remplissez les méta-données obligatoires</p>
                                        </div>
                                    </div>
                                    <div class="step-item">
                                        <div class="step-marker">3</div>
                                        <div class="step-details">
                                            <p class="step-title">Etape 3</p>
                                            <p>Remplissez les méta-données facultatives</p>
                                        </div>
                                    </div>
                                    <div class="step-item">
                                        <div class="step-marker">
                                            <span class="icon">
                                                <i class="fa fa-flag"></i>
                                            </span>
                                        </div>
                                        <div class="step-details">
                                            <p class="step-title">Etape 4</p>
                                            <p>Merci de revoir votre dépôt</p>
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
module.exports = require('./Deposit');
</script>
