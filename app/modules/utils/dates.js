const Chrono = require('chrono-node');
const moment = require('moment');

function predict_date(d) {
    if (!d || d.trim() === '') {
        return null;
    }

    const my_date = d.trim();
    if (/^[0-9]{4}$/.test(my_date)) {
        return +moment(my_date, 'YYYY');
    }
    return +moment(Chrono.fr.parseDate(my_date));
}

module.exports = {
    predict_date,
};
