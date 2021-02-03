// @flow
const _ = require('lodash');
const Dot = require('dot-object');
const EntitiesUtils = require('../utils/entities');
const Validator = require('../pipeline/validator/validator');
const ConditionValidator = require('../entities/pipeline/pipeline');
const MailerUtils = require('../utils/mailer');
const Config = require('../../config');
const LangUtils = require('../utils/lang');
const Handlebars = require('../utils/templating');
const Logger = require('../../logger');

/**
 * Workflow management
 */
class Workflow {
    _Pipeline: Object;
    _pipelines: Object;
    _method: Object;
    _range: Object;
    _extra: Object;
    _item: Object;
    _type: Object;

    constructor(Pipeline: Object, pipelines, method, range, extra, result, type) {
        this._Pipeline = Pipeline;
        this._pipelines = pipelines;
        this._method = method;
        this._range = range;
        this._extra = extra;
        this._item = result;
        this._type = type;
    }

    async _get_workflows_from_entity(): Object {
        const entity = this._type;
        const workflows = await EntitiesUtils.search_and_get_sources('workflow', {
            where: {
                $and: [ { entity } ]
            },
            size: 100,
        });
        return workflows;
    }

    async _get_state_before_modification(): string {
        const id_entity = this._item._id;
        if (!id_entity) {
            return undefined;
        }
        const info = await EntitiesUtils.search(this._type, {
            where: {
                _id: id_entity,
            }
        });
        this._item._id = id_entity;
        const hits = EntitiesUtils.get_hits(info);
        if (hits.length > 0) {
            return hits[0].source.state;
        }
        return this._item.state;
    }

    async _ok_condition(condition: string): boolean {
        if (condition === "true") {
            console.log("condition is true !");
            return true;
        }
        const validator = new Validator();
        const joi_condition = ConditionValidator.compute_conditions(condition);
        // convert to dot object for joi to validate deep keys
        console.log("final validator : ", JSON.stringify(joi_condition.describe(), null, 2))
        console.log("object : ", JSON.stringify(Dot.dot(this._item), null, 2));
        const options =  {
            allowUnknown: true,
            abortEarly: false,
            convert: true,
            debug: true,
        };
        const errorsValidation = await validator
            .validate(Dot.dot(this._item), [joi_condition], options);
        Logger.info("errorsValidation : ", errorsValidation);
        if (!_.isEmpty(errorsValidation)) {
            return false;
        }
        Logger.info("no errors validation :)");
        return true;
    }

    async _change_state(action: Object) {
        console.log("action : ", action);
        if (!action.state) {
            return;
        }
        this._item.state = action.state;
        await this.run();
    }

    async _process_email(action: Object) {
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

    async _process_action(action: string) {
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
                Logger.info("process email : ", JSON.stringify(maction));
                await this._process_email(maction);
            case 'change_state':
                Logger.info("process change state : ", JSON.stringify(maction));
                Logger.info("process change item : ", JSON.stringify(this._item));
                await this._change_state(maction);
        }
    }


    async _run_actions(actions: Array) {
        if (actions.length === 0) {
            Logger.info("no actions to run")
            return;
        }

        for (let action of actions) {
            await this._process_action(action._id);
        }
    }

    async _run_transition(step: Object) {
        if (!step.conditions) {
            return;
        }
        for (const condition of step.conditions) {
            if (condition.condition) {
                const action_condition_validated = await this._ok_condition(condition.condition);
                Logger.info("transition condition : ", condition.condition);
                Logger.info("transition condition result : ", action_condition_validated);
                if (action_condition_validated) {
                    await this._run_actions(condition.actions);
                }
            }
        }
    }

    _initialize_state(workflow: Object) {
        if (!workflow.initial_state) {
            return;
        }
        this._item.state = workflow.initial_state;
    }

    async run(): string {
        const workflows = await this._get_workflows_from_entity();
        const state_before = await this._get_state_before_modification();
        let state_after = this._item.state;

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
                state_after = this._item.state;
                if (run_transition_step || run_state_step) {
                    await this._run_transition(step);
                    // run again pipeline if we need to denormalize new state
                    this._item = await this._Pipeline.run(this._item, this._type, this._pipelines, this._method, this._range, this._extra);
                } else if (state_after === undefined) {
                    Logger.info("initialize state");
                    this._initialize_state(workflow);
                    const new_state_after = this._item.state;
                    const run_state_step = (
                        step.type === "state"
                        && step.state_after.findIndex(state => state._id === new_state_after) !== -1);
                    if (run_state_step) {
                        await this._run_transition(step);
                        // run again pipeline if we need to denormalize new state
                        this._item = await this._Pipeline.run(this._item, this._type, this._pipelines, this._method, this._range, this._extra);
                    }
                }
            }
        }
        return this._item;
    }
}

module.exports = Workflow;
