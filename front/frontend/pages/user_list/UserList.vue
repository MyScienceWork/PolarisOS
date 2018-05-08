<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-10">
                <search-bar 
                    :search-sink="state.sinks.creations.search"
                    :default-search="''"
                />
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./UserList');
</script>
