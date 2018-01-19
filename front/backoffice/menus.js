module.exports = {};
const Routes = require('./routes');
const Home = require('./pages/home/Home.vue');
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
            component: Home,
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
            component: Home,
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
