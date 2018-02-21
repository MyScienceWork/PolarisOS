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
        zipcode_null: null,
        zipcode_undefined: undefined,
        country: 'France',
        langs: [
            {
                title: 'French',
                code: 'FR',
                frname: 'Français',
            },
            {
                title: 'German',
                code: 'DE',
            },
        ],
        embedded: [
            {
                em: [{
                    title: 'French',
                }, { title: 'German' }],
            },
            {
                em: [{
                    title: 'English',
                }],
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

    it('should not return an empty generator when the field is null or undefined', () => {
        const path = 'address.zipcode_null';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'))];
        results.should.be.empty;

        const path_2 = 'address.zipcode_undefined';
        const results_2 = [...utils.find_popvalue_with_path(obj, path.split('.'))];
        results.should.be.empty;
    });

    it('should keep empty element (null / undefined) when ask to', () => {
        const path = 'address.zipcode_null';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'), false, true)];
        results.should.have.lengthOf(1);
    });

    it('should keep empty element (null / undefined) when ask to even when traversing an array', () => {
        const path = 'address.langs.frname';
        const results = [...utils.find_popvalue_with_path(obj, path.split('.'), false, true)];
        results.should.have.lengthOf(2);
    });
});

describe('Utils#make_nested_object_from_path', () => {
    it('should generate simple object', () => {
        const path = 'address';
        const value = 'test';

        const result = utils.make_nested_object_from_path(path.split('.'), value);
        result.should.have.property('address', 'test');
    });

    it('should generate nested object', () => {
        const path = 'address._id';
        const value = 'test';

        const result = utils.make_nested_object_from_path(path.split('.'), value);
        result.should.have.property('address');
        result.address.should.have.property('_id', 'test');
    });

    it('should generate deeply nested object', () => {
        const path = 'test.test.address._id';
        const value = 'test';

        const result = utils.make_nested_object_from_path(path.split('.'), value);
        result.should.have.property('test');
        result.test.should.have.property('test');
        result.test.test.should.have.property('address');
        result.test.test.address.should.have.property('_id', 'test');
    });

    it('should generate array when using special segment *', () => {
        const path = '*';
        const value = 'test';

        const result = utils.make_nested_object_from_path(path.split('.'), value);
        result.should.have.lengthOf(1);
        result[0].should.equal('test');
    });

    it('should generate array withing object when using special segment *', () => {
        const path = 'address.*';
        const value = 'test';

        const result = utils.make_nested_object_from_path(path.split('.'), value);
        result.should.have.property('address');
        result.address.should.have.lengthOf(1);
        result.address[0].should.equal('test');
    });

    it('should generate array withing object when using special segment *', () => {
        const path = 'address.*._id';
        const value = 'test';

        const result = utils.make_nested_object_from_path(path.split('.'), value);
        result.should.have.property('address');
        result.address.should.have.lengthOf(1);
        result.address[0].should.property('_id', 'test');
    });

    it('should generate array withing deeply nested object when using special segment *', () => {
        const path = 'test.*.test.address.*._id';
        const value = 'test';

        const result = utils.make_nested_object_from_path(path.split('.'), value);
        result.should.have.property('test');
        result.test.should.have.lengthOf(1);
        result.test[0].should.have.property('test');
        result.test[0].test.should.have.property('address');
        result.test[0].test.address.should.have.lengthOf(1);
        result.test[0].test.address[0].should.have.property('_id', 'test');
    });
});

describe('Utils#merge_with_superposition', () => {
    it('should concat if arrays of different sizes (source empty / target with 1 element)', () => {
        const source = { test: [] };
        const target = { test: [{ yep: 'nok' }] };

        const result = utils.merge_with_superposition(source, target);
        result.should.have.property('test');
        result.test.should.have.lengthOf(1);
        result.test[0].should.have.property('yep', 'nok');
    });

    it('should concat if arrays of different sizes (source with 1 element / target empty)', () => {
        const source = { test: [{ yep: 'nok' }] };
        const target = { test: [] };

        const result = utils.merge_with_superposition(source, target);
        result.should.have.property('test');
        result.test.should.have.lengthOf(1);
        result.test[0].should.have.property('yep', 'nok');
    });

    it('should merge inner object of array', () => {
        const source = { test: [{ nope: 'ok' }] };
        const target = { test: [{ yep: 'nok' }] };

        const result = utils.merge_with_superposition(source, target);
        result.should.have.property('test');
        result.test.should.have.lengthOf(1);
        result.test[0].should.have.property('nope', 'ok');
        result.test[0].should.have.property('yep', 'nok');
    });

    it('should merge inner objects of array in order', () => {
        const source = { test: [{ nope: 'ok' }, { second: 'ok' }] };
        const target = { test: [{ yep: 'nok' }, { second_nope: 'ok' }] };

        const result = utils.merge_with_superposition(source, target);

        result.should.have.property('test');
        result.test.should.have.lengthOf(2);
        result.test[0].should.have.property('nope', 'ok');
        result.test[0].should.have.property('yep', 'nok');
        result.test[1].should.have.property('second', 'ok');
        result.test[1].should.have.property('second_nope', 'ok');
    });
});

describe('Utils#traverse_and_execute', () => {
    const func = async o => o;
    const func2 = async o => 'ok';

    it('should generate as many paths as necessary for unexplicited array', async () => {
        const path = 'address.langs.title';
        const results = await utils.traverse_and_execute(obj, path.split('.'), func);

        results.should.deep.equal({ address: { langs: [{ title: 'French' }, { title: 'German' }] } });
    });

    it('should be empty when path is inexact', async () => {
        const path = 'address.langs.title.test';
        const results = await utils.traverse_and_execute(obj, path.split('.'), func);

        results.should.deep.equal({ address: { langs: [{ title: { test: null } }, { title: { test: null } }] } });
    });

    it('should generate one element if array index is specified', async () => {
        const path = 'address.langs.0.title';
        const results = await utils.traverse_and_execute(obj, path.split('.'), func);
        results.should.deep.equal({ address: { langs: [{ title: 'French' }] } });
    });

    it('should generate one object if array index is specified', async () => {
        const path = 'address.langs.0';
        const results = await utils.traverse_and_execute(obj, path.split('.'), func);
        results.should.deep.equal({ address: { langs: [{ title: 'French', code: 'FR', frname: 'Français' }] } });
    });

    it('should not return an empty generator when the field is null or undefined', async () => {
        const path = 'address.zipcode_null';
        const results = await utils.traverse_and_execute(obj, path.split('.'), func);
        results.should.deep.equal({ address: { zipcode_null: null } });

        const path_2 = 'address.zipcode_undefined';
        const results_2 = await utils.traverse_and_execute(obj, path.split('.'), func);
        results.should.deep.equal({ address: { zipcode_null: null } });
    });

    it('should keep the structure of embedded arrays', async () => {
        const path = 'address.embedded.em.title';
        const results = await utils.traverse_and_execute(obj, path.split('.'), func);
        results.should.deep.equal({ address: { embedded: [{ em: [{ title: 'French' }, { title: 'German' }] }, { em: [{ title: 'English' }] }] } });
    });
});
