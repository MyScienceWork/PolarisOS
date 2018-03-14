// @flow
const Utils = require('../../../utils/utils');
const Handlebars = require('../../../utils/templating');

async function oarray_to_array(info: any): any {
    const keys = Object.keys(info);
    keys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    return keys.reduce((obj, k) => {
        obj.push(info[k]);
        return obj;
    }, []);
}


function generic_formatter(template: string): Function {
    return async (info: any, object: Object, key: string): any => {
        console.log(template, info, object, key);
        const t = Handlebars.compile(template)({ [key]: info });
        console.log(t);
        return t;
    };
}

async function filter_empty_or_null_objects(result: Array<any>): Array<any> {
    return Utils.filter_empty_or_null_objects(result);
}

/*
 *
 */
function set_default_lang_for_array(flang: string, iflang: string): Function {
    return async (result: Array<Object>, object: Object): Array<Object> => {
        if (!object[flang]) {
            return result;
        }

        if (result.length > 1) {
            return result;
        }

        return result.map((obj) => {
            if (obj[iflang]) {
                return obj;
            }
            obj[iflang] = object[flang];
            return obj;
        });
    };
}

module.exports = {
    oarray_to_array,
    generic_formatter,
    filter_empty_or_null_objects,
    set_default_lang_for_array,
};
