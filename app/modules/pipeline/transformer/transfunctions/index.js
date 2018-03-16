// @flow
const _ = require('lodash');
const Handlebars = require('../../../utils/templating');
const Utils = require('../../../utils/utils');

function identity(flatten: boolean = false): Function {
    return async function func(path: string, info: Object): Promise<Object> {
        const segs = path.split('.');
        const results = [...Utils.find_popvalue_with_path(info, segs)];

        if (flatten) {
            if (results.length > 0) {
                return Utils.make_nested_object_from_path(segs, results[0]);
            }
            return Utils.make_nested_object_from_path(segs, '');
        }
        return Utils.make_nested_object_from_path(segs, results);
    };
}

function template_identity(tpl: string, flatten: boolean = false): Function {
    return async function func(path: string, info: Object, external: Object): Promise<Object> {
        const segs = path.split('.');
        let results = [...Utils.find_popvalue_with_path(info, segs)];
        results = results.map((i) => {
            const o = _.merge({}, external, { __path: i });
            return Handlebars.compile(tpl)(o);
        });

        if (flatten) {
            if (results.length > 0) {
                return Utils.make_nested_object_from_path(segs, results[0]);
            }
            return Utils.make_nested_object_from_path(segs, '');
        }
        return Utils.make_nested_object_from_path(segs, results);
    };
}

async function flatten(path: string, info: Object): Promise<Object> {
    const segs = path.split('.');
    const result = Utils.find_value_with_path(info, segs);

    if (result) {
        return { [path]: result };
    }
    return { [path]: '' };
}
/* function generic_complete(template: string): Function {
    return async (object: Object, path: string, info: Object = {}) => {
        const t = Handlebars.compile(template)({ object, info });
        return Utils.make_nested_object_from_path(path.split('.'), t);
    };
}*/

module.exports = {
    identity,
    template_identity,
    flatten,
};
