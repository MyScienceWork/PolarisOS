<template>
    <div :class="{'field': !isAddon, 'is-hidden': isHidden}">
        <label 
            v-if="label.trim().length > 0"
            :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <a href='#' @click.prevent="toggleHelpModal" :title="lang(help)" :alt="lang(help)" v-if="help != null && help.trim() !== ''">
            <span class="icon has-text-info">
              <i class="fa fa-question-circle"></i>
          </span>
        </a>
        <div :class="{'field': !isAddon, 'has-addons': hasAddons}">
            <div :class="['control', {'is-expanded': hasAddons}]">
                <ul v-if="readonly && multi">
                    <li v-for="selected in readonlyValue">{{selected}}</li> 
                </ul>
                <p v-else-if="readonly">{{readonlyValue}}</p>
                <v-select
                    v-else
                    :multiple="multi"
                    :options="state.options"
                    :on-change="onChange"
                    :value="state.selected"
                    :placeholder="placeholder"
                    :class="['input', {'readonly': readonly, 'is-danger': !viewValidationTexts && validations.length > 0}]"
                >
                </v-select>
            </div> 
            <slot v-if="hasAddons" name="input-addons" />
            </slot>
        </div>
        <div v-if="validations.length > 0 && viewValidationTexts">
            <p v-for="text in validations" class="redify inline-block">
                {{lang(text)}}
            </p>
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
module.exports = require('./Select');
</script>
