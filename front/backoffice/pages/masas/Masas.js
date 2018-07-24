const moment = require('moment');
const _ = require('lodash');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const RequestMixin = require('../../../common/mixins/RequestsMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');

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
                        ined_status: 'ined_status_read',
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
                        ined_status: APIRoutes.entity('ined_status', 'POST', true),
                    },
                },
                orders: {
                    reads: {
                        typology: ['order'],
                        langref: ['order'],
                        project: ['-in_progress', '-start_year', 'name.raw'],
                        laboratory: ['-validity', '-types.ined', 'name.raw'],
                        author: ['lastname.raw', 'fullname.raw'],
                        ined_status: [],
                    },
                },
                activeSelectTab: 0,
                activeYearTab: 0,
            },
        };
    },
    methods: {
        submit() {
            this.state.link = null;
            this.send_information(this.state.sinks.creations.export);
        },
        send_information(sink) {
            if (sink === this.state.sinks.creations.export) {
                const content = this.fcontent(sink);
                const myurl = APIRoutes.export_masas();
                const params = {};
                const single_values = ['sort', 'size', 'start_year', 'end_year'];
                const multi_values = ['project', 'author', 'laboratory', 'typology', 'subtypogy', 'ined_status'];

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
                        _.forEach(content[n], (p) => {
                            if (n in params) {
                                params[n].push(encodeURIComponent('_id' in p ? p._id : p.value));
                            } else {
                                params[n] = [encodeURIComponent('_id' in p ? p._id : p.value)];
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
                    delete params.ined_status;
                } else if (this.state.activeSelectTab === 1) {
                    delete params.author;
                    delete params.project;
                    delete params.ined_status;
                } else if (this.state.activeSelectTab === 2) {
                    delete params.author;
                    delete params.laboratory;
                    delete params.ined_status;
                } else {
                    delete params.author;
                    delete params.laboratory;
                    delete params.project;
                }
                const querystring = _.reduce(params, (arr, value, key) => {
                    arr = arr.concat(value.map(v => `${key}=${v}`));
                    return arr;
                }, []).join('&');

                console.log(`${myurl}?${querystring}`);
                window.open(`${myurl}?${querystring}`);
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
        subtypology_content() {
            const typology = this.content(this.state.sinks.reads.typology);
            const children = _.flatten(typology.map(t => t.children)).reduce((arr, st) => {
                arr.push({ label: st.label, value: st.name });
                return arr;
            }, []);
            return children;
        },
        sort_content() {
            return [
                {
                    label: 'l_sort_by_years_bexport',
                    value: '-dates.publication',
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
    },
    mounted() {
        Object.keys(this.state.sinks.reads).forEach((name) => {
            this.$store.state.requests.push({
                name: 'search',
                type: 'dispatch',
                content: {
                    form: this.state.sinks.reads[name],
                    path: this.state.paths.reads[name],
                    body: {
                        sort: this.state.orders.reads[name] || [],
                    },
                },
            });
        });

        this.execute_requests().then(() => {}).catch(err => console.error(err));
    },
};
