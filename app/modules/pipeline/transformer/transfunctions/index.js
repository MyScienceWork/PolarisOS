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

function get_in_list(where: string, is: string, default_strategy: string = 'first'): Function {
    return async function func(path: string, info: Object): Promise<Object> {
        const segs = path.split('.');
        const wsegs = where.split('.');
        const results = Utils.find_value_with_path(info, segs);

        if (results == null || results.length === 0) {
            return Utils.make_nested_object_from_path(segs, '');
        }

        let choice = null;
        for (const i in results) {
            const result = results[i];
            const match = Utils.find_value_with_path(result, wsegs);
            if (match && match === is) {
                choice = result;
                break;
            }
        }

        if (!choice) {
            if (default_strategy === 'first') {
                return Utils.make_nested_object_from_path(segs, results[0]);
            }
            return Utils.make_nested_object_from_path(segs, '');
        }
        return Utils.make_nested_object_from_path(segs, choice);
    };
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
    get_in_list,
};
