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

    static async _papply(item: Object, extra_info: Object, type: string,
            pipelines: Array<Object>, action: string, method: string,
            range: Array<any>, bulk_mode: boolean): Promise<Object> {
        if (action === 'check' && !bulk_mode) {
            if (method === 'put') {
                const exists = await Pipeline._check_if_entity_exists(item, type);
                if (!exists) {
                    return Errors.InvalidEntity;
                }
            }
            return item;
        } else if (action === 'merge' && !bulk_mode) {
            if (method === 'put') {
                const entity = await EntitiesUtils.retrieve(item._id, type);
                if (!entity) {
                    return Errors.InvalidEntity;
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

    /**
     * Dispatcher to apply each part of the pipeline
     *
     * @param type - Entity type
     * @param m - Part of the pipeline to apply
     * @returns Koa middleware
     */
    static _action(type: string, m: string, bulk_mode: boolean): Function {
        return async function afunc(ctx: Object, next: Function): Promise<*> {
            let items = ctx.request.body;
            const method = ctx.request.method.toLowerCase();
            const model = ctx.__md.model;
            const pipelines = model.Pipelines || [];

            const range = Pipeline._format_range(ctx.params.range, pipelines.length);

            if (!(items instanceof Array)) {
                items = [items];
            }

            const promises = items.map(item => Pipeline._papply(item, ctx.__md || {},
                type, pipelines, m, method, range, bulk_mode));
            try {
                if (!bulk_mode) {
                    const ret = await promises[0];
                    if ('change' in ret) {
                        ctx.body = ret;
                    } else {
                        ctx.request.body = ret;
                        await next();
                    }
                    return;
                }
                ctx.body = await promises;
            } catch (err) {
                Logger.error('Error when processing pipelines');
                Logger.error(err);
                throw Errors.UnableToProcessPipelines;
            }
        };
    }

    static memoize_model(type: string): Function {
        return async function afunc(ctx: Object, next: Function): Promise<*> {
            const model = await EntitiesUtils.get_model_from_type(type);
            if ('__md' in ctx) {
                ctx.__md.model = model;
            } else {
                ctx.__md = { model };
            }
            await next();
        };
    }

    /**
     * Invoke the dispatcher to format the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static format(type: string, bulk_mode: boolean = false): Function {
        return Pipeline._action(type, 'format', bulk_mode);
    }

    /**
     * Invoke the dispatcher to validate the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static validate(type: string, bulk_mode: boolean = false): Function {
        return Pipeline._action(type, 'validate', bulk_mode);
    }

    /**
     * Invoke the dispatcher to complete the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static complete(type: string, bulk_mode: boolean = false): Function {
        return Pipeline._action(type, 'complete', bulk_mode);
    }

    /**
     * Invoke the dispatcher to transform the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static transform(type: string, bulk_mode: boolean = false): Function {
        return Pipeline._action(type, 'transform', bulk_mode);
    }

    /**
     * Invoke the dispatcher to filter the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static filter(type: string, bulk_mode: boolean = false): Function {
        return Pipeline._action(type, 'filter', bulk_mode);
    }

    /**
     * Invoke the dispatcher to reset the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static reset(type: string, bulk_mode: boolean = false): Function {
        return Pipeline._action(type, 'reset', bulk_mode);
    }

    /**
     * Invoke the dispatcher to merge previous entity with new input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static merge(type: string, bulk_mode: boolean = false): Function {
        return Pipeline._action(type, 'merge', bulk_mode);
    }

    /**
     * Invoke the dispatcher to include default values in the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static defaults(type: string, bulk_mode: boolean = false): Function {
        return Pipeline._action(type, 'defaults', bulk_mode);
    }

    /**
     * Invoke the dispatcher to check if the entity exists
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static check(type: string, bulk_mode: boolean = false): Function {
        return Pipeline._action(type, 'check', bulk_mode);
    }
}

module.exports = Pipeline;
