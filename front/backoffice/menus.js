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
//const Review = require('./pages/review/Review.vue');
const Login = require('./pages/login/Login.vue');
const LoginChoice = require('./pages/login_choice/LoginChoice.vue');
const Page = require('./pages/page/Page.vue');
const Menu = require('./pages/menu/Menu.vue');
const Widget = require('./pages/widget/Widget.vue');
const Template = require('./pages/template/Template.vue');
//const Connector = require('./pages/connector/Connector.vue');
//const Importer = require('./pages/importer/Importer.vue');
const Query = require('./pages/query/Query.vue');
const MailTemplate = require('./pages/mail_template/MailTemplate.vue');
const ChartConfiguration = require('./pages/chart_configuration/ChartConfiguration.vue');
const Masas = require('./pages/masas/Masas.vue');
const Workflow = require('./pages/workflow/Workflow.vue');

module.exports.menu = [
    [
        {
            section: 'l_general_section',
            name: 'l_overview_page',
            access: 'back-overview',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'admin',
            routes: [Routes.admin],
            submenu: [],
            component: Overview,
            intro: 'l_backoffice_overview_menu_help',
        },
        {
            section: 'l_general_section',
            name: 'l_users_page',
            access: 'back-account',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'user',
            routes: [Routes.user],
            submenu: [],
            component: User,
            intro: 'l_backoffice_user_menu_help',
        },
        {
            section: 'l_general_section',
            name: 'l_roles_page',
            access: 'back-role',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'role',
            routes: [Routes.role],
            submenu: [],
            component: Role,
            intro: 'l_backoffice_role_menu_help',
        },
        /*
        {
            section: 'l_general_section',
            name: 'l_reviews_page',
            access: 'back-review',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'review',
            routes: [Routes.review],
            submenu: [],
            component: Review,
            intro: 'l_backoffice_review_menu_help',
        },
        */
        /*
        {
            section: 'l_general_section',
            name: 'l_masas_page',
            access: 'back-masas',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'review',
            routes: [Routes.masas],
            submenu: [],
            component: Masas,
            intro: 'l_backoffice_masas_menu_help',
        },*/
    ],

    [
        {
            section: 'l_admin_section',
            name: 'l_workflow_page',
            access: 'back-workflow',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'workflow',
            routes: [Routes.workflow],
            submenu: [],
            component: Workflow,
            intro: 'l_backoffice_workflow_menu_help',
        },
        {
            section: 'l_admin_section',
            name: 'l_entities_page',
            access: 'back-entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'entity',
            routes: [Routes.entity],
            submenu: [],
            component: PEntity,
            intro: 'l_backoffice_entity_menu_help',
        },
        {
            section: 'l_admin_section',
            name: 'l_pipelines_page',
            access: 'back-pipeline',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'pipeline',
            routes: [Routes.pipeline],
            submenu: [],
            component: Pipeline,
            intro: 'l_backoffice_pipeline_menu_help',
        },
        {
            section: 'l_admin_section',
            name: 'l_forms_page',
            access: 'back-form',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'form',
            routes: [Routes.form],
            submenu: [],
            component: Form,
            intro: 'l_backoffice_form_menu_help',
        },
        {
            section: 'l_admin_section',
            name: 'l_langs_page',
            access: 'back-lang',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'lang',
            routes: [Routes.lang],
            submenu: [],
            component: Lang,
            intro: 'l_backoffice_lang_menu_help',
        },
        {
            section: 'l_admin_section',
            name: 'l_queries_page',
            access: 'back-query',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'query',
            routes: [Routes.query],
            submenu: [],
            component: Query,
            intro: 'l_backoffice_query_menu_help',
        },
        {
            section: 'l_admin_section',
            name: 'l_mails_page',
            access: 'back-email-template',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'mail_template',
            routes: [Routes.mail_template],
            submenu: [],
            component: MailTemplate,
            intro: 'l_backoffice_mail_template_menu_help',
        },
        {
            section: 'l_admin_section',
            name: 'l_charts_page',
            access: 'back-chart',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'chart',
            routes: [Routes.chart],
            submenu: [],
            component: ChartConfiguration,
            intro: 'l_backoffice_chart_menu_help',
        },
    ],

    [
        {
            section: 'l_ui_ux_section',
            name: 'l_menus_page',
            access: 'back-menu',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'menu',
            routes: [Routes.menu],
            submenu: [],
            component: Menu,
            intro: 'l_backoffice_menu_menu_help',
        },
        {
            section: 'l_ui_ux_section',
            name: 'l_templates_page',
            access: 'back-template',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'template',
            routes: [Routes.template],
            submenu: [],
            component: Template,
            intro: 'l_backoffice_template_menu_help',
        },
        {
            section: 'l_ui_ux_section',
            name: 'l_widgets_page',
            access: 'entity',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'widget',
            routes: [Routes.widget],
            submenu: [],
            component: Widget,
        },
        {
            section: 'l_ui_ux_section',
            name: 'l_pages_page',
            access: 'back-page',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'page',
            routes: [Routes.page],
            submenu: [],
            component: Page,
            intro: 'l_backoffice_page_menu_help',
        },
    ],
    /*
     [
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
    ],
    */
    [
        {
            section: 'l_advanced_section',
            name: 'l_functions_page',
            access: 'back-function',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'function',
            routes: [Routes.function],
            submenu: [],
            component: PFunction,
            intro: 'l_backoffice_function_menu_help',
        },
        {
            section: 'l_advanced_section',
            name: 'l_config_page',
            access: 'back-config',
            subaccess: ['c', 'r', 'u', 'd'],
            key: 'config',
            routes: [Routes.config],
            submenu: [],
            component: Config,
            intro: 'l_backoffice_config_menu_help',
        },
    ],
];

module.exports.other = [
    {
        key: 'entity_view',
        routes: [Routes.entity_view],
        component: EntityView,
        access: 'back-entity',
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
