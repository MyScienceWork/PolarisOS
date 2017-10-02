const Vue = require('vue');
const Router = require('vue-router');
const Home = require('./pages/home/Home.vue');
const Meta = require('./pages/meta/Meta.vue');

Vue.use(Router);

module.exports = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/:type/:mac',
            name: 'Device',
            component: Meta,
            props: true,
        },
    ],
});
