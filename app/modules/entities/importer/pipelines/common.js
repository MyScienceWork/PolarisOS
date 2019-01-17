const _ = require('lodash');
const Utils = require('../../../utils/utils');

async function single_ref(type, path, v, idx, maps) {
    const value = Utils.find_value_with_path(v, path.split('.'));

    if (!value) {
        return maps;
    }

    return Utils.merge_with_concat(maps, {
        [type]: {
            [value]: {
                refs: [{ idx, path }],
            },
        },
    });
}

async function list_ref(type, list_path, path, v, idx, maps) {
    const values = Utils.find_value_with_path(v, list_path.split('.'));
    if (!values || values.length === 0) {
        return maps;
    }

    return Utils.merge_with_concat(maps, {
        [type]: values.reduce((obj, con, i) => {
            const val = Utils.find_value_with_path(con, path.split('.'));
            return Utils.merge_with_concat(obj, {
                [val]: {
                    refs: [{ idx, path: `${list_path}.${i}.${path}` }],
                },
            });
        }, maps[type] || {}),
    });
}

function match_search(field) {
    return async function (content) {
        return { [field]: { $match: { query: content, minimum_should_match: '100%' } } };
    };
}

async function contributor_search(content) {
    const parts = content.split(',').map(c => c.trim());

    if (parts.length === 0) {
        return null;
    }

    const search = {};
    if (parts.length === 1) {
        search['lastname.raw'] = parts[0];
    } else {
        search.$or = [{
            $and: [{ 'firstname.raw': parts[0] }, { 'lastname.raw': parts[1] }],
        }, {
            $and: [{ 'firstname.raw': parts[1] },
                { 'lastname.raw': parts[0] }],
        }];
    }
    return search;
}

module.exports = {
    single_ref,
    list_ref,
    match_search,
    contributor_search,
};
