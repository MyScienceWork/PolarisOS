<template>
    <div class="menu">
        <div class="field">
            <div class="control"> 
                <a href='#' class="has-text-success">
                    {{lang('l_add_child')}}
                </a>
            </div>
        </div>
        <ul class="menu-list">
            <li v-for="(value, key) in state.mapping.mappings.publication_version.properties">
                <mapping-item 
                :content="value"
                :name="key"/>
            </li>
        </ul>
    </div>
</template>

<script>
    module.exports = require('./MappingBuilder');
</script>
