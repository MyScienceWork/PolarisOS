const _ = require('lodash');

const Vue = require('vue');
const Router = require('vue-router');
const Header = require('./components/themes/main/parts/header/Header.vue');
const Footer = require('./components/themes/main/parts/footer/Footer.vue');
const Navbar = require('./components/themes/main/parts/navbar/Navbar.vue');
const Menus = require('./menus');

const Auth = require('../common/utils/auth');

Vue.use(Router);

const menu_routes = _.flatten(Menus.menu).map(menu => ({
    path: menu.routes[0],
    name: menu.key,
    components: {
        header: Header,
        footer: Footer,
        navbar: Navbar,
        default: menu.component,
    },
    props: { navbar: { menus: Menus.menu } },
    meta: { requiresAuth: menu.access !== '', access: menu.access, subaccess: menu.subaccess },
}));

const other_routes = Menus.other.map(menu => ({
    path: menu.routes[0],
    name: menu.key,
    components: {
        header: Header,
        footer: Footer,
        navbar: Navbar,
        default: menu.component,
    },
    props: { navbar: { menus: Menus.menu } },
    meta: { requiresAuth: menu.access !== '', access: menu.access, subaccess: menu.subaccess },
}));

const plain_routes = Menus.plain.map(menu => ({
    path: menu.routes[0],
    name: menu.key,
    components: {
        default: menu.component,
    },
    props: {},
    meta: { requiresAuth: menu.access !== '', access: menu.access, subaccess: menu.subaccess },
}));

const router = new Router({
    mode: 'history',
    routes: [...menu_routes, ...other_routes, ...plain_routes],
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        Auth.loggedIn(to.meta.access, to.meta.subaccess).then((ok) => {
            if (ok) {
                next();
            } else {
                next({
                    path: '/admin/login',
                    query: { redirect: to.fullPath },
                });
            }
        }).catch(() => {
            next({
                path: '/admin/login',
                query: { redirect: to.fullPath },
            });
        });
    } else {
        next(); // make sure to always call next()!
    }
});

module.exports = router;
