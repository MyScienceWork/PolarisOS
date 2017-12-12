// @flow
const ODM = require('../crud/odm');
const Joi = require('joi');
const Handlebars = require('../../utils/templating');
const Utils = require('../../utils/utils');
const FormatFunctions = require('../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../pipeline/completer/complfunctions');

class Pipeline extends ODM {
    async generate_defaults(): Promise<Object> {
        const info = this.source;
        if ('defaults' in info) {
            return info.defaults.reduce((obj, d) => {
                const t = Handlebars.compile(d.value)({});
                const small = Utils.make_nested_object_from_path(d.key, t);
                obj = Utils.merge_with_replacement(obj, small);
                return obj;
            }, {});
        }
        return {};
    }

    async generate_formatters(): Promise<Array<any>> {
        const info = this.source;
        if ('formatters' in info && info.formatters.length > 0) {
            return info.formatters.map((f) => {
                switch (f.function.name) {
                case 'oarray_to_array':
                    return { [f.field]: a => FormatFunctions.oarray_to_array(a) };
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
                switch (f.function.name) {
                case 'generic_complete':
                    return { [f.field]: (o, p, i) => ComplFunctions.generic_complete(f.function.arguments[0].value)(o, p, i) };
                default:
                    return null;
                }
            }).filter(f => f != null);
        }
        return [];
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
        console.log('gen model', index, type);
        const mapping = await this.constructor.fetch_mapping(index, type,
                this._client);
        const defaults = await this.generate_defaults();
        const formatters = await this.generate_formatters();
        const completers = await this.generate_completers();
        const validators = await this.generate_validators();

        const pipe = {
            Defaults: defaults,
            Mapping: mapping,
            Messages: {
                set: 'Set',
                remove: 'Remove',
                modify: 'Modify',
            },
            Validation: validators,
            Formatting: formatters,
            Completion: completers,
            Name: type,
        };
        console.log(defaults);
        return pipe;
    }
}

module.exports = Pipeline;
