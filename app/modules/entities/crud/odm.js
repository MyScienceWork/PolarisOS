// @flow
const Search = require('./search');
const Mapping = require('./mapping');

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

    /**
     * Process an entity and create an {ODM} object.
     *
     * @public
     * @param hit: hit in ElasticSearch result
     * @param found: true if the object was found in DB, false otherwise
     * @return content of the hit
     */
    static format_hit(hit: Object, found: boolean = true): Object {
        let score = 0;
        const index = hit._index;
        const type = hit._type;
        const id = hit._id;
        const source = '_source' in hit ? hit._source : {};
        const sort = 'sort' in hit ? hit.sort : [];
        if ('score' in hit) {
            score = hit._score;
        }

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

    static async fetch_mapping(index: string, type: string, client: Object) {
        const mapping = await client.indices.getMapping({ index, type });
        if (index in mapping && type in mapping[index].mappings) {
            return mapping[index].mappings[type].properties;
        }
        return null;
    }

    static read(index: string, type: string,
            client: Object, model: Object, response: Object): Object {
        const o = {};

        if ('_scroll_id' in response) {
            o.scroll_id = response._scroll_id;
        }

        if ('count' in response) {
            o.count = response.count;
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
            o.total = response.hits.total;
            o.count = response.hits.total;
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
        const sort = search.sort();
        const aggs = search.aggs();
        const body = {
            from: 'from' in opts ? opts.from : 0,
            size: 'size' in opts ? opts.size : 1000,
            _source: 'source' in opts ? opts.source : true,
            query,
        };

        console.log('search query', query);

        if (sort != null) {
            body.sort = sort;
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
                type,
                body,
            };

            if ('scroll' in opts) {
                req.scroll = opts.scroll;
            }

            response = await client.search(req);
        }

        return this.read(index, type, client, model, response);
    }

    static async count(index: string, type: string, client: Object,
            model: Object, search: Search): Promise<Object> {
        const query = search.generate();
        const response = await client.count({
            index,
            type,
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
            type,
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
                type,
                id,
                refresh: true,
            });
            console.log(response);
            return response.found;
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
                type,
                body,
                refresh: true,
            };

            if (id != null) {
                content.id = id;
            }

            const response = await client.index(content);
            if (('created' in response && response.created)
                || ('result' in response && response.result === 'updated')) {
                try {
                    const get_response = await client.get({
                        index,
                        type,
                        id: response._id,
                    });
                    const odm = new this(index, type, client, model, response._id);
                    odm.db = this.format_hit(get_response, get_response.found);
                    console.log(odm);
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

    async read(opts: Object = {}): ODM {
        const source = 'source' in opts ? opts.source : null;
        let src = true;
        if (source) {
            src = source.length > 0 ? source : false;
        }

        try {
            const response = await this._client.get({
                index: this.index,
                type: this.type,
                id: this._id,
                _source: src,
            });

            this.db = this.constructor.format_hit(response, response.found);
        } catch (err) {
            const response = err.body;
            this.db = this.constructor.format_hit(response, response.found);
        }
        return this;
    }

    static async create(index: string, type: string, client: Object,
            model: Object, body: Object): Promise<?ODM> {
        return this._create_or_update(index, type, client, model, body);
    }

    static async update(index: string, type: string, client: Object,
            model: Object, body: Object, id: string): Promise<?ODM> {
        console.log('update', JSON.stringify(body));
        return this._create_or_update(index, type, client, model, body, id);
    }

    toJSON(): Object {
        return this.db;
    }

}

module.exports = ODM;
