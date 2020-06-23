<template>
<div :class="{'field': !isAddon}">
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
    <input v-if="type === 'hidden'"
        type="hidden"
        :name="name"
        :value="state.value"
        @input="update"
        :readonly="readonly"
    ></input>
    <div :class="[{'field': !isAddon}]" v-else-if="type === 'html-editor'">
        <label :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <b-tooltip class="is-dark" :label="lang(help)" multilined
            v-if="help != null && help.trim() !== '' && !readonly"
        >
            <a href='#' @click.prevent="toggleHelpModal" alt="Tooltip">
                <span class="icon has-text-info">
                  <i class="fa fa-question-circle"></i>
              </span>
            </a>
        </b-tooltip>
        <div :class="['control', {'is-expanded': hasAddons}]">
            <wysiwyg @change="update" :html="state.value" :placeholder="placeholder"  />
        </div>
    </div>
    <div :class="[{'field': !isAddon}]" v-else-if="type === 'ide-editor'">
        <label :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <b-tooltip class="is-dark" :label="lang(help)" multilined
            v-if="help != null && help.trim() !== '' && !readonly"
        >
            <a href='#' @click.prevent="toggleHelpModal" alt="Tooltip">
                <span class="icon has-text-info">
                  <i class="fa fa-question-circle"></i>
              </span>
            </a>
        </b-tooltip>
        <div :class="['control', {'is-expanded': hasAddons}]">
            <ace-editor @init="IDEInit" :value="state.value" @input="update" :lang="ideLang" theme="solarized_light" :height="`${rows ? rows : 10}rem`"  />
        </div>
    </div>
    <div :class="[{'field': !isAddon, 'is-hidden': readonly && emptyValue}]"
        v-else-if="type === 'text' || type === 'number' || type === 'password' || type === 'password-sha1'
        || type === 'email' || type === 'date' || type === 'date-year' || type === 'time'"
    >
    <label :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
        <b-tooltip class="is-dark" :label="lang(help)" multilined
            v-if="help != null && help.trim() !== '' && !readonly"
        >
            <a href='#' @click.prevent="toggleHelpModal" alt="Tooltip">
                <span class="icon has-text-info">
                  <i class="fa fa-question-circle"></i>
              </span>
            </a>
        </b-tooltip>
        <div :class="[{'field': !isAddon, 'has-addons': hasAddons, 'has-addons-right': hasAddons}]">
            <slot v-if="hasAddons" name="left-input-addons" />
            </slot>
            <div :class="['control', {'is-expanded': hasAddons}]">
                <input v-if="type === 'text'"
                    type="text"
                    :placeholder="placeholder"
                    :name="name"
                    :class="['input', {'is-danger': !viewValidationTexts && validations.length > 0}]"
                    :value="state.value"
                    @input="update"
                    @blur="blur"
                    :readonly="readonly"

                />
                <input v-else-if="type === 'number'"
                    type="number"
                    :placeholder="placeholder"
                    :name="name"
                    :class="['input', {'is-danger': !viewValidationTexts && validations.length > 0}]"
                    :value="state.value"
                    @blur="update"
                    :readonly="readonly"
                />
                <input v-else-if="type === 'password' || type === 'password-sha1'"
                    type="password"
                    :placeholder="placeholder"
                    :name="name"
                    :class="['input', {'is-danger': !viewValidationTexts && validations.length > 0}]"
                    :value="state.value"
                    @blur="update"
                    :readonly="readonly"
                />
                <b-datepicker
                    v-model="state.value"
                    v-else-if="type === 'date' && !readonly"
                    :value="state.value"
                    @input="update"
                    :first-day-of-week="1"
                    :readonly="readonly"
                    :placeholder="placeholder"
                    :class="[{'is-danger': !viewValidationTexts && validations.length > 0}]"
                    :min-date="get_min_date"
                    :max-date="get_max_date"
                ></b-datepicker>
                <input
                    v-else-if="type === 'date-year' && !readonly"
                    :value="state.value"
                    @blur="update"
                    type="number"
                    :min="yearRangeStart"
                    :max="yearRangeEnd"
                    :step="yearStep"
                    :readonly="readonly"
                    :placeholder="placeholder"
                    :name="name"
                    :class="['input', {'is-danger': !viewValidationTexts && validations.length > 0}]"
                    />
                <p v-else-if="type === 'date' && readonly">{{readonlyValue}}</p>
                <b-timepicker
                    v-else-if="type === 'time' && !readonly"
                    :placeholder="placeholder"
                    :value="state.value"
                    @input="update"
                    :readonly="readonly"
                    :class="[{'is-danger': !viewValidationTexts && validations.length > 0}]"
                    icon="clock-o" >
                </b-timepicker>
                <p v-else-if="type === 'time' && readonly">{{readonlyValue}}</p>
                <input v-else
                    type="email"
                    :placeholder="placeholder"
                    :name="name"
                    :class="['input', {'is-danger': !viewValidationTexts && validations.length > 0}]"
                    :value="state.value"
                    @input="update"
                    :readonly="readonly"
                />
            </div>
            <slot v-if="hasAddons" name="input-addons" />
        </div>
        <div v-if="validations.length > 0 && viewValidationTexts">
            <p v-for="text in validations" class="redify inline-block">
                {{lang(text)}}
            </p>
        </div>
        <div v-if="duplicate_warning && state.duplicate_warning_message.trim() !== ''">
            <p class="redify inline-block">
                {{lang(duplicate_warning_message)}}
            </p>
            <ul>
                <li v-for="item in state.duplicate_warning_items">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>

    <div v-else-if="type === 'textarea'" :class="['field', {'is-hidden': readonly && emptyValue}]">
        <label :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>

        <b-tooltip class="is-dark" :label="lang(help)" multilined
            v-if="help != null && help.trim() !== '' && !readonly"
        >
            <a href='#' @click.prevent="toggleHelpModal" alt="Tooltip">
                <span class="icon has-text-info">
                  <i class="fa fa-question-circle"></i>
              </span>
            </a>
        </b-tooltip>

        <div :class="['field']">
            <div class="control">
                <textarea
                    :class="['input textarea', {'is-danger': !viewValidationTexts && validations.length > 0}]"
                    :placeholder="placeholder"
                    :name="name"
                    :rows="rows"
                    :value="state.value"
                    @input="update"
                    @blur="blur"
                    v-if="!readonly"
                />
                <p v-else>{{state.value}}</p>
            </div>
            <div class="column is-half has-no-right-spaces has-no-left-spaces">
                <slot v-if="hasAddons" name="input-addons" />
                </slot>
            </div>
        </div>
        <div v-if="validations.length > 0 && viewValidationTexts">
            <p v-for="text in validations" class="redify inline-block">
                {{lang(text)}}
            </p>
        </div>
        <div v-if="duplicate_warning && state.duplicate_warning_message.trim() !== ''">
            <p class="redify inline-block">
                {{lang(duplicate_warning_message)}}
            </p>
            <ul>
                <li v-for="item in state.duplicate_warning_items">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>

    <div v-else-if="type === 'radio'" class="field">
        <label :for="name">{{label}<span v-if="isRequired" class="redify">*</span></label>
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
            <label v-for="(btn, idx) in radioButtons" class="radio-inline" for="btn[0]">
                <input
                type="radio"
                :name="name"
                :value="state.value"
                @input="update"
                :disabled="readonly"
                />
                {{btn[1]}}
            </label>
        </div>
    </div>

    <div class="control" v-else-if="type === 'checkbox' && isAddon">
        <span class="button">
            <input
            type="checkbox"
            :name="name"
            :value="state.value"
            :checked="state.value"
            @change="update"
            :disabled="readonly"
            />
        </span>
    </div>

    <div class="field" v-else-if="type === 'checkbox' && !isAddon">
        <div class="checkbox">
            <label :for="name">
                <input
                type="checkbox"
                :name="name"
                :value="state.value"
                :checked="state.value"
                @change="update"
                :disabled="readonly"
                />
                {{label}}
            </label>
        </div>
        <b-tooltip class="is-dark" :label="lang(help)" multilined
            v-if="help != null && help.trim() !== '' && !readonly"
        >
            <a href='#' @click.prevent="toggleHelpModal" alt="Tooltip">
                <span class="icon has-text-info">
                  <i class="fa fa-question-circle"></i>
              </span>
            </a>
      </b-tooltip>
    </div>
</div>
</template>

<script>
    module.exports = require('./Input');
</script>
