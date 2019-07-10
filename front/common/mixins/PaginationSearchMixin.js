const Vue = require('vue');
const _ = require('lodash');
const Handlebars = require('../../../app/modules/utils/templating');
const Messages = require('../api/messages');
const Utils = require('../utils/utils');
const FormMixin = require('./FormMixin');

module.exports = {
    mixins: [FormMixin],
    props: {
        searchPath: { required: true, type: String },
        searchSink: { default: 'search_read', type: String },
        resultSink: { required: true, type: String },
        searchQuery: { required: true, type: String },
        emptySearchQuery: { required: false, type: String },
        searchType: { required: true, type: String },
        useDefaultQuery: { default: false, type: Boolean }, // Run default query when typed_search === '' ?
        defaultQuery: { default: '{}', type: String },
        defaultSorts: { default: () => [], type: Array },
        filters: { default: () => [], type: Array },
        searchWhenFiltersChange: { default: false, type: Boolean },
        searchOnMount: { default: true, type: Boolean },
        changeWithCreateSuccess: { default: false, type: Boolean },
        formCreateSuccess: { default: 'dummy', type: String },
        searchQueryStringName: { default: 's', type: String },
        sesoQueryStringName: { default: 'seso', type: String },
    },
    data() {
        return {
            currentPage: 1,
            state: {
                seso: this.update_state(this.$route.query),
                loading: false,
            },
        };
    },
    methods: {
        onPageChangeHook(new_page, old_page) {
                // Need to be reimplemented if needed
        },
        show_success_read(sink) {
            if (sink === this.searchSink) {
                this.state.loading = false;
            }
        },
        show_success_delete(sink) {
            if (sink === this.resultSink) {
                this.run_search(this.searchSink);
            }
        },
        show_success(sink) {
            if (sink === this.formCreateSuccess) {
                this.run_search(this.searchSink);
            }
        },
        switch_to_loading(sink) {
            if (sink === this.searchSink) {
                this.state.loading = true;
            }
        },
        initialize() {
            this.state.loading = false;
            this.$store.commit(Messages.INITIALIZE, { form: this.resultSink });
        },
        get_information(query, opt, default_value) {
            if (!query) {
                return default_value;
            }

            if (!(opt in query)) {
                return default_value;
            }

            return query[opt];
        },
        get_order(type) {
            if (this.state.seso.sort === type) {
                if (this.state.seso.order === 'asc') {
                    return 'desc';
                }
                return 'asc';
            }
            return 'asc';
        },
        sort(type, order) {
            const q = _.merge({}, _.cloneDeep(this.$route.query || {}), { [`${this.sesoQueryStringName}_sort`]: type, [`${this.sesoQueryStringName}_order`]: order });

            // Reset pagination;
            this.currentPage = 1;
            if ('seso_paginate' in q) {
                delete q.seso_paginate;
            }
            q[`${this.sesoQueryStringName}_current`] = 1;
            this.state.seso.paginate = undefined;
            //

            this.state.seso = Object.assign({}, this.update_state(q));
            this.$router.push({ query: q });
            this.send_information(this.searchSink);
        },
        size(number) {
            const q = _.merge({}, _.cloneDeep(this.$route.query || {}), { [`${this.sesoQueryStringName}_size`]: number });

            // Reset pagination;
            this.currentPage = 1;
            if (`${this.sesoQueryStringName}_paginate` in q) {
                delete q[`${this.sesoQueryStringName}_paginate`];
            }

            q[`${this.sesoQueryStringName}_current`] = 1;
            this.state.seso.paginate = undefined;
            //

            this.state.seso = Object.assign({}, this.update_state(q));
            this.$router.push({ query: q });
            this.send_information(this.searchSink);
        },
        changePage(np, op) {
            this.state.seso.current = np;
            const obj = { [`${this.sesoQueryStringName}_current`]: np };

            const form_info = this.fform(this.resultSink);
            const hits = Utils.find_value_with_path(form_info, 'raw_content.result.hits'.split('.'));
            let sorts = [];
            if (hits) {
                sorts = hits.map(h => (h.sort || []));
            }

            const result = this.formatPaginate(sorts, this.state.seso, np < op);
            obj[`${this.sesoQueryStringName}_paginate`] = result;

            const q = _.merge({}, _.cloneDeep(this.$route.query || {}), obj);
            this.state.seso = Object.assign({}, this.update_state(q));
            this.$router.push({ query: q });
            this.send_information(this.searchSink);
            this.onPageChangeHook(np, op);
        },
        formatPaginate(sorts, seso, backward) {
            if (backward === undefined) {
                if (this.state.seso.paginate) {
                    backward = this.state.seso.paginate[0] === 'before';
                }
            }

            let sort_info = null;
            if (sorts instanceof Array) {
                if (sorts.length > 0) {
                    if (backward) {
                        sort_info = sorts[0];
                    } else {
                        sort_info = sorts[sorts.length - 1];
                    }
                }
            } else {
                sort_info = sorts;
            }

            let sa = [backward ? 'before' : 'after'];
            sa = sa.concat(sort_info);
            return sa;
        },
        add_extra_filters(sink, obj_name, dot_replacer = '*') {
            const content = this.fcontent(sink);

            if (!content || !(obj_name in content)) {
                return;
            }

            const obj = content[obj_name];
            let filters = _.map(obj, (value, idx) => {
                // Only the __bool is in the object, so it's empty
                if (Object.keys(value).length === 1 && idx > 0) {
                    return null;
                }

                const result = _.reduce(value, (acc, val, key) => {
                    if (!val || _.isEmpty(val)) {
                        return acc;
                    }

                    if (_.isPlainObject(val)) {
                        val = _.reduce(val, (arr, v) => {
                            arr.push(v);
                            return arr;
                        }, []);
                    }

                    acc[key.replace(new RegExp(`\\${dot_replacer}`, 'gi'), '.')] = val;
                    return acc;
                }, {});
                return result;
            }).filter(f => f != null);

            filters = filters.reduce((o, f, i) => {
                if (i === 0 && filters.length > 1) {
                    delete f.__bool;
                    o.$first = [f];
                    return o;
                }

                if ('__bool' in f) {
                    const bool = f.__bool;
                    delete f.__bool;
                    if (bool in o) {
                        o[bool].push(f);
                    } else {
                        o[bool] = [f];
                    }

                    if (i === 1) {
                        o[bool] = o[bool].concat(o.$first);
                        delete o.$first;
                    }
                }

                return o;
            }, {});

            this.state.seso.extra_filters = filters;
        },
        run_search(sink) {
            this.state.loading = true;
            const content = this.fcontent(sink);
            let new_content = {};

            const body = {
                size: this.state.seso.size,
                sort: [],
            };

            const extra_filters = this.state.seso.extra_filters || {};
            let where = {};
            if (this.state.seso.filters.length > 0) {
                where.$and = this.state.seso.filters.reduce((arr, filter) => {
                    arr.push(JSON.parse(filter));
                    return arr;
                }, []);
            }

            if (Object.keys(extra_filters).length > 0) {
                if ('$and' in where) {
                    where.$and = where.$and.concat(extra_filters);
                } else {
                    where.$and = [extra_filters];
                }
            }

            if ((!content.search || content.search.trim() === '')) {
                if (this.useDefaultQuery) {
                    const squery = JSON.parse(Handlebars.compile(this.defaultQuery)({}));

                    if (Object.keys(squery).length > 0) {
                        if (this.state.seso.filters.length > 0
                            || Object.keys(extra_filters).length > 0) {
                            where.$and.push(squery);
                        } else {
                            where = squery;
                        }
                    }
                } else if (this.emptySearchQuery) {
                    const squery = JSON.parse(Handlebars.compile(this.emptySearchQuery)({}));

                    if (Object.keys(squery).length > 0) {
                        if (this.state.seso.filters.length > 0
                            || Object.keys(extra_filters).length > 0) {
                            where.$and.push(squery);
                        } else {
                            where = squery;
                        }
                    }
                } else {
                    const squery = JSON.parse(Handlebars.compile(this.searchQuery)({}));
                    if (squery.body) {
                        Object.keys(squery.body).forEach((key) => {
                            if (content[key]) {
                                squery.body[key] = content[key];
                            }
                        });
                    }
                    where = squery;
                }
                body.where = where;
            } else {
                new_content = _.cloneDeep(content);
                new_content.search = new_content.search.replace(new RegExp('"', 'g'), '\\"');
                const squery = JSON.parse(Handlebars.compile(this.searchQuery)(new_content));
                if (this.state.seso.filters.length > 0 || Object.keys(extra_filters).length > 0) {
                    where.$and.push(squery);
                } else {
                    where = squery;
                }
                body.where = where;
            }

            const q = _.merge({}, _.cloneDeep(this.$route.query || {}), { [this.searchQueryStringName]: content.search || '',
                [`${this.sesoQueryStringName}_filter`]: this.state.seso.filters,
            /* seso_extra_filter: this.state.seso.extra_filters*/ });
            this.$router.replace({ query: q });

            if (this.state.seso.sort) {
                body.sort.push({ [`${this.state.seso.sort}`]: this.state.seso.order });
            }

            if (this.state.seso.paginate) {
                const direction = this.state.seso.paginate[0];
                if (direction === 'before') {
                    body.search_before = this.state.seso.paginate.slice(1);
                } else {
                    body.search_after = this.state.seso.paginate.slice(1);
                }
            }

            if (this.defaultSorts.length > 0) {
                body.sort = body.sort.concat(this.defaultSorts);
            }

            body.sort.push({ _uid: 'desc' });

            this.$store.dispatch('search', {
                path: this.searchPath,
                form: this.resultSink,
                body,
            });

            this.$store.commit(Messages.NOOP, {
                form: this.searchSink,
            });
        },
        update_state(q) {
            const obj = {
                current: this.get_information(q, `${this.sesoQueryStringName}_current`, 1),
                paginate: this.get_information(q, `${this.sesoQueryStringName}_paginate`),
                sort: this.get_information(q, `${this.sesoQueryStringName}_sort`),
                order: this.get_information(q, `${this.sesoQueryStringName}_order`),
                size: this.get_information(q, `${this.sesoQueryStringName}_size`, 20),
                filters: this.get_information(q, `${this.sesoQueryStringName}_filter`, this.filters || []),
                extra_filters: [], // this.get_information(q, 'seso_extra_filter', []),
                typed_search: this.get_information(q, this.searchQueryStringName, '').trim(),
            };

            // Validate field
            try {
                obj.current = parseInt(obj.current, 10);
            } catch (err) {
                obj.current = 1;
            }

            try {
                obj.size = parseInt(obj.size, 10);
            } catch (err) {
                obj.size = 20;
            }

            if (obj.order && obj.order !== 'asc' && obj.order !== 'desc') {
                obj.order = 'asc';
            }

            return obj;
        },
    },
    watch: {
        currentPage(np, op) {
            this.changePage(np, op);
        },
        filters(nf) {
            this.state.seso.filters = nf;
            if (this.searchWhenFiltersChange) {
                this.send_information(this.searchSink);
            }
        },
        current_state_search(s) {
            this.dispatch(s, this, this.searchSink);
        },
        current_state_result(s) {
            if (s !== 'loading') {
                this.state.loading = false;
            }
            this.dispatch(s, this, this.resultSink);
        },
        create_state_result(s) {
            this.dispatch(s, this, this.formCreateSuccess);
        },
    },
    computed: {
        current_state_search() {
            return this.fstate(this.searchSink);
        },
        current_state_result() {
            return this.fstate(this.resultSink);
        },
        create_state_result() {
            if (this.changeWithCreateSuccess) {
                return this.fstate(this.formCreateSuccess);
            }
            return null;
        },
    },
    mounted() {
        if (!this.searchOnMount) {
            return;
        }

        const sink = this.get_information(this.$route.query, 'sink', '').trim();
        const search = this.get_information(this.$route.query, this.searchQueryStringName, '').trim();
        // Avoid getting in a weird place in ElasticSearch search_after;
        this.state.seso.paginate = undefined;
        this.state.seso.current = 1;
        this.state.seso.filters = this.filters;
        if ((search === '' && sink === '') && !this.useDefaultQuery) {
            return;
        }

        let body = {
            search,
        };

        if (sink !== '') {
            const sink_info = this.fcontent(sink);
            if (sink_info && Object.keys(sink_info).length > 0) {
                body = sink_info;
            }
        }

        this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
            form: this.searchSink,
            body,
        });
        this.add_extra_filters(this.searchSink, 'pos_aggregate', '*');

        Vue.nextTick(() => {
            this.send_information(this.searchSink);
        });
    },
};
