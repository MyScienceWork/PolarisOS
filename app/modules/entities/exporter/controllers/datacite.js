// @flow
const Json2Xml = require('json2xml');
const Request = require('superagent');
const moment = require('moment');
const DataCiteDatasetPipeline = require('../pipeline/datacite_dataset_pipeline');
const DataCitePublicationPipeline = require('../pipeline/datacite_publication_pipeline');
const ConfigUtils = require('../../../utils/config');
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');
const Logger = require('../../../../logger');
const Errors = require('../../../exceptions/errors');

class Datacite {
    _entity: string;
    _typology_index: string;
    _DatacitePipeline: Object;

    constructor(entity, typology_index) {
        this._entity = entity;
        this._typology_index = typology_index;
        this._DatacitePipeline = entity === 'publication' ? DataCitePublicationPipeline : DataCiteDatasetPipeline;
    }

    async get_datacite_config(): Promise<?Object> {
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

    async to_datacite(publication: Object): Promise<string> {
        const typology = (await EntitiesUtils.search_and_get_sources(this._typology_index, {
            size: 100,
        })).reduce((obj, typo) => {
            obj[typo._id] = typo.name;
            return obj;
        }, {});

        const records = [];
        const pos_type = typology[publication.type];

        for (const key in this._DatacitePipeline.mapping) {
            const pub_info = Utils.find_value_with_path(publication, key.split('.'));
            if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
                continue;
            }

            const info = this._DatacitePipeline.mapping[key];
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

        records.push({ attrs: { 'xml:lang': 'en', }, publisher: "Université de Lorraine" });
        records.push({ publicationYear: moment().format('YYYY' )});
        records.push({ language: "en" });
        records.push({ version: "1.0" });

        return Json2Xml({ resource: records,
            attrs: {
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                xmlns: 'http://datacite.org/schema/kernel-4',
                'xsi:schemaLocation': 'http://datacite.org/schema/kernel-4 http://schema.datacite.org/meta/kernel-4.2/metadata.xsd',
            },
        }, { header: true, attributes_key: 'attrs' });
    }

    async post_resource(config: object, id: string, doi_suffix: string): Promise<boolean> {
        const { url, username, password, doi_prefix } = config;

        if (!doi_suffix) {
            doi_suffix = id;
        }

        const publication = await EntitiesUtils.retrieve_and_get_source(this._entity, id);

        if (!publication) {
            Logger.error('[DataCite(post_resource)] Publication id does not refer to an existing '+ this._entity);
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
        await EntitiesUtils.update(publication, this._entity);
        let datacite_url = '';

        try {
            const xml = await this.to_datacite(publication);
            datacite_url = `${url}/metadata/${doi_prefix}/${doi_suffix}`;
            const res = await Request.put(datacite_url)
                .auth(username, password)
                .type('application/xml')
                .send(xml);

            const { status } = res;
            if (status && (status === 201 || status === '201')) {
                return true;
            }
            throw Errors[`DataCite${status}`];
        } catch (err) {
            Logger.error(`[DataCite(post_resource)] Error when sending data to the API: ${err.message}`);
            Logger.error(`[DataCite(post_resource)] URL: ${datacite_url}`)
        }
    }

    async post_resource_url(config: object, id: string, doi_suffix: string): Promise<boolean> {
        const { url, username, password, doi_prefix } = config;

        if (!doi_suffix) {
            doi_suffix = id;
        }

        const publication = await EntitiesUtils.retrieve_and_get_source(this._entity, id);
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
        let datacite_url = '';

        try {
            datacite_url = `${url}/doi/${doi_prefix}/${doi_suffix}`;
            const res = await Request.put(datacite_url)
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
            Logger.error(`[DataCite(post_resource_url)] URL: ${datacite_url}`);
            return false;
        }
    }

    async del(id: string, doi_suffix: string): Promise<boolean> {
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

    async post(id: string, type: string = 'ALL', doi_suffix: string): Promise<boolean> {
        const config = await this.get_datacite_config();
        if (!config) {
            Logger.error('[DataCite(post)] Unable to find DataCite config');
            return false;
        }

        if (type === 'ALL' || type === 'METADATA') {
            const metadata_ok = await this.post_resource(config, id, doi_suffix);
            if (!metadata_ok) {
                Logger.error('[DataCite(post)] Unable to post metadata to DataCite');
                return false;
            }
        }

        if (type === 'ALL' || type === 'URL') {
            const url_ok = await this.post_resource_url(config, id, doi_suffix);
            if (!url_ok) {
                Logger.error('[DataCite(post)] Unable to post URL to DataCite');
                return false;
            }
        }

        return true;
    }

    async export_datacite(ctx: any) {
        const ok = await post(ctx.params.id, 'ALL');
        ctx.body = { ok };
    }

    async delete_datacite(ctx: any) {
        const ok = await del(ctx.params.id);
        ctx.body = { ok };
    }
}

module.exports = Datacite;
