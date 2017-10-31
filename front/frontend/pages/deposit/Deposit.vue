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
                            <div class="column">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="columns is-centered">
                                            <div class="column">
                                                <div class="field has-text-centered">
                                                    <label class="label">Choisissez le type de document</label>
                                                    <div class="select">
                                                        <select>
                                                            <option>Type de document</option>
                                                            <optgroup label="Article dans une revue">
                                                                <option>Article dans des revues référencées par les instances d’évaluation</option>
                                                                <option>Article dans d’autres revues scientifiques</option>
                                                                <option>Article dans des revues de débat</option>
                                                                <option>Article de vulgarisation scientifique</option>
                                                            </optgroup>
                                                            <optgroup label="Chapitre d'ouvrage">
                                                                <option>
                                                                Article de dictionnaire/d'encyclopédie 
                                                                </option>
                                                                <option>
                                                                Direction ou co-direction d'ouvrages, proceedings 
                                                                </option>
                                                                <option>
                                                                Direction de numéros spéciaux de revues 
                                                                </option>
                                                            </optgroup>
                                                            <optgroup label="Rapport">
                                                                <option>
                                                                Rapport aux financeurs ou aux ministères de tutelle
                                                                </option>
                                                                <option>
                                                                Rapport de recherche
                                                                </option>
                                                                <option>
                                                                Rapport d'activité
                                                                </option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="columns">
                                            <div class="column is-6">
                                                <div class="card">
                                                    <div class="card-content">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="column is-6">
                                                <div class="card">
                                                    <div class="card-content">
                                                        <div class="columns is-centered">
                                                            <div class="column">
                                                                <p><strong>Remplissez vos méta-données en utilisant un identifiant</strong></p>
                                                            </div>
                                                        </div>
                                                        <div class="columns is-centered">
                                                            <div class="column is-3">
                                                                <div class="dropdown">
                                                                    <div class="dropdown-trigger">
                                                                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                                                            <span>Identifiant</span>
                                                                            <span class="icon is-small">
                                                                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                                                        <div class="dropdown-content">
                                                                            <a href="#" class="dropdown-item">
                                                                                DOI 
                                                                            </a>
                                                                            <a class="dropdown-item">
                                                                                ISBN 
                                                                            </a>
                                                                            <a href="#" class="dropdown-item is-active">
                                                                                INED 
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="column">
                                                                <input class="input" type="text" placeholder="Identifiant" />
                                                            </div>
                                                        </div>
                                                        <div class="columns">
                                                            <div class="column">
                                                                <div class="is-pulled-right">
                                                                    <a class="button button-purple">Valider</a>     
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="columns">
                                            <div class="column is-pulled-right">
                                                <a class="button button-purple is-pulled-right has-small-margins">Suivant</a>     
                                                <a class="button button-purple is-pulled-right">Précédent</a>     
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
    </div>
</div>
</template>

<script>
module.exports = require('./Deposit');
</script>
