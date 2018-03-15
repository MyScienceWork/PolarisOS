<template>
    <nav class="indexer is-small pagination is-centered" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
            <li v-for="(a, idx) in alphabet">
                <a 
                    @click="goto(idx, $event)" 
                    :class="{'is-current': state.current === idx, 'pagination-link': true}" 
                    :aria-label="`Goto page ${idx}`">
                    {{a}}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    module.exports = require('./Indexer');
</script>
