// @flow
const Joi = require('@hapi/joi');
const Crypto = require('crypto');
const MenuMapping = require('../../../../mappings/chart');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = MenuMapping.msw.mappings.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [
    {
        aggregations: a => FormatFunctions.oarray_to_array(a),
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {
    query: '{}',
    format: {
        header: '{point.key}<br />',
        footer: '',
        point: '{serie.name}',
    },
    tooltip: {
        use_html: true,
        shared: true,
    },
    axis: {
        y: {
            title: '',
        },
    },
};

const Messages: Object = {
    set: 'Chart config is successfully added',
    remove: 'Chart config is successfully removed',
    modify: 'Chart config is successfully modified',
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
    Name: 'Chart',
};
