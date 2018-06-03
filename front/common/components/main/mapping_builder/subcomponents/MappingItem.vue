<template>
<div class="has-small-bottom-margin">
    <div class="field has-addons">
        <div class="control is-expanded">
            <input class="input" type="text" :placeholder="lang('l_enter_field_name')" v-model="state.name" />
        </div>
        <div class="control is-width-half">
            <v-select 
                :options="mapping_types"
                v-model="state.type"
                class="is-addon"
            />
        </div>
        <div class="control" v-if="removable">
            <a class="button is-info" @click.prevent="remove_child(name)" href='#'>
                <span class="icon is-small">
                    <i class="fa fa-minus"></i>
                </span>
            </a>
        </div>
        <div class="control" v-if="openable">
            <a class="button is-info" @click="state.opened = !state.opened">
                <span class="icon is-small">
                    <i class="fa fa-chevron-down" v-if="!state.opened"></i>
                    <i class="fa fa-chevron-up" v-else></i>
                </span>
            </a>
        </div>
    </div>
    <div class="field" v-if="state.opened && state.type && openable">
        <div class="control"> 
            <label class="checkbox has-small-right-margin">
                <input type="checkbox" v-model="state.extra.indexable">
                {{lang('l_field_indexable')}} 
            </label>
            <label class="checkbox has-small-right-margin" v-if="['text', 'keyword'].indexOf(state.type.value) !== -1">
                <input type="checkbox" v-model="state.extra.sortable">
                {{lang('l_field_sortable')}} 
            </label>
            <label class="checkbox" v-if="['text', 'keyword'].indexOf(state.type.value) !== -1">
                <input type="checkbox" v-model="state.extra.completable">
                {{lang('l_field_completable')}} 
            </label>
        </div>
    </div>
    <template v-if="state.type && state.type.value === 'object'">
        <div class="field">
            <div class="control"> 
                <a href='#' class="has-text-success no-menu" @click.prevent="add_child">
                    {{lang('l_add_child')}}
                </a>
            </div>
        </div>
        <ul>
            <li v-for="(value, key) in (state.content.properties || {})">
                <mapping-item 
                    :name="key" 
                    :key="key" 
                    :content="value"
                    :ref="`item_${key}`"
                    @remove-child="remove_effective_child"
                /> 
            </li>
        </ul>
    </template>
</div>
</template>

<script>
    module.exports = require('./MappingItem');
</script>
