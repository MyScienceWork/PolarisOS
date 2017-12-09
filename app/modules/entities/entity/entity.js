// @flow
const ODM = require('../crud/odm');
const Config = require('../../../config');

class _Entity extends ODM {
    static async _add_mapping(client: Object, name: string, mapping: Object) {
        try {
            await client.indices.create({
                index: `${Config.elasticsearch.index_prefix}_${name}`,
                body: mapping,
            });
            return true;
        } catch (err) {
            return false;
        }
    }

    static async _update_mapping(client: Object, name: string, mapping: Object) {
        try {
            await client.indices.putMapping({
                index: `${Config.elasticsearch.index_prefix}_${name}`,
                type: name,
                body: { properties: mapping.mappings[name].properties },
            });
            return true;
        } catch (err) {
            return false;
        }
    }

    static async pre_create_hook(index: string, type: string,
            client: Object, model: Object, body: Object): Promise<boolean> {
        const ret = await this._add_mapping(client, type, body.mapping);
        delete body.mapping;
        return ret;
    }

    static async pre_update_hook(index: string, type: string,
            client: Object, model: Object, body: Object, id: string): Promise<boolean> {
        const ret = await this._update_mapping(client, type, body.mapping);
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
                [this.type]: mapping,
            },
        };

        // TODO change when we handle mapping with a more friendly user-interface
        this._db.source.mapping = JSON.stringify(this._db.source.mapping, null, 4);
    }
}

module.exports = _Entity;
