const Vue = require('vue');
const Router = require('vue-router');
const Header = require('./components/themes/ined/parts/header/Header.vue');
const Footer = require('./components/themes/ined/parts/footer/Footer.vue');
const Home = require('./pages/home/Home.vue');
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
            name: 'News',
            components: {
                default: News,
                header: Header,
                footer: Footer,
            }
        },
        {
            path: '/browse',
            name: 'Browse',
            components: {
                default: Home,
                header: Header,
                footer: Footer,
            }
        },
        {
            path: '/deposit',
            name: 'Deposit',
            components: {
                default: Home,
                header: Header,
                footer: Footer,
            }
        },
        {
            path: '/help',
            name: 'Help',
            components: {
                default: Home,
                header: Header,
                footer: Footer,
            }
        },
    ],
});
