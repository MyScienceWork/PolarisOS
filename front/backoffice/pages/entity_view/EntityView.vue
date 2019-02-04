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
                            :table-classes="{'has-small-font': state.visible_columns > 5}"
                            :detailed="true"
                            detail-key="_id"
                            :checkable="true"
                            :checked-rows="state.checked_rows"
                            :columns="state.columns"
                            @column-checkbox-update="on_column_update"
                            @table-checked-rows-update="on_checked_rows_update"
                            :change-with-create-success="true"
                            :form-create-success="state.sinks.creations[entity()]"
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
                                        v-if="value.is_tag"
                                        :inner-html.prop="props.row | find(value.field) | need_translation(value.translate, hlang, lang) | truncate(value.truncate) | show_lang_key(value.show_lang_key, _oa_find(props.row, value.field)) | format(value)"
                                    >
                                    </span>
                                    <div v-else
                                        :inner-html.prop="props.row | find(value.field) | need_translation(value.translate, hlang, lang) | truncate(value.truncate) | show_lang_key(value.show_lang_key, _oa_find(props.row, value.field)) | format(value)"  
                                    >
                                    </div>
                                </b-table-column>
                                <b-table-column field="actions" :label="lang('l_p_action', {}, 'other')" centered>
                                    <action-button
                                        class="icon has-text-blue share-icon"
                                        tag="a"
                                        @action-click="update(props.row, entity())"
                                        v-scroll-to="'#mwidget'"
                                    >
                                        <i class="fa fa-pencil"></i>
                                    </action-button>
                                    <action-button
                                        class="icon has-text-orange share-icon"
                                        tag="a"
                                        @action-click="use_as_model(props.row, entity())"
                                        v-scroll-to="'#mwidget'"
                                    >
                                        <i class="fa fa-clone"></i>
                                    </action-button>
                                    <action-button
                                        class="icon has-text-red share-icon"
                                        tag="a"
                                        confirmation="Are you sure?"
                                        :two-steps="true"
                                        @action-click="remove(props.row, entity())"
                                    >
                                        <i class="fa fa-times"></i>
                                    </action-button>
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
