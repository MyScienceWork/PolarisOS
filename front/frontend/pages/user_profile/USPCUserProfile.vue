<template>
<div class="hero-body">
    <div class="container is-fluid" v-if="author">
        <div class="columns is-centered">
            <div class="column is-9">
                <div class="card card-equal-height">
                    <div class="card-content">
                        <div class="columns is-centered" v-if="!author">
                            <p v-html="lang('l_no_information_for_author_yet')" />
                        </div>
                        <overview v-else :author="author" />
                    </div>
                </div> <!-- card details -->
            </div> 
        </div> <!-- columns -->
    </div>
</div>
</template>

<script>
module.exports = require('./UserProfile');
</script>
