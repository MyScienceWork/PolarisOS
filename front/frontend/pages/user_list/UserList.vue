<template>
    <div class="hero-body">
        <div class="container is-fluid">
            <users-searching
                v-if= "es_query_contents['frontoffice-userlist-query'] && es_query_contents['frontoffice-userlist-default-query']""
                :search-sink="state.sinks.creations.search"
                :result-sink="state.sinks.reads.authors"
                :search-path="state.paths.reads.authors"
                :search-query="es_query_contents['frontoffice-userlist-query']"
                :use-default-query="true"
                :default-query="es_query_contents['frontoffice-userlist-default-query']"
                search-type="author"
            >
                <div class="container is-full" slot="search-users-results" slot-scope="props">
                       <div class="column is-full">
                           <div v-for="author in props.results">
                               <div class="columns">
                                   <article class="message column">
                                       <div class="columns">
                                           <div class="column is-narrow">
                                               <figure class="image is-128x128">
                                                   <img :src="author.avatar" alt="Placeholder image">
                                               </figure>
                                           </div>
                                           <div class="column">
                                               <div class="title is-4">
                                                   {{author.fullName}}
                                               </div>
                                               <div v-if="author.membership.role || author.membership.institution" class="subtitle is-6">
                                                   <span v-if="author.membership.role">{{author.membership.role}}, </span>
                                                   <span v-if="author.membership.institution">{{author.membership.institution}}</span>
                                               </div>
                                               <div class="tags">
                                                   <span v-for="tag in author.tags" class="tag is-info is-marginless">
                                                       {{tag.value}}
                                                   </span>
                                               </div>
                                               <span v-if="author.address.city">{{author.address.city}}, </span>
                                               <span v-if="author.address.country">{{author.address.country}}</span>
                                           </div>
                                       </div>
                               </article>
                               <div class="columns"></div>
                           </div>
                        </div>
                       </div>
                   </div>
            </users-searching>
        </div>
    </div>
</template>

<script>
    module.exports= require('./UserList');
</script>
