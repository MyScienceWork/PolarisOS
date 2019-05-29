// @flow
const _ = require('lodash');
const moment = require('moment');
const Scheduler = require('./scheduler');
const Logger = require('../../logger');
const Errors = require('../exceptions/errors');
const EntitiesUtils = require('../utils/entities');
const EnvUtils = require('../utils/env');
const ConfigUtils = require('../utils/config');
const HandleAPI = require('../3rdparty/handle/api');
const SwordAPI = require('../entities/exporter/controllers/sword');
const Config = require('../../config');
const Throttle = require('promise-parallel-throttle');

class ApiScheduler extends Scheduler {
    /* constructor(interval: number) {
        super(interval);
    }*/

    async _execute_sitemap_creation() {

    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    async get_uploadable_publications() {
        return await EntitiesUtils.search_and_get_sources('publication', {
            where: {
                $and: [
                    { status: ['published'] },
                    { 'system.api.hal': false },
                    { 'diffusion.rights.exports.hal': true },
                ],
            },
            size: 100,
        });
    }

    async _execute_hal_export() {
        if (!EnvUtils.is_production()) {
            Logger.info('HAL API only runs in production mode');
            return;
        }

        const publications = await this.get_uploadable_publications();

        const exec_hal = async (p) => {
            // wait 10 seconds before each send to avoid HAL duplicates
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 60000);
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

        await Throttle.all(promises, {
            maxInProgress: 1,
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

    async _execute_data() {
        console.log('execute api scheduler');
        this._execute_handle_creation().then(() => {}).catch((err) => {
            Logger.error('Error when creating handles through scheduler');
            Logger.error(err);
        });
        this._execute_hal_export().then(() => {}).catch((err) => {
            Logger.error('Error when exporting to HAL using scheduler');
            Logger.error(err);
        });
        /* this._execute_sms_sending().then(() => {}).catch((err) => {
            Logger.error('Error when sending SMS through scheduler');
            Logger.error(err);
        });*/
    }
}

module.exports = ApiScheduler;
