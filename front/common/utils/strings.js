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

function lang(key, obj, n, clang) {
    if (!(key in clang)) {
        return key;
    }

    const info = clang[key];
    let text = key;
    // TODO finish implementation for few and many
    if (n == null) {
        if ('1' in info) {
            text = info['1'] || key;
        } else {
            text = info['n/a'] || key;
        }
    } else if (n === 0) {
        text = info.zero || info['n/a'] || key;
    } else if (n === 1) {
        text = info.one || info['n/a'] || key;
    } else if (n === 2) {
        text = info.two || info['n/a'] || key;
    } else {
        text = info.other || info['n/a'] || key;
    }

    if (obj == null || Object.keys(obj).length === 0) {
        return text;
    }

    return format_with_obj(text, obj);
}

module.exports = {
    format,
    format_with_obj,
    lang,
};
