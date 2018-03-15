<template>
<div class="card info-card card-equal-height">
    <div class="card-content">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
            </figure>
            <div class="media-content">
                <div class="is-pulled-right level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small"><i class="fa fa-plus"></i></span>
                        </a>
                        <a class="level-item" :href="`mailto:${info.email}`">
                            <span class="icon is-small"><i class="fa fa-envelope"></i></span>
                        </a>
                    </div>
                </div>
                <div class="content">
                    <p><strong>{{info.fullname}}</strong><br /><i>{{info.user_status}}</i></p>
                    <ul>
                        <li v-for="team in info.teams">{{team}}</li>
                    </ul>
                    <p><strong>{{info.publications}}</strong> {{lang('f_publication', {}, 'other')}}</p>
                </div>
            </div>
        </article>
    </div>
</div>
</template>

<script>
    module.exports = require('./MediaWidget');
</script>
