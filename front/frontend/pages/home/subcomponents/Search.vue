<template>
<div>
    <div :class="{'columns is-centered has-small-bottom-margin': !this.noColumn}">
        <div :class="{'column has-no-bottom-padding': !this.noColumn}">
            <form @submit.prevent="trigger_click">
                <div class="field has-addons"  v-on-click-away="away">
                    <b-collapse :open.sync="state.collapse_opened" v-if="collapsible">
                        <p class="control has-icons-left is-expanded">
                            <finput type="text" :placeholder="lang('f_search_in_archive')" name="search"
                                :form="searchSink" label="" class="has-no-bottom-margin" />
                            <span class="icon is-left">
                                <i class="fa fa-search"></i>
                            </span>
                        </p>
                    </b-collapse>
                    <p class="control has-icons-left is-expanded" v-else>
                        <finput type="text" :placeholder="lang('f_search_in_archive')" name="search"
                            :form="searchSink" label="" class="has-no-bottom-margin" />
                        <span class="icon is-left">
                            <i class="fa fa-search"></i>
                        </span>
                    </p>
                    <p class="control">
                        <a :class="['button has-text-red swap']" :alt="lang('f_search')" :title="lang('f_search')"
                            @click.prevent="trigger_click"
                        >
                            <i :class="['fa fa-search']"></i>
                        </a>
                    </p>
                    <p class="control" v-if="showFavorites">
                        <a class="button has-text-warning" :alt="lang('f_save_search')" :title="lang('f_save_search')">
                            <i class="fa fa-star-o"></i>
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
    <div class="columns" v-if="showAdvancedSearch">
        <div class="column">
            <div class="level">
                <div class="level-left">

                </div>
                <div class="level-right">
                    <router-link
                        :class="`has-text-${color} swap`"
                        :alt="lang('f_advanced_search')"
                        :to="{ path: '/search', query: state.as_query }"
                        >{{lang('f_advanced_search')}}</router-link>
                </div>
            </div>
        </div>
    </div>
    <!--<div class="columns" v-if="state.showAdvanced && showAdvancedSearch">
        <div class="column">
            <faggregate-form :sink="searchSink" :specs="specs" @aggregate-search="trigger_click">
            </faggregate-form>
        </div>
    </div>-->
</div>
</template>

<script>
    module.exports = require('./Search');
</script>
