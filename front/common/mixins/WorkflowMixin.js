const _ = require('lodash');
const APIRoutes = require('../../common/api/routes');

module.exports = {
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        workflow: 'workflow_read',
                        entity_state: 'entity_state',
                    },
                },
                paths: {
                    reads: {
                        workflow: APIRoutes.entity('workflow', 'POST', true),
                    },
                },
                state_before: undefined,
            },
        };
    },
    methods: {
        find_matching_roles(role_workflow) {
            return _.findKey(this.roles, role_user => role_user._id === role_workflow._id);
        },
        find_matching_states(workflow_state, state) {
            return _.findKey(workflow_state, step_state => step_state._id === state);
        },
        filter_roles(step, state_before) {
            let allowed_states = [];

            if (step.roles.length > 0) {
                step.roles.some((role_workflow) => {
                    const indexRole = this.find_matching_roles(role_workflow);
                    const indexState = this.find_matching_states(step.state_before, state_before);
                    if (indexRole !== undefined && indexState !== undefined) {
                        // state after if allowed because before state AND role match
                        allowed_states = allowed_states.concat(step.state_after);
                        return true;
                    }
                    return false;
                });
            }

            return allowed_states;
        },
        all_status() {
            const content = this.fcontent(this.state.sinks.reads.entity_state);
            if (!(content instanceof Array)) {
                return [];
            }
            return content;
        },
    },
    watch: {
        dyn_form(workflow_states) {
            if (workflow_states.length === 0) {
                return;
            }
            const state = this.fcontent(this.state.sinks.creations[this.state.workflow_entity]).state;
            if (!state) {
                return;
            }
            const selected_state = workflow_states.find(workflow => (workflow._id === state));
            if (selected_state.form) {
                this.state.selected_publication_form = selected_state.form;
            }
        },
    },
    computed: {
        dyn_form() {
            const content = this.fcontent(this.state.sinks.reads.entity_state);
            if (!(content instanceof Array)) {
                return [];
            }
            return content;
        },
        after_status() {
            let allowed_states = [];

            if (this.state.state_before === undefined) {
                this.state.state_before = this.fcontent(this.state.sinks.creations[this.state.workflow_entity]).state;
            }
            const workflows = this.fcontent(this.state.sinks.reads.workflow);
            const state_before = this.state.state_before;
            const workflow_states = this.fcontent(this.state.sinks.reads.entity_state);
            const entity_workflows = _.filter(workflows, workflow => workflow.entity === this.state.workflow_entity);
            entity_workflows.forEach((workflow) => {
                workflow.steps.forEach((step) => {
                    allowed_states = allowed_states.concat(this.filter_roles(step, state_before));
                });
            });
            if (workflow_states.length > 0) {
                allowed_states.forEach((allowed_state, key) => {
                    const id_workflow_state = workflow_states.find(workflow_state => workflow_state._id === allowed_state._id);
                    if (id_workflow_state !== undefined) {
                        allowed_states[key].label = id_workflow_state.label;
                    }
                });
            } else {
                // search entity_state
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads.entity_state,
                    path: APIRoutes.entity(workflows[0].entity_state, 'POST', true),
                    body: {
                        size: 10000,
                    },
                });
            }
            return allowed_states;
        },
        initial_state() {
            const workflows = this.fcontent(this.state.sinks.reads.workflow);
            const workflow_name = this.$route.query.workflow;

            const idx = _.findIndex(workflows, workflow => workflow.name === workflow_name);
            if (idx !== -1) {
                return workflows[idx].initial_state;
            }

            return '';
        },
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.workflow,
            path: this.state.paths.reads.workflow,
            body: {
                size: 10000,
            },
        });
    },
};
