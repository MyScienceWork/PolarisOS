const Handlebars = require('handlebars');
const moment = require('moment-timezone');
const _moment = require('moment');

Handlebars.registerHelper('moment', (array) => {
    const hash = array.hash;
    if (hash && hash.date && hash.utc) {
        const format = hash.format;
        const date = hash.date;
        const offset = moment('2013-01-01').tz('Europe/Paris').format('Z');
        const offset_parsed = parseInt(moment((`2013-02-08 ${offset.substr(1)}`)).format('hh'), 10);
        const offset_sec = offset_parsed * 3600;
        const offset_millisec = offset_sec * 1000;
        const fixed_start_date = moment(date).valueOf() + offset_millisec;
        return _moment(fixed_start_date).format(format);
    } else if (hash && hash.date) {
        const format = hash.format;
        if (hash.date === 'now') {
            return _moment().format(format);
        }
        const date = hash.date;
        return _moment(date).format(format);
    }
    return _moment(hash).valueOf();
});

Handlebars.registerHelper('join', (array, sep, options) => array.map(item => options.fn(item)).join(sep));
Handlebars.registerHelper('people_join', (array, options) => {
    const hash = options.hash;
    const sep = hash.sep || ', ';
    const use_and = hash.useAnd || true;
    const minimal_number = hash.minNumber || 3;

    let data = {};
    if (options.data) {
        data = Handlebars.createFrame(options.data);
    }

    if (array.length <= minimal_number) {
        if (array.length === 1) {
            return array.map((item, i) => { data.index = i; return options.fn(item, { data }); }).join(sep);
        }

        if (use_and) {
            const display = array.slice(0, array.length - 1);
            const separated = display.map((item, i) => { data.index = i; return options.fn(item, { data }); }).join(sep);
            data.index = array.length - 1;
            return `${separated} #POS#LANGl_and ${options.fn(array[array.length - 1], { data })}`;
        }
        return array.map((item, i) => { data.index = i; return options.fn(item, { data }); }).join(sep);
    }
    const display = array.slice(0, minimal_number);
    const separated = display.map((item, i) => { data.index = i; return options.fn(item, { data }); }).join(sep);
    return `${separated} #POS#LANGl_et_al`;
});

Handlebars.registerHelper('filter_nested', (array, options) => {
    const type = options.hash.type || 'type';
    const value = options.hash.value;

    if (array.length === 0) {
        return '';
    }

    const filtered = array.filter(i => i[type] === value);

    if (filtered.length === 0) {
        return '';
    }

    return options.fn(filtered[0]);
});

module.exports = Handlebars;
