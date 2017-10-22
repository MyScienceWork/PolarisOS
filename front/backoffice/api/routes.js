const Config = require('../../../app/config');

const prefix = `${Config.api.public.prefix}/${Config.api.public.version}`;

module.exports = {
    entity(entity, method, search = [], id = null) {
        const s = search.join(',');
        switch (method) {
        case 'GET': {
            let url = `${prefix}/${entity}`;
            if (id == null) {
                url += 's';
            }
            if (search.length > 0) {
                url += `?search=${s}`;
            }
            return url;
        }
        case 'POST':
        case 'PUT':
            return `${prefix}/${entity}`;
        case 'DEL':
            return `${prefix}/${entity}/${id}`;
        default:
            return '';
        }
    },
};
