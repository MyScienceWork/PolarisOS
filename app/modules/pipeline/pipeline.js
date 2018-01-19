// @flow
const _ = require('lodash');
const Errors = require('../exceptions/errors');
const Validator = require('./validator/validator');
const Completer = require('./completer/completer');
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
        return Utils.merge_with_replacement(defaults, input);
    }

    static _merge_put(input: Object, defaults: Object): Object {
        return Utils.merge_with_replacement(defaults, input);
    }

    /**
     * Dispatcher to apply each part of the pipeline
     *
     * @param type - Entity type
     * @param m - Part of the pipeline to apply
     * @returns Koa middleware
     */
    static _action(type: string, m: string): Function {
        const validator = new Validator();
        return async function afunc(ctx: Object, next: Function): Promise<*> {
            const body = ctx.request.body;
            const method = ctx.request.method.toLowerCase();
            const model = await EntitiesUtils.get_model_from_type(type);
            console.log('validation: ', type, ' action:', m, ' method:', method);

            switch (m) {
            case 'check': {
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
                break;
            }
            case 'defaults': {
                ctx.request.body = Pipeline._merge_defaults(body, model.Defaults);
                await next();
                break;
            }
            case 'merge': {
                if (method === 'put') {
                    const entity = await EntitiesUtils.retrieve(body._id, type);
                    ctx.request.body = Pipeline._merge_put(body, entity.db.source);
                }
                await next();
                break;
            }
            case 'format': {
                ctx.request.body = await Formatter(body, model.Formatting);
                await next();
                break;
            }
            case 'complete': {
                ctx.request.body = await Completer(body, model.Completion);
                await next();
                break;
            }
            default:
            case 'validate': {
                const errors = await validator
                    .validate(body, model.Validation, method);
                if (Object.keys(errors).length === 0) {
                    await next();
                } else {
                    ctx.body = { change: 'Validation', errors };
                }
                break;
            }
            }
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
