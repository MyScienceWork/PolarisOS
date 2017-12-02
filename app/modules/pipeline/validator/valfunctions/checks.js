// @flow
const _ = require('lodash');
const Utils = require('../../../utils/utils');
const Errors = require('../../../exceptions/errors');
const EntitiesUtils = require('../../../utils/entities');

function is_unique(path: string, type: string, error: ?Object): Function {
    return async function func(object: Object): Promise<boolean> {
        const p = path.split('.');
        const info = Utils.find_value_with_path(object, p);
        const result = await EntitiesUtils.search(type, { where: { [path]: info } });
        if (result && Object.keys(result).length > 0 && result.result.hits.length > 0) {
            error = error == null ? Errors.AlreadyExistingEntity : error;
            error.path = path;
            throw error;
        } else {
            return true;
        }
    };
}

module.exports = {
    is_unique,
};
