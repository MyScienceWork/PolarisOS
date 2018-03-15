<template>
    <div>
        <div class="tabs">
            <ul>
                <li
                :class="{'is-active': state.current === idx}"
                :key="idx" 
                @click="go(idx, $event)" 
                v-for="(text, idx) in tabs">
                    <a>{{text}}</a>
                </li>
            </ul>
        </div>
        <template v-if="variadic">
            <div 
                v-for="(text, idx) in tabs"
                v-show="state.current === idx"
            >
                <slot
                    :id="idx"
                    :length="tabs.length"
                    name="body"
                >
                </slot>
            </div>
        </template>
        <slot
            v-else
            :length="tabs.length"
            :id="state.current"
            name="body"
        >
        </slot>
    </div>
</template>

<script>
    module.exports = require('./Tabber');
</script>
