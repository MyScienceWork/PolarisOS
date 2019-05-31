// @flow

const Request = require('superagent');
const Config = require('../../../../config');
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
    try {
        const res = await Request.put(`${url}/metadata/${doi_prefix}/${doi_suffix}`)
            .auth(username, password)
            .type('application/xml;charset=UTF-8');
        const { status } = res;
        if (status && status === 201) {
            return true;
        }
        throw Errors[`DataCite${status}`];
    } catch (err) {
        Logger.error(`[DataCite(post_resource)] Error when sending data to the API: ${err.message}`);
    } finally {
        return false;
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
        if (status && status === 201) {
            return true;
        }
        throw Errors[`DataCite${status}`];
    } catch (err) {
        Logger.error(`[DataCite(post_resource_url)] Error when sending data to the API: ${err.message}`);
    } finally {
        return false;
    }
}

async function post_all(id: string, doi_suffix: string): Promise<boolean> {
    const config = await get_datacite_config();
    if (!config) {
        Logger.error('[DataCite(post_all)] Unable to find DataCite config');
        return false;
    }

    const metadata_ok = await post_resource(id, doi_suffix);
    if (!metadata_ok) {
        Logger.error('[DataCite(post_all)] Unable to post metadata to DataCite');
        return false;
    }

    const url_ok = await post_resource_url(id, doi_suffix);
    if (!url_ok) {
        Logger.error('[DataCite(post_all)] Unable to post URL to DataCite');
        return false;
    }
    return true;
}

module.exports = {
    get_datacite_config,
    post_resource_url,
    post_resource,
    post_all,
};
