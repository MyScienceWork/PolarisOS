<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('b_list_datainstances')}}</span>
                    <div slot="body">
                        <fdata-table-searching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads[entity()]"
                            :search-path="state.paths.reads[entity()]"
                            :search-query="es_query_content"
                            :use-default-query="true"
                            :search-type="entity()"
                            :table-classes="{'has-small-font': Object.keys(state.columns).length > 5}"
                            :detailed="true"
                            detail-key="_id"
                            :columns="state.columns"
                            @column-checkbox-update="on_column_update"
                        >
                            <template slot="rows" slot-scope="props">
                                <b-table-column v-for="(value, key) in state.columns"
                                    :field="value.sort" 
                                    :label="lang(value.title, {}, value.lang)" 
                                    :visible="value.visible"
                                    :sortable="value.sortable"
                                    :centered="value.centered">
                                    <span 
                                        :class="`tag ${value.tag_class}`" 
                                        v-if="value.is_tag">
                                        <template v-if="value.truncate > 0">
                                            {{props.row | find(value.field) | truncate(value.truncate)}}
                                        </template>
                                        <template v-else>
                                            {{props.row | find(value.field)}}
                                        </template>
                                    </span>
                                    <template v-else>
                                        <template v-if="value.truncate > 0">
                                            {{props.row | find(value.field) | truncate(value.truncate)}}
                                        </template>
                                        <template v-else>
                                            {{props.row | find(value.field)}}
                                        </template>
                                    </template>
                                </b-table-column>
                            </template>
                        </fdata-table-searching>
                    </div>
                </widget>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <widget id="mwidget">
                <span slot="title">{{lang('b_add_entity')}}</span>
                    <div slot="body">
                        <fform 
                            :name="state.sinks.creations[entity()]" 
                            :post_path="state.paths.creations[entity()]" 
                            :put_path="state.paths.creations[entity()]"
                            :get_path="state.paths.reads[entity()]"
                            :get_form="state.sinks.reads[entity()]"
                            >
                            <dynamic-form :form="fform(state.sinks.reads.form).content || {}" :cform="state.sinks.creations[entity()]" />
                        </fform>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>
<script>
module.exports = require('./EntityView');
</script>
