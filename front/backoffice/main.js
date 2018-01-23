const Vue = require('vue');
const router = require('./router');
const store = require('../common/store');

const Loader = require('./components/loader/Loader.vue');
const Input = require('../common/components/ined/forms/elements/input/Input.vue');
const Select = require('../common/components/ined/forms/elements/select/Select.vue');
const VariadicElement = require('../common/components/ined/forms/elements/variadic_element/VariadicElement.vue');
const Form = require('../common/components/ined/forms/form/Form.vue');
const DynamicForm = require('../common/components/ined/forms/dynamic_form/DynamicForm.vue');
const Paginator = require('../common/components/ined/paginator/Paginator.vue');
const Tabber = require('../common/components/ined/tabber/Tabber.vue');
const Grid = require('../common/components/ined/forms/elements/grid/Grid.vue');

const ActionButton = require('./components/themes/ined/components/action_button/ActionButton.vue');
const Widget = require('./components/themes/ined/components/widget/Widget.vue');

const App = require('./pages/App.vue');

Vue.component('loader', Loader);
Vue.component('fform', Form);
Vue.component('finput', Input);
Vue.component('fselect', Select);
Vue.component('fgrid', Grid);
Vue.component('fvariadic-element', VariadicElement);
Vue.component('action-button', ActionButton);
Vue.component('widget', Widget);
Vue.component('paginator', Paginator);
Vue.component('tabber', Tabber);
Vue.component('dynamic-form', DynamicForm);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
