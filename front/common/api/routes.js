const Config = require('../../../app/config');

const prefix = `${Config.api.public.prefix}/${Config.api.public.version}`;

module.exports = {
    entity(entity, method, search = false, id = null, projection = '', population = '') {
        switch (method) {
        case 'VALIDATE':
            return `${prefix}/${entity}/validate`;
        case 'UPLOAD': {
            const url = `${prefix}/single_upload`;
            return url;
        }
        case 'GET': {
            let url = `${prefix}/${entity}`;
            if (id == null) {
                url += 's';
            } else {
                url += `/${id}`;
            }

            if (projection !== '') {
                url += `/${projection}`;
                if (population !== '') {
                    url += `/${population}`;
                }
            } else if (population !== '') {
                url += `/,/${population}`;
            }
            return url;
        }
        case 'POST': {
            if (search) {
                return `${prefix}/${entity}s/search`;
            }
            return `${prefix}/${entity}`;
        }
        case 'PUT':
            return `${prefix}/${entity}`;
        case 'DEL':
            return `${prefix}/${entity}/${id}`;
        default:
            return '';
        }
    },

    access() {
        return `${prefix}/iuser/access`;
    },

    authenticate() {
        return `${prefix}/authenticate`;
    },
};
