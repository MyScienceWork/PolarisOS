require('babel-polyfill'); // For very very old browser
const Vue = require('vue');
const Buefy = require('buefy');
const VueWysiwyg = require('vue-wysiwyg');
const VueScrollTo = require('vue-scrollto');
const VueIntro = require('vue-introjs').default;
const router = require('./router');
const store = require('../common/store');

const Loader = require('./components/loader/Loader.vue');
const Input = require('../common/components/main/forms/elements/input/Input.vue');
const ColorInput = require('../common/components/main/forms/elements/color/Color.vue');
const Select = require('../common/components/main/forms/elements/select/Select.vue');
const Static = require('../common/components/main/forms/elements/static/Static.vue');
const VariadicElement = require('../common/components/main/forms/elements/variadic_element/VariadicElement.vue');
const Form = require('../common/components/main/forms/form/Form.vue');
const DynamicForm = require('../common/components/main/forms/dynamic_form/DynamicForm.vue');
const Paginator = require('../common/components/main/paginator/Paginator.vue');
const Tabber = require('../common/components/main/tabber/Tabber.vue');
const Grid = require('../common/components/main/forms/elements/grid/Grid.vue');
const Card = require('../common/components/main/card/Card.vue');
const Searching = require('../common/components/main/forms/searching/Searching.vue');
const DataTableSearching = require('../common/components/main/forms/searching/DataTableSearching.vue');
const LoginLang = require('../common/components/main/login_lang/LoginLang.vue');
const LoginChoice = require('../common/components/main/login_choice/LoginChoice.vue');
const MappingBuilder = require('../common/components/main/mapping_builder/MappingBuilder.vue');
const MappingItem = require('../common/components/main/mapping_builder/subcomponents/MappingItem.vue');
const ChartWidget = require('../common/components/main/chart_widget/ChartWidget.vue');

const ActionButton = require('./components/themes/main/components/action_button/ActionButton.vue');
const Widget = require('../common/components/main/widget/Widget.vue');

const App = require('./pages/App.vue');

Vue.use(VueScrollTo);


const introJs = require('intro.js');

window.introJs = introJs;
Vue.use(VueIntro);

Vue.use(Buefy.default, {
    defaultIconPack: 'fa',
});

Vue.use(VueWysiwyg.default, {
    hideModules: { image: true },
});

Vue.component('loader', Loader);
Vue.component('fform', Form);
Vue.component('finput', Input);
Vue.component('fcolor', ColorInput);
Vue.component('fselect', Select);
Vue.component('fstatic', Static);
Vue.component('fgrid', Grid);
Vue.component('fvariadic-element', VariadicElement);
Vue.component('action-button', ActionButton);
Vue.component('widget', Widget);
Vue.component('paginator', Paginator);
Vue.component('tabber', Tabber);
Vue.component('card', Card);
Vue.component('fsearching', Searching);
Vue.component('fdata-table-searching', DataTableSearching);
Vue.component('dynamic-form', DynamicForm);
Vue.component('login-lang', LoginLang);
Vue.component('login-choice', LoginChoice);
Vue.component('mapping-builder', MappingBuilder);
Vue.component('mapping-item', MappingItem);
Vue.component('chart-widget', ChartWidget);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
