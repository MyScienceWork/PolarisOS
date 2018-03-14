<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_language_items')}}</span>
                    <div slot="body">
                        <fsearching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.forms.rsink"
                            :search-path="state.rpath"
                            :search-query="search_query"
                            :use-default-query="true"
                            search-type="lang"
                        >
                            <widget slot="search-result" slot-scope="props">
                                <span slot="title">{{props.info.key}} ({{props.info.lang}})
                                    <action-button
                                    class="button is-small button-background-blue"
                                    @action-click="update(props.info, 'lang')"
                                    >
                                    <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                    class="button is-small button-background-red"
                                    confirmation="Are you sure?"
                                    :two-steps="true"
                                    @action-click="remove(props.info, 'lang')"
                                    >
                                    <i class="fa fa-times"></i>
                                    </action-button>
                                </span>
                                <div slot="body">
                                    <h4>{{props.info.key}} ({{props.info.lang}})</h4>
                                    <p><strong>N/A</strong> : {{grab_quantity(props.info.values, 'n/a')}}</p>
                                    <p><strong>1</strong> : {{grab_quantity(props.info.values, '1')}}</p>
                                    <p><strong>{{lang('b_lang_other')}}</strong> : {{grab_quantity(props.info.values, 'other')}}</p>
                                    <p><strong>2</strong> : {{grab_quantity(props.info.values, '2')}}</p>
                                    <p><strong>{{lang('b_lang_few')}}</strong> : {{grab_quantity(props.info.values, 'few')}}</p>
                                    <p><strong>{{lang('b_lang_many')}}</strong> : {{grab_quantity(props.info.values, 'many')}}</p>
                                </div>
                            </widget>
                        </fsearching>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">Add or modify a language item</span>
                    <div slot="body">
                        <fform 
                            :name="state.forms.csink" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.forms.rsink"
                        >
                            <finput name="key" :label="lang('b_key')" :is-required="true" :placeholder="lang('b_key')" type="text" :form="state.forms.csink" />
                            <fselect name="parts" :multi="true" :label="lang('b_part_of_website')" :is-required="true" :placeholder="lang('b_part_of_website')" :form="state.forms.csink" :options="[{value: 'backoffice', label: 'Backoffice'}, {value: 'frontoffice', label: 'Frontoffice'}]"/>
                            <fselect name="lang" :label="lang('b_lang')" :is-required="true" :options="state.langs" :form="state.forms.csink" />
                            <fvariadic-element name="values" :form="state.forms.csink" :tabs="true">
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
                                <finput v-if="!state.need_html_editor" :name="`${props.fname}.${props.id}.value`" :label="lang('b_text')" :is-required="true" :placeholder="lang('b_text_to_show')" type="text" :form="state.forms.csink" />
                                <finput v-else :name="`${props.fname}.${props.id}.value`" :label="lang('b_text')" :is-required="true" :placeholder="lang('b_text_to_show')" type="html-editor" :form="state.forms.csink" />
                                <fselect :name="`${props.fname}.${props.id}.quantity`" :label="lang('b_quantity')" :is-required="true" :options="state.quantities" :form="state.forms.csink" />
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
