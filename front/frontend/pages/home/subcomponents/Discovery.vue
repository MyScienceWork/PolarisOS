<template>
<div>
    <div class="columns is-centered">
        <div class="column">
            <p><strong>{{lang('f_browse_info')}}</strong></p>
            <ul class="list-styled is-square">
                <li class="" v-for="(obj, idx) in navItems"><router-link :class="['swap']" :to="`/browse?b=${obj.type}&i=${idx}&entity=${obj.entity}`">{{lang(obj.text)}}</router-link></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./Discovery');
</script>
