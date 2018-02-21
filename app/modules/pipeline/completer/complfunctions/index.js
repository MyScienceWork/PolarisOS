// @flow
const _ = require('lodash');
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

    const func = (nr, from, eseg, flat) => async (id) => {
        if (!id) {
            return null;
        }
        if (nr) {
            const e = await EntitiesUtils.retrieve(id, from);
            const eobj = Utils.find_object_with_path(e.source, eseg);
            if (eobj == null) {
                return null;
            }
            const last = eseg[eseg.length - 1];
            const value = eobj[last];
            if (flat) {
                return value;
            }
            return { [last]: value };
        }
        return id;
    };

    return async (object: Object, path: string, info: Object = {}) => {
        const need_to_retrieve = from_entity != null && from_entity.trim() !== ''
            && entity_path != null && entity_path.trim() !== '';
        const entity_segments = entity_path.split('.');

        const from_path_segments = from_path.split('.');
        const result = await Utils.traverse_and_execute(object, from_path_segments,
            func(need_to_retrieve, from_entity, entity_segments, flatten));
        return { denormalization: result };
    };
}

module.exports = {
    generic_complete,
    key_complete,
    secret_complete,
    denormalization,
};
