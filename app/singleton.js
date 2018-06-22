// @flow
const Config = require('./config');
const APIScheduler = require('./modules/scheduler/api_scheduler');
const AppScheduler = require('./modules/scheduler/app_scheduler');

class App {
    _app_scheduler: AppScheduler;
    _api_scheduler: APIScheduler;
    constructor() {
        this._app_scheduler = new AppScheduler(Config.scheduler.app.interval);
        this._api_scheduler = new APIScheduler(Config.scheduler.api.interval);
    }
}

module.exports = App;
