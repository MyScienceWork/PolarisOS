const chai = require('chai');
/* const Organization = require('../build/modules/entities/organization');
const ApiUser = require('../build/modules/entities/apiuser');
const RightEnforcer = require('../build/modules/auth/right_enforcer');
// const utils = require('../build/modules/utils/utils');

const should = chai.should();
const user = new ApiUser.ApiUser(null);
const entity = new Organization.Organization(null);


describe('RightEnforcerb#has_right', () => {
    beforeEach(() => {
        const obj_user = {
            access: {
                rights: {
                    organization: {
                        r: true,
                        c: true,
                        u: false,
                        d: false,
                    },
                },
                filter: {
                    organization: {
                        whitelist: null,
                        blacklist: null,
                    },
                },
            },
        };
        user.read(obj_user);

        const obj_org = {
            _id: '56914478486d1db46fb02951',
            name: 'Test Organization',
        };
        entity.read(obj_org);
    });

    it('should return true when whitelist & blacklist are null', () => {
        (user.get('access.filter.organization.whitelist') === null).should.equal(true);
        (user.get('access.filter.organization.blacklist') === null).should.equal(true);

        const re = new RightEnforcer(entity, user);
        re.has_right().should.equal(true);
    });

    it('should return true when whitelist & blacklist are empty', () => {
        user.set('access.filter.organization.whitelist', []);
        user.set('access.filter.organization.blacklist', []);

        user.get('access.filter.organization.whitelist').should.have.lengthOf(0);
        user.get('access.filter.organization.blacklist').should.have.lengthOf(0);

        const re = new RightEnforcer(entity, user);
        re.has_right().should.equal(true);
    });

    it('should return true when id is in whitelist but not in blacklist', () => {
        user.set('access.filter.organization.whitelist', ['56914478486d1db46fb02951']);
        user.get('access.filter.organization.whitelist').should.have.lengthOf(1);

        const re = new RightEnforcer(entity, user);
        re.has_right().should.equal(true);
    });

    it('should return false otherwise', () => {
        user.set('access.filter.organization.blacklist', ['56914478486d1db46fb02951']);
        user.get('access.filter.organization.blacklist').should.have.lengthOf(1);

        const re = new RightEnforcer(entity, user);
        re.has_right().should.equal(false);
    });
});

describe('RightEnforcerb#get_lists', () => {
    beforeEach(() => {
        const obj_user = {
            access: {
                rights: {
                    organization: {
                        r: true,
                        c: true,
                        u: false,
                        d: false,
                    },
                },
                filter: {
                    organization: {
                        whitelist: null,
                        blacklist: null,
                    },
                },
            },
        };
        user.read(obj_user);

        const obj_org = {
            _id: '56914478486d1db46fb02951',
            name: 'Test Organization',
        };
        entity.read(obj_org);
    });

    it('should return empty blacklist & whitelist when null', () => {
        (user.get('access.filter.organization.whitelist') === null).should.equal(true);
        (user.get('access.filter.organization.blacklist') === null).should.equal(true);

        const re = new RightEnforcer(entity, user);
        const { whitelist, blacklist } = re.get_lists();
        const w = Array.from(whitelist);
        const b = Array.from(blacklist);
        re.get_lists().should.have.property('whitelist');
        re.get_lists().should.have.property('blacklist');
        w.should.have.lengthOf(0);
        b.should.have.lengthOf(0);
    });

    it('should return correct whitelist', () => {
        user.set('access.filter.organization.whitelist', ['56914478486d1db46fb02951']);

        const re = new RightEnforcer(entity, user);
        const { whitelist } = re.get_lists();

        whitelist.has('56914478486d1db46fb02951').should.equal(true);
    });

    it('should return correct whitelist when both lists have ids in common', () => {
        user.set('access.filter.organization.whitelist', ['56914478486d1db46fb02951', '45814478486d1db46fb02953']);
        user.set('access.filter.organization.blacklist', ['56914478486d1db46fb02951']);

        const re = new RightEnforcer(entity, user);
        const { whitelist, blacklist } = re.get_lists();

        whitelist.has('56914478486d1db46fb02951').should.equal(false);
        blacklist.has('56914478486d1db46fb02951').should.equal(true);
    });
});*/
