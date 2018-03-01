// @flow
const Joi = require('joi');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');
const EntitiesUtils = require('../../../utils/entities');
const moment = require('moment');
const Utils = require('../../../utils/utils');

const Validation: Array<any> = [
    {
        'diffusion.rights': Joi.object({
            access: Joi.string().required().label('access'),
        }),
    },
    /*Joi.object({
        publication_version: Joi.string().required().label('publication_version'),
    }),*/
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
