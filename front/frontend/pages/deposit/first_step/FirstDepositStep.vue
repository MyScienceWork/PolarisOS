<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content">
                <div class="columns is-centered">
                    <div class="column">
                        <fselect 
                            :label="lang('f_choose_document_type')"
                            :is-required="true"
                            :options="typology_options"
                            :form="creationSink"
                            name="type"
                            class="has-text-centered"
                            fieldLabel="label"
                            fieldValue="_id"
                            @select-change="grab_typology_form"
                            />
                            <finput
                                type="hidden"
                                label='dummy'
                                :hidden-value="state.typology.name"
                                :form="creationSink"
                                name="type"
                            />
                    </div>
                </div> 
                <div class="columns is-centered" v-if="Object.keys(upload_form).length > 0 || Object.keys(import_form).length > 0">
                    <div class="column" v-if="Object.keys(upload_form).length > 0">
                        <div class="card card-equal-height">
                            <div class="card-content card-equal-height">
                                <div class="columns is-centered">
                                    <div class="column has-text-centered">
                                        <h4 class="title is-4">{{lang('f_upload_deposit_file')}}</h4>
                                        <p v-html="lang('f_upload_deposit_file_help')"></p>
                                    </div>
                                </div>
                                <dynamic-form :form="upload_form" :cform="creationSink"/>
                                <!--<fdropzone form="dummy_form" name="name" master="master" files="files" />-->
                            </div>
                        </div>
                    </div>
                    <div class="column" v-if="Object.keys(import_form).length > 0">
                        <div class="card card-equal-height">
                            <div class="card-content card-equal-height">
                                <div class="columns is-centered">
                                    <div class="column has-text-centered">
                                        <h4 class="title is-4">{{lang('f_import_from_id')}}</h4>
                                        <p v-html="lang('f_import_from_id_help')"></p>
                                    </div>
                                </div>
                                <div class="columns is-centered">
                                    <div class="column">
                                        <div class="field has-addons">
                                            <div class="control is-expanded">
                                                <input v-model="state.search_id" class="input" type="text" :placeholder="lang('f_complete_publication_using_doi')">
                                            </div>
                                            <div class="control">
                                                <a class="button is-info" @click="import_from_id">
                                                    {{lang('f_search')}} 
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-centered">
                                    <div class="column">
                                        <p v-if="state.import_state === 'loading'">{{lang('l_import_in_progress')}}</p>
                                        <p v-else-if="state.import_state === 'fail'">{{lang('l_import_failed')}}</p>
                                        <p v-else-if="state.import_state === 'success'">{{lang('l_import_succeeded')}}</p>
                                    </div>
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
    module.exports = require('./FirstDepositStep');
</script>
