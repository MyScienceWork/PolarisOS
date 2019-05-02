<template>
    <div :class="{'field': !isAddon, 'is-hidden': isHidden}">
        <label
            v-if="label.trim().length > 0"
            :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>

        <b-tooltip class="is-dark" :label="lang(help)" multilined
            v-if="help != null && help.trim() !== '' && !readonly"
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
                <ul v-if="readonly && multi">
                    <li v-for="selected in readonlyValue">{{selected}}</li>
                </ul>
                <p v-else-if="readonly">{{readonlyValue}}</p>
                <label v-for="(item) in state.options" class="radio">
                    <input type="radio" :id=item.value :name="name" :value=item.value @change="onChange" :checked="item.value===state.selected.value ? 'checked' : ''">
                    <label :for=item.value>{{item.label}}</label>
                    <br>
                </label>

                <!--
                <v-select
                    v-else-if="!ajax"
                    :multiple="multi"
                    :options="state.options"
                    :on-change="onChange"
                    :value="state.selected"
                    :placeholder="placeholder"
                    :reset-on-options-change="resetOnOptionsChange"
                    :class="[{'readonly': readonly, 'is-danger': !viewValidationTexts && validations.length > 0}]"
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
                    :value="state.selected"
                    :placeholder="placeholder"
                    :filter-by="filterFunction"
                    :reset-on-options-change="resetOnOptionsChange"
                    @search="onSearch"
                    :class="[{'readonly': readonly, 'is-danger': !viewValidationTexts && validations.length > 0}]"
                >
                    <span slot="no-options">{{lang('l_no_select_options')}}</span>
                </v-select>
                -->
            </div>
            <slot v-if="hasAddons" name="input-addons" />
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
module.exports = require('./Radio');
</script>
