// @flow
const Handlebars = require('handlebars');
const Utils = require('../../../utils/utils');

function generic_complete(template: string): Function {
    return async (object: Object, path: string, info: Object = {}) => {
        const t = Handlebars.compile(template)({ object, info });
        return Utils.make_nested_object_from_path(path.split('.'), t);
    };
}

/* function denormalization(mapping: String): Function {
    const elements = mapping.split(',').map(e => e.trim()).filter(e => e != null && e !== '');
    const parts = elements.map(e => e.split('->').map(se => se.trim()));
    const _mapping = parts.reduce((arr, part) => {
        if (part.length !== 2) {
            return arr;
        }

        const input = part[0].split(':').map(p => p.trim());
        if (input.length !== 2) {
            return arr;
        }
        const output = part[1];
        arr.push({ id: input[0], from: input[1], to: output[0] });
        return arr;
    }, []);

    return async (object: Object, path: String, info: Object = {}) => {
        const p = path.split('.');
        let info = [...Utils.find_popvalue_with_path(object, p, true)];
        if(info.length === 0){
            return null;
        }

        info = info[0];
        const last = p[p.length-1];
        return _mapping.reduce((obj, mapp) => {
            const id = mapp.id;
            const populate = [...Utils.find_popvalue_with_path(info[last], id.split('.'))];
            if(populate.length === 0){
                return obj;
            }

        }, info)
    };
}*/

module.exports = {
    generic_complete,
};
