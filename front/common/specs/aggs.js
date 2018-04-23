function years_aggregation(field, name) {
    return {
        [field]:
        {
            $name: name,
            $type: 'date_histogram',
            interval: 'year',
            format: 'YYYY',
            keyed: true,
        },
    };
}

function terms_aggregation(field, name) {
    return {
        [field]:
        {
            $name: name,
            $type: 'terms',
            size: 100000,
            // WARNING TODO
            // Deprecated in 6.0.0, use _key instead of _term
            order: { _term: 'asc' },
        },
    };
}

module.exports = {
    publication_years: years_aggregation('dates.publication', 'publication'),
    deposit_years: years_aggregation('dates.deposit', 'deposit'),
    last_initial_authors_aggregation: terms_aggregation('last_initial.raw', 'authors'),
    terms_aggregation,
    years_aggregation,
};
