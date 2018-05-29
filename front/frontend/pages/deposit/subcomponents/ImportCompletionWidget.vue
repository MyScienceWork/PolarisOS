<template>
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
                            <finput 
                                name="import_id" 
                                :form="sink" 
                                type="text" 
                                :placeholder="lang('f_complete_publication_using_doi')" 
                                label=""
                            />
                        </div>
                        <div class="control">
                            <a class="button is-info" @click.prevent="import_from_id">
                                {{lang('f_search')}} 
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column">
                    <p v-if="importState === 'loading'">{{lang('l_import_in_progress')}}</p>
                    <p v-else-if="importState === 'fail'">{{lang('l_import_failed')}}</p>
                    <p v-else-if="importState === 'success'">{{lang('l_import_succeeded')}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('./ImportCompletionWidget');
</script>
