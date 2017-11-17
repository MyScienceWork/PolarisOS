<template>
<form @submit.prevent="trigger_click">
    <div class="field is-grouped">
        <p class="control has-icons-left is-expanded">
            <input id="search-input" class="input is-medium" type="text" placeholder="Faire une recherche dans l'archive">
            <span class="icon is-left">
                <i class="fa fa-search"></i>
            </span>
        </p>
        <p class="control">
            <a class="icon has-text-warning is-large" alt="Mettre en favoris" title="Mettre en favoris">
                <i class="fa fa-star-o fa-2x"></i>
            </a>
        </p>
    </div>
    <div class="field">
        <div class="control">
            <a @click="state.more_options = !state.more_options" class="">Plus d'options</a>
        </div>
    </div>
    <div v-if="state.more_options">
        <div :class="['card', 'info-card']">
            <div class="card-content">
                <fselect cform="test_form" label="Filtrer par auteur" :options="[{label: 'Corentin Ribeyre', value: 'cribeyre'}, {label: 'Yann Mahé', value: 'ymahe'}, {label: 'Marie Candito', value: 'mcandito'}, {label: 'Karin Sohler', value:'ksohler'}]" :multi="true" />
                <fselect cform="test_form" label="Filtrer par année" :options="[{label: '2017', value: 2017}, {label: '2016', value: 2016}, {label: '2015', value: 2015}]" :multi="true" />
                <fselect cform="test_form" label="Filtrer par domaine" :options="[]" :multi="true" />
                <fselect cform="test_form" label="Filtrer par type de publication" :options="[]" :multi="true" />
                <fselect cform="test_form" label="Filtrer par journal / conférence" :options="[]" :multi="true" />
                <div class="control">
                    <button class="button">Valider</button>
                </div>
            </div>
        </div>
    </div>
</form>
</template>

<script>
    module.exports = require('./SearchWidget');
</script>
