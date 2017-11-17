<template>
    <div v-if="boxed" :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
        <header class="card-header">
            <p class="card-header-title" v-html="lang(title)"></p>
        </header>
        <div class="card-content">
            <article class="media" v-for="info in state.infos">
                <div class="media-content">
                    <template v-if="type === 'publication'">
                        <p v-html="info.master_content" />
                        <div class="is-pulled-right level is-mobile">
                            <div class="level-left">
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fa fa-eye"></i></span>
                                </a>
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fa fa-file"></i></span>
                                </a>
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fa fa-facebook-official"></i></span>
                                </a>
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fa fa-twitter"></i></span>
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
            </article>
        </div>
    </div>
    <div v-else>
        <div :class="['card', 'info-card', ...extraClasses.split(' ').filter(c => c != '')]">
            <div class="card-content">
                <article class="media" v-for="info in state.infos">
                    <div class="media-content">
                        <template v-if="type === 'publication'">
                            <p v-html="info.master_content" />
                            <div class="is-pulled-right level is-mobile">
                                <div class="level-left">
                                    <a class="level-item">
                                        <span class="icon is-small"><i class="fa fa-eye"></i></span>
                                    </a>
                                    <a class="level-item">
                                        <span class="icon is-small"><i class="fa fa-file"></i></span>
                                    </a>
                                    <a class="level-item">
                                        <span class="icon is-small"><i class="fa fa-facebook-official"></i></span>
                                    </a>
                                    <a class="level-item">
                                        <span class="icon is-small"><i class="fa fa-twitter"></i></span>
                                    </a>
                                </div>
                            </div>
                        </template>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./ListWidget');
</script>
