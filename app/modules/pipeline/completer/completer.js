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
async function complete(object: Object, completers: Array<any>, info: ?Object): Promise<Object> {
    const final_promise = completers.reduce((promise, completer: any) => promise.then((obj) => {
        const subobjects_promises = _.map(completer, (func: Function, path: string) => {
            console.log(obj, path, info);
            return func(obj, path, info);
        });

        return new Promise((resolve, reject) => {
            Promise.all(subobjects_promises)
                .then(results => resolve(_.merge(obj, ...results, object)))
                .catch(err => reject(err));
        });
    }).catch(err => Logger.error(err)), Promise.resolve(object));

    const final_object = await final_promise;
    return final_object;
}

module.exports = complete;
