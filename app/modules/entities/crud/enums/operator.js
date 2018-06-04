const Enum = require('enumify').Enum;

class Operator extends Enum {
    toString() {
        return this.name.toLowerCase();
    }
}

Operator.initEnum(['AND', 'OR']);

module.exports = Operator;
