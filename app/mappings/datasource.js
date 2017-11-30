const _ = require('lodash');

const APIMapping = {
    protocol: { type: 'keyword', index: false },
    hostname: { type: 'keyword', index: false },
    port: { type: 'integer', index: false },
    pathname: { type: 'keyword', index: false },
    search: { type: 'keyword', index: false },
    type: { type: 'keyword', index: false }, // Method: POST, GET, PUT, DELETE
    params: {
        type: 'nested',
        properties: {
            key: { type: 'keyword', index: false },
            value: { type: 'keyword', index: false },
        },
    },
    headers: {
        type: 'nested',
        properties: {
            key: { type: 'keyword', index: false },
            value: { type: 'keyword', index: false },
        },
    },
    authorization: {
        properties: {
            enabled: { type: 'boolean', index: false },
            key: { type: 'keyword', index: false },
            secret: { type: 'keyword', index: false },
            template: { type: 'keyword', index: false },
        },
    },
    signature: {
        properties: {
            enabled: { type: 'boolean', index: false },
            template: { type: 'keyword', index: false },
            method: { type: 'keyword', index: false },
        },
    },
    timestamp: {
        properties: {
            enabled: { type: 'boolean', index: false },
            format: { type: 'keyword', index: false },
            name: { type: 'keyword', index: false },
        },
    },
};


module.exports = {
    msw: {
        mappings: {
            datasource: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    source: {
                        properties: _.merge({}, APIMapping),
                    },
                    form: {
                        type: 'keyword',
                        index: false,
                    },
                    pipeline: {
                        type: 'keyword',
                        index: false,
                    },
                },
            },
        },
    },
};
