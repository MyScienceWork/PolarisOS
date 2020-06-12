// @flow
const Joi = require('joi');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');
const EntitiesUtils = require('../../../utils/entities');
const moment = require('moment');
const Utils = require('../../../utils/utils');

const Validation: Array<any> = [
    Joi.object({
        type: Joi.string().required().label('type'),
    }),
];

const Formatting: Array<any> = [
    {
        files: a => FormatFunctions.oarray_to_array(a),
    },
    {
        files: FormatFunctions.filter_empty_or_null_objects,
    },
    {
        files: async a => a.map((f) => {
            if ('not_is_master' in f) {
                delete f.not_is_master;
            }

            if ('size' in f) {
                f.size = parseFloat(f.size);
            }

            if (!('name' in f) || f.name.trim() === '') {
                f.name = f.url;
            }

            return f;
        }),
    },
];

const Completion: Array<any> = [
    {
        'denormalization.type.type': ComplFunctions.denormalization('typology', 'type', 'label', false),
    },
    {
        'denormalization.type.template': ComplFunctions.denormalization('typology', 'type', 'template', false),
    },
];

const Resetting: Object = {
    denormalization: {},
};

const Defaults: Object = {};

const Filtering: Array<string> = [];

module.exports = {
    Validation,
    Formatting,
    Completion,
    Resetting,
    Defaults,
    Filtering,
};
