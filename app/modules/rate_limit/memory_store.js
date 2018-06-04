// @flow
class MemoryStore {
    _windowMs: number;
    _max: number;
    _hits: Object;

    constructor(windowMs: number, max: number) {
        this._windowMs = windowMs;
        this._max = max;
        this._hits = {};
        // simply reset ALL hits every windowMs
        setInterval(() => { this._hits = {}; }, windowMs);
    }

    async incr(key: string): Promise<*> {
        if (this._hits[key]) {
            this._hits[key] += 1;
        } else {
            this._hits[key] = 1;
        }

        return [this._hits[key], this._max];
    }

    async resetAll(): Promise<*> {
        this._hits = {};
    }

    // export an API to allow hits from one or all IPs to be reset
    async resetKey(key: string): Promise<*> {
        delete this._hits[key];
    }
}

module.exports = MemoryStore;
