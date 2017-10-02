// @flow
const ODM = require('../crud/odm');
const Model = require('./models/citations');
const Mapping = require('../crud/mapping');

const mapping = new Mapping(Model.Mapping);

class Citation extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return 'msw_citation';
    }

    static type(): string {
        return 'citation';
    }
}

module.exports = Citation;
