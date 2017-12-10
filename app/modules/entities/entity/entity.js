// @flow
const ODM = require('../crud/odm');
const Config = require('../../../config');
const Logger = require('../../../logger');

class _Entity extends ODM {
    static async _add_mapping(client: Object, name: string, mapping: Object) {
        try {
            const m = JSON.parse(mapping);
            await client.indices.create({
                index: `${Config.elasticsearch.index_prefix}_${name}`,
                body: m,
            });
            return true;
        } catch (err) {
            Logger.error('Error when adding mapping', err);
            return false;
        }
    }

    static async _update_mapping(client: Object, name: string, mapping: Object) {
        try {
            const m = JSON.parse(mapping);
            const body = {
                properties: m.mappings[name].properties,
            };

            if ('_meta' in m.mappings[name]) {
                body._meta = m.mappings[name]._meta;
            }

            await client.indices.putMapping({
                index: `${Config.elasticsearch.index_prefix}_${name}`,
                type: name,
                body,
            });
            return true;
        } catch (err) {
            Logger.error('Error when updating mapping', err);
            return false;
        }
    }

    static async pre_create_hook(index: string, type: string,
            client: Object, model: Object, body: Object): Promise<boolean> {
        const ret = await this._add_mapping(client, body.type, body.mapping);
        delete body.mapping;
        return ret;
    }

    static async pre_update_hook(index: string, type: string,
            client: Object, model: Object, body: Object, id: string): Promise<boolean> {
        const ret = await this._update_mapping(client, body.type, body.mapping);
        delete body.mapping;
        return ret;
    }

    async post_read_hook(population: Array<String>) {
        super.post_read_hook(population);
        const index = `${Config.elasticsearch.index_prefix}_${this.source.type}`;
        const mapping = await this.constructor.fetch_mapping(index,
            this.source.type, this._client, true);

        this._db.source.mapping = {
            mappings: {
                [this.source.type]: mapping,
            },
        };

        // TODO change when we handle mapping with a more friendly user-interface
        this._db.source.mapping = JSON.stringify(this._db.source.mapping, null, 4);
    }
}

module.exports = _Entity;
