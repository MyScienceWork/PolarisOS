// @flow
const Joi = require('@hapi/joi');
const Crypto = require('crypto');
const WorkflowMapping = require('../../../../mappings/workflow');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = WorkflowMapping.msw.mappings.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [
    {
        steps: a => FormatFunctions.oarray_to_array(a),
    },
    {
        'steps.state_before': a => FormatFunctions.oarray_to_array(a),
        'steps.state_after': a => FormatFunctions.oarray_to_array(a),
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {
    global_access: {},
};

const Messages: Object = {
    set: 'Workflow is successfully added',
    remove: 'Workflow is successfully removed',
    modify: 'Workflow is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Pipelines: [{
        Validation,
        Formatting,
        Completion,
        Defaults,
    }],
    Messages,
    Name: 'Workflow',
};
