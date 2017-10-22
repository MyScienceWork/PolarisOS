module.exports = {};
const Routes = require('./routes');
const Home = require('./pages/home/Home.vue');


module.exports.menu = [
    {
        name: 'Overview',
        access: '',
        key: 'admin',
        routes: [Routes.admin],
        submenu: [],
        component: Home,
    },
];
