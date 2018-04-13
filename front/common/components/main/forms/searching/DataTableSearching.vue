<template>
    <b-table
        :data="content"
        :loading="state.loading"
        paginated
        backend-pagination
        :total="total"
        :per-page="state.seso.size"
        @page-change="on_page_change"
        backend-sorting
        default-sort-direction="asc"
        :default-sort="defaultSort"
        @sort="sort">

        <template slot-scope="props">
            <slot name="rows" v-bind="props">
            </slot>
        </template>
    </b-table>
</template>

<script>
    module.exports = require('./Searching');
</script>
