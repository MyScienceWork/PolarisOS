<template>
<div>
    <div class="columns is-centered">
        <div class="column">
            <form @submit.prevent="trigger_click">
                <div class="field has-addons">
                    <p class="control has-icons-left is-expanded">
                        <finput type="text" :placeholder="lang('f_search_in_archive')" name="search" :form="state.forms.ssink" label="" />
                        <span class="icon is-left">
                            <i class="fa fa-search"></i>
                        </span>
                        </p>
                    <p class="control">
                        <a class="icon has-text-info is-large" :alt="lang('f_search')" :title="lang('f_search')" @click="trigger_click">
                            <i class="fa fa-search fa-2x"></i>
                        </a>
                    </p>
                    <p class="control">
                        <a class="icon has-text-warning is-large" :alt="lang('f_save_search')" :title="lang('f_save_search')">
                            <i class="fa fa-star-o fa-2x"></i>
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
    <hr />
    <div class="columns is-centered">
        <div class="column">
            <p><strong>{{lang('f_browse_info')}}</strong></p>
            <ul class="list-icon">
                <li class="fa-circle" v-for="(obj, idx) in navItems"><router-link :class="['swap']" :to="`/browse?b=${obj.type}&i=${idx}&entity=${obj.entity}`">{{lang(obj.text)}}</router-link></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./Discovery');
</script>
