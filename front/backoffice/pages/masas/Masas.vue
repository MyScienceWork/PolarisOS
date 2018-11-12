<template>
<div class="holy-grail-content">
    <div class="container is-fluid">
        <card color="test">
            <div class="columns" slot="card-content">
                <div class="column">
                    <div class="buttons has-addons has-small-bottom-margin">
                        <span 
                            :class="['button has-small-bottom-margin', {'is-info is-selected': state.activeSelectTab === 0}]" 
                            @click.prevent="state.activeSelectTab = 0">{{lang('l_select_by_author_bexport')}}</span>
                        <span 
                            :class="['button has-small-bottom-margin', {'is-info is-selected': state.activeSelectTab === 1}]" 
                            @click.prevent="state.activeSelectTab = 1">{{lang('l_select_by_lab_bexport')}}</span>
                        <span 
                            :class="['button has-small-bottom-margin', {'is-info is-selected': state.activeSelectTab === 2}]" 
                            @click.prevent="state.activeSelectTab = 2">{{lang('l_select_by_project_bexport')}}</span>
                        <span 
                            :class="['button has-small-bottom-margin', {'is-info is-selected': state.activeSelectTab === 3}]" 
                            @click.prevent="state.activeSelectTab = 3">{{lang('l_select_by_status_bexport')}}</span>
                    </div>
                    <fselect
                        :form="this.state.sinks.creations.export"
                        name="author"
                        :label="lang('l_author_bexport')"
                        :placeholder="lang('l_author_bexport')"
                        field-label="fullname"
                        field-value="_id"
                        :options="content(state.sinks.reads.author)"
                        v-if="state.activeSelectTab === 0"
                        key="select-author"
                        :multi="true"
                        :ajax="true"
                        ajax-url="/api/public/v2/authors/search"
                        ajax-value-url="/api/public/v2/authors/search"
                        :ajax-filters="[{is_ined: true}]"
                        search-fields="fullname.__pauc"
                    />        
                    <fselect
                        :form="this.state.sinks.creations.export"
                        name="laboratory"
                        :label="lang('l_lab_bexport')"
                        :placeholder="lang('l_lab_bexport')"
                        field-label="name"
                        field-value="_id"
                        :options="content(state.sinks.reads.laboratory) | translate(lang, 'name')"
                        v-if="state.activeSelectTab === 1"
                        key="select-laboratory"
                        :multi="true"
                    />        
                    <fselect
                        :form="this.state.sinks.creations.export"
                        name="project"
                        :label="lang('l_project_bexport')"
                        :placeholder="lang('l_project_bexport')"
                        field-label="label"
                        field-value="_id"
                        :options="content(state.sinks.reads.project) | translate(hlang, 'label')"
                        key="select-project"
                        v-if="state.activeSelectTab === 2"
                        :multi="true"
                    />        
                    <fselect
                        :form="this.state.sinks.creations.export"
                        name="ined_status"
                        :label="lang('l_status_bexport')"
                        :placeholder="lang('l_status_bexport')"
                        :options="content(state.sinks.reads.ined_status)"
                        key="select-status"
                        field-label="label"
                        field-value="_id"
                        v-if="state.activeSelectTab === 3"
                        :multi="true"
                        :translatable="true"
                    />        
                    <div class="buttons has-addons has-small-bottom-margin">
                        <span 
                            :class="['button', {'is-info is-selected': state.activeYearTab === 0}]" 
                            @click.prevent="state.activeYearTab = 0">{{lang('l_select_all_years_bexport')}}</span>
                        <span 
                            :class="['button', {'is-info is-selected': state.activeYearTab === 1}]" 
                            @click.prevent="state.activeYearTab = 1">{{lang('l_select_since_bexport')}}</span>
                        <span 
                            :class="['button', {'is-info is-selected': state.activeYearTab === 2}]" 
                            @click.prevent="state.activeYearTab = 2">{{lang('l_select_interval_years_bexport')}}</span>
                    </div>
                    <finput 
                        :form="this.state.sinks.creations.export"
                        name="start_year"
                        :label="lang('l_start_year_bexport')"
                        :placeholder="lang('l_start_year_bexport')"
                        type="date-year"
                        :year-range-start="0"
                        :year-range-end="next_year(4)"
                        v-if="state.activeYearTab === 1 || state.activeYearTab === 2"
                    />        
                    <finput 
                        :form="this.state.sinks.creations.export"
                        name="end_year"
                        :label="lang('l_end_year_bexport')"
                        :placeholder="lang('l_end_year_bexport')"
                        type="date-year"
                        :year-range-start="0"
                        :year-range-end="next_year(4)"
                        v-if="state.activeYearTab === 2"
                    />
                    <fselect
                        :form="this.state.sinks.creations.export"
                        name="typology"
                        :label="lang('l_typology_bexport')"
                        :placeholder="lang('l_typology_bexport')"
                        field-label="label"
                        field-value="_id"
                        :select-all-values="true"
                        :multi="true"
                        :options="content(state.sinks.reads.typology)"
                        :translatable="true"
                    /> 
                    <fselect
                        :form="this.state.sinks.creations.export"
                        name="subtypology"
                        :label="lang('l_subtypology_bexport')"
                        :placeholder="lang('l_subtypology_bexport')"
                        field-label="label"
                        field-value="value"
                        :multi="true"
                        :options="subtypology_content"
                        :translatable="true"
                    /> 
                    <fselect
                        :form="this.state.sinks.creations.export"
                        name="sort"
                        :label="lang('l_sort_bexport')"
                        :placeholder="lang('l_sort_bexport')"
                        :options="sort_content"
                        :translatable="true"
                        :select-first-value="true"
                    />        
                    <fselect
                        :form="this.state.sinks.creations.export"
                        name="export_type"
                        :label="lang('l_filetype_bexport')"
                        :placeholder="lang('l_filetype_bexport')"
                        :options="filetype_content"
                        :translatable="true"
                        :select-first-value="true"
                    />        
                    <finput 
                        :form="this.state.sinks.creations.export"
                        name="size"
                        :label="lang('l_max_size_bexport')"
                        :placeholder="lang('l_max_size_bexport')"
                        type="number"
                        :default="1000"
                    />        
                    <button 
                        type="submit" @click.prevent="submit"
                        class="button button-background-blue"
                    >{{lang('l_download_bexport')}}</button>
                </div>
            </div>
        </card>
    </div>
</div>
</template>

<script>
module.exports = require('./Masas');
</script>
