<template>
<form @submit.prevent="submit">
    <div class="columns is-centered" v-if="error.found && showErrors">
        <div class="column">
            <article class="message is-red">
                <div class="message-body">
                    <p><strong>An error occured -</strong> {{error.content.message}}</p>
                </div>
            </article>
        </div>
    </div>
    <div class="columns is-centered" v-else-if="success != null && success.length > 0 && showErrors">
        <div class="column">
            <article class="message is-green">
                <div class="message-body">
                    <p>{{success}}</p>
                </div>
            </article>
        </div>
    </div>
    <slot></slot>
    <div v-if="hasButtons" class="field is-grouped">
        <div class="control">
            <button class="button button-background-blue" v-if="loading">
                <i class="fa fa-spinner fa-spin m-right-xs"></i>
                Loading
            </button>
            <button v-else
                type="submit" @click="submit"
                class="button button-background-blue"
                >{{state.update_mode ? 'Modify' : 'Save'}}</button>
        </div>
        <div class="control">
            <button type="submit" @click="cancel" class="button button-background-red">Cancel</button>
        </div>
    </div>
    <slot v-else
        name="buttons" 
        :cancel="cancel"
        :submit="submit"
        :update_mode="state.update_mode"
    >
    </slot>
    <div class="columns is-centered" v-if="error.found && showErrors">
        <div class="column">
            <article class="message is-red">
                <div class="message-body">
                    <p><strong>An error occured -</strong> {{error.content.message}}</p>
                </div>
            </article>
        </div>
    </div>
    <div class="columns is-centered" v-else-if="success != null && success.length > 0 && showErrors">
        <div class="column">
            <article class="message is-green">
                <div class="message-body">
                    <p>{{success}}</p>
                </div>
            </article>
        </div>
    </div>
</form>
</template>

<script>
    module.exports = require('./Form');
</script>
