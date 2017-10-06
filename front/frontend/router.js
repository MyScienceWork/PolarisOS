const Vue = require('vue');
const Router = require('vue-router');
const Home = require('./pages/home/Home.vue');

Vue.use(Router);

module.exports = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
    ],
});
