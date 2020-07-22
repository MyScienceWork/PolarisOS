<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <h4 class="has-small-top-margin title is-4">{{lang('l_validate_project_curator')}}</h4>
                        <div v-if="!show_curator_form() || Object.keys(user_forms(state.project_subform_name)).length === 0" class="columns is-centered">
                            <loader />
                        </div>
                        <div v-else>
                            <fselect
                                    :label="lang('f_choose_project_type')"
                                    :is-required="true"
                                    :options="project_type_options"
                                    :form="state.sinks.creations.project_type"
                                    name="type"
                                    fieldLabel="label"
                                    fieldValue="_id"
                                    :view-validation-texts="false"
                                    :translatable="true"
                                    @select-change="project_type_change"
                            />
                            <fform
                                    :name="state.sinks.creations.project"
                                    :hasButtons="!is_editing()"
                                    :post_path="state.paths.creations.project"
                                    :put_path="state.paths.creations.project"
                                    :get_path="state.paths.reads.project"
                                    :get_form="state.sinks.reads.project"
                                    :redirectAfterSuccess="true"
                                    redirectURI="/workflow?workflow=global"
                            >
                            <dynamic-form :form="user_forms(state.project_subform_name)" :cform="state.sinks.creations.project"/>
                            <widget :collapsed="true">
                                <strong slot="title" class="is-uppercase">{{lang('l_history')}}</strong>
                                <div v-if="historys" slot="body">
                                    <widget v-for="history in historys" :collapsed="false">
                                        <strong v-if="history.denormalization" slot="title">
                                            <time class="is-pulled-right" :datetime="history.updated_date">{{history.updated_date | format_date('LLL')}}</time>
                                            {{lang('l_step')}} {{lang(history.step)}} - {{lang(history.denormalization.label)}}</strong>
                                        <div slot="body">
                                            <strong slot="title">{{history.comment}}</strong>
                                        </div>
                                    </widget>
                                </div>
                            </widget>
                                <finput
                                    type='hidden'
                                    label=''
                                    :hiddenValue="project_id"
                                    name="_id"
                                    :form="state.sinks.creations.project"
                                />
                                <finput
                                    v-if="!is_editing()"
                                    type='hidden'
                                    label=''
                                    :hiddenValue="initial_state"
                                    name="state"
                                    :form="state.sinks.creations.project"
                                />
                                <button v-if="is_editing()"
                                        @click.prevent="back()"
                                        :disabled="success"
                                        class="button">{{lang('f_back')}}</button>
                                <button v-if="is_editing()"
                                        @click.prevent="open_review_modal(props)"
                                        :disabled="success"
                                        class="button">{{lang('f_finish_review')}}</button>
                                <review-modal
                                        @review-project="review_project"
                                        :sink="state.sinks.creations.project"
                                        :show.sync="state.show_review_modal"
                                        :status="after_status"
                                ></review-modal>
                            </fform>
                        </div>
                        <article class="message is-success" v-if="state.statuses.creations.project === 'ok'">
                            <div class="message-body">
                                {{lang('f_project_save_success')}}
                            </div>
                        </article>
                        <article class="message is-danger" v-if="state.statuses.creations.project === 'nok'">
                            <div class="message-body">
                                {{lang('f_project_save_failed')}}
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./DepositProjectCurator');
</script>
