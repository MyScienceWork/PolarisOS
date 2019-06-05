// @flow
const Json2Xml = require('json2xml');
const Request = require('superagent');
const DataCitePipeline = require('../pipeline/datacite_pipeline');
const ConfigUtils = require('../../../utils/config');
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');
const Logger = require('../../../../logger');
const Errors = require('../../../exceptions/errors');

async function get_datacite_config(): Promise<?Object> {
    const global_config = await ConfigUtils.get_config();
    if (!global_config) {
        Logger.error('Unable to find config in ES');
        return null;
    }

    const config = await Utils.find_value_with_path(global_config, 'api.datacite'.split('.'));

    if (!config) {
        Logger.error('Unable to find DataCite config in ES');
        return null;
    }

    if (!config.enabled) {
        return null;
    }
    return config;
}

async function to_datacite(publication: Object): Promise<string> {
    const typology = (await EntitiesUtils.search_and_get_sources('typology', {
        size: 100,
    })).reduce((obj, typo) => {
        obj[typo._id] = typo.name;
        return obj;
    }, {});

    const records = [];
    const pos_type = typology[publication.type];

    for (const key in DataCitePipeline.mapping) {
        const pub_info = Utils.find_value_with_path(publication, key.split('.'));
        if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
            continue;
        }

        const info = DataCitePipeline.mapping[key];
        let mapper = null;
        if (pos_type in info) {
            mapper = info[pos_type];
        } else if ('__default' in info) {
            mapper = info.__default;
        }

        if (!mapper) {
            continue;
        }

        let subobj = await mapper.picker(pub_info, publication, 'en', key);
        if (!subobj) {
            continue;
        }

        if (mapper.transformers.length > 0) {
            subobj = await mapper.transformers.reduce((o, tr) => {
                o = tr(o);
                return o;
            }, subobj);
        }
        records.push(subobj);
    }
    return Json2Xml({ resource: records,
        attrs: {
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            xmlns: 'http://datacite.org/schema/kernel-4',
            'xsi:schemaLocation': 'http://datacite.org/schema/kernel-4 http://schema.datacite.org/meta/kernel-4.2/metadata.xsd',
        },
    }, { header: true, attributes_key: 'attrs' });
}

async function post_resource(config: object, id: string, doi_suffix: string): Promise<boolean> {
    const { url, username, password, doi_prefix } = config;

    if (!doi_suffix) {
        doi_suffix = id;
    }

    const publication = await EntitiesUtils.retrieve_and_get_source('publication', id);

    if (!publication) {
        Logger.error('[DataCite(post_resource)] Publication id does not refer to an existing publication');
        return false;
    }

    const { ids } = publication;
    if (!ids) {
        publication.ids = [{ _id: `${doi_prefix}/${doi_suffix}`, type: 'doi' }];
    } else {
        const doi = ids.find(i => i.type === 'doi');
        if (!doi) {
            publication.ids.push({ type: 'doi', _id: `${doi_prefix}/${doi_suffix}` });
        }
    }
    await EntitiesUtils.update(publication, 'publication');

    try {
        const xml = await to_datacite(publication);
        const res = await Request.put(`${url}/metadata/${doi_prefix}/${doi_suffix}`)
            .auth(username, password)
            .type('application/xml;charset=UTF-8')
            .send(xml);

        const { status } = res;
        if (status && (status === 201 || status === '201')) {
            return true;
        }
        throw Errors[`DataCite${status}`];
    } catch (err) {
        Logger.error(`[DataCite(post_resource)] Error when sending data to the API: ${err.message}`);
    }
}

async function post_resource_url(config: object, id: string, doi_suffix: string): Promise<boolean> {
    const { url, username, password, doi_prefix } = config;

    if (!doi_suffix) {
        doi_suffix = id;
    }

    const publication = await EntitiesUtils.retrieve_and_get_source('publication', id);
    if (!publication) {
        Logger.error('[DataCite(post_resource_url)] Publication id does not refer to an existing publication');
        return false;
    }

    const global_config = await ConfigUtils.get_config();
    if (!global_config) {
        Logger.error('[DataCite(post_resource_url)] Unable to find global config');
        return false;
    }

    const pos_base_url = Utils.find_value_with_path(global_config, 'base_url'.split('.'));
    const publication_url = `${pos_base_url}/view/${id}`;

    try {
        const res = await Request.put(`${url}/doi/${doi_prefix}/${doi_suffix}`)
            .auth(username, password)
            .type('text/plain;charset=UTF-8')
            .send(`doi=${doi_prefix}/${doi_suffix}\nurl=${publication_url}`);
        const { status } = res;
        if (status && (status === 201 || status === '201')) {
            return true;
        }
        throw Errors[`DataCite${status}`];
    } catch (err) {
        Logger.error(`[DataCite(post_resource_url)] Error when sending data to the API: ${err.message}`);
        return false;
    }
}

async function del(id: string, doi_suffix: string): Promise<boolean> {
    const config = await get_datacite_config();
    if (!config) {
        Logger.error('[DataCite(del)] Unable to find DataCite config');
        return false;
    }

    const { url, username, password, doi_prefix } = config;

    if (!doi_suffix) {
        doi_suffix = id;
    }

    try {
        const res = await Request.del(`${url}/metadata/${doi_prefix}/${doi_suffix}`)
            .auth(username, password)
            .type('application/plain;charset=UTF-8');
        const { status } = res;
        if (status && (status === 200 || status === '200')) {
            return true;
        }
        throw Errors[`DataCite${status}`];
    } catch (err) {
        Logger.error(`[DataCite(del)] Error when deleting metadata from the API: ${err.message}`);
        return false;
    }
}

async function post(id: string, type: string = 'ALL', doi_suffix: string): Promise<boolean> {
    const config = await get_datacite_config();
    if (!config) {
        Logger.error('[DataCite(post)] Unable to find DataCite config');
        return false;
    }

    if (type === 'ALL' || type === 'METADATA') {
        const metadata_ok = await post_resource(config, id, doi_suffix);
        if (!metadata_ok) {
            Logger.error('[DataCite(post)] Unable to post metadata to DataCite');
            return false;
        }
    }

    if (type === 'ALL' || type === 'URL') {
        const url_ok = await post_resource_url(config, id, doi_suffix);
        if (!url_ok) {
            Logger.error('[DataCite(post)] Unable to post URL to DataCite');
            return false;
        }
    }
    return true;
}

async function export_datacite(ctx: any) {
    const ok = await post(ctx.params.id, 'ALL');
    ctx.body = { ok };
}

async function delete_datacite(ctx: any) {
    const ok = await del(ctx.params.id);
    ctx.body = { ok };
}

module.exports = {
    get_datacite_config,
    post_resource_url,
    post,
    del,
    export_datacite,
    delete_datacite,
};
