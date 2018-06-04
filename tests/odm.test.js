const chai = require('chai');
const queries = require('../build/modules/entities/crud/query');

const should = chai.should();
const expect = chai.expect;

const query_extra_params = [
    ['minimum_should_match', '75%', m => m.minimum_should_match('75%')],
    ['boost', 1.5, m => m.boost(1.5)],
];

const bool_list_params = [
    ['must',
        [
            new queries.Match({ message: 'test' }).generate(),
            new queries.Match({ test: 'test' }).generate(),
        ],
        [
            q => q.must(new queries.Match({ message: 'test' })),
            q => q.must(new queries.Match({ test: 'test' })),
        ],
    ],
    ['must_not',
        [
            new queries.Match({ message: 'test' }).generate(),
            new queries.Match({ test: 'test' }).generate(),
        ],
        [
            q => q.must_not(new queries.Match({ message: 'test' })),
            q => q.must_not(new queries.Match({ test: 'test' })),
        ],
    ],
    ['should',
        [
            new queries.Match({ message: 'test' }).generate(),
            new queries.Match({ test: 'test' }).generate(),
        ],
        [
            q => q.should(new queries.Match({ message: 'test' })),
            q => q.should(new queries.Match({ test: 'test' })),
        ],
    ],
    ['filter',
        [
            new queries.Match({ message: 'test' }).generate(),
            new queries.Match({ test: 'test' }).generate(),
        ],
        [
            q => q.filter(new queries.Match({ message: 'test' })),
            q => q.filter(new queries.Match({ test: 'test' })),
        ],
    ],
];

const fulltext_extra_params = [
    ['zero_terms_query', 'all', m => m.zero_terms_query('all')],
    ['zero_terms_query', 'none', m => m.zero_terms_query('none')],
    ['fuzziness', 'AUTO', m => m.fuzziness('auto')],
    ['fuzziness', '0', m => m.fuzziness('0')],
    ['fuzziness', '1', m => m.fuzziness('1')],
    ['fuzziness', '2', m => m.fuzziness('2')],
    ['operator', 'and', m => m.operator('and')],
    ['operator', 'or', m => m.operator('or')],
    ['analyzer', 'test', m => m.analyzer('test')],
];

describe('ODM#Queries#Bool', () => {
    it('should be chainable', () => {
        const m = new queries.Bool({});
        const m2 = m.must(new queries.Match({ message: 'test' }));
        const m3 = m2.must(new queries.Match({ test: 'test' }));

        expect(m2).to.be.an.instanceof(queries.Query);
        expect(m2).to.be.an.instanceof(queries.Bool);
        expect(m3).to.be.an.instanceof(queries.Query);
        expect(m3).to.be.an.instanceof(queries.Bool);
    });

    query_extra_params.forEach((param) => {
        const [name, val, func] = param;
        it(`should produce the correct ${name}`, () => {
            const m = new queries.Bool({ });
            func(m);
            const obj = m.generate();
            obj.should.have.property('bool');
            obj.bool.should.have.property(name, val);
        });
    });

    bool_list_params.forEach((param) => {
        const [name, list_vals, list_funcs] = param;
        it(`should produce the correct list with ${name}`, () => {
            const q = new queries.Bool({ });
            list_funcs.forEach(func => func(q));
            const obj = q.generate();
            expect(obj).to.have.property('bool');
            expect(obj.bool).to.have.property(name);
            list_vals.forEach((val, idx) => {
                expect(obj.bool[name][idx]).to.deep.equal(val);
            });
        });
    });
});

describe('ODM#Queries#Match', () => {
    it('should be chainable', () => {
        const m = new queries.Match({ message: 'test' });
        const m2 = m.zero_terms_query('all');
        const m3 = m2.minimum_should_match('75%');

        m2.should.be.an.instanceof(queries.Query);
        m2.should.be.an.instanceof(queries.Match);
        m3.should.be.an.instanceof(queries.Query);
        m3.should.be.an.instanceof(queries.Match);
    });

    it('should produce the correct query', () => {
        const m = new queries.Match({ message: 'test' });
        const obj = m.generate();

        obj.should.have.property('match');
        obj.match.should.have.property('message');
        obj.match.message.should.have.property('query', 'test');
    });

    query_extra_params.forEach((param) => {
        const [name, val, func] = param;
        it(`should produce the correct ${name}`, () => {
            const m = new queries.Match({ message: 'test' });
            func(m);
            const obj = m.generate();
            obj.should.have.property('match');
            obj.match.should.have.property('message');
            obj.match.message.should.have.property(name, val);
        });
    });

    fulltext_extra_params.forEach((param) => {
        const [name, val, func] = param;
        it(`should produce the correct ${name}`, () => {
            const m = new queries.Match({ message: 'test' });
            func(m);
            const obj = m.generate();
            obj.should.have.property('match');
            obj.match.should.have.property('message');
            obj.match.message.should.have.property(name, val);
        });
    });
});

describe('ODM#Queries#Range', () => {
    it('should be chainable', () => {
        const m = new queries.Range();
        const m2 = m.field('masterDate');
        const m3 = m2.lt('now');

        m2.should.be.an.instanceof(queries.Query);
        m2.should.be.an.instanceof(queries.Range);
        m3.should.be.an.instanceof(queries.Query);
        m3.should.be.an.instanceof(queries.Range);
    });

    it('should generate empty query when field is not passed', () => {
        const m = new queries.Range().lt('now').gte('now+1d');
        const q = m.generate();
        Object.keys(q).should.have.lengthOf(0);
    });

    it('should generate empty query when no comparator is not passed', () => {
        const m = new queries.Range().field('masterDate');
        const q = m.generate();
        Object.keys(q).should.have.lengthOf(0);
    });

    it('should generate query with all set values', () => {
        const m = new queries.Range().field('masterDate').lt('now')
            .gt('now+1d').gte('now+2d').lte('now-1d').format('test').timezone('test');
        const q = m.generate();

        q.should.have.property('range');
        q.range.should.have.property('masterDate');
        q.range.masterDate.should.have.property('lt', 'now');
        q.range.masterDate.should.have.property('gt', 'now+1d');
        q.range.masterDate.should.have.property('gte', 'now+2d');
        q.range.masterDate.should.have.property('lte', 'now-1d');
        q.range.masterDate.should.have.property('format', 'test');
        q.range.masterDate.should.have.property('time_zone', 'test');
    });

    it('should generate correct query when used with operators', () => {
        const m = new queries.Range().field('masterDate')
            .operators({ '<': 'now' })
            .operators({ '<=': 'now-1d', '>=': 'now+2d', f: 'test', tz: 'test' });
        const q = m.generate();

        q.should.have.property('range');
        q.range.should.have.property('masterDate');
        q.range.masterDate.should.have.property('lt', 'now');
        q.range.masterDate.should.have.property('gte', 'now+2d');
        q.range.masterDate.should.have.property('lte', 'now-1d');
        q.range.masterDate.should.have.property('format', 'test');
        q.range.masterDate.should.have.property('time_zone', 'test');
    });

    it('should discard incorrect operators', () => {
        const m = new queries.Range().field('masterDate')
            .operators({ '<': 'now' })
            .operators({ '<<=': 'now-1d', '>>=': 'now+2d', test: 'test', tz: 'test' });
        const q = m.generate();

        q.should.have.property('range');
        q.range.should.have.property('masterDate');
        q.range.masterDate.should.have.property('lt', 'now');
        q.range.masterDate.should.have.property('time_zone', 'test');
        Object.keys(q.range.masterDate).should.have.lengthOf(2);
    });
});
