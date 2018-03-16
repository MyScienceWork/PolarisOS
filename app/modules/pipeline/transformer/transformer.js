// @flow
const _ = require('lodash');
const Utils = require('../../utils/utils');
const Logger = require('../../../logger');

async function apply_transducer(transducer: Object, object: Object,
    info: Object, final: Object = {}) {
    const promises = _.map(transducer, (func: Function, path: string) => func(path, object, info));
    const results = await Promise.all(promises);
    return Utils.merge_with_superposition(final, ...results);
}

async function transform(object: Object, transformers: Array<Object>,
    info: Object = {}): Promise<Object> {
    let final_object = {};
    if (transformers.length > 0) {
        final_object = await apply_transducer(transformers[0], object, info, {});
    }

    for (const transducer of transformers.slice(1)) {
        final_object = await apply_transducer(transducer, final_object, info, {});
    }
    return final_object;
}

module.exports = transform;
