// @flow
const ODM = require('../crud/odm');
const Model = require('./models/typologies');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class Typology extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return `${Config_.elasticsearch.index_prefix}_typology`;
    }

    static type(): string {
        return 'typology';
    }
}

module.exports = Typology;
