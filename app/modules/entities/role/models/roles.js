// @flow
const _ = require('lodash');
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
        orights: async (info, object) => {
            const rights = object.rights || [];
            const new_rights = _.reduce(info, (arr, val, key) => {
                let rights_for_entity = rights.find(o => o.entity === key);
                if (!rights_for_entity) {
                    rights_for_entity = { entity: key };
                }
                rights_for_entity.c = val.c || false;
                rights_for_entity.r = val.r || false;
                rights_for_entity.u = val.u || false;
                rights_for_entity.d = val.d || false;
                arr.push(rights_for_entity);
                return arr;
            }, []);

            object.rights = new_rights;
            return info;
        },
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
    Pipelines: [{
        Validation,
        Formatting,
        Completion,
        Defaults,
        Filtering: ['orights'],
    }],
    Messages,
    Name: 'Role',
};
