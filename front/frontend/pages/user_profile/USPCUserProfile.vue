<template>
<div class="hero-body">
    <div class="container is-fluid" v-if="author">
        <div class="columns is-centered">
            <div class="column card-equal-height">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img :src="avatar" :alt="fullname">
                        </figure>
                    </div>
                </div> <!-- card image user profile -->
                <h4 class="has-small-top-margin title is-4">{{fullname}}</h4>
                <div v-if="_oa_find(author, 'disciplines') || _oa_find(author, 'tags')">
                    <template v-if="_oa_find(author, 'disciplines', []).length > 0"> 
                        <span class="title is-5">
                            {{lang('l_discipline', {}, 'other')}}
                        </span>
                        <div class="tags">
                            <span v-for="d in _oa_find(author, 'disciplines', [])" class="tag is-success">{{d.value}}</span>
                        </div>
                    </template>
                    <template v-if="_oa_find(author, 'interests', []).length > 0"> 
                        <span class="title is-5">
                            {{lang('l_interest', {}, 'other')}}
                        </span>
                        <div class="tags">
                            <span v-for="d in _oa_find(author, 'interest', [])" class="tag is-info">{{d.value}}</span>
                        </div>
                    </template>
                </div>
            </div>
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
