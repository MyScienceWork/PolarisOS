// @flow
const ODM = require('../crud/odm');
const Model = require('./models/forms');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class Form extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return `${Config_.elasticsearch.index_prefix}_form`;
    }

    static type(): string {
        return 'form';
    }
}

module.exports = Form;
