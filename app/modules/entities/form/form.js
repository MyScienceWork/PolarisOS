// @flow
const ODM = require('../crud/odm');
const Model = require('./models/forms');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class Form extends ODM {
    static get model(): Object {
        return Model;
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config_.elasticsearch.index_prefix}_form`;
    }

    static get type(): string {
        return 'form';
    }
}

module.exports = Form;
