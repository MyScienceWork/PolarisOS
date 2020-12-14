// @flow
const _ = require('lodash');
const EntitiesUtils = require('../utils/entities');
const Validator = require('../pipeline/validator/validator');
const ConditionValidator = require('../entities/pipeline/pipeline');

/**
 * Workflow management
 */
class Workflow {
    constructor() {
    }

    static async _get_workflows_from_entity(entity: string): Object {
        const workflows = await EntitiesUtils.search_and_get_sources('workflow', {
            entity,
            size: 100,
        });
        return workflows;
    }

    static async _get_state_before_modification(entity: string, item: Object): string {
        const id_entity = item._id;
        if (!id_entity) {
            return undefined;
        }

        const info = await EntitiesUtils.search(entity, {
            where: {
                _id: id_entity,
            }
        });
        let hits = EntitiesUtils.get_hits(info);
        if (hits.length > 0) {
            return hits[0].source.state;
        }
        return undefined;
    }

    static async _ok_condition(condition: string, item: Object): boolean {
        const validator = new Validator();
        const joi_condition = ConditionValidator.compute_condition({ field: condition });
        const errorsValidation = await validator
            .validate(item, [joi_condition]);
        if (!_.isEmpty(errorsValidation)) {
            return false;
        }
        return true;
    }

    static async _run_action(actions: Array) {
        if (actions.length === 0) {
            return;
        }

        actions.forEach(action => {
           console.log("action : ", action);
        });
    }

    static async _run_transition(step: Object, item: Object) {
        if (!step.conditions) {
            return;
        }
        for (const condition of step.conditions) {
            const action_condition_validated = await Workflow._ok_condition(condition.condition, item);
            if (action_condition_validated) {
                Workflow._run_action(condition.actions);
            }
        }
    }

    async run(entity: string, item: Object): string {
        const workflows = await Workflow._get_workflows_from_entity(entity);
        const state_before = await Workflow._get_state_before_modification(entity, item);
        const state_after = item.state;

        workflows.forEach(workflow => {
            workflow.steps.forEach(step => {
                const run_transition_step = (
                    step.type === "transition"
                    && step.state_before.findIndex(state => state._id === state_before) !== -1
                    && step.state_after.findIndex(state => state._id === state_after) !== -1
                );
                const run_state_step = (
                    step.type === "state"
                    && step.state_after.findIndex(state => state._id === state_after) !== -1
                );
                if (run_transition_step || run_state_step) {
                    Workflow._run_transition(step, item);
                }
            });
        });
    }
}

module.exports = Workflow;
