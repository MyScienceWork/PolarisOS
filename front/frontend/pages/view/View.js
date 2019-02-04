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
const Utils = require('../../../common/utils/utils');
const CopyRequester = require('./subcomponents/CopyRequester.vue');
const BrowserUtils = require('../../../common/utils/browser');
const TrackingMixin = require('../../../common/mixins/TrackingMixin');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin, OAMixin, UserMixin, FiltersMixin, TrackingMixin],
    components: {
        CopyRequester,
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
                        license: 'license_read',
                        contributor: 'contributor_read',
                        contributor_role: 'contributor_role_read',
                        depositor: 'depositor_read',
                        lang: 'lang_read',
                        typology: 'typology_read',
                        last_version: 'last_version_publication_read',
                    },
                },
                paths: {
                    reads: {
                        item: APIRoutes.entity('publication', 'POST', true),
                        license: APIRoutes.entity('license', 'POST', true),
                        contributor: APIRoutes.entity('author', 'POST', true),
                        contributor_role: APIRoutes.entity('contributor_role', 'POST', true),
                        depositor: APIRoutes.entity('user', 'POST', true),
                        lang: APIRoutes.entity('langref', 'POST', true),
                        typology: APIRoutes.entity('typology', 'POST', true),
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
                more_metadata: false,
                show_extra_files: false,
                selected_files: {

                },
            },
        };
    },
    methods: {
        run_export(format) {
            this.$store.dispatch('download', {
                path: APIRoutes.export(),
                body: {
                    ids: [this.content_item._id],
                    type: format || null,
                },
            });
        },
        select_all_extra_files(s) {
            this.$lodash.forEach(this.state.selected_files, (f) => {
                f.s = s;
            });
        },
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
        generate_handle_link(item) {
            const handle = (item.ids || []).find(f => f.type === 'handle');
            if (handle) {
                return handle._id;
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
                    this.state.current_subtitle = subtitle;
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
        see_more_metadata() {
            this.state.more_metadata = !this.state.more_metadata;
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

                if (ci.depositor) {
                    this.$store.dispatch('search', {
                        form: this.state.sinks.reads.depositor,
                        path: this.state.paths.reads.depositor,
                        body: {
                            where: {
                                _id: ci.depositor,
                            },
                        },
                    });
                }

                if (ci.lang) {
                    this.$store.dispatch('search', {
                        form: this.state.sinks.reads.lang,
                        path: this.state.paths.reads.lang,
                        body: {
                            where: {
                                value: ci.lang,
                            },
                        },
                    });
                }

                const license = this._oa_find(ci, 'diffusion.rights.license');
                if (license) {
                    this.$store.dispatch('search', {
                        form: this.state.sinks.reads.license,
                        path: this.state.paths.reads.license,
                        body: {
                            where: {
                                _id: license,
                            },
                        },
                    });
                }

                if (ci.contributors && ci.contributors.length > 0) {
                    this.$store.dispatch('search', {
                        form: this.state.sinks.reads.contributor,
                        path: this.state.paths.reads.contributor,
                        body: {
                            where: {
                                _id: ci.contributors.map(co => co.label),
                            },
                        },
                    });
                }

                if (ci.has_other_version) {
                    this.$store.dispatch('search', {
                        form: this.state.sinks.reads.last_version,
                        path: this.state.paths.reads.item,
                        body: {
                            projection: [],
                            where: {
                                'parents._id': ci._id,
                            },
                            sort: ['-version'],
                            size: 1,
                        },
                    });
                }
            }
        },
    },
    computed: {
        last_version_link() {
            const content = this.fcontent(this.state.sinks.reads.last_version) || [];
            if (!(content instanceof Array) || content.length === 0) {
                return null;
            }
            return `/view/${content[0]._id}`;
        },
        multi_download_link() {
            const names = this.$lodash.reduce(this.state.selected_files, (arr, f) => {
                if (f.s) {
                    arr.push(f.name);
                }
                return arr;
            }, []);

            const filenames = this.$lodash.reduce(this.state.selected_files, (arr, f) => {
                if (f.s) {
                    arr.push(f.url);
                }
                return arr;
            }, []);

            if (!this.content_item || names.length === 0 || filenames.length === 0) {
                return '#';
            }

            return APIRoutes.multi_download('publication', this.content_item._id, names, filenames);
        },
        is_all_extra_files_selected() {
            return this.$lodash.every(this.state.selected_files, f => f.s);
        },
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
                item.html = this.hlang(Handlebars.compile(item.denormalization.type.template)(item));
                this.state.selected_files = item.files.reduce((obj, file) => {
                    obj[file.name] = {
                        name: file.name,
                        url: file.url,
                        s: false,
                    };
                    return obj;
                }, {});

                return item;
            }
            return content;
        },
        depositor() {
            const content = this.fcontent(this.state.sinks.reads.depositor);
            if (content instanceof Array && content.length > 0) {
                const item = content[0];
                return item;
            }
            return null;
        },
        publication_lang() {
            const content = this.fcontent(this.state.sinks.reads.lang);
            if (content instanceof Array && content.length > 0) {
                const item = content[0];
                return item;
            }
            return null;
        },
        abstracts() {
            const item = this.content_item;
            if (!item) {
                return [];
            }

            return item.abstracts;
        },
        contributors() {
            const item = this.content_item;
            if (!item) {
                return '';
            }

            const publication_date = parseInt(moment(item.dates.publication).format('YYYY'), 10);
            const contributors_content = this.fcontent(this.state.sinks.reads.contributor);
            if (!(contributors_content instanceof Array) || contributors_content.length === 0) {
                return '';
            }

            const contributor_roles_content =
                this.fcontent(this.state.sinks.reads.contributor_role);
            if (!(contributor_roles_content instanceof Array)
                    || contributor_roles_content.length === 0) {
                return '';
            }


            const authors = item.contributors.filter(co => co.role === 'author');
            const others = item.contributors.filter(co => co.role !== 'author');

            const affiliations = {};
            const authors_content = authors.map((a) => {
                const info = _.find(contributors_content, coc => (coc._id === a.label));

                if (!info) {
                    return null;
                }
                const _affiliations = this._oa_find(info, 'denormalization.affiliations', []);
                let my_affiliations = _affiliations.filter((aff) => {
                    const from = parseInt(aff.from, 10);
                    if (aff.to) {
                        const to = parseInt(aff.to, 10);
                        return from <= publication_date && publication_date <= to;
                    }
                    return from <= publication_date;
                });

                if (my_affiliations.length === 0 && _affiliations.length > 0) {
                    my_affiliations = [_affiliations[0]];
                }

                const affiliation_numbers = [];
                if (my_affiliations.length > 0) {
                    my_affiliations.forEach((affiliation) => {
                        const iname = this._oa_find(affiliation, 'institution.name');
                        const teams = this._oa_find(affiliation, 'teams', []);
                        if (iname) {
                            const uid = `${affiliation.institution.name}_${teams.map(t => t._id).join('_')}`;
                            if (!(uid in affiliations)) {
                                affiliations[uid] = { a: affiliation, order: Object.keys(affiliations).length + 1 };
                            }
                            affiliation_numbers.push(affiliations[uid].order);
                        }
                    });
                }

                let fullname = `${info.lastname.toUpperCase()}`;
                if (info.firstname) {
                    fullname = `${info.firstname} ${fullname}`;
                }

                if (affiliation_numbers.length > 0) {
                    return `<strong>${fullname}</strong> <sup>${affiliation_numbers.join(',')}</sup>`;
                }
                return `<strong>${fullname}</strong>`;
            }).filter(a => a != null);

            const others_content = others.map((a) => {
                const info = _.find(contributors_content, coc => (coc._id === a.label));
                if (!info) {
                    return null;
                }
                const role = _.find(contributor_roles_content,
                        co_role => (a.role === co_role.value));

                let fullname = `${info.lastname.toUpperCase()}`;
                if (info.firstname) {
                    fullname = `${info.firstname} ${fullname}`;
                }
                return `<strong>${fullname} (${this.lang(role.abbreviation)})</strong>`;
            }).filter(a => a != null);

            return { contributors: [...authors_content, ...others_content].join(', '),
                affiliations };
        },
        affiliations() {
            const affiliations = _.sortBy(this.contributors.affiliations, 'order');
            return affiliations.map((aff) => {
                let teams = '';
                if (aff.a.teams && aff.a.teams.length > 0) {
                    teams = `<emph>${aff.a.teams.map(t => this.lang(t._id)).join(', ')}</emph><br />`;
                }
                return `${teams}<strong>${aff.a.institution.name}</strong>`;
            });
        },
        titles() {
            const item = this.content_item;
            if (!item || !item.title) {
                return [];
            }

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
            const item = this.content_item;
            if (!item) {
                return false;
            }

            const is_depositor = this.author && (item.depositor === this.author
                || item.depositor === this.author._id);
            const is_contributor = item.contributors
                .find(c => (this.author && (c.label === this.author || c.label === this.author._id)));

            if (is_depositor || is_contributor) {
                return true;
            }

            const files = item.files || [];
            if (files.length === 0) {
                return false;
            }

            const file = files[0];

            if (this.user && Object.keys(this.user).length > 0) {
                if (file.access.confidential) {
                    return false;
                }

                if (!file.access.delayed) {
                    return true;
                }

                if (file.access.delayed && +moment(item.diffusion.rights.embargo) < +moment()) {
                    return true;
                }
            }

            return !file.access.restricted
                || (file.access.delayed && +moment(item.diffusion.rights.embargo) < +moment());
        },
        has_extra_files() {
            const item = this.content_item;
            if (!item) {
                return [];
            }
            const files = item.files || [];
            return files.length > 1;
        },
        journal() {
            const item = this.content_item;
            if (!item) {
                return null;
            }

            if (!item.denormalization.journal) {
                return null;
            }

            if (!this.typology_type || this.typology_type.name !== 'journal') {
                return null;
            }

            const tpl = "{{denormalization.journal}}{{#if volume}}, #POS#LANGl_vol {{volume}}{{/if}}{{#if number}}, n°{{number}}{{/if}}, {{moment date=dates.publication format=\"YYYY\"}}{{#if pagination}}, p. {{pagination}}{{/if}}.{{#filter_nested ids type='type' value='doi'}}<br /><br /><strong>DOI</strong>: <a target='_blank' href='https://doi.org/{{_id}}'>{{_id}}</a>{{/filter_nested}}";

            return this.hlang(Handlebars.compile(tpl)(item));
        },
        book() {
            const item = this.content_item;
            if (!item) {
                return null;
            }

            if (!this.typology_type || this.typology_type.name !== 'book') {
                return null;
            }

            const tpl = "{{#if localisation.city}}{{localisation.city}} : {{/if}}{{#if denormalization.editor}}{{denormalization.editor}}, {{/if}}{{moment date=dates.publication format='YYYY'}}.{{#filter_nested ids type='type' value='doi'}}<br /><br /><strong>DOI</strong>: <a target='_blank' href='https://doi.org/{{_id}}'>{{_id}}</a>{{/filter_nested}}";
            return Handlebars.compile(tpl)(item);
        },
        chapter() {
            const item = this.content_item;
            if (!item) {
                return null;
            }


            if (!this.typology_type || this.typology_type.name !== 'chapter') {
                return null;
            }

            const tpl = "{{#if book_authors.length}}#POS#LANGl_in {{#people_join denormalization.book_authors}}{{_id.fullname}}{{#if role.abbreviation}} (#POS#LANG{{role.abbreviation}}){{/if}}{{/people_join}}, {{/if}}{{#if publication_title}}{{publication_title}}, {{/if}}{{#if localisation.city}}{{localisation.city}} : {{/if}}{{#if denormalization.editor}}{{denormalization.editor}}, {{/if}}{{moment date=dates.publication format='YYYY'}}{{#if pagination}}, p. {{pagination}}. {{/if}}{{#filter_nested ids type='type' value='doi'}}<br /><br /><strong>DOI</strong>: <a target='_blank' href='https://doi.org/{{_id}}'>{{_id}}</a>{{/filter_nested}}";
            return this.hlang(Handlebars.compile(tpl)(item));
        },
        conference() {
            const item = this.content_item;
            if (!item) {
                return null;
            }


            if (!this.typology_type || this.typology_type.name !== 'conference') {
                return null;
            }

            const tpl = "{{denormalization.conference}}, {{localisation.city}} (#POS#LANG{{denormalization.localisation.country}}){{#if dates.start}}, {{moment date=dates.start format='DD/MM'}}-{{moment date=dates.end format='DD/MM'}} / {{moment date=dates.end format='YYYY'}}{{/if}}.";
            return this.hlang(Handlebars.compile(tpl)(item));
        },
        other_document() {
            const item = this.content_item;
            if (!item) {
                return null;
            }


            if (!this.typology_type || this.typology_type.name !== 'other') {
                return null;
            }

            const tpl = "{{#if localisation.city}}{{localisation.city}}, {{/if}}{{#if denormalization.editor}}{{denormalization.editor}}, {{/if}}{{moment date=dates.publication format='YYYY'}}";
            return this.hlang(Handlebars.compile(tpl)(item));
        },
        working_paper() {
            const item = this.content_item;
            if (!item) {
                return null;
            }


            if (!this.typology_type || this.typology_type.name !== 'working-paper') {
                return null;
            }
            const tpl = "{{#if collection}}{{collection}}, {{/if}}{{#if number}}n°{{number}}, {{/if}}{{#if localisation.city}}{{localisation.city}} : {{/if}}{{#if denormalization.editor}}{{denormalization.editor}}, {{/if}}{{moment date=dates.publication format='YYYY'}}";
            return this.hlang(Handlebars.compile(tpl)(item));
        },
        press() {
            const item = this.content_item;
            if (!item) {
                return null;
            }


            if (!this.typology_type || this.typology_type.name !== 'press') {
                return null;
            }
            const tpl = "{{newspaper}}{{#if number}}, n°{{number}}{{/if}}{{moment date=dates.publication format=', MMMM YYYY'}}{{#if pagination}}, p. {{pagination}}{{/if}}.";
            return this.hlang(Handlebars.compile(tpl)(item));
        },
        thesis() {
            const item = this.content_item;
            if (!item) {
                return null;
            }


            if (!this.typology_type || this.typology_type.name !== 'thesis') {
                return null;
            }
            const tpl = "{{#if localisation.city}}{{localisation.city}} : {{/if}}{{#if denormalization.delivery_institution}}{{denormalization.delivery_institution}}, {{/if}}{{moment date=dates.publication format='YYYY'}}.";
            return this.hlang(Handlebars.compile(tpl)(item));
        },
        report() {
            const item = this.content_item;
            if (!item) {
                return null;
            }


            if (!this.typology_type || this.typology_type.name !== 'report') {
                return null;
            }
            const tpl = "{{#if publication_title}} {{publication_title}}, {{/if}}{{#if localisation.city}}{{localisation.city}} : {{/if}}{{#if denormalization.editor}}{{denormalization.editor}}, {{/if}}{{moment date=dates.publication format='YYYY, '}}{{#if pagination}}p. {{pagination}}.{{/if}}{{#filter_nested ids type='type' value='doi'}}<br /><br /><strong>DOI</strong>: <a class='has-text-purple' target='_blank' href='https://doi.org/{{_id}}'>{{_id}}</a>{{/filter_nested}}";
            return this.hlang(Handlebars.compile(tpl)(item));
        },
        themes() {
            const item = this.content_item;
            if (!item || !item.denormalization.classifications) {
                return [];
            }

            return item.denormalization.classifications.map(c => c._id.label);
        },
        keywords() {
            return (type) => {
                const item = this.content_item;
                if (!item) {
                    return '';
                }

                if (type === 'demovoc') {
                    const demovoc = Utils.find_value_with_path(item, 'denormalization.demovoc_keywords'.split('.'));
                    if (!demovoc || demovoc.length === 0) {
                        return '';
                    }
                    return demovoc.reduce((arr, k) => {
                        arr.push(k._id.label);
                        return arr;
                    }, []).join(', ');
                }

                if (item.keywords.length === 0) {
                    return '';
                }

                return item.keywords.reduce((arr, k) => {
                    if (k.type === type) {
                        arr.push(k.value);
                    }
                    return arr;
                }, []).join(', ');
            };
        },
        license() {
            const license = this.fcontent(this.state.sinks.reads.license);
            if (!license || !(license instanceof Array) || license.length === 0) {
                return null;
            }
            return license[0];
        },
        publication_version() {
            const item = this.content_item;
            if (!item) {
                return '';
            }

            return Utils.find_value_with_path(item, 'denormalization.publication_version'.split('.')) || '';
        },
        access_level() {
            const item = this.content_item;
            if (!item) {
                return '';
            }

            return Utils.find_value_with_path(item, 'denormalization.diffusion.rights.access'.split('.')) || '';
        },
        ids() {
            const item = this.content_item;
            if (!item) {
                return [];
            }

            return item.ids.filter(id => id.type != null);
        },
        teams() {
            const item = this.content_item;
            if (!item) {
                return [];
            }

            const arr = Utils.find_value_with_path(item, 'denormalization.diffusion.research_teams'.split('.'));

            if (!arr) {
                return [];
            }
            return arr.map(t => t._id.name);
        },
        projects() {
            const item = this.content_item;
            if (!item) {
                return [];
            }

            const iprojects = item.denormalization.diffusion.projects;
            const aprojects = item.denormalization.diffusion.anr_projects;
            const euprojects = item.denormalization.diffusion.european_projects;
            const all = [].concat(iprojects, aprojects, euprojects);
            return all.filter(s => s && s._id).map(s => s._id.name);
        },
        surveys() {
            const item = this.content_item;
            if (!item) {
                return [];
            }
            return item.denormalization.diffusion.surveys.map(s => s._id.name);
        },
        collection() {
            const item = this.content_item;
            if (!item) {
                return '';
            }

            return Utils.find_value_with_path(item, 'denormalization.diffusion.internal_collection'.split('.')) || '';
        },
        editor() {
            const item = this.content_item;
            if (!item) {
                return '';
            }
            return Utils.find_value_with_path(item, 'denormalization.editor'.split('.')) || '';
        },
        country() {
            const item = this.content_item;
            if (!item) {
                return '';
            }
            return Utils.find_value_with_path(item, 'denormalization.localisation.country'.split('.')) || '';
        },
        city() {
            const item = this.content_item;
            if (!item) {
                return '';
            }
            return Utils.find_value_with_path(item, 'localisation.city'.split('.')) || '';
        },
        description() {
            const item = this.content_item;
            if (!item) {
                return '';
            }
            return Utils.find_value_with_path(item, 'description'.split('.')) || '';
        },
        date() {
            return (type) => {
                const item = this.content_item;
                if (!item) {
                    return '';
                }

                if (type in item.dates) {
                    return moment(item.dates[type]).format('LL');
                }
                return '';
            };
        },
        typology_type() {
            const content = this.fcontent(this.state.sinks.reads.typology);

            if (!(content instanceof Array)) {
                return null;
            }

            const item = this.content_item;

            if (!item) {
                return null;
            }

            const tid = item.type;
            const info = content.filter(c => c._id === tid);
            if (info.length === 0) {
                return null;
            }

            return info[0];
        },
        embargo() {
            const item = this.content_item;
            if (!item) {
                return '';
            }

            if (!item.files || item.files.length === 0) {
                return '';
            }

            const is_embargoed = item.files.some(f => Utils.find_value_with_path(f, 'access.delayed'.split('.')));

            if (!is_embargoed) {
                return '';
            }

            const info = Utils.find_value_with_path(item, 'denormalization.diffusion.rights.embargo'.split('.'));
            if (info) {
                return Handlebars.compile("{{moment date=date, format='DD/MM/YYYY'}}")({ date: info });
            }
            return '';
        },
        resources() {
            const item = this.content_item;
            if (!item) {
                return [];
            }

            return item.resources.filter(r => (r.type != null && r.url != null));
        },
        host() {
            return BrowserUtils.getURLHost(window.location);
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.item,
            keepContent: false,
        });

        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.typology,
            keepContent: false,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.typology,
            path: this.state.paths.reads.typology,
            body: { where: {} },
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

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.contributor_role,
            path: this.state.paths.reads.contributor_role,
            body: {
                size: 10000,
                where: {},
            },
        });

        Auth.loggedIn('publication', ['r']).then((ok) => {
            this.state.loggedIn = ok;
        }).catch(err => console.error(err));
    },
};
