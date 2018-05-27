<template>
    <div class="form-group">
        <b-modal :active.sync="state.showHelpModal">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">{{lang('l_form_help_modal')}}</p>
                    <button class="delete" aria-label="close" @click.prevent="state.showHelpModal = false"></button>
                </header>
                <div class="modal-card-body">
                    <div class="columns is-centered">
                        <div class="column">
                            <p v-if="help != null" v-html="lang(help)"</p>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <label :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <b-tooltip class="is-dark" :label="lang(help)" multilined
            v-if="help != null && help.trim() !== '' && !readonly"
        >
            <a href='#' @click.prevent="toggleHelpModal" alt="Tooltip">
                <span class="icon has-text-info">
                  <i class="fa fa-question-circle"></i>
              </span>
            </a>
        </b-tooltip>
        <div>
            <button @click.prevent="state.show = !state.show" class="btn color-box" :style="`background-color: ${state.value}`"></button>
            <div v-if="state.show" style="position:absolute; z-index:2;" v-on-click-away="away">
                <sketch-picker @input="update" :value="state.value" />
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./Color');
</script>
