const Vue = require('vue');
const router = require('./router');
const store = require('./store');

const Loader = require('./components/loader/Loader.vue');
const Stepper = require('./components/themes/ined/components/stepper/Stepper.vue');
const Input = require('./components/themes/ined/components/forms/elements/input/Input.vue');
const Select = require('./components/themes/ined/components/forms/elements/select/Select.vue');
const VariadicElement = require('./components/themes/ined/components/forms/elements/variadic_element/VariadicElement.vue');
const Form = require('./components/themes/ined/components/forms/form/Form.vue');
const DynamicForm = require('./components/themes/ined/components/forms/dynamic_form/DynamicForm.vue');

const Indexer = require('../common/components/ined/indexer/Indexer.vue');

const App = require('./pages/App.vue');

Vue.component('loader', Loader);
Vue.component('stepper', Stepper);
Vue.component('fform', Form);
Vue.component('finput', Input);
Vue.component('fselect', Select);
Vue.component('fvariadic-element', VariadicElement);
Vue.component('dynamic-form', DynamicForm);
Vue.component('indexer', Indexer);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
