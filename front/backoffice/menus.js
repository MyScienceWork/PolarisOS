module.exports = {};
const Routes = require('./routes');
const Overview = require('./pages/overview/Overview.vue');
const User = require('./pages/user/User.vue');
const Role = require('./pages/role/Role.vue');
const Config = require('./pages/config/Config.vue');
const Lang = require('./pages/lang/Lang.vue');
const Form = require('./pages/form/Form.vue');
const EntityView = require('./pages/entity_view/EntityView.vue');
const Pipeline = require('./pages/pipeline/Pipeline.vue');
const PFunction = require('./pages/function/Function.vue');
const PEntity = require('./pages/entity/Entity.vue');
const Review = require('./pages/review/Review.vue');
const Login = require('./pages/login/Login.vue');
const Page = require('./pages/page/Page.vue');
const Menu = require('./pages/menu/Menu.vue');
const Widget = require('./pages/widget/Widget.vue');
const Template = require('./pages/template/Template.vue');
const Connector = require('./pages/connector/Connector.vue');
const Importer = require('./pages/importer/Importer.vue');
const Query = require('./pages/query/Query.vue');

module.exports.menu = [
    [
        {
            section: 'General',
            name: 'Overview',
            access: 'overview',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'admin',
            routes: [Routes.admin],
            submenu: [],
            component: Overview,
        },
        {
            section: 'General',
            name: 'Users',
            access: '',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'user',
            routes: [Routes.user],
            submenu: [],
            component: User,
        },
        {
            section: 'General',
            name: 'Roles',
            access: '',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'role',
            routes: [Routes.role],
            submenu: [],
            component: Role,
        },
        {
            section: 'General',
            name: 'Reviews',
            access: 'publication',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'review',
            routes: [Routes.review],
            submenu: [],
            component: Review,
        },
    ],

    [
        {
            section: 'Administration',
            name: 'Entities',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'entity',
            routes: [Routes.entity],
            submenu: [],
            component: PEntity,
        },
        {
            section: 'Administration',
            name: 'Pipelines',
            access: 'pipeline',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'pipeline',
            routes: [Routes.pipeline],
            submenu: [],
            component: Pipeline,
        },
        {
            section: 'Administration',
            name: 'Forms',
            access: 'form',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'form',
            routes: [Routes.form],
            submenu: [],
            component: Form,
        },
        {
            section: 'Administration',
            name: 'Langs',
            access: 'lang',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'lang',
            routes: [Routes.lang],
            submenu: [],
            component: Lang,
        },
        {
            section: 'Administration',
            name: 'Queries',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'query',
            routes: [Routes.query],
            submenu: [],
            component: Query,
        },
    ],

    [
        {
            section: 'UI / UX',
            name: 'Menus',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'menu',
            routes: [Routes.menu],
            submenu: [],
            component: Menu,
        },
        {
            section: 'UI / UX',
            name: 'Templates',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'template',
            routes: [Routes.template],
            submenu: [],
            component: Template,
        },
        {
            section: 'UI / UX',
            name: 'Widgets',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'widget',
            routes: [Routes.widget],
            submenu: [],
            component: Widget,
        },
        {
            section: 'UI / UX',
            name: 'Pages',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'page',
            routes: [Routes.page],
            submenu: [],
            component: Page,
        },
    ],

    [
        {
            section: 'Import / Export',
            name: 'Connectors',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'connector',
            routes: [Routes.connector],
            submenu: [],
            component: Connector,
        },
        {
            section: 'Import / Export',
            name: 'Importers',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'importer',
            routes: [Routes.importer],
            submenu: [],
            component: Importer,
        },
        {
            section: 'Import / Export',
            name: 'Exporters',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'exporter',
            routes: [Routes.exporter],
            submenu: [],
            component: Widget,
        },
    ],

    [
        {
            section: 'Advanced',
            name: 'Functions',
            access: '',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'function',
            routes: [Routes.function],
            submenu: [],
            component: PFunction,
        },
        {
            section: 'Advanced',
            name: 'API Management',
            access: '',
            key: 'api',
            routes: [Routes.api],
            submenu: [],
            component: Overview,
        },
        {
            section: 'Advanced',
            name: 'Config',
            access: 'config',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'config',
            routes: [Routes.config],
            submenu: [],
            component: Config,
        },
    ],
];

module.exports.other = [
    {
        key: 'entity_view',
        routes: [Routes.entity_view],
        component: EntityView,
        access: 'entity',
        subaccess: ['c', 'r', 'u', 'd'],
    },
];

module.exports.plain = [
    {
        access: '',
        subaccess: [],
        key: 'login',
        routes: [Routes.login],
        component: Login,
    },
];
