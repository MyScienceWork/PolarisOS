<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title"></span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                            <div v-for="content in row" class="column">
                                <widget>
                                    <span slot="title">
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(content)"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(content, 'function')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{content.name}} ({{content.type}}) 
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
                    <span slot="title"></span>
                    <div slot="body">
                        <fform
                            :name="state.forms.csink" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.forms.rsink"
                            >
                                <finput name="name" :label="lang('b_name')" :is-required="true" :placeholder="lang('b_name')" type="text" :form="state.forms.csink" />
                                <finput name="type" :label="lang('b_type')" :is-required="true" :placeholder="lang('b_type')" type="text" :form="state.forms.csink" />
                                <h4 class="title is-3">{{lang('b_function_argument', {}, 'other')}}</h4>
                                <hr />
                                <fvariadic-element 
                                    name="arguments" 
                                    :form="state.forms.csink" 
                                    :tabs="true">
                                    <template slot="variadic" slot-scope="props">
                                        <finput 
                                            :name="`${props.fname}.${props.id}.name`"
                                            :label="lang('b_name')" 
                                            :is-required="true" 
                                            :placeholder="lang('b_name')" 
                                            type="text" 
                                            :form="state.forms.csink"
                                        />
                                        <finput 
                                            :name="`${props.fname}.${props.id}.type`"
                                            :label="lang('b_type')" 
                                            :is-required="true" 
                                            :placeholder="lang('b_type')" 
                                            type="text" 
                                            :form="state.forms.csink"
                                        />
                                        <finput 
                                            :name="`${props.fname}.${props.id}.default`"
                                            :label="lang('b_default_value')" 
                                            :is-required="true" 
                                            :placeholder="lang('b_default_value')" 
                                            type="text" 
                                            :form="state.forms.csink" 
                                        />
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
module.exports = require('./Function');
</script>
