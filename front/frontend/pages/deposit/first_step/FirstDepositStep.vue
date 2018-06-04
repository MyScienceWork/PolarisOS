<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content">
                <div class="columns is-centered" v-if="reviewMode">
                    <div class="column">
                        <p v-html="lang('l_review_mode_enabled')" />
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <fselect 
                            :label="lang('f_choose_document_type')"
                            :is-required="true"
                            :options="typologyOptions"
                            :form="creationSink"
                            name="type"
                            class="has-text-centered"
                            fieldLabel="label"
                            fieldValue="_id"
                            :view-validation-texts="false"
                            :translatable="true"
                            />
                    </div>
                </div> 
                <div class="columns is-centered"
                    v-if="Object.keys(uploadForm).length > 0 || Object.keys(importForm).length > 0"
                >
                    <div class="column">
                        <fselect 
                            :label="lang('b_subtype')"
                            :options="subtypologyOptions"
                            :form="creationSink"
                            name="subtype"
                            class="has-text-centered"
                            fieldLabel="tlabel"
                            fieldValue="name"
                            :view-validation-texts="false"
                            :translatable="true"
                            />
                    </div>
                </div>
                <div class="columns is-centered"
                    v-if="Object.keys(uploadForm).length > 0 || Object.keys(importForm).length > 0"
                >
                    <div class="column has-text-centered">
                        <p class="title is-4">{{lang('f_upload_import_help')}}</p>
                    </div>
                </div>
                <div class="columns is-centered" v-if="Object.keys(uploadForm).length > 0 || Object.keys(importForm).length > 0">
                    <div class="column" v-if="Object.keys(uploadForm).length > 0">
                        <file-deposit-widget 
                            :modification-mode="modificationMode"
                            :no-deposited-files="noDepositedFiles"
                            :upload-form="uploadForm"
                            :sink="creationSink"
                            @analyze-from-file="analyze_from_file"
                            :analyze-state="analyzeState"
                        />
                    </div>
                    <div class="column" v-if="Object.keys(importForm).length > 0">
                        <import-completion-widget
                            :sink="importSink"
                            @import-from-id="import_from_id"
                            :import-state="importState"
                        />
                    </div>
                </div>
                <div class="columns is-centered" 
                    v-else-if="Object.keys(uploadForm).length === 0 && Object.keys(importForm).length === 0 && publicationType">
                    <loader />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./FirstDepositStep');
</script>
