// @flow
const ODM = require('../crud/odm');
const Model = require('./models/users');
const Mapping = require('../crud/mapping');
const Config = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class User extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return `${Config.elasticsearch.index_prefix}_user`;
    }

    static type(): string {
        return 'user';
    }
}

module.exports = User;
