const BrowserUtils = require('../utils/browser');

module.exports = {
    loading: false,
    success: false,
    content: [],
    error: false,
    error_type: '',
    browserLanguage: BrowserUtils.normalizeBrowserLanguage(BrowserUtils.getFirstBrowserLanguage()),
    reconnectionIntervalMs: 5000,
    interfaceLang: null,
};
