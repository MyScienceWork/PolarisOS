// @flow
const _ = require('lodash');
const Errors = require('../exceptions/errors');
const Validator = require('./validator/validator');
const Completer = require('./completer/completer');
const Transformer = require('./transformer/transformer');
const Formatter = require('./formatter/formatter');
const EntitiesUtils = require('../utils/entities');
const Utils = require('../utils/utils');

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

    static async _evaluate_pipeline(ctx: Object, pipeline: Object,
        type: string, action: string, method: string) {
        switch (action) {
        case 'transform': {
            ctx.request.body = await Transformer(ctx.request.body, pipeline.Transforming || []);
            break;
        }
        case 'filter': {
            ctx.request.body = Pipeline._filter(ctx.request.body, pipeline.Filtering || []);
            break;
        }
        case 'reset': {
            ctx.request.body = await Pipeline._reset(ctx.request.body, pipeline.Resetting || {});
            break;
        }
        case 'defaults': {
            ctx.request.body = Pipeline._merge_defaults(ctx.request.body, pipeline.Defaults);
            break;
        }
        case 'format': {
            ctx.request.body = await Formatter(ctx.request.body, pipeline.Formatting, ctx.__md || {});
            break;
        }
        case 'complete': {
            ctx.request.body = await Completer(ctx.request.body, pipeline.Completion, ctx.__md || {});
            break;
        }
        default:
        case 'validate': {
            const validator = new Validator();
            const errors = await validator
                    .validate(ctx.request.body, pipeline.Validation, method);
            return errors;
        }
        }
    }

    /**
     * Dispatcher to apply each part of the pipeline
     *
     * @param type - Entity type
     * @param m - Part of the pipeline to apply
     * @returns Koa middleware
     */
    static _action(type: string, m: string): Function {
        return async function afunc(ctx: Object, next: Function): Promise<*> {
            const body = ctx.request.body;
            const method = ctx.request.method.toLowerCase();
            const model = ctx.__md.model;
            const pipelines = model.Pipelines || [];

            const range = Pipeline._format_range(ctx.params.range, pipelines.length);

            if (m === 'check') {
                if (method === 'put') {
                    const exists = await Pipeline._check_if_entity_exists(body, type);
                    if (exists) {
                        await next();
                    } else {
                        throw Errors.InvalidEntity;
                    }
                } else {
                    await next();
                }
            } else if (m === 'merge') {
                if (method === 'put') {
                    const entity = await EntitiesUtils.retrieve(ctx.request.body._id, type);
                    ctx.request.body = Pipeline._merge_put(ctx.request.body, entity.db.source);
                }
                await next();
            } else {
                let errors = {};
                const prange = range.length === 0 ? _.range(0, pipelines.length) : range;
                for (const i of prange) {
                    const pipeline = pipelines[i];
                    const ret = await Pipeline._evaluate_pipeline(ctx, pipeline,
                        type, m, method);
                    if (m === 'validate') {
                        errors = Utils.merge_with_concat({}, errors, ret);
                    }
                }

                if (Object.keys(errors).length > 0) {
                    ctx.body = { change: 'Validation', errors };
                } else {
                    await next();
                }
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
    static format(type: string): Function {
        return Pipeline._action(type, 'format');
    }

    /**
     * Invoke the dispatcher to validate the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static validate(type: string): Function {
        return Pipeline._action(type, 'validate');
    }

    /**
     * Invoke the dispatcher to complete the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static complete(type: string): Function {
        return Pipeline._action(type, 'complete');
    }

    /**
     * Invoke the dispatcher to transform the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static transform(type: string): Function {
        return Pipeline._action(type, 'transform');
    }

    /**
     * Invoke the dispatcher to filter the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static filter(type: string): Function {
        return Pipeline._action(type, 'filter');
    }

    /**
     * Invoke the dispatcher to reset the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static reset(type: string): Function {
        return Pipeline._action(type, 'reset');
    }

    /**
     * Invoke the dispatcher to merge previous entity with new input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static merge(type: string): Function {
        return Pipeline._action(type, 'merge');
    }

    /**
     * Invoke the dispatcher to include default values in the input
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static defaults(type: string): Function {
        return Pipeline._action(type, 'defaults');
    }

    /**
     * Invoke the dispatcher to check if the entity exists
     *
     * @param type - Entity type;
     * @returns Koa middleware
     */
    static check(type: string): Function {
        return Pipeline._action(type, 'check');
    }
}

module.exports = Pipeline;
