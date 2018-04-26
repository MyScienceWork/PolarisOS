const chai = require('chai');
const mapper = require('../build/modules/entities/crud/mapper');
const Mapping = require('../build/modules/entities/crud/mapping');
const util = require('util');

const should = chai.should();
const expect = chai.expect;

const es_mapping = {
    createdAt: {
        type: 'date',
        format: 'dateOptionalTime',
    },
    master: {
        type: 'keyword',
    },
    masterTitle: {
        type: 'text',
    },
    publications: {
        type: 'nested',
        include_in_parent: true,
        properties: {
            journal: {
                properties: {
                    issn: {
                        type: 'keyword',
                        index: false,
                    },
                    journalIds: {
                        type: 'nested',
                        properties: {
                            type: {
                                type: 'keyword',
                            },
                            value: {
                                type: 'keyword',
                            },
                        },
                    },
                    name: {
                        type: 'text',
                        fields: {
                            name: {
                                type: 'text',
                            },
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                },
            },
            masterDate: {
                type: 'date',
                format: 'yyyy||yyyy-MM||yyyy-MM-dd',
            },
            source: {
                type: 'keyword',
            },
        },
    },
    slug: {
        type: 'keyword',
    },
    updatedAt: {
        type: 'date',
        format: 'dateOptionalTime',
    },
};

describe('Mapper#transform_to_search#Bool', () => {
    it('should handle bool query correctly (1)', () => {
        const body = {
            where: {
                $and: {
                    $$match: { test: 'OK' },
                },
            },
        };

        const search = mapper.transform_to_search(body);
        const json = search.generate();

        json.should.have.property('bool');
        json.bool.should.have.property('must');
        json.bool.must.should.have.lengthOf(1);
        json.bool.must[0].should.have.property('match');
    });


    it('should handle bool query correctly (2)', () => {
        const body = {
            where: {
                $fand: {
                    $$match: { test: 'OK' },
                },
            },
        };

        const search = mapper.transform_to_search(body);
        const json = search.generate();

        json.should.have.property('bool');
        json.bool.should.have.property('filter');
        json.bool.filter.should.have.lengthOf(1);
        json.bool.filter[0].should.have.property('match');
    });

    it('should handle bool query correctly (3)', () => {
        const body = {
            where: {
                $nfand: {
                    $$match: { test: 'OK' },
                },
            },
        };

        const search = mapper.transform_to_search(body);
        const json = search.generate();

        json.should.have.property('bool');
        json.bool.should.have.property('must_not');
        json.bool.must_not.should.have.lengthOf(1);
        json.bool.must_not[0].should.have.property('match');
    });

    it('should handle bool query correctly (4)', () => {
        const body = {
            where: {
                $or: {
                    $$match: { test: 'OK' },
                },
            },
        };

        const search = mapper.transform_to_search(body);
        const json = search.generate();

        json.should.have.property('bool');
        expect(json.bool).to.have.property('should');
        expect(json.bool.should).to.have.lengthOf(1);
        expect(json.bool.should[0]).to.have.property('match');
    });

    it('should handle bool query correctly (5)', () => {
        const body = {
            where: {
                $and: [
                    { $$match: { test: 'OK' } }, { $$term: { test: 'OK' } },
                ],
            },
        };

        const search = mapper.transform_to_search(body);
        const json = search.generate();

        json.should.have.property('bool');
        json.bool.should.have.property('must');
        json.bool.must.should.have.lengthOf(2);
        json.bool.must[0].should.have.property('match');
        json.bool.must[1].should.have.property('term');
    });

    it('should handle bool query correctly (6)', () => {
        const body = {
            where: {
                $and: [
                    { $$term: { test: 'OK' } },
                ],

                $nfand: [
                    { $$term: { test: 'OK' } },
                ],
            },
        };

        const search = mapper.transform_to_search(body);
        const json = search.generate();

        json.should.have.property('bool');
        json.bool.should.have.property('must');
        json.bool.must.should.have.lengthOf(1);
        json.bool.must[0].should.have.property('term');

        json.should.have.property('bool');
        json.bool.should.have.property('must');
        json.bool.must_not.should.have.lengthOf(1);
        json.bool.must_not[0].should.have.property('term');
    });

    it('should handle bool query correctly (7)', () => {
        const body = {
            where: {
                $or: [
                    { $$term: { test: 'OK' } },
                    { $$term: { test: 'NOK' } },
                ],
                $msm: 2,
            },
        };

        const body_2 = {
            where: {
                $or: [
                    { $$term: { test: 'OK' } },
                    { $$term: { test: 'NOK' } },
                ],
                $minimum_should_match: 2,
            },
        };

        [body, body_2].map((b) => {
            const search = mapper.transform_to_search(b);
            const json = search.generate();
            json.should.have.property('bool');
            expect(json.bool).to.have.property('should');
            expect(json.bool.should).to.have.lengthOf(2);
            expect(json.bool.should[0]).to.have.property('term');
            expect(json.bool.should[1]).to.have.property('term');
            expect(json.bool).to.property('minimum_should_match', 2);
        });
    });
});

describe('Mapper#transform_to_search#Shortcut', () => {
    it('should handle match when mapping says text', () => {
        const body = {
            where: {
                masterTitle: 'test query',
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();

        json.should.have.property('match');
        json.match.should.have.property('masterTitle');
        json.match.masterTitle.should.have.property('query', 'test query');
    });

    it('should create multiple matches in a bool query when using list of queries on text', () => {
        const body = {
            where: {
                masterTitle: ['test query 1', 'test query 2'],
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();
        json.should.have.property('bool');
        expect(json.bool).to.have.property('should');
        expect(json.bool.should).to.have.lengthOf(2);
        json.bool.should[0].should.have.property('match');
        json.bool.should[0].match.should.have.property('masterTitle');
        json.bool.should[0].match.masterTitle.should.have.property('query', 'test query 1');

        json.bool.should[1].should.have.property('match');
        json.bool.should[1].match.should.have.property('masterTitle');
        json.bool.should[1].match.masterTitle.should.have.property('query', 'test query 2');
    });

    it('should create term query when mapping says keyword', () => {
        const body = {
            where: {
                slug: 'test query',
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();

        json.should.have.property('term');
        json.term.should.have.property('slug');
        json.term.slug.should.have.property('value', 'test query');
    });

    it('should create terms query when using list of queries on keyword', () => {
        const body = {
            where: {
                slug: ['test query 1', 'test query 2'],
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();

        json.should.have.property('terms');
        json.terms.should.have.property('slug');
        json.terms.slug.should.have.lengthOf(2);
        json.terms.slug[0].should.equal('test query 1');
        json.terms.slug[1].should.equal('test query 2');
    });

    it('should create nested term query when mapping says nested + keyword', () => {
        const q = 'test query';
        const body = {
            where: {
                'publications.source': q,
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();

        json.should.have.property('nested');
        json.nested.should.have.property('path', 'publications');
        json.nested.should.have.property('query');
        json.nested.query.should.have.property('term');
        json.nested.query.term.should.have.property('publications.source');
        json.nested.query.term['publications.source'].should.have.property('value', q);
    });

    it('should create deeply nested term query when mapping says nested + nested + keyword', () => {
        const q = 'test query';
        const body = {
            where: {
                'publications.journal.journalIds.type': q,
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();

        json.should.have.property('nested');
        json.nested.should.have.property('path', 'publications');
        json.nested.should.have.property('query');
        json.nested.query.should.have.property('nested');
        json.nested.query.nested.should.have.property('path', 'publications.journal.journalIds');
        json.nested.query.nested.should.have.property('query');
        json.nested.query.nested.query.should.have.property('term');
        json.nested.query.nested.query.term.should.have.property('publications.journal.journalIds.type');
        json.nested.query.nested.query
            .term['publications.journal.journalIds.type'].should.have.property('value', q);
    });

    it('should create query_string query with $qs shortcut query', () => {
        const q = 'this AND that OR thus';
        const body = {
            where: {
                masterTitle: { $qs: q },
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();

        json.should.have.property('query_string');
        json.query_string.should.have.property('default_field', 'masterTitle');
        json.query_string.should.have.property('query', q);
    });

    it('should create match query with complex fields when $match is used', () => {
        const q = 'my exact title';
        const body = {
            where: {
                masterTitle: { $match: { query: q, minimum_should_match: '100%', operator: 'and' } },
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();

        json.should.have.property('match');
        json.match.should.have.property('masterTitle');
        json.match.masterTitle.should.have.property('query', q);
        json.match.masterTitle.should.have.property('operator', 'and');
        json.match.masterTitle.should.have.property('minimum_should_match', '100%');
    });

    it('should create range query with used with date type field', () => {
        const body = {
            where: {
                updatedAt: { '<': 'now', '>': 'now-1d' },
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();

        json.should.have.property('range');
        json.range.should.have.property('updatedAt');
        json.range.updatedAt.should.have.property('lt', 'now');
        json.range.updatedAt.should.have.property('gt', 'now-1d');
    });

    it('should create range query with used with date type field and an array of operators', () => {
        const body = {
            where: {
                updatedAt: [{ '<': 'now' }, { '>': 'now-1d' }],
            },
        };

        const mapping = new Mapping(es_mapping);
        const search = mapper.transform_to_search(body, mapping);
        const json = search.generate();
        json.should.have.property('range');
        json.range.should.have.property('updatedAt');
        json.range.updatedAt.should.have.property('lt', 'now');
        json.range.updatedAt.should.have.property('gt', 'now-1d');
    });
});


describe('SortMapper#transform_to_sort', () => {
    it('should handle simple value', () => {
        const body = {
            sort: [
                'masterDate',
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);

        sort.should.have.lengthOf(1);
        sort[0].should.have.property('masterDate');
    });

    it('should handle simple nested value', () => {
        const body = {
            sort: [
                'publications.source',
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);

        sort.should.have.lengthOf(1);
        sort[0].should.have.property('publications.source');
        sort[0]['publications.source'].should.have.property('nested_path', 'publications');
    });

    it('should automatically infer order', () => {
        const body = {
            sort: [
            { masterDate: 'asc' },
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);

        sort.should.have.lengthOf(1);
        sort[0].should.have.property('masterDate');
        sort[0].masterDate.should.have.property('order', 'asc');
    });

    it('should automatically infer mode', () => {
        const body = {
            sort: [
            { masterDate: 'min' },
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);

        sort.should.have.lengthOf(1);
        sort[0].should.have.property('masterDate');
        sort[0].masterDate.should.have.property('mode', 'min');
    });

    it('should automatically infer sort and mode', () => {
        const body = {
            sort: [
            { masterDate: ['asc', 'min'] },
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);

        sort.should.have.lengthOf(1);
        sort[0].should.have.property('masterDate');
        sort[0].masterDate.should.have.property('mode', 'min');
        sort[0].masterDate.should.have.property('order', 'asc');
    });

    it('should automatically discard wrong values', () => {
        const body = {
            sort: [
            { masterDate: ['mad', 'max', 'order'] },
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);

        sort.should.have.lengthOf(1);
        sort[0].should.have.property('masterDate');
        sort[0].masterDate.should.have.property('mode', 'max');
        Object.keys(sort[0].masterDate).should.have.lengthOf(1);
    });

    it('should automatically infer nested path of length 1', () => {
        const body = {
            sort: [
            { 'publications.source': ['asc', 'avg'] },
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);
        sort.should.have.lengthOf(1);
        sort[0].should.have.property('publications.source');
        sort[0]['publications.source'].should.have.property('nested_path', 'publications');
        sort[0]['publications.source'].should.have.property('mode', 'avg');
        sort[0]['publications.source'].should.have.property('order', 'asc');
    });

    it('should automatically infer complex path', () => {
        const body = {
            sort: [
            { 'publications.journal.issn': ['asc', 'avg'] },
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);
        sort.should.have.lengthOf(1);
        sort[0].should.have.property('publications.journal.issn');
        sort[0]['publications.journal.issn'].should.have.property('nested_path', 'publications');
        sort[0]['publications.journal.issn'].should.have.property('mode', 'avg');
        sort[0]['publications.journal.issn'].should.have.property('order', 'asc');
    });

    it('should automatically discard nested path of length > 1', () => {
        const body = {
            sort: [
            { 'publications.journal.journalIds.type': ['asc', 'avg'] },
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);
        sort.should.have.lengthOf(0);
    });

    it('should handle multiple sort criteria', () => {
        const body = {
            sort: [
                'masterTitle',
            { 'publications.source': ['asc', 'avg'] },
            ],
        };

        const mapping = new Mapping(es_mapping);
        const sort = mapper.transform_to_sort(body, mapping);
        sort.should.have.lengthOf(2);
        sort[0].should.have.property('masterTitle');
        sort[1].should.have.property('publications.source');
        sort[1]['publications.source'].should.have.property('mode', 'avg');
        sort[1]['publications.source'].should.have.property('order', 'asc');
    });
});

describe('AggregationMapper#transform_to_aggregation', () => {
    it('nothing', () => {
        const body = {
            aggregations: {
                'publications.authors.fullName.raw': {
                    $type: 'terms',
                    $name: 'source',
                    size: 5,
                },
            },
        };

        const mapping = new Mapping(es_mapping);
        const agg = mapper.transform_to_aggregation(body, mapping);
        // console.log(util.inspect(agg, { depth: null, colors: true }));
        console.log(JSON.stringify(agg));
    });
});
