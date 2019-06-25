<template>
<div>
    <div class="columns is-centered" v-if="showGlobalHelp">
        <div class="column has-text-centered is-8">
            <p v-html="lang('l_bibliographic_export_help')"></p>
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <div class="buttons has-addons has-small-bottom-margin">
                <span
                    :class="['button', {'is-info is-selected': state.activeSelectTab === 0}]"
                    @click.prevent="state.activeSelectTab = 0">{{lang('l_select_by_author_bexport')}}</span>
                <span
                    :class="['button', {'is-info is-selected': state.activeSelectTab === 1}]"
                    @click.prevent="state.activeSelectTab = 1">{{lang('l_select_by_lab_bexport')}}</span>
                <span
                    :class="['button', {'is-info is-selected': state.activeSelectTab === 2}]"
                    @click.prevent="state.activeSelectTab = 2">{{lang('l_select_by_project_bexport')}}</span>
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
                :options="laboratory_options"
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
                :options="project_options"
                key="select-project"
                v-if="state.activeSelectTab === 2"
                :multi="true"
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
                name="internal_collection"
                :label="lang('l_internal_collection_bexport')"
                :placeholder="lang('l_internal_collection_bexport')"
                field-label="label"
                field-value="_id"
                :multi="true"
                :options="content(state.sinks.reads.internal_collection)"
                :translatable="true"
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
                name="language"
                :label="lang('l_language_bexport')"
                :placeholder="lang('l_language_bexport')"
                field-label="label"
                field-value="value"
                :select-first-value="true"
                :options="langref_content"
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
                name="group"
                :label="lang('l_grouping_bexport')"
                :placeholder="lang('l_grouping_bexport')"
                :options="group_content"
                :select-first-value="true"
                :translatable="true"
            />
            <fselect
                :form="this.state.sinks.creations.export"
                name="csl"
                :label="lang('l_csl_format_bexport')"
                :placeholder="lang('l_csl_format_bexport')"
                :options="csl_format_content"
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
            >{{lang('l_submit_bexport')}}</button>
        </div>
    </div>
    <div class="columns is-centered" v-if="state.link">
        <div class="column">
            <p class="has-small-bottom-margin"><a :href='state.link' target="_blank">{{lang('l_see_result_bexport')}}</a></p>
            <div class="field">
                <label class="label">{{lang('l_copy_paste_to_webpage_bexport')}}</label>
                <div class="control">
                    <textarea class="textarea" placeholder="e.g. Hello world">
                    {{include_code}}
                    </textarea>
                </div>
            </div>
            <p><a :href='`${state.link}&export_type=.docx`' class="button button-background-blue">{{lang('l_export_file_bexport')}}</a></p>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./BibliographicExport');
</script>
