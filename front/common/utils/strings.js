const _ = require('lodash');

function format(form, ...args) {
    return form.replace(/{(\d+)}/g, (match, number) => {
        if (typeof args[number] !== 'undefined') {
            return args[number];
        }
        return match;
    });
}

function format_with_obj(form, obj) {
    return form.replace(/{([A-Za-z_.-]+)}/g, (match, name) => {
        const info = _.get(obj, name);
        if (info != null) {
            return info;
        }
        return match;
    });
}
module.exports = {
    format,
    format_with_obj,
};
