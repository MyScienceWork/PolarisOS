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
                        <a class="icon has-text-info is-medium" :alt="lang('f_search')" :title="lang('f_search')" 
                            @click.prevent="browse" v-scroll-to="'#msearchresults'">
                            <i class="fa fa-search fa-2x"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns" v-if="view === 'list' && query.aggt !== 'date'">
            <div class="column is-10">
                <div class="content">
                    <ul>
                        <li v-for="obj in options">
                            <a
                                :class="['swap is-purple']"
                                @click.prevent="browse_list(obj._id)"
                                v-scroll-to="'#msearchresults'"
                            >
                                {{obj[label]}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="columns is-centered" v-else-if="view === 'abc'">
            <div class="column is-10">
                <div class="columns is-multiline is-centered">
                    <div class="column is-1" v-for="agg in aggregations">
                        <article :class="['message is-abc', {'is-active-purple': state.active_abc === agg.key}]" @click.prevent="click_on_abc(agg.key)">
                            <div class="message-body has-text-centered">{{lang(agg.key)}}</div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns" v-else-if="view === 'list' && query.aggt === 'date'">
            <div class="column is-10">
                <div class="content">
                    <ul>
                        <li v-for="obj in aggregations">
                            <a
                                :class="['swap is-purple']"
                                @click.prevent="browse_list(obj.key, 'date')"
                                v-scroll-to="'#msearchresults'"
                            >
                                {{obj.key}} ({{obj.count}})
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="columns" v-if="view === 'abc'">
            <div class="column is-10">
                <div class="content">
                    <ul>
                        <li v-for="obj in options_abc">
                            <a
                                :class="['swap is-purple']"
                                @click.prevent="browse_list(obj._id)"
                                v-scroll-to="'#msearchresults'"
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
