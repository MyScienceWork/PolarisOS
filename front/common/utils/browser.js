function getFirstBrowserLanguage() {
    const nav = window.navigator;
    const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        return nav.languages.find(language => language && language.length);
    }

    // support for other well known properties in browsers
    return browserLanguagePropertyKeys.find((val) => {
        const language = nav[val];
        return language && language.length;
    });
}

function normalizeBrowserLanguage(lang) {
    if (lang == null || lang === '') {
        return null;
    }
    return lang.split('-')[0].toUpperCase();
}

function localSet(name, value) {
    if (value instanceof Object) {
        localStorage.setItem(name, JSON.stringify(value));
    } else {
        localStorage.setItem(name, value);
    }
}

function localGet(name) {
    try {
        return JSON.parse(localStorage.getItem(name));
    } catch (err) {
        return localStorage.getItem(name);
    }
}

module.exports = {
    getFirstBrowserLanguage,
    normalizeBrowserLanguage,
    localGet,
    localSet,
};
