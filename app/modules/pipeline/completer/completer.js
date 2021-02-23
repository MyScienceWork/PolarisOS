// @flow
const _ = require('lodash');
const Utils = require('../../utils/utils');
const Logger = require('../../../logger');

/**
 * Given an object and an array of completers as well as extra information that may
 * be interesting, complete the object iff the object does not exists (null or undefined)
 *
 * @param object - Object to complete
 * @param completers - Array of completers
 * @param info - Extra information
 */
async function complete(object: Object, completers: Array<any>,
        info: Object = {}): Promise<Object> {
    let final_object = object;
    for (const completer of completers) {
        const promises = _.map(completer, (func: Function, path: string) =>
            func(final_object, path, info));
        const results = await Promise.all(promises);
        // final_object = Utils.merge_with_superposition(final_object, ...results);
        final_object = Utils.merge_with_replacement(final_object, ...results);
    }
    return final_object;
}

module.exports = complete;
