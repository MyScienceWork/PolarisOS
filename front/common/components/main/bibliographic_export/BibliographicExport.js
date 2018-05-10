const moment = require('moment');
const _ = require('lodash');
const APIRoutes = require('../../../api/routes');
const Messages = require('../../../api/messages');
const LangMixin = require('../../../mixins/LangMixin');
const FormMixin = require('../../../mixins/FormMixin');
const FiltersMixin = require('../../../mixins/FiltersMixin');
const RequestMixin = require('../../../mixins/RequestsMixin');
const FormCleanerMixin = require('../../../mixins/FormCleanerMixin');
const CSLSpecs = require('../../../specs/csl');

module.exports = {
    mixins: [LangMixin, RequestMixin, FormMixin, FormCleanerMixin, FiltersMixin],
    props: {
        showGlobalHelp: { default: true, type: Boolean },
    },
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        langref: 'langref_read',
                        internal_collection: 'internal_collection_read',
                        typology: 'typology_read',
                        project: 'project_read',
                        laboratory: 'laboratory_read',
                        author: 'author_read',
                    },

                    creations: {
                        export: 'export_creation',
                    },
                },
                paths: {
                    reads: {
                        langref: APIRoutes.entity('langref', 'POST', true),
                        internal_collection: APIRoutes.entity('internal_collection', 'POST', true),
                        typology: APIRoutes.entity('typology', 'POST', true),
                        author: APIRoutes.entity('author', 'POST', true),
                        laboratory: APIRoutes.entity('laboratory', 'POST', true),
                        project: APIRoutes.entity('project', 'POST', true),
                    },
                },
                link: null,
                activeSelectTab: 0,
                activeYearTab: 0,
            },
        };
    },
    methods: {
        submit() {
            this.state.link = null;
            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.creations.export,
            });
        },
        send_information(sink) {
            if (sink === this.state.sinks.creations.export) {
                const content = this.fcontent(sink);
                const myurl = APIRoutes.export_bibliography();
                const params = {};
                const single_values = ['language', 'sort', 'group', 'size', 'start_year', 'end_year', 'csl'];
                const multi_values = ['project', 'author', 'laboratory', 'typology', 'internal_collection'];

                single_values.forEach((n) => {
                    if (n in content && content[n]) {
                        if (n in params) {
                            params[n].push(encodeURIComponent(content[n]));
                        } else {
                            params[n] = [encodeURIComponent(content[n])];
                        }
                    }
                });

                multi_values.forEach((n) => {
                    if (n in content && content[n]) {
                        content[n].forEach((p) => {
                            if (n in params) {
                                params[n].push(encodeURIComponent(p._id));
                            } else {
                                params[n] = [encodeURIComponent(p._id)];
                            }
                        });
                    }
                });

                if (this.state.activeYearTab === 0) {
                    delete params.start_year;
                    delete params.end_year;
                }

                if (this.state.activeYearTab === 1) {
                    delete params.end_year;
                }

                if (this.state.activeSelectTab === 0) {
                    delete params.project;
                    delete params.laboratory;
                } else if (this.state.activeSelectTab === 1) {
                    delete params.author;
                    delete params.project;
                } else {
                    delete params.author;
                    delete params.laboratory;
                }

                const querystring = _.reduce(params, (arr, value, key) => {
                    arr = arr.concat(value.map(v => `${key}=${v}`));
                    return arr;
                }, []).join('&');
                this.state.link = `${myurl}?${querystring}`;
            }
        },
        next_year(n) {
            return parseInt(moment().add(n, 'y').format('YYYY'), 10);
        },
    },
    watch: {
        export_state(s) {
            return this.dispatch(s, this, this.state.sinks.creations.export);
        },
    },
    computed: {
        export_state() {
            return this.fstate(this.state.sinks.creations.export);
        },
        content() {
            return (sink) => {
                const _content = this.fcontent(sink);
                if (!_content) {
                    return [];
                }
                if (!(_content instanceof Array) || _content.length === 0) {
                    return [];
                }
                return _content;
            };
        },
        langref_content() {
            const c = this.content(this.state.sinks.reads.langref);
            const langs = this.$store.state.global_config.langs.map(l => l.value);
            return c.filter(l => langs.indexOf(l.value) !== -1);
        },
        csl_format_content() {
            return CSLSpecs;
        },
        group_content() {
            return [];
        },
        sort_content() {
            return [
                {
                    label: 'l_sort_by_years_bexport',
                    value: 'dates.publication',
                },
                {
                    label: 'l_sort_by_authors_bexport',
                    value: 'denormalization.contributors.label.fullname.raw',
                },
                {
                    label: 'l_sort_by_titles_bexport',
                    value: 'title.content.raw',
                },
            ];
        },
        include_code() {
            return `<iframe src='${this.hostname}${this.state.link} style='width:100%;border:0;'></iframe>`;
        },
        hostname() {
            return `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
        },
    },
    mounted() {
        Object.keys(this.state.sinks.reads).forEach((name) => {
            this.$store.state.requests.push({
                name: 'search',
                type: 'dispatch',
                content: {
                    form: this.state.sinks.reads[name],
                    path: this.state.paths.reads[name],
                },
            });
        });

        this.execute_requests().then(() => {}).catch(err => console.error(err));
    },
};
