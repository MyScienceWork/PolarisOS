<template>
    <div>
        <template v-if="boxed">
            <div :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
                <header class="card-header">
                    <p class="card-header-title" v-html="lang(title)"></p>
                </header>
                <div class="card-content">
                    <div class="columns is-centered">
                        <div class="column">
                            <widget-nav :form="form" />
                        </div>
                    </div>
                    <div class="columns is-centered">
                        <div class="column">
                            <article class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <img src="/public/front/imgs/icons/si-glyph-book-open.svg" alt="Image" />
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <div class="content">
                                        <p class="colored title is-4">Découvrir une collection</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
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
            <hr />
            <div class="columns is-centered">
                <div class="column">
                    <indexer :class="extraClasses.split(' ').filter(c => c != '')" :alphabet="['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']"/>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column"> 
                    <div class="field">
                        <div class="control has-text-centered">
                            <button :class="['button', ...extraClasses.split(' ').filter(c => c != '')]">{{lang('f_view_publications_button')}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    module.exports = require('./BrowseWidget');
</script>
