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
const LoginChoice = require('./pages/login_choice/LoginChoice.vue');
const Page = require('./pages/page/Page.vue');
const Menu = require('./pages/menu/Menu.vue');
const Widget = require('./pages/widget/Widget.vue');
const Template = require('./pages/template/Template.vue');
const Connector = require('./pages/connector/Connector.vue');
const Importer = require('./pages/importer/Importer.vue');
const Query = require('./pages/query/Query.vue');
const MailTemplate = require('./pages/mail_template/MailTemplate.vue');
const ChartConfiguration = require('./pages/chart_configuration/ChartConfiguration.vue');

module.exports.menu = [
    [
        {
            section: 'l_general_section',
            name: 'l_overview_page',
            access: 'overview',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'admin',
            routes: [Routes.admin],
            submenu: [],
            component: Overview,
        },
        {
            section: 'l_general_section',
            name: 'l_users_page',
            access: '',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'user',
            routes: [Routes.user],
            submenu: [],
            component: User,
        },
        {
            section: 'l_general_section',
            name: 'l_roles_page',
            access: '',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'role',
            routes: [Routes.role],
            submenu: [],
            component: Role,
        },
        {
            section: 'l_general_section',
            name: 'l_reviews_page',
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
            section: 'l_admin_section',
            name: 'l_entities_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'entity',
            routes: [Routes.entity],
            submenu: [],
            component: PEntity,
        },
        {
            section: 'l_admin_section',
            name: 'l_pipelines_page',
            access: 'pipeline',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'pipeline',
            routes: [Routes.pipeline],
            submenu: [],
            component: Pipeline,
        },
        {
            section: 'l_admin_section',
            name: 'l_forms_page',
            access: 'form',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'form',
            routes: [Routes.form],
            submenu: [],
            component: Form,
        },
        {
            section: 'l_admin_section',
            name: 'l_langs_page',
            access: 'lang',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'lang',
            routes: [Routes.lang],
            submenu: [],
            component: Lang,
        },
        {
            section: 'l_admin_section',
            name: 'l_queries_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'query',
            routes: [Routes.query],
            submenu: [],
            component: Query,
        },
        {
            section: 'l_admin_section',
            name: 'l_mails_page',
            access: 'mail_template',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'mail_template',
            routes: [Routes.mail_template],
            submenu: [],
            component: MailTemplate,
        },
        {
            section: 'l_admin_section',
            name: 'l_charts_page',
            access: 'chart',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'chart',
            routes: [Routes.chart],
            submenu: [],
            component: ChartConfiguration,
        },
    ],

    [
        {
            section: 'l_ui_ux_section',
            name: 'l_menus_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'menu',
            routes: [Routes.menu],
            submenu: [],
            component: Menu,
        },
        {
            section: 'l_ui_ux_section',
            name: 'l_templates_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'template',
            routes: [Routes.template],
            submenu: [],
            component: Template,
        },
        /* {
            section: 'l_ui_ux_section',
            name: 'l_widgets_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'widget',
            routes: [Routes.widget],
            submenu: [],
            component: Widget,
        },*/
        {
            section: 'l_ui_ux_section',
            name: 'l_pages_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'page',
            routes: [Routes.page],
            submenu: [],
            component: Page,
        },
    ],

    /* [
        {
            section: 'l_import_export_section',
            name: 'l_connectors_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'connector',
            routes: [Routes.connector],
            submenu: [],
            component: Connector,
        },
        {
            section: 'l_import_export_section',
            name: 'l_importers_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'importer',
            routes: [Routes.importer],
            submenu: [],
            component: Importer,
        },
        {
            section: 'l_import_export_section',
            name: 'l_exporters_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'exporter',
            routes: [Routes.exporter],
            submenu: [],
            component: Widget,
        },
    ],*/

    [
        {
            section: 'l_advanced_section',
            name: 'l_functions_page',
            access: '',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'function',
            routes: [Routes.function],
            submenu: [],
            component: PFunction,
        },
        {
            section: 'l_advanced_section',
            name: 'l_config_page',
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
    {
        access: '',
        subaccess: [],
        key: 'login-choice',
        routes: [Routes.login_choice],
        component: LoginChoice,
    },
];
