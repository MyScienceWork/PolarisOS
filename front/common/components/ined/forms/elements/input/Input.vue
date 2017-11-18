<template>
<div class="field"
    v-if="type === 'text' || type === 'number' || type === 'password' || type === 'email'"
    >
    <label :for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
    <input v-if="type === 'text'" 
        type="text"
        :placeholder="placeholder"
        :name="name"
        class="input"
        v-model="state.value"
    />
    <input v-else-if="type === 'number'" 
        type="number"
        :placeholder="placeholder"
        :name="name"
        class="input"
        v-model="state.value"
    />
    <input v-else-if="type === 'password'" 
        type="password"
        :placeholder="placeholder"
        :name="name"
        class="input"
        v-model="state.value"
    />
    <input v-else 
        type="email"
        :placeholder="placeholder"
        :name="name"
        class="input"
        v-model="state.value"
    />
    <div v-if="validations.length > 0">
        <p v-for="text in validations" class="redify inline-block">
            {{text}}
        </p>
    </div>
</div>

<div v-else-if="type === 'textarea'" class="field">
    <label for="name">{{label}}<span v-if="isRequired" class="redify">*</span></label>
    <textarea
        class="input textarea"
        :placeholder="placeholder"
        :name="name"
        :rows="rows"
        v-model="state.value"
    />
</div>

<div v-else-if="type === 'radio'" class="field">
    <label :for="name">{{label}<span v-if="isRequired" class="redify">*</span></label>
    <div>
        <label v-for="(btn, idx) in radioButtons" class="radio-inline" for="btn[0]">
            <input
            type="radio"
            :name="name"
            v-model="state.value"
            />
            {{btn[1]}}
        </label>
    </div>
</div>

<div class="field" v-else-if="type === 'checkbox'">
    <div class="checkbox">
        <label :for="name">
            <input
            type="checkbox"
            :name="name"
            v-model="state.value"
            />
            {{label}}
        </label>
    </div>
</div>
</template>

<script>
    module.exports = require('./Input');
</script>
