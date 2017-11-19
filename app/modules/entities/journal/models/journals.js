// @flow
const _ = require('lodash');
const Joi = require('joi');
const JMapping = require('../../../../mappings/journal');

const Mapping: Object = JMapping.msw
    .mappings.journal.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
];

const Formatting: Array<any> = [
    {
        ids: async (ids) => {
            if (ids instanceof Object) {
                return _.filter(ids, id => Object.keys(id).length > 0);
            }
            return [];
        },
    },
    {
        mid: async (mid, object) => {
            if (object.ids != null && object.ids instanceof Array) {
                const masters = object.ids.filter(id => id.master);
                if (masters.length > 0) {
                    return masters[0].value;
                }
                return '';
            }
            return '';
        },
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {
    mid: '',
};

const Messages: Object = {
    set: 'Journal is successfully added',
    remove: 'Journal is successfully removed',
    modify: 'Journal is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Journal',
};
