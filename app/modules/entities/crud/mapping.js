// @flow
const utils = require('../../utils/utils');

class Mapping {
    _mapping: Object;
    constructor(object: Object = {}) {
        this._mapping = object;
    }

    get mapping(): Object {
        return this._mapping;
    }

    get_all_type(key: string): Array<Array<string>> {
        function _rec(path: Array<string>,
                mapping: ?Object = {},
                results: Array<Array<string>> = [],
                parents: Array<string> = []): Array<Array<string>> {
            if (path.length === 0 || mapping == null) {
                return results;
            }
            const part = path[0];
            if (utils.hasProperty(mapping, part)
                    && typeof mapping[part] === 'object') {
                mapping = mapping[part];
                if (utils.hasProperty(mapping, 'type')
                        && typeof mapping.type === 'string') {
                    results.push([part, parents.join('.'), mapping.type]);
                } else if (utils.hasProperty(mapping, 'properties')) {
                    results.push([part, parents.join('.'), 'field']);
                }

                if (path[0] !== 'properties' && path[0] !== 'fields') {
                    parents.push(path[0]);
                }

                return _rec(path.slice(1), mapping, results, parents);
            } else if (utils.hasProperty(mapping, 'properties')) {
                path.unshift('properties');
                return _rec(path, mapping, results, parents);
            } else if (utils.hasProperty(mapping, 'fields')) {
                path.unshift('fields');
                return _rec(path, mapping, results, parents);
            }
            return results;
        }

        const path = key.split('.');
        return _rec(path, this._mapping);
    }

    get_type(key: string): ?string {
        const results = this.get_all_type(key);
        if (results.length > 0) {
            const infos = results[results.length - 1];
            return infos[infos.length - 1];
        }
        return null;
    }
}

module.exports = Mapping;
