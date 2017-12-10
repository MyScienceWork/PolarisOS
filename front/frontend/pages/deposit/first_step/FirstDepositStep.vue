<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content">
                <div class="columns is-centered">
                    <div class="column">
                        <fhselect 
                            :label="lang('f_choose_document_type')"
                            :is-required="true"
                            :title="lang('f_type_of_document')"
                            :options="typology_options"
                            :form="creationSink"
                            name="type"
                            class="has-text-centered"
                            fieldValue="form"
                            @hierarchical-select-change="grab_typology_form"
                        />
                    </div>
                </div> 
                <div class="columns is-centered" v-if="Object.keys(upload_form).length > 0">
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
                    <!--<div class="column" v-if="grab_typology_child(state.chosen_doc_type).completable">
                        <div class="card card-equal-height">
                            <div class="card-content">
                                <div class="columns is-centered">
                                    <div class="column has-text-centered">
                                        <h4 class="title is-4">{{lang('f_auto_fill_metadata')}}</h4>
                                        <p v-html="lang('f_auto_fill_metadata_help')"></p>
                                    </div>
                                </div>
                                <div class="columns is-centered">
                                    <div class="column">
                                        <div class="field has-addons">
                                            <p class="control">
                                            <span class="select">
                                                <select>
                                                    <option>DOI</option>
                                                    <option>INED</option>
                                                    <option>ISBN</option>
                                                </select>
                                            </span>
                                            </p>
                                            <p class="control is-expanded">
                                                <input class="input" type="text" :placeholder="lang('f_give_your_id')">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./FirstDepositStep');
</script>
