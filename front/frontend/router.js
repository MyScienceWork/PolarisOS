const Vue = require('vue');
const Router = require('vue-router');
const Header = require('./components/themes/ined/parts/header/Header.vue');
const Footer = require('./components/themes/ined/parts/footer/Footer.vue');
const Home = require('./pages/home/Home.vue');
const Deposit = require('./pages/deposit/Deposit.vue');
const Browse = require('./pages/browse/Browse.vue');
const Search = require('./pages/search/Search.vue');
const News = require('./pages/news/News.vue');
const UserProfile = require('./pages/user_profile/UserProfile.vue');
const UserFavorites = require('./pages/user_favorites/UserFavorites.vue');

Vue.use(Router);

module.exports = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            navbar: true,
            components: {
                default: Home,
                header: Header,
                footer: Footer,
            },
        },
        {
            path: '/news',
            name: 'A propos',
            navbar: true,
            components: {
                default: News,
                header: Header,
                footer: Footer,
            },
        },
        {
            path: '/browse',
            name: 'Consulter',
            navbar: true,
            components: {
                default: Browse,
                header: Header,
                footer: Footer,
            },
        },
        {
            path: '/deposit',
            name: 'Déposer',
            navbar: true,
            components: {
                default: Deposit,
                header: Header,
                footer: Footer,
            },
        },
        {
            path: '/help',
            name: 'Besoin d\'aide ?',
            navbar: true,
            components: {
                default: Deposit,
                header: Header,
                footer: Footer,
            },
        },
        {
            path: '/search',
            name: 'Recherche',
            navbar: false,
            components: {
                default: Search,
                header: Header,
                footer: Footer,
            },
        },
        {
            path: '/u/:id/profile',
            name: 'User Profile',
            navbar: false,
            components: {
                default: UserProfile,
                header: Header,
                footer: Footer,
            },
        },
        {
            path: '/u/:id/favorites',
            name: 'User Favorites',
            navbar: false,
            components: {
                default: UserFavorites,
                header: Header,
                footer: Footer,
            },
        },
    ],
});
