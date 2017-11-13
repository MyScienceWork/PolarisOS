(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (__dirname){
'use strict';

var path = require('path');

var all = {
    root: path.resolve(path.join(__dirname, '..')),
    elasticsearch: {
        index_prefix: 'pos'
    },
    logger: {
        logFile: 'midstod.log'
    },
    api: {
        public: {
            version: 'v2',
            prefix: '/api/public'
        },
        private: {
            version: 'v2',
            prefix: '/api/private'
        },
        interval: [120000, 120000]
    },
    entities: [{
        name: 'citation',
        text: 'Citation'
    }, {
        name: 'apiuser',
        text: 'User of API'
    }, {
        name: 'user',
        text: 'User'
    }, {
        name: 'institution',
        text: 'Institution'
    }]
};

module.exports = all;

}).call(this,"/app/config")

},{"path":185}],2:[function(require,module,exports){
'use strict';

var baseConfig = require('./all');
var _ = require('lodash');

var env = "development" || 'development';
var tmp = void 0;
try {
    tmp = require('./' + env + '.js'); // eslint-disable-line
} catch (error) {
    tmp = {};
    // process.exit(1);
}

var config = _.merge(baseConfig, tmp);
module.exports = config;

},{"./all":1,"lodash":"lodash"}],3:[function(require,module,exports){
'use strict';

module.exports = {
    name: 'Loader',
    props: ['primaryColor', 'secondaryColor'],
    data: function data() {
        return {
            css: {
                primary: {
                    backgroundColor: this.primaryColor
                },
                secondary: {
                    backgroundColor: this.secondaryColor
                }
            }
        };
    }
};

},{}],4:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Loader');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"msw-loader"},[_c('div',{staticClass:"loader-square secondary-color",style:(_vm.css.secondary)}),_vm._v(" "),_c('div',{staticClass:"loader-square secondary-color",style:(_vm.css.secondary)}),_vm._v(" "),_c('div',{staticClass:"loader-square secondary-color loader-last",style:(_vm.css.secondary)}),_vm._v(" "),_c('div',{staticClass:"loader-square primary-color loader-clear",style:(_vm.css.primary)}),_vm._v(" "),_c('div',{staticClass:"loader-square primary-color",style:(_vm.css.primary)}),_vm._v(" "),_c('div',{staticClass:"loader-square primary-color loader-last",style:(_vm.css.primary)}),_vm._v(" "),_c('div',{staticClass:"loader-square secondary-color loader-clear",style:(_vm.css.secondary)}),_vm._v(" "),_c('div',{staticClass:"loader-square secondary-color",style:(_vm.css.secondary)}),_vm._v(" "),_c('div',{staticClass:"loader-square secondary-color loader-last",style:(_vm.css.secondary)})])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f393a65", __vue__options__)
  } else {
    hotAPI.reload("data-v-3f393a65", __vue__options__)
  }
})()}

},{"./Loader":3,"vue":"vue","vue-hot-reload-api":195}],5:[function(require,module,exports){
'use strict';

module.exports = {
    props: {
        twoSteps: { default: false, type: Boolean },
        confirmation: { default: 'Are you sure?', type: String }
    },
    data: function data() {
        return {
            state: {
                confirm: false
            }
        };
    },

    methods: {
        click: function click(e) {
            var _this = this;

            e.preventDefault();
            if (this.twoSteps && !this.state.confirm) {
                this.state.confirm = true;
                setTimeout(function () {
                    _this.state.confirm = false;
                }, 3000);
            } else {
                this.state.confirm = false;
                this.$emit('action-click');
            }
        }
    }
};

},{}],6:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./ActionButton');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{on:{"click":_vm.click}},[(!_vm.state.confirm)?_vm._t("default"):_c('span',[_vm._v("\n        "+_vm._s(_vm.confirmation)+"\n    ")])],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05107876", __vue__options__)
  } else {
    hotAPI.reload("data-v-05107876", __vue__options__)
  }
})()}

},{"./ActionButton":5,"vue":"vue","vue-hot-reload-api":195}],7:[function(require,module,exports){
'use strict';

module.exports = {
    props: {
        hasOptions: { default: true },
        isRefreshable: { default: false },
        isRemovable: { default: false },
        isCollapsable: { default: true },
        collapsed: { default: false }
    },
    data: function data() {
        return {
            state: {
                collapsed: false,
                show: true
            }
        };
    },

    methods: {
        onCollapse: function onCollapse(e) {
            e.preventDefault();
            this.state.collapsed = !this.state.collapsed;
        },
        onRefresh: function onRefresh(e) {
            e.preventDefault();
            this.$emit('refresh');
        },
        onRemove: function onRemove(e) {
            e.preventDefault();
            this.state.show = false;
            this.$emit('remove');
        }
    },
    mounted: function mounted() {
        this.state.collapsed = this.collapsed;
    }
};

},{}],8:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Widget');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.state.show)?_c('div',{staticClass:"smart-widget"},[_c('div',{staticClass:"smart-widget-header"},[_vm._t("title",[_vm._v("\n            Slot title is required\n        ")]),_vm._v(" "),(_vm.hasOptions)?_c('span',{staticClass:"smart-widget-option"},[(_vm.isCollapsable)?_c('a',{staticClass:"widget-collapse-option",attrs:{"href":"#"},on:{"click":_vm.onCollapse}},[(_vm.state.collapsed)?_c('i',{staticClass:"fa fa-chevron-down"}):_c('i',{staticClass:"fa fa-chevron-up"})]):_vm._e(),_vm._v(" "),(_vm.isRefreshable)?_c('a',{staticClass:"widget-refresh-option",attrs:{"href":"#"},on:{"click":_vm.onRefresh}},[_c('i',{staticClass:"fa fa-refresh"})]):_vm._e(),_vm._v(" "),(_vm.isRemovable)?_c('a',{staticClass:"widget-remove-option",attrs:{"href":"#"},on:{"click":_vm.onRemove}},[_c('i',{staticClass:"fa fa-times"})]):_vm._e()]):_vm._e()],2),_vm._v(" "),_c('transition',{attrs:{"name":"widget-slide"}},[(!_vm.state.collapsed)?_c('div',{staticClass:"smart-widget-inner"},[_c('div',{staticClass:"smart-widget-body"},[_vm._t("body",[_vm._v("\n                Slot body is required\n                ")])],2)]):_vm._e()])],1):_vm._e()}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-643c1236", __vue__options__)
  } else {
    hotAPI.reload("data-v-643c1236", __vue__options__)
  }
})()}

},{"./Widget":7,"vue":"vue","vue-hot-reload-api":195}],9:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],10:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Footer');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('footer',{staticClass:"section"},[_c('div',{staticClass:"footer-container container is-fluid is-marginless"},[_c('div',{staticClass:"columns footer-disclaimer"},[_c('p',{staticClass:"column"},[_vm._v("© INED 2017")])])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cef207e0", __vue__options__)
  } else {
    hotAPI.reload("data-v-cef207e0", __vue__options__)
  }
})()}

},{"./Footer":9,"vue":"vue","vue-hot-reload-api":195}],11:[function(require,module,exports){
'use strict';

var Navbar = require('../navbar/Navbar.vue');

module.exports = {
    components: {
        'navbar': Navbar
    }
};

},{"../navbar/Navbar.vue":14}],12:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Header');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"section"},[_c('div',{staticClass:"container is-fluid is-marginless"},[_c('div',{staticClass:"tile is-ancestor"},[_c('div',{staticClass:"tile is-parent is-2 is-vertical is-hidden-touch"},[_c('div',{staticClass:"image tile is-child is-16by9"},[_c('img',{attrs:{"src":"/public/front/imgs/logo/logo.svg","alt":"Logo","title":"App Logo"}})])]),_vm._v(" "),_c('div',{staticClass:"tile is-vertical"}),_vm._v(" "),_c('div',{staticClass:"tile is-parent is-2 is-vertical"},[_c('p',{staticClass:"tile is-child"},[_c('a',{attrs:{"href":"#"}},[_vm._v("Log In / Sign In")])]),_vm._v(" "),_c('p',{staticClass:"tile is-child"},[_c('a',{attrs:{"href":"#"}},[_vm._v("FR")]),_vm._v(" | "),_c('a',{attrs:{"href":"#"}},[_vm._v("EN")])])])])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f903f060", __vue__options__)
  } else {
    hotAPI.reload("data-v-f903f060", __vue__options__)
  }
})()}

},{"./Header":11,"vue":"vue","vue-hot-reload-api":195}],13:[function(require,module,exports){
'use strict';

var _ = require('lodash');

module.exports = {
    props: ['menus'],
    data: function data() {
        return {
            isShown: false,
            state: {
                routes: this.$router.options.routes.filter(function (r) {
                    return r.path !== '/';
                }),
                colors: ['red', 'orange', 'purple', 'brown', 'green', 'blue']
            }
        };
    },

    computed: {
        active_idx: function active_idx() {
            var _this = this;

            var index = _.findIndex(this.$router.options.routes, function (r) {
                return r.path !== '/' && _this.$route.path === r.path;
            }) - 1;
            return Math.max(-1, index);
        }
    },
    methods: {
        show: function show(e) {
            e.preventDefault();
            this.isShown = !this.isShown;
        }
    },
    mounted: function mounted() {}
};

},{"lodash":"lodash"}],14:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Navbar');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-nav is-fullheight"},[_c('aside',{staticClass:"menu"},_vm._l((_vm.menus),function(section,idx){return _c('div',[_c('p',{class:("menu-label menu-label-" + (_vm.state.colors[idx]))},[_vm._v("\n                "+_vm._s(section[0].section)+" \n            ")]),_vm._v(" "),_c('ul',{class:("menu-list menu-list-" + (_vm.state.colors[idx]))},_vm._l((section),function(item){return _c('li',[_c('router-link',{attrs:{"exact":"","active-class":"is-active","to":item.routes[0]}},[_vm._v(_vm._s(item.name))])],1)}))])}))])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3fe98e70", __vue__options__)
  } else {
    hotAPI.reload("data-v-3fe98e70", __vue__options__)
  }
})()}

},{"./Navbar":13,"vue":"vue","vue-hot-reload-api":195}],15:[function(require,module,exports){
'use strict';

module.exports = [{ label: 'Production', value: 'production' }, { label: 'Development', value: 'development' }, { label: 'Demonstration', value: 'demo' }, { label: 'Localhost', value: 'local' }];

},{}],16:[function(require,module,exports){
'use strict';

module.exports = [{ label: 'Text', value: 'text' }, { label: 'Email', value: 'email' }, { label: 'Password', value: 'password' }, { label: 'Phone', value: 'phone' }, { label: 'Number', value: 'number' }, { label: 'Textarea', value: 'textarea' }, { label: 'Checkbox', value: 'checkbox' }, { label: 'Radio', value: 'radio' }, { label: 'Subform', value: 'subform' }, { label: 'Select', value: 'select' }];

},{}],17:[function(require,module,exports){
'use strict';

var _ = require('lodash');

var Langs = {
    AA: 'Afar',
    AB: 'Abkhazian',
    AE: 'Avestan',
    AF: 'Afrikaans',
    AK: 'Akan',
    AM: 'Amharic',
    AN: 'Aragonese',
    AR: 'Arabic',
    AS: 'Assamese',
    AV: 'Avaric',
    AY: 'Aymara',
    AZ: 'Azerbaijani',
    BA: 'Bashkir',
    BE: 'Belarusian',
    BG: 'Bulgarian',
    BH: 'Bihari',
    BI: 'Bislama',
    BM: 'Bambara',
    BN: 'Bengali',
    BO: 'Tibetan',
    BR: 'Breton',
    BS: 'Bosnian',
    CA: 'Catalan',
    CE: 'Chechen',
    CH: 'Chamorro',
    CO: 'Corsican',
    CR: 'Cree',
    CS: 'Czech',
    CU: 'Old Church Slavonic',
    CV: 'Chuvash',
    CY: 'Welsh',
    DA: 'Danish',
    DE: 'German',
    DV: 'Divehi',
    DZ: 'Dzongkha',
    EE: 'Ewe',
    EL: 'Greek',
    EN: 'English',
    EO: 'Esperanto',
    ES: 'Spanish',
    ET: 'Estonian',
    EU: 'Basque',
    FA: 'Persian',
    FF: 'Fulah',
    FI: 'Finnish',
    FJ: 'Fijian',
    FO: 'Faroese',
    FR: 'French',
    FY: 'Western Frisian',
    GA: 'Irish',
    GD: 'Scottish Gaelic',
    GL: 'Galician',
    GN: 'Guarani',
    GU: 'Gujarati',
    GV: 'Manx',
    HA: 'Hausa',
    HE: 'Hebrew',
    HI: 'Hindi',
    HO: 'Hiri Motu',
    HR: 'Croatian',
    HT: 'Haitian',
    HU: 'Hungarian',
    HY: 'Armenian',
    HZ: 'Herero',
    IA: 'Interlingua',
    ID: 'Indonesian',
    IE: 'Interlingue',
    IG: 'Igbo',
    II: 'Sichuan Yi',
    IK: 'Inupiaq',
    IO: 'Ido',
    IS: 'Icelandic',
    IT: 'Italian',
    IU: 'Inuktitut',
    JA: 'Japanese',
    JV: 'Javanese',
    KA: 'Georgian',
    KG: 'Kongo',
    KI: 'Kikuyu',
    KJ: 'Kwanyama',
    KK: 'Kazakh',
    KL: 'Kalaallisut',
    KM: 'Khmer',
    KN: 'Kannada',
    KO: 'Korean',
    KR: 'Kanuri',
    KS: 'Kashmiri',
    KU: 'Kurdish',
    KV: 'Komi',
    KW: 'Cornish',
    KY: 'Kirghiz',
    LA: 'Latin',
    LB: 'Luxembourgish',
    LG: 'Ganda',
    LI: 'Limburgish',
    LN: 'Lingala',
    LO: 'Lao',
    LT: 'Lithuanian',
    LU: 'Luba-Katanga',
    LV: 'Latvian',
    MG: 'Malagasy',
    MH: 'Marshallese',
    MI: 'Māori',
    MK: 'Macedonian',
    ML: 'Malayalam',
    MN: 'Mongolian',
    MO: 'Moldavian',
    MR: 'Marathi',
    MS: 'Malay',
    MT: 'Maltese',
    MY: 'Burmese',
    NA: 'Nauru',
    NB: 'Norwegian Bokmål',
    ND: 'North Ndebele',
    NE: 'Nepali',
    NG: 'Ndonga',
    NL: 'Dutch',
    NN: 'Norwegian Nynorsk',
    NO: 'Norwegian',
    NR: 'South Ndebele',
    NV: 'Navajo',
    NY: 'Chichewa',
    OC: 'Occitan',
    OJ: 'Ojibwa',
    OM: 'Oromo',
    OR: 'Oriya',
    OS: 'Ossetian',
    PA: 'Panjabi',
    PI: 'Pāli',
    PL: 'Polish',
    PS: 'Pashto',
    PT: 'Portuguese',
    QU: 'Quechua',
    RC: 'Reunionese',
    RM: 'Romansh',
    RN: 'Kirundi',
    RO: 'Romanian',
    RU: 'Russian',
    RW: 'Kinyarwanda',
    SA: 'Sanskrit',
    SC: 'Sardinian',
    SD: 'Sindhi',
    SE: 'Northern Sami',
    SG: 'Sango',
    SH: 'Serbo-Croatian',
    SI: 'Sinhalese',
    SK: 'Slovak',
    SL: 'Slovene',
    SM: 'Samoan',
    SN: 'Shona',
    SO: 'Somali',
    SQ: 'Albanian',
    SR: 'Serbian',
    SS: 'Swati',
    ST: 'Sotho',
    SU: 'Sundanese',
    SV: 'Swedish',
    SW: 'Swahili',
    TA: 'Tamil',
    TE: 'Telugu',
    TG: 'Tajik',
    TH: 'Thai',
    TI: 'Tigrinya',
    TK: 'Turkmen',
    TL: 'Tagalog',
    TN: 'Tswana',
    TO: 'Tonga',
    TR: 'Turkish',
    TS: 'Tsonga',
    TT: 'Tatar',
    TW: 'Twi',
    TY: 'Tahitian',
    UG: 'Uighur',
    UK: 'Ukrainian',
    UR: 'Urdu',
    UZ: 'Uzbek',
    VE: 'Venda',
    VI: 'Viêt Namese',
    VO: 'Volapük',
    WA: 'Walloon',
    WO: 'Wolof',
    XH: 'Xhosa',
    YI: 'Yiddish',
    YO: 'Yoruba',
    ZA: 'Zhuang',
    ZH: 'Chinese',
    ZU: 'Zulu'
};

var LangsList = _.map(Langs, function (label, value) {
    return { label: label, value: value };
});

module.exports = {
    Langs: Langs,
    LangsList: LangsList
};

},{"lodash":"lodash"}],18:[function(require,module,exports){
'use strict';

module.exports = [{ label: 'Zero', value: '0' }, { label: 'One', value: '1' }, { label: 'Two', value: '2' }, { label: 'Few', value: 'few' }, { label: 'Many', value: 'many' }, { label: 'Other', value: 'other' }, { label: 'N/A', value: 'n/a' }];

},{}],19:[function(require,module,exports){
'use strict';

var Vue = require('vue');
var router = require('./router');
var store = require('../common/store');

var Loader = require('./components/loader/Loader.vue');
var Input = require('../common/components/ined/forms/elements/input/Input.vue');
var Select = require('../common/components/ined/forms/elements/select/Select.vue');
var VariadicElement = require('../common/components/ined/forms/elements/variadic_element/VariadicElement.vue');
var Form = require('../common/components/ined/forms/form/Form.vue');
var DynamicForm = require('../common/components/ined/forms/dynamic_form/DynamicForm.vue');
var Paginator = require('../common/components/ined/paginator/Paginator.vue');
var Tabber = require('../common/components/ined/tabber/Tabber.vue');

var ActionButton = require('./components/themes/ined/components/action_button/ActionButton.vue');
var Widget = require('./components/themes/ined/components/widget/Widget.vue');

var App = require('./pages/App.vue');

Vue.component('loader', Loader);
Vue.component('fform', Form);
Vue.component('finput', Input);
Vue.component('fselect', Select);
Vue.component('fvariadic-element', VariadicElement);
Vue.component('action-button', ActionButton);
Vue.component('widget', Widget);
Vue.component('paginator', Paginator);
Vue.component('tabber', Tabber);
Vue.component('dynamic-form', DynamicForm);

new Vue({
    el: '#app',
    store: store,
    router: router,
    render: function render(h) {
        return h(App);
    }
});

},{"../common/components/ined/forms/dynamic_form/DynamicForm.vue":46,"../common/components/ined/forms/elements/input/Input.vue":48,"../common/components/ined/forms/elements/select/Select.vue":50,"../common/components/ined/forms/elements/variadic_element/VariadicElement.vue":52,"../common/components/ined/forms/form/Form.vue":54,"../common/components/ined/paginator/Paginator.vue":57,"../common/components/ined/tabber/Tabber.vue":59,"../common/store":64,"./components/loader/Loader.vue":4,"./components/themes/ined/components/action_button/ActionButton.vue":6,"./components/themes/ined/components/widget/Widget.vue":8,"./pages/App.vue":22,"./router":40,"vue":"vue"}],20:[function(require,module,exports){
'use strict';

module.exports = {};
var Routes = require('./routes');
var Home = require('./pages/home/Home.vue');
var User = require('./pages/user/User.vue');
var Config = require('./pages/config/Config.vue');
var Lang = require('./pages/lang/Lang.vue');
var Form = require('./pages/form/Form.vue');
var MenuComponent = require('./pages/menu/Menu.vue');
var Datasource = require('./pages/datasource/Datasource.vue');
var Datainstance = require('./pages/datainstance/Datainstance.vue');

module.exports.menu = [[{
    section: 'General',
    name: 'Overview',
    access: '',
    key: 'admin',
    routes: [Routes.admin],
    submenu: [],
    component: Home
}, {
    section: 'General',
    name: 'Users',
    access: '',
    key: 'user',
    routes: [Routes.user],
    submenu: [],
    component: User
}, {
    section: 'General',
    name: 'Reviews',
    access: '',
    key: 'review',
    routes: [Routes.review],
    submenu: [],
    component: Home
}], [{
    section: 'Administration',
    name: 'Data sources',
    access: '',
    key: 'datasource',
    routes: [Routes.datasource],
    submenu: [],
    component: Datasource
}, {
    section: 'Administration',
    name: 'Publications',
    access: '',
    key: 'publication',
    routes: [Routes.publication],
    submenu: [],
    component: Home
}, {
    section: 'Administration',
    name: 'CSL Management',
    access: '',
    key: 'csl',
    routes: [Routes.csl],
    submenu: [],
    component: Home
}, {
    section: 'Administration',
    name: 'Menus',
    access: '',
    key: 'menu',
    routes: [Routes.menu],
    submenu: [],
    component: MenuComponent
}, {
    section: 'Administration',
    name: 'Forms',
    access: '',
    key: 'form',
    routes: [Routes.form],
    submenu: [],
    component: Form
}, {
    section: 'Administration',
    name: 'Langs',
    access: '',
    key: 'lang',
    routes: [Routes.lang],
    submenu: [],
    component: Lang
}], [{
    section: 'Advanced',
    name: 'External repositories',
    access: '',
    key: 'external-repo',
    routes: [Routes.external_repo],
    submenu: [],
    component: Home
}, {
    section: 'Advanced',
    name: 'Export formats',
    access: '',
    key: 'export-format',
    routes: [Routes.export_format],
    submenu: [],
    component: Home
}, {
    section: 'Advanced',
    name: 'Handle ID Management',
    access: '',
    key: 'handleid',
    routes: [Routes.handle_id],
    submenu: [],
    component: Home
}, {
    section: 'Advanced',
    name: 'API Management',
    access: '',
    key: 'api',
    routes: [Routes.api],
    submenu: [],
    component: Home
}, {
    section: 'Advanced',
    name: 'Config',
    access: '',
    key: 'config',
    routes: [Routes.config],
    submenu: [],
    component: Config
}]];

module.exports.other = [{
    key: 'datasource_typology',
    routes: [Routes.datainstance],
    component: Datainstance
}];

},{"./pages/config/Config.vue":24,"./pages/datainstance/Datainstance.vue":26,"./pages/datasource/Datasource.vue":28,"./pages/form/Form.vue":30,"./pages/home/Home.vue":32,"./pages/lang/Lang.vue":34,"./pages/menu/Menu.vue":36,"./pages/user/User.vue":39,"./routes":41}],21:[function(require,module,exports){
'use strict';

var Vue = require('vue');
var Messages = require('../../common/api/messages');
var APIRoutes = require('../../common/api/routes');

var ENV = "development" || 'local';

module.exports = {
    name: 'App',
    beforeMount: function beforeMount() {
        var _this = this;

        var config_path = APIRoutes.entity('config', 'POST', true);
        console.log(ENV);
        var config_body = {
            size: 1,
            where: {
                environment: ENV
            }
        };

        var lang_path = APIRoutes.entity('lang', 'POST', true);
        var lang_body = {
            size: 10000,
            where: {
                $and: [{ part: 'backoffice' }]
            }
        };

        var promise_config = this.$store.dispatch('grab_config', {
            path: config_path,
            body: config_body
        });

        promise_config.then(function () {
            var config = _this.$store.state.global_config;
            if (!('langs' in config)) {
                return;
            }
            var default_lang = config.langs.find(function (v) {
                return v.value.toLowerCase() === _this.$store.state.browserLanguage;
            });
            if (default_lang === undefined) {
                default_lang = config.langs[0].value;
            } else {
                default_lang = default_lang.value;
            }

            lang_body.where.$and.push({ lang: default_lang });
            _this.$store.state.interfaceLang = default_lang;
            _this.$store.dispatch('grab_language', {
                path: lang_path,
                body: lang_body
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
};

},{"../../common/api/messages":43,"../../common/api/routes":44,"vue":"vue"}],22:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./App');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (Object.keys(_vm.$store.state.lang_content).length === 0)?_c('loader',{attrs:{"id":"app"}}):_c('div',{staticClass:"holy-grail",attrs:{"id":"app"}},[_c('router-view',{attrs:{"name":"header"}}),_vm._v(" "),_c('div',{staticClass:"holy-grail-body"},[_c('router-view'),_vm._v(" "),_c('router-view',{attrs:{"name":"navbar"}})],1),_vm._v(" "),_c('router-view',{attrs:{"name":"footer"}})],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-36c70957", __vue__options__)
  } else {
    hotAPI.reload("data-v-36c70957", __vue__options__)
  }
})()}

},{"./App":21,"vue":"vue","vue-hot-reload-api":195}],23:[function(require,module,exports){
'use strict';

var Utils = require('../../../common/utils/utils');
var APIRoutes = require('../../../common/api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../../../common/mixins/LangMixin');
var Environments = require('../../lists/environments');
var Langs = require('../../lists/langs');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data: function data() {
        return {
            state: {
                path: APIRoutes.entity('config', 'POST'),
                rpath: APIRoutes.entity('config', 'GET'),
                cform: 'config_creation',
                rform: 'config_read',
                itemsPerPage: 10,
                itemsPerRow: 2,
                langs: Langs.LangsList,
                environments: Environments
            }
        };
    },

    methods: {},
    mounted: function mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.rform,
            path: this.state.rpath
        });
    },

    computed: {
        readContent: function readContent() {
            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                return Utils.to_matrix(form.content instanceof Array ? form.content : [], this.state.itemsPerRow);
            }
            return [];
        },
        contentLength: function contentLength() {
            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                return form.content.length;
            }
            return 0;
        }
    }
};

},{"../../../common/api/routes":44,"../../../common/mixins/LangMixin":61,"../../../common/utils/utils":69,"../../lists/environments":15,"../../lists/langs":17,"../mixins/ReaderMixin":37}],24:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Config');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("Global configuration")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},_vm._l((_vm.readContent),function(row){return _c('div',{staticClass:"columns is-centered"},_vm._l((row),function(content){return _c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_c('action-button',{staticClass:"button is-small button-background-blue",on:{"action-click":function($event){_vm.update(content)}}},[_c('i',{staticClass:"fa fa-pencil"})]),_vm._v(" "),_c('action-button',{staticClass:"button is-small button-background-red",attrs:{"confirmation":_vm.lang('b_sure'),"two-steps":true},on:{"action-click":function($event){_vm.remove(content, 'config')}}},[_c('i',{staticClass:"fa fa-times"})]),_vm._v("\n                                        "+_vm._s(content.environment)+" \n                                    ")],1),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"})])],1)}))}))])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("Add or modify the global configuration")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_c('fform',{attrs:{"name":_vm.state.cform,"post_path":_vm.state.path,"put_path":_vm.state.path,"get_path":_vm.state.rpath,"get_form":_vm.state.rform}},[_c('fselect',{attrs:{"name":"environment","label":_vm.lang('b_environment'),"is-required":true,"form":_vm.state.cform,"options":_vm.state.environments}}),_vm._v(" "),_c('fselect',{attrs:{"name":_vm.langs,"label":_vm.lang('b_lang',{}, 'other'),"is-required":true,"form":_vm.state.cform,"multi":true,"options":_vm.state.langs}})],1)],1)])],1)])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e0f00cb6", __vue__options__)
  } else {
    hotAPI.reload("data-v-e0f00cb6", __vue__options__)
  }
})()}

},{"./Config":23,"vue":"vue","vue-hot-reload-api":195}],25:[function(require,module,exports){
'use strict';

var Utils = require('../../../common/utils/utils');
var APIRoutes = require('../../../common/api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../../../common/mixins/LangMixin');
var FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin],
    data: function data() {
        return {
            state: {
                path: APIRoutes.entity(this.$route.params.datainstance, 'POST'),
                rpath: APIRoutes.entity(this.$route.params.datainstance, 'GET'),
                cform: this.$route.params.datainstance + '_creation',
                rform: this.$route.params.datainstance + '_read',
                itemsPerPage: 20,
                itemsPerRow: 2,
                forms: {
                    name: this.$route.params.datainstance + '_form',
                    group: 'typology'
                }
            }
        };
    },

    methods: {},
    mounted: function mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.rform,
            path: this.state.rpath
        });
    },

    computed: {
        content: function content() {
            var _this = this;

            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                var content = form.content || [];
                return content.map(function (c) {
                    c.label = _this.lang(c.label);
                    return c;
                });
            }
            return [];
        },
        readContent: function readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        }
    }
};

},{"../../../common/api/routes":44,"../../../common/mixins/FormMixin":60,"../../../common/mixins/LangMixin":61,"../../../common/utils/utils":69,"../mixins/ReaderMixin":37}],26:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Datainstance');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v(_vm._s(_vm.lang('b_list_datainstances')))]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_vm._l((_vm.readContent),function(row){return _c('div',{staticClass:"columns is-centered"},_vm._l((row),function(content){return _c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_c('action-button',{staticClass:"button is-small button-background-blue",on:{"action-click":function($event){_vm.update(content)}}},[_c('i',{staticClass:"fa fa-pencil"})]),_vm._v(" "),_c('action-button',{staticClass:"button is-small button-background-red",attrs:{"confirmation":_vm.lang('b_are_sure'),"two-steps":true},on:{"action-click":function($event){_vm.remove(content, 'datainstance')}}},[_c('i',{staticClass:"fa fa-times"})])],1),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"})])],1)}))}),_vm._v(" "),_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('paginator',{staticClass:"pagination-purple",attrs:{"skip":0,"number-of-items":_vm.contentLength,"items-per-page":_vm.state.itemsPerPage}})],1)])],2)])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v(_vm._s(_vm.lang('b_add_datainstance')))]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_c('fform',{attrs:{"name":_vm.state.cform,"post_path":_vm.state.path,"put_path":_vm.state.path,"get_path":_vm.state.rpath,"get_form":_vm.state.rform}},[_c('dynamic-form',{attrs:{"form":_vm.forms[((_vm.$route.params.datainstance) + "_form")] || {},"cform":_vm.state.cform}})],1)],1)])],1)])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8e1dfbf6", __vue__options__)
  } else {
    hotAPI.reload("data-v-8e1dfbf6", __vue__options__)
  }
})()}

},{"./Datainstance":25,"vue":"vue","vue-hot-reload-api":195}],27:[function(require,module,exports){
'use strict';

var Utils = require('../../../common/utils/utils');
var APIRoutes = require('../../../common/api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data: function data() {
        return {
            state: {
                path: APIRoutes.entity('datatemplate', 'POST'),
                rpath: APIRoutes.entity('datatemplate', 'GET'),
                cform: 'datatemplate_creation',
                rform: 'datatemplate_read',
                itemsPerPage: 20,
                itemsPerRow: 2
            }
        };
    },

    methods: {},
    mounted: function mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.rform,
            path: this.state.rpath
        });
        this.$store.dispatch('search', {
            form: 'form_read',
            path: APIRoutes.entity('form', 'POST', true),
            body: {
                projection: ['label', 'name'],
                size: 10000
            }
        });
    },

    computed: {
        content: function content() {
            var _this = this;

            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                var content = form.content || [];
                return content.map(function (c) {
                    c.label = _this.lang(c.label);
                    return c;
                });
            }
            return [];
        },
        readContent: function readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        forms: function forms() {
            var _this2 = this;

            if ('form_read' in this.$store.state.forms) {
                return this.$store.state.forms.form_read.content.map(function (c) {
                    c.label = _this2.lang(c.label);
                    return c;
                });
            }
            return [];
        }
    }
};

},{"../../../common/api/routes":44,"../../../common/mixins/LangMixin":61,"../../../common/utils/utils":69,"../mixins/ReaderMixin":37}],28:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Datasource');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v(_vm._s(_vm.lang('b_list_datasources')))]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_vm._l((_vm.readContent),function(row){return _c('div',{staticClass:"columns is-centered"},_vm._l((row),function(content){return _c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_c('action-button',{staticClass:"button is-small button-background-blue",on:{"action-click":function($event){_vm.update(content)}}},[_c('i',{staticClass:"fa fa-pencil"})]),_vm._v(" "),_c('action-button',{staticClass:"button is-small button-background-red",attrs:{"confirmation":_vm.lang('b_are_sure'),"two-steps":true},on:{"action-click":function($event){_vm.remove(content, 'datatemplate')}}},[_c('i',{staticClass:"fa fa-times"})]),_vm._v(" "),_c('router-link',{staticClass:"button is-small button-background-green",attrs:{"to":("/admin/datasource/" + (content.name))}},[_c('i',{staticClass:"fa fa-eye"})]),_vm._v("\n                                        "+_vm._s(content.label)+" ("+_vm._s(content.name)+") \n                                    ")],1),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"})])],1)}))}),_vm._v(" "),_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('paginator',{staticClass:"pagination-purple",attrs:{"skip":0,"number-of-items":_vm.contentLength,"items-per-page":_vm.state.itemsPerPage}})],1)])],2)])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v(_vm._s(_vm.lang('b_add_datasource')))]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_c('fform',{attrs:{"name":_vm.state.cform,"post_path":_vm.state.path,"put_path":_vm.state.path,"get_path":_vm.state.rpath,"get_form":_vm.state.rform}},[_c('finput',{attrs:{"name":"name","label":_vm.lang('b_name'),"is-required":true,"placeholder":_vm.lang('b_name'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":"label","label":_vm.lang('b_label'),"is-required":true,"placeholder":_vm.lang('b_label'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":"type","label":_vm.lang('b_type'),"is-required":true,"placeholder":_vm.lang('b_type'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('fselect',{attrs:{"name":"form","label":_vm.lang('b_form'),"is-required":true,"options":_vm.forms,"fieldLabel":_vm.label,"fieldValue":_vm.name,"form":_vm.state.cform}})],1)],1)])],1)])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c3dcd45", __vue__options__)
  } else {
    hotAPI.reload("data-v-5c3dcd45", __vue__options__)
  }
})()}

},{"./Datasource":27,"vue":"vue","vue-hot-reload-api":195}],29:[function(require,module,exports){
'use strict';

var Utils = require('../../../common/utils/utils');
var APIRoutes = require('../../../common/api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../../../common/mixins/LangMixin');
var FieldTypes = require('../../lists/fieldtypes');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data: function data() {
        return {
            state: {
                path: APIRoutes.entity('form', 'POST'),
                rpath: APIRoutes.entity('form', 'GET'),
                cform: 'form_creation',
                rform: 'form_read',
                itemsPerPage: 20,
                itemsPerRow: 2,
                selected_types: {}
            }
        };
    },

    methods: {
        type_change: function type_change(val, idx) {
            if (val == null) {
                if (idx in this.state.selected_types) {
                    delete this.state.selected_types[idx];
                }
            } else {
                this.$set(this.state.selected_types, idx, val.value);
            }
        }
    },
    mounted: function mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.rform,
            path: this.state.rpath
        });
        this.$store.dispatch('search', {
            form: 'datatemplate_read',
            path: APIRoutes.entity('datatemplate', 'POST', true),
            body: {
                projection: ['label', 'name'],
                size: 10000
            }
        });
    },

    computed: {
        content: function content() {
            var _this = this;

            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                var content = form.content || [];
                return content.map(function (c) {
                    c.label = _this.lang(c.label);
                    c.description = _this.lang(c.description);
                    return c;
                });
            }
            return [];
        },
        readContent: function readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        fieldtypes: function fieldtypes() {
            var _this2 = this;

            return FieldTypes.map(function (ft) {
                return { value: ft.value, label: _this2.lang(ft.label) };
            });
        },
        datasources: function datasources() {
            if ('datatemplate_read' in this.$store.state.forms) {
                return this.$store.state.forms.datatemplate_read.content;
            }
            return [];
        }
    }
};

},{"../../../common/api/routes":44,"../../../common/mixins/LangMixin":61,"../../../common/utils/utils":69,"../../lists/fieldtypes":16,"../mixins/ReaderMixin":37}],30:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Form');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("List of users")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_vm._l((_vm.readContent),function(row){return _c('div',{staticClass:"columns is-centered"},_vm._l((row),function(content){return _c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_c('action-button',{staticClass:"button is-small button-background-blue",on:{"action-click":function($event){_vm.update(content)}}},[_c('i',{staticClass:"fa fa-pencil"})]),_vm._v(" "),_c('action-button',{staticClass:"button is-small button-background-red",attrs:{"confirmation":"Are you sure?","two-steps":true},on:{"action-click":function($event){_vm.remove(content, 'organization')}}},[_c('i',{staticClass:"fa fa-times"})]),_vm._v("\n                                        "+_vm._s(content.label)+" ("+_vm._s(content.name)+") \n                                    ")],1),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"})])],1)}))}),_vm._v(" "),_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('paginator',{staticClass:"pagination-purple",attrs:{"skip":0,"number-of-items":_vm.contentLength,"items-per-page":_vm.state.itemsPerPage}})],1)])],2)])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("Add or modify a user")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_c('fform',{attrs:{"name":_vm.state.cform,"post_path":_vm.state.path,"put_path":_vm.state.path,"get_path":_vm.state.rpath,"get_form":_vm.state.rform}},[_c('finput',{attrs:{"name":"name","label":_vm.lang('b_form_name'),"is-required":true,"placeholder":_vm.lang('b_form_name'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":"label","label":_vm.lang('b_label'),"placeholder":_vm.lang('b_label'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":"group","label":_vm.lang('b_group'),"placeholder":_vm.lang('b_group'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"rows":"5","name":"description","label":_vm.lang('b_form_description'),"placeholder":_vm.lang('b_form_description_placeholder'),"type":"textarea","form":_vm.state.cform}}),_vm._v(" "),_c('tabber',{attrs:{"tabs":[_vm.lang('b_fields', {}, 'other'), _vm.lang('b_form_validation', {}, 'other')]},scopedSlots:_vm._u([{key:"tabs",fn:function(tprops){return [(tprops.id === 0)?_c('fvariadic-element',{attrs:{"name":"fields","form":_vm.state.cform,"tabs":true},scopedSlots:_vm._u([{key:"variadic",fn:function(props){return [_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".name"),"label":_vm.lang('b_name'),"is-required":true,"placeholder":_vm.lang('b_name'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".label"),"label":_vm.lang('b_label'),"is-required":true,"placeholder":_vm.lang('b_label'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".order"),"label":_vm.lang('b_field_order'),"is-required":true,"placeholder":_vm.lang('b_field_order'),"type":"number","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".multiple"),"label":_vm.lang('b_field_multiple'),"placeholder":_vm.lang('b_field_multiple'),"type":"checkbox","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".multiple_name"),"label":_vm.lang('b_field_multiple_name'),"placeholder":_vm.lang('b_field_multiple_name'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('fselect',{attrs:{"name":((props.fname) + "." + (props.id) + ".type"),"label":_vm.lang('b_field_type'),"is-required":true,"options":_vm.fieldtypes,"form":_vm.state.cform},on:{"select-change":function (val) {_vm.type_change(val, props.id)}}}),_vm._v(" "),(props.id in _vm.state.selected_types)?_c('div',[(_vm.state.selected_types[props.id] === 'select')?_c('div',[_c('fselect',{attrs:{"name":((props.fname) + "." + (props.id) + ".datasource.name"),"label":_vm.lang('b_datasource_name'),"is-required":true,"options":this.datasources,"fieldLabel":_vm.label,"fieldValue":_vm.name,"form":_vm.state.cform}})],1):(['text', 'phone', 'number', 'email', 'password'].indexOf(_vm.state.selected_types[props.id]) !== -1)?_c('div',[_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".placeholder"),"label":_vm.lang('b_placeholder'),"is-required":true,"placeholder":_vm.lang('b_placeholder'),"type":"text","form":_vm.state.cform}})],1):(['subform'].indexOf(_vm.state.selected_types[props.id]) !== -1)?_c('div',[_c('fselect',{attrs:{"name":((props.fname) + "." + (props.id) + ".subform"),"label":_vm.lang('b_subform'),"is-required":true,"options":_vm.content,"fieldLabel":"label","fieldValue":"name","form":_vm.state.cform}})],1):_vm._e()]):_vm._e()]}}])}):_vm._e(),_vm._v(" "),(tprops.id === 1)?_c('div',[_c('finput',{attrs:{"name":"validations.required","type":"checkbox","label":_vm.lang('b_form_required'),"form":_vm.state.cform}})],1):_vm._e()]}}])})],1)],1)])],1)])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39406925", __vue__options__)
  } else {
    hotAPI.reload("data-v-39406925", __vue__options__)
  }
})()}

},{"./Form":29,"vue":"vue","vue-hot-reload-api":195}],31:[function(require,module,exports){
'use strict';

var Utils = require('../../../common/utils/utils');
var APIRoutes = require('../../../common/api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');

module.exports = {
    mixins: [ReaderMixin],
    data: function data() {
        return {
            state: {}
        };
    },

    methods: {},
    mounted: function mounted() {},

    computed: {}
};

},{"../../../common/api/routes":44,"../../../common/utils/utils":69,"../mixins/ReaderMixin":37}],32:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Home');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-524cd205", __vue__options__)
  } else {
    hotAPI.reload("data-v-524cd205", __vue__options__)
  }
})()}

},{"./Home":31,"vue":"vue","vue-hot-reload-api":195}],33:[function(require,module,exports){
'use strict';

var Utils = require('../../../common/utils/utils');
var APIRoutes = require('../../../common/api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../../../common/mixins/LangMixin');
var Langs = require('../../lists/langs');
var Quantities = require('../../lists/quantities');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data: function data() {
        return {
            state: {
                path: APIRoutes.entity('lang', 'POST'),
                rpath: APIRoutes.entity('lang', 'GET'),
                cform: 'lang_creation',
                rform: 'lang_read',
                itemsPerPage: 50,
                itemsPerRow: 3,
                langs: Langs.LangsList,
                quantities: Quantities
            }
        };
    },

    methods: {},
    mounted: function mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.rform,
            path: this.state.rpath
        });
    },

    computed: {
        readContent: function readContent() {
            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                var partitions = form.content.reduce(function (obj, info) {
                    if (info.lang in obj) {
                        obj[info.lang].push(info);
                    } else {
                        obj[info.lang] = [info];
                    }
                    return obj;
                }, {});

                /* return Object.keys(partitions).reduce((obj, lang) => {
                    obj[lang] = Utils.to_matrix(partitions[lang], this.state.itemsPerRow);
                    return obj;
                }, {});*/
                return [];
            }
            return [];
        }
    }
};

},{"../../../common/api/routes":44,"../../../common/mixins/LangMixin":61,"../../../common/utils/utils":69,"../../lists/langs":17,"../../lists/quantities":18,"../mixins/ReaderMixin":37}],34:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Lang');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("List of language items")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_vm._l((_vm.readContent),function(row){return _c('div',{staticClass:"columns is-centered"},_vm._l((row),function(content){return _c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_c('action-button',{staticClass:"button is-small button-background-blue",on:{"action-click":function($event){_vm.update(content, 'lang')}}},[_c('i',{staticClass:"fa fa-pencil"})]),_vm._v(" "),_c('action-button',{staticClass:"button is-small button-background-red",attrs:{"confirmation":"Are you sure?","two-steps":true},on:{"action-click":function($event){_vm.remove(content, 'lang')}}},[_c('i',{staticClass:"fa fa-times"})]),_vm._v("\n                                        "+_vm._s(content.key)+" ("+_vm._s(content.lang)+")\n                                    ")],1),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"})])],1)}))}),_vm._v(" "),_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('paginator',{staticClass:"pagination-purple",attrs:{"skip":0,"number-of-items":_vm.contentLength,"items-per-page":_vm.state.itemsPerPage}})],1)])],2)])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("Add or modify a language item")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_c('fform',{attrs:{"name":_vm.state.cform,"post_path":_vm.state.path,"put_path":_vm.state.path,"get_path":_vm.state.rpath,"get_form":_vm.state.rform}},[_c('finput',{attrs:{"name":"key","label":_vm.lang('b_key'),"is-required":true,"placeholder":_vm.lang('b_key'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":"part","label":_vm.lang('b_part_of_website'),"is-required":true,"placeholder":_vm.lang('b_part_of_website'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('fselect',{attrs:{"name":"lang","label":_vm.lang('b_lang'),"is-required":true,"options":_vm.state.langs,"form":_vm.state.cform}}),_vm._v(" "),_c('fvariadic-element',{attrs:{"name":"values","form":_vm.state.cform,"tabs":true},scopedSlots:_vm._u([{key:"variadic",fn:function(props){return [_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".value"),"label":_vm.lang('b_text'),"is-required":true,"placeholder":_vm.lang('b_text_to_show'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('fselect',{attrs:{"name":((props.fname) + "." + (props.id) + ".quantity"),"label":_vm.lang('b_quantity'),"is-required":true,"options":_vm.state.quantities,"form":_vm.state.cform}})]}}])})],1)],1)])],1)])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a501936", __vue__options__)
  } else {
    hotAPI.reload("data-v-4a501936", __vue__options__)
  }
})()}

},{"./Lang":33,"vue":"vue","vue-hot-reload-api":195}],35:[function(require,module,exports){
'use strict';

var Utils = require('../../../common/utils/utils');
var APIRoutes = require('../../../common/api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../../../common/mixins/LangMixin');
var FieldTypes = require('../../lists/fieldtypes');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data: function data() {
        return {
            state: {
                path: APIRoutes.entity('form', 'POST'),
                rpath: APIRoutes.entity('form', 'GET'),
                cform: 'form_creation',
                rform: 'form_read',
                itemsPerPage: 20,
                itemsPerRow: 2,
                selected_types: {}
            }
        };
    },

    methods: {
        type_change: function type_change(val, idx) {
            if (val == null) {
                if (idx in this.state.selected_types) {
                    delete this.state.selected_types[idx];
                }
            } else {
                this.$set(this.state.selected_types, idx, val.value);
            }
        }
    },
    mounted: function mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.rform,
            path: this.state.rpath
        });
        this.$store.dispatch('search', {
            form: 'datatemplate_read',
            path: APIRoutes.entity('datatemplate', 'POST', true),
            body: {
                projection: ['label', 'name'],
                size: 10000
            }
        });
    },

    computed: {
        content: function content() {
            var _this = this;

            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                var content = form.content || [];
                return content.map(function (c) {
                    c.label = _this.lang(c.label);
                    c.description = _this.lang(c.description);
                    return c;
                });
            }
            return [];
        },
        readContent: function readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        fieldtypes: function fieldtypes() {
            var _this2 = this;

            return FieldTypes.map(function (ft) {
                return { value: ft.value, label: _this2.lang(ft.label) };
            });
        },
        datasources: function datasources() {
            if ('datatemplate_read' in this.$store.state.forms) {
                return this.$store.state.forms.datatemplate_read.content;
            }
            return [];
        }
    }
};

},{"../../../common/api/routes":44,"../../../common/mixins/LangMixin":61,"../../../common/utils/utils":69,"../../lists/fieldtypes":16,"../mixins/ReaderMixin":37}],36:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Menu');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"})])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ff35bbf6", __vue__options__)
  } else {
    hotAPI.reload("data-v-ff35bbf6", __vue__options__)
  }
})()}

},{"./Menu":35,"vue":"vue","vue-hot-reload-api":195}],37:[function(require,module,exports){
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vue = require('vue');
var APIRoutes = require('../../../common/api/routes');
var Messages = require('../../../common/api/messages');

module.exports = {
    methods: {
        update: function update(obj, entity) {
            var _this = this;

            this.$store.commit(Messages.CANCEL_FORM, {
                form: this.state.cform
            });

            Vue.nextTick(function () {
                _this.$store.commit(Messages.UPDATE_MODE_FORM, {
                    form: _this.state.cform,
                    update: true,
                    content: obj
                });
            });
        },
        remove: function remove(obj, entity) {
            this.$store.dispatch('remove', {
                form: this.state.rform,
                path: APIRoutes.entity(entity, 'DEL', false, obj._id),
                rpath: this.state.rpath,
                rform: this.state.rform
            });
        }
    },
    beforeMount: function beforeMount() {
        this.$store.commit(Messages.CREATE_FORM, {
            form: this.state.rform,
            content: []
        });
    },

    computed: {
        error: function error() {
            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                return form.error;
            }
            return {};
        },
        content: function content() {
            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                return form.content || [];
            }
            return [];
        },
        contentLength: function contentLength() {
            return this.content.length;
        }
    },
    watch: {
        error: function error(n) {
            if (n && (0, _keys2.default)(n).length > 0) {
                console.error(n.content.message);
                // toastr.error(n.content.message);
            }
        }
    }
};

},{"../../../common/api/messages":43,"../../../common/api/routes":44,"babel-runtime/core-js/object/keys":75,"vue":"vue"}],38:[function(require,module,exports){
'use strict';

var Utils = require('../../../common/utils/utils');
var APIRoutes = require('../../../common/api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../../../common/mixins/LangMixin');
var FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin],
    data: function data() {
        return {
            state: {
                path: APIRoutes.entity('user', 'POST'),
                rpath: APIRoutes.entity('user', 'GET'),
                cform: 'user_creation',
                rform: 'user_read',
                forms: {
                    name: 'form_read',
                    group: 'user'
                },
                itemsPerPage: 20,
                itemsPerRow: 2
            }
        };
    },

    methods: {},
    mounted: function mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.rform,
            path: this.state.rpath
        });
    },

    computed: {
        readContent: function readContent() {
            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                return Utils.to_matrix(form.content instanceof Array ? form.content : [], this.state.itemsPerRow);
            }
            return [];
        },
        contentLength: function contentLength() {
            if (this.state.rform in this.$store.state.forms) {
                var form = this.$store.state.forms[this.state.rform];
                return form.content.length;
            }
            return 0;
        }
    }
};

},{"../../../common/api/routes":44,"../../../common/mixins/FormMixin":60,"../../../common/mixins/LangMixin":61,"../../../common/utils/utils":69,"../mixins/ReaderMixin":37}],39:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./User');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("List of users")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_vm._l((_vm.readContent),function(row){return _c('div',{staticClass:"columns is-centered"},_vm._l((row),function(content){return _c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_c('action-button',{staticClass:"button is-small button-background-blue",on:{"action-click":function($event){_vm.update(content)}}},[_c('i',{staticClass:"fa fa-pencil"})]),_vm._v(" "),_c('action-button',{staticClass:"button is-small button-background-red",attrs:{"confirmation":"Are you sure?","two-steps":true},on:{"action-click":function($event){_vm.remove(content, 'organization')}}},[_c('i',{staticClass:"fa fa-times"})]),_vm._v("\n                                        "+_vm._s(content.firstname)+" "+_vm._s(content.lastname)+" \n                                    ")],1),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"})])],1)}))}),_vm._v(" "),_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('paginator',{staticClass:"pagination-purple",attrs:{"skip":0,"number-of-items":_vm.contentLength,"items-per-page":_vm.state.itemsPerPage}})],1)])],2)])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("Add or modify a user")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[(Object.keys(_vm.forms).length > 0)?_c('fform',{attrs:{"name":_vm.state.cform,"post_path":_vm.state.path,"put_path":_vm.state.path,"get_path":_vm.state.rpath,"get_form":_vm.state.rform}},[_c('dynamic-form',{attrs:{"form":_vm.forms['user_form'] || {},"cform":_vm.state.cform}})],1):_vm._e()],1)])],1)])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5b688585", __vue__options__)
  } else {
    hotAPI.reload("data-v-5b688585", __vue__options__)
  }
})()}

},{"./User":38,"vue":"vue","vue-hot-reload-api":195}],40:[function(require,module,exports){
'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

var Vue = require('vue');
var Router = require('vue-router');
var Header = require('./components/themes/ined/parts/header/Header.vue');
var Footer = require('./components/themes/ined/parts/footer/Footer.vue');
var Navbar = require('./components/themes/ined/parts/navbar/Navbar.vue');
var Menus = require('./menus');

Vue.use(Router);

var menu_routes = _.flatten(Menus.menu).map(function (menu) {
    return {
        path: menu.routes[0],
        name: menu.key,
        components: {
            header: Header,
            footer: Footer,
            navbar: Navbar,
            default: menu.component
        },
        props: { navbar: { menus: Menus.menu } }
    };
});

var other_routes = Menus.other.map(function (menu) {
    return {
        path: menu.routes[0],
        name: menu.key,
        components: {
            header: Header,
            footer: Footer,
            navbar: Navbar,
            default: menu.component
        },
        props: { navbar: { menus: Menus.menu } }
    };
});

module.exports = new Router({
    mode: 'history',
    routes: [].concat((0, _toConsumableArray3.default)(menu_routes), (0, _toConsumableArray3.default)(other_routes))
});

},{"./components/themes/ined/parts/footer/Footer.vue":10,"./components/themes/ined/parts/header/Header.vue":12,"./components/themes/ined/parts/navbar/Navbar.vue":14,"./menus":20,"babel-runtime/helpers/toConsumableArray":82,"lodash":"lodash","vue":"vue","vue-router":"vue-router"}],41:[function(require,module,exports){
'use strict';

module.exports = {
    admin: '/admin',
    user: '/admin/user',
    review: '/admin/review',
    datasource: '/admin/datasource',
    datainstance: '/admin/datasource/:datainstance',
    publication: '/admin/publication',
    csl: '/admin/csl',
    form: '/admin/form',
    menu: '/admin/menu',
    lang: '/admin/lang',
    external_repo: '/admin/external_repository',
    export_format: '/admin/export_format',
    handle_id: '/admin/handle_id',
    api: '/admin/api',
    config: '/admin/config'
};

},{}],42:[function(require,module,exports){
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fetch = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(object) {
        var method, path, body, commit, super_request, res;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        method = object.method, path = object.path, body = object.body, commit = object.commit;
                        super_request = Request[method.toLowerCase()](path).set('Authorization', 'bfa3e803-217e-4f00-97ed-5f6417464484N1a-FmKtW:test');

                        if (body != null && (0, _keys2.default)(body).length > 0) {
                            super_request = super_request.send(object.body);
                        }

                        _context.prev = 3;
                        _context.next = 6;
                        return super_request;

                    case 6:
                        res = _context.sent;
                        return _context.abrupt('return', {
                            type: Messages.SUCCESS,
                            content: res.body
                        });

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](3);
                        return _context.abrupt('return', {
                            type: Messages.FAILURE,
                            content: _context.t0.response != null ? _context.t0.response.body : _context.t0
                        });

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[3, 10]]);
    }));

    return function fetch(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Request = require('superagent');
var Messages = require('./messages');

module.exports = {
    fetch: fetch
};

},{"./messages":43,"babel-runtime/core-js/object/keys":75,"babel-runtime/helpers/asyncToGenerator":79,"babel-runtime/regenerator":84,"superagent":190}],43:[function(require,module,exports){
'use strict';

module.exports = {
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILURE: 'failure',
    FETCH: 'fetch',
    ERROR: 'error',
    CREATE_FORM: 'create_form',
    CANCEL_FORM: 'cancel_form',
    REMOVE_FORM: 'remove_form',
    REMOVE_ALL_FORMS: 'remove_all_forms',
    UPDATE_MODE_FORM: 'update_mode_form',
    TOGGLE_RECLAIM_FORM: 'toggle_reclaim_form',
    RECLAIM_FORM_ELEMENT: 'reclaim_form_element',
    ADD_TO_FORM_POOL: 'add_to_form_pool',
    REMOVE_FROM_FORM_POOL: 'remove_from_form_pool'
};

},{}],44:[function(require,module,exports){
'use strict';

var Config = require('../../../app/config');

var prefix = Config.api.public.prefix + '/' + Config.api.public.version;

module.exports = {
    entity: function entity(_entity, method) {
        var search = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        switch (method) {
            case 'GET':
                {
                    var url = prefix + '/' + _entity;
                    if (id == null) {
                        url += 's';
                    }
                    return url;
                }
            case 'POST':
                {
                    if (search) {
                        return prefix + '/' + _entity + 's/search';
                    }
                    return prefix + '/' + _entity;
                }
            case 'PUT':
                return prefix + '/' + _entity;
            case 'DEL':
                return prefix + '/' + _entity + '/' + id;
            default:
                return '';
        }
    }
};

},{"../../../app/config":2}],45:[function(require,module,exports){
'use strict';

var LangMixin = require('../../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        form: { required: true },
        cform: { type: String, required: true },
        prefix: { type: String, default: '' }
    },
    methods: {
        get_name: function get_name(name) {
            if (this.prefix !== '') {
                return this.prefix + '.' + name;
            }
            return name;
        }
    }
};

},{"../../../../mixins/LangMixin":61}],46:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./DynamicForm');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[_vm._l((_vm.form.fields),function(field){return [(field.multiple)?_c('fvariadic-element',{staticClass:"field",attrs:{"name":field.multiple_name,"form":_vm.cform},scopedSlots:_vm._u([{key:"variadic",fn:function(props){return [(['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea'].indexOf(field.type) !== -1)?_c('finput',{attrs:{"label":_vm.lang(field.label || ''),"name":_vm.get_name(((props.fname) + "." + (props.id) + "." + (field.name))),"placeholder":_vm.lang(field.placeholder || ''),"type":field.type,"form":_vm.cform}}):(field.type === 'subform' && field.subform != null)?_c('dynamic-form',{attrs:{"form":field.subform,"cform":_vm.cform,"prefix":((props.fname) + "." + (props.id))}}):_vm._e()]}}])}):[(['checkbox', 'radio', 'text', 'email', 'phone', 'password', 'number', 'textarea'].indexOf(field.type) !== -1)?_c('finput',{attrs:{"label":_vm.lang(field.label || ''),"name":_vm.get_name(field.name, null),"placeholder":_vm.lang(field.placeholder || ''),"type":field.type,"form":_vm.cform}}):(field.type === 'subform' && field.subform != null)?_c('dynamic-form',{attrs:{"form":field.subform,"cform":_vm.cform}}):_vm._e()]]})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-260d6a9e", __vue__options__)
  } else {
    hotAPI.reload("data-v-260d6a9e", __vue__options__)
  }
})()}

},{"./DynamicForm":45,"vue":"vue","vue-hot-reload-api":195}],47:[function(require,module,exports){
'use strict';

var Messages = require('../../../../../api/messages');
var Utils = require('../../../../../utils/utils');
var InputMixin = require('../../mixins/InputMixin');

module.exports = {
    mixins: [InputMixin],
    props: {
        name: { required: true, type: String },
        label: { required: true, type: String },
        placeholder: { required: true, type: String },
        isRequired: { default: false, type: Boolean },
        type: { required: true, type: String },
        read: { default: false, type: Boolean },
        hidden: { default: false, type: Boolean },
        form: { required: true, type: String },
        rows: { default: 10 },
        radioButtons: { default: function _default() {
                return [];
            }, type: Array }
    },

    data: function data() {
        return {
            state: {
                value: this.defaultValue()
            }
        };
    },


    methods: {
        update: function update() {
            var form = this.$store.state.forms[this.form];
            if (form.update) {
                this.state.value = Utils.find_value_with_path(form.content, this.name.split('.'));
                if (this.state.value == null) {
                    this.state.value = this.defaultValue();
                }
            } else {
                this.state.value = this.defaultValue();
            }
        },
        defaultValue: function defaultValue() {
            if (this.type === 'checkbox' || this.type === 'radio') {
                return false;
            }
            return undefined;
        }
    },

    watch: {
        reclaim: function reclaim(n) {
            if (n) {
                this.$store.commit(Messages.RECLAIM_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: this.state.value
                });
            }
        },
        cancel: function cancel(n) {
            if (n) {
                this.state.value = this.defaultValue();
            }
        }
    },
    computed: {}
};

},{"../../../../../api/messages":43,"../../../../../utils/utils":69,"../../mixins/InputMixin":55}],48:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Input');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.type === 'text' || _vm.type === 'number' || _vm.type === 'password' || _vm.type === 'email')?_c('div',{staticClass:"field"},[_c('label',{attrs:{"for":_vm.name}},[_vm._v(_vm._s(_vm.label)),(_vm.isRequired)?_c('span',{staticClass:"redify"},[_vm._v("*")]):_vm._e()]),_vm._v(" "),(_vm.type === 'text')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input",attrs:{"type":"text","placeholder":_vm.placeholder,"name":_vm.name},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}}):(_vm.type === 'number')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input",attrs:{"type":"number","placeholder":_vm.placeholder,"name":_vm.name},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}}):(_vm.type === 'password')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input",attrs:{"type":"password","placeholder":_vm.placeholder,"name":_vm.name},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input",attrs:{"type":"email","placeholder":_vm.placeholder,"name":_vm.name},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}}),_vm._v(" "),(_vm.validations.length > 0)?_c('div',_vm._l((_vm.validations),function(text){return _c('p',{staticClass:"redify inline-block"},[_vm._v("\n            "+_vm._s(text)+"\n        ")])})):_vm._e()]):(_vm.type === 'textarea')?_c('div',{staticClass:"field"},[_c('label',{attrs:{"for":"name"}},[_vm._v(_vm._s(_vm.label)),(_vm.isRequired)?_c('span',{staticClass:"redify"},[_vm._v("*")]):_vm._e()]),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input textarea",attrs:{"placeholder":_vm.placeholder,"name":_vm.name,"rows":_vm.rows},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}})]):(_vm.type === 'radio')?_c('div',{staticClass:"field"},[_c('label',{attrs:{"for":_vm.name}},[_vm._v("{{label}"),(_vm.isRequired)?_c('span',{staticClass:"redify"},[_vm._v("*")]):_vm._e()]),_vm._v(" "),_c('div',_vm._l((_vm.radioButtons),function(btn,idx){return _c('label',{staticClass:"radio-inline",attrs:{"for":"btn[0]"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],attrs:{"type":"radio","name":_vm.name},domProps:{"checked":_vm._q(_vm.state.value,null)},on:{"change":function($event){_vm.$set(_vm.state, "value", null)}}}),_vm._v("\n            "+_vm._s(btn[1])+"\n        ")])}))]):(_vm.type === 'checkbox')?_c('div',{staticClass:"checkbox"},[_c('label',{attrs:{"for":_vm.name}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],attrs:{"type":"checkbox","name":_vm.name},domProps:{"checked":Array.isArray(_vm.state.value)?_vm._i(_vm.state.value,null)>-1:(_vm.state.value)},on:{"change":function($event){var $$a=_vm.state.value,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.state.value=$$a.concat([$$v]))}else{$$i>-1&&(_vm.state.value=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.$set(_vm.state, "value", $$c)}}}}),_vm._v("\n        "+_vm._s(_vm.label)+"\n    ")])]):_vm._e()}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b397c06", __vue__options__)
  } else {
    hotAPI.reload("data-v-3b397c06", __vue__options__)
  }
})()}

},{"./Input":47,"vue":"vue","vue-hot-reload-api":195}],49:[function(require,module,exports){
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VSelect = require('vue-select').VueSelect;
var InputMixin = require('../../mixins/InputMixin');
var Utils = require('../../../../../utils/utils');
var Messages = require('../../../../../api/messages');

module.exports = {
    props: {
        name: { required: true, type: String },
        label: { required: true, type: String },
        isRequired: { default: false, type: Boolean },
        form: { required: true, type: String },
        multi: { default: false, type: Boolean },
        options: { required: true, type: Array },
        fieldLabel: { required: false, default: 'label', type: String },
        fieldValue: { required: false, default: 'value', type: String }
    },
    components: {
        'v-select': VSelect
    },
    mixins: [InputMixin],
    data: function data() {
        return {
            state: {
                selected: null,
                options: []
            }
        };
    },

    methods: {
        update: function update() {
            var _this = this;

            var form = this.$store.state.forms[this.form];
            if (form.update) {
                var info = Utils.find_value_with_path(form.content, this.name.split('.'));
                if (info == null) {
                    // Noop
                } else if (info instanceof Array) {
                    info = info.map(function (o) {
                        if (_this.fieldLabel in o) {
                            return o;
                        }
                        var missing = _this.options.filter(function (op) {
                            return o[_this.fieldValue] === op[_this.fieldValue];
                        });
                        if (missing.length > 0) {
                            o[_this.fieldLabel] = missing[0][_this.fieldLabel];
                            return o;
                        }
                        return null;
                    }).filter(function (o) {
                        return o != null;
                    });
                } else if (typeof info === 'string') {
                    var missing = this.options.filter(function (o) {
                        return info === o[_this.fieldValue];
                    });
                    if (missing.length > 0) {
                        var _info;

                        info = (_info = {}, (0, _defineProperty3.default)(_info, this.fieldValue, info), (0, _defineProperty3.default)(_info, this.fieldLabel, missing[0][this.fieldLabel]), _info);
                    } else {
                        info = null;
                    }
                } else {
                    var _missing = this.options.filter(function (o) {
                        return info[_this.fieldValue] === o[_this.fieldValue];
                    });
                    if (_missing.length > 0) {
                        var _info2;

                        info = (_info2 = {}, (0, _defineProperty3.default)(_info2, this.fieldValue, info), (0, _defineProperty3.default)(_info2, this.fieldLabel, _missing[0][this.fieldLabel]), _info2);
                    } else {
                        info = null;
                    }
                }
                this.state.selected = info;
            }
        },
        onChange: function onChange(val) {
            this.state.selected = val;
            this.$emit('select-change', val);
        },
        extract_values: function extract_values(infos) {
            if (infos == null) {
                return null;
            }

            if (infos instanceof Array) {
                return infos.map(function (o) {
                    return o.value;
                });
            }
            return infos.value;
        },
        format_options: function format_options() {
            var _this2 = this;

            if (this.fieldValue === 'value') {
                this.state.options = this.options;
            }

            this.state.options = this.options.map(function (o) {
                return { label: o[_this2.fieldLabel], value: o[_this2.fieldValue] };
            });
        }
    },
    watch: {
        reclaim: function reclaim(n) {
            if (n) {
                this.$store.commit(Messages.RECLAIM_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: this.extract_values(this.state.selected)
                });
            }
        },
        cancel: function cancel(n) {
            if (n) {
                this.state.selected = null;
            }
        },
        options: function options() {
            this.format_options();
        }
    },
    beforeMount: function beforeMount() {
        this.format_options();
    }
};

},{"../../../../../api/messages":43,"../../../../../utils/utils":69,"../../mixins/InputMixin":55,"babel-runtime/helpers/defineProperty":80,"vue-select":196}],50:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Select');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[_c('label',{attrs:{"for":_vm.name}},[_vm._v(_vm._s(_vm.label)),(_vm.isRequired)?_c('span',{staticClass:"redify"},[_vm._v("*")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"control"},[_c('v-select',{staticClass:"input",attrs:{"multiple":_vm.multi,"options":_vm.state.options,"label":_vm.fieldLabel,"on-change":_vm.onChange,"value":_vm.state.selected}})],1),_vm._v(" "),(_vm.validations.length > 0)?_c('div',_vm._l((_vm.validations),function(text){return _c('p',{staticClass:"redify inline-block"},[_vm._v("\n            "+_vm._s(text)+"\n        ")])})):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cbd9c5a0", __vue__options__)
  } else {
    hotAPI.reload("data-v-cbd9c5a0", __vue__options__)
  }
})()}

},{"./Select":49,"vue":"vue","vue-hot-reload-api":195}],51:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var Messages = require('../../../../../api/messages');
var Utils = require('../../../../../utils/utils');
var InputMixin = require('../../mixins/InputMixin');

module.exports = {
    mixins: [InputMixin],
    props: {
        name: { required: true, type: String },
        form: { required: true, type: String },
        array: { type: Boolean, default: true },
        isRequired: { type: Boolean, default: true },
        tabs: { type: Boolean, default: false }
    },

    data: function data() {
        return {
            state: {
                elements: [],
                tab_active: this.isRequired ? 0 : -1
            }
        };
    },


    methods: {
        activate_tab: function activate_tab(id, e) {
            e.preventDefault();
            this.state.tab_active = id;
        },
        add: function add(e) {
            e.preventDefault();
            this.state.elements.push(true);
        },
        remove: function remove(id, e) {
            e.preventDefault();
            this.state.elements.splice(id, 1, false);
        },
        update: function update() {
            var form = this.$store.state.forms[this.form];
            if (form.update) {
                var object = Utils.find_value_with_path(form.content, this.name.split('.'));
                if (object instanceof Array) {
                    this.state.elements = object.map(function () {
                        return true;
                    });
                } else {
                    this.state.elements = _.map(object, function () {
                        return true;
                    });
                }
            } else {
                this.state.elements = this.isRequired ? [true] : [];
            }
        }
    },

    computed: {},

    watch: {
        reclaim: function reclaim(n) {
            if (n) {
                this.$store.commit(Messages.RECLAIM_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: this.state.value
                });
            }
        },
        cancel: function cancel(n) {
            if (n) {
                this.state.value = undefined;
            }
        }
    }
};

},{"../../../../../api/messages":43,"../../../../../utils/utils":69,"../../mixins/InputMixin":55,"lodash":"lodash"}],52:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./VariadicElement');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"columns is-marginless"},[_c('div',{staticClass:"column is-paddingless"},[_c('a',{staticClass:"icon has-text-success",attrs:{"href":"#"},on:{"click":_vm.add}},[_c('i',{staticClass:"fa fa-plus"})])])]),_vm._v(" "),(_vm.tabs && _vm.state.elements.length > 0)?_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column is-1"},_vm._l((_vm.state.elements),function(show,idx){return (show)?_c('p',{key:idx},[_c('a',{class:((_vm.state.tab_active === idx ? 'is-success': '') + " button is-small"),on:{"click":function($event){_vm.activate_tab(idx, $event)}}},[_c('span',{staticClass:"icon is-small"},[_vm._v("\n                        "+_vm._s(idx+1)+" \n                    ")])]),_vm._v(" "),_c('a',{staticClass:"icon is-small has-text-danger",attrs:{"href":"#"},on:{"click":function($event){_vm.remove(idx, $event)}}},[_c('i',{staticClass:"fa fa-times"})])]):_vm._e()})),_vm._v(" "),_c('div',{staticClass:"column"},_vm._l((_vm.state.elements),function(show,idx){return (show)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.state.tab_active === idx),expression:"state.tab_active === idx"}],key:idx},[_vm._t("variadic",null,{id:idx,fname:_vm.name}),_vm._v(" "),_c('hr')],2):_vm._e()}))]):(!_vm.tabs && _vm.state.elements.length > 0)?_c('div',_vm._l((_vm.state.elements),function(show,idx){return (show)?_c('div',{key:idx,staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('div',{staticClass:"is-pulled-right"},[_c('a',{staticClass:"icon has-text-danger",attrs:{"href":"#"},on:{"click":function($event){_vm.remove(idx, $event)}}},[_c('i',{staticClass:"fa fa-times"})])]),_vm._v(" "),_vm._t("variadic",null,{id:idx,fname:_vm.name}),_vm._v(" "),_c('hr')],2)]):_vm._e()})):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e17a20e", __vue__options__)
  } else {
    hotAPI.reload("data-v-6e17a20e", __vue__options__)
  }
})()}

},{"./VariadicElement":51,"vue":"vue","vue-hot-reload-api":195}],53:[function(require,module,exports){
'use strict';

var Messages = require('../../../../api/messages');
var APIRoutes = require('../../../../api/routes');

module.exports = {
    props: {
        name: { default: 'default_form' },
        post_path: { type: String, required: true },
        put_path: { type: String, required: true },
        get_path: { type: String, required: true },
        get_form: { type: String, required: true }
    },
    data: function data() {
        return {
            state: {
                update_mode: false
            }
        };
    },

    methods: {
        submit: function submit(e) {
            e.preventDefault();
            this.$store.commit(Messages.TOGGLE_RECLAIM_FORM, {
                form: this.name,
                reclaim: true
            });
            this.$store.commit(Messages.LOADING, {
                form: this.name
            });
        },
        cancel: function cancel(e) {
            e.preventDefault();
            this.$store.commit(Messages.UPDATE_MODE_FORM, { form: this.name,
                content: {},
                update: false });
            this.$store.commit(Messages.TOGGLE_RECLAIM_FORM, {
                form: this.name,
                reclaim: false
            });
            this.$store.commit(Messages.CANCEL_FORM, {
                form: this.name
            });
        }
    },
    beforeMount: function beforeMount() {
        this.$store.commit(Messages.CREATE_FORM, { form: this.name, content: {} });
    },
    beforeDestroy: function beforeDestroy() {
        this.$store.commit(Messages.REMOVE_FORM, { form: this.name });
    },


    computed: {
        update_mode: function update_mode() {
            if (this.name in this.$store.state.forms) {
                var form = this.$store.state.forms[this.name];
                return form.update;
            }
            return false;
        },
        error: function error() {
            if (this.name in this.$store.state.forms) {
                var form = this.$store.state.forms[this.name];
                return form.error;
            }
            return {};
        },
        loading: function loading() {
            if (this.name in this.$store.state.forms) {
                var form = this.$store.state.forms[this.name];
                return form.loading;
            }
            return false;
        },
        claims: function claims() {
            if (this.name in this.$store.state.forms) {
                var form = this.$store.state.forms[this.name];
                return form.claims;
            }
            return 0;
        },
        content: function content() {
            if (this.name in this.$store.state.forms) {
                var form = this.$store.state.forms[this.name];
                return form.content;
            }
            return {};
        },
        success: function success() {
            if (this.name in this.$store.state.forms) {
                var form = this.$store.state.forms[this.name];
                return form.success;
            }
            return '';
        }
    },

    watch: {
        update_mode: function update_mode(n) {
            this.state.update_mode = n;
        },
        claims: function claims(n) {
            var form = this.$store.state.forms[this.name];
            if (n === form.pool) {
                var payload = {
                    form: this.name,
                    rpath: this.get_path,
                    rform: this.get_form,
                    body: form.content
                };
                if (this.state.update_mode) {
                    payload.path = this.put_path;
                    this.$store.dispatch('update', payload);
                } else {
                    payload.path = this.post_path;
                    this.$store.dispatch('create', payload);
                }
            }
        },
        success: function success(n) {}
    }
};

},{"../../../../api/messages":43,"../../../../api/routes":44}],54:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Form');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{on:{"submit":function($event){$event.preventDefault();_vm.submit($event)}}},[(_vm.error.found)?_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('article',{staticClass:"message is-red"},[_c('div',{staticClass:"message-body"},[_c('p',[_c('strong',[_vm._v("An error occured -")]),_vm._v(" "+_vm._s(_vm.error.content.message))])])])])]):(_vm.success != null && _vm.success.length > 0)?_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('article',{staticClass:"message is-green"},[_c('div',{staticClass:"message-body"},[_c('p',[_vm._v(_vm._s(_vm.success))])])])])]):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),_c('div',{staticClass:"field is-grouped"},[_c('div',{staticClass:"control"},[(_vm.loading)?_c('button',{staticClass:"button button-background-blue"},[_c('i',{staticClass:"fa fa-spinner fa-spin m-right-xs"}),_vm._v("\n                Loading\n            ")]):_c('button',{staticClass:"button button-background-blue",attrs:{"type":"submit"},on:{"click":_vm.submit}},[_vm._v(_vm._s(_vm.state.update_mode ? 'Modify' : 'Save'))])]),_vm._v(" "),_c('div',{staticClass:"control"},[_c('button',{staticClass:"button button-background-red",attrs:{"type":"submit"},on:{"click":_vm.cancel}},[_vm._v("Cancel")])])]),_vm._v(" "),(_vm.error.found)?_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('article',{staticClass:"message is-red"},[_c('div',{staticClass:"message-body"},[_c('p',[_c('strong',[_vm._v("An error occured -")]),_vm._v(" "+_vm._s(_vm.error.content.message))])])])])]):(_vm.success != null && _vm.success.length > 0)?_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('article',{staticClass:"message is-green"},[_c('div',{staticClass:"message-body"},[_c('p',[_vm._v(_vm._s(_vm.success))])])])])]):_vm._e()],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-782b8526", __vue__options__)
  } else {
    hotAPI.reload("data-v-782b8526", __vue__options__)
  }
})()}

},{"./Form":53,"vue":"vue","vue-hot-reload-api":195}],55:[function(require,module,exports){
'use strict';

var Messages = require('../../../../api/messages');

module.exports = {
    computed: {
        validations: function validations() {
            if (this.form in this.$store.state.forms) {
                var form = this.$store.state.forms[this.form];
                if (this.name in form.validations) {
                    return form.validations[this.name].map(function (o) {
                        return o.message;
                    });
                }
                return [];
            }
            return [];
        },
        update_mode: function update_mode() {
            if (this.form in this.$store.state.forms) {
                var form = this.$store.state.forms[this.form];
                return form.update;
            }
            return false;
        },
        reclaim: function reclaim() {
            if (this.form in this.$store.state.forms) {
                var form = this.$store.state.forms[this.form];
                return form.reclaim;
            }
            return false;
        },
        cancel: function cancel() {
            if (this.form in this.$store.state.forms) {
                var form = this.$store.state.forms[this.form];
                return form.cancel;
            }
            return false;
        }
    },
    mounted: function mounted() {
        this.update();
        this.$store.commit(Messages.ADD_TO_FORM_POOL, { form: this.form });
    },
    beforeDestroy: function beforeDestroy() {
        this.$store.commit(Messages.REMOVE_FROM_FORM_POOL, { form: this.form, name: this.name });
    },

    watch: {
        update_mode: function update_mode() {
            this.update();
        }
    }
};

},{"../../../../api/messages":43}],56:[function(require,module,exports){
'use strict';

module.exports = {
    props: ['numberOfItems', 'itemsPerPage', 'skip'],
    data: function data() {
        return {
            state: {
                first_page: 1,
                current_page: 1,
                last_page: 1
            }
        };
    },

    methods: {
        goto: function goto(page, e) {
            e.preventDefault();
            if (page < 1) {
                return;
            }
            if (page > this.state.last_page) {
                return;
            }
            this.state.current_page = page;
        }
    },
    mounted: function mounted() {
        this.state.last_page = Math.ceil(this.numberOfItems / this.itemsPerPage);
        this.state.current_page = parseInt((this.skip + this.itemsPerPage) / this.itemsPerPage, 10);
    }
};

},{}],57:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Paginator');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.state.first_page < _vm.state.last_page)?_c('nav',{staticClass:"is-small pagination is-centered",attrs:{"role":"navigation","aria-label":"pagination"}},[_c('ul',{staticClass:"pagination-list"},[(_vm.state.current_page > 1)?_c('li',[_c('a',{staticClass:"pagination-link",on:{"click":function($event){_vm.goto(_vm.state.current_page-1, $event)}}},[_vm._v("Previous")])]):_vm._e(),_vm._v(" "),(_vm.state.current_page > _vm.state.first_page)?_c('li',[_c('a',{staticClass:"pagination-link",attrs:{"aria-label":"Goto page 1"},on:{"click":function($event){_vm.goto(1, $event)}}},[_vm._v("1")])]):_vm._e(),_vm._v(" "),(_vm.state.current_page-1 > 2)?_c('li',[_c('span',{staticClass:"pagination-ellipsis"},[_vm._v("…")])]):_vm._e(),_vm._v(" "),(_vm.state.current_page > _vm.state.first_page + 1)?_c('li',[_c('a',{staticClass:"pagination-link",attrs:{"aria-label":("Goto page " + (_vm.state.current_page-1))},on:{"click":function($event){_vm.goto(_vm.state.current_page-1, $event)}}},[_vm._v(_vm._s(_vm.state.current_page-1))])]):_vm._e(),_vm._v(" "),_c('li',[_c('a',{staticClass:"pagination-link is-current",attrs:{"aria-label":("Page " + (_vm.state.current_page)),"aria-current":"page"}},[_vm._v(_vm._s(_vm.state.current_page))])]),_vm._v(" "),(_vm.state.current_page < _vm.state.last_page-1)?_c('li',[_c('a',{staticClass:"pagination-link",attrs:{"aria-label":("Goto page " + (_vm.state.current_page+1))},on:{"click":function($event){_vm.goto(_vm.state.current_page+1, $event)}}},[_vm._v(_vm._s(_vm.state.current_page+1))])]):_vm._e(),_vm._v(" "),(_vm.state.current_page+1 < _vm.state.last_page-1)?_c('li',[_c('span',{staticClass:"pagination-ellipsis"},[_vm._v("…")])]):_vm._e(),_vm._v(" "),(_vm.state.current_page < _vm.state.last_page)?_c('li',[_c('a',{staticClass:"pagination-link",attrs:{"aria-label":("Goto page " + (_vm.state.last_page))},on:{"click":function($event){_vm.goto(_vm.state.last_page, $event)}}},[_vm._v(_vm._s(_vm.state.last_page))])]):_vm._e(),_vm._v(" "),(_vm.state.current_page < _vm.state.last_page)?_c('li',[_c('a',{staticClass:"pagination-link",on:{"click":function($event){_vm.goto(_vm.state.current_page+1, $event)}}},[_vm._v("Next")])]):_vm._e()])]):_vm._e()}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5a0665aa", __vue__options__)
  } else {
    hotAPI.reload("data-v-5a0665aa", __vue__options__)
  }
})()}

},{"./Paginator":56,"vue":"vue","vue-hot-reload-api":195}],58:[function(require,module,exports){
"use strict";

module.exports = {
    props: {
        tabs: { required: true, type: Array }
    },
    data: function data() {
        return {
            state: {
                current: 0
            }
        };
    },

    methods: {
        go: function go(idx, e) {
            e.preventDefault();
            this.state.current = idx;
        }
    }
};

},{}],59:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Tabber');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tabs"},[_c('ul',_vm._l((_vm.tabs),function(text,idx){return _c('li',{key:idx,class:{'is-active': _vm.state.current === idx},on:{"click":function($event){_vm.go(idx, $event)}}},[_c('a',[_vm._v(_vm._s(text))])])}))]),_vm._v(" "),_vm._t("tabs",null,{id:_vm.state.current})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78bfb346", __vue__options__)
  } else {
    hotAPI.reload("data-v-78bfb346", __vue__options__)
  }
})()}

},{"./Tabber":58,"vue":"vue","vue-hot-reload-api":195}],60:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var APIRoutes = require('../api/routes');
var LangMixin = require('./LangMixin');

module.exports = {
    mixins: [LangMixin],
    computed: {
        forms: function forms() {
            var _this = this;

            if (this.state.forms.name in this.$store.state.forms) {
                var myform = this.$store.state.forms[this.state.forms.name];
                var content = myform.content;
                var forms = content.reduce(function (obj, form) {
                    form.label = _this.lang(form.label);
                    form.description = _this.lang(form.description);
                    form.fields = form.fields.map(function (field) {
                        field.label = _this.lang(field.label);
                        return field;
                    });
                    obj[form.name] = _.cloneDeep(form);
                    return obj;
                }, {});
                return _.reduce(forms, function (obj, form, name) {
                    if (form.has_subforms) {
                        form.fields = form.fields.map(function (field) {
                            if (field.type === 'subform') {
                                field.subform = forms[field.subform];
                            }
                            return field;
                        });
                    }
                    obj[name] = form;
                    return obj;
                }, {});
            }
            return {};
        }
    },
    mounted: function mounted() {
        this.$store.dispatch('search', {
            form: this.state.forms.name,
            path: APIRoutes.entity('form', 'POST', true),
            body: {
                size: 1000,
                where: {
                    group: this.state.forms.group
                }
            }
        });
    }
};

},{"../api/routes":44,"./LangMixin":61,"lodash":"lodash"}],61:[function(require,module,exports){
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringUtils = require('../utils/strings');

module.exports = {
    methods: {
        lang: function lang(key, obj, n) {
            if (!(key in this.clang)) {
                return key;
            }

            var info = this.clang[key];
            var text = key;
            // TODO finish implementation for few and many
            if (n == null) {
                if ('1' in info) {
                    text = info['1'] || key;
                } else {
                    text = info['n/a'] || key;
                }
            } else if (n === 0) {
                text = info.zero || info['n/a'] || key;
            } else if (n === 1) {
                text = info.one || info['n/a'] || key;
            } else if (n === 2) {
                text = info.two || info['n/a'] || key;
            } else {
                text = info.other || info['n/a'] || key;
            }

            if (obj == null || (0, _keys2.default)(obj).length === 0) {
                return text;
            }

            return StringUtils.format_with_obj(text, obj);
        }
    },
    computed: {
        clang: function clang() {
            return this.$store.state.lang_content[this.$store.state.interfaceLang];
        }
    }
};

},{"../utils/strings":68,"babel-runtime/core-js/object/keys":75}],62:[function(require,module,exports){
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var create_or_update = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, _ref2) {
        var path = _ref2.path,
            body = _ref2.body,
            form = _ref2.form,
            rform = _ref2.rform,
            rpath = _ref2.rpath;
        var up = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var method, payload, response;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        method = up ? 'PUT' : 'POST';
                        payload = {
                            path: path,
                            method: method,
                            body: body,
                            commit: ctx.commit
                        };


                        ctx.commit(Messages.LOADING, { form: form });
                        _context.next = 5;
                        return API.fetch(payload);

                    case 5:
                        response = _context.sent;

                        ctx.commit(Messages.FETCH, { method: method, response: response, form: form });
                        ctx.dispatch('single_read', {
                            form: rform,
                            path: rpath
                        });

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function create_or_update(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = require('../api');
var Messages = require('../api/messages');

module.exports = {
    create: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, payload) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return create_or_update(ctx, payload, false);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function create(_x4, _x5) {
            return _ref3.apply(this, arguments);
        };
    }(),

    update: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, payload) {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return create_or_update(ctx, payload, true);

                        case 2:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function update(_x6, _x7) {
            return _ref4.apply(this, arguments);
        };
    }(),

    remove: function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, _ref6) {
            var path = _ref6.path,
                form = _ref6.form,
                rpath = _ref6.rpath,
                rform = _ref6.rform;
            var payload, response;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            payload = {
                                path: path,
                                method: 'DEL',
                                commit: ctx.commit
                            };


                            ctx.commit(Messages.LOADING, { form: form });
                            _context4.next = 4;
                            return API.fetch(payload);

                        case 4:
                            response = _context4.sent;

                            ctx.commit(Messages.FETCH, { method: 'DEL', response: response, form: form });
                            ctx.dispatch('single_read', {
                                form: rform,
                                path: rpath
                            });

                        case 7:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function remove(_x8, _x9) {
            return _ref5.apply(this, arguments);
        };
    }(),

    single_read: function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, _ref8) {
            var form = _ref8.form,
                path = _ref8.path;
            var payload, response;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            payload = {
                                path: path,
                                method: 'GET',
                                commit: ctx.commit
                            };


                            ctx.commit(Messages.LOADING, { form: form });
                            _context5.next = 4;
                            return API.fetch(payload);

                        case 4:
                            response = _context5.sent;

                            ctx.commit(Messages.FETCH, { method: 'GET', response: response, form: form });

                        case 6:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        return function single_read(_x10, _x11) {
            return _ref7.apply(this, arguments);
        };
    }(),

    search: function () {
        var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx, _ref10) {
            var form = _ref10.form,
                path = _ref10.path,
                body = _ref10.body;
            var payload, response;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            payload = {
                                path: path,
                                method: 'POST',
                                commit: ctx.commit,
                                body: body
                            };


                            ctx.commit(Messages.LOADING, { form: form });
                            _context6.next = 4;
                            return API.fetch(payload);

                        case 4:
                            response = _context6.sent;

                            ctx.commit(Messages.FETCH, { method: 'GET', response: response, form: form });

                        case 6:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        }));

        return function search(_x12, _x13) {
            return _ref9.apply(this, arguments);
        };
    }(),

    grab_config: function () {
        var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx, _ref12) {
            var path = _ref12.path,
                body = _ref12.body;
            var payload, response, content;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            payload = {
                                path: path,
                                method: 'POST',
                                commit: ctx.commit,
                                body: body
                            };
                            _context7.next = 3;
                            return API.fetch(payload);

                        case 3:
                            response = _context7.sent;

                            // const success = response.type === Messages.SUCCESS;
                            if (response.content == null) {
                                response.content = {};
                            }

                            console.log(response.content);

                            content = 'result' in response.content && 'hits' in response.content.result ? response.content.result.hits : [];

                            if (content.length > 0) {
                                ctx.state.global_config = content[0].source;
                            }

                        case 8:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, undefined);
        }));

        return function grab_config(_x14, _x15) {
            return _ref11.apply(this, arguments);
        };
    }(),

    grab_language: function () {
        var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(ctx, _ref14) {
            var path = _ref14.path,
                body = _ref14.body;
            var payload, response, content;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            payload = {
                                path: path,
                                method: 'POST',
                                commit: ctx.commit,
                                body: body
                            };
                            _context8.next = 3;
                            return API.fetch(payload);

                        case 3:
                            response = _context8.sent;

                            // const success = response.type === Messages.SUCCESS;
                            if (response.content == null) {
                                response.content = {};
                            }

                            content = 'result' in response.content && 'hits' in response.content.result ? response.content.result.hits : [];

                            ctx.state.lang_content = content.reduce(function (obj, src) {
                                var l = src.source;
                                var lang = obj[l.lang] || {};
                                lang[l.key] = l.values.reduce(function (values, v) {
                                    values[v.quantity] = v.value;
                                    return values;
                                }, {});
                                obj[l.lang] = lang;
                                return obj;
                            }, {});

                        case 7:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, undefined);
        }));

        return function grab_language(_x16, _x17) {
            return _ref13.apply(this, arguments);
        };
    }()
};

},{"../api":42,"../api/messages":43,"babel-runtime/helpers/asyncToGenerator":79,"babel-runtime/regenerator":84}],63:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],64:[function(require,module,exports){
'use strict';

var Vue = require('vue');
var Vuex = require('vuex');
var mutations = require('./mutations');
var actions = require('./actions');
var state = require('./state');
var getters = require('./getters');

Vue.use(Vuex);

var store = new Vuex.Store({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
});

module.exports = store;

},{"./actions":62,"./getters":63,"./mutations":65,"./state":66,"vue":"vue","vuex":"vuex"}],65:[function(require,module,exports){
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _module$exports;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var Messages = require('../api/messages');
var Utils = require('../utils/utils');

function create_form() {
    return {
        pool: 0,
        claims: 0,
        validations: {},
        error: {},
        loading: false,
        update: false,
        reclaim: false,
        cancel: false,
        success: '',
        content: []
    };
}

module.exports = (_module$exports = {}, (0, _defineProperty3.default)(_module$exports, Messages.LOADING, function (state, payload) {
    var form_name = payload.form;
    if (form_name in state.forms) {
        state.forms[form_name].loading = true;
    }
}), (0, _defineProperty3.default)(_module$exports, Messages.FETCH, function (state, payload) {
    var success = payload.response.type === Messages.SUCCESS;
    var form_name = payload.form;

    if (payload.response.content == null) {
        payload.response.content = [];
    }

    if (!(form_name in state.forms)) {
        state.forms = (0, _assign2.default)({}, state.forms, (0, _defineProperty3.default)({}, form_name, create_form()));
    }

    state.forms[form_name].loading = false;
    state.forms[form_name].claims = 0;
    state.forms[form_name].update = false;
    state.forms[form_name].reclaim = false;
    state.forms[form_name].cancel = false;
    state.forms[form_name].validations = {};

    if (success) {
        if (payload.method === 'GET') {
            var content = payload.response.content;
            if ('result' in content && 'hits' in content.result) {
                state.forms[form_name].content = content.result.hits.map(function (hit) {
                    return _.merge({ _id: hit.id }, hit.source);
                });
            } else {
                state.forms[form_name].content = content;
            }
        } else if ('change' in payload.response.content && payload.response.content.change === 'Validation') {
            state.forms[form_name].validations = (0, _assign2.default)({}, payload.response.content.errors);
        } else {
            state.forms[form_name].success = payload.response.content.message;
        }
        state.forms[form_name].error = {};
    } else if (form_name in state.forms) {
        state.forms[form_name].error = (0, _assign2.default)({}, {
            found: true, content: payload.response.content
        });
        state.forms[form_name].validations = {};
    }
}), (0, _defineProperty3.default)(_module$exports, Messages.ERROR, function (state, payload) {
    state.error = true;
    state.error_type = payload.error_type;
}), (0, _defineProperty3.default)(_module$exports, Messages.CREATE_FORM, function (state, payload) {
    var form_name = payload.form;
    var content = payload.content || {};
    state.forms = (0, _assign2.default)({}, state.forms, (0, _defineProperty3.default)({}, form_name, create_form()));
    state.forms[form_name].content = content;
}), (0, _defineProperty3.default)(_module$exports, Messages.REMOVE_FORM, function (state, payload) {
    var form_name = payload.form;
    if (form_name in state.forms) {
        delete state.forms[form_name];
    }
}), (0, _defineProperty3.default)(_module$exports, Messages.CANCEL_FORM, function (state, payload) {
    var form_name = payload.form;
    if (form_name in state.forms) {
        state.forms[form_name].cancel = true;
        state.forms[form_name].update = false;
        state.forms[form_name].content = {};
        state.forms[form_name].error = {};
        state.forms[form_name].claims = 0;
        state.forms[form_name].success = '';
        state.forms[form_name].validations = {};
    }
}), (0, _defineProperty3.default)(_module$exports, Messages.REMOVE_ALL_FORMS, function (state) {
    state.forms = {};
}), (0, _defineProperty3.default)(_module$exports, Messages.UPDATE_MODE_FORM, function (state, payload) {
    var form_name = payload.form;
    if (form_name in state.forms) {
        state.forms[form_name].update = payload.update || false;
        state.forms[form_name].cancel = false;
        state.forms[form_name].content = (0, _assign2.default)({}, payload.content || {});
        state.forms[form_name].error = {};
        state.forms[form_name].success = '';
        state.forms[form_name].validations = {};
    }
}), (0, _defineProperty3.default)(_module$exports, Messages.TOGGLE_RECLAIM_FORM, function (state, payload) {
    var form_name = payload.form;
    if (form_name in state.forms) {
        state.forms[form_name].reclaim = 'reclaim' in payload ? payload.reclaim : !state.forms[form_name].reclaim;
        state.forms[form_name].cancel = false;
        state.forms[form_name].error = {};
    }
}), (0, _defineProperty3.default)(_module$exports, Messages.RECLAIM_FORM_ELEMENT, function (state, payload) {
    var form_name = payload.form;
    var name = payload.name;
    var info = payload.info;
    if (form_name in state.forms) {
        var path = name.split('.');
        var content = state.forms[form_name].content;
        var object = Utils.make_nested_object_from_path(path, info);
        state.forms[form_name].content = _.merge({}, content, object);
        state.forms[form_name].claims += 1;
    }
}), (0, _defineProperty3.default)(_module$exports, Messages.ADD_TO_FORM_POOL, function (state, payload) {
    var form_name = payload.form;
    if (form_name in state.forms) {
        state.forms[form_name].pool += 1;
    }
}), (0, _defineProperty3.default)(_module$exports, Messages.REMOVE_FROM_FORM_POOL, function (state, payload) {
    var form_name = payload.form;
    var elt_name = payload.name;
    if (form_name in state.forms) {
        state.forms[form_name].pool -= 1;

        var path = elt_name.split('.');
        var last = path[path.length - 1];
        var object = Utils.find_object_with_path(state.forms[form_name].content, path);
        if (object) {
            delete object[last];
        }
    }
}), _module$exports);

},{"../api/messages":43,"../utils/utils":69,"babel-runtime/core-js/object/assign":73,"babel-runtime/helpers/defineProperty":80,"lodash":"lodash"}],66:[function(require,module,exports){
'use strict';

var BrowserUtils = require('../utils/browser');

module.exports = {
    loading: false,
    success: false,
    content: [],
    error: false,
    error_type: '',
    browserLanguage: BrowserUtils.normalizeBrowserLanguage(BrowserUtils.getFirstBrowserLanguage()),
    interfaceLang: null,
    lang_content: {},
    global_config: {},
    forms: {
        /* form_name: {error: {}, content: {}, update: false/true}*/
    }
};

},{"../utils/browser":67}],67:[function(require,module,exports){
'use strict';

function getFirstBrowserLanguage() {
    var nav = window.navigator;
    var browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        return nav.languages.find(function (language) {
            return language && language.length;
        });
    }

    // support for other well known properties in browsers
    return browserLanguagePropertyKeys.find(function (val) {
        var language = nav[val];
        return language && language.length;
    });
}

function normalizeBrowserLanguage(lang) {
    if (lang == null || lang === '') {
        return null;
    }
    return lang.split('-')[0].toUpperCase();
}

module.exports = {
    getFirstBrowserLanguage: getFirstBrowserLanguage,
    normalizeBrowserLanguage: normalizeBrowserLanguage
};

},{}],68:[function(require,module,exports){
'use strict';

var _ = require('lodash');

function format(form) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return form.replace(/{(\d+)}/g, function (match, number) {
        if (typeof args[number] !== 'undefined') {
            return args[number];
        }
        return match;
    });
}

function format_with_obj(form, obj) {
    return form.replace(/{([A-Za-z_.-]+)}/g, function (match, name) {
        var info = _.get(obj, name);
        if (info != null) {
            return info;
        }
        return match;
    });
}
module.exports = {
    format: format,
    format_with_obj: format_with_obj
};

},{"lodash":"lodash"}],69:[function(require,module,exports){
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//      
var _ = require('lodash');

function truncate(input) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

    var total_size = size + ellipsis.length;
    if (input.length > total_size) {
        var char_to_remove = input.length - size;
        var half = Math.floor(input.length / 2.0);
        var first_half = Math.floor(char_to_remove / 2.0);
        var last_half = Math.ceil(char_to_remove / 2.0);

        return input.slice(0, half - first_half) + ellipsis + input.slice(half + last_half, input.length);
    }
    return input;
}

function _return_inner_object(object) {
    var copy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (object == null) {
        return null;
    } else if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object') {
        if (copy) {
            return _.cloneDeep(object);
        }
        return object;
    }
    return object;
}

function _test_inner_object(object, key) {
    if (!isNaN(parseInt(key, 10))) {
        key = parseInt(key, 10);
    }

    if (object == null) {
        return [key, null];
    } else if (object instanceof Array) {
        if (object.length <= key) {
            return [key, null];
        }
    } else if (!(key in object)) {
        return [key, null];
    }
    return [key, object];
}

function find_object_with_path(object, path) {
    var p = path;

    if (p.length === 0) {
        return _return_inner_object(object, false); // Don't copy
    }

    if (p.length > 1) {
        var key = p[0];
        var result = null;

        var _test_inner_object2 = _test_inner_object(object, key);

        var _test_inner_object3 = (0, _slicedToArray3.default)(_test_inner_object2, 2);

        key = _test_inner_object3[0];
        result = _test_inner_object3[1];

        if (result == null) {
            return result;
        }
        if (object == null) {
            return object;
        }
        return find_object_with_path(object[key], p.slice(1));
    }
    return find_object_with_path(object, p.slice(1));
}

function find_value_with_path(object, path) {
    var p = path;
    if (p.length === 0) {
        return _return_inner_object(object);
    }

    var key = p[0];
    var result = null;

    var _test_inner_object4 = _test_inner_object(object, key);

    var _test_inner_object5 = (0, _slicedToArray3.default)(_test_inner_object4, 2);

    key = _test_inner_object5[0];
    result = _test_inner_object5[1];

    if (result == null) {
        return result;
    }
    if (object == null) {
        return object;
    }
    return find_value_with_path(object[key], p.slice(1));
}

function make_nested_object_from_path(path, value) {
    var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var rpath = _.reverse(path);
    return rpath.reduce(function (acc, field) {
        if ((0, _keys2.default)(acc).length === 0) {
            acc[field] = value;
            return acc;
        }
        var my_obj = {};
        my_obj[field] = acc;
        return my_obj;
    }, obj);
}

function to_matrix(content) {
    var rowLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    return content.reduce(function (rows, key, index) {
        return (index % rowLength === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
    }, []);
}

module.exports = {
    truncate: truncate,
    to_matrix: to_matrix,
    find_value_with_path: find_value_with_path,
    find_object_with_path: find_object_with_path,
    make_nested_object_from_path: make_nested_object_from_path
};

},{"babel-runtime/core-js/object/keys":75,"babel-runtime/helpers/slicedToArray":81,"babel-runtime/helpers/typeof":83,"lodash":"lodash"}],70:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":86}],71:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":87}],72:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":88}],73:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":89}],74:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":90}],75:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":91}],76:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":92}],77:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":93}],78:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":94}],79:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _promise = require("../core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};
},{"../core-js/promise":76}],80:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":74}],81:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/get-iterator":71,"../core-js/is-iterable":72}],82:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":70}],83:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":77,"../core-js/symbol/iterator":78}],84:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":187}],85:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],86:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":102,"../../modules/es6.array.from":171,"../../modules/es6.string.iterator":178}],87:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":169,"../modules/es6.string.iterator":178,"../modules/web.dom.iterable":184}],88:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/core.is-iterable":170,"../modules/es6.string.iterator":178,"../modules/web.dom.iterable":184}],89:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":102,"../../modules/es6.object.assign":173}],90:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":102,"../../modules/es6.object.define-property":174}],91:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":102,"../../modules/es6.object.keys":175}],92:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/_core":102,"../modules/es6.object.to-string":176,"../modules/es6.promise":177,"../modules/es6.string.iterator":178,"../modules/es7.promise.finally":180,"../modules/es7.promise.try":181,"../modules/web.dom.iterable":184}],93:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":102,"../../modules/es6.object.to-string":176,"../../modules/es6.symbol":179,"../../modules/es7.symbol.async-iterator":182,"../../modules/es7.symbol.observable":183}],94:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":166,"../../modules/es6.string.iterator":178,"../../modules/web.dom.iterable":184}],95:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],96:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],97:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],98:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":122}],99:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":158,"./_to-iobject":160,"./_to-length":161}],100:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":101,"./_wks":167}],101:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],102:[function(require,module,exports){
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],103:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":135,"./_property-desc":148}],104:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":95}],105:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],106:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":111}],107:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":113,"./_is-object":122}],108:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],109:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":140,"./_object-keys":143,"./_object-pie":144}],110:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":102,"./_ctx":104,"./_global":113,"./_hide":115}],111:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],112:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":98,"./_ctx":104,"./_is-array-iter":120,"./_iter-call":123,"./_to-length":161,"./core.get-iterator-method":168}],113:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],114:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],115:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":106,"./_object-dp":135,"./_property-desc":148}],116:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":113}],117:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":106,"./_dom-create":107,"./_fails":111}],118:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],119:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":101}],120:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":128,"./_wks":167}],121:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":101}],122:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],123:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":98}],124:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":115,"./_object-create":134,"./_property-desc":148,"./_set-to-string-tag":152,"./_wks":167}],125:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":110,"./_has":114,"./_hide":115,"./_iter-create":124,"./_iterators":128,"./_library":129,"./_object-gpo":141,"./_redefine":150,"./_set-to-string-tag":152,"./_wks":167}],126:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":167}],127:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],128:[function(require,module,exports){
module.exports = {};

},{}],129:[function(require,module,exports){
module.exports = true;

},{}],130:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":111,"./_has":114,"./_is-object":122,"./_object-dp":135,"./_uid":164}],131:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":101,"./_global":113,"./_task":157}],132:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":95}],133:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":111,"./_iobject":119,"./_object-gops":140,"./_object-keys":143,"./_object-pie":144,"./_to-object":162}],134:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":98,"./_dom-create":107,"./_enum-bug-keys":108,"./_html":116,"./_object-dps":136,"./_shared-key":153}],135:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":98,"./_descriptors":106,"./_ie8-dom-define":117,"./_to-primitive":163}],136:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":98,"./_descriptors":106,"./_object-dp":135,"./_object-keys":143}],137:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":106,"./_has":114,"./_ie8-dom-define":117,"./_object-pie":144,"./_property-desc":148,"./_to-iobject":160,"./_to-primitive":163}],138:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":139,"./_to-iobject":160}],139:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":108,"./_object-keys-internal":142}],140:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],141:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":114,"./_shared-key":153,"./_to-object":162}],142:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":99,"./_has":114,"./_shared-key":153,"./_to-iobject":160}],143:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":108,"./_object-keys-internal":142}],144:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],145:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":102,"./_export":110,"./_fails":111}],146:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],147:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":98,"./_is-object":122,"./_new-promise-capability":132}],148:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],149:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":115}],150:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":115}],151:[function(require,module,exports){
'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_core":102,"./_descriptors":106,"./_global":113,"./_object-dp":135,"./_wks":167}],152:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":114,"./_object-dp":135,"./_wks":167}],153:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":154,"./_uid":164}],154:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":113}],155:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":95,"./_an-object":98,"./_wks":167}],156:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":105,"./_to-integer":159}],157:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":101,"./_ctx":104,"./_dom-create":107,"./_global":113,"./_html":116,"./_invoke":118}],158:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":159}],159:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],160:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":105,"./_iobject":119}],161:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":159}],162:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":105}],163:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":122}],164:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],165:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":102,"./_global":113,"./_library":129,"./_object-dp":135,"./_wks-ext":166}],166:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":167}],167:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":113,"./_shared":154,"./_uid":164}],168:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":100,"./_core":102,"./_iterators":128,"./_wks":167}],169:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":98,"./_core":102,"./core.get-iterator-method":168}],170:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"./_classof":100,"./_core":102,"./_iterators":128,"./_wks":167}],171:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":103,"./_ctx":104,"./_export":110,"./_is-array-iter":120,"./_iter-call":123,"./_iter-detect":126,"./_to-length":161,"./_to-object":162,"./core.get-iterator-method":168}],172:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":96,"./_iter-define":125,"./_iter-step":127,"./_iterators":128,"./_to-iobject":160}],173:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":110,"./_object-assign":133}],174:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":106,"./_export":110,"./_object-dp":135}],175:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":143,"./_object-sap":145,"./_to-object":162}],176:[function(require,module,exports){

},{}],177:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":95,"./_an-instance":97,"./_classof":100,"./_core":102,"./_ctx":104,"./_export":110,"./_for-of":112,"./_global":113,"./_is-object":122,"./_iter-detect":126,"./_library":129,"./_microtask":131,"./_new-promise-capability":132,"./_perform":146,"./_promise-resolve":147,"./_redefine-all":149,"./_set-species":151,"./_set-to-string-tag":152,"./_species-constructor":155,"./_task":157,"./_wks":167}],178:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":125,"./_string-at":156}],179:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":98,"./_descriptors":106,"./_enum-keys":109,"./_export":110,"./_fails":111,"./_global":113,"./_has":114,"./_hide":115,"./_is-array":121,"./_library":129,"./_meta":130,"./_object-create":134,"./_object-dp":135,"./_object-gopd":137,"./_object-gopn":139,"./_object-gopn-ext":138,"./_object-gops":140,"./_object-keys":143,"./_object-pie":144,"./_property-desc":148,"./_redefine":150,"./_set-to-string-tag":152,"./_shared":154,"./_to-iobject":160,"./_to-primitive":163,"./_uid":164,"./_wks":167,"./_wks-define":165,"./_wks-ext":166}],180:[function(require,module,exports){
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_core":102,"./_export":110,"./_global":113,"./_promise-resolve":147,"./_species-constructor":155}],181:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":110,"./_new-promise-capability":132,"./_perform":146}],182:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":165}],183:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":165}],184:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":113,"./_hide":115,"./_iterators":128,"./_wks":167,"./es6.array.iterator":172}],185:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":186}],186:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],187:[function(require,module,exports){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":188}],188:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);

},{}],189:[function(require,module,exports){
function Agent() {
  this._defaults = [];
}

["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects",
 "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function(fn) {
  /** Default setting for all requests from this agent */
  Agent.prototype[fn] = function(/*varargs*/) {
    this._defaults.push({fn:fn, arguments:arguments});
    return this;
  }
});

Agent.prototype._setDefaults = function(req) {
    this._defaults.forEach(function(def) {
      req[def.fn].apply(req, def.arguments);
    });
};

module.exports = Agent;

},{}],190:[function(require,module,exports){
/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = require('component-emitter');
var RequestBase = require('./request-base');
var isObject = require('./is-object');
var ResponseBase = require('./response-base');
var Agent = require('./agent-base');

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only version of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

request.serializeObject = serialize;

/**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': JSON.stringify,
};

/**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse,
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    if (index === -1) { // could be empty line, just skip it
      continue;
    }
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str) {
  var parse = request.parse[this.type];
  if (this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
      }
    } catch(custom_err) {
      new_err = custom_err; // ok() callback can throw
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (1 === arguments.length) pass = '';
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    };
  }

  var encoder = function(string) {
    if ('function' === typeof btoa) {
      return btoa(string);
    }
    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._finalizeQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = (this.xhr = request.getXHR());
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

request.agent = function() {
  return new Agent();
};

["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function(method) {
  Agent.prototype[method.toLowerCase()] = function(url, fn) {
    var req = new request.Request(method, url);
    this._setDefaults(req);
    if (fn) {
      req.end(fn);
    }
    return req;
  };
});

Agent.prototype.del = Agent.prototype['delete'];

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn) {
  var req = request('GET', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn) {
  var req = request('HEAD', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn) {
  var req = request('OPTIONS', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn) {
  var req = request('DELETE', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn) {
  var req = request('PATCH', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn) {
  var req = request('POST', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn) {
  var req = request('PUT', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./agent-base":189,"./is-object":191,"./request-base":192,"./response-base":193,"component-emitter":85}],191:[function(require,module,exports){
'use strict';

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;

},{}],192:[function(require,module,exports){
'use strict';

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count, fn){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
RequestBase.prototype._shouldRetry = function(err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }
  if (this._retryCallback) {
    try {
      var override = this._retryCallback(err, res);
      if (override === true) return true;
      if (override === false) return false;
      // undefined falls back to defaults
    } catch(e) {
      console.error(e);
    }
  }
  if (res && res.status && res.status >= 500 && res.status != 501) return true;
  if (err) {
    if (err.code && ~ERROR_CODES.indexOf(err.code)) return true;
    // Superagent timeout
    if (err.timeout && err.code == 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }
  return false;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {

  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject) {
      self.end(function(err, res) {
        if (err) innerReject(err);
        else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};

/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {
  // name should be either a string or an object.
  if (null === name || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function(user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + base64Encoder(user + ':' + pass));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
      break;
  }
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on) {
  // This is browser-only functionality. Node side is no-op.
  if (on == undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n
 * @return {Request} for chaining
 */
RequestBase.prototype.maxResponseSize = function(n){
  if ('number' !== typeof n) {
    throw TypeError("Invalid argument");
  }
  this._maxResponseSize = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function() {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header,
  };
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};

/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */
RequestBase.prototype._finalizeQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }
  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if ('function' === typeof this._sort) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

// For backwards compat only
RequestBase.prototype._appendQueryString = function() {console.trace("Unsupported");}

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};

},{"./is-object":191}],193:[function(require,module,exports){
'use strict';

/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field) {
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};

},{"./utils":194}],194:[function(require,module,exports){
'use strict';

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};

},{}],195:[function(require,module,exports){
var Vue // late bind
var version
var map = (window.__VUE_HOT_MAP__ = Object.create(null))
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      if (instance._staticTrees) {
        // pre 2.5 staticTrees are cached per-instance
        instance._staticTrees = []
      } else {
        // post 2.5 staticTrees are cached on shared options
        record.Ctor.options._staticTrees = []
      }
      instance.$forceUpdate()
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      record.options._staticTrees = []
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

},{}],196:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueSelect=e():t.VueSelect=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.mixins=e.VueSelect=void 0;var o=n(83),i=r(o),a=n(42),s=r(a);e.default=i.default,e.VueSelect=i.default,e.mixins=s.default},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(10),o=n(33),i=n(25),a=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(4),o=n(14);t.exports=n(2)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(59),o=n(16);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(23)("wks"),o=n(15),i=n(1).Symbol,a="function"==typeof i,s=t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))};s.store=r},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(12);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(1),o=n(5),i=n(56),a=n(6),s="prototype",u=function(t,e,n){var l,c,f,p=t&u.F,d=t&u.G,h=t&u.S,b=t&u.P,v=t&u.B,g=t&u.W,y=d?o:o[e]||(o[e]={}),m=y[s],x=d?r:h?r[e]:(r[e]||{})[s];d&&(n=e);for(l in n)c=!p&&x&&void 0!==x[l],c&&l in y||(f=c?x[l]:n[l],y[l]=d&&"function"!=typeof x[l]?n[l]:v&&c?i(f,r):g&&x[l]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[s]=t[s],e}(f):b&&"function"==typeof f?i(Function.call,f):f,b&&((y.virtual||(y.virtual={}))[l]=f,t&u.R&&m&&!m[l]&&a(m,l,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(38),o=n(17);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(4).f,o=n(3),i=n(8)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(23)("keys"),o=n(15);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(1),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(12);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(1),o=n(5),i=n(19),a=n(27),s=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(8)},function(t,e){"use strict";t.exports={props:{loading:{type:Boolean,default:!1},onSearch:{type:Function,default:function(t,e){}}},data:function(){return{mutableLoading:!1}},watch:{search:function(){this.search.length>0&&(this.onSearch(this.search,this.toggleLoading),this.$emit("search",this.search,this.toggleLoading))},loading:function(t){this.mutableLoading=t}},methods:{toggleLoading:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null==t?this.mutableLoading=!this.mutableLoading:this.mutableLoading=t}}}},function(t,e){"use strict";t.exports={watch:{typeAheadPointer:function(){this.maybeAdjustScroll()}},methods:{maybeAdjustScroll:function(){var t=this.pixelsToPointerTop(),e=this.pixelsToPointerBottom();return t<=this.viewport().top?this.scrollTo(t):e>=this.viewport().bottom?this.scrollTo(this.viewport().top+this.pointerHeight()):void 0},pixelsToPointerTop:function t(){var t=0;if(this.$refs.dropdownMenu)for(var e=0;e<this.typeAheadPointer;e++)t+=this.$refs.dropdownMenu.children[e].offsetHeight;return t},pixelsToPointerBottom:function(){return this.pixelsToPointerTop()+this.pointerHeight()},pointerHeight:function(){var t=!!this.$refs.dropdownMenu&&this.$refs.dropdownMenu.children[this.typeAheadPointer];return t?t.offsetHeight:0},viewport:function(){return{top:this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop:0,bottom:this.$refs.dropdownMenu?this.$refs.dropdownMenu.offsetHeight+this.$refs.dropdownMenu.scrollTop:0}},scrollTo:function(t){return this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop=t:null}}}},function(t,e){"use strict";t.exports={data:function(){return{typeAheadPointer:-1}},watch:{filteredOptions:function(){this.typeAheadPointer=0}},methods:{typeAheadUp:function(){this.typeAheadPointer>0&&(this.typeAheadPointer--,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadDown:function(){this.typeAheadPointer<this.filteredOptions.length-1&&(this.typeAheadPointer++,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadSelect:function(){this.filteredOptions[this.typeAheadPointer]?this.select(this.filteredOptions[this.typeAheadPointer]):this.taggable&&this.search.length&&this.select(this.search),this.clearSearchOnSelect&&(this.search="")}}}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(12),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=!n(2)&&!n(9)(function(){return 7!=Object.defineProperty(n(32)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r=n(19),o=n(11),i=n(39),a=n(6),s=n(3),u=n(18),l=n(61),c=n(21),f=n(67),p=n(8)("iterator"),d=!([].keys&&"next"in[].keys()),h="@@iterator",b="keys",v="values",g=function(){return this};t.exports=function(t,e,n,y,m,x,w){l(n,e,y);var S,O,_,j=function(t){if(!d&&t in M)return M[t];switch(t){case b:return function(){return new n(this,t)};case v:return function(){return new n(this,t)}}return function(){return new n(this,t)}},P=e+" Iterator",k=m==v,A=!1,M=t.prototype,L=M[p]||M[h]||m&&M[m],C=L||j(m),T=m?k?j("entries"):C:void 0,E="Array"==e?M.entries||L:L;if(E&&(_=f(E.call(new t)),_!==Object.prototype&&_.next&&(c(_,P,!0),r||s(_,p)||a(_,p,g))),k&&L&&L.name!==v&&(A=!0,C=function(){return L.call(this)}),r&&!w||!d&&!A&&M[p]||a(M,p,C),u[e]=C,u[P]=g,m)if(S={values:k?C:j(v),keys:x?C:j(b),entries:T},w)for(O in S)O in M||i(M,O,S[O]);else o(o.P+o.F*(d||A),e,S);return S}},function(t,e,n){var r=n(10),o=n(64),i=n(17),a=n(22)("IE_PROTO"),s=function(){},u="prototype",l=function(){var t,e=n(32)("iframe"),r=i.length,o="<",a=">";for(e.style.display="none",n(58).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+a+"document.F=Object"+o+"/script"+a),t.close(),l=t.F;r--;)delete l[u][i[r]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[u]=r(t),n=new s,s[u]=null,n[a]=t):n=l(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(38),o=n(17).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(3),o=n(7),i=n(55)(!1),a=n(22)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),u=0,l=[];for(n in s)n!=a&&r(s,n)&&l.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){t.exports=n(6)},function(t,e,n){var r=n(16);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(44),i=r(o),a=n(47),s=r(a),u=n(48),l=r(u),c=n(29),f=r(c),p=n(30),d=r(p),h=n(28),b=r(h);e.default={mixins:[f.default,d.default,b.default],props:{value:{default:null},options:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},maxHeight:{type:String,default:"400px"},searchable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},placeholder:{type:String,default:""},transition:{type:String,default:"fade"},clearSearchOnSelect:{type:Boolean,default:!0},closeOnSelect:{type:Boolean,default:!0},label:{type:String,default:"label"},getOptionLabel:{type:Function,default:function(t){return"object"===("undefined"==typeof t?"undefined":(0,l.default)(t))&&this.label&&t[this.label]?t[this.label]:t}},onChange:{type:Function,default:function(t){this.$emit("input",t)}},taggable:{type:Boolean,default:!1},pushTags:{type:Boolean,default:!1},createOption:{type:Function,default:function(t){return"object"===(0,l.default)(this.mutableOptions[0])&&(t=(0,s.default)({},this.label,t)),this.$emit("option:created",t),t}},resetOnOptionsChange:{type:Boolean,default:!1},noDrop:{type:Boolean,default:!1},inputId:{type:String},dir:{type:String,default:"auto"}},data:function(){return{search:"",open:!1,mutableValue:null,mutableOptions:[]}},watch:{value:function(t){this.mutableValue=t},mutableValue:function(t,e){this.multiple?this.onChange?this.onChange(t):null:this.onChange&&t!==e?this.onChange(t):null},options:function(t){this.mutableOptions=t},mutableOptions:function(){!this.taggable&&this.resetOnOptionsChange&&(this.mutableValue=this.multiple?[]:null)},multiple:function(t){this.mutableValue=t?[]:null}},created:function(){this.mutableValue=this.value,this.mutableOptions=this.options.slice(0),this.mutableLoading=this.loading,this.$on("option:created",this.maybePushTag)},methods:{select:function(t){this.isOptionSelected(t)?this.deselect(t):(this.taggable&&!this.optionExists(t)&&(t=this.createOption(t)),this.multiple&&!this.mutableValue?this.mutableValue=[t]:this.multiple?this.mutableValue.push(t):this.mutableValue=t),this.onAfterSelect(t)},deselect:function(t){var e=this;if(this.multiple){var n=-1;this.mutableValue.forEach(function(r){(r===t||"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label])&&(n=r)});var r=this.mutableValue.indexOf(n);this.mutableValue.splice(r,1)}else this.mutableValue=null},onAfterSelect:function(t){this.closeOnSelect&&(this.open=!this.open,this.$refs.search.blur()),this.clearSearchOnSelect&&(this.search="")},toggleDropdown:function(t){t.target!==this.$refs.openIndicator&&t.target!==this.$refs.search&&t.target!==this.$refs.toggle&&t.target!==this.$el||(this.open?this.$refs.search.blur():this.disabled||(this.open=!0,this.$refs.search.focus()))},isOptionSelected:function(t){var e=this;if(this.multiple&&this.mutableValue){var n=!1;return this.mutableValue.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label]?n=!0:"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n}return this.mutableValue===t},onEscape:function(){this.search.length?this.search="":this.$refs.search.blur()},onSearchBlur:function(){this.clearSearchOnBlur&&(this.search=""),this.open=!1,this.$emit("search:blur")},onSearchFocus:function(){this.open=!0,this.$emit("search:focus")},maybeDeleteValue:function(){if(!this.$refs.search.value.length&&this.mutableValue)return this.multiple?this.mutableValue.pop():this.mutableValue=null},optionExists:function(t){var e=this,n=!1;return this.mutableOptions.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n},maybePushTag:function(t){this.pushTags&&this.mutableOptions.push(t)}},computed:{dropdownClasses:function(){return{open:this.dropdownOpen,single:!this.multiple,searching:this.searching,searchable:this.searchable,unsearchable:!this.searchable,loading:this.mutableLoading,rtl:"rtl"===this.dir}},clearSearchOnBlur:function(){return this.clearSearchOnSelect&&!this.multiple},searching:function(){return!!this.search},dropdownOpen:function(){return!this.noDrop&&(this.open&&!this.mutableLoading)},searchPlaceholder:function(){if(this.isValueEmpty&&this.placeholder)return this.placeholder},filteredOptions:function(){var t=this,e=this.mutableOptions.filter(function(e){return"object"===("undefined"==typeof e?"undefined":(0,l.default)(e))&&e.hasOwnProperty(t.label)?e[t.label].toLowerCase().indexOf(t.search.toLowerCase())>-1:"object"!==("undefined"==typeof e?"undefined":(0,l.default)(e))||e.hasOwnProperty(t.label)?e.toLowerCase().indexOf(t.search.toLowerCase())>-1:console.warn('[vue-select warn]: Label key "option.'+t.label+'" does not exist in options object.\nhttp://sagalbot.github.io/vue-select/#ex-labels')});return this.taggable&&this.search.length&&!this.optionExists(this.search)&&e.unshift(this.search),e},isValueEmpty:function(){return!this.mutableValue||("object"===(0,l.default)(this.mutableValue)?!(0,i.default)(this.mutableValue).length:!this.mutableValue.length)},valueAsArray:function(){return this.multiple?this.mutableValue:this.mutableValue?[this.mutableValue]:[]}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(28),i=r(o),a=n(30),s=r(a),u=n(29),l=r(u);e.default={ajax:i.default,pointer:s.default,pointerScroll:l.default}},function(t,e,n){t.exports={default:n(49),__esModule:!0}},function(t,e,n){t.exports={default:n(50),__esModule:!0}},function(t,e,n){t.exports={default:n(51),__esModule:!0}},function(t,e,n){t.exports={default:n(52),__esModule:!0}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(43),i=r(o);e.default=function(t,e,n){return e in t?(0,i.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(46),i=r(o),a=n(45),s=r(a),u="function"==typeof s.default&&"symbol"==typeof i.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===u(i.default)?function(t){return"undefined"==typeof t?"undefined":u(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":"undefined"==typeof t?"undefined":u(t)}},function(t,e,n){n(73);var r=n(5).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){n(74),t.exports=n(5).Object.keys},function(t,e,n){n(77),n(75),n(78),n(79),t.exports=n(5).Symbol},function(t,e,n){n(76),n(80),t.exports=n(27).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(7),o=n(71),i=n(70);t.exports=function(t){return function(e,n,a){var s,u=r(e),l=o(u.length),c=i(a,l);if(t&&n!=n){for(;l>c;)if(s=u[c++],s!=s)return!0}else for(;l>c;c++)if((t||c in u)&&u[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var r=n(53);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(13),o=n(37),i=n(20);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,s=n(t),u=i.f,l=0;s.length>l;)u.call(t,a=s[l++])&&e.push(a);return e}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(31);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(31);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(35),o=n(14),i=n(21),a={};n(6)(a,n(8)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(15)("meta"),o=n(12),i=n(3),a=n(4).f,s=0,u=Object.isExtensible||function(){return!0},l=!n(9)(function(){return u(Object.preventExtensions({}))}),c=function(t){a(t,r,{value:{i:"O"+ ++s,w:{}}})},f=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";c(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;c(t)}return t[r].w},d=function(t){return l&&h.NEED&&u(t)&&!i(t,r)&&c(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:p,onFreeze:d}},function(t,e,n){var r=n(4),o=n(10),i=n(13);t.exports=n(2)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),s=a.length,u=0;s>u;)r.f(t,n=a[u++],e[n]);return t}},function(t,e,n){var r=n(20),o=n(14),i=n(7),a=n(25),s=n(3),u=n(33),l=Object.getOwnPropertyDescriptor;e.f=n(2)?l:function(t,e){if(t=i(t),e=a(e,!0),u)try{return l(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(7),o=n(36).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(t){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?s(t):o(r(t))}},function(t,e,n){var r=n(3),o=n(40),i=n(22)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(11),o=n(5),i=n(9);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",a)}},function(t,e,n){var r=n(24),o=n(16);t.exports=function(t){return function(e,n){var i,a,s=String(o(e)),u=r(n),l=s.length;return u<0||u>=l?t?"":void 0:(i=s.charCodeAt(u),i<55296||i>56319||u+1===l||(a=s.charCodeAt(u+1))<56320||a>57343?t?s.charAt(u):i:t?s.slice(u,u+2):(i-55296<<10)+(a-56320)+65536)}}},function(t,e,n){var r=n(24),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(24),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){"use strict";var r=n(54),o=n(62),i=n(18),a=n(7);t.exports=n(34)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(11);r(r.S+r.F*!n(2),"Object",{defineProperty:n(4).f})},function(t,e,n){var r=n(40),o=n(13);n(68)("keys",function(){return function(t){return o(r(t))}})},function(t,e){},function(t,e,n){"use strict";var r=n(69)(!0);n(34)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(1),o=n(3),i=n(2),a=n(11),s=n(39),u=n(63).KEY,l=n(9),c=n(23),f=n(21),p=n(15),d=n(8),h=n(27),b=n(26),v=n(57),g=n(60),y=n(10),m=n(7),x=n(25),w=n(14),S=n(35),O=n(66),_=n(65),j=n(4),P=n(13),k=_.f,A=j.f,M=O.f,L=r.Symbol,C=r.JSON,T=C&&C.stringify,E="prototype",V=d("_hidden"),F=d("toPrimitive"),$={}.propertyIsEnumerable,B=c("symbol-registry"),N=c("symbols"),D=c("op-symbols"),I=Object[E],R="function"==typeof L,z=r.QObject,H=!z||!z[E]||!z[E].findChild,G=i&&l(function(){return 7!=S(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=k(I,e);r&&delete I[e],A(t,e,n),r&&t!==I&&A(I,e,r)}:A,U=function(t){var e=N[t]=S(L[E]);return e._k=t,e},W=R&&"symbol"==typeof L.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof L},J=function(t,e,n){return t===I&&J(D,e,n),y(t),e=x(e,!0),y(n),o(N,e)?(n.enumerable?(o(t,V)&&t[V][e]&&(t[V][e]=!1),n=S(n,{enumerable:w(0,!1)})):(o(t,V)||A(t,V,w(1,{})),t[V][e]=!0),G(t,e,n)):A(t,e,n)},K=function(t,e){y(t);for(var n,r=v(e=m(e)),o=0,i=r.length;i>o;)J(t,n=r[o++],e[n]);return t},Y=function(t,e){return void 0===e?S(t):K(S(t),e)},q=function(t){var e=$.call(this,t=x(t,!0));return!(this===I&&o(N,t)&&!o(D,t))&&(!(e||!o(this,t)||!o(N,t)||o(this,V)&&this[V][t])||e)},Q=function(t,e){if(t=m(t),e=x(e,!0),t!==I||!o(N,e)||o(D,e)){var n=k(t,e);return!n||!o(N,e)||o(t,V)&&t[V][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=M(m(t)),r=[],i=0;n.length>i;)o(N,e=n[i++])||e==V||e==u||r.push(e);return r},X=function(t){for(var e,n=t===I,r=M(n?D:m(t)),i=[],a=0;r.length>a;)!o(N,e=r[a++])||n&&!o(I,e)||i.push(N[e]);return i};R||(L=function(){if(this instanceof L)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===I&&e.call(D,n),o(this,V)&&o(this[V],t)&&(this[V][t]=!1),G(this,t,w(1,n))};return i&&H&&G(I,t,{configurable:!0,set:e}),U(t)},s(L[E],"toString",function(){return this._k}),_.f=Q,j.f=J,n(36).f=O.f=Z,n(20).f=q,n(37).f=X,i&&!n(19)&&s(I,"propertyIsEnumerable",q,!0),h.f=function(t){return U(d(t))}),a(a.G+a.W+a.F*!R,{Symbol:L});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;)d(tt[et++]);for(var nt=P(d.store),rt=0;nt.length>rt;)b(nt[rt++]);a(a.S+a.F*!R,"Symbol",{for:function(t){return o(B,t+="")?B[t]:B[t]=L(t)},keyFor:function(t){if(!W(t))throw TypeError(t+" is not a symbol!");for(var e in B)if(B[e]===t)return e},useSetter:function(){H=!0},useSimple:function(){H=!1}}),a(a.S+a.F*!R,"Object",{create:Y,defineProperty:J,defineProperties:K,getOwnPropertyDescriptor:Q,getOwnPropertyNames:Z,getOwnPropertySymbols:X}),C&&a(a.S+a.F*(!R||l(function(){var t=L();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!W(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!W(e))return e}),r[1]=e,T.apply(C,r)}}}),L[E][F]||n(6)(L[E],F,L[E].valueOf),f(L,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){n(26)("asyncIterator")},function(t,e,n){n(26)("observable")},function(t,e,n){n(72);for(var r=n(1),o=n(6),i=n(18),a=n(8)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),u=0;u<s.length;u++){var l=s[u],c=r[l],f=c&&c.prototype;f&&!f[a]&&o(f,a,l),i[l]=i.Array}},function(t,e,n){e=t.exports=n(82)(),e.push([t.id,'.v-select{position:relative;font-family:sans-serif}.v-select .disabled{cursor:not-allowed!important;background-color:#f8f8f8!important}.v-select,.v-select *{box-sizing:border-box}.v-select.rtl .open-indicator{left:10px;right:auto}.v-select.rtl .selected-tag{float:right;margin-right:3px;margin-left:1px}.v-select.rtl .dropdown-menu{text-align:right}.v-select .open-indicator{position:absolute;bottom:6px;right:10px;cursor:pointer;pointer-events:all;opacity:1;height:20px}.v-select .open-indicator,.v-select .open-indicator:before{display:inline-block;transition:all .15s cubic-bezier(1,-.115,.975,.855);transition-timing-function:cubic-bezier(1,-.115,.975,.855);width:10px}.v-select .open-indicator:before{border-color:rgba(60,60,60,.5);border-style:solid;border-width:3px 3px 0 0;content:"";height:10px;vertical-align:top;transform:rotate(133deg);box-sizing:inherit}.v-select.open .open-indicator:before{transform:rotate(315deg)}.v-select.loading .open-indicator{opacity:0}.v-select.open .open-indicator{bottom:1px}.v-select .dropdown-toggle{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;padding:0;background:none;border:1px solid rgba(60,60,60,.26);border-radius:4px;white-space:normal}.v-select .dropdown-toggle:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}.v-select.searchable .dropdown-toggle{cursor:text}.v-select.unsearchable .dropdown-toggle{cursor:pointer}.v-select.open .dropdown-toggle{border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0}.v-select .dropdown-menu{display:block;position:absolute;top:100%;left:0;z-index:1000;min-width:160px;padding:5px 0;margin:0;width:100%;overflow-y:scroll;border:1px solid rgba(0,0,0,.26);box-shadow:0 3px 6px 0 rgba(0,0,0,.15);border-top:none;border-radius:0 0 4px 4px;text-align:left;list-style:none;background:#fff}.v-select .no-options{text-align:center}.v-select .selected-tag{color:#333;background-color:#f0f0f0;border:1px solid #ccc;border-radius:4px;height:26px;margin:4px 1px 0 3px;padding:1px .25em;float:left;line-height:24px}.v-select.single .selected-tag{background-color:transparent;border-color:transparent}.v-select.single.open .selected-tag{position:absolute;opacity:.5}.v-select.single.loading .selected-tag,.v-select.single.open.searching .selected-tag{display:none}.v-select .selected-tag .close{float:none;margin-right:0;font-size:20px;appearance:none;padding:0;cursor:pointer;background:0 0;border:0;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}.v-select.single.searching:not(.open):not(.loading) input[type=search]{opacity:.2}.v-select input[type=search]::-webkit-search-cancel-button,.v-select input[type=search]::-webkit-search-decoration,.v-select input[type=search]::-webkit-search-results-button,.v-select input[type=search]::-webkit-search-results-decoration{display:none}.v-select input[type=search]::-ms-clear{display:none}.v-select input[type=search],.v-select input[type=search]:focus{appearance:none;-webkit-appearance:none;-moz-appearance:none;line-height:1.42857143;font-size:1em;height:34px;display:inline-block;border:none;outline:none;margin:0;padding:0 .5em;width:10em;max-width:100%;background:none;position:relative;box-shadow:none;float:left;clear:none}.v-select li{line-height:1.42857143}.v-select li>a{display:block;padding:3px 20px;clear:both;color:#333;white-space:nowrap}.v-select li:hover{cursor:pointer}.v-select .dropdown-menu .active>a{color:#333;background:rgba(50,50,50,.1)}.v-select .dropdown-menu>.highlight>a{background:#5897fb;color:#fff}.v-select .highlight:not(:last-child){margin-bottom:0}.v-select .spinner{opacity:0;position:absolute;top:5px;right:10px;font-size:5px;text-indent:-9999em;overflow:hidden;border-top:.9em solid hsla(0,0%,39%,.1);border-right:.9em solid hsla(0,0%,39%,.1);border-bottom:.9em solid hsla(0,0%,39%,.1);border-left:.9em solid rgba(60,60,60,.45);transform:translateZ(0);animation:vSelectSpinner 1.1s infinite linear;transition:opacity .1s}.v-select .spinner,.v-select .spinner:after{border-radius:50%;width:5em;height:5em}.v-select.loading .spinner{opacity:1}@-webkit-keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.fade-enter-active,.fade-leave-active{transition:opacity .15s cubic-bezier(1,.5,.8,1)}.fade-enter,.fade-leave-to{opacity:0}',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){n(87);var r=n(84)(n(41),n(85),null,null);t.exports=r.exports},function(t,e){t.exports=function(t,e,n,r){var o,i=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,i=t.default);var s="function"==typeof i?i.options:i;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),r){var u=s.computed||(s.computed={});Object.keys(r).forEach(function(t){var e=r[t];u[t]=function(){return e}})}return{esModule:o,exports:i,options:s}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown v-select",class:t.dropdownClasses,attrs:{dir:t.dir}},[n("div",{ref:"toggle",class:["dropdown-toggle","clearfix",{disabled:t.disabled}],on:{mousedown:function(e){e.preventDefault(),t.toggleDropdown(e)}}},[t._l(t.valueAsArray,function(e){return n("span",{key:e.index,staticClass:"selected-tag"},[t._t("selected-option",[t._v("\n        "+t._s(t.getOptionLabel(e))+"\n      ")],null,e),t._v(" "),t.multiple?n("button",{staticClass:"close",attrs:{type:"button","aria-label":"Remove option"},on:{click:function(n){t.deselect(e)}}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]):t._e()],2)}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],ref:"search",class:[{disabled:t.disabled},"form-control"],style:{width:t.isValueEmpty?"100%":"auto"},attrs:{type:"search",placeholder:t.searchPlaceholder,readonly:!t.searchable,id:t.inputId,"aria-label":"Search for option"},domProps:{value:t.search},on:{keydown:[function(e){return"button"in e||!t._k(e.keyCode,"delete",[8,46])?void t.maybeDeleteValue(e):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38)?(e.preventDefault(),void t.typeAheadUp(e)):null},function(e){return"button"in e||!t._k(e.keyCode,"down",40)?(e.preventDefault(),void t.typeAheadDown(e)):null},function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?(e.preventDefault(),void t.typeAheadSelect(e)):null}],keyup:function(e){return"button"in e||!t._k(e.keyCode,"esc",27)?void t.onEscape(e):null},blur:t.onSearchBlur,focus:t.onSearchFocus,input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),t.noDrop?t._e():n("i",{ref:"openIndicator",class:[{disabled:t.disabled},"open-indicator"],attrs:{role:"presentation"}}),t._v(" "),t._t("spinner",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.mutableLoading,expression:"mutableLoading"}],staticClass:"spinner"},[t._v("Loading...")])])],2),t._v(" "),n("transition",{attrs:{name:t.transition}},[t.dropdownOpen?n("ul",{ref:"dropdownMenu",staticClass:"dropdown-menu",style:{"max-height":t.maxHeight}},[t._l(t.filteredOptions,function(e,r){return n("li",{key:r,class:{active:t.isOptionSelected(e),highlight:r===t.typeAheadPointer},on:{mouseover:function(e){t.typeAheadPointer=r}}},[n("a",{on:{mousedown:function(n){n.preventDefault(),t.select(e)}}},[t._t("option",[t._v("\n          "+t._s(t.getOptionLabel(e))+"\n        ")],null,e)],2)])}),t._v(" "),t.filteredOptions.length?t._e():n("li",{
staticClass:"no-options"},[t._t("no-options",[t._v("Sorry, no matching options.")])],2)],2):t._e()])],1)},staticRenderFns:[]}},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=f[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(u(r.parts[i],e))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(u(r.parts[i],e));f[r.id]={id:r.id,refs:1,parts:a}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],i=o[0],a=o[1],s=o[2],u=o[3],l={css:a,media:s,sourceMap:u};n[i]?n[i].parts.push(l):e.push(n[i]={id:i,parts:[l]})}return e}function i(t,e){var n=h(),r=g[g.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),g.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=g.indexOf(t);e>=0&&g.splice(e,1)}function s(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function u(t,e){var n,r,o;if(e.singleton){var i=v++;n=b||(b=s(e)),r=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else n=s(e),r=c.bind(null,n),o=function(){a(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}function l(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function c(t,e){var n=e.css,r=e.media,o=e.sourceMap;if(r&&t.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var f={},p=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},d=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,v=0,g=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=d()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],u=f[s.id];u.refs--,i.push(u)}if(t){var l=o(t);r(l,e)}for(var a=0;a<i.length;a++){var u=i[a];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete f[u.id]}}}};var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){var r=n(81);"string"==typeof r&&(r=[[t.id,r,""]]);n(86)(r,{});r.locals&&(t.exports=r.locals)}])});

},{}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29uZmlnL2FsbC5qcyIsImFwcC9jb25maWcvaW5kZXguanMiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvbG9hZGVyL0xvYWRlci5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy9sb2FkZXIvTG9hZGVyLnZ1ZT8wMzMwMjJiNCIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2FjdGlvbl9idXR0b24vQWN0aW9uQnV0dG9uLmpzIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvYWN0aW9uX2J1dHRvbi9BY3Rpb25CdXR0b24udnVlPzFkODE3OTAxIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvd2lkZ2V0L1dpZGdldC5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL3dpZGdldC9XaWRnZXQudnVlPzIzZTFjNDk5IiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL3BhcnRzL2Zvb3Rlci9Gb290ZXIuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvcGFydHMvZm9vdGVyL0Zvb3Rlci52dWU/NjE4MTM1MTIiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvcGFydHMvaGVhZGVyL0hlYWRlci5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9wYXJ0cy9oZWFkZXIvSGVhZGVyLnZ1ZT8zMGMxZjhmOSIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9wYXJ0cy9uYXZiYXIvTmF2YmFyLmpzIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL3BhcnRzL25hdmJhci9OYXZiYXIudnVlPzEzMWZlYWU5IiwiZnJvbnQvYmFja29mZmljZS9saXN0cy9lbnZpcm9ubWVudHMuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2xpc3RzL2ZpZWxkdHlwZXMuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2xpc3RzL2xhbmdzLmpzIiwiZnJvbnQvYmFja29mZmljZS9saXN0cy9xdWFudGl0aWVzLmpzIiwiZnJvbnQvYmFja29mZmljZS9tYWluLmpzIiwiZnJvbnQvYmFja29mZmljZS9tZW51cy5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvQXBwLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9BcHAudnVlPzUzODNkNWU4IiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9jb25maWcvQ29uZmlnLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9jb25maWcvQ29uZmlnLnZ1ZT83NDM0NDcxNCIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZGF0YWluc3RhbmNlL0RhdGFpbnN0YW5jZS5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZGF0YWluc3RhbmNlL0RhdGFpbnN0YW5jZS52dWU/YjNiZjAxNjgiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL2RhdGFzb3VyY2UvRGF0YXNvdXJjZS5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZGF0YXNvdXJjZS9EYXRhc291cmNlLnZ1ZT80NDdiOTZjOCIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZm9ybS9Gb3JtLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9mb3JtL0Zvcm0udnVlPzNlZDRkY2JlIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9ob21lL0hvbWUuanMiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL2hvbWUvSG9tZS52dWU/NTEyNGIyMWUiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL2xhbmcvTGFuZy5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvbGFuZy9MYW5nLnZ1ZT80MDY0ODFhMyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvbWVudS9NZW51LmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9tZW51L01lbnUudnVlPzVlZjIwODhmIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9taXhpbnMvUmVhZGVyTWl4aW4uanMiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL3VzZXIvVXNlci5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvdXNlci9Vc2VyLnZ1ZT84NGViMzkwYSIsImZyb250L2JhY2tvZmZpY2Uvcm91dGVyLmpzIiwiZnJvbnQvYmFja29mZmljZS9yb3V0ZXMuanMiLCJmcm9udC9jb21tb24vYXBpL2luZGV4LmpzIiwiZnJvbnQvY29tbW9uL2FwaS9tZXNzYWdlcy5qcyIsImZyb250L2NvbW1vbi9hcGkvcm91dGVzLmpzIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9keW5hbWljX2Zvcm0vRHluYW1pY0Zvcm0uanMiLCJmcm9udC9jb21tb24vY29tcG9uZW50cy9pbmVkL2Zvcm1zL2R5bmFtaWNfZm9ybS9EeW5hbWljRm9ybS52dWU/NWIyNmUwZDciLCJmcm9udC9jb21tb24vY29tcG9uZW50cy9pbmVkL2Zvcm1zL2VsZW1lbnRzL2lucHV0L0lucHV0LmpzIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9lbGVtZW50cy9pbnB1dC9JbnB1dC52dWU/MmRjMzg2ZDAiLCJmcm9udC9jb21tb24vY29tcG9uZW50cy9pbmVkL2Zvcm1zL2VsZW1lbnRzL3NlbGVjdC9TZWxlY3QuanMiLCJmcm9udC9jb21tb24vY29tcG9uZW50cy9pbmVkL2Zvcm1zL2VsZW1lbnRzL3NlbGVjdC9TZWxlY3QudnVlPzRjYzE0YzVhIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9lbGVtZW50cy92YXJpYWRpY19lbGVtZW50L1ZhcmlhZGljRWxlbWVudC5qcyIsImZyb250L2NvbW1vbi9jb21wb25lbnRzL2luZWQvZm9ybXMvZWxlbWVudHMvdmFyaWFkaWNfZWxlbWVudC9WYXJpYWRpY0VsZW1lbnQudnVlP2I1YTI4NThjIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9mb3JtL0Zvcm0uanMiLCJmcm9udC9jb21tb24vY29tcG9uZW50cy9pbmVkL2Zvcm1zL2Zvcm0vRm9ybS52dWU/MDY2MzBiZjgiLCJmcm9udC9jb21tb24vY29tcG9uZW50cy9pbmVkL2Zvcm1zL21peGlucy9JbnB1dE1peGluLmpzIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9wYWdpbmF0b3IvUGFnaW5hdG9yLmpzIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9wYWdpbmF0b3IvUGFnaW5hdG9yLnZ1ZT84ZWViNDZmOCIsImZyb250L2NvbW1vbi9jb21wb25lbnRzL2luZWQvdGFiYmVyL1RhYmJlci5qcyIsImZyb250L2NvbW1vbi9jb21wb25lbnRzL2luZWQvdGFiYmVyL1RhYmJlci52dWU/MjIzMGY4YWQiLCJmcm9udC9jb21tb24vbWl4aW5zL0Zvcm1NaXhpbi5qcyIsImZyb250L2NvbW1vbi9taXhpbnMvTGFuZ01peGluLmpzIiwiZnJvbnQvY29tbW9uL3N0b3JlL2FjdGlvbnMuanMiLCJmcm9udC9jb21tb24vc3RvcmUvZ2V0dGVycy5qcyIsImZyb250L2NvbW1vbi9zdG9yZS9pbmRleC5qcyIsImZyb250L2NvbW1vbi9zdG9yZS9tdXRhdGlvbnMuanMiLCJmcm9udC9jb21tb24vc3RvcmUvc3RhdGUuanMiLCJmcm9udC9jb21tb24vdXRpbHMvYnJvd3Nlci5qcyIsImZyb250L2NvbW1vbi91dGlscy9zdHJpbmdzLmpzIiwiZnJvbnQvY29tbW9uL3V0aWxzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLW1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvYWdlbnQtYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvaXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3JlcXVlc3QtYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9yZXNwb25zZS1iYXNlLmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Z1ZS1zZWxlY3QvZGlzdC92dWUtc2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQUEsSUFBTSxPQUFPLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU0sTUFBTTtBQUNSLFVBQU0sS0FBSyxPQUFMLENBQWEsS0FBSyxJQUFMLENBQVUsU0FBVixFQUFxQixJQUFyQixDQUFiLENBREU7QUFFUixtQkFBZTtBQUNYLHNCQUFjO0FBREgsS0FGUDtBQUtSLFlBQVE7QUFDSixpQkFBUztBQURMLEtBTEE7QUFRUixTQUFLO0FBQ0QsZ0JBQVE7QUFDSixxQkFBUyxJQURMO0FBRUosb0JBQVE7QUFGSixTQURQO0FBS0QsaUJBQVM7QUFDTCxxQkFBUyxJQURKO0FBRUwsb0JBQVE7QUFGSCxTQUxSO0FBU0Qsa0JBQVUsQ0FBQyxNQUFELEVBQVMsTUFBVDtBQVRULEtBUkc7QUFtQlIsY0FBVSxDQUFDO0FBQ1AsY0FBTSxVQURDO0FBRVAsY0FBTTtBQUZDLEtBQUQsRUFJVjtBQUNJLGNBQU0sU0FEVjtBQUVJLGNBQU07QUFGVixLQUpVLEVBUVY7QUFDSSxjQUFNLE1BRFY7QUFFSSxjQUFNO0FBRlYsS0FSVSxFQVlWO0FBQ0ksY0FBTSxhQURWO0FBRUksY0FBTTtBQUZWLEtBWlU7QUFuQkYsQ0FBWjs7QUFzQ0EsT0FBTyxPQUFQLEdBQWlCLEdBQWpCOzs7Ozs7O0FDeENBLElBQU0sYUFBYSxRQUFRLE9BQVIsQ0FBbkI7QUFDQSxJQUFNLElBQUksUUFBUSxRQUFSLENBQVY7O0FBRUEsSUFBTSxNQUFNLGlCQUFpQixhQUE3QjtBQUNBLElBQUksWUFBSjtBQUNBLElBQUk7QUFDRixVQUFNLGVBQWEsR0FBYixTQUFOLENBREUsQ0FDNEI7QUFDL0IsQ0FGRCxDQUVFLE9BQU8sS0FBUCxFQUFjO0FBQ1osVUFBTSxFQUFOO0FBQ0E7QUFDSDs7QUFFRCxJQUFNLFNBQVMsRUFBRSxLQUFGLENBQVEsVUFBUixFQUFvQixHQUFwQixDQUFmO0FBQ0EsT0FBTyxPQUFQLEdBQWlCLE1BQWpCOzs7OztBQ2JBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFVBQU0sUUFETztBQUViLFdBQU8sQ0FBQyxjQUFELEVBQWlCLGdCQUFqQixDQUZNO0FBR2IsUUFIYSxrQkFHTjtBQUNILGVBQU87QUFDSCxpQkFBSztBQUNELHlCQUFTO0FBQ0wscUNBQWlCLEtBQUs7QUFEakIsaUJBRFI7QUFJRCwyQkFBVztBQUNQLHFDQUFpQixLQUFLO0FBRGY7QUFKVjtBQURGLFNBQVA7QUFVSDtBQWRZLENBQWpCOzs7Ozs7QUNlQTs7Ozs7QUFmQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixXQUFPO0FBQ0gsa0JBQVUsRUFBRSxTQUFTLEtBQVgsRUFBa0IsTUFBTSxPQUF4QixFQURQO0FBRUgsc0JBQWMsRUFBRSxTQUFTLGVBQVgsRUFBNEIsTUFBTSxNQUFsQztBQUZYLEtBRE07QUFLYixRQUxhLGtCQUtOO0FBQ0gsZUFBTztBQUNILG1CQUFPO0FBQ0gseUJBQVM7QUFETjtBQURKLFNBQVA7QUFLSCxLQVhZOztBQVliLGFBQVM7QUFDTCxhQURLLGlCQUNDLENBREQsRUFDSTtBQUFBOztBQUNMLGNBQUUsY0FBRjtBQUNBLGdCQUFJLEtBQUssUUFBTCxJQUFpQixDQUFDLEtBQUssS0FBTCxDQUFXLE9BQWpDLEVBQTBDO0FBQ3RDLHFCQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLElBQXJCO0FBQ0EsMkJBQVcsWUFBTTtBQUFFLDBCQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLEtBQXJCO0FBQTZCLGlCQUFoRCxFQUFrRCxJQUFsRDtBQUNILGFBSEQsTUFHTztBQUNILHFCQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLEtBQXJCO0FBQ0EscUJBQUssS0FBTCxDQUFXLGNBQVg7QUFDSDtBQUNKO0FBVkk7QUFaSSxDQUFqQjs7Ozs7O0FDWUE7Ozs7O0FBWkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsV0FBTztBQUNILG9CQUFZLEVBQUUsU0FBUyxJQUFYLEVBRFQ7QUFFSCx1QkFBZSxFQUFFLFNBQVMsS0FBWCxFQUZaO0FBR0gscUJBQWEsRUFBRSxTQUFTLEtBQVgsRUFIVjtBQUlILHVCQUFlLEVBQUUsU0FBUyxJQUFYLEVBSlo7QUFLSCxtQkFBVyxFQUFFLFNBQVMsS0FBWDtBQUxSLEtBRE07QUFRYixRQVJhLGtCQVFOO0FBQ0gsZUFBTztBQUNILG1CQUFPO0FBQ0gsMkJBQVcsS0FEUjtBQUVILHNCQUFNO0FBRkg7QUFESixTQUFQO0FBTUgsS0FmWTs7QUFnQmIsYUFBUztBQUNMLGtCQURLLHNCQUNNLENBRE4sRUFDUztBQUNWLGNBQUUsY0FBRjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLENBQUMsS0FBSyxLQUFMLENBQVcsU0FBbkM7QUFDSCxTQUpJO0FBTUwsaUJBTksscUJBTUssQ0FOTCxFQU1RO0FBQ1QsY0FBRSxjQUFGO0FBQ0EsaUJBQUssS0FBTCxDQUFXLFNBQVg7QUFDSCxTQVRJO0FBV0wsZ0JBWEssb0JBV0ksQ0FYSixFQVdPO0FBQ1IsY0FBRSxjQUFGO0FBQ0EsaUJBQUssS0FBTCxDQUFXLElBQVgsR0FBa0IsS0FBbEI7QUFDQSxpQkFBSyxLQUFMLENBQVcsUUFBWDtBQUNIO0FBZkksS0FoQkk7QUFpQ2IsV0FqQ2EscUJBaUNIO0FBQ04sYUFBSyxLQUFMLENBQVcsU0FBWCxHQUF1QixLQUFLLFNBQTVCO0FBQ0g7QUFuQ1ksQ0FBakI7Ozs7OztBQzRCQTs7Ozs7QUE1QkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCLEVBQWpCOzs7Ozs7QUNXQTs7Ozs7QUFYQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFNLFNBQVMsUUFBUSxzQkFBUixDQUFmOztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLGdCQUFZO0FBQ1Isa0JBQVU7QUFERjtBQURDLENBQWpCOzs7Ozs7QUN1QkE7Ozs7O0FBekJBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU0sSUFBSSxRQUFRLFFBQVIsQ0FBVjs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixXQUFPLENBQUMsT0FBRCxDQURNO0FBRWIsUUFGYSxrQkFFTjtBQUNILGVBQU87QUFDSCxxQkFBUyxLQUROO0FBRUgsbUJBQU87QUFDSCx3QkFBUSxLQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLE1BQXJCLENBQTRCLE1BQTVCLENBQW1DO0FBQUEsMkJBQUssRUFBRSxJQUFGLEtBQVcsR0FBaEI7QUFBQSxpQkFBbkMsQ0FETDtBQUVILHdCQUFRLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsUUFBbEIsRUFBNEIsT0FBNUIsRUFBcUMsT0FBckMsRUFBOEMsTUFBOUM7QUFGTDtBQUZKLFNBQVA7QUFPSCxLQVZZOztBQVdiLGNBQVU7QUFDTixrQkFETSx3QkFDTztBQUFBOztBQUNULGdCQUFNLFFBQVEsRUFBRSxTQUFGLENBQVksS0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixNQUFqQyxFQUF5QztBQUFBLHVCQUFLLEVBQUUsSUFBRixLQUFXLEdBQVgsSUFBa0IsTUFBSyxNQUFMLENBQVksSUFBWixLQUFxQixFQUFFLElBQTlDO0FBQUEsYUFBekMsSUFBK0YsQ0FBN0c7QUFDQSxtQkFBTyxLQUFLLEdBQUwsQ0FBUyxDQUFDLENBQVYsRUFBYSxLQUFiLENBQVA7QUFDSDtBQUpLLEtBWEc7QUFpQmIsYUFBUztBQUNMLFlBREssZ0JBQ0EsQ0FEQSxFQUNHO0FBQ0osY0FBRSxjQUFGO0FBQ0EsaUJBQUssT0FBTCxHQUFlLENBQUMsS0FBSyxPQUFyQjtBQUNIO0FBSkksS0FqQkk7QUF1QmIsV0F2QmEscUJBdUJILENBQ1Q7QUF4QlksQ0FBakI7Ozs7OztBQ2NBOzs7OztBQWhCQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUIsQ0FDakIsRUFBRSxPQUFPLFlBQVQsRUFBdUIsT0FBTyxZQUE5QixFQURpQixFQUVqQixFQUFFLE9BQU8sYUFBVCxFQUF3QixPQUFPLGFBQS9CLEVBRmlCLEVBR2pCLEVBQUUsT0FBTyxlQUFULEVBQTBCLE9BQU8sTUFBakMsRUFIaUIsRUFJakIsRUFBRSxPQUFPLFdBQVQsRUFBc0IsT0FBTyxPQUE3QixFQUppQixDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUIsQ0FBQyxFQUFFLE9BQU8sTUFBVCxFQUFpQixPQUFPLE1BQXhCLEVBQUQsRUFDYixFQUFFLE9BQU8sT0FBVCxFQUFrQixPQUFPLE9BQXpCLEVBRGEsRUFFYixFQUFFLE9BQU8sVUFBVCxFQUFxQixPQUFPLFVBQTVCLEVBRmEsRUFHYixFQUFFLE9BQU8sT0FBVCxFQUFrQixPQUFPLE9BQXpCLEVBSGEsRUFJYixFQUFFLE9BQU8sUUFBVCxFQUFtQixPQUFPLFFBQTFCLEVBSmEsRUFLYixFQUFFLE9BQU8sVUFBVCxFQUFxQixPQUFPLFVBQTVCLEVBTGEsRUFNYixFQUFFLE9BQU8sVUFBVCxFQUFxQixPQUFPLFVBQTVCLEVBTmEsRUFPYixFQUFFLE9BQU8sT0FBVCxFQUFrQixPQUFPLE9BQXpCLEVBUGEsRUFRYixFQUFFLE9BQU8sU0FBVCxFQUFvQixPQUFPLFNBQTNCLEVBUmEsRUFTYixFQUFFLE9BQU8sUUFBVCxFQUFtQixPQUFPLFFBQTFCLEVBVGEsQ0FBakI7Ozs7O0FDQUEsSUFBTSxJQUFJLFFBQVEsUUFBUixDQUFWOztBQUVBLElBQU0sUUFBUTtBQUNWLFFBQUksTUFETTtBQUVWLFFBQUksV0FGTTtBQUdWLFFBQUksU0FITTtBQUlWLFFBQUksV0FKTTtBQUtWLFFBQUksTUFMTTtBQU1WLFFBQUksU0FOTTtBQU9WLFFBQUksV0FQTTtBQVFWLFFBQUksUUFSTTtBQVNWLFFBQUksVUFUTTtBQVVWLFFBQUksUUFWTTtBQVdWLFFBQUksUUFYTTtBQVlWLFFBQUksYUFaTTtBQWFWLFFBQUksU0FiTTtBQWNWLFFBQUksWUFkTTtBQWVWLFFBQUksV0FmTTtBQWdCVixRQUFJLFFBaEJNO0FBaUJWLFFBQUksU0FqQk07QUFrQlYsUUFBSSxTQWxCTTtBQW1CVixRQUFJLFNBbkJNO0FBb0JWLFFBQUksU0FwQk07QUFxQlYsUUFBSSxRQXJCTTtBQXNCVixRQUFJLFNBdEJNO0FBdUJWLFFBQUksU0F2Qk07QUF3QlYsUUFBSSxTQXhCTTtBQXlCVixRQUFJLFVBekJNO0FBMEJWLFFBQUksVUExQk07QUEyQlYsUUFBSSxNQTNCTTtBQTRCVixRQUFJLE9BNUJNO0FBNkJWLFFBQUkscUJBN0JNO0FBOEJWLFFBQUksU0E5Qk07QUErQlYsUUFBSSxPQS9CTTtBQWdDVixRQUFJLFFBaENNO0FBaUNWLFFBQUksUUFqQ007QUFrQ1YsUUFBSSxRQWxDTTtBQW1DVixRQUFJLFVBbkNNO0FBb0NWLFFBQUksS0FwQ007QUFxQ1YsUUFBSSxPQXJDTTtBQXNDVixRQUFJLFNBdENNO0FBdUNWLFFBQUksV0F2Q007QUF3Q1YsUUFBSSxTQXhDTTtBQXlDVixRQUFJLFVBekNNO0FBMENWLFFBQUksUUExQ007QUEyQ1YsUUFBSSxTQTNDTTtBQTRDVixRQUFJLE9BNUNNO0FBNkNWLFFBQUksU0E3Q007QUE4Q1YsUUFBSSxRQTlDTTtBQStDVixRQUFJLFNBL0NNO0FBZ0RWLFFBQUksUUFoRE07QUFpRFYsUUFBSSxpQkFqRE07QUFrRFYsUUFBSSxPQWxETTtBQW1EVixRQUFJLGlCQW5ETTtBQW9EVixRQUFJLFVBcERNO0FBcURWLFFBQUksU0FyRE07QUFzRFYsUUFBSSxVQXRETTtBQXVEVixRQUFJLE1BdkRNO0FBd0RWLFFBQUksT0F4RE07QUF5RFYsUUFBSSxRQXpETTtBQTBEVixRQUFJLE9BMURNO0FBMkRWLFFBQUksV0EzRE07QUE0RFYsUUFBSSxVQTVETTtBQTZEVixRQUFJLFNBN0RNO0FBOERWLFFBQUksV0E5RE07QUErRFYsUUFBSSxVQS9ETTtBQWdFVixRQUFJLFFBaEVNO0FBaUVWLFFBQUksYUFqRU07QUFrRVYsUUFBSSxZQWxFTTtBQW1FVixRQUFJLGFBbkVNO0FBb0VWLFFBQUksTUFwRU07QUFxRVYsUUFBSSxZQXJFTTtBQXNFVixRQUFJLFNBdEVNO0FBdUVWLFFBQUksS0F2RU07QUF3RVYsUUFBSSxXQXhFTTtBQXlFVixRQUFJLFNBekVNO0FBMEVWLFFBQUksV0ExRU07QUEyRVYsUUFBSSxVQTNFTTtBQTRFVixRQUFJLFVBNUVNO0FBNkVWLFFBQUksVUE3RU07QUE4RVYsUUFBSSxPQTlFTTtBQStFVixRQUFJLFFBL0VNO0FBZ0ZWLFFBQUksVUFoRk07QUFpRlYsUUFBSSxRQWpGTTtBQWtGVixRQUFJLGFBbEZNO0FBbUZWLFFBQUksT0FuRk07QUFvRlYsUUFBSSxTQXBGTTtBQXFGVixRQUFJLFFBckZNO0FBc0ZWLFFBQUksUUF0Rk07QUF1RlYsUUFBSSxVQXZGTTtBQXdGVixRQUFJLFNBeEZNO0FBeUZWLFFBQUksTUF6Rk07QUEwRlYsUUFBSSxTQTFGTTtBQTJGVixRQUFJLFNBM0ZNO0FBNEZWLFFBQUksT0E1Rk07QUE2RlYsUUFBSSxlQTdGTTtBQThGVixRQUFJLE9BOUZNO0FBK0ZWLFFBQUksWUEvRk07QUFnR1YsUUFBSSxTQWhHTTtBQWlHVixRQUFJLEtBakdNO0FBa0dWLFFBQUksWUFsR007QUFtR1YsUUFBSSxjQW5HTTtBQW9HVixRQUFJLFNBcEdNO0FBcUdWLFFBQUksVUFyR007QUFzR1YsUUFBSSxhQXRHTTtBQXVHVixRQUFJLE9BdkdNO0FBd0dWLFFBQUksWUF4R007QUF5R1YsUUFBSSxXQXpHTTtBQTBHVixRQUFJLFdBMUdNO0FBMkdWLFFBQUksV0EzR007QUE0R1YsUUFBSSxTQTVHTTtBQTZHVixRQUFJLE9BN0dNO0FBOEdWLFFBQUksU0E5R007QUErR1YsUUFBSSxTQS9HTTtBQWdIVixRQUFJLE9BaEhNO0FBaUhWLFFBQUksa0JBakhNO0FBa0hWLFFBQUksZUFsSE07QUFtSFYsUUFBSSxRQW5ITTtBQW9IVixRQUFJLFFBcEhNO0FBcUhWLFFBQUksT0FySE07QUFzSFYsUUFBSSxtQkF0SE07QUF1SFYsUUFBSSxXQXZITTtBQXdIVixRQUFJLGVBeEhNO0FBeUhWLFFBQUksUUF6SE07QUEwSFYsUUFBSSxVQTFITTtBQTJIVixRQUFJLFNBM0hNO0FBNEhWLFFBQUksUUE1SE07QUE2SFYsUUFBSSxPQTdITTtBQThIVixRQUFJLE9BOUhNO0FBK0hWLFFBQUksVUEvSE07QUFnSVYsUUFBSSxTQWhJTTtBQWlJVixRQUFJLE1BaklNO0FBa0lWLFFBQUksUUFsSU07QUFtSVYsUUFBSSxRQW5JTTtBQW9JVixRQUFJLFlBcElNO0FBcUlWLFFBQUksU0FySU07QUFzSVYsUUFBSSxZQXRJTTtBQXVJVixRQUFJLFNBdklNO0FBd0lWLFFBQUksU0F4SU07QUF5SVYsUUFBSSxVQXpJTTtBQTBJVixRQUFJLFNBMUlNO0FBMklWLFFBQUksYUEzSU07QUE0SVYsUUFBSSxVQTVJTTtBQTZJVixRQUFJLFdBN0lNO0FBOElWLFFBQUksUUE5SU07QUErSVYsUUFBSSxlQS9JTTtBQWdKVixRQUFJLE9BaEpNO0FBaUpWLFFBQUksZ0JBakpNO0FBa0pWLFFBQUksV0FsSk07QUFtSlYsUUFBSSxRQW5KTTtBQW9KVixRQUFJLFNBcEpNO0FBcUpWLFFBQUksUUFySk07QUFzSlYsUUFBSSxPQXRKTTtBQXVKVixRQUFJLFFBdkpNO0FBd0pWLFFBQUksVUF4Sk07QUF5SlYsUUFBSSxTQXpKTTtBQTBKVixRQUFJLE9BMUpNO0FBMkpWLFFBQUksT0EzSk07QUE0SlYsUUFBSSxXQTVKTTtBQTZKVixRQUFJLFNBN0pNO0FBOEpWLFFBQUksU0E5Sk07QUErSlYsUUFBSSxPQS9KTTtBQWdLVixRQUFJLFFBaEtNO0FBaUtWLFFBQUksT0FqS007QUFrS1YsUUFBSSxNQWxLTTtBQW1LVixRQUFJLFVBbktNO0FBb0tWLFFBQUksU0FwS007QUFxS1YsUUFBSSxTQXJLTTtBQXNLVixRQUFJLFFBdEtNO0FBdUtWLFFBQUksT0F2S007QUF3S1YsUUFBSSxTQXhLTTtBQXlLVixRQUFJLFFBektNO0FBMEtWLFFBQUksT0ExS007QUEyS1YsUUFBSSxLQTNLTTtBQTRLVixRQUFJLFVBNUtNO0FBNktWLFFBQUksUUE3S007QUE4S1YsUUFBSSxXQTlLTTtBQStLVixRQUFJLE1BL0tNO0FBZ0xWLFFBQUksT0FoTE07QUFpTFYsUUFBSSxPQWpMTTtBQWtMVixRQUFJLGFBbExNO0FBbUxWLFFBQUksU0FuTE07QUFvTFYsUUFBSSxTQXBMTTtBQXFMVixRQUFJLE9BckxNO0FBc0xWLFFBQUksT0F0TE07QUF1TFYsUUFBSSxTQXZMTTtBQXdMVixRQUFJLFFBeExNO0FBeUxWLFFBQUksUUF6TE07QUEwTFYsUUFBSSxTQTFMTTtBQTJMVixRQUFJO0FBM0xNLENBQWQ7O0FBOExBLElBQU0sWUFBWSxFQUFFLEdBQUYsQ0FBTSxLQUFOLEVBQWEsVUFBQyxLQUFELEVBQVEsS0FBUjtBQUFBLFdBQW1CLEVBQUUsWUFBRixFQUFTLFlBQVQsRUFBbkI7QUFBQSxDQUFiLENBQWxCOztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLGdCQURhO0FBRWI7QUFGYSxDQUFqQjs7Ozs7QUNsTUEsT0FBTyxPQUFQLEdBQWlCLENBQUMsRUFBRSxPQUFPLE1BQVQsRUFBaUIsT0FBTyxHQUF4QixFQUFELEVBQ2IsRUFBRSxPQUFPLEtBQVQsRUFBZ0IsT0FBTyxHQUF2QixFQURhLEVBRWIsRUFBRSxPQUFPLEtBQVQsRUFBZ0IsT0FBTyxHQUF2QixFQUZhLEVBR2IsRUFBRSxPQUFPLEtBQVQsRUFBZ0IsT0FBTyxLQUF2QixFQUhhLEVBSWIsRUFBRSxPQUFPLE1BQVQsRUFBaUIsT0FBTyxNQUF4QixFQUphLEVBS2IsRUFBRSxPQUFPLE9BQVQsRUFBa0IsT0FBTyxPQUF6QixFQUxhLEVBTWIsRUFBRSxPQUFPLEtBQVQsRUFBZ0IsT0FBTyxLQUF2QixFQU5hLENBQWpCOzs7OztBQ0FBLElBQU0sTUFBTSxRQUFRLEtBQVIsQ0FBWjtBQUNBLElBQU0sU0FBUyxRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU0sUUFBUSxRQUFRLGlCQUFSLENBQWQ7O0FBRUEsSUFBTSxTQUFTLFFBQVEsZ0NBQVIsQ0FBZjtBQUNBLElBQU0sUUFBUSxRQUFRLDBEQUFSLENBQWQ7QUFDQSxJQUFNLFNBQVMsUUFBUSw0REFBUixDQUFmO0FBQ0EsSUFBTSxrQkFBa0IsUUFBUSwrRUFBUixDQUF4QjtBQUNBLElBQU0sT0FBTyxRQUFRLCtDQUFSLENBQWI7QUFDQSxJQUFNLGNBQWMsUUFBUSw4REFBUixDQUFwQjtBQUNBLElBQU0sWUFBWSxRQUFRLG1EQUFSLENBQWxCO0FBQ0EsSUFBTSxTQUFTLFFBQVEsNkNBQVIsQ0FBZjs7QUFFQSxJQUFNLGVBQWUsUUFBUSxvRUFBUixDQUFyQjtBQUNBLElBQU0sU0FBUyxRQUFRLHVEQUFSLENBQWY7O0FBRUEsSUFBTSxNQUFNLFFBQVEsaUJBQVIsQ0FBWjs7QUFFQSxJQUFJLFNBQUosQ0FBYyxRQUFkLEVBQXdCLE1BQXhCO0FBQ0EsSUFBSSxTQUFKLENBQWMsT0FBZCxFQUF1QixJQUF2QjtBQUNBLElBQUksU0FBSixDQUFjLFFBQWQsRUFBd0IsS0FBeEI7QUFDQSxJQUFJLFNBQUosQ0FBYyxTQUFkLEVBQXlCLE1BQXpCO0FBQ0EsSUFBSSxTQUFKLENBQWMsbUJBQWQsRUFBbUMsZUFBbkM7QUFDQSxJQUFJLFNBQUosQ0FBYyxlQUFkLEVBQStCLFlBQS9CO0FBQ0EsSUFBSSxTQUFKLENBQWMsUUFBZCxFQUF3QixNQUF4QjtBQUNBLElBQUksU0FBSixDQUFjLFdBQWQsRUFBMkIsU0FBM0I7QUFDQSxJQUFJLFNBQUosQ0FBYyxRQUFkLEVBQXdCLE1BQXhCO0FBQ0EsSUFBSSxTQUFKLENBQWMsY0FBZCxFQUE4QixXQUE5Qjs7QUFFQSxJQUFJLEdBQUosQ0FBUTtBQUNKLFFBQUksTUFEQTtBQUVKLGdCQUZJO0FBR0osa0JBSEk7QUFJSixZQUFRO0FBQUEsZUFBSyxFQUFFLEdBQUYsQ0FBTDtBQUFBO0FBSkosQ0FBUjs7Ozs7QUM3QkEsT0FBTyxPQUFQLEdBQWlCLEVBQWpCO0FBQ0EsSUFBTSxTQUFTLFFBQVEsVUFBUixDQUFmO0FBQ0EsSUFBTSxPQUFPLFFBQVEsdUJBQVIsQ0FBYjtBQUNBLElBQU0sT0FBTyxRQUFRLHVCQUFSLENBQWI7QUFDQSxJQUFNLFNBQVMsUUFBUSwyQkFBUixDQUFmO0FBQ0EsSUFBTSxPQUFPLFFBQVEsdUJBQVIsQ0FBYjtBQUNBLElBQU0sT0FBTyxRQUFRLHVCQUFSLENBQWI7QUFDQSxJQUFNLGdCQUFnQixRQUFRLHVCQUFSLENBQXRCO0FBQ0EsSUFBTSxhQUFhLFFBQVEsbUNBQVIsQ0FBbkI7QUFDQSxJQUFNLGVBQWUsUUFBUSx1Q0FBUixDQUFyQjs7QUFHQSxPQUFPLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLENBQ2xCLENBQ0k7QUFDSSxhQUFTLFNBRGI7QUFFSSxVQUFNLFVBRlY7QUFHSSxZQUFRLEVBSFo7QUFJSSxTQUFLLE9BSlQ7QUFLSSxZQUFRLENBQUMsT0FBTyxLQUFSLENBTFo7QUFNSSxhQUFTLEVBTmI7QUFPSSxlQUFXO0FBUGYsQ0FESixFQVVJO0FBQ0ksYUFBUyxTQURiO0FBRUksVUFBTSxPQUZWO0FBR0ksWUFBUSxFQUhaO0FBSUksU0FBSyxNQUpUO0FBS0ksWUFBUSxDQUFDLE9BQU8sSUFBUixDQUxaO0FBTUksYUFBUyxFQU5iO0FBT0ksZUFBVztBQVBmLENBVkosRUFtQkk7QUFDSSxhQUFTLFNBRGI7QUFFSSxVQUFNLFNBRlY7QUFHSSxZQUFRLEVBSFo7QUFJSSxTQUFLLFFBSlQ7QUFLSSxZQUFRLENBQUMsT0FBTyxNQUFSLENBTFo7QUFNSSxhQUFTLEVBTmI7QUFPSSxlQUFXO0FBUGYsQ0FuQkosQ0FEa0IsRUErQmxCLENBQ0k7QUFDSSxhQUFTLGdCQURiO0FBRUksVUFBTSxjQUZWO0FBR0ksWUFBUSxFQUhaO0FBSUksU0FBSyxZQUpUO0FBS0ksWUFBUSxDQUFDLE9BQU8sVUFBUixDQUxaO0FBTUksYUFBUyxFQU5iO0FBT0ksZUFBVztBQVBmLENBREosRUFVSTtBQUNJLGFBQVMsZ0JBRGI7QUFFSSxVQUFNLGNBRlY7QUFHSSxZQUFRLEVBSFo7QUFJSSxTQUFLLGFBSlQ7QUFLSSxZQUFRLENBQUMsT0FBTyxXQUFSLENBTFo7QUFNSSxhQUFTLEVBTmI7QUFPSSxlQUFXO0FBUGYsQ0FWSixFQW1CSTtBQUNJLGFBQVMsZ0JBRGI7QUFFSSxVQUFNLGdCQUZWO0FBR0ksWUFBUSxFQUhaO0FBSUksU0FBSyxLQUpUO0FBS0ksWUFBUSxDQUFDLE9BQU8sR0FBUixDQUxaO0FBTUksYUFBUyxFQU5iO0FBT0ksZUFBVztBQVBmLENBbkJKLEVBNEJJO0FBQ0ksYUFBUyxnQkFEYjtBQUVJLFVBQU0sT0FGVjtBQUdJLFlBQVEsRUFIWjtBQUlJLFNBQUssTUFKVDtBQUtJLFlBQVEsQ0FBQyxPQUFPLElBQVIsQ0FMWjtBQU1JLGFBQVMsRUFOYjtBQU9JLGVBQVc7QUFQZixDQTVCSixFQXFDSTtBQUNJLGFBQVMsZ0JBRGI7QUFFSSxVQUFNLE9BRlY7QUFHSSxZQUFRLEVBSFo7QUFJSSxTQUFLLE1BSlQ7QUFLSSxZQUFRLENBQUMsT0FBTyxJQUFSLENBTFo7QUFNSSxhQUFTLEVBTmI7QUFPSSxlQUFXO0FBUGYsQ0FyQ0osRUE4Q0k7QUFDSSxhQUFTLGdCQURiO0FBRUksVUFBTSxPQUZWO0FBR0ksWUFBUSxFQUhaO0FBSUksU0FBSyxNQUpUO0FBS0ksWUFBUSxDQUFDLE9BQU8sSUFBUixDQUxaO0FBTUksYUFBUyxFQU5iO0FBT0ksZUFBVztBQVBmLENBOUNKLENBL0JrQixFQXdGbEIsQ0FDSTtBQUNJLGFBQVMsVUFEYjtBQUVJLFVBQU0sdUJBRlY7QUFHSSxZQUFRLEVBSFo7QUFJSSxTQUFLLGVBSlQ7QUFLSSxZQUFRLENBQUMsT0FBTyxhQUFSLENBTFo7QUFNSSxhQUFTLEVBTmI7QUFPSSxlQUFXO0FBUGYsQ0FESixFQVVJO0FBQ0ksYUFBUyxVQURiO0FBRUksVUFBTSxnQkFGVjtBQUdJLFlBQVEsRUFIWjtBQUlJLFNBQUssZUFKVDtBQUtJLFlBQVEsQ0FBQyxPQUFPLGFBQVIsQ0FMWjtBQU1JLGFBQVMsRUFOYjtBQU9JLGVBQVc7QUFQZixDQVZKLEVBbUJJO0FBQ0ksYUFBUyxVQURiO0FBRUksVUFBTSxzQkFGVjtBQUdJLFlBQVEsRUFIWjtBQUlJLFNBQUssVUFKVDtBQUtJLFlBQVEsQ0FBQyxPQUFPLFNBQVIsQ0FMWjtBQU1JLGFBQVMsRUFOYjtBQU9JLGVBQVc7QUFQZixDQW5CSixFQTRCSTtBQUNJLGFBQVMsVUFEYjtBQUVJLFVBQU0sZ0JBRlY7QUFHSSxZQUFRLEVBSFo7QUFJSSxTQUFLLEtBSlQ7QUFLSSxZQUFRLENBQUMsT0FBTyxHQUFSLENBTFo7QUFNSSxhQUFTLEVBTmI7QUFPSSxlQUFXO0FBUGYsQ0E1QkosRUFxQ0k7QUFDSSxhQUFTLFVBRGI7QUFFSSxVQUFNLFFBRlY7QUFHSSxZQUFRLEVBSFo7QUFJSSxTQUFLLFFBSlQ7QUFLSSxZQUFRLENBQUMsT0FBTyxNQUFSLENBTFo7QUFNSSxhQUFTLEVBTmI7QUFPSSxlQUFXO0FBUGYsQ0FyQ0osQ0F4RmtCLENBQXRCOztBQXlJQSxPQUFPLE9BQVAsQ0FBZSxLQUFmLEdBQXVCLENBQ25CO0FBQ0ksU0FBSyxxQkFEVDtBQUVJLFlBQVEsQ0FBQyxPQUFPLFlBQVIsQ0FGWjtBQUdJLGVBQVc7QUFIZixDQURtQixDQUF2Qjs7Ozs7QUNySkEsSUFBTSxNQUFNLFFBQVEsS0FBUixDQUFaO0FBQ0EsSUFBTSxXQUFXLFFBQVEsMkJBQVIsQ0FBakI7QUFDQSxJQUFNLFlBQVksUUFBUSx5QkFBUixDQUFsQjs7QUFFQSxJQUFNLE1BQU0saUJBQWlCLE9BQTdCOztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFVBQU0sS0FETztBQUViLGVBRmEseUJBRUM7QUFBQTs7QUFDVixZQUFNLGNBQWMsVUFBVSxNQUFWLENBQWlCLFFBQWpCLEVBQTJCLE1BQTNCLEVBQW1DLElBQW5DLENBQXBCO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDQSxZQUFNLGNBQWM7QUFDaEIsa0JBQU0sQ0FEVTtBQUVoQixtQkFBTztBQUNILDZCQUFhO0FBRFY7QUFGUyxTQUFwQjs7QUFPQSxZQUFNLFlBQVksVUFBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLEVBQWlDLElBQWpDLENBQWxCO0FBQ0EsWUFBTSxZQUFZO0FBQ2Qsa0JBQU0sS0FEUTtBQUVkLG1CQUFPO0FBQ0gsc0JBQU0sQ0FBQyxFQUFFLE1BQU0sWUFBUixFQUFEO0FBREg7QUFGTyxTQUFsQjs7QUFPQSxZQUFNLGlCQUFpQixLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLGFBQXJCLEVBQW9DO0FBQ3ZELGtCQUFNLFdBRGlEO0FBRXZELGtCQUFNO0FBRmlELFNBQXBDLENBQXZCOztBQUtBLHVCQUFlLElBQWYsQ0FBb0IsWUFBTTtBQUN0QixnQkFBTSxTQUFTLE1BQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsYUFBakM7QUFDQSxnQkFBSSxFQUFFLFdBQVcsTUFBYixDQUFKLEVBQTBCO0FBQ3RCO0FBQ0g7QUFDRCxnQkFBSSxlQUFlLE9BQU8sS0FBUCxDQUFhLElBQWIsQ0FDZjtBQUFBLHVCQUFLLEVBQUUsS0FBRixDQUFRLFdBQVIsT0FBMEIsTUFBSyxNQUFMLENBQVksS0FBWixDQUFrQixlQUFqRDtBQUFBLGFBRGUsQ0FBbkI7QUFFQSxnQkFBSSxpQkFBaUIsU0FBckIsRUFBZ0M7QUFDNUIsK0JBQWUsT0FBTyxLQUFQLENBQWEsQ0FBYixFQUFnQixLQUEvQjtBQUNILGFBRkQsTUFFTztBQUNILCtCQUFlLGFBQWEsS0FBNUI7QUFDSDs7QUFFRCxzQkFBVSxLQUFWLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQTBCLEVBQUUsTUFBTSxZQUFSLEVBQTFCO0FBQ0Esa0JBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsYUFBbEIsR0FBa0MsWUFBbEM7QUFDQSxrQkFBSyxNQUFMLENBQVksUUFBWixDQUFxQixlQUFyQixFQUFzQztBQUNsQyxzQkFBTSxTQUQ0QjtBQUVsQyxzQkFBTTtBQUY0QixhQUF0QztBQUlILFNBbkJELEVBbUJHLEtBbkJILENBbUJTLFVBQUMsR0FBRCxFQUFTO0FBQUUsb0JBQVEsR0FBUixDQUFZLEdBQVo7QUFBbUIsU0FuQnZDO0FBb0JIO0FBN0NZLENBQWpCOzs7Ozs7QUNPQTs7Ozs7QUFiQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFNLFFBQVEsUUFBUSw2QkFBUixDQUFkO0FBQ0EsSUFBTSxZQUFZLFFBQVEsNEJBQVIsQ0FBbEI7QUFDQSxJQUFNLGNBQWMsUUFBUSx1QkFBUixDQUFwQjtBQUNBLElBQU0sWUFBWSxRQUFRLGtDQUFSLENBQWxCO0FBQ0EsSUFBTSxlQUFlLFFBQVEsMEJBQVIsQ0FBckI7QUFDQSxJQUFNLFFBQVEsUUFBUSxtQkFBUixDQUFkOztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFlBQVEsQ0FBQyxXQUFELEVBQWMsU0FBZCxDQURLO0FBRWIsUUFGYSxrQkFFTjtBQUNILGVBQU87QUFDSCxtQkFBTztBQUNILHNCQUFNLFVBQVUsTUFBVixDQUFpQixRQUFqQixFQUEyQixNQUEzQixDQURIO0FBRUgsdUJBQU8sVUFBVSxNQUFWLENBQWlCLFFBQWpCLEVBQTJCLEtBQTNCLENBRko7QUFHSCx1QkFBTyxpQkFISjtBQUlILHVCQUFPLGFBSko7QUFLSCw4QkFBYyxFQUxYO0FBTUgsNkJBQWEsQ0FOVjtBQU9ILHVCQUFPLE1BQU0sU0FQVjtBQVFILDhCQUFjO0FBUlg7QUFESixTQUFQO0FBWUgsS0FmWTs7QUFnQmIsYUFBUyxFQWhCSTtBQWtCYixXQWxCYSxxQkFrQkg7QUFDTixhQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLGFBQXJCLEVBQW9DO0FBQ2hDLGtCQUFNLEtBQUssS0FBTCxDQUFXLEtBRGU7QUFFaEMsa0JBQU0sS0FBSyxLQUFMLENBQVc7QUFGZSxTQUFwQztBQUlILEtBdkJZOztBQXdCYixjQUFVO0FBQ04sbUJBRE0seUJBQ1E7QUFDVixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxLQUFYLElBQW9CLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBMUMsRUFBaUQ7QUFDN0Msb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLENBQXdCLEtBQUssS0FBTCxDQUFXLEtBQW5DLENBQWI7QUFDQSx1QkFBTyxNQUFNLFNBQU4sQ0FBZ0IsS0FBSyxPQUFMLFlBQXdCLEtBQXhCLEdBQ2YsS0FBSyxPQURVLEdBQ0EsRUFEaEIsRUFDb0IsS0FBSyxLQUFMLENBQVcsV0FEL0IsQ0FBUDtBQUVIO0FBQ0QsbUJBQU8sRUFBUDtBQUNILFNBUks7QUFTTixxQkFUTSwyQkFTVTtBQUNaLGdCQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUExQyxFQUFpRDtBQUM3QyxvQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxLQUFMLENBQVcsS0FBbkMsQ0FBYjtBQUNBLHVCQUFPLEtBQUssT0FBTCxDQUFhLE1BQXBCO0FBQ0g7QUFDRCxtQkFBTyxDQUFQO0FBQ0g7QUFmSztBQXhCRyxDQUFqQjs7Ozs7O0FDa0VBOzs7OztBQXpFQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFNLFFBQVEsUUFBUSw2QkFBUixDQUFkO0FBQ0EsSUFBTSxZQUFZLFFBQVEsNEJBQVIsQ0FBbEI7QUFDQSxJQUFNLGNBQWMsUUFBUSx1QkFBUixDQUFwQjtBQUNBLElBQU0sWUFBWSxRQUFRLGtDQUFSLENBQWxCO0FBQ0EsSUFBTSxZQUFZLFFBQVEsa0NBQVIsQ0FBbEI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUSxDQUFDLFdBQUQsRUFBYyxTQUFkLEVBQXlCLFNBQXpCLENBREs7QUFFYixRQUZhLGtCQUVOO0FBQ0gsZUFBTztBQUNILG1CQUFPO0FBQ0gsc0JBQU0sVUFBVSxNQUFWLENBQWlCLEtBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsWUFBcEMsRUFBa0QsTUFBbEQsQ0FESDtBQUVILHVCQUFPLFVBQVUsTUFBVixDQUFpQixLQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFlBQXBDLEVBQWtELEtBQWxELENBRko7QUFHSCx1QkFBVSxLQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFlBQTdCLGNBSEc7QUFJSCx1QkFBVSxLQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFlBQTdCLFVBSkc7QUFLSCw4QkFBYyxFQUxYO0FBTUgsNkJBQWEsQ0FOVjtBQU9ILHVCQUFPO0FBQ0gsMEJBQVMsS0FBSyxNQUFMLENBQVksTUFBWixDQUFtQixZQUE1QixVQURHO0FBRUgsMkJBQU87QUFGSjtBQVBKO0FBREosU0FBUDtBQWNILEtBakJZOztBQWtCYixhQUFTLEVBbEJJO0FBb0JiLFdBcEJhLHFCQW9CSDtBQUNOLGFBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsYUFBckIsRUFBb0M7QUFDaEMsa0JBQU0sS0FBSyxLQUFMLENBQVcsS0FEZTtBQUVoQyxrQkFBTSxLQUFLLEtBQUwsQ0FBVztBQUZlLFNBQXBDO0FBSUgsS0F6Qlk7O0FBMEJiLGNBQVU7QUFDTixlQURNLHFCQUNJO0FBQUE7O0FBQ04sZ0JBQUksS0FBSyxLQUFMLENBQVcsS0FBWCxJQUFvQixLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQTFDLEVBQWlEO0FBQzdDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixLQUFLLEtBQUwsQ0FBVyxLQUFuQyxDQUFiO0FBQ0Esb0JBQU0sVUFBVSxLQUFLLE9BQUwsSUFBZ0IsRUFBaEM7QUFDQSx1QkFBTyxRQUFRLEdBQVIsQ0FBWSxVQUFDLENBQUQsRUFBTztBQUN0QixzQkFBRSxLQUFGLEdBQVUsTUFBSyxJQUFMLENBQVUsRUFBRSxLQUFaLENBQVY7QUFDQSwyQkFBTyxDQUFQO0FBQ0gsaUJBSE0sQ0FBUDtBQUlIO0FBQ0QsbUJBQU8sRUFBUDtBQUNILFNBWEs7QUFZTixtQkFaTSx5QkFZUTtBQUNWLG1CQUFPLE1BQU0sU0FBTixDQUFnQixLQUFLLE9BQXJCLEVBQThCLEtBQUssS0FBTCxDQUFXLFdBQXpDLENBQVA7QUFDSDtBQWRLO0FBMUJHLENBQWpCOzs7Ozs7QUN5REE7Ozs7O0FBL0RBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU0sUUFBUSxRQUFRLDZCQUFSLENBQWQ7QUFDQSxJQUFNLFlBQVksUUFBUSw0QkFBUixDQUFsQjtBQUNBLElBQU0sY0FBYyxRQUFRLHVCQUFSLENBQXBCO0FBQ0EsSUFBTSxZQUFZLFFBQVEsa0NBQVIsQ0FBbEI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUSxDQUFDLFdBQUQsRUFBYyxTQUFkLENBREs7QUFFYixRQUZhLGtCQUVOO0FBQ0gsZUFBTztBQUNILG1CQUFPO0FBQ0gsc0JBQU0sVUFBVSxNQUFWLENBQWlCLGNBQWpCLEVBQWlDLE1BQWpDLENBREg7QUFFSCx1QkFBTyxVQUFVLE1BQVYsQ0FBaUIsY0FBakIsRUFBaUMsS0FBakMsQ0FGSjtBQUdILHVCQUFPLHVCQUhKO0FBSUgsdUJBQU8sbUJBSko7QUFLSCw4QkFBYyxFQUxYO0FBTUgsNkJBQWE7QUFOVjtBQURKLFNBQVA7QUFVSCxLQWJZOztBQWNiLGFBQVMsRUFkSTtBQWdCYixXQWhCYSxxQkFnQkg7QUFDTixhQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLGFBQXJCLEVBQW9DO0FBQ2hDLGtCQUFNLEtBQUssS0FBTCxDQUFXLEtBRGU7QUFFaEMsa0JBQU0sS0FBSyxLQUFMLENBQVc7QUFGZSxTQUFwQztBQUlBLGFBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsUUFBckIsRUFBK0I7QUFDM0Isa0JBQU0sV0FEcUI7QUFFM0Isa0JBQU0sVUFBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLEVBQWlDLElBQWpDLENBRnFCO0FBRzNCLGtCQUFNO0FBQ0YsNEJBQVksQ0FBQyxPQUFELEVBQVUsTUFBVixDQURWO0FBRUYsc0JBQU07QUFGSjtBQUhxQixTQUEvQjtBQVFILEtBN0JZOztBQThCYixjQUFVO0FBQ04sZUFETSxxQkFDSTtBQUFBOztBQUNOLGdCQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUExQyxFQUFpRDtBQUM3QyxvQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxLQUFMLENBQVcsS0FBbkMsQ0FBYjtBQUNBLG9CQUFNLFVBQVUsS0FBSyxPQUFMLElBQWdCLEVBQWhDO0FBQ0EsdUJBQU8sUUFBUSxHQUFSLENBQVksVUFBQyxDQUFELEVBQU87QUFDdEIsc0JBQUUsS0FBRixHQUFVLE1BQUssSUFBTCxDQUFVLEVBQUUsS0FBWixDQUFWO0FBQ0EsMkJBQU8sQ0FBUDtBQUNILGlCQUhNLENBQVA7QUFJSDtBQUNELG1CQUFPLEVBQVA7QUFDSCxTQVhLO0FBWU4sbUJBWk0seUJBWVE7QUFDVixtQkFBTyxNQUFNLFNBQU4sQ0FBZ0IsS0FBSyxPQUFyQixFQUE4QixLQUFLLEtBQUwsQ0FBVyxXQUF6QyxDQUFQO0FBQ0gsU0FkSztBQWVOLGFBZk0sbUJBZUU7QUFBQTs7QUFDSixnQkFBSSxlQUFlLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBckMsRUFBNEM7QUFDeEMsdUJBQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixTQUF4QixDQUFrQyxPQUFsQyxDQUEwQyxHQUExQyxDQUE4QyxVQUFDLENBQUQsRUFBTztBQUN4RCxzQkFBRSxLQUFGLEdBQVUsT0FBSyxJQUFMLENBQVUsRUFBRSxLQUFaLENBQVY7QUFDQSwyQkFBTyxDQUFQO0FBQ0gsaUJBSE0sQ0FBUDtBQUlIO0FBQ0QsbUJBQU8sRUFBUDtBQUNIO0FBdkJLO0FBOUJHLENBQWpCOzs7Ozs7QUM0RUE7Ozs7O0FBakZBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU0sUUFBUSxRQUFRLDZCQUFSLENBQWQ7QUFDQSxJQUFNLFlBQVksUUFBUSw0QkFBUixDQUFsQjtBQUNBLElBQU0sY0FBYyxRQUFRLHVCQUFSLENBQXBCO0FBQ0EsSUFBTSxZQUFZLFFBQVEsa0NBQVIsQ0FBbEI7QUFDQSxJQUFNLGFBQWEsUUFBUSx3QkFBUixDQUFuQjs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRLENBQUMsV0FBRCxFQUFjLFNBQWQsQ0FESztBQUViLFFBRmEsa0JBRU47QUFDSCxlQUFPO0FBQ0gsbUJBQU87QUFDSCxzQkFBTSxVQUFVLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUIsTUFBekIsQ0FESDtBQUVILHVCQUFPLFVBQVUsTUFBVixDQUFpQixNQUFqQixFQUF5QixLQUF6QixDQUZKO0FBR0gsdUJBQU8sZUFISjtBQUlILHVCQUFPLFdBSko7QUFLSCw4QkFBYyxFQUxYO0FBTUgsNkJBQWEsQ0FOVjtBQU9ILGdDQUFnQjtBQVBiO0FBREosU0FBUDtBQVdILEtBZFk7O0FBZWIsYUFBUztBQUNMLG1CQURLLHVCQUNPLEdBRFAsRUFDWSxHQURaLEVBQ2lCO0FBQ2xCLGdCQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUNiLG9CQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsY0FBdEIsRUFBc0M7QUFDbEMsMkJBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixHQUExQixDQUFQO0FBQ0g7QUFDSixhQUpELE1BSU87QUFDSCxxQkFBSyxJQUFMLENBQVUsS0FBSyxLQUFMLENBQVcsY0FBckIsRUFBcUMsR0FBckMsRUFBMEMsSUFBSSxLQUE5QztBQUNIO0FBQ0o7QUFUSSxLQWZJO0FBMEJiLFdBMUJhLHFCQTBCSDtBQUNOLGFBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsYUFBckIsRUFBb0M7QUFDaEMsa0JBQU0sS0FBSyxLQUFMLENBQVcsS0FEZTtBQUVoQyxrQkFBTSxLQUFLLEtBQUwsQ0FBVztBQUZlLFNBQXBDO0FBSUEsYUFBSyxNQUFMLENBQVksUUFBWixDQUFxQixRQUFyQixFQUErQjtBQUMzQixrQkFBTSxtQkFEcUI7QUFFM0Isa0JBQU0sVUFBVSxNQUFWLENBQWlCLGNBQWpCLEVBQWlDLE1BQWpDLEVBQXlDLElBQXpDLENBRnFCO0FBRzNCLGtCQUFNO0FBQ0YsNEJBQVksQ0FBQyxPQUFELEVBQVUsTUFBVixDQURWO0FBRUYsc0JBQU07QUFGSjtBQUhxQixTQUEvQjtBQVFILEtBdkNZOztBQXdDYixjQUFVO0FBQ04sZUFETSxxQkFDSTtBQUFBOztBQUNOLGdCQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUExQyxFQUFpRDtBQUM3QyxvQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxLQUFMLENBQVcsS0FBbkMsQ0FBYjtBQUNBLG9CQUFNLFVBQVUsS0FBSyxPQUFMLElBQWdCLEVBQWhDO0FBQ0EsdUJBQU8sUUFBUSxHQUFSLENBQVksVUFBQyxDQUFELEVBQU87QUFDdEIsc0JBQUUsS0FBRixHQUFVLE1BQUssSUFBTCxDQUFVLEVBQUUsS0FBWixDQUFWO0FBQ0Esc0JBQUUsV0FBRixHQUFnQixNQUFLLElBQUwsQ0FBVSxFQUFFLFdBQVosQ0FBaEI7QUFDQSwyQkFBTyxDQUFQO0FBQ0gsaUJBSk0sQ0FBUDtBQUtIO0FBQ0QsbUJBQU8sRUFBUDtBQUNILFNBWks7QUFhTixtQkFiTSx5QkFhUTtBQUNWLG1CQUFPLE1BQU0sU0FBTixDQUFnQixLQUFLLE9BQXJCLEVBQThCLEtBQUssS0FBTCxDQUFXLFdBQXpDLENBQVA7QUFDSCxTQWZLO0FBZ0JOLGtCQWhCTSx3QkFnQk87QUFBQTs7QUFDVCxtQkFBTyxXQUFXLEdBQVgsQ0FBZTtBQUFBLHVCQUFPLEVBQUUsT0FBTyxHQUFHLEtBQVosRUFBbUIsT0FBTyxPQUFLLElBQUwsQ0FBVSxHQUFHLEtBQWIsQ0FBMUIsRUFBUDtBQUFBLGFBQWYsQ0FBUDtBQUNILFNBbEJLO0FBbUJOLG1CQW5CTSx5QkFtQlE7QUFDVixnQkFBSSx1QkFBdUIsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUE3QyxFQUFvRDtBQUNoRCx1QkFBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLENBQXdCLGlCQUF4QixDQUEwQyxPQUFqRDtBQUNIO0FBQ0QsbUJBQU8sRUFBUDtBQUNIO0FBeEJLO0FBeENHLENBQWpCOzs7Ozs7QUNtSEE7Ozs7O0FBekhBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU0sUUFBUSxRQUFRLDZCQUFSLENBQWQ7QUFDQSxJQUFNLFlBQVksUUFBUSw0QkFBUixDQUFsQjtBQUNBLElBQU0sY0FBYyxRQUFRLHVCQUFSLENBQXBCOztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFlBQVEsQ0FBQyxXQUFELENBREs7QUFFYixRQUZhLGtCQUVOO0FBQ0gsZUFBTztBQUNILG1CQUFPO0FBREosU0FBUDtBQUlILEtBUFk7O0FBUWIsYUFBUyxFQVJJO0FBVWIsV0FWYSxxQkFVSCxDQUNULENBWFk7O0FBWWIsY0FBVTtBQVpHLENBQWpCOzs7Ozs7QUNJQTs7Ozs7QUFSQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFNLFFBQVEsUUFBUSw2QkFBUixDQUFkO0FBQ0EsSUFBTSxZQUFZLFFBQVEsNEJBQVIsQ0FBbEI7QUFDQSxJQUFNLGNBQWMsUUFBUSx1QkFBUixDQUFwQjtBQUNBLElBQU0sWUFBWSxRQUFRLGtDQUFSLENBQWxCO0FBQ0EsSUFBTSxRQUFRLFFBQVEsbUJBQVIsQ0FBZDtBQUNBLElBQU0sYUFBYSxRQUFRLHdCQUFSLENBQW5COztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFlBQVEsQ0FBQyxXQUFELEVBQWMsU0FBZCxDQURLO0FBRWIsUUFGYSxrQkFFTjtBQUNILGVBQU87QUFDSCxtQkFBTztBQUNILHNCQUFNLFVBQVUsTUFBVixDQUFpQixNQUFqQixFQUF5QixNQUF6QixDQURIO0FBRUgsdUJBQU8sVUFBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCLEtBQXpCLENBRko7QUFHSCx1QkFBTyxlQUhKO0FBSUgsdUJBQU8sV0FKSjtBQUtILDhCQUFjLEVBTFg7QUFNSCw2QkFBYSxDQU5WO0FBT0gsdUJBQU8sTUFBTSxTQVBWO0FBUUgsNEJBQVk7QUFSVDtBQURKLFNBQVA7QUFZSCxLQWZZOztBQWdCYixhQUFTLEVBaEJJO0FBa0JiLFdBbEJhLHFCQWtCSDtBQUNOLGFBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsYUFBckIsRUFBb0M7QUFDaEMsa0JBQU0sS0FBSyxLQUFMLENBQVcsS0FEZTtBQUVoQyxrQkFBTSxLQUFLLEtBQUwsQ0FBVztBQUZlLFNBQXBDO0FBSUgsS0F2Qlk7O0FBd0JiLGNBQVU7QUFDTixtQkFETSx5QkFDUTtBQUNWLGdCQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUExQyxFQUFpRDtBQUM3QyxvQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxLQUFMLENBQVcsS0FBbkMsQ0FBYjtBQUNBLG9CQUFNLGFBQWEsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixVQUFDLEdBQUQsRUFBTSxJQUFOLEVBQWU7QUFDbEQsd0JBQUksS0FBSyxJQUFMLElBQWEsR0FBakIsRUFBc0I7QUFDbEIsNEJBQUksS0FBSyxJQUFULEVBQWUsSUFBZixDQUFvQixJQUFwQjtBQUNILHFCQUZELE1BRU87QUFDSCw0QkFBSSxLQUFLLElBQVQsSUFBaUIsQ0FBQyxJQUFELENBQWpCO0FBQ0g7QUFDRCwyQkFBTyxHQUFQO0FBQ0gsaUJBUGtCLEVBT2hCLEVBUGdCLENBQW5COztBQVNBOzs7O0FBSUEsdUJBQU8sRUFBUDtBQUNIO0FBQ0QsbUJBQU8sRUFBUDtBQUNIO0FBcEJLO0FBeEJHLENBQWpCOzs7Ozs7QUNrRUE7Ozs7O0FBekVBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU0sUUFBUSxRQUFRLDZCQUFSLENBQWQ7QUFDQSxJQUFNLFlBQVksUUFBUSw0QkFBUixDQUFsQjtBQUNBLElBQU0sY0FBYyxRQUFRLHVCQUFSLENBQXBCO0FBQ0EsSUFBTSxZQUFZLFFBQVEsa0NBQVIsQ0FBbEI7QUFDQSxJQUFNLGFBQWEsUUFBUSx3QkFBUixDQUFuQjs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRLENBQUMsV0FBRCxFQUFjLFNBQWQsQ0FESztBQUViLFFBRmEsa0JBRU47QUFDSCxlQUFPO0FBQ0gsbUJBQU87QUFDSCxzQkFBTSxVQUFVLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUIsTUFBekIsQ0FESDtBQUVILHVCQUFPLFVBQVUsTUFBVixDQUFpQixNQUFqQixFQUF5QixLQUF6QixDQUZKO0FBR0gsdUJBQU8sZUFISjtBQUlILHVCQUFPLFdBSko7QUFLSCw4QkFBYyxFQUxYO0FBTUgsNkJBQWEsQ0FOVjtBQU9ILGdDQUFnQjtBQVBiO0FBREosU0FBUDtBQVdILEtBZFk7O0FBZWIsYUFBUztBQUNMLG1CQURLLHVCQUNPLEdBRFAsRUFDWSxHQURaLEVBQ2lCO0FBQ2xCLGdCQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUNiLG9CQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsY0FBdEIsRUFBc0M7QUFDbEMsMkJBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixHQUExQixDQUFQO0FBQ0g7QUFDSixhQUpELE1BSU87QUFDSCxxQkFBSyxJQUFMLENBQVUsS0FBSyxLQUFMLENBQVcsY0FBckIsRUFBcUMsR0FBckMsRUFBMEMsSUFBSSxLQUE5QztBQUNIO0FBQ0o7QUFUSSxLQWZJO0FBMEJiLFdBMUJhLHFCQTBCSDtBQUNOLGFBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsYUFBckIsRUFBb0M7QUFDaEMsa0JBQU0sS0FBSyxLQUFMLENBQVcsS0FEZTtBQUVoQyxrQkFBTSxLQUFLLEtBQUwsQ0FBVztBQUZlLFNBQXBDO0FBSUEsYUFBSyxNQUFMLENBQVksUUFBWixDQUFxQixRQUFyQixFQUErQjtBQUMzQixrQkFBTSxtQkFEcUI7QUFFM0Isa0JBQU0sVUFBVSxNQUFWLENBQWlCLGNBQWpCLEVBQWlDLE1BQWpDLEVBQXlDLElBQXpDLENBRnFCO0FBRzNCLGtCQUFNO0FBQ0YsNEJBQVksQ0FBQyxPQUFELEVBQVUsTUFBVixDQURWO0FBRUYsc0JBQU07QUFGSjtBQUhxQixTQUEvQjtBQVFILEtBdkNZOztBQXdDYixjQUFVO0FBQ04sZUFETSxxQkFDSTtBQUFBOztBQUNOLGdCQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUExQyxFQUFpRDtBQUM3QyxvQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxLQUFMLENBQVcsS0FBbkMsQ0FBYjtBQUNBLG9CQUFNLFVBQVUsS0FBSyxPQUFMLElBQWdCLEVBQWhDO0FBQ0EsdUJBQU8sUUFBUSxHQUFSLENBQVksVUFBQyxDQUFELEVBQU87QUFDdEIsc0JBQUUsS0FBRixHQUFVLE1BQUssSUFBTCxDQUFVLEVBQUUsS0FBWixDQUFWO0FBQ0Esc0JBQUUsV0FBRixHQUFnQixNQUFLLElBQUwsQ0FBVSxFQUFFLFdBQVosQ0FBaEI7QUFDQSwyQkFBTyxDQUFQO0FBQ0gsaUJBSk0sQ0FBUDtBQUtIO0FBQ0QsbUJBQU8sRUFBUDtBQUNILFNBWks7QUFhTixtQkFiTSx5QkFhUTtBQUNWLG1CQUFPLE1BQU0sU0FBTixDQUFnQixLQUFLLE9BQXJCLEVBQThCLEtBQUssS0FBTCxDQUFXLFdBQXpDLENBQVA7QUFDSCxTQWZLO0FBZ0JOLGtCQWhCTSx3QkFnQk87QUFBQTs7QUFDVCxtQkFBTyxXQUFXLEdBQVgsQ0FBZTtBQUFBLHVCQUFPLEVBQUUsT0FBTyxHQUFHLEtBQVosRUFBbUIsT0FBTyxPQUFLLElBQUwsQ0FBVSxHQUFHLEtBQWIsQ0FBMUIsRUFBUDtBQUFBLGFBQWYsQ0FBUDtBQUNILFNBbEJLO0FBbUJOLG1CQW5CTSx5QkFtQlE7QUFDVixnQkFBSSx1QkFBdUIsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUE3QyxFQUFvRDtBQUNoRCx1QkFBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLENBQXdCLGlCQUF4QixDQUEwQyxPQUFqRDtBQUNIO0FBQ0QsbUJBQU8sRUFBUDtBQUNIO0FBeEJLO0FBeENHLENBQWpCOzs7Ozs7QUNNQTs7Ozs7QUFaQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFNLE1BQU0sUUFBUSxLQUFSLENBQVo7QUFDQSxJQUFNLFlBQVksUUFBUSw0QkFBUixDQUFsQjtBQUNBLElBQU0sV0FBVyxRQUFRLDhCQUFSLENBQWpCOztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLGFBQVM7QUFDTCxjQURLLGtCQUNFLEdBREYsRUFDTyxNQURQLEVBQ2U7QUFBQTs7QUFDaEIsaUJBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsU0FBUyxXQUE1QixFQUF5QztBQUNyQyxzQkFBTSxLQUFLLEtBQUwsQ0FBVztBQURvQixhQUF6Qzs7QUFJQSxnQkFBSSxRQUFKLENBQWEsWUFBTTtBQUNmLHNCQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFNBQVMsZ0JBQTVCLEVBQThDO0FBQzFDLDBCQUFNLE1BQUssS0FBTCxDQUFXLEtBRHlCO0FBRTFDLDRCQUFRLElBRmtDO0FBRzFDLDZCQUFTO0FBSGlDLGlCQUE5QztBQUtILGFBTkQ7QUFPSCxTQWJJO0FBY0wsY0FkSyxrQkFjRSxHQWRGLEVBY08sTUFkUCxFQWNlO0FBQ2hCLGlCQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLFFBQXJCLEVBQStCO0FBQzNCLHNCQUFNLEtBQUssS0FBTCxDQUFXLEtBRFU7QUFFM0Isc0JBQU0sVUFBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCLEtBQXpCLEVBQWdDLEtBQWhDLEVBQXVDLElBQUksR0FBM0MsQ0FGcUI7QUFHM0IsdUJBQU8sS0FBSyxLQUFMLENBQVcsS0FIUztBQUkzQix1QkFBTyxLQUFLLEtBQUwsQ0FBVztBQUpTLGFBQS9CO0FBTUg7QUFyQkksS0FESTtBQXdCYixlQXhCYSx5QkF3QkM7QUFDVixhQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFNBQVMsV0FBNUIsRUFBeUM7QUFDckMsa0JBQU0sS0FBSyxLQUFMLENBQVcsS0FEb0I7QUFFckMscUJBQVM7QUFGNEIsU0FBekM7QUFJSCxLQTdCWTs7QUE4QmIsY0FBVTtBQUNOLGFBRE0sbUJBQ0U7QUFDSixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxLQUFYLElBQW9CLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBMUMsRUFBaUQ7QUFDN0Msb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLENBQXdCLEtBQUssS0FBTCxDQUFXLEtBQW5DLENBQWI7QUFDQSx1QkFBTyxLQUFLLEtBQVo7QUFDSDtBQUNELG1CQUFPLEVBQVA7QUFDSCxTQVBLO0FBUU4sZUFSTSxxQkFRSTtBQUNOLGdCQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUExQyxFQUFpRDtBQUM3QyxvQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxLQUFMLENBQVcsS0FBbkMsQ0FBYjtBQUNBLHVCQUFPLEtBQUssT0FBTCxJQUFnQixFQUF2QjtBQUNIO0FBQ0QsbUJBQU8sRUFBUDtBQUNILFNBZEs7QUFlTixxQkFmTSwyQkFlVTtBQUNaLG1CQUFPLEtBQUssT0FBTCxDQUFhLE1BQXBCO0FBQ0g7QUFqQkssS0E5Qkc7QUFpRGIsV0FBTztBQUNILGFBREcsaUJBQ0csQ0FESCxFQUNNO0FBQ0wsZ0JBQUksS0FBSyxvQkFBWSxDQUFaLEVBQWUsTUFBZixHQUF3QixDQUFqQyxFQUFvQztBQUNoQyx3QkFBUSxLQUFSLENBQWMsRUFBRSxPQUFGLENBQVUsT0FBeEI7QUFDQTtBQUNIO0FBQ0o7QUFORTtBQWpETSxDQUFqQjs7Ozs7QUNKQSxJQUFNLFFBQVEsUUFBUSw2QkFBUixDQUFkO0FBQ0EsSUFBTSxZQUFZLFFBQVEsNEJBQVIsQ0FBbEI7QUFDQSxJQUFNLGNBQWMsUUFBUSx1QkFBUixDQUFwQjtBQUNBLElBQU0sWUFBWSxRQUFRLGtDQUFSLENBQWxCO0FBQ0EsSUFBTSxZQUFZLFFBQVEsa0NBQVIsQ0FBbEI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUSxDQUFDLFdBQUQsRUFBYyxTQUFkLEVBQXlCLFNBQXpCLENBREs7QUFFYixRQUZhLGtCQUVOO0FBQ0gsZUFBTztBQUNILG1CQUFPO0FBQ0gsc0JBQU0sVUFBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLENBREg7QUFFSCx1QkFBTyxVQUFVLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUIsS0FBekIsQ0FGSjtBQUdILHVCQUFPLGVBSEo7QUFJSCx1QkFBTyxXQUpKO0FBS0gsdUJBQU87QUFDSCwwQkFBTSxXQURIO0FBRUgsMkJBQU87QUFGSixpQkFMSjtBQVNILDhCQUFjLEVBVFg7QUFVSCw2QkFBYTtBQVZWO0FBREosU0FBUDtBQWNILEtBakJZOztBQWtCYixhQUFTLEVBbEJJO0FBb0JiLFdBcEJhLHFCQW9CSDtBQUNOLGFBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsYUFBckIsRUFBb0M7QUFDaEMsa0JBQU0sS0FBSyxLQUFMLENBQVcsS0FEZTtBQUVoQyxrQkFBTSxLQUFLLEtBQUwsQ0FBVztBQUZlLFNBQXBDO0FBSUgsS0F6Qlk7O0FBMEJiLGNBQVU7QUFDTixtQkFETSx5QkFDUTtBQUNWLGdCQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUExQyxFQUFpRDtBQUM3QyxvQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxLQUFMLENBQVcsS0FBbkMsQ0FBYjtBQUNBLHVCQUFPLE1BQU0sU0FBTixDQUFnQixLQUFLLE9BQUwsWUFBd0IsS0FBeEIsR0FDZixLQUFLLE9BRFUsR0FDQSxFQURoQixFQUNvQixLQUFLLEtBQUwsQ0FBVyxXQUQvQixDQUFQO0FBRUg7QUFDRCxtQkFBTyxFQUFQO0FBQ0gsU0FSSztBQVNOLHFCQVRNLDJCQVNVO0FBQ1osZ0JBQUksS0FBSyxLQUFMLENBQVcsS0FBWCxJQUFvQixLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQTFDLEVBQWlEO0FBQzdDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixLQUFLLEtBQUwsQ0FBVyxLQUFuQyxDQUFiO0FBQ0EsdUJBQU8sS0FBSyxPQUFMLENBQWEsTUFBcEI7QUFDSDtBQUNELG1CQUFPLENBQVA7QUFDSDtBQWZLO0FBMUJHLENBQWpCOzs7Ozs7QUM0REE7Ozs7O0FBbEVBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU0sSUFBSSxRQUFRLFFBQVIsQ0FBVjs7QUFFQSxJQUFNLE1BQU0sUUFBUSxLQUFSLENBQVo7QUFDQSxJQUFNLFNBQVMsUUFBUSxZQUFSLENBQWY7QUFDQSxJQUFNLFNBQVMsUUFBUSxrREFBUixDQUFmO0FBQ0EsSUFBTSxTQUFTLFFBQVEsa0RBQVIsQ0FBZjtBQUNBLElBQU0sU0FBUyxRQUFRLGtEQUFSLENBQWY7QUFDQSxJQUFNLFFBQVEsUUFBUSxTQUFSLENBQWQ7O0FBRUEsSUFBSSxHQUFKLENBQVEsTUFBUjs7QUFFQSxJQUFNLGNBQWMsRUFBRSxPQUFGLENBQVUsTUFBTSxJQUFoQixFQUFzQixHQUF0QixDQUEwQjtBQUFBLFdBQVM7QUFDbkQsY0FBTSxLQUFLLE1BQUwsQ0FBWSxDQUFaLENBRDZDO0FBRW5ELGNBQU0sS0FBSyxHQUZ3QztBQUduRCxvQkFBWTtBQUNSLG9CQUFRLE1BREE7QUFFUixvQkFBUSxNQUZBO0FBR1Isb0JBQVEsTUFIQTtBQUlSLHFCQUFTLEtBQUs7QUFKTixTQUh1QztBQVNuRCxlQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sTUFBTSxJQUFmLEVBQVY7QUFUNEMsS0FBVDtBQUFBLENBQTFCLENBQXBCOztBQVlBLElBQU0sZUFBZSxNQUFNLEtBQU4sQ0FBWSxHQUFaLENBQWdCO0FBQUEsV0FBUztBQUMxQyxjQUFNLEtBQUssTUFBTCxDQUFZLENBQVosQ0FEb0M7QUFFMUMsY0FBTSxLQUFLLEdBRitCO0FBRzFDLG9CQUFZO0FBQ1Isb0JBQVEsTUFEQTtBQUVSLG9CQUFRLE1BRkE7QUFHUixvQkFBUSxNQUhBO0FBSVIscUJBQVMsS0FBSztBQUpOLFNBSDhCO0FBUzFDLGVBQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxNQUFNLElBQWYsRUFBVjtBQVRtQyxLQUFUO0FBQUEsQ0FBaEIsQ0FBckI7O0FBWUEsT0FBTyxPQUFQLEdBQWlCLElBQUksTUFBSixDQUFXO0FBQ3hCLFVBQU0sU0FEa0I7QUFFeEIsdURBQVksV0FBWixvQ0FBNEIsWUFBNUI7QUFGd0IsQ0FBWCxDQUFqQjs7Ozs7QUNuQ0EsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsV0FBTyxRQURNO0FBRWIsVUFBTSxhQUZPO0FBR2IsWUFBUSxlQUhLO0FBSWIsZ0JBQVksbUJBSkM7QUFLYixrQkFBYyxpQ0FMRDtBQU1iLGlCQUFhLG9CQU5BO0FBT2IsU0FBSyxZQVBRO0FBUWIsVUFBTSxhQVJPO0FBU2IsVUFBTSxhQVRPO0FBVWIsVUFBTSxhQVZPO0FBV2IsbUJBQWUsNEJBWEY7QUFZYixtQkFBZSxzQkFaRjtBQWFiLGVBQVcsa0JBYkU7QUFjYixTQUFLLFlBZFE7QUFlYixZQUFRO0FBZkssQ0FBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3RkNJQSxpQkFBcUIsTUFBckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1ksOEJBRFosR0FDMkMsTUFEM0MsQ0FDWSxNQURaLEVBQ29CLElBRHBCLEdBQzJDLE1BRDNDLENBQ29CLElBRHBCLEVBQzBCLElBRDFCLEdBQzJDLE1BRDNDLENBQzBCLElBRDFCLEVBQ2dDLE1BRGhDLEdBQzJDLE1BRDNDLENBQ2dDLE1BRGhDO0FBR1EscUNBSFIsR0FHd0IsUUFBUSxPQUFPLFdBQVAsRUFBUixFQUE4QixJQUE5QixFQUNmLEdBRGUsQ0FDWCxlQURXLEVBQ00sb0RBRE4sQ0FIeEI7O0FBS0ksNEJBQUksUUFBUSxJQUFSLElBQWdCLG9CQUFZLElBQVosRUFBa0IsTUFBbEIsR0FBMkIsQ0FBL0MsRUFBa0Q7QUFDOUMsNENBQWdCLGNBQWMsSUFBZCxDQUFtQixPQUFPLElBQTFCLENBQWhCO0FBQ0g7O0FBUEw7QUFBQTtBQUFBLCtCQVUwQixhQVYxQjs7QUFBQTtBQVVjLDJCQVZkO0FBQUEseURBV2U7QUFDSCxrQ0FBTSxTQUFTLE9BRFo7QUFFSCxxQ0FBUyxJQUFJO0FBRlYseUJBWGY7O0FBQUE7QUFBQTtBQUFBO0FBQUEseURBZ0JlO0FBQ0gsa0NBQU0sU0FBUyxPQURaO0FBRUgscUNBQVMsWUFBSSxRQUFKLElBQWdCLElBQWhCLEdBQXVCLFlBQUksUUFBSixDQUFhLElBQXBDO0FBRk4seUJBaEJmOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEs7O29CQUFlLEs7Ozs7Ozs7QUFKZixJQUFNLFVBQVUsUUFBUSxZQUFSLENBQWhCO0FBQ0EsSUFBTSxXQUFXLFFBQVEsWUFBUixDQUFqQjs7QUEwQkEsT0FBTyxPQUFQLEdBQWlCO0FBQ2I7QUFEYSxDQUFqQjs7Ozs7QUMzQkEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsYUFBUyxTQURJO0FBRWIsYUFBUyxTQUZJO0FBR2IsYUFBUyxTQUhJO0FBSWIsV0FBTyxPQUpNO0FBS2IsV0FBTyxPQUxNO0FBTWIsaUJBQWEsYUFOQTtBQU9iLGlCQUFhLGFBUEE7QUFRYixpQkFBYSxhQVJBO0FBU2Isc0JBQWtCLGtCQVRMO0FBVWIsc0JBQWtCLGtCQVZMO0FBV2IseUJBQXFCLHFCQVhSO0FBWWIsMEJBQXNCLHNCQVpUO0FBYWIsc0JBQWtCLGtCQWJMO0FBY2IsMkJBQXVCO0FBZFYsQ0FBakI7Ozs7O0FDQUEsSUFBTSxTQUFTLFFBQVEscUJBQVIsQ0FBZjs7QUFFQSxJQUFNLFNBQVksT0FBTyxHQUFQLENBQVcsTUFBWCxDQUFrQixNQUE5QixTQUF3QyxPQUFPLEdBQVAsQ0FBVyxNQUFYLENBQWtCLE9BQWhFOztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFVBRGEsa0JBQ04sT0FETSxFQUNFLE1BREYsRUFDcUM7QUFBQSxZQUEzQixNQUEyQix1RUFBbEIsS0FBa0I7QUFBQSxZQUFYLEVBQVcsdUVBQU4sSUFBTTs7QUFDOUMsZ0JBQVEsTUFBUjtBQUNBLGlCQUFLLEtBQUw7QUFBWTtBQUNSLHdCQUFJLE1BQVMsTUFBVCxTQUFtQixPQUF2QjtBQUNBLHdCQUFJLE1BQU0sSUFBVixFQUFnQjtBQUNaLCtCQUFPLEdBQVA7QUFDSDtBQUNELDJCQUFPLEdBQVA7QUFDSDtBQUNELGlCQUFLLE1BQUw7QUFBYTtBQUNULHdCQUFJLE1BQUosRUFBWTtBQUNSLCtCQUFVLE1BQVYsU0FBb0IsT0FBcEI7QUFDSDtBQUNELDJCQUFVLE1BQVYsU0FBb0IsT0FBcEI7QUFDSDtBQUNELGlCQUFLLEtBQUw7QUFDSSx1QkFBVSxNQUFWLFNBQW9CLE9BQXBCO0FBQ0osaUJBQUssS0FBTDtBQUNJLHVCQUFVLE1BQVYsU0FBb0IsT0FBcEIsU0FBOEIsRUFBOUI7QUFDSjtBQUNJLHVCQUFPLEVBQVA7QUFuQko7QUFxQkg7QUF2QlksQ0FBakI7Ozs7O0FDSkEsSUFBTSxZQUFZLFFBQVEsOEJBQVIsQ0FBbEI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUSxDQUFDLFNBQUQsQ0FESztBQUViLFdBQU87QUFDSCxjQUFNLEVBQUUsVUFBVSxJQUFaLEVBREg7QUFFSCxlQUFPLEVBQUUsTUFBTSxNQUFSLEVBQWdCLFVBQVUsSUFBMUIsRUFGSjtBQUdILGdCQUFRLEVBQUUsTUFBTSxNQUFSLEVBQWdCLFNBQVMsRUFBekI7QUFITCxLQUZNO0FBT2IsYUFBUztBQUNMLGdCQURLLG9CQUNJLElBREosRUFDVTtBQUNYLGdCQUFJLEtBQUssTUFBTCxLQUFnQixFQUFwQixFQUF3QjtBQUNwQix1QkFBVSxLQUFLLE1BQWYsU0FBeUIsSUFBekI7QUFDSDtBQUNELG1CQUFPLElBQVA7QUFDSDtBQU5JO0FBUEksQ0FBakI7Ozs7OztBQ3lDQTs7Ozs7QUEzQ0E7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxXQUFXLFFBQVEsNkJBQVIsQ0FBakI7QUFDQSxJQUFNLFFBQVEsUUFBUSw0QkFBUixDQUFkO0FBQ0EsSUFBTSxhQUFhLFFBQVEseUJBQVIsQ0FBbkI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUSxDQUFDLFVBQUQsQ0FESztBQUViLFdBQU87QUFDSCxjQUFNLEVBQUUsVUFBVSxJQUFaLEVBQWtCLE1BQU0sTUFBeEIsRUFESDtBQUVILGVBQU8sRUFBRSxVQUFVLElBQVosRUFBa0IsTUFBTSxNQUF4QixFQUZKO0FBR0gscUJBQWEsRUFBRSxVQUFVLElBQVosRUFBa0IsTUFBTSxNQUF4QixFQUhWO0FBSUgsb0JBQVksRUFBRSxTQUFTLEtBQVgsRUFBa0IsTUFBTSxPQUF4QixFQUpUO0FBS0gsY0FBTSxFQUFFLFVBQVUsSUFBWixFQUFrQixNQUFNLE1BQXhCLEVBTEg7QUFNSCxjQUFNLEVBQUUsU0FBUyxLQUFYLEVBQWtCLE1BQU0sT0FBeEIsRUFOSDtBQU9ILGdCQUFRLEVBQUUsU0FBUyxLQUFYLEVBQWtCLE1BQU0sT0FBeEIsRUFQTDtBQVFILGNBQU0sRUFBRSxVQUFVLElBQVosRUFBa0IsTUFBTSxNQUF4QixFQVJIO0FBU0gsY0FBTSxFQUFFLFNBQVMsRUFBWCxFQVRIO0FBVUgsc0JBQWMsRUFBRSxTQUFTO0FBQUEsdUJBQU0sRUFBTjtBQUFBLGFBQVgsRUFBcUIsTUFBTSxLQUEzQjtBQVZYLEtBRk07O0FBZWIsUUFmYSxrQkFlTjtBQUNILGVBQU87QUFDSCxtQkFBTztBQUNILHVCQUFPLEtBQUssWUFBTDtBQURKO0FBREosU0FBUDtBQUtILEtBckJZOzs7QUF1QmIsYUFBUztBQUNMLGNBREssb0JBQ0k7QUFDTCxnQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxJQUE3QixDQUFiO0FBQ0EsZ0JBQUksS0FBSyxNQUFULEVBQWlCO0FBQ2IscUJBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsTUFBTSxvQkFBTixDQUEyQixLQUFLLE9BQWhDLEVBQXlDLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBekMsQ0FBbkI7QUFDQSxvQkFBSSxLQUFLLEtBQUwsQ0FBVyxLQUFYLElBQW9CLElBQXhCLEVBQThCO0FBQzFCLHlCQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLEtBQUssWUFBTCxFQUFuQjtBQUNIO0FBQ0osYUFMRCxNQUtPO0FBQ0gscUJBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsS0FBSyxZQUFMLEVBQW5CO0FBQ0g7QUFDSixTQVhJO0FBWUwsb0JBWkssMEJBWVU7QUFDWCxnQkFBSSxLQUFLLElBQUwsS0FBYyxVQUFkLElBQTRCLEtBQUssSUFBTCxLQUFjLE9BQTlDLEVBQXVEO0FBQ25ELHVCQUFPLEtBQVA7QUFDSDtBQUNELG1CQUFPLFNBQVA7QUFDSDtBQWpCSSxLQXZCSTs7QUEyQ2IsV0FBTztBQUNILGVBREcsbUJBQ0ssQ0FETCxFQUNRO0FBQ1AsZ0JBQUksQ0FBSixFQUFPO0FBQ0gscUJBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsU0FBUyxvQkFBNUIsRUFBa0Q7QUFDOUMsMEJBQU0sS0FBSyxJQURtQztBQUU5QywwQkFBTSxLQUFLLElBRm1DO0FBRzlDLDBCQUFNLEtBQUssS0FBTCxDQUFXO0FBSDZCLGlCQUFsRDtBQUtIO0FBQ0osU0FURTtBQVVILGNBVkcsa0JBVUksQ0FWSixFQVVPO0FBQ04sZ0JBQUksQ0FBSixFQUFPO0FBQ0gscUJBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsS0FBSyxZQUFMLEVBQW5CO0FBQ0g7QUFDSjtBQWRFLEtBM0NNO0FBMkRiLGNBQVU7QUEzREcsQ0FBakI7Ozs7OztBQzJFQTs7Ozs7QUEvRUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxVQUFVLFFBQVEsWUFBUixFQUFzQixTQUF0QztBQUNBLElBQU0sYUFBYSxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsSUFBTSxRQUFRLFFBQVEsNEJBQVIsQ0FBZDtBQUNBLElBQU0sV0FBVyxRQUFRLDZCQUFSLENBQWpCOztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFdBQU87QUFDSCxjQUFNLEVBQUUsVUFBVSxJQUFaLEVBQWtCLE1BQU0sTUFBeEIsRUFESDtBQUVILGVBQU8sRUFBRSxVQUFVLElBQVosRUFBa0IsTUFBTSxNQUF4QixFQUZKO0FBR0gsb0JBQVksRUFBRSxTQUFTLEtBQVgsRUFBa0IsTUFBTSxPQUF4QixFQUhUO0FBSUgsY0FBTSxFQUFFLFVBQVUsSUFBWixFQUFrQixNQUFNLE1BQXhCLEVBSkg7QUFLSCxlQUFPLEVBQUUsU0FBUyxLQUFYLEVBQWtCLE1BQU0sT0FBeEIsRUFMSjtBQU1ILGlCQUFTLEVBQUUsVUFBVSxJQUFaLEVBQWtCLE1BQU0sS0FBeEIsRUFOTjtBQU9ILG9CQUFZLEVBQUUsVUFBVSxLQUFaLEVBQW1CLFNBQVMsT0FBNUIsRUFBcUMsTUFBTSxNQUEzQyxFQVBUO0FBUUgsb0JBQVksRUFBRSxVQUFVLEtBQVosRUFBbUIsU0FBUyxPQUE1QixFQUFxQyxNQUFNLE1BQTNDO0FBUlQsS0FETTtBQVdiLGdCQUFZO0FBQ1Isb0JBQVk7QUFESixLQVhDO0FBY2IsWUFBUSxDQUFDLFVBQUQsQ0FkSztBQWViLFFBZmEsa0JBZU47QUFDSCxlQUFPO0FBQ0gsbUJBQU87QUFDSCwwQkFBVSxJQURQO0FBRUgseUJBQVM7QUFGTjtBQURKLFNBQVA7QUFNSCxLQXRCWTs7QUF1QmIsYUFBUztBQUNMLGNBREssb0JBQ0k7QUFBQTs7QUFDTCxnQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxJQUE3QixDQUFiO0FBQ0EsZ0JBQUksS0FBSyxNQUFULEVBQWlCO0FBQ2Isb0JBQUksT0FBTyxNQUFNLG9CQUFOLENBQTJCLEtBQUssT0FBaEMsRUFBeUMsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixHQUFoQixDQUF6QyxDQUFYO0FBQ0Esb0JBQUksUUFBUSxJQUFaLEVBQWtCO0FBQ2Q7QUFDSCxpQkFGRCxNQUVPLElBQUksZ0JBQWdCLEtBQXBCLEVBQTJCO0FBQzlCLDJCQUFPLEtBQUssR0FBTCxDQUFTLFVBQUMsQ0FBRCxFQUFPO0FBQ25CLDRCQUFJLE1BQUssVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUN0QixtQ0FBTyxDQUFQO0FBQ0g7QUFDRCw0QkFBTSxVQUFVLE1BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0I7QUFBQSxtQ0FDaEMsRUFBRSxNQUFLLFVBQVAsTUFBdUIsR0FBRyxNQUFLLFVBQVIsQ0FEUztBQUFBLHlCQUFwQixDQUFoQjtBQUVBLDRCQUFJLFFBQVEsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUNwQiw4QkFBRSxNQUFLLFVBQVAsSUFBcUIsUUFBUSxDQUFSLEVBQVcsTUFBSyxVQUFoQixDQUFyQjtBQUNBLG1DQUFPLENBQVA7QUFDSDtBQUNELCtCQUFPLElBQVA7QUFDSCxxQkFYTSxFQVdKLE1BWEksQ0FXRztBQUFBLCtCQUFLLEtBQUssSUFBVjtBQUFBLHFCQVhILENBQVA7QUFZSCxpQkFiTSxNQWFBLElBQUksT0FBTyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQ2pDLHdCQUFNLFVBQVUsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQjtBQUFBLCtCQUFLLFNBQVMsRUFBRSxNQUFLLFVBQVAsQ0FBZDtBQUFBLHFCQUFwQixDQUFoQjtBQUNBLHdCQUFJLFFBQVEsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUFBOztBQUNwQixpRkFBVSxLQUFLLFVBQWYsRUFBNEIsSUFBNUIsd0NBQ0ssS0FBSyxVQURWLEVBQ3VCLFFBQVEsQ0FBUixFQUFXLEtBQUssVUFBaEIsQ0FEdkI7QUFFSCxxQkFIRCxNQUdPO0FBQ0gsK0JBQU8sSUFBUDtBQUNIO0FBQ0osaUJBUk0sTUFRQTtBQUNILHdCQUFNLFdBQVUsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQjtBQUFBLCtCQUNoQyxLQUFLLE1BQUssVUFBVixNQUEwQixFQUFFLE1BQUssVUFBUCxDQURNO0FBQUEscUJBQXBCLENBQWhCO0FBRUEsd0JBQUksU0FBUSxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQUE7O0FBQ3BCLG1GQUFVLEtBQUssVUFBZixFQUE0QixJQUE1Qix5Q0FDSyxLQUFLLFVBRFYsRUFDdUIsU0FBUSxDQUFSLEVBQVcsS0FBSyxVQUFoQixDQUR2QjtBQUVILHFCQUhELE1BR087QUFDSCwrQkFBTyxJQUFQO0FBQ0g7QUFDSjtBQUNELHFCQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQXNCLElBQXRCO0FBQ0g7QUFDSixTQXhDSTtBQXlDTCxnQkF6Q0ssb0JBeUNJLEdBekNKLEVBeUNTO0FBQ1YsaUJBQUssS0FBTCxDQUFXLFFBQVgsR0FBc0IsR0FBdEI7QUFDQSxpQkFBSyxLQUFMLENBQVcsZUFBWCxFQUE0QixHQUE1QjtBQUNILFNBNUNJO0FBNkNMLHNCQTdDSywwQkE2Q1UsS0E3Q1YsRUE2Q2lCO0FBQ2xCLGdCQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNmLHVCQUFPLElBQVA7QUFDSDs7QUFFRCxnQkFBSSxpQkFBaUIsS0FBckIsRUFBNEI7QUFDeEIsdUJBQU8sTUFBTSxHQUFOLENBQVU7QUFBQSwyQkFBSyxFQUFFLEtBQVA7QUFBQSxpQkFBVixDQUFQO0FBQ0g7QUFDRCxtQkFBTyxNQUFNLEtBQWI7QUFDSCxTQXRESTtBQXVETCxzQkF2REssNEJBdURZO0FBQUE7O0FBQ2IsZ0JBQUksS0FBSyxVQUFMLEtBQW9CLE9BQXhCLEVBQWlDO0FBQzdCLHFCQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLEtBQUssT0FBMUI7QUFDSDs7QUFFRCxpQkFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCO0FBQUEsdUJBQ2pDLEVBQUUsT0FBTyxFQUFFLE9BQUssVUFBUCxDQUFULEVBQTZCLE9BQU8sRUFBRSxPQUFLLFVBQVAsQ0FBcEMsRUFEaUM7QUFBQSxhQUFqQixDQUFyQjtBQUVIO0FBOURJLEtBdkJJO0FBdUZiLFdBQU87QUFDSCxlQURHLG1CQUNLLENBREwsRUFDUTtBQUNQLGdCQUFJLENBQUosRUFBTztBQUNILHFCQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFNBQVMsb0JBQTVCLEVBQWtEO0FBQzlDLDBCQUFNLEtBQUssSUFEbUM7QUFFOUMsMEJBQU0sS0FBSyxJQUZtQztBQUc5QywwQkFBTSxLQUFLLGNBQUwsQ0FBb0IsS0FBSyxLQUFMLENBQVcsUUFBL0I7QUFId0MsaUJBQWxEO0FBS0g7QUFDSixTQVRFO0FBVUgsY0FWRyxrQkFVSSxDQVZKLEVBVU87QUFDTixnQkFBSSxDQUFKLEVBQU87QUFDSCxxQkFBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixJQUF0QjtBQUNIO0FBQ0osU0FkRTtBQWVILGVBZkcscUJBZU87QUFDTixpQkFBSyxjQUFMO0FBQ0g7QUFqQkUsS0F2Rk07QUEwR2IsZUExR2EseUJBMEdDO0FBQ1YsYUFBSyxjQUFMO0FBQ0g7QUE1R1ksQ0FBakI7Ozs7OztBQ2tCQTs7Ozs7QUF2QkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxJQUFJLFFBQVEsUUFBUixDQUFWO0FBQ0EsSUFBTSxXQUFXLFFBQVEsNkJBQVIsQ0FBakI7QUFDQSxJQUFNLFFBQVEsUUFBUSw0QkFBUixDQUFkO0FBQ0EsSUFBTSxhQUFhLFFBQVEseUJBQVIsQ0FBbkI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUSxDQUFDLFVBQUQsQ0FESztBQUViLFdBQU87QUFDSCxjQUFNLEVBQUUsVUFBVSxJQUFaLEVBQWtCLE1BQU0sTUFBeEIsRUFESDtBQUVILGNBQU0sRUFBRSxVQUFVLElBQVosRUFBa0IsTUFBTSxNQUF4QixFQUZIO0FBR0gsZUFBTyxFQUFFLE1BQU0sT0FBUixFQUFpQixTQUFTLElBQTFCLEVBSEo7QUFJSCxvQkFBWSxFQUFFLE1BQU0sT0FBUixFQUFpQixTQUFTLElBQTFCLEVBSlQ7QUFLSCxjQUFNLEVBQUUsTUFBTSxPQUFSLEVBQWlCLFNBQVMsS0FBMUI7QUFMSCxLQUZNOztBQVViLFFBVmEsa0JBVU47QUFDSCxlQUFPO0FBQ0gsbUJBQU87QUFDSCwwQkFBVSxFQURQO0FBRUgsNEJBQVksS0FBSyxVQUFMLEdBQWtCLENBQWxCLEdBQXNCLENBQUM7QUFGaEM7QUFESixTQUFQO0FBTUgsS0FqQlk7OztBQW1CYixhQUFTO0FBQ0wsb0JBREssd0JBQ1EsRUFEUixFQUNZLENBRFosRUFDZTtBQUNoQixjQUFFLGNBQUY7QUFDQSxpQkFBSyxLQUFMLENBQVcsVUFBWCxHQUF3QixFQUF4QjtBQUNILFNBSkk7QUFLTCxXQUxLLGVBS0QsQ0FMQyxFQUtFO0FBQ0gsY0FBRSxjQUFGO0FBQ0EsaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBekI7QUFDSCxTQVJJO0FBU0wsY0FUSyxrQkFTRSxFQVRGLEVBU00sQ0FUTixFQVNTO0FBQ1YsY0FBRSxjQUFGO0FBQ0EsaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsTUFBcEIsQ0FBMkIsRUFBM0IsRUFBK0IsQ0FBL0IsRUFBa0MsS0FBbEM7QUFDSCxTQVpJO0FBYUwsY0FiSyxvQkFhSTtBQUNMLGdCQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixLQUFLLElBQTdCLENBQWI7QUFDQSxnQkFBSSxLQUFLLE1BQVQsRUFBaUI7QUFDYixvQkFBTSxTQUFTLE1BQU0sb0JBQU4sQ0FBMkIsS0FBSyxPQUFoQyxFQUF5QyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQXpDLENBQWY7QUFDQSxvQkFBSSxrQkFBa0IsS0FBdEIsRUFBNkI7QUFDekIseUJBQUssS0FBTCxDQUFXLFFBQVgsR0FBc0IsT0FBTyxHQUFQLENBQVc7QUFBQSwrQkFBTSxJQUFOO0FBQUEscUJBQVgsQ0FBdEI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gseUJBQUssS0FBTCxDQUFXLFFBQVgsR0FBc0IsRUFBRSxHQUFGLENBQU0sTUFBTixFQUFjO0FBQUEsK0JBQU0sSUFBTjtBQUFBLHFCQUFkLENBQXRCO0FBQ0g7QUFDSixhQVBELE1BT087QUFDSCxxQkFBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixLQUFLLFVBQUwsR0FBa0IsQ0FBQyxJQUFELENBQWxCLEdBQTJCLEVBQWpEO0FBQ0g7QUFDSjtBQXpCSSxLQW5CSTs7QUErQ2IsY0FBVSxFQS9DRzs7QUFrRGIsV0FBTztBQUNILGVBREcsbUJBQ0ssQ0FETCxFQUNRO0FBQ1AsZ0JBQUksQ0FBSixFQUFPO0FBQ0gscUJBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsU0FBUyxvQkFBNUIsRUFBa0Q7QUFDOUMsMEJBQU0sS0FBSyxJQURtQztBQUU5QywwQkFBTSxLQUFLLElBRm1DO0FBRzlDLDBCQUFNLEtBQUssS0FBTCxDQUFXO0FBSDZCLGlCQUFsRDtBQUtIO0FBQ0osU0FURTtBQVVILGNBVkcsa0JBVUksQ0FWSixFQVVPO0FBQ04sZ0JBQUksQ0FBSixFQUFPO0FBQ0gscUJBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsU0FBbkI7QUFDSDtBQUNKO0FBZEU7QUFsRE0sQ0FBakI7Ozs7OztBQzREQTs7Ozs7QUFqRUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxXQUFXLFFBQVEsMEJBQVIsQ0FBakI7QUFDQSxJQUFNLFlBQVksUUFBUSx3QkFBUixDQUFsQjs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixXQUFPO0FBQ0gsY0FBTSxFQUFFLFNBQVMsY0FBWCxFQURIO0FBRUgsbUJBQVcsRUFBRSxNQUFNLE1BQVIsRUFBZ0IsVUFBVSxJQUExQixFQUZSO0FBR0gsa0JBQVUsRUFBRSxNQUFNLE1BQVIsRUFBZ0IsVUFBVSxJQUExQixFQUhQO0FBSUgsa0JBQVUsRUFBRSxNQUFNLE1BQVIsRUFBZ0IsVUFBVSxJQUExQixFQUpQO0FBS0gsa0JBQVUsRUFBRSxNQUFNLE1BQVIsRUFBZ0IsVUFBVSxJQUExQjtBQUxQLEtBRE07QUFRYixRQVJhLGtCQVFOO0FBQ0gsZUFBTztBQUNILG1CQUFPO0FBQ0gsNkJBQWE7QUFEVjtBQURKLFNBQVA7QUFLSCxLQWRZOztBQWViLGFBQVM7QUFDTCxjQURLLGtCQUNFLENBREYsRUFDSztBQUNOLGNBQUUsY0FBRjtBQUNBLGlCQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFNBQVMsbUJBQTVCLEVBQWlEO0FBQzdDLHNCQUFNLEtBQUssSUFEa0M7QUFFN0MseUJBQVM7QUFGb0MsYUFBakQ7QUFJQSxpQkFBSyxNQUFMLENBQVksTUFBWixDQUFtQixTQUFTLE9BQTVCLEVBQXFDO0FBQ2pDLHNCQUFNLEtBQUs7QUFEc0IsYUFBckM7QUFHSCxTQVZJO0FBV0wsY0FYSyxrQkFXRSxDQVhGLEVBV0s7QUFDTixjQUFFLGNBQUY7QUFDQSxpQkFBSyxNQUFMLENBQVksTUFBWixDQUFtQixTQUFTLGdCQUE1QixFQUE4QyxFQUFFLE1BQU0sS0FBSyxJQUFiO0FBQzFDLHlCQUFTLEVBRGlDO0FBRTFDLHdCQUFRLEtBRmtDLEVBQTlDO0FBR0EsaUJBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsU0FBUyxtQkFBNUIsRUFBaUQ7QUFDN0Msc0JBQU0sS0FBSyxJQURrQztBQUU3Qyx5QkFBUztBQUZvQyxhQUFqRDtBQUlBLGlCQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFNBQVMsV0FBNUIsRUFBeUM7QUFDckMsc0JBQU0sS0FBSztBQUQwQixhQUF6QztBQUdIO0FBdkJJLEtBZkk7QUF3Q2IsZUF4Q2EseUJBd0NDO0FBQ1YsYUFBSyxNQUFMLENBQVksTUFBWixDQUFtQixTQUFTLFdBQTVCLEVBQXlDLEVBQUUsTUFBTSxLQUFLLElBQWIsRUFBbUIsU0FBUyxFQUE1QixFQUF6QztBQUNILEtBMUNZO0FBNENiLGlCQTVDYSwyQkE0Q0c7QUFDWixhQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFNBQVMsV0FBNUIsRUFBeUMsRUFBRSxNQUFNLEtBQUssSUFBYixFQUF6QztBQUNILEtBOUNZOzs7QUFnRGIsY0FBVTtBQUNOLG1CQURNLHlCQUNRO0FBQ1YsZ0JBQUksS0FBSyxJQUFMLElBQWEsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFuQyxFQUEwQztBQUN0QyxvQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxJQUE3QixDQUFiO0FBQ0EsdUJBQU8sS0FBSyxNQUFaO0FBQ0g7QUFDRCxtQkFBTyxLQUFQO0FBQ0gsU0FQSztBQVFOLGFBUk0sbUJBUUU7QUFDSixnQkFBSSxLQUFLLElBQUwsSUFBYSxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQW5DLEVBQTBDO0FBQ3RDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixLQUFLLElBQTdCLENBQWI7QUFDQSx1QkFBTyxLQUFLLEtBQVo7QUFDSDtBQUNELG1CQUFPLEVBQVA7QUFDSCxTQWRLO0FBZU4sZUFmTSxxQkFlSTtBQUNOLGdCQUFJLEtBQUssSUFBTCxJQUFhLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbkMsRUFBMEM7QUFDdEMsb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLENBQXdCLEtBQUssSUFBN0IsQ0FBYjtBQUNBLHVCQUFPLEtBQUssT0FBWjtBQUNIO0FBQ0QsbUJBQU8sS0FBUDtBQUNILFNBckJLO0FBc0JOLGNBdEJNLG9CQXNCRztBQUNMLGdCQUFJLEtBQUssSUFBTCxJQUFhLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbkMsRUFBMEM7QUFDdEMsb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLENBQXdCLEtBQUssSUFBN0IsQ0FBYjtBQUNBLHVCQUFPLEtBQUssTUFBWjtBQUNIO0FBQ0QsbUJBQU8sQ0FBUDtBQUNILFNBNUJLO0FBNkJOLGVBN0JNLHFCQTZCSTtBQUNOLGdCQUFJLEtBQUssSUFBTCxJQUFhLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbkMsRUFBMEM7QUFDdEMsb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLENBQXdCLEtBQUssSUFBN0IsQ0FBYjtBQUNBLHVCQUFPLEtBQUssT0FBWjtBQUNIO0FBQ0QsbUJBQU8sRUFBUDtBQUNILFNBbkNLO0FBb0NOLGVBcENNLHFCQW9DSTtBQUNOLGdCQUFJLEtBQUssSUFBTCxJQUFhLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbkMsRUFBMEM7QUFDdEMsb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLENBQXdCLEtBQUssSUFBN0IsQ0FBYjtBQUNBLHVCQUFPLEtBQUssT0FBWjtBQUNIO0FBQ0QsbUJBQU8sRUFBUDtBQUNIO0FBMUNLLEtBaERHOztBQTZGYixXQUFPO0FBQ0gsbUJBREcsdUJBQ1MsQ0FEVCxFQUNZO0FBQ1gsaUJBQUssS0FBTCxDQUFXLFdBQVgsR0FBeUIsQ0FBekI7QUFDSCxTQUhFO0FBSUgsY0FKRyxrQkFJSSxDQUpKLEVBSU87QUFDTixnQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBd0IsS0FBSyxJQUE3QixDQUFiO0FBQ0EsZ0JBQUksTUFBTSxLQUFLLElBQWYsRUFBcUI7QUFDakIsb0JBQU0sVUFBVTtBQUNaLDBCQUFNLEtBQUssSUFEQztBQUVaLDJCQUFPLEtBQUssUUFGQTtBQUdaLDJCQUFPLEtBQUssUUFIQTtBQUlaLDBCQUFNLEtBQUs7QUFKQyxpQkFBaEI7QUFNQSxvQkFBSSxLQUFLLEtBQUwsQ0FBVyxXQUFmLEVBQTRCO0FBQ3hCLDRCQUFRLElBQVIsR0FBZSxLQUFLLFFBQXBCO0FBQ0EseUJBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsUUFBckIsRUFBK0IsT0FBL0I7QUFDSCxpQkFIRCxNQUdPO0FBQ0gsNEJBQVEsSUFBUixHQUFlLEtBQUssU0FBcEI7QUFDQSx5QkFBSyxNQUFMLENBQVksUUFBWixDQUFxQixRQUFyQixFQUErQixPQUEvQjtBQUNIO0FBQ0o7QUFDSixTQXJCRTtBQXNCSCxlQXRCRyxtQkFzQkssQ0F0QkwsRUFzQlEsQ0FDVjtBQXZCRTtBQTdGTSxDQUFqQjs7Ozs7O0FDdURBOzs7OztBQTFEQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFNLFdBQVcsUUFBUSwwQkFBUixDQUFqQjs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixjQUFVO0FBQ04sbUJBRE0seUJBQ1E7QUFDVixnQkFBSSxLQUFLLElBQUwsSUFBYSxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQW5DLEVBQTBDO0FBQ3RDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixLQUFLLElBQTdCLENBQWI7QUFDQSxvQkFBSSxLQUFLLElBQUwsSUFBYSxLQUFLLFdBQXRCLEVBQW1DO0FBQy9CLDJCQUFPLEtBQUssV0FBTCxDQUFpQixLQUFLLElBQXRCLEVBQTRCLEdBQTVCLENBQWdDO0FBQUEsK0JBQUssRUFBRSxPQUFQO0FBQUEscUJBQWhDLENBQVA7QUFDSDtBQUNELHVCQUFPLEVBQVA7QUFDSDtBQUNELG1CQUFPLEVBQVA7QUFDSCxTQVZLO0FBV04sbUJBWE0seUJBV1E7QUFDVixnQkFBSSxLQUFLLElBQUwsSUFBYSxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQW5DLEVBQTBDO0FBQ3RDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixLQUFLLElBQTdCLENBQWI7QUFDQSx1QkFBTyxLQUFLLE1BQVo7QUFDSDtBQUNELG1CQUFPLEtBQVA7QUFDSCxTQWpCSztBQWtCTixlQWxCTSxxQkFrQkk7QUFDTixnQkFBSSxLQUFLLElBQUwsSUFBYSxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQW5DLEVBQTBDO0FBQ3RDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixLQUFLLElBQTdCLENBQWI7QUFDQSx1QkFBTyxLQUFLLE9BQVo7QUFDSDtBQUNELG1CQUFPLEtBQVA7QUFDSCxTQXhCSztBQXlCTixjQXpCTSxvQkF5Qkc7QUFDTCxnQkFBSSxLQUFLLElBQUwsSUFBYSxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQW5DLEVBQTBDO0FBQ3RDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixLQUFLLElBQTdCLENBQWI7QUFDQSx1QkFBTyxLQUFLLE1BQVo7QUFDSDtBQUNELG1CQUFPLEtBQVA7QUFDSDtBQS9CSyxLQURHO0FBa0NiLFdBbENhLHFCQWtDSDtBQUNOLGFBQUssTUFBTDtBQUNBLGFBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsU0FBUyxnQkFBNUIsRUFBOEMsRUFBRSxNQUFNLEtBQUssSUFBYixFQUE5QztBQUNILEtBckNZO0FBc0NiLGlCQXRDYSwyQkFzQ0c7QUFDWixhQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFNBQVMscUJBQTVCLEVBQW1ELEVBQUUsTUFBTSxLQUFLLElBQWIsRUFBbUIsTUFBTSxLQUFLLElBQTlCLEVBQW5EO0FBQ0gsS0F4Q1k7O0FBeUNiLFdBQU87QUFDSCxtQkFERyx5QkFDVztBQUNWLGlCQUFLLE1BQUw7QUFDSDtBQUhFO0FBekNNLENBQWpCOzs7OztBQ0ZBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFdBQU8sQ0FBQyxlQUFELEVBQWtCLGNBQWxCLEVBQWtDLE1BQWxDLENBRE07QUFFYixRQUZhLGtCQUVOO0FBQ0gsZUFBTztBQUNILG1CQUFPO0FBQ0gsNEJBQVksQ0FEVDtBQUVILDhCQUFjLENBRlg7QUFHSCwyQkFBVztBQUhSO0FBREosU0FBUDtBQU9ILEtBVlk7O0FBV2IsYUFBUztBQUNMLFlBREssZ0JBQ0EsSUFEQSxFQUNNLENBRE4sRUFDUztBQUNWLGNBQUUsY0FBRjtBQUNBLGdCQUFJLE9BQU8sQ0FBWCxFQUFjO0FBQ1Y7QUFDSDtBQUNELGdCQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsU0FBdEIsRUFBaUM7QUFDN0I7QUFDSDtBQUNELGlCQUFLLEtBQUwsQ0FBVyxZQUFYLEdBQTBCLElBQTFCO0FBQ0g7QUFWSSxLQVhJO0FBdUJiLFdBdkJhLHFCQXVCSDtBQUNOLGFBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsS0FBSyxJQUFMLENBQVUsS0FBSyxhQUFMLEdBQXFCLEtBQUssWUFBcEMsQ0FBdkI7QUFDQSxhQUFLLEtBQUwsQ0FBVyxZQUFYLEdBQTBCLFNBQVMsQ0FBQyxLQUFLLElBQUwsR0FBWSxLQUFLLFlBQWxCLElBQWtDLEtBQUssWUFBaEQsRUFBOEQsRUFBOUQsQ0FBMUI7QUFDSDtBQTFCWSxDQUFqQjs7Ozs7O0FDaUJBOzs7OztBQWpCQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNDQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixXQUFPO0FBQ0gsY0FBTSxFQUFFLFVBQVUsSUFBWixFQUFrQixNQUFNLEtBQXhCO0FBREgsS0FETTtBQUliLFFBSmEsa0JBSU47QUFDSCxlQUFPO0FBQ0gsbUJBQU87QUFDSCx5QkFBUztBQUROO0FBREosU0FBUDtBQUtILEtBVlk7O0FBV2IsYUFBUztBQUNMLFVBREssY0FDRixHQURFLEVBQ0csQ0FESCxFQUNNO0FBQ1AsY0FBRSxjQUFGO0FBQ0EsaUJBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsR0FBckI7QUFDSDtBQUpJO0FBWEksQ0FBakI7Ozs7OztBQ3FCQTs7Ozs7QUF0QkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxJQUFJLFFBQVEsUUFBUixDQUFWO0FBQ0EsSUFBTSxZQUFZLFFBQVEsZUFBUixDQUFsQjtBQUNBLElBQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUSxDQUFDLFNBQUQsQ0FESztBQUViLGNBQVU7QUFDTixhQURNLG1CQUNFO0FBQUE7O0FBQ0osZ0JBQUksS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFqQixJQUF5QixLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQS9DLEVBQXNEO0FBQ2xELG9CQUFNLFNBQVMsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQixDQUF3QixLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQXpDLENBQWY7QUFDQSxvQkFBTSxVQUFVLE9BQU8sT0FBdkI7QUFDQSxvQkFBTSxRQUFRLFFBQVEsTUFBUixDQUFlLFVBQUMsR0FBRCxFQUFNLElBQU4sRUFBZTtBQUN4Qyx5QkFBSyxLQUFMLEdBQWEsTUFBSyxJQUFMLENBQVUsS0FBSyxLQUFmLENBQWI7QUFDQSx5QkFBSyxXQUFMLEdBQW1CLE1BQUssSUFBTCxDQUFVLEtBQUssV0FBZixDQUFuQjtBQUNBLHlCQUFLLE1BQUwsR0FBYyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQUMsS0FBRCxFQUFXO0FBQ3JDLDhCQUFNLEtBQU4sR0FBYyxNQUFLLElBQUwsQ0FBVSxNQUFNLEtBQWhCLENBQWQ7QUFDQSwrQkFBTyxLQUFQO0FBQ0gscUJBSGEsQ0FBZDtBQUlBLHdCQUFJLEtBQUssSUFBVCxJQUFpQixFQUFFLFNBQUYsQ0FBWSxJQUFaLENBQWpCO0FBQ0EsMkJBQU8sR0FBUDtBQUNILGlCQVRhLEVBU1gsRUFUVyxDQUFkO0FBVUEsdUJBQU8sRUFBRSxNQUFGLENBQVMsS0FBVCxFQUFnQixVQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksSUFBWixFQUFxQjtBQUN4Qyx3QkFBSSxLQUFLLFlBQVQsRUFBdUI7QUFDbkIsNkJBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBQyxLQUFELEVBQVc7QUFDckMsZ0NBQUksTUFBTSxJQUFOLEtBQWUsU0FBbkIsRUFBOEI7QUFDMUIsc0NBQU0sT0FBTixHQUFnQixNQUFNLE1BQU0sT0FBWixDQUFoQjtBQUNIO0FBQ0QsbUNBQU8sS0FBUDtBQUNILHlCQUxhLENBQWQ7QUFNSDtBQUNELHdCQUFJLElBQUosSUFBWSxJQUFaO0FBQ0EsMkJBQU8sR0FBUDtBQUNILGlCQVhNLEVBV0osRUFYSSxDQUFQO0FBWUg7QUFDRCxtQkFBTyxFQUFQO0FBQ0g7QUE3QkssS0FGRztBQWlDYixXQWpDYSxxQkFpQ0g7QUFDTixhQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLFFBQXJCLEVBQStCO0FBQzNCLGtCQUFNLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFESTtBQUUzQixrQkFBTSxVQUFVLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUIsTUFBekIsRUFBaUMsSUFBakMsQ0FGcUI7QUFHM0Isa0JBQU07QUFDRixzQkFBTSxJQURKO0FBRUYsdUJBQU87QUFDSCwyQkFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCO0FBRHJCO0FBRkw7QUFIcUIsU0FBL0I7QUFVSDtBQTVDWSxDQUFqQjs7Ozs7Ozs7Ozs7QUNKQSxJQUFNLGNBQWMsUUFBUSxrQkFBUixDQUFwQjs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixhQUFTO0FBQ0wsWUFESyxnQkFDQSxHQURBLEVBQ0ssR0FETCxFQUNVLENBRFYsRUFDYTtBQUNkLGdCQUFJLEVBQUUsT0FBTyxLQUFLLEtBQWQsQ0FBSixFQUEwQjtBQUN0Qix1QkFBTyxHQUFQO0FBQ0g7O0FBRUQsZ0JBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWI7QUFDQSxnQkFBSSxPQUFPLEdBQVg7QUFDQTtBQUNBLGdCQUFJLEtBQUssSUFBVCxFQUFlO0FBQ1gsb0JBQUksT0FBTyxJQUFYLEVBQWlCO0FBQ2IsMkJBQU8sS0FBSyxHQUFMLEtBQWEsR0FBcEI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsMkJBQU8sS0FBSyxLQUFMLEtBQWUsR0FBdEI7QUFDSDtBQUNKLGFBTkQsTUFNTyxJQUFJLE1BQU0sQ0FBVixFQUFhO0FBQ2hCLHVCQUFPLEtBQUssSUFBTCxJQUFhLEtBQUssS0FBTCxDQUFiLElBQTRCLEdBQW5DO0FBQ0gsYUFGTSxNQUVBLElBQUksTUFBTSxDQUFWLEVBQWE7QUFDaEIsdUJBQU8sS0FBSyxHQUFMLElBQVksS0FBSyxLQUFMLENBQVosSUFBMkIsR0FBbEM7QUFDSCxhQUZNLE1BRUEsSUFBSSxNQUFNLENBQVYsRUFBYTtBQUNoQix1QkFBTyxLQUFLLEdBQUwsSUFBWSxLQUFLLEtBQUwsQ0FBWixJQUEyQixHQUFsQztBQUNILGFBRk0sTUFFQTtBQUNILHVCQUFPLEtBQUssS0FBTCxJQUFjLEtBQUssS0FBTCxDQUFkLElBQTZCLEdBQXBDO0FBQ0g7O0FBRUQsZ0JBQUksT0FBTyxJQUFQLElBQWUsb0JBQVksR0FBWixFQUFpQixNQUFqQixLQUE0QixDQUEvQyxFQUFrRDtBQUM5Qyx1QkFBTyxJQUFQO0FBQ0g7O0FBRUQsbUJBQU8sWUFBWSxlQUFaLENBQTRCLElBQTVCLEVBQWtDLEdBQWxDLENBQVA7QUFDSDtBQTlCSSxLQURJO0FBaUNiLGNBQVU7QUFDTixhQURNLG1CQUNFO0FBQ0osbUJBQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixZQUFsQixDQUErQixLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGFBQWpELENBQVA7QUFDSDtBQUhLO0FBakNHLENBQWpCOzs7Ozs7Ozs7Ozs7Ozt3RkNDQSxpQkFBZ0MsR0FBaEM7QUFBQSxZQUF1QyxJQUF2QyxTQUF1QyxJQUF2QztBQUFBLFlBQTZDLElBQTdDLFNBQTZDLElBQTdDO0FBQUEsWUFBbUQsSUFBbkQsU0FBbUQsSUFBbkQ7QUFBQSxZQUF5RCxLQUF6RCxTQUF5RCxLQUF6RDtBQUFBLFlBQWdFLEtBQWhFLFNBQWdFLEtBQWhFO0FBQUEsWUFBeUUsRUFBekUsdUVBQThFLEtBQTlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVLDhCQURWLEdBQ21CLEtBQUssS0FBTCxHQUFhLE1BRGhDO0FBRVUsK0JBRlYsR0FFb0I7QUFDWixzQ0FEWTtBQUVaLDBDQUZZO0FBR1osc0NBSFk7QUFJWixvQ0FBUSxJQUFJO0FBSkEseUJBRnBCOzs7QUFTSSw0QkFBSSxNQUFKLENBQVcsU0FBUyxPQUFwQixFQUE2QixFQUFFLFVBQUYsRUFBN0I7QUFUSjtBQUFBLCtCQVUyQixJQUFJLEtBQUosQ0FBVSxPQUFWLENBVjNCOztBQUFBO0FBVVUsZ0NBVlY7O0FBV0ksNEJBQUksTUFBSixDQUFXLFNBQVMsS0FBcEIsRUFBMkIsRUFBRSxjQUFGLEVBQVUsa0JBQVYsRUFBb0IsVUFBcEIsRUFBM0I7QUFDQSw0QkFBSSxRQUFKLENBQWEsYUFBYixFQUE0QjtBQUN4QixrQ0FBTSxLQURrQjtBQUV4QixrQ0FBTTtBQUZrQix5QkFBNUI7O0FBWko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSzs7b0JBQWUsZ0I7Ozs7Ozs7QUFIZixJQUFNLE1BQU0sUUFBUSxRQUFSLENBQVo7QUFDQSxJQUFNLFdBQVcsUUFBUSxpQkFBUixDQUFqQjs7QUFvQkEsT0FBTyxPQUFQLEdBQWlCO0FBQ2I7QUFBQSw2RkFBUSxrQkFBTyxHQUFQLEVBQVksT0FBWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FDRSxpQkFBaUIsR0FBakIsRUFBc0IsT0FBdEIsRUFBK0IsS0FBL0IsQ0FERjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFSOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRGE7O0FBS2I7QUFBQSw2RkFBUSxrQkFBTyxHQUFQLEVBQVksT0FBWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FDRSxpQkFBaUIsR0FBakIsRUFBc0IsT0FBdEIsRUFBK0IsSUFBL0IsQ0FERjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFSOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BTGE7O0FBU2I7QUFBQSw2RkFBUSxrQkFBTyxHQUFQO0FBQUEsZ0JBQWMsSUFBZCxTQUFjLElBQWQ7QUFBQSxnQkFBb0IsSUFBcEIsU0FBb0IsSUFBcEI7QUFBQSxnQkFBMEIsS0FBMUIsU0FBMEIsS0FBMUI7QUFBQSxnQkFBaUMsS0FBakMsU0FBaUMsS0FBakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0UsbUNBREYsR0FDWTtBQUNaLDBDQURZO0FBRVosd0NBQVEsS0FGSTtBQUdaLHdDQUFRLElBQUk7QUFIQSw2QkFEWjs7O0FBT0osZ0NBQUksTUFBSixDQUFXLFNBQVMsT0FBcEIsRUFBNkIsRUFBRSxVQUFGLEVBQTdCO0FBUEk7QUFBQSxtQ0FRbUIsSUFBSSxLQUFKLENBQVUsT0FBVixDQVJuQjs7QUFBQTtBQVFFLG9DQVJGOztBQVNKLGdDQUFJLE1BQUosQ0FBVyxTQUFTLEtBQXBCLEVBQTJCLEVBQUUsUUFBUSxLQUFWLEVBQWlCLGtCQUFqQixFQUEyQixVQUEzQixFQUEzQjtBQUNBLGdDQUFJLFFBQUosQ0FBYSxhQUFiLEVBQTRCO0FBQ3hCLHNDQUFNLEtBRGtCO0FBRXhCLHNDQUFNO0FBRmtCLDZCQUE1Qjs7QUFWSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFSOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BVGE7O0FBeUJiO0FBQUEsNkZBQWEsa0JBQU8sR0FBUDtBQUFBLGdCQUFjLElBQWQsU0FBYyxJQUFkO0FBQUEsZ0JBQW9CLElBQXBCLFNBQW9CLElBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNILG1DQURHLEdBQ087QUFDWiwwQ0FEWTtBQUVaLHdDQUFRLEtBRkk7QUFHWix3Q0FBUSxJQUFJO0FBSEEsNkJBRFA7OztBQU9ULGdDQUFJLE1BQUosQ0FBVyxTQUFTLE9BQXBCLEVBQTZCLEVBQUUsVUFBRixFQUE3QjtBQVBTO0FBQUEsbUNBUWMsSUFBSSxLQUFKLENBQVUsT0FBVixDQVJkOztBQUFBO0FBUUgsb0NBUkc7O0FBU1QsZ0NBQUksTUFBSixDQUFXLFNBQVMsS0FBcEIsRUFBMkIsRUFBRSxRQUFRLEtBQVYsRUFBaUIsa0JBQWpCLEVBQTJCLFVBQTNCLEVBQTNCOztBQVRTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQWI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsT0F6QmE7O0FBcUNiO0FBQUEsNkZBQVEsa0JBQU8sR0FBUDtBQUFBLGdCQUFjLElBQWQsVUFBYyxJQUFkO0FBQUEsZ0JBQW9CLElBQXBCLFVBQW9CLElBQXBCO0FBQUEsZ0JBQTBCLElBQTFCLFVBQTBCLElBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFLG1DQURGLEdBQ1k7QUFDWiwwQ0FEWTtBQUVaLHdDQUFRLE1BRkk7QUFHWix3Q0FBUSxJQUFJLE1BSEE7QUFJWjtBQUpZLDZCQURaOzs7QUFRSixnQ0FBSSxNQUFKLENBQVcsU0FBUyxPQUFwQixFQUE2QixFQUFFLFVBQUYsRUFBN0I7QUFSSTtBQUFBLG1DQVNtQixJQUFJLEtBQUosQ0FBVSxPQUFWLENBVG5COztBQUFBO0FBU0Usb0NBVEY7O0FBVUosZ0NBQUksTUFBSixDQUFXLFNBQVMsS0FBcEIsRUFBMkIsRUFBRSxRQUFRLEtBQVYsRUFBaUIsa0JBQWpCLEVBQTJCLFVBQTNCLEVBQTNCOztBQVZJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FyQ2E7O0FBa0RiO0FBQUEsOEZBQWEsa0JBQU8sR0FBUDtBQUFBLGdCQUFjLElBQWQsVUFBYyxJQUFkO0FBQUEsZ0JBQW9CLElBQXBCLFVBQW9CLElBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNILG1DQURHLEdBQ087QUFDWiwwQ0FEWTtBQUVaLHdDQUFRLE1BRkk7QUFHWix3Q0FBUSxJQUFJLE1BSEE7QUFJWjtBQUpZLDZCQURQO0FBQUE7QUFBQSxtQ0FRYyxJQUFJLEtBQUosQ0FBVSxPQUFWLENBUmQ7O0FBQUE7QUFRSCxvQ0FSRzs7QUFTVDtBQUNBLGdDQUFJLFNBQVMsT0FBVCxJQUFvQixJQUF4QixFQUE4QjtBQUMxQix5Q0FBUyxPQUFULEdBQW1CLEVBQW5CO0FBQ0g7O0FBRUQsb0NBQVEsR0FBUixDQUFZLFNBQVMsT0FBckI7O0FBRU0sbUNBaEJHLEdBZ0JPLFlBQVksU0FBUyxPQUFyQixJQUNULFVBQVUsU0FBUyxPQUFULENBQWlCLE1BRGxCLEdBQzJCLFNBQVMsT0FBVCxDQUFpQixNQUFqQixDQUF3QixJQURuRCxHQUMwRCxFQWpCakU7O0FBa0JULGdDQUFJLFFBQVEsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUNwQixvQ0FBSSxLQUFKLENBQVUsYUFBVixHQUEwQixRQUFRLENBQVIsRUFBVyxNQUFyQztBQUNIOztBQXBCUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFiOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BbERhOztBQXlFYjtBQUFBLDhGQUFlLGtCQUFPLEdBQVA7QUFBQSxnQkFBYyxJQUFkLFVBQWMsSUFBZDtBQUFBLGdCQUFvQixJQUFwQixVQUFvQixJQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTCxtQ0FESyxHQUNLO0FBQ1osMENBRFk7QUFFWix3Q0FBUSxNQUZJO0FBR1osd0NBQVEsSUFBSSxNQUhBO0FBSVo7QUFKWSw2QkFETDtBQUFBO0FBQUEsbUNBUVksSUFBSSxLQUFKLENBQVUsT0FBVixDQVJaOztBQUFBO0FBUUwsb0NBUks7O0FBU1g7QUFDQSxnQ0FBSSxTQUFTLE9BQVQsSUFBb0IsSUFBeEIsRUFBOEI7QUFDMUIseUNBQVMsT0FBVCxHQUFtQixFQUFuQjtBQUNIOztBQUVLLG1DQWRLLEdBY0ssWUFBWSxTQUFTLE9BQXJCLElBQ1QsVUFBVSxTQUFTLE9BQVQsQ0FBaUIsTUFEbEIsR0FDMkIsU0FBUyxPQUFULENBQWlCLE1BQWpCLENBQXdCLElBRG5ELEdBQzBELEVBZi9EOztBQWdCWCxnQ0FBSSxLQUFKLENBQVUsWUFBVixHQUF5QixRQUFRLE1BQVIsQ0FBZSxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDbEQsb0NBQU0sSUFBSSxJQUFJLE1BQWQ7QUFDQSxvQ0FBTSxPQUFPLElBQUksRUFBRSxJQUFOLEtBQWUsRUFBNUI7QUFDQSxxQ0FBSyxFQUFFLEdBQVAsSUFBYyxFQUFFLE1BQUYsQ0FBUyxNQUFULENBQWdCLFVBQUMsTUFBRCxFQUFTLENBQVQsRUFBZTtBQUN6QywyQ0FBTyxFQUFFLFFBQVQsSUFBcUIsRUFBRSxLQUF2QjtBQUNBLDJDQUFPLE1BQVA7QUFDSCxpQ0FIYSxFQUdYLEVBSFcsQ0FBZDtBQUlBLG9DQUFJLEVBQUUsSUFBTixJQUFjLElBQWQ7QUFDQSx1Q0FBTyxHQUFQO0FBQ0gsNkJBVHdCLEVBU3RCLEVBVHNCLENBQXpCOztBQWhCVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBekVhLENBQWpCOzs7OztBQ3JCQSxPQUFPLE9BQVAsR0FBaUIsRUFBakI7Ozs7O0FDQUEsSUFBTSxNQUFNLFFBQVEsS0FBUixDQUFaO0FBQ0EsSUFBTSxPQUFPLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTSxZQUFZLFFBQVEsYUFBUixDQUFsQjtBQUNBLElBQU0sVUFBVSxRQUFRLFdBQVIsQ0FBaEI7QUFDQSxJQUFNLFFBQVEsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNLFVBQVUsUUFBUSxXQUFSLENBQWhCOztBQUVBLElBQUksR0FBSixDQUFRLElBQVI7O0FBRUEsSUFBTSxRQUFRLElBQUksS0FBSyxLQUFULENBQWU7QUFDekIsZ0JBRHlCO0FBRXpCLG9CQUZ5QjtBQUd6QixvQkFIeUI7QUFJekI7QUFKeUIsQ0FBZixDQUFkOztBQU9BLE9BQU8sT0FBUCxHQUFpQixLQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkEsSUFBTSxJQUFJLFFBQVEsUUFBUixDQUFWO0FBQ0EsSUFBTSxXQUFXLFFBQVEsaUJBQVIsQ0FBakI7QUFDQSxJQUFNLFFBQVEsUUFBUSxnQkFBUixDQUFkOztBQUVBLFNBQVMsV0FBVCxHQUF1QjtBQUNuQixXQUFPO0FBQ0gsY0FBTSxDQURIO0FBRUgsZ0JBQVEsQ0FGTDtBQUdILHFCQUFhLEVBSFY7QUFJSCxlQUFPLEVBSko7QUFLSCxpQkFBUyxLQUxOO0FBTUgsZ0JBQVEsS0FOTDtBQU9ILGlCQUFTLEtBUE47QUFRSCxnQkFBUSxLQVJMO0FBU0gsaUJBQVMsRUFUTjtBQVVILGlCQUFTO0FBVk4sS0FBUDtBQVlIOztBQUVELE9BQU8sT0FBUCx5RUFDSyxTQUFTLE9BRGQsRUFDd0IsVUFBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUNwQyxRQUFNLFlBQVksUUFBUSxJQUExQjtBQUNBLFFBQUksYUFBYSxNQUFNLEtBQXZCLEVBQThCO0FBQzFCLGNBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsT0FBdkIsR0FBaUMsSUFBakM7QUFDSDtBQUNKLENBTkwsa0RBUUssU0FBUyxLQVJkLEVBUXNCLFVBQUMsS0FBRCxFQUFRLE9BQVIsRUFBb0I7QUFDbEMsUUFBTSxVQUFVLFFBQVEsUUFBUixDQUFpQixJQUFqQixLQUEwQixTQUFTLE9BQW5EO0FBQ0EsUUFBTSxZQUFZLFFBQVEsSUFBMUI7O0FBRUEsUUFBSSxRQUFRLFFBQVIsQ0FBaUIsT0FBakIsSUFBNEIsSUFBaEMsRUFBc0M7QUFDbEMsZ0JBQVEsUUFBUixDQUFpQixPQUFqQixHQUEyQixFQUEzQjtBQUNIOztBQUVELFFBQUksRUFBRSxhQUFhLE1BQU0sS0FBckIsQ0FBSixFQUFpQztBQUM3QixjQUFNLEtBQU4sR0FBYyxzQkFBYyxFQUFkLEVBQWtCLE1BQU0sS0FBeEIsb0NBQWtDLFNBQWxDLEVBQThDLGFBQTlDLEVBQWQ7QUFDSDs7QUFFRCxVQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLE9BQXZCLEdBQWlDLEtBQWpDO0FBQ0EsVUFBTSxLQUFOLENBQVksU0FBWixFQUF1QixNQUF2QixHQUFnQyxDQUFoQztBQUNBLFVBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsTUFBdkIsR0FBZ0MsS0FBaEM7QUFDQSxVQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLE9BQXZCLEdBQWlDLEtBQWpDO0FBQ0EsVUFBTSxLQUFOLENBQVksU0FBWixFQUF1QixNQUF2QixHQUFnQyxLQUFoQztBQUNBLFVBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsV0FBdkIsR0FBcUMsRUFBckM7O0FBRUEsUUFBSSxPQUFKLEVBQWE7QUFDVCxZQUFJLFFBQVEsTUFBUixLQUFtQixLQUF2QixFQUE4QjtBQUMxQixnQkFBTSxVQUFVLFFBQVEsUUFBUixDQUFpQixPQUFqQztBQUNBLGdCQUFJLFlBQVksT0FBWixJQUF1QixVQUFVLFFBQVEsTUFBN0MsRUFBcUQ7QUFDakQsc0JBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsT0FBdkIsR0FBaUMsUUFBUSxNQUFSLENBQWUsSUFBZixDQUFvQixHQUFwQixDQUF3QjtBQUFBLDJCQUFPLEVBQUUsS0FBRixDQUFRLEVBQUUsS0FBSyxJQUFJLEVBQVgsRUFBUixFQUF5QixJQUFJLE1BQTdCLENBQVA7QUFBQSxpQkFBeEIsQ0FBakM7QUFDSCxhQUZELE1BRU87QUFDSCxzQkFBTSxLQUFOLENBQVksU0FBWixFQUF1QixPQUF2QixHQUFpQyxPQUFqQztBQUNIO0FBQ0osU0FQRCxNQU9PLElBQUksWUFBWSxRQUFRLFFBQVIsQ0FBaUIsT0FBN0IsSUFDUSxRQUFRLFFBQVIsQ0FBaUIsT0FBakIsQ0FBeUIsTUFBekIsS0FBb0MsWUFEaEQsRUFDOEQ7QUFDakUsa0JBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsV0FBdkIsR0FBcUMsc0JBQWMsRUFBZCxFQUFrQixRQUFRLFFBQVIsQ0FBaUIsT0FBakIsQ0FBeUIsTUFBM0MsQ0FBckM7QUFDSCxTQUhNLE1BR0E7QUFDSCxrQkFBTSxLQUFOLENBQVksU0FBWixFQUF1QixPQUF2QixHQUFpQyxRQUFRLFFBQVIsQ0FBaUIsT0FBakIsQ0FBeUIsT0FBMUQ7QUFDSDtBQUNELGNBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsS0FBdkIsR0FBK0IsRUFBL0I7QUFDSCxLQWZELE1BZU8sSUFBSSxhQUFhLE1BQU0sS0FBdkIsRUFBOEI7QUFDakMsY0FBTSxLQUFOLENBQVksU0FBWixFQUF1QixLQUF2QixHQUErQixzQkFBYyxFQUFkLEVBQWtCO0FBQzdDLG1CQUFPLElBRHNDLEVBQ2hDLFNBQVMsUUFBUSxRQUFSLENBQWlCO0FBRE0sU0FBbEIsQ0FBL0I7QUFHQSxjQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLFdBQXZCLEdBQXFDLEVBQXJDO0FBQ0g7QUFDSixDQWhETCxrREFrREssU0FBUyxLQWxEZCxFQWtEc0IsVUFBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUNsQyxVQUFNLEtBQU4sR0FBYyxJQUFkO0FBQ0EsVUFBTSxVQUFOLEdBQW1CLFFBQVEsVUFBM0I7QUFDSCxDQXJETCxrREF1REssU0FBUyxXQXZEZCxFQXVENEIsVUFBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUN4QyxRQUFNLFlBQVksUUFBUSxJQUExQjtBQUNBLFFBQU0sVUFBVSxRQUFRLE9BQVIsSUFBbUIsRUFBbkM7QUFDQSxVQUFNLEtBQU4sR0FBYyxzQkFBYyxFQUFkLEVBQWtCLE1BQU0sS0FBeEIsb0NBQ1QsU0FEUyxFQUNHLGFBREgsRUFBZDtBQUdBLFVBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsT0FBdkIsR0FBaUMsT0FBakM7QUFDSCxDQTlETCxrREFnRUssU0FBUyxXQWhFZCxFQWdFNEIsVUFBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUN4QyxRQUFNLFlBQVksUUFBUSxJQUExQjtBQUNBLFFBQUksYUFBYSxNQUFNLEtBQXZCLEVBQThCO0FBQzFCLGVBQU8sTUFBTSxLQUFOLENBQVksU0FBWixDQUFQO0FBQ0g7QUFDSixDQXJFTCxrREF1RUssU0FBUyxXQXZFZCxFQXVFNEIsVUFBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUN4QyxRQUFNLFlBQVksUUFBUSxJQUExQjtBQUNBLFFBQUksYUFBYSxNQUFNLEtBQXZCLEVBQThCO0FBQzFCLGNBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsTUFBdkIsR0FBZ0MsSUFBaEM7QUFDQSxjQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLEdBQWdDLEtBQWhDO0FBQ0EsY0FBTSxLQUFOLENBQVksU0FBWixFQUF1QixPQUF2QixHQUFpQyxFQUFqQztBQUNBLGNBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsS0FBdkIsR0FBK0IsRUFBL0I7QUFDQSxjQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLEdBQWdDLENBQWhDO0FBQ0EsY0FBTSxLQUFOLENBQVksU0FBWixFQUF1QixPQUF2QixHQUFpQyxFQUFqQztBQUNBLGNBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsV0FBdkIsR0FBcUMsRUFBckM7QUFDSDtBQUNKLENBbEZMLGtEQW9GSyxTQUFTLGdCQXBGZCxFQW9GaUMsVUFBQyxLQUFELEVBQVc7QUFDcEMsVUFBTSxLQUFOLEdBQWMsRUFBZDtBQUNILENBdEZMLGtEQXdGSyxTQUFTLGdCQXhGZCxFQXdGaUMsVUFBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUM3QyxRQUFNLFlBQVksUUFBUSxJQUExQjtBQUNBLFFBQUksYUFBYSxNQUFNLEtBQXZCLEVBQThCO0FBQzFCLGNBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsTUFBdkIsR0FBZ0MsUUFBUSxNQUFSLElBQWtCLEtBQWxEO0FBQ0EsY0FBTSxLQUFOLENBQVksU0FBWixFQUF1QixNQUF2QixHQUFnQyxLQUFoQztBQUNBLGNBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsT0FBdkIsR0FBaUMsc0JBQWMsRUFBZCxFQUFrQixRQUFRLE9BQVIsSUFBbUIsRUFBckMsQ0FBakM7QUFDQSxjQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLEdBQStCLEVBQS9CO0FBQ0EsY0FBTSxLQUFOLENBQVksU0FBWixFQUF1QixPQUF2QixHQUFpQyxFQUFqQztBQUNBLGNBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsV0FBdkIsR0FBcUMsRUFBckM7QUFDSDtBQUNKLENBbEdMLGtEQW9HSyxTQUFTLG1CQXBHZCxFQW9Hb0MsVUFBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUNoRCxRQUFNLFlBQVksUUFBUSxJQUExQjtBQUNBLFFBQUksYUFBYSxNQUFNLEtBQXZCLEVBQThCO0FBQzFCLGNBQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsT0FBdkIsR0FBaUMsYUFBYSxPQUFiLEdBQzdCLFFBQVEsT0FEcUIsR0FDWCxDQUFDLE1BQU0sS0FBTixDQUFZLFNBQVosRUFBdUIsT0FEOUM7QUFFQSxjQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLEdBQWdDLEtBQWhDO0FBQ0EsY0FBTSxLQUFOLENBQVksU0FBWixFQUF1QixLQUF2QixHQUErQixFQUEvQjtBQUNIO0FBQ0osQ0E1R0wsa0RBOEdLLFNBQVMsb0JBOUdkLEVBOEdxQyxVQUFDLEtBQUQsRUFBUSxPQUFSLEVBQW9CO0FBQ2pELFFBQU0sWUFBWSxRQUFRLElBQTFCO0FBQ0EsUUFBTSxPQUFPLFFBQVEsSUFBckI7QUFDQSxRQUFNLE9BQU8sUUFBUSxJQUFyQjtBQUNBLFFBQUksYUFBYSxNQUFNLEtBQXZCLEVBQThCO0FBQzFCLFlBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWI7QUFDQSxZQUFNLFVBQVUsTUFBTSxLQUFOLENBQVksU0FBWixFQUF1QixPQUF2QztBQUNBLFlBQU0sU0FBUyxNQUFNLDRCQUFOLENBQW1DLElBQW5DLEVBQXlDLElBQXpDLENBQWY7QUFDQSxjQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLE9BQXZCLEdBQWlDLEVBQUUsS0FBRixDQUFRLEVBQVIsRUFBWSxPQUFaLEVBQXFCLE1BQXJCLENBQWpDO0FBQ0EsY0FBTSxLQUFOLENBQVksU0FBWixFQUF1QixNQUF2QixJQUFpQyxDQUFqQztBQUNIO0FBQ0osQ0F6SEwsa0RBMkhLLFNBQVMsZ0JBM0hkLEVBMkhpQyxVQUFDLEtBQUQsRUFBUSxPQUFSLEVBQW9CO0FBQzdDLFFBQU0sWUFBWSxRQUFRLElBQTFCO0FBQ0EsUUFBSSxhQUFhLE1BQU0sS0FBdkIsRUFBOEI7QUFDMUIsY0FBTSxLQUFOLENBQVksU0FBWixFQUF1QixJQUF2QixJQUErQixDQUEvQjtBQUNIO0FBQ0osQ0FoSUwsa0RBa0lLLFNBQVMscUJBbElkLEVBa0lzQyxVQUFDLEtBQUQsRUFBUSxPQUFSLEVBQW9CO0FBQ2xELFFBQU0sWUFBWSxRQUFRLElBQTFCO0FBQ0EsUUFBTSxXQUFXLFFBQVEsSUFBekI7QUFDQSxRQUFJLGFBQWEsTUFBTSxLQUF2QixFQUE4QjtBQUMxQixjQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQXVCLElBQXZCLElBQStCLENBQS9COztBQUVBLFlBQU0sT0FBTyxTQUFTLEtBQVQsQ0FBZSxHQUFmLENBQWI7QUFDQSxZQUFNLE9BQU8sS0FBSyxLQUFLLE1BQUwsR0FBYyxDQUFuQixDQUFiO0FBQ0EsWUFBTSxTQUFTLE1BQU0scUJBQU4sQ0FBNEIsTUFBTSxLQUFOLENBQVksU0FBWixFQUF1QixPQUFuRCxFQUE0RCxJQUE1RCxDQUFmO0FBQ0EsWUFBSSxNQUFKLEVBQVk7QUFDUixtQkFBTyxPQUFPLElBQVAsQ0FBUDtBQUNIO0FBQ0o7QUFDSixDQS9JTDs7Ozs7QUNuQkEsSUFBTSxlQUFlLFFBQVEsa0JBQVIsQ0FBckI7O0FBRUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsYUFBUyxLQURJO0FBRWIsYUFBUyxLQUZJO0FBR2IsYUFBUyxFQUhJO0FBSWIsV0FBTyxLQUpNO0FBS2IsZ0JBQVksRUFMQztBQU1iLHFCQUFpQixhQUFhLHdCQUFiLENBQXNDLGFBQWEsdUJBQWIsRUFBdEMsQ0FOSjtBQU9iLG1CQUFlLElBUEY7QUFRYixrQkFBYyxFQVJEO0FBU2IsbUJBQWUsRUFURjtBQVViLFdBQU87QUFDSDtBQURHO0FBVk0sQ0FBakI7Ozs7O0FDRkEsU0FBUyx1QkFBVCxHQUFtQztBQUMvQixRQUFNLE1BQU0sT0FBTyxTQUFuQjtBQUNBLFFBQU0sOEJBQThCLENBQUMsVUFBRCxFQUFhLGlCQUFiLEVBQWdDLGdCQUFoQyxFQUFrRCxjQUFsRCxDQUFwQzs7QUFFQTtBQUNBLFFBQUksTUFBTSxPQUFOLENBQWMsSUFBSSxTQUFsQixDQUFKLEVBQWtDO0FBQzlCLGVBQU8sSUFBSSxTQUFKLENBQWMsSUFBZCxDQUFtQjtBQUFBLG1CQUFZLFlBQVksU0FBUyxNQUFqQztBQUFBLFNBQW5CLENBQVA7QUFDSDs7QUFFRDtBQUNBLFdBQU8sNEJBQTRCLElBQTVCLENBQWlDLFVBQUMsR0FBRCxFQUFTO0FBQzdDLFlBQU0sV0FBVyxJQUFJLEdBQUosQ0FBakI7QUFDQSxlQUFPLFlBQVksU0FBUyxNQUE1QjtBQUNILEtBSE0sQ0FBUDtBQUlIOztBQUVELFNBQVMsd0JBQVQsQ0FBa0MsSUFBbEMsRUFBd0M7QUFDcEMsUUFBSSxRQUFRLElBQVIsSUFBZ0IsU0FBUyxFQUE3QixFQUFpQztBQUM3QixlQUFPLElBQVA7QUFDSDtBQUNELFdBQU8sS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixDQUFoQixFQUFtQixXQUFuQixFQUFQO0FBQ0g7O0FBRUQsT0FBTyxPQUFQLEdBQWlCO0FBQ2Isb0RBRGE7QUFFYjtBQUZhLENBQWpCOzs7OztBQ3ZCQSxJQUFNLElBQUksUUFBUSxRQUFSLENBQVY7O0FBRUEsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQStCO0FBQUEsc0NBQU4sSUFBTTtBQUFOLFlBQU07QUFBQTs7QUFDM0IsV0FBTyxLQUFLLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLFVBQUMsS0FBRCxFQUFRLE1BQVIsRUFBbUI7QUFDL0MsWUFBSSxPQUFPLEtBQUssTUFBTCxDQUFQLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3JDLG1CQUFPLEtBQUssTUFBTCxDQUFQO0FBQ0g7QUFDRCxlQUFPLEtBQVA7QUFDSCxLQUxNLENBQVA7QUFNSDs7QUFFRCxTQUFTLGVBQVQsQ0FBeUIsSUFBekIsRUFBK0IsR0FBL0IsRUFBb0M7QUFDaEMsV0FBTyxLQUFLLE9BQUwsQ0FBYSxtQkFBYixFQUFrQyxVQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWlCO0FBQ3RELFlBQU0sT0FBTyxFQUFFLEdBQUYsQ0FBTSxHQUFOLEVBQVcsSUFBWCxDQUFiO0FBQ0EsWUFBSSxRQUFRLElBQVosRUFBa0I7QUFDZCxtQkFBTyxJQUFQO0FBQ0g7QUFDRCxlQUFPLEtBQVA7QUFDSCxLQU5NLENBQVA7QUFPSDtBQUNELE9BQU8sT0FBUCxHQUFpQjtBQUNiLGtCQURhO0FBRWI7QUFGYSxDQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBLElBQU0sSUFBSSxRQUFRLFFBQVIsQ0FBVjs7QUFFQSxTQUFTLFFBQVQsQ0FBa0IsS0FBbEIsRUFBc0Y7QUFBQSxRQUFyRCxJQUFxRCx1RUFBdEMsRUFBc0M7QUFBQSxRQUFsQyxRQUFrQyx1RUFBZixLQUFlOztBQUNsRixRQUFNLGFBQWEsT0FBTyxTQUFTLE1BQW5DO0FBQ0EsUUFBSSxNQUFNLE1BQU4sR0FBZSxVQUFuQixFQUErQjtBQUMzQixZQUFNLGlCQUFpQixNQUFNLE1BQU4sR0FBZSxJQUF0QztBQUNBLFlBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxNQUFNLE1BQU4sR0FBZSxHQUExQixDQUFiO0FBQ0EsWUFBTSxhQUFhLEtBQUssS0FBTCxDQUFXLGlCQUFpQixHQUE1QixDQUFuQjtBQUNBLFlBQU0sWUFBWSxLQUFLLElBQUwsQ0FBVSxpQkFBaUIsR0FBM0IsQ0FBbEI7O0FBRUEsZUFBTyxNQUFNLEtBQU4sQ0FBWSxDQUFaLEVBQWUsT0FBTyxVQUF0QixJQUNELFFBREMsR0FFRCxNQUFNLEtBQU4sQ0FBWSxPQUFPLFNBQW5CLEVBQThCLE1BQU0sTUFBcEMsQ0FGTjtBQUdIO0FBQ0QsV0FBTyxLQUFQO0FBQ0g7O0FBRUQsU0FBUyxvQkFBVCxDQUE4QixNQUE5QixFQUEwRTtBQUFBLFFBQTNCLElBQTJCLHVFQUFYLElBQVc7O0FBQ3RFLFFBQUksVUFBVSxJQUFkLEVBQW9CO0FBQ2hCLGVBQU8sSUFBUDtBQUNILEtBRkQsTUFFTyxJQUFJLFFBQU8sTUFBUCx1REFBTyxNQUFQLE9BQWtCLFFBQXRCLEVBQWdDO0FBQ25DLFlBQUksSUFBSixFQUFVO0FBQ04sbUJBQU8sRUFBRSxTQUFGLENBQVksTUFBWixDQUFQO0FBQ0g7QUFDRCxlQUFPLE1BQVA7QUFDSDtBQUNELFdBQU8sTUFBUDtBQUNIOztBQUVELFNBQVMsa0JBQVQsQ0FBNEIsTUFBNUIsRUFBNkMsR0FBN0MsRUFBK0U7QUFDM0UsUUFBSSxDQUFDLE1BQU0sU0FBUyxHQUFULEVBQWMsRUFBZCxDQUFOLENBQUwsRUFBK0I7QUFDM0IsY0FBTSxTQUFTLEdBQVQsRUFBYyxFQUFkLENBQU47QUFDSDs7QUFFRCxRQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUNoQixlQUFPLENBQUMsR0FBRCxFQUFNLElBQU4sQ0FBUDtBQUNILEtBRkQsTUFFTyxJQUFJLGtCQUFrQixLQUF0QixFQUE2QjtBQUNoQyxZQUFJLE9BQU8sTUFBUCxJQUFpQixHQUFyQixFQUEwQjtBQUN0QixtQkFBTyxDQUFDLEdBQUQsRUFBTSxJQUFOLENBQVA7QUFDSDtBQUNKLEtBSk0sTUFJQSxJQUFJLEVBQUUsT0FBTyxNQUFULENBQUosRUFBc0I7QUFDekIsZUFBTyxDQUFDLEdBQUQsRUFBTSxJQUFOLENBQVA7QUFDSDtBQUNELFdBQU8sQ0FBQyxHQUFELEVBQU0sTUFBTixDQUFQO0FBQ0g7O0FBR0QsU0FBUyxxQkFBVCxDQUErQixNQUEvQixFQUFnRCxJQUFoRCxFQUEwRTtBQUN0RSxRQUFNLElBQUksSUFBVjs7QUFFQSxRQUFJLEVBQUUsTUFBRixLQUFhLENBQWpCLEVBQW9CO0FBQ2hCLGVBQU8scUJBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLENBQVAsQ0FEZ0IsQ0FDNEI7QUFDL0M7O0FBRUQsUUFBSSxFQUFFLE1BQUYsR0FBVyxDQUFmLEVBQWtCO0FBQ2QsWUFBSSxNQUFNLEVBQUUsQ0FBRixDQUFWO0FBQ0EsWUFBSSxTQUFTLElBQWI7O0FBRmMsa0NBR0UsbUJBQW1CLE1BQW5CLEVBQTJCLEdBQTNCLENBSEY7O0FBQUE7O0FBR2IsV0FIYTtBQUdSLGNBSFE7O0FBSWQsWUFBSSxVQUFVLElBQWQsRUFBb0I7QUFBRSxtQkFBTyxNQUFQO0FBQWdCO0FBQ3RDLFlBQUksVUFBVSxJQUFkLEVBQW9CO0FBQUUsbUJBQU8sTUFBUDtBQUFnQjtBQUN0QyxlQUFPLHNCQUFzQixPQUFPLEdBQVAsQ0FBdEIsRUFBbUMsRUFBRSxLQUFGLENBQVEsQ0FBUixDQUFuQyxDQUFQO0FBQ0g7QUFDRCxXQUFPLHNCQUFzQixNQUF0QixFQUE4QixFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQTlCLENBQVA7QUFDSDs7QUFFRCxTQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQStDLElBQS9DLEVBQXlFO0FBQ3JFLFFBQU0sSUFBSSxJQUFWO0FBQ0EsUUFBSSxFQUFFLE1BQUYsS0FBYSxDQUFqQixFQUFvQjtBQUNoQixlQUFPLHFCQUFxQixNQUFyQixDQUFQO0FBQ0g7O0FBRUQsUUFBSSxNQUFNLEVBQUUsQ0FBRixDQUFWO0FBQ0EsUUFBSSxTQUFTLElBQWI7O0FBUHFFLDhCQVFyRCxtQkFBbUIsTUFBbkIsRUFBMkIsR0FBM0IsQ0FScUQ7O0FBQUE7O0FBUXBFLE9BUm9FO0FBUS9ELFVBUitEOztBQVNyRSxRQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUFFLGVBQU8sTUFBUDtBQUFnQjtBQUN0QyxRQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUFFLGVBQU8sTUFBUDtBQUFnQjtBQUN0QyxXQUFPLHFCQUFxQixPQUFPLEdBQVAsQ0FBckIsRUFBa0MsRUFBRSxLQUFGLENBQVEsQ0FBUixDQUFsQyxDQUFQO0FBQ0g7O0FBRUQsU0FBUyw0QkFBVCxDQUFzQyxJQUF0QyxFQUNJLEtBREosRUFDMEM7QUFBQSxRQUExQixHQUEwQix1RUFBWixFQUFZOztBQUN0QyxRQUFNLFFBQVEsRUFBRSxPQUFGLENBQVUsSUFBVixDQUFkO0FBQ0EsV0FBTyxNQUFNLE1BQU4sQ0FBYSxVQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWdCO0FBQ2hDLFlBQUksb0JBQVksR0FBWixFQUFpQixNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUMvQixnQkFBSSxLQUFKLElBQWEsS0FBYjtBQUNBLG1CQUFPLEdBQVA7QUFDSDtBQUNELFlBQU0sU0FBUyxFQUFmO0FBQ0EsZUFBTyxLQUFQLElBQWdCLEdBQWhCO0FBQ0EsZUFBTyxNQUFQO0FBQ0gsS0FSTSxFQVFKLEdBUkksQ0FBUDtBQVNIOztBQUVELFNBQVMsU0FBVCxDQUFtQixPQUFuQixFQUE2RDtBQUFBLFFBQXZCLFNBQXVCLHVFQUFILENBQUc7O0FBQ3pELFdBQU8sUUFDRixNQURFLENBQ0ssVUFBQyxJQUFELEVBQU8sR0FBUCxFQUFZLEtBQVo7QUFBQSxlQUFzQixDQUFDLFFBQVEsU0FBUixLQUFzQixDQUF0QixHQUEwQixLQUFLLElBQUwsQ0FBVSxDQUFDLEdBQUQsQ0FBVixDQUExQixHQUN6QixLQUFLLEtBQUssTUFBTCxHQUFjLENBQW5CLEVBQXNCLElBQXRCLENBQTJCLEdBQTNCLENBRHdCLEtBQ1ksSUFEbEM7QUFBQSxLQURMLEVBRTZDLEVBRjdDLENBQVA7QUFHSDs7QUFFRCxPQUFPLE9BQVAsR0FBaUI7QUFDYixzQkFEYTtBQUViLHdCQUZhO0FBR2IsOENBSGE7QUFJYixnREFKYTtBQUtiO0FBTGEsQ0FBakI7OztBQ3BHQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzF0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0NUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdHJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pOQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuY29uc3QgYWxsID0ge1xuICAgIHJvb3Q6IHBhdGgucmVzb2x2ZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nKSksXG4gICAgZWxhc3RpY3NlYXJjaDoge1xuICAgICAgICBpbmRleF9wcmVmaXg6ICdwb3MnLFxuICAgIH0sXG4gICAgbG9nZ2VyOiB7XG4gICAgICAgIGxvZ0ZpbGU6ICdtaWRzdG9kLmxvZycsXG4gICAgfSxcbiAgICBhcGk6IHtcbiAgICAgICAgcHVibGljOiB7XG4gICAgICAgICAgICB2ZXJzaW9uOiAndjInLFxuICAgICAgICAgICAgcHJlZml4OiAnL2FwaS9wdWJsaWMnLFxuICAgICAgICB9LFxuICAgICAgICBwcml2YXRlOiB7XG4gICAgICAgICAgICB2ZXJzaW9uOiAndjInLFxuICAgICAgICAgICAgcHJlZml4OiAnL2FwaS9wcml2YXRlJyxcbiAgICAgICAgfSxcbiAgICAgICAgaW50ZXJ2YWw6IFsxMjAwMDAsIDEyMDAwMF0sXG4gICAgfSxcbiAgICBlbnRpdGllczogW3tcbiAgICAgICAgbmFtZTogJ2NpdGF0aW9uJyxcbiAgICAgICAgdGV4dDogJ0NpdGF0aW9uJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2FwaXVzZXInLFxuICAgICAgICB0ZXh0OiAnVXNlciBvZiBBUEknLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAndXNlcicsXG4gICAgICAgIHRleHQ6ICdVc2VyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2luc3RpdHV0aW9uJyxcbiAgICAgICAgdGV4dDogJ0luc3RpdHV0aW9uJyxcbiAgICB9LFxuICAgIF0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFsbDtcbiIsImNvbnN0IGJhc2VDb25maWcgPSByZXF1aXJlKCcuL2FsbCcpO1xuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5jb25zdCBlbnYgPSBcImRldmVsb3BtZW50XCIgfHwgJ2RldmVsb3BtZW50JztcbmxldCB0bXA7XG50cnkge1xuICB0bXAgPSByZXF1aXJlKGAuLyR7ZW52fS5qc2ApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG59IGNhdGNoIChlcnJvcikge1xuICAgIHRtcCA9IHt9O1xuICAgIC8vIHByb2Nlc3MuZXhpdCgxKTtcbn1cblxuY29uc3QgY29uZmlnID0gXy5tZXJnZShiYXNlQ29uZmlnLCB0bXApO1xubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuYW1lOiAnTG9hZGVyJyxcbiAgICBwcm9wczogWydwcmltYXJ5Q29sb3InLCAnc2Vjb25kYXJ5Q29sb3InXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJpbWFyeUNvbG9yLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5zZWNvbmRhcnlDb2xvcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJtc3ctbG9hZGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgc2Vjb25kYXJ5LWNvbG9yXCIgOnN0eWxlPVwiY3NzLnNlY29uZGFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgc2Vjb25kYXJ5LWNvbG9yXCIgOnN0eWxlPVwiY3NzLnNlY29uZGFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgc2Vjb25kYXJ5LWNvbG9yIGxvYWRlci1sYXN0XCIgOnN0eWxlPVwiY3NzLnNlY29uZGFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgcHJpbWFyeS1jb2xvciBsb2FkZXItY2xlYXJcIiA6c3R5bGU9XCJjc3MucHJpbWFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgcHJpbWFyeS1jb2xvclwiIDpzdHlsZT1cImNzcy5wcmltYXJ5XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGVyLXNxdWFyZSBwcmltYXJ5LWNvbG9yIGxvYWRlci1sYXN0XCIgOnN0eWxlPVwiY3NzLnByaW1hcnlcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkZXItc3F1YXJlIHNlY29uZGFyeS1jb2xvciBsb2FkZXItY2xlYXJcIiA6c3R5bGU9XCJjc3Muc2Vjb25kYXJ5XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGVyLXNxdWFyZSBzZWNvbmRhcnktY29sb3JcIiA6c3R5bGU9XCJjc3Muc2Vjb25kYXJ5XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGVyLXNxdWFyZSBzZWNvbmRhcnktY29sb3IgbG9hZGVyLWxhc3RcIiA6c3R5bGU9XCJjc3Muc2Vjb25kYXJ5XCIgLz5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Mb2FkZXInKTtcbjwvc2NyaXB0PlxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgICAgdHdvU3RlcHM6IHsgZGVmYXVsdDogZmFsc2UsIHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgICAgY29uZmlybWF0aW9uOiB7IGRlZmF1bHQ6ICdBcmUgeW91IHN1cmU/JywgdHlwZTogU3RyaW5nIH0sXG4gICAgfSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGNsaWNrKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR3b1N0ZXBzICYmICF0aGlzLnN0YXRlLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNvbmZpcm0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLnN0YXRlLmNvbmZpcm0gPSBmYWxzZTsgfSwgMzAwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY29uZmlybSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2FjdGlvbi1jbGljaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuICAgIDxidXR0b24gQGNsaWNrPVwiY2xpY2tcIj5cbiAgICAgICAgPHNsb3Qgdi1pZj1cIiFzdGF0ZS5jb25maXJtXCI+XG5cbiAgICAgICAgPC9zbG90PlxuICAgICAgICA8c3BhbiB2LWVsc2U+XG4gICAgICAgICAgICB7e2NvbmZpcm1hdGlvbn19XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0FjdGlvbkJ1dHRvbicpO1xuPC9zY3JpcHQ+XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgICBoYXNPcHRpb25zOiB7IGRlZmF1bHQ6IHRydWUgfSxcbiAgICAgICAgaXNSZWZyZXNoYWJsZTogeyBkZWZhdWx0OiBmYWxzZSB9LFxuICAgICAgICBpc1JlbW92YWJsZTogeyBkZWZhdWx0OiBmYWxzZSB9LFxuICAgICAgICBpc0NvbGxhcHNhYmxlOiB7IGRlZmF1bHQ6IHRydWUgfSxcbiAgICAgICAgY29sbGFwc2VkOiB7IGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgfSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBvbkNvbGxhcHNlKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY29sbGFwc2VkID0gIXRoaXMuc3RhdGUuY29sbGFwc2VkO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uUmVmcmVzaChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdyZWZyZXNoJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZW1vdmUoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaG93ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdyZW1vdmUnKTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuY29sbGFwc2VkID0gdGhpcy5jb2xsYXBzZWQ7XG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwic21hcnQtd2lkZ2V0XCIgdi1pZj1cInN0YXRlLnNob3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwic21hcnQtd2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICA8c2xvdCBuYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgIFNsb3QgdGl0bGUgaXMgcmVxdWlyZWRcbiAgICAgICAgPC9zbG90PlxuICAgICAgICA8c3BhbiB2LWlmPVwiaGFzT3B0aW9uc1wiIGNsYXNzPVwic21hcnQtd2lkZ2V0LW9wdGlvblwiPlxuICAgICAgICAgICAgPGEgdi1pZj1cImlzQ29sbGFwc2FibGVcIiBjbGFzcz1cIndpZGdldC1jb2xsYXBzZS1vcHRpb25cIiBAY2xpY2s9XCJvbkNvbGxhcHNlXCIgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICA8aSB2LWlmPVwic3RhdGUuY29sbGFwc2VkXCIgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWRvd25cIj48L2k+XG4gICAgICAgICAgICAgICAgPGkgdi1lbHNlIGNsYXNzPVwiZmEgZmEtY2hldnJvbi11cFwiPjwvaT5cbiAgICAgICAgICAgIDwvYT4gXG4gICAgICAgICAgICA8YSB2LWlmPVwiaXNSZWZyZXNoYWJsZVwiIGNsYXNzPVwid2lkZ2V0LXJlZnJlc2gtb3B0aW9uXCIgaHJlZj1cIiNcIiBAY2xpY2s9XCJvblJlZnJlc2hcIj48aSBjbGFzcz1cImZhIGZhLXJlZnJlc2hcIj48L2k+PC9hPiBcbiAgICAgICAgICAgIDxhIHYtaWY9XCJpc1JlbW92YWJsZVwiIGNsYXNzPVwid2lkZ2V0LXJlbW92ZS1vcHRpb25cIiBocmVmPVwiI1wiIEBjbGljaz1cIm9uUmVtb3ZlXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2E+IFxuICAgICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPHRyYW5zaXRpb24gbmFtZT1cIndpZGdldC1zbGlkZVwiPlxuICAgICAgICA8ZGl2IHYtaWY9XCIhc3RhdGUuY29sbGFwc2VkXCIgY2xhc3M9XCJzbWFydC13aWRnZXQtaW5uZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzbWFydC13aWRnZXQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgU2xvdCBib2R5IGlzIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvdHJhbnNpdGlvbj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9XaWRnZXQnKTsgXG48L3NjcmlwdD5cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuXG59XG4iLCI8dGVtcGxhdGU+XG48Zm9vdGVyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJmb290ZXItY29udGFpbmVyIGNvbnRhaW5lciBpcy1mbHVpZCBpcy1tYXJnaW5sZXNzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGZvb3Rlci1kaXNjbGFpbWVyXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbHVtblwiPiZjb3B5OyBJTkVEIDIwMTc8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9mb290ZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Gb290ZXInKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgTmF2YmFyID0gcmVxdWlyZSgnLi4vbmF2YmFyL05hdmJhci52dWUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29tcG9uZW50czoge1xuICAgICAgICAnbmF2YmFyJzogTmF2YmFyLFxuICAgIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbjxoZWFkZXIgY2xhc3M9XCJzZWN0aW9uXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBpcy1mbHVpZCBpcy1tYXJnaW5sZXNzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aWxlIGlzLWFuY2VzdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlsZSBpcy1wYXJlbnQgaXMtMiBpcy12ZXJ0aWNhbCBpcy1oaWRkZW4tdG91Y2hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UgdGlsZSBpcy1jaGlsZCBpcy0xNmJ5OVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0nL3B1YmxpYy9mcm9udC9pbWdzL2xvZ28vbG9nby5zdmcnIGFsdD0nTG9nbycgdGl0bGU9J0FwcCBMb2dvJyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlsZSBpcy12ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlsZSBpcy1wYXJlbnQgaXMtMiBpcy12ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGlsZSBpcy1jaGlsZFwiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9JyMnPkxvZyBJbiAvIFNpZ24gSW48L2E+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGlsZSBpcy1jaGlsZFwiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9JyMnPkZSPC9hPiZuYnNwO3wmbmJzcDs8YSBocmVmPScjJz5FTjwvYT5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2hlYWRlcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0hlYWRlcicpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByb3BzOiBbJ21lbnVzJ10sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzU2hvd246IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICByb3V0ZXM6IHRoaXMuJHJvdXRlci5vcHRpb25zLnJvdXRlcy5maWx0ZXIociA9PiByLnBhdGggIT09ICcvJyksXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ3JlZCcsICdvcmFuZ2UnLCAncHVycGxlJywgJ2Jyb3duJywgJ2dyZWVuJywgJ2JsdWUnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBhY3RpdmVfaWR4KCkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLiRyb3V0ZXIub3B0aW9ucy5yb3V0ZXMsIHIgPT4gci5wYXRoICE9PSAnLycgJiYgdGhpcy4kcm91dGUucGF0aCA9PT0gci5wYXRoKSAtIDE7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoLTEsIGluZGV4KTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc2hvdyhlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmlzU2hvd24gPSAhdGhpcy5pc1Nob3duO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJob2x5LWdyYWlsLW5hdiBpcy1mdWxsaGVpZ2h0XCI+XG4gICAgPGFzaWRlIGNsYXNzPVwibWVudVwiPlxuICAgICAgICA8ZGl2IHYtZm9yPVwiKHNlY3Rpb24sIGlkeCkgaW4gbWVudXNcIj5cbiAgICAgICAgICAgIDxwIDpjbGFzcz1cImBtZW51LWxhYmVsIG1lbnUtbGFiZWwtJHtzdGF0ZS5jb2xvcnNbaWR4XX1gXCI+XG4gICAgICAgICAgICAgICAge3tzZWN0aW9uWzBdLnNlY3Rpb259fSBcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDx1bCA6Y2xhc3M9XCJgbWVudS1saXN0IG1lbnUtbGlzdC0ke3N0YXRlLmNvbG9yc1tpZHhdfWBcIj5cbiAgICAgICAgICAgICAgICA8bGkgdi1mb3I9XCJpdGVtIGluIHNlY3Rpb25cIj48cm91dGVyLWxpbmsgZXhhY3QgYWN0aXZlLWNsYXNzPVwiaXMtYWN0aXZlXCIgOnRvPVwiaXRlbS5yb3V0ZXNbMF1cIj57e2l0ZW0ubmFtZX19PC9yb3V0ZXItbGluaz48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9hc2lkZT5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vTmF2YmFyJyk7XG48L3NjcmlwdD5cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xueyBsYWJlbDogJ1Byb2R1Y3Rpb24nLCB2YWx1ZTogJ3Byb2R1Y3Rpb24nIH0sXG57IGxhYmVsOiAnRGV2ZWxvcG1lbnQnLCB2YWx1ZTogJ2RldmVsb3BtZW50JyB9LFxueyBsYWJlbDogJ0RlbW9uc3RyYXRpb24nLCB2YWx1ZTogJ2RlbW8nIH0sXG57IGxhYmVsOiAnTG9jYWxob3N0JywgdmFsdWU6ICdsb2NhbCcgfSxcbl07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFt7IGxhYmVsOiAnVGV4dCcsIHZhbHVlOiAndGV4dCcgfSxcbiAgICB7IGxhYmVsOiAnRW1haWwnLCB2YWx1ZTogJ2VtYWlsJyB9LFxuICAgIHsgbGFiZWw6ICdQYXNzd29yZCcsIHZhbHVlOiAncGFzc3dvcmQnIH0sXG4gICAgeyBsYWJlbDogJ1Bob25lJywgdmFsdWU6ICdwaG9uZScgfSxcbiAgICB7IGxhYmVsOiAnTnVtYmVyJywgdmFsdWU6ICdudW1iZXInIH0sXG4gICAgeyBsYWJlbDogJ1RleHRhcmVhJywgdmFsdWU6ICd0ZXh0YXJlYScgfSxcbiAgICB7IGxhYmVsOiAnQ2hlY2tib3gnLCB2YWx1ZTogJ2NoZWNrYm94JyB9LFxuICAgIHsgbGFiZWw6ICdSYWRpbycsIHZhbHVlOiAncmFkaW8nIH0sXG4gICAgeyBsYWJlbDogJ1N1YmZvcm0nLCB2YWx1ZTogJ3N1YmZvcm0nIH0sXG4gICAgeyBsYWJlbDogJ1NlbGVjdCcsIHZhbHVlOiAnc2VsZWN0JyB9XTtcbiIsImNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuY29uc3QgTGFuZ3MgPSB7XG4gICAgQUE6ICdBZmFyJyxcbiAgICBBQjogJ0Fia2hhemlhbicsXG4gICAgQUU6ICdBdmVzdGFuJyxcbiAgICBBRjogJ0FmcmlrYWFucycsXG4gICAgQUs6ICdBa2FuJyxcbiAgICBBTTogJ0FtaGFyaWMnLFxuICAgIEFOOiAnQXJhZ29uZXNlJyxcbiAgICBBUjogJ0FyYWJpYycsXG4gICAgQVM6ICdBc3NhbWVzZScsXG4gICAgQVY6ICdBdmFyaWMnLFxuICAgIEFZOiAnQXltYXJhJyxcbiAgICBBWjogJ0F6ZXJiYWlqYW5pJyxcbiAgICBCQTogJ0Jhc2hraXInLFxuICAgIEJFOiAnQmVsYXJ1c2lhbicsXG4gICAgQkc6ICdCdWxnYXJpYW4nLFxuICAgIEJIOiAnQmloYXJpJyxcbiAgICBCSTogJ0Jpc2xhbWEnLFxuICAgIEJNOiAnQmFtYmFyYScsXG4gICAgQk46ICdCZW5nYWxpJyxcbiAgICBCTzogJ1RpYmV0YW4nLFxuICAgIEJSOiAnQnJldG9uJyxcbiAgICBCUzogJ0Jvc25pYW4nLFxuICAgIENBOiAnQ2F0YWxhbicsXG4gICAgQ0U6ICdDaGVjaGVuJyxcbiAgICBDSDogJ0NoYW1vcnJvJyxcbiAgICBDTzogJ0NvcnNpY2FuJyxcbiAgICBDUjogJ0NyZWUnLFxuICAgIENTOiAnQ3plY2gnLFxuICAgIENVOiAnT2xkIENodXJjaCBTbGF2b25pYycsXG4gICAgQ1Y6ICdDaHV2YXNoJyxcbiAgICBDWTogJ1dlbHNoJyxcbiAgICBEQTogJ0RhbmlzaCcsXG4gICAgREU6ICdHZXJtYW4nLFxuICAgIERWOiAnRGl2ZWhpJyxcbiAgICBEWjogJ0R6b25na2hhJyxcbiAgICBFRTogJ0V3ZScsXG4gICAgRUw6ICdHcmVlaycsXG4gICAgRU46ICdFbmdsaXNoJyxcbiAgICBFTzogJ0VzcGVyYW50bycsXG4gICAgRVM6ICdTcGFuaXNoJyxcbiAgICBFVDogJ0VzdG9uaWFuJyxcbiAgICBFVTogJ0Jhc3F1ZScsXG4gICAgRkE6ICdQZXJzaWFuJyxcbiAgICBGRjogJ0Z1bGFoJyxcbiAgICBGSTogJ0Zpbm5pc2gnLFxuICAgIEZKOiAnRmlqaWFuJyxcbiAgICBGTzogJ0Zhcm9lc2UnLFxuICAgIEZSOiAnRnJlbmNoJyxcbiAgICBGWTogJ1dlc3Rlcm4gRnJpc2lhbicsXG4gICAgR0E6ICdJcmlzaCcsXG4gICAgR0Q6ICdTY290dGlzaCBHYWVsaWMnLFxuICAgIEdMOiAnR2FsaWNpYW4nLFxuICAgIEdOOiAnR3VhcmFuaScsXG4gICAgR1U6ICdHdWphcmF0aScsXG4gICAgR1Y6ICdNYW54JyxcbiAgICBIQTogJ0hhdXNhJyxcbiAgICBIRTogJ0hlYnJldycsXG4gICAgSEk6ICdIaW5kaScsXG4gICAgSE86ICdIaXJpIE1vdHUnLFxuICAgIEhSOiAnQ3JvYXRpYW4nLFxuICAgIEhUOiAnSGFpdGlhbicsXG4gICAgSFU6ICdIdW5nYXJpYW4nLFxuICAgIEhZOiAnQXJtZW5pYW4nLFxuICAgIEhaOiAnSGVyZXJvJyxcbiAgICBJQTogJ0ludGVybGluZ3VhJyxcbiAgICBJRDogJ0luZG9uZXNpYW4nLFxuICAgIElFOiAnSW50ZXJsaW5ndWUnLFxuICAgIElHOiAnSWdibycsXG4gICAgSUk6ICdTaWNodWFuIFlpJyxcbiAgICBJSzogJ0ludXBpYXEnLFxuICAgIElPOiAnSWRvJyxcbiAgICBJUzogJ0ljZWxhbmRpYycsXG4gICAgSVQ6ICdJdGFsaWFuJyxcbiAgICBJVTogJ0ludWt0aXR1dCcsXG4gICAgSkE6ICdKYXBhbmVzZScsXG4gICAgSlY6ICdKYXZhbmVzZScsXG4gICAgS0E6ICdHZW9yZ2lhbicsXG4gICAgS0c6ICdLb25nbycsXG4gICAgS0k6ICdLaWt1eXUnLFxuICAgIEtKOiAnS3dhbnlhbWEnLFxuICAgIEtLOiAnS2F6YWtoJyxcbiAgICBLTDogJ0thbGFhbGxpc3V0JyxcbiAgICBLTTogJ0tobWVyJyxcbiAgICBLTjogJ0thbm5hZGEnLFxuICAgIEtPOiAnS29yZWFuJyxcbiAgICBLUjogJ0thbnVyaScsXG4gICAgS1M6ICdLYXNobWlyaScsXG4gICAgS1U6ICdLdXJkaXNoJyxcbiAgICBLVjogJ0tvbWknLFxuICAgIEtXOiAnQ29ybmlzaCcsXG4gICAgS1k6ICdLaXJnaGl6JyxcbiAgICBMQTogJ0xhdGluJyxcbiAgICBMQjogJ0x1eGVtYm91cmdpc2gnLFxuICAgIExHOiAnR2FuZGEnLFxuICAgIExJOiAnTGltYnVyZ2lzaCcsXG4gICAgTE46ICdMaW5nYWxhJyxcbiAgICBMTzogJ0xhbycsXG4gICAgTFQ6ICdMaXRodWFuaWFuJyxcbiAgICBMVTogJ0x1YmEtS2F0YW5nYScsXG4gICAgTFY6ICdMYXR2aWFuJyxcbiAgICBNRzogJ01hbGFnYXN5JyxcbiAgICBNSDogJ01hcnNoYWxsZXNlJyxcbiAgICBNSTogJ03EgW9yaScsXG4gICAgTUs6ICdNYWNlZG9uaWFuJyxcbiAgICBNTDogJ01hbGF5YWxhbScsXG4gICAgTU46ICdNb25nb2xpYW4nLFxuICAgIE1POiAnTW9sZGF2aWFuJyxcbiAgICBNUjogJ01hcmF0aGknLFxuICAgIE1TOiAnTWFsYXknLFxuICAgIE1UOiAnTWFsdGVzZScsXG4gICAgTVk6ICdCdXJtZXNlJyxcbiAgICBOQTogJ05hdXJ1JyxcbiAgICBOQjogJ05vcndlZ2lhbiBCb2ttw6VsJyxcbiAgICBORDogJ05vcnRoIE5kZWJlbGUnLFxuICAgIE5FOiAnTmVwYWxpJyxcbiAgICBORzogJ05kb25nYScsXG4gICAgTkw6ICdEdXRjaCcsXG4gICAgTk46ICdOb3J3ZWdpYW4gTnlub3JzaycsXG4gICAgTk86ICdOb3J3ZWdpYW4nLFxuICAgIE5SOiAnU291dGggTmRlYmVsZScsXG4gICAgTlY6ICdOYXZham8nLFxuICAgIE5ZOiAnQ2hpY2hld2EnLFxuICAgIE9DOiAnT2NjaXRhbicsXG4gICAgT0o6ICdPamlid2EnLFxuICAgIE9NOiAnT3JvbW8nLFxuICAgIE9SOiAnT3JpeWEnLFxuICAgIE9TOiAnT3NzZXRpYW4nLFxuICAgIFBBOiAnUGFuamFiaScsXG4gICAgUEk6ICdQxIFsaScsXG4gICAgUEw6ICdQb2xpc2gnLFxuICAgIFBTOiAnUGFzaHRvJyxcbiAgICBQVDogJ1BvcnR1Z3Vlc2UnLFxuICAgIFFVOiAnUXVlY2h1YScsXG4gICAgUkM6ICdSZXVuaW9uZXNlJyxcbiAgICBSTTogJ1JvbWFuc2gnLFxuICAgIFJOOiAnS2lydW5kaScsXG4gICAgUk86ICdSb21hbmlhbicsXG4gICAgUlU6ICdSdXNzaWFuJyxcbiAgICBSVzogJ0tpbnlhcndhbmRhJyxcbiAgICBTQTogJ1NhbnNrcml0JyxcbiAgICBTQzogJ1NhcmRpbmlhbicsXG4gICAgU0Q6ICdTaW5kaGknLFxuICAgIFNFOiAnTm9ydGhlcm4gU2FtaScsXG4gICAgU0c6ICdTYW5nbycsXG4gICAgU0g6ICdTZXJiby1Dcm9hdGlhbicsXG4gICAgU0k6ICdTaW5oYWxlc2UnLFxuICAgIFNLOiAnU2xvdmFrJyxcbiAgICBTTDogJ1Nsb3ZlbmUnLFxuICAgIFNNOiAnU2Ftb2FuJyxcbiAgICBTTjogJ1Nob25hJyxcbiAgICBTTzogJ1NvbWFsaScsXG4gICAgU1E6ICdBbGJhbmlhbicsXG4gICAgU1I6ICdTZXJiaWFuJyxcbiAgICBTUzogJ1N3YXRpJyxcbiAgICBTVDogJ1NvdGhvJyxcbiAgICBTVTogJ1N1bmRhbmVzZScsXG4gICAgU1Y6ICdTd2VkaXNoJyxcbiAgICBTVzogJ1N3YWhpbGknLFxuICAgIFRBOiAnVGFtaWwnLFxuICAgIFRFOiAnVGVsdWd1JyxcbiAgICBURzogJ1RhamlrJyxcbiAgICBUSDogJ1RoYWknLFxuICAgIFRJOiAnVGlncmlueWEnLFxuICAgIFRLOiAnVHVya21lbicsXG4gICAgVEw6ICdUYWdhbG9nJyxcbiAgICBUTjogJ1Rzd2FuYScsXG4gICAgVE86ICdUb25nYScsXG4gICAgVFI6ICdUdXJraXNoJyxcbiAgICBUUzogJ1Rzb25nYScsXG4gICAgVFQ6ICdUYXRhcicsXG4gICAgVFc6ICdUd2knLFxuICAgIFRZOiAnVGFoaXRpYW4nLFxuICAgIFVHOiAnVWlnaHVyJyxcbiAgICBVSzogJ1VrcmFpbmlhbicsXG4gICAgVVI6ICdVcmR1JyxcbiAgICBVWjogJ1V6YmVrJyxcbiAgICBWRTogJ1ZlbmRhJyxcbiAgICBWSTogJ1Zpw6p0IE5hbWVzZScsXG4gICAgVk86ICdWb2xhcMO8aycsXG4gICAgV0E6ICdXYWxsb29uJyxcbiAgICBXTzogJ1dvbG9mJyxcbiAgICBYSDogJ1hob3NhJyxcbiAgICBZSTogJ1lpZGRpc2gnLFxuICAgIFlPOiAnWW9ydWJhJyxcbiAgICBaQTogJ1podWFuZycsXG4gICAgWkg6ICdDaGluZXNlJyxcbiAgICBaVTogJ1p1bHUnLFxufTtcblxuY29uc3QgTGFuZ3NMaXN0ID0gXy5tYXAoTGFuZ3MsIChsYWJlbCwgdmFsdWUpID0+ICh7IGxhYmVsLCB2YWx1ZSB9KSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIExhbmdzLFxuICAgIExhbmdzTGlzdCxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFt7IGxhYmVsOiAnWmVybycsIHZhbHVlOiAnMCcgfSxcbiAgICB7IGxhYmVsOiAnT25lJywgdmFsdWU6ICcxJyB9LFxuICAgIHsgbGFiZWw6ICdUd28nLCB2YWx1ZTogJzInIH0sXG4gICAgeyBsYWJlbDogJ0ZldycsIHZhbHVlOiAnZmV3JyB9LFxuICAgIHsgbGFiZWw6ICdNYW55JywgdmFsdWU6ICdtYW55JyB9LFxuICAgIHsgbGFiZWw6ICdPdGhlcicsIHZhbHVlOiAnb3RoZXInIH0sXG4gICAgeyBsYWJlbDogJ04vQScsIHZhbHVlOiAnbi9hJyB9XTtcbiIsImNvbnN0IFZ1ZSA9IHJlcXVpcmUoJ3Z1ZScpO1xuY29uc3Qgcm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcbmNvbnN0IHN0b3JlID0gcmVxdWlyZSgnLi4vY29tbW9uL3N0b3JlJyk7XG5cbmNvbnN0IExvYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2FkZXIvTG9hZGVyLnZ1ZScpO1xuY29uc3QgSW5wdXQgPSByZXF1aXJlKCcuLi9jb21tb24vY29tcG9uZW50cy9pbmVkL2Zvcm1zL2VsZW1lbnRzL2lucHV0L0lucHV0LnZ1ZScpO1xuY29uc3QgU2VsZWN0ID0gcmVxdWlyZSgnLi4vY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9lbGVtZW50cy9zZWxlY3QvU2VsZWN0LnZ1ZScpO1xuY29uc3QgVmFyaWFkaWNFbGVtZW50ID0gcmVxdWlyZSgnLi4vY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9lbGVtZW50cy92YXJpYWRpY19lbGVtZW50L1ZhcmlhZGljRWxlbWVudC52dWUnKTtcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuLi9jb21tb24vY29tcG9uZW50cy9pbmVkL2Zvcm1zL2Zvcm0vRm9ybS52dWUnKTtcbmNvbnN0IER5bmFtaWNGb3JtID0gcmVxdWlyZSgnLi4vY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9keW5hbWljX2Zvcm0vRHluYW1pY0Zvcm0udnVlJyk7XG5jb25zdCBQYWdpbmF0b3IgPSByZXF1aXJlKCcuLi9jb21tb24vY29tcG9uZW50cy9pbmVkL3BhZ2luYXRvci9QYWdpbmF0b3IudnVlJyk7XG5jb25zdCBUYWJiZXIgPSByZXF1aXJlKCcuLi9jb21tb24vY29tcG9uZW50cy9pbmVkL3RhYmJlci9UYWJiZXIudnVlJyk7XG5cbmNvbnN0IEFjdGlvbkJ1dHRvbiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2FjdGlvbl9idXR0b24vQWN0aW9uQnV0dG9uLnZ1ZScpO1xuY29uc3QgV2lkZ2V0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvd2lkZ2V0L1dpZGdldC52dWUnKTtcblxuY29uc3QgQXBwID0gcmVxdWlyZSgnLi9wYWdlcy9BcHAudnVlJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2xvYWRlcicsIExvYWRlcik7XG5WdWUuY29tcG9uZW50KCdmZm9ybScsIEZvcm0pO1xuVnVlLmNvbXBvbmVudCgnZmlucHV0JywgSW5wdXQpO1xuVnVlLmNvbXBvbmVudCgnZnNlbGVjdCcsIFNlbGVjdCk7XG5WdWUuY29tcG9uZW50KCdmdmFyaWFkaWMtZWxlbWVudCcsIFZhcmlhZGljRWxlbWVudCk7XG5WdWUuY29tcG9uZW50KCdhY3Rpb24tYnV0dG9uJywgQWN0aW9uQnV0dG9uKTtcblZ1ZS5jb21wb25lbnQoJ3dpZGdldCcsIFdpZGdldCk7XG5WdWUuY29tcG9uZW50KCdwYWdpbmF0b3InLCBQYWdpbmF0b3IpO1xuVnVlLmNvbXBvbmVudCgndGFiYmVyJywgVGFiYmVyKTtcblZ1ZS5jb21wb25lbnQoJ2R5bmFtaWMtZm9ybScsIER5bmFtaWNGb3JtKTtcblxubmV3IFZ1ZSh7XG4gICAgZWw6ICcjYXBwJyxcbiAgICBzdG9yZSxcbiAgICByb3V0ZXIsXG4gICAgcmVuZGVyOiBoID0+IGgoQXBwKSxcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbmNvbnN0IFJvdXRlcyA9IHJlcXVpcmUoJy4vcm91dGVzJyk7XG5jb25zdCBIb21lID0gcmVxdWlyZSgnLi9wYWdlcy9ob21lL0hvbWUudnVlJyk7XG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi9wYWdlcy91c2VyL1VzZXIudnVlJyk7XG5jb25zdCBDb25maWcgPSByZXF1aXJlKCcuL3BhZ2VzL2NvbmZpZy9Db25maWcudnVlJyk7XG5jb25zdCBMYW5nID0gcmVxdWlyZSgnLi9wYWdlcy9sYW5nL0xhbmcudnVlJyk7XG5jb25zdCBGb3JtID0gcmVxdWlyZSgnLi9wYWdlcy9mb3JtL0Zvcm0udnVlJyk7XG5jb25zdCBNZW51Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9wYWdlcy9tZW51L01lbnUudnVlJyk7XG5jb25zdCBEYXRhc291cmNlID0gcmVxdWlyZSgnLi9wYWdlcy9kYXRhc291cmNlL0RhdGFzb3VyY2UudnVlJyk7XG5jb25zdCBEYXRhaW5zdGFuY2UgPSByZXF1aXJlKCcuL3BhZ2VzL2RhdGFpbnN0YW5jZS9EYXRhaW5zdGFuY2UudnVlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMubWVudSA9IFtcbiAgICBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdHZW5lcmFsJyxcbiAgICAgICAgICAgIG5hbWU6ICdPdmVydmlldycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnYWRtaW4nLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmFkbWluXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBIb21lLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnR2VuZXJhbCcsXG4gICAgICAgICAgICBuYW1lOiAnVXNlcnMnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ3VzZXInLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLnVzZXJdLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IFVzZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdHZW5lcmFsJyxcbiAgICAgICAgICAgIG5hbWU6ICdSZXZpZXdzJyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdyZXZpZXcnLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLnJldmlld10sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSG9tZSxcbiAgICAgICAgfSxcbiAgICBdLFxuXG4gICAgW1xuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWRtaW5pc3RyYXRpb24nLFxuICAgICAgICAgICAgbmFtZTogJ0RhdGEgc291cmNlcycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnZGF0YXNvdXJjZScsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuZGF0YXNvdXJjZV0sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogRGF0YXNvdXJjZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkbWluaXN0cmF0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6ICdQdWJsaWNhdGlvbnMnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ3B1YmxpY2F0aW9uJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5wdWJsaWNhdGlvbl0sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSG9tZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkbWluaXN0cmF0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6ICdDU0wgTWFuYWdlbWVudCcsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnY3NsJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5jc2xdLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IEhvbWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZG1pbmlzdHJhdGlvbicsXG4gICAgICAgICAgICBuYW1lOiAnTWVudXMnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ21lbnUnLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLm1lbnVdLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IE1lbnVDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZG1pbmlzdHJhdGlvbicsXG4gICAgICAgICAgICBuYW1lOiAnRm9ybXMnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2Zvcm0nLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmZvcm1dLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IEZvcm0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZG1pbmlzdHJhdGlvbicsXG4gICAgICAgICAgICBuYW1lOiAnTGFuZ3MnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2xhbmcnLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmxhbmddLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IExhbmcsXG4gICAgICAgIH0sXG4gICAgXSxcblxuICAgIFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkdmFuY2VkJyxcbiAgICAgICAgICAgIG5hbWU6ICdFeHRlcm5hbCByZXBvc2l0b3JpZXMnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2V4dGVybmFsLXJlcG8nLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmV4dGVybmFsX3JlcG9dLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IEhvbWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZHZhbmNlZCcsXG4gICAgICAgICAgICBuYW1lOiAnRXhwb3J0IGZvcm1hdHMnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2V4cG9ydC1mb3JtYXQnLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmV4cG9ydF9mb3JtYXRdLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IEhvbWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZHZhbmNlZCcsXG4gICAgICAgICAgICBuYW1lOiAnSGFuZGxlIElEIE1hbmFnZW1lbnQnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2hhbmRsZWlkJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5oYW5kbGVfaWRdLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IEhvbWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZHZhbmNlZCcsXG4gICAgICAgICAgICBuYW1lOiAnQVBJIE1hbmFnZW1lbnQnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2FwaScsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuYXBpXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBIb21lLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWR2YW5jZWQnLFxuICAgICAgICAgICAgbmFtZTogJ0NvbmZpZycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnY29uZmlnJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5jb25maWddLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IENvbmZpZyxcbiAgICAgICAgfSxcbiAgICBdLFxuXTtcblxubW9kdWxlLmV4cG9ydHMub3RoZXIgPSBbXG4gICAge1xuICAgICAgICBrZXk6ICdkYXRhc291cmNlX3R5cG9sb2d5JyxcbiAgICAgICAgcm91dGVzOiBbUm91dGVzLmRhdGFpbnN0YW5jZV0sXG4gICAgICAgIGNvbXBvbmVudDogRGF0YWluc3RhbmNlLFxuICAgIH0sXG5dO1xuIiwiY29uc3QgVnVlID0gcmVxdWlyZSgndnVlJyk7XG5jb25zdCBNZXNzYWdlcyA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9hcGkvbWVzc2FnZXMnKTtcbmNvbnN0IEFQSVJvdXRlcyA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9hcGkvcm91dGVzJyk7XG5cbmNvbnN0IEVOViA9IFwiZGV2ZWxvcG1lbnRcIiB8fCAnbG9jYWwnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuYW1lOiAnQXBwJyxcbiAgICBiZWZvcmVNb3VudCgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnX3BhdGggPSBBUElSb3V0ZXMuZW50aXR5KCdjb25maWcnLCAnUE9TVCcsIHRydWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhFTlYpO1xuICAgICAgICBjb25zdCBjb25maWdfYm9keSA9IHtcbiAgICAgICAgICAgIHNpemU6IDEsXG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGVudmlyb25tZW50OiBFTlYsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxhbmdfcGF0aCA9IEFQSVJvdXRlcy5lbnRpdHkoJ2xhbmcnLCAnUE9TVCcsIHRydWUpO1xuICAgICAgICBjb25zdCBsYW5nX2JvZHkgPSB7XG4gICAgICAgICAgICBzaXplOiAxMDAwMCxcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgJGFuZDogW3sgcGFydDogJ2JhY2tvZmZpY2UnIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBwcm9taXNlX2NvbmZpZyA9IHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdncmFiX2NvbmZpZycsIHtcbiAgICAgICAgICAgIHBhdGg6IGNvbmZpZ19wYXRoLFxuICAgICAgICAgICAgYm9keTogY29uZmlnX2JvZHksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb21pc2VfY29uZmlnLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy4kc3RvcmUuc3RhdGUuZ2xvYmFsX2NvbmZpZztcbiAgICAgICAgICAgIGlmICghKCdsYW5ncycgaW4gY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZWZhdWx0X2xhbmcgPSBjb25maWcubGFuZ3MuZmluZChcbiAgICAgICAgICAgICAgICB2ID0+IHYudmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy4kc3RvcmUuc3RhdGUuYnJvd3Nlckxhbmd1YWdlKTtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0X2xhbmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRfbGFuZyA9IGNvbmZpZy5sYW5nc1swXS52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdF9sYW5nID0gZGVmYXVsdF9sYW5nLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYW5nX2JvZHkud2hlcmUuJGFuZC5wdXNoKHsgbGFuZzogZGVmYXVsdF9sYW5nIH0pO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaW50ZXJmYWNlTGFuZyA9IGRlZmF1bHRfbGFuZztcbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdncmFiX2xhbmd1YWdlJywge1xuICAgICAgICAgICAgICAgIHBhdGg6IGxhbmdfcGF0aCxcbiAgICAgICAgICAgICAgICBib2R5OiBsYW5nX2JvZHksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4geyBjb25zb2xlLmxvZyhlcnIpOyB9KTtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxsb2FkZXIgaWQ9XCJhcHBcIiB2LWlmPVwiT2JqZWN0LmtleXMoJHN0b3JlLnN0YXRlLmxhbmdfY29udGVudCkubGVuZ3RoID09PSAwXCI+PC9sb2FkZXI+XG48ZGl2IHYtZWxzZSBpZD1cImFwcFwiIGNsYXNzPVwiaG9seS1ncmFpbFwiPlxuICAgIDxyb3V0ZXItdmlldyBuYW1lPVwiaGVhZGVyXCI+PC9yb3V0ZXItdmlldz5cbiAgICA8ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1ib2R5XCI+XG4gICAgICAgIDxyb3V0ZXItdmlldz48L3JvdXRlci12aWV3PlxuICAgICAgICA8cm91dGVyLXZpZXcgbmFtZT1cIm5hdmJhclwiPjwvcm91dGVyLXZpZXc+XG4gICAgPC9kaXY+XG4gICAgPHJvdXRlci12aWV3IG5hbWU9XCJmb290ZXJcIj48L3JvdXRlci12aWV3PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0FwcCcpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IFJlYWRlck1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL1JlYWRlck1peGluJyk7XG5jb25zdCBMYW5nTWl4aW4gPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vbWl4aW5zL0xhbmdNaXhpbicpO1xuY29uc3QgRW52aXJvbm1lbnRzID0gcmVxdWlyZSgnLi4vLi4vbGlzdHMvZW52aXJvbm1lbnRzJyk7XG5jb25zdCBMYW5ncyA9IHJlcXVpcmUoJy4uLy4uL2xpc3RzL2xhbmdzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW1JlYWRlck1peGluLCBMYW5nTWl4aW5dLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2NvbmZpZycsICdQT1NUJyksXG4gICAgICAgICAgICAgICAgcnBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2NvbmZpZycsICdHRVQnKSxcbiAgICAgICAgICAgICAgICBjZm9ybTogJ2NvbmZpZ19jcmVhdGlvbicsXG4gICAgICAgICAgICAgICAgcmZvcm06ICdjb25maWdfcmVhZCcsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclJvdzogMixcbiAgICAgICAgICAgICAgICBsYW5nczogTGFuZ3MuTGFuZ3NMaXN0LFxuICAgICAgICAgICAgICAgIGVudmlyb25tZW50czogRW52aXJvbm1lbnRzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzaW5nbGVfcmVhZCcsIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICBwYXRoOiB0aGlzLnN0YXRlLnJwYXRoLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIHJlYWRDb250ZW50KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5yZm9ybV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnRvX21hdHJpeChmb3JtLmNvbnRlbnQgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNvbnRlbnQgOiBbXSwgdGhpcy5zdGF0ZS5pdGVtc1BlclJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnRMZW5ndGgoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jb250ZW50Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5HbG9iYWwgY29uZmlndXJhdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWZvcj1cInJvdyBpbiByZWFkQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIiB2LWZvcj1cImNvbnRlbnQgaW4gcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJ1cGRhdGUoY29udGVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1yZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjb25maXJtYXRpb249XCJsYW5nKCdiX3N1cmUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR3by1zdGVwcz1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJyZW1vdmUoY29udGVudCwgJ2NvbmZpZycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tjb250ZW50LmVudmlyb25tZW50fX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5BZGQgb3IgbW9kaWZ5IHRoZSBnbG9iYWwgY29uZmlndXJhdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZmb3JtIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cG9zdF9wYXRoPVwic3RhdGUucGF0aFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwdXRfcGF0aD1cInN0YXRlLnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfcGF0aD1cInN0YXRlLnJwYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X2Zvcm09XCJzdGF0ZS5yZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZzZWxlY3QgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJlbnZpcm9ubWVudFwiIDpsYWJlbD1cImxhbmcoJ2JfZW52aXJvbm1lbnQnKVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0ZS5lbnZpcm9ubWVudHNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImxhbmdzXCIgOmxhYmVsPVwibGFuZygnYl9sYW5nJyx7fSwgJ290aGVyJylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDptdWx0aT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cInN0YXRlLmxhbmdzXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmZvcm0+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0NvbmZpZycpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IFJlYWRlck1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL1JlYWRlck1peGluJyk7XG5jb25zdCBMYW5nTWl4aW4gPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vbWl4aW5zL0xhbmdNaXhpbicpO1xuY29uc3QgRm9ybU1peGluID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL21peGlucy9Gb3JtTWl4aW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbUmVhZGVyTWl4aW4sIExhbmdNaXhpbiwgRm9ybU1peGluXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiBBUElSb3V0ZXMuZW50aXR5KHRoaXMuJHJvdXRlLnBhcmFtcy5kYXRhaW5zdGFuY2UsICdQT1NUJyksXG4gICAgICAgICAgICAgICAgcnBhdGg6IEFQSVJvdXRlcy5lbnRpdHkodGhpcy4kcm91dGUucGFyYW1zLmRhdGFpbnN0YW5jZSwgJ0dFVCcpLFxuICAgICAgICAgICAgICAgIGNmb3JtOiBgJHt0aGlzLiRyb3V0ZS5wYXJhbXMuZGF0YWluc3RhbmNlfV9jcmVhdGlvbmAsXG4gICAgICAgICAgICAgICAgcmZvcm06IGAke3RoaXMuJHJvdXRlLnBhcmFtcy5kYXRhaW5zdGFuY2V9X3JlYWRgLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogMjAsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJSb3c6IDIsXG4gICAgICAgICAgICAgICAgZm9ybXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7dGhpcy4kcm91dGUucGFyYW1zLmRhdGFpbnN0YW5jZX1fZm9ybWAsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiAndHlwb2xvZ3knLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3NpbmdsZV9yZWFkJywge1xuICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5yZm9ybSxcbiAgICAgICAgICAgIHBhdGg6IHRoaXMuc3RhdGUucnBhdGgsXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgY29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmb3JtLmNvbnRlbnQgfHwgW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQubWFwKChjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGMubGFiZWwgPSB0aGlzLmxhbmcoYy5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICByZWFkQ29udGVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy50b19tYXRyaXgodGhpcy5jb250ZW50LCB0aGlzLnN0YXRlLml0ZW1zUGVyUm93KTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJob2x5LWdyYWlsLWNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGlzLWZsdWlkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj57e2xhbmcoJ2JfbGlzdF9kYXRhaW5zdGFuY2VzJyl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWZvcj1cInJvdyBpbiByZWFkQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJjb250ZW50IGluIHJvd1wiIGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJ1cGRhdGUoY29udGVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1yZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjb25maXJtYXRpb249XCJsYW5nKCdiX2FyZV9zdXJlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0d28tc3RlcHM9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwicmVtb3ZlKGNvbnRlbnQsICdkYXRhaW5zdGFuY2UnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhZ2luYXRvciBjbGFzcz1cInBhZ2luYXRpb24tcHVycGxlXCIgOnNraXA9XCIwXCIgOm51bWJlci1vZi1pdGVtcz1cImNvbnRlbnRMZW5ndGhcIiA6aXRlbXMtcGVyLXBhZ2U9XCJzdGF0ZS5pdGVtc1BlclBhZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+e3tsYW5nKCdiX2FkZF9kYXRhaW5zdGFuY2UnKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmZvcm0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJzdGF0ZS5jZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwb3N0X3BhdGg9XCJzdGF0ZS5wYXRoXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnB1dF9wYXRoPVwic3RhdGUucGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9wYXRoPVwic3RhdGUucnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfZm9ybT1cInN0YXRlLnJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGR5bmFtaWMtZm9ybSA6Zm9ybT1cImZvcm1zW2AkeyRyb3V0ZS5wYXJhbXMuZGF0YWluc3RhbmNlfV9mb3JtYF0gfHwge31cIiA6Y2Zvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zmb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vRGF0YWluc3RhbmNlJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vYXBpL3JvdXRlcycpO1xuY29uc3QgUmVhZGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvUmVhZGVyTWl4aW4nKTtcbmNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9taXhpbnMvTGFuZ01peGluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW1JlYWRlck1peGluLCBMYW5nTWl4aW5dLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2RhdGF0ZW1wbGF0ZScsICdQT1NUJyksXG4gICAgICAgICAgICAgICAgcnBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2RhdGF0ZW1wbGF0ZScsICdHRVQnKSxcbiAgICAgICAgICAgICAgICBjZm9ybTogJ2RhdGF0ZW1wbGF0ZV9jcmVhdGlvbicsXG4gICAgICAgICAgICAgICAgcmZvcm06ICdkYXRhdGVtcGxhdGVfcmVhZCcsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiAyMCxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclJvdzogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2luZ2xlX3JlYWQnLCB7XG4gICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLnJmb3JtLFxuICAgICAgICAgICAgcGF0aDogdGhpcy5zdGF0ZS5ycGF0aCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzZWFyY2gnLCB7XG4gICAgICAgICAgICBmb3JtOiAnZm9ybV9yZWFkJyxcbiAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2Zvcm0nLCAnUE9TVCcsIHRydWUpLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHByb2plY3Rpb246IFsnbGFiZWwnLCAnbmFtZSddLFxuICAgICAgICAgICAgICAgIHNpemU6IDEwMDAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBjb250ZW50KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5yZm9ybV07XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGZvcm0uY29udGVudCB8fCBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5tYXAoKGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYy5sYWJlbCA9IHRoaXMubGFuZyhjLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRDb250ZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnRvX21hdHJpeCh0aGlzLmNvbnRlbnQsIHRoaXMuc3RhdGUuaXRlbXNQZXJSb3cpO1xuICAgICAgICB9LFxuICAgICAgICBmb3JtcygpIHtcbiAgICAgICAgICAgIGlmICgnZm9ybV9yZWFkJyBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcy5mb3JtX3JlYWQuY29udGVudC5tYXAoKGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYy5sYWJlbCA9IHRoaXMubGFuZyhjLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1jb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBpcy1mbHVpZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+e3tsYW5nKCdiX2xpc3RfZGF0YXNvdXJjZXMnKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZm9yPVwicm93IGluIHJlYWRDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cImNvbnRlbnQgaW4gcm93XCIgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtYmx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInVwZGF0ZShjb250ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWN0aW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNvbmZpcm1hdGlvbj1cImxhbmcoJ2JfYXJlX3N1cmUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR3by1zdGVwcz1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJyZW1vdmUoY29udGVudCwgJ2RhdGF0ZW1wbGF0ZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtZ3JlZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0bz1cImAvYWRtaW4vZGF0YXNvdXJjZS8ke2NvbnRlbnQubmFtZX1gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1leWVcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2NvbnRlbnQubGFiZWx9fSAoe3tjb250ZW50Lm5hbWV9fSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGFnaW5hdG9yIGNsYXNzPVwicGFnaW5hdGlvbi1wdXJwbGVcIiA6c2tpcD1cIjBcIiA6bnVtYmVyLW9mLWl0ZW1zPVwiY29udGVudExlbmd0aFwiIDppdGVtcy1wZXItcGFnZT1cInN0YXRlLml0ZW1zUGVyUGFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj57e2xhbmcoJ2JfYWRkX2RhdGFzb3VyY2UnKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmZvcm0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJzdGF0ZS5jZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwb3N0X3BhdGg9XCJzdGF0ZS5wYXRoXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnB1dF9wYXRoPVwic3RhdGUucGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9wYXRoPVwic3RhdGUucnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfZm9ybT1cInN0YXRlLnJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCBuYW1lPVwibmFtZVwiIDpsYWJlbD1cImxhbmcoJ2JfbmFtZScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfbmFtZScpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IG5hbWU9XCJsYWJlbFwiIDpsYWJlbD1cImxhbmcoJ2JfbGFiZWwnKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX2xhYmVsJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgbmFtZT1cInR5cGVcIiA6bGFiZWw9XCJsYW5nKCdiX3R5cGUnKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX3R5cGUnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZzZWxlY3QgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImxhbmcoJ2JfZm9ybScpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppcy1yZXF1aXJlZD1cInRydWVcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJmb3Jtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZExhYmVsPVwibGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRWYWx1ZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmZvcm0+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9EYXRhc291cmNlJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vYXBpL3JvdXRlcycpO1xuY29uc3QgUmVhZGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvUmVhZGVyTWl4aW4nKTtcbmNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9taXhpbnMvTGFuZ01peGluJyk7XG5jb25zdCBGaWVsZFR5cGVzID0gcmVxdWlyZSgnLi4vLi4vbGlzdHMvZmllbGR0eXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtSZWFkZXJNaXhpbiwgTGFuZ01peGluXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdmb3JtJywgJ1BPU1QnKSxcbiAgICAgICAgICAgICAgICBycGF0aDogQVBJUm91dGVzLmVudGl0eSgnZm9ybScsICdHRVQnKSxcbiAgICAgICAgICAgICAgICBjZm9ybTogJ2Zvcm1fY3JlYXRpb24nLFxuICAgICAgICAgICAgICAgIHJmb3JtOiAnZm9ybV9yZWFkJyxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclBhZ2U6IDIwLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUm93OiAyLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkX3R5cGVzOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHR5cGVfY2hhbmdlKHZhbCwgaWR4KSB7XG4gICAgICAgICAgICBpZiAodmFsID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWR4IGluIHRoaXMuc3RhdGUuc2VsZWN0ZWRfdHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhdGUuc2VsZWN0ZWRfdHlwZXNbaWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJHNldCh0aGlzLnN0YXRlLnNlbGVjdGVkX3R5cGVzLCBpZHgsIHZhbC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2luZ2xlX3JlYWQnLCB7XG4gICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLnJmb3JtLFxuICAgICAgICAgICAgcGF0aDogdGhpcy5zdGF0ZS5ycGF0aCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzZWFyY2gnLCB7XG4gICAgICAgICAgICBmb3JtOiAnZGF0YXRlbXBsYXRlX3JlYWQnLFxuICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eSgnZGF0YXRlbXBsYXRlJywgJ1BPU1QnLCB0cnVlKSxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0aW9uOiBbJ2xhYmVsJywgJ25hbWUnXSxcbiAgICAgICAgICAgICAgICBzaXplOiAxMDAwMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgY29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmb3JtLmNvbnRlbnQgfHwgW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQubWFwKChjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGMubGFiZWwgPSB0aGlzLmxhbmcoYy5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIGMuZGVzY3JpcHRpb24gPSB0aGlzLmxhbmcoYy5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICByZWFkQ29udGVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy50b19tYXRyaXgodGhpcy5jb250ZW50LCB0aGlzLnN0YXRlLml0ZW1zUGVyUm93KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmllbGR0eXBlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBGaWVsZFR5cGVzLm1hcChmdCA9PiAoeyB2YWx1ZTogZnQudmFsdWUsIGxhYmVsOiB0aGlzLmxhbmcoZnQubGFiZWwpIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YXNvdXJjZXMoKSB7XG4gICAgICAgICAgICBpZiAoJ2RhdGF0ZW1wbGF0ZV9yZWFkJyBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcy5kYXRhdGVtcGxhdGVfcmVhZC5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5MaXN0IG9mIHVzZXJzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZm9yPVwicm93IGluIHJlYWRDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cImNvbnRlbnQgaW4gcm93XCIgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtYmx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInVwZGF0ZShjb250ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWN0aW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybWF0aW9uPVwiQXJlIHlvdSBzdXJlP1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR3by1zdGVwcz1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJyZW1vdmUoY29udGVudCwgJ29yZ2FuaXphdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tjb250ZW50LmxhYmVsfX0gKHt7Y29udGVudC5uYW1lfX0pIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhZ2luYXRvciBjbGFzcz1cInBhZ2luYXRpb24tcHVycGxlXCIgOnNraXA9XCIwXCIgOm51bWJlci1vZi1pdGVtcz1cImNvbnRlbnRMZW5ndGhcIiA6aXRlbXMtcGVyLXBhZ2U9XCJzdGF0ZS5pdGVtc1BlclBhZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPkFkZCBvciBtb2RpZnkgYSB1c2VyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmZvcm0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJzdGF0ZS5jZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwb3N0X3BhdGg9XCJzdGF0ZS5wYXRoXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnB1dF9wYXRoPVwic3RhdGUucGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9wYXRoPVwic3RhdGUucnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfZm9ybT1cInN0YXRlLnJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCBuYW1lPVwibmFtZVwiIDpsYWJlbD1cImxhbmcoJ2JfZm9ybV9uYW1lJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9mb3JtX25hbWUnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCBuYW1lPVwibGFiZWxcIiA6bGFiZWw9XCJsYW5nKCdiX2xhYmVsJylcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX2xhYmVsJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgbmFtZT1cImdyb3VwXCIgOmxhYmVsPVwibGFuZygnYl9ncm91cCcpXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9ncm91cCcpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IHJvd3M9XCI1XCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgOmxhYmVsPVwibGFuZygnYl9mb3JtX2Rlc2NyaXB0aW9uJylcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX2Zvcm1fZGVzY3JpcHRpb25fcGxhY2Vob2xkZXInKVwiIHR5cGU9XCJ0ZXh0YXJlYVwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJiZXIgOnRhYnM9XCJbbGFuZygnYl9maWVsZHMnLCB7fSwgJ290aGVyJyksIGxhbmcoJ2JfZm9ybV92YWxpZGF0aW9uJywge30sICdvdGhlcicpXVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInRhYnNcIiBzbG90LXNjb3BlPVwidHByb3BzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZnZhcmlhZGljLWVsZW1lbnQgbmFtZT1cImZpZWxkc1wiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiA6dGFicz1cInRydWVcIiB2LWlmPVwidHByb3BzLmlkID09PSAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJ2YXJpYWRpY1wiIHNsb3Qtc2NvcGU9XCJwcm9wc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9Lm5hbWVgXCIgOmxhYmVsPVwibGFuZygnYl9uYW1lJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9uYW1lJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9LmxhYmVsYFwiIDpsYWJlbD1cImxhbmcoJ2JfbGFiZWwnKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX2xhYmVsJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9Lm9yZGVyYFwiIDpsYWJlbD1cImxhbmcoJ2JfZmllbGRfb3JkZXInKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX2ZpZWxkX29yZGVyJylcIiB0eXBlPVwibnVtYmVyXCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0ubXVsdGlwbGVgXCIgOmxhYmVsPVwibGFuZygnYl9maWVsZF9tdWx0aXBsZScpXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9maWVsZF9tdWx0aXBsZScpXCIgdHlwZT1cImNoZWNrYm94XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0ubXVsdGlwbGVfbmFtZWBcIiA6bGFiZWw9XCJsYW5nKCdiX2ZpZWxkX211bHRpcGxlX25hbWUnKVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfZmllbGRfbXVsdGlwbGVfbmFtZScpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZzZWxlY3QgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS50eXBlYFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwibGFuZygnYl9maWVsZF90eXBlJylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppcy1yZXF1aXJlZD1cInRydWVcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwiZmllbGR0eXBlc1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1vbjpzZWxlY3QtY2hhbmdlPVwiKHZhbCkgPT4ge3R5cGVfY2hhbmdlKHZhbCwgcHJvcHMuaWQpfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cInByb3BzLmlkIGluIHN0YXRlLnNlbGVjdGVkX3R5cGVzXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwic3RhdGUuc2VsZWN0ZWRfdHlwZXNbcHJvcHMuaWRdID09PSAnc2VsZWN0J1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9LmRhdGFzb3VyY2UubmFtZWBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XCJsYW5nKCdiX2RhdGFzb3VyY2VfbmFtZScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJ0aGlzLmRhdGFzb3VyY2VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRMYWJlbD1cImxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRWYWx1ZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cIlsndGV4dCcsICdwaG9uZScsICdudW1iZXInLCAnZW1haWwnLCAncGFzc3dvcmQnXS5pbmRleE9mKHN0YXRlLnNlbGVjdGVkX3R5cGVzW3Byb3BzLmlkXSkgIT09IC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS5wbGFjZWhvbGRlcmBcIiA6bGFiZWw9XCJsYW5nKCdiX3BsYWNlaG9sZGVyJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9wbGFjZWhvbGRlcicpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWVsc2UtaWY9XCJbJ3N1YmZvcm0nXS5pbmRleE9mKHN0YXRlLnNlbGVjdGVkX3R5cGVzW3Byb3BzLmlkXSkgIT09IC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZzZWxlY3QgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0uc3ViZm9ybWBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XCJsYW5nKCdiX3N1YmZvcm0nKVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppcy1yZXF1aXJlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwiY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRMYWJlbD1cImxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZnZhcmlhZGljLWVsZW1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJ0cHJvcHMuaWQgPT09IDFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidmFsaWRhdGlvbnMucmVxdWlyZWRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XCJsYW5nKCdiX2Zvcm1fcmVxdWlyZWQnKVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cInN0YXRlLmNmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJiZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zmb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Gb3JtJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vYXBpL3JvdXRlcycpO1xuY29uc3QgUmVhZGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvUmVhZGVyTWl4aW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbUmVhZGVyTWl4aW5dLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWRcIj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Ib21lJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vYXBpL3JvdXRlcycpO1xuY29uc3QgUmVhZGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvUmVhZGVyTWl4aW4nKTtcbmNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9taXhpbnMvTGFuZ01peGluJyk7XG5jb25zdCBMYW5ncyA9IHJlcXVpcmUoJy4uLy4uL2xpc3RzL2xhbmdzJyk7XG5jb25zdCBRdWFudGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vbGlzdHMvcXVhbnRpdGllcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtSZWFkZXJNaXhpbiwgTGFuZ01peGluXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdsYW5nJywgJ1BPU1QnKSxcbiAgICAgICAgICAgICAgICBycGF0aDogQVBJUm91dGVzLmVudGl0eSgnbGFuZycsICdHRVQnKSxcbiAgICAgICAgICAgICAgICBjZm9ybTogJ2xhbmdfY3JlYXRpb24nLFxuICAgICAgICAgICAgICAgIHJmb3JtOiAnbGFuZ19yZWFkJyxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclBhZ2U6IDUwLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUm93OiAzLFxuICAgICAgICAgICAgICAgIGxhbmdzOiBMYW5ncy5MYW5nc0xpc3QsXG4gICAgICAgICAgICAgICAgcXVhbnRpdGllczogUXVhbnRpdGllcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2luZ2xlX3JlYWQnLCB7XG4gICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLnJmb3JtLFxuICAgICAgICAgICAgcGF0aDogdGhpcy5zdGF0ZS5ycGF0aCxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICByZWFkQ29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRpdGlvbnMgPSBmb3JtLmNvbnRlbnQucmVkdWNlKChvYmosIGluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8ubGFuZyBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtpbmZvLmxhbmddLnB1c2goaW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbaW5mby5sYW5nXSA9IFtpbmZvXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcblxuICAgICAgICAgICAgICAgIC8qIHJldHVybiBPYmplY3Qua2V5cyhwYXJ0aXRpb25zKS5yZWR1Y2UoKG9iaiwgbGFuZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvYmpbbGFuZ10gPSBVdGlscy50b19tYXRyaXgocGFydGl0aW9uc1tsYW5nXSwgdGhpcy5zdGF0ZS5pdGVtc1BlclJvdyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgfSwge30pOyovXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5MaXN0IG9mIGxhbmd1YWdlIGl0ZW1zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZm9yPVwicm93IGluIHJlYWRDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cImNvbnRlbnQgaW4gcm93XCIgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtYmx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInVwZGF0ZShjb250ZW50LCAnbGFuZycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wZW5jaWxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtYXRpb249XCJBcmUgeW91IHN1cmU/XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHdvLXN0ZXBzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInJlbW92ZShjb250ZW50LCAnbGFuZycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tjb250ZW50LmtleX19ICh7e2NvbnRlbnQubGFuZ319KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhZ2luYXRvciBjbGFzcz1cInBhZ2luYXRpb24tcHVycGxlXCIgOnNraXA9XCIwXCIgOm51bWJlci1vZi1pdGVtcz1cImNvbnRlbnRMZW5ndGhcIiA6aXRlbXMtcGVyLXBhZ2U9XCJzdGF0ZS5pdGVtc1BlclBhZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPkFkZCBvciBtb2RpZnkgYSBsYW5ndWFnZSBpdGVtPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmZvcm0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJzdGF0ZS5jZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwb3N0X3BhdGg9XCJzdGF0ZS5wYXRoXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnB1dF9wYXRoPVwic3RhdGUucGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9wYXRoPVwic3RhdGUucnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfZm9ybT1cInN0YXRlLnJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IG5hbWU9XCJrZXlcIiA6bGFiZWw9XCJsYW5nKCdiX2tleScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2Jfa2V5JylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgbmFtZT1cInBhcnRcIiA6bGFiZWw9XCJsYW5nKCdiX3BhcnRfb2Zfd2Vic2l0ZScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfcGFydF9vZl93ZWJzaXRlJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IG5hbWU9XCJsYW5nXCIgOmxhYmVsPVwibGFuZygnYl9sYW5nJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOm9wdGlvbnM9XCJzdGF0ZS5sYW5nc1wiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmdmFyaWFkaWMtZWxlbWVudCBuYW1lPVwidmFsdWVzXCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIDp0YWJzPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInZhcmlhZGljXCIgc2xvdC1zY29wZT1cInByb3BzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0udmFsdWVgXCIgOmxhYmVsPVwibGFuZygnYl90ZXh0JylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl90ZXh0X3RvX3Nob3cnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9LnF1YW50aXR5YFwiIDpsYWJlbD1cImxhbmcoJ2JfcXVhbnRpdHknKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6b3B0aW9ucz1cInN0YXRlLnF1YW50aXRpZXNcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Z2YXJpYWRpYy1lbGVtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vTGFuZycpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IFJlYWRlck1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL1JlYWRlck1peGluJyk7XG5jb25zdCBMYW5nTWl4aW4gPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vbWl4aW5zL0xhbmdNaXhpbicpO1xuY29uc3QgRmllbGRUeXBlcyA9IHJlcXVpcmUoJy4uLy4uL2xpc3RzL2ZpZWxkdHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbUmVhZGVyTWl4aW4sIExhbmdNaXhpbl0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eSgnZm9ybScsICdQT1NUJyksXG4gICAgICAgICAgICAgICAgcnBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2Zvcm0nLCAnR0VUJyksXG4gICAgICAgICAgICAgICAgY2Zvcm06ICdmb3JtX2NyZWF0aW9uJyxcbiAgICAgICAgICAgICAgICByZm9ybTogJ2Zvcm1fcmVhZCcsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiAyMCxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclJvdzogMixcbiAgICAgICAgICAgICAgICBzZWxlY3RlZF90eXBlczoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICB0eXBlX2NoYW5nZSh2YWwsIGlkeCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkeCBpbiB0aGlzLnN0YXRlLnNlbGVjdGVkX3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0YXRlLnNlbGVjdGVkX3R5cGVzW2lkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzZXQodGhpcy5zdGF0ZS5zZWxlY3RlZF90eXBlcywgaWR4LCB2YWwudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3NpbmdsZV9yZWFkJywge1xuICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5yZm9ybSxcbiAgICAgICAgICAgIHBhdGg6IHRoaXMuc3RhdGUucnBhdGgsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2VhcmNoJywge1xuICAgICAgICAgICAgZm9ybTogJ2RhdGF0ZW1wbGF0ZV9yZWFkJyxcbiAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2RhdGF0ZW1wbGF0ZScsICdQT1NUJywgdHJ1ZSksXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcHJvamVjdGlvbjogWydsYWJlbCcsICduYW1lJ10sXG4gICAgICAgICAgICAgICAgc2l6ZTogMTAwMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGNvbnRlbnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gZm9ybS5jb250ZW50IHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50Lm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjLmxhYmVsID0gdGhpcy5sYW5nKGMubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICBjLmRlc2NyaXB0aW9uID0gdGhpcy5sYW5nKGMuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZENvbnRlbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMudG9fbWF0cml4KHRoaXMuY29udGVudCwgdGhpcy5zdGF0ZS5pdGVtc1BlclJvdyk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpZWxkdHlwZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gRmllbGRUeXBlcy5tYXAoZnQgPT4gKHsgdmFsdWU6IGZ0LnZhbHVlLCBsYWJlbDogdGhpcy5sYW5nKGZ0LmxhYmVsKSB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFzb3VyY2VzKCkge1xuICAgICAgICAgICAgaWYgKCdkYXRhdGVtcGxhdGVfcmVhZCcgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMuZGF0YXRlbXBsYXRlX3JlYWQuY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJob2x5LWdyYWlsLWNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGlzLWZsdWlkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+IFxuICAgIDwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL01lbnUnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgVnVlID0gcmVxdWlyZSgndnVlJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vYXBpL3JvdXRlcycpO1xuY29uc3QgTWVzc2FnZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vYXBpL21lc3NhZ2VzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgdXBkYXRlKG9iaiwgZW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuQ0FOQ0VMX0ZPUk0sIHtcbiAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLmNmb3JtLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFZ1ZS5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLlVQREFURV9NT0RFX0ZPUk0sIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5jZm9ybSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBvYmosXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlKG9iaiwgZW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgncmVtb3ZlJywge1xuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eShlbnRpdHksICdERUwnLCBmYWxzZSwgb2JqLl9pZCksXG4gICAgICAgICAgICAgICAgcnBhdGg6IHRoaXMuc3RhdGUucnBhdGgsXG4gICAgICAgICAgICAgICAgcmZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGJlZm9yZU1vdW50KCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuQ1JFQVRFX0ZPUk0sIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICBjb250ZW50OiBbXSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBlcnJvcigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmNvbnRlbnQgfHwgW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnRMZW5ndGgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50Lmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICAgIGVycm9yKG4pIHtcbiAgICAgICAgICAgIGlmIChuICYmIE9iamVjdC5rZXlzKG4pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG4uY29udGVudC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyB0b2FzdHIuZXJyb3Iobi5jb250ZW50Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IEFQSVJvdXRlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9hcGkvcm91dGVzJyk7XG5jb25zdCBSZWFkZXJNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9SZWFkZXJNaXhpbicpO1xuY29uc3QgTGFuZ01peGluID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL21peGlucy9MYW5nTWl4aW4nKTtcbmNvbnN0IEZvcm1NaXhpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9taXhpbnMvRm9ybU1peGluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW1JlYWRlck1peGluLCBMYW5nTWl4aW4sIEZvcm1NaXhpbl0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eSgndXNlcicsICdQT1NUJyksXG4gICAgICAgICAgICAgICAgcnBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ3VzZXInLCAnR0VUJyksXG4gICAgICAgICAgICAgICAgY2Zvcm06ICd1c2VyX2NyZWF0aW9uJyxcbiAgICAgICAgICAgICAgICByZm9ybTogJ3VzZXJfcmVhZCcsXG4gICAgICAgICAgICAgICAgZm9ybXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Zvcm1fcmVhZCcsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiAndXNlcicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclBhZ2U6IDIwLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUm93OiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzaW5nbGVfcmVhZCcsIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICBwYXRoOiB0aGlzLnN0YXRlLnJwYXRoLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIHJlYWRDb250ZW50KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5yZm9ybV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnRvX21hdHJpeChmb3JtLmNvbnRlbnQgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNvbnRlbnQgOiBbXSwgdGhpcy5zdGF0ZS5pdGVtc1BlclJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnRMZW5ndGgoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jb250ZW50Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5MaXN0IG9mIHVzZXJzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZm9yPVwicm93IGluIHJlYWRDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cImNvbnRlbnQgaW4gcm93XCIgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtYmx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInVwZGF0ZShjb250ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWN0aW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybWF0aW9uPVwiQXJlIHlvdSBzdXJlP1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR3by1zdGVwcz1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJyZW1vdmUoY29udGVudCwgJ29yZ2FuaXphdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tjb250ZW50LmZpcnN0bmFtZX19IHt7Y29udGVudC5sYXN0bmFtZX19IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhZ2luYXRvciBjbGFzcz1cInBhZ2luYXRpb24tcHVycGxlXCIgOnNraXA9XCIwXCIgOm51bWJlci1vZi1pdGVtcz1cImNvbnRlbnRMZW5ndGhcIiA6aXRlbXMtcGVyLXBhZ2U9XCJzdGF0ZS5pdGVtc1BlclBhZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPkFkZCBvciBtb2RpZnkgYSB1c2VyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwiT2JqZWN0LmtleXMoZm9ybXMpLmxlbmd0aCA+IDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cG9zdF9wYXRoPVwic3RhdGUucGF0aFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwdXRfcGF0aD1cInN0YXRlLnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfcGF0aD1cInN0YXRlLnJwYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X2Zvcm09XCJzdGF0ZS5yZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZHluYW1pYy1mb3JtIDpmb3JtPVwiZm9ybXNbJ3VzZXJfZm9ybSddIHx8IHt9XCIgOmNmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vVXNlcicpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmNvbnN0IFZ1ZSA9IHJlcXVpcmUoJ3Z1ZScpO1xuY29uc3QgUm91dGVyID0gcmVxdWlyZSgndnVlLXJvdXRlcicpO1xuY29uc3QgSGVhZGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RoZW1lcy9pbmVkL3BhcnRzL2hlYWRlci9IZWFkZXIudnVlJyk7XG5jb25zdCBGb290ZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvcGFydHMvZm9vdGVyL0Zvb3Rlci52dWUnKTtcbmNvbnN0IE5hdmJhciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9wYXJ0cy9uYXZiYXIvTmF2YmFyLnZ1ZScpO1xuY29uc3QgTWVudXMgPSByZXF1aXJlKCcuL21lbnVzJyk7XG5cblZ1ZS51c2UoUm91dGVyKTtcblxuY29uc3QgbWVudV9yb3V0ZXMgPSBfLmZsYXR0ZW4oTWVudXMubWVudSkubWFwKG1lbnUgPT4gKHtcbiAgICBwYXRoOiBtZW51LnJvdXRlc1swXSxcbiAgICBuYW1lOiBtZW51LmtleSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIGhlYWRlcjogSGVhZGVyLFxuICAgICAgICBmb290ZXI6IEZvb3RlcixcbiAgICAgICAgbmF2YmFyOiBOYXZiYXIsXG4gICAgICAgIGRlZmF1bHQ6IG1lbnUuY29tcG9uZW50LFxuICAgIH0sXG4gICAgcHJvcHM6IHsgbmF2YmFyOiB7IG1lbnVzOiBNZW51cy5tZW51IH0gfSxcbn0pKTtcblxuY29uc3Qgb3RoZXJfcm91dGVzID0gTWVudXMub3RoZXIubWFwKG1lbnUgPT4gKHtcbiAgICBwYXRoOiBtZW51LnJvdXRlc1swXSxcbiAgICBuYW1lOiBtZW51LmtleSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIGhlYWRlcjogSGVhZGVyLFxuICAgICAgICBmb290ZXI6IEZvb3RlcixcbiAgICAgICAgbmF2YmFyOiBOYXZiYXIsXG4gICAgICAgIGRlZmF1bHQ6IG1lbnUuY29tcG9uZW50LFxuICAgIH0sXG4gICAgcHJvcHM6IHsgbmF2YmFyOiB7IG1lbnVzOiBNZW51cy5tZW51IH0gfSxcbn0pKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUm91dGVyKHtcbiAgICBtb2RlOiAnaGlzdG9yeScsXG4gICAgcm91dGVzOiBbLi4ubWVudV9yb3V0ZXMsIC4uLm90aGVyX3JvdXRlc10sXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFkbWluOiAnL2FkbWluJyxcbiAgICB1c2VyOiAnL2FkbWluL3VzZXInLFxuICAgIHJldmlldzogJy9hZG1pbi9yZXZpZXcnLFxuICAgIGRhdGFzb3VyY2U6ICcvYWRtaW4vZGF0YXNvdXJjZScsXG4gICAgZGF0YWluc3RhbmNlOiAnL2FkbWluL2RhdGFzb3VyY2UvOmRhdGFpbnN0YW5jZScsXG4gICAgcHVibGljYXRpb246ICcvYWRtaW4vcHVibGljYXRpb24nLFxuICAgIGNzbDogJy9hZG1pbi9jc2wnLFxuICAgIGZvcm06ICcvYWRtaW4vZm9ybScsXG4gICAgbWVudTogJy9hZG1pbi9tZW51JyxcbiAgICBsYW5nOiAnL2FkbWluL2xhbmcnLFxuICAgIGV4dGVybmFsX3JlcG86ICcvYWRtaW4vZXh0ZXJuYWxfcmVwb3NpdG9yeScsXG4gICAgZXhwb3J0X2Zvcm1hdDogJy9hZG1pbi9leHBvcnRfZm9ybWF0JyxcbiAgICBoYW5kbGVfaWQ6ICcvYWRtaW4vaGFuZGxlX2lkJyxcbiAgICBhcGk6ICcvYWRtaW4vYXBpJyxcbiAgICBjb25maWc6ICcvYWRtaW4vY29uZmlnJyxcbn07XG4iLCJjb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnc3VwZXJhZ2VudCcpO1xuY29uc3QgTWVzc2FnZXMgPSByZXF1aXJlKCcuL21lc3NhZ2VzJyk7XG5cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2gob2JqZWN0KSB7XG4gICAgY29uc3QgeyBtZXRob2QsIHBhdGgsIGJvZHksIGNvbW1pdCB9ID0gb2JqZWN0O1xuXG4gICAgbGV0IHN1cGVyX3JlcXVlc3QgPSBSZXF1ZXN0W21ldGhvZC50b0xvd2VyQ2FzZSgpXShwYXRoKVxuICAgICAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgJ2JmYTNlODAzLTIxN2UtNGYwMC05N2VkLTVmNjQxNzQ2NDQ4NE4xYS1GbUt0Vzp0ZXN0Jyk7XG4gICAgaWYgKGJvZHkgIT0gbnVsbCAmJiBPYmplY3Qua2V5cyhib2R5KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN1cGVyX3JlcXVlc3QgPSBzdXBlcl9yZXF1ZXN0LnNlbmQob2JqZWN0LmJvZHkpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHN1cGVyX3JlcXVlc3Q7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlcy5TVUNDRVNTLFxuICAgICAgICAgICAgY29udGVudDogcmVzLmJvZHksXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlcy5GQUlMVVJFLFxuICAgICAgICAgICAgY29udGVudDogZXJyLnJlc3BvbnNlICE9IG51bGwgPyBlcnIucmVzcG9uc2UuYm9keSA6IGVycixcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZldGNoLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIExPQURJTkc6ICdsb2FkaW5nJyxcbiAgICBTVUNDRVNTOiAnc3VjY2VzcycsXG4gICAgRkFJTFVSRTogJ2ZhaWx1cmUnLFxuICAgIEZFVENIOiAnZmV0Y2gnLFxuICAgIEVSUk9SOiAnZXJyb3InLFxuICAgIENSRUFURV9GT1JNOiAnY3JlYXRlX2Zvcm0nLFxuICAgIENBTkNFTF9GT1JNOiAnY2FuY2VsX2Zvcm0nLFxuICAgIFJFTU9WRV9GT1JNOiAncmVtb3ZlX2Zvcm0nLFxuICAgIFJFTU9WRV9BTExfRk9STVM6ICdyZW1vdmVfYWxsX2Zvcm1zJyxcbiAgICBVUERBVEVfTU9ERV9GT1JNOiAndXBkYXRlX21vZGVfZm9ybScsXG4gICAgVE9HR0xFX1JFQ0xBSU1fRk9STTogJ3RvZ2dsZV9yZWNsYWltX2Zvcm0nLFxuICAgIFJFQ0xBSU1fRk9STV9FTEVNRU5UOiAncmVjbGFpbV9mb3JtX2VsZW1lbnQnLFxuICAgIEFERF9UT19GT1JNX1BPT0w6ICdhZGRfdG9fZm9ybV9wb29sJyxcbiAgICBSRU1PVkVfRlJPTV9GT1JNX1BPT0w6ICdyZW1vdmVfZnJvbV9mb3JtX3Bvb2wnLFxufTtcbiIsImNvbnN0IENvbmZpZyA9IHJlcXVpcmUoJy4uLy4uLy4uL2FwcC9jb25maWcnKTtcblxuY29uc3QgcHJlZml4ID0gYCR7Q29uZmlnLmFwaS5wdWJsaWMucHJlZml4fS8ke0NvbmZpZy5hcGkucHVibGljLnZlcnNpb259YDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZW50aXR5KGVudGl0eSwgbWV0aG9kLCBzZWFyY2ggPSBmYWxzZSwgaWQgPSBudWxsKSB7XG4gICAgICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgIGNhc2UgJ0dFVCc6IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSBgJHtwcmVmaXh9LyR7ZW50aXR5fWA7XG4gICAgICAgICAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHVybCArPSAncyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1BPU1QnOiB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0vJHtlbnRpdHl9cy9zZWFyY2hgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0vJHtlbnRpdHl9YDtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdQVVQnOlxuICAgICAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0vJHtlbnRpdHl9YDtcbiAgICAgICAgY2FzZSAnREVMJzpcbiAgICAgICAgICAgIHJldHVybiBgJHtwcmVmaXh9LyR7ZW50aXR5fS8ke2lkfWA7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbiIsImNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL21peGlucy9MYW5nTWl4aW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbTGFuZ01peGluXSxcbiAgICBwcm9wczoge1xuICAgICAgICBmb3JtOiB7IHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgIGNmb3JtOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICAgICAgcHJlZml4OiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJycgfSxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgZ2V0X25hbWUobmFtZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlZml4ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnByZWZpeH0uJHtuYW1lfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiZmllbGRcIj5cbiAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwiZmllbGQgaW4gZm9ybS5maWVsZHNcIj5cbiAgICAgICAgICAgIDxmdmFyaWFkaWMtZWxlbWVudCBjbGFzcz1cImZpZWxkXCIgOm5hbWU9XCJmaWVsZC5tdWx0aXBsZV9uYW1lXCIgOmZvcm09XCJjZm9ybVwiIHYtaWY9XCJmaWVsZC5tdWx0aXBsZVwiPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwidmFyaWFkaWNcIiBzbG90LXNjb3BlPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdi1pZj1cIlsnY2hlY2tib3gnLCAncmFkaW8nLCAndGV4dCcsICdlbWFpbCcsICdwaG9uZScsICdwYXNzd29yZCcsICdudW1iZXInLCAndGV4dGFyZWEnXS5pbmRleE9mKGZpZWxkLnR5cGUpICE9PSAtMVwiXG4gICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImxhbmcoZmllbGQubGFiZWwgfHwgJycpXCJcbiAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJnZXRfbmFtZShgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0uJHtmaWVsZC5uYW1lfWApXCJcbiAgICAgICAgICAgICAgICAgICAgOnBsYWNlaG9sZGVyPVwibGFuZyhmaWVsZC5wbGFjZWhvbGRlciB8fCAnJylcIlxuICAgICAgICAgICAgICAgICAgICA6dHlwZT1cImZpZWxkLnR5cGVcIlxuICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cImNmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGR5bmFtaWMtZm9ybSBcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZmllbGQuc3ViZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgOmNmb3JtPVwiY2Zvcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgOnByZWZpeD1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfWBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1lbHNlLWlmPVwiZmllbGQudHlwZSA9PT0gJ3N1YmZvcm0nICYmIGZpZWxkLnN1YmZvcm0gIT0gbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC9keW5hbWljLWZvcm0+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZnZhcmlhZGljLWVsZW1lbnQ+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgIDxmaW5wdXQgXG4gICAgICAgICAgICAgICAgdi1pZj1cIlsnY2hlY2tib3gnLCAncmFkaW8nLCAndGV4dCcsICdlbWFpbCcsICdwaG9uZScsICdwYXNzd29yZCcsICdudW1iZXInLCAndGV4dGFyZWEnXS5pbmRleE9mKGZpZWxkLnR5cGUpICE9PSAtMVwiXG4gICAgICAgICAgICAgICAgOmxhYmVsPVwibGFuZyhmaWVsZC5sYWJlbCB8fCAnJylcIlxuICAgICAgICAgICAgICAgIDpuYW1lPVwiZ2V0X25hbWUoZmllbGQubmFtZSwgbnVsbClcIlxuICAgICAgICAgICAgICAgIDpwbGFjZWhvbGRlcj1cImxhbmcoZmllbGQucGxhY2Vob2xkZXIgfHwgJycpXCJcbiAgICAgICAgICAgICAgICA6dHlwZT1cImZpZWxkLnR5cGVcIlxuICAgICAgICAgICAgICAgIDpmb3JtPVwiY2Zvcm1cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGR5bmFtaWMtZm9ybSBcbiAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmaWVsZC5zdWJmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgIDpjZm9ybT1cImNmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgdi1lbHNlLWlmPVwiZmllbGQudHlwZSA9PT0gJ3N1YmZvcm0nICYmIGZpZWxkLnN1YmZvcm0gIT0gbnVsbFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwvZHluYW1pYy1mb3JtPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0R5bmFtaWNGb3JtJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vYXBpL21lc3NhZ2VzJyk7XG5jb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBJbnB1dE1peGluID0gcmVxdWlyZSgnLi4vLi4vbWl4aW5zL0lucHV0TWl4aW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbSW5wdXRNaXhpbl0sXG4gICAgcHJvcHM6IHtcbiAgICAgICAgbmFtZTogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIGxhYmVsOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICBpc1JlcXVpcmVkOiB7IGRlZmF1bHQ6IGZhbHNlLCB0eXBlOiBCb29sZWFuIH0sXG4gICAgICAgIHR5cGU6IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICByZWFkOiB7IGRlZmF1bHQ6IGZhbHNlLCB0eXBlOiBCb29sZWFuIH0sXG4gICAgICAgIGhpZGRlbjogeyBkZWZhdWx0OiBmYWxzZSwgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgICBmb3JtOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgcm93czogeyBkZWZhdWx0OiAxMCB9LFxuICAgICAgICByYWRpb0J1dHRvbnM6IHsgZGVmYXVsdDogKCkgPT4gW10sIHR5cGU6IEFycmF5IH0sXG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmRlZmF1bHRWYWx1ZSgpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5mb3JtXTtcbiAgICAgICAgICAgIGlmIChmb3JtLnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudmFsdWUgPSBVdGlscy5maW5kX3ZhbHVlX3dpdGhfcGF0aChmb3JtLmNvbnRlbnQsIHRoaXMubmFtZS5zcGxpdCgnLicpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdjaGVja2JveCcgfHwgdGhpcy50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgcmVjbGFpbShuKSB7XG4gICAgICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChNZXNzYWdlcy5SRUNMQUlNX0ZPUk1fRUxFTUVOVCwge1xuICAgICAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLmZvcm0sXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaW5mbzogdGhpcy5zdGF0ZS52YWx1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKG4pIHtcbiAgICAgICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImZpZWxkXCJcbiAgICB2LWlmPVwidHlwZSA9PT0gJ3RleHQnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8IHR5cGUgPT09ICdwYXNzd29yZCcgfHwgdHlwZSA9PT0gJ2VtYWlsJ1wiXG4gICAgPlxuICAgIDxsYWJlbCA6Zm9yPVwibmFtZVwiPnt7bGFiZWx9fTxzcGFuIHYtaWY9XCJpc1JlcXVpcmVkXCIgY2xhc3M9XCJyZWRpZnlcIj4qPC9zcGFuPjwvbGFiZWw+XG4gICAgPGlucHV0IHYtaWY9XCJ0eXBlID09PSAndGV4dCdcIiBcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiXG4gICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICB2LW1vZGVsPVwic3RhdGUudmFsdWVcIlxuICAgIC8+XG4gICAgPGlucHV0IHYtZWxzZS1pZj1cInR5cGUgPT09ICdudW1iZXInXCIgXG4gICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiXG4gICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICB2LW1vZGVsPVwic3RhdGUudmFsdWVcIlxuICAgIC8+XG4gICAgPGlucHV0IHYtZWxzZS1pZj1cInR5cGUgPT09ICdwYXNzd29yZCdcIiBcbiAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgdi1tb2RlbD1cInN0YXRlLnZhbHVlXCJcbiAgICAvPlxuICAgIDxpbnB1dCB2LWVsc2UgXG4gICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgIHYtbW9kZWw9XCJzdGF0ZS52YWx1ZVwiXG4gICAgLz5cbiAgICA8ZGl2IHYtaWY9XCJ2YWxpZGF0aW9ucy5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxwIHYtZm9yPVwidGV4dCBpbiB2YWxpZGF0aW9uc1wiIGNsYXNzPVwicmVkaWZ5IGlubGluZS1ibG9ja1wiPlxuICAgICAgICAgICAge3t0ZXh0fX1cbiAgICAgICAgPC9wPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgdi1lbHNlLWlmPVwidHlwZSA9PT0gJ3RleHRhcmVhJ1wiIGNsYXNzPVwiZmllbGRcIj5cbiAgICA8bGFiZWwgZm9yPVwibmFtZVwiPnt7bGFiZWx9fTxzcGFuIHYtaWY9XCJpc1JlcXVpcmVkXCIgY2xhc3M9XCJyZWRpZnlcIj4qPC9zcGFuPjwvbGFiZWw+XG4gICAgPHRleHRhcmVhXG4gICAgICAgIGNsYXNzPVwiaW5wdXQgdGV4dGFyZWFcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiXG4gICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIDpyb3dzPVwicm93c1wiXG4gICAgICAgIHYtbW9kZWw9XCJzdGF0ZS52YWx1ZVwiXG4gICAgLz5cbjwvZGl2PlxuXG48ZGl2IHYtZWxzZS1pZj1cInR5cGUgPT09ICdyYWRpbydcIiBjbGFzcz1cImZpZWxkXCI+XG4gICAgPGxhYmVsIDpmb3I9XCJuYW1lXCI+e3tsYWJlbH08c3BhbiB2LWlmPVwiaXNSZXF1aXJlZFwiIGNsYXNzPVwicmVkaWZ5XCI+Kjwvc3Bhbj48L2xhYmVsPlxuICAgIDxkaXY+XG4gICAgICAgIDxsYWJlbCB2LWZvcj1cIihidG4sIGlkeCkgaW4gcmFkaW9CdXR0b25zXCIgY2xhc3M9XCJyYWRpby1pbmxpbmVcIiBmb3I9XCJidG5bMF1cIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwic3RhdGUudmFsdWVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHt7YnRuWzFdfX1cbiAgICAgICAgPC9sYWJlbD5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG5cbjxkaXYgdi1lbHNlLWlmPVwidHlwZSA9PT0gJ2NoZWNrYm94J1wiIGNsYXNzPVwiY2hlY2tib3hcIj5cbiAgICA8bGFiZWwgOmZvcj1cIm5hbWVcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIHYtbW9kZWw9XCJzdGF0ZS52YWx1ZVwiXG4gICAgICAgIC8+XG4gICAgICAgIHt7bGFiZWx9fVxuICAgIDwvbGFiZWw+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0lucHV0Jyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IFZTZWxlY3QgPSByZXF1aXJlKCd2dWUtc2VsZWN0JykuVnVlU2VsZWN0O1xuY29uc3QgSW5wdXRNaXhpbiA9IHJlcXVpcmUoJy4uLy4uL21peGlucy9JbnB1dE1peGluJyk7XG5jb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBNZXNzYWdlcyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uLy4uL2FwaS9tZXNzYWdlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgICBuYW1lOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgbGFiZWw6IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICBpc1JlcXVpcmVkOiB7IGRlZmF1bHQ6IGZhbHNlLCB0eXBlOiBCb29sZWFuIH0sXG4gICAgICAgIGZvcm06IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICBtdWx0aTogeyBkZWZhdWx0OiBmYWxzZSwgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgICBvcHRpb25zOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBBcnJheSB9LFxuICAgICAgICBmaWVsZExhYmVsOiB7IHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdDogJ2xhYmVsJywgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIGZpZWxkVmFsdWU6IHsgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiAndmFsdWUnLCB0eXBlOiBTdHJpbmcgfSxcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgJ3Ytc2VsZWN0JzogVlNlbGVjdCxcbiAgICB9LFxuICAgIG1peGluczogW0lucHV0TWl4aW5dLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgdXBkYXRlKCkge1xuICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuZm9ybV07XG4gICAgICAgICAgICBpZiAoZm9ybS51cGRhdGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IFV0aWxzLmZpbmRfdmFsdWVfd2l0aF9wYXRoKGZvcm0uY29udGVudCwgdGhpcy5uYW1lLnNwbGl0KCcuJykpO1xuICAgICAgICAgICAgICAgIGlmIChpbmZvID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm9vcFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5mbyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm8gPSBpbmZvLm1hcCgobykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRMYWJlbCBpbiBvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW5nID0gdGhpcy5vcHRpb25zLmZpbHRlcihvcCA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bdGhpcy5maWVsZFZhbHVlXSA9PT0gb3BbdGhpcy5maWVsZFZhbHVlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWlzc2luZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb1t0aGlzLmZpZWxkTGFiZWxdID0gbWlzc2luZ1swXVt0aGlzLmZpZWxkTGFiZWxdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pLmZpbHRlcihvID0+IG8gIT0gbnVsbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5mbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PiBpbmZvID09PSBvW3RoaXMuZmllbGRWYWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWlzc2luZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0geyBbdGhpcy5maWVsZFZhbHVlXTogaW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5maWVsZExhYmVsXTogbWlzc2luZ1swXVt0aGlzLmZpZWxkTGFiZWxdIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmcgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKG8gPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm9bdGhpcy5maWVsZFZhbHVlXSA9PT0gb1t0aGlzLmZpZWxkVmFsdWVdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pc3NpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHsgW3RoaXMuZmllbGRWYWx1ZV06IGluZm8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMuZmllbGRMYWJlbF06IG1pc3NpbmdbMF1bdGhpcy5maWVsZExhYmVsXSB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9IGluZm87XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2hhbmdlKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdC1jaGFuZ2UnLCB2YWwpO1xuICAgICAgICB9LFxuICAgICAgICBleHRyYWN0X3ZhbHVlcyhpbmZvcykge1xuICAgICAgICAgICAgaWYgKGluZm9zID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZm9zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5mb3MubWFwKG8gPT4gby52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5mb3MudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1hdF9vcHRpb25zKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRWYWx1ZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zID0gdGhpcy5vcHRpb25zLm1hcChvID0+XG4gICAgICAgICAgICAgICAgKHsgbGFiZWw6IG9bdGhpcy5maWVsZExhYmVsXSwgdmFsdWU6IG9bdGhpcy5maWVsZFZhbHVlXSB9KSk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICByZWNsYWltKG4pIHtcbiAgICAgICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLlJFQ0xBSU1fRk9STV9FTEVNRU5ULCB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm06IHRoaXMuZm9ybSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBpbmZvOiB0aGlzLmV4dHJhY3RfdmFsdWVzKHRoaXMuc3RhdGUuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwobikge1xuICAgICAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9ucygpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0X29wdGlvbnMoKTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGJlZm9yZU1vdW50KCkge1xuICAgICAgICB0aGlzLmZvcm1hdF9vcHRpb25zKCk7XG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiZmllbGRcIj5cbiAgICA8bGFiZWwgOmZvcj1cIm5hbWVcIj57e2xhYmVsfX08c3BhbiB2LWlmPVwiaXNSZXF1aXJlZFwiIGNsYXNzPVwicmVkaWZ5XCI+Kjwvc3Bhbj48L2xhYmVsPlxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgIDx2LXNlbGVjdFxuICAgICAgICAgICAgOm11bHRpcGxlPVwibXVsdGlcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0ZS5vcHRpb25zXCJcbiAgICAgICAgICAgIDpsYWJlbD1cImZpZWxkTGFiZWxcIlxuICAgICAgICAgICAgOm9uLWNoYW5nZT1cIm9uQ2hhbmdlXCJcbiAgICAgICAgICAgIDp2YWx1ZT1cInN0YXRlLnNlbGVjdGVkXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICA+XG4gICAgICAgIDwvdi1zZWxlY3Q+XG4gICAgPC9kaXY+IFxuICAgIDxkaXYgdi1pZj1cInZhbGlkYXRpb25zLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPHAgdi1mb3I9XCJ0ZXh0IGluIHZhbGlkYXRpb25zXCIgY2xhc3M9XCJyZWRpZnkgaW5saW5lLWJsb2NrXCI+XG4gICAgICAgICAgICB7e3RleHR9fVxuICAgICAgICA8L3A+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vU2VsZWN0Jyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vYXBpL21lc3NhZ2VzJyk7XG5jb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBJbnB1dE1peGluID0gcmVxdWlyZSgnLi4vLi4vbWl4aW5zL0lucHV0TWl4aW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbSW5wdXRNaXhpbl0sXG4gICAgcHJvcHM6IHtcbiAgICAgICAgbmFtZTogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIGZvcm06IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICBhcnJheTogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB0cnVlIH0sXG4gICAgICAgIGlzUmVxdWlyZWQ6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogdHJ1ZSB9LFxuICAgICAgICB0YWJzOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBbXSxcbiAgICAgICAgICAgICAgICB0YWJfYWN0aXZlOiB0aGlzLmlzUmVxdWlyZWQgPyAwIDogLTEsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGFjdGl2YXRlX3RhYihpZCwgZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS50YWJfYWN0aXZlID0gaWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmVsZW1lbnRzLnB1c2godHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZShpZCwgZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5lbGVtZW50cy5zcGxpY2UoaWQsIDEsIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlKCkge1xuICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuZm9ybV07XG4gICAgICAgICAgICBpZiAoZm9ybS51cGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmplY3QgPSBVdGlscy5maW5kX3ZhbHVlX3dpdGhfcGF0aChmb3JtLmNvbnRlbnQsIHRoaXMubmFtZS5zcGxpdCgnLicpKTtcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5lbGVtZW50cyA9IG9iamVjdC5tYXAoKCkgPT4gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5lbGVtZW50cyA9IF8ubWFwKG9iamVjdCwgKCkgPT4gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVsZW1lbnRzID0gdGhpcy5pc1JlcXVpcmVkID8gW3RydWVdIDogW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgfSxcblxuICAgIHdhdGNoOiB7XG4gICAgICAgIHJlY2xhaW0obikge1xuICAgICAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuUkVDTEFJTV9GT1JNX0VMRU1FTlQsIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogdGhpcy5mb3JtLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGluZm86IHRoaXMuc3RhdGUudmFsdWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbChuKSB7XG4gICAgICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtbWFyZ2lubGVzc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy1wYWRkaW5nbGVzc1wiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9JyMnIGNsYXNzPVwiaWNvbiBoYXMtdGV4dC1zdWNjZXNzXCIgQGNsaWNrPVwiYWRkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGx1c1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCIgdi1pZj1cInRhYnMgJiYgc3RhdGUuZWxlbWVudHMubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy0xXCI+XG4gICAgICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoc2hvdywgaWR4KSBpbiBzdGF0ZS5lbGVtZW50c1wiIFxuICAgICAgICAgICAgICAgICAgICB2LWlmPVwic2hvd1wiIFxuICAgICAgICAgICAgICAgICAgICA6a2V5PVwiaWR4XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxhIEBjbGljaz1cImFjdGl2YXRlX3RhYihpZHgsICRldmVudClcIiA6Y2xhc3M9XCJgJHtzdGF0ZS50YWJfYWN0aXZlID09PSBpZHggPyAnaXMtc3VjY2Vzcyc6ICcnfSBidXR0b24gaXMtc21hbGxgXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2lkeCsxfX0gXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj0nIycgY2xhc3M9XCJpY29uIGlzLXNtYWxsIGhhcy10ZXh0LWRhbmdlclwiIEBjbGljaz1cInJlbW92ZShpZHgsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgIHYtZm9yPVwiKHNob3csIGlkeCkgaW4gc3RhdGUuZWxlbWVudHNcIiBcbiAgICAgICAgICAgICAgICB2LWlmPVwic2hvd1wiXG4gICAgICAgICAgICAgICAgdi1zaG93PVwic3RhdGUudGFiX2FjdGl2ZSA9PT0gaWR4XCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiaWR4XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzbG90IFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInZhcmlhZGljXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCJpZHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmZuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiB2LWVsc2UtaWY9XCIhdGFicyAmJiBzdGF0ZS5lbGVtZW50cy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwiKHNob3csIGlkeCkgaW4gc3RhdGUuZWxlbWVudHNcIiBjbGFzcz1cImNvbHVtbnNcIiB2LWlmPVwic2hvd1wiIDprZXk9XCJpZHhcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpcy1wdWxsZWQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JyMnIGNsYXNzPVwiaWNvbiBoYXMtdGV4dC1kYW5nZXJcIiBAY2xpY2s9XCJyZW1vdmUoaWR4LCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzbG90IFxuICAgICAgICAgICAgICAgICAgICBuYW1lPVwidmFyaWFkaWNcIiBcbiAgICAgICAgICAgICAgICAgICAgOmlkPVwiaWR4XCJcbiAgICAgICAgICAgICAgICAgICAgOmZuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL1ZhcmlhZGljRWxlbWVudCcpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBNZXNzYWdlcyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2FwaS9tZXNzYWdlcycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vYXBpL3JvdXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgICBuYW1lOiB7IGRlZmF1bHQ6ICdkZWZhdWx0X2Zvcm0nIH0sXG4gICAgICAgIHBvc3RfcGF0aDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgIHB1dF9wYXRoOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICAgICAgZ2V0X3BhdGg6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgICAgICBnZXRfZm9ybTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgfSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbW9kZTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBzdWJtaXQoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLlRPR0dMRV9SRUNMQUlNX0ZPUk0sIHtcbiAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgcmVjbGFpbTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLkxPQURJTkcsIHtcbiAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChNZXNzYWdlcy5VUERBVEVfTU9ERV9GT1JNLCB7IGZvcm06IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB7fSxcbiAgICAgICAgICAgICAgICB1cGRhdGU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLlRPR0dMRV9SRUNMQUlNX0ZPUk0sIHtcbiAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgcmVjbGFpbTogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChNZXNzYWdlcy5DQU5DRUxfRk9STSwge1xuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMubmFtZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgYmVmb3JlTW91bnQoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChNZXNzYWdlcy5DUkVBVEVfRk9STSwgeyBmb3JtOiB0aGlzLm5hbWUsIGNvbnRlbnQ6IHt9IH0pO1xuICAgIH0sXG5cbiAgICBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuUkVNT1ZFX0ZPUk0sIHsgZm9ybTogdGhpcy5uYW1lIH0pO1xuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuICAgICAgICB1cGRhdGVfbW9kZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS51cGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmFtZSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgfTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZGluZygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5sb2FkaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBjbGFpbXMoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMubmFtZV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uY2xhaW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMubmFtZV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5zdWNjZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICB3YXRjaDoge1xuICAgICAgICB1cGRhdGVfbW9kZShuKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnVwZGF0ZV9tb2RlID0gbjtcbiAgICAgICAgfSxcbiAgICAgICAgY2xhaW1zKG4pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgaWYgKG4gPT09IGZvcm0ucG9vbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm06IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcnBhdGg6IHRoaXMuZ2V0X3BhdGgsXG4gICAgICAgICAgICAgICAgICAgIHJmb3JtOiB0aGlzLmdldF9mb3JtLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBmb3JtLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS51cGRhdGVfbW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnBhdGggPSB0aGlzLnB1dF9wYXRoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgndXBkYXRlJywgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wYXRoID0gdGhpcy5wb3N0X3BhdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdjcmVhdGUnLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3Mobikge1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGZvcm0gQHN1Ym1pdC5wcmV2ZW50PVwic3VibWl0XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWlmPVwiZXJyb3IuZm91bmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJtZXNzYWdlIGlzLXJlZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5BbiBlcnJvciBvY2N1cmVkIC08L3N0cm9uZz4ge3tlcnJvci5jb250ZW50Lm1lc3NhZ2V9fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWVsc2UtaWY9XCJzdWNjZXNzICE9IG51bGwgJiYgc3VjY2Vzcy5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwibWVzc2FnZSBpcy1ncmVlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3tzdWNjZXNzfX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgICA8ZGl2IGNsYXNzPVwiZmllbGQgaXMtZ3JvdXBlZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tYmFja2dyb3VuZC1ibHVlXCIgdi1pZj1cImxvYWRpbmdcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpbiBtLXJpZ2h0LXhzXCI+PC9pPlxuICAgICAgICAgICAgICAgIExvYWRpbmdcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB2LWVsc2VcbiAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCIgQGNsaWNrPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBidXR0b24tYmFja2dyb3VuZC1ibHVlXCJcbiAgICAgICAgICAgICAgICA+e3tzdGF0ZS51cGRhdGVfbW9kZSA/ICdNb2RpZnknIDogJ1NhdmUnfX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBAY2xpY2s9XCJjYW5jZWxcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tYmFja2dyb3VuZC1yZWRcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWlmPVwiZXJyb3IuZm91bmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJtZXNzYWdlIGlzLXJlZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5BbiBlcnJvciBvY2N1cmVkIC08L3N0cm9uZz4ge3tlcnJvci5jb250ZW50Lm1lc3NhZ2V9fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWVsc2UtaWY9XCJzdWNjZXNzICE9IG51bGwgJiYgc3VjY2Vzcy5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwibWVzc2FnZSBpcy1ncmVlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3tzdWNjZXNzfX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9mb3JtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vRm9ybScpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBNZXNzYWdlcyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2FwaS9tZXNzYWdlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb21wdXRlZDoge1xuICAgICAgICB2YWxpZGF0aW9ucygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5mb3JtXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYW1lIGluIGZvcm0udmFsaWRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0udmFsaWRhdGlvbnNbdGhpcy5uYW1lXS5tYXAobyA9PiBvLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZV9tb2RlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnVwZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVjbGFpbSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5mb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5yZWNsYWltO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuZm9ybV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uY2FuY2VsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLkFERF9UT19GT1JNX1BPT0wsIHsgZm9ybTogdGhpcy5mb3JtIH0pO1xuICAgIH0sXG4gICAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLlJFTU9WRV9GUk9NX0ZPUk1fUE9PTCwgeyBmb3JtOiB0aGlzLmZvcm0sIG5hbWU6IHRoaXMubmFtZSB9KTtcbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICAgIHVwZGF0ZV9tb2RlKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByb3BzOiBbJ251bWJlck9mSXRlbXMnLCAnaXRlbXNQZXJQYWdlJywgJ3NraXAnXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBmaXJzdF9wYWdlOiAxLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRfcGFnZTogMSxcbiAgICAgICAgICAgICAgICBsYXN0X3BhZ2U6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBnb3RvKHBhZ2UsIGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChwYWdlIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYWdlID4gdGhpcy5zdGF0ZS5sYXN0X3BhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcGFnZSA9IHBhZ2U7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLnN0YXRlLmxhc3RfcGFnZSA9IE1hdGguY2VpbCh0aGlzLm51bWJlck9mSXRlbXMgLyB0aGlzLml0ZW1zUGVyUGFnZSk7XG4gICAgICAgIHRoaXMuc3RhdGUuY3VycmVudF9wYWdlID0gcGFyc2VJbnQoKHRoaXMuc2tpcCArIHRoaXMuaXRlbXNQZXJQYWdlKSAvIHRoaXMuaXRlbXNQZXJQYWdlLCAxMCk7XG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48bmF2IHYtaWY9XCJzdGF0ZS5maXJzdF9wYWdlIDwgc3RhdGUubGFzdF9wYWdlXCIgY2xhc3M9XCJpcy1zbWFsbCBwYWdpbmF0aW9uIGlzLWNlbnRlcmVkXCIgcm9sZT1cIm5hdmlnYXRpb25cIiBhcmlhLWxhYmVsPVwicGFnaW5hdGlvblwiPlxuICAgIDx1bCBjbGFzcz1cInBhZ2luYXRpb24tbGlzdFwiPlxuICAgICAgICA8bGkgdi1pZj1cInN0YXRlLmN1cnJlbnRfcGFnZSA+IDFcIj48YSBAY2xpY2s9XCJnb3RvKHN0YXRlLmN1cnJlbnRfcGFnZS0xLCAkZXZlbnQpXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWxpbmtcIj5QcmV2aW91czwvYT48L2xpPlxuICAgICAgICA8bGkgdi1pZj1cInN0YXRlLmN1cnJlbnRfcGFnZSA+IHN0YXRlLmZpcnN0X3BhZ2VcIj48YSBAY2xpY2s9XCJnb3RvKDEsICRldmVudClcIiBjbGFzcz1cInBhZ2luYXRpb24tbGlua1wiIGFyaWEtbGFiZWw9XCJHb3RvIHBhZ2UgMVwiPjE8L2E+PC9saT5cbiAgICAgICAgPGxpIHYtaWY9XCJzdGF0ZS5jdXJyZW50X3BhZ2UtMSA+IDJcIj48c3BhbiBjbGFzcz1cInBhZ2luYXRpb24tZWxsaXBzaXNcIj4maGVsbGlwOzwvc3Bhbj48L2xpPlxuICAgICAgICA8bGkgdi1pZj1cInN0YXRlLmN1cnJlbnRfcGFnZSA+IHN0YXRlLmZpcnN0X3BhZ2UgKyAxXCI+PGEgQGNsaWNrPVwiZ290byhzdGF0ZS5jdXJyZW50X3BhZ2UtMSwgJGV2ZW50KVwiIGNsYXNzPVwicGFnaW5hdGlvbi1saW5rXCIgOmFyaWEtbGFiZWw9XCJgR290byBwYWdlICR7c3RhdGUuY3VycmVudF9wYWdlLTF9YFwiPnt7c3RhdGUuY3VycmVudF9wYWdlLTF9fTwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgY2xhc3M9XCJwYWdpbmF0aW9uLWxpbmsgaXMtY3VycmVudFwiIDphcmlhLWxhYmVsPVwiYFBhZ2UgJHtzdGF0ZS5jdXJyZW50X3BhZ2V9YFwiIGFyaWEtY3VycmVudD1cInBhZ2VcIj57e3N0YXRlLmN1cnJlbnRfcGFnZX19PC9hPjwvbGk+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlIDwgc3RhdGUubGFzdF9wYWdlLTFcIj48YSBAY2xpY2s9XCJnb3RvKHN0YXRlLmN1cnJlbnRfcGFnZSsxLCAkZXZlbnQpXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWxpbmtcIiA6YXJpYS1sYWJlbD1cImBHb3RvIHBhZ2UgJHtzdGF0ZS5jdXJyZW50X3BhZ2UrMX1gXCI+e3tzdGF0ZS5jdXJyZW50X3BhZ2UrMX19PC9hPjwvbGk+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlKzEgPCBzdGF0ZS5sYXN0X3BhZ2UtMVwiPjxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbi1lbGxpcHNpc1wiPiZoZWxsaXA7PC9zcGFuPjwvbGk+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlIDwgc3RhdGUubGFzdF9wYWdlXCI+PGEgQGNsaWNrPVwiZ290byhzdGF0ZS5sYXN0X3BhZ2UsICRldmVudClcIiBjbGFzcz1cInBhZ2luYXRpb24tbGlua1wiIDphcmlhLWxhYmVsPVwiYEdvdG8gcGFnZSAke3N0YXRlLmxhc3RfcGFnZX1gXCI+e3tzdGF0ZS5sYXN0X3BhZ2V9fTwvYT48L2xpPlxuICAgICAgICA8bGkgdi1pZj1cInN0YXRlLmN1cnJlbnRfcGFnZSA8IHN0YXRlLmxhc3RfcGFnZVwiPjxhIEBjbGljaz1cImdvdG8oc3RhdGUuY3VycmVudF9wYWdlKzEsICRldmVudClcIiBjbGFzcz1cInBhZ2luYXRpb24tbGlua1wiPk5leHQ8L2E+PC9saT5cbiAgICA8L3VsPlxuICAgIDwvbmF2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vUGFnaW5hdG9yJyk7XG48L3NjcmlwdD5cbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgICAgdGFiczogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogQXJyYXkgfSxcbiAgICB9LFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBnbyhpZHgsIGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudCA9IGlkeDtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFic1wiPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgIDpjbGFzcz1cInsnaXMtYWN0aXZlJzogc3RhdGUuY3VycmVudCA9PT0gaWR4fVwiXG4gICAgICAgICAgICAgICAgOmtleT1cImlkeFwiIFxuICAgICAgICAgICAgICAgIEBjbGljaz1cImdvKGlkeCwgJGV2ZW50KVwiIFxuICAgICAgICAgICAgICAgIHYtZm9yPVwiKHRleHQsIGlkeCkgaW4gdGFic1wiPlxuICAgICAgICAgICAgICAgICAgICA8YT57e3RleHR9fTwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzbG90XG4gICAgICAgICAgICBuYW1lPVwidGFic1wiIFxuICAgICAgICAgICAgOmlkPVwic3RhdGUuY3VycmVudFwiXG4gICAgICAgID5cbiAgICAgICAgPC9zbG90PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vVGFiYmVyJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IEFQSVJvdXRlcyA9IHJlcXVpcmUoJy4uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4vTGFuZ01peGluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW0xhbmdNaXhpbl0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgZm9ybXMoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5mb3Jtcy5uYW1lIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbXlmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5mb3Jtcy5uYW1lXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gbXlmb3JtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybXMgPSBjb250ZW50LnJlZHVjZSgob2JqLCBmb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm0ubGFiZWwgPSB0aGlzLmxhbmcoZm9ybS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZGVzY3JpcHRpb24gPSB0aGlzLmxhbmcoZm9ybS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZmllbGRzID0gZm9ybS5maWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQubGFiZWwgPSB0aGlzLmxhbmcoZmllbGQubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb2JqW2Zvcm0ubmFtZV0gPSBfLmNsb25lRGVlcChmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ucmVkdWNlKGZvcm1zLCAob2JqLCBmb3JtLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtLmhhc19zdWJmb3Jtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maWVsZHMgPSBmb3JtLmZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdzdWJmb3JtJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5zdWJmb3JtID0gZm9ybXNbZmllbGQuc3ViZm9ybV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9ialtuYW1lXSA9IGZvcm07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3NlYXJjaCcsIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUuZm9ybXMubmFtZSxcbiAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2Zvcm0nLCAnUE9TVCcsIHRydWUpLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHNpemU6IDEwMDAsXG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRoaXMuc3RhdGUuZm9ybXMuZ3JvdXAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuIiwiY29uc3QgU3RyaW5nVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9zdHJpbmdzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbGFuZyhrZXksIG9iaiwgbikge1xuICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMuY2xhbmcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMuY2xhbmdba2V5XTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0ga2V5O1xuICAgICAgICAgICAgLy8gVE9ETyBmaW5pc2ggaW1wbGVtZW50YXRpb24gZm9yIGZldyBhbmQgbWFueVxuICAgICAgICAgICAgaWYgKG4gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICgnMScgaW4gaW5mbykge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gaW5mb1snMSddIHx8IGtleTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gaW5mb1snbi9hJ10gfHwga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRleHQgPSBpbmZvLnplcm8gfHwgaW5mb1snbi9hJ10gfHwga2V5O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IGluZm8ub25lIHx8IGluZm9bJ24vYSddIHx8IGtleTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRleHQgPSBpbmZvLnR3byB8fCBpbmZvWyduL2EnXSB8fCBrZXk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRleHQgPSBpbmZvLm90aGVyIHx8IGluZm9bJ24vYSddIHx8IGtleTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9iaiA9PSBudWxsIHx8IE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmdVdGlscy5mb3JtYXRfd2l0aF9vYmoodGV4dCwgb2JqKTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGNsYW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLmxhbmdfY29udGVudFt0aGlzLiRzdG9yZS5zdGF0ZS5pbnRlcmZhY2VMYW5nXTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsImNvbnN0IEFQSSA9IHJlcXVpcmUoJy4uL2FwaScpO1xuY29uc3QgTWVzc2FnZXMgPSByZXF1aXJlKCcuLi9hcGkvbWVzc2FnZXMnKTtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlX29yX3VwZGF0ZShjdHgsIHsgcGF0aCwgYm9keSwgZm9ybSwgcmZvcm0sIHJwYXRoIH0sIHVwID0gZmFsc2UpIHtcbiAgICBjb25zdCBtZXRob2QgPSB1cCA/ICdQVVQnIDogJ1BPU1QnO1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgIHBhdGgsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgYm9keSxcbiAgICAgICAgY29tbWl0OiBjdHguY29tbWl0LFxuICAgIH07XG5cbiAgICBjdHguY29tbWl0KE1lc3NhZ2VzLkxPQURJTkcsIHsgZm9ybSB9KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IEFQSS5mZXRjaChwYXlsb2FkKTtcbiAgICBjdHguY29tbWl0KE1lc3NhZ2VzLkZFVENILCB7IG1ldGhvZCwgcmVzcG9uc2UsIGZvcm0gfSk7XG4gICAgY3R4LmRpc3BhdGNoKCdzaW5nbGVfcmVhZCcsIHtcbiAgICAgICAgZm9ybTogcmZvcm0sXG4gICAgICAgIHBhdGg6IHJwYXRoLFxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGU6IGFzeW5jIChjdHgsIHBheWxvYWQpID0+IHtcbiAgICAgICAgYXdhaXQgY3JlYXRlX29yX3VwZGF0ZShjdHgsIHBheWxvYWQsIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBhc3luYyAoY3R4LCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGF3YWl0IGNyZWF0ZV9vcl91cGRhdGUoY3R4LCBwYXlsb2FkLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBhc3luYyAoY3R4LCB7IHBhdGgsIGZvcm0sIHJwYXRoLCByZm9ybSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbWV0aG9kOiAnREVMJyxcbiAgICAgICAgICAgIGNvbW1pdDogY3R4LmNvbW1pdCxcbiAgICAgICAgfTtcblxuICAgICAgICBjdHguY29tbWl0KE1lc3NhZ2VzLkxPQURJTkcsIHsgZm9ybSB9KTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBBUEkuZmV0Y2gocGF5bG9hZCk7XG4gICAgICAgIGN0eC5jb21taXQoTWVzc2FnZXMuRkVUQ0gsIHsgbWV0aG9kOiAnREVMJywgcmVzcG9uc2UsIGZvcm0gfSk7XG4gICAgICAgIGN0eC5kaXNwYXRjaCgnc2luZ2xlX3JlYWQnLCB7XG4gICAgICAgICAgICBmb3JtOiByZm9ybSxcbiAgICAgICAgICAgIHBhdGg6IHJwYXRoLFxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2luZ2xlX3JlYWQ6IGFzeW5jIChjdHgsIHsgZm9ybSwgcGF0aCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGNvbW1pdDogY3R4LmNvbW1pdCxcbiAgICAgICAgfTtcblxuICAgICAgICBjdHguY29tbWl0KE1lc3NhZ2VzLkxPQURJTkcsIHsgZm9ybSB9KTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBBUEkuZmV0Y2gocGF5bG9hZCk7XG4gICAgICAgIGN0eC5jb21taXQoTWVzc2FnZXMuRkVUQ0gsIHsgbWV0aG9kOiAnR0VUJywgcmVzcG9uc2UsIGZvcm0gfSk7XG4gICAgfSxcblxuICAgIHNlYXJjaDogYXN5bmMgKGN0eCwgeyBmb3JtLCBwYXRoLCBib2R5IH0pID0+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGNvbW1pdDogY3R4LmNvbW1pdCxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgIH07XG5cbiAgICAgICAgY3R4LmNvbW1pdChNZXNzYWdlcy5MT0FESU5HLCB7IGZvcm0gfSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQVBJLmZldGNoKHBheWxvYWQpO1xuICAgICAgICBjdHguY29tbWl0KE1lc3NhZ2VzLkZFVENILCB7IG1ldGhvZDogJ0dFVCcsIHJlc3BvbnNlLCBmb3JtIH0pO1xuICAgIH0sXG5cbiAgICBncmFiX2NvbmZpZzogYXN5bmMgKGN0eCwgeyBwYXRoLCBib2R5IH0pID0+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGNvbW1pdDogY3R4LmNvbW1pdCxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBBUEkuZmV0Y2gocGF5bG9hZCk7XG4gICAgICAgIC8vIGNvbnN0IHN1Y2Nlc3MgPSByZXNwb25zZS50eXBlID09PSBNZXNzYWdlcy5TVUNDRVNTO1xuICAgICAgICBpZiAocmVzcG9uc2UuY29udGVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXNwb25zZS5jb250ZW50ID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICBjb25zdCBjb250ZW50ID0gJ3Jlc3VsdCcgaW4gcmVzcG9uc2UuY29udGVudFxuICAgICAgICAgICAgJiYgJ2hpdHMnIGluIHJlc3BvbnNlLmNvbnRlbnQucmVzdWx0ID8gcmVzcG9uc2UuY29udGVudC5yZXN1bHQuaGl0cyA6IFtdO1xuICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjdHguc3RhdGUuZ2xvYmFsX2NvbmZpZyA9IGNvbnRlbnRbMF0uc291cmNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdyYWJfbGFuZ3VhZ2U6IGFzeW5jIChjdHgsIHsgcGF0aCwgYm9keSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBjb21taXQ6IGN0eC5jb21taXQsXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQVBJLmZldGNoKHBheWxvYWQpO1xuICAgICAgICAvLyBjb25zdCBzdWNjZXNzID0gcmVzcG9uc2UudHlwZSA9PT0gTWVzc2FnZXMuU1VDQ0VTUztcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzcG9uc2UuY29udGVudCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGVudCA9ICdyZXN1bHQnIGluIHJlc3BvbnNlLmNvbnRlbnRcbiAgICAgICAgICAgICYmICdoaXRzJyBpbiByZXNwb25zZS5jb250ZW50LnJlc3VsdCA/IHJlc3BvbnNlLmNvbnRlbnQucmVzdWx0LmhpdHMgOiBbXTtcbiAgICAgICAgY3R4LnN0YXRlLmxhbmdfY29udGVudCA9IGNvbnRlbnQucmVkdWNlKChvYmosIHNyYykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbCA9IHNyYy5zb3VyY2U7XG4gICAgICAgICAgICBjb25zdCBsYW5nID0gb2JqW2wubGFuZ10gfHwge307XG4gICAgICAgICAgICBsYW5nW2wua2V5XSA9IGwudmFsdWVzLnJlZHVjZSgodmFsdWVzLCB2KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFsdWVzW3YucXVhbnRpdHldID0gdi52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgb2JqW2wubGFuZ10gPSBsYW5nO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSwge30pO1xuICAgIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG59O1xuIiwiY29uc3QgVnVlID0gcmVxdWlyZSgndnVlJyk7XG5jb25zdCBWdWV4ID0gcmVxdWlyZSgndnVleCcpO1xuY29uc3QgbXV0YXRpb25zID0gcmVxdWlyZSgnLi9tdXRhdGlvbnMnKTtcbmNvbnN0IGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMnKTtcbmNvbnN0IHN0YXRlID0gcmVxdWlyZSgnLi9zdGF0ZScpO1xuY29uc3QgZ2V0dGVycyA9IHJlcXVpcmUoJy4vZ2V0dGVycycpO1xuXG5WdWUudXNlKFZ1ZXgpO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBWdWV4LlN0b3JlKHtcbiAgICBzdGF0ZSxcbiAgICBnZXR0ZXJzLFxuICAgIGFjdGlvbnMsXG4gICAgbXV0YXRpb25zLFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBNZXNzYWdlcyA9IHJlcXVpcmUoJy4uL2FwaS9tZXNzYWdlcycpO1xuY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy91dGlscycpO1xuXG5mdW5jdGlvbiBjcmVhdGVfZm9ybSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwb29sOiAwLFxuICAgICAgICBjbGFpbXM6IDAsXG4gICAgICAgIHZhbGlkYXRpb25zOiB7fSxcbiAgICAgICAgZXJyb3I6IHt9LFxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgdXBkYXRlOiBmYWxzZSxcbiAgICAgICAgcmVjbGFpbTogZmFsc2UsXG4gICAgICAgIGNhbmNlbDogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6ICcnLFxuICAgICAgICBjb250ZW50OiBbXSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBbTWVzc2FnZXMuTE9BRElOR106IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG4gICAgICAgIGlmIChmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0ubG9hZGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLkZFVENIXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBwYXlsb2FkLnJlc3BvbnNlLnR5cGUgPT09IE1lc3NhZ2VzLlNVQ0NFU1M7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcblxuICAgICAgICBpZiAocGF5bG9hZC5yZXNwb25zZS5jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHBheWxvYWQucmVzcG9uc2UuY29udGVudCA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSkge1xuICAgICAgICAgICAgc3RhdGUuZm9ybXMgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5mb3JtcywgeyBbZm9ybV9uYW1lXTogY3JlYXRlX2Zvcm0oKSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNsYWltcyA9IDA7XG4gICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0udXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0ucmVjbGFpbSA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNhbmNlbCA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnZhbGlkYXRpb25zID0ge307XG5cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGlmIChwYXlsb2FkLm1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gcGF5bG9hZC5yZXNwb25zZS5jb250ZW50O1xuICAgICAgICAgICAgICAgIGlmICgncmVzdWx0JyBpbiBjb250ZW50ICYmICdoaXRzJyBpbiBjb250ZW50LnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNvbnRlbnQgPSBjb250ZW50LnJlc3VsdC5oaXRzLm1hcChoaXQgPT4gXy5tZXJnZSh7IF9pZDogaGl0LmlkIH0sIGhpdC5zb3VyY2UpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJ2NoYW5nZScgaW4gcGF5bG9hZC5yZXNwb25zZS5jb250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcGF5bG9hZC5yZXNwb25zZS5jb250ZW50LmNoYW5nZSA9PT0gJ1ZhbGlkYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS52YWxpZGF0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHBheWxvYWQucmVzcG9uc2UuY29udGVudC5lcnJvcnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnN1Y2Nlc3MgPSBwYXlsb2FkLnJlc3BvbnNlLmNvbnRlbnQubWVzc2FnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uZXJyb3IgPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uZXJyb3IgPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgICAgICAgICAgZm91bmQ6IHRydWUsIGNvbnRlbnQ6IHBheWxvYWQucmVzcG9uc2UuY29udGVudCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS52YWxpZGF0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5FUlJPUl06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBzdGF0ZS5lcnJvciA9IHRydWU7XG4gICAgICAgIHN0YXRlLmVycm9yX3R5cGUgPSBwYXlsb2FkLmVycm9yX3R5cGU7XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5DUkVBVEVfRk9STV06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBwYXlsb2FkLmNvbnRlbnQgfHwge307XG4gICAgICAgIHN0YXRlLmZvcm1zID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZm9ybXMsIHtcbiAgICAgICAgICAgIFtmb3JtX25hbWVdOiBjcmVhdGVfZm9ybSgpLFxuICAgICAgICB9KTtcbiAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jb250ZW50ID0gY29udGVudDtcbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLlJFTU9WRV9GT1JNXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcbiAgICAgICAgaWYgKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgZGVsZXRlIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV07XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLkNBTkNFTF9GT1JNXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcbiAgICAgICAgaWYgKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY29udGVudCA9IHt9O1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5lcnJvciA9IHt9O1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jbGFpbXMgPSAwO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5zdWNjZXNzID0gJyc7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnZhbGlkYXRpb25zID0ge307XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLlJFTU9WRV9BTExfRk9STVNdOiAoc3RhdGUpID0+IHtcbiAgICAgICAgc3RhdGUuZm9ybXMgPSB7fTtcbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLlVQREFURV9NT0RFX0ZPUk1dOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuICAgICAgICBpZiAoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnVwZGF0ZSA9IHBheWxvYWQudXBkYXRlIHx8IGZhbHNlO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jYW5jZWwgPSBmYWxzZTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY29udGVudCA9IE9iamVjdC5hc3NpZ24oe30sIHBheWxvYWQuY29udGVudCB8fCB7fSk7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmVycm9yID0ge307XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnN1Y2Nlc3MgPSAnJztcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0udmFsaWRhdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuVE9HR0xFX1JFQ0xBSU1fRk9STV06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG4gICAgICAgIGlmIChmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0ucmVjbGFpbSA9ICdyZWNsYWltJyBpbiBwYXlsb2FkID9cbiAgICAgICAgICAgICAgICBwYXlsb2FkLnJlY2xhaW0gOiAhc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5yZWNsYWltO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jYW5jZWwgPSBmYWxzZTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uZXJyb3IgPSB7fTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuUkVDTEFJTV9GT1JNX0VMRU1FTlRdOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuICAgICAgICBjb25zdCBuYW1lID0gcGF5bG9hZC5uYW1lO1xuICAgICAgICBjb25zdCBpbmZvID0gcGF5bG9hZC5pbmZvO1xuICAgICAgICBpZiAoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY29udGVudDtcbiAgICAgICAgICAgIGNvbnN0IG9iamVjdCA9IFV0aWxzLm1ha2VfbmVzdGVkX29iamVjdF9mcm9tX3BhdGgocGF0aCwgaW5mbyk7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNvbnRlbnQgPSBfLm1lcmdlKHt9LCBjb250ZW50LCBvYmplY3QpO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jbGFpbXMgKz0gMTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuQUREX1RPX0ZPUk1fUE9PTF06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG4gICAgICAgIGlmIChmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0ucG9vbCArPSAxO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5SRU1PVkVfRlJPTV9GT1JNX1BPT0xdOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuICAgICAgICBjb25zdCBlbHRfbmFtZSA9IHBheWxvYWQubmFtZTtcbiAgICAgICAgaWYgKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5wb29sIC09IDE7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBlbHRfbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgY29uc3QgbGFzdCA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IG9iamVjdCA9IFV0aWxzLmZpbmRfb2JqZWN0X3dpdGhfcGF0aChzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNvbnRlbnQsIHBhdGgpO1xuICAgICAgICAgICAgaWYgKG9iamVjdCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmplY3RbbGFzdF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufTtcbiIsImNvbnN0IEJyb3dzZXJVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL2Jyb3dzZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgc3VjY2VzczogZmFsc2UsXG4gICAgY29udGVudDogW10sXG4gICAgZXJyb3I6IGZhbHNlLFxuICAgIGVycm9yX3R5cGU6ICcnLFxuICAgIGJyb3dzZXJMYW5ndWFnZTogQnJvd3NlclV0aWxzLm5vcm1hbGl6ZUJyb3dzZXJMYW5ndWFnZShCcm93c2VyVXRpbHMuZ2V0Rmlyc3RCcm93c2VyTGFuZ3VhZ2UoKSksXG4gICAgaW50ZXJmYWNlTGFuZzogbnVsbCxcbiAgICBsYW5nX2NvbnRlbnQ6IHt9LFxuICAgIGdsb2JhbF9jb25maWc6IHt9LFxuICAgIGZvcm1zOiB7XG4gICAgICAgIC8qIGZvcm1fbmFtZToge2Vycm9yOiB7fSwgY29udGVudDoge30sIHVwZGF0ZTogZmFsc2UvdHJ1ZX0qL1xuICAgIH0sXG59O1xuIiwiZnVuY3Rpb24gZ2V0Rmlyc3RCcm93c2VyTGFuZ3VhZ2UoKSB7XG4gICAgY29uc3QgbmF2ID0gd2luZG93Lm5hdmlnYXRvcjtcbiAgICBjb25zdCBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMgPSBbJ2xhbmd1YWdlJywgJ2Jyb3dzZXJMYW5ndWFnZScsICdzeXN0ZW1MYW5ndWFnZScsICd1c2VyTGFuZ3VhZ2UnXTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIEhUTUwgNS4xIFwibmF2aWdhdG9yLmxhbmd1YWdlc1wiXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcbiAgICAgICAgcmV0dXJuIG5hdi5sYW5ndWFnZXMuZmluZChsYW5ndWFnZSA9PiBsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnQgZm9yIG90aGVyIHdlbGwga25vd24gcHJvcGVydGllcyBpbiBicm93c2Vyc1xuICAgIHJldHVybiBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMuZmluZCgodmFsKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gbmF2W3ZhbF07XG4gICAgICAgIHJldHVybiBsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGg7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUJyb3dzZXJMYW5ndWFnZShsYW5nKSB7XG4gICAgaWYgKGxhbmcgPT0gbnVsbCB8fCBsYW5nID09PSAnJykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGxhbmcuc3BsaXQoJy0nKVswXS50b1VwcGVyQ2FzZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRGaXJzdEJyb3dzZXJMYW5ndWFnZSxcbiAgICBub3JtYWxpemVCcm93c2VyTGFuZ3VhZ2UsXG59O1xuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5mdW5jdGlvbiBmb3JtYXQoZm9ybSwgLi4uYXJncykge1xuICAgIHJldHVybiBmb3JtLnJlcGxhY2UoL3soXFxkKyl9L2csIChtYXRjaCwgbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnc1tudW1iZXJdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3NbbnVtYmVyXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdF93aXRoX29iaihmb3JtLCBvYmopIHtcbiAgICByZXR1cm4gZm9ybS5yZXBsYWNlKC97KFtBLVphLXpfLi1dKyl9L2csIChtYXRjaCwgbmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBpbmZvID0gXy5nZXQob2JqLCBuYW1lKTtcbiAgICAgICAgaWYgKGluZm8gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0LFxuICAgIGZvcm1hdF93aXRoX29iaixcbn07XG4iLCIvLyAgICAgIFxuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5mdW5jdGlvbiB0cnVuY2F0ZShpbnB1dCAgICAgICAgLCBzaXplICAgICAgICAgPSAxMCwgZWxsaXBzaXMgICAgICAgICA9ICcuLi4nKSAgICAgICAgIHtcbiAgICBjb25zdCB0b3RhbF9zaXplID0gc2l6ZSArIGVsbGlwc2lzLmxlbmd0aDtcbiAgICBpZiAoaW5wdXQubGVuZ3RoID4gdG90YWxfc2l6ZSkge1xuICAgICAgICBjb25zdCBjaGFyX3RvX3JlbW92ZSA9IGlucHV0Lmxlbmd0aCAtIHNpemU7XG4gICAgICAgIGNvbnN0IGhhbGYgPSBNYXRoLmZsb29yKGlucHV0Lmxlbmd0aCAvIDIuMCk7XG4gICAgICAgIGNvbnN0IGZpcnN0X2hhbGYgPSBNYXRoLmZsb29yKGNoYXJfdG9fcmVtb3ZlIC8gMi4wKTtcbiAgICAgICAgY29uc3QgbGFzdF9oYWxmID0gTWF0aC5jZWlsKGNoYXJfdG9fcmVtb3ZlIC8gMi4wKTtcblxuICAgICAgICByZXR1cm4gaW5wdXQuc2xpY2UoMCwgaGFsZiAtIGZpcnN0X2hhbGYpXG4gICAgICAgICAgICArIGVsbGlwc2lzXG4gICAgICAgICAgICArIGlucHV0LnNsaWNlKGhhbGYgKyBsYXN0X2hhbGYsIGlucHV0Lmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gX3JldHVybl9pbm5lcl9vYmplY3Qob2JqZWN0ICAgICAgICAgLCBjb3B5ICAgICAgICAgID0gdHJ1ZSkgICAgICB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGNvcHkpIHtcbiAgICAgICAgICAgIHJldHVybiBfLmNsb25lRGVlcChvYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIF90ZXN0X2lubmVyX29iamVjdChvYmplY3QgICAgICAgICAsIGtleSAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICB7XG4gICAgaWYgKCFpc05hTihwYXJzZUludChrZXksIDEwKSkpIHtcbiAgICAgICAga2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgfVxuXG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBba2V5LCBudWxsXTtcbiAgICB9IGVsc2UgaWYgKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmIChvYmplY3QubGVuZ3RoIDw9IGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIFtrZXksIG51bGxdO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICghKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBba2V5LCBudWxsXTtcbiAgICB9XG4gICAgcmV0dXJuIFtrZXksIG9iamVjdF07XG59XG5cblxuZnVuY3Rpb24gZmluZF9vYmplY3Rfd2l0aF9wYXRoKG9iamVjdCAgICAgICAgICwgcGF0aCAgICAgICAgICAgICAgICkgICAgICB7XG4gICAgY29uc3QgcCA9IHBhdGg7XG5cbiAgICBpZiAocC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIF9yZXR1cm5faW5uZXJfb2JqZWN0KG9iamVjdCwgZmFsc2UpOyAvLyBEb24ndCBjb3B5XG4gICAgfVxuXG4gICAgaWYgKHAubGVuZ3RoID4gMSkge1xuICAgICAgICBsZXQga2V5ID0gcFswXTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIFtrZXksIHJlc3VsdF0gPSBfdGVzdF9pbm5lcl9vYmplY3Qob2JqZWN0LCBrZXkpO1xuICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHsgcmV0dXJuIHJlc3VsdDsgfVxuICAgICAgICBpZiAob2JqZWN0ID09IG51bGwpIHsgcmV0dXJuIG9iamVjdDsgfVxuICAgICAgICByZXR1cm4gZmluZF9vYmplY3Rfd2l0aF9wYXRoKG9iamVjdFtrZXldLCBwLnNsaWNlKDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbmRfb2JqZWN0X3dpdGhfcGF0aChvYmplY3QsIHAuc2xpY2UoMSkpO1xufVxuXG5mdW5jdGlvbiBmaW5kX3ZhbHVlX3dpdGhfcGF0aChvYmplY3QgICAgICAgICAsIHBhdGggICAgICAgICAgICAgICApICAgICAge1xuICAgIGNvbnN0IHAgPSBwYXRoO1xuICAgIGlmIChwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gX3JldHVybl9pbm5lcl9vYmplY3Qob2JqZWN0KTtcbiAgICB9XG5cbiAgICBsZXQga2V5ID0gcFswXTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBba2V5LCByZXN1bHRdID0gX3Rlc3RfaW5uZXJfb2JqZWN0KG9iamVjdCwga2V5KTtcbiAgICBpZiAocmVzdWx0ID09IG51bGwpIHsgcmV0dXJuIHJlc3VsdDsgfVxuICAgIGlmIChvYmplY3QgPT0gbnVsbCkgeyByZXR1cm4gb2JqZWN0OyB9XG4gICAgcmV0dXJuIGZpbmRfdmFsdWVfd2l0aF9wYXRoKG9iamVjdFtrZXldLCBwLnNsaWNlKDEpKTtcbn1cblxuZnVuY3Rpb24gbWFrZV9uZXN0ZWRfb2JqZWN0X2Zyb21fcGF0aChwYXRoICAgICAgICAgICAgICAgLFxuICAgIHZhbHVlICAgICAsIG9iaiAgICAgICAgID0ge30pICAgICAgICAge1xuICAgIGNvbnN0IHJwYXRoID0gXy5yZXZlcnNlKHBhdGgpO1xuICAgIHJldHVybiBycGF0aC5yZWR1Y2UoKGFjYywgZmllbGQpID0+IHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGFjYykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhY2NbZmllbGRdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG15X29iaiA9IHt9O1xuICAgICAgICBteV9vYmpbZmllbGRdID0gYWNjO1xuICAgICAgICByZXR1cm4gbXlfb2JqO1xuICAgIH0sIG9iaik7XG59XG5cbmZ1bmN0aW9uIHRvX21hdHJpeChjb250ZW50ICAgICAgICAgICwgcm93TGVuZ3RoICAgICAgICAgPSAyKSB7XG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgICAgICAgLnJlZHVjZSgocm93cywga2V5LCBpbmRleCkgPT4gKGluZGV4ICUgcm93TGVuZ3RoID09PSAwID8gcm93cy5wdXNoKFtrZXldKVxuICAgICAgICAgICAgOiByb3dzW3Jvd3MubGVuZ3RoIC0gMV0ucHVzaChrZXkpKSAmJiByb3dzLCBbXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHRydW5jYXRlLFxuICAgIHRvX21hdHJpeCxcbiAgICBmaW5kX3ZhbHVlX3dpdGhfcGF0aCxcbiAgICBmaW5kX29iamVjdF93aXRoX3BhdGgsXG4gICAgbWFrZV9uZXN0ZWRfb2JqZWN0X2Zyb21fcGF0aCxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3Byb21pc2UgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9wcm9taXNlXCIpO1xuXG52YXIgX3Byb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvbWlzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgX3Byb21pc2UyLmRlZmF1bHQoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gc3RlcChrZXksIGFyZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfcHJvbWlzZTIuZGVmYXVsdC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RlcChcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHN0ZXAoXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGVwKFwibmV4dFwiKTtcbiAgICB9KTtcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJcclxuLyoqXHJcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcclxuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XHJcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XHJcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXHJcbiAgICAucHVzaChmbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcclxuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxyXG5cclxuICBvbi5mbiA9IGZuO1xyXG4gIHRoaXMub24oZXZlbnQsIG9uKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gIC8vIGFsbFxyXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBzcGVjaWZpYyBldmVudFxyXG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcclxuXHJcbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gIHZhciBjYjtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY2IgPSBjYWxsYmFja3NbaV07XHJcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xyXG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG5cclxuICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG59O1xyXG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS50cnknKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlByb21pc2U7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4xJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGluZGV4LCB2YWx1ZSkge1xuICBpZiAoaW5kZXggaW4gb2JqZWN0KSAkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTtcbiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciByZXN1bHQgPSBnZXRLZXlzKGl0KTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmIChnZXRTeW1ib2xzKSB7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KTtcbiAgICB2YXIgaXNFbnVtID0gcElFLmY7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKHN5bWJvbHMubGVuZ3RoID4gaSkgaWYgKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsInZhciBNRVRBID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHNldERlc2MgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGlkID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgc2V0RGVzYyhpdCwgTUVUQSwgeyB2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gfSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKSBzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogTUVUQSxcbiAgTkVFRDogZmFsc2UsXG4gIGZhc3RLZXk6IGZhc3RLZXksXG4gIGdldFdlYWs6IGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyXG4gIH0gZWxzZSBpZiAoT2JzZXJ2ZXIpIHtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQywgeCkge1xuICBhbk9iamVjdChDKTtcbiAgaWYgKGlzT2JqZWN0KHgpICYmIHguY29uc3RydWN0b3IgPT09IEMpIHJldHVybiB4O1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKEMpO1xuICB2YXIgcmVzb2x2ZSA9IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmU7XG4gIHJlc29sdmUoeCk7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc2FmZSAmJiB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IHR5cGVvZiBjb3JlW0tFWV0gPT0gJ2Z1bmN0aW9uJyA/IGNvcmVbS0VZXSA6IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcbiIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG4iLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaW52b2tlID0gcmVxdWlyZSgnLi9faW52b2tlJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vX2h0bWwnKTtcbnZhciBjZWwgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHNldFRhc2sgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyVGFzayA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgaWYgKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spIHtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCkge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYgKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpIGRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHsgdmFsdWU6IHdrc0V4dC5mKG5hbWUpIH0pO1xufTtcbiIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG4iLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG4iLCIiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJykgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICBpZiAocHJvbWlzZS5faCA9PSAxKSByZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYztcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVhY3Rpb247XG4gIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSB7XG4gICAgcmVhY3Rpb24gPSBjaGFpbltpKytdO1xuICAgIGlmIChyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSkgcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBNRVRBID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWTtcbnZhciAkZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgd2tzRGVmaW5lID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpO1xudmFyIGVudW1LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIF9jcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZ09QTkV4dCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpO1xudmFyICRHT1BEID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKTtcbnZhciAkRFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QRCA9ICRHT1BELmY7XG52YXIgZFAgPSAkRFAuZjtcbnZhciBnT1BOID0gZ09QTkV4dC5mO1xudmFyICRTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyICRKU09OID0gZ2xvYmFsLkpTT047XG52YXIgX3N0cmluZ2lmeSA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBISURERU4gPSB3a3MoJ19oaWRkZW4nKTtcbnZhciBUT19QUklNSVRJVkUgPSB3a3MoJ3RvUHJpbWl0aXZlJyk7XG52YXIgaXNFbnVtID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpO1xudmFyIEFsbFN5bWJvbHMgPSBzaGFyZWQoJ3N5bWJvbHMnKTtcbnZhciBPUFN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdFtQUk9UT1RZUEVdO1xudmFyIFVTRV9OQVRJVkUgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xudmFyIFFPYmplY3QgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkUCh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoaXQsIGtleSwgRCkge1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYgKHByb3RvRGVzYykgZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZiAocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bykgZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnKSB7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKSB7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8pICRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSkge1xuICAgIGlmICghRC5lbnVtZXJhYmxlKSB7XG4gICAgICBpZiAoIWhhcyhpdCwgSElEREVOKSkgZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pIGl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwgeyBlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKSB9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKSB7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbCA9IGtleXMubGVuZ3RoO1xuICB2YXIga2V5O1xuICB3aGlsZSAobCA+IGkpICRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApIHtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpIHtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIGl0ID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmIChEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIEQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgdmFyIG5hbWVzID0gZ09QTih0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gIHZhciBJU19PUCA9IGl0ID09PSBPYmplY3RQcm90bztcbiAgdmFyIG5hbWVzID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKSByZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmICghVVNFX05BVElWRSkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90bykgJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIHNldHRlcikgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0IH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKSB7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBTeW1ib2w6ICRTeW1ib2wgfSk7XG5cbmZvciAodmFyIGVzNlN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaiA9IDA7IGVzNlN5bWJvbHMubGVuZ3RoID4gajspd2tzKGVzNlN5bWJvbHNbaisrXSk7XG5cbmZvciAodmFyIHdlbGxLbm93blN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBrID0gMDsgd2VsbEtub3duU3ltYm9scy5sZW5ndGggPiBrOykgd2tzRGVmaW5lKHdlbGxLbm93blN5bWJvbHNbaysrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBUeXBlRXJyb3Ioc3ltICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gICAgZm9yICh2YXIga2V5IGluIFN5bWJvbFJlZ2lzdHJ5KSBpZiAoU3ltYm9sUmVnaXN0cnlba2V5XSA9PT0gc3ltKSByZXR1cm4ga2V5O1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoeyBhOiBTIH0pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkge1xuICAgIGlmIChpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdO1xuICAgIHZhciBpID0gMTtcbiAgICB2YXIgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmICh0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYgKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICgkcmVwbGFjZXIpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZiAoIWlzU3ltYm9sKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtdHJ5XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUHJvbWlzZScsIHsgJ3RyeSc6IGZ1bmN0aW9uIChjYWxsYmFja2ZuKSB7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYodGhpcyk7XG4gIHZhciByZXN1bHQgPSBwZXJmb3JtKGNhbGxiYWNrZm4pO1xuICAocmVzdWx0LmUgPyBwcm9taXNlQ2FwYWJpbGl0eS5yZWplY3QgOiBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlKShyZXN1bHQudik7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufSB9KTtcbiIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpO1xuIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7XG4iLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG52YXIgRE9NSXRlcmFibGVzID0gKCdDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LCcgK1xuICAnRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCwnICtcbiAgJ01lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsJyArXG4gICdTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCwnICtcbiAgJ1RleHRUcmFja0xpc3QsVG91Y2hMaXN0Jykuc3BsaXQoJywnKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBET01JdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBET01JdGVyYWJsZXNbaV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gU3BsaXQgYSBmaWxlbmFtZSBpbnRvIFtyb290LCBkaXIsIGJhc2VuYW1lLCBleHRdLCB1bml4IHZlcnNpb25cbi8vICdyb290JyBpcyBqdXN0IGEgc2xhc2gsIG9yIG5vdGhpbmcuXG52YXIgc3BsaXRQYXRoUmUgPVxuICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvO1xudmFyIHNwbGl0UGF0aCA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcbn07XG5cbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcblxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbiAgfVxuXG4gIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcbn07XG5cbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXG4gICAgICB0cmFpbGluZ1NsYXNoID0gc3Vic3RyKHBhdGgsIC0xKSA9PT0gJy8nO1xuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICBwYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSkuam9pbignLycpKTtcbn07XG5cblxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVsYXRpdmUgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcblxuICBmdW5jdGlvbiB0cmltKGFycikge1xuICAgIHZhciBzdGFydCA9IDA7XG4gICAgZm9yICg7IHN0YXJ0IDwgYXJyLmxlbmd0aDsgc3RhcnQrKykge1xuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xuICAgICAgaWYgKGFycltlbmRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gW107XG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcbiAgfVxuXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcblxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0UGFydHMucHVzaCgnLi4nKTtcbiAgfVxuXG4gIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7XG5cbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcbn07XG5cbmV4cG9ydHMuc2VwID0gJy8nO1xuZXhwb3J0cy5kZWxpbWl0ZXIgPSAnOic7XG5cbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIHJlc3VsdCA9IHNwbGl0UGF0aChwYXRoKSxcbiAgICAgIHJvb3QgPSByZXN1bHRbMF0sXG4gICAgICBkaXIgPSByZXN1bHRbMV07XG5cbiAgaWYgKCFyb290ICYmICFkaXIpIHtcbiAgICAvLyBObyBkaXJuYW1lIHdoYXRzb2V2ZXJcbiAgICByZXR1cm4gJy4nO1xuICB9XG5cbiAgaWYgKGRpcikge1xuICAgIC8vIEl0IGhhcyBhIGRpcm5hbWUsIHN0cmlwIHRyYWlsaW5nIHNsYXNoXG4gICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSk7XG4gIH1cblxuICByZXR1cm4gcm9vdCArIGRpcjtcbn07XG5cblxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IHNwbGl0UGF0aChwYXRoKVsyXTtcbiAgLy8gVE9ETzogbWFrZSB0aGlzIGNvbXBhcmlzb24gY2FzZS1pbnNlbnNpdGl2ZSBvbiB3aW5kb3dzP1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBzcGxpdFBhdGgocGF0aClbM107XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcbiAgICB9XG47XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLy8gVGhpcyBtZXRob2Qgb2Ygb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IG5lZWRzIHRvIGJlXG4vLyBrZXB0IGlkZW50aWNhbCB0byB0aGUgd2F5IGl0IGlzIG9idGFpbmVkIGluIHJ1bnRpbWUuanNcbnZhciBnID0gKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcyB9KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICB0cnkge1xuICAgIGRlbGV0ZSBnLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvbWFzdGVyL0xJQ0VOU0UgZmlsZS4gQW5cbiAqIGFkZGl0aW9uYWwgZ3JhbnQgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpblxuICogdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi4gSWYgdGhlIFByb21pc2UgaXMgcmVqZWN0ZWQsIGhvd2V2ZXIsIHRoZVxuICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgLy8gcmVhc29uLiBOb3RlIHRoYXQgcmVqZWN0aW9ucyBvZiB5aWVsZGVkIFByb21pc2VzIGFyZSBub3RcbiAgICAgICAgICAvLyB0aHJvd24gYmFjayBpbnRvIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIGFzIGlzIHRoZSBjYXNlXG4gICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgIC8vIGJlaGF2aW9yIGJldHdlZW4geWllbGQgYW5kIGF3YWl0IGlzIGltcG9ydGFudCwgYmVjYXVzZSBpdFxuICAgICAgICAgIC8vIGFsbG93cyB0aGUgY29uc3VtZXIgdG8gZGVjaWRlIHdoYXQgdG8gZG8gd2l0aCB0aGUgeWllbGRlZFxuICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgZ2VuZXJhdG9yLCBhYmFuZG9uIGl0ZXJhdGlvbiwgd2hhdGV2ZXIpLiBXaXRoXG4gICAgICAgICAgLy8gYXdhaXQsIGJ5IGNvbnRyYXN0LCB0aGVyZSBpcyBubyBvcHBvcnR1bml0eSB0byBleGFtaW5lIHRoZVxuICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAvLyBvbmx5IG9wdGlvbiBpcyB0byB0aHJvdyBpdCBmcm9tIHRoZSBhd2FpdCBleHByZXNzaW9uLCBhbmRcbiAgICAgICAgICAvLyBsZXQgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiBoYW5kbGUgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbiAgLy8gRnVuY3Rpb24gY29uc3RydWN0b3IgaWYgd2UncmUgaW4gZ2xvYmFsIHN0cmljdCBtb2RlLiBUaGF0IGlzIHNhZGx5IGEgZm9ybVxuICAvLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuICAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpXG4pO1xuIiwiZnVuY3Rpb24gQWdlbnQoKSB7XG4gIHRoaXMuX2RlZmF1bHRzID0gW107XG59XG5cbltcInVzZVwiLCBcIm9uXCIsIFwib25jZVwiLCBcInNldFwiLCBcInF1ZXJ5XCIsIFwidHlwZVwiLCBcImFjY2VwdFwiLCBcImF1dGhcIiwgXCJ3aXRoQ3JlZGVudGlhbHNcIiwgXCJzb3J0UXVlcnlcIiwgXCJyZXRyeVwiLCBcIm9rXCIsIFwicmVkaXJlY3RzXCIsXG4gXCJ0aW1lb3V0XCIsIFwiYnVmZmVyXCIsIFwic2VyaWFsaXplXCIsIFwicGFyc2VcIiwgXCJjYVwiLCBcImtleVwiLCBcInBmeFwiLCBcImNlcnRcIl0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAvKiogRGVmYXVsdCBzZXR0aW5nIGZvciBhbGwgcmVxdWVzdHMgZnJvbSB0aGlzIGFnZW50ICovXG4gIEFnZW50LnByb3RvdHlwZVtmbl0gPSBmdW5jdGlvbigvKnZhcmFyZ3MqLykge1xuICAgIHRoaXMuX2RlZmF1bHRzLnB1c2goe2ZuOmZuLCBhcmd1bWVudHM6YXJndW1lbnRzfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5BZ2VudC5wcm90b3R5cGUuX3NldERlZmF1bHRzID0gZnVuY3Rpb24ocmVxKSB7XG4gICAgdGhpcy5fZGVmYXVsdHMuZm9yRWFjaChmdW5jdGlvbihkZWYpIHtcbiAgICAgIHJlcVtkZWYuZm5dLmFwcGx5KHJlcSwgZGVmLmFyZ3VtZW50cyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZW50O1xuIiwiLyoqXG4gKiBSb290IHJlZmVyZW5jZSBmb3IgaWZyYW1lcy5cbiAqL1xuXG52YXIgcm9vdDtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyAvLyBCcm93c2VyIHdpbmRvd1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gV2ViIFdvcmtlclxuICByb290ID0gc2VsZjtcbn0gZWxzZSB7IC8vIE90aGVyIGVudmlyb25tZW50c1xuICBjb25zb2xlLndhcm4oXCJVc2luZyBicm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGluIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuICByb290ID0gdGhpcztcbn1cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWJhc2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG52YXIgUmVzcG9uc2VCYXNlID0gcmVxdWlyZSgnLi9yZXNwb25zZS1iYXNlJyk7XG52YXIgQWdlbnQgPSByZXF1aXJlKCcuL2FnZW50LWJhc2UnKTtcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIG5vb3AoKXt9O1xuXG4vKipcbiAqIEV4cG9zZSBgcmVxdWVzdGAuXG4gKi9cblxudmFyIHJlcXVlc3QgPSBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtZXRob2QsIHVybCkge1xuICAvLyBjYWxsYmFja1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCkuZW5kKHVybCk7XG4gIH1cblxuICAvLyB1cmwgZmlyc3RcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QobWV0aG9kLCB1cmwpO1xufVxuXG5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIERldGVybWluZSBYSFIuXG4gKi9cblxucmVxdWVzdC5nZXRYSFIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0XG4gICAgICAmJiAoIXJvb3QubG9jYXRpb24gfHwgJ2ZpbGU6JyAhPSByb290LmxvY2F0aW9uLnByb3RvY29sXG4gICAgICAgICAgfHwgIXJvb3QuQWN0aXZlWE9iamVjdCkpIHtcbiAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0O1xuICB9IGVsc2Uge1xuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuNi4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjMuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gIH1cbiAgdGhyb3cgRXJyb3IoXCJCcm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGNvdWxkIG5vdCBmaW5kIFhIUlwiKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBhZGRlZCB0byBzdXBwb3J0IElFLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgdHJpbSA9ICcnLnRyaW1cbiAgPyBmdW5jdGlvbihzKSB7IHJldHVybiBzLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMucmVwbGFjZSgvKF5cXHMqfFxccyokKS9nLCAnJyk7IH07XG5cbi8qKlxuICogU2VyaWFsaXplIHRoZSBnaXZlbiBgb2JqYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgdmFyIHBhaXJzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCBvYmpba2V5XSk7XG4gIH1cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cblxuLyoqXG4gKiBIZWxwcyAnc2VyaWFsaXplJyB3aXRoIHNlcmlhbGl6aW5nIGFycmF5cy5cbiAqIE11dGF0ZXMgdGhlIHBhaXJzIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqL1xuXG5mdW5jdGlvbiBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2YWwpIHtcbiAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgdmFsLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgICAgZm9yKHZhciBzdWJrZXkgaW4gdmFsKSB7XG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXkgKyAnWycgKyBzdWJrZXkgKyAnXScsIHZhbFtzdWJrZXldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KVxuICAgICAgICArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodmFsID09PSBudWxsKSB7XG4gICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2Ugc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gKi9cblxucmVxdWVzdC5zZXJpYWxpemVPYmplY3QgPSBzZXJpYWxpemU7XG5cbi8qKlxuICAqIFBhcnNlIHRoZSBnaXZlbiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYHN0cmAuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICogQHJldHVybiB7T2JqZWN0fVxuICAqIEBhcGkgcHJpdmF0ZVxuICAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgdmFyIHBhaXI7XG4gIHZhciBwb3M7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBvcyA9IHBhaXIuaW5kZXhPZignPScpO1xuICAgIGlmIChwb3MgPT0gLTEpIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpcildID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZSgwLCBwb3MpKV0gPVxuICAgICAgICBkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZShwb3MgKyAxKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFeHBvc2UgcGFyc2VyLlxuICovXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICovXG5cbnJlcXVlc3QudHlwZXMgPSB7XG4gIGh0bWw6ICd0ZXh0L2h0bWwnLFxuICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gIHhtbDogJ3RleHQveG1sJyxcbiAgdXJsZW5jb2RlZDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtLWRhdGEnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IHNlcmlhbGl6YXRpb24gbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihvYmope1xuICogICAgICAgcmV0dXJuICdnZW5lcmF0ZWQgeG1sIGhlcmUnO1xuICogICAgIH07XG4gKlxuICovXG5cbnJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04uc3RyaW5naWZ5LFxufTtcblxuLyoqXG4gICogRGVmYXVsdCBwYXJzZXJzLlxuICAqXG4gICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24oc3RyKXtcbiAgKiAgICAgICByZXR1cm4geyBvYmplY3QgcGFyc2VkIGZyb20gc3RyIH07XG4gICogICAgIH07XG4gICpcbiAgKi9cblxucmVxdWVzdC5wYXJzZSA9IHtcbiAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHBhcnNlU3RyaW5nLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04ucGFyc2UsXG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBoZWFkZXIgYHN0cmAgaW50b1xuICogYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcHBlZCBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXIoc3RyKSB7XG4gIHZhciBsaW5lcyA9IHN0ci5zcGxpdCgvXFxyP1xcbi8pO1xuICB2YXIgZmllbGRzID0ge307XG4gIHZhciBpbmRleDtcbiAgdmFyIGxpbmU7XG4gIHZhciBmaWVsZDtcbiAgdmFyIHZhbDtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7IC8vIGNvdWxkIGJlIGVtcHR5IGxpbmUsIGp1c3Qgc2tpcCBpdFxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZpZWxkID0gbGluZS5zbGljZSgwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB0cmltKGxpbmUuc2xpY2UoaW5kZXggKyAxKSk7XG4gICAgZmllbGRzW2ZpZWxkXSA9IHZhbDtcbiAgfVxuXG4gIHJldHVybiBmaWVsZHM7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYG1pbWVgIGlzIGpzb24gb3IgaGFzICtqc29uIHN0cnVjdHVyZWQgc3ludGF4IHN1ZmZpeC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWltZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzSlNPTihtaW1lKSB7XG4gIHJldHVybiAvW1xcLytdanNvblxcYi8udGVzdChtaW1lKTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZWAgd2l0aCB0aGUgZ2l2ZW4gYHhocmAuXG4gKlxuICogIC0gc2V0IGZsYWdzICgub2ssIC5lcnJvciwgZXRjKVxuICogIC0gcGFyc2UgaGVhZGVyXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogIEFsaWFzaW5nIGBzdXBlcmFnZW50YCBhcyBgcmVxdWVzdGAgaXMgbmljZTpcbiAqXG4gKiAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50O1xuICpcbiAqICBXZSBjYW4gdXNlIHRoZSBwcm9taXNlLWxpa2UgQVBJLCBvciBwYXNzIGNhbGxiYWNrczpcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJykuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJywgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgU2VuZGluZyBkYXRhIGNhbiBiZSBjaGFpbmVkOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5zZW5kKClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnBvc3QoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIE9yIGZ1cnRoZXIgcmVkdWNlZCB0byBhIHNpbmdsZSBjYWxsIGZvciBzaW1wbGUgY2FzZXM6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogQHBhcmFtIHtYTUxIVFRQUmVxdWVzdH0geGhyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2UocmVxKSB7XG4gIHRoaXMucmVxID0gcmVxO1xuICB0aGlzLnhociA9IHRoaXMucmVxLnhocjtcbiAgLy8gcmVzcG9uc2VUZXh0IGlzIGFjY2Vzc2libGUgb25seSBpZiByZXNwb25zZVR5cGUgaXMgJycgb3IgJ3RleHQnIGFuZCBvbiBvbGRlciBicm93c2Vyc1xuICB0aGlzLnRleHQgPSAoKHRoaXMucmVxLm1ldGhvZCAhPSdIRUFEJyAmJiAodGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAnJyB8fCB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JykpIHx8IHR5cGVvZiB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd1bmRlZmluZWQnKVxuICAgICA/IHRoaXMueGhyLnJlc3BvbnNlVGV4dFxuICAgICA6IG51bGw7XG4gIHRoaXMuc3RhdHVzVGV4dCA9IHRoaXMucmVxLnhoci5zdGF0dXNUZXh0O1xuICB2YXIgc3RhdHVzID0gdGhpcy54aHIuc3RhdHVzO1xuICAvLyBoYW5kbGUgSUU5IGJ1ZzogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDA0Njk3Mi9tc2llLXJldHVybnMtc3RhdHVzLWNvZGUtb2YtMTIyMy1mb3ItYWpheC1yZXF1ZXN0XG4gIGlmIChzdGF0dXMgPT09IDEyMjMpIHtcbiAgICBzdGF0dXMgPSAyMDQ7XG4gIH1cbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhzdGF0dXMpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycyA9IHBhcnNlSGVhZGVyKHRoaXMueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuX3NldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuXG4gIGlmIChudWxsID09PSB0aGlzLnRleHQgJiYgcmVxLl9yZXNwb25zZVR5cGUpIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnhoci5yZXNwb25zZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgICA/IHRoaXMuX3BhcnNlQm9keSh0aGlzLnRleHQgPyB0aGlzLnRleHQgOiB0aGlzLnhoci5yZXNwb25zZSlcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuXG5SZXNwb25zZUJhc2UoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5fcGFyc2VCb2R5ID0gZnVuY3Rpb24oc3RyKSB7XG4gIHZhciBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcbiAgaWYgKHRoaXMucmVxLl9wYXJzZXIpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEuX3BhcnNlcih0aGlzLCBzdHIpO1xuICB9XG4gIGlmICghcGFyc2UgJiYgaXNKU09OKHRoaXMudHlwZSkpIHtcbiAgICBwYXJzZSA9IHJlcXVlc3QucGFyc2VbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgfVxuICByZXR1cm4gcGFyc2UgJiYgc3RyICYmIChzdHIubGVuZ3RoIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdClcbiAgICA/IHBhcnNlKHN0cilcbiAgICA6IG51bGw7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBgRXJyb3JgIHJlcHJlc2VudGF0aXZlIG9mIHRoaXMgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybiB7RXJyb3J9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS50b0Vycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIHJlcSA9IHRoaXMucmVxO1xuICB2YXIgbWV0aG9kID0gcmVxLm1ldGhvZDtcbiAgdmFyIHVybCA9IHJlcS51cmw7XG5cbiAgdmFyIG1zZyA9ICdjYW5ub3QgJyArIG1ldGhvZCArICcgJyArIHVybCArICcgKCcgKyB0aGlzLnN0YXR1cyArICcpJztcbiAgdmFyIGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSBtZXRob2Q7XG4gIGVyci51cmwgPSB1cmw7XG5cbiAgcmV0dXJuIGVycjtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZWAuXG4gKi9cblxucmVxdWVzdC5SZXNwb25zZSA9IFJlc3BvbnNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RgIHdpdGggdGhlIGdpdmVuIGBtZXRob2RgIGFuZCBgdXJsYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9xdWVyeSA9IHRoaXMuX3F1ZXJ5IHx8IFtdO1xuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMuaGVhZGVyID0ge307IC8vIHByZXNlcnZlcyBoZWFkZXIgbmFtZSBjYXNlXG4gIHRoaXMuX2hlYWRlciA9IHt9OyAvLyBjb2VyY2VzIGhlYWRlciBuYW1lcyB0byBsb3dlcmNhc2VcbiAgdGhpcy5vbignZW5kJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgZXJyID0gbnVsbDtcbiAgICB2YXIgcmVzID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICByZXMgPSBuZXcgUmVzcG9uc2Uoc2VsZik7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnIucGFyc2UgPSB0cnVlO1xuICAgICAgZXJyLm9yaWdpbmFsID0gZTtcbiAgICAgIC8vIGlzc3VlICM2NzU6IHJldHVybiB0aGUgcmF3IHJlc3BvbnNlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICBpZiAoc2VsZi54aHIpIHtcbiAgICAgICAgLy8gaWU5IGRvZXNuJ3QgaGF2ZSAncmVzcG9uc2UnIHByb3BlcnR5XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IHR5cGVvZiBzZWxmLnhoci5yZXNwb25zZVR5cGUgPT0gJ3VuZGVmaW5lZCcgPyBzZWxmLnhoci5yZXNwb25zZVRleHQgOiBzZWxmLnhoci5yZXNwb25zZTtcbiAgICAgICAgLy8gaXNzdWUgIzg3NjogcmV0dXJuIHRoZSBodHRwIHN0YXR1cyBjb2RlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICAgIGVyci5zdGF0dXMgPSBzZWxmLnhoci5zdGF0dXMgPyBzZWxmLnhoci5zdGF0dXMgOiBudWxsO1xuICAgICAgICBlcnIuc3RhdHVzQ29kZSA9IGVyci5zdGF0dXM7IC8vIGJhY2t3YXJkcy1jb21wYXQgb25seVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyLnJhd1Jlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1cyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVycik7XG4gICAgfVxuXG4gICAgc2VsZi5lbWl0KCdyZXNwb25zZScsIHJlcyk7XG5cbiAgICB2YXIgbmV3X2VycjtcbiAgICB0cnkge1xuICAgICAgaWYgKCFzZWxmLl9pc1Jlc3BvbnNlT0socmVzKSkge1xuICAgICAgICBuZXdfZXJyID0gbmV3IEVycm9yKHJlcy5zdGF0dXNUZXh0IHx8ICdVbnN1Y2Nlc3NmdWwgSFRUUCByZXNwb25zZScpO1xuICAgICAgfVxuICAgIH0gY2F0Y2goY3VzdG9tX2Vycikge1xuICAgICAgbmV3X2VyciA9IGN1c3RvbV9lcnI7IC8vIG9rKCkgY2FsbGJhY2sgY2FuIHRocm93XG4gICAgfVxuXG4gICAgLy8gIzEwMDAgZG9uJ3QgY2F0Y2ggZXJyb3JzIGZyb20gdGhlIGNhbGxiYWNrIHRvIGF2b2lkIGRvdWJsZSBjYWxsaW5nIGl0XG4gICAgaWYgKG5ld19lcnIpIHtcbiAgICAgIG5ld19lcnIub3JpZ2luYWwgPSBlcnI7XG4gICAgICBuZXdfZXJyLnJlc3BvbnNlID0gcmVzO1xuICAgICAgbmV3X2Vyci5zdGF0dXMgPSByZXMuc3RhdHVzO1xuICAgICAgc2VsZi5jYWxsYmFjayhuZXdfZXJyLCByZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxmLmNhbGxiYWNrKG51bGwsIHJlcyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBNaXhpbiBgRW1pdHRlcmAgYW5kIGBSZXF1ZXN0QmFzZWAuXG4gKi9cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5SZXF1ZXN0QmFzZShSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0IENvbnRlbnQtVHlwZSB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgnYXBwbGljYXRpb24veG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50eXBlID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdDb250ZW50LVR5cGUnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEFjY2VwdCB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy5qc29uID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWNjZXB0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdBY2NlcHQnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEF1dGhvcml6YXRpb24gZmllbGQgdmFsdWUgd2l0aCBgdXNlcmAgYW5kIGBwYXNzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXNlclxuICogQHBhcmFtIHtTdHJpbmd9IFtwYXNzXSBvcHRpb25hbCBpbiBjYXNlIG9mIHVzaW5nICdiZWFyZXInIGFzIHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHdpdGggJ3R5cGUnIHByb3BlcnR5ICdhdXRvJywgJ2Jhc2ljJyBvciAnYmVhcmVyJyAoZGVmYXVsdCAnYmFzaWMnKVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF1dGggPSBmdW5jdGlvbih1c2VyLCBwYXNzLCBvcHRpb25zKXtcbiAgaWYgKDEgPT09IGFyZ3VtZW50cy5sZW5ndGgpIHBhc3MgPSAnJztcbiAgaWYgKHR5cGVvZiBwYXNzID09PSAnb2JqZWN0JyAmJiBwYXNzICE9PSBudWxsKSB7IC8vIHBhc3MgaXMgb3B0aW9uYWwgYW5kIGNhbiBiZSByZXBsYWNlZCB3aXRoIG9wdGlvbnNcbiAgICBvcHRpb25zID0gcGFzcztcbiAgICBwYXNzID0gJyc7XG4gIH1cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIHR5cGU6ICdmdW5jdGlvbicgPT09IHR5cGVvZiBidG9hID8gJ2Jhc2ljJyA6ICdhdXRvJyxcbiAgICB9O1xuICB9XG5cbiAgdmFyIGVuY29kZXIgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGJ0b2EpIHtcbiAgICAgIHJldHVybiBidG9hKHN0cmluZyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBiYXNpYyBhdXRoLCBidG9hIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH07XG5cbiAgcmV0dXJuIHRoaXMuX2F1dGgodXNlciwgcGFzcywgb3B0aW9ucywgZW5jb2Rlcik7XG59O1xuXG4vKipcbiAqIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiAqICAgICAucXVlcnkoJ3NpemU9MTAnKVxuICogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHZhbCA9IHNlcmlhbGl6ZSh2YWwpO1xuICBpZiAodmFsKSB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBRdWV1ZSB0aGUgZ2l2ZW4gYGZpbGVgIGFzIGFuIGF0dGFjaG1lbnQgdG8gdGhlIHNwZWNpZmllZCBgZmllbGRgLFxuICogd2l0aCBvcHRpb25hbCBgb3B0aW9uc2AgKG9yIGZpbGVuYW1lKS5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5hdHRhY2goJ2NvbnRlbnQnLCBuZXcgQmxvYihbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddLCB7IHR5cGU6IFwidGV4dC9odG1sXCJ9KSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7QmxvYnxGaWxlfSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbihmaWVsZCwgZmlsZSwgb3B0aW9ucyl7XG4gIGlmIChmaWxlKSB7XG4gICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgIHRocm93IEVycm9yKFwic3VwZXJhZ2VudCBjYW4ndCBtaXggLnNlbmQoKSBhbmQgLmF0dGFjaCgpXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKGZpZWxkLCBmaWxlLCBvcHRpb25zIHx8IGZpbGUubmFtZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZ2V0Rm9ybURhdGEgPSBmdW5jdGlvbigpe1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB9XG4gIHJldHVybiB0aGlzLl9mb3JtRGF0YTtcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIsIHJlcyl7XG4gIGlmICh0aGlzLl9zaG91bGRSZXRyeShlcnIsIHJlcykpIHtcbiAgICByZXR1cm4gdGhpcy5fcmV0cnkoKTtcbiAgfVxuXG4gIHZhciBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIGlmIChlcnIpIHtcbiAgICBpZiAodGhpcy5fbWF4UmV0cmllcykgZXJyLnJldHJpZXMgPSB0aGlzLl9yZXRyaWVzIC0gMTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGZuKGVyciwgcmVzKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggeC1kb21haW4gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3Jvc3NEb21haW5FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1JlcXVlc3QgaGFzIGJlZW4gdGVybWluYXRlZFxcblBvc3NpYmxlIGNhdXNlczogdGhlIG5ldHdvcmsgaXMgb2ZmbGluZSwgT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiwgdGhlIHBhZ2UgaXMgYmVpbmcgdW5sb2FkZWQsIGV0Yy4nKTtcbiAgZXJyLmNyb3NzRG9tYWluID0gdHJ1ZTtcblxuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSB0aGlzLm1ldGhvZDtcbiAgZXJyLnVybCA9IHRoaXMudXJsO1xuXG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8vIFRoaXMgb25seSB3YXJucywgYmVjYXVzZSB0aGUgcmVxdWVzdCBpcyBzdGlsbCBsaWtlbHkgdG8gd29ya1xuUmVxdWVzdC5wcm90b3R5cGUuYnVmZmVyID0gUmVxdWVzdC5wcm90b3R5cGUuY2EgPSBSZXF1ZXN0LnByb3RvdHlwZS5hZ2VudCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUud2FybihcIlRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIHZlcnNpb24gb2Ygc3VwZXJhZ2VudFwiKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBUaGlzIHRocm93cywgYmVjYXVzZSBpdCBjYW4ndCBzZW5kL3JlY2VpdmUgZGF0YSBhcyBleHBlY3RlZFxuUmVxdWVzdC5wcm90b3R5cGUucGlwZSA9IFJlcXVlc3QucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oKXtcbiAgdGhyb3cgRXJyb3IoXCJTdHJlYW1pbmcgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIHZlcnNpb24gb2Ygc3VwZXJhZ2VudFwiKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqIHdlIGRvbid0IHdhbnQgdG8gc2VyaWFsaXplIHRoZXNlIDopXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0LnByb3RvdHlwZS5faXNIb3N0ID0gZnVuY3Rpb24gX2lzSG9zdChvYmopIHtcbiAgLy8gTmF0aXZlIG9iamVjdHMgc3RyaW5naWZ5IHRvIFtvYmplY3QgRmlsZV0sIFtvYmplY3QgQmxvYl0sIFtvYmplY3QgRm9ybURhdGFdLCBldGMuXG4gIHJldHVybiBvYmogJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvYmogJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKHJlcylgXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGZuKXtcbiAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IC5lbmQoKSB3YXMgY2FsbGVkIHR3aWNlLiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gc3VwZXJhZ2VudFwiKTtcbiAgfVxuICB0aGlzLl9lbmRDYWxsZWQgPSB0cnVlO1xuXG4gIC8vIHN0b3JlIGNhbGxiYWNrXG4gIHRoaXMuX2NhbGxiYWNrID0gZm4gfHwgbm9vcDtcblxuICAvLyBxdWVyeXN0cmluZ1xuICB0aGlzLl9maW5hbGl6ZVF1ZXJ5U3RyaW5nKCk7XG5cbiAgcmV0dXJuIHRoaXMuX2VuZCgpO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB4aHIgPSAodGhpcy54aHIgPSByZXF1ZXN0LmdldFhIUigpKTtcbiAgdmFyIGRhdGEgPSB0aGlzLl9mb3JtRGF0YSB8fCB0aGlzLl9kYXRhO1xuXG4gIHRoaXMuX3NldFRpbWVvdXRzKCk7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgIHZhciByZWFkeVN0YXRlID0geGhyLnJlYWR5U3RhdGU7XG4gICAgaWYgKHJlYWR5U3RhdGUgPj0gMiAmJiBzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgICB9XG4gICAgaWYgKDQgIT0gcmVhZHlTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEluIElFOSwgcmVhZHMgdG8gYW55IHByb3BlcnR5IChlLmcuIHN0YXR1cykgb2ZmIG9mIGFuIGFib3J0ZWQgWEhSIHdpbGxcbiAgICAvLyByZXN1bHQgaW4gdGhlIGVycm9yIFwiQ291bGQgbm90IGNvbXBsZXRlIHRoZSBvcGVyYXRpb24gZHVlIHRvIGVycm9yIGMwMGMwMjNmXCJcbiAgICB2YXIgc3RhdHVzO1xuICAgIHRyeSB7IHN0YXR1cyA9IHhoci5zdGF0dXMgfSBjYXRjaChlKSB7IHN0YXR1cyA9IDA7IH1cblxuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCB8fCBzZWxmLl9hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgdmFyIGhhbmRsZVByb2dyZXNzID0gZnVuY3Rpb24oZGlyZWN0aW9uLCBlKSB7XG4gICAgaWYgKGUudG90YWwgPiAwKSB7XG4gICAgICBlLnBlcmNlbnQgPSBlLmxvYWRlZCAvIGUudG90YWwgKiAxMDA7XG4gICAgfVxuICAgIGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfTtcbiAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHhoci5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAnZG93bmxvYWQnKTtcbiAgICAgIGlmICh4aHIudXBsb2FkKSB7XG4gICAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ3VwbG9hZCcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgLy8gQWNjZXNzaW5nIHhoci51cGxvYWQgZmFpbHMgaW4gSUUgZnJvbSBhIHdlYiB3b3JrZXIsIHNvIGp1c3QgcHJldGVuZCBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgLy8gUmVwb3J0ZWQgaGVyZTpcbiAgICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgICB9XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHRyeSB7XG4gICAgaWYgKHRoaXMudXNlcm5hbWUgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlLCB0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIHNlZSAjMTE0OVxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGVycik7XG4gIH1cblxuICAvLyBDT1JTXG4gIGlmICh0aGlzLl93aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gIC8vIGJvZHlcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSAmJiAnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBjb250ZW50VHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG4gICAgdmFyIHNlcmlhbGl6ZSA9IHRoaXMuX3NlcmlhbGl6ZXIgfHwgcmVxdWVzdC5zZXJpYWxpemVbY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpWzBdIDogJyddO1xuICAgIGlmICghc2VyaWFsaXplICYmIGlzSlNPTihjb250ZW50VHlwZSkpIHtcbiAgICAgIHNlcmlhbGl6ZSA9IHJlcXVlc3Quc2VyaWFsaXplWydhcHBsaWNhdGlvbi9qc29uJ107XG4gICAgfVxuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG5cbiAgICBpZiAodGhpcy5oZWFkZXIuaGFzT3duUHJvcGVydHkoZmllbGQpKVxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICBpZiAodGhpcy5fcmVzcG9uc2VUeXBlKSB7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9IHRoaXMuX3Jlc3BvbnNlVHlwZTtcbiAgfVxuXG4gIC8vIHNlbmQgc3R1ZmZcbiAgdGhpcy5lbWl0KCdyZXF1ZXN0JywgdGhpcyk7XG5cbiAgLy8gSUUxMSB4aHIuc2VuZCh1bmRlZmluZWQpIHNlbmRzICd1bmRlZmluZWQnIHN0cmluZyBhcyBQT1NUIHBheWxvYWQgKGluc3RlYWQgb2Ygbm90aGluZylcbiAgLy8gV2UgbmVlZCBudWxsIGhlcmUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgeGhyLnNlbmQodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnID8gZGF0YSA6IG51bGwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnJlcXVlc3QuYWdlbnQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBBZ2VudCgpO1xufTtcblxuW1wiR0VUXCIsIFwiUE9TVFwiLCBcIk9QVElPTlNcIiwgXCJQQVRDSFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICBBZ2VudC5wcm90b3R5cGVbbWV0aG9kLnRvTG93ZXJDYXNlKCldID0gZnVuY3Rpb24odXJsLCBmbikge1xuICAgIHZhciByZXEgPSBuZXcgcmVxdWVzdC5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbiAgICB0aGlzLl9zZXREZWZhdWx0cyhyZXEpO1xuICAgIGlmIChmbikge1xuICAgICAgcmVxLmVuZChmbik7XG4gICAgfVxuICAgIHJldHVybiByZXE7XG4gIH07XG59KTtcblxuQWdlbnQucHJvdG90eXBlLmRlbCA9IEFnZW50LnByb3RvdHlwZVsnZGVsZXRlJ107XG5cbi8qKlxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5nZXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEhFQUQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmhlYWQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdIRUFEJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBPUFRJT05TIHF1ZXJ5IHRvIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5vcHRpb25zID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbikge1xuICB2YXIgcmVxID0gcmVxdWVzdCgnT1BUSU9OUycsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBERUxFVEUgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlbCh1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdERUxFVEUnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn1cblxucmVxdWVzdFsnZGVsJ10gPSBkZWw7XG5yZXF1ZXN0WydkZWxldGUnXSA9IGRlbDtcblxuLyoqXG4gKiBQQVRDSCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBPU1QgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BPU1QnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUFVUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gbnVsbCAhPT0gb2JqICYmICdvYmplY3QnID09PSB0eXBlb2Ygb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBvZiBtaXhlZC1pbiBmdW5jdGlvbnMgc2hhcmVkIGJldHdlZW4gbm9kZSBhbmQgY2xpZW50IGNvZGVcbiAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RCYXNlYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3RCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXF1ZXN0QmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uIF9jbGVhclRpbWVvdXQoKXtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgZGVsZXRlIHRoaXMuX3RpbWVyO1xuICBkZWxldGUgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXI7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIGJvZHkgcGFyc2VyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGluY29taW5nIGRhdGEgaW50byByZXF1ZXN0LmJvZHlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShmbil7XG4gIHRoaXMuX3BhcnNlciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGZvcm1hdCBvZiBiaW5hcnkgcmVzcG9uc2UgYm9keS5cbiAqIEluIGJyb3dzZXIgdmFsaWQgZm9ybWF0cyBhcmUgJ2Jsb2InIGFuZCAnYXJyYXlidWZmZXInLFxuICogd2hpY2ggcmV0dXJuIEJsb2IgYW5kIEFycmF5QnVmZmVyLCByZXNwZWN0aXZlbHkuXG4gKlxuICogSW4gTm9kZSBhbGwgdmFsdWVzIHJlc3VsdCBpbiBCdWZmZXIuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAucmVzcG9uc2VUeXBlKCdibG9iJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlc3BvbnNlVHlwZSA9IGZ1bmN0aW9uKHZhbCl7XG4gIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVxdWVzdCBib2R5IHNlcmlhbGl6ZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgZGF0YSBzZXQgdmlhIC5zZW5kIG9yIC5hdHRhY2ggaW50byBwYXlsb2FkIHRvIHNlbmRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gc2VyaWFsaXplKGZuKXtcbiAgdGhpcy5fc2VyaWFsaXplciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRpbWVvdXRzLlxuICpcbiAqIC0gcmVzcG9uc2UgdGltZW91dCBpcyB0aW1lIGJldHdlZW4gc2VuZGluZyByZXF1ZXN0IGFuZCByZWNlaXZpbmcgdGhlIGZpcnN0IGJ5dGUgb2YgdGhlIHJlc3BvbnNlLiBJbmNsdWRlcyBETlMgYW5kIGNvbm5lY3Rpb24gdGltZS5cbiAqIC0gZGVhZGxpbmUgaXMgdGhlIHRpbWUgZnJvbSBzdGFydCBvZiB0aGUgcmVxdWVzdCB0byByZWNlaXZpbmcgcmVzcG9uc2UgYm9keSBpbiBmdWxsLiBJZiB0aGUgZGVhZGxpbmUgaXMgdG9vIHNob3J0IGxhcmdlIGZpbGVzIG1heSBub3QgbG9hZCBhdCBhbGwgb24gc2xvdyBjb25uZWN0aW9ucy5cbiAqXG4gKiBWYWx1ZSBvZiAwIG9yIGZhbHNlIG1lYW5zIG5vIHRpbWVvdXQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBtcyBvciB7cmVzcG9uc2UsIGRlYWRsaW5lfVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gdGltZW91dChvcHRpb25zKXtcbiAgaWYgKCFvcHRpb25zIHx8ICdvYmplY3QnICE9PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zO1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3IodmFyIG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucy5kZWFkbGluZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IG9wdGlvbnMucmVzcG9uc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biB0aW1lb3V0IG9wdGlvblwiLCBvcHRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gcmV0cnkoY291bnQsIGZuKXtcbiAgLy8gRGVmYXVsdCB0byAxIGlmIG5vIGNvdW50IHBhc3NlZCBvciB0cnVlXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IGNvdW50ID09PSB0cnVlKSBjb3VudCA9IDE7XG4gIGlmIChjb3VudCA8PSAwKSBjb3VudCA9IDA7XG4gIHRoaXMuX21heFJldHJpZXMgPSBjb3VudDtcbiAgdGhpcy5fcmV0cmllcyA9IDA7XG4gIHRoaXMuX3JldHJ5Q2FsbGJhY2sgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG52YXIgRVJST1JfQ09ERVMgPSBbXG4gICdFQ09OTlJFU0VUJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFQUREUklORk8nLFxuICAnRVNPQ0tFVFRJTUVET1VUJ1xuXTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSByZXF1ZXN0IHNob3VsZCBiZSByZXRyaWVkLlxuICogKEJvcnJvd2VkIGZyb20gc2VnbWVudGlvL3N1cGVyYWdlbnQtcmV0cnkpXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzXVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fc2hvdWxkUmV0cnkgPSBmdW5jdGlvbihlcnIsIHJlcykge1xuICBpZiAoIXRoaXMuX21heFJldHJpZXMgfHwgdGhpcy5fcmV0cmllcysrID49IHRoaXMuX21heFJldHJpZXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHRoaXMuX3JldHJ5Q2FsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG92ZXJyaWRlID0gdGhpcy5fcmV0cnlDYWxsYmFjayhlcnIsIHJlcyk7XG4gICAgICBpZiAob3ZlcnJpZGUgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKG92ZXJyaWRlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gdW5kZWZpbmVkIGZhbGxzIGJhY2sgdG8gZGVmYXVsdHNcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfVxuICB9XG4gIGlmIChyZXMgJiYgcmVzLnN0YXR1cyAmJiByZXMuc3RhdHVzID49IDUwMCAmJiByZXMuc3RhdHVzICE9IDUwMSkgcmV0dXJuIHRydWU7XG4gIGlmIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgJiYgfkVSUk9SX0NPREVTLmluZGV4T2YoZXJyLmNvZGUpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBTdXBlcmFnZW50IHRpbWVvdXRcbiAgICBpZiAoZXJyLnRpbWVvdXQgJiYgZXJyLmNvZGUgPT0gJ0VDT05OQUJPUlRFRCcpIHJldHVybiB0cnVlO1xuICAgIGlmIChlcnIuY3Jvc3NEb21haW4pIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmV0cnkgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9yZXRyeSA9IGZ1bmN0aW9uKCkge1xuXG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG5cbiAgLy8gbm9kZVxuICBpZiAodGhpcy5yZXEpIHtcbiAgICB0aGlzLnJlcSA9IG51bGw7XG4gICAgdGhpcy5yZXEgPSB0aGlzLnJlcXVlc3QoKTtcbiAgfVxuXG4gIHRoaXMuX2Fib3J0ZWQgPSBmYWxzZTtcbiAgdGhpcy50aW1lZG91dCA9IGZhbHNlO1xuXG4gIHJldHVybiB0aGlzLl9lbmQoKTtcbn07XG5cbi8qKlxuICogUHJvbWlzZSBzdXBwb3J0XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3JlamVjdF1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiB0aGVuKHJlc29sdmUsIHJlamVjdCkge1xuICBpZiAoIXRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICh0aGlzLl9lbmRDYWxsZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IHN1cGVyYWdlbnQgcmVxdWVzdCB3YXMgc2VudCB0d2ljZSwgYmVjYXVzZSBib3RoIC5lbmQoKSBhbmQgLnRoZW4oKSB3ZXJlIGNhbGxlZC4gTmV2ZXIgY2FsbCAuZW5kKCkgaWYgeW91IHVzZSBwcm9taXNlc1wiKTtcbiAgICB9XG4gICAgdGhpcy5fZnVsbGZpbGxlZFByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihpbm5lclJlc29sdmUsIGlubmVyUmVqZWN0KSB7XG4gICAgICBzZWxmLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1xuICAgICAgICBpZiAoZXJyKSBpbm5lclJlamVjdChlcnIpO1xuICAgICAgICBlbHNlIGlubmVyUmVzb2x2ZShyZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jYXRjaCA9IGZ1bmN0aW9uKGNiKSB7XG4gIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBjYik7XG59O1xuXG4vKipcbiAqIEFsbG93IGZvciBleHRlbnNpb25cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5vayA9IGZ1bmN0aW9uKGNiKSB7XG4gIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2IpIHRocm93IEVycm9yKFwiQ2FsbGJhY2sgcmVxdWlyZWRcIik7XG4gIHRoaXMuX29rQ2FsbGJhY2sgPSBjYjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2lzUmVzcG9uc2VPSyA9IGZ1bmN0aW9uKHJlcykge1xuICBpZiAoIXJlcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9va0NhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX29rQ2FsbGJhY2socmVzKTtcbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwO1xufTtcblxuLyoqXG4gKiBHZXQgcmVxdWVzdCBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICogVGhpcyBpcyBhIGRlcHJlY2F0ZWQgaW50ZXJuYWwgQVBJLiBVc2UgYC5nZXQoZmllbGQpYCBpbnN0ZWFkLlxuICpcbiAqIChnZXRIZWFkZXIgaXMgbm8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc3VwZXJhZ2VudCBjb2RlIGJhc2UpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqIEBkZXByZWNhdGVkXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldEhlYWRlciA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQ7XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBmaWVsZCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsO1xuICB0aGlzLmhlYWRlcltmaWVsZF0gPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGVhZGVyIGBmaWVsZGAuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIGRlbGV0ZSB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG4gIGRlbGV0ZSB0aGlzLmhlYWRlcltmaWVsZF07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZSB0aGUgZmllbGQgYG5hbWVgIGFuZCBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdFxuICogZm9yIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIHJlcXVlc3QgYm9kaWVzLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKCdmb28nLCAnYmFyJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKHsgZm9vOiAnYmFyJywgYmF6OiAncXV4JyB9KVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfEJ1ZmZlcnxmcy5SZWFkU3RyZWFtfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gIC8vIG5hbWUgc2hvdWxkIGJlIGVpdGhlciBhIHN0cmluZyBvciBhbiBvYmplY3QuXG4gIGlmIChudWxsID09PSBuYW1lIHx8IHVuZGVmaW5lZCA9PT0gbmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgbmFtZSBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodGhpcy5fZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCIuZmllbGQoKSBjYW4ndCBiZSB1c2VkIGlmIC5zZW5kKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICB0aGlzLmZpZWxkKGtleSwgbmFtZVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgZm9yICh2YXIgaSBpbiB2YWwpIHtcbiAgICAgIHRoaXMuZmllbGQobmFtZSwgdmFsW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB2YWwgc2hvdWxkIGJlIGRlZmluZWQgbm93XG4gIGlmIChudWxsID09PSB2YWwgfHwgdW5kZWZpbmVkID09PSB2YWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIHZhbCBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PT0gdHlwZW9mIHZhbCkge1xuICAgIHZhbCA9ICcnICsgdmFsO1xuICB9XG4gIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKG5hbWUsIHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBYm9ydCB0aGUgcmVxdWVzdCwgYW5kIGNsZWFyIHBvdGVudGlhbCB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2Fib3J0ZWQgPSB0cnVlO1xuICB0aGlzLnhociAmJiB0aGlzLnhoci5hYm9ydCgpOyAvLyBicm93c2VyXG4gIHRoaXMucmVxICYmIHRoaXMucmVxLmFib3J0KCk7IC8vIG5vZGVcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgdGhpcy5lbWl0KCdhYm9ydCcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIG9wdGlvbnMsIGJhc2U2NEVuY29kZXIpIHtcbiAgc3dpdGNoIChvcHRpb25zLnR5cGUpIHtcbiAgICBjYXNlICdiYXNpYyc6XG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgYmFzZTY0RW5jb2Rlcih1c2VyICsgJzonICsgcGFzcykpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdhdXRvJzpcbiAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VyO1xuICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3M7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2JlYXJlcic6IC8vIHVzYWdlIHdvdWxkIGJlIC5hdXRoKGFjY2Vzc1Rva2VuLCB7IHR5cGU6ICdiZWFyZXInIH0pXG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHVzZXIpO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0cmFuc21pc3Npb24gb2YgY29va2llcyB3aXRoIHgtZG9tYWluIHJlcXVlc3RzLlxuICpcbiAqIE5vdGUgdGhhdCBmb3IgdGhpcyB0byB3b3JrIHRoZSBvcmlnaW4gbXVzdCBub3QgYmVcbiAqIHVzaW5nIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIgd2l0aCBhIHdpbGRjYXJkLFxuICogYW5kIGFsc28gbXVzdCBzZXQgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiXG4gKiB0byBcInRydWVcIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS53aXRoQ3JlZGVudGlhbHMgPSBmdW5jdGlvbihvbikge1xuICAvLyBUaGlzIGlzIGJyb3dzZXItb25seSBmdW5jdGlvbmFsaXR5LiBOb2RlIHNpZGUgaXMgbm8tb3AuXG4gIGlmIChvbiA9PSB1bmRlZmluZWQpIG9uID0gdHJ1ZTtcbiAgdGhpcy5fd2l0aENyZWRlbnRpYWxzID0gb247XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heCByZWRpcmVjdHMgdG8gYG5gLiBEb2VzIG5vdGluZyBpbiBicm93c2VyIFhIUiBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZWRpcmVjdHMgPSBmdW5jdGlvbihuKXtcbiAgdGhpcy5fbWF4UmVkaXJlY3RzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE1heGltdW0gc2l6ZSBvZiBidWZmZXJlZCByZXNwb25zZSBib2R5LCBpbiBieXRlcy4gQ291bnRzIHVuY29tcHJlc3NlZCBzaXplLlxuICogRGVmYXVsdCAyMDBNQi5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5tYXhSZXNwb25zZVNpemUgPSBmdW5jdGlvbihuKXtcbiAgaWYgKCdudW1iZXInICE9PSB0eXBlb2Ygbikge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkludmFsaWQgYXJndW1lbnRcIik7XG4gIH1cbiAgdGhpcy5fbWF4UmVzcG9uc2VTaXplID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdG8gYSBwbGFpbiBqYXZhc2NyaXB0IG9iamVjdCAobm90IEpTT04gc3RyaW5nKSBvZiBzY2FsYXIgcHJvcGVydGllcy5cbiAqIE5vdGUgYXMgdGhpcyBtZXRob2QgaXMgZGVzaWduZWQgdG8gcmV0dXJuIGEgdXNlZnVsIG5vbi10aGlzIHZhbHVlLFxuICogaXQgY2Fubm90IGJlIGNoYWluZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZXNjcmliaW5nIG1ldGhvZCwgdXJsLCBhbmQgZGF0YSBvZiB0aGlzIHJlcXVlc3RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXG4gICAgdXJsOiB0aGlzLnVybCxcbiAgICBkYXRhOiB0aGlzLl9kYXRhLFxuICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcixcbiAgfTtcbn07XG5cbi8qKlxuICogU2VuZCBgZGF0YWAgYXMgdGhlIHJlcXVlc3QgYm9keSwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBtYW51YWwganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdqc29uJylcbiAqICAgICAgICAgLnNlbmQoJ3tcIm5hbWVcIjpcInRqXCJ9JylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCgnbmFtZT10b2JpJylcbiAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIGlzT2JqID0gaXNPYmplY3QoZGF0YSk7XG4gIHZhciB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcblxuICBpZiAodGhpcy5fZm9ybURhdGEpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiLnNlbmQoKSBjYW4ndCBiZSB1c2VkIGlmIC5hdHRhY2goKSBvciAuZmllbGQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCIpO1xuICB9XG5cbiAgaWYgKGlzT2JqICYmICF0aGlzLl9kYXRhKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGF0YSAmJiB0aGlzLl9kYXRhICYmIHRoaXMuX2lzSG9zdCh0aGlzLl9kYXRhKSkge1xuICAgIHRocm93IEVycm9yKFwiQ2FuJ3QgbWVyZ2UgdGhlc2Ugc2VuZCBjYWxsc1wiKTtcbiAgfVxuXG4gIC8vIG1lcmdlXG4gIGlmIChpc09iaiAmJiBpc09iamVjdCh0aGlzLl9kYXRhKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICB0aGlzLl9kYXRhW2tleV0gPSBkYXRhW2tleV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBkYXRhKSB7XG4gICAgLy8gZGVmYXVsdCB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIGlmICgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyA9PSB0eXBlKSB7XG4gICAgICB0aGlzLl9kYXRhID0gdGhpcy5fZGF0YVxuICAgICAgICA/IHRoaXMuX2RhdGEgKyAnJicgKyBkYXRhXG4gICAgICAgIDogZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YSA9ICh0aGlzLl9kYXRhIHx8ICcnKSArIGRhdGE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG5cbiAgaWYgKCFpc09iaiB8fCB0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGRlZmF1bHQgdG8ganNvblxuICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnanNvbicpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU29ydCBgcXVlcnlzdHJpbmdgIGJ5IHRoZSBzb3J0IGZ1bmN0aW9uXG4gKlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIGRlZmF1bHQgb3JkZXJcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KClcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBjdXN0b21pemVkIHNvcnQgZnVuY3Rpb25cbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KGZ1bmN0aW9uKGEsIGIpe1xuICogICAgICAgICAgIHJldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoO1xuICogICAgICAgICB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNvcnRRdWVyeSA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgLy8gX3NvcnQgZGVmYXVsdCB0byB0cnVlIGJ1dCBvdGhlcndpc2UgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYm9vbGVhblxuICB0aGlzLl9zb3J0ID0gdHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IHNvcnQ7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb21wb3NlIHF1ZXJ5c3RyaW5nIHRvIGFwcGVuZCB0byByZXEudXJsXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fZmluYWxpemVRdWVyeVN0cmluZyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgdGhpcy51cmwgKz0gKHRoaXMudXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nKSArIHF1ZXJ5O1xuICB9XG4gIHRoaXMuX3F1ZXJ5Lmxlbmd0aCA9IDA7IC8vIE1ha2VzIHRoZSBjYWxsIGlkZW1wb3RlbnRcblxuICBpZiAodGhpcy5fc29ydCkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdmFyIHF1ZXJ5QXJyID0gdGhpcy51cmwuc3Vic3RyaW5nKGluZGV4ICsgMSkuc3BsaXQoJyYnKTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgdGhpcy5fc29ydCkge1xuICAgICAgICBxdWVyeUFyci5zb3J0KHRoaXMuX3NvcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCgpO1xuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSB0aGlzLnVybC5zdWJzdHJpbmcoMCwgaW5kZXgpICsgJz8nICsgcXVlcnlBcnIuam9pbignJicpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRm9yIGJhY2t3YXJkcyBjb21wYXQgb25seVxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hcHBlbmRRdWVyeVN0cmluZyA9IGZ1bmN0aW9uKCkge2NvbnNvbGUudHJhY2UoXCJVbnN1cHBvcnRlZFwiKTt9XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3RpbWVvdXRFcnJvciA9IGZ1bmN0aW9uKHJlYXNvbiwgdGltZW91dCwgZXJybm8pe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgZXJyID0gbmV3IEVycm9yKHJlYXNvbiArIHRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnKTtcbiAgZXJyLnRpbWVvdXQgPSB0aW1lb3V0O1xuICBlcnIuY29kZSA9ICdFQ09OTkFCT1JURUQnO1xuICBlcnIuZXJybm8gPSBlcnJubztcbiAgdGhpcy50aW1lZG91dCA9IHRydWU7XG4gIHRoaXMuYWJvcnQoKTtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zZXRUaW1lb3V0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gZGVhZGxpbmVcbiAgaWYgKHRoaXMuX3RpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1RpbWVvdXQgb2YgJywgc2VsZi5fdGltZW91dCwgJ0VUSU1FJyk7XG4gICAgfSwgdGhpcy5fdGltZW91dCk7XG4gIH1cbiAgLy8gcmVzcG9uc2UgdGltZW91dFxuICBpZiAodGhpcy5fcmVzcG9uc2VUaW1lb3V0ICYmICF0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdSZXNwb25zZSB0aW1lb3V0IG9mICcsIHNlbGYuX3Jlc3BvbnNlVGltZW91dCwgJ0VUSU1FRE9VVCcpO1xuICAgIH0sIHRoaXMuX3Jlc3BvbnNlVGltZW91dCk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZUJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2VCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlQmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZUJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIFJlc3BvbnNlQmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlc3BvbnNlQmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpIHtcbiAgcmV0dXJuIHRoaXMuaGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIHJlbGF0ZWQgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gYC50eXBlYCB0aGUgY29udGVudCB0eXBlIHdpdGhvdXQgcGFyYW1zXG4gKlxuICogQSByZXNwb25zZSBvZiBcIkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiXG4gKiB3aWxsIHByb3ZpZGUgeW91IHdpdGggYSBgLnR5cGVgIG9mIFwidGV4dC9wbGFpblwiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldEhlYWRlclByb3BlcnRpZXMgPSBmdW5jdGlvbihoZWFkZXIpe1xuICAgIC8vIFRPRE86IG1vYXIhXG4gICAgLy8gVE9ETzogbWFrZSB0aGlzIGEgdXRpbFxuXG4gICAgLy8gY29udGVudC10eXBlXG4gICAgdmFyIGN0ID0gaGVhZGVyWydjb250ZW50LXR5cGUnXSB8fCAnJztcbiAgICB0aGlzLnR5cGUgPSB1dGlscy50eXBlKGN0KTtcblxuICAgIC8vIHBhcmFtc1xuICAgIHZhciBwYXJhbXMgPSB1dGlscy5wYXJhbXMoY3QpO1xuICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xuXG4gICAgdGhpcy5saW5rcyA9IHt9O1xuXG4gICAgLy8gbGlua3NcbiAgICB0cnkge1xuICAgICAgICBpZiAoaGVhZGVyLmxpbmspIHtcbiAgICAgICAgICAgIHRoaXMubGlua3MgPSB1dGlscy5wYXJzZUxpbmtzKGhlYWRlci5saW5rKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICB9XG59O1xuXG4vKipcbiAqIFNldCBmbGFncyBzdWNoIGFzIGAub2tgIGJhc2VkIG9uIGBzdGF0dXNgLlxuICpcbiAqIEZvciBleGFtcGxlIGEgMnh4IHJlc3BvbnNlIHdpbGwgZ2l2ZSB5b3UgYSBgLm9rYCBvZiBfX3RydWVfX1xuICogd2hlcmVhcyA1eHggd2lsbCBiZSBfX2ZhbHNlX18gYW5kIGAuZXJyb3JgIHdpbGwgYmUgX190cnVlX18uIFRoZVxuICogYC5jbGllbnRFcnJvcmAgYW5kIGAuc2VydmVyRXJyb3JgIGFyZSBhbHNvIGF2YWlsYWJsZSB0byBiZSBtb3JlXG4gKiBzcGVjaWZpYywgYW5kIGAuc3RhdHVzVHlwZWAgaXMgdGhlIGNsYXNzIG9mIGVycm9yIHJhbmdpbmcgZnJvbSAxLi41XG4gKiBzb21ldGltZXMgdXNlZnVsIGZvciBtYXBwaW5nIHJlc3BvbmQgY29sb3JzIGV0Yy5cbiAqXG4gKiBcInN1Z2FyXCIgcHJvcGVydGllcyBhcmUgYWxzbyBkZWZpbmVkIGZvciBjb21tb24gY2FzZXMuIEN1cnJlbnRseSBwcm92aWRpbmc6XG4gKlxuICogICAtIC5ub0NvbnRlbnRcbiAqICAgLSAuYmFkUmVxdWVzdFxuICogICAtIC51bmF1dGhvcml6ZWRcbiAqICAgLSAubm90QWNjZXB0YWJsZVxuICogICAtIC5ub3RGb3VuZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldFN0YXR1c1Byb3BlcnRpZXMgPSBmdW5jdGlvbihzdGF0dXMpe1xuICAgIHZhciB0eXBlID0gc3RhdHVzIC8gMTAwIHwgMDtcblxuICAgIC8vIHN0YXR1cyAvIGNsYXNzXG4gICAgdGhpcy5zdGF0dXMgPSB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXM7XG4gICAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZTtcblxuICAgIC8vIGJhc2ljc1xuICAgIHRoaXMuaW5mbyA9IDEgPT0gdHlwZTtcbiAgICB0aGlzLm9rID0gMiA9PSB0eXBlO1xuICAgIHRoaXMucmVkaXJlY3QgPSAzID09IHR5cGU7XG4gICAgdGhpcy5jbGllbnRFcnJvciA9IDQgPT0gdHlwZTtcbiAgICB0aGlzLnNlcnZlckVycm9yID0gNSA9PSB0eXBlO1xuICAgIHRoaXMuZXJyb3IgPSAoNCA9PSB0eXBlIHx8IDUgPT0gdHlwZSlcbiAgICAgICAgPyB0aGlzLnRvRXJyb3IoKVxuICAgICAgICA6IGZhbHNlO1xuXG4gICAgLy8gc3VnYXJcbiAgICB0aGlzLmFjY2VwdGVkID0gMjAyID09IHN0YXR1cztcbiAgICB0aGlzLm5vQ29udGVudCA9IDIwNCA9PSBzdGF0dXM7XG4gICAgdGhpcy5iYWRSZXF1ZXN0ID0gNDAwID09IHN0YXR1cztcbiAgICB0aGlzLnVuYXV0aG9yaXplZCA9IDQwMSA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub3RBY2NlcHRhYmxlID0gNDA2ID09IHN0YXR1cztcbiAgICB0aGlzLmZvcmJpZGRlbiA9IDQwMyA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub3RGb3VuZCA9IDQwNCA9PSBzdGF0dXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJldHVybiB0aGUgbWltZSB0eXBlIGZvciB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy50eXBlID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICo7ICovKS5zaGlmdCgpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gaGVhZGVyIGZpZWxkIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJhbXMgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnJlZHVjZShmdW5jdGlvbihvYmosIHN0cil7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKj0gKi8pO1xuICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIHZhciB2YWwgPSBwYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKGtleSAmJiB2YWwpIG9ialtrZXldID0gdmFsO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn07XG5cbi8qKlxuICogUGFyc2UgTGluayBoZWFkZXIgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyc2VMaW5rcyA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqLCAqLykucmVkdWNlKGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqOyAqLyk7XG4gICAgdmFyIHVybCA9IHBhcnRzWzBdLnNsaWNlKDEsIC0xKTtcbiAgICB2YXIgcmVsID0gcGFydHNbMV0uc3BsaXQoLyAqPSAqLylbMV0uc2xpY2UoMSwgLTEpO1xuICAgIG9ialtyZWxdID0gdXJsO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn07XG5cbi8qKlxuICogU3RyaXAgY29udGVudCByZWxhdGVkIGZpZWxkcyBmcm9tIGBoZWFkZXJgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEByZXR1cm4ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmNsZWFuSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyLCBzaG91bGRTdHJpcENvb2tpZSl7XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICBkZWxldGUgaGVhZGVyWydjb250ZW50LWxlbmd0aCddO1xuICBkZWxldGUgaGVhZGVyWyd0cmFuc2Zlci1lbmNvZGluZyddO1xuICBkZWxldGUgaGVhZGVyWydob3N0J107XG4gIGlmIChzaG91bGRTdHJpcENvb2tpZSkge1xuICAgIGRlbGV0ZSBoZWFkZXJbJ2Nvb2tpZSddO1xuICB9XG4gIHJldHVybiBoZWFkZXI7XG59O1xuIiwidmFyIFZ1ZSAvLyBsYXRlIGJpbmRcbnZhciB2ZXJzaW9uXG52YXIgbWFwID0gKHdpbmRvdy5fX1ZVRV9IT1RfTUFQX18gPSBPYmplY3QuY3JlYXRlKG51bGwpKVxudmFyIGluc3RhbGxlZCA9IGZhbHNlXG52YXIgaXNCcm93c2VyaWZ5ID0gZmFsc2VcbnZhciBpbml0SG9va05hbWUgPSAnYmVmb3JlQ3JlYXRlJ1xuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAodnVlLCBicm93c2VyaWZ5KSB7XG4gIGlmIChpbnN0YWxsZWQpIHsgcmV0dXJuIH1cbiAgaW5zdGFsbGVkID0gdHJ1ZVxuXG4gIFZ1ZSA9IHZ1ZS5fX2VzTW9kdWxlID8gdnVlLmRlZmF1bHQgOiB2dWVcbiAgdmVyc2lvbiA9IFZ1ZS52ZXJzaW9uLnNwbGl0KCcuJykubWFwKE51bWJlcilcbiAgaXNCcm93c2VyaWZ5ID0gYnJvd3NlcmlmeVxuXG4gIC8vIGNvbXBhdCB3aXRoIDwgMi4wLjAtYWxwaGEuN1xuICBpZiAoVnVlLmNvbmZpZy5fbGlmZWN5Y2xlSG9va3MuaW5kZXhPZignaW5pdCcpID4gLTEpIHtcbiAgICBpbml0SG9va05hbWUgPSAnaW5pdCdcbiAgfVxuXG4gIGV4cG9ydHMuY29tcGF0aWJsZSA9IHZlcnNpb25bMF0gPj0gMlxuICBpZiAoIWV4cG9ydHMuY29tcGF0aWJsZSkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdbSE1SXSBZb3UgYXJlIHVzaW5nIGEgdmVyc2lvbiBvZiB2dWUtaG90LXJlbG9hZC1hcGkgdGhhdCBpcyAnICtcbiAgICAgICAgJ29ubHkgY29tcGF0aWJsZSB3aXRoIFZ1ZS5qcyBjb3JlIF4yLjAuMC4nXG4gICAgKVxuICAgIHJldHVyblxuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcmVjb3JkIGZvciBhIGhvdCBtb2R1bGUsIHdoaWNoIGtlZXBzIHRyYWNrIG9mIGl0cyBjb25zdHJ1Y3RvclxuICogYW5kIGluc3RhbmNlc1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuXG5leHBvcnRzLmNyZWF0ZVJlY29yZCA9IGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuICB2YXIgQ3RvciA9IG51bGxcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgQ3RvciA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0gQ3Rvci5vcHRpb25zXG4gIH1cbiAgbWFrZU9wdGlvbnNIb3QoaWQsIG9wdGlvbnMpXG4gIG1hcFtpZF0gPSB7XG4gICAgQ3RvcjogQ3RvcixcbiAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgIGluc3RhbmNlczogW11cbiAgfVxufVxuXG4vKipcbiAqIE1ha2UgYSBDb21wb25lbnQgb3B0aW9ucyBvYmplY3QgaG90LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuXG5mdW5jdGlvbiBtYWtlT3B0aW9uc0hvdChpZCwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgdmFyIHJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiAoaCwgY3R4KSB7XG4gICAgICB2YXIgaW5zdGFuY2VzID0gbWFwW2lkXS5pbnN0YW5jZXNcbiAgICAgIGlmIChpbnN0YW5jZXMuaW5kZXhPZihjdHgucGFyZW50KSA8IDApIHtcbiAgICAgICAgaW5zdGFuY2VzLnB1c2goY3R4LnBhcmVudClcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXIoaCwgY3R4KVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpbmplY3RIb29rKG9wdGlvbnMsIGluaXRIb29rTmFtZSwgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVjb3JkID0gbWFwW2lkXVxuICAgICAgaWYgKCFyZWNvcmQuQ3Rvcikge1xuICAgICAgICByZWNvcmQuQ3RvciA9IHRoaXMuY29uc3RydWN0b3JcbiAgICAgIH1cbiAgICAgIHJlY29yZC5pbnN0YW5jZXMucHVzaCh0aGlzKVxuICAgIH0pXG4gICAgaW5qZWN0SG9vayhvcHRpb25zLCAnYmVmb3JlRGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGluc3RhbmNlcyA9IG1hcFtpZF0uaW5zdGFuY2VzXG4gICAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKHRoaXMpLCAxKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBJbmplY3QgYSBob29rIHRvIGEgaG90IHJlbG9hZGFibGUgY29tcG9uZW50IHNvIHRoYXRcbiAqIHdlIGNhbiBrZWVwIHRyYWNrIG9mIGl0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va1xuICovXG5cbmZ1bmN0aW9uIGluamVjdEhvb2sob3B0aW9ucywgbmFtZSwgaG9vaykge1xuICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zW25hbWVdXG4gIG9wdGlvbnNbbmFtZV0gPSBleGlzdGluZ1xuICAgID8gQXJyYXkuaXNBcnJheShleGlzdGluZykgPyBleGlzdGluZy5jb25jYXQoaG9vaykgOiBbZXhpc3RpbmcsIGhvb2tdXG4gICAgOiBbaG9va11cbn1cblxuZnVuY3Rpb24gdHJ5V3JhcChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKGlkLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgZm4oaWQsIGFyZylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZyBkdXJpbmcgVnVlIGNvbXBvbmVudCBob3QtcmVsb2FkLiBGdWxsIHJlbG9hZCByZXF1aXJlZC4nXG4gICAgICApXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU9wdGlvbnMgKG9sZE9wdGlvbnMsIG5ld09wdGlvbnMpIHtcbiAgZm9yICh2YXIga2V5IGluIG9sZE9wdGlvbnMpIHtcbiAgICBpZiAoIShrZXkgaW4gbmV3T3B0aW9ucykpIHtcbiAgICAgIGRlbGV0ZSBvbGRPcHRpb25zW2tleV1cbiAgICB9XG4gIH1cbiAgZm9yICh2YXIga2V5JDEgaW4gbmV3T3B0aW9ucykge1xuICAgIG9sZE9wdGlvbnNba2V5JDFdID0gbmV3T3B0aW9uc1trZXkkMV1cbiAgfVxufVxuXG5leHBvcnRzLnJlcmVuZGVyID0gdHJ5V3JhcChmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcbiAgdmFyIHJlY29yZCA9IG1hcFtpZF1cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgcmVjb3JkLmluc3RhbmNlcy5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICBpbnN0YW5jZS4kZm9yY2VVcGRhdGUoKVxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMub3B0aW9uc1xuICB9XG4gIGlmIChyZWNvcmQuQ3Rvcikge1xuICAgIHJlY29yZC5DdG9yLm9wdGlvbnMucmVuZGVyID0gb3B0aW9ucy5yZW5kZXJcbiAgICByZWNvcmQuQ3Rvci5vcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zXG4gICAgcmVjb3JkLmluc3RhbmNlcy5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICBpbnN0YW5jZS4kb3B0aW9ucy5yZW5kZXIgPSBvcHRpb25zLnJlbmRlclxuICAgICAgaW5zdGFuY2UuJG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnNcbiAgICAgIC8vIHJlc2V0IHN0YXRpYyB0cmVlc1xuICAgICAgaWYgKGluc3RhbmNlLl9zdGF0aWNUcmVlcykge1xuICAgICAgICAvLyBwcmUgMi41IHN0YXRpY1RyZWVzIGFyZSBjYWNoZWQgcGVyLWluc3RhbmNlXG4gICAgICAgIGluc3RhbmNlLl9zdGF0aWNUcmVlcyA9IFtdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBwb3N0IDIuNSBzdGF0aWNUcmVlcyBhcmUgY2FjaGVkIG9uIHNoYXJlZCBvcHRpb25zXG4gICAgICAgIHJlY29yZC5DdG9yLm9wdGlvbnMuX3N0YXRpY1RyZWVzID0gW11cbiAgICAgIH1cbiAgICAgIGluc3RhbmNlLiRmb3JjZVVwZGF0ZSgpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICAvLyBmdW5jdGlvbmFsIG9yIG5vIGluc3RhbmNlIGNyZWF0ZWQgeWV0XG4gICAgcmVjb3JkLm9wdGlvbnMucmVuZGVyID0gb3B0aW9ucy5yZW5kZXJcbiAgICByZWNvcmQub3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSBvcHRpb25zLnN0YXRpY1JlbmRlckZuc1xuXG4gICAgLy8gaGFuZGxlIGZ1bmN0aW9uYWwgY29tcG9uZW50IHJlLXJlbmRlclxuICAgIGlmIChyZWNvcmQub3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgICAvLyByZXJlbmRlciB3aXRoIGZ1bGwgb3B0aW9uc1xuICAgICAgaWYgKE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgdXBkYXRlT3B0aW9ucyhyZWNvcmQub3B0aW9ucywgb3B0aW9ucylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRlbXBsYXRlLW9ubHkgcmVyZW5kZXIuXG4gICAgICAgIC8vIG5lZWQgdG8gaW5qZWN0IHRoZSBzdHlsZSBpbmplY3Rpb24gY29kZSBmb3IgQ1NTIG1vZHVsZXNcbiAgICAgICAgLy8gdG8gd29yayBwcm9wZXJseS5cbiAgICAgICAgdmFyIGluamVjdFN0eWxlcyA9IHJlY29yZC5vcHRpb25zLl9pbmplY3RTdHlsZXNcbiAgICAgICAgaWYgKGluamVjdFN0eWxlcykge1xuICAgICAgICAgIHZhciByZW5kZXIgPSBvcHRpb25zLnJlbmRlclxuICAgICAgICAgIHJlY29yZC5vcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIChoLCBjdHgpIHtcbiAgICAgICAgICAgIGluamVjdFN0eWxlcy5jYWxsKGN0eClcbiAgICAgICAgICAgIHJldHVybiByZW5kZXIoaCwgY3R4KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVjb3JkLm9wdGlvbnMuX0N0b3IgPSBudWxsXG4gICAgICByZWNvcmQub3B0aW9ucy5fc3RhdGljVHJlZXMgPSBbXVxuICAgICAgcmVjb3JkLmluc3RhbmNlcy5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgIGluc3RhbmNlLiRmb3JjZVVwZGF0ZSgpXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSlcblxuZXhwb3J0cy5yZWxvYWQgPSB0cnlXcmFwKGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuICB2YXIgcmVjb3JkID0gbWFwW2lkXVxuICBpZiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMub3B0aW9uc1xuICAgIH1cbiAgICBtYWtlT3B0aW9uc0hvdChpZCwgb3B0aW9ucylcbiAgICBpZiAocmVjb3JkLkN0b3IpIHtcbiAgICAgIGlmICh2ZXJzaW9uWzFdIDwgMikge1xuICAgICAgICAvLyBwcmVzZXJ2ZSBwcmUgMi4yIGJlaGF2aW9yIGZvciBnbG9iYWwgbWl4aW4gaGFuZGxpbmdcbiAgICAgICAgcmVjb3JkLkN0b3IuZXh0ZW5kT3B0aW9ucyA9IG9wdGlvbnNcbiAgICAgIH1cbiAgICAgIHZhciBuZXdDdG9yID0gcmVjb3JkLkN0b3Iuc3VwZXIuZXh0ZW5kKG9wdGlvbnMpXG4gICAgICByZWNvcmQuQ3Rvci5vcHRpb25zID0gbmV3Q3Rvci5vcHRpb25zXG4gICAgICByZWNvcmQuQ3Rvci5jaWQgPSBuZXdDdG9yLmNpZFxuICAgICAgcmVjb3JkLkN0b3IucHJvdG90eXBlID0gbmV3Q3Rvci5wcm90b3R5cGVcbiAgICAgIGlmIChuZXdDdG9yLnJlbGVhc2UpIHtcbiAgICAgICAgLy8gdGVtcG9yYXJ5IGdsb2JhbCBtaXhpbiBzdHJhdGVneSB1c2VkIGluIDwgMi4wLjAtYWxwaGEuNlxuICAgICAgICBuZXdDdG9yLnJlbGVhc2UoKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVPcHRpb25zKHJlY29yZC5vcHRpb25zLCBvcHRpb25zKVxuICAgIH1cbiAgfVxuICByZWNvcmQuaW5zdGFuY2VzLnNsaWNlKCkuZm9yRWFjaChmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICBpZiAoaW5zdGFuY2UuJHZub2RlICYmIGluc3RhbmNlLiR2bm9kZS5jb250ZXh0KSB7XG4gICAgICBpbnN0YW5jZS4kdm5vZGUuY29udGV4dC4kZm9yY2VVcGRhdGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdSb290IG9yIG1hbnVhbGx5IG1vdW50ZWQgaW5zdGFuY2UgbW9kaWZpZWQuIEZ1bGwgcmVsb2FkIHJlcXVpcmVkLidcbiAgICAgIClcbiAgICB9XG4gIH0pXG59KVxuIiwiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sZSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5WdWVTZWxlY3Q9ZSgpOnQuVnVlU2VsZWN0PWUoKX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbih0KXtmdW5jdGlvbiBlKHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtleHBvcnRzOnt9LGlkOnIsbG9hZGVkOiExfTtyZXR1cm4gdFtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxlKSxvLmxvYWRlZD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGUubT10LGUuYz1uLGUucD1cIi9cIixlKDApfShbZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGUubWl4aW5zPWUuVnVlU2VsZWN0PXZvaWQgMDt2YXIgbz1uKDgzKSxpPXIobyksYT1uKDQyKSxzPXIoYSk7ZS5kZWZhdWx0PWkuZGVmYXVsdCxlLlZ1ZVNlbGVjdD1pLmRlZmF1bHQsZS5taXhpbnM9cy5kZWZhdWx0fSxmdW5jdGlvbih0LGUpe3ZhciBuPXQuZXhwb3J0cz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuTWF0aD09TWF0aD93aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJnNlbGYuTWF0aD09TWF0aD9zZWxmOkZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcIm51bWJlclwiPT10eXBlb2YgX19nJiYoX19nPW4pfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPSFuKDkpKGZ1bmN0aW9uKCl7cmV0dXJuIDchPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcImFcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIDd9fSkuYX0pfSxmdW5jdGlvbih0LGUpe3ZhciBuPXt9Lmhhc093blByb3BlcnR5O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiBuLmNhbGwodCxlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEwKSxvPW4oMzMpLGk9bigyNSksYT1PYmplY3QuZGVmaW5lUHJvcGVydHk7ZS5mPW4oMik/T2JqZWN0LmRlZmluZVByb3BlcnR5OmZ1bmN0aW9uKHQsZSxuKXtpZihyKHQpLGU9aShlLCEwKSxyKG4pLG8pdHJ5e3JldHVybiBhKHQsZSxuKX1jYXRjaCh0KXt9aWYoXCJnZXRcImluIG58fFwic2V0XCJpbiBuKXRocm93IFR5cGVFcnJvcihcIkFjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIVwiKTtyZXR1cm5cInZhbHVlXCJpbiBuJiYodFtlXT1uLnZhbHVlKSx0fX0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9e3ZlcnNpb246XCIyLjUuMVwifTtcIm51bWJlclwiPT10eXBlb2YgX19lJiYoX19lPW4pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0KSxvPW4oMTQpO3QuZXhwb3J0cz1uKDIpP2Z1bmN0aW9uKHQsZSxuKXtyZXR1cm4gci5mKHQsZSxvKDEsbikpfTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIHRbZV09bix0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNTkpLG89bigxNik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByKG8odCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjMpKFwid2tzXCIpLG89bigxNSksaT1uKDEpLlN5bWJvbCxhPVwiZnVuY3Rpb25cIj09dHlwZW9mIGkscz10LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHJbdF18fChyW3RdPWEmJmlbdF18fChhP2k6bykoXCJTeW1ib2wuXCIrdCkpfTtzLnN0b3JlPXJ9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4hIXQoKX1jYXRjaCh0KXtyZXR1cm4hMH19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKCFyKHQpKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhbiBvYmplY3QhXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksbz1uKDUpLGk9big1NiksYT1uKDYpLHM9XCJwcm90b3R5cGVcIix1PWZ1bmN0aW9uKHQsZSxuKXt2YXIgbCxjLGYscD10JnUuRixkPXQmdS5HLGg9dCZ1LlMsYj10JnUuUCx2PXQmdS5CLGc9dCZ1LlcseT1kP286b1tlXXx8KG9bZV09e30pLG09eVtzXSx4PWQ/cjpoP3JbZV06KHJbZV18fHt9KVtzXTtkJiYobj1lKTtmb3IobCBpbiBuKWM9IXAmJngmJnZvaWQgMCE9PXhbbF0sYyYmbCBpbiB5fHwoZj1jP3hbbF06bltsXSx5W2xdPWQmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHhbbF0/bltsXTp2JiZjP2koZixyKTpnJiZ4W2xdPT1mP2Z1bmN0aW9uKHQpe3ZhciBlPWZ1bmN0aW9uKGUsbixyKXtpZih0aGlzIGluc3RhbmNlb2YgdCl7c3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe2Nhc2UgMDpyZXR1cm4gbmV3IHQ7Y2FzZSAxOnJldHVybiBuZXcgdChlKTtjYXNlIDI6cmV0dXJuIG5ldyB0KGUsbil9cmV0dXJuIG5ldyB0KGUsbixyKX1yZXR1cm4gdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O3JldHVybiBlW3NdPXRbc10sZX0oZik6YiYmXCJmdW5jdGlvblwiPT10eXBlb2YgZj9pKEZ1bmN0aW9uLmNhbGwsZik6ZixiJiYoKHkudmlydHVhbHx8KHkudmlydHVhbD17fSkpW2xdPWYsdCZ1LlImJm0mJiFtW2xdJiZhKG0sbCxmKSkpfTt1LkY9MSx1Lkc9Mix1LlM9NCx1LlA9OCx1LkI9MTYsdS5XPTMyLHUuVT02NCx1LlI9MTI4LHQuZXhwb3J0cz11fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgdD9udWxsIT09dDpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzgpLG89bigxNyk7dC5leHBvcnRzPU9iamVjdC5rZXlzfHxmdW5jdGlvbih0KXtyZXR1cm4gcih0LG8pfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57ZW51bWVyYWJsZTohKDEmdCksY29uZmlndXJhYmxlOiEoMiZ0KSx3cml0YWJsZTohKDQmdCksdmFsdWU6ZX19fSxmdW5jdGlvbih0LGUpe3ZhciBuPTAscj1NYXRoLnJhbmRvbSgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIlN5bWJvbChcIi5jb25jYXQodm9pZCAwPT09dD9cIlwiOnQsXCIpX1wiLCgrK24rcikudG9TdHJpbmcoMzYpKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKHZvaWQgMD09dCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIrdCk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1cImNvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZlwiLnNwbGl0KFwiLFwiKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9e319LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPSEwfSxmdW5jdGlvbih0LGUpe2UuZj17fS5wcm9wZXJ0eUlzRW51bWVyYWJsZX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCkuZixvPW4oMyksaT1uKDgpKFwidG9TdHJpbmdUYWdcIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXt0JiYhbyh0PW4/dDp0LnByb3RvdHlwZSxpKSYmcih0LGkse2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTplfSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMykoXCJrZXlzXCIpLG89bigxNSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT1vKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLG89XCJfX2NvcmUtanNfc2hhcmVkX19cIixpPXJbb118fChyW29dPXt9KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGlbdF18fChpW3RdPXt9KX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49TWF0aC5jZWlsLHI9TWF0aC5mbG9vcjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGlzTmFOKHQ9K3QpPzA6KHQ+MD9yOm4pKHQpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe2lmKCFyKHQpKXJldHVybiB0O3ZhciBuLG87aWYoZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIXIobz1uLmNhbGwodCkpKXJldHVybiBvO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC52YWx1ZU9mKSYmIXIobz1uLmNhbGwodCkpKXJldHVybiBvO2lmKCFlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudG9TdHJpbmcpJiYhcihvPW4uY2FsbCh0KSkpcmV0dXJuIG87dGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksbz1uKDUpLGk9bigxOSksYT1uKDI3KSxzPW4oNCkuZjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9by5TeW1ib2x8fChvLlN5bWJvbD1pP3t9OnIuU3ltYm9sfHx7fSk7XCJfXCI9PXQuY2hhckF0KDApfHx0IGluIGV8fHMoZSx0LHt2YWx1ZTphLmYodCl9KX19LGZ1bmN0aW9uKHQsZSxuKXtlLmY9big4KX0sZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9e3Byb3BzOntsb2FkaW5nOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0sb25TZWFyY2g6e3R5cGU6RnVuY3Rpb24sZGVmYXVsdDpmdW5jdGlvbih0LGUpe319fSxkYXRhOmZ1bmN0aW9uKCl7cmV0dXJue211dGFibGVMb2FkaW5nOiExfX0sd2F0Y2g6e3NlYXJjaDpmdW5jdGlvbigpe3RoaXMuc2VhcmNoLmxlbmd0aD4wJiYodGhpcy5vblNlYXJjaCh0aGlzLnNlYXJjaCx0aGlzLnRvZ2dsZUxvYWRpbmcpLHRoaXMuJGVtaXQoXCJzZWFyY2hcIix0aGlzLnNlYXJjaCx0aGlzLnRvZ2dsZUxvYWRpbmcpKX0sbG9hZGluZzpmdW5jdGlvbih0KXt0aGlzLm11dGFibGVMb2FkaW5nPXR9fSxtZXRob2RzOnt0b2dnbGVMb2FkaW5nOmZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOm51bGw7cmV0dXJuIG51bGw9PXQ/dGhpcy5tdXRhYmxlTG9hZGluZz0hdGhpcy5tdXRhYmxlTG9hZGluZzp0aGlzLm11dGFibGVMb2FkaW5nPXR9fX19LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPXt3YXRjaDp7dHlwZUFoZWFkUG9pbnRlcjpmdW5jdGlvbigpe3RoaXMubWF5YmVBZGp1c3RTY3JvbGwoKX19LG1ldGhvZHM6e21heWJlQWRqdXN0U2Nyb2xsOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5waXhlbHNUb1BvaW50ZXJUb3AoKSxlPXRoaXMucGl4ZWxzVG9Qb2ludGVyQm90dG9tKCk7cmV0dXJuIHQ8PXRoaXMudmlld3BvcnQoKS50b3A/dGhpcy5zY3JvbGxUbyh0KTplPj10aGlzLnZpZXdwb3J0KCkuYm90dG9tP3RoaXMuc2Nyb2xsVG8odGhpcy52aWV3cG9ydCgpLnRvcCt0aGlzLnBvaW50ZXJIZWlnaHQoKSk6dm9pZCAwfSxwaXhlbHNUb1BvaW50ZXJUb3A6ZnVuY3Rpb24gdCgpe3ZhciB0PTA7aWYodGhpcy4kcmVmcy5kcm9wZG93bk1lbnUpZm9yKHZhciBlPTA7ZTx0aGlzLnR5cGVBaGVhZFBvaW50ZXI7ZSsrKXQrPXRoaXMuJHJlZnMuZHJvcGRvd25NZW51LmNoaWxkcmVuW2VdLm9mZnNldEhlaWdodDtyZXR1cm4gdH0scGl4ZWxzVG9Qb2ludGVyQm90dG9tOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucGl4ZWxzVG9Qb2ludGVyVG9wKCkrdGhpcy5wb2ludGVySGVpZ2h0KCl9LHBvaW50ZXJIZWlnaHQ6ZnVuY3Rpb24oKXt2YXIgdD0hIXRoaXMuJHJlZnMuZHJvcGRvd25NZW51JiZ0aGlzLiRyZWZzLmRyb3Bkb3duTWVudS5jaGlsZHJlblt0aGlzLnR5cGVBaGVhZFBvaW50ZXJdO3JldHVybiB0P3Qub2Zmc2V0SGVpZ2h0OjB9LHZpZXdwb3J0OmZ1bmN0aW9uKCl7cmV0dXJue3RvcDp0aGlzLiRyZWZzLmRyb3Bkb3duTWVudT90aGlzLiRyZWZzLmRyb3Bkb3duTWVudS5zY3JvbGxUb3A6MCxib3R0b206dGhpcy4kcmVmcy5kcm9wZG93bk1lbnU/dGhpcy4kcmVmcy5kcm9wZG93bk1lbnUub2Zmc2V0SGVpZ2h0K3RoaXMuJHJlZnMuZHJvcGRvd25NZW51LnNjcm9sbFRvcDowfX0sc2Nyb2xsVG86ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuJHJlZnMuZHJvcGRvd25NZW51P3RoaXMuJHJlZnMuZHJvcGRvd25NZW51LnNjcm9sbFRvcD10Om51bGx9fX19LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPXtkYXRhOmZ1bmN0aW9uKCl7cmV0dXJue3R5cGVBaGVhZFBvaW50ZXI6LTF9fSx3YXRjaDp7ZmlsdGVyZWRPcHRpb25zOmZ1bmN0aW9uKCl7dGhpcy50eXBlQWhlYWRQb2ludGVyPTB9fSxtZXRob2RzOnt0eXBlQWhlYWRVcDpmdW5jdGlvbigpe3RoaXMudHlwZUFoZWFkUG9pbnRlcj4wJiYodGhpcy50eXBlQWhlYWRQb2ludGVyLS0sdGhpcy5tYXliZUFkanVzdFNjcm9sbCYmdGhpcy5tYXliZUFkanVzdFNjcm9sbCgpKX0sdHlwZUFoZWFkRG93bjpmdW5jdGlvbigpe3RoaXMudHlwZUFoZWFkUG9pbnRlcjx0aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGgtMSYmKHRoaXMudHlwZUFoZWFkUG9pbnRlcisrLHRoaXMubWF5YmVBZGp1c3RTY3JvbGwmJnRoaXMubWF5YmVBZGp1c3RTY3JvbGwoKSl9LHR5cGVBaGVhZFNlbGVjdDpmdW5jdGlvbigpe3RoaXMuZmlsdGVyZWRPcHRpb25zW3RoaXMudHlwZUFoZWFkUG9pbnRlcl0/dGhpcy5zZWxlY3QodGhpcy5maWx0ZXJlZE9wdGlvbnNbdGhpcy50eXBlQWhlYWRQb2ludGVyXSk6dGhpcy50YWdnYWJsZSYmdGhpcy5zZWFyY2gubGVuZ3RoJiZ0aGlzLnNlbGVjdCh0aGlzLnNlYXJjaCksdGhpcy5jbGVhclNlYXJjaE9uU2VsZWN0JiYodGhpcy5zZWFyY2g9XCJcIil9fX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30udG9TdHJpbmc7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBuLmNhbGwodCkuc2xpY2UoOCwtMSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMiksbz1uKDEpLmRvY3VtZW50LGk9cihvKSYmcihvLmNyZWF0ZUVsZW1lbnQpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaT9vLmNyZWF0ZUVsZW1lbnQodCk6e319fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPSFuKDIpJiYhbig5KShmdW5jdGlvbigpe3JldHVybiA3IT1PYmplY3QuZGVmaW5lUHJvcGVydHkobigzMikoXCJkaXZcIiksXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pLmF9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMTkpLG89bigxMSksaT1uKDM5KSxhPW4oNikscz1uKDMpLHU9bigxOCksbD1uKDYxKSxjPW4oMjEpLGY9big2NykscD1uKDgpKFwiaXRlcmF0b3JcIiksZD0hKFtdLmtleXMmJlwibmV4dFwiaW5bXS5rZXlzKCkpLGg9XCJAQGl0ZXJhdG9yXCIsYj1cImtleXNcIix2PVwidmFsdWVzXCIsZz1mdW5jdGlvbigpe3JldHVybiB0aGlzfTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4seSxtLHgsdyl7bChuLGUseSk7dmFyIFMsTyxfLGo9ZnVuY3Rpb24odCl7aWYoIWQmJnQgaW4gTSlyZXR1cm4gTVt0XTtzd2l0Y2godCl7Y2FzZSBiOnJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgbih0aGlzLHQpfTtjYXNlIHY6cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgbih0aGlzLHQpfX0sUD1lK1wiIEl0ZXJhdG9yXCIsaz1tPT12LEE9ITEsTT10LnByb3RvdHlwZSxMPU1bcF18fE1baF18fG0mJk1bbV0sQz1MfHxqKG0pLFQ9bT9rP2ooXCJlbnRyaWVzXCIpOkM6dm9pZCAwLEU9XCJBcnJheVwiPT1lP00uZW50cmllc3x8TDpMO2lmKEUmJihfPWYoRS5jYWxsKG5ldyB0KSksXyE9PU9iamVjdC5wcm90b3R5cGUmJl8ubmV4dCYmKGMoXyxQLCEwKSxyfHxzKF8scCl8fGEoXyxwLGcpKSksayYmTCYmTC5uYW1lIT09diYmKEE9ITAsQz1mdW5jdGlvbigpe3JldHVybiBMLmNhbGwodGhpcyl9KSxyJiYhd3x8IWQmJiFBJiZNW3BdfHxhKE0scCxDKSx1W2VdPUMsdVtQXT1nLG0paWYoUz17dmFsdWVzOms/QzpqKHYpLGtleXM6eD9DOmooYiksZW50cmllczpUfSx3KWZvcihPIGluIFMpTyBpbiBNfHxpKE0sTyxTW09dKTtlbHNlIG8oby5QK28uRiooZHx8QSksZSxTKTtyZXR1cm4gU319LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEwKSxvPW4oNjQpLGk9bigxNyksYT1uKDIyKShcIklFX1BST1RPXCIpLHM9ZnVuY3Rpb24oKXt9LHU9XCJwcm90b3R5cGVcIixsPWZ1bmN0aW9uKCl7dmFyIHQsZT1uKDMyKShcImlmcmFtZVwiKSxyPWkubGVuZ3RoLG89XCI8XCIsYT1cIj5cIjtmb3IoZS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLG4oNTgpLmFwcGVuZENoaWxkKGUpLGUuc3JjPVwiamF2YXNjcmlwdDpcIix0PWUuY29udGVudFdpbmRvdy5kb2N1bWVudCx0Lm9wZW4oKSx0LndyaXRlKG8rXCJzY3JpcHRcIithK1wiZG9jdW1lbnQuRj1PYmplY3RcIitvK1wiL3NjcmlwdFwiK2EpLHQuY2xvc2UoKSxsPXQuRjtyLS07KWRlbGV0ZSBsW3VdW2lbcl1dO3JldHVybiBsKCl9O3QuZXhwb3J0cz1PYmplY3QuY3JlYXRlfHxmdW5jdGlvbih0LGUpe3ZhciBuO3JldHVybiBudWxsIT09dD8oc1t1XT1yKHQpLG49bmV3IHMsc1t1XT1udWxsLG5bYV09dCk6bj1sKCksdm9pZCAwPT09ZT9uOm8obixlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDM4KSxvPW4oMTcpLmNvbmNhdChcImxlbmd0aFwiLFwicHJvdG90eXBlXCIpO2UuZj1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc3x8ZnVuY3Rpb24odCl7cmV0dXJuIHIodCxvKX19LGZ1bmN0aW9uKHQsZSl7ZS5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHN9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMpLG89big3KSxpPW4oNTUpKCExKSxhPW4oMjIpKFwiSUVfUFJPVE9cIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7dmFyIG4scz1vKHQpLHU9MCxsPVtdO2ZvcihuIGluIHMpbiE9YSYmcihzLG4pJiZsLnB1c2gobik7Zm9yKDtlLmxlbmd0aD51OylyKHMsbj1lW3UrK10pJiYofmkobCxuKXx8bC5wdXNoKG4pKTtyZXR1cm4gbH19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9big2KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTYpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gT2JqZWN0KHIodCkpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oNDQpLGk9cihvKSxhPW4oNDcpLHM9cihhKSx1PW4oNDgpLGw9cih1KSxjPW4oMjkpLGY9cihjKSxwPW4oMzApLGQ9cihwKSxoPW4oMjgpLGI9cihoKTtlLmRlZmF1bHQ9e21peGluczpbZi5kZWZhdWx0LGQuZGVmYXVsdCxiLmRlZmF1bHRdLHByb3BzOnt2YWx1ZTp7ZGVmYXVsdDpudWxsfSxvcHRpb25zOnt0eXBlOkFycmF5LGRlZmF1bHQ6ZnVuY3Rpb24oKXtyZXR1cm5bXX19LGRpc2FibGVkOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0sbWF4SGVpZ2h0Ont0eXBlOlN0cmluZyxkZWZhdWx0OlwiNDAwcHhcIn0sc2VhcmNoYWJsZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LG11bHRpcGxlOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0scGxhY2Vob2xkZXI6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCJcIn0sdHJhbnNpdGlvbjp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcImZhZGVcIn0sY2xlYXJTZWFyY2hPblNlbGVjdDp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LGNsb3NlT25TZWxlY3Q6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxsYWJlbDp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcImxhYmVsXCJ9LGdldE9wdGlvbkxhYmVsOnt0eXBlOkZ1bmN0aW9uLGRlZmF1bHQ6ZnVuY3Rpb24odCl7cmV0dXJuXCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2YgdD9cInVuZGVmaW5lZFwiOigwLGwuZGVmYXVsdCkodCkpJiZ0aGlzLmxhYmVsJiZ0W3RoaXMubGFiZWxdP3RbdGhpcy5sYWJlbF06dH19LG9uQ2hhbmdlOnt0eXBlOkZ1bmN0aW9uLGRlZmF1bHQ6ZnVuY3Rpb24odCl7dGhpcy4kZW1pdChcImlucHV0XCIsdCl9fSx0YWdnYWJsZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LHB1c2hUYWdzOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0sY3JlYXRlT3B0aW9uOnt0eXBlOkZ1bmN0aW9uLGRlZmF1bHQ6ZnVuY3Rpb24odCl7cmV0dXJuXCJvYmplY3RcIj09PSgwLGwuZGVmYXVsdCkodGhpcy5tdXRhYmxlT3B0aW9uc1swXSkmJih0PSgwLHMuZGVmYXVsdCkoe30sdGhpcy5sYWJlbCx0KSksdGhpcy4kZW1pdChcIm9wdGlvbjpjcmVhdGVkXCIsdCksdH19LHJlc2V0T25PcHRpb25zQ2hhbmdlOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0sbm9Ecm9wOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0saW5wdXRJZDp7dHlwZTpTdHJpbmd9LGRpcjp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcImF1dG9cIn19LGRhdGE6ZnVuY3Rpb24oKXtyZXR1cm57c2VhcmNoOlwiXCIsb3BlbjohMSxtdXRhYmxlVmFsdWU6bnVsbCxtdXRhYmxlT3B0aW9uczpbXX19LHdhdGNoOnt2YWx1ZTpmdW5jdGlvbih0KXt0aGlzLm11dGFibGVWYWx1ZT10fSxtdXRhYmxlVmFsdWU6ZnVuY3Rpb24odCxlKXt0aGlzLm11bHRpcGxlP3RoaXMub25DaGFuZ2U/dGhpcy5vbkNoYW5nZSh0KTpudWxsOnRoaXMub25DaGFuZ2UmJnQhPT1lP3RoaXMub25DaGFuZ2UodCk6bnVsbH0sb3B0aW9uczpmdW5jdGlvbih0KXt0aGlzLm11dGFibGVPcHRpb25zPXR9LG11dGFibGVPcHRpb25zOmZ1bmN0aW9uKCl7IXRoaXMudGFnZ2FibGUmJnRoaXMucmVzZXRPbk9wdGlvbnNDaGFuZ2UmJih0aGlzLm11dGFibGVWYWx1ZT10aGlzLm11bHRpcGxlP1tdOm51bGwpfSxtdWx0aXBsZTpmdW5jdGlvbih0KXt0aGlzLm11dGFibGVWYWx1ZT10P1tdOm51bGx9fSxjcmVhdGVkOmZ1bmN0aW9uKCl7dGhpcy5tdXRhYmxlVmFsdWU9dGhpcy52YWx1ZSx0aGlzLm11dGFibGVPcHRpb25zPXRoaXMub3B0aW9ucy5zbGljZSgwKSx0aGlzLm11dGFibGVMb2FkaW5nPXRoaXMubG9hZGluZyx0aGlzLiRvbihcIm9wdGlvbjpjcmVhdGVkXCIsdGhpcy5tYXliZVB1c2hUYWcpfSxtZXRob2RzOntzZWxlY3Q6ZnVuY3Rpb24odCl7dGhpcy5pc09wdGlvblNlbGVjdGVkKHQpP3RoaXMuZGVzZWxlY3QodCk6KHRoaXMudGFnZ2FibGUmJiF0aGlzLm9wdGlvbkV4aXN0cyh0KSYmKHQ9dGhpcy5jcmVhdGVPcHRpb24odCkpLHRoaXMubXVsdGlwbGUmJiF0aGlzLm11dGFibGVWYWx1ZT90aGlzLm11dGFibGVWYWx1ZT1bdF06dGhpcy5tdWx0aXBsZT90aGlzLm11dGFibGVWYWx1ZS5wdXNoKHQpOnRoaXMubXV0YWJsZVZhbHVlPXQpLHRoaXMub25BZnRlclNlbGVjdCh0KX0sZGVzZWxlY3Q6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcztpZih0aGlzLm11bHRpcGxlKXt2YXIgbj0tMTt0aGlzLm11dGFibGVWYWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHIpeyhyPT09dHx8XCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2Ygcj9cInVuZGVmaW5lZFwiOigwLGwuZGVmYXVsdCkocikpJiZyW2UubGFiZWxdPT09dFtlLmxhYmVsXSkmJihuPXIpfSk7dmFyIHI9dGhpcy5tdXRhYmxlVmFsdWUuaW5kZXhPZihuKTt0aGlzLm11dGFibGVWYWx1ZS5zcGxpY2UociwxKX1lbHNlIHRoaXMubXV0YWJsZVZhbHVlPW51bGx9LG9uQWZ0ZXJTZWxlY3Q6ZnVuY3Rpb24odCl7dGhpcy5jbG9zZU9uU2VsZWN0JiYodGhpcy5vcGVuPSF0aGlzLm9wZW4sdGhpcy4kcmVmcy5zZWFyY2guYmx1cigpKSx0aGlzLmNsZWFyU2VhcmNoT25TZWxlY3QmJih0aGlzLnNlYXJjaD1cIlwiKX0sdG9nZ2xlRHJvcGRvd246ZnVuY3Rpb24odCl7dC50YXJnZXQhPT10aGlzLiRyZWZzLm9wZW5JbmRpY2F0b3ImJnQudGFyZ2V0IT09dGhpcy4kcmVmcy5zZWFyY2gmJnQudGFyZ2V0IT09dGhpcy4kcmVmcy50b2dnbGUmJnQudGFyZ2V0IT09dGhpcy4kZWx8fCh0aGlzLm9wZW4/dGhpcy4kcmVmcy5zZWFyY2guYmx1cigpOnRoaXMuZGlzYWJsZWR8fCh0aGlzLm9wZW49ITAsdGhpcy4kcmVmcy5zZWFyY2guZm9jdXMoKSkpfSxpc09wdGlvblNlbGVjdGVkOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXM7aWYodGhpcy5tdWx0aXBsZSYmdGhpcy5tdXRhYmxlVmFsdWUpe3ZhciBuPSExO3JldHVybiB0aGlzLm11dGFibGVWYWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHIpe1wib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHI/XCJ1bmRlZmluZWRcIjooMCxsLmRlZmF1bHQpKHIpKSYmcltlLmxhYmVsXT09PXRbZS5sYWJlbF0/bj0hMDpcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiByP1widW5kZWZpbmVkXCI6KDAsbC5kZWZhdWx0KShyKSkmJnJbZS5sYWJlbF09PT10P249ITA6cj09PXQmJihuPSEwKX0pLG59cmV0dXJuIHRoaXMubXV0YWJsZVZhbHVlPT09dH0sb25Fc2NhcGU6ZnVuY3Rpb24oKXt0aGlzLnNlYXJjaC5sZW5ndGg/dGhpcy5zZWFyY2g9XCJcIjp0aGlzLiRyZWZzLnNlYXJjaC5ibHVyKCl9LG9uU2VhcmNoQmx1cjpmdW5jdGlvbigpe3RoaXMuY2xlYXJTZWFyY2hPbkJsdXImJih0aGlzLnNlYXJjaD1cIlwiKSx0aGlzLm9wZW49ITEsdGhpcy4kZW1pdChcInNlYXJjaDpibHVyXCIpfSxvblNlYXJjaEZvY3VzOmZ1bmN0aW9uKCl7dGhpcy5vcGVuPSEwLHRoaXMuJGVtaXQoXCJzZWFyY2g6Zm9jdXNcIil9LG1heWJlRGVsZXRlVmFsdWU6ZnVuY3Rpb24oKXtpZighdGhpcy4kcmVmcy5zZWFyY2gudmFsdWUubGVuZ3RoJiZ0aGlzLm11dGFibGVWYWx1ZSlyZXR1cm4gdGhpcy5tdWx0aXBsZT90aGlzLm11dGFibGVWYWx1ZS5wb3AoKTp0aGlzLm11dGFibGVWYWx1ZT1udWxsfSxvcHRpb25FeGlzdHM6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcyxuPSExO3JldHVybiB0aGlzLm11dGFibGVPcHRpb25zLmZvckVhY2goZnVuY3Rpb24ocil7XCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2Ygcj9cInVuZGVmaW5lZFwiOigwLGwuZGVmYXVsdCkocikpJiZyW2UubGFiZWxdPT09dD9uPSEwOnI9PT10JiYobj0hMCl9KSxufSxtYXliZVB1c2hUYWc6ZnVuY3Rpb24odCl7dGhpcy5wdXNoVGFncyYmdGhpcy5tdXRhYmxlT3B0aW9ucy5wdXNoKHQpfX0sY29tcHV0ZWQ6e2Ryb3Bkb3duQ2xhc3NlczpmdW5jdGlvbigpe3JldHVybntvcGVuOnRoaXMuZHJvcGRvd25PcGVuLHNpbmdsZTohdGhpcy5tdWx0aXBsZSxzZWFyY2hpbmc6dGhpcy5zZWFyY2hpbmcsc2VhcmNoYWJsZTp0aGlzLnNlYXJjaGFibGUsdW5zZWFyY2hhYmxlOiF0aGlzLnNlYXJjaGFibGUsbG9hZGluZzp0aGlzLm11dGFibGVMb2FkaW5nLHJ0bDpcInJ0bFwiPT09dGhpcy5kaXJ9fSxjbGVhclNlYXJjaE9uQmx1cjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsZWFyU2VhcmNoT25TZWxlY3QmJiF0aGlzLm11bHRpcGxlfSxzZWFyY2hpbmc6ZnVuY3Rpb24oKXtyZXR1cm4hIXRoaXMuc2VhcmNofSxkcm9wZG93bk9wZW46ZnVuY3Rpb24oKXtyZXR1cm4hdGhpcy5ub0Ryb3AmJih0aGlzLm9wZW4mJiF0aGlzLm11dGFibGVMb2FkaW5nKX0sc2VhcmNoUGxhY2Vob2xkZXI6ZnVuY3Rpb24oKXtpZih0aGlzLmlzVmFsdWVFbXB0eSYmdGhpcy5wbGFjZWhvbGRlcilyZXR1cm4gdGhpcy5wbGFjZWhvbGRlcn0sZmlsdGVyZWRPcHRpb25zOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPXRoaXMubXV0YWJsZU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVyblwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjooMCxsLmRlZmF1bHQpKGUpKSYmZS5oYXNPd25Qcm9wZXJ0eSh0LmxhYmVsKT9lW3QubGFiZWxdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0LnNlYXJjaC50b0xvd2VyQ2FzZSgpKT4tMTpcIm9iamVjdFwiIT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6KDAsbC5kZWZhdWx0KShlKSl8fGUuaGFzT3duUHJvcGVydHkodC5sYWJlbCk/ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodC5zZWFyY2gudG9Mb3dlckNhc2UoKSk+LTE6Y29uc29sZS53YXJuKCdbdnVlLXNlbGVjdCB3YXJuXTogTGFiZWwga2V5IFwib3B0aW9uLicrdC5sYWJlbCsnXCIgZG9lcyBub3QgZXhpc3QgaW4gb3B0aW9ucyBvYmplY3QuXFxuaHR0cDovL3NhZ2FsYm90LmdpdGh1Yi5pby92dWUtc2VsZWN0LyNleC1sYWJlbHMnKX0pO3JldHVybiB0aGlzLnRhZ2dhYmxlJiZ0aGlzLnNlYXJjaC5sZW5ndGgmJiF0aGlzLm9wdGlvbkV4aXN0cyh0aGlzLnNlYXJjaCkmJmUudW5zaGlmdCh0aGlzLnNlYXJjaCksZX0saXNWYWx1ZUVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIXRoaXMubXV0YWJsZVZhbHVlfHwoXCJvYmplY3RcIj09PSgwLGwuZGVmYXVsdCkodGhpcy5tdXRhYmxlVmFsdWUpPyEoMCxpLmRlZmF1bHQpKHRoaXMubXV0YWJsZVZhbHVlKS5sZW5ndGg6IXRoaXMubXV0YWJsZVZhbHVlLmxlbmd0aCl9LHZhbHVlQXNBcnJheTpmdW5jdGlvbigpe3JldHVybiB0aGlzLm11bHRpcGxlP3RoaXMubXV0YWJsZVZhbHVlOnRoaXMubXV0YWJsZVZhbHVlP1t0aGlzLm11dGFibGVWYWx1ZV06W119fX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDI4KSxpPXIobyksYT1uKDMwKSxzPXIoYSksdT1uKDI5KSxsPXIodSk7ZS5kZWZhdWx0PXthamF4OmkuZGVmYXVsdCxwb2ludGVyOnMuZGVmYXVsdCxwb2ludGVyU2Nyb2xsOmwuZGVmYXVsdH19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big0OSksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big1MCksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big1MSksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big1MiksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1lLl9fZXNNb2R1bGU9ITA7dmFyIG89big0MyksaT1yKG8pO2UuZGVmYXVsdD1mdW5jdGlvbih0LGUsbil7cmV0dXJuIGUgaW4gdD8oMCxpLmRlZmF1bHQpKHQsZSx7dmFsdWU6bixlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOnRbZV09bix0fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWUuX19lc01vZHVsZT0hMDt2YXIgbz1uKDQ2KSxpPXIobyksYT1uKDQ1KSxzPXIoYSksdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBzLmRlZmF1bHQmJlwic3ltYm9sXCI9PXR5cGVvZiBpLmRlZmF1bHQ/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2Ygcy5kZWZhdWx0JiZ0LmNvbnN0cnVjdG9yPT09cy5kZWZhdWx0JiZ0IT09cy5kZWZhdWx0LnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fTtlLmRlZmF1bHQ9XCJmdW5jdGlvblwiPT10eXBlb2Ygcy5kZWZhdWx0JiZcInN5bWJvbFwiPT09dShpLmRlZmF1bHQpP2Z1bmN0aW9uKHQpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6dSh0KX06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHMuZGVmYXVsdCYmdC5jb25zdHJ1Y3Rvcj09PXMuZGVmYXVsdCYmdCE9PXMuZGVmYXVsdC5wcm90b3R5cGU/XCJzeW1ib2xcIjpcInVuZGVmaW5lZFwiPT10eXBlb2YgdD9cInVuZGVmaW5lZFwiOnUodCl9fSxmdW5jdGlvbih0LGUsbil7big3Myk7dmFyIHI9big1KS5PYmplY3Q7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gci5kZWZpbmVQcm9wZXJ0eSh0LGUsbil9fSxmdW5jdGlvbih0LGUsbil7big3NCksdC5leHBvcnRzPW4oNSkuT2JqZWN0LmtleXN9LGZ1bmN0aW9uKHQsZSxuKXtuKDc3KSxuKDc1KSxuKDc4KSxuKDc5KSx0LmV4cG9ydHM9big1KS5TeW1ib2x9LGZ1bmN0aW9uKHQsZSxuKXtuKDc2KSxuKDgwKSx0LmV4cG9ydHM9bigyNykuZihcIml0ZXJhdG9yXCIpfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhIGZ1bmN0aW9uIVwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKCl7fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNyksbz1uKDcxKSxpPW4oNzApO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuLGEpe3ZhciBzLHU9cihlKSxsPW8odS5sZW5ndGgpLGM9aShhLGwpO2lmKHQmJm4hPW4pe2Zvcig7bD5jOylpZihzPXVbYysrXSxzIT1zKXJldHVybiEwfWVsc2UgZm9yKDtsPmM7YysrKWlmKCh0fHxjIGluIHUpJiZ1W2NdPT09bilyZXR1cm4gdHx8Y3x8MDtyZXR1cm4hdCYmLTF9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNTMpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7aWYocih0KSx2b2lkIDA9PT1lKXJldHVybiB0O3N3aXRjaChuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwoZSxuKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihuLHIpe3JldHVybiB0LmNhbGwoZSxuLHIpfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scixvKXtyZXR1cm4gdC5jYWxsKGUsbixyLG8pfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseShlLGFyZ3VtZW50cyl9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTMpLG89bigzNyksaT1uKDIwKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9cih0KSxuPW8uZjtpZihuKWZvcih2YXIgYSxzPW4odCksdT1pLmYsbD0wO3MubGVuZ3RoPmw7KXUuY2FsbCh0LGE9c1tsKytdKSYmZS5wdXNoKGEpO3JldHVybiBlfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSkuZG9jdW1lbnQ7dC5leHBvcnRzPXImJnIuZG9jdW1lbnRFbGVtZW50fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMSk7dC5leHBvcnRzPU9iamVjdChcInpcIikucHJvcGVydHlJc0VudW1lcmFibGUoMCk/T2JqZWN0OmZ1bmN0aW9uKHQpe3JldHVyblwiU3RyaW5nXCI9PXIodCk/dC5zcGxpdChcIlwiKTpPYmplY3QodCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMSk7dC5leHBvcnRzPUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKHQpe3JldHVyblwiQXJyYXlcIj09cih0KX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDM1KSxvPW4oMTQpLGk9bigyMSksYT17fTtuKDYpKGEsbig4KShcIml0ZXJhdG9yXCIpLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSx0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3QucHJvdG90eXBlPXIoYSx7bmV4dDpvKDEsbil9KSxpKHQsZStcIiBJdGVyYXRvclwiKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJue3ZhbHVlOmUsZG9uZTohIXR9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTUpKFwibWV0YVwiKSxvPW4oMTIpLGk9bigzKSxhPW4oNCkuZixzPTAsdT1PYmplY3QuaXNFeHRlbnNpYmxlfHxmdW5jdGlvbigpe3JldHVybiEwfSxsPSFuKDkpKGZ1bmN0aW9uKCl7cmV0dXJuIHUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSl9KSxjPWZ1bmN0aW9uKHQpe2EodCxyLHt2YWx1ZTp7aTpcIk9cIisgKytzLHc6e319fSl9LGY9ZnVuY3Rpb24odCxlKXtpZighbyh0KSlyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdD90OihcInN0cmluZ1wiPT10eXBlb2YgdD9cIlNcIjpcIlBcIikrdDtpZighaSh0LHIpKXtpZighdSh0KSlyZXR1cm5cIkZcIjtpZighZSlyZXR1cm5cIkVcIjtjKHQpfXJldHVybiB0W3JdLml9LHA9ZnVuY3Rpb24odCxlKXtpZighaSh0LHIpKXtpZighdSh0KSlyZXR1cm4hMDtpZighZSlyZXR1cm4hMTtjKHQpfXJldHVybiB0W3JdLnd9LGQ9ZnVuY3Rpb24odCl7cmV0dXJuIGwmJmguTkVFRCYmdSh0KSYmIWkodCxyKSYmYyh0KSx0fSxoPXQuZXhwb3J0cz17S0VZOnIsTkVFRDohMSxmYXN0S2V5OmYsZ2V0V2VhazpwLG9uRnJlZXplOmR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0KSxvPW4oMTApLGk9bigxMyk7dC5leHBvcnRzPW4oMik/T2JqZWN0LmRlZmluZVByb3BlcnRpZXM6ZnVuY3Rpb24odCxlKXtvKHQpO2Zvcih2YXIgbixhPWkoZSkscz1hLmxlbmd0aCx1PTA7cz51OylyLmYodCxuPWFbdSsrXSxlW25dKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIwKSxvPW4oMTQpLGk9big3KSxhPW4oMjUpLHM9bigzKSx1PW4oMzMpLGw9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtlLmY9bigyKT9sOmZ1bmN0aW9uKHQsZSl7aWYodD1pKHQpLGU9YShlLCEwKSx1KXRyeXtyZXR1cm4gbCh0LGUpfWNhdGNoKHQpe31pZihzKHQsZSkpcmV0dXJuIG8oIXIuZi5jYWxsKHQsZSksdFtlXSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big3KSxvPW4oMzYpLmYsaT17fS50b1N0cmluZyxhPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3cmJndpbmRvdyYmT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM/T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KTpbXSxzPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4gbyh0KX1jYXRjaCh0KXtyZXR1cm4gYS5zbGljZSgpfX07dC5leHBvcnRzLmY9ZnVuY3Rpb24odCl7cmV0dXJuIGEmJlwiW29iamVjdCBXaW5kb3ddXCI9PWkuY2FsbCh0KT9zKHQpOm8ocih0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKSxvPW4oNDApLGk9bigyMikoXCJJRV9QUk9UT1wiKSxhPU9iamVjdC5wcm90b3R5cGU7dC5leHBvcnRzPU9iamVjdC5nZXRQcm90b3R5cGVPZnx8ZnVuY3Rpb24odCl7cmV0dXJuIHQ9byh0KSxyKHQsaSk/dFtpXTpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmNvbnN0cnVjdG9yJiZ0IGluc3RhbmNlb2YgdC5jb25zdHJ1Y3Rvcj90LmNvbnN0cnVjdG9yLnByb3RvdHlwZTp0IGluc3RhbmNlb2YgT2JqZWN0P2E6bnVsbH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDExKSxvPW4oNSksaT1uKDkpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciBuPShvLk9iamVjdHx8e30pW3RdfHxPYmplY3RbdF0sYT17fTthW3RdPWUobikscihyLlMrci5GKmkoZnVuY3Rpb24oKXtuKDEpfSksXCJPYmplY3RcIixhKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI0KSxvPW4oMTYpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuKXt2YXIgaSxhLHM9U3RyaW5nKG8oZSkpLHU9cihuKSxsPXMubGVuZ3RoO3JldHVybiB1PDB8fHU+PWw/dD9cIlwiOnZvaWQgMDooaT1zLmNoYXJDb2RlQXQodSksaTw1NTI5Nnx8aT41NjMxOXx8dSsxPT09bHx8KGE9cy5jaGFyQ29kZUF0KHUrMSkpPDU2MzIwfHxhPjU3MzQzP3Q/cy5jaGFyQXQodSk6aTp0P3Muc2xpY2UodSx1KzIpOihpLTU1Mjk2PDwxMCkrKGEtNTYzMjApKzY1NTM2KX19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNCksbz1NYXRoLm1heCxpPU1hdGgubWluO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiB0PXIodCksdDwwP28odCtlLDApOmkodCxlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI0KSxvPU1hdGgubWluO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gdD4wP28ocih0KSw5MDA3MTk5MjU0NzQwOTkxKTowfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNTQpLG89big2MiksaT1uKDE4KSxhPW4oNyk7dC5leHBvcnRzPW4oMzQpKEFycmF5LFwiQXJyYXlcIixmdW5jdGlvbih0LGUpe3RoaXMuX3Q9YSh0KSx0aGlzLl9pPTAsdGhpcy5faz1lfSxmdW5jdGlvbigpe3ZhciB0PXRoaXMuX3QsZT10aGlzLl9rLG49dGhpcy5faSsrO3JldHVybiF0fHxuPj10Lmxlbmd0aD8odGhpcy5fdD12b2lkIDAsbygxKSk6XCJrZXlzXCI9PWU/bygwLG4pOlwidmFsdWVzXCI9PWU/bygwLHRbbl0pOm8oMCxbbix0W25dXSl9LFwidmFsdWVzXCIpLGkuQXJndW1lbnRzPWkuQXJyYXkscihcImtleXNcIikscihcInZhbHVlc1wiKSxyKFwiZW50cmllc1wiKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTEpO3Ioci5TK3IuRiohbigyKSxcIk9iamVjdFwiLHtkZWZpbmVQcm9wZXJ0eTpuKDQpLmZ9KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDApLG89bigxMyk7big2OCkoXCJrZXlzXCIsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG8ocih0KSl9fSl9LGZ1bmN0aW9uKHQsZSl7fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big2OSkoITApO24oMzQpKFN0cmluZyxcIlN0cmluZ1wiLGZ1bmN0aW9uKHQpe3RoaXMuX3Q9U3RyaW5nKHQpLHRoaXMuX2k9MH0sZnVuY3Rpb24oKXt2YXIgdCxlPXRoaXMuX3Qsbj10aGlzLl9pO3JldHVybiBuPj1lLmxlbmd0aD97dmFsdWU6dm9pZCAwLGRvbmU6ITB9Oih0PXIoZSxuKSx0aGlzLl9pKz10Lmxlbmd0aCx7dmFsdWU6dCxkb25lOiExfSl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMSksbz1uKDMpLGk9bigyKSxhPW4oMTEpLHM9bigzOSksdT1uKDYzKS5LRVksbD1uKDkpLGM9bigyMyksZj1uKDIxKSxwPW4oMTUpLGQ9big4KSxoPW4oMjcpLGI9bigyNiksdj1uKDU3KSxnPW4oNjApLHk9bigxMCksbT1uKDcpLHg9bigyNSksdz1uKDE0KSxTPW4oMzUpLE89big2NiksXz1uKDY1KSxqPW4oNCksUD1uKDEzKSxrPV8uZixBPWouZixNPU8uZixMPXIuU3ltYm9sLEM9ci5KU09OLFQ9QyYmQy5zdHJpbmdpZnksRT1cInByb3RvdHlwZVwiLFY9ZChcIl9oaWRkZW5cIiksRj1kKFwidG9QcmltaXRpdmVcIiksJD17fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxCPWMoXCJzeW1ib2wtcmVnaXN0cnlcIiksTj1jKFwic3ltYm9sc1wiKSxEPWMoXCJvcC1zeW1ib2xzXCIpLEk9T2JqZWN0W0VdLFI9XCJmdW5jdGlvblwiPT10eXBlb2YgTCx6PXIuUU9iamVjdCxIPSF6fHwheltFXXx8IXpbRV0uZmluZENoaWxkLEc9aSYmbChmdW5jdGlvbigpe3JldHVybiA3IT1TKEEoe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBBKHRoaXMsXCJhXCIse3ZhbHVlOjd9KS5hfX0pKS5hfSk/ZnVuY3Rpb24odCxlLG4pe3ZhciByPWsoSSxlKTtyJiZkZWxldGUgSVtlXSxBKHQsZSxuKSxyJiZ0IT09SSYmQShJLGUscil9OkEsVT1mdW5jdGlvbih0KXt2YXIgZT1OW3RdPVMoTFtFXSk7cmV0dXJuIGUuX2s9dCxlfSxXPVImJlwic3ltYm9sXCI9PXR5cGVvZiBMLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVyblwic3ltYm9sXCI9PXR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIEx9LEo9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0PT09SSYmSihELGUsbikseSh0KSxlPXgoZSwhMCkseShuKSxvKE4sZSk/KG4uZW51bWVyYWJsZT8obyh0LFYpJiZ0W1ZdW2VdJiYodFtWXVtlXT0hMSksbj1TKG4se2VudW1lcmFibGU6dygwLCExKX0pKToobyh0LFYpfHxBKHQsVix3KDEse30pKSx0W1ZdW2VdPSEwKSxHKHQsZSxuKSk6QSh0LGUsbil9LEs9ZnVuY3Rpb24odCxlKXt5KHQpO2Zvcih2YXIgbixyPXYoZT1tKGUpKSxvPTAsaT1yLmxlbmd0aDtpPm87KUoodCxuPXJbbysrXSxlW25dKTtyZXR1cm4gdH0sWT1mdW5jdGlvbih0LGUpe3JldHVybiB2b2lkIDA9PT1lP1ModCk6SyhTKHQpLGUpfSxxPWZ1bmN0aW9uKHQpe3ZhciBlPSQuY2FsbCh0aGlzLHQ9eCh0LCEwKSk7cmV0dXJuISh0aGlzPT09SSYmbyhOLHQpJiYhbyhELHQpKSYmKCEoZXx8IW8odGhpcyx0KXx8IW8oTix0KXx8byh0aGlzLFYpJiZ0aGlzW1ZdW3RdKXx8ZSl9LFE9ZnVuY3Rpb24odCxlKXtpZih0PW0odCksZT14KGUsITApLHQhPT1JfHwhbyhOLGUpfHxvKEQsZSkpe3ZhciBuPWsodCxlKTtyZXR1cm4hbnx8IW8oTixlKXx8byh0LFYpJiZ0W1ZdW2VdfHwobi5lbnVtZXJhYmxlPSEwKSxufX0sWj1mdW5jdGlvbih0KXtmb3IodmFyIGUsbj1NKG0odCkpLHI9W10saT0wO24ubGVuZ3RoPmk7KW8oTixlPW5baSsrXSl8fGU9PVZ8fGU9PXV8fHIucHVzaChlKTtyZXR1cm4gcn0sWD1mdW5jdGlvbih0KXtmb3IodmFyIGUsbj10PT09SSxyPU0obj9EOm0odCkpLGk9W10sYT0wO3IubGVuZ3RoPmE7KSFvKE4sZT1yW2ErK10pfHxuJiYhbyhJLGUpfHxpLnB1c2goTltlXSk7cmV0dXJuIGl9O1J8fChMPWZ1bmN0aW9uKCl7aWYodGhpcyBpbnN0YW5jZW9mIEwpdGhyb3cgVHlwZUVycm9yKFwiU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIVwiKTt2YXIgdD1wKGFyZ3VtZW50cy5sZW5ndGg+MD9hcmd1bWVudHNbMF06dm9pZCAwKSxlPWZ1bmN0aW9uKG4pe3RoaXM9PT1JJiZlLmNhbGwoRCxuKSxvKHRoaXMsVikmJm8odGhpc1tWXSx0KSYmKHRoaXNbVl1bdF09ITEpLEcodGhpcyx0LHcoMSxuKSl9O3JldHVybiBpJiZIJiZHKEksdCx7Y29uZmlndXJhYmxlOiEwLHNldDplfSksVSh0KX0scyhMW0VdLFwidG9TdHJpbmdcIixmdW5jdGlvbigpe3JldHVybiB0aGlzLl9rfSksXy5mPVEsai5mPUosbigzNikuZj1PLmY9WixuKDIwKS5mPXEsbigzNykuZj1YLGkmJiFuKDE5KSYmcyhJLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixxLCEwKSxoLmY9ZnVuY3Rpb24odCl7cmV0dXJuIFUoZCh0KSl9KSxhKGEuRythLlcrYS5GKiFSLHtTeW1ib2w6TH0pO2Zvcih2YXIgdHQ9XCJoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlc1wiLnNwbGl0KFwiLFwiKSxldD0wO3R0Lmxlbmd0aD5ldDspZCh0dFtldCsrXSk7Zm9yKHZhciBudD1QKGQuc3RvcmUpLHJ0PTA7bnQubGVuZ3RoPnJ0OyliKG50W3J0KytdKTthKGEuUythLkYqIVIsXCJTeW1ib2xcIix7Zm9yOmZ1bmN0aW9uKHQpe3JldHVybiBvKEIsdCs9XCJcIik/Qlt0XTpCW3RdPUwodCl9LGtleUZvcjpmdW5jdGlvbih0KXtpZighVyh0KSl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBzeW1ib2whXCIpO2Zvcih2YXIgZSBpbiBCKWlmKEJbZV09PT10KXJldHVybiBlfSx1c2VTZXR0ZXI6ZnVuY3Rpb24oKXtIPSEwfSx1c2VTaW1wbGU6ZnVuY3Rpb24oKXtIPSExfX0pLGEoYS5TK2EuRiohUixcIk9iamVjdFwiLHtjcmVhdGU6WSxkZWZpbmVQcm9wZXJ0eTpKLGRlZmluZVByb3BlcnRpZXM6SyxnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6USxnZXRPd25Qcm9wZXJ0eU5hbWVzOlosZ2V0T3duUHJvcGVydHlTeW1ib2xzOlh9KSxDJiZhKGEuUythLkYqKCFSfHxsKGZ1bmN0aW9uKCl7dmFyIHQ9TCgpO3JldHVyblwiW251bGxdXCIhPVQoW3RdKXx8XCJ7fVwiIT1UKHthOnR9KXx8XCJ7fVwiIT1UKE9iamVjdCh0KSl9KSksXCJKU09OXCIse3N0cmluZ2lmeTpmdW5jdGlvbih0KXtpZih2b2lkIDAhPT10JiYhVyh0KSl7Zm9yKHZhciBlLG4scj1bdF0sbz0xO2FyZ3VtZW50cy5sZW5ndGg+bzspci5wdXNoKGFyZ3VtZW50c1tvKytdKTtyZXR1cm4gZT1yWzFdLFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihuPWUpLCFuJiZnKGUpfHwoZT1mdW5jdGlvbih0LGUpe2lmKG4mJihlPW4uY2FsbCh0aGlzLHQsZSkpLCFXKGUpKXJldHVybiBlfSksclsxXT1lLFQuYXBwbHkoQyxyKX19fSksTFtFXVtGXXx8big2KShMW0VdLEYsTFtFXS52YWx1ZU9mKSxmKEwsXCJTeW1ib2xcIiksZihNYXRoLFwiTWF0aFwiLCEwKSxmKHIuSlNPTixcIkpTT05cIiwhMCl9LGZ1bmN0aW9uKHQsZSxuKXtuKDI2KShcImFzeW5jSXRlcmF0b3JcIil9LGZ1bmN0aW9uKHQsZSxuKXtuKDI2KShcIm9ic2VydmFibGVcIil9LGZ1bmN0aW9uKHQsZSxuKXtuKDcyKTtmb3IodmFyIHI9bigxKSxvPW4oNiksaT1uKDE4KSxhPW4oOCkoXCJ0b1N0cmluZ1RhZ1wiKSxzPVwiQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCxET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LE1lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsVGV4dFRyYWNrTGlzdCxUb3VjaExpc3RcIi5zcGxpdChcIixcIiksdT0wO3U8cy5sZW5ndGg7dSsrKXt2YXIgbD1zW3VdLGM9cltsXSxmPWMmJmMucHJvdG90eXBlO2YmJiFmW2FdJiZvKGYsYSxsKSxpW2xdPWkuQXJyYXl9fSxmdW5jdGlvbih0LGUsbil7ZT10LmV4cG9ydHM9big4MikoKSxlLnB1c2goW3QuaWQsJy52LXNlbGVjdHtwb3NpdGlvbjpyZWxhdGl2ZTtmb250LWZhbWlseTpzYW5zLXNlcmlmfS52LXNlbGVjdCAuZGlzYWJsZWR7Y3Vyc29yOm5vdC1hbGxvd2VkIWltcG9ydGFudDtiYWNrZ3JvdW5kLWNvbG9yOiNmOGY4ZjghaW1wb3J0YW50fS52LXNlbGVjdCwudi1zZWxlY3QgKntib3gtc2l6aW5nOmJvcmRlci1ib3h9LnYtc2VsZWN0LnJ0bCAub3Blbi1pbmRpY2F0b3J7bGVmdDoxMHB4O3JpZ2h0OmF1dG99LnYtc2VsZWN0LnJ0bCAuc2VsZWN0ZWQtdGFne2Zsb2F0OnJpZ2h0O21hcmdpbi1yaWdodDozcHg7bWFyZ2luLWxlZnQ6MXB4fS52LXNlbGVjdC5ydGwgLmRyb3Bkb3duLW1lbnV7dGV4dC1hbGlnbjpyaWdodH0udi1zZWxlY3QgLm9wZW4taW5kaWNhdG9ye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTo2cHg7cmlnaHQ6MTBweDtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphbGw7b3BhY2l0eToxO2hlaWdodDoyMHB4fS52LXNlbGVjdCAub3Blbi1pbmRpY2F0b3IsLnYtc2VsZWN0IC5vcGVuLWluZGljYXRvcjpiZWZvcmV7ZGlzcGxheTppbmxpbmUtYmxvY2s7dHJhbnNpdGlvbjphbGwgLjE1cyBjdWJpYy1iZXppZXIoMSwtLjExNSwuOTc1LC44NTUpO3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllcigxLC0uMTE1LC45NzUsLjg1NSk7d2lkdGg6MTBweH0udi1zZWxlY3QgLm9wZW4taW5kaWNhdG9yOmJlZm9yZXtib3JkZXItY29sb3I6cmdiYSg2MCw2MCw2MCwuNSk7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDozcHggM3B4IDAgMDtjb250ZW50OlwiXCI7aGVpZ2h0OjEwcHg7dmVydGljYWwtYWxpZ246dG9wO3RyYW5zZm9ybTpyb3RhdGUoMTMzZGVnKTtib3gtc2l6aW5nOmluaGVyaXR9LnYtc2VsZWN0Lm9wZW4gLm9wZW4taW5kaWNhdG9yOmJlZm9yZXt0cmFuc2Zvcm06cm90YXRlKDMxNWRlZyl9LnYtc2VsZWN0LmxvYWRpbmcgLm9wZW4taW5kaWNhdG9ye29wYWNpdHk6MH0udi1zZWxlY3Qub3BlbiAub3Blbi1pbmRpY2F0b3J7Ym90dG9tOjFweH0udi1zZWxlY3QgLmRyb3Bkb3duLXRvZ2dsZXstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZTthcHBlYXJhbmNlOm5vbmU7ZGlzcGxheTpibG9jaztwYWRkaW5nOjA7YmFja2dyb3VuZDpub25lO2JvcmRlcjoxcHggc29saWQgcmdiYSg2MCw2MCw2MCwuMjYpO2JvcmRlci1yYWRpdXM6NHB4O3doaXRlLXNwYWNlOm5vcm1hbH0udi1zZWxlY3QgLmRyb3Bkb3duLXRvZ2dsZTphZnRlcnt2aXNpYmlsaXR5OmhpZGRlbjtkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZTowO2NvbnRlbnQ6XCIgXCI7Y2xlYXI6Ym90aDtoZWlnaHQ6MH0udi1zZWxlY3Quc2VhcmNoYWJsZSAuZHJvcGRvd24tdG9nZ2xle2N1cnNvcjp0ZXh0fS52LXNlbGVjdC51bnNlYXJjaGFibGUgLmRyb3Bkb3duLXRvZ2dsZXtjdXJzb3I6cG9pbnRlcn0udi1zZWxlY3Qub3BlbiAuZHJvcGRvd24tdG9nZ2xle2JvcmRlci1ib3R0b20tY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czowO2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjB9LnYtc2VsZWN0IC5kcm9wZG93bi1tZW51e2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7bGVmdDowO3otaW5kZXg6MTAwMDttaW4td2lkdGg6MTYwcHg7cGFkZGluZzo1cHggMDttYXJnaW46MDt3aWR0aDoxMDAlO292ZXJmbG93LXk6c2Nyb2xsO2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwuMjYpO2JveC1zaGFkb3c6MCAzcHggNnB4IDAgcmdiYSgwLDAsMCwuMTUpO2JvcmRlci10b3A6bm9uZTtib3JkZXItcmFkaXVzOjAgMCA0cHggNHB4O3RleHQtYWxpZ246bGVmdDtsaXN0LXN0eWxlOm5vbmU7YmFja2dyb3VuZDojZmZmfS52LXNlbGVjdCAubm8tb3B0aW9uc3t0ZXh0LWFsaWduOmNlbnRlcn0udi1zZWxlY3QgLnNlbGVjdGVkLXRhZ3tjb2xvcjojMzMzO2JhY2tncm91bmQtY29sb3I6I2YwZjBmMDtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czo0cHg7aGVpZ2h0OjI2cHg7bWFyZ2luOjRweCAxcHggMCAzcHg7cGFkZGluZzoxcHggLjI1ZW07ZmxvYXQ6bGVmdDtsaW5lLWhlaWdodDoyNHB4fS52LXNlbGVjdC5zaW5nbGUgLnNlbGVjdGVkLXRhZ3tiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudH0udi1zZWxlY3Quc2luZ2xlLm9wZW4gLnNlbGVjdGVkLXRhZ3twb3NpdGlvbjphYnNvbHV0ZTtvcGFjaXR5Oi41fS52LXNlbGVjdC5zaW5nbGUubG9hZGluZyAuc2VsZWN0ZWQtdGFnLC52LXNlbGVjdC5zaW5nbGUub3Blbi5zZWFyY2hpbmcgLnNlbGVjdGVkLXRhZ3tkaXNwbGF5Om5vbmV9LnYtc2VsZWN0IC5zZWxlY3RlZC10YWcgLmNsb3Nle2Zsb2F0Om5vbmU7bWFyZ2luLXJpZ2h0OjA7Zm9udC1zaXplOjIwcHg7YXBwZWFyYW5jZTpub25lO3BhZGRpbmc6MDtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kOjAgMDtib3JkZXI6MDtmb250LXdlaWdodDo3MDA7bGluZS1oZWlnaHQ6MTtjb2xvcjojMDAwO3RleHQtc2hhZG93OjAgMXB4IDAgI2ZmZjtmaWx0ZXI6YWxwaGEob3BhY2l0eT0yMCk7b3BhY2l0eTouMn0udi1zZWxlY3Quc2luZ2xlLnNlYXJjaGluZzpub3QoLm9wZW4pOm5vdCgubG9hZGluZykgaW5wdXRbdHlwZT1zZWFyY2hde29wYWNpdHk6LjJ9LnYtc2VsZWN0IGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbiwudi1zZWxlY3QgaW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uLC52LXNlbGVjdCBpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtYnV0dG9uLC52LXNlbGVjdCBpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtZGVjb3JhdGlvbntkaXNwbGF5Om5vbmV9LnYtc2VsZWN0IGlucHV0W3R5cGU9c2VhcmNoXTo6LW1zLWNsZWFye2Rpc3BsYXk6bm9uZX0udi1zZWxlY3QgaW5wdXRbdHlwZT1zZWFyY2hdLC52LXNlbGVjdCBpbnB1dFt0eXBlPXNlYXJjaF06Zm9jdXN7YXBwZWFyYW5jZTpub25lOy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7Zm9udC1zaXplOjFlbTtoZWlnaHQ6MzRweDtkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXI6bm9uZTtvdXRsaW5lOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowIC41ZW07d2lkdGg6MTBlbTttYXgtd2lkdGg6MTAwJTtiYWNrZ3JvdW5kOm5vbmU7cG9zaXRpb246cmVsYXRpdmU7Ym94LXNoYWRvdzpub25lO2Zsb2F0OmxlZnQ7Y2xlYXI6bm9uZX0udi1zZWxlY3QgbGl7bGluZS1oZWlnaHQ6MS40Mjg1NzE0M30udi1zZWxlY3QgbGk+YXtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6M3B4IDIwcHg7Y2xlYXI6Ym90aDtjb2xvcjojMzMzO3doaXRlLXNwYWNlOm5vd3JhcH0udi1zZWxlY3QgbGk6aG92ZXJ7Y3Vyc29yOnBvaW50ZXJ9LnYtc2VsZWN0IC5kcm9wZG93bi1tZW51IC5hY3RpdmU+YXtjb2xvcjojMzMzO2JhY2tncm91bmQ6cmdiYSg1MCw1MCw1MCwuMSl9LnYtc2VsZWN0IC5kcm9wZG93bi1tZW51Pi5oaWdobGlnaHQ+YXtiYWNrZ3JvdW5kOiM1ODk3ZmI7Y29sb3I6I2ZmZn0udi1zZWxlY3QgLmhpZ2hsaWdodDpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1ib3R0b206MH0udi1zZWxlY3QgLnNwaW5uZXJ7b3BhY2l0eTowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1cHg7cmlnaHQ6MTBweDtmb250LXNpemU6NXB4O3RleHQtaW5kZW50Oi05OTk5ZW07b3ZlcmZsb3c6aGlkZGVuO2JvcmRlci10b3A6LjllbSBzb2xpZCBoc2xhKDAsMCUsMzklLC4xKTtib3JkZXItcmlnaHQ6LjllbSBzb2xpZCBoc2xhKDAsMCUsMzklLC4xKTtib3JkZXItYm90dG9tOi45ZW0gc29saWQgaHNsYSgwLDAlLDM5JSwuMSk7Ym9yZGVyLWxlZnQ6LjllbSBzb2xpZCByZ2JhKDYwLDYwLDYwLC40NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7YW5pbWF0aW9uOnZTZWxlY3RTcGlubmVyIDEuMXMgaW5maW5pdGUgbGluZWFyO3RyYW5zaXRpb246b3BhY2l0eSAuMXN9LnYtc2VsZWN0IC5zcGlubmVyLC52LXNlbGVjdCAuc3Bpbm5lcjphZnRlcntib3JkZXItcmFkaXVzOjUwJTt3aWR0aDo1ZW07aGVpZ2h0OjVlbX0udi1zZWxlY3QubG9hZGluZyAuc3Bpbm5lcntvcGFjaXR5OjF9QC13ZWJraXQta2V5ZnJhbWVzIHZTZWxlY3RTcGlubmVyezAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZyl9dG97dHJhbnNmb3JtOnJvdGF0ZSgxdHVybil9fUBrZXlmcmFtZXMgdlNlbGVjdFNwaW5uZXJ7MCV7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKX10b3t0cmFuc2Zvcm06cm90YXRlKDF0dXJuKX19LmZhZGUtZW50ZXItYWN0aXZlLC5mYWRlLWxlYXZlLWFjdGl2ZXt0cmFuc2l0aW9uOm9wYWNpdHkgLjE1cyBjdWJpYy1iZXppZXIoMSwuNSwuOCwxKX0uZmFkZS1lbnRlciwuZmFkZS1sZWF2ZS10b3tvcGFjaXR5OjB9JyxcIlwiXSl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKCl7dmFyIHQ9W107cmV0dXJuIHQudG9TdHJpbmc9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9W10sZT0wO2U8dGhpcy5sZW5ndGg7ZSsrKXt2YXIgbj10aGlzW2VdO25bMl0/dC5wdXNoKFwiQG1lZGlhIFwiK25bMl0rXCJ7XCIrblsxXStcIn1cIik6dC5wdXNoKG5bMV0pfXJldHVybiB0LmpvaW4oXCJcIil9LHQuaT1mdW5jdGlvbihlLG4pe1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1bW251bGwsZSxcIlwiXV0pO2Zvcih2YXIgcj17fSxvPTA7bzx0aGlzLmxlbmd0aDtvKyspe3ZhciBpPXRoaXNbb11bMF07XCJudW1iZXJcIj09dHlwZW9mIGkmJihyW2ldPSEwKX1mb3Iobz0wO288ZS5sZW5ndGg7bysrKXt2YXIgYT1lW29dO1wibnVtYmVyXCI9PXR5cGVvZiBhWzBdJiZyW2FbMF1dfHwobiYmIWFbMl0/YVsyXT1uOm4mJihhWzJdPVwiKFwiK2FbMl0rXCIpIGFuZCAoXCIrbitcIilcIiksdC5wdXNoKGEpKX19LHR9fSxmdW5jdGlvbih0LGUsbil7big4Nyk7dmFyIHI9big4NCkobig0MSksbig4NSksbnVsbCxudWxsKTt0LmV4cG9ydHM9ci5leHBvcnRzfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixyKXt2YXIgbyxpPXQ9dHx8e30sYT10eXBlb2YgdC5kZWZhdWx0O1wib2JqZWN0XCIhPT1hJiZcImZ1bmN0aW9uXCIhPT1hfHwobz10LGk9dC5kZWZhdWx0KTt2YXIgcz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpP2kub3B0aW9uczppO2lmKGUmJihzLnJlbmRlcj1lLnJlbmRlcixzLnN0YXRpY1JlbmRlckZucz1lLnN0YXRpY1JlbmRlckZucyksbiYmKHMuX3Njb3BlSWQ9bikscil7dmFyIHU9cy5jb21wdXRlZHx8KHMuY29tcHV0ZWQ9e30pO09iamVjdC5rZXlzKHIpLmZvckVhY2goZnVuY3Rpb24odCl7dmFyIGU9clt0XTt1W3RdPWZ1bmN0aW9uKCl7cmV0dXJuIGV9fSl9cmV0dXJue2VzTW9kdWxlOm8sZXhwb3J0czppLG9wdGlvbnM6c319fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPXQuJGNyZWF0ZUVsZW1lbnQsbj10Ll9zZWxmLl9jfHxlO3JldHVybiBuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwiZHJvcGRvd24gdi1zZWxlY3RcIixjbGFzczp0LmRyb3Bkb3duQ2xhc3NlcyxhdHRyczp7ZGlyOnQuZGlyfX0sW24oXCJkaXZcIix7cmVmOlwidG9nZ2xlXCIsY2xhc3M6W1wiZHJvcGRvd24tdG9nZ2xlXCIsXCJjbGVhcmZpeFwiLHtkaXNhYmxlZDp0LmRpc2FibGVkfV0sb246e21vdXNlZG93bjpmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCksdC50b2dnbGVEcm9wZG93bihlKX19fSxbdC5fbCh0LnZhbHVlQXNBcnJheSxmdW5jdGlvbihlKXtyZXR1cm4gbihcInNwYW5cIix7a2V5OmUuaW5kZXgsc3RhdGljQ2xhc3M6XCJzZWxlY3RlZC10YWdcIn0sW3QuX3QoXCJzZWxlY3RlZC1vcHRpb25cIixbdC5fdihcIlxcbiAgICAgICAgXCIrdC5fcyh0LmdldE9wdGlvbkxhYmVsKGUpKStcIlxcbiAgICAgIFwiKV0sbnVsbCxlKSx0Ll92KFwiIFwiKSx0Lm11bHRpcGxlP24oXCJidXR0b25cIix7c3RhdGljQ2xhc3M6XCJjbG9zZVwiLGF0dHJzOnt0eXBlOlwiYnV0dG9uXCIsXCJhcmlhLWxhYmVsXCI6XCJSZW1vdmUgb3B0aW9uXCJ9LG9uOntjbGljazpmdW5jdGlvbihuKXt0LmRlc2VsZWN0KGUpfX19LFtuKFwic3BhblwiLHthdHRyczp7XCJhcmlhLWhpZGRlblwiOlwidHJ1ZVwifX0sW3QuX3YoXCLDl1wiKV0pXSk6dC5fZSgpXSwyKX0pLHQuX3YoXCIgXCIpLG4oXCJpbnB1dFwiLHtkaXJlY3RpdmVzOlt7bmFtZTpcIm1vZGVsXCIscmF3TmFtZTpcInYtbW9kZWxcIix2YWx1ZTp0LnNlYXJjaCxleHByZXNzaW9uOlwic2VhcmNoXCJ9XSxyZWY6XCJzZWFyY2hcIixjbGFzczpbe2Rpc2FibGVkOnQuZGlzYWJsZWR9LFwiZm9ybS1jb250cm9sXCJdLHN0eWxlOnt3aWR0aDp0LmlzVmFsdWVFbXB0eT9cIjEwMCVcIjpcImF1dG9cIn0sYXR0cnM6e3R5cGU6XCJzZWFyY2hcIixwbGFjZWhvbGRlcjp0LnNlYXJjaFBsYWNlaG9sZGVyLHJlYWRvbmx5OiF0LnNlYXJjaGFibGUsaWQ6dC5pbnB1dElkLFwiYXJpYS1sYWJlbFwiOlwiU2VhcmNoIGZvciBvcHRpb25cIn0sZG9tUHJvcHM6e3ZhbHVlOnQuc2VhcmNofSxvbjp7a2V5ZG93bjpbZnVuY3Rpb24oZSl7cmV0dXJuXCJidXR0b25cImluIGV8fCF0Ll9rKGUua2V5Q29kZSxcImRlbGV0ZVwiLFs4LDQ2XSk/dm9pZCB0Lm1heWJlRGVsZXRlVmFsdWUoZSk6bnVsbH0sZnVuY3Rpb24oZSl7cmV0dXJuXCJidXR0b25cImluIGV8fCF0Ll9rKGUua2V5Q29kZSxcInVwXCIsMzgpPyhlLnByZXZlbnREZWZhdWx0KCksdm9pZCB0LnR5cGVBaGVhZFVwKGUpKTpudWxsfSxmdW5jdGlvbihlKXtyZXR1cm5cImJ1dHRvblwiaW4gZXx8IXQuX2soZS5rZXlDb2RlLFwiZG93blwiLDQwKT8oZS5wcmV2ZW50RGVmYXVsdCgpLHZvaWQgdC50eXBlQWhlYWREb3duKGUpKTpudWxsfSxmdW5jdGlvbihlKXtyZXR1cm5cImJ1dHRvblwiaW4gZXx8IXQuX2soZS5rZXlDb2RlLFwiZW50ZXJcIiwxMyk/KGUucHJldmVudERlZmF1bHQoKSx2b2lkIHQudHlwZUFoZWFkU2VsZWN0KGUpKTpudWxsfV0sa2V5dXA6ZnVuY3Rpb24oZSl7cmV0dXJuXCJidXR0b25cImluIGV8fCF0Ll9rKGUua2V5Q29kZSxcImVzY1wiLDI3KT92b2lkIHQub25Fc2NhcGUoZSk6bnVsbH0sYmx1cjp0Lm9uU2VhcmNoQmx1cixmb2N1czp0Lm9uU2VhcmNoRm9jdXMsaW5wdXQ6ZnVuY3Rpb24oZSl7ZS50YXJnZXQuY29tcG9zaW5nfHwodC5zZWFyY2g9ZS50YXJnZXQudmFsdWUpfX19KSx0Ll92KFwiIFwiKSx0Lm5vRHJvcD90Ll9lKCk6bihcImlcIix7cmVmOlwib3BlbkluZGljYXRvclwiLGNsYXNzOlt7ZGlzYWJsZWQ6dC5kaXNhYmxlZH0sXCJvcGVuLWluZGljYXRvclwiXSxhdHRyczp7cm9sZTpcInByZXNlbnRhdGlvblwifX0pLHQuX3YoXCIgXCIpLHQuX3QoXCJzcGlubmVyXCIsW24oXCJkaXZcIix7ZGlyZWN0aXZlczpbe25hbWU6XCJzaG93XCIscmF3TmFtZTpcInYtc2hvd1wiLHZhbHVlOnQubXV0YWJsZUxvYWRpbmcsZXhwcmVzc2lvbjpcIm11dGFibGVMb2FkaW5nXCJ9XSxzdGF0aWNDbGFzczpcInNwaW5uZXJcIn0sW3QuX3YoXCJMb2FkaW5nLi4uXCIpXSldKV0sMiksdC5fdihcIiBcIiksbihcInRyYW5zaXRpb25cIix7YXR0cnM6e25hbWU6dC50cmFuc2l0aW9ufX0sW3QuZHJvcGRvd25PcGVuP24oXCJ1bFwiLHtyZWY6XCJkcm9wZG93bk1lbnVcIixzdGF0aWNDbGFzczpcImRyb3Bkb3duLW1lbnVcIixzdHlsZTp7XCJtYXgtaGVpZ2h0XCI6dC5tYXhIZWlnaHR9fSxbdC5fbCh0LmZpbHRlcmVkT3B0aW9ucyxmdW5jdGlvbihlLHIpe3JldHVybiBuKFwibGlcIix7a2V5OnIsY2xhc3M6e2FjdGl2ZTp0LmlzT3B0aW9uU2VsZWN0ZWQoZSksaGlnaGxpZ2h0OnI9PT10LnR5cGVBaGVhZFBvaW50ZXJ9LG9uOnttb3VzZW92ZXI6ZnVuY3Rpb24oZSl7dC50eXBlQWhlYWRQb2ludGVyPXJ9fX0sW24oXCJhXCIse29uOnttb3VzZWRvd246ZnVuY3Rpb24obil7bi5wcmV2ZW50RGVmYXVsdCgpLHQuc2VsZWN0KGUpfX19LFt0Ll90KFwib3B0aW9uXCIsW3QuX3YoXCJcXG4gICAgICAgICAgXCIrdC5fcyh0LmdldE9wdGlvbkxhYmVsKGUpKStcIlxcbiAgICAgICAgXCIpXSxudWxsLGUpXSwyKV0pfSksdC5fdihcIiBcIiksdC5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoP3QuX2UoKTpuKFwibGlcIix7XG5zdGF0aWNDbGFzczpcIm5vLW9wdGlvbnNcIn0sW3QuX3QoXCJuby1vcHRpb25zXCIsW3QuX3YoXCJTb3JyeSwgbm8gbWF0Y2hpbmcgb3B0aW9ucy5cIildKV0sMildLDIpOnQuX2UoKV0pXSwxKX0sc3RhdGljUmVuZGVyRm5zOltdfX0sZnVuY3Rpb24odCxlLG4pe2Z1bmN0aW9uIHIodCxlKXtmb3IodmFyIG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIHI9dFtuXSxvPWZbci5pZF07aWYobyl7by5yZWZzKys7Zm9yKHZhciBpPTA7aTxvLnBhcnRzLmxlbmd0aDtpKyspby5wYXJ0c1tpXShyLnBhcnRzW2ldKTtmb3IoO2k8ci5wYXJ0cy5sZW5ndGg7aSsrKW8ucGFydHMucHVzaCh1KHIucGFydHNbaV0sZSkpfWVsc2V7Zm9yKHZhciBhPVtdLGk9MDtpPHIucGFydHMubGVuZ3RoO2krKylhLnB1c2godShyLnBhcnRzW2ldLGUpKTtmW3IuaWRdPXtpZDpyLmlkLHJlZnM6MSxwYXJ0czphfX19fWZ1bmN0aW9uIG8odCl7Zm9yKHZhciBlPVtdLG49e30scj0wO3I8dC5sZW5ndGg7cisrKXt2YXIgbz10W3JdLGk9b1swXSxhPW9bMV0scz1vWzJdLHU9b1szXSxsPXtjc3M6YSxtZWRpYTpzLHNvdXJjZU1hcDp1fTtuW2ldP25baV0ucGFydHMucHVzaChsKTplLnB1c2gobltpXT17aWQ6aSxwYXJ0czpbbF19KX1yZXR1cm4gZX1mdW5jdGlvbiBpKHQsZSl7dmFyIG49aCgpLHI9Z1tnLmxlbmd0aC0xXTtpZihcInRvcFwiPT09dC5pbnNlcnRBdClyP3IubmV4dFNpYmxpbmc/bi5pbnNlcnRCZWZvcmUoZSxyLm5leHRTaWJsaW5nKTpuLmFwcGVuZENoaWxkKGUpOm4uaW5zZXJ0QmVmb3JlKGUsbi5maXJzdENoaWxkKSxnLnB1c2goZSk7ZWxzZXtpZihcImJvdHRvbVwiIT09dC5pbnNlcnRBdCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7bi5hcHBlbmRDaGlsZChlKX19ZnVuY3Rpb24gYSh0KXt0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodCk7dmFyIGU9Zy5pbmRleE9mKHQpO2U+PTAmJmcuc3BsaWNlKGUsMSl9ZnVuY3Rpb24gcyh0KXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7cmV0dXJuIGUudHlwZT1cInRleHQvY3NzXCIsaSh0LGUpLGV9ZnVuY3Rpb24gdSh0LGUpe3ZhciBuLHIsbztpZihlLnNpbmdsZXRvbil7dmFyIGk9disrO249Ynx8KGI9cyhlKSkscj1sLmJpbmQobnVsbCxuLGksITEpLG89bC5iaW5kKG51bGwsbixpLCEwKX1lbHNlIG49cyhlKSxyPWMuYmluZChudWxsLG4pLG89ZnVuY3Rpb24oKXthKG4pfTtyZXR1cm4gcih0KSxmdW5jdGlvbihlKXtpZihlKXtpZihlLmNzcz09PXQuY3NzJiZlLm1lZGlhPT09dC5tZWRpYSYmZS5zb3VyY2VNYXA9PT10LnNvdXJjZU1hcClyZXR1cm47cih0PWUpfWVsc2UgbygpfX1mdW5jdGlvbiBsKHQsZSxuLHIpe3ZhciBvPW4/XCJcIjpyLmNzcztpZih0LnN0eWxlU2hlZXQpdC5zdHlsZVNoZWV0LmNzc1RleHQ9eShlLG8pO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobyksYT10LmNoaWxkTm9kZXM7YVtlXSYmdC5yZW1vdmVDaGlsZChhW2VdKSxhLmxlbmd0aD90Lmluc2VydEJlZm9yZShpLGFbZV0pOnQuYXBwZW5kQ2hpbGQoaSl9fWZ1bmN0aW9uIGModCxlKXt2YXIgbj1lLmNzcyxyPWUubWVkaWEsbz1lLnNvdXJjZU1hcDtpZihyJiZ0LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsciksbyYmKG4rPVwiXFxuLyojIHNvdXJjZVVSTD1cIitvLnNvdXJjZXNbMF0rXCIgKi9cIixuKz1cIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIrYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkobykpKSkrXCIgKi9cIiksdC5zdHlsZVNoZWV0KXQuc3R5bGVTaGVldC5jc3NUZXh0PW47ZWxzZXtmb3IoO3QuZmlyc3RDaGlsZDspdC5yZW1vdmVDaGlsZCh0LmZpcnN0Q2hpbGQpO3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobikpfX12YXIgZj17fSxwPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBmdW5jdGlvbigpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBlJiYoZT10LmFwcGx5KHRoaXMsYXJndW1lbnRzKSksZX19LGQ9cChmdW5jdGlvbigpe3JldHVybi9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpfSksaD1wKGZ1bmN0aW9uKCl7cmV0dXJuIGRvY3VtZW50LmhlYWR8fGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXX0pLGI9bnVsbCx2PTAsZz1bXTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtlPWV8fHt9LFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlLnNpbmdsZXRvbiYmKGUuc2luZ2xldG9uPWQoKSksXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUuaW5zZXJ0QXQmJihlLmluc2VydEF0PVwiYm90dG9tXCIpO3ZhciBuPW8odCk7cmV0dXJuIHIobixlKSxmdW5jdGlvbih0KXtmb3IodmFyIGk9W10sYT0wO2E8bi5sZW5ndGg7YSsrKXt2YXIgcz1uW2FdLHU9ZltzLmlkXTt1LnJlZnMtLSxpLnB1c2godSl9aWYodCl7dmFyIGw9byh0KTtyKGwsZSl9Zm9yKHZhciBhPTA7YTxpLmxlbmd0aDthKyspe3ZhciB1PWlbYV07aWYoMD09PXUucmVmcyl7Zm9yKHZhciBjPTA7Yzx1LnBhcnRzLmxlbmd0aDtjKyspdS5wYXJ0c1tjXSgpO2RlbGV0ZSBmW3UuaWRdfX19fTt2YXIgeT1mdW5jdGlvbigpe3ZhciB0PVtdO3JldHVybiBmdW5jdGlvbihlLG4pe3JldHVybiB0W2VdPW4sdC5maWx0ZXIoQm9vbGVhbikuam9pbihcIlxcblwiKX19KCl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDgxKTtcInN0cmluZ1wiPT10eXBlb2YgciYmKHI9W1t0LmlkLHIsXCJcIl1dKTtuKDg2KShyLHt9KTtyLmxvY2FscyYmKHQuZXhwb3J0cz1yLmxvY2Fscyl9XSl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZ1ZS1zZWxlY3QuanMubWFwIl19
