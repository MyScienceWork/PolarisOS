<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-10">
                <search-bar
                    :search-sink="state.sinks.creations.search"
                    :default-search="''"
                >
                <fselect
                    name="search"
                    :options="[]"
                    multi=true
                    :form="state.sinks.creations.search"
                    placeholder:"f_search_in_authors"
                    />
                </search-bar>
                <search-results
                    id="msearchresults"
                    :search-sink="state.sinks.creations.search"
                    :result-sink="state.sinks.reads.search"
                    :search-path="state.paths.creations.search"
                    :search-query="es_query_ids"
                    search-type="authors"
                    :use-default-query="true"
                />
            </div>
        </div>
        <div class="container is-fluid">
        <div class="columns is-centered">

            <article class="message column is-9">
                <div class="columns">
                    <div class="column is-narrow">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="column">
                        <div class="title is-4">
                            Johan NUT
                        </div>
                        <div class="subtitle is-6">
                            Test default user
                        </div>
                        <div class="tags is-paddingless is-marginless">
                            <span class="tag is-info is-marginless">
                                Dev
                            </span>
                        </div>
                        <p>Vincennes, France</p>
                    </div>
                </div>
            </article>

                <article v-for="usr in users" class="message column is-9">
                    <div class="columns">
                        <div class="column is-narrow">
                            <figure class="image is-128x128">
                                <img :src="usr.avatar" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="column">
                            <div class="title is-4">
                                {{usr.fullName}}
                            </div>
                            <div class="subtitle is-6">
                                {{usr.membership.role}}, {{usr.membership.institution}}
                            </div>
                            <div class="tags is-marginless">
                                <span v-for="tag in usr.tags" class="tag is-info is-marginless">
                                    {{tag}}
                                </span>
                            </div>
                            <p>{{usr.address.city}}, {{usr.address.country}}</p>
                        </div>
                    </div>
                </article>
        </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./UserList');
</script>
