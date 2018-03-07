const Handlebars = require('handlebars');
const MomentHandler = require('handlebars.moment');

MomentHandler.registerHelpers(Handlebars);

Handlebars.registerHelper('join', (array, sep, options) => array.map(item => options.fn(item)).join(sep));
Handlebars.registerHelper('people_join', (array, options) => {
    const hash = options.hash;
    const sep = hash.sep || ', ';
    const use_and = hash.useAnd || true;
    const minimal_number = hash.minNumber || 1;

    if (array.length <= minimal_number) {
        if (array.length === 1) {
            return array.map(item => options.fn(item)).join(sep);
        }

        if (use_and) {
            const display = array.slice(0, array.length - 1);
            const separated = display.map(item => options.fn(item)).join(sep);
            return `${separated} l_and ${options.fn(array[array.length - 1])}`;
        }
        return array.map(item => options.fn(item)).join(sep);
    }
    const display = array.slice(0, minimal_number);
    const separated = display.map(item => options.fn(item)).join(sep);
    return `${separated} l_et_al`;
});

Handlebars.registerHelper('filter_nested', (array, options) => {
    const type = options.hash.type || 'type';
    const value = options.hash.value;

    console.log(type, value, array);

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
