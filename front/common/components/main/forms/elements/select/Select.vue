<template>
    <div :class="{'field': !isAddon, 'is-hidden': isHidden}">
        <label
            v-if="label.trim().length > 0"
            :class="{readonly: getReadonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>

        <b-tooltip class="is-dark" :label="lang(help)" multilined
            v-if="help != null && help.trim() !== '' && !getReadonly"
        >
            <a href='#' @click.prevent="toggleHelpModal" alt="Tooltip">
                <span class="icon has-text-info">
                  <i class="fa fa-question-circle"></i>
              </span>
            </a>
        </b-tooltip>
        <div :class="{'field': !isAddon, 'has-addons': hasAddons, 'has-addons-right': hasAddons}">
            <slot v-if="hasAddons" name="left-input-addons" />
            <div :class="['control', {'is-expanded': hasAddons}]">
                <ul v-if="getReadonly && multi">
                    <li v-for="selected in readonlyValue">{{selected}}</li>
                </ul>
                <p v-else-if="getReadonly">{{readonlyValue}}</p>
                <v-select
                    v-else-if="!ajax"
                    :multiple="multi"
                    :options="state.options"
                    :on-change="onChange"
                    :value="dynamic_value"
                    :placeholder="placeholder"
                    :reset-on-options-change="resetOnOptionsChange"
                    :class="[{'readonly': getReadonly, 'is-danger': !viewValidationTexts && validations.length > 0}]"
                    :filter-by="filterFunction"
                >
                    <span slot="no-options">{{lang('l_no_select_options')}}</span>
                </v-select>
                <v-select
                    v-else
                    :multiple="multi"
                    :filterable="false"
                    :options="state.options"
                    :on-change="onChange"
                    :value="dynamic_value"
                    :placeholder="placeholder"
                    :filter-by="filterFunction"
                    :reset-on-options-change="resetOnOptionsChange"
                    @search="onSearch"
                    :class="[{'readonly': getReadonly, 'is-danger': !viewValidationTexts && validations.length > 0}]"
                >
                    <span slot="no-options">{{lang('l_no_select_options')}}</span>
                </v-select>
                <ul v-if="multi && !getReadonly && state.selected_readonly">
                    <li v-for="selected in readonlyValue">{{selected}}</li>
                </ul>
                <p v-else-if="state.selected_readonly && !getReadonly">{{readonlyValue}}</p>
            </div>
            <slot v-if="hasAddons" name="input-addons">
            </slot>
        </div>
        <div v-if="hasAddons" :class="[{'field': !isAddon, 'has-addons': hasAddons, 'has-addons-right': hasAddons}]">
          <slot name="search-addons">
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
