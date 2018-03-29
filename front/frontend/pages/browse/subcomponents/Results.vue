<template>
    <div>
        <article class="media" v-for="(info, idx) in items">
            <div class="media-left" v-if="isSelectable">
                <finput
                :name="info._id"
                type="checkbox"
                :form="exportSink"
                label=""
                />
            </div>
            <div class="media-content">
                <p v-html="info.html"></p>
                <div class="is-pulled-right level is-mobile">
                    <div class="level-left">
                        <router-link class="level-item" :alt="lang('f_view_publication')" :title="lang('f_view_publication')" :to="`/view/${info._id}`">
                        <span class="icon is-small"><i class="fa fa-eye"></i></span>
                        </router-link>
                        <template v-if="info.files && info.files.length > 0">
                            <a
                                 v-if="is_accessable(info)"
                                :href="generate_download_link(info)" 
                                class="level-item" 
                                :alt="lang('f_download_file')" 
                                :title="lang('f_download_file')"
                                target="_blank"
                            >
                                <span class="icon is-small"><i class="fa fa-unlock-alt"></i></span>
                            </a>
                            <a
                                v-else
                                class="level-item" 
                                :alt="lang('f_request_copy')" 
                                :title="lang('f_request_copy')"
                                @click.prevent="request_copy"
                            >
                                <span class="icon is-small"><i class="fa fa-lock"></i></span>
                            </a>
                        </template>
                        <a class="level-item" :alt="lang('f_share_on_fb')" :title="lang('f_share_on_fb')">
                            <span class="icon is-small"><i class="fa fa-facebook-official"></i></span>
                        </a>
                        <a class="level-item" :alt="lang('f_share_on_twitter')" :title="lang('f_share_on_twitter')">
                            <span class="icon is-small"><i class="fa fa-twitter"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </article>
        <copy-requester
            :logged-in="loggedIn"
            :trigger.sync="state.copyRequest"
        />
    </div>
</template>

<script>
    module.exports = require('./Results');
</script>
