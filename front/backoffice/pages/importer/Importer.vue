<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_importers')}}</span>
                <div slot="body">
                        <div v-for="row in read_content_importer" class="columns is-centered">
                            <div v-for="info in row" class="column">
                                <widget>
                                    <span slot="title">{{info.name}}
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(info, 'importer')"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(info, 'importer')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                    </span>
                                    <div slot="body">
                                    </div>
                                </widget>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="length_importer" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_add_or_modify_importer')}}</span>
                    <div slot="body">
                        <fform
                            :name="state.sinks.creations.importer"
                            :post_path="state.paths.creations.importer"
                            :put_path="state.paths.creations.importer"
                            :get_path="state.paths.reads.importer"
                            :get_form="state.sinks.reads.importer"
                        >
                            <finput
                            name="name"
                            :label="lang('l_importer_name')"
                            :is-required="true"
                            :placeholder="lang('l_importer_name')"
                            type="text"
                            :form="state.sinks.creations.importer"
                            />
                            <fselect
                            name="type"
                            :label="lang('l_importer_type')"
                            :is-required="true"
                            :placeholder="lang('l_importer_type')"
                            :options="types"
                            :form="state.sinks.creations.importer"
                            @select-change="change_importer_type"
                            />
                            <fselect
                            name="entity"
                            :label="lang('l_importer_entity')"
                            :is-required="true"
                            :placeholder="lang('l_importer_entity')"
                            :options="content_entity"
                            fieldLabel="type"
                            fieldValue="type"
                            :form="state.sinks.creations.importer"
                            />
                            <fselect
                            name="pipeline"
                            :label="lang('l_importer_pipeline')"
                            :is-required="true"
                            :placeholder="lang('l_importer_pipeline')"
                            :options="content_pipeline"
                            fieldLabel="name"
                            fieldValue="_id"
                            :form="state.sinks.creations.importer"
                            />
                            <fselect
                            v-if="state.importer_type === 'api'"
                            name="connector"
                            :label="lang('l_importer_connector')"
                            :is-required="true"
                            :placeholder="lang('l_importer_connector')"
                            :options="content_connector"
                            fieldLabel="name"
                            fieldValue="_id"
                            :form="state.sinks.creations.importer"
                            />
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Importer');
</script>
