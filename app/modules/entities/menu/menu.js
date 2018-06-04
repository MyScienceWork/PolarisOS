// @flow
const ODM = require('../crud/odm');
const Model = require('./models/menus');
const Mapping = require('../crud/mapping');
const Config = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class Menu extends ODM {
    static get model(): Object {
        return Model;
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config.elasticsearch.index_prefix}_menu`;
    }

    static get type(): string {
        return 'menu';
    }
}

module.exports = Menu;
