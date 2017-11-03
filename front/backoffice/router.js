const _ = require('lodash');

const Vue = require('vue');
const Router = require('vue-router');
const Header = require('./components/themes/ined/parts/header/Header.vue');
const Footer = require('./components/themes/ined/parts/footer/Footer.vue');
const Navbar = require('./components/themes/ined/parts/navbar/Navbar.vue');
const Menus = require('./menus');

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
}));

module.exports = new Router({
    mode: 'history',
    routes: [...menu_routes, ...other_routes],
});
