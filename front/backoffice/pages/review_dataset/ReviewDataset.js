const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const OAMixin = require('../../../common/mixins/ObjectAccessMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const RemoveMixin = require('../../../common/mixins/RemoveMixin');
const BrowserUtils = require('../../../common/utils/browser');
const Queries = require('../../../common/specs/queries');
const SortLists = require('../../../common/specs/sorts');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FiltersMixin, FormCleanerMixin, OAMixin, RemoveMixin],
    components: {
    },
    data() {
        return {
            state: {
                checked_rows: [],
                itemsPerPage: 1000,
                itemsPerRow: 1,
                show_import_modal: false,
                paths: {
                    reads: {
                        dataset: APIRoutes.entity('dataset', 'POST', true),
                        typology: APIRoutes.entity('typology', 'POST', true),
                        laboratory: APIRoutes.entity('laboratory', 'POST', true),
                        project: APIRoutes.entity('project', 'POST', true),
                        anr_project: APIRoutes.entity('anr_project', 'POST', true),
                        european_project: APIRoutes.entity('european_project', 'POST', true),
                        survey: APIRoutes.entity('survey', 'POST', true),
                        license: APIRoutes.entity('license', 'POST', true),
                    },
                    creations: {
                        specs: 'dataset_specs',
                    },
                },
                sinks: {
                    reads: {
                        dataset: 'dataset_read',
                        typology: 'typology_read',
                        laboratory: 'laboratory_read',
                        project: 'project_read',
                        anr_project: 'anr_project_read',
                        european_project: 'european_project_read',
                        survey: 'survey_read',
                        license: 'license_read',
                    },
                    creations: {
                        search: 'search_creation_dataset',
                        specs: 'dataset_specs', //Expose by ImportMixin & FileAnalyzerMixin
                    },
                },
                my_entity: 'dataset',
                columns: {
                    title: {
                        visible: true,
                        force: false,
                        title: 'l_p_title',
                    },
                    depositor: {
                        visible: true,
                        force: true,
                        title: 'l_p_action',
                        lang: 'other',
                    },
                },
            },
        };
    },
    methods: {
        get_info(content, path) {
            const val = Utils.find_value_with_path(content, path.split('.'));
            if (val || val === false) {
                return val;
            }
            return '';
        },
        get_license_info(content, path) {
            let license = this.get_info(content, path);
            const regExp = /\(([^)]+)\)/;
            const matches = regExp.exec(license);
            if (matches && matches.length === 2) {
                license = matches[1];
            }
            return license;
        },
        get_acronyms(list_values, entity, fieldAcronym) {
            list_values.forEach((value, key) => {
                const contents = this.fcontent(this.state.sinks.reads[entity]);
                if (contents && contents instanceof Array) {
                    const my_content = contents.find(content => content.name === value);
                    if (my_content && my_content[fieldAcronym] && my_content[fieldAcronym] !== '') {
                        list_values[key] = my_content[fieldAcronym];
                    }
                }
            });
            return list_values;
        },
        get_array_info(content, path, sub_path) {
            let results = '';
            const val = Utils.find_object_with_path(content, path.split('.'));

            if (val) {
                const split_path = path.split('.');
                const last_key = split_path[split_path.length - 1];
                const deep_val = val[last_key];
                let list_values = [];
                deep_val.forEach((my_val) => {
                    const new_val = Utils.find_value_with_path(my_val, sub_path.split('.'));
                    list_values.push(new_val);
                });

                if (path.split('.')[path.split('.').length - 1] === 'research_teams') {
                    list_values = this.get_acronyms(list_values, 'laboratory', 'acronym');
                } else if (path.split('.')[path.split('.').length - 1] === 'projects') {
                    list_values = this.get_acronyms(list_values, 'project', 'id');
                } else if (path.split('.')[path.split('.').length - 1] === 'anr_projects') {
                    list_values = this.get_acronyms(list_values, 'anr_project', 'acronym');
                } else if (path.split('.')[path.split('.').length - 1] === 'european_projects') {
                    list_values = this.get_acronyms(list_values, 'european_project', 'acronym');
                } else if (path.split('.')[path.split('.').length - 1] === 'surveys') {
                    list_values = this.get_acronyms(list_values, 'survey', 'acronym');
                }

                if (list_values && list_values.length > 0) {
                    list_values.sort();
                    list_values.forEach((value) => {
                        if (results.length === 0) {
                            results += this.lang(value);
                        } else {
                            results += `, ${this.lang(value)}`;
                        }
                    });
                }
            }
            return results;
        },
        on_column_update(obj) {
            this.state.columns[obj.key].visible = obj.checked;
        },
        get_multi_download_link(item) {
            if (item.files.length === 0) {
                return null;
            }

            const names = item.files.reduce((arr, f) => {
                arr.push(f.name);
                return arr;
            }, []);

            const filenames = item.files.reduce((arr, f) => {
                arr.push(f.url);
                return arr;
            }, []);

            return APIRoutes.multi_download('dataset', item._id, names, filenames);
        },
        get_bulk_link() {
            const checkRows = this.state.checked_rows;

            if (checkRows.length === 0) {
                return '#';
            }

            const host = BrowserUtils.getURLHost(window.location);
            const argument = checkRows.reduce(((obj, row, index) => {
                if (index === 0) {
                    return `${obj}datasets=${row._id}&types=${row.type}`;
                }
                return `${obj}&datasets=${row._id}&types=${row.type}`;
            }), '');
            return `${host}/bulk?${argument}`;
        },
        find_subtype(info) {
            if (Object.keys(this.typology).length === 0) {
                return '';
            }

            const type = info.type;
            const subtype = info.subtype;
            const typo = this.typology[type];
            const result = typo.children.find(t => t.name === subtype);

            return result ? result.label : '';
        },
        on_checked_rows_update(obj) {
            this.$set(this.state, 'checked_rows', obj.checkedRows);
        },
    },
    mounted() {
        ['typology', 'laboratory', 'project', 'anr_project', 'european_project', 'survey', 'license'].forEach((entity) => {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads[entity],
                path: this.state.paths.reads[entity],
                body: {
                    size: 10000,
                },
            });
        });
        // fetch datacite form
        this.fetch_form('2na-2HIBxQuWEHRpL4xG', this.state.sinks.creations.specs);
    },
    watch: {
    },
    computed: {
        host() {
            return BrowserUtils.getURLHost(window.location);
        },
        search_query() {
            return JSON.stringify(Queries.dataset_search);
        },
        sort_list() {
            return SortLists.publication_validation_sorts;
        },
        typology() {
            const content = this.mcontent(this.state.sinks.reads.typology);

            return content.reduce((obj, c) => {
                obj[c._id] = c;
                return obj;
            }, {});
        },
        form() {
            if (this.datasetSpecs in this.$store.state.forms) {
                const sink = this.$store.state.forms[this.datasetSpecs];
                const content = sink.content || {};
                return content;
            }
            return {};
        },
    },
};
