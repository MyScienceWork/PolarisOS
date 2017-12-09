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

describe('Utils#find_popvalue_with_path', () => {
    it('should generate as many paths as necessary for unexplicited array', () => {
        const path = 'address.langs.title';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'))];

        results.should.have.lengthOf(2);
        results[0].should.equal('French');
        results[1].should.equal('German');
    });

    it('should be empty when path is inexact', () => {
        const path = 'address.langs.title.test';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'))];

        results.should.be.empty;
    });

    it('should generate one element if array index is specified', () => {
        const path = 'address.langs.0.title';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'))];

        results.should.have.lengthOf(1);
        results[0].should.equal('French');
    });

    it('should generate one object if array index is specified', () => {
        const path = 'address.langs.0';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'))];

        results.should.have.lengthOf(1);
        results[0].should.have.property('title', 'French');
        results[0].should.have.property('code', 'FR');
    });

    it('should return the parent object when asked to', () => {
        const path = 'address.langs.0.title';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'), true)];

        results.should.have.lengthOf(1);
        results[0].should.have.property('title', 'French');
        results[0].should.have.property('code', 'FR');
    });

    it('should return the parent object when asked to and take into account unexplicited arrays', () => {
        const path = 'address.langs.title';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'), true)];

        results.should.have.lengthOf(2);
        results[0].should.have.property('title', 'French');
        results[0].should.have.property('code', 'FR');

        results[1].should.have.property('title', 'German');
        results[1].should.have.property('code', 'DE');
    });

    it('should return the parent array when a correct index is given', () => {
        const path = 'address.langs.1';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'), true)];

        results.should.have.lengthOf(2);
        results[0].should.have.property('title', 'French');
        results[0].should.have.property('code', 'FR');

        results[1].should.have.property('title', 'German');
        results[1].should.have.property('code', 'DE');
    });

    it('should not return an object when the field does not exist', () => {
        const path = 'address.langs.content';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'), true)];
        results.should.be.empty;
    });

    it('should not return an array when the field does not exist', () => {
        const path = 'address.langs.2.title';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'), true)];
        results.should.be.empty;
    });
});
