const Config = require('../../../app/config');

const prefix = `${Config.api.public.prefix}/${Config.api.public.version}`;

module.exports = {
    entity(entity, method, search = false, id = null) {
        switch (method) {
        case 'GET': {
            let url = `${prefix}/${entity}`;
            if (id == null) {
                url += 's';
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
};
