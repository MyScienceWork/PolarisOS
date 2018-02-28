// @flow
const Joi = require('joi');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');
const EntitiesUtils = require('../../../utils/entities');
const moment = require('moment');
const Utils = require('../../../utils/utils');

const Validation: Array<any> = [
    Joi.object({
        'diffusion.rights.access': Joi.string().required().label('access'),
    }),
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [
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
