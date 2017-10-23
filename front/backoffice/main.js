const Vue = require('vue');
const router = require('./router');
const store = require('./store');

const Loader = require('./components/loader/Loader.vue');
const Input = require('./components/themes/ined/components/forms/elements/input/Input.vue');
const Select = require('./components/themes/ined/components/forms/elements/select/Select.vue');
const Form = require('./components/themes/ined/components/forms/form/Form.vue');
const ActionButton = require('./components/themes/ined/components/action_button/ActionButton.vue');
const Widget = require('./components/themes/ined/components/widget/Widget.vue');
const Paginator = require('./components/themes/ined/components/paginator/Paginator.vue');

const App = require('./pages/App.vue');

Vue.component('loader', Loader);
Vue.component('fform', Form);
Vue.component('finput', Input);
Vue.component('fselect', Select);
Vue.component('action-button', ActionButton);
Vue.component('widget', Widget);
Vue.component('paginator', Paginator);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
