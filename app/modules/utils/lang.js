module.exports = {};
const _ = require('lodash');
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

function retrieve_quantity(key, info, n) {
    let text = key;
    if (n == null) {
        if ('1' in info) {
            text = info['1'] || key;
        } else {
            text = info['n/a'] || key;
        }
    } else if (n === 0) {
        text = info['0'] || info['n/a'] || key;
    } else if (n === 1) {
        text = info['1'] || info['n/a'] || key;
    } else if (n === 2) {
        text = info['2'] || info['n/a'] || key;
    } else {
        text = info.other || info['n/a'] || key;
    }

    return text;
}

async function string_to_translation(string, lang, n) {
    const values = await EntitiesUtils.search_and_get_sources('lang', {
        size: 1,
        where: {
            $and: [
                { lang },
                { key: string },
            ],
        },
    });

    if (values.length === 0) {
        return string;
    }

    const items = values.map((src) => {
        const info = src.values.reduce((obj, val) => {
            obj[val.quantity] = val.value;
            return obj;
        }, {});
        return retrieve_quantity(src.key, info, n);
    });
    return items[0];
}

async function strings_to_translation(string, lang, n) {
    const regex = /#POS#LANG(\w+)/g;
    const copy = string;
    let m;
    const keys = [];
    while ((m = regex.exec(string)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex += 1;
        }
        const key = m[1];
        keys.push(key);
    }

    const values = await EntitiesUtils.search_and_get_sources('lang', {
        size: keys.length,
        where: {
            $and: [
                { lang },
                { key: keys },
            ],
        },
    });

    if (values.length === 0) {
        return string;
    }

    const items = values.reduce((obj, src) => {
        const info = src.values.reduce((i, val) => {
            i[val.quantity] = val.value;
            return i;
        }, {});
        obj.push([src.key, retrieve_quantity(src.key, info, n)]);
        return obj;
    }, []);

    items.sort((a, b) => (b[0].length - a[0].length));
    return items.reduce((mycopy, info) => mycopy.replace(`#POS#LANG${info[0]}`, info[1]), copy);
}

module.exports = {
    get_config,
    get_language_values,
    get_language_values_from_langs,
    get_language_values_from_langs_and_keys,
    string_to_translation,
    strings_to_translation,
};
