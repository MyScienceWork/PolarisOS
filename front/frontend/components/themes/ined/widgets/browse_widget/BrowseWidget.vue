<template>
    <div>
        <template v-if="boxed">
            <div :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
                <header class="card-header">
                    <p class="card-header-title" v-html="lang(title)"></p>
                </header>
                <div class="card-content">

                </div>
            </div>
        </template>
        <template v-else>
            <div class="control">
                <v-select
                    :multiple="true"
                    :options="state.options"
                    :label="lang('b_browse_select')"
                    :on-change="onChange"
                    :value="state.selected"
                    class="input"
                >
                </v-select>
            </div> 
                <indexer class="indexer-red" :alphabet="['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']"/>
        </template>
    </div>
</template>

<script>
    module.exports = require('./BrowseWidget');
</script>
