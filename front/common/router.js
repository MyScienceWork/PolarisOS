const _ = require('lodash');
const APIRoutes = require('./api/routes');
const Auth = require('./utils/auth');
const API = require('./api');

const Header = require('../frontend/components/themes/main/parts/header/Header.vue');
const Footer = require('../frontend/components/themes/main/parts/footer/Footer.vue');
const Meta = require('./meta/Meta.vue');

const Home = require('../frontend/pages/home/Home.vue');

const Deposit = require('../frontend/pages/deposit/Deposit.vue');
const Browse = require('../frontend/pages/browse/Browse.vue');
const Search = require('../frontend/pages/search/Search.vue');
const View = require('../frontend/pages/view/View.vue');
const Project = require('../frontend/pages/project/Project.vue');
const About = require('../frontend/pages/about/About.vue');
const Help = require('../frontend/pages/help/Help.vue');
const News = require('../frontend/pages/news/News.vue');

const UserProfile = require('../frontend/pages/user_profile/UserProfile.vue');
const UserFavorites = require('../frontend/pages/user_favorites/UserFavorites.vue');
const LoginView = require('../frontend/pages/login/Login.vue');

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
        return [-1, -1];
    }

    const elements = menu.elements;
    const idx = _.findIndex(elements, elt => elt.page === page._id);

    if (idx === -1) {
        const [pidx, cidx] = elements.reduce((arr, elt, i) => {
            if (!('submenus' in elt) || elt.submenus.length === 0) {
                return [-1, -1];
            }
            const ci = _.findIndex(elt.submenus, celt => (celt.page === page._id && !('$route' in celt)));
            if (arr.length === 0) {
                return [i, ci];
            } else if (arr[1] === -1) {
                return [i, ci];
            }
            return arr;
        }, []);
        return [pidx, cidx];
    }
    return [idx, -1];
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
    case '/u/:id/profile':
    case '/a/:id/profile':
        return UserProfile;
    case '/deposit':
        return Deposit;
    case '/about':
        return About;
    case '/help':
        return Help;
    case '/news':
        return News;
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
        const obj = {
            path: page.route,
            name: page.route,
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
                page_id: page._id,
            },
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

    menu.elements.forEach((elt) => {
        if (elt.submenus && elt.submenus.length > 0) {
            elt.submenus.forEach((celt) => {
                const idx = _.findIndex(routes, route => route.meta.page_id === celt.page);
                if (idx !== -1) {
                    celt.$route = routes[idx].path;
                }
            });
        } else {
            const idx = _.findIndex(routes, route => route.meta.page_id === elt.page);
            if (idx !== -1) {
                elt.$route = routes[idx].path;
            }
        }
    });

    return {
        menu,
        pages,
        routes,
    };
}

module.exports = {
    render_router,
};
