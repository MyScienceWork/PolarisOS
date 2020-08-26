// @flow
const Datacite = require('./datacite');

class DataciteDataset extends Datacite {
    constructor() {
        super('dataset', 'typology_dataset');
    }
}

module.exports = DataciteDataset;
