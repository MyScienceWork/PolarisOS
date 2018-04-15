<template>
    <div>
        <div class="columns">
            <div class="column">
                <div class="is-pulled-right">
                    <a href='#' @click="generate_form">{{lang(text)}}</a>
                </div>
            </div>
        </div>
        <div v-if="state.showForm" class="columns">
            <div class="column">
                <div class="card card-border-color-turquoise">
                    <div class="columns" v-if="header != null && header !== ''">
                        <div class="column" v-html="lang(header)">
                        </div>
                    </div>
                    <div class="columns" v-if="help != null && help !== ''">
                        <div class="column" v-html="lang(help)">
                        </div>
                    </div>
                    <fform
                        :name="state.cform" 
                        :post_path="postPath" 
                        :put_path="putPath"
                        :get_path="getPath"
                        get_form="dummy_form"
                        @form-cancel="state.showForm = false"
                        @form-success-reset="reload_form"
                    >
                        <dynamic-form
                        :form="$store.state.forms[state.specs].content || {}"
                        :cform="state.cform"
                        @crud-form-change="refetch_form"
                        class="field"
                        />
                    </fform>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = require('./CrudForm');
</script>
