// @flow

const _ = require('lodash');
const Utils = require('../../utils/utils');
const Logger = require('../../../logger');

/**
 * Format a given object using func.
 *
 * @private
 * @param object - Object to format
 * @param func - Formatting function
 * @param key - Path to access the field in object
 */
async function formatting(object: Object, func: Function, key: string) {
    const path = key.split('.');
    const last = path[path.length - 1];
    const result = Utils.find_value_with_path(object, path);
    const outer_object = Utils.find_object_with_path(object, path);
    if (result != null) {
        outer_object[last] = await func(result, object);
    }
}

/**
 * Formatting field of an object using a array of formatters
 *
 * @param object - Object to format
 * @param formatters : Array of formatters
 * @returns formatted object
 */
async function format(object: Object, formatters: Array<any>): Object {
    const promises = formatters.map((formatter: any) => _.reduce(formatter,
        (pr: Promise<*>, func: Function, key: string) => pr.then(
            () => formatting(object, func, key)).catch(err => Logger.error(err)),
        Promise.resolve()));

    await Promise.all(promises);
    return object;
}

module.exports = format;
