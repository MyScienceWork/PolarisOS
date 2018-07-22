// @flow
const _ = require('lodash');
const Errors = require('../exceptions/errors');
const Validator = require('./validator/validator');
const Completer = require('./completer/completer');
const Transformer = require('./transformer/transformer');
const Formatter = require('./formatter/formatter');
const EntitiesUtils = require('../utils/entities');
const Utils = require('../utils/utils');
const Logger = require('../../logger');

/**
 * Completion and validation pipeline
 *
 * The pipeline works by applying a sequence of actions (represented as Koa's middlewares).
 * When an action fails, the middleware returns an error that needs to be handled by the client
 * who emitted that request.
 *
 * The pipeline works the following way:
 *
 * - For PUT requests (UPDATE):
 *  1. Check if entity exists, if not, fails
 *  2. Merge JSON body with existing entity
 *  3. Apply default fields
 *  4. Complete fields
 *  5. Format fieds
 *  6. Validate fields
 *  7. UPDATE or FAIL
 *
 * - For POST requests (CREATE):
 *  1. Start at 2. from the above list
 *  7. CREATE or FAIL.
 */
class Pipeline {
    /**
     * Check if an entity exists in the DB by using its type (publication, user, journal, ...).
     *
     * @param body - JSON body
     * @param type - entity type
     * @returns a promise containing a boolean
     */
    static async _check_if_entity_exists(body: Object, type: string): Promise<boolean> {
        if (body == null) {
            return false;
        }

        const id = body._id;
        if (id == null) {
            return false;
        }
        const entity = await EntitiesUtils.retrieve(id, type);
        if (entity == null) {
            return false;
        }
        return entity.db.found;
    }

    /**
     * Merge two objects, considering the second one as default values (if key exists
     * in the first object, the first object keeps its own values).
     *
     * @param input - input object
     * @param defaults - default object
     * @return merged object
     */
    static _merge_defaults(input: Object, defaults: Object): Object {
        return Utils.merge_with_replacement({}, defaults, input);
    }

    static _merge_put(input: Object, defaults: Object): Object {
        return Utils.merge_with_replacement({}, defaults, input);
    }

    static async _reset(input: Object, resetters: Object): Object {
        for (const path in resetters) {
            const segs = path.split('.');
            input = await Utils.traverse_and_execute(input, segs, async () => resetters[path]);
        }
        return input;
    }

    static _filter(input: Object, filters: Array<String>): Object {
        filters.forEach((f) => {
            if (f in input) {
                delete input[f];
            }
        });
        return input;
    }

    static _format_range(potential_range, total) {
        if (potential_range == null) {
            return [];
        }
        if (potential_range.match(/[0-9]+-[0-9]+/)) {
            const range = potential_range.split('-').map(r => parseInt(r, 10));
            return _.range(range[0], range[1]).filter(r => (r >= 0 && r < total));
        }


        const pnum = parseInt(potential_range, 10);
        if (isNaN(pnum)) {
            return [];
        }

        return [pnum];
    }

    static async _evaluate_pipeline(item: Object, extra_info: Object, pipeline: Object,
        type: string, action: string, method: string) {
        switch (action) {
        case 'transform': {
            item = await Transformer(item, pipeline.Transforming || []);
            return { item, errors: null };
        }
        case 'filter': {
            item = Pipeline._filter(item, pipeline.Filtering || []);
            return { item, errors: null };
        }
        case 'reset': {
            item = await Pipeline._reset(item, pipeline.Resetting || {});
            return { item, errors: null };
        }
        case 'defaults': {
            item = Pipeline._merge_defaults(item, pipeline.Defaults || {});
            return { item, errors: null };
        }
        case 'format': {
            item = await Formatter(item, pipeline.Formatting, extra_info);
            return { item, errors: null };
        }
        case 'complete': {
            item = await Completer(item, pipeline.Completion, extra_info);
            return { item, errors: null };
        }
        default:
        case 'validate': {
            const validator = new Validator();
            const errors = await validator
                .validate(item, pipeline.Validation, method);
            return { item, errors };
        }
        }
    }

    static async _run_part_of_pipeline(item: Object, type: string,
            pipelines: Array<Object>, action: string, method: string,
            range: Array<any>, extra_info: Object): Promise<Object> {
        if (action === 'check') {
            if (method === 'put') {
                const exists = await Pipeline._check_if_entity_exists(item, type);
                if (!exists) {
                    throw Errors.InvalidEntity;
                }
            }
            return item;
        } else if (action === 'merge') {
            if (method === 'put') {
                const entity = await EntitiesUtils.retrieve(item._id, type);
                if (!entity) {
                    throw Errors.InvalidEntity;
                }
                item = Pipeline._merge_put(item, entity.source);
            }
            return item;
        }

        let errors = {};
        let info = { errors: null, item };

        const prange = range.length === 0 ? _.range(0, pipelines.length) : range;
        for (const i of prange) {
            const pipeline = pipelines[i];
            info = await Pipeline._evaluate_pipeline(info.item, extra_info, pipeline,
                    type, action, method);
            if (action === 'validate') {
                errors = Utils.merge_with_concat({}, errors, info.errors);
            }
        }

        if (Object.keys(errors).length > 0) {
            return { change: 'Validation', errors };
        }
        return info.item;
    }

    static async run(item: Object, type: string, pipelines: Array<any>,
            method: string, range: Array<any>, extra: Object) {
        item = await Pipeline._run_part_of_pipeline(item, type, pipelines,
                'check', method, range, extra);
        item = await Pipeline._run_part_of_pipeline(item, type, pipelines,
                'transform', method, range, extra);
        item = await Pipeline._run_part_of_pipeline(item, type, pipelines,
                'merge', method, range, extra);
        item = await Pipeline._run_part_of_pipeline(item, type, pipelines,
                'reset', method, range, extra);
        item = await Pipeline._run_part_of_pipeline(item, type, pipelines,
                'defaults', method, range, extra);
        item = await Pipeline._run_part_of_pipeline(item, type, pipelines,
                'format', method, range, extra);
        item = await Pipeline._run_part_of_pipeline(item, type, pipelines,
                'complete', method, range, extra);
        item = await Pipeline._run_part_of_pipeline(item, type, pipelines,
                'filter', method, range, extra);
        item = await Pipeline._run_part_of_pipeline(item, type, pipelines,
                'validate', method, range, extra);
        return item;
    }

    static run_as_middleware(type: string): Function {
        return async function f(ctx: Object, next: Function): Promise<any> {
            const item = ctx.request.body;
            const method = ctx.request.method.toLowerCase();
            const model = await EntitiesUtils.get_model_from_type(type);
            const pipelines = model.Pipelines || [];
            const extra = ctx.__md || {};

            const range = Pipeline._format_range(ctx.params.range, pipelines.length);
            const result = await Pipeline.run(item, type, pipelines, method, range, extra);

            if ('change' in result) {
                ctx.body = result;
            } else {
                ctx.request.body = result;
                await next();
            }
        };
    }

    static bulk_run_as_middleware(type: string): Function {
        return async function f(ctx: Object, next: Function): Promise<any> {
            const items = ctx.request.body;
            const method = ctx.request.method.toLowerCase();
            const model = await EntitiesUtils.get_model_from_type(type);
            const pipelines = model.Pipelines || [];
            const extra = ctx.__md || {};
            const range = Pipeline._format_range(ctx.params.range, pipelines.length);

            let errors = 0;
            const results = [];

            let last_item_was_an_error = false;
            for (const i in items) {
                const item = items[i];
                try {
                    const result = await Pipeline.run(item, type, pipelines, method, range, extra);
                    if ('change' in result) {
                        errors += 1;
                    }
                    if (i == 0) {
                        results.push([result]);
                        if ('change' in result) {
                            last_item_was_an_error = true;
                        }
                    } else if ('change' in result) {
                        if (last_item_was_an_error) {
                            results[results.length - 1].push(result);
                        } else {
                            results.push([result]);
                        }
                        last_item_was_an_error = true;
                    } else {
                        if (!last_item_was_an_error) {
                            results[results.length - 1].push(result);
                        } else {
                            results.push([result]);
                        }
                        last_item_was_an_error = false;
                    }
                } catch (err) {
                    errors += 1;
                    if (i === 0) {
                        results.push([err]);
                        last_item_was_an_error = true;
                    } else {
                        if (last_item_was_an_error) {
                            results[results.length - 1].push(err);
                        } else {
                            results.push([err]);
                        }
                        last_item_was_an_error = true;
                    }
                }
            }

            if (errors === items.length) {
                ctx.body = { total: errors, success: 0, errors_count: errors, results };
            } else {
                ctx.request.body = results;
                await next();
            }
        };
    }
}

module.exports = Pipeline;
