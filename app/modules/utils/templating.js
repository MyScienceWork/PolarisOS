const Handlebars = require('handlebars');
const moment = require('moment');

Handlebars.registerHelper('moment', (array) => {
    const hash = array.hash;
    if (hash && hash.date) {
        const format = hash.format;
        const date = hash.date;
        return moment(date).format(format);
    }
    return moment(array).valueOf();
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
