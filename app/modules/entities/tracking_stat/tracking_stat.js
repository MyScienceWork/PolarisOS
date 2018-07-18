// @flow
const ODM = require('../crud/odm');
const Model = require('./models/tracking_stats');
const Mapping = require('../crud/mapping');
const Config = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class TrackingStat extends ODM {
    static get model(): Object {
        return Model;
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config.elasticsearch.index_prefix}_tracking_stat`;
    }

    static get type(): string {
        return 'tracking_stat';
    }
}

module.exports = TrackingStat;
