const Vue = require('vue');
const Router = require('vue-router');
const Header = require('./components/themes/ined/parts/header/Header.vue');
const Footer = require('./components/themes/ined/parts/footer/Footer.vue');
const Home = require('./pages/home/Home.vue');
const Deposit = require('./pages/deposit/Deposit.vue');
const Browse = require('./pages/browse/Browse.vue');
const Search = require('./pages/search/Search.vue');
const News = require('./pages/news/News.vue');
const View = require('./pages/view/View.vue');
const UserProfile = require('./pages/user_profile/UserProfile.vue');
const UserFavorites = require('./pages/user_favorites/UserFavorites.vue');
const Auth = require('../common/utils/auth');
const LoginView = require('./pages/login/Login.vue');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'f_nav_home',
            navbar: true,
            components: {
                default: Home,
                header: Header,
                footer: Footer,
            },
            meta: { requiresAuth: false, access: '', subaccess: [] },
        },
        {
            path: '/news',
            name: 'f_nav_about',
            navbar: true,
            components: {
                default: News,
                header: Header,
                footer: Footer,
            },
            meta: { requiresAuth: false, access: '', subaccess: [] },
        },
        {
            path: '/browse',
            name: 'f_nav_browse',
            navbar: true,
            components: {
                default: Browse,
                header: Header,
                footer: Footer,
            },
            meta: { requiresAuth: false, access: '', subaccess: [] },
        },
        {
            path: '/deposit',
            name: 'f_nav_deposit',
            navbar: true,
            components: {
                default: Deposit,
                header: Header,
                footer: Footer,
            },
            meta: { requiresAuth: true, access: 'publication', subaccess: ['c', 'u', 'd'] },
        },
        {
            path: '/help',
            name: 'f_nav_help',
            navbar: true,
            components: {
                default: Deposit,
                header: Header,
                footer: Footer,
            },
            meta: { requiresAuth: false, access: '', subaccess: [] },
        },
        {
            path: '/search',
            name: 'f_nav_search',
            navbar: false,
            components: {
                default: Search,
                header: Header,
                footer: Footer,
            },
            meta: { requiresAuth: true, access: 'item', subaccess: ['r'] },
        },
        {
            path: '/u/:id/profile',
            name: 'f_nav_user_profile',
            navbar: false,
            components: {
                default: UserProfile,
                header: Header,
                footer: Footer,
            },
            meta: { requiresAuth: true, access: 'user_profile', subaccess: ['c', 'r', 'u', 'd'] },
        },
        {
            path: '/u/:id/favorites',
            name: 'f_nav_user_favorites',
            navbar: false,
            components: {
                default: UserFavorites,
                header: Header,
                footer: Footer,
                meta: { requiresAuth: true, access: 'user_favorite', subaccess: ['c', 'r', 'u', 'd'] },
            },
        },
        {
            path: '/view/:id',
            name: 'f_nav_view',
            navbar: false,
            components: {
                default: View,
                header: Header,
                footer: Footer,
            },
            meta: { requiresAuth: true, access: 'item', subaccess: ['r'] },
        },
        {
            path: '/login',
            name: 'f_nav_login',
            navbar: false,
            components: {
                default: LoginView,
            },
            meta: { requiresAuth: false, access: '', subaccess: [] },
        },
    ],
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        Auth.loggedIn(to.meta.access, to.meta.subaccess).then((ok) => {
            if (ok) {
                next();
            } else {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath },
                });
            }
        }).catch(() => {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        });
    } else {
        next(); // make sure to always call next()!
    }
});

module.exports = router;
