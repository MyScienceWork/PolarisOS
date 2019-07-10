const Config = require('../../../app/config');

const prefix = `${Config.api.public.prefix}/${Config.api.public.version}`;

module.exports = {
    entity(entity, method, search = false, id = null, projection = '', population = '') {
        switch (method) {
        case 'VALIDATE':
            if (id != null) {
                return `${prefix}/${entity}/validate/${id}`;
            }
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

    ajax(entity, translatable, lang) {
        if (translatable) {
            return `${prefix}/${entity}s/search/true/${lang}`;
        }
        return `${prefix}/${entity}s/search`;
    },

    access() {
        return `${prefix}/iuser/access`;
    },

    authenticate() {
        return `${prefix}/authenticate`;
    },

    import(type) {
        if (type) {
            return `${prefix}/import/${type}`;
        }
        return `${prefix}/import`;
    },

    export() {
        return `${prefix}/export`;
    },

    export_bibliography() {
        return `${prefix}/export/bibliography`;
    },

    export_bibliography_for_website() {
        return `${prefix}/export/bibliography/web`;
    },

    export_masas() {
        return `${prefix}/export/masas`;
    },

    multi_download(type, id, names, filenames) {
        return `/downloads/${type}/${id}/${names.join('|')}/${filenames.join('|')}`;
    },

    rss(entity, mapping, lang, query, sort, size) {
        return `${prefix}/rss/${entity}/${mapping}/${lang}/${query}/${sort}/${size}`;
    },

    external() {
        return `${prefix}/external`;
    },

    custom(suffix) {
        return `${prefix}/${suffix}`;
    },
};
