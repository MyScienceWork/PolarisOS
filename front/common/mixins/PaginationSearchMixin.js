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
        searchType: { required: true, type: String },
    },
    data() {
        return {
            currentPage: 1,
            state: {
                seso: this.update_state(this.$route.query),
            },
        };
    },
    methods: {
        get_information(query, opt, default_value) {
            if (!query) {
                return default_value;
            }

            if (!(opt in query)) {
                return default_value;
            }

            return query[opt];
        },
        sort(type, order) {
            const q = _.merge({}, this.$route.query, { seso_sort: type, seso_order: order });

            // Reset pagination;
            this.currentPage = 1;
            if ('seso_paginate' in q) {
                delete q.seso_paginate;
            }
            q.seso_current = 1;
            this.state.seso.paginate = undefined;
            //

            this.state.seso = Object.assign({}, this.update_state(q));
            this.$router.push({ query: q });
            this.send_information(this.searchSink);
        },
        size(number) {
            const q = _.merge({}, this.$route.query, { seso_size: number });

            // Reset pagination;
            this.currentPage = 1;
            if ('seso_paginate' in q) {
                delete q.seso_paginate;
            }
            q.seso_current = 1;
            this.state.seso.paginate = undefined;
            //

            this.state.seso = Object.assign({}, this.update_state(q));
            this.$router.push({ query: q });
            this.send_information(this.searchSink);
        },
        changePage(np, op) {
            this.state.seso.current = np;
            const obj = { seso_current: np };

            const content = this.fcontent(this.resultSink);
            const result = this.formatPaginate(content, this.state.seso, np < op);
            obj.seso_paginate = result;

            const q = _.merge({}, this.$route.query, obj);
            this.state.seso = Object.assign({}, this.update_state(q));

            this.$router.push({ query: q });
            this.send_information(this.searchSink);
        },
        formatPaginate(content, seso, backward) {
            if (backward === undefined) {
                if (this.state.seso.paginate) {
                    backward = this.state.seso.paginate[0] === 'before';
                }
            }

            let source = null;
            if (content instanceof Array) {
                if (content.length > 0) {
                    if (backward) {
                        source = content[0];
                    } else {
                        source = content[content.length - 1];
                    }
                }
            } else {
                source = content;
            }

            const sa = [backward ? 'before' : 'after'];
            const _id = source._id;
            if (seso.sort) {
                const val = Utils.find_value_with_path(source, seso.sort.split('.'));
                if (val) {
                    sa.push(val);
                }
            }
            sa.push(`${this.searchType}#${_id}`);
            return sa;
        },
        search() {
            this.$store.commit(Messages.COLLECT, {
                form: this.searchSink,
            });
        },
        run_search(sink) {
            const content = this.fcontent(sink);
            const body = {
                where: JSON.parse(Handlebars.compile(this.searchQuery)(content)),
                size: this.state.seso.size,
                sort: [],
            };

            if (content.search) {
                const q = _.merge({}, this.$route.query, { s: content.search });
                this.$router.push({ query: q });
            }

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

            body.sort.push({ _uid: 'desc' });

            this.$store.dispatch('search', {
                path: this.searchPath,
                form: this.resultSink,
                body,
            });
        },
        update_state(q) {
            const obj = {
                current: this.get_information(q, 'seso_current', 1),
                paginate: this.get_information(q, 'seso_paginate'),
                sort: this.get_information(q, 'seso_sort'),
                order: this.get_information(q, 'seso_order'),
                size: this.get_information(q, 'seso_size', 20),
                typed_search: this.get_information(q, 's', '').trim(),
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
        current_state_search(s) {
            this.dispatch(s, this, this.searchSink);
        },
    },
    computed: {
        current_state_search() {
            return this.fstate(this.searchSink);
        },
    },
    mounted() {
        const search = this.get_information(this.$route.query, 's', '').trim();

        // Avoid getting in a weird place in ElasticSearch search_after;
        this.state.seso.paginate = undefined;
        this.state.seso.current = 1;

        if (search === '') {
            return;
        }

        this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
            form: this.searchSink,
            body: {
                search,
            },
        });

        this.send_information(this.searchSink);
    },
};
