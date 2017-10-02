// @flow
const Operator = require('./enums/operator');
const ZeroTermsQuery = require('./enums/zero_terms_query');
const Fuzziness = require('./enums/fuzziness');

class Query {
    _object: Object;
    _query: ?Query;
    _minimum_should_match: ?string;
    _boost: ?number;

    constructor(object: Object = {}) {
        this._object = object;
        this._query = 'query' in object ? object.query : null;
        this._boost = null;
        this._minimum_should_match = 'minimum_should_match' in object ? object.minimum_should_match : null;
    }

    get inner_query(): ?Query {
        return this._query;
    }

    boost(n: number) {
        this._boost = n;
        return this;
    }

    minimum_should_match(m: string) {
        this._minimum_should_match = m;
        return this;
    }

    query(q: Query) {
        this._query = q;
        return this;
    }

    generate(): Object {
        return this._query != null ? this._query.generate() : {};
    }
}

class RawQuery extends Query {
    generate(): Object {
        return this._object;
    }
}


class Bool extends Query {
    _must: Array<Query>;
    _must_not: Array<Query>;
    _should: Array<Query>;
    _filter: Array<Query>;

    constructor(object: Object = {}) {
        super(object);

        this._must = 'must' in object ? object.must : [];
        this._must_not = 'must_not' in object ? object.must_not : [];
        this._should = 'should' in object && object.should instanceof Array ? object.should : [];
        this._filter = 'filter' in object ? object.filter : [];
    }

    must(query: Query) {
        if (!(query instanceof Query)) {
            throw Error('query should be a genuine query');
        }
        this._must.push(query);
        return this;
    }

    must_not(query: Query) {
        if (!(query instanceof Query)) {
            throw Error('query should be a genuine query');
        }
        this._must_not.push(query);
        return this;
    }

    should(query: Query) {
        if (!(query instanceof Query)) {
            throw Error('query should be a genuine query');
        }
        this._should.push(query);
        return this;
    }

    filter(query: Query) {
        if (!(query instanceof Query)) {
            throw Error('query should be a genuine query');
        }
        this._filter.push(query);
        return this;
    }

    generate() {
        const pairs = [
            ['must', this._must],
            ['must_not', this._must_not],
            ['filter', this._filter],
            ['should', this._should],
        ];


        const obj = pairs.reduce((acc, p) => {
            const [field, o] = p;
            if (o.length > 0) {
                acc.bool[field] = o.map(q => q.generate());
            }
            return acc;
        }, { bool: {} });

        if (this._minimum_should_match) {
            obj.bool.minimum_should_match = this._minimum_should_match;
        }

        if (this._boost) {
            obj.bool.boost = this._boost;
        }

        if (Object.keys(obj.bool).length > 0) {
            return obj;
        }
        return null;
    }
}

class ConstantScore extends Query {}
class DisMax extends Query {}
class Filtered extends Query {}
class Indices extends Query {}

class Nested extends Query {
    _path: string
    _nested_query: ?Query;

    constructor(object: Object = {}) {
        super(object);
        this._path = 'path' in object ? object.path : '';
        this._nested_query = 'query' in object && object.query != null ? object.query : new Query({});
    }

    path(p: string) {
        this._path = p;
        return this;
    }

    query(query: Query) {
        this._nested_query = query;
        return this;
    }

    generate() {
        return {
            nested: {
                path: this._path,
                query: this._nested_query.generate(),
            },
        };
    }
}
class HasChild extends Query {}
class HasParent extends Query {}
class TopChildren extends Query {}

class FullTextQuery extends Query {
    _analyzer: ?string;
    _fuzziness: ?Fuzziness;
    _operator: ?Operator;
    _zero_terms_query: ?ZeroTermsQuery;

    constructor(object: Object = {}) {
        super(object);
        this._analyzer = null;
        this._fuzziness = null;
        this._operator = null;
        this._zero_terms_query = null;

        if ('analyzer' in object) {
            this.analyzer(object.analyzer);
        }

        if ('fuzziness' in object) {
            this.fuzziness(object.fuzziness);
        }

        if ('operator' in object) {
            this.operator(object.operator);
        }

        if ('zero_terms_query' in object) {
            this.zero_terms_query(object.zero_terms_query);
        }
    }

    zero_terms_query(zq: string) {
        this._zero_terms_query = ZeroTermsQuery.enumValueOf(zq.toUpperCase());
        return this;
    }

    operator(o: string) {
        this._operator = Operator.enumValueOf(o.toUpperCase());
        return this;
    }

    fuzziness(f: string) {
        this._fuzziness = Fuzziness.enumValueOf(f.toUpperCase());
        return this;
    }

    analyzer(a: string) {
        this._analyzer = a;
        return this;
    }
}

class Match extends FullTextQuery {
    match(object: Object = {}) {
        this._object = object;
        return this;
    }

    generate() {
        const keys = Object.keys(this._object);
        const obj = { match: {} };
        if (keys.length > 0) {
            const key = keys[0];
            const q = this._object[key];
            obj.match[key] = {
                query: q,
            };

            if (this._operator) {
                obj.match[key].operator = this._operator.toString();
            }

            if (this._fuzziness) {
                obj.match[key].fuzziness = this._fuzziness.toString();
            }

            if (this._minimum_should_match) {
                obj.match[key].minimum_should_match = this._minimum_should_match;
            }

            if (this._boost) {
                obj.match[key].boost = this._boost;
            }

            if (this._zero_terms_query) {
                obj.match[key].zero_terms_query = this._zero_terms_query.toString();
            }

            if (this._analyzer) {
                obj.match[key].analyzer = this._analyzer;
            }

            return obj;
        }

        return null;
    }
}

class MatchPhrase extends FullTextQuery {
    generate() {
        return { match_phrase: {} };
    }
}

class MatchAll extends FullTextQuery {
    generate() {
        return { match_all: {} };
    }
}

class QueryString extends FullTextQuery {
    _default_field: ?string;
    _qs: ?string;
    constructor(object: Object = {}) {
        super(object);
        this._default_field = null;
        this._qs = null;
    }

    default_field(key: string) {
        this._default_field = key;
        return this;
    }

    qs(query_string: string) {
        this._qs = query_string;
        return this;
    }

    generate() {
        if (this._qs == null) {
            return {};
        }

        const o = { query_string: { query: this._qs } };

        if (this._default_field != null) {
            o.query_string.default_field = this._default_field;
        }

        return o;
    }

}

class Term extends Query {
    term(object: Object = {}) {
        this._object = object;
        return this;
    }

    generate() {
        const keys = Object.keys(this._object);
        const obj = { term: {} };
        if (keys.length > 0) {
            const key = keys[0];
            const q = this._object[key];
            obj.term[key] = {
                value: q,
            };

            if (this._boost) {
                obj.term[key].boost = this._boost;
            }
            return obj;
        }

        return null;
    }
}

class Terms extends Query {
    terms(object: Object = {}) {
        this._object = object;
        return this;
    }

    generate() {
        return { terms: this._object };
    }
}

module.exports = {
    RawQuery,
    Query,
    Bool,
    ConstantScore,
    DisMax,
    Filtered,
    Indices,
    Nested,
    HasChild,
    HasParent,
    TopChildren,
    Match,
    MatchAll,
    MatchPhrase,
    QueryString,
    Term,
    Terms,
};
