// @flow
const Joi = require('joi');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ValFunctions = require('../../../pipeline/validator/valfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');
const EntitiesUtils = require('../../../utils/entities');
const moment = require('moment');
const Utils = require('../../../utils/utils');

const Validation: Array<any> = [
    ValFunctions.checks.is_conditioned_on('publication_version',
        i => (i != null && i.trim() !== ''),
        'files', (f => f != null && f.length > 0)),
    ValFunctions.checks.is_conditioned_on('diffusion.rights.access',
        (i => i != null && i.trim() !== ''),
        'files', (f => f != null && f.length > 0)),
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
