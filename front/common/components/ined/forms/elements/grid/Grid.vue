<template>
<div>
    <div class="columns">
        <div class="column">
            <a class="button" @click="add_row">{{lang('l_add_row')}}</a>
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <draggable v-model="state.rows" @start="drag=true" @end="drag=false" :options="{handle: '.handle', forceFallback: true}">
                <div v-for="row in state.rows" :key="row.i" class="columns is-centered">
                    <div class="column is-2">
                        <div class="field has-addons">
                            <p class="control">
                                <button class="handle button is-primary" @click="(e) => e.preventDefault()">
                                    <span class="icon">
                                        <i class="fa fa-arrows-v"></i>
                                    </span>
                                </button>
                            </p>
                            <p class="control">
                                <button class="button is-success" @click="add_widget(row.i, $event)">
                                    <span class="icon">
                                        <i class="fa fa-plus"></i>
                                    </span>
                                </button>
                            </p>
                            <p class="control">
                                <button class="button is-danger" @click="remove_row(row.i, $event)">
                                    <span class="icon">
                                        <i class="fa fa-times"></i>
                                    </span>
                                </button>
                            </p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                            <grid-layout
                            :layout="state.elements.filter(e => e.row === row.i)"
                            :col-num="12"
                            :row-height="100"
                            :is-draggable="true"
                            :is-resizable="true"
                            :is-mirrored="false"
                            :vertical-compact="true"
                            :margin="[20, 20]"
                            :use-css-transforms="true"
                            :maxRows="1"
                            >
                            <grid-item 
                            v-for="widget in state.elements.filter(e => e.row === row.i)"
                            :x="widget.x"
                            :y="widget.y"
                            :w="widget.w"
                            :h="widget.h"
                            :i="widget.i"
                            :maxH="1"
                            :minW="2"
                            class="card"
                            @resized="grid_resized_event"
                            @moved="grid_moved_event"
                            >
                                <div class="field has-addons">
                                    <p class="control">
                                        <button class="button is-info" @click.prevent="edit_widget(widget.i, $event)">
                                            <span class="icon">
                                                <i class="fa fa-pencil"></i>
                                            </span>
                                        </button>
                                    </p>
                                    <p class="control">
                                        <button class="button is-danger" @click="remove_widget(widget.i, $event)">
                                            <span class="icon">
                                                <i class="fa fa-times"></i>
                                            </span>
                                        </button>
                                    </p>
                                </div>
                            </grid-item>
                            </grid-layout>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
    </div>
    <b-modal :active.sync="state.isWidgetModelActive">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{lang('l_setup_the_widget')}}</p>
                <button class="delete" aria-label="close" @click.prevent="state.isWidgetModelActive = false"></button>
            </header>
            <div class="modal-card-body">
                <div class="columns is-centered">
                    <div class="column">
                        <fselect 
                        name="widget" 
                        :label="lang('b_select_widget')" 
                        :is-required="true" 
                        :placeholder="lang('b_select_widget')"
                        fieldLabel="name"
                        fieldValue="_id"
                        :options="widgets" 
                        form="test"
                        @select-change="widget_change"
                        />
                        <subpage form="test" :widget="state.current_widget" prefix="row.0"/>
                    </div>
                </div>
            </div>
            <footer class="modal-card-foot">
                <button class="button is-success">{{lang('b_validate')}}</button>
                <button class="button" @click.prevent="state.isWidgetModelActive = false">{{lang('b_cancel')}}</button>
            </footer>
        </div>
    </b-modal>
</div>
</template>

<script>
    module.exports = require('./Grid');
</script>
