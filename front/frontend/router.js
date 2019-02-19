const Vue = require('vue');
const Router = require('vue-router');
const Auth = require('../common/utils/auth');
const Browser = require('../common/utils/browser');

Vue.use(Router);


function my_router(routes) {
    const router = new Router({
        mode: 'history',
        routes,
    });

    router.beforeEach((to, from, next) => {
        // override default language
        if (to.query && to.query.lang) {
            Browser.localSet('default_lang', to.query.lang.toUpperCase());
        }
        if (to.matched.some(record => record.meta.requiresAuth)) {
            Auth.loggedIn(to.meta.access, to.meta.subaccess).then((ok) => {
                if (ok) {
                    next();
                } else {
                    next({
                        path: '/login/choice',
                        query: { redirect: to.fullPath },
                    });
                }
            }).catch(() => {
                next({
                    path: '/login/choice',
                    query: { redirect: to.fullPath },
                });
            });
        } else {
            next(); // make sure to always call next()!
        }
    });
    return router;
}


module.exports = my_router;
