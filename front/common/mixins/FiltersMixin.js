const Utils = require('../utils/utils');
const moment = require('moment');
const _ = require('lodash');

module.exports = {
    filters: {
        truncate(value, length, separator = ' ') {
            if (value) {
                return _.truncate(value, {
                    length,
                    separator,
                });
            }
            return '';
        },
        join(value, subpath, sep = ', ') {
            return value.map(v => Utils.find_value_with_path(v, subpath.split('.'))).filter(v => v != null).join(sep);
        },
        format_date(d, f = 'LLLL') {
            return moment(d).format(f);
        },
        find(value, path) {
            if (value) {
                return Utils.find_value_with_path(value, path.split('.'));
            }
            return '';
        },
    },
};
