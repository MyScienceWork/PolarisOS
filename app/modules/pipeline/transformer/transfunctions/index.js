// @flow
const Handlebars = require('../../../utils/templating');
const Utils = require('../../../utils/utils');

async function transform(input: Object, input_path: string, output: Object, output_path: string) {

}

/* function generic_complete(template: string): Function {
    return async (object: Object, path: string, info: Object = {}) => {
        const t = Handlebars.compile(template)({ object, info });
        return Utils.make_nested_object_from_path(path.split('.'), t);
    };
}*/

module.exports = {
};
