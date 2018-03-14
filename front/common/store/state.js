const BrowserUtils = require('../utils/browser');

module.exports = {
    loading: false,
    success: false,
    content: [],
    error: false,
    error_type: '',
    browserLanguage: BrowserUtils.normalizeBrowserLanguage(BrowserUtils.getFirstBrowserLanguage()),
    interfaceLang: null,
    lang_content: {},
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
