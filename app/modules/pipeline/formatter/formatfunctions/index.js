// @flow

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

module.exports = {
    oarray_to_array,
    generic_formatter,
};
