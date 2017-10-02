// @flow

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RightsSchema: Object = {
    c: { type: Boolean, default: false },
    r: { type: Boolean, default: true },
    u: { type: Boolean, default: false },
    d: { type: Boolean, default: false },
};

function FilterSchema(ref: string): Object {
    return {
        blacklist: [{ type: Schema.Types.ObjectId, ref, index: true }],
        whitelist: [{ type: Schema.Types.ObjectId, ref, index: true }],
    };
}

const AccessSchema: Object = {
    rights: {
        organization: RightsSchema,
        suborganization: RightsSchema,
        device: RightsSchema,
        prequalification: RightsSchema,
        apiuser: RightsSchema,
        user: RightsSchema,
        template: RightsSchema,
        page: RightsSchema,
        widget: RightsSchema,
        task: RightsSchema,
        taskexec: RightsSchema,
        task_template: RightsSchema,
        customer: RightsSchema,
    },
    filter: {
        organization: FilterSchema('Organization'),
        suborganization: FilterSchema('Suborganization'),
        device: FilterSchema('Device'),
        prequalification: FilterSchema('Prequalification'),
        apiuser: FilterSchema('ApiUser'),
        user: FilterSchema('User'),
        template: FilterSchema('Template'),
        page: FilterSchema('Page'),
        widget: FilterSchema('Widget'),
        task: FilterSchema('Task'),
        taskexec: FilterSchema('TaskExec'),
        task_template: FilterSchema('TaskTemplate'),
        customer: FilterSchema('Customer'),
    },
};

module.exports = AccessSchema;
