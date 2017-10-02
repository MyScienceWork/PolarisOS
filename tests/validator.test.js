const chai = require('chai');
const Joi = require('joi');
const GExcp = require('../build/modules/exceptions/generic');
const Validator = require('../build/modules/validator/validator');
const utils = require('../build/modules/utils/utils');

const should = chai.should();

const joi_validator = Joi.object().keys({
    name: Joi.string().required().label('Name'),
});

async function generic_validator(obj) {
    if (!utils.hasProperty(obj, 'name') || !obj.name) {
        const error = new GExcp('NameException', new Error('This is the message'), 422);
        error.path = 'name';
        throw error;
    } else {
        return true;
    }
}

const formats = [
    { name: async n => n.toLowerCase() },
    { address: async n => n.toUpperCase() },
    { display: async (n, obj) => `${obj.title} ${obj.name}` },
];

const completes = [
    {
        async name(obj, key) {
            return { [key]: 'New name' };
        },
        async api_key(obj, key, extra_info) {
            if (extra_info != null) {
                return { [key]: extra_info.key };
            }
            return {};
        },
    },
    {
        async title_name(obj, key) {
            return { [key]: `Ms ${obj.name}` };
        },
    },
];

const complex_validations = [
    Joi.object({
        name: Joi.string().required().label('Device name'),
        type: Joi.any().valid(['screen', 'machine', 'desk']).label('Device type'),
    }),
    {
        auth: Joi.object({
            type: Joi.any().valid(['token', 'fingerprint', 'no']).label('Authentication type'),
        }),
    },
];

describe('Validator#validate', () => {
    it('should handle both Joi validators and Generic validators', async () => {
        const obj = {
            name: null,
            orientation: 'Ok',
        };

        const validator = new Validator();
        const errors = await validator.validate(obj, [joi_validator, generic_validator]);

        errors.should.not.be.empty;
        errors.should.have.property('name');
        errors.name.should.have.lengthOf(2);

        errors.name[0].should.have.property('message');
        errors.name[0].should.have.property('path');
        errors.name[0].should.have.property('context');

        errors.name[1].should.have.property('message');
        errors.name[1].should.have.property('path');
        errors.name[1].should.not.have.property('context'); // Indicate it's not a Joi validator
    });

    it('should return the correct error messages', async () => {
        const obj = {
            name: null,
            orientation: 'Ok',
        };

        const validator = new Validator();
        const errors = await validator.validate(obj, [joi_validator, generic_validator]);

        errors.should.not.be.empty;
        errors.should.have.property('name');
        errors.name.should.have.lengthOf(2);

        errors.name[0].should.have.property('message', 'Name must be a string');
        errors.name[1].should.have.property('message', 'This is the message');
    });

    it('should return the correct error paths', async () => {
        const obj = {
            name: null,
            orientation: 'Ok',
        };

        const validator = new Validator();
        const errors = await validator.validate(obj, [joi_validator, generic_validator]);

        errors.should.not.be.empty;
        errors.should.have.property('name');
        errors.name.should.have.lengthOf(2);

        errors.name[0].should.have.property('path', 'name');
        errors.name[1].should.have.property('path', 'name');
    });

    it('should return {} when validation is OK', async () => {
        const obj = {
            name: 'Ok',
            orientation: 'Ok',
        };

        const validator = new Validator();
        const errors = await validator.validate(obj, [joi_validator, generic_validator]);
        (Object.keys(errors).length === 0).should.equal(true);
    });

    it('should return the correct path when multiple Joi validations are called', async () => {
        const obj = {
            name: 'test',
            type: 'test',
            auth: {
                type: 'test',
            },
        };

        const validator = new Validator();
        const errors = await validator.validate(obj, complex_validations);

        errors.should.not.be.empty;
        errors.should.have.property('type');
        errors.should.have.property('auth.type');
        errors.type.should.have.lengthOf(1);
        errors['auth.type'].should.have.lengthOf(1);
    });

    it('should return InvalidSuboject error when subpath is not found', async () => {
        const obj = {
            name: 'test',
            type: 'machine',
        };

        const validator = new Validator();
        const errors = await validator.validate(obj, complex_validations);

        errors.should.not.be.empty;
        errors.should.have.property('auth');
        errors.auth.should.have.lengthOf(1);
        errors.auth[0].should.have.property('message',
                'The object does not exist. You should include it.');
    });
});

describe('Validator#format', () => {
    it('should transform the object following formatters', async () => {
        let obj = {
            name: 'TEST',
            address: 'test',
        };

        const validator = new Validator();
        obj = await validator.format(obj, formats);

        obj.should.have.property('name', 'test');
        obj.should.have.property('address', 'TEST');
    });

    it('should relie on other properties in the object to format the content', async () => {
        let obj = {
            name: 'TEST',
            title: 'M.',
            display: '',
        };

        const validator = new Validator();
        obj = await validator.format(obj, formats);

        obj.should.have.property('name', 'test');
        obj.should.have.property('display', 'M. TEST');
    });
});

describe('Validator#complete', () => {
    it('should complete the object following completers only when key does not exist', async () => {
        let obj = {
            name: 'TEST',
        };

        const validator = new Validator();
        obj = await validator.complete(obj, completes);

        obj.should.have.property('name', 'TEST');
    });

    it('should complete the object following completers only when key does not exist', async () => {
        let obj = {
        };

        const validator = new Validator();
        obj = await validator.complete(obj, completes);
        obj.should.have.property('name', 'New name');
    });

    it('should complete the object following completers with extra information', async () => {
        let obj = {
        };

        const validator = new Validator();
        obj = await validator.complete(obj, completes, { key: 'my-fabulous-key' });
        obj.should.have.property('api_key', 'my-fabulous-key');
    });

    it('should complete object and reuse it on subsequent completers', async () => {
        let obj = {
        };

        const validator = new Validator();
        obj = await validator.complete(obj, completes, { key: 'my-fabulous-key' });
        obj.should.have.property('title_name', 'Ms New name');
    });
});
