// @flow
const ODM = require('../entities/crud/odm');

type ObjectList = {
    whitelist?: Set<string>,
    blacklist?: Set<string>
};

class RightEnforcer {
    _entity: ODM;
    _user: ODM;

    constructor(entity: ODM, user: ODM) {
        this._entity = entity;
        this._user = user;
    }

    get entity(): ODM {
        return this._entity;
    }

    get user(): ODM {
        return this._user;
    }

    has_right(): boolean {
        const { whitelist, blacklist } = this.get_lists();
        if (whitelist == null && blacklist == null) {
            return true;
        }

        if ((whitelist != null && whitelist.size === 0)
            && (blacklist != null && blacklist.size === 0)) {
            return true;
        }

        if (blacklist != null && blacklist.has(this._entity.id)) {
            return false;
        }

        if (whitelist != null && whitelist.has(this._entity.id)) {
            return true;
        }

        return false;
    }

    get_lists(): ObjectList {
        const access: ?Object = this._user.get(`access.filter.${this._entity.name}`);
        if (access == null) {
            return {};
        }

        let { whitelist, blacklist } = access;

        if (blacklist == null) {
            blacklist = new Set();
        } else {
            blacklist = new Set(blacklist);
        }

        if (whitelist == null) {
            whitelist = [];
        }

        // Remove blacklisted elements from whitelist (just in case)
        const nwhitelist: Set<string> = new Set(whitelist
            .filter(x => !blacklist.has(x)));

        return { whitelist: nwhitelist, blacklist };
    }
}

module.exports = RightEnforcer;
