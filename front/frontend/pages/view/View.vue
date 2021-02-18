<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns" v-if="content_item && Object.keys(content_item).length > 0">
            <div class="column is-8">
                <div class="card card-equal-height card-with-tag">
                    <div class="card-header">
                        <a href='#' class="card-header-icon card-header-tag is-left">
                            <span class="tag is-purple is-active">{{lang(content_item.denormalization.group.label)}}</span>
                        </a>
                        <div class="card-header-title">
                        </div>
                    </div>
                    <div class="card-content content">
                        <h3 class="title is-3">{{content_item.title}}</h3>
                        <div>
                            <widget :collapsed="true">
                                <span slot="title">{{lang('f_publication_information')}}</span>
                                <div slot="body">
                                    <p><strong v-html="lang('f_publication_deposit_date')"></strong> {{date('deposit_date') | format_date('MM/DD/YYYY')}}</p>
                                </div>
                            </widget>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns is-centered" v-else>
            <div class="column is-8">
                <p v-html="lang('l_unexisting_item_view')"></p>
            </div>
        </div>
        <copy-requester
            :logged-in="state.loggedIn"
            :trigger.sync="state.copyRequest"
            :item="content_item._id"
        />
    </div>
</div>
</template>

<script>
module.exports = require('./View');
</script>
