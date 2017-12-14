<template>
<input v-else-if="type === 'hidden'"
    type="hidden"
    :name="name"
    v-model="state.value"
    :readonly="readonly"
></input>
<div :class="[{'field': !isAddon, 'is-hidden': readonly && emptyValue}]"
    v-else-if="type === 'text' || type === 'number' || type === 'password' || type === 'email'"
>
    <label :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
    <div :class="[{'field': !isAddon, 'has-addons': hasAddons}]">
        <div :class="['control', {'is-expanded': hasAddons}]">
            <input v-if="type === 'text'" 
                type="text"
                :placeholder="placeholder"
                :name="name"
                class="input"
                v-model="state.value"
                :readonly="readonly"

            />
            <input v-else-if="type === 'number'" 
                type="number"
                :placeholder="placeholder"
                :name="name"
                class="input"
                v-model="state.value"
                :readonly="readonly"
            />
            <input v-else-if="type === 'password'" 
                type="password"
                :placeholder="placeholder"
                :name="name"
                class="input"
                v-model="state.value"
                :readonly="readonly"
            />
            <input v-else 
                type="email"
                :placeholder="placeholder"
                :name="name"
                class="input"
                v-model="state.value"
                :readonly="readonly"
            />
        </div>
        <slot v-if="hasAddons" name="input-addons" />
        </slot>
    </div>
    <div v-if="validations.length > 0">
        <p v-for="text in validations" class="redify inline-block">
            {{lang(text)}}
        </p>
    </div>
</div>

<div v-else-if="type === 'textarea'" :class="['field', {'is-hidden': readonly && emptyValue}]">
    <label :class="{readonly: readonly}" :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
    
    <div :class="['field']">
        <div class="control">
            <textarea
                class="input textarea"
                :placeholder="placeholder"
                :name="name"
                :rows="rows"
                v-model="state.value"
                v-if="!readonly"
            />
            <p v-else>{{state.value}}</p>
        </div>
        <div class="column is-half has-no-right-spaces has-no-left-spaces">
            <slot v-if="hasAddons" name="input-addons" />
            </slot>
        </div>
    </div>
    <div v-if="validations.length > 0">
        <p v-for="text in validations" class="redify inline-block">
            {{lang(text)}}
        </p>
    </div>
</div>

<div v-else-if="type === 'radio'" class="field">
    <label :for="name">{{label}<span v-if="isRequired" class="redify">*</span></label>
    <div>
        <label v-for="(btn, idx) in radioButtons" class="radio-inline" for="btn[0]">
            <input
            type="radio"
            :name="name"
            v-model="state.value"
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
        v-model="state.value"
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
            v-model="state.value"
            :disabled="readonly"
            />
            {{label}}
        </label>
    </div>
</div>
</template>

<script>
    module.exports = require('./Input');
</script>
