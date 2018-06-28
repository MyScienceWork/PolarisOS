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
const Config = require('../../config');
const Throttle = require('promise-parallel-throttle');

class ApiScheduler extends Scheduler {
    /* constructor(interval: number) {
        super(interval);
    }*/

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
                    //{ 'system.api.handle': false },
                ],
            },
            size: 1,
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
        /* this._execute_sms_sending().then(() => {}).catch((err) => {
            Logger.error('Error when sending SMS through scheduler');
            Logger.error(err);
        });*/
    }
}

module.exports = ApiScheduler;
