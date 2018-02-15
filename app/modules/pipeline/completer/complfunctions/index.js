// @flow
const Handlebars = require('../../../utils/templating');
const Utils = require('../../../utils/utils');
const CryptoUtils = require('../../../utils/crypto');
const EntitiesUtils = require('../../../utils/entities');
const LangUtils = require('../../../utils/lang');

function generic_complete(template: string): Function {
    return async (object: Object, path: string, info: Object = {}) => {
        const t = Handlebars.compile(template)({ object, info });
        return Utils.make_nested_object_from_path(path.split('.'), t);
    };
}

async function key_complete(object: Object, path: string, info: Object = {}) {
    const result = Utils.make_nested_object_from_path(path.split('.'), CryptoUtils.generate_key(''));
    return result;
}

async function secret_complete(object: Object, path: string, info: Object = {}) {
    const result = Utils.make_nested_object_from_path(path.split('.'), CryptoUtils.generate_secret());
    return result;
}

function denormalization(from_entity: string, from_path: string,
        entity_path: string, flatten: boolean, translatable: boolean): Function {
    const ENV = process.env.NODE_ENV || 'local';

    return async (object: Object, path: string, info: Object = {}) => {
        const fentity_ids = [...Utils.find_popvalue_with_path(object, from_path.split('.'))];
        if (fentity_ids.length === 0) {
            return {};
        }

        let fentitys = await Promise.all(fentity_ids.map(id => EntitiesUtils.retrieve(id, from_entity)));
        fentitys = fentitys.filter(e => e != null);
        if (fentitys.length === 0) {
            return {};
        }

        /* let config = null;
        if (translatable) {
            config = await LangUtils.get_config(ENV);
            }*/

        const entity_segments = entity_path.split('.');
        const values = fentitys.map((e) => {
            const eobj = Utils.find_object_with_path(e.source, entity_segments);
            if (eobj == null) {
                return eobj;
            }
            const last = entity_segments[entity_segments.length - 1];
            const value = eobj[last];
            if (flatten) {
                return value;
            }
            return { [last]: value };
        }).filter(v => v != null && Object.keys(v).length > 0);

        if (values.length === 0) {
            return {};
        }

        let result = {};
        if (values.length === 1) {
            if (flatten) {
                result = Utils.make_nested_object_from_path(path.split('.'), values[0]);
            } else {
                result = Utils.make_nested_object_from_path(path.split('.'), values);
            }
        } else {
            result = Utils.make_nested_object_from_path(path.split('.'), values);
        }
        return result;
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
    key_complete,
    secret_complete,
    denormalization,
};
