const Vue = require('vue');
const Router = require('vue-router');
const Header = require('./components/themes/ined/parts/header/Header.vue');
const Footer = require('./components/themes/ined/parts/footer/Footer.vue');
const Home = require('./pages/home/Home.vue');
const Deposit = require('./pages/deposit/Deposit.vue');
const Browse = require('./pages/browse/Browse.vue');
const News = require('./pages/news/News.vue');

Vue.use(Router);

module.exports = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            components: {
                default: Home,
                header: Header,
                footer: Footer,
            }
        },
        {
            path: '/news',
            name: 'Actualités',
            components: {
                default: News,
                header: Header,
                footer: Footer,
            }
        },
        {
            path: '/browse',
            name: 'Consulter',
            components: {
                default: Browse,
                header: Header,
                footer: Footer,
            }
        },
        {
            path: '/deposit',
            name: 'Déposer',
            components: {
                default: Deposit,
                header: Header,
                footer: Footer,
            }
        },
        {
            path: '/help',
            name: 'Besoin d\'aide ?',
            components: {
                default: Home,
                header: Header,
                footer: Footer,
            }
        },
    ],
});
