const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FieldTypes = require('../../../common/lists/fieldtypes');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('form', 'POST'),
                rpath: APIRoutes.entity('form', 'GET'),
                itemsPerPage: 20,
                itemsPerRow: 2,
                selected_types: {},
                forms: {
                    csink: 'form_creation',
                    rsink: 'form_read',
                    rsink_entity: 'entities_read',
                    rsink_importer: 'importers_read',
                },
            },
        };
    },
    methods: {
        type_change(val, idx) {
            if (val == null) {
                if (idx in this.state.selected_types) {
                    delete this.state.selected_types[idx];
                }
            } else {
                this.$set(this.state.selected_types, idx, val.value);
            }
        },
    },
    mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.forms.rsink,
            path: this.state.rpath,
        });
        this.$store.dispatch('search', {
            form: this.state.forms.rsink_entity,
            path: APIRoutes.entity('entity', 'POST', true),
            body: {
                projection: ['type'],
                size: 10000,
            },
        });

        this.$store.dispatch('search', {
            form: this.state.forms.rsink_importer,
            path: APIRoutes.entity('importer', 'POST', true),
            body: {
                projection: ['name'],
                size: 10000,
            },
        });
    },
    computed: {
        content() {
            const content = this.mcontent(this.state.forms.rsink);
            return content.map((c) => {
                c.label = this.lang(c.label);
                c.description = this.lang(c.description);
                return c;
            });
        },
        importers() {
            const content = this.mcontent(this.state.forms.rsink_importer);
            return content || [];
        },
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        fieldtypes() {
            return FieldTypes.map(ft => ({ value: ft.value, label: this.lang(ft.label) }));
        },
        entities() {
            const content = this.mcontent(this.state.forms.rsink_entity);
            // TODO make this WAY cleaner;
            content.push({ type: 'entity' });
            content.push({ type: 'form' });
            content.push({ type: 'pipeline' });
            content.push({ type: 'user' });
            content.push({ type: 'role' });
            return content;
        },
    },
};
