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
                <div class="card">
                    <div class="columns" v-if="header != null && header !== ''">
                        <div class="column" v-html="lang(header)">
                        </div>
                    </div>
                    <div class="columns" v-if="help != null && help !== ''">
                        <div class="column" v-html="lang(help)">
                        </div>
                    </div>
                    <dynamic-form
                    :form="$store.state.forms[state.specs].content || {}"
                    :cform="state.cform"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = require('./CrudForm');
</script>
