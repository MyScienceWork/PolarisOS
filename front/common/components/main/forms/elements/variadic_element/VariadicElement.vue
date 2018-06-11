<template>
    <div>
        <template v-if="single">
            <div v-for="(show, idx) in state.elements" v-if="show.a" :key="show.i">
                <slot
                    name="variadic"
                    :id="show.i"
                    :fname="name"
                    :order="idx"
                    :total="state.total"
                    :add="add"
                    :remove="remove"
                >
                </slot>

            </div>
        </template>
        <template v-else>
            <div class="columns is-marginless">
                <div class="column is-paddingless">
                    <a href='#' :class="[{'icon': useIcons}, 'has-text-success']" @click.prevent="add">
                        <i v-if="useIcons" class="fa fa-plus"></i>
                        <span v-else>{{lang('l_variadic_add_'+name)}}</span>
                    </a>
                </div>
            </div>
            <div class="columns" v-if="tabs && state.elements.length > 0">
                <div class="column is-1">
                    <p
                        v-for="(show, idx) in state.elements"
                        v-if="show.a"
                        :key="show.i"
                    >
                        <a @click="activate_tab(show.i, $event)" :class="`${state.tab_active === show.i ? 'is-success': ''} button is-small`">
                            <span class="icon is-small">
                                {{show.i+1}}
                            </span>
                        </a>
                        <a href='#' class="icon is-small has-text-danger" @click.prevent="remove(show.i, idx)">
                            <i class="fa fa-times"></i>
                        </a>
                    </p>
                </div>
                <div class="column">
                    <div
                    v-for="(show, idx) in state.elements"
                    v-if="show.a"
                    v-show="state.tab_active === show.i"
                    :key="show.i"
                    >
                        <slot
                            name="variadic"
                            :id="show.i"
                            :order="idx"
                            :fname="name"
                            :total="state.total"
                        >
                        </slot>
                        <hr />
                    </div>
                </div>
            </div>
            <div v-else-if="draggable && state.elements.length > 0">
                <draggable v-model="state.elements" @start="drag=true" @end="drag=false" :options="{handle: '.handle', forceFallback: true}">
                    <div
                        v-for="(show, idx) in state.elements"
                        v-if="show.a"
                        :key="show.i"
                        class="columns is-centered"
                    >
                        <div class="column">
                            <div class="field has-addons">
                                <p class="control">
                                    <button class="handle button is-primary" @click.prevent="">
                                        <span class="icon">
                                            <i class="fa fa-arrows-v"></i>
                                        </span>
                                    </button>
                                </p>
                                <p class="control">
                                    <button class="button is-danger" @click.prevent="remove(show.i, idx)">
                                        <span class="icon">
                                            <i class="fa fa-times"></i>
                                        </span>
                                    </button>
                                </p>
                            </div>
                            <slot
                                name="variadic"
                                :id="show.i"
                                :order="idx"
                                :fname="name"
                                :total="state.total"
                            >
                            </slot>
                        </div>
                    </div>
                </draggable>
            </div>
            <div v-else-if="!tabs && state.elements.length > 0">
                <div v-for="(show, idx) in state.elements" class="columns" v-if="show.a" :key="show.i">
                    <div class="column">
                        <div class="is-pulled-right">
                            <a href='#' :class="[{'icon': useIcons}, 'has-text-danger']" @click.prevent="remove(show.i, idx)">
                                <i v-if="useIcons" class="fa fa-times"></i>
                                <span v-else>{{lang('l_variadic_remove_'+name)}}</span>
                            </a>
                        </div>
                        <slot
                            name="variadic"
                            :id="show.i"
                            :order="idx"
                            :fname="name"
                            :total="state.total"
                        >
                        </slot>
                        <hr />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    module.exports = require('./VariadicElement');
</script>
