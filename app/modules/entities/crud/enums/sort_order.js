const Enum = require('enumify').Enum;

class SortOrder extends Enum {
    toString() {
        return this.name.toLowerCase();
    }
}
SortOrder.initEnum(['ASC', 'DESC']);

module.exports = SortOrder;
