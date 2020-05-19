const APIRoutes = require('../api/routes');
const Request = require('superagent');
const Crypto = require('crypto');
const moment = require('moment');

class Auth {
    static get(name) {
        try {
            return JSON.parse(localStorage.getItem(name));
        } catch (err) {
            return localStorage.getItem(name);
        }
    }

    static set(name, value) {
        if (value instanceof Object) {
            localStorage.setItem(name, JSON.stringify(value));
        } else {
            localStorage.setItem(name, value);
        }
    }

    static remove(name) {
        localStorage.removeItem(name);
    }

    static async loggedIn(part, types) {
        const user = Auth.get('user');

        if (user == null) {
            return false;
        }

        const ok = await Auth.access(part, types);
        return ok;
    }

    static logout() {
        Auth.remove('user');
    }

    static fullname() {
        const user = Auth.get('user');

        if (user == null) {
            return null;
        }
        return `${user.firstname} ${user.lastname}`;
    }

    static user_id() {
        const user = Auth.get('user');

        if (user == null) {
            return '';
        }

        return user.authentication.key;
    }

    static user() {
        const user = Auth.get('user');

        if (user == null) {
            return {};
        }

        return user;
    }

    static async authenticate(email, password, ticket, fullPath) {
        const route = APIRoutes.authenticate();
        try {
            const res = await Request.post(route).send({
                email,
                password: password ? Crypto.createHash('sha1').update(password).digest('hex') : null,
                ticket,
                fullPath,
            });

            if ('ok' in res.body && res.body.ok) {
                Auth.set('user', res.body.user);
                return true;
            }
            Auth.remove('user');
            return false;
        } catch (err) {
            Auth.remove('user');
            return false;
        }
    }

    static async forgot_password(email) {
        const route = APIRoutes.forgot_password();
        try {
            const res = await Request.post(route).send({
                email,
                host: window.location.host,
            });

            if ('ok' in res.body && res.body.ok) {
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    static async access(part, types, check = 'any') {
        const user = Auth.get('user');
        if (user == null || !('authentication' in user) || !('key' in user.authentication)) {
            return false;
        }

        const route = APIRoutes.access();
        const signature = Auth.get_api_headers('POST', route);

        try {
            const res = await Request.post(route)
            .set('Authorization', `${signature.key}:${signature.sign}`)
            .set('X-MD-TIMESTAMP', signature.timestamp)
            .send({
                key: user.authentication.key,
                part,
                types,
                check,
            });

            if ('ok' in res.body && res.body.ok) {
                return true;
            }
            // Auth.remove('user');
            return false;
        } catch (err) {
            // Auth.remove('user');
            return false;
        }
    }

    static test_access(access) {
        const user = Auth.get('user');
        if (user == null) {
            return false;
        }

        const a = user.access || null;
        if (a == null) {
            return false;
        }

        const rights = a.rights || null;
        if (rights == null) {
            return false;
        }

        let ok = false;
        for (const ac of access) {
            if (ac in rights) {
                ok = rights[ac].r || rights[ac].d
                    || rights[ac].c || rights[ac].u;

                if (ok) {
                    return true;
                }
            }
        }

        return ok;
    }


    static has_access(access, type) {
        const user = Auth.get('user');
        if (user == null) {
            return false;
        }

        const roles = user.roles || [];

        const all_relevant_accesses = roles.map((role) => {
            const rights = role._id.rights || [];
            const t = rights.find(right => right.entity === access);
            if (!t) {
                return false;
            }
            return t[type] || false;
        });
        return all_relevant_accesses.some(a => a === true);
    }

    static get_api_headers(method, path) {
        const user = Auth.get('user');
        if (user == null || user.authentication == null
            || user.authentication.key == null || user.authentication.secret == null) {
            return {};
        }

        const timestamp = +moment();
        const concat = `${method}/${path}${timestamp}`;
        const sign = Crypto.createHmac('sha1', user.authentication.secret).update(concat).digest('hex');

        return {
            timestamp,
            sign,
            key: user.authentication.key,
        };
    }
}

module.exports = Auth;
