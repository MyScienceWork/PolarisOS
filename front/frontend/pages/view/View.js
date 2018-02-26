const _ = require('lodash');
const moment = require('moment');
const Auth = require('../../../common/utils/auth');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const Handlebars = require('../../../../app/modules/utils/templating');

const CopyRequester = require('./subcomponents/CopyRequester.vue');

module.exports = {
    mixins: [LangMixin, FormMixin],
    components: {
        CopyRequester,
    },
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        item: 'item_read',
                        author: 'author_read',
                    },
                },
                paths: {
                    reads: {
                        item: APIRoutes.entity('publication', 'POST', true),
                        author: APIRoutes.entity('author', 'GET', true),
                    },
                },
                loggedIn: false,
                copyRequest: false,
                current_abstract: {
                    content: '',
                    lang: '',
                },
                current_title: {
                    content: '',
                    lang: '',
                },
                current_subtitle: {
                    content: '',
                    lang: '',
                },
            },
        };
    },
    methods: {
        generate_download_link(status) {
            const files = this.content_item.files || [];
            if (files.length === 0) {
                return '#';
            }

            if (status === 'master') {
                const file = _.find(files, f => f.is_master) || files[0];
                return `/download/publication/${this.content_item._id}/${file.url}`;
            } else if (status === 'all') {
                return '#';
            }
            return '#';
        },
        activate_lang(type, lang) {
            switch (type) {
            default:
            case 'title': {
                const title = _.find(this.titles, t => t.lang === lang);
                const subtitle = _.find(this.subtitles, t => t.lang === lang);
                if (title) {
                    this.state.current_title = title;
                }
                if (subtitle) {
                    this.state.current_subtitle = title;
                }
                break;
            }
            case 'abstract': {
                const abstract = _.find(this.abstracts, t => t.lang === lang);
                if (abstract) {
                    this.state.current_abstract = abstract;
                }
                break;
            }
            }
        },
    },
    watch: {
        current_state_item(s) {
            this.dispatch(s, this, this.state.sinks.reads.item);
        },
        content_item(ci) {
            if (ci) {
                this.activate_lang('title', ci.lang);
                this.activate_lang('abstract', ci.lang);
            }
        },
    },
    computed: {
        item_id() {
            return this.$route.params.id || '';
        },
        current_state_item() {
            return this.fstate(this.state.sinks.reads.item);
        },
        content_item() {
            const content = this.fcontent(this.state.sinks.reads.item);
            if (content instanceof Array && content.length > 0) {
                const item = content[0];
                item.html = Handlebars.compile(item.denormalization.type.template)(item);
                return item;
            }
            return content;
        },
        abstracts() {
            const item = this.content_item;
            return item.abstracts;
        },
        authors() {
            const item = this.content_item;
            const authors = item.denormalization.authors || [];

            const names = authors
                .map(a => (a._id.fullname || ''))
                .filter(a => a !== '')
                .map(a => `<strong>${a}</strong>`)
                .join(', ');
            return names;
        },
        titles() {
            const item = this.content_item;
            if (!item.title.lang) {
                item.title.lang = item.lang;
            }

            if (item.translated_titles.length === 0) {
                return [item.title];
            }
            const ttitles = item.translated_titles.filter(tt => tt.lang && tt.content && tt.content.trim() !== '');

            return [item.title].concat(ttitles);
        },
        subtitles() {
            const item = this.content_item;
            return item.subtitles;
        },
        is_files_accessible() {
            const files = this.content_item.files || [];
            if (files.length === 0) {
                return false;
            }

            const file = files[0];
            return !file.access.restricted
                || (file.access.delayed && +moment(this.content_item.diffusion.rights.embargo) < +moment());
        },
        has_extra_files() {
            const files = this.content_item.files || [];
            return files.length > 1;
        },
        journal() {
            const item = this.content_item;
            return item.denormalization.journal || '';
        },
        conference() {

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
