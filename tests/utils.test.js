const chai = require('chai');
const utils = require('../build/modules/utils/utils');

const should = chai.should();
const obj = {
    _id: 'test',
    firstname: 'Corentin',
    lastname: 'Ribeyre',
    address: {
        street: '13 rue de la Bouillante',
        city: 'Dieulouard',
        zipcode: '54380',
        country: 'France',
        langs: [
            {
                title: 'French',
                code: 'FR',
            },
            {
                title: 'German',
                code: 'DE',
            },
        ],
    },
    langs: ['FR', 'DE', 'EN'],
};

describe('Utils#find_value_with_path', () => {
    it('should retrieve the correct key recursively', () => {
        const result = utils.find_value_with_path(obj, 'address.city'.split('.'));
        result.should.not.be.empty;
        result.should.equal('Dieulouard');
    });

    it('should return null when key does not exist', () => {
        let result = utils.find_value_with_path(obj, 'address.city.country'.split('.'));
        (result === null).should.equal(true);

        result = utils.find_value_with_path(obj, 'first'.split('.'));
        (result === null).should.equal(true);
    });

    it('should return a copy of the correct object', () => {
        const result = utils.find_value_with_path(obj, 'address'.split('.'));
        result.test = 'new';
        obj.should.not.have.property('test');
        result.should.have.property('test');
    });

    it('should return a element in an array', () => {
        const result = utils.find_value_with_path(obj, 'address.langs.0'.split('.'));
        result.should.have.property('title', 'French');
        result.should.have.property('code', 'FR');
    });

    it('should return a part of an object in an array', () => {
        const result = utils.find_value_with_path(obj, 'address.langs.0.title'.split('.'));
        result.should.equal('French');
    });
});

describe('Utils#find_object_with_path', () => {
    it('should retrieve the correct object', () => {
        const result = utils.find_object_with_path(obj, 'address'.split('.'));
        result.should.not.be.empty;
        result.should.have.property('address');
    });

    it('should retrieve the correct object recursively', () => {
        const result = utils.find_object_with_path(obj, 'address.city'.split('.'));
        result.should.not.be.empty;
        result.should.have.property('city', 'Dieulouard');
    });

    it('should retrieve the array where lies the object', () => {
        const result = utils.find_object_with_path(obj, 'address.langs.0'.split('.'));
        result.should.not.be.empty;
        result.should.have.lengthOf(2);
        result[0].should.have.property('title');
        result[0].should.have.property('code');
    });
});

describe('Utils#null_or_undef', () => {
    it('should return true when null', () => {
        utils.null_or_undef(null).should.equal(true);
    });

    it('should return true when undefined', () => {
        utils.null_or_undef(undefined).should.equal(true);
    });

    it('should return false when false', () => {
        utils.null_or_undef(false).should.equal(false);
    });
});

describe('Utils#falsy', () => {
    it('should return true when null, undefined, false, empty string and 0', () => {
        utils.falsy(null).should.equal(true);
        utils.falsy(undefined).should.equal(true);
        utils.falsy(false).should.equal(true);
        utils.falsy('').should.equal(true);
        utils.falsy(0).should.equal(true);

        utils.falsy([1, 2]).should.equal(false);
        utils.falsy('test').should.equal(false);
        utils.falsy(1).should.equal(false);
    });
});
