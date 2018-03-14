// @flow
const queries = require('./query');
const Enum = require('enumify').Enum;

class CompoundType extends Enum {}
CompoundType.initEnum(['FILTER', 'EXCLUDE', 'INCLUDE']);


class Search {
    _client: Object;
    _index: string;
    _type: string;
    _aggs: ?Object;
    _query: queries.Query;
    _sort: ?Object;

    constructor(client: Object, index: string, type: string) {
        this._client = client;
        this._index = index;
        this._type = type;
        this._aggs = null;
        this._query = new queries.Query({});
        this._sort = null;
    }

    aggs() {
        return this._aggs;
    }

    include(query: queries.Query) {
        this._compound(query, CompoundType.INCLUDE);
        return this;
    }

    filter(query: queries.Query) {
        this._compound(query, CompoundType.EXCLUDE);
        return this;
    }

    exclude(query: queries.Query) {
        this._compound(query, CompoundType.FILTER);
        return this;
    }

    add_sort(obj: Object) {
        this._sort = obj;
    }

    add_aggregations(aggs: Object) {
        this._aggs = aggs;
    }

    sort(): ?Object {
        return this._sort;
    }

    generate(): Object {
        return this._query.generate();
    }

    _compound(object: queries.Query, type: CompoundType) {
        const iq = this._query.inner_query;
        let prop = 'filter';
        switch (type) {
        case CompoundType.INCLUDE:
            prop = 'must';
            break;
        case CompoundType.EXCLUDE:
            prop = 'must_not';
            break;
        default:
        case CompoundType.FILTER:
            prop = 'filter';
            break;
        }

        if (iq) {
            if (iq instanceof queries.Bool) {
                const q = Search.forge_query(object, null);
                switch (type) {
                case CompoundType.INCLUDE:
                    iq.must(q);
                    break;
                case CompoundType.EXCLUDE:
                    iq.must_not(q);
                    break;
                default:
                case CompoundType.FILTER:
                    iq.filter(q);
                    break;
                }
            } else {
                this._query.query(
                    new queries.Bool({ [prop]: [
                        iq,
                    ] }));
            }
        } else {
            this._query.query(
                new queries.Bool({ [prop]: [
                    Search.forge_query(object, null),
                ] }));
        }
        return this;
    }

    query(q: queries.Query) {
        this._query.query(Search.forge_query(q, this._query.inner_query));
        return this;
    }

    raw_query(q: Object) {
        const query = new queries.RawQuery(q);
        this._query.query(Search.forge_query(query, this.query.inner_query));
        return this;
    }

    /* post_filter(query: queries.Query) {

      }*/

    static forge_query(object: queries.Query,
            query: ?queries.Query): queries.Query {
        if (query) {
            if (query instanceof queries.Bool) {
                query.should(object);
                return query;
            }
            return new queries.Bool({
                should: [object, query],
            });
        }

        return object;
    }
}

module.exports = Search;
