// @flow
const _ = require('lodash');
const Scheduler = require('./scheduler');
const Logger = require('../../logger');
const Errors = require('../exceptions/errors');
const EntitiesUtils = require('../utils/entities');
const EnvUtils = require('../utils/env');
const ConfigUtils = require('../utils/config');
const HandleAPI = require('../3rdparty/handle/api');
const SitemapAPI = require('../3rdparty/google/sitemap_generator');
const SwordAPI = require('../entities/exporter/controllers/sword');
const Config = require('../../config');
const DataCitePublicationAPI = require('../entities/exporter/controllers/datacite_publication');
const DataCiteDatasetAPI = require('../entities/exporter/controllers/datacite_dataset');

const Throttle = require('promise-parallel-throttle');


class ApiScheduler extends Scheduler {
    async _execute_sitemap_creation() {
        if (!EnvUtils.is_production()) {
            return;
        }

        const sitemap_config = await SitemapAPI.get_google_config();
        if (!sitemap_config || sitemap_config.enabled === false) {
            return;
        }
        Logger.info('Execute sitemap creation');
        await SitemapAPI.generate();
    }

    async get_uploadable_publications() {
        return await EntitiesUtils.search_and_get_sources('publication', {
            where: {
                $and: [
                    { status: ['published'] },
                    { 'system.api.hal': false },
                    { 'system.api.handle': true },
                    { 'diffusion.rights.exports.hal': true },
                ],
            },
            size: 100,
        });
    }

    async _execute_hal_export() {
        if (!EnvUtils.is_production()) {
            return;
        }

        const publications = await this.get_uploadable_publications();

        const exec_hal = async (p) => {
            // wait 10 seconds before each send to avoid HAL duplicates
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 10000);
            });

            const refreshed_pub = await this.get_uploadable_publications();
            const idx_pub = refreshed_pub.find(pub => pub._id === p._id);

            if (idx_pub !== undefined && idx_pub.system.api.hal === true) {
                return true;
            }

            const [ok, id] = await SwordAPI.create(p._id);
            if (ok) {
                if (!('api' in p.system)) {
                    p.system.api = {};
                }
                p.system.api.hal = true;
                p.system.api.hal_id = id;
                await EntitiesUtils.update(p, 'publication');
            }
            return ok;
        };
        const promises = publications.map(p => () => exec_hal(p));

        await this.asyncForEach(publications, async (p) => {
            try {
                await exec_hal(p);
            } catch (err) {
                Logger.error('Error when sending publication');
            }
        });
    }

    async _execute_handle_creation() {
        const handle_config = await HandleAPI.get_handle_config();
        const myconfig = await ConfigUtils.get_config();
        if (!handle_config || !myconfig
            || !myconfig.base_url || myconfig.base_url.trim() === '') {
            return;
        }

        if (!handle_config.enabled) {
            return;
        }

        if (!EnvUtils.is_production()) {
            Logger.info('Handle API only runs in production mode');
            return;
        }

        const publications = await EntitiesUtils.search_and_get_sources('publication', {
            where: {
                $and: [
                    { status: ['published', 'unpublished'] },
                    { 'system.api.handle': false },
                ],
            },
            size: 500,
        });

        const exec_handle = async (p) => {
            const ok = await HandleAPI.add_handle(p._id, `${myconfig.base_url}/view/${p._id}`);
            if (ok) {
                if (!('api' in p.system)) {
                    p.system.api = {};
                }
                p.system.api.handle = true;
                const ids = p.ids || [];
                ids.push({
                    _id: `${handle_config.proxy}/${handle_config.prefix}/${p._id}`,
                    type: 'handle',
                });
                p.ids = ids;
                await EntitiesUtils.update(p, 'publication');
            }
            return ok;
        };
        const promises = publications.map(p => () => exec_handle(p));

        await Throttle.all(promises, {
            maxInProgress: 10,
        });
    }

    async _execute_datacite_export(entity) {
        if (!EnvUtils.is_production()) {
            Logger.info(`${entity} DataCite export only runs in production mode`);
            return;
        }

        const data = await EntitiesUtils.search_and_get_sources(entity, {
            where: {
                $and: [
                    { status: ['published'] },
                    { 'system.api.datacite': false },
                ],
            },
            size: 500,
        });

        Logger.info('data : ', data);

        const exec_datacite = async (p) => {
            const DataCiteAPI = entity === 'publication' ? new DataCitePublicationAPI() : new DataCiteDatasetAPI();
            const ok = await DataCiteAPI.post(p._id);
            if (ok) {
                if (!('api' in p.system)) {
                    p.system.api = {};
                }
                p.system.api.datacite = true;
                await EntitiesUtils.update(p, entity);
            }
            return ok;
        };
        const promises = data.map(p => () => exec_datacite(p));
        await Throttle.all(promises, {
            maxInProgress: 10,
        });
    }

    async _execute_data() {
        // console.log('execute api scheduler');
        this._execute_handle_creation().then(() => {}).catch((err) => {
            Logger.error('Error when creating handles through scheduler');
            Logger.error(err);
        });
        this._execute_hal_export().then(() => {}).catch((err) => {
            Logger.error('Error when exporting to HAL using scheduler');
            Logger.error(err);
        });
        /*
        this._execute_datacite_export('publication').then(() => {}).catch((err) => {
            Logger.error('Error when exporting publications to DataCite using scheduler');
            Logger.error(err.message);
        });
        */
        this._execute_datacite_export('dataset').then(() => {}).catch((err) => {
            Logger.error('Error when exporting dataset to DataCite using scheduler');
            Logger.error(err.message);
        });
        this._execute_sitemap_creation(() => {}).catch((err) => {
            Logger.error('Error when generating sitemap');
            Logger.error(err);
        });
        /* this._execute_sms_sending().then(() => {}).catch((err) => {
            Logger.error('Error when sending SMS through scheduler');
            Logger.error(err);
        });*/
    }
}

module.exports = ApiScheduler;
