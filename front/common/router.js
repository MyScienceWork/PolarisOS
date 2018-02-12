const _ = require('lodash');
const APIRoutes = require('./api/routes');
const Auth = require('./utils/auth');
const API = require('./api');

const Header = require('../frontend/components/themes/ined/parts/header/Header.vue');
const Footer = require('../frontend/components/themes/ined/parts/footer/Footer.vue');
const Meta = require('./meta/Meta.vue');

const Home = require('../frontend/pages/home/Home.vue');
const Deposit = require('../frontend/pages/deposit/Deposit.vue');
const Browse = require('../frontend/pages/browse/Browse.vue');
const Search = require('../frontend/pages/search/Search.vue');
const View = require('../frontend/pages/view/View.vue');
const UserProfile = require('../frontend/pages/user_profile/UserProfile.vue');
const UserFavorites = require('../frontend/pages/user_favorites/UserFavorites.vue');
const LoginView = require('../frontend/pages/login/Login.vue');
const Project = require('../frontend/pages/project/Project.vue');

function fetch_page() {
    const method = 'GET';
    const path = APIRoutes.entity('page', method, false, null, '', 'header.rows.widgets._id,main.rows.widgets._id,footer.rows.widgets._id');
    const commit = (i, e) => [i, e];

    const payload = {
        path,
        method,
        commit,
        signature: Auth.get_api_headers(method, path),
    };

    return API.fetch(payload);
}

function fetch_menu(part) {
    const method = 'POST';
    const path = APIRoutes.entity('menu', method, true);
    const commit = (i, e) => [i, e];

    const payload = {
        path,
        method,
        commit,
        body: {
            size: 1,
            where: {
                part,
            },
        },
        signature: Auth.get_api_headers(method, path),
    };

    return API.fetch(payload);
}

function get_menu_item(menu, page) {
    if (!('elements' in menu)) {
        return -1;
    }

    const elements = menu.elements;
    return _.findIndex(elements, elt => elt.page === page._id);
}

function get_default_component(page) {
    switch (page.route) {
    default:
    case '/':
        return Home;
    case '/browse':
        return Browse;
    case '/search':
        return Search;
    case '/project':
        return Project;
    case '/view/:id':
        return View;
    case '/deposit':
        return Deposit;
    }
}

async function render_router(part) {
    const cpages = await fetch_page();
    const cmenus = await fetch_menu(part);
    let pages = [];
    let menu = {};
    if ('type' in cpages && cpages.type === 'success') {
        pages = cpages.content.result.hits.map(hit => hit.source);
    }

    if ('type' in cmenus && cmenus.type === 'success' && cmenus.content.result.hits.length > 0) {
        menu = cmenus.content.result.hits[0].source;
    }

    const routes = pages.map((page) => {
        const menu_item = get_menu_item(menu, page);
        const obj = {
            path: page.route,
            name: menu_item !== -1 ? menu.elements[menu_item].name : page.name,
            meta: {
                requiresAuth: page.global_access.access != null && page.global_access.access !== '',
                access: page.global_access.access,
                subaccess: Object.keys(page.global_access.subaccess).map((a) => {
                    const val = page.global_access.subaccess[a];
                    if (val) {
                        return a;
                    }
                    return null;
                }).filter(a => a != null),
                menu_item,
            },
            navbar: menu_item !== -1,
            components: {
                default: /* Meta,*/ get_default_component(page),
                header: Header,
                footer: Footer,
            },
        };
        return obj;
    });


    routes.push({
        path: '/login',
        name: 'f_nav_login',
        navbar: false,
        components: {
            default: LoginView,
        },
        meta: { requiresAuth: false, access: '', subaccess: [] },
    });

    routes.sort((r1, r2) => r1.meta.menu_item - r2.meta.menu_item);

    return {
        menu,
        pages,
        routes,
    };
}

module.exports = {
    render_router,
};
