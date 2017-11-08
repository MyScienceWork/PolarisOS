<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">List of language items</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                            <div v-for="content in row" class="column">
                                <widget>
                                    <span slot="title">
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(content, 'lang')"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(content, 'lang')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{content.key}} ({{content.lang}})
                                    </span>
                                    <div slot="body">
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
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.rform"
                        >
                            <finput name="key" :label="lang('b_key')" :is-required="true" :placeholder="lang('b_key')" type="text" :form="state.cform" />
                            <finput name="part" :label="lang('b_part_of_website')" :is-required="true" :placeholder="lang('b_part_of_website')" type="text" :form="state.cform" />
                            <fselect name="lang" :label="lang('b_lang')" :is-required="true" :options="state.langs" :form="state.cform" />
                            <fvariadic-element name="values" :form="state.cform" :tabs="true">
                                <template slot="variadic" slot-scope="props">
                                <finput :name="`${props.fname}.${props.id}.value`" :label="lang('b_text')" :is-required="true" :placeholder="lang('b_text_to_show')" type="text" :form="state.cform" />
                                <fselect :name="`${props.fname}.${props.id}.quantity`" :label="lang('b_quantity')" :is-required="true" :options="state.quantities" :form="state.cform" />
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
