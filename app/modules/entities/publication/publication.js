// @flow
const ODM = require('../crud/odm');
const Model = require('./models/publications');
const Mapping = require('../crud/mapping');

const mapping = new Mapping(Model.Mapping);

class Publication extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return 'publication';
    }

    static type(): string {
        return 'publication';
    }
}

module.exports = Publication;
