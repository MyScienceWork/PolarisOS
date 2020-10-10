<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns" v-if="content_item && Object.keys(content_item).length > 0">
            <div class="column is-8">
                <div class="card card-equal-height card-with-tag">
                    <div class="card-header">
                        <a href='#' class="card-header-icon card-header-tag is-left">
                            <span class="tag is-purple is-active">Dataset</span>
                        </a>
                    </div>
                    <div class="card-content content">
                        <h3 class="title is-3">{{content_item.title}}</h3>
                        <div class="has-small-top-margin" v-if="_oa_find(content_item, 'denormalization.author') && content_item.denormalization.author.length > 0">
                            <strong>Contributors</strong>
                            <ul>
                                <li v-for="author in content_item.denormalization.author">{{ author.label.fullname }}
                                    <ul>
                                        <li v-for="affiliation in author.label.affiliations">{{ affiliation.institution.name }}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="has-small-top-margin" v-if="_oa_find(content_item, 'denormalization.contact') && content_item.denormalization.contact.length > 0">
                            <strong>Contacts</strong>
                            <ul v-for="contact in content_item.denormalization.contact">
                                <li><a :href="`mailto:${contact.label.email}`">{{contact.label.fullname}}</a></li>
                            </ul>
                        </div>
                        <p class="has-small-top-margin" v-if="_oa_find(content_item, 'denormalization.laboratory.0._id.name')">
                            <strong>Laboratory</strong><br/>
                            {{ _oa_find(content_item, 'denormalization.laboratory.0._id.name') }}
                        </p>
                        <p class="has-small-top-margin" v-if="_oa_find(content_item, 'denormalization.license.label')">
                            <strong>License</strong>
                            <br/>
                            <a class="has-text-purple" :href="_oa_find(content_item, 'denormalization.license.link')" target='_blank'>{{ _oa_find(content_item, 'denormalization.license.label') }}</a>
                        </p>

                        <div class="has-small-top-margin" v-if="_oa_find(content_item, 'ids')">
                            <p v-for="id in _oa_find(content_item, 'ids')">
                                <template v-if="id.type.toUpperCase() === 'DOI'">
                                    <strong>{{id.type.toUpperCase()}}</strong> : <a class="break-word has-text-purple" target='_blank' :href='`https://handle.stage.datacite.org/${id._id}`'>{{id._id}}</a>
                                </template>
                            </p>
                        </div>

                        <h4 class="has-small-top-margin">Descriptions</h4>

                        <widget class="has-small-top-margin" v-for="(description, idx) in _oa_find(content_item, 'description')" :collapsed="idx > 1">
                            <span slot="title">{{ description.date | format_date('MM/DD/YYYY') }}</span>
                            <div slot="body"><p>{{ description.description }}</p></div>
                        </widget>

                        <h4>Related Publications</h4>

                        <widget class="has-small-top-margin" v-for="(related, idx) in _oa_find(content_item, 'related_publication')">
                            <span slot="title"><a class="break-word has-text-purple" target='_blank' :href="related.url"><strong>{{ content_item.denormalization.related_publication[idx].id_type.label.toUpperCase() }} {{ related.id_number }} </strong></a></span>
                            <div slot="body"><p v-html="enable_link_citation(related.citation)"></p></div>
                        </widget>

                        <p v-if="_oa_find(content_item, 'notes')">
                            <strong>Notes</strong><br/>
                            {{ content_item.notes }}
                        </p>

                        <p v-if="_oa_find(content_item, 'dates.deposit')">
                            <strong>Publication date</strong><br/>
                            {{ parseInt(content_item.dates.deposit, 10) | format_date('MM/DD/YYYY') }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="columns is-centered" v-if="content_item.files && content_item.files.length > 0">
                    <div class="column">
                        <div class="card info-card info-card-purple">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_dataset_file')}}</p>
                            </header>
                            <div
                                    class="card-content has-text-centered"
                            >
                                <template v-if="generate_preview_link('master')">
                                    <div class="columns is-centered">
                                        <div class="column has-vertically-aligned-content is-vcentered">
                                            <a target="_blank" :href="generate_viewer_link('master')" v-if="generate_viewer_link('master')">
                                                <img :src="generate_preview_link('master')" alt='Thumbnail' class='pos-view-thumbnail-preview' width="256px" />
                                            </a>
                                            <img v-else :src="generate_preview_link('master')" alt='Thumbnail' class='pos-view-thumbnail-preview' />
                                        </div>
                                    </div>
                                    <div class="has-small-top-margin">
                                        <b-tooltip class="is-dark" :label="lang('l_master_file_download_help')" multilined>
                                            <a :href="generate_download_link('dataset', 'master')" class="swap">
                                                <span class="icon is-large">
                                                    <i class="fa fa-cloud-download fa-3x"></i>
                                                </span>
                                            </a>
                                        </b-tooltip>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="columns is-centered">
                                        <div class="column has-vertically-aligned-content is-vcentered">
                                            <b-tooltip class="is-dark" :label="lang('l_master_file_download_help')" multilined>
                                                <a :href="generate_download_link('dataset', 'master')" class="swap">
                                                    <span class="icon is-large">
                                                        <i class="fa fa-file fa-3x"></i>
                                                    </span>
                                                </a>
                                            </b-tooltip>
                                        </div>
                                    </div>
                                </template>
                                <p class="has-small-top-margin" v-if="has_extra_files">
                                    <a class="swap has-small-top-margin" @click.prevent="state.show_extra_files = !state.show_extra_files">
                                        {{lang('f_click_here_to_download_extra_files')}}
                                    </a>
                                </p>

                                <div class="has-small-top-margin" v-if="state.show_extra_files">
                                    <p class="title is-5">{{lang('f_select_extra_files_to_download')}}</p>
                                    <div class="field has-addons" v-for="file in content_item.files">
                                        <p class="control is-expanded">
                                            <a class="button is-static is-fullwidth">
                                                {{$lodash.truncate(file.name)}}
                                            </a>
                                        </p>
                                        <div class="control">
                                            <div class="input">
                                                <input type="checkbox" v-model="state.selected_files[file.name].s" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field is-grouped">
                                        <div class="control">
                                            <a class="button" :href='multi_download_link'>{{lang('f_download')}}</a>
                                        </div>
                                        <div class="control">
                                            <button class="button is-primary" @click.prevent="select_all_extra_files(!is_all_extra_files_selected)">{{is_all_extra_files_selected ?  lang('f_deselect_all') : lang('f_select_all')}}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column">
                        <div class="card info-card info-card-purple">
                            <header class="card-header">
                                <p class="card-header-title">{{lang('f_publication_export')}}</p>
                            </header>
                            <div class="card-content">
                                <p class="has-text-centered"><a @click.prevent="run_export('datacite')">{{lang('l_datacite_export')}}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./ViewDataset');
</script>
