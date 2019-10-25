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
