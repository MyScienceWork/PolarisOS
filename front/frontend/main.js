const Vue = require('vue');
const Buefy = require('buefy');
const router = require('./router');
const store = require('../common/store');

const Loader = require('./components/loader/Loader.vue');
const Stepper = require('../common/components/ined/stepper/Stepper.vue');
const Input = require('../common/components/ined/forms/elements/input/Input.vue');
const Select = require('../common/components/ined/forms/elements/select/Select.vue');
const VariadicElement = require('../common/components/ined/forms/elements/variadic_element/VariadicElement.vue');
const Form = require('../common/components/ined/forms/form/Form.vue');
const DynamicForm = require('../common/components/ined/forms/dynamic_form/DynamicForm.vue');
const Paginator = require('../common/components/ined/paginator/Paginator.vue');

const Indexer = require('../common/components/ined/indexer/Indexer.vue');

// Widgets
const SearchWidget = require('./components/themes/ined/widgets/search_widget/SearchWidget.vue');
const BrowseWidget = require('./components/themes/ined/widgets/browse_widget/BrowseWidget.vue');
const NavWidget = require('./components/themes/ined/widgets/nav_widget/NavWidget.vue');
const TextWidget = require('./components/themes/ined/widgets/text_widget/TextWidget.vue');
const ListWidget = require('./components/themes/ined/widgets/list_widget/ListWidget.vue');
const StatsWidget = require('./components/themes/ined/widgets/stats_widget/StatsWidget.vue');


const App = require('./pages/App.vue');

Vue.use(Buefy.default, {
    defaultIconPack: 'fa',
});

Vue.component('loader', Loader);
Vue.component('stepper', Stepper);
Vue.component('fform', Form);
Vue.component('finput', Input);
Vue.component('fselect', Select);
Vue.component('fvariadic-element', VariadicElement);
Vue.component('dynamic-form', DynamicForm);
Vue.component('indexer', Indexer);
Vue.component('paginator', Paginator);

// Widgets
Vue.component('widget-search', SearchWidget);
Vue.component('widget-browse', BrowseWidget);
Vue.component('widget-nav', NavWidget);
Vue.component('widget-text', TextWidget);
Vue.component('widget-list', ListWidget);
Vue.component('widget-stats', StatsWidget);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
