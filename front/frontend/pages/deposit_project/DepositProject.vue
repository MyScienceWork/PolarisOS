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
                                    :post_path="state.paths.creations.project"
                                    :put_path="state.paths.creations.project"
                                    :get_path="state.paths.reads.project"
                                    :get_form="state.sinks.reads.project"
                            >
                            <dynamic-form :form="user_forms('project_form')" :cform="state.sinks.creations.project"/>
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
module.exports = require('./DepositProject');
</script>
