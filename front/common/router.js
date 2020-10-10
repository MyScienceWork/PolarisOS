const _ = require('lodash');
const APIRoutes = require('./api/routes');
const Auth = require('./utils/auth');
const API = require('./api');

const Header = require('../frontend/components/themes/main/parts/header/Header.vue');
const Footer = require('../frontend/components/themes/main/parts/footer/Footer.vue');
const Meta = require('./meta/Meta.vue');
const Routes = require('./route_components');


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
    if (page.predefined_page in Routes) {
        return Routes[page.predefined_page];
    }
    return Routes.home;
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

    const common_routes = pages.map((page) => {
        let subaccess = Object.keys(page.global_access.subaccess);
        if (!subaccess) {
            subaccess = [];
        }

        const obj = {
            path: page.route,
            name: page.route,
            meta: {
                requiresAuth: page.global_access.access != null && page.global_access.access !== '',
                access: page.global_access.access,
                subaccess: subaccess.map((a) => {
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

    const workflow_routes = [{
        path: '/workflow/:id',
        name: 'f_nav_workflow',
        navbar: true,
        components: {
            default: get_default_component({ predefined_page: 'workflow_review' }),
            header: Header,
            footer: Footer,
        },
        meta: { requiresAuth: false, access: '', subaccess: [], page_id: 'workflow_page' },
    }];

    const routes = [...workflow_routes, ...common_routes];


    routes.push({
        path: '/login',
        name: 'f_nav_login',
        navbar: false,
        components: {
            default: get_default_component({ predefined_page: 'login' }),
        },
        meta: { requiresAuth: false, access: '', subaccess: [] },
    });

    routes.push({
        path: '/login/choice',
        name: 'f_nav_login_choice',
        navbar: false,
        components: {
            default: get_default_component({ predefined_page: 'login_choice' }),
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
