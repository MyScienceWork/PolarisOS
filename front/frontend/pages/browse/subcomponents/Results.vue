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
                <p class="has-small-bottom-margin">
                    <span v-html="info.html"></span>
                    <span class="tag" :style="`background-color: ${get_color(info.type)}`">{{lang(info.subtype ? `t_${info.subtype.replace(/-/gi, '_')}` : info.denormalization.type.label)}}</span>
                    <span class="has-small-left-margin is-pulled-right tag is-warning" v-if="info.status === 'pending' && showStatus">
                        {{lang(`l_${info.status}_status`)}}
                    </span>
                    <span class="has-small-left-margin is-pulled-right tag is-danger" v-else-if="info.status === 'rejected' && showStatus">
                        {{lang(`l_${info.status}_status`)}}
                    </span>
                    <span class="has-small-left-margin is-pulled-right tag is-info" v-else-if="info.status === 'incomplete' && showStatus">
                        {{lang(`l_${info.status}_status`)}}
                    </span>
                    <span class="has-small-left-margin is-pulled-right tag is-light" v-else-if="info.status === 'withdrawn' && showStatus">
                        {{lang(`l_${info.status}_status`)}}
                    </span>
                    <span class="has-small-left-margin is-pulled-right tag is-success" v-else-if="showStatus">
                        {{lang(`l_${info.status}_status`)}}
                    </span>
                </p>
                <div class="level">
                    <div class="level-left">
                    </div>
                    <div class="level-right level is-mobile">
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
                                    @click.prevent="request_copy(info._id)"
                                >
                                    <span class="icon is-small"><i class="fa fa-lock"></i></span>
                                </a>
                            </template>
                            <router-link
                                class="level-item"
                                v-if="loggedIn"
                                :alt="lang('f_use_as_model')"
                                :title="lang('f_use_as_model')"
                                :to="`/deposit?type=model&_id=${info._id}`"
                            >
                                <span class="icon is-small"><i class="fa fa-book"></i></span>
                            </router-link>
                            <template v-if="loggedIn && can_modify(info)">
                                <router-link 
                                    v-if="!info.files || info.files.length === 0"
                                    class="level-item" 
                                    :alt="lang('f_modify_publication')" 
                                    :title="lang('f_modify_publication')"
                                    :to="`/deposit?type=modify-nf&_id=${info._id}`"
                                >
                                    <span class="icon is-small"><i class="fa fa-pencil"></i></span>
                                </router-link>
                                <router-link 
                                    v-else
                                    class="level-item" 
                                    :alt="lang('f_modify_publication')" 
                                    :title="lang('f_modify_publication')"
                                    :to="`/deposit?type=modify&_id=${info._id}`"
                                >
                                    <span class="icon is-small"><i class="fa fa-pencil"></i></span>
                                </router-link>
                            </template>
                            <router-link 
                                v-if="loggedIn && can_modify(info)"
                                class="level-item"
                                :alt="lang('f_deposit_new_file_version')"
                                :title="lang('f_deposit_new_file_version')"
                                :to="`/deposit?type=new_version&_id=${info._id}`"
                            >
                                <span class="icon is-small"><i class="fa fa-pencil-square-o"></i></span>
                            </router-link>
                            <social-sharing :url="`${host}/view/${info._id}`"
                              :title="info.title.content"
                              :description="info.abstracts.length > 0 ? info.abstracts[0].content : ''"
                              quote=""
                              hashtags="ined"
                              twitter-user="InedFr"
                              network-tag="a"
                              inline-template>
                                <network network="facebook" class="level-item">
                                    <span class="icon is-small"><i class="fa fa-facebook-official"></i></span>
                                </network>
                            </social-sharing>
                            <social-sharing :url="`${host}/view/${info._id}`"
                              :title="info.title.content"
                              :description="info.abstracts.length > 0 ? info.abstracts[0].content : ''"
                              quote=""
                              hashtags="ined"
                              twitter-user="InedFr"
                              network-tag="a"
                              inline-template>
                                <network network="twitter" class="level-item">
                                    <span class="icon is-small"><i class="fa fa-twitter"></i></span>
                                </network>
                            </social-sharing>
                        </div>
                    </div>
                </div><!-- Level buttons -->
                <div
                    v-if="(_oa_find(info, 'system.emails', []).length > 0 || _oa_find(info, 'system.depositor_comment')) && showStatus && info.status !== 'published'"
                >
                    <p v-if="_oa_find(info, 'system.depositor_comment')"><strong>{{lang('l_your_depositor_comment')}}</strong></p>
                    <p v-if="_oa_find(info, 'system.depositor_comment')">{{_oa_find(info, 'system.depositor_comment') | eol_to_br}}</p>
                    <div  v-for="email in _oa_find(info, 'system.emails', [])">
                        <p><strong>{{lang('l_comment')}} ({{_oa_find(email, 'created_at') | format_date('DD-MM-YYYY')}} {{lang('l_at')}} {{_oa_find(email, 'created_at') | format_date('HH:mm')}})</strong></p>
                        <p>{{_oa_find(email, 'body')}}</p>
                    </div>
                </div>
            </div>
        </article>
        <copy-requester
            :logged-in="loggedIn"
            :trigger.sync="state.copyRequest"
            :item="state.clickedItem"
        />
    </div>
</template>

<script>
    module.exports = require('./Results');
</script>
