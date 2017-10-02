// @flow
const Joi = require('joi');
const CitationMapping = require('../../../../mappings/citation');

const Mapping: Object = CitationMapping.msw
    .mappings.citation.properties;

const Validation: Array<any> = [
];

const Formatting: Array<any> = [];

const Completion: Array<any> = [];

const Messages: Object = {
    set: 'Citation is successfully added',
    remove: 'Citation is successfully removed',
    modify: 'Citation is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Name: 'Citation',
};
