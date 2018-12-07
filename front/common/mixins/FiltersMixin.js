const Utils = require('../utils/utils');
const moment = require('moment');
const _ = require('lodash');
const Handlebars = require('../../../app/modules/utils/templating');

function translate(value, fn, key) {
    if (value instanceof Array) {
        return value.map((v) => {
            if (key) {
                v[key] = fn(v[key]);
            } else {
                v = fn(v);
            }
            return v;
        });
    }

    if (key) {
        return fn(value[key]);
    }
    return fn(value);
}

module.exports = {
    filters: {
        truncate(value, length, separator = ' ') {
            if (value && length > 0) {
                return _.truncate(value, {
                    length,
                    separator,
                });
            }
            return value;
        },
        join(value, subpath, sep = ', ') {
            return value.map(v => Utils.find_value_with_path(v, subpath.split('.'))).filter(v => v != null).join(sep);
        },
        format_date(d, f = 'LLLL') {
            switch (f) {
            case 'fromNow':
                return moment(d).fromNow();
            default:
                return moment(d).format(f);
            }
        },
        eol_to_br(value) {
            return value.replace('\\n', '<br />');
        },
        format(value, opts, default_val = '') {
            if (typeof value === 'boolean') {
                if (value) {
                    return '<span class="icon"><i class="fa fa-check"></i></span>';
                }
                return '<span class="icon"><i class="fa fa-times"></i></span>';
            } else if (opts.date_field && opts.date_field.enabled) {
                if (!value) {
                    return value;
                }
                return moment(parseInt(value, 10) || value).format(opts.date_field.format || 'YYYY');
            }
            return value;
        },
        find(value, path) {
            if (value) {
                return Utils.find_value_with_path(value, path.split('.'));
            }
            return '';
        },
        translate,
        render(value, obj = {}) {
            return Handlebars.compile(value)(obj);
        },
        need_translation(value, should_translate, hlang, lang) {
            if (should_translate) {
                return translate(translate(value, hlang), lang);
            }
            return value;
        },
        show_lang_key(value, show, key) {
            if (show) {
                return `<abbr title="${key}">${value}</abbr>`;
            }
            return value;
        },
        nl2br(value) {
            return value.replace(/\n/g, '<br />');
        },
    },

};
