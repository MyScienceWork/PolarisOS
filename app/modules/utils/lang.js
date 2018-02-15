module.exports = {};

const EntitiesUtils = require('./entities');

async function get_config(env) {
    const configs = await EntitiesUtils.search('config', {
        size: 1,
        where: {
            environment: ENV,
        },
    });

    let config = null;
    if ('result' in configs && 'hits' in configs.result && configs.result.hits.length > 0) {
        config = configs.result.hits[0].source;
    }

    return config;
}

function retrieve_single_quantity(values) {
    if (values.length === 0) {
        return '';
    } else if (values.length === 1) {
        return values[0];
    }
    const results = values.filter(v => (v.quantity === '1' ||
            v.quantity === 'n/a'));
    return results.length === 0 ? '' : results[0];
}

async function get_language_values(key, config) {
    const values = await EntitiesUtils.search('lang', {
        size: 1000,
        where: {
            lang: config.langs.map(l => l.value),
            key,
        },
    });

    if ('result' in values && 'hits' in values.result.hits) {
        return values.result.hits.map((h) => {
            const src = h.source;
            const value = retrieve_single_quantity(src.values);
            return { lang: src.lang, value };
        });
    }
    return [];
}

module.exports = {
    get_config,
    get_language_values,
};
