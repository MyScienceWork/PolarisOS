module.exports = {};
const Routes = require('./routes');
const Home = require('./pages/home/Home.vue');
const User = require('./pages/user/User.vue');
const Config = require('./pages/config/Config.vue');
const Lang = require('./pages/lang/Lang.vue');
const Form = require('./pages/form/Form.vue');
const MenuComponent = require('./pages/menu/Menu.vue');
const Datasource = require('./pages/datasource/Datasource.vue');
const Datainstance = require('./pages/datainstance/Datainstance.vue');


module.exports.menu = [
    [
        {
            section: 'General',
            name: 'Overview',
            access: '',
            key: 'admin',
            routes: [Routes.admin],
            submenu: [],
            component: Home,
        },
        {
            section: 'General',
            name: 'Users',
            access: '',
            key: 'user',
            routes: [Routes.user],
            submenu: [],
            component: User,
        },
        {
            section: 'General',
            name: 'Reviews',
            access: '',
            key: 'review',
            routes: [Routes.review],
            submenu: [],
            component: Home,
        },
    ],

    [
        {
            section: 'Administration',
            name: 'Data sources',
            access: '',
            key: 'datasource',
            routes: [Routes.datasource],
            submenu: [],
            component: Datasource,
        },
        {
            section: 'Administration',
            name: 'Publications',
            access: '',
            key: 'publication',
            routes: [Routes.publication],
            submenu: [],
            component: Home,
        },
        {
            section: 'Administration',
            name: 'CSL Management',
            access: '',
            key: 'csl',
            routes: [Routes.csl],
            submenu: [],
            component: Home,
        },
        {
            section: 'Administration',
            name: 'Menus',
            access: '',
            key: 'menu',
            routes: [Routes.menu],
            submenu: [],
            component: MenuComponent,
        },
        {
            section: 'Administration',
            name: 'Forms',
            access: '',
            key: 'form',
            routes: [Routes.form],
            submenu: [],
            component: Form,
        },
        {
            section: 'Administration',
            name: 'Langs',
            access: '',
            key: 'lang',
            routes: [Routes.lang],
            submenu: [],
            component: Lang,
        },
    ],

    [
        {
            section: 'Advanced',
            name: 'External repositories',
            access: '',
            key: 'external-repo',
            routes: [Routes.external_repo],
            submenu: [],
            component: Home,
        },
        {
            section: 'Advanced',
            name: 'Export formats',
            access: '',
            key: 'export-format',
            routes: [Routes.export_format],
            submenu: [],
            component: Home,
        },
        {
            section: 'Advanced',
            name: 'Handle ID Management',
            access: '',
            key: 'handleid',
            routes: [Routes.handle_id],
            submenu: [],
            component: Home,
        },
        {
            section: 'Advanced',
            name: 'API Management',
            access: '',
            key: 'api',
            routes: [Routes.api],
            submenu: [],
            component: Home,
        },
        {
            section: 'Advanced',
            name: 'Config',
            access: '',
            key: 'config',
            routes: [Routes.config],
            submenu: [],
            component: Config,
        },
    ],
];

module.exports.other = [
    {
        key: 'datasource_typology',
        routes: [Routes.datainstance],
        component: Datainstance,
    },
];
