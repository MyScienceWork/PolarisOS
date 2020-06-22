<template>
    <div class="card card-equal-height">
        <div class="card-content card-equal-height" v-if="!modificationMode || noDepositedFiles">
            <div class="columns is-centered">
                <div class="column has-text-centered">
                    <h4 class="title is-4">{{lang('f_upload_deposit_file')}}
                        <b-tooltip class="is-dark is-tooltip-small" :label="lang('l_upload_deposit_file_help')" multilined>
                            <a href='#' alt="Tooltip">
                                <span class="icon has-text-info">
                                    <i class="fa fa-question-circle"></i>
                                </span>
                            </a>
                        </b-tooltip>
                    </h4>
                    <p v-html="lang('f_upload_deposit_dataset_file_help')"></p>
                </div>
            </div>
            <dynamic-form @dropzone-analyze-file="analyze_from_file" :form="uploadForm" :cform="sink"/>
            <div class="columns is-centered">
                <div class="column">
                    <p v-if="analyzeState === 'loading'">{{lang('l_analyze_in_progress')}}</p>
                    <p v-else-if="analyzeState === 'fail'">{{lang('l_analyze_failed')}}</p>
                    <p v-else-if="analyzeState === 'success'">{{lang('l_analyze_succeeded')}}</p>
                </div>
            </div>
        </div> <!-- card-content not in modification -->
        <div v-else class="card-content card-equal-height">
            <div class="columns is-centered">
                <div class="column has-text-centered">
                    <h4 class="title is-4">{{lang('f_upload_deposit_file')}}</h4>
                    <p v-html="lang('f_upload_deposit_file_modification_help')"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = require('./FileDepositWidget');
</script>
