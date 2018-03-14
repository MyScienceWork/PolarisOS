const Enum = require('enumify').Enum;

class ZeroTermsQuery extends Enum {
    toString() {
        return this.name.toLowerCase();
    }
}

ZeroTermsQuery.initEnum(['NONE', 'ALL']);

module.exports = ZeroTermsQuery;
