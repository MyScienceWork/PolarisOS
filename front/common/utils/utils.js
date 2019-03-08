// @flow
const _ = require('lodash');

_.mixin({
    mergeByKey(arr1, arr2, key) {
        const criteria = {};
        criteria[key] = null;
        const newArray = JSON.parse(JSON.stringify(arr1));
        return _.map(newArray, (item) => {
            criteria[key] = item[key];
            return _.merge(item, _.find(arr2, criteria));
        });
    },
});

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


function merge_with_replacement(object: Object, source: Object): Object {
    return Object.keys(source).reduce((obj, key) => {
        if (key in obj) {
            if (source[key] === undefined) { // Remove from object
                console.log('key', source, obj);
                delete obj[key];
            } else if (obj[key] instanceof Array) {
                if (source[key] instanceof Array) {
                    obj[key] = source[key]; // Replace with new array
                } else {
                    // The source is an object, it means that a variadic element
                    // has been used, we need to translate the array into an object
                    obj[key] = obj[key].reduce((myobj, val, idx) => {
                        myobj[`${idx}`] = val;
                        return myobj;
                    }, {});
                    obj[key] = _.merge({}, obj[key], source[key]);
                }
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

function to_matrix(content: Array<*>, rowLength: number = 2) {
    return content
        .reduce((rows, key, index) => (index % rowLength === 0 ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows, []);
}

function crunch_data_for_fetch(action: string, success: boolean, content: any): Object {
    let data = [];
    let total = 0;
    let validations = {};
    let success_ = '';
    let error = {};

    if (success) {
        if (action === 'read') {
            if ('result' in content && 'aggs' in content.result) {
                total = content.result.total;
                data = content.result.aggs;
            } else if ('result' in content && 'hits' in content.result) {
                total = content.result.total;
                data = content.result.hits.map(hit => hit.source);
            } else {
                data = content;
            }
        } else if ('change' in content && content.change === 'Validation') {
            validations = Object.assign({}, content.errors);
        } else {
            success_ = content.message;
        }
    } else {
        error = Object.assign({}, {
            found: true, content,
        });
    }
    return { error, data, success: success_, total, validations };
}

function traverse_and_execute(object: Object, path: Array<string>, f: Function): any {
    if (path.length === 0) {
        const info = _return_inner_object(object);
        const result = f(info);
        return result;
    }

    const key = path[0];
    const idx = parseInt(key, 10);

    if (object instanceof Array) {
        if (isNaN(idx)) {
            for (const i in object) {
                object[i] = traverse_and_execute(object[i], path, f);
            }
            return object;
        } else if (key < object.length) {
            object[key] = traverse_and_execute(object[key],
                    path.slice(1), f);
            return object;
        }
    } else if (object != null && key in object) {
        const result = traverse_and_execute(object[key], path.slice(1), f);
        object[key] = result;
        return object;
    }
    return object;
}

function merge_by_key(arr1: Array<*>, arr2: Array<*>, key: string) {
    return _.mergeByKey(arr1, arr2, key);
}

module.exports = {
    truncate,
    to_matrix,
    find_value_with_path,
    find_object_with_path,
    make_nested_object_from_path,
    merge_with_replacement,
    merge_by_key,
    crunch_data_for_fetch,
    traverse_and_execute,
};
