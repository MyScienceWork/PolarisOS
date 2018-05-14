<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_language_items')}}</span>
                    <div slot="body">
                        <fdata-table-searching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.lang"
                            :search-path="state.paths.reads.lang"
                            :search-query="search_query"
                            :use-default-query="true"
                            search-type="lang"
                            :detailed="true"
                            detail-key="_id"
                        >
                            <template slot="rows" slot-scope="props">
                                <b-table-column field="_id" :label="lang('l_id')" centered>
                                    <span class="tag is-light">
                                        {{props.row._id | truncate(10, '')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="key.raw" :label="lang('l_l_key')" centered sortable>
                                    <span class="tag is-info">
                                        {{props.row.key}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="lang" :label="lang('l_l_lang')" centered sortable>
                                    <span class="tag is-success">
                                        {{props.row.lang}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="values.na" :label="lang('l_l_na')">
                                    {{grab_quantity(props.row.values, 'n/a') | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="values.one" :label="lang('l_l_one')">
                                    {{grab_quantity(props.row.values, '1') | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="values.other" :label="lang('l_l_other')">
                                    {{grab_quantity(props.row.values, 'other') | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="actions" :label="lang('l_p_action', {}, 'other')" centered>
                                    <action-button
                                        class="icon has-text-blue share-icon"
                                        tag="a"
                                        @action-click="update(props.row, 'lang')"
                                        v-scroll-to="'#mwidget'"
                                    >
                                        <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                        class="icon has-text-orange share-icon"
                                        tag="a"
                                        @action-click="use_as_model(props.row, 'lang')"
                                        v-scroll-to="'#mwidget'"
                                    >
                                        <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                        class="icon has-text-red share-icon"
                                        tag="a"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(props.row, 'lang')"
                                    >
                                        <i class="fa fa-times"></i>
                                    </action-button>
                                </b-table-column>
                            </template>
                            <div slot="detail" slot-scope="props">
                                <h4>{{props.row.key}} ({{props.row.lang}})</h4>
                                <p><strong>N/A</strong> : {{grab_quantity(props.row.values, 'n/a')}}</p>
                                <p><strong>1</strong> : {{grab_quantity(props.row.values, '1')}}</p>
                                <p><strong>{{lang('b_lang_other')}}</strong> : {{grab_quantity(props.row.values, 'other')}}</p>
                                <p><strong>2</strong> : {{grab_quantity(props.row.values, '2')}}</p>
                                <p><strong>{{lang('b_lang_few')}}</strong> : {{grab_quantity(props.row.values, 'few')}}</p>
                                <p><strong>{{lang('b_lang_many')}}</strong> : {{grab_quantity(props.row.values, 'many')}}</p>
                            </div>
                        </fdata-table-searching>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget id="mwidget">
                    <span slot="title">{{lang('l_add_or_modify_lang')}}</span>
                    <div slot="body">
                        <fform 
                            :name="state.sinks.creations.lang" 
                            :post_path="state.paths.creations.lang" 
                            :put_path="state.paths.creations.lang"
                            :get_path="state.paths.reads.lang"
                            :get_form="state.sinks.reads.lang"
                        >
                            <finput name="key" :label="lang('b_key')" :is-required="true" :placeholder="lang('b_key')" type="text" :form="state.sinks.creations.lang" />
                            <fselect name="parts" :multi="true" :label="lang('b_part_of_website')" :is-required="true" :placeholder="lang('b_part_of_website')" :form="state.sinks.creations.lang" :options="[{value: 'backoffice', label: 'Backoffice'}, {value: 'frontoffice', label: 'Frontoffice'}]"/>
                            <fselect name="lang" :label="lang('b_lang')" :is-required="true" :options="state.langs" :form="state.sinks.creations.lang" />
                            <fvariadic-element name="values" :form="state.sinks.creations.lang" :tabs="true">
                            <template slot="variadic" slot-scope="props">
                                <div class="field">
                                    <div class="checkbox">
                                        <label for="dont-care">
                                            <input
                                            type="checkbox"
                                            name="dont-care"
                                            v-model="state.need_html_editor"
                                            />
                                            {{lang('l_need_html_editor')}} 
                                        </label>
                                    </div>
                                </div>
                                <finput v-if="!state.need_html_editor" :name="`${props.fname}.${props.order}.value`" :label="lang('b_text')" :is-required="true" :placeholder="lang('b_text_to_show')" type="text" :form="state.sinks.creations.lang" />
                                <finput v-else :name="`${props.fname}.${props.order}.value`" :label="lang('b_text')" :is-required="true" :placeholder="lang('b_text_to_show')" type="html-editor" :form="state.sinks.creations.lang" />
                                <fselect :name="`${props.fname}.${props.order}.quantity`" :label="lang('b_quantity')" :is-required="true" :options="state.quantities" :form="state.sinks.creations.lang" />
                                </template>
                            </fvariadic-element>
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Lang');
</script>
