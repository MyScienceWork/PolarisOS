<template>
    <div class="hero-body">
        <div class="container is-fluid">
            <users-searching
                :search-sink="state.sinks.creations.search"
                :result-sink="state.sinks.reads.users"
                :search-path="state.paths.reads.users"
                :search-query="es_query_ids[1]"
                :use-default-query="true"
                search-type="author"
            >
                <div class="container is-fluid" slot="search-users-result" slot-scope="props">
                       <div class="columns is-centered">
                           <article v-for="usr in props.results" class="message column is-9">
                               <div class="columns">
                                   <div class="column is-narrow">
                                       <figure class="image is-128x128">
                                           <img :src="usr.author.avatar" alt="Placeholder image">
                                       </figure>
                                   </div>
                                   <div class="column">
                                       <div class="title is-4">
                                           {{usr.fullName}}
                                       </div>
                                       <div class="subtitle is-6">
                                           {{usr.author.membership.role}}, {{usr.author.membership.institution}}
                                       </div>
                                       <div class="tags is-marginless">
                                           <span v-for="tag in usr.author.tags" class="tag is-info is-marginless">
                                               {{tag}}
                                           </span>
                                       </div>
                                       <p>{{usr.author.address.city}}, {{usr.auhtor.address.country}}</p>
                                   </div>
                               </div>
                           </article>
                       </div>
                   </div>
            </users-searching>
        </div>
    </div>
</template>

<script>
    module.exports= require('./UserList');
</script>
