<template>
    <div>
        <div class="menu">
            <div class="field">
                <div class="control"> 
                    <a href='#' class="has-text-success" @click.prevent="add_child">
                        {{lang('l_add_child')}}
                    </a>
                </div>
            </div>
            <ul class="menu-list">
                <li v-for="(value, key) in state.mapping.mappings[mappingName].properties">
                    <mapping-item 
                        :ref="`item_${key}`"
                        :key="key"
                        :content="value"
                        @remove-child="remove_child"
                        :name="key"/>
                </li>
            </ul>
        </div>
        <div class="has-small-top-margin">
            <div class="field">
                <div class="control">
                    <a @click.prevent="generate" href='#' class="button is-success">{{lang('l_generate_mapping')}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./MappingBuilder');
</script>
