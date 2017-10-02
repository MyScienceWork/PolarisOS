const Vue = require('vue');
const router = require('./router');
const store = require('./store');
const VueTouch = require('vue-touch');

const Loader = require('./components/loader/Loader.vue');

const App = require('./pages/App.vue');

Vue.component('loader', Loader);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
