<template>
    <ul class="pagination pagination-split">
        <li :class="{disabled: !(state.current_page > 1)}"><a href='#' @click="goto(state.current_page-1, $event)">«</a></li>
        <li v-if="state.current_page > state.first_page"><a href='#' @click="goto(1, $event)" aria-label="Goto page 1">1</a></li>
        <li class="disabled" v-if="state.current_page-1 > 2"><a href='#'>&hellip;</a></li>
        <li v-if="state.current_page > state.first_page + 1"><a href='#' @click="goto(state.current_page-1, $event)" :aria-label="`Goto page ${state.current_page-1}`">{{state.current_page-1}}</a></li>
        <li class="active"><a href='#' :aria-label="`Page ${state.current_page}`" aria-current="page">{{state.current_page}}</a></li>
        <li v-if="state.current_page < state.last_page-1"><a href='#' @click="goto(state.current_page+1, $event)" :aria-label="`Goto page ${state.current_page+1}`">{{state.current_page+1}}</a></li>
        <li class="disabled" v-if="state.current_page+1 < state.last_page-1"><a href='#'>&hellip;</a></li>
        <li v-if="state.current_page < state.last_page"><a href='#' @click="goto(state.last_page, $event)" :aria-label="`Goto page ${state.last_page}`">{{state.last_page}}</a></li>
        <li :class="{disabled: !(state.current_page < state.last_page)}"><a href='#' @click="goto(state.current_page+1, $event)">»</a></li>
    </ul>
</template>

<script>
    module.exports = require('./Paginator');
</script>
