// @flow
const Joi = require('joi');
const RoleMapping = require('../../../../mappings/role');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = RoleMapping.msw.mappings.role.properties;

const Validation: Array<any> = [
];

const Formatting: Array<any> = [
    {
        rights: a => FormatFunctions.oarray_to_array(a),
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Role is successfully added',
    remove: 'Role is successfully removed',
    modify: 'Role is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Role',
};
