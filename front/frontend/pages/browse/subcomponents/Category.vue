<template>
    <div>
        <div class="columns is-centered" v-if="picker === 'select'">
            <div class="column is-8">
                <p class="has-text-centered has-small-bottom-margin"><strong>{{lang(`l_browse_by_${query.entity}_label`)}}</strong></p>
                <div class="field is-grouped">
                    <div class="control is-expanded">
                        <fselect 
                            label=""
                            :placeholder="lang('l_select_content')"
                            name="browsing_terms"
                            :form="state.sinks.creations.selected"
                            :options="options"
                            :multi="true"
                            fieldLabel="label_count"
                            fieldValue="_id"
                            :reset-on-options-change="true"
                        />
                    </div> 
                    <div class="control">
                        <a class="button" :alt="lang('f_search')" :title="lang('f_search')" 
                            @click.prevent="browse" v-scroll-to="'#msearchresults'">
                            <i class="fa fa-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-centered" v-if="picker === 'select'">
            <div class="colum has-text-centered">
                <span class="is-uppercase">{{lang('l_or')}}</span>
            </div>
        </div>
        <div class="columns is-centered" v-if="view === 'list' && query.aggt !== 'date'">
            <div class="column is-10">
                <div class="content">
                    <p class="has-text-centered has-small-bottom-margin" v-if="picker === 'select'"><strong>{{lang('l_browse_list')}}</strong></p>
                    <ul class="list-styled is-square">
                        <li v-for="obj in options">
                            <a
                                class="has-text-purple"
                                @click.prevent="browse_list(obj._id)"
                                v-scroll-to="'#msearchresults'"
                                v-html="obj.html"
                            >
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="columns is-centered" v-else-if="view === 'abc'">
            <div class="column is-10">
                <p class="has-text-centered has-small-bottom-margin" v-if="picker === 'select'"><strong>{{lang('l_browse_abc')}}</strong></p>
                <div class="columns is-multiline is-centered">
                    <div class="column is-1" v-for="agg in aggregations">
                        <article :class="['message is-abc is-font-abc-small', {'is-active-purple': state.active_abc === agg.key}]" @click.prevent="click_on_abc(agg.key)">
                            <div class="message-body has-text-centered">{{lang(agg.key)}}</div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-centered" v-else-if="view === 'list' && query.aggt === 'date'">
            <div class="column is-10">
                <p class="has-text-centered has-small-bottom-margin" v-if="picker === 'select'"><strong>{{lang('l_browse_list')}}</strong></p>
                <div class="content">
                    <ul class="list-styled is-square">
                        <li v-for="obj in aggregations">
                            <a
                                class="has-text-purple"
                                @click.prevent="browse_list(obj.key, 'date')"
                                v-scroll-to="'#msearchresults'"
                            >
                                {{obj.key}} (<strong>{{obj.count}}</strong>)
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="columns" v-if="view === 'abc' && state.active_abc">
            <div class="column is-10">
                <div class="content">
                    <ul class="list-styled is-square">
                        <li v-for="obj in options_abc">
                            <a
                                class="has-text-purple"
                                @click.prevent="browse_list(obj._id)"
                                v-scroll-to="'#msearchresults'"
                                v-html="obj[label]"
                            >
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
