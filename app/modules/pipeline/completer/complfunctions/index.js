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

    return async (object: Object, path: string, info: Object = {}) => {
        const fentity_ids = [...Utils.find_popvalue_with_path(object, from_path.split('.'), false, true)];

        if (fentity_ids.length === 0) {
            return {};
        }

        let fentitys = [];
        let values = [];
        if (from_entity == null || from_entity === ''
            || entity_path == null || entity_path === '') {
            values = fentity_ids;
        } else {
            fentitys = await Promise.all(fentity_ids.map(id => EntitiesUtils.retrieve(id, from_entity)));
            // fentitys = fentitys.filter(e => e != null);
            if (fentitys.length === 0) {
                return {};
            }

            /* let config = null;
            if (translatable) {
                config = await LangUtils.get_config(ENV);
                }*/

            const entity_segments = entity_path.split('.');
            values = fentitys.map((e) => {
                if (e == null) {
                    return null;
                }

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
            });
        }

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
            result = values.reduce((obj, v) => Utils.merge_with_concat(obj, Utils.make_nested_object_from_path(path.split('.'), v)), {});
        }

        return result;
    };
}

module.exports = {
    generic_complete,
    key_complete,
    secret_complete,
    denormalization,
};
