const Enum = require('enumify').Enum;

class SortMode extends Enum {
    toString() {
        return this.name.toLowerCase();
    }
}
SortMode.initEnum(['MIN', 'MAX', 'AVG', 'SUM', 'MEDIAN']);

module.exports = SortMode;
