const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const FormMixin = require('../../../common/mixins/FormMixin');
const OAMixin = require('../../../common/mixins/ObjectAccessMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const FileMixin = require('../../../common/mixins/FileMixin');

module.exports = {
    mixins: [FormMixin, OAMixin, FiltersMixin, FileMixin],
    components: {
    },
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        dataset: 'dataset_read',
                    },
                },
                paths: {
                    reads: {
                        dataset: APIRoutes.entity('dataset', 'POST', true),
                    },
                },
            },
        };
    },
    methods: {
        run_export(format) {
            this.$store.dispatch('download', {
                path: APIRoutes.export_dataset(),
                body: {
                    ids: [this.content_item._id],
                    type: format || null,
                },
            });
        },
    },
    watch: {
    },
    computed: {
        content_item() {
            const content = this.fcontent(this.state.sinks.reads.dataset);
            if (content instanceof Array && content.length > 0) {
                console.log("content : ", content);
                return content[0];
            }
            return content;
        },
        item_id() {
            return this.$route.params.id || '';
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.dataset,
            keepContent: false,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.dataset,
            path: this.state.paths.reads.dataset,
            body: {
                where: {
                    _id: this.item_id,
                },
            },
        });
    },
};
