const Enum = require('enumify').Enum;

class Fuzziness extends Enum {
    toString() {
        return this.name;
    }
}
Fuzziness.initEnum(['AUTO', '0', '1', '2']);

module.exports = Fuzziness;
