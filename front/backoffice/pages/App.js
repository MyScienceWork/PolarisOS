const Vue = require('vue');
const Messages = require('../../common/api/messages');
const APIRoutes = require('../../common/api/routes');

const ENV = process.env.NODE_ENV || 'local';

module.exports = {
    name: 'App',
    beforeMount() {
        const config_path = APIRoutes.entity('config', 'POST', true);
        console.log(ENV);
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
                $and: [{ 'parts.value': 'backoffice' }],
            },
        };

        const promise_config = this.$store.dispatch('grab_config', {
            path: config_path,
            body: config_body,
        });

        promise_config.then(() => {
            const config = this.$store.state.global_config;
            if (!('langs' in config)) {
                return;
            }
            let default_lang = config.langs.find(
                v => v.value.toLowerCase() === this.$store.state.browserLanguage.toLowerCase());
            if (default_lang === undefined) {
                default_lang = config.langs[0].value;
            } else {
                default_lang = default_lang.value;
            }

            lang_body.where.$and.push({ lang: default_lang });
            this.$store.state.interfaceLang = default_lang;
            this.$store.dispatch('grab_language', {
                path: lang_path,
                body: lang_body,
            });
        }).catch((err) => { console.log(err); });
    },
};
