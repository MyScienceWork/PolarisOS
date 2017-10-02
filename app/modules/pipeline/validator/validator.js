// @flow
const Joi = require('joi');
const _ = require('lodash');
const utils = require('../../utils/utils');
const GCExp = require('../../exceptions/generic');
const Errors = require('../../exceptions/errors');

const no_subobject = path => async () => {
    const e = Errors.InvalidSubobject;
    e.path = path;
    throw e;
};

/**
 * Validator class
 */
class Validator {
    _options: Object;

    constructor() {
        this._options = {
            joi: {
                allowUnknown: true,
                abortEarly: false,
                language: {
                    key: '{{!key}} ',
                },
            },
            custom: {},
        };
    }

    static _isJoi(validator: Joi | Object | Function): boolean {
        return utils.hasProperty(validator, 'isJoi') && validator.isJoi;
    }

    static _compose_joi_errors(errors: Object,
        joi_errors: Object, parent_key: ?string) {
        if ('details' in joi_errors) {
            if (errors === null) errors = {};
            joi_errors.details.forEach((obj) => {
                const path = parent_key ? `${parent_key}.${obj.path}` : obj.path;
                obj.path = path;
                if (path in errors) {
                    errors[path].push(obj);
                } else {
                    errors[path] = [obj];
                }
            });
        }
    }

    static _compose_custom_errors(errors: Object,
            custom_errors: Array<GCExp>, parent_key: ?string) {
        custom_errors.forEach((error) => {
            const path = parent_key ? `${parent_key}.${error.path}` : error.path;
            const e = {
                message: error.message,
                path,
            };
            if (path in errors) {
                errors[path].push(e);
            } else {
                errors[path] = [e];
            }
        });
    }

    async _validate_with_validator(object: Object, errors: Object,
        validator: Function, key: ?string): Object {
        if (Validator._isJoi(validator)) {
            const val = Joi.validate(object, validator, this._options.joi);
            if (val.error) {
                Validator._compose_joi_errors(errors, val.error, key);
            }
        } else {
            try {
                await validator(object);
            } catch (err) {
                Validator._compose_custom_errors(errors, [err], key);
            }
        }
        return errors;
    }

    async validate(object: Object,
            validators: Array<Object | Function>): Promise<*> {
        let errors = {};
        for (const validator of validators) {
            if (_.isPlainObject(validator)) {
                for (const key in validator) {
                    const subvalidator = validator[key];
                    if (key in object) {
                        errors = await this._validate_with_validator(object[key], errors, subvalidator, key);
                    } else {
                        errors = await this._validate_with_validator(object[key], errors, no_subobject(key));
                    }
                }
            } else {
                errors = await this._validate_with_validator(object,
                            errors, validator);
            }
        }
        return errors;
    }


}

module.exports = Validator;
