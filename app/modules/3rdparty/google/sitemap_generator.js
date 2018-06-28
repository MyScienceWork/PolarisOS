// @flow

const ConfigUtils = require('../../utils/config');

async function get_google_config(): Promise<?Object> {
    const myconfig = await ConfigUtils.get_config();
    if (!myconfig || !('api' in myconfig) || !('google' in myconfig.api)) {
        return null;
    }
    return myconfig.api.google;
}

module.exports = {
    get_google_config,
};
