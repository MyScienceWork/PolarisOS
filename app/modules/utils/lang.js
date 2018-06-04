module.exports = {};

const EntitiesUtils = require('./entities');

async function get_config(env) {
    const configs = await EntitiesUtils.search('config', {
        size: 1,
        where: {
            environment: env,
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
        return values[0].value;
    }
    const results = values.filter(v => (v.quantity === '1' ||
            v.quantity === 'n/a'));
    return results.length === 0 ? '' : results[0].value;
}

async function get_language_values(key, config) {
    const values = await EntitiesUtils.search('lang', {
        size: config.langs.length,
        where: {
            $and: [
                { lang: config.langs.map(l => l.value) },
                { key },
            ],
        },
    });

    const hits = EntitiesUtils.get_hits(values);
    return hits.map((h) => {
        const src = h.source;
        const value = retrieve_single_quantity(src.values);
        return { lang: src.lang, value, key };
    });
}

function get_language_values_from_langs(key, langs) {
    return get_language_values(key, { langs });
}

async function get_language_values_from_langs_and_keys(keys, langs) {
    const values = await EntitiesUtils.search_and_get_sources('lang', {
        size: keys.length * langs.length,
        where: {
            $and: [
                { lang: langs },
                { key: keys },
            ],
        },
    });

    const items = values.reduce((obj, src) => {
        obj[src.lang][src.key] = retrieve_single_quantity(src.values);
        return obj;
    }, langs.reduce((o, l) => { o[l] = {}; return o; }, {}));
    return items;
}

module.exports = {
    get_config,
    get_language_values,
    get_language_values_from_langs,
    get_language_values_from_langs_and_keys,
};
