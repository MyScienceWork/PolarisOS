const BrowserUtils = require('../utils/browser');
const Cache = require('../../../app/modules/utils/cache');

module.exports = {
    browserLanguage: BrowserUtils.normalizeBrowserLanguage(BrowserUtils.getFirstBrowserLanguage()),
    interfaceLang: null,
    lang_content: {},
    language_cache: new Cache(),
    global_config: {},
    datasources: {},
    requests: [],
    forms: {
        /* form_name: {error: {}, content: {}, update: false/true}*/
    },
    login_status: 'na',
    interface: {
        pages: [],
    },
};
