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

function localRemove(name) {
    localStorage.removeItem(name);
}

function getURLHost(location) {
    return `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;
}

function utf8ToB64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function getDefaultLanguage() {
    return localGet('default_lang') || 'EN';
}

function getQueryParams(query) {
    if (!query) {
        return { };
    }

    return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
        const [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
    }, { });
}

module.exports = {
    getFirstBrowserLanguage,
    normalizeBrowserLanguage,
    localGet,
    localSet,
    localRemove,
    getURLHost,
    utf8ToB64,
    getQueryParams,
    getDefaultLanguage,
};
