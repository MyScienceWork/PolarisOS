// @flow
const _ = require('lodash');
const Request = require('superagent');
const Dot = require('dot-object');
const EntitiesUtils = require('../utils/entities');
const Validator = require('../pipeline/validator/validator');
const ConditionValidator = require('../entities/pipeline/pipeline');
const MailerUtils = require('../utils/mailer');
const Config = require('../../config');
const LangUtils = require('../utils/lang');
const Handlebars = require('../utils/templating');
const config = require('../../config');
const Logger = require('../../logger');

/**
 * Workflow management
 */
class Workflow {
    constructor() {
    }

    static async _get_workflows_from_entity(entity: string): Object {
        const workflows = await EntitiesUtils.search_and_get_sources('workflow', {
            where: {
                $and: [ { entity } ]
            },
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
        item._id = id_entity;
        const hits = EntitiesUtils.get_hits(info);
        if (hits.length > 0) {
            return hits[0].source.state;
        }
        return undefined;
    }

    static async _ok_condition(condition: string, item: Object): boolean {
        if (condition === "true") {
            console.log("condition is true !");
            return true;
        }
        const validator = new Validator();
        const joi_condition = ConditionValidator.compute_conditions(condition);
        // convert to dot object for joi to validate deep keys
        console.log("final validator : ", JSON.stringify(joi_condition.describe(), null, 2))
        console.log("object : ", JSON.stringify(Dot.dot(item), null, 2));
        const options =  {
            allowUnknown: true,
            abortEarly: false,
            convert: false,
            debug: true,
        };
        const errorsValidation = await validator
            .validate(Dot.dot(item), [joi_condition], options);
        Logger.info("errorsValidation : ", errorsValidation);
        if (!_.isEmpty(errorsValidation)) {
            return false;
        }
        return true;
    }

    static async _change_state(action: Object, item: Object, entity: string) {
        if (!action.state) {
            return;
        }
        item.state = action.state;
        const workflow = new Workflow();
        workflow.run(entity, item);
    }

    static async _process_email(action: Object) {
        if (!action.recipient) {
            Logger.error("no recipient found")
            return;
        }


        const templates = await EntitiesUtils.search_and_get_sources('mail_template', {
            where:
                {
                    _id: action.email_template,
                },
        });
        if (templates.length === 0) {
            Logger.error("no template found")
            return;
        }

        const template = templates[0];

        const email_config = await MailerUtils.get_email_config();

        if (!email_config) {
            Logger.error("no email config found")
            return;
        }

        Logger.info("send email : ", JSON.stringify(action));

        const default_sender = email_config.default_sender || Config.email.default_sender;

        const lang = 'EN';
        const info_subject = Handlebars.compile(template.subject)({});
        const info_body = Handlebars.compile(template.body)({});
        const subject = await LangUtils.strings_to_translation(info_subject, lang);
        const body = await LangUtils.strings_to_translation(info_body, lang);

        await MailerUtils.send_email_with(default_sender, action.recipient, subject, body)
    }

    static async _process_action(action: string, item: Object, entity: string) {
        const info = await EntitiesUtils.search('action', {
            where: {
                _id: action,
            }
        });
        let hits = EntitiesUtils.get_hits(info);
        if (hits.length === 0) {
            Logger.info("no actions found");
            return;
        }
        const maction = hits[0].source;
        switch (maction.type) {
            case 'email':
                return Workflow._process_email(maction);
            case 'change_state':
                return Workflow._change_state(maction, item, entity);
        }
    }


    static async _run_actions(actions: Array, item: Object, entity: String) {
        if (actions.length === 0) {
            Logger.info("no actions to run")
            return;
        }

        actions.forEach(action => {
           Workflow._process_action(action._id, item, entity);
        });
    }

    static async _run_transition(step: Object, item: Object, entity: string) {
        if (!step.conditions) {
            return;
        }
        for (const condition of step.conditions) {
            const action_condition_validated = await Workflow._ok_condition(condition.condition, item);
            Logger.info("transition condition : ", condition.condition);
            Logger.info("transition item : ", JSON.stringify(item));
            Logger.info("transition condition result : ", action_condition_validated);
            if (action_condition_validated) {
                Workflow._run_actions(condition.actions, item, entity);
            }
        }
    }

    static _initialize_state(workflow: Object, item: Object, entity: string) {
        if (!workflow.initial_state) {
            return;
        }
        item.state = workflow.initial_state;
    }

    async run(item: Object, entity: string, Pipeline, pipelines, method, range, extra): string {
        const workflows = await Workflow._get_workflows_from_entity(entity);
        const state_before = await Workflow._get_state_before_modification(entity, item);
        const state_after = item.state;

        for (let workflow of workflows) {
            const steps = workflow.steps;
            for (let step of steps) {
                const run_transition_step = (
                    step.type === "transition"
                    && step.state_before.findIndex(state => state._id === state_before) !== -1
                    && step.state_after.findIndex(state => state._id === state_after) !== -1
                );
                const run_state_step = (
                    step.type === "state"
                    && step.state_after.findIndex(state => state._id === state_after) !== -1
                );
                Logger.info("run transition step : ", run_transition_step);
                Logger.info("run state step : ", run_state_step);
                if (run_transition_step || run_state_step) {
                    await Workflow._run_transition(step, item, entity);
                } else if (state_after === undefined) {
                    Logger.info("initialize state");
                    Workflow._initialize_state(workflow, item, entity);
                    
                    // run again pipeline if we need to denormalize new state
                    item = await Pipeline.run(item, entity, pipelines, method, range, extra);

                    const new_state_after = item.state;
                    const run_state_step = (
                        step.type === "state"
                        && step.state_after.findIndex(state => state._id === new_state_after) !== -1);
                    if (run_state_step) {
                        Workflow._run_transition(step, item, entity);
                    }
                }
            }
        }
        return item;
    }
}

module.exports = Workflow;
