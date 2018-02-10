<template>
    <div class="columns is-centered">
        <div class="column">
            <form @submit.prevent="search">
                <div class="field has-addons">
                    <p class="control has-icons-left is-expanded">
                        <finput type="text" :placeholder="lang('l_search')" name="search" :form="state.sinks.creations.search" label="" />
                        <span class="icon is-left">
                            <i class="fa fa-search"></i>
                        </span>
                        </p>
                    <p class="control">
                        <a class="icon has-text-info is-large" :alt="lang('l_search')" :title="lang('l_search')" @click="search">
                            <i class="fa fa-search fa-2x"></i>
                        </a>
                    </p>
                    <p class="control" v-if="hasFilter">
                        <a class="icon has-text-warning is-large" :alt="lang('l_filter')" :title="lang('l_filter')">
                            <i class="fa fa-filter fa-2x"></i>
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column">
        </div>
    </div>
</template>

<script>
    module.exports = require('./Searching');
</script>
