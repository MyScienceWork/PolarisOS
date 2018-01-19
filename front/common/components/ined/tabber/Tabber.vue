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
        <slot
            name="tabs" 
            :id="state.current"
        >
        </slot>
    </div>
</template>

<script>
    module.exports = require('./Tabber');
</script>
