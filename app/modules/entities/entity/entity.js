// @flow
const ODM = require('../crud/odm');
const Config = require('../../../config');
const Logger = require('../../../logger');

class _Entity extends ODM {
    static async _add_mapping(client: Object, name: string, mapping: Object | string, settings: Object | string) {
        try {
            const m = JSON.parse(mapping);
            const s = JSON.parse(settings || '{}');
            const body = { settings: s, mappings: m.mappings };
            await client.indices.create({
                index: `${Config.elasticsearch.index_prefix}_${name}`,
                body,
            });
            return true;
        } catch (err) {
            Logger.error('Error when adding mapping', err);
            return false;
        }
    }

    static async _update_mapping(client: Object, name: string, mapping: Object | string) {
        try {
            const m = JSON.parse(mapping);
            const body = {
                properties: m.mappings.properties,
            };

            if ('_meta' in m.mappings) {
                body._meta = m.mappings._meta;
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

    static async _update_settings(client: Object, name: string, settings: Object | string) {
        try {
            const m = JSON.parse(settings);
            const body = m;
            const index = `${Config.elasticsearch.index_prefix}_${name}`;
            await client.indices.close({ index });
            await client.indices.putSettings({
                index,
                body,
            });
            await client.indices.open({ index });
            return true;
        } catch (err) {
            Logger.error('Error when updating settings', err);
            return false;
        }
    }

    static async pre_create_hook(index: string, type: string,
            client: Object, model: Object, body: Object): Promise<boolean> {
        const ret = await this._add_mapping(client, body.type, body.mapping, body.settings || {});
        delete body.mapping;
        delete body.settings;
        delete body.update_settings;
        return ret;
    }

    static async pre_update_hook(index: string, type: string,
            client: Object, model: Object, body: Object, id: string): Promise<boolean> {
        const ret = await this._update_mapping(client, body.type, body.mapping);

        if (body.update_settings) {
            await this._update_settings(client, body.type, body.settings);
        }
        delete body.mapping;
        delete body.settings;
        delete body.update_settings;
        return ret;
    }

    async post_read_hook(population: Array<String>) {
        super.post_read_hook(population);
        const index = `${Config.elasticsearch.index_prefix}_${this.source.type}`;
        const mapping = await this.constructor.fetch_mapping(index,
            this.source.type, this._client, true);

        const settings = await this.constructor.fetch_settings(index,
            this.source.type, this._client);

        this._db.source.mapping = {
            mappings: {
                [this.source.type]: mapping,
            },
        };

        this._db.source.settings = settings.settings;

        // TODO change when we handle mapping with a more friendly user-interface
        this._db.source.mapping = JSON.stringify(this._db.source.mapping, null, 4);

        // TODO change when we handle mapping with a more friendly user-interface
        this._db.source.settings = JSON.stringify(this._db.source.settings, null, 4);
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config.elasticsearch.index_prefix}_entity`;
    }

    static get type(): string {
        return 'entity';
    }
}

module.exports = _Entity;
