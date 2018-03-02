// @flow
const _ = require('lodash');
const Utils = require('../../../utils/utils');
const Errors = require('../../../exceptions/errors');
const EntitiesUtils = require('../../../utils/entities');
const Handlebars = require('../../../utils/templating');

function is_unique(path: string, type: string,
    filters: Array<Object> = [], error: ?Object): Function {
    return async function func(object: Object, method: string): Promise<boolean> {
        if (method === 'put') {
            return true;
        }

        const p = path.split('.');
        const info = Utils.find_value_with_path(object, p);


        let where = { [path]: info };
        if (filters.length > 0) {
            where = {
                $and: [
                    { [path]: info },
                ],
            };

            filters.forEach((f) => {
                const nf = Object.keys(f).reduce((obj, k) => {
                    obj[k] = Handlebars.compile(f[k])(object);
                    return obj;
                }, {});
                where.$and.push(nf);
            });
        }

        const result = await EntitiesUtils.search(type, { where });
        if (result && Object.keys(result).length > 0 && result.result.hits.length > 0) {
            error = error == null ? Errors.AlreadyExistingEntity : error;
            error.path = path;
            throw error;
        } else {
            return true;
        }
    };
}

function if_exists(path: string, type: string, error: ?Object): Function {
    return async function func(object: Object, method: string): Promise<boolean> {
        const p = path.split('.');
        const info = [...Utils.find_popvalue_with_path(object, p)];

        if (info.length === 0) {
            return true;
        }
        const result = await EntitiesUtils.search(type, { where: { $$ids: { values: info } } });
        if (result && Object.keys(result).length > 0 && result.result.hits.length > 0) {
            return true;
        }
        error = error == null ? Errors.InvalidEntity : error;
        error.path = path;
        throw error;
    };
}

function is_valid_json(path: string, error: ?Object): Function {
    return async function func(object: Object, method: string): Promise<boolean> {
        const p = path.split('.');
        const info = [...Utils.find_popvalue_with_path(object, p)];
        if (info.length === 0) {
            return true;
        }

        if (info[0] instanceof Object) {
            return true;
        }

        try {
            JSON.parse(info[0]);
            return true;
        } catch (err) {
            error = error == null ? Errors.InvalidObject : error;
            error.path = path;
            throw error;
        }
    };
}

module.exports = {
    is_unique,
    if_exists,
    is_valid_json,
};
