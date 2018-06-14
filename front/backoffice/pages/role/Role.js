const _ = require('lodash');
const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');

const EntitiesList = require('../../../common/lists/entities');
const SystemRolesList = require('../../../common/lists/system_roles');
const SystemPagesList = require('../../../common/lists/system_pages');

module.exports = {
    mixins: [ReaderMixin, LangMixin, ESQueryMixin, FormCleanerMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        role: APIRoutes.entity('role', 'POST', true),
                        page: APIRoutes.entity('page', 'POST', true),
                        entity: APIRoutes.entity('entity', 'POST', true),
                    },
                    creations: {
                        role: APIRoutes.entity('role', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        role: 'role_read',
                        page: 'page_read',
                        entity: 'entity_read',
                    },
                    creations: {
                        search: 'search_creation_roles',
                        role: 'roles_creation',
                    },
                },
                projections: {
                    reads: {
                        page: ['global_access.access'],
                        entity: ['type'],
                    },
                },
                es_query_id: 'backoffice-role-query',
            },
        };
    },
    methods: {
        transform_role(role) {
            role.orights = _.reduce(role.rights, (obj, info) => {
                obj[info.entity] = { c: info.c || false,
                    r: info.r || false,
                    u: info.u || false,
                    d: info.d || false };
                return obj;
            }, {});
            return role;
        },
    },
    mounted() {
        this.$store.state.requests = ['page', 'entity'].map(e => ({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 10000,
                    projection: this.state.projections.reads[e],
                },
            },
        }));
    },
    computed: {
        custom_entities() {
            const content = this.mcontent(this.state.sinks.reads.entity);
            content.sort((a, b) => (a.type > b.type) - (a.type < b.type));
            return content;
        },
        system_entities() {
            const all = EntitiesList.map(e => e.type).concat(SystemRolesList);
            const content = Array.from(new Set(all)).map(e => ({ type: e }));
            content.sort((a, b) => (a.type > b.type) - (a.type < b.type));
            return content;
        },
        pages() {
            const all = new Set([...this.custom_entities.map(e => e.type),
                ...this.system_entities.map(e => e.type)]);
            const system = new Set(SystemPagesList);
            const pages_content = this.mcontent(this.state.sinks.reads.page);
            const content = pages_content
                .filter(x => x.global_access && x.global_access.access && x.global_access.access.trim() !== '')
                .map(x => x.global_access.access)
                .filter(x => !all.has(x))
                .filter(x => !system.has(x))
                .map(e => ({ type: e }))
                .concat(SystemPagesList.map(e => ({ type: e })));
            content.sort((a, b) => (a.type > b.type) - (a.type < b.type));
            return content;
        },
    },
};
