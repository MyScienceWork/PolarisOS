const _ = require('lodash');
const VSelect = require('vue-select').VueSelect;
const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    props: {
        boxed: { type: Boolean, default: false },
        title: { type: String, default: '' },
        extraClasses: { default: '', type: String },
    },
    components: {
        'v-select': VSelect,
    },
    data() {
        return {
            state: {
                selected: [],
                selected_indexer: undefined,
                navigation: [
                    {
                        type: 'authors',
                        text: 'f_browse_by_author',
                        indexer: 'alpha',
                        select: true,
                        template: 'author-template',
                        item_per_row: 3,
                    },
                    {
                        type: 'years',
                        text: 'f_browse_by_year',
                        indexer: undefined,
                        select: true,
                        template: undefined,
                    },
                    {
                        type: 'types',
                        text: 'f_browse_by_type',
                        indexer: undefined,
                        select: true,
                        template: undefined,
                    },
                ],
            },
        };
    },
    methods: {
        onChange(val) {
            this.state.selected = val;
            this.$emit('select-change', val);
        },
        onIndexerChange(val) {
            this.state.selected_indexer = val.info;
        },
    },
    computed: {
        current_nav() {
            const query = this.$route.query;

            return query.i != null && query.i >= 0 ? this.state.navigation[query.i] : {};
        },
        indexer_options() {
            const a = this.authors.reduce((obj, a) => {
                obj[a.prefix] = obj[a.prefix] || [];
                obj[a.prefix].push(a);
                return obj;
            }, {});
            return a;
        },
        select_options() {
            switch (this.current_nav.type) {
            case 'authors': {
                this.authors.sort((a, b) => (a.lastname < b.lastname ? -1 : (a.lastname > b.lastname ? 1 : 0)));
                const authors = this.authors.map(a => ({ label: a.fullname, value: a._id }));
                return authors;
            }
            case 'years':
                return _.range(1900, 2018).map(y => ({ value: `${y}`, label: `${y}` }));
            case 'types':
                return [{ value: 'test', label: 'Test' }];
            default:
                return [];
            }
        },
        search() {
            if ('type' in this.current_nav) {
                return this.state.selected.map(
                    o => `${this.current_nav.type}=${encodeURIComponent(o.value)}`).join('&');
            }
            return '';
        },
        authors() {
            return [{
                fullname: 'Magali Barbieri',
                lastname: 'Barbieri',
                publications: 50,
                user_status: 'Chargée de recherche (Ined)',
                teams: ['Mortalité, santé, épidémiologie', 'DEMOSUD - Démographie des populations du Sud', 'Pôle Perspectives Internationales'],
                email: 'barbieri@ined.fr',
                prefix: 'B',
                _id: 'mbarbieri',
            },
            {
                fullname: 'Noël Bonneuil',
                lastname: 'Bonneuil',
                publications: 73,
                user_status: 'Directeur de recherche (Ined)',
                teams: ['Mathématiques, statistiques, économétrie',
                    'Systèmes dynamiques de la démographie et de l\'économie',
                    'Génétique des populations', 'Épidémiologie'],
                email: 'noel.bonneuil@ined.fr',
                prefix: 'B',
                _id: 'nbonneuil',
            },
            {
                fullname: 'Corentin Ribeyre',
                lastname: 'Ribeyre',
                publications: 17,
                user_status: 'Chercheur étranger',
                teams: ['Computational Learning & Computational Linguistics'],
                email: 'corentin.ribeyre@unige.ch',
                prefix: 'R',
                _id: 'cribeyre',
            },
            {
                fullname: 'Valérie Golaz',
                lastname: 'Golaz',
                publications: 32,
                user_status: 'Chargée de recherche (Ined)',
                teams: ['Mortalité, logement et entourage', 'DEMOSUD - Démographie des populations du Sud', 'Pôle Perspectives Internationales'],
                email: 'valerie.golaz@ined.fr',
                prefix: 'G',
                _id: 'vgolaz',
            },
            {
                fullname: 'Jacques Vallin',
                lastname: 'Vallin',
                publications: 86,
                user_status: 'Directeur de recherche (Ined)',
                teams: ['Mortalité, santé, épidémiologie', 'DEMOSUD - Démographie des populations du Sud', 'Pôle Perspectives Internationales'],
                email: 'vallin@ined.fr',
                prefix: 'V',
                _id: 'jvallin',
            },
            ];
        },
    },
};
