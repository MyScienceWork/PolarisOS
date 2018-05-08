<template>
    <form @submit.prevent="trigger_click">
        <div class="field has-addons">
            <p class="control has-icons-left is-expanded">
                <finput type="text" :placeholder="lang('f_search_in_archive')" name="search" :form="state.forms.ssink" label="" />
                <span class="icon is-left">
                    <i class="fa fa-search"></i>
                </span>
                </p>
            <p class="control">
                <a class="icon has-text-red swap is-large" :alt="lang('f_search')" :title="lang('f_search')" @click.prevent="trigger_click">
                    <i class="fa fa-search fa-2x"></i>
                </a>
            </p>
        </div>
    </form>
</template>

<script>
    module.exports = require('./SearchBar');
</script>
