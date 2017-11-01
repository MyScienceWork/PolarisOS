<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">List of users</span>
                    <div slot="body">
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="200" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">Add or modify a user</span>
                    <div slot="body">
                        <fform 
                            :name="state.cform" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            >
                            <finput name="name" :label="lang('b_form_name')" :is-required="true" :placeholder="lang('b_form_name')" type="text" :form="state.cform" />
                            <h3 class="title is-3 has-no-bottom-margin">{{lang('b_field', {}, 'other')}}</h3>
                            <hr class="has-no-top-margin" />
                            <fvariadic-element name="fields" :form="state.cform">
                                <template slot="variadic" slot-scope="props">
                                <finput :name="`${props.fname}.${props.id}.name`" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.cform" />
                                <finput :name="`${props.fname}.${props.id}.label`" :label="lang('b_label')" :is-required="true" :placeholder="lang('b_label')" type="text" :form="state.cform" />
                                <finput :name="`${props.fname}.${props.id}.order`" :label="lang('b_field_order')" :is-required="true" :placeholder="lang('b_field_order')" type="number" :form="state.cform" />
                                <finput :name="`${props.fname}.${props.id}.multiple`" :label="lang('b_field_multiple')" :placeholder="lang('b_field_multiple')" type="checkbox" :form="state.cform" />
                                <fselect 
                                    :name="`${props.fname}.${props.id}.type`" 
                                    :label="lang('b_field_type')" 
                                    :is-required="true" 
                                    :options="fieldtypes" 
                                    :form="state.cform" 
                                    v-on:select-change="(val) => {type_change(val, props.id)}"
                                />
                                <div v-if="props.id in state.selected_types"> 
                                    <div v-if="state.selected_types[props.id] === 'select'">
                                    </div>
                                    <div v-else-if="['text', 'phone', 'number', 'email', 'password'].indexOf(state.selected_types[props.id]) !== -1">
                                        <finput :name="`${props.fname}.${props.id}.placeholder`" :label="lang('b_placeholder')" :is-required="true" :placeholder="lang('b_placeholder')" type="text" :form="state.cform" />
                                    </div>
                                </div>
                                <div v-else>
                                    Testing
                                </div>
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
module.exports = require('./Form');
</script>
