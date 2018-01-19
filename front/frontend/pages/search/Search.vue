<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-10">
                <widget-search form="test_form" :search_url="state.pread_path" />
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
                <widget-list extra-classes="info-card-purple" form="test_form" 
                :items="items" 
                type="publication" :boxed="false" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Search');
</script>
