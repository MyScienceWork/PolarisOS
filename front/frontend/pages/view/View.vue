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
                    </div>
                    <div class="card-content content">
                        <h3 class="title is-3">{{content_item.title}}</h3>
                        <h4 class="title is-4">{{_oa_find(content_item, 'denormalization.publishing_institution.name')}}</h4>
                        <p v-if="working_paper" v-html="working_paper"></p>
                      <p v-html="contributors.contributors"></p>
                      <ol>
                          <li v-for="affiliation in affiliations" v-html="affiliation"></li>
                        </ol>
                        <p v-if="content_item.doi">
                          <strong>DOI</strong> : <a class="break-word has-text-purple" target='_blank' :href='`https://doi.org/${content_item.doi}`'><span class="icon is-small"><i class="fa fa-external-link"></i></span>{{content_item.doi}}</a>
                        </p>
                        <p v-if="content_item.url">
                          <a class="break-word has-text-purple" target='_blank' :href='`${content_item.url}`'><span class="icon is-small"><i class="fa fa-external-link"></i></span>{{content_item.url}}</a>
                        </p>
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
