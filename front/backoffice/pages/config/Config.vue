<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">Global configuration</span>
                    <div slot="body">
                        <div class="columns is-centered" v-for="row in readContent">
                            <div class="column" v-for="content in row">
                                <widget>
                                    <span slot="title">
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(content)"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        :confirmation="lang('b_sure')"
                                        :two-steps="true"
                                        @action-click="remove(content, 'config')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                        {{content.environment}} 
                                    </span>
                                    <div slot="body">

                                    </div>
                                </widget>
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">Add or modify the global configuration</span>
                    <div slot="body">
                        <fform 
                            :name="state.forms.csink" 
                            :post_path="state.path" 
                            :put_path="state.path"
                            :get_path="state.rpath"
                            :get_form="state.forms.rsink"
                        >
                            <fselect 
                                name="environment" :label="lang('b_environment')" 
                                :is-required="true" 
                                :form="state.forms.csink" 
                                :options="state.environments" 
                            />
                            <fselect 
                                name="langs" :label="lang('b_lang',{}, 'other')" 
                                :is-required="true" 
                                :form="state.forms.csink" 
                                :multi="true"
                                :options="state.langs" 
                            />
                            <h4 class="title is-4">Upload section</h4>
                            <finput
                                name="upload.maxFileSizeInMB" 
                                :label="lang('b_config_maxFileSizeInMB')" 
                                :placeholder="lang('b_config_maxFileSizeInMB')" 
                                :is-required="true" 
                                :form="state.forms.csink" 
                                type="text"
                            />
                            <finput
                                name="upload.allowRemoveFiles" 
                                :label="lang('b_config_allowRemoveFiles')" 
                                :form="state.forms.csink" 
                                type="checkbox"
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
module.exports = require('./Config');
</script>
