// @flow
const _ = require('lodash');
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
            if (value) {
                const v = value.toLowerCase();
                return (v === 'yes' || v === 'true');
            } else {
                return false;
            }
        }
        case 'integer':
            return parseInt(value, 10);
        case 'hexadecimal':
            return parseInt(value, 16);
        case 'double':
            return parseFloat(value);
        }
    }

    static async generate_resetters(source: Object): Promise<Object> {
        if ('resetters' in source) {
            return source.resetters.reduce((obj, d) => {
                if (d.value != null && d.key != null) {
                    const t = Handlebars.compile(d.value)({});
                    let myobj = t;
                    try { myobj = JSON.parse(t); } catch (err) {}

                    const small = Utils.make_nested_object_from_path(d.key.split('.'), myobj);
                    obj = Utils.merge_with_replacement(obj, small);
                }
                return obj;
            }, {});
        }
        return {};
    }

    static async generate_filters(source: Object): Promise<Array<string>> {
        if ('filters' in source) {
            return source.filters
                .filter(f => (f != null && f.value && f.value != null))
                .map(f => f.value);
        }
        return [];
    }

    static async generate_defaults(source: Object): Promise<Object> {
        const info = source;
        if ('defaults' in info) {
            return info.defaults.reduce((obj, d) => {
                if (d.value != null && d.key != null) {
                    const t = Handlebars.compile(d.value)({});
                    const small = Utils.make_nested_object_from_path(d.key.split('.'), t);
                    obj = Utils.merge_with_replacement(obj, small);
                }
                return obj;
            }, {});
        }
        return {};
    }

    static async generate_formatters(source: Object): Promise<Array<any>> {
        const info = source;
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
                case 'filter_empty_or_null_objects':
                    return { [f.field]: FormatFunctions.filter_empty_or_null_objects };
                case 'format_string':
                    return { [f.field]: a => FormatFunctions.format_string(args[0].value)(a) };
                case 'generic_formatter':
                    return { [f.field]: (a, o, k) => FormatFunctions.generic_formatter(args[0].value)(a, o, k) };
                default:
                    return null;
                }
            }).filter(f => f != null);
        }
        return [];
    }

    static async generate_completers(source: Object): Promise<Array<any>> {
        const info = source;
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
                case 'concat':
                    return { [f.field]: (o, p, i) => ComplFunctions.concat(args[0].value)(o, p, i) };
                case 'copy':
                    return { [f.field]: (o, p, i) => ComplFunctions.copy(args[0].value)(o, p, i) };
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
                case 'flatten':
                    return { [f.field]: (o, p, i) =>
                          ComplFunctions.flatten(args[0].value, args[1].value,
                            args[2].value, args[3].value)(o, p, i),
                    };
                case 'initial':
                    return { [f.field]: (o, p, i) =>
                        ComplFunctions.initial(args[0].value, args[1].value)(o, p, i),
                    };
                default:
                    return null;
                }
            }).filter(f => f != null);
        }
        return [];
    }

    static async generate_transformers(source: Object): Promise<Array<any>> {
        const info = source;
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

    static build_joi_part(cond, keys) {
        if (keys.length === 1) {
            return Joi.object({
                [keys[0]]: cond
            })
        }

        const keys_cpy = keys.slice();
        keys_cpy.shift()

        return Joi.object({
            [keys[0]]: Pipeline.build_joi_part(cond, keys_cpy)
        });
    }

    static compute_conditions_part(v) {
        const splitted_field = v.trim().split(' ');

        const left_sign = splitted_field[0];
        const condition = splitted_field[1];
        let right_sign = splitted_field[2];
        let has_boolean = false;
        if (right_sign === 'true') {
            has_boolean = true;
            right_sign = true;
        } else if (right_sign === 'false') {
            has_boolean = true;
            right_sign = false;
        }
        let result = [];

        const left_sign_splitted = left_sign.split(".");
        const right_sign_splitted = left_sign.split(".");


        switch (condition) {
            case '=':
                if (has_boolean) {
                    const cond = Joi.boolean().valid(right_sign).required();
                    result = Pipeline.build_joi_part(cond, left_sign_splitted);

                } else {
                    const cond = Joi.valid(right_sign);
                    result = Pipeline.build_joi_part(cond, left_sign_splitted);
                }

                break;
            case '<':
                result = Joi.object({
                    [left_sign]: Joi.number().max(Joi.ref(right_sign)).invalid(Joi.ref(right_sign)),
                    [right_sign]: Joi.number(),
                });
                break;
            case '>':
                result = Joi.object({
                    [left_sign]: Joi.number().min(Joi.ref(right_sign)).invalid(Joi.ref(right_sign)),
                    [right_sign]: Joi.number(),
                });
                break;
            case '<=':
                result = Joi.object({
                    [left_sign]: Joi.number().max(Joi.ref(right_sign)),
                    [right_sign]: Joi.number(),
                });
                break;
            case '>=':
                result = Joi.object({
                    [left_sign]: Joi.number().min(Joi.ref(right_sign)),
                    [right_sign]: Joi.number(),
                });
                break;
            default:
                break;
        }
        logger.info("compute_condition : ", JSON.stringify(result.describe(), null, 2));
        return result;
    }

    static compute_conditions(v) {
        const splitted_field = v.trim().split(' ');
        console.log("condition : ", v);

        if (splitted_field.length !== 3 && splitted_field.includes("&&")) {
            const splitted_els = v.split('&&');
            const c_splitted_els = splitted_els.slice();
            c_splitted_els.shift();
            const end_elements = c_splitted_els.join(" ");
            return Pipeline.compute_conditions(end_elements).concat(Pipeline.compute_conditions_part(splitted_els[0]));

        } else if (splitted_field.length !== 3 && splitted_field.includes("||")) {
            const splitted_els = v.split('||');
            const c_splitted_els = splitted_els.slice();
            c_splitted_els.shift();
            const end_elements = c_splitted_els.join(" ");
            return Joi.alternatives().try(Pipeline.compute_conditions_part(splitted_els[0]), Pipeline.compute_conditions(end_elements));
        }

        return Pipeline.compute_conditions_part(v);
    }

    static async generate_validators(source: Object): Promise<Array<any>> {
        const info = source;
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
                let myinfo = null;
                switch (v.type) {
                case 'string':
                    myinfo = Joi.string();
                    break;
                case 'number':
                    myinfo = Joi.number();
                    break;
                case 'url':
                    myinfo = Joi.string().uri();
                    break;
                case 'condition':
                    myinfo = Pipeline.compute_conditions(v.field);
                    break;
                default:
                    myinfo = Joi.any();
                }

                if (v.required && v.type !== 'condition') {
                    myinfo = myinfo.required();
                } else if (v.type !== 'condition') {
                    myinfo = myinfo.optional().empty('');
                }
                //TODO: add required for condition when checked v.required

                if (v.type === 'condition') {
                    myinfo._inner.children.forEach((child) => {
                        const nested = Utils.make_nested_object_from_path(child.key.split('.'), child.schema);
                        obj = _.merge(obj, nested);
                    })
                } else {
                    const nested = Utils.make_nested_object_from_path(v.field.split('.'), myinfo);
                    obj = _.merge(obj, nested);
                }
                return obj;
            }, {})));
        }
        return validators;
    }

    static async generate_pipeline_elements(pipeline: Object,
                                            all_pipelines: Array<Object>,
                                            conditional_pipelines_data: Object = {}) {
        const defaults = await Pipeline.generate_defaults(pipeline.source);
        const filters = await Pipeline.generate_filters(pipeline.source);
        const resetters = await Pipeline.generate_resetters(pipeline.source);
        const formatters = await Pipeline.generate_formatters(pipeline.source);
        const completers = await Pipeline.generate_completers(pipeline.source);
        const validators = await Pipeline.generate_validators(pipeline.source);
        const transformers = await Pipeline.generate_transformers(pipeline.source);

        let conditions = [];
        Object.keys(conditional_pipelines_data).map((key) => {
            const ids = conditional_pipelines_data[key].pipeline.map((pipeline => pipeline._id));
            ids.map((id_pipeline) => id_pipeline === pipeline._id ? conditions.push(conditional_pipelines_data[key].condition) : null);
        });

        all_pipelines.push({
            Validation: validators,
            Formatting: formatters,
            Completion: completers,
            Transforming: transformers,
            Filtering: filters,
            Resetting: resetters,
            Defaults: defaults,
            Conditions: conditions,
        });
        return all_pipelines;
    }

    static async generate_model(index: string, type: string,
        client: Object, pipelines: Array<Object>,
        conditional_pipelines_data: Object): Object {

        const mapping = await Pipeline.fetch_mapping(index, type, client);

        let all_pipelines = [];
        for (const pipeline of pipelines) {
            all_pipelines = await this.generate_pipeline_elements(pipeline, all_pipelines, conditional_pipelines_data);
        }

        const pipe = {
            RawMapping: mapping,
            Mapping: new MMapping(mapping),
            Messages: {
                set: `l_message_set_entity_${type}`,
                remove: `l_message_remove_entity_${type}`,
                modify: `l_message_modify_entity_${type}`,
            },
            Pipelines: all_pipelines,
            Name: type,
        };
        return pipe;
    }
}

module.exports = Pipeline;
