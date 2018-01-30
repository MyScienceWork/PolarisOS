<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_connectors')}}</span>
                <div slot="body">
                        <div v-for="row in read_content_connector" class="columns is-centered">
                            <div v-for="info in row" class="column">
                                <widget>
                                    <span slot="title">{{info.name}} 
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(info, 'connector')"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(info, 'connector')"
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
                                <paginator class="pagination-purple" :skip="0" :number-of-items="contentLength" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_add_or_modify_connector')}}</span>
                    <div slot="body">
                        <fform 
                            :name="state.sinks.creations.connector" 
                            :post_path="state.paths.creations.connector" 
                            :put_path="state.paths.creations.connector" 
                            :get_path="state.paths.reads.connector" 
                            :get_form="state.sinks.reads.connector"
                        >
                            <finput 
                            name="name" 
                            :label="lang('l_connector_name')" 
                            :is-required="true" 
                            :placeholder="lang('l_connector_name')" 
                            type="text" 
                            :form="state.sinks.creations.connector" 
                            />
                            <fselect 
                            name="api.protocol" 
                            :label="lang('l_api_protocol')" 
                            :is-required="true" 
                            :placeholder="lang('l_api_protocol')" 
                            :options="protocols" 
                            :form="state.sinks.creations.connector" 
                            />
                            <fselect 
                            name="api.type" 
                            :label="lang('l_api_request_type')" 
                            :is-required="true" 
                            :placeholder="lang('l_api_request_type')" 
                            :options="types" 
                            :form="state.sinks.creations.connector" 
                            />
                            <finput 
                            name="api.hostname" 
                            :label="lang('l_api_hostname')" 
                            :is-required="true" 
                            :placeholder="lang('l_api_hostname')" 
                            type="text" 
                            :form="state.sinks.creations.connector" 
                            />
                            <finput 
                            name="api.port" 
                            :label="lang('l_api_port')" 
                            :is-required="true" 
                            :placeholder="lang('l_api_port')" 
                            type="number" 
                            :form="state.sinks.creations.connector" 
                            />
                            <finput 
                            name="api.pathname" 
                            :label="lang('l_api_pathname')" 
                            :is-required="true" 
                            :placeholder="lang('l_api_pathname')" 
                            type="text" 
                            :form="state.sinks.creations.connector" 
                            />
                            <finput 
                            name="api.search" 
                            :label="lang('l_api_search')" 
                            :placeholder="lang('l_api_search')" 
                            type="text" 
                            :form="state.sinks.creations.connector" 
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
module.exports = require('./Connector');
</script>
