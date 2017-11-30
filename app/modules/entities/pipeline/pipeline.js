// @flow
const ODM = require('../crud/odm');
const Model = require('./models/pipelines');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class Pipeline extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return `${Config_.elasticsearch.index_prefix}_pipeline`;
    }

    static type(): string {
        return 'pipeline';
    }
}

module.exports = Pipeline;
