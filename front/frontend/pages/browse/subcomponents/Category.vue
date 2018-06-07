<template>
    <div>
        <div class="columns is-centered" v-if="picker === 'select'">
            <div class="column is-8" v-if="total > 0 || view === 'abc'">
                <p class="has-text-centered has-small-bottom-margin"><span>{{lang(`l_browse_by_${query.entity}_label`)}}</span></p>
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
        <div class="columns is-centered" v-if="picker === 'select' && total > 0">
            <div class="colum has-text-centered">
                <strong class="is-uppercase">{{lang('l_or')}}</strong>
            </div>
        </div>
        <div class="columns is-centered" v-if="view === 'list' && query.aggt !== 'date'">
            <div class="column is-10" v-if="total > 0">
                <div class="content">
                    <p class="has-text-centered has-small-bottom-margin" v-if="picker === 'select'"><span>{{lang('l_browse_list')}}</span></p>
                    <ul class="list-styled is-square">
                        <li v-for="obj in paginated(options)">
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
                <b-pagination
                    :total="total"
                    :current.sync="state.current_page"
                    :simple="true"
                    :per-page="state.per_page"
                    v-if="total > state.per_page"
                >
                </b-pagination>
            </div>
            <div class="column is-10" v-else>
                <p class="has-text-centered has-small-bottom-margin"><strong>{{lang('l_browse_list_empty')}}</strong></p>
            </div>
        </div>
        <div class="columns is-centered" v-else-if="view === 'abc'">
            <div class="column is-10">
                <p v-if="lang('l_browse_abc') && picker === 'select'" class="has-text-centered has-small-bottom-margin"><strong>{{lang('l_browse_abc')}}</strong></p>
                <div class="columns is-multiline is-centered">
                    <div class="column is-narrow has-medium-right-margin has-medium-left-margin" v-for="agg in aggregations">
                        <article :class="['message is-abc is-font-abc-small', {'is-active-purple': state.active_abc === agg.key}]" @click.prevent="click_on_abc(agg.key)">
                            <div class="message-body has-text-centered">{{lang(agg.key)}}</div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-centered" v-else-if="view === 'list' && query.aggt === 'date'">
            <div class="column is-10" v-if="total > 0">
                <p class="has-text-centered has-small-bottom-margin" v-if="picker === 'select'"><strong>{{lang('l_browse_list')}}</strong></p>
                <div class="content">
                    <ul class="list-styled is-square">
                        <li v-for="obj in paginated(aggregations)">
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
                <b-pagination
                    :total="total"
                    :current.sync="state.current_page"
                    :simple="true"
                    v-if="total > state.per_page"
                    :per-page="state.per_page">
                </b-pagination>
            </div>
            <div class="column is-10" v-else>
                <p class="has-text-centered has-small-bottom-margin"><strong>{{lang('l_browse_list_empty')}}</strong></p>
            </div>
        </div>
        <div class="columns" v-if="view === 'abc' && state.active_abc">
            <div class="column is-9 is-offset-1" v-if="total_abc > 0">
                <div class="content">
                    <ul class="list-styled is-square">
                        <li v-for="obj in paginated(options_abc)">
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
                <b-pagination
                    :total="total_abc"
                    :current.sync="state.current_page"
                    :simple="true"
                    v-if="total_abc > state.per_page"
                    :per-page="state.per_page">
                </b-pagination>
            </div>
            <div class="column is-10" v-else>
                <p class="has-text-centered has-small-bottom-margin"><strong>{{lang('l_browse_list_empty')}}</strong></p>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./Category');
</script>
