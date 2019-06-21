// @flow
const Logger = require('../../logger');

class Scheduler {
    _interval: number;

    constructor(interval: number) {
        this._interval = interval;
        this.run();
    }

    async _execute_data() {
    }

    _wrapper() {
        this._execute_data()
            .then(() => {})
            .catch((err) => { Logger.error('Error with scheduler'); Logger.error(err); });
    }

    run() {
        this._wrapper();
        setInterval(this._wrapper.bind(this), this._interval);
    }
}

module.exports = Scheduler;
