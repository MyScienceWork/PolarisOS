<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">List of language items</span>
                    <div slot="body">
                        <div v-for="row in content" class="columns is-centered">
                            <div class="column">
                                <widget>
                                    <span slot="title">{{row.key}} ({{row.lang}})
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(row, 'lang')"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(row, 'lang')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                    </span>
                                    <div slot="body">
                                        <h4>{{row.key}} ({{row.lang}})</h4>
                                        <p><strong>N/A</strong> : {{grab_quantity(row.values, 'n/a')}}</p>
                                        <p><strong>1</strong> : {{grab_quantity(row.values, '1')}}</p>
                                        <p><strong>{{lang('b_lang_other')}}</strong> : {{grab_quantity(row.values, 'other')}}</p>
                                        <p><strong>2</strong> : {{grab_quantity(row.values, '2')}}</p>
                                        <p><strong>{{lang('b_lang_few')}}</strong> : {{grab_quantity(row.values, 'few')}}</p>
                                        <p><strong>{{lang('b_lang_many')}}</strong> : {{grab_quantity(row.values, 'many')}}</p>
                                    </div>
                                </widget>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="contentLength" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
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
                                <finput :name="`${props.fname}.${props.id}.value`" :label="lang('b_text')" :is-required="true" :placeholder="lang('b_text_to_show')" type="text" :form="state.forms.csink" />
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
