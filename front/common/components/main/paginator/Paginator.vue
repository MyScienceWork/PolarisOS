<template>
<nav v-if="state.first_page < state.last_page" class="is-small pagination is-centered" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
        <li v-if="state.current_page > 1"><a @click="goto(state.current_page-1, $event)" class="pagination-link">Previous</a></li>
        <li v-if="state.current_page > state.first_page"><a @click="goto(1, $event)" class="pagination-link" aria-label="Goto page 1">1</a></li>
        <li v-if="state.current_page-1 > 2"><span class="pagination-ellipsis">&hellip;</span></li>
        <li v-if="state.current_page > state.first_page + 1"><a @click="goto(state.current_page-1, $event)" class="pagination-link" :aria-label="`Goto page ${state.current_page-1}`">{{state.current_page-1}}</a></li>
        <li><a class="pagination-link is-current" :aria-label="`Page ${state.current_page}`" aria-current="page">{{state.current_page}}</a></li>
        <li v-if="state.current_page < state.last_page-1"><a @click="goto(state.current_page+1, $event)" class="pagination-link" :aria-label="`Goto page ${state.current_page+1}`">{{state.current_page+1}}</a></li>
        <li v-if="state.current_page+1 < state.last_page-1"><span class="pagination-ellipsis">&hellip;</span></li>
        <li v-if="state.current_page < state.last_page"><a @click="goto(state.last_page, $event)" class="pagination-link" :aria-label="`Goto page ${state.last_page}`">{{state.last_page}}</a></li>
        <li v-if="state.current_page < state.last_page"><a @click="goto(state.current_page+1, $event)" class="pagination-link">Next</a></li>
    </ul>
    </nav>
</template>

<script>
    module.exports = require('./Paginator');
</script>
