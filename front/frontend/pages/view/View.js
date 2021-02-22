const _ = require('lodash');
const moment = require('moment');
const Auth = require('../../../common/utils/auth');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const OAMixin = require('../../../common/mixins/ObjectAccessMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const Handlebars = require('../../../../app/modules/utils/templating');
const TrackingMixin = require('../../../common/mixins/TrackingMixin');
const HtmlMixin = require('../../../common/mixins/HtmlMixin');
const FileMixin = require('../../../common/mixins/FileMixin');
const Utils = require('../../../common/utils/utils');

module.exports = {
    mixins: [FileMixin, LangMixin, FormMixin, FormCleanerMixin, OAMixin, UserMixin, FiltersMixin, TrackingMixin, HtmlMixin],
    components: {
    },
    data() {
        return {
            state: {
                tracking: {
                    eid: this.$route.params.id,
                    entity_type: 'publication',
                    stat_type: 'view',
                },
                sinks: {
                    reads: {
                        item: 'item_read',
                        lang: 'lang_read',
                    },
                },
                paths: {
                    reads: {
                        item: APIRoutes.entity('publication', 'POST', true),
                        lang: APIRoutes.entity('langref', 'POST', true),
                    },
                },
                loggedIn: false,
            },
        };
    },
    methods: {
    },
    watch: {
    },
    computed: {
        item_id() {
            return this.$route.params.id || '';
        },
        content_item() {
            const content = this.fcontent(this.state.sinks.reads.item);
            if (content instanceof Array && content.length > 0) {
                const item = content[0];
                console.log('content item : ', item);
                return item;
            }
            console.log('content item : ', content);
            return content;
        },
        abstracts() {
            const item = this.content_item;
            if (!item) {
                return [];
            }

            return item.abstracts;
        },
        affiliations() {
            const affiliations = _.sortBy(this.contributors.affiliations, 'order');
            return affiliations.map(aff => `<strong>${aff}</strong>`);
        },
        contributors() {
            const item = this.content_item;
            if (!item) {
                return '';
            }
            const authors = item.denormalization.authors;
            const affiliations = [];

            const authors_content = authors.map((a) => {
                affiliations.push(a.institution.name);
                const affiliations_numbers = [affiliations.length];
                return `<strong>${a.researcher.full_name}</strong><sup>${affiliations_numbers.join(',')}</sup>`;
            }).filter(a => a != null);

            return { contributors: [...authors_content].join(', '),
                affiliations };
        },
        journal() {
            const item = this.content_item;
            if (!item) {
                return null;
            }

            if (!item.denormalization.journal || !item.denormalization.journal.name) {
                return null;
            }

            return item.denormalization.journal.name;
        },
        date() {
            return (type) => {
                const item = this.content_item;
                if (!item) {
                    return '';
                }

                if (type in item) {
                    return moment(item[type]).format('LL');
                }
                return '';
            };
        },
        working_paper() {
            const item = this.content_item;
            if (!item) {
                return null;
            }
            console.log("item : ", item);
            console.log("Utils.find_value_with_path(item, 'denormalization.group.value') : ", Utils.find_value_with_path(item, 'denormalization.group.value'));
            if (Utils.find_value_with_path(item, 'denormalization.group.value'.split('.')) !== 'working_paper') {
                return null;
            }
            const tpl = '{{#if series}}Series : {{series}} {{/if}}';
            return this.hlang(Handlebars.compile(tpl)(item));
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.item,
            keepContent: false,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.item,
            path: this.state.paths.reads.item,
            body: {
                where: {
                    _id: this.item_id,
                },
            },
        });

        Auth.loggedIn('publication', ['r']).then((ok) => {
            this.state.loggedIn = ok;
        }).catch(err => console.error(err));
    },
};
