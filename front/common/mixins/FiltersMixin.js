const Utils = require('../utils/utils');
const moment = require('moment');
const _ = require('lodash');

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
            return moment(d).format(f);
        },
        format(value, default_val = '') {
            if (typeof value === 'boolean') {
                if (value) {
                    return '<span class="icon"><i class="fa fa-check"></i></span>';
                }
                return '<span class="icon"><i class="fa fa-times"></i></span>';
            }
            return value;
        },
        find(value, path) {
            if (value) {
                return Utils.find_value_with_path(value, path.split('.'));
            }
            return '';
        },
        translate(value, use_hlang, key) {
            if (value instanceof Array) {
                return value.map((v) => {
                    if (key) {
                        v[key] = use_hlang ? this.hlang(v[key]) : this.lang(v[key]);
                    } else {
                        v = use_hlang ? this.hlang(v) : this.lang(v);
                    }
                    return v;
                });
            }

            if (key) {
                return (use_hlang ? this.hlang(value[key]) : this.lang(value[key]));
            }
            return (use_hlang ? this.hlang(value) : this.lang(value));
        },
    },

};
