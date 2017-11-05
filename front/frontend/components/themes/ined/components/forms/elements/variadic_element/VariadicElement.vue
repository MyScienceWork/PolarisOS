<template>
    <div>
        <div class="columns is-marginless">
            <div class="column is-paddingless">
                <a href='#' class="icon has-text-success" @click="add">
                    <i class="fa fa-plus"></i>
                </a>
            </div>
        </div>
        <div v-for="(show, idx) in state.elements" class="columns" v-if="show" :key="idx">
            <div class="column">
                <div class="is-pulled-right">
                    <a href='#' class="icon has-text-danger" @click="remove(idx, $event)">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
                <slot 
                    name="variadic" 
                    :id="idx"
                    :fname="name"
                >
                </slot>
                <hr />
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./VariadicElement');
</script>
