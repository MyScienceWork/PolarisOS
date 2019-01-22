<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div v-if="Object.keys(user_forms('project_form')).length === 0" class="columns is-centered">
                            <loader />
                        </div>
                        <div v-else>
                            <dynamic-form  :form="user_forms('project_form')" :cform="state.sinks.creations.project"/>
                            <button
                                    @click.prevent="save('project')"
                                    class="button button-background-green has-small-top-margin has-small-bottom-margin">
                                {{lang('f_save_project')}}
                            </button>
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
