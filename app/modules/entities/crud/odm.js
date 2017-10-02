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
    _db: Object;
    _id: ?string;

    /**
     * @param client: ElasticSearch client;
     * @param id: id of the entity (could be null)
     */
    constructor(client: Object, id: ?string) {
        this._client = client;
        this._id = id;
        this._db = {};
    }

    /**
     * @public
     * @return the underlying model of this entity
     * @see entity models for more details
     */
    static model(): Object {
        return {};
    }

    /**
     * @public
     * @return the underlying ElasticSearch mapping of this entity
     */
    static mapping(): Object {
        return {};
    }

    /**
     * @public
     * @return the underlying ElasticSearch index of this entity
     */
    static index(): string {
        return '';
    }

    /**
     * @public
     * @return the underlying ElasticSearch type of this entity
     */
    static type(): string {
        return '';
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
     * Extract ElasticSearch index and type of a mapping
     * @public
     * @return: tuple of index, type.
     */
    static extract_index_type(): [string, string] {
        return [this.index(), this.type()];
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

    static read(client: Object, response: Object): Object {
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
                const odm = new ODM(client, info.id);
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

    static async search(client: Object, search: Search, opts: Object = {}): Promise<Object> {
        const [index, type] = this.extract_index_type();
        const query = search.generate();
        const sort = search.sort();
        const aggs = search.aggs();
        const body = {
            from: 'from' in opts ? opts.from : 0,
            size: 'size' in opts ? opts.size : 1000,
            _source: 'source' in opts ? opts.source : true,
            query,
        };

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

        return this.read(client, response);
    }

    static async count(client: Object, search: Search): Promise<Object> {
        const [index, type] = this.extract_index_type();
        const query = search.generate();
        const response = await client.count({
            index,
            type,
            body: {
                query,
            },
        });
        return this.read(client, response);
    }

    static async deleteByQuery(client: Object, search: Search) {
        const [index, type] = this.extract_index_type();
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

    static async remove(client: Object, id: string): Promise<boolean> {
        const [index, type] = this.extract_index_type();
        try {
            const response = await client.delete({
                index,
                type,
                id,
                refresh: true,
            });
            return response.found;
        } catch (err) {
            return false;
        }
    }

    static async create(body: Object): Promise<ODM> {
        const [index, type] = this.extract_index_type();
    }

    async read(opts: Object = {}) {
        const source = 'source' in opts ? opts.source : null;
        let src = true;
        if (source) {
            src = source.length > 0 ? source : false;
        }

        const [index, type] = this.extract_index_type();
        try {
            const response = await this._client.get({
                index,
                type,
                id: this._id,
                _source: src,
            });

            this.db = this.format_hit(response, response.found);
        } catch (err) {
            const response = err.body;
            this.db = this.format_hit(response, response.found);
        }
    }


    async update(body: Object) {
        const [index, type] = this.extract_index_type();
    }

    toJSON(): Object {
        return this.db;
    }

}

module.exports = ODM;
