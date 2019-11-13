const VueScrollTo = require('vue-scrollto');

const APIRoutes = require('../../../common/api/routes');
const BrowserUtils = require('../../../common/utils/browser');
const Messages = require('../../../common/api/messages');

const FormMixin = require('../../../common/mixins/FormMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const FileAnalyzerMixin = require('./mixins/FileAnalyzerMixin');
const ImportMixin = require('./mixins/ImportMixin');

const SecondDepositStep = require('./second_step/SecondDepositStep.vue');

module.exports = {
    mixins: [FormMixin, RequestsMixin, UserMixin, FileAnalyzerMixin, ImportMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        publication: 'publication_creation',
                        // specs: 'publication_specs', //Expose by ImportMixin & FileAnalyzerMixin
                    },
                    reads: {
                        typology: 'typology_read',
                        subtypology: 'subtypology_read',
                    },
                },
                paths: {
                    creations: {
                        publication: APIRoutes.entity('publication', 'POST'), // Same path for PUT,
                        specs: 'publication_specs',
                    },
                    reads: {
                        publication: APIRoutes.entity('publication', 'GET'),
                        typology: APIRoutes.entity('typology', 'POST', true),
                    },
                    validations: {

                        publication: APIRoutes.entity('publication', 'VALIDATE', false, '0'),
                    },
                },
                forms: {
                    name: 'typology_form',
                    fname: 'typology',
                },
                current_step: 0,
                next_step: 0,
                prev_step: 0,
                total_steps: 5,
                stepper: {
                    next: undefined,
                },
                deposit_form_name: undefined,
                modal_has_been_validated: false,
                step_props: {},
                show_review_modal: false,
                show_give_up_modal: false,
            },
        };
    },
    methods: {
        reset_interface() {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.creations.publication,
            });
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.creations.specs,
            });
        },
        give_up() {
            window.location.reload();
        },
        transfert_to_subtypology_sink(children) {
            this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                form: this.state.sinks.reads.subtypology,
                body: undefined,
            });
            this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                form: this.state.sinks.reads.subtypology,
                body: { children },
            });
        },
        update_typology_form(form, children, type_id) {
            console.log('utf', form, this.state.deposit_form_name);
            if (!form || form.trim() === '') {
                if (this.state.deposit_form_name) {
                    this.state.deposit_form_name = undefined;
                    this.reset_interface();
                    return;
                }
            }

            if (form && form.trim() !== '') {
                if (this.state.deposit_form_name
                    && this.state.deposit_form_name !== form) {
                    this.reset_interface();
                }
                this.state.deposit_form_name = form;
                this.fetch_form(form, this.state.sinks.creations.specs);
                this.transfert_to_subtypology_sink(children);
            }
        },
        refetch_form() {
            this.fetch_form(this.state.deposit_form_name, this.state.sinks.creations.specs);
        },
        run_next_or_previous(f) {
            f();
            VueScrollTo.scrollTo('#deposit-stepper', 500);
            const content = this.fcontent(this.state.sinks.creations.publication);
            BrowserUtils.localSet('saved_deposit', content);
        },
        update_step(info) {
            this.state.next_step = info.next_step;
            this.state.prev_step = info.prev_step;
            this.state.current_step = info.step;
        },
        next(func, step, total) {
            this.state.stepper.next = func;
            this.send_information(this.state.sinks.creations.publication);
        },
        previous(func, step, total) {
            this.run_next_or_previous(func);
            this.state.paths.validations.publication = APIRoutes.entity('publication',
                'VALIDATE', false, `0-${this.state.current_step + 1}`);
        },
        send_information(sink) {
            if (sink !== this.state.sinks.creations.publication) {
                return;
            }

            const content = this.fcontent(this.state.sinks.creations.publication);
            let publications = [];
            if (!(this.$route.query.publications instanceof Array)) {
                publications[0] = this.$route.query.publications;
            } else {
                publications = this.$route.query.publications;
            }
            
            publications.forEach((publication) => {
                content._id = publication;
                this.$store.dispatch('update', {
                    form: this.state.sinks.creations.publication,
                    path: this.state.paths.creations.publication,
                    body: content,
                });
            });

            this.$router.push({ path: '/' });
        },
        show_success_validate(sink) {
            if (this.state.sinks.creations.publication !== sink) {
                return;
            }

            this.run_next_or_previous(this.state.stepper.next);

            this.state.paths.validations.publication = APIRoutes.entity('publication',
                'VALIDATE', false, `0-${this.state.current_step + 1}`);
        },
        show_success_read(sink) {
            this.handle_import(sink, this.state.sinks.creations.publication);
            this.handle_analyzed_file(sink, this.state.sinks.creations.publication);
        },
        show_success(sink) {
            console.log('success', sink);
            if (sink !== this.state.sinks.creations.publication) {
                return;
            }
            setTimeout(() => {
                this.go_after_success();
            }, 2500);
        },
        show_error(sink) {
            this.acknowledge_import_error(sink);
            this.acknowledge_analyze_error(sink);
            this.acknowledge_submission_error(sink);
        },
        go_after_success(give_up = false) {
            BrowserUtils.localRemove('saved_deposit');
            if (give_up) {
                this.$router.push({ path: '/' });
            } else {
                this.$router.push({ path: `u/${this.my_user_id}/profile?t=2` });
            }
        },
        open_review_modal(props) {
            this.state.step_props = props;
            this.state.show_review_modal = true;
        },
        review_publication() {
            this.state.modal_has_been_validated = true;
            this.next(this.state.step_props.next, this.state.step_props.step,
                this.state.step_props.numberOfSteps);
        },
        acknowledge_submission_error(sink) {
            if (sink !== this.state.sinks.creations.publication) {
                return;
            }
            console.log('submission error');
        },
    },
    components: {
        'second-deposit-step': SecondDepositStep,
    },
    beforeMount() {
        this.$store.state.requests.push({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads.typology,
                path: this.state.paths.reads.typology,
                body: {
                    size: 10000,
                    sort: [{ order: 'asc' }, { _uid: 'desc' }],
                },
            },
        });

        let type;
        if (!(this.$route.query.types instanceof Array)) {
            type = this.$route.query.types;
        } else {
            type = this.$route.query.types[0];
        }

        this.$store.state.requests.push({
            name: Messages.TRANSFERT_INTO_FORM,
            type: 'commit',
            content: {
                form: this.state.sinks.creations.publication,
                body: { type },
            },
        });
        this.execute_requests().then(() => {}).catch(err => console.error(err));
        this.reset_interface();
    },
    computed: {
        current_state() {
            return this.fstate(this.state.sinks.creations.publication);
        },
        unvalidated() {
            const form = this.fform(this.state.sinks.creations.publication);
            return Object.keys(form.validations || {}).length > 0;
        },
        success() {
            const form = this.fform(this.state.sinks.creations.publication);
            if (form && form.success) {
                if (form.success instanceof String) {
                    return form.success.trim() !== '';
                }
                return true;
            }
            return false;
        },
        in_mode() {
            // m = review / modify / model / new_version
            return m => this.$route.query && this.$route.query.type && this.$route.query.type === m;
        },
        publication_id() {
            if (this.$route.query && this.$route.query._id) {
                return this.$route.query._id;
            }
            return '';
        },
        typology_options() {
            const content = this.fcontent(this.state.sinks.reads.typology);
            if (!(content instanceof Array)) {
                return [];
            }

            return content.map((t, i) => {
                t.children = t.children.map((ch, j) => {
                    ch.tlabel = ch.label;
                    ch.path = `${i}.${j}`;
                    return ch;
                });
                return t;
            });
        },
        subtypology_options() {
            const content = this.fcontent(this.state.sinks.reads.subtypology);

            if ('children' in content) {
                return content.children;
            }

            return [];
        },
        publication_type() {
            const content = this.fcontent(this.state.sinks.creations.publication);
            if ('type' in content) {
                return content.type;
            }
            return null;
        },
        deposited_files() {
            const content = this.fcontent(this.state.sinks.creations.publication);
            if ('files' in content) {
                return content.files;
            }
            return [];
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this, this.state.sinks.creations.publication);
        },
        publication_type(nt) {
            if (!nt) {
                return;
            }

            const typology = this.typology_options.find(t => t._id === nt);
            if (!typology) {
                return;
            }

            const children = typology.children;
            const form_id = typology.children[0].form;
            this.update_typology_form(form_id, children, nt);
        },
    },
    beforeDestroy() {
        // Destroy all forms
        this.$store.commit(Messages.REMOVE_ALL_FORMS, {});
    },
};
