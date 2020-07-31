// @flow
const _ = require('lodash');
const Handlebars = require('../../../utils/templating');
const Utils = require('../../../utils/utils');
const CryptoUtils = require('../../../utils/crypto');
const EntitiesUtils = require('../../../utils/entities');
const LangUtils = require('../../../utils/lang');
const Logger = require('../../../../logger');

function generic_complete(template: string): Function {
    return async (object: Object, path: string, info: Object = {}) => {
        const t = Handlebars.compile(template)({ object, info });
        return Utils.make_nested_object_from_path(path.split('.'), t);
    };
}

function copy(template: string): Function {
    return (object: Object, path: string, info: Object = {}) => {
        const obj = Utils.find_value_with_path(object, template.split("."));
        return Utils.make_nested_object_from_path(path.split('.'), obj);
    };
}

function concat(template: string): Function {
    return (object: Object, path: string, info: Object = {}) => {
        const keys = template.split(',');
        let result = [];
        keys.forEach(key => {
            let temp = Utils.find_value_with_path(object, key.split("."));
            if (temp instanceof Array) {
                result = result.concat(temp);
            } else if (temp) {
                result = result.concat([{ _id: temp }]);
            }
        })
        return Utils.make_nested_object_from_path(path.split('.'), result);
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

function initial(name_path: string, use_dash_split: boolean = true) {
    return async (object: Object, path: string) => {
        const name = Utils.find_value_with_path(object, name_path.split('.'));
        if (name == null || name.trim() === '') {
            return {};
        }

        const stopwords = ['de', 'le', 'la', 'les', 'van', 'von', 'du', 'den', 'der', 'die'];
        const parts = name.split(' ');
        const info = parts.reduce((arr, p) => {
            if (stopwords.indexOf(p.toLowerCase()) !== -1) {
                return arr;
            }
            arr.push(p);
            return arr;
        }, []);

        if (info.length === 0) {
            return {};
        }

        const first = info[0];

        if (first.startsWith('d\'')) {
            return Utils.make_nested_object_from_path(path.split('.'), first.slice(2)[0]);
        }

        if (use_dash_split) {
            const dash_parts = first.split('-');
            if (dash_parts.length > 1) {
                const f = dash_parts.map(p => p[0]);
                return Utils.make_nested_object_from_path(path.split('.'), f.join('-'));
            }
        }
        return Utils.make_nested_object_from_path(path.split('.'), first[0]);
    };
}

function denormalization(from_entity: string, from_path: string,
        entity_path: string, flatten: boolean, translatable: boolean, search_value: string = ''): Function {
    const ENV = process.env.NODE_ENV || 'local';


    return async (object: Object, path: string, info: Object = {}) => {
        const func = (nr, from, eseg, flat, svalue) => async (id) => {
            if (!id) {
                return null;
            }
            if (nr) {
                let source = null;

                if (svalue !== '') {
                    const sources = await EntitiesUtils.search_and_get_sources(from, {
                        where: { [svalue]: id },
                        size: 1,
                    });
                    if (sources.length > 0) {
                        source = sources[0];
                    }
                } else {
                    source = await EntitiesUtils.retrieve_and_get_source(from, id);
                }

                if (source == null) {
                    return null;
                }

                const eobj = Utils.find_object_with_path(source, eseg);
                if (eobj == null) {
                    return null;
                }
                const last = eseg[eseg.length - 1];
                const value = eobj[last];
                if (flat) {
                    if (value && translatable) {
                        return await LangUtils
                            .string_to_translation(value, 'EN', 0);
                    }
                    return value;
                }
                if (value && translatable) {
                    const value_translated = await LangUtils
                        .string_to_translation(value, 'EN', 0);
                    return { [last]: value_translated };
                }
                return { [last]: value };
            }
            return id;
        };

        const need_to_retrieve = from_entity != null && from_entity.trim() !== ''
            && entity_path != null && entity_path.trim() !== '';
        const entity_segments = entity_path.split('.');

        const from_path_segments = from_path.split('.');
        const result = await Utils.traverse_recreate_and_execute(object, from_path_segments,
                func(need_to_retrieve, from_entity, entity_segments, flatten, search_value));
        return { denormalization: result };
    };
}

function flatten(from_entity: string, from_path: string,
                         entity_path: string, translatable: boolean, search_value: string = ''): Function {
    return async (object: Object, path: string, info: Object = {}) => {
        const func = (nr, from, eseg, svalue) => async (id) => {
            if (!id) {
                return null;
            }
            if (nr) {
                let source = null;

                if (svalue !== '') {
                    const sources = await EntitiesUtils.search_and_get_sources(from, {
                        where: { [svalue]: id },
                        size: 1,
                    });
                    if (sources.length > 0) {
                        source = sources[0];
                    }
                } else {
                    source = await EntitiesUtils.retrieve_and_get_source(from, id);
                }

                if (source == null) {
                    return null;
                }

                const eobj = Utils.find_object_with_path(source, eseg);
                if (eobj == null) {
                    return null;
                }
                const last = eseg[eseg.length - 1];
                const value = eobj[last];
                if (value && translatable) {
                    const value_translated = await LangUtils
                      .string_to_translation(value, 'EN', 0);
                    return value_translated;
                }
                return value;
            }
            return id;
        };

        const need_to_retrieve = from_entity != null && from_entity.trim() !== ''
          && entity_path != null && entity_path.trim() !== '';
        const entity_segments = entity_path.split('.');

        const from_path_segments = from_path.split('.');
        const final = {}
        const last = entity_segments[entity_segments.length - 1];
        const new_field = from_path_segments[0]+'_'+last+'_flatten';
        final[new_field] = [];
        const result = await Utils.traverse_recreate_and_execute(object, from_path_segments,
          func(need_to_retrieve, from_entity, entity_segments, search_value));
        const values = Utils.find_object_with_path(result, from_path_segments);
        if (values instanceof Array) {
            values.forEach(value => {
                final[new_field].push(value[from_path_segments[from_path_segments.length - 1]]);
            })
        } else {
            const value = Utils.find_object_with_path(result, from_path_segments)[0]
            final[new_field].push(value);
        }
        return { denormalization: final };
    };
}

module.exports = {
    generic_complete,
    key_complete,
    secret_complete,
    denormalization,
    initial,
    flatten,
    copy,
    concat
};
