const Vue = require('vue');
const Messages = require('../../common/api/messages');
const APIRoutes = require('../../common/api/routes');
const Browser = require('../../common/utils/browser');

const ENV = process.env.NODE_ENV || 'local';


function configure_app($store) {
    const config_path = APIRoutes.entity('config', 'POST', true);
    const config_body = {
        size: 1,
        where: {
            environment: ENV,
        },
    };

    const lang_path = APIRoutes.entity('lang', 'POST', true);
    const lang_body = {
        size: 10000,
        where: {
            $and: [{ 'parts.value': 'frontoffice' }],
        },
    };

    const promise_config = $store.dispatch('grab_config', {
        path: config_path,
        body: config_body,
    });

    promise_config.then(() => {
        const config = $store.state.global_config;
        if (!('langs' in config)) {
            return;
        }


        let default_lang = Browser.localGet('default_lang');

        if (default_lang == null) {
            default_lang = config.langs.find(
                    v => v.value.toLowerCase() === $store.state.browserLanguage.toLowerCase());

            if (default_lang === undefined) {
                default_lang = config.langs[0].value;
            } else {
                default_lang = default_lang.value;
            }
        }

        lang_body.where.$and.push({ lang: default_lang });
        $store.state.interfaceLang = default_lang;
        $store.dispatch('grab_language', {
            path: lang_path,
            body: lang_body,
        });
    }).catch((err) => { console.log(err); });
}

module.exports = {
    props: {
        pages: { type: Array, required: true },
    },
    name: 'App',
    beforeMount() {
        configure_app(this.$store);
        this.$store.commit(Messages.SET_PAGES, { pages: this.pages });
    },
};
