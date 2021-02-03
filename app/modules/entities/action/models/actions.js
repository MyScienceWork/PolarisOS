// @flow
const ActionMapping = require('../../../../mappings/action');
const MMapping = require('../../crud/mapping');

const Mapping: Object = ActionMapping.msw.mappings.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {
};

const Messages: Object = {
    set: 'Action is successfully added',
    remove: 'Action is successfully removed',
    modify: 'Action is successfully modified',
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
    Name: 'Action',
};
