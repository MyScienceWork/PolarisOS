<template>
    <div class="hero-body">
        <finput
            type='hidden'
            label=''
            :hiddenValue="publication_id"
            name="parent"
            :form="state.sinks.creations.publication"
            v-if="in_mode('new_version')"
        />
        <div class="container is-fluid">
            <div class="columns is-centered">
                <div class="column has-text-centered is-8">
                    <h4 class="title is-4">{{lang('l_help_bulk')}}</h4>
                </div>
            </div>
            <div v-for="publi in content_publi">
                <widget :collapsed="true">
                    <strong slot="title">{{publi.title.content}}</strong>
                    <div slot="body">
                        <div class="card">
                            <div class="card-content">
                                <div class="has-medium-font">
                                    <p class="has-small-bottom-margin"><span class="tag is-info">{{lang(publi.denormalization.type.label)}}</span></p>
                                    <h4 class="title is-4">{{lang('l_general_information')}}</h4>
                                    <p><strong>{{lang('l_publication_title')}}</strong> {{publi.title.content}}</p>
                                    <p><strong>{{lang('l_publication_author', {}, 'other')}}</strong>
                                        {{publi.denormalization.authors | join('_id.fullname')}}
                                    </p>
                                    <p><strong>{{lang('l_publication_year')}}</strong> {{publi.dates.publication | format_date('YYYY')}}</p>
                                    <p><strong>{{lang('l_publication_status')}}</strong> {{lang(`l_${publi.status}_status`)}}</p>
                                    <p><strong>{{lang('l_publication_update')}}</strong> {{publi.dates.update | format_date()}}</p>
                                    <p><strong>{{lang('l_publication_deposit')}}</strong> {{publi.dates.deposit | format_date()}}</p>
                                    <h4 class="title is-4 has-small-top-margin">{{lang('l_user_information')}}</h4>
                                    <p><strong>{{lang('l_publication_depositor')}}</strong> {{get_info(publi, 'denormalization.depositor.firstname')}} {{get_info(publi, 'denormalization.depositor.lastname')}}</p>
                                    <p><strong>{{lang('l_publication_reviewer')}}</strong> {{get_info(publi, 'denormalization.reviewer.firstname')}} {{get_info(publi, 'denormalization.reviewer.lastname')}}
                                    </p>
                                    <p><strong>{{lang('l_publication_depositor_comment')}}</strong></p>
                                    <p>{{_oa_find(publi, 'system.depositor_comment', lang('l_na')) | eol_to_br}}</p>
                                    <div v-for="email in _oa_find(publi, 'system.emails', [])">
                                        <p><strong>{{lang('l_comment')}} ({{_oa_find(email, 'created_at') | format_date('DD-MM-YYYY')}} {{lang('l_at')}} {{_oa_find(email, 'created_at') | format_date('HH:mm')}})</strong></p>
                                        <p>{{_oa_find(email, 'body')}}</p>
                                    </div>
                                    <h4 class="title is-4 has-small-top-margin">{{lang('l_detailed_information')}}</h4>
                                    <p><strong>{{lang('l_publication_diffusion_exports_nowhere')}}</strong> {{get_info(publi, 'diffusion.rights.exports.nowhere')}}</p>
                                    <p><strong>{{lang('l_publication_diffusion_exports_hal')}}</strong> {{get_info(publi, 'diffusion.rights.exports.hal')}}</p>
                                    <p><strong>{{lang('l_publication_research_teams')}}</strong> {{get_array_info(publi, 'denormalization.diffusion.research_teams', '_id.name')}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
            <div class="columns is-centered">
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <div class="columns is-centered">
                                <div class="column">
                                    <second-deposit-step
                                        :creation-sink="state.sinks.creations.publication"
                                        :publication-specs="state.sinks.creations.specs"
                                        key="0"
                                        subform-name="required"
                                        :validated="!unvalidated"
                                        :deposit-form="state.deposit_form_name"
                                        :review="in_mode('review')"
                                        @refetch-form="refetch_form"
                                    />
                                    <second-deposit-step
                                        :creation-sink="state.sinks.creations.publication"
                                        :publication-specs="state.sinks.creations.specs"
                                        key="1"
                                        subform-name="optional"
                                        :validated="!unvalidated"
                                        :deposit-form="state.deposit_form_name"
                                        :review="in_mode('review')"
                                        @refetch-form="refetch_form"
                                    />
                                    <second-deposit-step
                                        key="2"
                                        :creation-sink="state.sinks.creations.publication"
                                        :publication-specs="state.sinks.creations.specs"
                                        subform-name="permission"
                                        :validated="!unvalidated"
                                        :deposit-form="state.deposit_form_name"
                                        :review="in_mode('review')"
                                        @refetch-form="refetch_form"
                                    />
                                    <finput
                                        name="system.api.hal"
                                        type="checkbox"
                                        :form="state.sinks.creations.publication"
                                        label="Exporter de nouveau vers HAL ? (si oui cocher puis décocher la case)"
                                    />
                                    <finput
                                        name="system.api.hal_id"
                                        type="text"
                                        :form="state.sinks.creations.publication"
                                        label="HAL ID"
                                    />
                                    <div class="control">
                                        <button @click.prevent="review_publication"
                                                :disabled="success"
                                                class="button">{{lang('f_finish_review_step')}}
                                        </button>
                                        <button
                                                :disabled="success"
                                                @click.prevent="give_up"
                                                class="button">{{lang('f_give_up_button')}}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = require('./Bulk');
</script>
