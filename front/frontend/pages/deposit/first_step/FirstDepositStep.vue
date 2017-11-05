<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content">
                <div class="columns is-centered">
                    <div class="column">
                        <div class="field has-text-centered">
                            <label class="label">
                                {{lang('f_choose_document_type')}}
                            </label>
                            <div class="select">
                                <select>
                                    <option disabled>Type de document</option>
                                    <optgroup label="Article dans une revue">
                                        <option>Article dans des revues référencées par les instances d’évaluation</option>
                                        <option>Article dans d’autres revues scientifiques</option>
                                        <option>Article dans des revues de débat</option>
                                        <option>Article de vulgarisation scientifique</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="columns is-centered">
                    <div class="column is-6">
                        <div class="card card-equal-height">
                            <div class="card-content card-equal-height">
                                <vue-dropzone class="dropzone-equal-height" id="dropzone" :options="dropzone" />
                            </div>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div class="card card-equal-height">
                            <div class="card-content">
                                <div class="columns is-centered">
                                    <div class="column has-text-centered">
                                        <h4 class="title is-4">{{lang('f_auto_fill_metadata')}}</h4>
                                        <p>{{lang('f_auto_fill_metadata_help')}}</p>
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
                                                <input class="input" type="text" placeholder="Amount of money">
                                            </p>
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
</div>
</template>

<script>
    module.exports = require('./FirstDepositStep');
</script>
