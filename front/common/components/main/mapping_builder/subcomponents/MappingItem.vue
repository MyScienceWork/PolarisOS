<template>
<div class="field has-addons">
    <div class="control is-expanded">
        <input class="input" type="text" placeholder="Find a repository" v-model="state.name" />
    </div>
    <div class="control is-width-one-third">
        <v-select 
            :options="mapping_types"
            placeholder=""
            :reset-on-options-change="true"
            :multiple="false"
            :value="null"
            class="is-addon"
        />
    </div>
    <div class="control" v-if="insertable">
        <a class="button is-info">
            <span class="icon is-small">
                <i class="fa fa-plus"></i>
            </span>
        </a>
    </div>
    <div class="control" v-if="removable">
        <a class="button is-info">
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
</template>

<script>
    module.exports = require('./MappingItem');
</script>
