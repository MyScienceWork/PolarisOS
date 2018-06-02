<template>
    <div>
        <mapping-item 
        :insertable="true"
        :content="value"
        :name="key"
        v-for="(value, key) in state.mapping.mappings.publication_version.properties" />
    </div>
</template>

<script>
    module.exports = require('./MappingBuilder');
</script>
