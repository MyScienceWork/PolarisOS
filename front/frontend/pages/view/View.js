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
                console.log("content item : ", item);
                return item;
            }
            console.log("content item : ", content);
            return content;
        },
        abstracts() {
            const item = this.content_item;
            if (!item) {
                return [];
            }

            return item.abstracts;
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
        working_paper() {
            const item = this.content_item;
            if (!item) {
                return null;
            }

            const tpl = "{{#if collection}}{{collection}}, {{/if}}{{#if number}}n°{{number}}, {{/if}}{{#if localisation.city}}{{localisation.city}} : {{/if}}{{#if denormalization.editor}}{{denormalization.editor}}, {{/if}}{{moment date=dates.publication format='YYYY'}}";
            return this.hlang(Handlebars.compile(tpl)(item));
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
