// @flow
const _ = require('lodash');
const Search = require('./search');
const Mapping = require('./mapping');
const Utils = require('../../utils/utils');

/**
 * Object Data Model
 * Generic class to model an entity in the program (saved into an ElasticSearch DB).
 *
 * @public
 *
 *
 */
class ODM {
    _client: Object;
    _index: string;
    _type: string;
    _db: Object;
    _model: Object;
    _id: ?string;

    /**
     * @param client: ElasticSearch client;
     * @param id: id of the entity (could be null)
     */
    constructor(index: string, type: string, client: Object,
        model: Object, id: ?string) {
        this._client = client;
        this._id = id;
        this._db = {};
        this._index = index;
        this._type = type;
        this._model = model;
    }

    /**
     * @public
     * @return the underlying model of this entity
     * @see entity models for more details
     */
    get model(): Object {
        return this._model;
    }

    /**
     * @public
     * @return the underlying ElasticSearch mapping of this entity
     */
    get mapping(): Object {
        return this._model.Mapping;
    }

    /**
     * @public
     * @return the underlying ElasticSearch index of this entity
     */
    get index(): string {
        return this._index;
    }

    /**
     * @public
     * @return the underlying ElasticSearch type of this entity
     */
    get type(): string {
        return this._type;
    }

    get source(): Object {
        return this.db.source || {};
    }

    get client(): Object {
        return this._client;
    }

    /**
     * Process an entity and create an {ODM} object.
     *
     * @public
     * @param hit: hit in ElasticSearch result
     * @param found: true if the object was found in DB, false otherwise
     * @return content of the hit
     */
    static format_hit(hit: Object, found: boolean = true): Object {
        if (hit == null) {
            return {};
        }

        let score = 0;
        const index = hit._index;
        let type = "";
        if (hit._index) {
            type = hit._index.split('_')[1];
        } else if (hit._source) {
            // for entity type
            type = hit._source.type;
        }
        const id = hit._id;
        const source = '_source' in hit ? hit._source : {};
        const sort = 'sort' in hit ? hit.sort : [];
        if ('score' in hit) {
            score = hit._score;
        }

        source._id = id;

        return {
            id,
            type,
            index,
            score,
            source,
            sort,
            found,
        };
    }

    /**
     * Get name of the class (= entity)
     * @public
     * @return name of the class
     */
    get name(): string {
        return this.constructor.name.toLowerCase();
    }

    /**
     * Get id of an entity (possibly null)
     * @public
     * @return id
     */
    get id(): ?string {
        return this._id;
    }

    get messages(): Object {
        return this._model.Messages;
    }

    /**
     * Get all information about an entity;
     * @public
     * @return all interesting information
     */
    get db(): Object {
        return JSON.parse(JSON.stringify(this._db));
    }

    /**
     * Set all interesting information about an entity
     * @public
     * @param o: information
     */
    set db(o: Object) {
        this._db = o;
    }

    static async fetch_mapping(index: string, type: string, client: Object, include_meta: boolean = false) {
        const mapping = await client.indices.getMapping({ index });
        if (index in mapping) {
            if (include_meta) {
                return mapping[index].mappings;
            }
            return mapping[index].mappings.properties;
        }
        return null;
    }

    static async fetch_settings(index: string, type: string, client: Object) {
        const settings = await client.indices.getSettings({ index });
        if (settings && index in settings) {
            return settings[index];
        }
        return null;
    }

    static async read(index: string, type: string,
            client: Object, model: Object, response: Object,
            population: Array<String> = [], backward: boolean = false): Object {
        const o = {};

        if ('_scroll_id' in response) {
            o.scroll_id = response._scroll_id;
        }

        if ('count' in response) {
            o.count = response.count.value;
        }

        if ('took' in response) {
            o.took = response.took;
        }

        if ('timed_out' in response) {
            o.timeout = response.timed_out;
        }

        if ('hits' in response) {
            o.hits = response.hits.hits.map((hit) => {
                const info = this.format_hit(hit);
                const odm = new this(index, type, client, model, info.id);
                odm.db = info;
                return odm;
            });

            if (backward) {
                _.reverse(o.hits);
            }

            await o.hits.reduce((pr, hit) => {
                const entity_type = type === 'entity' ? hit.source.type : type;
                return pr.then(() => hit.post_read_hook(population, entity_type))
            }, Promise.resolve());

            o.total = response.hits.total.value;
            o.count = response.hits.total.value;
            o.max_score = response.hits.max_score;
        }

        if ('aggregations' in response) {
            o.aggs = response.aggregations;
        }

        return o;
    }

    static async search(index: string, type: string, client: Object, model: Object,
            search: Search, opts: Object = {}): Promise<Object> {
        const query = search.generate();
        // console.log(JSON.stringify(query));
        const sort = search.sort();
        const aggs = search.aggs();
        const population = 'population' in opts ? opts.population : [];
        //console.log("this is ES body : ", JSON.stringify(query));
        const body = {
            from: 'from' in opts ? opts.from : 0,
            size: 'size' in opts ? opts.size : 1000,
            _source: 'source' in opts ? opts.source : true,
            query,
        };


        if (sort != null) {
            body.sort = sort;
            if ('search_after' in opts) {
                body.from = 0;
                body.search_after = opts.search_after;
            } else if ('search_before' in opts) {
                body.sort = body.sort.map(s => _.reduce(s, (obj, value, key) => {
                    obj[key] = value.order === 'asc' ? _.merge({}, value, { order: 'desc' }) : _.merge({}, value, { order: 'asc' });
                    return obj;
                }, {}));

                body.search_after = opts.search_before;
            }
        }

        if (aggs != null) {
            body.aggs = aggs;
        }

        let response = {};
        if ('scroll_id' in opts && 'scroll' in opts) {
            response = await client.scroll({
                scrollId: opts.scroll_id,
                scroll: opts.scroll,
            });
        } else {
            const req = {
                index,
                body,
                requestTimeout: 600000,
            };

            if ('scroll' in opts) {
                req.scroll = opts.scroll;
            }
            response = await client.search(req);
        }

        return this.read(index, type, client, model, response, population, 'search_before' in opts);
    }

    static async count(index: string, type: string, client: Object,
            model: Object, search: Search): Promise<Object> {
        const query = search.generate();
        const response = await client.count({
            index,
            body: {
                query,
            },
        });
        return this.read(index, type, client, model, response);
    }

    static async deleteByQuery(index: string, type: string, client: Object, search: Search) {
        const query = search.generate();
        await client.deleteByQuery({
            index,
            refresh: true,
            body: {
                query,
            },
        });
    }

    static async remove(index: string, type: string, client: Object, id: string): Promise<boolean> {
        try {
            const response = await client.delete({
                index,
                id,
                refresh: true,
            });
            //console.log(response);
            return response.result === "deleted";
        } catch (err) {
            console.log('remove error', err);
            return false;
        }
    }

    static async _create_or_update(index: string, type: string,
            client: Object, model: Object, body: Object, id: ?string = null): Promise<?ODM> {
        console.log('create or update body', JSON.stringify(body));
        try {
            const content = {
                index,
                body,
                refresh: true,
            };

            if (id != null) {
                content.id = id;
                const ret = await this.pre_update_hook(index, type, client, model, body, id);
                if (!ret) {
                    return null;
                }
            } else {
                if ('_id' in content.body) {
                    // TODO NEED TO BE REMOVE AFTER DATA IMPORT
                    // content.id = content.body._id;
                    delete content.body._id;
                }

                const ret = await this.pre_create_hook(index, type, client, model, body);
                if (!ret) {
                    return null;
                }
            }

            const response = await client.index(content);
            if (('result' in response && response.result === 'created')
                || ('result' in response && response.result === 'updated')) {
                try {
                    const get_response = await client.get({
                        index,
                        id: response._id,
                    });
                    const odm = new this(index, type, client, model, response._id);
                    odm.db = this.format_hit(get_response, get_response.found);
                    if ('created' in response) {
                        await odm.post_create_hook();
                    } else {
                        await odm.post_update_hook();
                    }

                    // console.log(odm);
                    return odm;
                } catch (err) {
                    return null;
                }
            }
            return null;
        } catch (err) {
            console.log('creation or update error', err);
            return null;
        }
    }

    static async _bulk_create_or_update(index: string, type: string, client: Object,
            body: Array<Object>, action: string = 'create'): Promise<?ODM> {
        try {
            const content = {
                index,
                body: _.flatten(body.map((e) => {
                    if (action === 'create') {
                        return [{ index: {} }, e];
                    } else if (action === 'update') {
                        const _id = e._id;
                        delete e._id;
                        return [{ update: { _id } }, { doc: e }];
                    }
                    return [];
                })),
                refresh: true,
            };
            const response = await client.bulk(content);
            return response;
        } catch (err) {
            console.log('bulk creation or update error', err);
            return null;
        }
    }


    async read(opts: Object = {}): Promise<ODM> {
        const population = 'population' in opts ? opts.population : [];
        const source = 'source' in opts ? opts.source : null;

        await this.pre_read_hook(source, population);

        try {
            const response = await this._client.get({
                index: this.index,
                id: this._id,
                _source: source,
            });


            this.db = this.constructor.format_hit(response, response.found);
            let type = "";
            if (this.db.source && this.db.source.type){
                type = this.db.source.type;
            }
            await this.post_read_hook(population, type);
        } catch (err) {
            const response = err.body;
            this.db = this.constructor.format_hit(response, response ? response.found : false);
            await this.post_read_hook(population);
        }
        return this;
    }

    static async create(index: string, type: string, client: Object,
            model: Object, body: Object): Promise<?ODM> {
        return this._create_or_update(index, type, client, model, body);
    }

    static async update(index: string, type: string, client: Object,
            model: Object, body: Object, id: string): Promise<?ODM> {
        // console.log('update', JSON.stringify(body));
        return this._create_or_update(index, type, client, model, body, id);
    }

    static async bulk_create(index: string, type: string, client: Object,
            body: Array<Object>): Promise<?ODM> {
        return this._bulk_create_or_update(index, type, client, body, 'create');
    }

    static async bulk_update(index: string, type: string, client: Object,
            body: Array<Object>): Promise<?ODM> {
        return this._bulk_create_or_update(index, type, client, body, 'update');
    }

    oupdate(): Promise<?ODM> {
        return ODM.update(this.index, this.type, this.client, this.model, this.source);
    }

    ocreate(): Promise<?ODM> {
        return ODM.create(this.index, this.type, this.client, this.model, this.source);
    }

    toJSON(): Object {
        return this.db;
    }

    async pre_read_hook() {
        // TODO TBD
    }

    static async pre_create_hook(index: string, type: string,
            client: Object, model: Object, body: Object): Promise<boolean> {
        // To be re-implemented in subclass (if needed)
        return true;
    }

    static async pre_update_hook(index: string, type: string,
            client: Object, model: Object, body: Object, id: string): Promise<boolean> {
        // To be re-implemented in subclass (if needed)
        return true;
    }

    async post_read_hook(population: Array<String>, type: string) {
        // To be re-implemented in subclass (if needed)
        await this._handle_population(population);
    }

    async post_create_hook() {
        // To be re-implemented in subclass (if needed)
    }

    async post_update_hook() {
        // To be re-implemented in subclass (if needed)
    }

    async _handle_population(population: Array<String>, propagate_population: boolean = false) {
        const EntitiesUtils = require('../../utils/entities');
        const mapping = await this.constructor.fetch_mapping(this.index, this.type,
                this._client, true);

        if (mapping && !('_meta' in mapping)) {
            return;
        }

        if (!('refs' in mapping._meta)) {
            return;
        }

        const refs = mapping._meta.refs;
        const info = this._db.source;


        for (const p of population) {
            const path = p.split('.');
            const vals = [...Utils.find_popvalue_with_path(info, path.slice(), true)];
            let ref = [...Utils.find_popvalue_with_path(refs, path.slice())];
            if (ref.length > 0 && vals.length > 0) {
                ref = ref[0];
                const last = path[path.length - 1];
                for (const v of vals) {
                    if (ref === 'lang') {
                        if (v[last]) {
                            const result = await EntitiesUtils.search(ref, { where: { key: v[last], size: 250 } });
                            const hits = EntitiesUtils.get_hits(result);
                            v[last] = hits.length > 0 ? hits.map(h => h.source) : [];
                        } else {
                            v[last] = [];
                        }
                    } else {
                        const result = await EntitiesUtils.retrieve(v[last],
                            ref, '', propagate_population ? population.join(',') : '');
                        v[last] = result != null ? result.source : {};
                    }
                }
            }
        }
    }
}

module.exports = ODM;
