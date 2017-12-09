// @flow
const _ = require('lodash');


function hasProperty(obj: Object, key: string | number): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function _return_inner_object(object: ? Object, copy: boolean = true): any {
    if (object == null) {
        return null;
    } else if (typeof object === 'object') {
        if (copy) {
            return _.cloneDeep(object);
        }
        return object;
    }
    return object;
}

function _test_inner_object(object: ? Object, key: string | number): Array<any> {
    if (!isNaN(parseInt(key, 10))) {
        key = parseInt(key, 10);
    }

    if (object == null) {
        return [key, null];
    } else if (object instanceof Array) {
        if (object.length <= key) {
            return [key, null];
        }
    } else if (!hasProperty(object, key)) {
        return [key, null];
    }
    return [key, object];
}


function find_object_with_path(object: ? Object, path: Array<string>): any {
    const p = path;

    if (p.length === 0) {
        return _return_inner_object(object, false); // Don't copy
    }

    if (p.length > 1) {
        let key = p[0];
        let result = null;
        [key, result] = _test_inner_object(object, key);
        if (result == null) {
            return result;
        }
        if (object == null) {
            return object;
        }
        return find_object_with_path(object[key], p.slice(1));
    }
    return find_object_with_path(object, p.slice(1));
}

function find_value_with_path(object: ? Object, path: Array<string>): any {
    const p = path;
    if (p.length === 0) {
        return _return_inner_object(object);
    }

    let key = p[0];
    let result = null;
    [key, result] = _test_inner_object(object, key);
    if (result == null) {
        return result;
    }
    if (object == null) {
        return object;
    }
    return find_value_with_path(object[key], p.slice(1));
}

function* find_popvalue_with_path(object: ?Object, path: Array<string>, return_object: boolean = false): any {
    const p = path;
    if (p.length === 0) {
        const info = _return_inner_object(object, !return_object);
        if (return_object && info instanceof Array) {
            yield* info;
        } else {
            yield info;
        }
    } else {
        let key = p[0];
        const is_nan = isNaN(parseInt(key, 10));
        if (!is_nan) {
            key = parseInt(key, 10);
        }

        if (object instanceof Array) {
            if (is_nan) {
                for (const i in object) {
                    yield* find_popvalue_with_path(object[i], p, return_object);
                }
            } else if (key < object.length) {
                if (return_object && p.length === 1) {
                    yield* find_popvalue_with_path(object, p.slice(1), return_object);
                } else {
                    yield* find_popvalue_with_path(object[key], p.slice(1), return_object);
                }
            }
        } else if (object != null && hasProperty(object, key)) {
            if (return_object && p.length === 1) {
                yield* find_popvalue_with_path(object, p.slice(1), return_object);
            } else {
                yield* find_popvalue_with_path(object[key], p.slice(1), return_object);
            }
        }
    }
}


function forge_whitelist_blacklist_query(lists: Object): Object {
    let {
        whitelist,
        blacklist,
    } = lists;
    if (whitelist == null) {
        whitelist = new Set([]);
    }
    if (blacklist == null) {
        blacklist = new Set([]);
    }

    let query = {};
    if (whitelist.size === 0 && blacklist.size === 0) {
        query = {};
    } else if (whitelist.size === 0 && blacklist.size > 0) {
        query = {
            _id: {
                $nin: [...blacklist],
            },
        };
    } else if (blacklist.size === 0 && whitelist.size > 0) {
        query = {
            _id: {
                $in: [...whitelist],
            },
        };
    } else {
        query = {
            _id: {
                $in: [...whitelist],
                $nin: [...blacklist],
            },
        };
    }
    return query;
}


function merge_with_replacement(object: Object, source: Object): Object {
    return Object.keys(source).reduce((obj, key) => {
        if (key in obj) {
            if (obj[key] instanceof Array) {
                obj[key] = source[key]; // Replace with new array
            } else if (obj[key] instanceof Object) {
                obj[key] = merge_with_replacement(obj[key], source[key]);
            } else {
                obj[key] = source[key];
            }
        } else {
            obj[key] = source[key];
        }
        return obj;
    }, object);
}

module.exports = {
    hasProperty,
    find_value_with_path,
    find_object_with_path,
    forge_whitelist_blacklist_query,
    merge_with_replacement,
    find_popvalue_with_path,
};
