<template>
    <div class="field">
        <label v-if="label.trim().length > 0" :for="name">{{label}}</label>

        <b-tooltip class="is-dark" :label="lang(help)" multilined
            v-if="help != null && help.trim() !== '' && !readonly"
        >
            <a href='#' @click.prevent="toggleHelpModal" alt="Tooltip">
                <span class="icon has-text-info">
                  <i class="fa fa-question-circle"></i>
              </span>
            </a>
        </b-tooltip>
        <div class="control">
            <ul v-if="type === 'static-list'">
                <li v-for="item in state.value" v-html='item'></li> 
            </ul>
            <p v-else-if="type === 'static-text'" v-html='state.value'></p>
            <div v-else-if="type === 'static-html'" v-html='state.value'></div>
        </div>

        <b-modal :active.sync="state.showHelpModal">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">{{lang('l_form_help_modal')}}</p>
                    <button class="delete" aria-label="close" @click.prevent="state.showHelpModal = false"></button>
                </header>
                <div class="modal-card-body">
                    <div class="columns is-centered">
                        <div class="column">
                            <p v-if="help != null && help.trim() !== ''" v-html="lang(help)"></p>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>

</template>

<script>
module.exports = require('./Static');
</script>
