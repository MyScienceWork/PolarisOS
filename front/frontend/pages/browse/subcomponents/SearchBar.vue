<template>
<div>
    <div class="columns is-centered has-small-bottom-pargin">
        <div v-if="!showAdvancedSearch" class="column has-no-bottom-padding">
            <form @submit.prevent="search">
                <div class="field has-addons">
                    <p class="control has-icons-left is-expanded">
                        <finput :default="defaultSearch" type="text" :placeholder="lang(placeholder)" name="search" :form="searchSink" label="" class="has-no-bottom-margin "/>
                        <span class="icon is-left">
                            <i class="fa fa-search"></i>
                        </span>
                        </p>
                    <p class="control">
                    <a class="button has-text-red swap" :alt="lang('f_search')" :title="lang('f_search')" @click.prevent="search" @keyup.enter="search">
                            <i class="fa fa-search"></i>
                    </a>
                    </p>
                    <p class="control" v-if="useFavorites">
                        <a class="button has-text-warning" :alt="lang('f_save_search')" :title="lang('f_save_search')">
                            <i class="fa fa-star-o"></i>
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
    <div class="columns has-no-bottom-margin">
        <div class="column">
            <div class="level">
                <div class="level-left">
                </div>
                <div class="level-right">
                    <a v-if="!showAdvancedSearch" :class="`has-text-${color} swap`" href='' @click.prevent="show_advanced_search" :alt="lang('f_advanced_search')">{{lang('f_advanced_search')}}</a>
                    <a v-else :class="`has-text-${color} swap`" href='' @click.prevent="show_advanced_search" :alt="lang('f_normal_search')">{{lang('f_normal_search')}}</a>
                </div>
            </div>
        </div>
    </div>
    <div class="columns is-clearfix" v-if="showAdvancedSearch">
        <div class="column">
            <faggregate-form :sink="searchSink" :specs="specs" @aggregate-search="search">
            </faggregate-form>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./SearchBar');
</script>
