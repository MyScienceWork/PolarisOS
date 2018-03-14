const chai = require('chai');
const Mapping = require('../build/modules/entities/crud/mapping');

const should = chai.should();

const es_mapping = {
    createdAt: {
        type: 'date',
        format: 'dateOptionalTime',
    },
    master: {
        type: 'keyword',
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
        slug: {
            type: 'keyword',
        },
        updatedAt: {
            type: 'date',
            format: 'dateOptionalTime',
        },
    },
};

describe('Mapping#get_all_type', () => {
    it('should handle simple path', () => {
        const mapping = new Mapping(es_mapping);
        const type = mapping.get_all_type('createdAt');

        type.should.have.lengthOf(1);
        type[0].should.have.lengthOf(3);
        type[0][0].should.equal('createdAt');
        type[0][1].should.equal('');
        type[0][2].should.equal('date');
    });

    it('should handle nested path', () => {
        const mapping = new Mapping(es_mapping);
        const type = mapping.get_all_type('publications.source');

        type.should.have.lengthOf(2);

        type[0].should.have.lengthOf(3);
        type[0][0].should.equal('publications');
        type[0][1].should.equal('');
        type[0][2].should.equal('nested');

        type[1].should.have.lengthOf(3);
        type[1][0].should.equal('source');
        type[1][1].should.equal('publications');
        type[1][2].should.equal('keyword');
    });

    it('should handle deeply nested path', () => {
        const mapping = new Mapping(es_mapping);
        const type = mapping.get_all_type('publications.journal.journalIds.type');

        type.should.have.lengthOf(4);

        type[0].should.have.lengthOf(3);
        type[0][0].should.equal('publications');
        type[0][1].should.equal('');
        type[0][2].should.equal('nested');

        type[1].should.have.lengthOf(3);
        type[1][0].should.equal('journal');
        type[1][1].should.equal('publications');
        type[1][2].should.equal('field');

        type[2].should.have.lengthOf(3);
        type[2][0].should.equal('journalIds');
        type[2][1].should.equal('publications.journal');
        type[2][2].should.equal('nested');

        type[3].should.have.lengthOf(3);
        type[3][0].should.equal('type');
        type[3][1].should.equal('publications.journal.journalIds');
        type[3][2].should.equal('keyword');
    });
});

describe('Mapping#get_type', () => {
    it('should return the last type', () => {
        const mapping = new Mapping(es_mapping);
        const type = mapping.get_type('publications.journal.journalIds');
        type.should.equal('nested');
    });
});
