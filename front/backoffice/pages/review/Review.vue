<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <widget>
                <span slot="title">{{lang('l_review_publication')}}</span>
                <div slot="body">
                        <div class="columns">
                            <div class="column">
                                <div class="level">
                                    <div class="level-left">
                                        <a :href='get_bulk_link()'>{{lang('l_bulk_edition')}}</a>
                                    </div>
                                    <div class="level-right">
                                        <a href='#' @click="state.show_import_modal = !state.show_import_modal" class="has-text-info">
                                            <template v-if="!state.show_import_modal">{{lang('l_import_publications')}}</template>
                                            <template v-else>{{lang('l_close_import_publications')}}</template>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-collapse :open.sync="state.show_import_modal">
                                    <publication-import />
                                </b-collapse>
                            </div>
                        </div>
                        <fdata-table-searching
                            :search-sink="state.sinks.creations.search"
                            :result-sink="state.sinks.reads.publication"
                            :search-path="state.paths.reads.publication"
                            :search-query="search_query"
                            :use-default-query="true"
                            search-type="publication"
                            table-classes="has-small-font"
                            :detailed="true"
                            detail-key="_id"
                            :columns="state.columns"
                            @column-checkbox-update="on_column_update"
                            @table-checked-rows-update="on_checked_rows_update"
                            :checkable="true"
                            :checked-rows="state.checked_rows"
                        >
                            <template slot="rows" slot-scope="props">
                                <b-table-column field="denormalization.type.label.raw" :label="lang('l_p_type')" centered :visible="state.columns['denormalization.type.label'].visible" sortable centered>
                                    <span class="tag is-light">
                                        {{lang(props.row.denormalization.type.label) | truncate(30)}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="subtype" :label="lang('l_p_subtype')" centered :visible="state.columns['subtype'].visible" sortable centered>
                                    <span class="tag is-light">
                                        {{lang(find_subtype(props.row)) | truncate(30)}}
                                    </span>
                                </b-table-column>
                                <b-table-column
                                    field="denormalization.authors._id.fullname"
                                    :label="lang('l_p_author', {}, 'other')"
                                    :visible="state.columns['denormalization.authors._id.fullname'].visible"
                                    v-if="props.row.denormalization.authors.length > 0"
                                >
                                    {{props.row.denormalization.authors | join('_id.fullname') | truncate(30)}}
                                </b-table-column>
                                <b-table-column
                                    field="denormalization.contributors.label.fullname"
                                    :label="lang('l_p_author', {}, 'other')"
                                    :visible="state.columns['denormalization.authors._id.fullname'].visible"
                                    v-else
                                >
                                    {{props.row.denormalization.contributors | join('label.fullname') | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="title.content" :label="lang('l_p_title')" :visible="state.columns['title.content'].visible">
                                    {{props.row.title.content | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="dates.publication" :label="lang('l_p_year')" sortable centered :visible="state.columns['dates.publication'].visible">
                                    <span class="tag is-success">
                                        {{props.row.dates.publication | format_date('YYYY')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="status" :label="lang('l_p_status')" sortable centered :visible="state.columns.status.visible">
                                    <span class="tag is-warning" v-if="props.row.status === 'pending'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-danger" v-else-if="props.row.status === 'rejected'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-info" v-else-if="props.row.status === 'incomplete'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-light" v-else-if="props.row.status === 'withdrawn'">
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                    <span class="tag is-success" v-else>
                                        {{lang(`l_${props.row.status}_status`)}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.journal.raw" :label="lang('l_p_journal')" sortable :visible="state.columns['denormalization.journal'].visible">
                                    {{props.row.denormalization.journal | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="denormalization.conference.raw" :label="lang('l_p_conference')" sortable :visible="state.columns['denormalization.conference'].visible">
                                    {{props.row.denormalization.conference | truncate(30)}}
                                </b-table-column>
                                <b-table-column field="dates.update" :label="lang('l_p_update')" sortable centered :visible="state.columns['dates.update'].visible">
                                    <span class="tag is-warning">
                                        {{props.row.dates.update | format_date('DD/MM/YYYY')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="dates.deposit" :label="lang('l_p_deposit')" sortable centered :visible="state.columns['dates.deposit'].visible">
                                    <span class="tag is-warning">
                                        {{props.row.dates.deposit | format_date('DD/MM/YYYY')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="files" :label="lang('l_p_file', {}, 'other')" centered :visible="state.columns.files.visible">
                                    <span class="icon is-info">
                                        <a v-if="get_multi_download_link(props.row) != null" :href='get_multi_download_link(props.row)' title="Download file"><i class="fa fa-cloud-download"></i></a>
                                        <i v-else class="fa fa-times"></i>
                                    </span>
                                </b-table-column>
                                <b-table-column field="diffusion.rights.exports.nowhere" :label="lang('l_p_rights_nowhere', {}, 'other')" sortable centered :visible="state.columns['diffusion.rights.exports.nowhere'].visible">
                                    <span class="icon is-info">
                                        <i v-if="get_info(props.row, 'diffusion.rights.exports.nowhere') === true" class="fa fa-check"></i>
                                        <i v-else-if="get_info(props.row, 'diffusion.rights.exports.nowhere') === false" class="fa fa-times"></i>
                                    </span>
                                </b-table-column>
                                <b-table-column field="diffusion.rights.exports.hal" :label="lang('l_p_rights_hal', {}, 'other')" sortable centered :visible="state.columns['diffusion.rights.exports.hal'].visible">
                                    <span class="icon is-info">
                                        <i v-if="get_info(props.row, 'diffusion.rights.exports.hal') === true" class="fa fa-check"></i>
                                        <i v-else-if="get_info(props.row, 'diffusion.rights.exports.hal') === false" class="fa fa-times"></i>
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.diffusion.research_teams" :label="lang('l_p_research_teams', {}, 'other')" centered :visible="state.columns['denormalization.diffusion.research_teams'].visible">
                                    <span class="icon is-info">
                                        {{get_array_info(props.row, 'denormalization.diffusion.research_teams', '_id.name')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.diffusion.internal_collection2" :label="lang('l_p_internal_collection', {}, 'other')" centered :visible="state.columns['denormalization.diffusion.internal_collection2'].visible">
                                    <span class="icon is-info">
                                        {{get_array_info(props.row, 'denormalization.diffusion.internal_collection2', '_id.name')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.diffusion.projects" :label="lang('l_p_projects', {}, 'other')" centered :visible="state.columns['denormalization.diffusion.projects'].visible">
                                    <span class="icon is-info">
                                        {{get_array_info(props.row, 'denormalization.diffusion.projects', '_id.name')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.diffusion.anr_projects" :label="lang('l_p_anr_projects', {}, 'other')" centered :visible="state.columns['denormalization.diffusion.anr_projects'].visible">
                                    <span class="icon is-info">
                                        {{get_array_info(props.row, 'denormalization.diffusion.anr_projects', '_id.name')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.diffusion.european_projects" :label="lang('l_p_european_projects', {}, 'other')" centered :visible="state.columns['denormalization.diffusion.european_projects'].visible">
                                    <span class="icon is-info">
                                        {{get_array_info(props.row, 'denormalization.diffusion.european_projects', '_id.name')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.diffusion.surveys" :label="lang('l_p_surveys', {}, 'other')" centered :visible="state.columns['denormalization.diffusion.surveys'].visible">
                                    <span class="icon is-info">
                                        {{get_array_info(props.row, 'denormalization.diffusion.surveys', '_id.name')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.rights.license" :label="lang('l_p_license', {}, 'other')" centered :visible="state.columns['denormalization.diffusion.rights.license'].visible">
                                    <span class="icon is-info">
                                        {{get_license_info(props.row, 'denormalization.diffusion.rights.license')}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="denormalization.depositor.lastname.raw" :label="lang('l_p_depositor')" sortable centered :visible="state.columns['denormalization.depositor.lastname.raw'].visible">
                                    {{get_info(props.row, 'denormalization.depositor.firstname')}} {{get_info(props.row, 'denormalization.depositor.lastname')}}
                                </b-table-column>
                                <b-table-column field="depositor" :label="lang('l_p_action', {}, 'other')" centered :visible="state.columns.depositor.visible">
                                    <a target="_blank" class="has-text-green" :href="`${host}/deposit?type=review&_id=${props.row._id}`">{{lang('l_review_review_action')}}</a><br />
                                    <action-button
                                        class="has-text-red"
                                        tag="a"
                                        :confirmation="lang('l_remove_confirmation')"
                                        :two-steps="true"
                                        @action-click="remove(props.row, 'publication')"
                                    >{{lang('l_review_remove_button')}}</action-button>
                                </b-table-column>
                                <b-table-column field="denormalization.reviewer.lastname.raw" :label="lang('l_p_reviewer')" sortable centered :visible="state.columns['denormalization.reviewer.lastname.raw'].visible">
                                    {{get_info(props.row, 'denormalization.reviewer.firstname')}} {{get_info(props.row, 'denormalization.reviewer.lastname')}}
                                </b-table-column>
                                <b-table-column field="system.stats.views" :label="lang('l_p_view', {}, 'other')" sortable centered :visible="state.columns['system.stats.views'].visible">
                                    <span class="tag is-info">
                                        {{get_info(props.row, 'system.stats.views') || 0}}
                                    </span>
                                </b-table-column>
                                <b-table-column field="system.stats.downloads" :label="lang('l_p_download', {}, 'other')" sortable centered :visible="state.columns['system.stats.downloads'].visible">
                                    <span class="tag is-info">
                                        {{get_info(props.row, 'system.stats.downloads') || 0}}
                                    </span>
                                </b-table-column>
                            </template>
                            <template slot="detail" slot-scope="props">
                                <div class="has-medium-font">
                                    <p class="has-small-bottom-margin"><span class="tag is-info">{{lang(props.row.denormalization.type.label)}}</span></p>
                                    <p class="has-small-bottom-margin"><span class="tag is-info">{{lang(find_subtype(props.row))}}</span></p>
                                    <h4 class="title is-4">{{lang('l_general_information')}}</h4>
                                    <p><strong>{{lang('l_publication_title')}}</strong> {{props.row.title.content}}</p>
                                    <p><strong>{{lang('l_publication_author', {}, 'other')}}</strong>
                                        {{props.row.denormalization.authors | join('_id.fullname')}}
                                    </p>
                                    <p><strong>{{lang('l_publication_year')}}</strong> {{props.row.dates.publication | format_date('YYYY')}}</p>
                                    <p><strong>{{lang('l_publication_status')}}</strong> {{lang(`l_${props.row.status}_status`)}}</p>
                                    <p><strong>{{lang('l_publication_update')}}</strong> {{props.row.dates.update | format_date()}}</p>
                                    <p><strong>{{lang('l_publication_deposit')}}</strong> {{props.row.dates.deposit | format_date()}}</p>
                                    <h4 class="title is-4 has-small-top-margin">{{lang('l_user_information')}}</h4>
                                    <p><strong>{{lang('l_publication_depositor')}}</strong> {{get_info(props.row, 'denormalization.depositor.firstname')}} {{get_info(props.row, 'denormalization.depositor.lastname')}}</p>
                                    <p><strong>{{lang('l_publication_reviewer')}}</strong> {{get_info(props.row, 'denormalization.reviewer.firstname')}} {{get_info(props.row, 'denormalization.reviewer.lastname')}}
                                    </p>
                                    <p><strong>{{lang('l_publication_depositor_comment')}}</strong></p>
                                    <p>{{_oa_find(props.row, 'system.depositor_comment', lang('l_na')) | eol_to_br}}</p>
                                    <div v-for="email in _oa_find(props.row, 'system.emails', [])">
                                        <p><strong>{{lang('l_comment')}} ({{_oa_find(email, 'created_at') | format_date('DD-MM-YYYY')}} {{lang('l_at')}} {{_oa_find(email, 'created_at') | format_date('HH:mm')}})</strong></p>
                                        <p>{{_oa_find(email, 'body')}}</p>
                                    </div>
                                    <h4 class="title is-4 has-small-top-margin">{{lang('l_detailed_information')}}</h4>
                                    <p><strong>{{lang('l_publication_diffusion_exports_nowhere')}}</strong> {{get_info(props.row, 'diffusion.rights.exports.nowhere')}}</p>
                                    <p><strong>{{lang('l_publication_diffusion_exports_hal')}}</strong> {{get_info(props.row, 'diffusion.rights.exports.hal')}}</p>
                                    <p><strong>{{lang('l_publication_research_teams')}}</strong> {{get_array_info(props.row, 'denormalization.diffusion.research_teams', '_id.name')}}</p>
                                    <p><strong>{{lang('l_publication_internal_collection')}}</strong> {{get_array_info(props.row, 'denormalization.diffusion.internal_collection2', '_id.name')}}</p>
                                    <p><strong>{{lang('l_publication_project')}}</strong> {{get_array_info(props.row, 'denormalization.diffusion.projects', '_id.name')}}</p>
                                    <p><strong>{{lang('l_publication_anr_project')}}</strong> {{get_array_info(props.row, 'denormalization.diffusion.anr_projects', '_id.name')}}</p>
                                    <p><strong>{{lang('l_publication_european_project')}}</strong> {{get_array_info(props.row, 'denormalization.diffusion.european_projects', '_id.name')}}</p>
                                    <p><strong>{{lang('l_publication_survey')}}</strong> {{get_array_info(props.row, 'denormalization.diffusion.surveys', '_id.name')}}</p>
                                    <p><strong>{{lang('l_publication_license')}}</strong> {{get_license_info(props.row, 'denormalization.diffusion.rights.license')}}</p>
                                </div>
                            </template>
                        </fdata-table-searching>
                    </div>
                </widget>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./Review');
</script>
