const Messages = require('../../common/api/messages');
const APIRoutes = require('../../common/api/routes');
const LangUtils = require('../../common/utils/lang');

const ENV = process.env.NODE_ENV || 'local';

module.exports = {
    name: 'App',
    beforeMount() {
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
            const default_lang = LangUtils.selectLanguage(config);
            lang_body.where.$and.push({ lang: default_lang });
            this.$store.state.interfaceLang = default_lang;
            this.$store.dispatch('grab_language', {
                path: lang_path,
                body: lang_body,
            });
        }).catch((err) => { console.log(err); });
    },
};
