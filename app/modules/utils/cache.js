// @flow
const _ = require('lodash');

class Cache {
    _key2freq: Object;
    _container: Object;
    _max_size: number;
    _current_size: number;

    constructor(max_size: number = 350) {
        this._key2freq = {};
        this._container = {};
        this._current_size = 0;
        this._max_size = max_size <= 0 ? 1 : max_size;
    }

    get(key: string): ?Object {
        if (key in this._container) {
            this._key2freq[key] += 1;
            return this._container[key];
        }
        return null;
    }

    add(key: string, value: Object) {
        if (key in this._container) {
            return;
        }

        if (this._current_size === 0) {
            this._container[key] = value;
            this._key2freq[key] = 1;
            this._current_size += 1;
            return;
        }

        if (this._current_size === this._max_size) {
            const smallest_key = this.find_smallest();
            delete this._container[smallest_key];
            delete this._key2freq[smallest_key];
            this._current_size -= 1;
        }

        this._container[key] = value;
        this._key2freq[key] = 1;
        this._current_size += 1;
    }

    find_smallest(): ?Object {
        if (this._current_size === 0) {
            return null;
        }

        const sortable = _.reduce(this._key2freq, (arr, value, key) => {
            arr.push([key, value]);
            return arr;
        }, []);

        sortable.sort((a, b) => (a[1] - b[1]));
        return sortable[0][0];
    }
}

module.exports = Cache;
