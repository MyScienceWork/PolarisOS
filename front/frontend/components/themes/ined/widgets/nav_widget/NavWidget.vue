<template>
<div>
    <p><strong>{{lang('f_browse_info')}}</strong></p>
    <ul class="list-icon">
        <li class="fa-bookmark" v-for="(obj, idx) in state.navigation"><router-link :class="['swap']" :to="`/browse?b=${obj.type}&i=${idx}`">{{lang(obj.text)}}</router-link></li>
    </ul>
</div>
</template>

<script>
    module.exports = require('./NavWidget');
</script>
