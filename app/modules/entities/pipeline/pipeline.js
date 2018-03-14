// @flow
const ODM = require('../crud/odm');
const Joi = require('joi');
const Handlebars = require('../../utils/templating');
const Utils = require('../../utils/utils');
const FormatFunctions = require('../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../pipeline/completer/complfunctions');
const TransFunctions = require('../../pipeline/transformer/transfunctions');
const MMapping = require('../crud/mapping');

class Pipeline extends ODM {
    static _recover_value(value: string, type: string): ?number | ?boolean | ?string | ?Object {
        if (value === '__null') {
            return null;
        } else if (value === '__undefined') {
            return undefined;
        } else if (value === '{}') {
            return {};
        } else if (value === '__empty_string') {
            return '';
        }

        switch (type) {
        default:
        case 'string':
            return value;
        case 'boolean': {
            if (typeof value === 'boolean') {
                return value;
            }
            const v = value.toLowerCase();
            return (v === 'yes' || v === 'true');
        }
        case 'integer':
            return parseInt(value, 10);
        case 'hexadecimal':
            return parseInt(value, 16);
        case 'double':
            return parseFloat(value);
        }
    }

    async generate_defaults(): Promise<Object> {
        const info = this.source;
        if ('defaults' in info) {
            return info.defaults.reduce((obj, d) => {
                if (d.value != null && d.key != null) {
                    const t = Handlebars.compile(d.value)({});
                    const small = Utils.make_nested_object_from_path(d.key, t);
                    obj = Utils.merge_with_replacement(obj, small);
                }
                return obj;
            }, {});
        }
        return {};
    }

    async generate_formatters(): Promise<Array<any>> {
        const info = this.source;
        if ('formatters' in info && info.formatters.length > 0) {
            return info.formatters.map((f) => {
                if (f.function.arguments) {
                    f.function.arguments = f.function.arguments.map((arg) => {
                        arg.value = Pipeline._recover_value(arg.value, arg.type);
                        return arg;
                    });
                }

                const args = f.function.arguments;
                switch (f.function.name) {
                case 'oarray_to_array':
                    return { [f.field]: a => FormatFunctions.oarray_to_array(a) };
                case 'generic_formatter':
                    return { [f.field]: (a, o, k) => FormatFunctions.generic_formatter(args[0].value)(a, o, k) };
                default:
                    return null;
                }
            }).filter(f => f != null);
        }
        return [];
    }

    async generate_completers(): Promise<Array<any>> {
        const info = this.source;
        if ('completers' in info && info.completers.length > 0) {
            return info.completers.map((f) => {
                if (f.function.arguments) {
                    f.function.arguments = f.function.arguments.map((arg) => {
                        arg.value = Pipeline._recover_value(arg.value, arg.type);
                        return arg;
                    });
                }

                const args = f.function.arguments;
                switch (f.function.name) {
                case 'generic_complete':
                    return { [f.field]: (o, p, i) => ComplFunctions.generic_complete(args[0].value)(o, p, i) };
                case 'key_complete':
                    return { [f.field]: (o, p, i) => ComplFunctions.key_complete(o, p, i) };
                case 'secret_complete':
                    return { [f.field]: (o, p, i) => ComplFunctions.secret_complete(o, p, i) };
                case 'denormalization':
                    return { [f.field]: (o, p, i) =>
                        ComplFunctions.denormalization(args[0].value, args[1].value,
                            args[2].value, args[3].value, args[4].value)(o, p, i),
                    };
                default:
                    return null;
                }
            }).filter(f => f != null);
        }
        return [];
    }

    async generate_transformers(): Promise<Array<any>> {
        const info = this.source;
        if (!('transformers' in info)) {
            return [];
        }

        if (info.transformers.length === 0) {
            return [];
        }

        return info.transformers.map((f) => {
            switch (f.function.name) {
            default:
                return null;
            }
        }).filter(f => f != null);
    }

    async generate_validators(): Promise<Array<any>> {
        const info = this.source;
        const validators = [];
        if ('validators' in info && info.validators.length > 0) {
            const partitions = info.validators.reduce((obj, v) => {
                if (v.type === 'function') {
                    obj.functions.push(v);
                } else {
                    obj.joi.push(v);
                }
                return obj;
            }, { joi: [], functions: [] });

            validators.push(Joi.object(partitions.joi.reduce((obj, v) => {
                switch (v.type) {
                default:
                case 'string':
                    obj[v.field] = Joi.string();
                    break;
                }

                if (v.required) {
                    obj[v.field] = obj[v.field].required();
                } else {
                    obj[v.field] = obj[v.field].optional().empty('');
                }
                return obj;
            }, {})));
        }
        return validators;
    }

    async generate_model(index: string, type: string): Object {
        // console.log('gen model', index, type);
        const mapping = await this.constructor.fetch_mapping(index, type,
                this._client);
        const defaults = await this.generate_defaults();
        const formatters = await this.generate_formatters();
        const completers = await this.generate_completers();
        const validators = await this.generate_validators();
        const transformers = await this.generate_transformers();

        const pipe = {
            Defaults: defaults,
            RawMapping: mapping,
            Mapping: new MMapping(mapping),
            Messages: {
                set: `l_message_set_entity_${type}`,
                remove: `l_message_remove_entity_${type}`,
                modify: `l_message_modify_entity_${type}`,
            },
            Pipelines: [{
                Validation: validators,
                Formatting: formatters,
                Completion: completers,
                Transforming: transformers,
                Filtering: [],
            }],
            Name: type,
        };
        // console.log(defaults);
        return pipe;
    }
}

module.exports = Pipeline;
