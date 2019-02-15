// @flow
const CacheMapping = require('../../../../mappings/cache');
const MMapping = require('../../crud/mapping');

const Mapping: Object = CacheMapping.msw.mappings.cache.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {
    global_access: {},
};

const Messages: Object = {
    set: 'Cache is successfully added',
    remove: 'Cache is successfully removed',
    modify: 'Cache is successfully modified',
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
    Name: 'Cache',
};
