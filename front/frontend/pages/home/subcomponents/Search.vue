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
                        <a class="icon has-text-red swap is-large" :alt="lang('f_search')" :title="lang('f_search')" @click.prevent="trigger_click">
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
    <div class="columns">
        <div class="column">
            <a :class="`has-text-${color} swap`" href='' @click.prevent="state.showAdvanced = !state.showAdvanced" :alt="lang('f_advanced_search')">{{lang('f_advanced_search')}}</a>
        </div>
    </div>
    <div class="columns" v-if="state.showAdvanced"> 
        <div class="column">
            <faggregate-form :sink="state.forms.ssink" :specs="specs" @aggregate-search="trigger_click">
            </faggregate-form>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./Search');
</script>
