const Datacite = require('./datacite');

class DatacitePublication extends Datacite {
    constructor() {
        super('publication', 'typology');
    }
}

module.exports = DatacitePublication;
