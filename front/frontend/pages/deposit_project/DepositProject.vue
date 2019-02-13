<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <h4 class="has-small-top-margin title is-4">{{lang('l_deposit_project')}}</h4>
                        <div v-if="Object.keys(user_forms('project_form')).length === 0" class="columns is-centered">
                            <loader />
                        </div>
                        <div v-else>
                            <fform
                                    :name="state.sinks.creations.project"
                                    :hasButtons="!is_editing()"
                                    :post_path="state.paths.creations.project"
                                    :put_path="state.paths.creations.project"
                                    :get_path="state.paths.reads.project"
                                    :get_form="state.sinks.reads.project"
                            >
                            <dynamic-form :form="user_forms('project_form')" :cform="state.sinks.creations.project"/>
                                <finput
                                    type='hidden'
                                    label=''
                                    :hiddenValue="project_id"
                                    name="parent"
                                    :form="state.sinks.creations.publication"
                                />
                                <finput
                                    type='hidden'
                                    label=''
                                    :hiddenValue="initial_state"
                                    name="state"
                                    :form="state.sinks.creations.project"
                                />
                            </fform>
                            <button v-if="is_editing()"
                                    @click.prevent="open_review_modal(props)"
                                    :disabled="success"
                                    class="button">{{lang('f_finish_review')}}</button>
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
    <review-modal
            @review-publication="review_publication"
            :sink="state.sinks.creations.project"
            :show.sync="state.show_review_modal"
    />
</div>
</template>

<script>
module.exports = require('./DepositProject');
</script>
