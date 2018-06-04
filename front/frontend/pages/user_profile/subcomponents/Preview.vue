<template>
    <div>
        <div class="card">
            <div class="card-image">
                <figure class="image">
                    <img :src="user.avatar" :alt="user.fullname">
                </figure>
            </div>
        </div> <!-- card image user profile -->
        <h4 class="has-small-top-margin title is-4">{{user.fullname}}</h4>
        <h5 v-if="user.about_me" class="title is-5">{{lang('l_about_me')}}</h5>
        <p v-if="user.about_me">{{user.about_me}}</p>
    </div>
</template>

<script>
    module.exports = require('Preview');
</script>
