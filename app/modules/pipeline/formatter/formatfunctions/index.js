// @flow
const _ = require('lodash');
const Utils = require('../../../utils/utils');
const Handlebars = require('../../../utils/templating');

async function oarray_to_array(info: any): Promise<any> {
    const keys = Object.keys(info);
    keys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    return keys.reduce((obj, k) => {
        obj.push(info[k]);
        return obj;
    }, []);
}


function generic_formatter(template: string): Function {
    return async (existing_content: any, fullobject: Object): Promise<any> => {
        const t = Handlebars.compile(template)({ object: fullobject });
        return t;
    };
}

async function filter_empty_or_null_objects(result: Array<any>): Promise<Array<any>> {
    return Utils.filter_empty_or_null_objects(result);
}

/*
 *
 */
function set_default_lang_for_array(flang: string, iflang: string): Function {
    return async (result: Array<Object>, object: Object): Promise<Array<Object>> => {
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

function format_string(format: String): Function {
    return async (result: String): Promise<String> => {
        if (typeof result !== 'string') {
            return result;
        }
        switch (format) {
        case 'trim':
            return result.trim();
        case 'lower':
            return result.toLowerCase();
        case 'upper':
            return result.toUpperCase();
        default:
            return result;
        }
    };
}

module.exports = {
    oarray_to_array,
    generic_formatter,
    filter_empty_or_null_objects,
    set_default_lang_for_array,
    format_string,
};
