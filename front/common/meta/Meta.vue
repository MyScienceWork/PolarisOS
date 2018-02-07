<template>
<!--<component :is="$store.state.template.page.middle_view"></component>--> 
<div class="container is-fluid">
    <div class="columns" v-for="row in page.main.rows">
        <div :class="`column is-${widget.end_span - widget.begin_span} is-offset-${widget.offset}`" v-for="widget in row.widgets">
            <div>Test</div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Meta');
</script>
