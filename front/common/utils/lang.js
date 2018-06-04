const Browser = require('./browser');

function grabLanguageFromLocalStorage() {
    return Browser.localGet('default_lang');
}

function storeLanguageToLocalStorage(lang) {
    Browser.localSet('default_lang', lang);
}

function getBrowserLanguage() {
    return Browser.normalizeBrowserLanguage(Browser.getFirstBrowserLanguage());
}

function selectLanguage(config) {
    const browser_language = getBrowserLanguage();
    const local_language = grabLanguageFromLocalStorage();

    let default_lang = local_language;
    if (default_lang == null) {
        default_lang = config.langs.find(
            v => v.value.toLowerCase() === browser_language.toLowerCase());

        if (default_lang === undefined) {
            default_lang = config.langs[0].value;
        } else {
            default_lang = default_lang.value;
        }
    }

    storeLanguageToLocalStorage(default_lang);
    return default_lang;
}

module.exports = {
    grabLanguageFromLocalStorage,
    storeLanguageToLocalStorage,
    getBrowserLanguage,
    selectLanguage,
};
