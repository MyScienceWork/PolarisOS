<template>
    <div>
        <div class="columns is-centered is-multiline">
            <div class="column is-3 has-text-centered" v-for="(obj, idx) in navItems">
                <router-link  :class="['swap', {'is-active': current_nav.type === obj.type}]" :to="`/browse?b=${obj.type}&i=${idx}&entity=${obj.entity}`">{{lang(obj.text)}}</router-link>
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control is-expanded">
                <fselect 
                    label=""
                    :placeholder="lang('l_select_content')"
                    name="browsing_terms"
                    :form="state.sinks.creations.selected"
                    :options="options"
                    :multi="true"
                    :fieldLabel="label"
                    fieldValue="_id"
                    :reset-on-options-change="true"
                />
            </div> 
            <div class="control">
                <a class="icon has-text-info is-medium" :alt="lang('f_search')" :title="lang('f_search')" @click="browse">
                    <i class="fa fa-search fa-2x"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./Category');
</script>
