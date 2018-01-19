// @flow
const ODM = require('../crud/odm');
const Model = require('./models/users');
const Mapping = require('../crud/mapping');
const Config = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class User extends ODM {
    static get model(): Object {
        return Model;
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config.elasticsearch.index_prefix}_user`;
    }

    static get type(): string {
        return 'user';
    }
}

module.exports = User;
