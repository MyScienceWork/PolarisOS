// @flow
const _ = require('lodash');

function truncate(input: string, size: number = 10, ellipsis: string = '...'): string {
    const total_size = size + ellipsis.length;
    if (input.length > total_size) {
        const char_to_remove = input.length - size;
        const half = Math.floor(input.length / 2.0);
        const first_half = Math.floor(char_to_remove / 2.0);
        const last_half = Math.ceil(char_to_remove / 2.0);

        return input.slice(0, half - first_half)
            + ellipsis
            + input.slice(half + last_half, input.length);
    }
    return input;
}

function _return_inner_object(object: ?Object, copy: boolean = true): any {
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

function _test_inner_object(object: ?Object, key: string | number): Array<any> {
    if (!isNaN(parseInt(key, 10))) {
        key = parseInt(key, 10);
    }

    if (object == null) {
        return [key, null];
    } else if (object instanceof Array) {
        if (object.length <= key) {
            return [key, null];
        }
    } else if (!(key in object)) {
        return [key, null];
    }
    return [key, object];
}


function find_object_with_path(object: ?Object, path: Array<string>): any {
    const p = path;

    if (p.length === 0) {
        return _return_inner_object(object, false); // Don't copy
    }

    if (p.length > 1) {
        let key = p[0];
        let result = null;
        [key, result] = _test_inner_object(object, key);
        if (result == null) { return result; }
        if (object == null) { return object; }
        return find_object_with_path(object[key], p.slice(1));
    }
    return find_object_with_path(object, p.slice(1));
}

function find_value_with_path(object: ?Object, path: Array<string>): any {
    const p = path;
    if (p.length === 0) {
        return _return_inner_object(object);
    }

    let key = p[0];
    let result = null;
    [key, result] = _test_inner_object(object, key);
    if (result == null) { return result; }
    if (object == null) { return object; }
    return find_value_with_path(object[key], p.slice(1));
}

function make_nested_object_from_path(path: Array<string>,
    value: any, obj: Object = {}): Object {
    const rpath = _.reverse(path);
    return rpath.reduce((acc, field) => {
        if (Object.keys(acc).length === 0) {
            acc[field] = value;
            return acc;
        }
        const my_obj = {};
        my_obj[field] = acc;
        return my_obj;
    }, obj);
}

function to_matrix(content: Array<*>, rowLength: number = 2) {
    return content
        .reduce((rows, key, index) => (index % rowLength === 0 ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows, []);
}

module.exports = {
    truncate,
    to_matrix,
    find_value_with_path,
    find_object_with_path,
    make_nested_object_from_path,
};
