<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_list_of_templates')}}</span>
                    <div slot="body">
                        <div v-for="row in read_content_template" class="columns is-centered">
                            <div v-for="info in row" class="column">
                                <widget>
                                    <span slot="title">{{info.name}} 
                                        <action-button
                                        class="button is-small button-background-blue"
                                        @action-click="update(info, 'template')"
                                        >
                                        <i class="fa fa-pencil"></i>
                                        </action-button>
                                        <action-button
                                        class="button is-small button-background-red"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(info, 'template')"
                                        >
                                        <i class="fa fa-times"></i>
                                        </action-button>
                                    </span>
                                    <div slot="body">
                                        <div class="columns is-centered">
                                            <div class="column is-6 has-text-centered">
                                                <img :src="info.image" alt="Template image" width="150px" />
                                            </div>
                                        </div>
                                    </div>
                                </widget>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <paginator class="pagination-purple" :skip="0" :number-of-items="length_template" :items-per-page="state.itemsPerPage" />
                            </div>
                        </div>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget>
                    <span slot="title">{{lang('l_add_or_modify_template')}}</span>
                    <div slot="body">
                    <fform 
                        :name="state.sinks.creations.template" 
                        :post_path="state.paths.creations.template" 
                        :put_path="state.paths.creations.template" 
                        :get_path="state.paths.reads.template" 
                        :get_form="state.sinks.reads.template"
                    >
                        <finput 
                        name="name" 
                        label="Template name" 
                        :is-required="true" 
                        placeholder="Template name" 
                        type="text" 
                        :form="state.sinks.creations.template" 
                        />
                        <finput 
                        name="css" 
                        label="Template CSS" 
                        :is-required="true" 
                        placeholder="Template CSS" 
                        type="text" 
                        :form="state.sinks.creations.template" 
                        />
                        <finput 
                        name="image" 
                        label="Template picture" 
                        :is-required="true" 
                        placeholder="Template picture" 
                        type="text" 
                        :form="state.sinks.creations.template" 
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
module.exports = require('./Template');
</script>
