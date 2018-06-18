// @flow
const _ = require('lodash');
const moment = require('moment');
const Scheduler = require('./scheduler');
const Logger = require('../../logger');
const Errors = require('../exceptions/errors');

class AppScheduler extends Scheduler {
    constructor(interval: number) {
        super(interval);
    }

    async _execute_data() {
        /* this._execute_sms_sending().then(() => {}).catch((err) => {
            Logger.error('Error when sending SMS through scheduler');
            Logger.error(err);
        });*/
    }
}

module.exports = AppScheduler;
