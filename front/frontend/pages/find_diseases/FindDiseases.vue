<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <h4 class="has-small-top-margin title is-4">{{lang('l_find_diseases')}}</h4>
                        <div v-if="Object.keys(user_forms('find_diseases_form')).length === 0" class="columns is-centered">
                            <loader />
                        </div>
                        <div v-else>
                            <dynamic-form :form="user_forms('find_diseases_form')" :cform="state.sinks.creations.diseases"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./FindDiseases');
</script>
