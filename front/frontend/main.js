require('babel-polyfill'); // For very very old browser
const Vue = require('vue');
const Buefy = require('buefy');
const VueWysiwyg = require('vue-wysiwyg');
const RouterRenderer = require('../common/router');
const router = require('./router');
const store = require('../common/store');
const _ = require('lodash');
const SocialSharing = require('vue-social-sharing');
const VueScrollTo = require('vue-scrollto');
const moment = require('moment');
const BrowserUtils = require('../common/utils/browser');


const Loader = require('./components/loader/Loader.vue');
const Stepper = require('../common/components/main/stepper/Stepper.vue');
const Input = require('../common/components/main/forms/elements/input/Input.vue');
const ColorInput = require('../common/components/main/forms/elements/color/Color.vue');
const Select = require('../common/components/main/forms/elements/select/Select.vue');
const Static = require('../common/components/main/forms/elements/static/Static.vue');
const VariadicElement = require('../common/components/main/forms/elements/variadic_element/VariadicElement.vue');
const Form = require('../common/components/main/forms/form/Form.vue');
const DynamicForm = require('../common/components/main/forms/dynamic_form/DynamicForm.vue');
const Paginator = require('../common/components/main/paginator/Paginator.vue');
const Dropzone = require('../common/components/main/forms/dropzone/Dropzone.vue');
const HierarchicalSelect = require('../common/components/main/forms/elements/hierarchical_select/HierarchicalSelect.vue');
const Card = require('../common/components/main/card/Card.vue');
const Widget = require('../common/components/main/widget/Widget.vue');
const LoginLang = require('../common/components/main/login_lang/LoginLang.vue');
const LoginChoice = require('../common/components/main/login_choice/LoginChoice.vue');
const RSSC = require('../common/components/main/rss/RSS.vue');
const BibliographicExport = require('../common/components/main/bibliographic_export/BibliographicExport.vue');

const Indexer = require('../common/components/main/indexer/Indexer.vue');
const HierarchicalStructure = require('../common/components/main/forms/elements/hierarchical_structure/HierarchicalStructure.vue');
const AggregateForm = require('../common/components/main/forms/aggregate_form/AggregateForm.vue');

// Widgets
const SearchWidget = require('./components/themes/main/widgets/search_widget/SearchWidget.vue');
const BrowseWidget = require('./components/themes/main/widgets/browse_widget/BrowseWidget.vue');
const NavWidget = require('./components/themes/main/widgets/nav_widget/NavWidget.vue');
const TextWidget = require('./components/themes/main/widgets/text_widget/TextWidget.vue');
const ListWidget = require('./components/themes/main/widgets/list_widget/ListWidget.vue');
const StatsWidget = require('./components/themes/main/widgets/stats_widget/StatsWidget.vue');
const AlternativeWidget = require('./components/themes/main/widgets/alternative_widget/AlternativeWidget.vue');
const MediaWidget = require('./components/themes/main/widgets/media_widget/MediaWidget.vue');


const App = require('./pages/App.vue');


const LOCALE = BrowserUtils.getDefaultLanguage();
moment.locale(LOCALE.toLowerCase());

Object.defineProperty(Vue.prototype, '$lodash', { value: _ });

Vue.use(VueScrollTo);
Vue.use(SocialSharing);

Vue.use(Buefy.default, {
    defaultIconPack: 'fa',
});

Vue.use(VueWysiwyg.default, {
    hideModules: { image: true },
});

Vue.component('loader', Loader);
Vue.component('stepper', Stepper);
Vue.component('fform', Form);
Vue.component('finput', Input);
Vue.component('fcolor', ColorInput);
Vue.component('fselect', Select);
Vue.component('fstatic', Static);
Vue.component('fdropzone', Dropzone);
Vue.component('fhselect', HierarchicalSelect);
Vue.component('fvariadic-element', VariadicElement);
Vue.component('faggregate-form', AggregateForm);
Vue.component('dynamic-form', DynamicForm);
Vue.component('indexer', Indexer);
Vue.component('paginator', Paginator);
Vue.component('hierarchical-structure', HierarchicalStructure);
Vue.component('card', Card);
Vue.component('widget', Widget);
Vue.component('login-lang', LoginLang);
Vue.component('login-choice', LoginChoice);
Vue.component('rss-feed-icon', RSSC);
Vue.component('bibliographic-export', BibliographicExport);

// Widgets
Vue.component('widget-search', SearchWidget);
Vue.component('widget-browse', BrowseWidget);
Vue.component('widget-nav', NavWidget);
Vue.component('widget-text', TextWidget);
Vue.component('widget-list', ListWidget);
Vue.component('widget-stats', StatsWidget);
Vue.component('widget-alternative', AlternativeWidget);
Vue.component('widget-media', MediaWidget);


RouterRenderer.render_router('frontoffice').then((result) => {
    new Vue({
        el: '#app',
        store,
        router: router(result.routes),
        render: h => h(App, {
            props: {
                pages: result.pages,
                menu: result.menu,
            },
        }),
    });
})
.catch(err => console.error(err));
// rrouter.render_router('frontoffice').then(result => console.log(result)).catch(err => console.error(err));
