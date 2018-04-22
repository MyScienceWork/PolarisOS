<template>
    <div>
        <div class="columns is-centered" v-if="picker === 'select'">
            <div class="column">
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
                        <a class="icon has-text-info is-medium" :alt="lang('f_search')" :title="lang('f_search')" @click.prevent="browse">
                            <i class="fa fa-search fa-2x"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns" v-if="view === 'list' && picker !== 'date'">
            <div class="column is-6">
                <div class="content">
                    <ul>
                        <li v-for="obj in options">
                            <a
                                :class="['swap is-purple']"
                                @click.prevent="browse_list(obj._id)"
                            >
                                {{obj[label]}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./Category');
</script>
