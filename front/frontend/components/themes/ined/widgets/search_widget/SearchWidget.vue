<template>
<div class="control has-icons-left">
    <form @submit.prevent="trigger_click">
        <input id="search-input" class="input is-medium" type="text" placeholder="Faire une recherche dans l'archive">
        <span class="icon is-left">
            <i class="fa fa-search"></i>
        </span>
    </form>
    </div>
</template>

<script>
    module.exports = require('./SearchWidget');
</script>
