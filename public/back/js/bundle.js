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

},{"path":183}],2:[function(require,module,exports){
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
    hotAPI.rerender("data-v-3f393a65", __vue__options__)
  }
})()}

},{"./Loader":3,"vue":"vue","vue-hot-reload-api":193}],5:[function(require,module,exports){
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
    hotAPI.rerender("data-v-05107876", __vue__options__)
  }
})()}

},{"./ActionButton":5,"vue":"vue","vue-hot-reload-api":193}],7:[function(require,module,exports){
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
    hotAPI.rerender("data-v-643c1236", __vue__options__)
  }
})()}

},{"./Widget":7,"vue":"vue","vue-hot-reload-api":193}],9:[function(require,module,exports){
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
    hotAPI.rerender("data-v-cef207e0", __vue__options__)
  }
})()}

},{"./Footer":9,"vue":"vue","vue-hot-reload-api":193}],11:[function(require,module,exports){
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
    hotAPI.rerender("data-v-f903f060", __vue__options__)
  }
})()}

},{"./Header":11,"vue":"vue","vue-hot-reload-api":193}],13:[function(require,module,exports){
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
    hotAPI.rerender("data-v-3fe98e70", __vue__options__)
  }
})()}

},{"./Navbar":13,"vue":"vue","vue-hot-reload-api":193}],15:[function(require,module,exports){
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

},{"../common/components/ined/forms/dynamic_form/DynamicForm.vue":44,"../common/components/ined/forms/elements/input/Input.vue":46,"../common/components/ined/forms/elements/select/Select.vue":48,"../common/components/ined/forms/elements/variadic_element/VariadicElement.vue":50,"../common/components/ined/forms/form/Form.vue":52,"../common/components/ined/paginator/Paginator.vue":55,"../common/components/ined/tabber/Tabber.vue":57,"../common/store":62,"./components/loader/Loader.vue":4,"./components/themes/ined/components/action_button/ActionButton.vue":6,"./components/themes/ined/components/widget/Widget.vue":8,"./pages/App.vue":22,"./router":38,"vue":"vue"}],20:[function(require,module,exports){
'use strict';

module.exports = {};
var Routes = require('./routes');
var Home = require('./pages/home/Home.vue');
var User = require('./pages/user/User.vue');
var Config = require('./pages/config/Config.vue');
var Lang = require('./pages/lang/Lang.vue');
var Form = require('./pages/form/Form.vue');
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

},{"./pages/config/Config.vue":24,"./pages/datainstance/Datainstance.vue":26,"./pages/datasource/Datasource.vue":28,"./pages/form/Form.vue":30,"./pages/home/Home.vue":32,"./pages/lang/Lang.vue":34,"./pages/user/User.vue":37,"./routes":39}],21:[function(require,module,exports){
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

},{"../../common/api/messages":41,"../../common/api/routes":42,"vue":"vue"}],22:[function(require,module,exports){
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
    hotAPI.rerender("data-v-36c70957", __vue__options__)
  }
})()}

},{"./App":21,"vue":"vue","vue-hot-reload-api":193}],23:[function(require,module,exports){
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

},{"../../../common/api/routes":42,"../../../common/mixins/LangMixin":59,"../../../common/utils/utils":67,"../../lists/environments":15,"../../lists/langs":17,"../mixins/ReaderMixin":35}],24:[function(require,module,exports){
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
    hotAPI.rerender("data-v-e0f00cb6", __vue__options__)
  }
})()}

},{"./Config":23,"vue":"vue","vue-hot-reload-api":193}],25:[function(require,module,exports){
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

},{"../../../common/api/routes":42,"../../../common/mixins/FormMixin":58,"../../../common/mixins/LangMixin":59,"../../../common/utils/utils":67,"../mixins/ReaderMixin":35}],26:[function(require,module,exports){
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
    hotAPI.rerender("data-v-8e1dfbf6", __vue__options__)
  }
})()}

},{"./Datainstance":25,"vue":"vue","vue-hot-reload-api":193}],27:[function(require,module,exports){
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

},{"../../../common/api/routes":42,"../../../common/mixins/LangMixin":59,"../../../common/utils/utils":67,"../mixins/ReaderMixin":35}],28:[function(require,module,exports){
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
    hotAPI.rerender("data-v-5c3dcd45", __vue__options__)
  }
})()}

},{"./Datasource":27,"vue":"vue","vue-hot-reload-api":193}],29:[function(require,module,exports){
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

},{"../../../common/api/routes":42,"../../../common/mixins/LangMixin":59,"../../../common/utils/utils":67,"../../lists/fieldtypes":16,"../mixins/ReaderMixin":35}],30:[function(require,module,exports){
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
    hotAPI.rerender("data-v-39406925", __vue__options__)
  }
})()}

},{"./Form":29,"vue":"vue","vue-hot-reload-api":193}],31:[function(require,module,exports){
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

},{"../../../common/api/routes":42,"../../../common/utils/utils":67,"../mixins/ReaderMixin":35}],32:[function(require,module,exports){
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
    hotAPI.rerender("data-v-524cd205", __vue__options__)
  }
})()}

},{"./Home":31,"vue":"vue","vue-hot-reload-api":193}],33:[function(require,module,exports){
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            var _this = this;

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
                return (0, _keys2.default)(partitions).reduce(function (obj, lang) {
                    obj[lang] = Utils.to_matrix(partitions[lang], _this.state.itemsPerRow);
                    return obj;
                }, {});
            }
            return [];
        }
    }
};

},{"../../../common/api/routes":42,"../../../common/mixins/LangMixin":59,"../../../common/utils/utils":67,"../../lists/langs":17,"../../lists/quantities":18,"../mixins/ReaderMixin":35,"babel-runtime/core-js/object/keys":73}],34:[function(require,module,exports){
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
    hotAPI.rerender("data-v-4a501936", __vue__options__)
  }
})()}

},{"./Lang":33,"vue":"vue","vue-hot-reload-api":193}],35:[function(require,module,exports){
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

},{"../../../common/api/messages":41,"../../../common/api/routes":42,"babel-runtime/core-js/object/keys":73,"vue":"vue"}],36:[function(require,module,exports){
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

},{"../../../common/api/routes":42,"../../../common/mixins/FormMixin":58,"../../../common/mixins/LangMixin":59,"../../../common/utils/utils":67,"../mixins/ReaderMixin":35}],37:[function(require,module,exports){
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
    hotAPI.rerender("data-v-5b688585", __vue__options__)
  }
})()}

},{"./User":36,"vue":"vue","vue-hot-reload-api":193}],38:[function(require,module,exports){
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

},{"./components/themes/ined/parts/footer/Footer.vue":10,"./components/themes/ined/parts/header/Header.vue":12,"./components/themes/ined/parts/navbar/Navbar.vue":14,"./menus":20,"babel-runtime/helpers/toConsumableArray":80,"lodash":"lodash","vue":"vue","vue-router":"vue-router"}],39:[function(require,module,exports){
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
    lang: '/admin/lang',
    external_repo: '/admin/external_repository',
    export_format: '/admin/export_format',
    handle_id: '/admin/handle_id',
    api: '/admin/api',
    config: '/admin/config'
};

},{}],40:[function(require,module,exports){
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

},{"./messages":41,"babel-runtime/core-js/object/keys":73,"babel-runtime/helpers/asyncToGenerator":77,"babel-runtime/regenerator":82,"superagent":188}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{"../../../app/config":2}],43:[function(require,module,exports){
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

},{"../../../../mixins/LangMixin":59}],44:[function(require,module,exports){
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
    hotAPI.rerender("data-v-260d6a9e", __vue__options__)
  }
})()}

},{"./DynamicForm":43,"vue":"vue","vue-hot-reload-api":193}],45:[function(require,module,exports){
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

},{"../../../../../api/messages":41,"../../../../../utils/utils":67,"../../mixins/InputMixin":53}],46:[function(require,module,exports){
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
    hotAPI.rerender("data-v-3b397c06", __vue__options__)
  }
})()}

},{"./Input":45,"vue":"vue","vue-hot-reload-api":193}],47:[function(require,module,exports){
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

},{"../../../../../api/messages":41,"../../../../../utils/utils":67,"../../mixins/InputMixin":53,"babel-runtime/helpers/defineProperty":78,"vue-select":194}],48:[function(require,module,exports){
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
    hotAPI.rerender("data-v-cbd9c5a0", __vue__options__)
  }
})()}

},{"./Select":47,"vue":"vue","vue-hot-reload-api":193}],49:[function(require,module,exports){
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

},{"../../../../../api/messages":41,"../../../../../utils/utils":67,"../../mixins/InputMixin":53,"lodash":"lodash"}],50:[function(require,module,exports){
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
    hotAPI.rerender("data-v-6e17a20e", __vue__options__)
  }
})()}

},{"./VariadicElement":49,"vue":"vue","vue-hot-reload-api":193}],51:[function(require,module,exports){
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

},{"../../../../api/messages":41,"../../../../api/routes":42}],52:[function(require,module,exports){
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
    hotAPI.rerender("data-v-782b8526", __vue__options__)
  }
})()}

},{"./Form":51,"vue":"vue","vue-hot-reload-api":193}],53:[function(require,module,exports){
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

},{"../../../../api/messages":41}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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
    hotAPI.rerender("data-v-5a0665aa", __vue__options__)
  }
})()}

},{"./Paginator":54,"vue":"vue","vue-hot-reload-api":193}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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
    hotAPI.rerender("data-v-78bfb346", __vue__options__)
  }
})()}

},{"./Tabber":56,"vue":"vue","vue-hot-reload-api":193}],58:[function(require,module,exports){
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

},{"../api/routes":42,"./LangMixin":59,"lodash":"lodash"}],59:[function(require,module,exports){
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

},{"../utils/strings":66,"babel-runtime/core-js/object/keys":73}],60:[function(require,module,exports){
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

},{"../api":40,"../api/messages":41,"babel-runtime/helpers/asyncToGenerator":77,"babel-runtime/regenerator":82}],61:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],62:[function(require,module,exports){
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

},{"./actions":60,"./getters":61,"./mutations":63,"./state":64,"vue":"vue","vuex":"vuex"}],63:[function(require,module,exports){
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

},{"../api/messages":41,"../utils/utils":67,"babel-runtime/core-js/object/assign":71,"babel-runtime/helpers/defineProperty":78,"lodash":"lodash"}],64:[function(require,module,exports){
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

},{"../utils/browser":65}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{"lodash":"lodash"}],67:[function(require,module,exports){
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

},{"babel-runtime/core-js/object/keys":73,"babel-runtime/helpers/slicedToArray":79,"babel-runtime/helpers/typeof":81,"lodash":"lodash"}],68:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":84}],69:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":85}],70:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":86}],71:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":87}],72:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":88}],73:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":89}],74:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":90}],75:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":91}],76:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":92}],77:[function(require,module,exports){
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
},{"../core-js/promise":74}],78:[function(require,module,exports){
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
},{"../core-js/object/define-property":72}],79:[function(require,module,exports){
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
},{"../core-js/get-iterator":69,"../core-js/is-iterable":70}],80:[function(require,module,exports){
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
},{"../core-js/array/from":68}],81:[function(require,module,exports){
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
},{"../core-js/symbol":75,"../core-js/symbol/iterator":76}],82:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":185}],83:[function(require,module,exports){

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

},{}],84:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":100,"../../modules/es6.array.from":169,"../../modules/es6.string.iterator":176}],85:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":167,"../modules/es6.string.iterator":176,"../modules/web.dom.iterable":182}],86:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/core.is-iterable":168,"../modules/es6.string.iterator":176,"../modules/web.dom.iterable":182}],87:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":100,"../../modules/es6.object.assign":171}],88:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":100,"../../modules/es6.object.define-property":172}],89:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":100,"../../modules/es6.object.keys":173}],90:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/_core":100,"../modules/es6.object.to-string":174,"../modules/es6.promise":175,"../modules/es6.string.iterator":176,"../modules/es7.promise.finally":178,"../modules/es7.promise.try":179,"../modules/web.dom.iterable":182}],91:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":100,"../../modules/es6.object.to-string":174,"../../modules/es6.symbol":177,"../../modules/es7.symbol.async-iterator":180,"../../modules/es7.symbol.observable":181}],92:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":164,"../../modules/es6.string.iterator":176,"../../modules/web.dom.iterable":182}],93:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],94:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],95:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],96:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":120}],97:[function(require,module,exports){
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

},{"./_to-absolute-index":156,"./_to-iobject":158,"./_to-length":159}],98:[function(require,module,exports){
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

},{"./_cof":99,"./_wks":165}],99:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],100:[function(require,module,exports){
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],101:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":133,"./_property-desc":146}],102:[function(require,module,exports){
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

},{"./_a-function":93}],103:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],104:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":109}],105:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":111,"./_is-object":120}],106:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],107:[function(require,module,exports){
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

},{"./_object-gops":138,"./_object-keys":141,"./_object-pie":142}],108:[function(require,module,exports){
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

},{"./_core":100,"./_ctx":102,"./_global":111,"./_hide":113}],109:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],110:[function(require,module,exports){
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

},{"./_an-object":96,"./_ctx":102,"./_is-array-iter":118,"./_iter-call":121,"./_to-length":159,"./core.get-iterator-method":166}],111:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],112:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],113:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":104,"./_object-dp":133,"./_property-desc":146}],114:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":111}],115:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":104,"./_dom-create":105,"./_fails":109}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":99}],118:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":126,"./_wks":165}],119:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":99}],120:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],121:[function(require,module,exports){
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

},{"./_an-object":96}],122:[function(require,module,exports){
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

},{"./_hide":113,"./_object-create":132,"./_property-desc":146,"./_set-to-string-tag":150,"./_wks":165}],123:[function(require,module,exports){
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

},{"./_export":108,"./_has":112,"./_hide":113,"./_iter-create":122,"./_iterators":126,"./_library":127,"./_object-gpo":139,"./_redefine":148,"./_set-to-string-tag":150,"./_wks":165}],124:[function(require,module,exports){
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

},{"./_wks":165}],125:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],126:[function(require,module,exports){
module.exports = {};

},{}],127:[function(require,module,exports){
module.exports = true;

},{}],128:[function(require,module,exports){
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

},{"./_fails":109,"./_has":112,"./_is-object":120,"./_object-dp":133,"./_uid":162}],129:[function(require,module,exports){
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

},{"./_cof":99,"./_global":111,"./_task":155}],130:[function(require,module,exports){
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

},{"./_a-function":93}],131:[function(require,module,exports){
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

},{"./_fails":109,"./_iobject":117,"./_object-gops":138,"./_object-keys":141,"./_object-pie":142,"./_to-object":160}],132:[function(require,module,exports){
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

},{"./_an-object":96,"./_dom-create":105,"./_enum-bug-keys":106,"./_html":114,"./_object-dps":134,"./_shared-key":151}],133:[function(require,module,exports){
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

},{"./_an-object":96,"./_descriptors":104,"./_ie8-dom-define":115,"./_to-primitive":161}],134:[function(require,module,exports){
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

},{"./_an-object":96,"./_descriptors":104,"./_object-dp":133,"./_object-keys":141}],135:[function(require,module,exports){
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

},{"./_descriptors":104,"./_has":112,"./_ie8-dom-define":115,"./_object-pie":142,"./_property-desc":146,"./_to-iobject":158,"./_to-primitive":161}],136:[function(require,module,exports){
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

},{"./_object-gopn":137,"./_to-iobject":158}],137:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":106,"./_object-keys-internal":140}],138:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],139:[function(require,module,exports){
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

},{"./_has":112,"./_shared-key":151,"./_to-object":160}],140:[function(require,module,exports){
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

},{"./_array-includes":97,"./_has":112,"./_shared-key":151,"./_to-iobject":158}],141:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":106,"./_object-keys-internal":140}],142:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],143:[function(require,module,exports){
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

},{"./_core":100,"./_export":108,"./_fails":109}],144:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],145:[function(require,module,exports){
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

},{"./_an-object":96,"./_is-object":120,"./_new-promise-capability":130}],146:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],147:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":113}],148:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":113}],149:[function(require,module,exports){
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

},{"./_core":100,"./_descriptors":104,"./_global":111,"./_object-dp":133,"./_wks":165}],150:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":112,"./_object-dp":133,"./_wks":165}],151:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":152,"./_uid":162}],152:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":111}],153:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":93,"./_an-object":96,"./_wks":165}],154:[function(require,module,exports){
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

},{"./_defined":103,"./_to-integer":157}],155:[function(require,module,exports){
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

},{"./_cof":99,"./_ctx":102,"./_dom-create":105,"./_global":111,"./_html":114,"./_invoke":116}],156:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":157}],157:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],158:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":103,"./_iobject":117}],159:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":157}],160:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":103}],161:[function(require,module,exports){
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

},{"./_is-object":120}],162:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],163:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":100,"./_global":111,"./_library":127,"./_object-dp":133,"./_wks-ext":164}],164:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":165}],165:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":111,"./_shared":152,"./_uid":162}],166:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":98,"./_core":100,"./_iterators":126,"./_wks":165}],167:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":96,"./_core":100,"./core.get-iterator-method":166}],168:[function(require,module,exports){
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

},{"./_classof":98,"./_core":100,"./_iterators":126,"./_wks":165}],169:[function(require,module,exports){
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

},{"./_create-property":101,"./_ctx":102,"./_export":108,"./_is-array-iter":118,"./_iter-call":121,"./_iter-detect":124,"./_to-length":159,"./_to-object":160,"./core.get-iterator-method":166}],170:[function(require,module,exports){
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

},{"./_add-to-unscopables":94,"./_iter-define":123,"./_iter-step":125,"./_iterators":126,"./_to-iobject":158}],171:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":108,"./_object-assign":131}],172:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":104,"./_export":108,"./_object-dp":133}],173:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":141,"./_object-sap":143,"./_to-object":160}],174:[function(require,module,exports){

},{}],175:[function(require,module,exports){
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

},{"./_a-function":93,"./_an-instance":95,"./_classof":98,"./_core":100,"./_ctx":102,"./_export":108,"./_for-of":110,"./_global":111,"./_is-object":120,"./_iter-detect":124,"./_library":127,"./_microtask":129,"./_new-promise-capability":130,"./_perform":144,"./_promise-resolve":145,"./_redefine-all":147,"./_set-species":149,"./_set-to-string-tag":150,"./_species-constructor":153,"./_task":155,"./_wks":165}],176:[function(require,module,exports){
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

},{"./_iter-define":123,"./_string-at":154}],177:[function(require,module,exports){
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

},{"./_an-object":96,"./_descriptors":104,"./_enum-keys":107,"./_export":108,"./_fails":109,"./_global":111,"./_has":112,"./_hide":113,"./_is-array":119,"./_library":127,"./_meta":128,"./_object-create":132,"./_object-dp":133,"./_object-gopd":135,"./_object-gopn":137,"./_object-gopn-ext":136,"./_object-gops":138,"./_object-keys":141,"./_object-pie":142,"./_property-desc":146,"./_redefine":148,"./_set-to-string-tag":150,"./_shared":152,"./_to-iobject":158,"./_to-primitive":161,"./_uid":162,"./_wks":165,"./_wks-define":163,"./_wks-ext":164}],178:[function(require,module,exports){
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

},{"./_core":100,"./_export":108,"./_global":111,"./_promise-resolve":145,"./_species-constructor":153}],179:[function(require,module,exports){
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

},{"./_export":108,"./_new-promise-capability":130,"./_perform":144}],180:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":163}],181:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":163}],182:[function(require,module,exports){
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

},{"./_global":111,"./_hide":113,"./_iterators":126,"./_wks":165,"./es6.array.iterator":170}],183:[function(require,module,exports){
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

},{"_process":184}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{"./runtime":186}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{"./agent-base":187,"./is-object":189,"./request-base":190,"./response-base":191,"component-emitter":83}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{"./is-object":189}],191:[function(require,module,exports){
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

},{"./utils":192}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueSelect=e():t.VueSelect=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.mixins=e.VueSelect=void 0;var o=n(83),i=r(o),a=n(42),s=r(a);e.default=i.default,e.VueSelect=i.default,e.mixins=s.default},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(10),o=n(33),i=n(25),a=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(4),o=n(14);t.exports=n(2)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(59),o=n(16);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(23)("wks"),o=n(15),i=n(1).Symbol,a="function"==typeof i,s=t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))};s.store=r},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(12);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(1),o=n(5),i=n(56),a=n(6),s="prototype",u=function(t,e,n){var l,c,f,p=t&u.F,d=t&u.G,h=t&u.S,b=t&u.P,v=t&u.B,g=t&u.W,y=d?o:o[e]||(o[e]={}),m=y[s],x=d?r:h?r[e]:(r[e]||{})[s];d&&(n=e);for(l in n)c=!p&&x&&void 0!==x[l],c&&l in y||(f=c?x[l]:n[l],y[l]=d&&"function"!=typeof x[l]?n[l]:v&&c?i(f,r):g&&x[l]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[s]=t[s],e}(f):b&&"function"==typeof f?i(Function.call,f):f,b&&((y.virtual||(y.virtual={}))[l]=f,t&u.R&&m&&!m[l]&&a(m,l,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(38),o=n(17);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(4).f,o=n(3),i=n(8)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(23)("keys"),o=n(15);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(1),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(12);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(1),o=n(5),i=n(19),a=n(27),s=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(8)},function(t,e){"use strict";t.exports={props:{loading:{type:Boolean,default:!1},onSearch:{type:Function,default:function(t,e){}}},data:function(){return{mutableLoading:!1}},watch:{search:function(){this.search.length>0&&(this.onSearch(this.search,this.toggleLoading),this.$emit("search",this.search,this.toggleLoading))},loading:function(t){this.mutableLoading=t}},methods:{toggleLoading:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null==t?this.mutableLoading=!this.mutableLoading:this.mutableLoading=t}}}},function(t,e){"use strict";t.exports={watch:{typeAheadPointer:function(){this.maybeAdjustScroll()}},methods:{maybeAdjustScroll:function(){var t=this.pixelsToPointerTop(),e=this.pixelsToPointerBottom();return t<=this.viewport().top?this.scrollTo(t):e>=this.viewport().bottom?this.scrollTo(this.viewport().top+this.pointerHeight()):void 0},pixelsToPointerTop:function t(){var t=0;if(this.$refs.dropdownMenu)for(var e=0;e<this.typeAheadPointer;e++)t+=this.$refs.dropdownMenu.children[e].offsetHeight;return t},pixelsToPointerBottom:function(){return this.pixelsToPointerTop()+this.pointerHeight()},pointerHeight:function(){var t=!!this.$refs.dropdownMenu&&this.$refs.dropdownMenu.children[this.typeAheadPointer];return t?t.offsetHeight:0},viewport:function(){return{top:this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop:0,bottom:this.$refs.dropdownMenu?this.$refs.dropdownMenu.offsetHeight+this.$refs.dropdownMenu.scrollTop:0}},scrollTo:function(t){return this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop=t:null}}}},function(t,e){"use strict";t.exports={data:function(){return{typeAheadPointer:-1}},watch:{filteredOptions:function(){this.typeAheadPointer=0}},methods:{typeAheadUp:function(){this.typeAheadPointer>0&&(this.typeAheadPointer--,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadDown:function(){this.typeAheadPointer<this.filteredOptions.length-1&&(this.typeAheadPointer++,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadSelect:function(){this.filteredOptions[this.typeAheadPointer]?this.select(this.filteredOptions[this.typeAheadPointer]):this.taggable&&this.search.length&&this.select(this.search),this.clearSearchOnSelect&&(this.search="")}}}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(12),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=!n(2)&&!n(9)(function(){return 7!=Object.defineProperty(n(32)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r=n(19),o=n(11),i=n(39),a=n(6),s=n(3),u=n(18),l=n(61),c=n(21),f=n(67),p=n(8)("iterator"),d=!([].keys&&"next"in[].keys()),h="@@iterator",b="keys",v="values",g=function(){return this};t.exports=function(t,e,n,y,m,x,w){l(n,e,y);var S,O,_,j=function(t){if(!d&&t in M)return M[t];switch(t){case b:return function(){return new n(this,t)};case v:return function(){return new n(this,t)}}return function(){return new n(this,t)}},P=e+" Iterator",k=m==v,A=!1,M=t.prototype,L=M[p]||M[h]||m&&M[m],C=L||j(m),T=m?k?j("entries"):C:void 0,E="Array"==e?M.entries||L:L;if(E&&(_=f(E.call(new t)),_!==Object.prototype&&_.next&&(c(_,P,!0),r||s(_,p)||a(_,p,g))),k&&L&&L.name!==v&&(A=!0,C=function(){return L.call(this)}),r&&!w||!d&&!A&&M[p]||a(M,p,C),u[e]=C,u[P]=g,m)if(S={values:k?C:j(v),keys:x?C:j(b),entries:T},w)for(O in S)O in M||i(M,O,S[O]);else o(o.P+o.F*(d||A),e,S);return S}},function(t,e,n){var r=n(10),o=n(64),i=n(17),a=n(22)("IE_PROTO"),s=function(){},u="prototype",l=function(){var t,e=n(32)("iframe"),r=i.length,o="<",a=">";for(e.style.display="none",n(58).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+a+"document.F=Object"+o+"/script"+a),t.close(),l=t.F;r--;)delete l[u][i[r]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[u]=r(t),n=new s,s[u]=null,n[a]=t):n=l(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(38),o=n(17).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(3),o=n(7),i=n(55)(!1),a=n(22)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),u=0,l=[];for(n in s)n!=a&&r(s,n)&&l.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){t.exports=n(6)},function(t,e,n){var r=n(16);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(44),i=r(o),a=n(47),s=r(a),u=n(48),l=r(u),c=n(29),f=r(c),p=n(30),d=r(p),h=n(28),b=r(h);e.default={mixins:[f.default,d.default,b.default],props:{value:{default:null},options:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},maxHeight:{type:String,default:"400px"},searchable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},placeholder:{type:String,default:""},transition:{type:String,default:"fade"},clearSearchOnSelect:{type:Boolean,default:!0},closeOnSelect:{type:Boolean,default:!0},label:{type:String,default:"label"},getOptionLabel:{type:Function,default:function(t){return"object"===("undefined"==typeof t?"undefined":(0,l.default)(t))&&this.label&&t[this.label]?t[this.label]:t}},onChange:{type:Function,default:function(t){this.$emit("input",t)}},taggable:{type:Boolean,default:!1},pushTags:{type:Boolean,default:!1},createOption:{type:Function,default:function(t){return"object"===(0,l.default)(this.mutableOptions[0])&&(t=(0,s.default)({},this.label,t)),this.$emit("option:created",t),t}},resetOnOptionsChange:{type:Boolean,default:!1},noDrop:{type:Boolean,default:!1},inputId:{type:String},dir:{type:String,default:"auto"}},data:function(){return{search:"",open:!1,mutableValue:null,mutableOptions:[]}},watch:{value:function(t){this.mutableValue=t},mutableValue:function(t,e){this.multiple?this.onChange?this.onChange(t):null:this.onChange&&t!==e?this.onChange(t):null},options:function(t){this.mutableOptions=t},mutableOptions:function(){!this.taggable&&this.resetOnOptionsChange&&(this.mutableValue=this.multiple?[]:null)},multiple:function(t){this.mutableValue=t?[]:null}},created:function(){this.mutableValue=this.value,this.mutableOptions=this.options.slice(0),this.mutableLoading=this.loading,this.$on("option:created",this.maybePushTag)},methods:{select:function(t){this.isOptionSelected(t)?this.deselect(t):(this.taggable&&!this.optionExists(t)&&(t=this.createOption(t)),this.multiple&&!this.mutableValue?this.mutableValue=[t]:this.multiple?this.mutableValue.push(t):this.mutableValue=t),this.onAfterSelect(t)},deselect:function(t){var e=this;if(this.multiple){var n=-1;this.mutableValue.forEach(function(r){(r===t||"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label])&&(n=r)});var r=this.mutableValue.indexOf(n);this.mutableValue.splice(r,1)}else this.mutableValue=null},onAfterSelect:function(t){this.closeOnSelect&&(this.open=!this.open,this.$refs.search.blur()),this.clearSearchOnSelect&&(this.search="")},toggleDropdown:function(t){t.target!==this.$refs.openIndicator&&t.target!==this.$refs.search&&t.target!==this.$refs.toggle&&t.target!==this.$el||(this.open?this.$refs.search.blur():this.disabled||(this.open=!0,this.$refs.search.focus()))},isOptionSelected:function(t){var e=this;if(this.multiple&&this.mutableValue){var n=!1;return this.mutableValue.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label]?n=!0:"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n}return this.mutableValue===t},onEscape:function(){this.search.length?this.search="":this.$refs.search.blur()},onSearchBlur:function(){this.clearSearchOnBlur&&(this.search=""),this.open=!1,this.$emit("search:blur")},onSearchFocus:function(){this.open=!0,this.$emit("search:focus")},maybeDeleteValue:function(){if(!this.$refs.search.value.length&&this.mutableValue)return this.multiple?this.mutableValue.pop():this.mutableValue=null},optionExists:function(t){var e=this,n=!1;return this.mutableOptions.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n},maybePushTag:function(t){this.pushTags&&this.mutableOptions.push(t)}},computed:{dropdownClasses:function(){return{open:this.dropdownOpen,single:!this.multiple,searching:this.searching,searchable:this.searchable,unsearchable:!this.searchable,loading:this.mutableLoading,rtl:"rtl"===this.dir}},clearSearchOnBlur:function(){return this.clearSearchOnSelect&&!this.multiple},searching:function(){return!!this.search},dropdownOpen:function(){return!this.noDrop&&(this.open&&!this.mutableLoading)},searchPlaceholder:function(){if(this.isValueEmpty&&this.placeholder)return this.placeholder},filteredOptions:function(){var t=this,e=this.mutableOptions.filter(function(e){return"object"===("undefined"==typeof e?"undefined":(0,l.default)(e))&&e.hasOwnProperty(t.label)?e[t.label].toLowerCase().indexOf(t.search.toLowerCase())>-1:"object"!==("undefined"==typeof e?"undefined":(0,l.default)(e))||e.hasOwnProperty(t.label)?e.toLowerCase().indexOf(t.search.toLowerCase())>-1:console.warn('[vue-select warn]: Label key "option.'+t.label+'" does not exist in options object.\nhttp://sagalbot.github.io/vue-select/#ex-labels')});return this.taggable&&this.search.length&&!this.optionExists(this.search)&&e.unshift(this.search),e},isValueEmpty:function(){return!this.mutableValue||("object"===(0,l.default)(this.mutableValue)?!(0,i.default)(this.mutableValue).length:!this.mutableValue.length)},valueAsArray:function(){return this.multiple?this.mutableValue:this.mutableValue?[this.mutableValue]:[]}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(28),i=r(o),a=n(30),s=r(a),u=n(29),l=r(u);e.default={ajax:i.default,pointer:s.default,pointerScroll:l.default}},function(t,e,n){t.exports={default:n(49),__esModule:!0}},function(t,e,n){t.exports={default:n(50),__esModule:!0}},function(t,e,n){t.exports={default:n(51),__esModule:!0}},function(t,e,n){t.exports={default:n(52),__esModule:!0}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(43),i=r(o);e.default=function(t,e,n){return e in t?(0,i.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(46),i=r(o),a=n(45),s=r(a),u="function"==typeof s.default&&"symbol"==typeof i.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===u(i.default)?function(t){return"undefined"==typeof t?"undefined":u(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":"undefined"==typeof t?"undefined":u(t)}},function(t,e,n){n(73);var r=n(5).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){n(74),t.exports=n(5).Object.keys},function(t,e,n){n(77),n(75),n(78),n(79),t.exports=n(5).Symbol},function(t,e,n){n(76),n(80),t.exports=n(27).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(7),o=n(71),i=n(70);t.exports=function(t){return function(e,n,a){var s,u=r(e),l=o(u.length),c=i(a,l);if(t&&n!=n){for(;l>c;)if(s=u[c++],s!=s)return!0}else for(;l>c;c++)if((t||c in u)&&u[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var r=n(53);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(13),o=n(37),i=n(20);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,s=n(t),u=i.f,l=0;s.length>l;)u.call(t,a=s[l++])&&e.push(a);return e}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(31);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(31);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(35),o=n(14),i=n(21),a={};n(6)(a,n(8)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(15)("meta"),o=n(12),i=n(3),a=n(4).f,s=0,u=Object.isExtensible||function(){return!0},l=!n(9)(function(){return u(Object.preventExtensions({}))}),c=function(t){a(t,r,{value:{i:"O"+ ++s,w:{}}})},f=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";c(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;c(t)}return t[r].w},d=function(t){return l&&h.NEED&&u(t)&&!i(t,r)&&c(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:p,onFreeze:d}},function(t,e,n){var r=n(4),o=n(10),i=n(13);t.exports=n(2)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),s=a.length,u=0;s>u;)r.f(t,n=a[u++],e[n]);return t}},function(t,e,n){var r=n(20),o=n(14),i=n(7),a=n(25),s=n(3),u=n(33),l=Object.getOwnPropertyDescriptor;e.f=n(2)?l:function(t,e){if(t=i(t),e=a(e,!0),u)try{return l(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(7),o=n(36).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(t){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?s(t):o(r(t))}},function(t,e,n){var r=n(3),o=n(40),i=n(22)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(11),o=n(5),i=n(9);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",a)}},function(t,e,n){var r=n(24),o=n(16);t.exports=function(t){return function(e,n){var i,a,s=String(o(e)),u=r(n),l=s.length;return u<0||u>=l?t?"":void 0:(i=s.charCodeAt(u),i<55296||i>56319||u+1===l||(a=s.charCodeAt(u+1))<56320||a>57343?t?s.charAt(u):i:t?s.slice(u,u+2):(i-55296<<10)+(a-56320)+65536)}}},function(t,e,n){var r=n(24),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(24),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){"use strict";var r=n(54),o=n(62),i=n(18),a=n(7);t.exports=n(34)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(11);r(r.S+r.F*!n(2),"Object",{defineProperty:n(4).f})},function(t,e,n){var r=n(40),o=n(13);n(68)("keys",function(){return function(t){return o(r(t))}})},function(t,e){},function(t,e,n){"use strict";var r=n(69)(!0);n(34)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(1),o=n(3),i=n(2),a=n(11),s=n(39),u=n(63).KEY,l=n(9),c=n(23),f=n(21),p=n(15),d=n(8),h=n(27),b=n(26),v=n(57),g=n(60),y=n(10),m=n(7),x=n(25),w=n(14),S=n(35),O=n(66),_=n(65),j=n(4),P=n(13),k=_.f,A=j.f,M=O.f,L=r.Symbol,C=r.JSON,T=C&&C.stringify,E="prototype",V=d("_hidden"),F=d("toPrimitive"),$={}.propertyIsEnumerable,B=c("symbol-registry"),N=c("symbols"),D=c("op-symbols"),I=Object[E],R="function"==typeof L,z=r.QObject,H=!z||!z[E]||!z[E].findChild,G=i&&l(function(){return 7!=S(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=k(I,e);r&&delete I[e],A(t,e,n),r&&t!==I&&A(I,e,r)}:A,U=function(t){var e=N[t]=S(L[E]);return e._k=t,e},W=R&&"symbol"==typeof L.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof L},J=function(t,e,n){return t===I&&J(D,e,n),y(t),e=x(e,!0),y(n),o(N,e)?(n.enumerable?(o(t,V)&&t[V][e]&&(t[V][e]=!1),n=S(n,{enumerable:w(0,!1)})):(o(t,V)||A(t,V,w(1,{})),t[V][e]=!0),G(t,e,n)):A(t,e,n)},K=function(t,e){y(t);for(var n,r=v(e=m(e)),o=0,i=r.length;i>o;)J(t,n=r[o++],e[n]);return t},Y=function(t,e){return void 0===e?S(t):K(S(t),e)},q=function(t){var e=$.call(this,t=x(t,!0));return!(this===I&&o(N,t)&&!o(D,t))&&(!(e||!o(this,t)||!o(N,t)||o(this,V)&&this[V][t])||e)},Q=function(t,e){if(t=m(t),e=x(e,!0),t!==I||!o(N,e)||o(D,e)){var n=k(t,e);return!n||!o(N,e)||o(t,V)&&t[V][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=M(m(t)),r=[],i=0;n.length>i;)o(N,e=n[i++])||e==V||e==u||r.push(e);return r},X=function(t){for(var e,n=t===I,r=M(n?D:m(t)),i=[],a=0;r.length>a;)!o(N,e=r[a++])||n&&!o(I,e)||i.push(N[e]);return i};R||(L=function(){if(this instanceof L)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===I&&e.call(D,n),o(this,V)&&o(this[V],t)&&(this[V][t]=!1),G(this,t,w(1,n))};return i&&H&&G(I,t,{configurable:!0,set:e}),U(t)},s(L[E],"toString",function(){return this._k}),_.f=Q,j.f=J,n(36).f=O.f=Z,n(20).f=q,n(37).f=X,i&&!n(19)&&s(I,"propertyIsEnumerable",q,!0),h.f=function(t){return U(d(t))}),a(a.G+a.W+a.F*!R,{Symbol:L});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;)d(tt[et++]);for(var nt=P(d.store),rt=0;nt.length>rt;)b(nt[rt++]);a(a.S+a.F*!R,"Symbol",{for:function(t){return o(B,t+="")?B[t]:B[t]=L(t)},keyFor:function(t){if(!W(t))throw TypeError(t+" is not a symbol!");for(var e in B)if(B[e]===t)return e},useSetter:function(){H=!0},useSimple:function(){H=!1}}),a(a.S+a.F*!R,"Object",{create:Y,defineProperty:J,defineProperties:K,getOwnPropertyDescriptor:Q,getOwnPropertyNames:Z,getOwnPropertySymbols:X}),C&&a(a.S+a.F*(!R||l(function(){var t=L();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!W(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!W(e))return e}),r[1]=e,T.apply(C,r)}}}),L[E][F]||n(6)(L[E],F,L[E].valueOf),f(L,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){n(26)("asyncIterator")},function(t,e,n){n(26)("observable")},function(t,e,n){n(72);for(var r=n(1),o=n(6),i=n(18),a=n(8)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),u=0;u<s.length;u++){var l=s[u],c=r[l],f=c&&c.prototype;f&&!f[a]&&o(f,a,l),i[l]=i.Array}},function(t,e,n){e=t.exports=n(82)(),e.push([t.id,'.v-select{position:relative;font-family:sans-serif}.v-select .disabled{cursor:not-allowed!important;background-color:#f8f8f8!important}.v-select,.v-select *{box-sizing:border-box}.v-select.rtl .open-indicator{left:10px;right:auto}.v-select.rtl .selected-tag{float:right;margin-right:3px;margin-left:1px}.v-select.rtl .dropdown-menu{text-align:right}.v-select .open-indicator{position:absolute;bottom:6px;right:10px;cursor:pointer;pointer-events:all;opacity:1;height:20px}.v-select .open-indicator,.v-select .open-indicator:before{display:inline-block;transition:all .15s cubic-bezier(1,-.115,.975,.855);transition-timing-function:cubic-bezier(1,-.115,.975,.855);width:10px}.v-select .open-indicator:before{border-color:rgba(60,60,60,.5);border-style:solid;border-width:3px 3px 0 0;content:"";height:10px;vertical-align:top;transform:rotate(133deg);box-sizing:inherit}.v-select.open .open-indicator:before{transform:rotate(315deg)}.v-select.loading .open-indicator{opacity:0}.v-select.open .open-indicator{bottom:1px}.v-select .dropdown-toggle{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;padding:0;background:none;border:1px solid rgba(60,60,60,.26);border-radius:4px;white-space:normal}.v-select .dropdown-toggle:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}.v-select.searchable .dropdown-toggle{cursor:text}.v-select.unsearchable .dropdown-toggle{cursor:pointer}.v-select.open .dropdown-toggle{border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0}.v-select .dropdown-menu{display:block;position:absolute;top:100%;left:0;z-index:1000;min-width:160px;padding:5px 0;margin:0;width:100%;overflow-y:scroll;border:1px solid rgba(0,0,0,.26);box-shadow:0 3px 6px 0 rgba(0,0,0,.15);border-top:none;border-radius:0 0 4px 4px;text-align:left;list-style:none;background:#fff}.v-select .no-options{text-align:center}.v-select .selected-tag{color:#333;background-color:#f0f0f0;border:1px solid #ccc;border-radius:4px;height:26px;margin:4px 1px 0 3px;padding:1px .25em;float:left;line-height:24px}.v-select.single .selected-tag{background-color:transparent;border-color:transparent}.v-select.single.open .selected-tag{position:absolute;opacity:.5}.v-select.single.loading .selected-tag,.v-select.single.open.searching .selected-tag{display:none}.v-select .selected-tag .close{float:none;margin-right:0;font-size:20px;appearance:none;padding:0;cursor:pointer;background:0 0;border:0;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}.v-select.single.searching:not(.open):not(.loading) input[type=search]{opacity:.2}.v-select input[type=search]::-webkit-search-cancel-button,.v-select input[type=search]::-webkit-search-decoration,.v-select input[type=search]::-webkit-search-results-button,.v-select input[type=search]::-webkit-search-results-decoration{display:none}.v-select input[type=search]::-ms-clear{display:none}.v-select input[type=search],.v-select input[type=search]:focus{appearance:none;-webkit-appearance:none;-moz-appearance:none;line-height:1.42857143;font-size:1em;height:34px;display:inline-block;border:none;outline:none;margin:0;padding:0 .5em;width:10em;max-width:100%;background:none;position:relative;box-shadow:none;float:left;clear:none}.v-select li{line-height:1.42857143}.v-select li>a{display:block;padding:3px 20px;clear:both;color:#333;white-space:nowrap}.v-select li:hover{cursor:pointer}.v-select .dropdown-menu .active>a{color:#333;background:rgba(50,50,50,.1)}.v-select .dropdown-menu>.highlight>a{background:#5897fb;color:#fff}.v-select .highlight:not(:last-child){margin-bottom:0}.v-select .spinner{opacity:0;position:absolute;top:5px;right:10px;font-size:5px;text-indent:-9999em;overflow:hidden;border-top:.9em solid hsla(0,0%,39%,.1);border-right:.9em solid hsla(0,0%,39%,.1);border-bottom:.9em solid hsla(0,0%,39%,.1);border-left:.9em solid rgba(60,60,60,.45);transform:translateZ(0);animation:vSelectSpinner 1.1s infinite linear;transition:opacity .1s}.v-select .spinner,.v-select .spinner:after{border-radius:50%;width:5em;height:5em}.v-select.loading .spinner{opacity:1}@-webkit-keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.fade-enter-active,.fade-leave-active{transition:opacity .15s cubic-bezier(1,.5,.8,1)}.fade-enter,.fade-leave-to{opacity:0}',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){n(87);var r=n(84)(n(41),n(85),null,null);t.exports=r.exports},function(t,e){t.exports=function(t,e,n,r){var o,i=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,i=t.default);var s="function"==typeof i?i.options:i;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),r){var u=s.computed||(s.computed={});Object.keys(r).forEach(function(t){var e=r[t];u[t]=function(){return e}})}return{esModule:o,exports:i,options:s}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown v-select",class:t.dropdownClasses,attrs:{dir:t.dir}},[n("div",{ref:"toggle",class:["dropdown-toggle","clearfix",{disabled:t.disabled}],on:{mousedown:function(e){e.preventDefault(),t.toggleDropdown(e)}}},[t._l(t.valueAsArray,function(e){return n("span",{key:e.index,staticClass:"selected-tag"},[t._t("selected-option",[t._v("\n        "+t._s(t.getOptionLabel(e))+"\n      ")],null,e),t._v(" "),t.multiple?n("button",{staticClass:"close",attrs:{type:"button","aria-label":"Remove option"},on:{click:function(n){t.deselect(e)}}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]):t._e()],2)}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],ref:"search",class:[{disabled:t.disabled},"form-control"],style:{width:t.isValueEmpty?"100%":"auto"},attrs:{type:"search",placeholder:t.searchPlaceholder,readonly:!t.searchable,id:t.inputId,"aria-label":"Search for option"},domProps:{value:t.search},on:{keydown:[function(e){return"button"in e||!t._k(e.keyCode,"delete",[8,46])?void t.maybeDeleteValue(e):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38)?(e.preventDefault(),void t.typeAheadUp(e)):null},function(e){return"button"in e||!t._k(e.keyCode,"down",40)?(e.preventDefault(),void t.typeAheadDown(e)):null},function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?(e.preventDefault(),void t.typeAheadSelect(e)):null}],keyup:function(e){return"button"in e||!t._k(e.keyCode,"esc",27)?void t.onEscape(e):null},blur:t.onSearchBlur,focus:t.onSearchFocus,input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),t.noDrop?t._e():n("i",{ref:"openIndicator",class:[{disabled:t.disabled},"open-indicator"],attrs:{role:"presentation"}}),t._v(" "),t._t("spinner",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.mutableLoading,expression:"mutableLoading"}],staticClass:"spinner"},[t._v("Loading...")])])],2),t._v(" "),n("transition",{attrs:{name:t.transition}},[t.dropdownOpen?n("ul",{ref:"dropdownMenu",staticClass:"dropdown-menu",style:{"max-height":t.maxHeight}},[t._l(t.filteredOptions,function(e,r){return n("li",{key:r,class:{active:t.isOptionSelected(e),highlight:r===t.typeAheadPointer},on:{mouseover:function(e){t.typeAheadPointer=r}}},[n("a",{on:{mousedown:function(n){n.preventDefault(),t.select(e)}}},[t._t("option",[t._v("\n          "+t._s(t.getOptionLabel(e))+"\n        ")],null,e)],2)])}),t._v(" "),t.filteredOptions.length?t._e():n("li",{
staticClass:"no-options"},[t._t("no-options",[t._v("Sorry, no matching options.")])],2)],2):t._e()])],1)},staticRenderFns:[]}},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=f[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(u(r.parts[i],e))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(u(r.parts[i],e));f[r.id]={id:r.id,refs:1,parts:a}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],i=o[0],a=o[1],s=o[2],u=o[3],l={css:a,media:s,sourceMap:u};n[i]?n[i].parts.push(l):e.push(n[i]={id:i,parts:[l]})}return e}function i(t,e){var n=h(),r=g[g.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),g.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=g.indexOf(t);e>=0&&g.splice(e,1)}function s(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function u(t,e){var n,r,o;if(e.singleton){var i=v++;n=b||(b=s(e)),r=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else n=s(e),r=c.bind(null,n),o=function(){a(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}function l(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function c(t,e){var n=e.css,r=e.media,o=e.sourceMap;if(r&&t.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var f={},p=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},d=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,v=0,g=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=d()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],u=f[s.id];u.refs--,i.push(u)}if(t){var l=o(t);r(l,e)}for(var a=0;a<i.length;a++){var u=i[a];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete f[u.id]}}}};var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){var r=n(81);"string"==typeof r&&(r=[[t.id,r,""]]);n(86)(r,{});r.locals&&(t.exports=r.locals)}])});

},{}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29uZmlnL2FsbC5qcyIsImFwcC9jb25maWcvaW5kZXguanMiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvbG9hZGVyL0xvYWRlci5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy9sb2FkZXIvTG9hZGVyLnZ1ZT8wMzMwMjJiNCIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2FjdGlvbl9idXR0b24vQWN0aW9uQnV0dG9uLmpzIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvYWN0aW9uX2J1dHRvbi9BY3Rpb25CdXR0b24udnVlPzFkODE3OTAxIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvd2lkZ2V0L1dpZGdldC5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL3dpZGdldC9XaWRnZXQudnVlPzIzZTFjNDk5IiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL3BhcnRzL2Zvb3Rlci9Gb290ZXIuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvcGFydHMvZm9vdGVyL0Zvb3Rlci52dWU/NjE4MTM1MTIiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvcGFydHMvaGVhZGVyL0hlYWRlci5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9wYXJ0cy9oZWFkZXIvSGVhZGVyLnZ1ZT8zMGMxZjhmOSIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9wYXJ0cy9uYXZiYXIvTmF2YmFyLmpzIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL3BhcnRzL25hdmJhci9OYXZiYXIudnVlPzEzMWZlYWU5IiwiZnJvbnQvYmFja29mZmljZS9saXN0cy9lbnZpcm9ubWVudHMuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2xpc3RzL2ZpZWxkdHlwZXMuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2xpc3RzL2xhbmdzLmpzIiwiZnJvbnQvYmFja29mZmljZS9saXN0cy9xdWFudGl0aWVzLmpzIiwiZnJvbnQvYmFja29mZmljZS9tYWluLmpzIiwiZnJvbnQvYmFja29mZmljZS9tZW51cy5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvQXBwLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9BcHAudnVlPzUzODNkNWU4IiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9jb25maWcvQ29uZmlnLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9jb25maWcvQ29uZmlnLnZ1ZT83NDM0NDcxNCIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZGF0YWluc3RhbmNlL0RhdGFpbnN0YW5jZS5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZGF0YWluc3RhbmNlL0RhdGFpbnN0YW5jZS52dWU/YjNiZjAxNjgiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL2RhdGFzb3VyY2UvRGF0YXNvdXJjZS5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZGF0YXNvdXJjZS9EYXRhc291cmNlLnZ1ZT80NDdiOTZjOCIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZm9ybS9Gb3JtLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9mb3JtL0Zvcm0udnVlPzNlZDRkY2JlIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9ob21lL0hvbWUuanMiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL2hvbWUvSG9tZS52dWU/NTEyNGIyMWUiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL2xhbmcvTGFuZy5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvbGFuZy9MYW5nLnZ1ZT80MDY0ODFhMyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvbWl4aW5zL1JlYWRlck1peGluLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy91c2VyL1VzZXIuanMiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL3VzZXIvVXNlci52dWU/ODRlYjM5MGEiLCJmcm9udC9iYWNrb2ZmaWNlL3JvdXRlci5qcyIsImZyb250L2JhY2tvZmZpY2Uvcm91dGVzLmpzIiwiZnJvbnQvY29tbW9uL2FwaS9pbmRleC5qcyIsImZyb250L2NvbW1vbi9hcGkvbWVzc2FnZXMuanMiLCJmcm9udC9jb21tb24vYXBpL3JvdXRlcy5qcyIsImZyb250L2NvbW1vbi9jb21wb25lbnRzL2luZWQvZm9ybXMvZHluYW1pY19mb3JtL0R5bmFtaWNGb3JtLmpzIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9keW5hbWljX2Zvcm0vRHluYW1pY0Zvcm0udnVlPzViMjZlMGQ3IiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9lbGVtZW50cy9pbnB1dC9JbnB1dC5qcyIsImZyb250L2NvbW1vbi9jb21wb25lbnRzL2luZWQvZm9ybXMvZWxlbWVudHMvaW5wdXQvSW5wdXQudnVlPzJkYzM4NmQwIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9lbGVtZW50cy9zZWxlY3QvU2VsZWN0LmpzIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9lbGVtZW50cy9zZWxlY3QvU2VsZWN0LnZ1ZT80Y2MxNGM1YSIsImZyb250L2NvbW1vbi9jb21wb25lbnRzL2luZWQvZm9ybXMvZWxlbWVudHMvdmFyaWFkaWNfZWxlbWVudC9WYXJpYWRpY0VsZW1lbnQuanMiLCJmcm9udC9jb21tb24vY29tcG9uZW50cy9pbmVkL2Zvcm1zL2VsZW1lbnRzL3ZhcmlhZGljX2VsZW1lbnQvVmFyaWFkaWNFbGVtZW50LnZ1ZT9iNWEyODU4YyIsImZyb250L2NvbW1vbi9jb21wb25lbnRzL2luZWQvZm9ybXMvZm9ybS9Gb3JtLmpzIiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9mb3JtL0Zvcm0udnVlPzA2NjMwYmY4IiwiZnJvbnQvY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9taXhpbnMvSW5wdXRNaXhpbi5qcyIsImZyb250L2NvbW1vbi9jb21wb25lbnRzL2luZWQvcGFnaW5hdG9yL1BhZ2luYXRvci5qcyIsImZyb250L2NvbW1vbi9jb21wb25lbnRzL2luZWQvcGFnaW5hdG9yL1BhZ2luYXRvci52dWU/OGVlYjQ2ZjgiLCJmcm9udC9jb21tb24vY29tcG9uZW50cy9pbmVkL3RhYmJlci9UYWJiZXIuanMiLCJmcm9udC9jb21tb24vY29tcG9uZW50cy9pbmVkL3RhYmJlci9UYWJiZXIudnVlPzIyMzBmOGFkIiwiZnJvbnQvY29tbW9uL21peGlucy9Gb3JtTWl4aW4uanMiLCJmcm9udC9jb21tb24vbWl4aW5zL0xhbmdNaXhpbi5qcyIsImZyb250L2NvbW1vbi9zdG9yZS9hY3Rpb25zLmpzIiwiZnJvbnQvY29tbW9uL3N0b3JlL2dldHRlcnMuanMiLCJmcm9udC9jb21tb24vc3RvcmUvaW5kZXguanMiLCJmcm9udC9jb21tb24vc3RvcmUvbXV0YXRpb25zLmpzIiwiZnJvbnQvY29tbW9uL3N0b3JlL3N0YXRlLmpzIiwiZnJvbnQvY29tbW9uL3V0aWxzL2Jyb3dzZXIuanMiLCJmcm9udC9jb21tb24vdXRpbHMvc3RyaW5ncy5qcyIsImZyb250L2NvbW1vbi91dGlscy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoLWJyb3dzZXJpZnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS1tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2FnZW50LWJhc2UuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvY2xpZW50LmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9yZXF1ZXN0LWJhc2UuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVzcG9uc2UtYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy92dWUtc2VsZWN0L2Rpc3QvdnVlLXNlbGVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBLElBQU0sT0FBTyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNLE1BQU07QUFDUixVQUFNLEtBQUssT0FBTCxDQUFhLEtBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsSUFBckIsQ0FBYixDQURFO0FBRVIsbUJBQWU7QUFDWCxzQkFBYztBQURILEtBRlA7QUFLUixZQUFRO0FBQ0osaUJBQVM7QUFETCxLQUxBO0FBUVIsU0FBSztBQUNELGdCQUFRO0FBQ0oscUJBQVMsSUFETDtBQUVKLG9CQUFRO0FBRkosU0FEUDtBQUtELGlCQUFTO0FBQ0wscUJBQVMsSUFESjtBQUVMLG9CQUFRO0FBRkgsU0FMUjtBQVNELGtCQUFVLENBQUMsTUFBRCxFQUFTLE1BQVQ7QUFUVCxLQVJHO0FBbUJSLGNBQVUsQ0FBQztBQUNQLGNBQU0sVUFEQztBQUVQLGNBQU07QUFGQyxLQUFELEVBSVY7QUFDSSxjQUFNLFNBRFY7QUFFSSxjQUFNO0FBRlYsS0FKVSxFQVFWO0FBQ0ksY0FBTSxNQURWO0FBRUksY0FBTTtBQUZWLEtBUlUsRUFZVjtBQUNJLGNBQU0sYUFEVjtBQUVJLGNBQU07QUFGVixLQVpVO0FBbkJGLENBQVo7O0FBc0NBLE9BQU8sT0FBUCxHQUFpQixHQUFqQjs7Ozs7OztBQ3hDQSxJQUFNLGFBQWEsUUFBUSxPQUFSLENBQW5CO0FBQ0EsSUFBTSxJQUFJLFFBQVEsUUFBUixD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbktBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdDVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TkE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmNvbnN0IGFsbCA9IHtcbiAgICByb290OiBwYXRoLnJlc29sdmUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJykpLFxuICAgIGVsYXN0aWNzZWFyY2g6IHtcbiAgICAgICAgaW5kZXhfcHJlZml4OiAncG9zJyxcbiAgICB9LFxuICAgIGxvZ2dlcjoge1xuICAgICAgICBsb2dGaWxlOiAnbWlkc3RvZC5sb2cnLFxuICAgIH0sXG4gICAgYXBpOiB7XG4gICAgICAgIHB1YmxpYzoge1xuICAgICAgICAgICAgdmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICAgIHByZWZpeDogJy9hcGkvcHVibGljJyxcbiAgICAgICAgfSxcbiAgICAgICAgcHJpdmF0ZToge1xuICAgICAgICAgICAgdmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICAgIHByZWZpeDogJy9hcGkvcHJpdmF0ZScsXG4gICAgICAgIH0sXG4gICAgICAgIGludGVydmFsOiBbMTIwMDAwLCAxMjAwMDBdLFxuICAgIH0sXG4gICAgZW50aXRpZXM6IFt7XG4gICAgICAgIG5hbWU6ICdjaXRhdGlvbicsXG4gICAgICAgIHRleHQ6ICdDaXRhdGlvbicsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdhcGl1c2VyJyxcbiAgICAgICAgdGV4dDogJ1VzZXIgb2YgQVBJJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3VzZXInLFxuICAgICAgICB0ZXh0OiAnVXNlcicsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdpbnN0aXR1dGlvbicsXG4gICAgICAgIHRleHQ6ICdJbnN0aXR1dGlvbicsXG4gICAgfSxcbiAgICBdLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhbGw7XG4iLCJjb25zdCBiYXNlQ29uZmlnID0gcmVxdWlyZSgnLi9hbGwnKTtcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuY29uc3QgZW52ID0gXCJkZXZlbG9wbWVudFwiIHx8ICdkZXZlbG9wbWVudCc7XG5sZXQgdG1wO1xudHJ5IHtcbiAgdG1wID0gcmVxdWlyZShgLi8ke2Vudn0uanNgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxufSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0bXAgPSB7fTtcbiAgICAvLyBwcm9jZXNzLmV4aXQoMSk7XG59XG5cbmNvbnN0IGNvbmZpZyA9IF8ubWVyZ2UoYmFzZUNvbmZpZywgdG1wKTtcbm1vZHVsZS5leHBvcnRzID0gY29uZmlnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmFtZTogJ0xvYWRlcicsXG4gICAgcHJvcHM6IFsncHJpbWFyeUNvbG9yJywgJ3NlY29uZGFyeUNvbG9yJ10sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgIHByaW1hcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByaW1hcnlDb2xvcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlY29uZGFyeToge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuc2Vjb25kYXJ5Q29sb3IsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwibXN3LWxvYWRlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkZXItc3F1YXJlIHNlY29uZGFyeS1jb2xvclwiIDpzdHlsZT1cImNzcy5zZWNvbmRhcnlcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkZXItc3F1YXJlIHNlY29uZGFyeS1jb2xvclwiIDpzdHlsZT1cImNzcy5zZWNvbmRhcnlcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkZXItc3F1YXJlIHNlY29uZGFyeS1jb2xvciBsb2FkZXItbGFzdFwiIDpzdHlsZT1cImNzcy5zZWNvbmRhcnlcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkZXItc3F1YXJlIHByaW1hcnktY29sb3IgbG9hZGVyLWNsZWFyXCIgOnN0eWxlPVwiY3NzLnByaW1hcnlcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkZXItc3F1YXJlIHByaW1hcnktY29sb3JcIiA6c3R5bGU9XCJjc3MucHJpbWFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgcHJpbWFyeS1jb2xvciBsb2FkZXItbGFzdFwiIDpzdHlsZT1cImNzcy5wcmltYXJ5XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGVyLXNxdWFyZSBzZWNvbmRhcnktY29sb3IgbG9hZGVyLWNsZWFyXCIgOnN0eWxlPVwiY3NzLnNlY29uZGFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgc2Vjb25kYXJ5LWNvbG9yXCIgOnN0eWxlPVwiY3NzLnNlY29uZGFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgc2Vjb25kYXJ5LWNvbG9yIGxvYWRlci1sYXN0XCIgOnN0eWxlPVwiY3NzLnNlY29uZGFyeVwiIC8+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vTG9hZGVyJyk7XG48L3NjcmlwdD5cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByb3BzOiB7XG4gICAgICAgIHR3b1N0ZXBzOiB7IGRlZmF1bHQ6IGZhbHNlLCB0eXBlOiBCb29sZWFuIH0sXG4gICAgICAgIGNvbmZpcm1hdGlvbjogeyBkZWZhdWx0OiAnQXJlIHlvdSBzdXJlPycsIHR5cGU6IFN0cmluZyB9LFxuICAgIH0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBjbGljayhlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy50d29TdGVwcyAmJiAhdGhpcy5zdGF0ZS5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jb25maXJtID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5zdGF0ZS5jb25maXJtID0gZmFsc2U7IH0sIDMwMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNvbmZpcm0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdhY3Rpb24tY2xpY2snKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8YnV0dG9uIEBjbGljaz1cImNsaWNrXCI+XG4gICAgICAgIDxzbG90IHYtaWY9XCIhc3RhdGUuY29uZmlybVwiPlxuXG4gICAgICAgIDwvc2xvdD5cbiAgICAgICAgPHNwYW4gdi1lbHNlPlxuICAgICAgICAgICAge3tjb25maXJtYXRpb259fVxuICAgICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9BY3Rpb25CdXR0b24nKTtcbjwvc2NyaXB0PlxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgICAgaGFzT3B0aW9uczogeyBkZWZhdWx0OiB0cnVlIH0sXG4gICAgICAgIGlzUmVmcmVzaGFibGU6IHsgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgICAgaXNSZW1vdmFibGU6IHsgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgICAgaXNDb2xsYXBzYWJsZTogeyBkZWZhdWx0OiB0cnVlIH0sXG4gICAgICAgIGNvbGxhcHNlZDogeyBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIH0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgb25Db2xsYXBzZShlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNvbGxhcHNlZCA9ICF0aGlzLnN0YXRlLmNvbGxhcHNlZDtcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlZnJlc2goZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVmcmVzaCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uUmVtb3ZlKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVtb3ZlJyk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLnN0YXRlLmNvbGxhcHNlZCA9IHRoaXMuY29sbGFwc2VkO1xuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cInNtYXJ0LXdpZGdldFwiIHYtaWY9XCJzdGF0ZS5zaG93XCI+XG4gICAgPGRpdiBjbGFzcz1cInNtYXJ0LXdpZGdldC1oZWFkZXJcIj5cbiAgICAgICAgPHNsb3QgbmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICBTbG90IHRpdGxlIGlzIHJlcXVpcmVkXG4gICAgICAgIDwvc2xvdD5cbiAgICAgICAgPHNwYW4gdi1pZj1cImhhc09wdGlvbnNcIiBjbGFzcz1cInNtYXJ0LXdpZGdldC1vcHRpb25cIj5cbiAgICAgICAgICAgIDxhIHYtaWY9XCJpc0NvbGxhcHNhYmxlXCIgY2xhc3M9XCJ3aWRnZXQtY29sbGFwc2Utb3B0aW9uXCIgQGNsaWNrPVwib25Db2xsYXBzZVwiIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgPGkgdi1pZj1cInN0YXRlLmNvbGxhcHNlZFwiIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1kb3duXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxpIHYtZWxzZSBjbGFzcz1cImZhIGZhLWNoZXZyb24tdXBcIj48L2k+XG4gICAgICAgICAgICA8L2E+IFxuICAgICAgICAgICAgPGEgdi1pZj1cImlzUmVmcmVzaGFibGVcIiBjbGFzcz1cIndpZGdldC1yZWZyZXNoLW9wdGlvblwiIGhyZWY9XCIjXCIgQGNsaWNrPVwib25SZWZyZXNoXCI+PGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoXCI+PC9pPjwvYT4gXG4gICAgICAgICAgICA8YSB2LWlmPVwiaXNSZW1vdmFibGVcIiBjbGFzcz1cIndpZGdldC1yZW1vdmUtb3B0aW9uXCIgaHJlZj1cIiNcIiBAY2xpY2s9XCJvblJlbW92ZVwiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9hPiBcbiAgICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDx0cmFuc2l0aW9uIG5hbWU9XCJ3aWRnZXQtc2xpZGVcIj5cbiAgICAgICAgPGRpdiB2LWlmPVwiIXN0YXRlLmNvbGxhcHNlZFwiIGNsYXNzPVwic21hcnQtd2lkZ2V0LWlubmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic21hcnQtd2lkZ2V0LWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgIFNsb3QgYm9keSBpcyByZXF1aXJlZFxuICAgICAgICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L3RyYW5zaXRpb24+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vV2lkZ2V0Jyk7IFxuPC9zY3JpcHQ+XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblxufVxuIiwiPHRlbXBsYXRlPlxuPGZvb3RlciBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWNvbnRhaW5lciBjb250YWluZXIgaXMtZmx1aWQgaXMtbWFyZ2lubGVzc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBmb290ZXItZGlzY2xhaW1lclwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb2x1bW5cIj4mY29weTsgSU5FRCAyMDE3PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZm9vdGVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vRm9vdGVyJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IE5hdmJhciA9IHJlcXVpcmUoJy4uL25hdmJhci9OYXZiYXIudnVlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgJ25hdmJhcic6IE5hdmJhcixcbiAgICB9XG59XG4iLCI8dGVtcGxhdGU+XG48aGVhZGVyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWQgaXMtbWFyZ2lubGVzc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGlsZSBpcy1hbmNlc3RvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbGUgaXMtcGFyZW50IGlzLTIgaXMtdmVydGljYWwgaXMtaGlkZGVuLXRvdWNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlIHRpbGUgaXMtY2hpbGQgaXMtMTZieTlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9Jy9wdWJsaWMvZnJvbnQvaW1ncy9sb2dvL2xvZ28uc3ZnJyBhbHQ9J0xvZ28nIHRpdGxlPSdBcHAgTG9nbycgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbGUgaXMtdmVydGljYWxcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbGUgaXMtcGFyZW50IGlzLTIgaXMtdmVydGljYWxcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRpbGUgaXMtY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPScjJz5Mb2cgSW4gLyBTaWduIEluPC9hPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRpbGUgaXMtY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPScjJz5GUjwvYT4mbmJzcDt8Jm5ic3A7PGEgaHJlZj0nIyc+RU48L2E+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9oZWFkZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9IZWFkZXInKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcm9wczogWydtZW51cyddLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1Nob3duOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgcm91dGVzOiB0aGlzLiRyb3V0ZXIub3B0aW9ucy5yb3V0ZXMuZmlsdGVyKHIgPT4gci5wYXRoICE9PSAnLycpLFxuICAgICAgICAgICAgICAgIGNvbG9yczogWydyZWQnLCAnb3JhbmdlJywgJ3B1cnBsZScsICdicm93bicsICdncmVlbicsICdibHVlJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgYWN0aXZlX2lkeCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gXy5maW5kSW5kZXgodGhpcy4kcm91dGVyLm9wdGlvbnMucm91dGVzLCByID0+IHIucGF0aCAhPT0gJy8nICYmIHRoaXMuJHJvdXRlLnBhdGggPT09IHIucGF0aCkgLSAxO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KC0xLCBpbmRleCk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNob3coZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5pc1Nob3duID0gIXRoaXMuaXNTaG93bjtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1uYXYgaXMtZnVsbGhlaWdodFwiPlxuICAgIDxhc2lkZSBjbGFzcz1cIm1lbnVcIj5cbiAgICAgICAgPGRpdiB2LWZvcj1cIihzZWN0aW9uLCBpZHgpIGluIG1lbnVzXCI+XG4gICAgICAgICAgICA8cCA6Y2xhc3M9XCJgbWVudS1sYWJlbCBtZW51LWxhYmVsLSR7c3RhdGUuY29sb3JzW2lkeF19YFwiPlxuICAgICAgICAgICAgICAgIHt7c2VjdGlvblswXS5zZWN0aW9ufX0gXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8dWwgOmNsYXNzPVwiYG1lbnUtbGlzdCBtZW51LWxpc3QtJHtzdGF0ZS5jb2xvcnNbaWR4XX1gXCI+XG4gICAgICAgICAgICAgICAgPGxpIHYtZm9yPVwiaXRlbSBpbiBzZWN0aW9uXCI+PHJvdXRlci1saW5rIGV4YWN0IGFjdGl2ZS1jbGFzcz1cImlzLWFjdGl2ZVwiIDp0bz1cIml0ZW0ucm91dGVzWzBdXCI+e3tpdGVtLm5hbWV9fTwvcm91dGVyLWxpbms+PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYXNpZGU+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL05hdmJhcicpO1xuPC9zY3JpcHQ+XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbnsgbGFiZWw6ICdQcm9kdWN0aW9uJywgdmFsdWU6ICdwcm9kdWN0aW9uJyB9LFxueyBsYWJlbDogJ0RldmVsb3BtZW50JywgdmFsdWU6ICdkZXZlbG9wbWVudCcgfSxcbnsgbGFiZWw6ICdEZW1vbnN0cmF0aW9uJywgdmFsdWU6ICdkZW1vJyB9LFxueyBsYWJlbDogJ0xvY2FsaG9zdCcsIHZhbHVlOiAnbG9jYWwnIH0sXG5dO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBbeyBsYWJlbDogJ1RleHQnLCB2YWx1ZTogJ3RleHQnIH0sXG4gICAgeyBsYWJlbDogJ0VtYWlsJywgdmFsdWU6ICdlbWFpbCcgfSxcbiAgICB7IGxhYmVsOiAnUGFzc3dvcmQnLCB2YWx1ZTogJ3Bhc3N3b3JkJyB9LFxuICAgIHsgbGFiZWw6ICdQaG9uZScsIHZhbHVlOiAncGhvbmUnIH0sXG4gICAgeyBsYWJlbDogJ051bWJlcicsIHZhbHVlOiAnbnVtYmVyJyB9LFxuICAgIHsgbGFiZWw6ICdUZXh0YXJlYScsIHZhbHVlOiAndGV4dGFyZWEnIH0sXG4gICAgeyBsYWJlbDogJ0NoZWNrYm94JywgdmFsdWU6ICdjaGVja2JveCcgfSxcbiAgICB7IGxhYmVsOiAnUmFkaW8nLCB2YWx1ZTogJ3JhZGlvJyB9LFxuICAgIHsgbGFiZWw6ICdTdWJmb3JtJywgdmFsdWU6ICdzdWJmb3JtJyB9LFxuICAgIHsgbGFiZWw6ICdTZWxlY3QnLCB2YWx1ZTogJ3NlbGVjdCcgfV07XG4iLCJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmNvbnN0IExhbmdzID0ge1xuICAgIEFBOiAnQWZhcicsXG4gICAgQUI6ICdBYmtoYXppYW4nLFxuICAgIEFFOiAnQXZlc3RhbicsXG4gICAgQUY6ICdBZnJpa2FhbnMnLFxuICAgIEFLOiAnQWthbicsXG4gICAgQU06ICdBbWhhcmljJyxcbiAgICBBTjogJ0FyYWdvbmVzZScsXG4gICAgQVI6ICdBcmFiaWMnLFxuICAgIEFTOiAnQXNzYW1lc2UnLFxuICAgIEFWOiAnQXZhcmljJyxcbiAgICBBWTogJ0F5bWFyYScsXG4gICAgQVo6ICdBemVyYmFpamFuaScsXG4gICAgQkE6ICdCYXNoa2lyJyxcbiAgICBCRTogJ0JlbGFydXNpYW4nLFxuICAgIEJHOiAnQnVsZ2FyaWFuJyxcbiAgICBCSDogJ0JpaGFyaScsXG4gICAgQkk6ICdCaXNsYW1hJyxcbiAgICBCTTogJ0JhbWJhcmEnLFxuICAgIEJOOiAnQmVuZ2FsaScsXG4gICAgQk86ICdUaWJldGFuJyxcbiAgICBCUjogJ0JyZXRvbicsXG4gICAgQlM6ICdCb3NuaWFuJyxcbiAgICBDQTogJ0NhdGFsYW4nLFxuICAgIENFOiAnQ2hlY2hlbicsXG4gICAgQ0g6ICdDaGFtb3JybycsXG4gICAgQ086ICdDb3JzaWNhbicsXG4gICAgQ1I6ICdDcmVlJyxcbiAgICBDUzogJ0N6ZWNoJyxcbiAgICBDVTogJ09sZCBDaHVyY2ggU2xhdm9uaWMnLFxuICAgIENWOiAnQ2h1dmFzaCcsXG4gICAgQ1k6ICdXZWxzaCcsXG4gICAgREE6ICdEYW5pc2gnLFxuICAgIERFOiAnR2VybWFuJyxcbiAgICBEVjogJ0RpdmVoaScsXG4gICAgRFo6ICdEem9uZ2toYScsXG4gICAgRUU6ICdFd2UnLFxuICAgIEVMOiAnR3JlZWsnLFxuICAgIEVOOiAnRW5nbGlzaCcsXG4gICAgRU86ICdFc3BlcmFudG8nLFxuICAgIEVTOiAnU3BhbmlzaCcsXG4gICAgRVQ6ICdFc3RvbmlhbicsXG4gICAgRVU6ICdCYXNxdWUnLFxuICAgIEZBOiAnUGVyc2lhbicsXG4gICAgRkY6ICdGdWxhaCcsXG4gICAgRkk6ICdGaW5uaXNoJyxcbiAgICBGSjogJ0ZpamlhbicsXG4gICAgRk86ICdGYXJvZXNlJyxcbiAgICBGUjogJ0ZyZW5jaCcsXG4gICAgRlk6ICdXZXN0ZXJuIEZyaXNpYW4nLFxuICAgIEdBOiAnSXJpc2gnLFxuICAgIEdEOiAnU2NvdHRpc2ggR2FlbGljJyxcbiAgICBHTDogJ0dhbGljaWFuJyxcbiAgICBHTjogJ0d1YXJhbmknLFxuICAgIEdVOiAnR3VqYXJhdGknLFxuICAgIEdWOiAnTWFueCcsXG4gICAgSEE6ICdIYXVzYScsXG4gICAgSEU6ICdIZWJyZXcnLFxuICAgIEhJOiAnSGluZGknLFxuICAgIEhPOiAnSGlyaSBNb3R1JyxcbiAgICBIUjogJ0Nyb2F0aWFuJyxcbiAgICBIVDogJ0hhaXRpYW4nLFxuICAgIEhVOiAnSHVuZ2FyaWFuJyxcbiAgICBIWTogJ0FybWVuaWFuJyxcbiAgICBIWjogJ0hlcmVybycsXG4gICAgSUE6ICdJbnRlcmxpbmd1YScsXG4gICAgSUQ6ICdJbmRvbmVzaWFuJyxcbiAgICBJRTogJ0ludGVybGluZ3VlJyxcbiAgICBJRzogJ0lnYm8nLFxuICAgIElJOiAnU2ljaHVhbiBZaScsXG4gICAgSUs6ICdJbnVwaWFxJyxcbiAgICBJTzogJ0lkbycsXG4gICAgSVM6ICdJY2VsYW5kaWMnLFxuICAgIElUOiAnSXRhbGlhbicsXG4gICAgSVU6ICdJbnVrdGl0dXQnLFxuICAgIEpBOiAnSmFwYW5lc2UnLFxuICAgIEpWOiAnSmF2YW5lc2UnLFxuICAgIEtBOiAnR2VvcmdpYW4nLFxuICAgIEtHOiAnS29uZ28nLFxuICAgIEtJOiAnS2lrdXl1JyxcbiAgICBLSjogJ0t3YW55YW1hJyxcbiAgICBLSzogJ0themFraCcsXG4gICAgS0w6ICdLYWxhYWxsaXN1dCcsXG4gICAgS006ICdLaG1lcicsXG4gICAgS046ICdLYW5uYWRhJyxcbiAgICBLTzogJ0tvcmVhbicsXG4gICAgS1I6ICdLYW51cmknLFxuICAgIEtTOiAnS2FzaG1pcmknLFxuICAgIEtVOiAnS3VyZGlzaCcsXG4gICAgS1Y6ICdLb21pJyxcbiAgICBLVzogJ0Nvcm5pc2gnLFxuICAgIEtZOiAnS2lyZ2hpeicsXG4gICAgTEE6ICdMYXRpbicsXG4gICAgTEI6ICdMdXhlbWJvdXJnaXNoJyxcbiAgICBMRzogJ0dhbmRhJyxcbiAgICBMSTogJ0xpbWJ1cmdpc2gnLFxuICAgIExOOiAnTGluZ2FsYScsXG4gICAgTE86ICdMYW8nLFxuICAgIExUOiAnTGl0aHVhbmlhbicsXG4gICAgTFU6ICdMdWJhLUthdGFuZ2EnLFxuICAgIExWOiAnTGF0dmlhbicsXG4gICAgTUc6ICdNYWxhZ2FzeScsXG4gICAgTUg6ICdNYXJzaGFsbGVzZScsXG4gICAgTUk6ICdNxIFvcmknLFxuICAgIE1LOiAnTWFjZWRvbmlhbicsXG4gICAgTUw6ICdNYWxheWFsYW0nLFxuICAgIE1OOiAnTW9uZ29saWFuJyxcbiAgICBNTzogJ01vbGRhdmlhbicsXG4gICAgTVI6ICdNYXJhdGhpJyxcbiAgICBNUzogJ01hbGF5JyxcbiAgICBNVDogJ01hbHRlc2UnLFxuICAgIE1ZOiAnQnVybWVzZScsXG4gICAgTkE6ICdOYXVydScsXG4gICAgTkI6ICdOb3J3ZWdpYW4gQm9rbcOlbCcsXG4gICAgTkQ6ICdOb3J0aCBOZGViZWxlJyxcbiAgICBORTogJ05lcGFsaScsXG4gICAgTkc6ICdOZG9uZ2EnLFxuICAgIE5MOiAnRHV0Y2gnLFxuICAgIE5OOiAnTm9yd2VnaWFuIE55bm9yc2snLFxuICAgIE5POiAnTm9yd2VnaWFuJyxcbiAgICBOUjogJ1NvdXRoIE5kZWJlbGUnLFxuICAgIE5WOiAnTmF2YWpvJyxcbiAgICBOWTogJ0NoaWNoZXdhJyxcbiAgICBPQzogJ09jY2l0YW4nLFxuICAgIE9KOiAnT2ppYndhJyxcbiAgICBPTTogJ09yb21vJyxcbiAgICBPUjogJ09yaXlhJyxcbiAgICBPUzogJ09zc2V0aWFuJyxcbiAgICBQQTogJ1BhbmphYmknLFxuICAgIFBJOiAnUMSBbGknLFxuICAgIFBMOiAnUG9saXNoJyxcbiAgICBQUzogJ1Bhc2h0bycsXG4gICAgUFQ6ICdQb3J0dWd1ZXNlJyxcbiAgICBRVTogJ1F1ZWNodWEnLFxuICAgIFJDOiAnUmV1bmlvbmVzZScsXG4gICAgUk06ICdSb21hbnNoJyxcbiAgICBSTjogJ0tpcnVuZGknLFxuICAgIFJPOiAnUm9tYW5pYW4nLFxuICAgIFJVOiAnUnVzc2lhbicsXG4gICAgUlc6ICdLaW55YXJ3YW5kYScsXG4gICAgU0E6ICdTYW5za3JpdCcsXG4gICAgU0M6ICdTYXJkaW5pYW4nLFxuICAgIFNEOiAnU2luZGhpJyxcbiAgICBTRTogJ05vcnRoZXJuIFNhbWknLFxuICAgIFNHOiAnU2FuZ28nLFxuICAgIFNIOiAnU2VyYm8tQ3JvYXRpYW4nLFxuICAgIFNJOiAnU2luaGFsZXNlJyxcbiAgICBTSzogJ1Nsb3ZhaycsXG4gICAgU0w6ICdTbG92ZW5lJyxcbiAgICBTTTogJ1NhbW9hbicsXG4gICAgU046ICdTaG9uYScsXG4gICAgU086ICdTb21hbGknLFxuICAgIFNROiAnQWxiYW5pYW4nLFxuICAgIFNSOiAnU2VyYmlhbicsXG4gICAgU1M6ICdTd2F0aScsXG4gICAgU1Q6ICdTb3RobycsXG4gICAgU1U6ICdTdW5kYW5lc2UnLFxuICAgIFNWOiAnU3dlZGlzaCcsXG4gICAgU1c6ICdTd2FoaWxpJyxcbiAgICBUQTogJ1RhbWlsJyxcbiAgICBURTogJ1RlbHVndScsXG4gICAgVEc6ICdUYWppaycsXG4gICAgVEg6ICdUaGFpJyxcbiAgICBUSTogJ1RpZ3JpbnlhJyxcbiAgICBUSzogJ1R1cmttZW4nLFxuICAgIFRMOiAnVGFnYWxvZycsXG4gICAgVE46ICdUc3dhbmEnLFxuICAgIFRPOiAnVG9uZ2EnLFxuICAgIFRSOiAnVHVya2lzaCcsXG4gICAgVFM6ICdUc29uZ2EnLFxuICAgIFRUOiAnVGF0YXInLFxuICAgIFRXOiAnVHdpJyxcbiAgICBUWTogJ1RhaGl0aWFuJyxcbiAgICBVRzogJ1VpZ2h1cicsXG4gICAgVUs6ICdVa3JhaW5pYW4nLFxuICAgIFVSOiAnVXJkdScsXG4gICAgVVo6ICdVemJlaycsXG4gICAgVkU6ICdWZW5kYScsXG4gICAgVkk6ICdWacOqdCBOYW1lc2UnLFxuICAgIFZPOiAnVm9sYXDDvGsnLFxuICAgIFdBOiAnV2FsbG9vbicsXG4gICAgV086ICdXb2xvZicsXG4gICAgWEg6ICdYaG9zYScsXG4gICAgWUk6ICdZaWRkaXNoJyxcbiAgICBZTzogJ1lvcnViYScsXG4gICAgWkE6ICdaaHVhbmcnLFxuICAgIFpIOiAnQ2hpbmVzZScsXG4gICAgWlU6ICdadWx1Jyxcbn07XG5cbmNvbnN0IExhbmdzTGlzdCA9IF8ubWFwKExhbmdzLCAobGFiZWwsIHZhbHVlKSA9PiAoeyBsYWJlbCwgdmFsdWUgfSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBMYW5ncyxcbiAgICBMYW5nc0xpc3QsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBbeyBsYWJlbDogJ1plcm8nLCB2YWx1ZTogJzAnIH0sXG4gICAgeyBsYWJlbDogJ09uZScsIHZhbHVlOiAnMScgfSxcbiAgICB7IGxhYmVsOiAnVHdvJywgdmFsdWU6ICcyJyB9LFxuICAgIHsgbGFiZWw6ICdGZXcnLCB2YWx1ZTogJ2ZldycgfSxcbiAgICB7IGxhYmVsOiAnTWFueScsIHZhbHVlOiAnbWFueScgfSxcbiAgICB7IGxhYmVsOiAnT3RoZXInLCB2YWx1ZTogJ290aGVyJyB9LFxuICAgIHsgbGFiZWw6ICdOL0EnLCB2YWx1ZTogJ24vYScgfV07XG4iLCJjb25zdCBWdWUgPSByZXF1aXJlKCd2dWUnKTtcbmNvbnN0IHJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG5jb25zdCBzdG9yZSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9zdG9yZScpO1xuXG5jb25zdCBMb2FkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9hZGVyL0xvYWRlci52dWUnKTtcbmNvbnN0IElucHV0ID0gcmVxdWlyZSgnLi4vY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9lbGVtZW50cy9pbnB1dC9JbnB1dC52dWUnKTtcbmNvbnN0IFNlbGVjdCA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jb21wb25lbnRzL2luZWQvZm9ybXMvZWxlbWVudHMvc2VsZWN0L1NlbGVjdC52dWUnKTtcbmNvbnN0IFZhcmlhZGljRWxlbWVudCA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jb21wb25lbnRzL2luZWQvZm9ybXMvZWxlbWVudHMvdmFyaWFkaWNfZWxlbWVudC9WYXJpYWRpY0VsZW1lbnQudnVlJyk7XG5jb25zdCBGb3JtID0gcmVxdWlyZSgnLi4vY29tbW9uL2NvbXBvbmVudHMvaW5lZC9mb3Jtcy9mb3JtL0Zvcm0udnVlJyk7XG5jb25zdCBEeW5hbWljRm9ybSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jb21wb25lbnRzL2luZWQvZm9ybXMvZHluYW1pY19mb3JtL0R5bmFtaWNGb3JtLnZ1ZScpO1xuY29uc3QgUGFnaW5hdG9yID0gcmVxdWlyZSgnLi4vY29tbW9uL2NvbXBvbmVudHMvaW5lZC9wYWdpbmF0b3IvUGFnaW5hdG9yLnZ1ZScpO1xuY29uc3QgVGFiYmVyID0gcmVxdWlyZSgnLi4vY29tbW9uL2NvbXBvbmVudHMvaW5lZC90YWJiZXIvVGFiYmVyLnZ1ZScpO1xuXG5jb25zdCBBY3Rpb25CdXR0b24gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvY29tcG9uZW50cy9hY3Rpb25fYnV0dG9uL0FjdGlvbkJ1dHRvbi52dWUnKTtcbmNvbnN0IFdpZGdldCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL3dpZGdldC9XaWRnZXQudnVlJyk7XG5cbmNvbnN0IEFwcCA9IHJlcXVpcmUoJy4vcGFnZXMvQXBwLnZ1ZScpO1xuXG5WdWUuY29tcG9uZW50KCdsb2FkZXInLCBMb2FkZXIpO1xuVnVlLmNvbXBvbmVudCgnZmZvcm0nLCBGb3JtKTtcblZ1ZS5jb21wb25lbnQoJ2ZpbnB1dCcsIElucHV0KTtcblZ1ZS5jb21wb25lbnQoJ2ZzZWxlY3QnLCBTZWxlY3QpO1xuVnVlLmNvbXBvbmVudCgnZnZhcmlhZGljLWVsZW1lbnQnLCBWYXJpYWRpY0VsZW1lbnQpO1xuVnVlLmNvbXBvbmVudCgnYWN0aW9uLWJ1dHRvbicsIEFjdGlvbkJ1dHRvbik7XG5WdWUuY29tcG9uZW50KCd3aWRnZXQnLCBXaWRnZXQpO1xuVnVlLmNvbXBvbmVudCgncGFnaW5hdG9yJywgUGFnaW5hdG9yKTtcblZ1ZS5jb21wb25lbnQoJ3RhYmJlcicsIFRhYmJlcik7XG5WdWUuY29tcG9uZW50KCdkeW5hbWljLWZvcm0nLCBEeW5hbWljRm9ybSk7XG5cbm5ldyBWdWUoe1xuICAgIGVsOiAnI2FwcCcsXG4gICAgc3RvcmUsXG4gICAgcm91dGVyLFxuICAgIHJlbmRlcjogaCA9PiBoKEFwcCksXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG5jb25zdCBSb3V0ZXMgPSByZXF1aXJlKCcuL3JvdXRlcycpO1xuY29uc3QgSG9tZSA9IHJlcXVpcmUoJy4vcGFnZXMvaG9tZS9Ib21lLnZ1ZScpO1xuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4vcGFnZXMvdXNlci9Vc2VyLnZ1ZScpO1xuY29uc3QgQ29uZmlnID0gcmVxdWlyZSgnLi9wYWdlcy9jb25maWcvQ29uZmlnLnZ1ZScpO1xuY29uc3QgTGFuZyA9IHJlcXVpcmUoJy4vcGFnZXMvbGFuZy9MYW5nLnZ1ZScpO1xuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4vcGFnZXMvZm9ybS9Gb3JtLnZ1ZScpO1xuY29uc3QgRGF0YXNvdXJjZSA9IHJlcXVpcmUoJy4vcGFnZXMvZGF0YXNvdXJjZS9EYXRhc291cmNlLnZ1ZScpO1xuY29uc3QgRGF0YWluc3RhbmNlID0gcmVxdWlyZSgnLi9wYWdlcy9kYXRhaW5zdGFuY2UvRGF0YWluc3RhbmNlLnZ1ZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzLm1lbnUgPSBbXG4gICAgW1xuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnR2VuZXJhbCcsXG4gICAgICAgICAgICBuYW1lOiAnT3ZlcnZpZXcnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2FkbWluJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5hZG1pbl0sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSG9tZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0dlbmVyYWwnLFxuICAgICAgICAgICAgbmFtZTogJ1VzZXJzJyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICd1c2VyJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy51c2VyXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnR2VuZXJhbCcsXG4gICAgICAgICAgICBuYW1lOiAnUmV2aWV3cycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAncmV2aWV3JyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5yZXZpZXddLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IEhvbWUsXG4gICAgICAgIH0sXG4gICAgXSxcblxuICAgIFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkbWluaXN0cmF0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6ICdEYXRhIHNvdXJjZXMnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2RhdGFzb3VyY2UnLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmRhdGFzb3VyY2VdLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IERhdGFzb3VyY2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZG1pbmlzdHJhdGlvbicsXG4gICAgICAgICAgICBuYW1lOiAnUHVibGljYXRpb25zJyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdwdWJsaWNhdGlvbicsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMucHVibGljYXRpb25dLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IEhvbWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZG1pbmlzdHJhdGlvbicsXG4gICAgICAgICAgICBuYW1lOiAnQ1NMIE1hbmFnZW1lbnQnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2NzbCcsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuY3NsXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBIb21lLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWRtaW5pc3RyYXRpb24nLFxuICAgICAgICAgICAgbmFtZTogJ0Zvcm1zJyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdmb3JtJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5mb3JtXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBGb3JtLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWRtaW5pc3RyYXRpb24nLFxuICAgICAgICAgICAgbmFtZTogJ0xhbmdzJyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdsYW5nJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5sYW5nXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBMYW5nLFxuICAgICAgICB9LFxuICAgIF0sXG5cbiAgICBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZHZhbmNlZCcsXG4gICAgICAgICAgICBuYW1lOiAnRXh0ZXJuYWwgcmVwb3NpdG9yaWVzJyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdleHRlcm5hbC1yZXBvJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5leHRlcm5hbF9yZXBvXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBIb21lLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWR2YW5jZWQnLFxuICAgICAgICAgICAgbmFtZTogJ0V4cG9ydCBmb3JtYXRzJyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdleHBvcnQtZm9ybWF0JyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5leHBvcnRfZm9ybWF0XSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBIb21lLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWR2YW5jZWQnLFxuICAgICAgICAgICAgbmFtZTogJ0hhbmRsZSBJRCBNYW5hZ2VtZW50JyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdoYW5kbGVpZCcsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuaGFuZGxlX2lkXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBIb21lLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWR2YW5jZWQnLFxuICAgICAgICAgICAgbmFtZTogJ0FQSSBNYW5hZ2VtZW50JyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdhcGknLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmFwaV0sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSG9tZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkdmFuY2VkJyxcbiAgICAgICAgICAgIG5hbWU6ICdDb25maWcnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ2NvbmZpZycsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuY29uZmlnXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBDb25maWcsXG4gICAgICAgIH0sXG4gICAgXSxcbl07XG5cbm1vZHVsZS5leHBvcnRzLm90aGVyID0gW1xuICAgIHtcbiAgICAgICAga2V5OiAnZGF0YXNvdXJjZV90eXBvbG9neScsXG4gICAgICAgIHJvdXRlczogW1JvdXRlcy5kYXRhaW5zdGFuY2VdLFxuICAgICAgICBjb21wb25lbnQ6IERhdGFpbnN0YW5jZSxcbiAgICB9LFxuXTtcbiIsImNvbnN0IFZ1ZSA9IHJlcXVpcmUoJ3Z1ZScpO1xuY29uc3QgTWVzc2FnZXMgPSByZXF1aXJlKCcuLi8uLi9jb21tb24vYXBpL21lc3NhZ2VzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi9jb21tb24vYXBpL3JvdXRlcycpO1xuXG5jb25zdCBFTlYgPSBcImRldmVsb3BtZW50XCIgfHwgJ2xvY2FsJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmFtZTogJ0FwcCcsXG4gICAgYmVmb3JlTW91bnQoKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZ19wYXRoID0gQVBJUm91dGVzLmVudGl0eSgnY29uZmlnJywgJ1BPU1QnLCB0cnVlKTtcbiAgICAgICAgY29uc29sZS5sb2coRU5WKTtcbiAgICAgICAgY29uc3QgY29uZmlnX2JvZHkgPSB7XG4gICAgICAgICAgICBzaXplOiAxLFxuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBlbnZpcm9ubWVudDogRU5WLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsYW5nX3BhdGggPSBBUElSb3V0ZXMuZW50aXR5KCdsYW5nJywgJ1BPU1QnLCB0cnVlKTtcbiAgICAgICAgY29uc3QgbGFuZ19ib2R5ID0ge1xuICAgICAgICAgICAgc2l6ZTogMTAwMDAsXG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICRhbmQ6IFt7IHBhcnQ6ICdiYWNrb2ZmaWNlJyB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcHJvbWlzZV9jb25maWcgPSB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZ3JhYl9jb25maWcnLCB7XG4gICAgICAgICAgICBwYXRoOiBjb25maWdfcGF0aCxcbiAgICAgICAgICAgIGJvZHk6IGNvbmZpZ19ib2R5LFxuICAgICAgICB9KTtcblxuICAgICAgICBwcm9taXNlX2NvbmZpZy50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuJHN0b3JlLnN0YXRlLmdsb2JhbF9jb25maWc7XG4gICAgICAgICAgICBpZiAoISgnbGFuZ3MnIGluIGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGVmYXVsdF9sYW5nID0gY29uZmlnLmxhbmdzLmZpbmQoXG4gICAgICAgICAgICAgICAgdiA9PiB2LnZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuJHN0b3JlLnN0YXRlLmJyb3dzZXJMYW5ndWFnZSk7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdF9sYW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0X2xhbmcgPSBjb25maWcubGFuZ3NbMF0udmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRfbGFuZyA9IGRlZmF1bHRfbGFuZy52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGFuZ19ib2R5LndoZXJlLiRhbmQucHVzaCh7IGxhbmc6IGRlZmF1bHRfbGFuZyB9KTtcbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLnN0YXRlLmludGVyZmFjZUxhbmcgPSBkZWZhdWx0X2xhbmc7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZ3JhYl9sYW5ndWFnZScsIHtcbiAgICAgICAgICAgICAgICBwYXRoOiBsYW5nX3BhdGgsXG4gICAgICAgICAgICAgICAgYm9keTogbGFuZ19ib2R5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHsgY29uc29sZS5sb2coZXJyKTsgfSk7XG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48bG9hZGVyIGlkPVwiYXBwXCIgdi1pZj1cIk9iamVjdC5rZXlzKCRzdG9yZS5zdGF0ZS5sYW5nX2NvbnRlbnQpLmxlbmd0aCA9PT0gMFwiPjwvbG9hZGVyPlxuPGRpdiB2LWVsc2UgaWQ9XCJhcHBcIiBjbGFzcz1cImhvbHktZ3JhaWxcIj5cbiAgICA8cm91dGVyLXZpZXcgbmFtZT1cImhlYWRlclwiPjwvcm91dGVyLXZpZXc+XG4gICAgPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtYm9keVwiPlxuICAgICAgICA8cm91dGVyLXZpZXc+PC9yb3V0ZXItdmlldz5cbiAgICAgICAgPHJvdXRlci12aWV3IG5hbWU9XCJuYXZiYXJcIj48L3JvdXRlci12aWV3PlxuICAgIDwvZGl2PlxuICAgIDxyb3V0ZXItdmlldyBuYW1lPVwiZm9vdGVyXCI+PC9yb3V0ZXItdmlldz5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9BcHAnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IEFQSVJvdXRlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9hcGkvcm91dGVzJyk7XG5jb25zdCBSZWFkZXJNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9SZWFkZXJNaXhpbicpO1xuY29uc3QgTGFuZ01peGluID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL21peGlucy9MYW5nTWl4aW4nKTtcbmNvbnN0IEVudmlyb25tZW50cyA9IHJlcXVpcmUoJy4uLy4uL2xpc3RzL2Vudmlyb25tZW50cycpO1xuY29uc3QgTGFuZ3MgPSByZXF1aXJlKCcuLi8uLi9saXN0cy9sYW5ncycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtSZWFkZXJNaXhpbiwgTGFuZ01peGluXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdjb25maWcnLCAnUE9TVCcpLFxuICAgICAgICAgICAgICAgIHJwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdjb25maWcnLCAnR0VUJyksXG4gICAgICAgICAgICAgICAgY2Zvcm06ICdjb25maWdfY3JlYXRpb24nLFxuICAgICAgICAgICAgICAgIHJmb3JtOiAnY29uZmlnX3JlYWQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogMTAsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJSb3c6IDIsXG4gICAgICAgICAgICAgICAgbGFuZ3M6IExhbmdzLkxhbmdzTGlzdCxcbiAgICAgICAgICAgICAgICBlbnZpcm9ubWVudHM6IEVudmlyb25tZW50cyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2luZ2xlX3JlYWQnLCB7XG4gICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLnJmb3JtLFxuICAgICAgICAgICAgcGF0aDogdGhpcy5zdGF0ZS5ycGF0aCxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICByZWFkQ29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy50b19tYXRyaXgoZm9ybS5jb250ZW50IGluc3RhbmNlb2YgQXJyYXkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jb250ZW50IDogW10sIHRoaXMuc3RhdGUuaXRlbXNQZXJSb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50TGVuZ3RoKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5yZm9ybV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uY29udGVudC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJob2x5LWdyYWlsLWNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGlzLWZsdWlkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+R2xvYmFsIGNvbmZpZ3VyYXRpb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCIgdi1mb3I9XCJyb3cgaW4gcmVhZENvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCIgdi1mb3I9XCJjb250ZW50IGluIHJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1ibHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwidXBkYXRlKGNvbnRlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wZW5jaWxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y29uZmlybWF0aW9uPVwibGFuZygnYl9zdXJlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0d28tc3RlcHM9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwicmVtb3ZlKGNvbnRlbnQsICdjb25maWcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7Y29udGVudC5lbnZpcm9ubWVudH19IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+QWRkIG9yIG1vZGlmeSB0aGUgZ2xvYmFsIGNvbmZpZ3VyYXRpb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmZm9ybSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnBvc3RfcGF0aD1cInN0YXRlLnBhdGhcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cHV0X3BhdGg9XCJzdGF0ZS5wYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X3BhdGg9XCJzdGF0ZS5ycGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9mb3JtPVwic3RhdGUucmZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZW52aXJvbm1lbnRcIiA6bGFiZWw9XCJsYW5nKCdiX2Vudmlyb25tZW50JylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwic3RhdGUuZW52aXJvbm1lbnRzXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZnNlbGVjdCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJsYW5nc1wiIDpsYWJlbD1cImxhbmcoJ2JfbGFuZycse30sICdvdGhlcicpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppcy1yZXF1aXJlZD1cInRydWVcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bXVsdGk9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0ZS5sYW5nc1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zmb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Db25maWcnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IEFQSVJvdXRlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9hcGkvcm91dGVzJyk7XG5jb25zdCBSZWFkZXJNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9SZWFkZXJNaXhpbicpO1xuY29uc3QgTGFuZ01peGluID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL21peGlucy9MYW5nTWl4aW4nKTtcbmNvbnN0IEZvcm1NaXhpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9taXhpbnMvRm9ybU1peGluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW1JlYWRlck1peGluLCBMYW5nTWl4aW4sIEZvcm1NaXhpbl0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eSh0aGlzLiRyb3V0ZS5wYXJhbXMuZGF0YWluc3RhbmNlLCAnUE9TVCcpLFxuICAgICAgICAgICAgICAgIHJwYXRoOiBBUElSb3V0ZXMuZW50aXR5KHRoaXMuJHJvdXRlLnBhcmFtcy5kYXRhaW5zdGFuY2UsICdHRVQnKSxcbiAgICAgICAgICAgICAgICBjZm9ybTogYCR7dGhpcy4kcm91dGUucGFyYW1zLmRhdGFpbnN0YW5jZX1fY3JlYXRpb25gLFxuICAgICAgICAgICAgICAgIHJmb3JtOiBgJHt0aGlzLiRyb3V0ZS5wYXJhbXMuZGF0YWluc3RhbmNlfV9yZWFkYCxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclBhZ2U6IDIwLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUm93OiAyLFxuICAgICAgICAgICAgICAgIGZvcm1zOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke3RoaXMuJHJvdXRlLnBhcmFtcy5kYXRhaW5zdGFuY2V9X2Zvcm1gLFxuICAgICAgICAgICAgICAgICAgICBncm91cDogJ3R5cG9sb2d5JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzaW5nbGVfcmVhZCcsIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICBwYXRoOiB0aGlzLnN0YXRlLnJwYXRoLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGNvbnRlbnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gZm9ybS5jb250ZW50IHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50Lm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjLmxhYmVsID0gdGhpcy5sYW5nKGMubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZENvbnRlbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMudG9fbWF0cml4KHRoaXMuY29udGVudCwgdGhpcy5zdGF0ZS5pdGVtc1BlclJvdyk7XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1jb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBpcy1mbHVpZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+e3tsYW5nKCdiX2xpc3RfZGF0YWluc3RhbmNlcycpfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCIgdi1mb3I9XCJyb3cgaW4gcmVhZENvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiY29udGVudCBpbiByb3dcIiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1ibHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwidXBkYXRlKGNvbnRlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wZW5jaWxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y29uZmlybWF0aW9uPVwibGFuZygnYl9hcmVfc3VyZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHdvLXN0ZXBzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInJlbW92ZShjb250ZW50LCAnZGF0YWluc3RhbmNlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWN0aW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYWdpbmF0b3IgY2xhc3M9XCJwYWdpbmF0aW9uLXB1cnBsZVwiIDpza2lwPVwiMFwiIDpudW1iZXItb2YtaXRlbXM9XCJjb250ZW50TGVuZ3RoXCIgOml0ZW1zLXBlci1wYWdlPVwic3RhdGUuaXRlbXNQZXJQYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPnt7bGFuZygnYl9hZGRfZGF0YWluc3RhbmNlJyl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZmb3JtIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cG9zdF9wYXRoPVwic3RhdGUucGF0aFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwdXRfcGF0aD1cInN0YXRlLnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfcGF0aD1cInN0YXRlLnJwYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X2Zvcm09XCJzdGF0ZS5yZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkeW5hbWljLWZvcm0gOmZvcm09XCJmb3Jtc1tgJHskcm91dGUucGFyYW1zLmRhdGFpbnN0YW5jZX1fZm9ybWBdIHx8IHt9XCIgOmNmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0RhdGFpbnN0YW5jZScpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IFJlYWRlck1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL1JlYWRlck1peGluJyk7XG5jb25zdCBMYW5nTWl4aW4gPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vbWl4aW5zL0xhbmdNaXhpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtSZWFkZXJNaXhpbiwgTGFuZ01peGluXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdkYXRhdGVtcGxhdGUnLCAnUE9TVCcpLFxuICAgICAgICAgICAgICAgIHJwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdkYXRhdGVtcGxhdGUnLCAnR0VUJyksXG4gICAgICAgICAgICAgICAgY2Zvcm06ICdkYXRhdGVtcGxhdGVfY3JlYXRpb24nLFxuICAgICAgICAgICAgICAgIHJmb3JtOiAnZGF0YXRlbXBsYXRlX3JlYWQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogMjAsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJSb3c6IDIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3NpbmdsZV9yZWFkJywge1xuICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5yZm9ybSxcbiAgICAgICAgICAgIHBhdGg6IHRoaXMuc3RhdGUucnBhdGgsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2VhcmNoJywge1xuICAgICAgICAgICAgZm9ybTogJ2Zvcm1fcmVhZCcsXG4gICAgICAgICAgICBwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdmb3JtJywgJ1BPU1QnLCB0cnVlKSxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0aW9uOiBbJ2xhYmVsJywgJ25hbWUnXSxcbiAgICAgICAgICAgICAgICBzaXplOiAxMDAwMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgY29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmb3JtLmNvbnRlbnQgfHwgW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQubWFwKChjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGMubGFiZWwgPSB0aGlzLmxhbmcoYy5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICByZWFkQ29udGVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy50b19tYXRyaXgodGhpcy5jb250ZW50LCB0aGlzLnN0YXRlLml0ZW1zUGVyUm93KTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybXMoKSB7XG4gICAgICAgICAgICBpZiAoJ2Zvcm1fcmVhZCcgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMuZm9ybV9yZWFkLmNvbnRlbnQubWFwKChjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGMubGFiZWwgPSB0aGlzLmxhbmcoYy5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPnt7bGFuZygnYl9saXN0X2RhdGFzb3VyY2VzJyl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWZvcj1cInJvdyBpbiByZWFkQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJjb250ZW50IGluIHJvd1wiIGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJ1cGRhdGUoY29udGVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1yZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjb25maXJtYXRpb249XCJsYW5nKCdiX2FyZV9zdXJlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0d28tc3RlcHM9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwicmVtb3ZlKGNvbnRlbnQsICdkYXRhdGVtcGxhdGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLWdyZWVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dG89XCJgL2FkbWluL2RhdGFzb3VyY2UvJHtjb250ZW50Lm5hbWV9YFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZXllXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tjb250ZW50LmxhYmVsfX0gKHt7Y29udGVudC5uYW1lfX0pIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhZ2luYXRvciBjbGFzcz1cInBhZ2luYXRpb24tcHVycGxlXCIgOnNraXA9XCIwXCIgOm51bWJlci1vZi1pdGVtcz1cImNvbnRlbnRMZW5ndGhcIiA6aXRlbXMtcGVyLXBhZ2U9XCJzdGF0ZS5pdGVtc1BlclBhZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+e3tsYW5nKCdiX2FkZF9kYXRhc291cmNlJyl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZmb3JtIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cG9zdF9wYXRoPVwic3RhdGUucGF0aFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwdXRfcGF0aD1cInN0YXRlLnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfcGF0aD1cInN0YXRlLnJwYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X2Zvcm09XCJzdGF0ZS5yZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgbmFtZT1cIm5hbWVcIiA6bGFiZWw9XCJsYW5nKCdiX25hbWUnKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX25hbWUnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCBuYW1lPVwibGFiZWxcIiA6bGFiZWw9XCJsYW5nKCdiX2xhYmVsJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9sYWJlbCcpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IG5hbWU9XCJ0eXBlXCIgOmxhYmVsPVwibGFuZygnYl90eXBlJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl90eXBlJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XCJsYW5nKCdiX2Zvcm0nKVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwiZm9ybXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRMYWJlbD1cImxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkVmFsdWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zmb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vRGF0YXNvdXJjZScpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IFJlYWRlck1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL1JlYWRlck1peGluJyk7XG5jb25zdCBMYW5nTWl4aW4gPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vbWl4aW5zL0xhbmdNaXhpbicpO1xuY29uc3QgRmllbGRUeXBlcyA9IHJlcXVpcmUoJy4uLy4uL2xpc3RzL2ZpZWxkdHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbUmVhZGVyTWl4aW4sIExhbmdNaXhpbl0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eSgnZm9ybScsICdQT1NUJyksXG4gICAgICAgICAgICAgICAgcnBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2Zvcm0nLCAnR0VUJyksXG4gICAgICAgICAgICAgICAgY2Zvcm06ICdmb3JtX2NyZWF0aW9uJyxcbiAgICAgICAgICAgICAgICByZm9ybTogJ2Zvcm1fcmVhZCcsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiAyMCxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclJvdzogMixcbiAgICAgICAgICAgICAgICBzZWxlY3RlZF90eXBlczoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICB0eXBlX2NoYW5nZSh2YWwsIGlkeCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkeCBpbiB0aGlzLnN0YXRlLnNlbGVjdGVkX3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0YXRlLnNlbGVjdGVkX3R5cGVzW2lkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzZXQodGhpcy5zdGF0ZS5zZWxlY3RlZF90eXBlcywgaWR4LCB2YWwudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3NpbmdsZV9yZWFkJywge1xuICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5yZm9ybSxcbiAgICAgICAgICAgIHBhdGg6IHRoaXMuc3RhdGUucnBhdGgsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2VhcmNoJywge1xuICAgICAgICAgICAgZm9ybTogJ2RhdGF0ZW1wbGF0ZV9yZWFkJyxcbiAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2RhdGF0ZW1wbGF0ZScsICdQT1NUJywgdHJ1ZSksXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcHJvamVjdGlvbjogWydsYWJlbCcsICduYW1lJ10sXG4gICAgICAgICAgICAgICAgc2l6ZTogMTAwMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGNvbnRlbnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gZm9ybS5jb250ZW50IHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50Lm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjLmxhYmVsID0gdGhpcy5sYW5nKGMubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICBjLmRlc2NyaXB0aW9uID0gdGhpcy5sYW5nKGMuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZENvbnRlbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMudG9fbWF0cml4KHRoaXMuY29udGVudCwgdGhpcy5zdGF0ZS5pdGVtc1BlclJvdyk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpZWxkdHlwZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gRmllbGRUeXBlcy5tYXAoZnQgPT4gKHsgdmFsdWU6IGZ0LnZhbHVlLCBsYWJlbDogdGhpcy5sYW5nKGZ0LmxhYmVsKSB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFzb3VyY2VzKCkge1xuICAgICAgICAgICAgaWYgKCdkYXRhdGVtcGxhdGVfcmVhZCcgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMuZGF0YXRlbXBsYXRlX3JlYWQuY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJob2x5LWdyYWlsLWNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGlzLWZsdWlkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+TGlzdCBvZiB1c2Vyczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWZvcj1cInJvdyBpbiByZWFkQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJjb250ZW50IGluIHJvd1wiIGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJ1cGRhdGUoY29udGVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1yZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1hdGlvbj1cIkFyZSB5b3Ugc3VyZT9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0d28tc3RlcHM9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwicmVtb3ZlKGNvbnRlbnQsICdvcmdhbml6YXRpb24nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7Y29udGVudC5sYWJlbH19ICh7e2NvbnRlbnQubmFtZX19KSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYWdpbmF0b3IgY2xhc3M9XCJwYWdpbmF0aW9uLXB1cnBsZVwiIDpza2lwPVwiMFwiIDpudW1iZXItb2YtaXRlbXM9XCJjb250ZW50TGVuZ3RoXCIgOml0ZW1zLXBlci1wYWdlPVwic3RhdGUuaXRlbXNQZXJQYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5BZGQgb3IgbW9kaWZ5IGEgdXNlcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZmb3JtIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cG9zdF9wYXRoPVwic3RhdGUucGF0aFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwdXRfcGF0aD1cInN0YXRlLnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfcGF0aD1cInN0YXRlLnJwYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X2Zvcm09XCJzdGF0ZS5yZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgbmFtZT1cIm5hbWVcIiA6bGFiZWw9XCJsYW5nKCdiX2Zvcm1fbmFtZScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfZm9ybV9uYW1lJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgbmFtZT1cImxhYmVsXCIgOmxhYmVsPVwibGFuZygnYl9sYWJlbCcpXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9sYWJlbCcpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IG5hbWU9XCJncm91cFwiIDpsYWJlbD1cImxhbmcoJ2JfZ3JvdXAnKVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfZ3JvdXAnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCByb3dzPVwiNVwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIDpsYWJlbD1cImxhbmcoJ2JfZm9ybV9kZXNjcmlwdGlvbicpXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9mb3JtX2Rlc2NyaXB0aW9uX3BsYWNlaG9sZGVyJylcIiB0eXBlPVwidGV4dGFyZWFcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFiYmVyIDp0YWJzPVwiW2xhbmcoJ2JfZmllbGRzJywge30sICdvdGhlcicpLCBsYW5nKCdiX2Zvcm1fdmFsaWRhdGlvbicsIHt9LCAnb3RoZXInKV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJ0YWJzXCIgc2xvdC1zY29wZT1cInRwcm9wc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZ2YXJpYWRpYy1lbGVtZW50IG5hbWU9XCJmaWVsZHNcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgOnRhYnM9XCJ0cnVlXCIgdi1pZj1cInRwcm9wcy5pZCA9PT0gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwidmFyaWFkaWNcIiBzbG90LXNjb3BlPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS5uYW1lYFwiIDpsYWJlbD1cImxhbmcoJ2JfbmFtZScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfbmFtZScpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS5sYWJlbGBcIiA6bGFiZWw9XCJsYW5nKCdiX2xhYmVsJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9sYWJlbCcpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS5vcmRlcmBcIiA6bGFiZWw9XCJsYW5nKCdiX2ZpZWxkX29yZGVyJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9maWVsZF9vcmRlcicpXCIgdHlwZT1cIm51bWJlclwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9Lm11bHRpcGxlYFwiIDpsYWJlbD1cImxhbmcoJ2JfZmllbGRfbXVsdGlwbGUnKVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfZmllbGRfbXVsdGlwbGUnKVwiIHR5cGU9XCJjaGVja2JveFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9Lm11bHRpcGxlX25hbWVgXCIgOmxhYmVsPVwibGFuZygnYl9maWVsZF9tdWx0aXBsZV9uYW1lJylcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX2ZpZWxkX211bHRpcGxlX25hbWUnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0udHlwZWBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImxhbmcoJ2JfZmllbGRfdHlwZScpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cImZpZWxkdHlwZXNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtb246c2VsZWN0LWNoYW5nZT1cIih2YWwpID0+IHt0eXBlX2NoYW5nZSh2YWwsIHByb3BzLmlkKX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJwcm9wcy5pZCBpbiBzdGF0ZS5zZWxlY3RlZF90eXBlc1wiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cInN0YXRlLnNlbGVjdGVkX3R5cGVzW3Byb3BzLmlkXSA9PT0gJ3NlbGVjdCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZnNlbGVjdCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS5kYXRhc291cmNlLm5hbWVgXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwibGFuZygnYl9kYXRhc291cmNlX25hbWUnKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwidGhpcy5kYXRhc291cmNlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkTGFiZWw9XCJsYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkVmFsdWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWVsc2UtaWY9XCJbJ3RleHQnLCAncGhvbmUnLCAnbnVtYmVyJywgJ2VtYWlsJywgJ3Bhc3N3b3JkJ10uaW5kZXhPZihzdGF0ZS5zZWxlY3RlZF90eXBlc1twcm9wcy5pZF0pICE9PSAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0ucGxhY2Vob2xkZXJgXCIgOmxhYmVsPVwibGFuZygnYl9wbGFjZWhvbGRlcicpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfcGxhY2Vob2xkZXInKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1lbHNlLWlmPVwiWydzdWJmb3JtJ10uaW5kZXhPZihzdGF0ZS5zZWxlY3RlZF90eXBlc1twcm9wcy5pZF0pICE9PSAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9LnN1YmZvcm1gXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwibGFuZygnYl9zdWJmb3JtJylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkTGFiZWw9XCJsYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Z2YXJpYWRpYy1lbGVtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwidHByb3BzLmlkID09PSAxXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInZhbGlkYXRpb25zLnJlcXVpcmVkXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94JyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwibGFuZygnYl9mb3JtX3JlcXVpcmVkJylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJzdGF0ZS5jZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFiYmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vRm9ybScpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IFJlYWRlck1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL1JlYWRlck1peGluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW1JlYWRlck1peGluXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJob2x5LWdyYWlsLWNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGlzLWZsdWlkXCI+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vSG9tZScpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IFJlYWRlck1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL1JlYWRlck1peGluJyk7XG5jb25zdCBMYW5nTWl4aW4gPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vbWl4aW5zL0xhbmdNaXhpbicpO1xuY29uc3QgTGFuZ3MgPSByZXF1aXJlKCcuLi8uLi9saXN0cy9sYW5ncycpO1xuY29uc3QgUXVhbnRpdGllcyA9IHJlcXVpcmUoJy4uLy4uL2xpc3RzL3F1YW50aXRpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbUmVhZGVyTWl4aW4sIExhbmdNaXhpbl0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eSgnbGFuZycsICdQT1NUJyksXG4gICAgICAgICAgICAgICAgcnBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2xhbmcnLCAnR0VUJyksXG4gICAgICAgICAgICAgICAgY2Zvcm06ICdsYW5nX2NyZWF0aW9uJyxcbiAgICAgICAgICAgICAgICByZm9ybTogJ2xhbmdfcmVhZCcsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiA1MCxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclJvdzogMyxcbiAgICAgICAgICAgICAgICBsYW5nczogTGFuZ3MuTGFuZ3NMaXN0LFxuICAgICAgICAgICAgICAgIHF1YW50aXRpZXM6IFF1YW50aXRpZXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3NpbmdsZV9yZWFkJywge1xuICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5yZm9ybSxcbiAgICAgICAgICAgIHBhdGg6IHRoaXMuc3RhdGUucnBhdGgsXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgcmVhZENvbnRlbnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0aXRpb25zID0gZm9ybS5jb250ZW50LnJlZHVjZSgob2JqLCBpbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmxhbmcgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbaW5mby5sYW5nXS5wdXNoKGluZm8pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2luZm8ubGFuZ10gPSBbaW5mb107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHBhcnRpdGlvbnMpLnJlZHVjZSgob2JqLCBsYW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtsYW5nXSA9IFV0aWxzLnRvX21hdHJpeChwYXJ0aXRpb25zW2xhbmddLCB0aGlzLnN0YXRlLml0ZW1zUGVyUm93KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1jb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBpcy1mbHVpZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPkxpc3Qgb2YgbGFuZ3VhZ2UgaXRlbXM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCIgdi1mb3I9XCJyb3cgaW4gcmVhZENvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiY29udGVudCBpbiByb3dcIiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1ibHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwidXBkYXRlKGNvbnRlbnQsICdsYW5nJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1yZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1hdGlvbj1cIkFyZSB5b3Ugc3VyZT9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0d28tc3RlcHM9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwicmVtb3ZlKGNvbnRlbnQsICdsYW5nJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWN0aW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2NvbnRlbnQua2V5fX0gKHt7Y29udGVudC5sYW5nfX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGFnaW5hdG9yIGNsYXNzPVwicGFnaW5hdGlvbi1wdXJwbGVcIiA6c2tpcD1cIjBcIiA6bnVtYmVyLW9mLWl0ZW1zPVwiY29udGVudExlbmd0aFwiIDppdGVtcy1wZXItcGFnZT1cInN0YXRlLml0ZW1zUGVyUGFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+QWRkIG9yIG1vZGlmeSBhIGxhbmd1YWdlIGl0ZW08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmZm9ybSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnBvc3RfcGF0aD1cInN0YXRlLnBhdGhcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cHV0X3BhdGg9XCJzdGF0ZS5wYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X3BhdGg9XCJzdGF0ZS5ycGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9mb3JtPVwic3RhdGUucmZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgbmFtZT1cImtleVwiIDpsYWJlbD1cImxhbmcoJ2Jfa2V5JylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9rZXknKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCBuYW1lPVwicGFydFwiIDpsYWJlbD1cImxhbmcoJ2JfcGFydF9vZl93ZWJzaXRlJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9wYXJ0X29mX3dlYnNpdGUnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZzZWxlY3QgbmFtZT1cImxhbmdcIiA6bGFiZWw9XCJsYW5nKCdiX2xhbmcnKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6b3B0aW9ucz1cInN0YXRlLmxhbmdzXCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZ2YXJpYWRpYy1lbGVtZW50IG5hbWU9XCJ2YWx1ZXNcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgOnRhYnM9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwidmFyaWFkaWNcIiBzbG90LXNjb3BlPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS52YWx1ZWBcIiA6bGFiZWw9XCJsYW5nKCdiX3RleHQnKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX3RleHRfdG9fc2hvdycpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZzZWxlY3QgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0ucXVhbnRpdHlgXCIgOmxhYmVsPVwibGFuZygnYl9xdWFudGl0eScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpvcHRpb25zPVwic3RhdGUucXVhbnRpdGllc1wiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZnZhcmlhZGljLWVsZW1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zmb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9MYW5nJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IFZ1ZSA9IHJlcXVpcmUoJ3Z1ZScpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2FwaS9tZXNzYWdlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHVwZGF0ZShvYmosIGVudGl0eSkge1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLkNBTkNFTF9GT1JNLCB7XG4gICAgICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5jZm9ybSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBWdWUubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChNZXNzYWdlcy5VUERBVEVfTU9ERV9GT1JNLCB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUuY2Zvcm0sXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogb2JqLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZShvYmosIGVudGl0eSkge1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3JlbW92ZScsIHtcbiAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLnJmb3JtLFxuICAgICAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoZW50aXR5LCAnREVMJywgZmFsc2UsIG9iai5faWQpLFxuICAgICAgICAgICAgICAgIHJwYXRoOiB0aGlzLnN0YXRlLnJwYXRoLFxuICAgICAgICAgICAgICAgIHJmb3JtOiB0aGlzLnN0YXRlLnJmb3JtLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBiZWZvcmVNb3VudCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLkNSRUFURV9GT1JNLCB7XG4gICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLnJmb3JtLFxuICAgICAgICAgICAgY29udGVudDogW10sXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgZXJyb3IoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5lcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jb250ZW50IHx8IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50TGVuZ3RoKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICBlcnJvcihuKSB7XG4gICAgICAgICAgICBpZiAobiAmJiBPYmplY3Qua2V5cyhuKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihuLmNvbnRlbnQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgLy8gdG9hc3RyLmVycm9yKG4uY29udGVudC5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsImNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vYXBpL3JvdXRlcycpO1xuY29uc3QgUmVhZGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvUmVhZGVyTWl4aW4nKTtcbmNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9taXhpbnMvTGFuZ01peGluJyk7XG5jb25zdCBGb3JtTWl4aW4gPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vbWl4aW5zL0Zvcm1NaXhpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtSZWFkZXJNaXhpbiwgTGFuZ01peGluLCBGb3JtTWl4aW5dLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ3VzZXInLCAnUE9TVCcpLFxuICAgICAgICAgICAgICAgIHJwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCd1c2VyJywgJ0dFVCcpLFxuICAgICAgICAgICAgICAgIGNmb3JtOiAndXNlcl9jcmVhdGlvbicsXG4gICAgICAgICAgICAgICAgcmZvcm06ICd1c2VyX3JlYWQnLFxuICAgICAgICAgICAgICAgIGZvcm1zOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmb3JtX3JlYWQnLFxuICAgICAgICAgICAgICAgICAgICBncm91cDogJ3VzZXInLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiAyMCxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclJvdzogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2luZ2xlX3JlYWQnLCB7XG4gICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLnJmb3JtLFxuICAgICAgICAgICAgcGF0aDogdGhpcy5zdGF0ZS5ycGF0aCxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICByZWFkQ29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy50b19tYXRyaXgoZm9ybS5jb250ZW50IGluc3RhbmNlb2YgQXJyYXkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jb250ZW50IDogW10sIHRoaXMuc3RhdGUuaXRlbXNQZXJSb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50TGVuZ3RoKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5yZm9ybV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uY29udGVudC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJob2x5LWdyYWlsLWNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGlzLWZsdWlkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+TGlzdCBvZiB1c2Vyczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWZvcj1cInJvdyBpbiByZWFkQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJjb250ZW50IGluIHJvd1wiIGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJ1cGRhdGUoY29udGVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1yZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1hdGlvbj1cIkFyZSB5b3Ugc3VyZT9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0d28tc3RlcHM9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwicmVtb3ZlKGNvbnRlbnQsICdvcmdhbml6YXRpb24nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7Y29udGVudC5maXJzdG5hbWV9fSB7e2NvbnRlbnQubGFzdG5hbWV9fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYWdpbmF0b3IgY2xhc3M9XCJwYWdpbmF0aW9uLXB1cnBsZVwiIDpza2lwPVwiMFwiIDpudW1iZXItb2YtaXRlbXM9XCJjb250ZW50TGVuZ3RoXCIgOml0ZW1zLXBlci1wYWdlPVwic3RhdGUuaXRlbXNQZXJQYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5BZGQgb3IgbW9kaWZ5IGEgdXNlcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cIk9iamVjdC5rZXlzKGZvcm1zKS5sZW5ndGggPiAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnBvc3RfcGF0aD1cInN0YXRlLnBhdGhcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cHV0X3BhdGg9XCJzdGF0ZS5wYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X3BhdGg9XCJzdGF0ZS5ycGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9mb3JtPVwic3RhdGUucmZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGR5bmFtaWMtZm9ybSA6Zm9ybT1cImZvcm1zWyd1c2VyX2Zvcm0nXSB8fCB7fVwiIDpjZm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmZvcm0+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL1VzZXInKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5jb25zdCBWdWUgPSByZXF1aXJlKCd2dWUnKTtcbmNvbnN0IFJvdXRlciA9IHJlcXVpcmUoJ3Z1ZS1yb3V0ZXInKTtcbmNvbnN0IEhlYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9wYXJ0cy9oZWFkZXIvSGVhZGVyLnZ1ZScpO1xuY29uc3QgRm9vdGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RoZW1lcy9pbmVkL3BhcnRzL2Zvb3Rlci9Gb290ZXIudnVlJyk7XG5jb25zdCBOYXZiYXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvcGFydHMvbmF2YmFyL05hdmJhci52dWUnKTtcbmNvbnN0IE1lbnVzID0gcmVxdWlyZSgnLi9tZW51cycpO1xuXG5WdWUudXNlKFJvdXRlcik7XG5cbmNvbnN0IG1lbnVfcm91dGVzID0gXy5mbGF0dGVuKE1lbnVzLm1lbnUpLm1hcChtZW51ID0+ICh7XG4gICAgcGF0aDogbWVudS5yb3V0ZXNbMF0sXG4gICAgbmFtZTogbWVudS5rZXksXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBoZWFkZXI6IEhlYWRlcixcbiAgICAgICAgZm9vdGVyOiBGb290ZXIsXG4gICAgICAgIG5hdmJhcjogTmF2YmFyLFxuICAgICAgICBkZWZhdWx0OiBtZW51LmNvbXBvbmVudCxcbiAgICB9LFxuICAgIHByb3BzOiB7IG5hdmJhcjogeyBtZW51czogTWVudXMubWVudSB9IH0sXG59KSk7XG5cbmNvbnN0IG90aGVyX3JvdXRlcyA9IE1lbnVzLm90aGVyLm1hcChtZW51ID0+ICh7XG4gICAgcGF0aDogbWVudS5yb3V0ZXNbMF0sXG4gICAgbmFtZTogbWVudS5rZXksXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBoZWFkZXI6IEhlYWRlcixcbiAgICAgICAgZm9vdGVyOiBGb290ZXIsXG4gICAgICAgIG5hdmJhcjogTmF2YmFyLFxuICAgICAgICBkZWZhdWx0OiBtZW51LmNvbXBvbmVudCxcbiAgICB9LFxuICAgIHByb3BzOiB7IG5hdmJhcjogeyBtZW51czogTWVudXMubWVudSB9IH0sXG59KSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFJvdXRlcih7XG4gICAgbW9kZTogJ2hpc3RvcnknLFxuICAgIHJvdXRlczogWy4uLm1lbnVfcm91dGVzLCAuLi5vdGhlcl9yb3V0ZXNdLFxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhZG1pbjogJy9hZG1pbicsXG4gICAgdXNlcjogJy9hZG1pbi91c2VyJyxcbiAgICByZXZpZXc6ICcvYWRtaW4vcmV2aWV3JyxcbiAgICBkYXRhc291cmNlOiAnL2FkbWluL2RhdGFzb3VyY2UnLFxuICAgIGRhdGFpbnN0YW5jZTogJy9hZG1pbi9kYXRhc291cmNlLzpkYXRhaW5zdGFuY2UnLFxuICAgIHB1YmxpY2F0aW9uOiAnL2FkbWluL3B1YmxpY2F0aW9uJyxcbiAgICBjc2w6ICcvYWRtaW4vY3NsJyxcbiAgICBmb3JtOiAnL2FkbWluL2Zvcm0nLFxuICAgIGxhbmc6ICcvYWRtaW4vbGFuZycsXG4gICAgZXh0ZXJuYWxfcmVwbzogJy9hZG1pbi9leHRlcm5hbF9yZXBvc2l0b3J5JyxcbiAgICBleHBvcnRfZm9ybWF0OiAnL2FkbWluL2V4cG9ydF9mb3JtYXQnLFxuICAgIGhhbmRsZV9pZDogJy9hZG1pbi9oYW5kbGVfaWQnLFxuICAgIGFwaTogJy9hZG1pbi9hcGknLFxuICAgIGNvbmZpZzogJy9hZG1pbi9jb25maWcnLFxufTtcbiIsImNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCdzdXBlcmFnZW50Jyk7XG5jb25zdCBNZXNzYWdlcyA9IHJlcXVpcmUoJy4vbWVzc2FnZXMnKTtcblxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaChvYmplY3QpIHtcbiAgICBjb25zdCB7IG1ldGhvZCwgcGF0aCwgYm9keSwgY29tbWl0IH0gPSBvYmplY3Q7XG5cbiAgICBsZXQgc3VwZXJfcmVxdWVzdCA9IFJlcXVlc3RbbWV0aG9kLnRvTG93ZXJDYXNlKCldKHBhdGgpXG4gICAgICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCAnYmZhM2U4MDMtMjE3ZS00ZjAwLTk3ZWQtNWY2NDE3NDY0NDg0TjFhLUZtS3RXOnRlc3QnKTtcbiAgICBpZiAoYm9keSAhPSBudWxsICYmIE9iamVjdC5rZXlzKGJvZHkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc3VwZXJfcmVxdWVzdCA9IHN1cGVyX3JlcXVlc3Quc2VuZChvYmplY3QuYm9keSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgc3VwZXJfcmVxdWVzdDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VzLlNVQ0NFU1MsXG4gICAgICAgICAgICBjb250ZW50OiByZXMuYm9keSxcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VzLkZBSUxVUkUsXG4gICAgICAgICAgICBjb250ZW50OiBlcnIucmVzcG9uc2UgIT0gbnVsbCA/IGVyci5yZXNwb25zZS5ib2R5IDogZXJyLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZmV0Y2gsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgTE9BRElORzogJ2xvYWRpbmcnLFxuICAgIFNVQ0NFU1M6ICdzdWNjZXNzJyxcbiAgICBGQUlMVVJFOiAnZmFpbHVyZScsXG4gICAgRkVUQ0g6ICdmZXRjaCcsXG4gICAgRVJST1I6ICdlcnJvcicsXG4gICAgQ1JFQVRFX0ZPUk06ICdjcmVhdGVfZm9ybScsXG4gICAgQ0FOQ0VMX0ZPUk06ICdjYW5jZWxfZm9ybScsXG4gICAgUkVNT1ZFX0ZPUk06ICdyZW1vdmVfZm9ybScsXG4gICAgUkVNT1ZFX0FMTF9GT1JNUzogJ3JlbW92ZV9hbGxfZm9ybXMnLFxuICAgIFVQREFURV9NT0RFX0ZPUk06ICd1cGRhdGVfbW9kZV9mb3JtJyxcbiAgICBUT0dHTEVfUkVDTEFJTV9GT1JNOiAndG9nZ2xlX3JlY2xhaW1fZm9ybScsXG4gICAgUkVDTEFJTV9GT1JNX0VMRU1FTlQ6ICdyZWNsYWltX2Zvcm1fZWxlbWVudCcsXG4gICAgQUREX1RPX0ZPUk1fUE9PTDogJ2FkZF90b19mb3JtX3Bvb2wnLFxuICAgIFJFTU9WRV9GUk9NX0ZPUk1fUE9PTDogJ3JlbW92ZV9mcm9tX2Zvcm1fcG9vbCcsXG59O1xuIiwiY29uc3QgQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vLi4vYXBwL2NvbmZpZycpO1xuXG5jb25zdCBwcmVmaXggPSBgJHtDb25maWcuYXBpLnB1YmxpYy5wcmVmaXh9LyR7Q29uZmlnLmFwaS5wdWJsaWMudmVyc2lvbn1gO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlbnRpdHkoZW50aXR5LCBtZXRob2QsIHNlYXJjaCA9IGZhbHNlLCBpZCA9IG51bGwpIHtcbiAgICAgICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgY2FzZSAnR0VUJzoge1xuICAgICAgICAgICAgbGV0IHVybCA9IGAke3ByZWZpeH0vJHtlbnRpdHl9YDtcbiAgICAgICAgICAgIGlmIChpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdXJsICs9ICdzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUE9TVCc6IHtcbiAgICAgICAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7cHJlZml4fS8ke2VudGl0eX1zL3NlYXJjaGA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYCR7cHJlZml4fS8ke2VudGl0eX1gO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1BVVCc6XG4gICAgICAgICAgICByZXR1cm4gYCR7cHJlZml4fS8ke2VudGl0eX1gO1xuICAgICAgICBjYXNlICdERUwnOlxuICAgICAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0vJHtlbnRpdHl9LyR7aWR9YDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH0sXG59O1xuIiwiY29uc3QgTGFuZ01peGluID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vbWl4aW5zL0xhbmdNaXhpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtMYW5nTWl4aW5dLFxuICAgIHByb3BzOiB7XG4gICAgICAgIGZvcm06IHsgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICAgICAgY2Zvcm06IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgICAgICBwcmVmaXg6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBnZXRfbmFtZShuYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVmaXggIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucHJlZml4fS4ke25hbWV9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJmaWVsZFwiPlxuICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCJmaWVsZCBpbiBmb3JtLmZpZWxkc1wiPlxuICAgICAgICAgICAgPGZ2YXJpYWRpYy1lbGVtZW50IGNsYXNzPVwiZmllbGRcIiA6bmFtZT1cImZpZWxkLm11bHRpcGxlX25hbWVcIiA6Zm9ybT1cImNmb3JtXCIgdi1pZj1cImZpZWxkLm11bHRpcGxlXCI+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJ2YXJpYWRpY1wiIHNsb3Qtc2NvcGU9XCJwcm9wc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IFxuICAgICAgICAgICAgICAgICAgICB2LWlmPVwiWydjaGVja2JveCcsICdyYWRpbycsICd0ZXh0JywgJ2VtYWlsJywgJ3Bob25lJywgJ3Bhc3N3b3JkJywgJ251bWJlcicsICd0ZXh0YXJlYSddLmluZGV4T2YoZmllbGQudHlwZSkgIT09IC0xXCJcbiAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwibGFuZyhmaWVsZC5sYWJlbCB8fCAnJylcIlxuICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImdldF9uYW1lKGAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS4ke2ZpZWxkLm5hbWV9YClcIlxuICAgICAgICAgICAgICAgICAgICA6cGxhY2Vob2xkZXI9XCJsYW5nKGZpZWxkLnBsYWNlaG9sZGVyIHx8ICcnKVwiXG4gICAgICAgICAgICAgICAgICAgIDp0eXBlPVwiZmllbGQudHlwZVwiXG4gICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiY2Zvcm1cIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZHluYW1pYy1mb3JtIFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmaWVsZC5zdWJmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICA6Y2Zvcm09XCJjZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6cHJlZml4PVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9YFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJmaWVsZC50eXBlID09PSAnc3ViZm9ybScgJiYgZmllbGQuc3ViZm9ybSAhPSBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L2R5bmFtaWMtZm9ybT5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC9mdmFyaWFkaWMtZWxlbWVudD5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgPGZpbnB1dCBcbiAgICAgICAgICAgICAgICB2LWlmPVwiWydjaGVja2JveCcsICdyYWRpbycsICd0ZXh0JywgJ2VtYWlsJywgJ3Bob25lJywgJ3Bhc3N3b3JkJywgJ251bWJlcicsICd0ZXh0YXJlYSddLmluZGV4T2YoZmllbGQudHlwZSkgIT09IC0xXCJcbiAgICAgICAgICAgICAgICA6bGFiZWw9XCJsYW5nKGZpZWxkLmxhYmVsIHx8ICcnKVwiXG4gICAgICAgICAgICAgICAgOm5hbWU9XCJnZXRfbmFtZShmaWVsZC5uYW1lLCBudWxsKVwiXG4gICAgICAgICAgICAgICAgOnBsYWNlaG9sZGVyPVwibGFuZyhmaWVsZC5wbGFjZWhvbGRlciB8fCAnJylcIlxuICAgICAgICAgICAgICAgIDp0eXBlPVwiZmllbGQudHlwZVwiXG4gICAgICAgICAgICAgICAgOmZvcm09XCJjZm9ybVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZHluYW1pYy1mb3JtIFxuICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cImZpZWxkLnN1YmZvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgOmNmb3JtPVwiY2Zvcm1cIlxuICAgICAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJmaWVsZC50eXBlID09PSAnc3ViZm9ybScgJiYgZmllbGQuc3ViZm9ybSAhPSBudWxsXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9keW5hbWljLWZvcm0+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vRHluYW1pY0Zvcm0nKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgTWVzc2FnZXMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi9hcGkvbWVzc2FnZXMnKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IElucHV0TWl4aW4gPSByZXF1aXJlKCcuLi8uLi9taXhpbnMvSW5wdXRNaXhpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtJbnB1dE1peGluXSxcbiAgICBwcm9wczoge1xuICAgICAgICBuYW1lOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgbGFiZWw6IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICBwbGFjZWhvbGRlcjogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIGlzUmVxdWlyZWQ6IHsgZGVmYXVsdDogZmFsc2UsIHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgICAgdHlwZTogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIHJlYWQ6IHsgZGVmYXVsdDogZmFsc2UsIHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgICAgaGlkZGVuOiB7IGRlZmF1bHQ6IGZhbHNlLCB0eXBlOiBCb29sZWFuIH0sXG4gICAgICAgIGZvcm06IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICByb3dzOiB7IGRlZmF1bHQ6IDEwIH0sXG4gICAgICAgIHJhZGlvQnV0dG9uczogeyBkZWZhdWx0OiAoKSA9PiBbXSwgdHlwZTogQXJyYXkgfSxcbiAgICB9LFxuXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZGVmYXVsdFZhbHVlKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLmZvcm1dO1xuICAgICAgICAgICAgaWYgKGZvcm0udXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSA9IFV0aWxzLmZpbmRfdmFsdWVfd2l0aF9wYXRoKGZvcm0uY29udGVudCwgdGhpcy5uYW1lLnNwbGl0KCcuJykpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVmYXVsdFZhbHVlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2NoZWNrYm94JyB8fCB0aGlzLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICB3YXRjaDoge1xuICAgICAgICByZWNsYWltKG4pIHtcbiAgICAgICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLlJFQ0xBSU1fRk9STV9FTEVNRU5ULCB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm06IHRoaXMuZm9ybSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBpbmZvOiB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwobikge1xuICAgICAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiZmllbGRcIlxuICAgIHYtaWY9XCJ0eXBlID09PSAndGV4dCcgfHwgdHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ3Bhc3N3b3JkJyB8fCB0eXBlID09PSAnZW1haWwnXCJcbiAgICA+XG4gICAgPGxhYmVsIDpmb3I9XCJuYW1lXCI+e3tsYWJlbH19PHNwYW4gdi1pZj1cImlzUmVxdWlyZWRcIiBjbGFzcz1cInJlZGlmeVwiPio8L3NwYW4+PC9sYWJlbD5cbiAgICA8aW5wdXQgdi1pZj1cInR5cGUgPT09ICd0ZXh0J1wiIFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgIHYtbW9kZWw9XCJzdGF0ZS52YWx1ZVwiXG4gICAgLz5cbiAgICA8aW5wdXQgdi1lbHNlLWlmPVwidHlwZSA9PT0gJ251bWJlcidcIiBcbiAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgIHYtbW9kZWw9XCJzdGF0ZS52YWx1ZVwiXG4gICAgLz5cbiAgICA8aW5wdXQgdi1lbHNlLWlmPVwidHlwZSA9PT0gJ3Bhc3N3b3JkJ1wiIFxuICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiXG4gICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICB2LW1vZGVsPVwic3RhdGUudmFsdWVcIlxuICAgIC8+XG4gICAgPGlucHV0IHYtZWxzZSBcbiAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgdi1tb2RlbD1cInN0YXRlLnZhbHVlXCJcbiAgICAvPlxuICAgIDxkaXYgdi1pZj1cInZhbGlkYXRpb25zLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPHAgdi1mb3I9XCJ0ZXh0IGluIHZhbGlkYXRpb25zXCIgY2xhc3M9XCJyZWRpZnkgaW5saW5lLWJsb2NrXCI+XG4gICAgICAgICAgICB7e3RleHR9fVxuICAgICAgICA8L3A+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiB2LWVsc2UtaWY9XCJ0eXBlID09PSAndGV4dGFyZWEnXCIgY2xhc3M9XCJmaWVsZFwiPlxuICAgIDxsYWJlbCBmb3I9XCJuYW1lXCI+e3tsYWJlbH19PHNwYW4gdi1pZj1cImlzUmVxdWlyZWRcIiBjbGFzcz1cInJlZGlmeVwiPio8L3NwYW4+PC9sYWJlbD5cbiAgICA8dGV4dGFyZWFcbiAgICAgICAgY2xhc3M9XCJpbnB1dCB0ZXh0YXJlYVwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgOnJvd3M9XCJyb3dzXCJcbiAgICAgICAgdi1tb2RlbD1cInN0YXRlLnZhbHVlXCJcbiAgICAvPlxuPC9kaXY+XG5cbjxkaXYgdi1lbHNlLWlmPVwidHlwZSA9PT0gJ3JhZGlvJ1wiIGNsYXNzPVwiZmllbGRcIj5cbiAgICA8bGFiZWwgOmZvcj1cIm5hbWVcIj57e2xhYmVsfTxzcGFuIHYtaWY9XCJpc1JlcXVpcmVkXCIgY2xhc3M9XCJyZWRpZnlcIj4qPC9zcGFuPjwvbGFiZWw+XG4gICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIHYtZm9yPVwiKGJ0biwgaWR4KSBpbiByYWRpb0J1dHRvbnNcIiBjbGFzcz1cInJhZGlvLWlubGluZVwiIGZvcj1cImJ0blswXVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJzdGF0ZS52YWx1ZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3tidG5bMV19fVxuICAgICAgICA8L2xhYmVsPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cblxuPGRpdiB2LWVsc2UtaWY9XCJ0eXBlID09PSAnY2hlY2tib3gnXCIgY2xhc3M9XCJjaGVja2JveFwiPlxuICAgIDxsYWJlbCA6Zm9yPVwibmFtZVwiPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgdi1tb2RlbD1cInN0YXRlLnZhbHVlXCJcbiAgICAgICAgLz5cbiAgICAgICAge3tsYWJlbH19XG4gICAgPC9sYWJlbD5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vSW5wdXQnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgVlNlbGVjdCA9IHJlcXVpcmUoJ3Z1ZS1zZWxlY3QnKS5WdWVTZWxlY3Q7XG5jb25zdCBJbnB1dE1peGluID0gcmVxdWlyZSgnLi4vLi4vbWl4aW5zL0lucHV0TWl4aW4nKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vYXBpL21lc3NhZ2VzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByb3BzOiB7XG4gICAgICAgIG5hbWU6IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICBsYWJlbDogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIGlzUmVxdWlyZWQ6IHsgZGVmYXVsdDogZmFsc2UsIHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgICAgZm9ybTogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIG11bHRpOiB7IGRlZmF1bHQ6IGZhbHNlLCB0eXBlOiBCb29sZWFuIH0sXG4gICAgICAgIG9wdGlvbnM6IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEFycmF5IH0sXG4gICAgICAgIGZpZWxkTGFiZWw6IHsgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiAnbGFiZWwnLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgZmllbGRWYWx1ZTogeyByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6ICd2YWx1ZScsIHR5cGU6IFN0cmluZyB9LFxuICAgIH0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICAndi1zZWxlY3QnOiBWU2VsZWN0LFxuICAgIH0sXG4gICAgbWl4aW5zOiBbSW5wdXRNaXhpbl0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5mb3JtXTtcbiAgICAgICAgICAgIGlmIChmb3JtLnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmZvID0gVXRpbHMuZmluZF92YWx1ZV93aXRoX3BhdGgoZm9ybS5jb250ZW50LCB0aGlzLm5hbWUuc3BsaXQoJy4nKSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOb29wXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmZvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IGluZm8ubWFwKChvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWVsZExhYmVsIGluIG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmcgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKG9wID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb1t0aGlzLmZpZWxkVmFsdWVdID09PSBvcFt0aGlzLmZpZWxkVmFsdWVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaXNzaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW3RoaXMuZmllbGRMYWJlbF0gPSBtaXNzaW5nWzBdW3RoaXMuZmllbGRMYWJlbF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKG8gPT4gbyAhPSBudWxsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbmZvID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW5nID0gdGhpcy5vcHRpb25zLmZpbHRlcihvID0+IGluZm8gPT09IG9bdGhpcy5maWVsZFZhbHVlXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtaXNzaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8gPSB7IFt0aGlzLmZpZWxkVmFsdWVdOiBpbmZvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLmZpZWxkTGFiZWxdOiBtaXNzaW5nWzBdW3RoaXMuZmllbGRMYWJlbF0gfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb1t0aGlzLmZpZWxkVmFsdWVdID09PSBvW3RoaXMuZmllbGRWYWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWlzc2luZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0geyBbdGhpcy5maWVsZFZhbHVlXTogaW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5maWVsZExhYmVsXTogbWlzc2luZ1swXVt0aGlzLmZpZWxkTGFiZWxdIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gaW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25DaGFuZ2UodmFsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gdmFsO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0LWNoYW5nZScsIHZhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGV4dHJhY3RfdmFsdWVzKGluZm9zKSB7XG4gICAgICAgICAgICBpZiAoaW5mb3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5mb3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmZvcy5tYXAobyA9PiBvLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmZvcy52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0X29wdGlvbnMoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWVsZFZhbHVlID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKG8gPT5cbiAgICAgICAgICAgICAgICAoeyBsYWJlbDogb1t0aGlzLmZpZWxkTGFiZWxdLCB2YWx1ZTogb1t0aGlzLmZpZWxkVmFsdWVdIH0pKTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICAgIHJlY2xhaW0obikge1xuICAgICAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuUkVDTEFJTV9GT1JNX0VMRU1FTlQsIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogdGhpcy5mb3JtLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGluZm86IHRoaXMuZXh0cmFjdF92YWx1ZXModGhpcy5zdGF0ZS5zZWxlY3RlZCksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbChuKSB7XG4gICAgICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zKCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXRfb3B0aW9ucygpO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgYmVmb3JlTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZm9ybWF0X29wdGlvbnMoKTtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJmaWVsZFwiPlxuICAgIDxsYWJlbCA6Zm9yPVwibmFtZVwiPnt7bGFiZWx9fTxzcGFuIHYtaWY9XCJpc1JlcXVpcmVkXCIgY2xhc3M9XCJyZWRpZnlcIj4qPC9zcGFuPjwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgPHYtc2VsZWN0XG4gICAgICAgICAgICA6bXVsdGlwbGU9XCJtdWx0aVwiXG4gICAgICAgICAgICA6b3B0aW9ucz1cInN0YXRlLm9wdGlvbnNcIlxuICAgICAgICAgICAgOmxhYmVsPVwiZmllbGRMYWJlbFwiXG4gICAgICAgICAgICA6b24tY2hhbmdlPVwib25DaGFuZ2VcIlxuICAgICAgICAgICAgOnZhbHVlPVwic3RhdGUuc2VsZWN0ZWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgID5cbiAgICAgICAgPC92LXNlbGVjdD5cbiAgICA8L2Rpdj4gXG4gICAgPGRpdiB2LWlmPVwidmFsaWRhdGlvbnMubGVuZ3RoID4gMFwiPlxuICAgICAgICA8cCB2LWZvcj1cInRleHQgaW4gdmFsaWRhdGlvbnNcIiBjbGFzcz1cInJlZGlmeSBpbmxpbmUtYmxvY2tcIj5cbiAgICAgICAgICAgIHt7dGV4dH19XG4gICAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9TZWxlY3QnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgTWVzc2FnZXMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi9hcGkvbWVzc2FnZXMnKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IElucHV0TWl4aW4gPSByZXF1aXJlKCcuLi8uLi9taXhpbnMvSW5wdXRNaXhpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtJbnB1dE1peGluXSxcbiAgICBwcm9wczoge1xuICAgICAgICBuYW1lOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgZm9ybTogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIGFycmF5OiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWUgfSxcbiAgICAgICAgaXNSZXF1aXJlZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB0cnVlIH0sXG4gICAgICAgIHRhYnM6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcbiAgICB9LFxuXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHM6IFtdLFxuICAgICAgICAgICAgICAgIHRhYl9hY3RpdmU6IHRoaXMuaXNSZXF1aXJlZCA/IDAgOiAtMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgYWN0aXZhdGVfdGFiKGlkLCBlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRhYl9hY3RpdmUgPSBpZDtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZWxlbWVudHMucHVzaCh0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlKGlkLCBlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmVsZW1lbnRzLnNwbGljZShpZCwgMSwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5mb3JtXTtcbiAgICAgICAgICAgIGlmIChmb3JtLnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9iamVjdCA9IFV0aWxzLmZpbmRfdmFsdWVfd2l0aF9wYXRoKGZvcm0uY29udGVudCwgdGhpcy5uYW1lLnNwbGl0KCcuJykpO1xuICAgICAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVsZW1lbnRzID0gb2JqZWN0Lm1hcCgoKSA9PiB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVsZW1lbnRzID0gXy5tYXAob2JqZWN0LCAoKSA9PiB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZWxlbWVudHMgPSB0aGlzLmlzUmVxdWlyZWQgPyBbdHJ1ZV0gOiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcbiAgICB9LFxuXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgcmVjbGFpbShuKSB7XG4gICAgICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChNZXNzYWdlcy5SRUNMQUlNX0ZPUk1fRUxFTUVOVCwge1xuICAgICAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLmZvcm0sXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaW5mbzogdGhpcy5zdGF0ZS52YWx1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKG4pIHtcbiAgICAgICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1tYXJnaW5sZXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLXBhZGRpbmdsZXNzXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj0nIycgY2xhc3M9XCJpY29uIGhhcy10ZXh0LXN1Y2Nlc3NcIiBAY2xpY2s9XCJhZGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wbHVzXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIiB2LWlmPVwidGFicyAmJiBzdGF0ZS5lbGVtZW50cy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLTFcIj5cbiAgICAgICAgICAgICAgICA8cFxuICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihzaG93LCBpZHgpIGluIHN0YXRlLmVsZW1lbnRzXCIgXG4gICAgICAgICAgICAgICAgICAgIHYtaWY9XCJzaG93XCIgXG4gICAgICAgICAgICAgICAgICAgIDprZXk9XCJpZHhcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGEgQGNsaWNrPVwiYWN0aXZhdGVfdGFiKGlkeCwgJGV2ZW50KVwiIDpjbGFzcz1cImAke3N0YXRlLnRhYl9hY3RpdmUgPT09IGlkeCA/ICdpcy1zdWNjZXNzJzogJyd9IGJ1dHRvbiBpcy1zbWFsbGBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aWR4KzF9fSBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPScjJyBjbGFzcz1cImljb24gaXMtc21hbGwgaGFzLXRleHQtZGFuZ2VyXCIgQGNsaWNrPVwicmVtb3ZlKGlkeCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgdi1mb3I9XCIoc2hvdywgaWR4KSBpbiBzdGF0ZS5lbGVtZW50c1wiIFxuICAgICAgICAgICAgICAgIHYtaWY9XCJzaG93XCJcbiAgICAgICAgICAgICAgICB2LXNob3c9XCJzdGF0ZS50YWJfYWN0aXZlID09PSBpZHhcIlxuICAgICAgICAgICAgICAgIDprZXk9XCJpZHhcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNsb3QgXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidmFyaWFkaWNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDppZD1cImlkeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6Zm5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cIiF0YWJzICYmIHN0YXRlLmVsZW1lbnRzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgIDxkaXYgdi1mb3I9XCIoc2hvdywgaWR4KSBpbiBzdGF0ZS5lbGVtZW50c1wiIGNsYXNzPVwiY29sdW1uc1wiIHYtaWY9XCJzaG93XCIgOmtleT1cImlkeFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlzLXB1bGxlZC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj0nIycgY2xhc3M9XCJpY29uIGhhcy10ZXh0LWRhbmdlclwiIEBjbGljaz1cInJlbW92ZShpZHgsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNsb3QgXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ2YXJpYWRpY1wiIFxuICAgICAgICAgICAgICAgICAgICA6aWQ9XCJpZHhcIlxuICAgICAgICAgICAgICAgICAgICA6Zm5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vVmFyaWFkaWNFbGVtZW50Jyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vYXBpL21lc3NhZ2VzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9hcGkvcm91dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByb3BzOiB7XG4gICAgICAgIG5hbWU6IHsgZGVmYXVsdDogJ2RlZmF1bHRfZm9ybScgfSxcbiAgICAgICAgcG9zdF9wYXRoOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICAgICAgcHV0X3BhdGg6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgICAgICBnZXRfcGF0aDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgIGdldF9mb3JtOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICB9LFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9tb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHN1Ym1pdChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuVE9HR0xFX1JFQ0xBSU1fRk9STSwge1xuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICByZWNsYWltOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuTE9BRElORywge1xuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMubmFtZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLlVQREFURV9NT0RFX0ZPUk0sIHsgZm9ybTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHt9LFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogZmFsc2UgfSk7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuVE9HR0xFX1JFQ0xBSU1fRk9STSwge1xuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICByZWNsYWltOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLkNBTkNFTF9GT1JNLCB7XG4gICAgICAgICAgICAgICAgZm9ybTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBiZWZvcmVNb3VudCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLkNSRUFURV9GT1JNLCB7IGZvcm06IHRoaXMubmFtZSwgY29udGVudDoge30gfSk7XG4gICAgfSxcblxuICAgIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChNZXNzYWdlcy5SRU1PVkVfRk9STSwgeyBmb3JtOiB0aGlzLm5hbWUgfSk7XG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIHVwZGF0ZV9tb2RlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmFtZSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnVwZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMubmFtZV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB9O1xuICAgICAgICB9LFxuICAgICAgICBsb2FkaW5nKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmFtZSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmxvYWRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGNsYWltcygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jbGFpbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmFtZSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnN1Y2Nlc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIHdhdGNoOiB7XG4gICAgICAgIHVwZGF0ZV9tb2RlKG4pIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudXBkYXRlX21vZGUgPSBuO1xuICAgICAgICB9LFxuICAgICAgICBjbGFpbXMobikge1xuICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMubmFtZV07XG4gICAgICAgICAgICBpZiAobiA9PT0gZm9ybS5wb29sKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBycGF0aDogdGhpcy5nZXRfcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcmZvcm06IHRoaXMuZ2V0X2Zvcm0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZvcm0uY29udGVudCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnVwZGF0ZV9tb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucGF0aCA9IHRoaXMucHV0X3BhdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCd1cGRhdGUnLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnBhdGggPSB0aGlzLnBvc3RfcGF0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2NyZWF0ZScsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcyhuKSB7XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48Zm9ybSBAc3VibWl0LnByZXZlbnQ9XCJzdWJtaXRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtaWY9XCJlcnJvci5mb3VuZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cIm1lc3NhZ2UgaXMtcmVkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkFuIGVycm9yIG9jY3VyZWQgLTwvc3Ryb25nPiB7e2Vycm9yLmNvbnRlbnQubWVzc2FnZX19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZWxzZS1pZj1cInN1Y2Nlc3MgIT0gbnVsbCAmJiBzdWNjZXNzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJtZXNzYWdlIGlzLWdyZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD57e3N1Y2Nlc3N9fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHNsb3Q+PC9zbG90PlxuICAgIDxkaXYgY2xhc3M9XCJmaWVsZCBpcy1ncm91cGVkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBmYS1zcGluIG0tcmlnaHQteHNcIj48L2k+XG4gICAgICAgICAgICAgICAgTG9hZGluZ1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHYtZWxzZVxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIiBAY2xpY2s9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIlxuICAgICAgICAgICAgICAgID57e3N0YXRlLnVwZGF0ZV9tb2RlID8gJ01vZGlmeScgOiAnU2F2ZSd9fTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIEBjbGljaz1cImNhbmNlbFwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1iYWNrZ3JvdW5kLXJlZFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtaWY9XCJlcnJvci5mb3VuZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cIm1lc3NhZ2UgaXMtcmVkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkFuIGVycm9yIG9jY3VyZWQgLTwvc3Ryb25nPiB7e2Vycm9yLmNvbnRlbnQubWVzc2FnZX19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZWxzZS1pZj1cInN1Y2Nlc3MgIT0gbnVsbCAmJiBzdWNjZXNzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJtZXNzYWdlIGlzLWdyZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD57e3N1Y2Nlc3N9fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Zvcm0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Gb3JtJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vYXBpL21lc3NhZ2VzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIHZhbGlkYXRpb25zKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLmZvcm1dO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgaW4gZm9ybS52YWxpZGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS52YWxpZGF0aW9uc1t0aGlzLm5hbWVdLm1hcChvID0+IG8ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlX21vZGUoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuZm9ybV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0udXBkYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICByZWNsYWltKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnJlY2xhaW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5mb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jYW5jZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuQUREX1RPX0ZPUk1fUE9PTCwgeyBmb3JtOiB0aGlzLmZvcm0gfSk7XG4gICAgfSxcbiAgICBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuUkVNT1ZFX0ZST01fRk9STV9QT09MLCB7IGZvcm06IHRoaXMuZm9ybSwgbmFtZTogdGhpcy5uYW1lIH0pO1xuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgdXBkYXRlX21vZGUoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJvcHM6IFsnbnVtYmVyT2ZJdGVtcycsICdpdGVtc1BlclBhZ2UnLCAnc2tpcCddLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIGZpcnN0X3BhZ2U6IDEsXG4gICAgICAgICAgICAgICAgY3VycmVudF9wYWdlOiAxLFxuICAgICAgICAgICAgICAgIGxhc3RfcGFnZTogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGdvdG8ocGFnZSwgZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKHBhZ2UgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhZ2UgPiB0aGlzLnN0YXRlLmxhc3RfcGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudF9wYWdlID0gcGFnZTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUubGFzdF9wYWdlID0gTWF0aC5jZWlsKHRoaXMubnVtYmVyT2ZJdGVtcyAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50X3BhZ2UgPSBwYXJzZUludCgodGhpcy5za2lwICsgdGhpcy5pdGVtc1BlclBhZ2UpIC8gdGhpcy5pdGVtc1BlclBhZ2UsIDEwKTtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxuYXYgdi1pZj1cInN0YXRlLmZpcnN0X3BhZ2UgPCBzdGF0ZS5sYXN0X3BhZ2VcIiBjbGFzcz1cImlzLXNtYWxsIHBhZ2luYXRpb24gaXMtY2VudGVyZWRcIiByb2xlPVwibmF2aWdhdGlvblwiIGFyaWEtbGFiZWw9XCJwYWdpbmF0aW9uXCI+XG4gICAgPHVsIGNsYXNzPVwicGFnaW5hdGlvbi1saXN0XCI+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlID4gMVwiPjxhIEBjbGljaz1cImdvdG8oc3RhdGUuY3VycmVudF9wYWdlLTEsICRldmVudClcIiBjbGFzcz1cInBhZ2luYXRpb24tbGlua1wiPlByZXZpb3VzPC9hPjwvbGk+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlID4gc3RhdGUuZmlyc3RfcGFnZVwiPjxhIEBjbGljaz1cImdvdG8oMSwgJGV2ZW50KVwiIGNsYXNzPVwicGFnaW5hdGlvbi1saW5rXCIgYXJpYS1sYWJlbD1cIkdvdG8gcGFnZSAxXCI+MTwvYT48L2xpPlxuICAgICAgICA8bGkgdi1pZj1cInN0YXRlLmN1cnJlbnRfcGFnZS0xID4gMlwiPjxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbi1lbGxpcHNpc1wiPiZoZWxsaXA7PC9zcGFuPjwvbGk+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlID4gc3RhdGUuZmlyc3RfcGFnZSArIDFcIj48YSBAY2xpY2s9XCJnb3RvKHN0YXRlLmN1cnJlbnRfcGFnZS0xLCAkZXZlbnQpXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWxpbmtcIiA6YXJpYS1sYWJlbD1cImBHb3RvIHBhZ2UgJHtzdGF0ZS5jdXJyZW50X3BhZ2UtMX1gXCI+e3tzdGF0ZS5jdXJyZW50X3BhZ2UtMX19PC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSBjbGFzcz1cInBhZ2luYXRpb24tbGluayBpcy1jdXJyZW50XCIgOmFyaWEtbGFiZWw9XCJgUGFnZSAke3N0YXRlLmN1cnJlbnRfcGFnZX1gXCIgYXJpYS1jdXJyZW50PVwicGFnZVwiPnt7c3RhdGUuY3VycmVudF9wYWdlfX08L2E+PC9saT5cbiAgICAgICAgPGxpIHYtaWY9XCJzdGF0ZS5jdXJyZW50X3BhZ2UgPCBzdGF0ZS5sYXN0X3BhZ2UtMVwiPjxhIEBjbGljaz1cImdvdG8oc3RhdGUuY3VycmVudF9wYWdlKzEsICRldmVudClcIiBjbGFzcz1cInBhZ2luYXRpb24tbGlua1wiIDphcmlhLWxhYmVsPVwiYEdvdG8gcGFnZSAke3N0YXRlLmN1cnJlbnRfcGFnZSsxfWBcIj57e3N0YXRlLmN1cnJlbnRfcGFnZSsxfX08L2E+PC9saT5cbiAgICAgICAgPGxpIHYtaWY9XCJzdGF0ZS5jdXJyZW50X3BhZ2UrMSA8IHN0YXRlLmxhc3RfcGFnZS0xXCI+PHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uLWVsbGlwc2lzXCI+JmhlbGxpcDs8L3NwYW4+PC9saT5cbiAgICAgICAgPGxpIHYtaWY9XCJzdGF0ZS5jdXJyZW50X3BhZ2UgPCBzdGF0ZS5sYXN0X3BhZ2VcIj48YSBAY2xpY2s9XCJnb3RvKHN0YXRlLmxhc3RfcGFnZSwgJGV2ZW50KVwiIGNsYXNzPVwicGFnaW5hdGlvbi1saW5rXCIgOmFyaWEtbGFiZWw9XCJgR290byBwYWdlICR7c3RhdGUubGFzdF9wYWdlfWBcIj57e3N0YXRlLmxhc3RfcGFnZX19PC9hPjwvbGk+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlIDwgc3RhdGUubGFzdF9wYWdlXCI+PGEgQGNsaWNrPVwiZ290byhzdGF0ZS5jdXJyZW50X3BhZ2UrMSwgJGV2ZW50KVwiIGNsYXNzPVwicGFnaW5hdGlvbi1saW5rXCI+TmV4dDwvYT48L2xpPlxuICAgIDwvdWw+XG4gICAgPC9uYXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9QYWdpbmF0b3InKTtcbjwvc2NyaXB0PlxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgICB0YWJzOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBBcnJheSB9LFxuICAgIH0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGdvKGlkeCwgZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50ID0gaWR4O1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJzXCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgOmNsYXNzPVwieydpcy1hY3RpdmUnOiBzdGF0ZS5jdXJyZW50ID09PSBpZHh9XCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiaWR4XCIgXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwiZ28oaWR4LCAkZXZlbnQpXCIgXG4gICAgICAgICAgICAgICAgdi1mb3I9XCIodGV4dCwgaWR4KSBpbiB0YWJzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhPnt7dGV4dH19PC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNsb3RcbiAgICAgICAgICAgIG5hbWU9XCJ0YWJzXCIgXG4gICAgICAgICAgICA6aWQ9XCJzdGF0ZS5jdXJyZW50XCJcbiAgICAgICAgPlxuICAgICAgICA8L3Nsb3Q+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9UYWJiZXInKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vYXBpL3JvdXRlcycpO1xuY29uc3QgTGFuZ01peGluID0gcmVxdWlyZSgnLi9MYW5nTWl4aW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbTGFuZ01peGluXSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBmb3JtcygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmZvcm1zLm5hbWUgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBteWZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLmZvcm1zLm5hbWVdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBteWZvcm0uY29udGVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtcyA9IGNvbnRlbnQucmVkdWNlKChvYmosIGZvcm0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5sYWJlbCA9IHRoaXMubGFuZyhmb3JtLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5kZXNjcmlwdGlvbiA9IHRoaXMubGFuZyhmb3JtLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maWVsZHMgPSBmb3JtLmZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5sYWJlbCA9IHRoaXMubGFuZyhmaWVsZC5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvYmpbZm9ybS5uYW1lXSA9IF8uY2xvbmVEZWVwKGZvcm0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5yZWR1Y2UoZm9ybXMsIChvYmosIGZvcm0sIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm0uaGFzX3N1YmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpZWxkcyA9IGZvcm0uZmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQudHlwZSA9PT0gJ3N1YmZvcm0nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLnN1YmZvcm0gPSBmb3Jtc1tmaWVsZC5zdWJmb3JtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2JqW25hbWVdID0gZm9ybTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2VhcmNoJywge1xuICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5mb3Jtcy5uYW1lLFxuICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eSgnZm9ybScsICdQT1NUJywgdHJ1ZSksXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgc2l6ZTogMTAwMCxcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICBncm91cDogdGhpcy5zdGF0ZS5mb3Jtcy5ncm91cCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG4iLCJjb25zdCBTdHJpbmdVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3N0cmluZ3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWV0aG9kczoge1xuICAgICAgICBsYW5nKGtleSwgb2JqLCBuKSB7XG4gICAgICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5jbGFuZykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gdGhpcy5jbGFuZ1trZXldO1xuICAgICAgICAgICAgbGV0IHRleHQgPSBrZXk7XG4gICAgICAgICAgICAvLyBUT0RPIGZpbmlzaCBpbXBsZW1lbnRhdGlvbiBmb3IgZmV3IGFuZCBtYW55XG4gICAgICAgICAgICBpZiAobiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCcxJyBpbiBpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBpbmZvWycxJ10gfHwga2V5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBpbmZvWyduL2EnXSB8fCBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IGluZm8uemVybyB8fCBpbmZvWyduL2EnXSB8fCBrZXk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gaW5mby5vbmUgfHwgaW5mb1snbi9hJ10gfHwga2V5O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IGluZm8udHdvIHx8IGluZm9bJ24vYSddIHx8IGtleTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IGluZm8ub3RoZXIgfHwgaW5mb1snbi9hJ10gfHwga2V5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwgfHwgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZ1V0aWxzLmZvcm1hdF93aXRoX29iaih0ZXh0LCBvYmopO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgY2xhbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUubGFuZ19jb250ZW50W3RoaXMuJHN0b3JlLnN0YXRlLmludGVyZmFjZUxhbmddO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiY29uc3QgQVBJID0gcmVxdWlyZSgnLi4vYXBpJyk7XG5jb25zdCBNZXNzYWdlcyA9IHJlcXVpcmUoJy4uL2FwaS9tZXNzYWdlcycpO1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVfb3JfdXBkYXRlKGN0eCwgeyBwYXRoLCBib2R5LCBmb3JtLCByZm9ybSwgcnBhdGggfSwgdXAgPSBmYWxzZSkge1xuICAgIGNvbnN0IG1ldGhvZCA9IHVwID8gJ1BVVCcgOiAnUE9TVCc7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgcGF0aCxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBib2R5LFxuICAgICAgICBjb21taXQ6IGN0eC5jb21taXQsXG4gICAgfTtcblxuICAgIGN0eC5jb21taXQoTWVzc2FnZXMuTE9BRElORywgeyBmb3JtIH0pO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQVBJLmZldGNoKHBheWxvYWQpO1xuICAgIGN0eC5jb21taXQoTWVzc2FnZXMuRkVUQ0gsIHsgbWV0aG9kLCByZXNwb25zZSwgZm9ybSB9KTtcbiAgICBjdHguZGlzcGF0Y2goJ3NpbmdsZV9yZWFkJywge1xuICAgICAgICBmb3JtOiByZm9ybSxcbiAgICAgICAgcGF0aDogcnBhdGgsXG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZTogYXN5bmMgKGN0eCwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBhd2FpdCBjcmVhdGVfb3JfdXBkYXRlKGN0eCwgcGF5bG9hZCwgZmFsc2UpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGFzeW5jIChjdHgsIHBheWxvYWQpID0+IHtcbiAgICAgICAgYXdhaXQgY3JlYXRlX29yX3VwZGF0ZShjdHgsIHBheWxvYWQsIHRydWUpO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGFzeW5jIChjdHgsIHsgcGF0aCwgZm9ybSwgcnBhdGgsIHJmb3JtIH0pID0+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBtZXRob2Q6ICdERUwnLFxuICAgICAgICAgICAgY29tbWl0OiBjdHguY29tbWl0LFxuICAgICAgICB9O1xuXG4gICAgICAgIGN0eC5jb21taXQoTWVzc2FnZXMuTE9BRElORywgeyBmb3JtIH0pO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IEFQSS5mZXRjaChwYXlsb2FkKTtcbiAgICAgICAgY3R4LmNvbW1pdChNZXNzYWdlcy5GRVRDSCwgeyBtZXRob2Q6ICdERUwnLCByZXNwb25zZSwgZm9ybSB9KTtcbiAgICAgICAgY3R4LmRpc3BhdGNoKCdzaW5nbGVfcmVhZCcsIHtcbiAgICAgICAgICAgIGZvcm06IHJmb3JtLFxuICAgICAgICAgICAgcGF0aDogcnBhdGgsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzaW5nbGVfcmVhZDogYXN5bmMgKGN0eCwgeyBmb3JtLCBwYXRoIH0pID0+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgY29tbWl0OiBjdHguY29tbWl0LFxuICAgICAgICB9O1xuXG4gICAgICAgIGN0eC5jb21taXQoTWVzc2FnZXMuTE9BRElORywgeyBmb3JtIH0pO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IEFQSS5mZXRjaChwYXlsb2FkKTtcbiAgICAgICAgY3R4LmNvbW1pdChNZXNzYWdlcy5GRVRDSCwgeyBtZXRob2Q6ICdHRVQnLCByZXNwb25zZSwgZm9ybSB9KTtcbiAgICB9LFxuXG4gICAgc2VhcmNoOiBhc3luYyAoY3R4LCB7IGZvcm0sIHBhdGgsIGJvZHkgfSkgPT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgY29tbWl0OiBjdHguY29tbWl0LFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgfTtcblxuICAgICAgICBjdHguY29tbWl0KE1lc3NhZ2VzLkxPQURJTkcsIHsgZm9ybSB9KTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBBUEkuZmV0Y2gocGF5bG9hZCk7XG4gICAgICAgIGN0eC5jb21taXQoTWVzc2FnZXMuRkVUQ0gsIHsgbWV0aG9kOiAnR0VUJywgcmVzcG9uc2UsIGZvcm0gfSk7XG4gICAgfSxcblxuICAgIGdyYWJfY29uZmlnOiBhc3luYyAoY3R4LCB7IHBhdGgsIGJvZHkgfSkgPT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgY29tbWl0OiBjdHguY29tbWl0LFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IEFQSS5mZXRjaChwYXlsb2FkKTtcbiAgICAgICAgLy8gY29uc3Qgc3VjY2VzcyA9IHJlc3BvbnNlLnR5cGUgPT09IE1lc3NhZ2VzLlNVQ0NFU1M7XG4gICAgICAgIGlmIChyZXNwb25zZS5jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmNvbnRlbnQgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSAncmVzdWx0JyBpbiByZXNwb25zZS5jb250ZW50XG4gICAgICAgICAgICAmJiAnaGl0cycgaW4gcmVzcG9uc2UuY29udGVudC5yZXN1bHQgPyByZXNwb25zZS5jb250ZW50LnJlc3VsdC5oaXRzIDogW107XG4gICAgICAgIGlmIChjb250ZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGN0eC5zdGF0ZS5nbG9iYWxfY29uZmlnID0gY29udGVudFswXS5zb3VyY2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ3JhYl9sYW5ndWFnZTogYXN5bmMgKGN0eCwgeyBwYXRoLCBib2R5IH0pID0+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGNvbW1pdDogY3R4LmNvbW1pdCxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBBUEkuZmV0Y2gocGF5bG9hZCk7XG4gICAgICAgIC8vIGNvbnN0IHN1Y2Nlc3MgPSByZXNwb25zZS50eXBlID09PSBNZXNzYWdlcy5TVUNDRVNTO1xuICAgICAgICBpZiAocmVzcG9uc2UuY29udGVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXNwb25zZS5jb250ZW50ID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250ZW50ID0gJ3Jlc3VsdCcgaW4gcmVzcG9uc2UuY29udGVudFxuICAgICAgICAgICAgJiYgJ2hpdHMnIGluIHJlc3BvbnNlLmNvbnRlbnQucmVzdWx0ID8gcmVzcG9uc2UuY29udGVudC5yZXN1bHQuaGl0cyA6IFtdO1xuICAgICAgICBjdHguc3RhdGUubGFuZ19jb250ZW50ID0gY29udGVudC5yZWR1Y2UoKG9iaiwgc3JjKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsID0gc3JjLnNvdXJjZTtcbiAgICAgICAgICAgIGNvbnN0IGxhbmcgPSBvYmpbbC5sYW5nXSB8fCB7fTtcbiAgICAgICAgICAgIGxhbmdbbC5rZXldID0gbC52YWx1ZXMucmVkdWNlKCh2YWx1ZXMsIHYpID0+IHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbdi5xdWFudGl0eV0gPSB2LnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICBvYmpbbC5sYW5nXSA9IGxhbmc7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9LCB7fSk7XG4gICAgfSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbn07XG4iLCJjb25zdCBWdWUgPSByZXF1aXJlKCd2dWUnKTtcbmNvbnN0IFZ1ZXggPSByZXF1aXJlKCd2dWV4Jyk7XG5jb25zdCBtdXRhdGlvbnMgPSByZXF1aXJlKCcuL211dGF0aW9ucycpO1xuY29uc3QgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucycpO1xuY29uc3Qgc3RhdGUgPSByZXF1aXJlKCcuL3N0YXRlJyk7XG5jb25zdCBnZXR0ZXJzID0gcmVxdWlyZSgnLi9nZXR0ZXJzJyk7XG5cblZ1ZS51c2UoVnVleCk7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFZ1ZXguU3RvcmUoe1xuICAgIHN0YXRlLFxuICAgIGdldHRlcnMsXG4gICAgYWN0aW9ucyxcbiAgICBtdXRhdGlvbnMsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsImNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vYXBpL21lc3NhZ2VzJyk7XG5jb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZV9mb3JtKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBvb2w6IDAsXG4gICAgICAgIGNsYWltczogMCxcbiAgICAgICAgdmFsaWRhdGlvbnM6IHt9LFxuICAgICAgICBlcnJvcjoge30sXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICB1cGRhdGU6IGZhbHNlLFxuICAgICAgICByZWNsYWltOiBmYWxzZSxcbiAgICAgICAgY2FuY2VsOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogJycsXG4gICAgICAgIGNvbnRlbnQ6IFtdLFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFtNZXNzYWdlcy5MT0FESU5HXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcbiAgICAgICAgaWYgKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuRkVUQ0hdOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHBheWxvYWQucmVzcG9uc2UudHlwZSA9PT0gTWVzc2FnZXMuU1VDQ0VTUztcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuXG4gICAgICAgIGlmIChwYXlsb2FkLnJlc3BvbnNlLmNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcGF5bG9hZC5yZXNwb25zZS5jb250ZW50ID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpKSB7XG4gICAgICAgICAgICBzdGF0ZS5mb3JtcyA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmZvcm1zLCB7IFtmb3JtX25hbWVdOiBjcmVhdGVfZm9ybSgpIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY2xhaW1zID0gMDtcbiAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5yZWNsYWltID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY2FuY2VsID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0udmFsaWRhdGlvbnMgPSB7fTtcblxuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgaWYgKHBheWxvYWQubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBwYXlsb2FkLnJlc3BvbnNlLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCdyZXN1bHQnIGluIGNvbnRlbnQgJiYgJ2hpdHMnIGluIGNvbnRlbnQucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY29udGVudCA9IGNvbnRlbnQucmVzdWx0LmhpdHMubWFwKGhpdCA9PiBfLm1lcmdlKHsgX2lkOiBoaXQuaWQgfSwgaGl0LnNvdXJjZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICgnY2hhbmdlJyBpbiBwYXlsb2FkLnJlc3BvbnNlLmNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBwYXlsb2FkLnJlc3BvbnNlLmNvbnRlbnQuY2hhbmdlID09PSAnVmFsaWRhdGlvbicpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnZhbGlkYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcGF5bG9hZC5yZXNwb25zZS5jb250ZW50LmVycm9ycyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uc3VjY2VzcyA9IHBheWxvYWQucmVzcG9uc2UuY29udGVudC5tZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5lcnJvciA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5lcnJvciA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgICAgICAgICBmb3VuZDogdHJ1ZSwgY29udGVudDogcGF5bG9hZC5yZXNwb25zZS5jb250ZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnZhbGlkYXRpb25zID0ge307XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLkVSUk9SXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIHN0YXRlLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgc3RhdGUuZXJyb3JfdHlwZSA9IHBheWxvYWQuZXJyb3JfdHlwZTtcbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLkNSRUFURV9GT1JNXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHBheWxvYWQuY29udGVudCB8fCB7fTtcbiAgICAgICAgc3RhdGUuZm9ybXMgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5mb3Jtcywge1xuICAgICAgICAgICAgW2Zvcm1fbmFtZV06IGNyZWF0ZV9mb3JtKCksXG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuUkVNT1ZFX0ZPUk1dOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuICAgICAgICBpZiAoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICBkZWxldGUgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuQ0FOQ0VMX0ZPUk1dOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuICAgICAgICBpZiAoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jb250ZW50ID0ge307XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmVycm9yID0ge307XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNsYWltcyA9IDA7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnN1Y2Nlc3MgPSAnJztcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0udmFsaWRhdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuUkVNT1ZFX0FMTF9GT1JNU106IChzdGF0ZSkgPT4ge1xuICAgICAgICBzdGF0ZS5mb3JtcyA9IHt9O1xuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuVVBEQVRFX01PREVfRk9STV06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG4gICAgICAgIGlmIChmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0udXBkYXRlID0gcGF5bG9hZC51cGRhdGUgfHwgZmFsc2U7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNhbmNlbCA9IGZhbHNlO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jb250ZW50ID0gT2JqZWN0LmFzc2lnbih7fSwgcGF5bG9hZC5jb250ZW50IHx8IHt9KTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uZXJyb3IgPSB7fTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uc3VjY2VzcyA9ICcnO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS52YWxpZGF0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5UT0dHTEVfUkVDTEFJTV9GT1JNXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcbiAgICAgICAgaWYgKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5yZWNsYWltID0gJ3JlY2xhaW0nIGluIHBheWxvYWQgP1xuICAgICAgICAgICAgICAgIHBheWxvYWQucmVjbGFpbSA6ICFzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnJlY2xhaW07XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNhbmNlbCA9IGZhbHNlO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5lcnJvciA9IHt9O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5SRUNMQUlNX0ZPUk1fRUxFTUVOVF06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG4gICAgICAgIGNvbnN0IG5hbWUgPSBwYXlsb2FkLm5hbWU7XG4gICAgICAgIGNvbnN0IGluZm8gPSBwYXlsb2FkLmluZm87XG4gICAgICAgIGlmIChmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jb250ZW50O1xuICAgICAgICAgICAgY29uc3Qgb2JqZWN0ID0gVXRpbHMubWFrZV9uZXN0ZWRfb2JqZWN0X2Zyb21fcGF0aChwYXRoLCBpbmZvKTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY29udGVudCA9IF8ubWVyZ2Uoe30sIGNvbnRlbnQsIG9iamVjdCk7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNsYWltcyArPSAxO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5BRERfVE9fRk9STV9QT09MXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcbiAgICAgICAgaWYgKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5wb29sICs9IDE7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLlJFTU9WRV9GUk9NX0ZPUk1fUE9PTF06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG4gICAgICAgIGNvbnN0IGVsdF9uYW1lID0gcGF5bG9hZC5uYW1lO1xuICAgICAgICBpZiAoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnBvb2wgLT0gMTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGVsdF9uYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3Qgb2JqZWN0ID0gVXRpbHMuZmluZF9vYmplY3Rfd2l0aF9wYXRoKHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY29udGVudCwgcGF0aCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtsYXN0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuIiwiY29uc3QgQnJvd3NlclV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvYnJvd3NlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBjb250ZW50OiBbXSxcbiAgICBlcnJvcjogZmFsc2UsXG4gICAgZXJyb3JfdHlwZTogJycsXG4gICAgYnJvd3Nlckxhbmd1YWdlOiBCcm93c2VyVXRpbHMubm9ybWFsaXplQnJvd3Nlckxhbmd1YWdlKEJyb3dzZXJVdGlscy5nZXRGaXJzdEJyb3dzZXJMYW5ndWFnZSgpKSxcbiAgICBpbnRlcmZhY2VMYW5nOiBudWxsLFxuICAgIGxhbmdfY29udGVudDoge30sXG4gICAgZ2xvYmFsX2NvbmZpZzoge30sXG4gICAgZm9ybXM6IHtcbiAgICAgICAgLyogZm9ybV9uYW1lOiB7ZXJyb3I6IHt9LCBjb250ZW50OiB7fSwgdXBkYXRlOiBmYWxzZS90cnVlfSovXG4gICAgfSxcbn07XG4iLCJmdW5jdGlvbiBnZXRGaXJzdEJyb3dzZXJMYW5ndWFnZSgpIHtcbiAgICBjb25zdCBuYXYgPSB3aW5kb3cubmF2aWdhdG9yO1xuICAgIGNvbnN0IGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyA9IFsnbGFuZ3VhZ2UnLCAnYnJvd3Nlckxhbmd1YWdlJywgJ3N5c3RlbUxhbmd1YWdlJywgJ3VzZXJMYW5ndWFnZSddO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgSFRNTCA1LjEgXCJuYXZpZ2F0b3IubGFuZ3VhZ2VzXCJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuYXYubGFuZ3VhZ2VzKSkge1xuICAgICAgICByZXR1cm4gbmF2Lmxhbmd1YWdlcy5maW5kKGxhbmd1YWdlID0+IGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydCBmb3Igb3RoZXIgd2VsbCBrbm93biBwcm9wZXJ0aWVzIGluIGJyb3dzZXJzXG4gICAgcmV0dXJuIGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cy5maW5kKCh2YWwpID0+IHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBuYXZbdmFsXTtcbiAgICAgICAgcmV0dXJuIGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplQnJvd3Nlckxhbmd1YWdlKGxhbmcpIHtcbiAgICBpZiAobGFuZyA9PSBudWxsIHx8IGxhbmcgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbGFuZy5zcGxpdCgnLScpWzBdLnRvVXBwZXJDYXNlKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEZpcnN0QnJvd3Nlckxhbmd1YWdlLFxuICAgIG5vcm1hbGl6ZUJyb3dzZXJMYW5ndWFnZSxcbn07XG4iLCJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmZ1bmN0aW9uIGZvcm1hdChmb3JtLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIGZvcm0ucmVwbGFjZSgveyhcXGQrKX0vZywgKG1hdGNoLCBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzW251bWJlcl0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJnc1tudW1iZXJdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0X3dpdGhfb2JqKGZvcm0sIG9iaikge1xuICAgIHJldHVybiBmb3JtLnJlcGxhY2UoL3soW0EtWmEtel8uLV0rKX0vZywgKG1hdGNoLCBuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGluZm8gPSBfLmdldChvYmosIG5hbWUpO1xuICAgICAgICBpZiAoaW5mbyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXQsXG4gICAgZm9ybWF0X3dpdGhfb2JqLFxufTtcbiIsIi8vICAgICAgXG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmZ1bmN0aW9uIHRydW5jYXRlKGlucHV0ICAgICAgICAsIHNpemUgICAgICAgICA9IDEwLCBlbGxpcHNpcyAgICAgICAgID0gJy4uLicpICAgICAgICAge1xuICAgIGNvbnN0IHRvdGFsX3NpemUgPSBzaXplICsgZWxsaXBzaXMubGVuZ3RoO1xuICAgIGlmIChpbnB1dC5sZW5ndGggPiB0b3RhbF9zaXplKSB7XG4gICAgICAgIGNvbnN0IGNoYXJfdG9fcmVtb3ZlID0gaW5wdXQubGVuZ3RoIC0gc2l6ZTtcbiAgICAgICAgY29uc3QgaGFsZiA9IE1hdGguZmxvb3IoaW5wdXQubGVuZ3RoIC8gMi4wKTtcbiAgICAgICAgY29uc3QgZmlyc3RfaGFsZiA9IE1hdGguZmxvb3IoY2hhcl90b19yZW1vdmUgLyAyLjApO1xuICAgICAgICBjb25zdCBsYXN0X2hhbGYgPSBNYXRoLmNlaWwoY2hhcl90b19yZW1vdmUgLyAyLjApO1xuXG4gICAgICAgIHJldHVybiBpbnB1dC5zbGljZSgwLCBoYWxmIC0gZmlyc3RfaGFsZilcbiAgICAgICAgICAgICsgZWxsaXBzaXNcbiAgICAgICAgICAgICsgaW5wdXQuc2xpY2UoaGFsZiArIGxhc3RfaGFsZiwgaW5wdXQubGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBfcmV0dXJuX2lubmVyX29iamVjdChvYmplY3QgICAgICAgICAsIGNvcHkgICAgICAgICAgPSB0cnVlKSAgICAgIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoY29weSkge1xuICAgICAgICAgICAgcmV0dXJuIF8uY2xvbmVEZWVwKG9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gX3Rlc3RfaW5uZXJfb2JqZWN0KG9iamVjdCAgICAgICAgICwga2V5ICAgICAgICAgICAgICAgICApICAgICAgICAgICAgIHtcbiAgICBpZiAoIWlzTmFOKHBhcnNlSW50KGtleSwgMTApKSkge1xuICAgICAgICBrZXkgPSBwYXJzZUludChrZXksIDEwKTtcbiAgICB9XG5cbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFtrZXksIG51bGxdO1xuICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKG9iamVjdC5sZW5ndGggPD0ga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gW2tleSwgbnVsbF07XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoa2V5IGluIG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIFtrZXksIG51bGxdO1xuICAgIH1cbiAgICByZXR1cm4gW2tleSwgb2JqZWN0XTtcbn1cblxuXG5mdW5jdGlvbiBmaW5kX29iamVjdF93aXRoX3BhdGgob2JqZWN0ICAgICAgICAgLCBwYXRoICAgICAgICAgICAgICAgKSAgICAgIHtcbiAgICBjb25zdCBwID0gcGF0aDtcblxuICAgIGlmIChwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gX3JldHVybl9pbm5lcl9vYmplY3Qob2JqZWN0LCBmYWxzZSk7IC8vIERvbid0IGNvcHlcbiAgICB9XG5cbiAgICBpZiAocC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGxldCBrZXkgPSBwWzBdO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgW2tleSwgcmVzdWx0XSA9IF90ZXN0X2lubmVyX29iamVjdChvYmplY3QsIGtleSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkgeyByZXR1cm4gcmVzdWx0OyB9XG4gICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkgeyByZXR1cm4gb2JqZWN0OyB9XG4gICAgICAgIHJldHVybiBmaW5kX29iamVjdF93aXRoX3BhdGgob2JqZWN0W2tleV0sIHAuc2xpY2UoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gZmluZF9vYmplY3Rfd2l0aF9wYXRoKG9iamVjdCwgcC5zbGljZSgxKSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRfdmFsdWVfd2l0aF9wYXRoKG9iamVjdCAgICAgICAgICwgcGF0aCAgICAgICAgICAgICAgICkgICAgICB7XG4gICAgY29uc3QgcCA9IHBhdGg7XG4gICAgaWYgKHAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBfcmV0dXJuX2lubmVyX29iamVjdChvYmplY3QpO1xuICAgIH1cblxuICAgIGxldCBrZXkgPSBwWzBdO1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIFtrZXksIHJlc3VsdF0gPSBfdGVzdF9pbm5lcl9vYmplY3Qob2JqZWN0LCBrZXkpO1xuICAgIGlmIChyZXN1bHQgPT0gbnVsbCkgeyByZXR1cm4gcmVzdWx0OyB9XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7IHJldHVybiBvYmplY3Q7IH1cbiAgICByZXR1cm4gZmluZF92YWx1ZV93aXRoX3BhdGgob2JqZWN0W2tleV0sIHAuc2xpY2UoMSkpO1xufVxuXG5mdW5jdGlvbiBtYWtlX25lc3RlZF9vYmplY3RfZnJvbV9wYXRoKHBhdGggICAgICAgICAgICAgICAsXG4gICAgdmFsdWUgICAgICwgb2JqICAgICAgICAgPSB7fSkgICAgICAgICB7XG4gICAgY29uc3QgcnBhdGggPSBfLnJldmVyc2UocGF0aCk7XG4gICAgcmV0dXJuIHJwYXRoLnJlZHVjZSgoYWNjLCBmaWVsZCkgPT4ge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoYWNjKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFjY1tmaWVsZF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbXlfb2JqID0ge307XG4gICAgICAgIG15X29ialtmaWVsZF0gPSBhY2M7XG4gICAgICAgIHJldHVybiBteV9vYmo7XG4gICAgfSwgb2JqKTtcbn1cblxuZnVuY3Rpb24gdG9fbWF0cml4KGNvbnRlbnQgICAgICAgICAgLCByb3dMZW5ndGggICAgICAgICA9IDIpIHtcbiAgICByZXR1cm4gY29udGVudFxuICAgICAgICAucmVkdWNlKChyb3dzLCBrZXksIGluZGV4KSA9PiAoaW5kZXggJSByb3dMZW5ndGggPT09IDAgPyByb3dzLnB1c2goW2tleV0pXG4gICAgICAgICAgICA6IHJvd3Nbcm93cy5sZW5ndGggLSAxXS5wdXNoKGtleSkpICYmIHJvd3MsIFtdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdHJ1bmNhdGUsXG4gICAgdG9fbWF0cml4LFxuICAgIGZpbmRfdmFsdWVfd2l0aF9wYXRoLFxuICAgIGZpbmRfb2JqZWN0X3dpdGhfcGF0aCxcbiAgICBtYWtlX25lc3RlZF9vYmplY3RfZnJvbV9wYXRoLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfcHJvbWlzZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3Byb21pc2VcIik7XG5cbnZhciBfcHJvbWlzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9taXNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGdlbiA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIG5ldyBfcHJvbWlzZTIuZGVmYXVsdChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBzdGVwKGtleSwgYXJnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9wcm9taXNlMi5kZWZhdWx0LnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgc3RlcChcInRocm93XCIsIGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0ZXAoXCJuZXh0XCIpO1xuICAgIH0pO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0l0ZXJhYmxlMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG52YXIgX2lzSXRlcmFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNJdGVyYWJsZTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2dldC1pdGVyYXRvclwiKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc0l0ZXJhYmxlMy5kZWZhdWx0KShPYmplY3QoYXJyKSkpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gcmVxdWlyZShcIi4uL2NvcmUtanMvYXJyYXkvZnJvbVwiKTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsIlxyXG4vKipcclxuICogRXhwb3NlIGBFbWl0dGVyYC5cclxuICovXHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xyXG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcclxuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcclxuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cclxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcclxuICAgIC5wdXNoKGZuKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xyXG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9XHJcblxyXG4gIG9uLmZuID0gZm47XHJcbiAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgLy8gYWxsXHJcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgdmFyIGNiO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcclxuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XHJcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcblxyXG4gIGlmIChjYWxsYmFja3MpIHtcclxuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XHJcbn07XHJcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjEnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IGdldEtleXMoaXQpO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYgKGdldFN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpO1xuICAgIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAoc3ltYm9scy5sZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgQlJFQUsgPSB7fTtcbnZhciBSRVRVUk4gPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUikge1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSk7XG4gIHZhciBmID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmIChpc0FycmF5SXRlcihpdGVyRm4pKSBmb3IgKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG4iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSBhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcbiAgfSBlbHNlIGlmIChPYnNlcnZlcikge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG4iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlOiBmYWxzZSwgdjogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBlOiB0cnVlLCB2OiBlIH07XG4gIH1cbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmIChERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSBkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSkgZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwgeyB2YWx1ZTogd2tzRXh0LmYobmFtZSkgfSk7XG59O1xuIiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcbiIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcbiIsIiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKCk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgJFByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV07XG52YXIgaXNOb2RlID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG52YXIgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgSW50ZXJuYWwsIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gJFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgICBleGVjKGVtcHR5LCBlbXB0eSk7XG4gICAgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKSAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2U7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhcHJvbWlzZS5faCkgb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciB1bmhhbmRsZWQgPSBpc1VuaGFuZGxlZChwcm9taXNlKTtcbiAgICB2YXIgcmVzdWx0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmICh1bmhhbmRsZWQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbikge1xuICAgICAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHVuaGFuZGxlZCAmJiByZXN1bHQuZSkgdGhyb3cgcmVzdWx0LnY7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIGlmIChwcm9taXNlLl9oID09IDEpIHJldHVybiBmYWxzZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZWFjdGlvbjtcbiAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHtcbiAgICByZWFjdGlvbiA9IGNoYWluW2krK107XG4gICAgaWYgKHJlYWN0aW9uLmZhaWwgfHwgIWlzVW5oYW5kbGVkKHJlYWN0aW9uLnByb21pc2UpKSByZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBpbmRleCA9IHRoaXMuX2k7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IE8ubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIE1FVEEgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZO1xudmFyICRmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciB3a3NEZWZpbmUgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJyk7XG52YXIgZW51bUtleXMgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBnT1BORXh0ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0Jyk7XG52YXIgJEdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xudmFyICREUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BEID0gJEdPUEQuZjtcbnZhciBkUCA9ICREUC5mO1xudmFyIGdPUE4gPSBnT1BORXh0LmY7XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJEpTT04gPSBnbG9iYWwuSlNPTjtcbnZhciBfc3RyaW5naWZ5ID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIEhJRERFTiA9IHdrcygnX2hpZGRlbicpO1xudmFyIFRPX1BSSU1JVElWRSA9IHdrcygndG9QcmltaXRpdmUnKTtcbnZhciBpc0VudW0gPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9QU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgVVNFX05BVElWRSA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbic7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRQKHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChpdCwga2V5LCBEKSB7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZiAocHJvdG9EZXNjKSBkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmIChwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKSBkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpIHtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90bykgJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFELmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKGl0LCBISURERU4pKSBkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkgaXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7IGVudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApIHtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0ga2V5cy5sZW5ndGg7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsID4gaSkgJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCkge1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSkge1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgaXQgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYgKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkgRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICB2YXIgbmFtZXMgPSBnT1BOKHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgdmFyIElTX09QID0gaXQgPT09IE9iamVjdFByb3RvO1xuICB2YXIgbmFtZXMgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvKSAkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKSBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXQgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5JykpIHtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFN5bWJvbDogJFN5bWJvbCB9KTtcblxuZm9yICh2YXIgZXM2U3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBqID0gMDsgZXM2U3ltYm9scy5sZW5ndGggPiBqOyl3a3MoZXM2U3ltYm9sc1tqKytdKTtcblxuZm9yICh2YXIgd2VsbEtub3duU3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGsgPSAwOyB3ZWxsS25vd25TeW1ib2xzLmxlbmd0aCA+IGs7KSB3a3NEZWZpbmUod2VsbEtub3duU3ltYm9sc1trKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gU3ltYm9sUmVnaXN0cnkpIGlmIChTeW1ib2xSZWdpc3RyeVtrZXldID09PSBzeW0pIHJldHVybiBrZXk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7IGE6IFMgfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7XG4gICAgaWYgKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYgKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSAkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZiAoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSkgcmVwbGFjZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKCRyZXBsYWNlcikgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS1maW5hbGx5XG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnUHJvbWlzZScsIHsgJ2ZpbmFsbHknOiBmdW5jdGlvbiAob25GaW5hbGx5KSB7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIGNvcmUuUHJvbWlzZSB8fCBnbG9iYWwuUHJvbWlzZSk7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICByZXR1cm4gdGhpcy50aGVuKFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHksXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICB9IDogb25GaW5hbGx5XG4gICk7XG59IH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdQcm9taXNlJywgeyAndHJ5JzogZnVuY3Rpb24gKGNhbGxiYWNrZm4pIHtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZih0aGlzKTtcbiAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gIChyZXN1bHQuZSA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59IH0pO1xuIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7XG4iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTtcbiIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBTcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF0sIHVuaXggdmVyc2lvblxuLy8gJ3Jvb3QnIGlzIGp1c3QgYSBzbGFzaCwgb3Igbm90aGluZy5cbnZhciBzcGxpdFBhdGhSZSA9XG4gICAgL14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC87XG52YXIgc3BsaXRQYXRoID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aFJlLmV4ZWMoZmlsZW5hbWUpLnNsaWNlKDEpO1xufTtcblxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgcGF0aCA9ICcuJztcbiAgfVxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XG4gICAgcGF0aCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9KS5qb2luKCcvJykpO1xufTtcblxuXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufTtcblxuZXhwb3J0cy5zZXAgPSAnLyc7XG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcblxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgcmVzdWx0ID0gc3BsaXRQYXRoKHBhdGgpLFxuICAgICAgcm9vdCA9IHJlc3VsdFswXSxcbiAgICAgIGRpciA9IHJlc3VsdFsxXTtcblxuICBpZiAoIXJvb3QgJiYgIWRpcikge1xuICAgIC8vIE5vIGRpcm5hbWUgd2hhdHNvZXZlclxuICAgIHJldHVybiAnLic7XG4gIH1cblxuICBpZiAoZGlyKSB7XG4gICAgLy8gSXQgaGFzIGEgZGlybmFtZSwgc3RyaXAgdHJhaWxpbmcgc2xhc2hcbiAgICBkaXIgPSBkaXIuc3Vic3RyKDAsIGRpci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIHJldHVybiByb290ICsgZGlyO1xufTtcblxuXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24ocGF0aCwgZXh0KSB7XG4gIHZhciBmID0gc3BsaXRQYXRoKHBhdGgpWzJdO1xuICAvLyBUT0RPOiBtYWtlIHRoaXMgY29tcGFyaXNvbiBjYXNlLWluc2Vuc2l0aXZlIG9uIHdpbmRvd3M/XG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XG4gICAgZiA9IGYuc3Vic3RyKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIGY7XG59O1xuXG5cbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aChwYXRoKVszXTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPSAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuXG4vLyBVc2UgYGdldE93blByb3BlcnR5TmFtZXNgIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGNhbGxpbmdcbi8vIGBoYXNPd25Qcm9wZXJ0eWAgb24gdGhlIGdsb2JhbCBgc2VsZmAgb2JqZWN0IGluIGEgd29ya2VyLiBTZWUgIzE4My5cbnZhciBoYWRSdW50aW1lID0gZy5yZWdlbmVyYXRvclJ1bnRpbWUgJiZcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZykuaW5kZXhPZihcInJlZ2VuZXJhdG9yUnVudGltZVwiKSA+PSAwO1xuXG4vLyBTYXZlIHRoZSBvbGQgcmVnZW5lcmF0b3JSdW50aW1lIGluIGNhc2UgaXQgbmVlZHMgdG8gYmUgcmVzdG9yZWQgbGF0ZXIuXG52YXIgb2xkUnVudGltZSA9IGhhZFJ1bnRpbWUgJiYgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG5cbi8vIEZvcmNlIHJlZXZhbHV0YXRpb24gb2YgcnVudGltZS5qcy5cbmcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG5cbmlmIChoYWRSdW50aW1lKSB7XG4gIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJ1bnRpbWUuXG4gIGcucmVnZW5lcmF0b3JSdW50aW1lID0gb2xkUnVudGltZTtcbn0gZWxzZSB7XG4gIC8vIFJlbW92ZSB0aGUgZ2xvYmFsIHByb3BlcnR5IGFkZGVkIGJ5IHJ1bnRpbWUuanMuXG4gIHRyeSB7XG4gICAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuICB9IGNhdGNoKGUpIHtcbiAgICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9tYXN0ZXIvTElDRU5TRSBmaWxlLiBBblxuICogYWRkaXRpb25hbCBncmFudCBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluXG4gKiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgICAgLy8gcmVzdWx0IGZvciB0aGlzIGl0ZXJhdGlvbiB3aWxsIGJlIHJlamVjdGVkIHdpdGggdGhlIHNhbWVcbiAgICAgICAgICAvLyByZWFzb24uIE5vdGUgdGhhdCByZWplY3Rpb25zIG9mIHlpZWxkZWQgUHJvbWlzZXMgYXJlIG5vdFxuICAgICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgICAvLyB3aGVuIGFuIGF3YWl0ZWQgUHJvbWlzZSBpcyByZWplY3RlZC4gVGhpcyBkaWZmZXJlbmNlIGluXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYmV0d2VlbiB5aWVsZCBhbmQgYXdhaXQgaXMgaW1wb3J0YW50LCBiZWNhdXNlIGl0XG4gICAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgICAgLy8gcmVqZWN0aW9uIChzd2FsbG93IGl0IGFuZCBjb250aW51ZSwgbWFudWFsbHkgLnRocm93IGl0IGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBnZW5lcmF0b3IsIGFiYW5kb24gaXRlcmF0aW9uLCB3aGF0ZXZlcikuIFdpdGhcbiAgICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgICAgLy8gcmVqZWN0aW9uIHJlYXNvbiBvdXRzaWRlIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIHNvIHRoZVxuICAgICAgICAgIC8vIG9ubHkgb3B0aW9uIGlzIHRvIHRocm93IGl0IGZyb20gdGhlIGF3YWl0IGV4cHJlc3Npb24sIGFuZFxuICAgICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgcnVudGltZS5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0pKFxuICAvLyBJbiBzbG9wcHkgbW9kZSwgdW5ib3VuZCBgdGhpc2AgcmVmZXJzIHRvIHRoZSBnbG9iYWwgb2JqZWN0LCBmYWxsYmFjayB0b1xuICAvLyBGdW5jdGlvbiBjb25zdHJ1Y3RvciBpZiB3ZSdyZSBpbiBnbG9iYWwgc3RyaWN0IG1vZGUuIFRoYXQgaXMgc2FkbHkgYSBmb3JtXG4gIC8vIG9mIGluZGlyZWN0IGV2YWwgd2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kuXG4gIChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMgfSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKClcbik7XG4iLCJmdW5jdGlvbiBBZ2VudCgpIHtcbiAgdGhpcy5fZGVmYXVsdHMgPSBbXTtcbn1cblxuW1widXNlXCIsIFwib25cIiwgXCJvbmNlXCIsIFwic2V0XCIsIFwicXVlcnlcIiwgXCJ0eXBlXCIsIFwiYWNjZXB0XCIsIFwiYXV0aFwiLCBcIndpdGhDcmVkZW50aWFsc1wiLCBcInNvcnRRdWVyeVwiLCBcInJldHJ5XCIsIFwib2tcIiwgXCJyZWRpcmVjdHNcIixcbiBcInRpbWVvdXRcIiwgXCJidWZmZXJcIiwgXCJzZXJpYWxpemVcIiwgXCJwYXJzZVwiLCBcImNhXCIsIFwia2V5XCIsIFwicGZ4XCIsIFwiY2VydFwiXS5mb3JFYWNoKGZ1bmN0aW9uKGZuKSB7XG4gIC8qKiBEZWZhdWx0IHNldHRpbmcgZm9yIGFsbCByZXF1ZXN0cyBmcm9tIHRoaXMgYWdlbnQgKi9cbiAgQWdlbnQucHJvdG90eXBlW2ZuXSA9IGZ1bmN0aW9uKC8qdmFyYXJncyovKSB7XG4gICAgdGhpcy5fZGVmYXVsdHMucHVzaCh7Zm46Zm4sIGFyZ3VtZW50czphcmd1bWVudHN9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5cbkFnZW50LnByb3RvdHlwZS5fc2V0RGVmYXVsdHMgPSBmdW5jdGlvbihyZXEpIHtcbiAgICB0aGlzLl9kZWZhdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgcmVxW2RlZi5mbl0uYXBwbHkocmVxLCBkZWYuYXJndW1lbnRzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWdlbnQ7XG4iLCIvKipcbiAqIFJvb3QgcmVmZXJlbmNlIGZvciBpZnJhbWVzLlxuICovXG5cbnZhciByb290O1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IC8vIEJyb3dzZXIgd2luZG93XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyAvLyBXZWIgV29ya2VyXG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIHsgLy8gT3RoZXIgZW52aXJvbm1lbnRzXG4gIGNvbnNvbGUud2FybihcIlVzaW5nIGJyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgaW4gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG4gIHJvb3QgPSB0aGlzO1xufVxuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgUmVxdWVzdEJhc2UgPSByZXF1aXJlKCcuL3JlcXVlc3QtYmFzZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcbnZhciBSZXNwb25zZUJhc2UgPSByZXF1aXJlKCcuL3Jlc3BvbnNlLWJhc2UnKTtcbnZhciBBZ2VudCA9IHJlcXVpcmUoJy4vYWdlbnQtYmFzZScpO1xuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpe307XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG52YXIgcmVxdWVzdCA9IGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsKSB7XG4gIC8vIGNhbGxiYWNrXG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB1cmwpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKS5lbmQodXJsKTtcbiAgfVxuXG4gIC8vIHVybCBmaXJzdFxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCk7XG4gIH1cblxuICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdChtZXRob2QsIHVybCk7XG59XG5cbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAgICYmICghcm9vdC5sb2NhdGlvbiB8fCAnZmlsZTonICE9IHJvb3QubG9jYXRpb24ucHJvdG9jb2xcbiAgICAgICAgICB8fCAhcm9vdC5BY3RpdmVYT2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC42LjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgfVxuICB0aHJvdyBFcnJvcihcIkJyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgY291bGQgbm90IGZpbmQgWEhSXCIpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciB0cmltID0gJycudHJpbVxuICA/IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24ocykgeyByZXR1cm4gcy5yZXBsYWNlKC8oXlxccyp8XFxzKiQpL2csICcnKTsgfTtcblxuLyoqXG4gKiBTZXJpYWxpemUgdGhlIGdpdmVuIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICB2YXIgcGFpcnMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIG9ialtrZXldKTtcbiAgfVxuICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufVxuXG4vKipcbiAqIEhlbHBzICdzZXJpYWxpemUnIHdpdGggc2VyaWFsaXppbmcgYXJyYXlzLlxuICogTXV0YXRlcyB0aGUgcGFpcnMgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFpcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICovXG5cbmZ1bmN0aW9uIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHZhbCkge1xuICBpZiAodmFsICE9IG51bGwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHYpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgICBmb3IodmFyIHN1YmtleSBpbiB2YWwpIHtcbiAgICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSArICdbJyArIHN1YmtleSArICddJywgdmFsW3N1YmtleV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpXG4gICAgICAgICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpKTtcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG5yZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuLyoqXG4gICogUGFyc2UgdGhlIGdpdmVuIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBgc3RyYC5cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cikge1xuICB2YXIgb2JqID0ge307XG4gIHZhciBwYWlycyA9IHN0ci5zcGxpdCgnJicpO1xuICB2YXIgcGFpcjtcbiAgdmFyIHBvcztcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFpcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgcG9zID0gcGFpci5pbmRleE9mKCc9Jyk7XG4gICAgaWYgKHBvcyA9PSAtMSkge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyKV0gPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKDAsIHBvcykpXSA9XG4gICAgICAgIGRlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKHBvcyArIDEpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEV4cG9zZSBwYXJzZXIuXG4gKi9cblxucmVxdWVzdC5wYXJzZVN0cmluZyA9IHBhcnNlU3RyaW5nO1xuXG4vKipcbiAqIERlZmF1bHQgTUlNRSB0eXBlIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKi9cblxucmVxdWVzdC50eXBlcyA9IHtcbiAgaHRtbDogJ3RleHQvaHRtbCcsXG4gIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgeG1sOiAndGV4dC94bWwnLFxuICB1cmxlbmNvZGVkOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0nOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0tZGF0YSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxucmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBzZXJpYWxpemUsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5zdHJpbmdpZnksXG59O1xuXG4vKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZSxcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGhlYWRlciBgc3RyYCBpbnRvXG4gKiBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWFwcGVkIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcihzdHIpIHtcbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KC9cXHI/XFxuLyk7XG4gIHZhciBmaWVsZHMgPSB7fTtcbiAgdmFyIGluZGV4O1xuICB2YXIgbGluZTtcbiAgdmFyIGZpZWxkO1xuICB2YXIgdmFsO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHsgLy8gY291bGQgYmUgZW1wdHkgbGluZSwganVzdCBza2lwIGl0XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgbWltZWAgaXMganNvbiBvciBoYXMgK2pzb24gc3RydWN0dXJlZCBzeW50YXggc3VmZml4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtaW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNKU09OKG1pbWUpIHtcbiAgcmV0dXJuIC9bXFwvK11qc29uXFxiLy50ZXN0KG1pbWUpO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgQWxpYXNpbmcgYHN1cGVyYWdlbnRgIGFzIGByZXF1ZXN0YCBpcyBuaWNlOlxuICpcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gKlxuICogIFdlIGNhbiB1c2UgdGhlIHByb21pc2UtbGlrZSBBUEksIG9yIHBhc3MgY2FsbGJhY2tzOlxuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nKS5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nLCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBTZW5kaW5nIGRhdGEgY2FuIGJlIGNoYWluZWQ6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnNlbmQoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAucG9zdCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogT3IgZnVydGhlciByZWR1Y2VkIHRvIGEgc2luZ2xlIGNhbGwgZm9yIHNpbXBsZSBjYXNlczpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBAcGFyYW0ge1hNTEhUVFBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZShyZXEpIHtcbiAgdGhpcy5yZXEgPSByZXE7XG4gIHRoaXMueGhyID0gdGhpcy5yZXEueGhyO1xuICAvLyByZXNwb25zZVRleHQgaXMgYWNjZXNzaWJsZSBvbmx5IGlmIHJlc3BvbnNlVHlwZSBpcyAnJyBvciAndGV4dCcgYW5kIG9uIG9sZGVyIGJyb3dzZXJzXG4gIHRoaXMudGV4dCA9ICgodGhpcy5yZXEubWV0aG9kICE9J0hFQUQnICYmICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICcnIHx8IHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnKSkgfHwgdHlwZW9mIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgID8gdGhpcy54aHIucmVzcG9uc2VUZXh0XG4gICAgIDogbnVsbDtcbiAgdGhpcy5zdGF0dXNUZXh0ID0gdGhpcy5yZXEueGhyLnN0YXR1c1RleHQ7XG4gIHZhciBzdGF0dXMgPSB0aGlzLnhoci5zdGF0dXM7XG4gIC8vIGhhbmRsZSBJRTkgYnVnOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcbiAgaWYgKHN0YXR1cyA9PT0gMTIyMykge1xuICAgIHN0YXR1cyA9IDIwNDtcbiAgfVxuICB0aGlzLl9zZXRTdGF0dXNQcm9wZXJ0aWVzKHN0YXR1cyk7XG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzID0gcGFyc2VIZWFkZXIodGhpcy54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG4gIHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgdGhpcy5fc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlcik7XG5cbiAgaWYgKG51bGwgPT09IHRoaXMudGV4dCAmJiByZXEuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHRoaXMuYm9keSA9IHRoaXMueGhyLnJlc3BvbnNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYm9keSA9IHRoaXMucmVxLm1ldGhvZCAhPSAnSEVBRCdcbiAgICAgID8gdGhpcy5fcGFyc2VCb2R5KHRoaXMudGV4dCA/IHRoaXMudGV4dCA6IHRoaXMueGhyLnJlc3BvbnNlKVxuICAgICAgOiBudWxsO1xuICB9XG59XG5cblJlc3BvbnNlQmFzZShSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBib2R5IGBzdHJgLlxuICpcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcbiAqIGFyZSBkZWZpbmVkIG9uIHRoZSBgc3VwZXJhZ2VudC5wYXJzZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLl9wYXJzZUJvZHkgPSBmdW5jdGlvbihzdHIpIHtcbiAgdmFyIHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZiAodGhpcy5yZXEuX3BhcnNlcikge1xuICAgIHJldHVybiB0aGlzLnJlcS5fcGFyc2VyKHRoaXMsIHN0cik7XG4gIH1cbiAgaWYgKCFwYXJzZSAmJiBpc0pTT04odGhpcy50eXBlKSkge1xuICAgIHBhcnNlID0gcmVxdWVzdC5wYXJzZVsnYXBwbGljYXRpb24vanNvbiddO1xuICB9XG4gIHJldHVybiBwYXJzZSAmJiBzdHIgJiYgKHN0ci5sZW5ndGggfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgID8gcGFyc2Uoc3RyKVxuICAgIDogbnVsbDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGBFcnJvcmAgcmVwcmVzZW50YXRpdmUgb2YgdGhpcyByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJuIHtFcnJvcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnRvRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgcmVxID0gdGhpcy5yZXE7XG4gIHZhciBtZXRob2QgPSByZXEubWV0aG9kO1xuICB2YXIgdXJsID0gcmVxLnVybDtcblxuICB2YXIgbXNnID0gJ2Nhbm5vdCAnICsgbWV0aG9kICsgJyAnICsgdXJsICsgJyAoJyArIHRoaXMuc3RhdHVzICsgJyknO1xuICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IG1ldGhvZDtcbiAgZXJyLnVybCA9IHVybDtcblxuICByZXR1cm4gZXJyO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlYC5cbiAqL1xuXG5yZXF1ZXN0LlJlc3BvbnNlID0gUmVzcG9uc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdGAgd2l0aCB0aGUgZ2l2ZW4gYG1ldGhvZGAgYW5kIGB1cmxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdChtZXRob2QsIHVybCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3F1ZXJ5ID0gdGhpcy5fcXVlcnkgfHwgW107XG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICB0aGlzLnVybCA9IHVybDtcbiAgdGhpcy5oZWFkZXIgPSB7fTsgLy8gcHJlc2VydmVzIGhlYWRlciBuYW1lIGNhc2VcbiAgdGhpcy5faGVhZGVyID0ge307IC8vIGNvZXJjZXMgaGVhZGVyIG5hbWVzIHRvIGxvd2VyY2FzZVxuICB0aGlzLm9uKCdlbmQnLCBmdW5jdGlvbigpe1xuICAgIHZhciBlcnIgPSBudWxsO1xuICAgIHZhciByZXMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IG5ldyBSZXNwb25zZShzZWxmKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcignUGFyc2VyIGlzIHVuYWJsZSB0byBwYXJzZSB0aGUgcmVzcG9uc2UnKTtcbiAgICAgIGVyci5wYXJzZSA9IHRydWU7XG4gICAgICBlcnIub3JpZ2luYWwgPSBlO1xuICAgICAgLy8gaXNzdWUgIzY3NTogcmV0dXJuIHRoZSByYXcgcmVzcG9uc2UgaWYgdGhlIHJlc3BvbnNlIHBhcnNpbmcgZmFpbHNcbiAgICAgIGlmIChzZWxmLnhocikge1xuICAgICAgICAvLyBpZTkgZG9lc24ndCBoYXZlICdyZXNwb25zZScgcHJvcGVydHlcbiAgICAgICAgZXJyLnJhd1Jlc3BvbnNlID0gdHlwZW9mIHNlbGYueGhyLnJlc3BvbnNlVHlwZSA9PSAndW5kZWZpbmVkJyA/IHNlbGYueGhyLnJlc3BvbnNlVGV4dCA6IHNlbGYueGhyLnJlc3BvbnNlO1xuICAgICAgICAvLyBpc3N1ZSAjODc2OiByZXR1cm4gdGhlIGh0dHAgc3RhdHVzIGNvZGUgaWYgdGhlIHJlc3BvbnNlIHBhcnNpbmcgZmFpbHNcbiAgICAgICAgZXJyLnN0YXR1cyA9IHNlbGYueGhyLnN0YXR1cyA/IHNlbGYueGhyLnN0YXR1cyA6IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXNDb2RlID0gZXJyLnN0YXR1czsgLy8gYmFja3dhcmRzLWNvbXBhdCBvbmx5XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSBudWxsO1xuICAgICAgICBlcnIuc3RhdHVzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyKTtcbiAgICB9XG5cbiAgICBzZWxmLmVtaXQoJ3Jlc3BvbnNlJywgcmVzKTtcblxuICAgIHZhciBuZXdfZXJyO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXNlbGYuX2lzUmVzcG9uc2VPSyhyZXMpKSB7XG4gICAgICAgIG5ld19lcnIgPSBuZXcgRXJyb3IocmVzLnN0YXR1c1RleHQgfHwgJ1Vuc3VjY2Vzc2Z1bCBIVFRQIHJlc3BvbnNlJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaChjdXN0b21fZXJyKSB7XG4gICAgICBuZXdfZXJyID0gY3VzdG9tX2VycjsgLy8gb2soKSBjYWxsYmFjayBjYW4gdGhyb3dcbiAgICB9XG5cbiAgICAvLyAjMTAwMCBkb24ndCBjYXRjaCBlcnJvcnMgZnJvbSB0aGUgY2FsbGJhY2sgdG8gYXZvaWQgZG91YmxlIGNhbGxpbmcgaXRcbiAgICBpZiAobmV3X2Vycikge1xuICAgICAgbmV3X2Vyci5vcmlnaW5hbCA9IGVycjtcbiAgICAgIG5ld19lcnIucmVzcG9uc2UgPSByZXM7XG4gICAgICBuZXdfZXJyLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnIsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYCBhbmQgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblJlcXVlc3RCYXNlKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Bhc3NdIG9wdGlvbmFsIGluIGNhc2Ugb2YgdXNpbmcgJ2JlYXJlcicgYXMgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgd2l0aCAndHlwZScgcHJvcGVydHkgJ2F1dG8nLCAnYmFzaWMnIG9yICdiZWFyZXInIChkZWZhdWx0ICdiYXNpYycpXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIG9wdGlvbnMpe1xuICBpZiAoMSA9PT0gYXJndW1lbnRzLmxlbmd0aCkgcGFzcyA9ICcnO1xuICBpZiAodHlwZW9mIHBhc3MgPT09ICdvYmplY3QnICYmIHBhc3MgIT09IG51bGwpIHsgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIGJlIHJlcGxhY2VkIHdpdGggb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBwYXNzO1xuICAgIHBhc3MgPSAnJztcbiAgfVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgdHlwZTogJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGJ0b2EgPyAnYmFzaWMnIDogJ2F1dG8nLFxuICAgIH07XG4gIH1cblxuICB2YXIgZW5jb2RlciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgYnRvYSkge1xuICAgICAgcmV0dXJuIGJ0b2Eoc3RyaW5nKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXNlIGJhc2ljIGF1dGgsIGJ0b2EgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfTtcblxuICByZXR1cm4gdGhpcy5fYXV0aCh1c2VyLCBwYXNzLCBvcHRpb25zLCBlbmNvZGVyKTtcbn07XG5cbi8qKlxuICogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgIHJlcXVlc3QuZ2V0KCcvc2hvZXMnKVxuICogICAgIC5xdWVyeSgnc2l6ZT0xMCcpXG4gKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbih2YWwpe1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBvcHRpb25zYCAob3IgZmlsZW5hbWUpLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaCgnY29udGVudCcsIG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uKGZpZWxkLCBmaWxlLCBvcHRpb25zKXtcbiAgaWYgKGZpbGUpIHtcbiAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJzdXBlcmFnZW50IGNhbid0IG1peCAuc2VuZCgpIGFuZCAuYXR0YWNoKClcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQoZmllbGQsIGZpbGUsIG9wdGlvbnMgfHwgZmlsZS5uYW1lKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9nZXRGb3JtRGF0YSA9IGZ1bmN0aW9uKCl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHtcbiAgICB0aGlzLl9mb3JtRGF0YSA9IG5ldyByb290LkZvcm1EYXRhKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Zvcm1EYXRhO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgaWYgKHRoaXMuX3Nob3VsZFJldHJ5KGVyciwgcmVzKSkge1xuICAgIHJldHVybiB0aGlzLl9yZXRyeSgpO1xuICB9XG5cbiAgdmFyIGZuID0gdGhpcy5fY2FsbGJhY2s7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG5cbiAgaWYgKGVycikge1xuICAgIGlmICh0aGlzLl9tYXhSZXRyaWVzKSBlcnIucmV0cmllcyA9IHRoaXMuX3JldHJpZXMgLSAxO1xuICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9XG5cbiAgZm4oZXJyLCByZXMpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB4LWRvbWFpbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcm9zc0RvbWFpbkVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcignUmVxdWVzdCBoYXMgYmVlbiB0ZXJtaW5hdGVkXFxuUG9zc2libGUgY2F1c2VzOiB0aGUgbmV0d29yayBpcyBvZmZsaW5lLCBPcmlnaW4gaXMgbm90IGFsbG93ZWQgYnkgQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luLCB0aGUgcGFnZSBpcyBiZWluZyB1bmxvYWRlZCwgZXRjLicpO1xuICBlcnIuY3Jvc3NEb21haW4gPSB0cnVlO1xuXG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IHRoaXMubWV0aG9kO1xuICBlcnIudXJsID0gdGhpcy51cmw7XG5cbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLy8gVGhpcyBvbmx5IHdhcm5zLCBiZWNhdXNlIHRoZSByZXF1ZXN0IGlzIHN0aWxsIGxpa2VseSB0byB3b3JrXG5SZXF1ZXN0LnByb3RvdHlwZS5idWZmZXIgPSBSZXF1ZXN0LnByb3RvdHlwZS5jYSA9IFJlcXVlc3QucHJvdG90eXBlLmFnZW50ID0gZnVuY3Rpb24oKXtcbiAgY29uc29sZS53YXJuKFwiVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50XCIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFRoaXMgdGhyb3dzLCBiZWNhdXNlIGl0IGNhbid0IHNlbmQvcmVjZWl2ZSBkYXRhIGFzIGV4cGVjdGVkXG5SZXF1ZXN0LnByb3RvdHlwZS5waXBlID0gUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbigpe1xuICB0aHJvdyBFcnJvcihcIlN0cmVhbWluZyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50XCIpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLl9pc0hvc3QgPSBmdW5jdGlvbiBfaXNIb3N0KG9iaikge1xuICAvLyBOYXRpdmUgb2JqZWN0cyBzdHJpbmdpZnkgdG8gW29iamVjdCBGaWxlXSwgW29iamVjdCBCbG9iXSwgW29iamVjdCBGb3JtRGF0YV0sIGV0Yy5cbiAgcmV0dXJuIG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iaiAmJiAhQXJyYXkuaXNBcnJheShvYmopICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgY29uc29sZS53YXJuKFwiV2FybmluZzogLmVuZCgpIHdhcyBjYWxsZWQgdHdpY2UuIFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBzdXBlcmFnZW50XCIpO1xuICB9XG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIHRoaXMuX2ZpbmFsaXplUXVlcnlTdHJpbmcoKTtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZW5kID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHhociA9ICh0aGlzLnhociA9IHJlcXVlc3QuZ2V0WEhSKCkpO1xuICB2YXIgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgdGhpcy5fc2V0VGltZW91dHMoKTtcblxuICAvLyBzdGF0ZSBjaGFuZ2VcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHJlYWR5U3RhdGUgPSB4aHIucmVhZHlTdGF0ZTtcbiAgICBpZiAocmVhZHlTdGF0ZSA+PSAyICYmIHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICAgIH1cbiAgICBpZiAoNCAhPSByZWFkeVN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIHZhciBzdGF0dXM7XG4gICAgdHJ5IHsgc3RhdHVzID0geGhyLnN0YXR1cyB9IGNhdGNoKGUpIHsgc3RhdHVzID0gMDsgfVxuXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIGlmIChzZWxmLnRpbWVkb3V0IHx8IHNlbGYuX2Fib3J0ZWQpIHJldHVybjtcbiAgICAgIHJldHVybiBzZWxmLmNyb3NzRG9tYWluRXJyb3IoKTtcbiAgICB9XG4gICAgc2VsZi5lbWl0KCdlbmQnKTtcbiAgfTtcblxuICAvLyBwcm9ncmVzc1xuICB2YXIgaGFuZGxlUHJvZ3Jlc3MgPSBmdW5jdGlvbihkaXJlY3Rpb24sIGUpIHtcbiAgICBpZiAoZS50b3RhbCA+IDApIHtcbiAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICB9XG4gICAgZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIGUpO1xuICB9O1xuICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoJ3Byb2dyZXNzJykpIHtcbiAgICB0cnkge1xuICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICdkb3dubG9hZCcpO1xuICAgICAgaWYgKHhoci51cGxvYWQpIHtcbiAgICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAndXBsb2FkJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAvLyBBY2Nlc3NpbmcgeGhyLnVwbG9hZCBmYWlscyBpbiBJRSBmcm9tIGEgd2ViIHdvcmtlciwgc28ganVzdCBwcmV0ZW5kIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgICAgLy8gaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84MzcyNDUveG1saHR0cHJlcXVlc3QtdXBsb2FkLXRocm93cy1pbnZhbGlkLWFyZ3VtZW50LXdoZW4tdXNlZC1mcm9tLXdlYi13b3JrZXItY29udGV4dFxuICAgIH1cbiAgfVxuXG4gIC8vIGluaXRpYXRlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUsIHRoaXMudXNlcm5hbWUsIHRoaXMucGFzc3dvcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gc2VlICMxMTQ5XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgfVxuXG4gIC8vIENPUlNcbiAgaWYgKHRoaXMuX3dpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgLy8gYm9keVxuICBpZiAoIXRoaXMuX2Zvcm1EYXRhICYmICdHRVQnICE9IHRoaXMubWV0aG9kICYmICdIRUFEJyAhPSB0aGlzLm1ldGhvZCAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgZGF0YSAmJiAhdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgdmFyIGNvbnRlbnRUeXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICB2YXIgc2VyaWFsaXplID0gdGhpcy5fc2VyaWFsaXplciB8fCByZXF1ZXN0LnNlcmlhbGl6ZVtjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JylbMF0gOiAnJ107XG4gICAgaWYgKCFzZXJpYWxpemUgJiYgaXNKU09OKGNvbnRlbnRUeXBlKSkge1xuICAgICAgc2VyaWFsaXplID0gcmVxdWVzdC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgICB9XG4gICAgaWYgKHNlcmlhbGl6ZSkgZGF0YSA9IHNlcmlhbGl6ZShkYXRhKTtcbiAgfVxuXG4gIC8vIHNldCBoZWFkZXIgZmllbGRzXG4gIGZvciAodmFyIGZpZWxkIGluIHRoaXMuaGVhZGVyKSB7XG4gICAgaWYgKG51bGwgPT0gdGhpcy5oZWFkZXJbZmllbGRdKSBjb250aW51ZTtcblxuICAgIGlmICh0aGlzLmhlYWRlci5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpXG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihmaWVsZCwgdGhpcy5oZWFkZXJbZmllbGRdKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9yZXNwb25zZVR5cGUpIHtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gdGhpcy5fcmVzcG9uc2VUeXBlO1xuICB9XG5cbiAgLy8gc2VuZCBzdHVmZlxuICB0aGlzLmVtaXQoJ3JlcXVlc3QnLCB0aGlzKTtcblxuICAvLyBJRTExIHhoci5zZW5kKHVuZGVmaW5lZCkgc2VuZHMgJ3VuZGVmaW5lZCcgc3RyaW5nIGFzIFBPU1QgcGF5bG9hZCAoaW5zdGVhZCBvZiBub3RoaW5nKVxuICAvLyBXZSBuZWVkIG51bGwgaGVyZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICB4aHIuc2VuZCh0eXBlb2YgZGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBkYXRhIDogbnVsbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxucmVxdWVzdC5hZ2VudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IEFnZW50KCk7XG59O1xuXG5bXCJHRVRcIiwgXCJQT1NUXCIsIFwiT1BUSU9OU1wiLCBcIlBBVENIXCIsIFwiUFVUXCIsIFwiREVMRVRFXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gIEFnZW50LnByb3RvdHlwZVttZXRob2QudG9Mb3dlckNhc2UoKV0gPSBmdW5jdGlvbih1cmwsIGZuKSB7XG4gICAgdmFyIHJlcSA9IG5ldyByZXF1ZXN0LlJlcXVlc3QobWV0aG9kLCB1cmwpO1xuICAgIHRoaXMuX3NldERlZmF1bHRzKHJlcSk7XG4gICAgaWYgKGZuKSB7XG4gICAgICByZXEuZW5kKGZuKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcTtcbiAgfTtcbn0pO1xuXG5BZ2VudC5wcm90b3R5cGUuZGVsID0gQWdlbnQucHJvdG90eXBlWydkZWxldGUnXTtcblxuLyoqXG4gKiBHRVQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmdldCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0dFVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSEVBRCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuaGVhZCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0hFQUQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIE9QVElPTlMgcXVlcnkgdG8gYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0Lm9wdGlvbnMgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdPUFRJT05TJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIERFTEVURSBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVsKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufVxuXG5yZXF1ZXN0WydkZWwnXSA9IGRlbDtcbnJlcXVlc3RbJ2RlbGV0ZSddID0gZGVsO1xuXG4vKipcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBhdGNoID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbikge1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUE9TVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wb3N0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbikge1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQVVQgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucHV0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbikge1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBudWxsICE9PSBvYmogJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIG9mIG1peGVkLWluIGZ1bmN0aW9ucyBzaGFyZWQgYmV0d2VlbiBub2RlIGFuZCBjbGllbnQgY29kZVxuICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdEJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdEJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdEJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdEJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIFJlcXVlc3RCYXNlLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gUmVxdWVzdEJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBDbGVhciBwcmV2aW91cyB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gX2NsZWFyVGltZW91dCgpe1xuICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICBjbGVhclRpbWVvdXQodGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICBkZWxldGUgdGhpcy5fdGltZXI7XG4gIGRlbGV0ZSB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVzcG9uc2UgYm9keSBwYXJzZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgaW5jb21pbmcgZGF0YSBpbnRvIHJlcXVlc3QuYm9keVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKGZuKXtcbiAgdGhpcy5fcGFyc2VyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgZm9ybWF0IG9mIGJpbmFyeSByZXNwb25zZSBib2R5LlxuICogSW4gYnJvd3NlciB2YWxpZCBmb3JtYXRzIGFyZSAnYmxvYicgYW5kICdhcnJheWJ1ZmZlcicsXG4gKiB3aGljaCByZXR1cm4gQmxvYiBhbmQgQXJyYXlCdWZmZXIsIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBJbiBOb2RlIGFsbCB2YWx1ZXMgcmVzdWx0IGluIEJ1ZmZlci5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5yZXNwb25zZVR5cGUoJ2Jsb2InKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVzcG9uc2VUeXBlID0gZnVuY3Rpb24odmFsKXtcbiAgdGhpcy5fcmVzcG9uc2VUeXBlID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCByZXF1ZXN0IGJvZHkgc2VyaWFsaXplclxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBkYXRhIHNldCB2aWEgLnNlbmQgb3IgLmF0dGFjaCBpbnRvIHBheWxvYWQgdG8gc2VuZFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbiBzZXJpYWxpemUoZm4pe1xuICB0aGlzLl9zZXJpYWxpemVyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGltZW91dHMuXG4gKlxuICogLSByZXNwb25zZSB0aW1lb3V0IGlzIHRpbWUgYmV0d2VlbiBzZW5kaW5nIHJlcXVlc3QgYW5kIHJlY2VpdmluZyB0aGUgZmlyc3QgYnl0ZSBvZiB0aGUgcmVzcG9uc2UuIEluY2x1ZGVzIEROUyBhbmQgY29ubmVjdGlvbiB0aW1lLlxuICogLSBkZWFkbGluZSBpcyB0aGUgdGltZSBmcm9tIHN0YXJ0IG9mIHRoZSByZXF1ZXN0IHRvIHJlY2VpdmluZyByZXNwb25zZSBib2R5IGluIGZ1bGwuIElmIHRoZSBkZWFkbGluZSBpcyB0b28gc2hvcnQgbGFyZ2UgZmlsZXMgbWF5IG5vdCBsb2FkIGF0IGFsbCBvbiBzbG93IGNvbm5lY3Rpb25zLlxuICpcbiAqIFZhbHVlIG9mIDAgb3IgZmFsc2UgbWVhbnMgbm8gdGltZW91dC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IG1zIG9yIHtyZXNwb25zZSwgZGVhZGxpbmV9XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbiB0aW1lb3V0KG9wdGlvbnMpe1xuICBpZiAoIW9wdGlvbnMgfHwgJ29iamVjdCcgIT09IHR5cGVvZiBvcHRpb25zKSB7XG4gICAgdGhpcy5fdGltZW91dCA9IG9wdGlvbnM7XG4gICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZvcih2YXIgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICBjYXNlICdkZWFkbGluZSc6XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zLmRlYWRsaW5lO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Jlc3BvbnNlJzpcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gb3B0aW9ucy5yZXNwb25zZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oXCJVbmtub3duIHRpbWVvdXQgb3B0aW9uXCIsIG9wdGlvbik7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgbnVtYmVyIG9mIHJldHJ5IGF0dGVtcHRzIG9uIGVycm9yLlxuICpcbiAqIEZhaWxlZCByZXF1ZXN0cyB3aWxsIGJlIHJldHJpZWQgJ2NvdW50JyB0aW1lcyBpZiB0aW1lb3V0IG9yIGVyci5jb2RlID49IDUwMC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmV0cnkgPSBmdW5jdGlvbiByZXRyeShjb3VudCwgZm4pe1xuICAvLyBEZWZhdWx0IHRvIDEgaWYgbm8gY291bnQgcGFzc2VkIG9yIHRydWVcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgY291bnQgPT09IHRydWUpIGNvdW50ID0gMTtcbiAgaWYgKGNvdW50IDw9IDApIGNvdW50ID0gMDtcbiAgdGhpcy5fbWF4UmV0cmllcyA9IGNvdW50O1xuICB0aGlzLl9yZXRyaWVzID0gMDtcbiAgdGhpcy5fcmV0cnlDYWxsYmFjayA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnZhciBFUlJPUl9DT0RFUyA9IFtcbiAgJ0VDT05OUkVTRVQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VBRERSSU5GTycsXG4gICdFU09DS0VUVElNRURPVVQnXG5dO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHJlcXVlc3Qgc2hvdWxkIGJlIHJldHJpZWQuXG4gKiAoQm9ycm93ZWQgZnJvbSBzZWdtZW50aW8vc3VwZXJhZ2VudC1yZXRyeSlcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zaG91bGRSZXRyeSA9IGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gIGlmICghdGhpcy5fbWF4UmV0cmllcyB8fCB0aGlzLl9yZXRyaWVzKysgPj0gdGhpcy5fbWF4UmV0cmllcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodGhpcy5fcmV0cnlDYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICB2YXIgb3ZlcnJpZGUgPSB0aGlzLl9yZXRyeUNhbGxiYWNrKGVyciwgcmVzKTtcbiAgICAgIGlmIChvdmVycmlkZSA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAob3ZlcnJpZGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgICAvLyB1bmRlZmluZWQgZmFsbHMgYmFjayB0byBkZWZhdWx0c1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG4gIH1cbiAgaWYgKHJlcyAmJiByZXMuc3RhdHVzICYmIHJlcy5zdGF0dXMgPj0gNTAwICYmIHJlcy5zdGF0dXMgIT0gNTAxKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKGVycikge1xuICAgIGlmIChlcnIuY29kZSAmJiB+RVJST1JfQ09ERVMuaW5kZXhPZihlcnIuY29kZSkpIHJldHVybiB0cnVlO1xuICAgIC8vIFN1cGVyYWdlbnQgdGltZW91dFxuICAgIGlmIChlcnIudGltZW91dCAmJiBlcnIuY29kZSA9PSAnRUNPTk5BQk9SVEVEJykgcmV0dXJuIHRydWU7XG4gICAgaWYgKGVyci5jcm9zc0RvbWFpbikgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXRyeSByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3JldHJ5ID0gZnVuY3Rpb24oKSB7XG5cbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICAvLyBub2RlXG4gIGlmICh0aGlzLnJlcSkge1xuICAgIHRoaXMucmVxID0gbnVsbDtcbiAgICB0aGlzLnJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB9XG5cbiAgdGhpcy5fYWJvcnRlZCA9IGZhbHNlO1xuICB0aGlzLnRpbWVkb3V0ID0gZmFsc2U7XG5cbiAgcmV0dXJuIHRoaXMuX2VuZCgpO1xufTtcblxuLyoqXG4gKiBQcm9taXNlIHN1cHBvcnRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVqZWN0XVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIHRoZW4ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gIGlmICghdGhpcy5fZnVsbGZpbGxlZFByb21pc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogc3VwZXJhZ2VudCByZXF1ZXN0IHdhcyBzZW50IHR3aWNlLCBiZWNhdXNlIGJvdGggLmVuZCgpIGFuZCAudGhlbigpIHdlcmUgY2FsbGVkLiBOZXZlciBjYWxsIC5lbmQoKSBpZiB5b3UgdXNlIHByb21pc2VzXCIpO1xuICAgIH1cbiAgICB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKGlubmVyUmVzb2x2ZSwgaW5uZXJSZWplY3QpIHtcbiAgICAgIHNlbGYuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gICAgICAgIGlmIChlcnIpIGlubmVyUmVqZWN0KGVycik7XG4gICAgICAgIGVsc2UgaW5uZXJSZXNvbHZlKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZnVsbGZpbGxlZFByb21pc2UudGhlbihyZXNvbHZlLCByZWplY3QpO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNhdGNoID0gZnVuY3Rpb24oY2IpIHtcbiAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGNiKTtcbn07XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLm9rID0gZnVuY3Rpb24oY2IpIHtcbiAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBjYikgdGhyb3cgRXJyb3IoXCJDYWxsYmFjayByZXF1aXJlZFwiKTtcbiAgdGhpcy5fb2tDYWxsYmFjayA9IGNiO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5faXNSZXNwb25zZU9LID0gZnVuY3Rpb24ocmVzKSB7XG4gIGlmICghcmVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX29rQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fb2tDYWxsYmFjayhyZXMpO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDA7XG59O1xuXG4vKipcbiAqIEdldCByZXF1ZXN0IGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgcmV0dXJuIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXG4gKiBUaGlzIGlzIGEgZGVwcmVjYXRlZCBpbnRlcm5hbCBBUEkuIFVzZSBgLmdldChmaWVsZClgIGluc3RlYWQuXG4gKlxuICogKGdldEhlYWRlciBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBzdXBlcmFnZW50IGNvZGUgYmFzZSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0SGVhZGVyID0gUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldDtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIGBmaWVsZGAgdG8gYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3QuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGZpZWxkLCB2YWwpe1xuICBpZiAoaXNPYmplY3QoZmllbGQpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGZpZWxkKSB7XG4gICAgICB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWw7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC51bnNldCgnVXNlci1BZ2VudCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0XG4gKiBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoeyBmb286ICdiYXInLCBiYXo6ICdxdXgnIH0pXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ3xCbG9ifEZpbGV8QnVmZmVyfGZzLlJlYWRTdHJlYW19IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbihuYW1lLCB2YWwpIHtcbiAgLy8gbmFtZSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIG9iamVjdC5cbiAgaWYgKG51bGwgPT09IG5hbWUgfHwgdW5kZWZpbmVkID09PSBuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSBuYW1lIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcihcIi5maWVsZCgpIGNhbid0IGJlIHVzZWQgaWYgLnNlbmQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCIpO1xuICB9XG5cbiAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgIHRoaXMuZmllbGQoa2V5LCBuYW1lW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICBmb3IgKHZhciBpIGluIHZhbCkge1xuICAgICAgdGhpcy5maWVsZChuYW1lLCB2YWxbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHZhbCBzaG91bGQgYmUgZGVmaW5lZCBub3dcbiAgaWYgKG51bGwgPT09IHZhbCB8fCB1bmRlZmluZWQgPT09IHZhbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgdmFsIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09PSB0eXBlb2YgdmFsKSB7XG4gICAgdmFsID0gJycgKyB2YWw7XG4gIH1cbiAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5fYWJvcnRlZCA9IHRydWU7XG4gIHRoaXMueGhyICYmIHRoaXMueGhyLmFib3J0KCk7IC8vIGJyb3dzZXJcbiAgdGhpcy5yZXEgJiYgdGhpcy5yZXEuYWJvcnQoKTsgLy8gbm9kZVxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcywgb3B0aW9ucywgYmFzZTY0RW5jb2Rlcikge1xuICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBiYXNlNjRFbmNvZGVyKHVzZXIgKyAnOicgKyBwYXNzKSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzcztcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYmVhcmVyJzogLy8gdXNhZ2Ugd291bGQgYmUgLmF1dGgoYWNjZXNzVG9rZW4sIHsgdHlwZTogJ2JlYXJlcicgfSlcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdXNlcik7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKG9uKSB7XG4gIC8vIFRoaXMgaXMgYnJvd3Nlci1vbmx5IGZ1bmN0aW9uYWxpdHkuIE5vZGUgc2lkZSBpcyBuby1vcC5cbiAgaWYgKG9uID09IHVuZGVmaW5lZCkgb24gPSB0cnVlO1xuICB0aGlzLl93aXRoQ3JlZGVudGlhbHMgPSBvbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWF4IHJlZGlyZWN0cyB0byBgbmAuIERvZXMgbm90aW5nIGluIGJyb3dzZXIgWEhSIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlZGlyZWN0cyA9IGZ1bmN0aW9uKG4pe1xuICB0aGlzLl9tYXhSZWRpcmVjdHMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTWF4aW11bSBzaXplIG9mIGJ1ZmZlcmVkIHJlc3BvbnNlIGJvZHksIGluIGJ5dGVzLiBDb3VudHMgdW5jb21wcmVzc2VkIHNpemUuXG4gKiBEZWZhdWx0IDIwME1CLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLm1heFJlc3BvbnNlU2l6ZSA9IGZ1bmN0aW9uKG4pe1xuICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiBuKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBhcmd1bWVudFwiKTtcbiAgfVxuICB0aGlzLl9tYXhSZXNwb25zZVNpemUgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29udmVydCB0byBhIHBsYWluIGphdmFzY3JpcHQgb2JqZWN0IChub3QgSlNPTiBzdHJpbmcpIG9mIHNjYWxhciBwcm9wZXJ0aWVzLlxuICogTm90ZSBhcyB0aGlzIG1ldGhvZCBpcyBkZXNpZ25lZCB0byByZXR1cm4gYSB1c2VmdWwgbm9uLXRoaXMgdmFsdWUsXG4gKiBpdCBjYW5ub3QgYmUgY2hhaW5lZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlc2NyaWJpbmcgbWV0aG9kLCB1cmwsIGFuZCBkYXRhIG9mIHRoaXMgcmVxdWVzdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcbiAgICB1cmw6IHRoaXMudXJsLFxuICAgIGRhdGE6IHRoaXMuX2RhdGEsXG4gICAgaGVhZGVyczogdGhpcy5faGVhZGVyLFxuICB9O1xufTtcblxuLyoqXG4gKiBTZW5kIGBkYXRhYCBhcyB0aGUgcmVxdWVzdCBib2R5LCBkZWZhdWx0aW5nIHRoZSBgLnR5cGUoKWAgdG8gXCJqc29uXCIgd2hlblxuICogYW4gb2JqZWN0IGlzIGdpdmVuLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIG1hbnVhbCBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2pzb24nKVxuICogICAgICAgICAuc2VuZCgne1wibmFtZVwiOlwidGpcIn0nKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8ganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG1hbnVhbCB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKCduYW1lPXRqJylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gZGVmYXVsdHMgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICogICAgICAgIC5zZW5kKCdzcGVjaWVzPWZlcnJldCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpe1xuICB2YXIgaXNPYmogPSBpc09iamVjdChkYXRhKTtcbiAgdmFyIHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuXG4gIGlmICh0aGlzLl9mb3JtRGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCIuc2VuZCgpIGNhbid0IGJlIHVzZWQgaWYgLmF0dGFjaCgpIG9yIC5maWVsZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIik7XG4gIH1cblxuICBpZiAoaXNPYmogJiYgIXRoaXMuX2RhdGEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IFtdO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChkYXRhICYmIHRoaXMuX2RhdGEgJiYgdGhpcy5faXNIb3N0KHRoaXMuX2RhdGEpKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJDYW4ndCBtZXJnZSB0aGVzZSBzZW5kIGNhbGxzXCIpO1xuICB9XG5cbiAgLy8gbWVyZ2VcbiAgaWYgKGlzT2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICAvLyBkZWZhdWx0IHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGlmICghdHlwZSkgdGhpcy50eXBlKCdmb3JtJyk7XG4gICAgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gdGhpcy5fZGF0YSArICcmJyArIGRhdGFcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIWlzT2JqIHx8IHRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZGVmYXVsdCB0byBqc29uXG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTb3J0IGBxdWVyeXN0cmluZ2AgYnkgdGhlIHNvcnQgZnVuY3Rpb25cbiAqXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gZGVmYXVsdCBvcmRlclxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGN1c3RvbWl6ZWQgc29ydCBmdW5jdGlvblxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoZnVuY3Rpb24oYSwgYil7XG4gKiAgICAgICAgICAgcmV0dXJuIGEubGVuZ3RoIC0gYi5sZW5ndGg7XG4gKiAgICAgICAgIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc29ydFF1ZXJ5ID0gZnVuY3Rpb24oc29ydCkge1xuICAvLyBfc29ydCBkZWZhdWx0IHRvIHRydWUgYnV0IG90aGVyd2lzZSBjYW4gYmUgYSBmdW5jdGlvbiBvciBib29sZWFuXG4gIHRoaXMuX3NvcnQgPSB0eXBlb2Ygc29ydCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogc29ydDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvbXBvc2UgcXVlcnlzdHJpbmcgdG8gYXBwZW5kIHRvIHJlcS51cmxcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9maW5hbGl6ZVF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24oKXtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5fcXVlcnkuam9pbignJicpO1xuICBpZiAocXVlcnkpIHtcbiAgICB0aGlzLnVybCArPSAodGhpcy51cmwuaW5kZXhPZignPycpID49IDAgPyAnJicgOiAnPycpICsgcXVlcnk7XG4gIH1cbiAgdGhpcy5fcXVlcnkubGVuZ3RoID0gMDsgLy8gTWFrZXMgdGhlIGNhbGwgaWRlbXBvdGVudFxuXG4gIGlmICh0aGlzLl9zb3J0KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cmwuaW5kZXhPZignPycpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB2YXIgcXVlcnlBcnIgPSB0aGlzLnVybC5zdWJzdHJpbmcoaW5kZXggKyAxKS5zcGxpdCgnJicpO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiB0aGlzLl9zb3J0KSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQodGhpcy5fc29ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeUFyci5zb3J0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IHRoaXMudXJsLnN1YnN0cmluZygwLCBpbmRleCkgKyAnPycgKyBxdWVyeUFyci5qb2luKCcmJyk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdCBvbmx5XG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2FwcGVuZFF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24oKSB7Y29uc29sZS50cmFjZShcIlVuc3VwcG9ydGVkXCIpO31cblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB0aW1lb3V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fdGltZW91dEVycm9yID0gZnVuY3Rpb24ocmVhc29uLCB0aW1lb3V0LCBlcnJubyl7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IocmVhc29uICsgdGltZW91dCArICdtcyBleGNlZWRlZCcpO1xuICBlcnIudGltZW91dCA9IHRpbWVvdXQ7XG4gIGVyci5jb2RlID0gJ0VDT05OQUJPUlRFRCc7XG4gIGVyci5lcnJubyA9IGVycm5vO1xuICB0aGlzLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgdGhpcy5hYm9ydCgpO1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3NldFRpbWVvdXRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBkZWFkbGluZVxuICBpZiAodGhpcy5fdGltZW91dCAmJiAhdGhpcy5fdGltZXIpIHtcbiAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignVGltZW91dCBvZiAnLCBzZWxmLl90aW1lb3V0LCAnRVRJTUUnKTtcbiAgICB9LCB0aGlzLl90aW1lb3V0KTtcbiAgfVxuICAvLyByZXNwb25zZSB0aW1lb3V0XG4gIGlmICh0aGlzLl9yZXNwb25zZVRpbWVvdXQgJiYgIXRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1Jlc3BvbnNlIHRpbWVvdXQgb2YgJywgc2VsZi5fcmVzcG9uc2VUaW1lb3V0LCAnRVRJTUVET1VUJyk7XG4gICAgfSwgdGhpcy5fcmVzcG9uc2VUaW1lb3V0KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlQmFzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNwb25zZUJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VCYXNlYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlQmFzZShvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gUmVzcG9uc2VCYXNlLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gUmVzcG9uc2VCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgYGZpZWxkYCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCkge1xuICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gICAgLy8gVE9ETzogbW9hciFcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYSB1dGlsXG5cbiAgICAvLyBjb250ZW50LXR5cGVcbiAgICB2YXIgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IHV0aWxzLnR5cGUoY3QpO1xuXG4gICAgLy8gcGFyYW1zXG4gICAgdmFyIHBhcmFtcyA9IHV0aWxzLnBhcmFtcyhjdCk7XG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG5cbiAgICB0aGlzLmxpbmtzID0ge307XG5cbiAgICAvLyBsaW5rc1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChoZWFkZXIubGluaykge1xuICAgICAgICAgICAgdGhpcy5saW5rcyA9IHV0aWxzLnBhcnNlTGlua3MoaGVhZGVyLmxpbmspO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgIH1cbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gICAgdmFyIHR5cGUgPSBzdGF0dXMgLyAxMDAgfCAwO1xuXG4gICAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlO1xuXG4gICAgLy8gYmFzaWNzXG4gICAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICAgIHRoaXMub2sgPSAyID09IHR5cGU7XG4gICAgdGhpcy5yZWRpcmVjdCA9IDMgPT0gdHlwZTtcbiAgICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICAgIHRoaXMuc2VydmVyRXJyb3IgPSA1ID09IHR5cGU7XG4gICAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgICAgICA/IHRoaXMudG9FcnJvcigpXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAvLyBzdWdhclxuICAgIHRoaXMuYWNjZXB0ZWQgPSAyMDIgPT0gc3RhdHVzO1xuICAgIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cztcbiAgICB0aGlzLmJhZFJlcXVlc3QgPSA0MDAgPT0gc3RhdHVzO1xuICAgIHRoaXMudW5hdXRob3JpemVkID0gNDAxID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICAgIHRoaXMuZm9yYmlkZGVuID0gNDAzID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcmFtcyA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykucmVkdWNlKGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLyk7XG4gICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgdmFyIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMaW5rIGhlYWRlciBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJzZUxpbmtzID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICosICovKS5yZWR1Y2UoZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgICB2YXIgdXJsID0gcGFydHNbMF0uc2xpY2UoMSwgLTEpO1xuICAgIHZhciByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gICAgb2JqW3JlbF0gPSB1cmw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBTdHJpcCBjb250ZW50IHJlbGF0ZWQgZmllbGRzIGZyb20gYGhlYWRlcmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuY2xlYW5IZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIsIHNob3VsZFN0cmlwQ29va2llKXtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC10eXBlJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2hvc3QnXTtcbiAgaWYgKHNob3VsZFN0cmlwQ29va2llKSB7XG4gICAgZGVsZXRlIGhlYWRlclsnY29va2llJ107XG4gIH1cbiAgcmV0dXJuIGhlYWRlcjtcbn07XG4iLCJ2YXIgVnVlIC8vIGxhdGUgYmluZFxudmFyIHZlcnNpb25cbnZhciBtYXAgPSAod2luZG93Ll9fVlVFX0hPVF9NQVBfXyA9IE9iamVjdC5jcmVhdGUobnVsbCkpXG52YXIgaW5zdGFsbGVkID0gZmFsc2VcbnZhciBpc0Jyb3dzZXJpZnkgPSBmYWxzZVxudmFyIGluaXRIb29rTmFtZSA9ICdiZWZvcmVDcmVhdGUnXG5cbmV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uICh2dWUsIGJyb3dzZXJpZnkpIHtcbiAgaWYgKGluc3RhbGxlZCkgeyByZXR1cm4gfVxuICBpbnN0YWxsZWQgPSB0cnVlXG5cbiAgVnVlID0gdnVlLl9fZXNNb2R1bGUgPyB2dWUuZGVmYXVsdCA6IHZ1ZVxuICB2ZXJzaW9uID0gVnVlLnZlcnNpb24uc3BsaXQoJy4nKS5tYXAoTnVtYmVyKVxuICBpc0Jyb3dzZXJpZnkgPSBicm93c2VyaWZ5XG5cbiAgLy8gY29tcGF0IHdpdGggPCAyLjAuMC1hbHBoYS43XG4gIGlmIChWdWUuY29uZmlnLl9saWZlY3ljbGVIb29rcy5pbmRleE9mKCdpbml0JykgPiAtMSkge1xuICAgIGluaXRIb29rTmFtZSA9ICdpbml0J1xuICB9XG5cbiAgZXhwb3J0cy5jb21wYXRpYmxlID0gdmVyc2lvblswXSA+PSAyXG4gIGlmICghZXhwb3J0cy5jb21wYXRpYmxlKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1tITVJdIFlvdSBhcmUgdXNpbmcgYSB2ZXJzaW9uIG9mIHZ1ZS1ob3QtcmVsb2FkLWFwaSB0aGF0IGlzICcgK1xuICAgICAgICAnb25seSBjb21wYXRpYmxlIHdpdGggVnVlLmpzIGNvcmUgXjIuMC4wLidcbiAgICApXG4gICAgcmV0dXJuXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSByZWNvcmQgZm9yIGEgaG90IG1vZHVsZSwgd2hpY2gga2VlcHMgdHJhY2sgb2YgaXRzIGNvbnN0cnVjdG9yXG4gKiBhbmQgaW5zdGFuY2VzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5cbmV4cG9ydHMuY3JlYXRlUmVjb3JkID0gZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7XG4gIHZhciBDdG9yID0gbnVsbFxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBDdG9yID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnNcbiAgfVxuICBtYWtlT3B0aW9uc0hvdChpZCwgb3B0aW9ucylcbiAgbWFwW2lkXSA9IHtcbiAgICBDdG9yOiBDdG9yLFxuICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgaW5zdGFuY2VzOiBbXVxuICB9XG59XG5cbi8qKlxuICogTWFrZSBhIENvbXBvbmVudCBvcHRpb25zIG9iamVjdCBob3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5cbmZ1bmN0aW9uIG1ha2VPcHRpb25zSG90KGlkLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLmZ1bmN0aW9uYWwpIHtcbiAgICB2YXIgcmVuZGVyID0gb3B0aW9ucy5yZW5kZXJcbiAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIChoLCBjdHgpIHtcbiAgICAgIHZhciBpbnN0YW5jZXMgPSBtYXBbaWRdLmluc3RhbmNlc1xuICAgICAgaWYgKGluc3RhbmNlcy5pbmRleE9mKGN0eC5wYXJlbnQpIDwgMCkge1xuICAgICAgICBpbnN0YW5jZXMucHVzaChjdHgucGFyZW50KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlcihoLCBjdHgpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGluamVjdEhvb2sob3B0aW9ucywgaW5pdEhvb2tOYW1lLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWNvcmQgPSBtYXBbaWRdXG4gICAgICBpZiAoIXJlY29yZC5DdG9yKSB7XG4gICAgICAgIHJlY29yZC5DdG9yID0gdGhpcy5jb25zdHJ1Y3RvclxuICAgICAgfVxuICAgICAgcmVjb3JkLmluc3RhbmNlcy5wdXNoKHRoaXMpXG4gICAgfSlcbiAgICBpbmplY3RIb29rKG9wdGlvbnMsICdiZWZvcmVEZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW5zdGFuY2VzID0gbWFwW2lkXS5pbnN0YW5jZXNcbiAgICAgIGluc3RhbmNlcy5zcGxpY2UoaW5zdGFuY2VzLmluZGV4T2YodGhpcyksIDEpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIEluamVjdCBhIGhvb2sgdG8gYSBob3QgcmVsb2FkYWJsZSBjb21wb25lbnQgc28gdGhhdFxuICogd2UgY2FuIGtlZXAgdHJhY2sgb2YgaXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rXG4gKi9cblxuZnVuY3Rpb24gaW5qZWN0SG9vayhvcHRpb25zLCBuYW1lLCBob29rKSB7XG4gIHZhciBleGlzdGluZyA9IG9wdGlvbnNbbmFtZV1cbiAgb3B0aW9uc1tuYW1lXSA9IGV4aXN0aW5nXG4gICAgPyBBcnJheS5pc0FycmF5KGV4aXN0aW5nKSA/IGV4aXN0aW5nLmNvbmNhdChob29rKSA6IFtleGlzdGluZywgaG9va11cbiAgICA6IFtob29rXVxufVxuXG5mdW5jdGlvbiB0cnlXcmFwKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaWQsIGFyZykge1xuICAgIHRyeSB7XG4gICAgICBmbihpZCwgYXJnKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBWdWUgY29tcG9uZW50IGhvdC1yZWxvYWQuIEZ1bGwgcmVsb2FkIHJlcXVpcmVkLidcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlT3B0aW9ucyAob2xkT3B0aW9ucywgbmV3T3B0aW9ucykge1xuICBmb3IgKHZhciBrZXkgaW4gb2xkT3B0aW9ucykge1xuICAgIGlmICghKGtleSBpbiBuZXdPcHRpb25zKSkge1xuICAgICAgZGVsZXRlIG9sZE9wdGlvbnNba2V5XVxuICAgIH1cbiAgfVxuICBmb3IgKHZhciBrZXkkMSBpbiBuZXdPcHRpb25zKSB7XG4gICAgb2xkT3B0aW9uc1trZXkkMV0gPSBuZXdPcHRpb25zW2tleSQxXVxuICB9XG59XG5cbmV4cG9ydHMucmVyZW5kZXIgPSB0cnlXcmFwKGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuICB2YXIgcmVjb3JkID0gbWFwW2lkXVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICByZWNvcmQuaW5zdGFuY2VzLnNsaWNlKCkuZm9yRWFjaChmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgIGluc3RhbmNlLiRmb3JjZVVwZGF0ZSgpXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucy5vcHRpb25zXG4gIH1cbiAgaWYgKHJlY29yZC5DdG9yKSB7XG4gICAgcmVjb3JkLkN0b3Iub3B0aW9ucy5yZW5kZXIgPSBvcHRpb25zLnJlbmRlclxuICAgIHJlY29yZC5DdG9yLm9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnNcbiAgICByZWNvcmQuaW5zdGFuY2VzLnNsaWNlKCkuZm9yRWFjaChmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgIGluc3RhbmNlLiRvcHRpb25zLnJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgICBpbnN0YW5jZS4kb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSBvcHRpb25zLnN0YXRpY1JlbmRlckZuc1xuICAgICAgLy8gcmVzZXQgc3RhdGljIHRyZWVzXG4gICAgICBpZiAoaW5zdGFuY2UuX3N0YXRpY1RyZWVzKSB7XG4gICAgICAgIC8vIHByZSAyLjUgc3RhdGljVHJlZXMgYXJlIGNhY2hlZCBwZXItaW5zdGFuY2VcbiAgICAgICAgaW5zdGFuY2UuX3N0YXRpY1RyZWVzID0gW11cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHBvc3QgMi41IHN0YXRpY1RyZWVzIGFyZSBjYWNoZWQgb24gc2hhcmVkIG9wdGlvbnNcbiAgICAgICAgcmVjb3JkLkN0b3Iub3B0aW9ucy5fc3RhdGljVHJlZXMgPSBbXVxuICAgICAgfVxuICAgICAgaW5zdGFuY2UuJGZvcmNlVXBkYXRlKClcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIC8vIGZ1bmN0aW9uYWwgb3Igbm8gaW5zdGFuY2UgY3JlYXRlZCB5ZXRcbiAgICByZWNvcmQub3B0aW9ucy5yZW5kZXIgPSBvcHRpb25zLnJlbmRlclxuICAgIHJlY29yZC5vcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zXG5cbiAgICAvLyBoYW5kbGUgZnVuY3Rpb25hbCBjb21wb25lbnQgcmUtcmVuZGVyXG4gICAgaWYgKHJlY29yZC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIHJlcmVuZGVyIHdpdGggZnVsbCBvcHRpb25zXG4gICAgICBpZiAoT2JqZWN0LmtleXMob3B0aW9ucykubGVuZ3RoID4gMikge1xuICAgICAgICB1cGRhdGVPcHRpb25zKHJlY29yZC5vcHRpb25zLCBvcHRpb25zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGVtcGxhdGUtb25seSByZXJlbmRlci5cbiAgICAgICAgLy8gbmVlZCB0byBpbmplY3QgdGhlIHN0eWxlIGluamVjdGlvbiBjb2RlIGZvciBDU1MgbW9kdWxlc1xuICAgICAgICAvLyB0byB3b3JrIHByb3Blcmx5LlxuICAgICAgICB2YXIgaW5qZWN0U3R5bGVzID0gcmVjb3JkLm9wdGlvbnMuX2luamVjdFN0eWxlc1xuICAgICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgICAgdmFyIHJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgICAgICAgcmVjb3JkLm9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gKGgsIGN0eCkge1xuICAgICAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwoY3R4KVxuICAgICAgICAgICAgcmV0dXJuIHJlbmRlcihoLCBjdHgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWNvcmQub3B0aW9ucy5fQ3RvciA9IG51bGxcbiAgICAgIHJlY29yZC5vcHRpb25zLl9zdGF0aWNUcmVlcyA9IFtdXG4gICAgICByZWNvcmQuaW5zdGFuY2VzLnNsaWNlKCkuZm9yRWFjaChmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgaW5zdGFuY2UuJGZvcmNlVXBkYXRlKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KVxuXG5leHBvcnRzLnJlbG9hZCA9IHRyeVdyYXAoZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7XG4gIHZhciByZWNvcmQgPSBtYXBbaWRdXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucy5vcHRpb25zXG4gICAgfVxuICAgIG1ha2VPcHRpb25zSG90KGlkLCBvcHRpb25zKVxuICAgIGlmIChyZWNvcmQuQ3Rvcikge1xuICAgICAgaWYgKHZlcnNpb25bMV0gPCAyKSB7XG4gICAgICAgIC8vIHByZXNlcnZlIHByZSAyLjIgYmVoYXZpb3IgZm9yIGdsb2JhbCBtaXhpbiBoYW5kbGluZ1xuICAgICAgICByZWNvcmQuQ3Rvci5leHRlbmRPcHRpb25zID0gb3B0aW9uc1xuICAgICAgfVxuICAgICAgdmFyIG5ld0N0b3IgPSByZWNvcmQuQ3Rvci5zdXBlci5leHRlbmQob3B0aW9ucylcbiAgICAgIHJlY29yZC5DdG9yLm9wdGlvbnMgPSBuZXdDdG9yLm9wdGlvbnNcbiAgICAgIHJlY29yZC5DdG9yLmNpZCA9IG5ld0N0b3IuY2lkXG4gICAgICByZWNvcmQuQ3Rvci5wcm90b3R5cGUgPSBuZXdDdG9yLnByb3RvdHlwZVxuICAgICAgaWYgKG5ld0N0b3IucmVsZWFzZSkge1xuICAgICAgICAvLyB0ZW1wb3JhcnkgZ2xvYmFsIG1peGluIHN0cmF0ZWd5IHVzZWQgaW4gPCAyLjAuMC1hbHBoYS42XG4gICAgICAgIG5ld0N0b3IucmVsZWFzZSgpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZU9wdGlvbnMocmVjb3JkLm9wdGlvbnMsIG9wdGlvbnMpXG4gICAgfVxuICB9XG4gIHJlY29yZC5pbnN0YW5jZXMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgIGlmIChpbnN0YW5jZS4kdm5vZGUgJiYgaW5zdGFuY2UuJHZub2RlLmNvbnRleHQpIHtcbiAgICAgIGluc3RhbmNlLiR2bm9kZS5jb250ZXh0LiRmb3JjZVVwZGF0ZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1Jvb3Qgb3IgbWFudWFsbHkgbW91bnRlZCBpbnN0YW5jZSBtb2RpZmllZC4gRnVsbCByZWxvYWQgcmVxdWlyZWQuJ1xuICAgICAgKVxuICAgIH1cbiAgfSlcbn0pXG4iLCIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLlZ1ZVNlbGVjdD1lKCk6dC5WdWVTZWxlY3Q9ZSgpfSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBvPW5bcl09e2V4cG9ydHM6e30saWQ6cixsb2FkZWQ6ITF9O3JldHVybiB0W3JdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLGUpLG8ubG9hZGVkPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gZS5tPXQsZS5jPW4sZS5wPVwiL1wiLGUoMCl9KFtmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5taXhpbnM9ZS5WdWVTZWxlY3Q9dm9pZCAwO3ZhciBvPW4oODMpLGk9cihvKSxhPW4oNDIpLHM9cihhKTtlLmRlZmF1bHQ9aS5kZWZhdWx0LGUuVnVlU2VsZWN0PWkuZGVmYXVsdCxlLm1peGlucz1zLmRlZmF1bHR9LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5NYXRoPT1NYXRoP3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmc2VsZi5NYXRoPT1NYXRoP3NlbGY6RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1wibnVtYmVyXCI9PXR5cGVvZiBfX2cmJihfX2c9bil9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oOSkoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30uaGFzT3duUHJvcGVydHk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIG4uY2FsbCh0LGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTApLG89bigzMyksaT1uKDI1KSxhPU9iamVjdC5kZWZpbmVQcm9wZXJ0eTtlLmY9bigyKT9PYmplY3QuZGVmaW5lUHJvcGVydHk6ZnVuY3Rpb24odCxlLG4pe2lmKHIodCksZT1pKGUsITApLHIobiksbyl0cnl7cmV0dXJuIGEodCxlLG4pfWNhdGNoKHQpe31pZihcImdldFwiaW4gbnx8XCJzZXRcImluIG4pdGhyb3cgVHlwZUVycm9yKFwiQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhXCIpO3JldHVyblwidmFsdWVcImluIG4mJih0W2VdPW4udmFsdWUpLHR9fSxmdW5jdGlvbih0LGUpe3ZhciBuPXQuZXhwb3J0cz17dmVyc2lvbjpcIjIuNS4xXCJ9O1wibnVtYmVyXCI9PXR5cGVvZiBfX2UmJihfX2U9bil9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQpLG89bigxNCk7dC5leHBvcnRzPW4oMik/ZnVuY3Rpb24odCxlLG4pe3JldHVybiByLmYodCxlLG8oMSxuKSl9OmZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdFtlXT1uLHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1OSksbz1uKDE2KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHIobyh0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMykoXCJ3a3NcIiksbz1uKDE1KSxpPW4oMSkuU3ltYm9sLGE9XCJmdW5jdGlvblwiPT10eXBlb2YgaSxzPXQuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gclt0XXx8KHJbdF09YSYmaVt0XXx8KGE/aTpvKShcIlN5bWJvbC5cIit0KSl9O3Muc3RvcmU9cn0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dHJ5e3JldHVybiEhdCgpfWNhdGNoKHQpe3JldHVybiEwfX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEyKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYoIXIodCkpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGFuIG9iamVjdCFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxKSxvPW4oNSksaT1uKDU2KSxhPW4oNikscz1cInByb3RvdHlwZVwiLHU9ZnVuY3Rpb24odCxlLG4pe3ZhciBsLGMsZixwPXQmdS5GLGQ9dCZ1LkcsaD10JnUuUyxiPXQmdS5QLHY9dCZ1LkIsZz10JnUuVyx5PWQ/bzpvW2VdfHwob1tlXT17fSksbT15W3NdLHg9ZD9yOmg/cltlXToocltlXXx8e30pW3NdO2QmJihuPWUpO2ZvcihsIGluIG4pYz0hcCYmeCYmdm9pZCAwIT09eFtsXSxjJiZsIGluIHl8fChmPWM/eFtsXTpuW2xdLHlbbF09ZCYmXCJmdW5jdGlvblwiIT10eXBlb2YgeFtsXT9uW2xdOnYmJmM/aShmLHIpOmcmJnhbbF09PWY/ZnVuY3Rpb24odCl7dmFyIGU9ZnVuY3Rpb24oZSxuLHIpe2lmKHRoaXMgaW5zdGFuY2VvZiB0KXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuZXcgdDtjYXNlIDE6cmV0dXJuIG5ldyB0KGUpO2Nhc2UgMjpyZXR1cm4gbmV3IHQoZSxuKX1yZXR1cm4gbmV3IHQoZSxuLHIpfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX07cmV0dXJuIGVbc109dFtzXSxlfShmKTpiJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBmP2koRnVuY3Rpb24uY2FsbCxmKTpmLGImJigoeS52aXJ0dWFsfHwoeS52aXJ0dWFsPXt9KSlbbF09Zix0JnUuUiYmbSYmIW1bbF0mJmEobSxsLGYpKSl9O3UuRj0xLHUuRz0yLHUuUz00LHUuUD04LHUuQj0xNix1Llc9MzIsdS5VPTY0LHUuUj0xMjgsdC5leHBvcnRzPXV9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiB0P251bGwhPT10OlwiZnVuY3Rpb25cIj09dHlwZW9mIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzOCksbz1uKDE3KTt0LmV4cG9ydHM9T2JqZWN0LmtleXN8fGZ1bmN0aW9uKHQpe3JldHVybiByKHQsbyl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybntlbnVtZXJhYmxlOiEoMSZ0KSxjb25maWd1cmFibGU6ISgyJnQpLHdyaXRhYmxlOiEoNCZ0KSx2YWx1ZTplfX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49MCxyPU1hdGgucmFuZG9tKCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwiU3ltYm9sKFwiLmNvbmNhdCh2b2lkIDA9PT10P1wiXCI6dCxcIilfXCIsKCsrbityKS50b1N0cmluZygzNikpfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYodm9pZCAwPT10KXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIit0KTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPVwiY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mXCIuc3BsaXQoXCIsXCIpfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz17fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ITB9LGZ1bmN0aW9uKHQsZSl7ZS5mPXt9LnByb3BlcnR5SXNFbnVtZXJhYmxlfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0KS5mLG89bigzKSxpPW4oOCkoXCJ0b1N0cmluZ1RhZ1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3QmJiFvKHQ9bj90OnQucHJvdG90eXBlLGkpJiZyKHQsaSx7Y29uZmlndXJhYmxlOiEwLHZhbHVlOmV9KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIzKShcImtleXNcIiksbz1uKDE1KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHJbdF18fChyW3RdPW8odCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksbz1cIl9fY29yZS1qc19zaGFyZWRfX1wiLGk9cltvXXx8KHJbb109e30pO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaVt0XXx8KGlbdF09e30pfX0sZnVuY3Rpb24odCxlKXt2YXIgbj1NYXRoLmNlaWwscj1NYXRoLmZsb29yO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaXNOYU4odD0rdCk/MDoodD4wP3I6bikodCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7aWYoIXIodCkpcmV0dXJuIHQ7dmFyIG4sbztpZihlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudG9TdHJpbmcpJiYhcihvPW4uY2FsbCh0KSkpcmV0dXJuIG87aWYoXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnZhbHVlT2YpJiYhcihvPW4uY2FsbCh0KSkpcmV0dXJuIG87aWYoIWUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFyKG89bi5jYWxsKHQpKSlyZXR1cm4gbzt0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIil9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxKSxvPW4oNSksaT1uKDE5KSxhPW4oMjcpLHM9big0KS5mO3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZT1vLlN5bWJvbHx8KG8uU3ltYm9sPWk/e306ci5TeW1ib2x8fHt9KTtcIl9cIj09dC5jaGFyQXQoMCl8fHQgaW4gZXx8cyhlLHQse3ZhbHVlOmEuZih0KX0pfX0sZnVuY3Rpb24odCxlLG4pe2UuZj1uKDgpfSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz17cHJvcHM6e2xvYWRpbmc6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxvblNlYXJjaDp7dHlwZTpGdW5jdGlvbixkZWZhdWx0OmZ1bmN0aW9uKHQsZSl7fX19LGRhdGE6ZnVuY3Rpb24oKXtyZXR1cm57bXV0YWJsZUxvYWRpbmc6ITF9fSx3YXRjaDp7c2VhcmNoOmZ1bmN0aW9uKCl7dGhpcy5zZWFyY2gubGVuZ3RoPjAmJih0aGlzLm9uU2VhcmNoKHRoaXMuc2VhcmNoLHRoaXMudG9nZ2xlTG9hZGluZyksdGhpcy4kZW1pdChcInNlYXJjaFwiLHRoaXMuc2VhcmNoLHRoaXMudG9nZ2xlTG9hZGluZykpfSxsb2FkaW5nOmZ1bmN0aW9uKHQpe3RoaXMubXV0YWJsZUxvYWRpbmc9dH19LG1ldGhvZHM6e3RvZ2dsZUxvYWRpbmc6ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06bnVsbDtyZXR1cm4gbnVsbD09dD90aGlzLm11dGFibGVMb2FkaW5nPSF0aGlzLm11dGFibGVMb2FkaW5nOnRoaXMubXV0YWJsZUxvYWRpbmc9dH19fX0sZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9e3dhdGNoOnt0eXBlQWhlYWRQb2ludGVyOmZ1bmN0aW9uKCl7dGhpcy5tYXliZUFkanVzdFNjcm9sbCgpfX0sbWV0aG9kczp7bWF5YmVBZGp1c3RTY3JvbGw6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnBpeGVsc1RvUG9pbnRlclRvcCgpLGU9dGhpcy5waXhlbHNUb1BvaW50ZXJCb3R0b20oKTtyZXR1cm4gdDw9dGhpcy52aWV3cG9ydCgpLnRvcD90aGlzLnNjcm9sbFRvKHQpOmU+PXRoaXMudmlld3BvcnQoKS5ib3R0b20/dGhpcy5zY3JvbGxUbyh0aGlzLnZpZXdwb3J0KCkudG9wK3RoaXMucG9pbnRlckhlaWdodCgpKTp2b2lkIDB9LHBpeGVsc1RvUG9pbnRlclRvcDpmdW5jdGlvbiB0KCl7dmFyIHQ9MDtpZih0aGlzLiRyZWZzLmRyb3Bkb3duTWVudSlmb3IodmFyIGU9MDtlPHRoaXMudHlwZUFoZWFkUG9pbnRlcjtlKyspdCs9dGhpcy4kcmVmcy5kcm9wZG93bk1lbnUuY2hpbGRyZW5bZV0ub2Zmc2V0SGVpZ2h0O3JldHVybiB0fSxwaXhlbHNUb1BvaW50ZXJCb3R0b206ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5waXhlbHNUb1BvaW50ZXJUb3AoKSt0aGlzLnBvaW50ZXJIZWlnaHQoKX0scG9pbnRlckhlaWdodDpmdW5jdGlvbigpe3ZhciB0PSEhdGhpcy4kcmVmcy5kcm9wZG93bk1lbnUmJnRoaXMuJHJlZnMuZHJvcGRvd25NZW51LmNoaWxkcmVuW3RoaXMudHlwZUFoZWFkUG9pbnRlcl07cmV0dXJuIHQ/dC5vZmZzZXRIZWlnaHQ6MH0sdmlld3BvcnQ6ZnVuY3Rpb24oKXtyZXR1cm57dG9wOnRoaXMuJHJlZnMuZHJvcGRvd25NZW51P3RoaXMuJHJlZnMuZHJvcGRvd25NZW51LnNjcm9sbFRvcDowLGJvdHRvbTp0aGlzLiRyZWZzLmRyb3Bkb3duTWVudT90aGlzLiRyZWZzLmRyb3Bkb3duTWVudS5vZmZzZXRIZWlnaHQrdGhpcy4kcmVmcy5kcm9wZG93bk1lbnUuc2Nyb2xsVG9wOjB9fSxzY3JvbGxUbzpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy4kcmVmcy5kcm9wZG93bk1lbnU/dGhpcy4kcmVmcy5kcm9wZG93bk1lbnUuc2Nyb2xsVG9wPXQ6bnVsbH19fX0sZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9e2RhdGE6ZnVuY3Rpb24oKXtyZXR1cm57dHlwZUFoZWFkUG9pbnRlcjotMX19LHdhdGNoOntmaWx0ZXJlZE9wdGlvbnM6ZnVuY3Rpb24oKXt0aGlzLnR5cGVBaGVhZFBvaW50ZXI9MH19LG1ldGhvZHM6e3R5cGVBaGVhZFVwOmZ1bmN0aW9uKCl7dGhpcy50eXBlQWhlYWRQb2ludGVyPjAmJih0aGlzLnR5cGVBaGVhZFBvaW50ZXItLSx0aGlzLm1heWJlQWRqdXN0U2Nyb2xsJiZ0aGlzLm1heWJlQWRqdXN0U2Nyb2xsKCkpfSx0eXBlQWhlYWREb3duOmZ1bmN0aW9uKCl7dGhpcy50eXBlQWhlYWRQb2ludGVyPHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aC0xJiYodGhpcy50eXBlQWhlYWRQb2ludGVyKyssdGhpcy5tYXliZUFkanVzdFNjcm9sbCYmdGhpcy5tYXliZUFkanVzdFNjcm9sbCgpKX0sdHlwZUFoZWFkU2VsZWN0OmZ1bmN0aW9uKCl7dGhpcy5maWx0ZXJlZE9wdGlvbnNbdGhpcy50eXBlQWhlYWRQb2ludGVyXT90aGlzLnNlbGVjdCh0aGlzLmZpbHRlcmVkT3B0aW9uc1t0aGlzLnR5cGVBaGVhZFBvaW50ZXJdKTp0aGlzLnRhZ2dhYmxlJiZ0aGlzLnNlYXJjaC5sZW5ndGgmJnRoaXMuc2VsZWN0KHRoaXMuc2VhcmNoKSx0aGlzLmNsZWFyU2VhcmNoT25TZWxlY3QmJih0aGlzLnNlYXJjaD1cIlwiKX19fX0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS50b1N0cmluZzt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIG4uY2FsbCh0KS5zbGljZSg4LC0xKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEyKSxvPW4oMSkuZG9jdW1lbnQsaT1yKG8pJiZyKG8uY3JlYXRlRWxlbWVudCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpP28uY3JlYXRlRWxlbWVudCh0KTp7fX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oMikmJiFuKDkpKGZ1bmN0aW9uKCl7cmV0dXJuIDchPU9iamVjdC5kZWZpbmVQcm9wZXJ0eShuKDMyKShcImRpdlwiKSxcImFcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIDd9fSkuYX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxOSksbz1uKDExKSxpPW4oMzkpLGE9big2KSxzPW4oMyksdT1uKDE4KSxsPW4oNjEpLGM9bigyMSksZj1uKDY3KSxwPW4oOCkoXCJpdGVyYXRvclwiKSxkPSEoW10ua2V5cyYmXCJuZXh0XCJpbltdLmtleXMoKSksaD1cIkBAaXRlcmF0b3JcIixiPVwia2V5c1wiLHY9XCJ2YWx1ZXNcIixnPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbix5LG0seCx3KXtsKG4sZSx5KTt2YXIgUyxPLF8saj1mdW5jdGlvbih0KXtpZighZCYmdCBpbiBNKXJldHVybiBNW3RdO3N3aXRjaCh0KXtjYXNlIGI6cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9O2Nhc2UgdjpyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9fSxQPWUrXCIgSXRlcmF0b3JcIixrPW09PXYsQT0hMSxNPXQucHJvdG90eXBlLEw9TVtwXXx8TVtoXXx8bSYmTVttXSxDPUx8fGoobSksVD1tP2s/aihcImVudHJpZXNcIik6Qzp2b2lkIDAsRT1cIkFycmF5XCI9PWU/TS5lbnRyaWVzfHxMOkw7aWYoRSYmKF89ZihFLmNhbGwobmV3IHQpKSxfIT09T2JqZWN0LnByb3RvdHlwZSYmXy5uZXh0JiYoYyhfLFAsITApLHJ8fHMoXyxwKXx8YShfLHAsZykpKSxrJiZMJiZMLm5hbWUhPT12JiYoQT0hMCxDPWZ1bmN0aW9uKCl7cmV0dXJuIEwuY2FsbCh0aGlzKX0pLHImJiF3fHwhZCYmIUEmJk1bcF18fGEoTSxwLEMpLHVbZV09Qyx1W1BdPWcsbSlpZihTPXt2YWx1ZXM6az9DOmoodiksa2V5czp4P0M6aihiKSxlbnRyaWVzOlR9LHcpZm9yKE8gaW4gUylPIGluIE18fGkoTSxPLFNbT10pO2Vsc2UgbyhvLlArby5GKihkfHxBKSxlLFMpO3JldHVybiBTfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTApLG89big2NCksaT1uKDE3KSxhPW4oMjIpKFwiSUVfUFJPVE9cIikscz1mdW5jdGlvbigpe30sdT1cInByb3RvdHlwZVwiLGw9ZnVuY3Rpb24oKXt2YXIgdCxlPW4oMzIpKFwiaWZyYW1lXCIpLHI9aS5sZW5ndGgsbz1cIjxcIixhPVwiPlwiO2ZvcihlLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsbig1OCkuYXBwZW5kQ2hpbGQoZSksZS5zcmM9XCJqYXZhc2NyaXB0OlwiLHQ9ZS5jb250ZW50V2luZG93LmRvY3VtZW50LHQub3BlbigpLHQud3JpdGUobytcInNjcmlwdFwiK2ErXCJkb2N1bWVudC5GPU9iamVjdFwiK28rXCIvc2NyaXB0XCIrYSksdC5jbG9zZSgpLGw9dC5GO3ItLTspZGVsZXRlIGxbdV1baVtyXV07cmV0dXJuIGwoKX07dC5leHBvcnRzPU9iamVjdC5jcmVhdGV8fGZ1bmN0aW9uKHQsZSl7dmFyIG47cmV0dXJuIG51bGwhPT10PyhzW3VdPXIodCksbj1uZXcgcyxzW3VdPW51bGwsblthXT10KTpuPWwoKSx2b2lkIDA9PT1lP246byhuLGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzgpLG89bigxNykuY29uY2F0KFwibGVuZ3RoXCIsXCJwcm90b3R5cGVcIik7ZS5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzfHxmdW5jdGlvbih0KXtyZXR1cm4gcih0LG8pfX0sZnVuY3Rpb24odCxlKXtlLmY9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc30sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMyksbz1uKDcpLGk9big1NSkoITEpLGE9bigyMikoXCJJRV9QUk9UT1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbixzPW8odCksdT0wLGw9W107Zm9yKG4gaW4gcyluIT1hJiZyKHMsbikmJmwucHVzaChuKTtmb3IoO2UubGVuZ3RoPnU7KXIocyxuPWVbdSsrXSkmJih+aShsLG4pfHxsLnB1c2gobikpO3JldHVybiBsfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDYpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBPYmplY3Qocih0KSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89big0NCksaT1yKG8pLGE9big0Nykscz1yKGEpLHU9big0OCksbD1yKHUpLGM9bigyOSksZj1yKGMpLHA9bigzMCksZD1yKHApLGg9bigyOCksYj1yKGgpO2UuZGVmYXVsdD17bWl4aW5zOltmLmRlZmF1bHQsZC5kZWZhdWx0LGIuZGVmYXVsdF0scHJvcHM6e3ZhbHVlOntkZWZhdWx0Om51bGx9LG9wdGlvbnM6e3R5cGU6QXJyYXksZGVmYXVsdDpmdW5jdGlvbigpe3JldHVybltdfX0sZGlzYWJsZWQ6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxtYXhIZWlnaHQ6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCI0MDBweFwifSxzZWFyY2hhYmxlOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sbXVsdGlwbGU6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxwbGFjZWhvbGRlcjp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIlwifSx0cmFuc2l0aW9uOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiZmFkZVwifSxjbGVhclNlYXJjaE9uU2VsZWN0Ont0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sY2xvc2VPblNlbGVjdDp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LGxhYmVsOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwibGFiZWxcIn0sZ2V0T3B0aW9uTGFiZWw6e3R5cGU6RnVuY3Rpb24sZGVmYXVsdDpmdW5jdGlvbih0KXtyZXR1cm5cIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6KDAsbC5kZWZhdWx0KSh0KSkmJnRoaXMubGFiZWwmJnRbdGhpcy5sYWJlbF0/dFt0aGlzLmxhYmVsXTp0fX0sb25DaGFuZ2U6e3R5cGU6RnVuY3Rpb24sZGVmYXVsdDpmdW5jdGlvbih0KXt0aGlzLiRlbWl0KFwiaW5wdXRcIix0KX19LHRhZ2dhYmxlOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0scHVzaFRhZ3M6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxjcmVhdGVPcHRpb246e3R5cGU6RnVuY3Rpb24sZGVmYXVsdDpmdW5jdGlvbih0KXtyZXR1cm5cIm9iamVjdFwiPT09KDAsbC5kZWZhdWx0KSh0aGlzLm11dGFibGVPcHRpb25zWzBdKSYmKHQ9KDAscy5kZWZhdWx0KSh7fSx0aGlzLmxhYmVsLHQpKSx0aGlzLiRlbWl0KFwib3B0aW9uOmNyZWF0ZWRcIix0KSx0fX0scmVzZXRPbk9wdGlvbnNDaGFuZ2U6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxub0Ryb3A6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxpbnB1dElkOnt0eXBlOlN0cmluZ30sZGlyOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiYXV0b1wifX0sZGF0YTpmdW5jdGlvbigpe3JldHVybntzZWFyY2g6XCJcIixvcGVuOiExLG11dGFibGVWYWx1ZTpudWxsLG11dGFibGVPcHRpb25zOltdfX0sd2F0Y2g6e3ZhbHVlOmZ1bmN0aW9uKHQpe3RoaXMubXV0YWJsZVZhbHVlPXR9LG11dGFibGVWYWx1ZTpmdW5jdGlvbih0LGUpe3RoaXMubXVsdGlwbGU/dGhpcy5vbkNoYW5nZT90aGlzLm9uQ2hhbmdlKHQpOm51bGw6dGhpcy5vbkNoYW5nZSYmdCE9PWU/dGhpcy5vbkNoYW5nZSh0KTpudWxsfSxvcHRpb25zOmZ1bmN0aW9uKHQpe3RoaXMubXV0YWJsZU9wdGlvbnM9dH0sbXV0YWJsZU9wdGlvbnM6ZnVuY3Rpb24oKXshdGhpcy50YWdnYWJsZSYmdGhpcy5yZXNldE9uT3B0aW9uc0NoYW5nZSYmKHRoaXMubXV0YWJsZVZhbHVlPXRoaXMubXVsdGlwbGU/W106bnVsbCl9LG11bHRpcGxlOmZ1bmN0aW9uKHQpe3RoaXMubXV0YWJsZVZhbHVlPXQ/W106bnVsbH19LGNyZWF0ZWQ6ZnVuY3Rpb24oKXt0aGlzLm11dGFibGVWYWx1ZT10aGlzLnZhbHVlLHRoaXMubXV0YWJsZU9wdGlvbnM9dGhpcy5vcHRpb25zLnNsaWNlKDApLHRoaXMubXV0YWJsZUxvYWRpbmc9dGhpcy5sb2FkaW5nLHRoaXMuJG9uKFwib3B0aW9uOmNyZWF0ZWRcIix0aGlzLm1heWJlUHVzaFRhZyl9LG1ldGhvZHM6e3NlbGVjdDpmdW5jdGlvbih0KXt0aGlzLmlzT3B0aW9uU2VsZWN0ZWQodCk/dGhpcy5kZXNlbGVjdCh0KToodGhpcy50YWdnYWJsZSYmIXRoaXMub3B0aW9uRXhpc3RzKHQpJiYodD10aGlzLmNyZWF0ZU9wdGlvbih0KSksdGhpcy5tdWx0aXBsZSYmIXRoaXMubXV0YWJsZVZhbHVlP3RoaXMubXV0YWJsZVZhbHVlPVt0XTp0aGlzLm11bHRpcGxlP3RoaXMubXV0YWJsZVZhbHVlLnB1c2godCk6dGhpcy5tdXRhYmxlVmFsdWU9dCksdGhpcy5vbkFmdGVyU2VsZWN0KHQpfSxkZXNlbGVjdDpmdW5jdGlvbih0KXt2YXIgZT10aGlzO2lmKHRoaXMubXVsdGlwbGUpe3ZhciBuPS0xO3RoaXMubXV0YWJsZVZhbHVlLmZvckVhY2goZnVuY3Rpb24ocil7KHI9PT10fHxcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiByP1widW5kZWZpbmVkXCI6KDAsbC5kZWZhdWx0KShyKSkmJnJbZS5sYWJlbF09PT10W2UubGFiZWxdKSYmKG49cil9KTt2YXIgcj10aGlzLm11dGFibGVWYWx1ZS5pbmRleE9mKG4pO3RoaXMubXV0YWJsZVZhbHVlLnNwbGljZShyLDEpfWVsc2UgdGhpcy5tdXRhYmxlVmFsdWU9bnVsbH0sb25BZnRlclNlbGVjdDpmdW5jdGlvbih0KXt0aGlzLmNsb3NlT25TZWxlY3QmJih0aGlzLm9wZW49IXRoaXMub3Blbix0aGlzLiRyZWZzLnNlYXJjaC5ibHVyKCkpLHRoaXMuY2xlYXJTZWFyY2hPblNlbGVjdCYmKHRoaXMuc2VhcmNoPVwiXCIpfSx0b2dnbGVEcm9wZG93bjpmdW5jdGlvbih0KXt0LnRhcmdldCE9PXRoaXMuJHJlZnMub3BlbkluZGljYXRvciYmdC50YXJnZXQhPT10aGlzLiRyZWZzLnNlYXJjaCYmdC50YXJnZXQhPT10aGlzLiRyZWZzLnRvZ2dsZSYmdC50YXJnZXQhPT10aGlzLiRlbHx8KHRoaXMub3Blbj90aGlzLiRyZWZzLnNlYXJjaC5ibHVyKCk6dGhpcy5kaXNhYmxlZHx8KHRoaXMub3Blbj0hMCx0aGlzLiRyZWZzLnNlYXJjaC5mb2N1cygpKSl9LGlzT3B0aW9uU2VsZWN0ZWQ6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcztpZih0aGlzLm11bHRpcGxlJiZ0aGlzLm11dGFibGVWYWx1ZSl7dmFyIG49ITE7cmV0dXJuIHRoaXMubXV0YWJsZVZhbHVlLmZvckVhY2goZnVuY3Rpb24ocil7XCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2Ygcj9cInVuZGVmaW5lZFwiOigwLGwuZGVmYXVsdCkocikpJiZyW2UubGFiZWxdPT09dFtlLmxhYmVsXT9uPSEwOlwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHI/XCJ1bmRlZmluZWRcIjooMCxsLmRlZmF1bHQpKHIpKSYmcltlLmxhYmVsXT09PXQ/bj0hMDpyPT09dCYmKG49ITApfSksbn1yZXR1cm4gdGhpcy5tdXRhYmxlVmFsdWU9PT10fSxvbkVzY2FwZTpmdW5jdGlvbigpe3RoaXMuc2VhcmNoLmxlbmd0aD90aGlzLnNlYXJjaD1cIlwiOnRoaXMuJHJlZnMuc2VhcmNoLmJsdXIoKX0sb25TZWFyY2hCbHVyOmZ1bmN0aW9uKCl7dGhpcy5jbGVhclNlYXJjaE9uQmx1ciYmKHRoaXMuc2VhcmNoPVwiXCIpLHRoaXMub3Blbj0hMSx0aGlzLiRlbWl0KFwic2VhcmNoOmJsdXJcIil9LG9uU2VhcmNoRm9jdXM6ZnVuY3Rpb24oKXt0aGlzLm9wZW49ITAsdGhpcy4kZW1pdChcInNlYXJjaDpmb2N1c1wiKX0sbWF5YmVEZWxldGVWYWx1ZTpmdW5jdGlvbigpe2lmKCF0aGlzLiRyZWZzLnNlYXJjaC52YWx1ZS5sZW5ndGgmJnRoaXMubXV0YWJsZVZhbHVlKXJldHVybiB0aGlzLm11bHRpcGxlP3RoaXMubXV0YWJsZVZhbHVlLnBvcCgpOnRoaXMubXV0YWJsZVZhbHVlPW51bGx9LG9wdGlvbkV4aXN0czpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49ITE7cmV0dXJuIHRoaXMubXV0YWJsZU9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihyKXtcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiByP1widW5kZWZpbmVkXCI6KDAsbC5kZWZhdWx0KShyKSkmJnJbZS5sYWJlbF09PT10P249ITA6cj09PXQmJihuPSEwKX0pLG59LG1heWJlUHVzaFRhZzpmdW5jdGlvbih0KXt0aGlzLnB1c2hUYWdzJiZ0aGlzLm11dGFibGVPcHRpb25zLnB1c2godCl9fSxjb21wdXRlZDp7ZHJvcGRvd25DbGFzc2VzOmZ1bmN0aW9uKCl7cmV0dXJue29wZW46dGhpcy5kcm9wZG93bk9wZW4sc2luZ2xlOiF0aGlzLm11bHRpcGxlLHNlYXJjaGluZzp0aGlzLnNlYXJjaGluZyxzZWFyY2hhYmxlOnRoaXMuc2VhcmNoYWJsZSx1bnNlYXJjaGFibGU6IXRoaXMuc2VhcmNoYWJsZSxsb2FkaW5nOnRoaXMubXV0YWJsZUxvYWRpbmcscnRsOlwicnRsXCI9PT10aGlzLmRpcn19LGNsZWFyU2VhcmNoT25CbHVyOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2xlYXJTZWFyY2hPblNlbGVjdCYmIXRoaXMubXVsdGlwbGV9LHNlYXJjaGluZzpmdW5jdGlvbigpe3JldHVybiEhdGhpcy5zZWFyY2h9LGRyb3Bkb3duT3BlbjpmdW5jdGlvbigpe3JldHVybiF0aGlzLm5vRHJvcCYmKHRoaXMub3BlbiYmIXRoaXMubXV0YWJsZUxvYWRpbmcpfSxzZWFyY2hQbGFjZWhvbGRlcjpmdW5jdGlvbigpe2lmKHRoaXMuaXNWYWx1ZUVtcHR5JiZ0aGlzLnBsYWNlaG9sZGVyKXJldHVybiB0aGlzLnBsYWNlaG9sZGVyfSxmaWx0ZXJlZE9wdGlvbnM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLGU9dGhpcy5tdXRhYmxlT3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuXCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOigwLGwuZGVmYXVsdCkoZSkpJiZlLmhhc093blByb3BlcnR5KHQubGFiZWwpP2VbdC5sYWJlbF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHQuc2VhcmNoLnRvTG93ZXJDYXNlKCkpPi0xOlwib2JqZWN0XCIhPT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjooMCxsLmRlZmF1bHQpKGUpKXx8ZS5oYXNPd25Qcm9wZXJ0eSh0LmxhYmVsKT9lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0LnNlYXJjaC50b0xvd2VyQ2FzZSgpKT4tMTpjb25zb2xlLndhcm4oJ1t2dWUtc2VsZWN0IHdhcm5dOiBMYWJlbCBrZXkgXCJvcHRpb24uJyt0LmxhYmVsKydcIiBkb2VzIG5vdCBleGlzdCBpbiBvcHRpb25zIG9iamVjdC5cXG5odHRwOi8vc2FnYWxib3QuZ2l0aHViLmlvL3Z1ZS1zZWxlY3QvI2V4LWxhYmVscycpfSk7cmV0dXJuIHRoaXMudGFnZ2FibGUmJnRoaXMuc2VhcmNoLmxlbmd0aCYmIXRoaXMub3B0aW9uRXhpc3RzKHRoaXMuc2VhcmNoKSYmZS51bnNoaWZ0KHRoaXMuc2VhcmNoKSxlfSxpc1ZhbHVlRW1wdHk6ZnVuY3Rpb24oKXtyZXR1cm4hdGhpcy5tdXRhYmxlVmFsdWV8fChcIm9iamVjdFwiPT09KDAsbC5kZWZhdWx0KSh0aGlzLm11dGFibGVWYWx1ZSk/ISgwLGkuZGVmYXVsdCkodGhpcy5tdXRhYmxlVmFsdWUpLmxlbmd0aDohdGhpcy5tdXRhYmxlVmFsdWUubGVuZ3RoKX0sdmFsdWVBc0FycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubXVsdGlwbGU/dGhpcy5tdXRhYmxlVmFsdWU6dGhpcy5tdXRhYmxlVmFsdWU/W3RoaXMubXV0YWJsZVZhbHVlXTpbXX19fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMjgpLGk9cihvKSxhPW4oMzApLHM9cihhKSx1PW4oMjkpLGw9cih1KTtlLmRlZmF1bHQ9e2FqYXg6aS5kZWZhdWx0LHBvaW50ZXI6cy5kZWZhdWx0LHBvaW50ZXJTY3JvbGw6bC5kZWZhdWx0fX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDQ5KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDUwKSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDUxKSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDUyKSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWUuX19lc01vZHVsZT0hMDt2YXIgbz1uKDQzKSxpPXIobyk7ZS5kZWZhdWx0PWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gZSBpbiB0PygwLGkuZGVmYXVsdCkodCxlLHt2YWx1ZTpuLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6dFtlXT1uLHR9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZS5fX2VzTW9kdWxlPSEwO3ZhciBvPW4oNDYpLGk9cihvKSxhPW4oNDUpLHM9cihhKSx1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHMuZGVmYXVsdCYmXCJzeW1ib2xcIj09dHlwZW9mIGkuZGVmYXVsdD9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBzLmRlZmF1bHQmJnQuY29uc3RydWN0b3I9PT1zLmRlZmF1bHQmJnQhPT1zLmRlZmF1bHQucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9O2UuZGVmYXVsdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBzLmRlZmF1bHQmJlwic3ltYm9sXCI9PT11KGkuZGVmYXVsdCk/ZnVuY3Rpb24odCl7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQ/XCJ1bmRlZmluZWRcIjp1KHQpfTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2Ygcy5kZWZhdWx0JiZ0LmNvbnN0cnVjdG9yPT09cy5kZWZhdWx0JiZ0IT09cy5kZWZhdWx0LnByb3RvdHlwZT9cInN5bWJvbFwiOlwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6dSh0KX19LGZ1bmN0aW9uKHQsZSxuKXtuKDczKTt2YXIgcj1uKDUpLk9iamVjdDt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3JldHVybiByLmRlZmluZVByb3BlcnR5KHQsZSxuKX19LGZ1bmN0aW9uKHQsZSxuKXtuKDc0KSx0LmV4cG9ydHM9big1KS5PYmplY3Qua2V5c30sZnVuY3Rpb24odCxlLG4pe24oNzcpLG4oNzUpLG4oNzgpLG4oNzkpLHQuZXhwb3J0cz1uKDUpLlN5bWJvbH0sZnVuY3Rpb24odCxlLG4pe24oNzYpLG4oODApLHQuZXhwb3J0cz1uKDI3KS5mKFwiaXRlcmF0b3JcIil9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgZnVuY3Rpb24hXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big3KSxvPW4oNzEpLGk9big3MCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlLG4sYSl7dmFyIHMsdT1yKGUpLGw9byh1Lmxlbmd0aCksYz1pKGEsbCk7aWYodCYmbiE9bil7Zm9yKDtsPmM7KWlmKHM9dVtjKytdLHMhPXMpcmV0dXJuITB9ZWxzZSBmb3IoO2w+YztjKyspaWYoKHR8fGMgaW4gdSkmJnVbY109PT1uKXJldHVybiB0fHxjfHwwO3JldHVybiF0JiYtMX19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1Myk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtpZihyKHQpLHZvaWQgMD09PWUpcmV0dXJuIHQ7c3dpdGNoKG4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbChlLG4pfTtjYXNlIDI6cmV0dXJuIGZ1bmN0aW9uKG4scil7cmV0dXJuIHQuY2FsbChlLG4scil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLG8pe3JldHVybiB0LmNhbGwoZSxuLHIsbyl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KGUsYXJndW1lbnRzKX19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMyksbz1uKDM3KSxpPW4oMjApO3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZT1yKHQpLG49by5mO2lmKG4pZm9yKHZhciBhLHM9bih0KSx1PWkuZixsPTA7cy5sZW5ndGg+bDspdS5jYWxsKHQsYT1zW2wrK10pJiZlLnB1c2goYSk7cmV0dXJuIGV9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxKS5kb2N1bWVudDt0LmV4cG9ydHM9ciYmci5kb2N1bWVudEVsZW1lbnR9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMxKTt0LmV4cG9ydHM9T2JqZWN0KFwielwiKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKT9PYmplY3Q6ZnVuY3Rpb24odCl7cmV0dXJuXCJTdHJpbmdcIj09cih0KT90LnNwbGl0KFwiXCIpOk9iamVjdCh0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMxKTt0LmV4cG9ydHM9QXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24odCl7cmV0dXJuXCJBcnJheVwiPT1yKHQpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMzUpLG89bigxNCksaT1uKDIxKSxhPXt9O24oNikoYSxuKDgpKFwiaXRlcmF0b3JcIiksZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pLHQuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dC5wcm90b3R5cGU9cihhLHtuZXh0Om8oMSxuKX0pLGkodCxlK1wiIEl0ZXJhdG9yXCIpfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57dmFsdWU6ZSxkb25lOiEhdH19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNSkoXCJtZXRhXCIpLG89bigxMiksaT1uKDMpLGE9big0KS5mLHM9MCx1PU9iamVjdC5pc0V4dGVuc2libGV8fGZ1bmN0aW9uKCl7cmV0dXJuITB9LGw9IW4oOSkoZnVuY3Rpb24oKXtyZXR1cm4gdShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKX0pLGM9ZnVuY3Rpb24odCl7YSh0LHIse3ZhbHVlOntpOlwiT1wiKyArK3Msdzp7fX19KX0sZj1mdW5jdGlvbih0LGUpe2lmKCFvKHQpKXJldHVyblwic3ltYm9sXCI9PXR5cGVvZiB0P3Q6KFwic3RyaW5nXCI9PXR5cGVvZiB0P1wiU1wiOlwiUFwiKSt0O2lmKCFpKHQscikpe2lmKCF1KHQpKXJldHVyblwiRlwiO2lmKCFlKXJldHVyblwiRVwiO2ModCl9cmV0dXJuIHRbcl0uaX0scD1mdW5jdGlvbih0LGUpe2lmKCFpKHQscikpe2lmKCF1KHQpKXJldHVybiEwO2lmKCFlKXJldHVybiExO2ModCl9cmV0dXJuIHRbcl0ud30sZD1mdW5jdGlvbih0KXtyZXR1cm4gbCYmaC5ORUVEJiZ1KHQpJiYhaSh0LHIpJiZjKHQpLHR9LGg9dC5leHBvcnRzPXtLRVk6cixORUVEOiExLGZhc3RLZXk6ZixnZXRXZWFrOnAsb25GcmVlemU6ZH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQpLG89bigxMCksaT1uKDEzKTt0LmV4cG9ydHM9bigyKT9PYmplY3QuZGVmaW5lUHJvcGVydGllczpmdW5jdGlvbih0LGUpe28odCk7Zm9yKHZhciBuLGE9aShlKSxzPWEubGVuZ3RoLHU9MDtzPnU7KXIuZih0LG49YVt1KytdLGVbbl0pO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjApLG89bigxNCksaT1uKDcpLGE9bigyNSkscz1uKDMpLHU9bigzMyksbD1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2UuZj1uKDIpP2w6ZnVuY3Rpb24odCxlKXtpZih0PWkodCksZT1hKGUsITApLHUpdHJ5e3JldHVybiBsKHQsZSl9Y2F0Y2godCl7fWlmKHModCxlKSlyZXR1cm4gbyghci5mLmNhbGwodCxlKSx0W2VdKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDcpLG89bigzNikuZixpPXt9LnRvU3RyaW5nLGE9XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdyYmd2luZG93JiZPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcz9PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpOltdLHM9ZnVuY3Rpb24odCl7dHJ5e3JldHVybiBvKHQpfWNhdGNoKHQpe3JldHVybiBhLnNsaWNlKCl9fTt0LmV4cG9ydHMuZj1mdW5jdGlvbih0KXtyZXR1cm4gYSYmXCJbb2JqZWN0IFdpbmRvd11cIj09aS5jYWxsKHQpP3ModCk6byhyKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMpLG89big0MCksaT1uKDIyKShcIklFX1BST1RPXCIpLGE9T2JqZWN0LnByb3RvdHlwZTt0LmV4cG9ydHM9T2JqZWN0LmdldFByb3RvdHlwZU9mfHxmdW5jdGlvbih0KXtyZXR1cm4gdD1vKHQpLHIodCxpKT90W2ldOlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuY29uc3RydWN0b3ImJnQgaW5zdGFuY2VvZiB0LmNvbnN0cnVjdG9yP3QuY29uc3RydWN0b3IucHJvdG90eXBlOnQgaW5zdGFuY2VvZiBPYmplY3Q/YTpudWxsfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTEpLG89big1KSxpPW4oOSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7dmFyIG49KG8uT2JqZWN0fHx7fSlbdF18fE9iamVjdFt0XSxhPXt9O2FbdF09ZShuKSxyKHIuUytyLkYqaShmdW5jdGlvbigpe24oMSl9KSxcIk9iamVjdFwiLGEpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjQpLG89bigxNik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlLG4pe3ZhciBpLGEscz1TdHJpbmcobyhlKSksdT1yKG4pLGw9cy5sZW5ndGg7cmV0dXJuIHU8MHx8dT49bD90P1wiXCI6dm9pZCAwOihpPXMuY2hhckNvZGVBdCh1KSxpPDU1Mjk2fHxpPjU2MzE5fHx1KzE9PT1sfHwoYT1zLmNoYXJDb2RlQXQodSsxKSk8NTYzMjB8fGE+NTczNDM/dD9zLmNoYXJBdCh1KTppOnQ/cy5zbGljZSh1LHUrMik6KGktNTUyOTY8PDEwKSsoYS01NjMyMCkrNjU1MzYpfX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI0KSxvPU1hdGgubWF4LGk9TWF0aC5taW47dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQ9cih0KSx0PDA/byh0K2UsMCk6aSh0LGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjQpLG89TWF0aC5taW47dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiB0PjA/byhyKHQpLDkwMDcxOTkyNTQ3NDA5OTEpOjB9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big1NCksbz1uKDYyKSxpPW4oMTgpLGE9big3KTt0LmV4cG9ydHM9bigzNCkoQXJyYXksXCJBcnJheVwiLGZ1bmN0aW9uKHQsZSl7dGhpcy5fdD1hKHQpLHRoaXMuX2k9MCx0aGlzLl9rPWV9LGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fdCxlPXRoaXMuX2ssbj10aGlzLl9pKys7cmV0dXJuIXR8fG4+PXQubGVuZ3RoPyh0aGlzLl90PXZvaWQgMCxvKDEpKTpcImtleXNcIj09ZT9vKDAsbik6XCJ2YWx1ZXNcIj09ZT9vKDAsdFtuXSk6bygwLFtuLHRbbl1dKX0sXCJ2YWx1ZXNcIiksaS5Bcmd1bWVudHM9aS5BcnJheSxyKFwia2V5c1wiKSxyKFwidmFsdWVzXCIpLHIoXCJlbnRyaWVzXCIpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMSk7cihyLlMrci5GKiFuKDIpLFwiT2JqZWN0XCIse2RlZmluZVByb3BlcnR5Om4oNCkuZn0pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0MCksbz1uKDEzKTtuKDY4KShcImtleXNcIixmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbyhyKHQpKX19KX0sZnVuY3Rpb24odCxlKXt9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDY5KSghMCk7bigzNCkoU3RyaW5nLFwiU3RyaW5nXCIsZnVuY3Rpb24odCl7dGhpcy5fdD1TdHJpbmcodCksdGhpcy5faT0wfSxmdW5jdGlvbigpe3ZhciB0LGU9dGhpcy5fdCxuPXRoaXMuX2k7cmV0dXJuIG4+PWUubGVuZ3RoP3t2YWx1ZTp2b2lkIDAsZG9uZTohMH06KHQ9cihlLG4pLHRoaXMuX2krPXQubGVuZ3RoLHt2YWx1ZTp0LGRvbmU6ITF9KX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxKSxvPW4oMyksaT1uKDIpLGE9bigxMSkscz1uKDM5KSx1PW4oNjMpLktFWSxsPW4oOSksYz1uKDIzKSxmPW4oMjEpLHA9bigxNSksZD1uKDgpLGg9bigyNyksYj1uKDI2KSx2PW4oNTcpLGc9big2MCkseT1uKDEwKSxtPW4oNykseD1uKDI1KSx3PW4oMTQpLFM9bigzNSksTz1uKDY2KSxfPW4oNjUpLGo9big0KSxQPW4oMTMpLGs9Xy5mLEE9ai5mLE09Ty5mLEw9ci5TeW1ib2wsQz1yLkpTT04sVD1DJiZDLnN0cmluZ2lmeSxFPVwicHJvdG90eXBlXCIsVj1kKFwiX2hpZGRlblwiKSxGPWQoXCJ0b1ByaW1pdGl2ZVwiKSwkPXt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLEI9YyhcInN5bWJvbC1yZWdpc3RyeVwiKSxOPWMoXCJzeW1ib2xzXCIpLEQ9YyhcIm9wLXN5bWJvbHNcIiksST1PYmplY3RbRV0sUj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBMLHo9ci5RT2JqZWN0LEg9IXp8fCF6W0VdfHwheltFXS5maW5kQ2hpbGQsRz1pJiZsKGZ1bmN0aW9uKCl7cmV0dXJuIDchPVMoQSh7fSxcImFcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIEEodGhpcyxcImFcIix7dmFsdWU6N30pLmF9fSkpLmF9KT9mdW5jdGlvbih0LGUsbil7dmFyIHI9ayhJLGUpO3ImJmRlbGV0ZSBJW2VdLEEodCxlLG4pLHImJnQhPT1JJiZBKEksZSxyKX06QSxVPWZ1bmN0aW9uKHQpe3ZhciBlPU5bdF09UyhMW0VdKTtyZXR1cm4gZS5faz10LGV9LFc9UiYmXCJzeW1ib2xcIj09dHlwZW9mIEwuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgTH0sSj1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHQ9PT1JJiZKKEQsZSxuKSx5KHQpLGU9eChlLCEwKSx5KG4pLG8oTixlKT8obi5lbnVtZXJhYmxlPyhvKHQsVikmJnRbVl1bZV0mJih0W1ZdW2VdPSExKSxuPVMobix7ZW51bWVyYWJsZTp3KDAsITEpfSkpOihvKHQsVil8fEEodCxWLHcoMSx7fSkpLHRbVl1bZV09ITApLEcodCxlLG4pKTpBKHQsZSxuKX0sSz1mdW5jdGlvbih0LGUpe3kodCk7Zm9yKHZhciBuLHI9dihlPW0oZSkpLG89MCxpPXIubGVuZ3RoO2k+bzspSih0LG49cltvKytdLGVbbl0pO3JldHVybiB0fSxZPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHZvaWQgMD09PWU/Uyh0KTpLKFModCksZSl9LHE9ZnVuY3Rpb24odCl7dmFyIGU9JC5jYWxsKHRoaXMsdD14KHQsITApKTtyZXR1cm4hKHRoaXM9PT1JJiZvKE4sdCkmJiFvKEQsdCkpJiYoIShlfHwhbyh0aGlzLHQpfHwhbyhOLHQpfHxvKHRoaXMsVikmJnRoaXNbVl1bdF0pfHxlKX0sUT1mdW5jdGlvbih0LGUpe2lmKHQ9bSh0KSxlPXgoZSwhMCksdCE9PUl8fCFvKE4sZSl8fG8oRCxlKSl7dmFyIG49ayh0LGUpO3JldHVybiFufHwhbyhOLGUpfHxvKHQsVikmJnRbVl1bZV18fChuLmVudW1lcmFibGU9ITApLG59fSxaPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPU0obSh0KSkscj1bXSxpPTA7bi5sZW5ndGg+aTspbyhOLGU9bltpKytdKXx8ZT09Vnx8ZT09dXx8ci5wdXNoKGUpO3JldHVybiByfSxYPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPXQ9PT1JLHI9TShuP0Q6bSh0KSksaT1bXSxhPTA7ci5sZW5ndGg+YTspIW8oTixlPXJbYSsrXSl8fG4mJiFvKEksZSl8fGkucHVzaChOW2VdKTtyZXR1cm4gaX07Unx8KEw9ZnVuY3Rpb24oKXtpZih0aGlzIGluc3RhbmNlb2YgTCl0aHJvdyBUeXBlRXJyb3IoXCJTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhXCIpO3ZhciB0PXAoYXJndW1lbnRzLmxlbmd0aD4wP2FyZ3VtZW50c1swXTp2b2lkIDApLGU9ZnVuY3Rpb24obil7dGhpcz09PUkmJmUuY2FsbChELG4pLG8odGhpcyxWKSYmbyh0aGlzW1ZdLHQpJiYodGhpc1tWXVt0XT0hMSksRyh0aGlzLHQsdygxLG4pKX07cmV0dXJuIGkmJkgmJkcoSSx0LHtjb25maWd1cmFibGU6ITAsc2V0OmV9KSxVKHQpfSxzKExbRV0sXCJ0b1N0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2t9KSxfLmY9USxqLmY9SixuKDM2KS5mPU8uZj1aLG4oMjApLmY9cSxuKDM3KS5mPVgsaSYmIW4oMTkpJiZzKEksXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLHEsITApLGguZj1mdW5jdGlvbih0KXtyZXR1cm4gVShkKHQpKX0pLGEoYS5HK2EuVythLkYqIVIse1N5bWJvbDpMfSk7Zm9yKHZhciB0dD1cImhhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzXCIuc3BsaXQoXCIsXCIpLGV0PTA7dHQubGVuZ3RoPmV0OylkKHR0W2V0KytdKTtmb3IodmFyIG50PVAoZC5zdG9yZSkscnQ9MDtudC5sZW5ndGg+cnQ7KWIobnRbcnQrK10pO2EoYS5TK2EuRiohUixcIlN5bWJvbFwiLHtmb3I6ZnVuY3Rpb24odCl7cmV0dXJuIG8oQix0Kz1cIlwiKT9CW3RdOkJbdF09TCh0KX0sa2V5Rm9yOmZ1bmN0aW9uKHQpe2lmKCFXKHQpKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhIHN5bWJvbCFcIik7Zm9yKHZhciBlIGluIEIpaWYoQltlXT09PXQpcmV0dXJuIGV9LHVzZVNldHRlcjpmdW5jdGlvbigpe0g9ITB9LHVzZVNpbXBsZTpmdW5jdGlvbigpe0g9ITF9fSksYShhLlMrYS5GKiFSLFwiT2JqZWN0XCIse2NyZWF0ZTpZLGRlZmluZVByb3BlcnR5OkosZGVmaW5lUHJvcGVydGllczpLLGdldE93blByb3BlcnR5RGVzY3JpcHRvcjpRLGdldE93blByb3BlcnR5TmFtZXM6WixnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6WH0pLEMmJmEoYS5TK2EuRiooIVJ8fGwoZnVuY3Rpb24oKXt2YXIgdD1MKCk7cmV0dXJuXCJbbnVsbF1cIiE9VChbdF0pfHxcInt9XCIhPVQoe2E6dH0pfHxcInt9XCIhPVQoT2JqZWN0KHQpKX0pKSxcIkpTT05cIix7c3RyaW5naWZ5OmZ1bmN0aW9uKHQpe2lmKHZvaWQgMCE9PXQmJiFXKHQpKXtmb3IodmFyIGUsbixyPVt0XSxvPTE7YXJndW1lbnRzLmxlbmd0aD5vOylyLnB1c2goYXJndW1lbnRzW28rK10pO3JldHVybiBlPXJbMV0sXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKG49ZSksIW4mJmcoZSl8fChlPWZ1bmN0aW9uKHQsZSl7aWYobiYmKGU9bi5jYWxsKHRoaXMsdCxlKSksIVcoZSkpcmV0dXJuIGV9KSxyWzFdPWUsVC5hcHBseShDLHIpfX19KSxMW0VdW0ZdfHxuKDYpKExbRV0sRixMW0VdLnZhbHVlT2YpLGYoTCxcIlN5bWJvbFwiKSxmKE1hdGgsXCJNYXRoXCIsITApLGYoci5KU09OLFwiSlNPTlwiLCEwKX0sZnVuY3Rpb24odCxlLG4pe24oMjYpKFwiYXN5bmNJdGVyYXRvclwiKX0sZnVuY3Rpb24odCxlLG4pe24oMjYpKFwib2JzZXJ2YWJsZVwiKX0sZnVuY3Rpb24odCxlLG4pe24oNzIpO2Zvcih2YXIgcj1uKDEpLG89big2KSxpPW4oMTgpLGE9big4KShcInRvU3RyaW5nVGFnXCIpLHM9XCJDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LERPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCxTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCxUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdFwiLnNwbGl0KFwiLFwiKSx1PTA7dTxzLmxlbmd0aDt1Kyspe3ZhciBsPXNbdV0sYz1yW2xdLGY9YyYmYy5wcm90b3R5cGU7ZiYmIWZbYV0mJm8oZixhLGwpLGlbbF09aS5BcnJheX19LGZ1bmN0aW9uKHQsZSxuKXtlPXQuZXhwb3J0cz1uKDgyKSgpLGUucHVzaChbdC5pZCwnLnYtc2VsZWN0e3Bvc2l0aW9uOnJlbGF0aXZlO2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWZ9LnYtc2VsZWN0IC5kaXNhYmxlZHtjdXJzb3I6bm90LWFsbG93ZWQhaW1wb3J0YW50O2JhY2tncm91bmQtY29sb3I6I2Y4ZjhmOCFpbXBvcnRhbnR9LnYtc2VsZWN0LC52LXNlbGVjdCAqe2JveC1zaXppbmc6Ym9yZGVyLWJveH0udi1zZWxlY3QucnRsIC5vcGVuLWluZGljYXRvcntsZWZ0OjEwcHg7cmlnaHQ6YXV0b30udi1zZWxlY3QucnRsIC5zZWxlY3RlZC10YWd7ZmxvYXQ6cmlnaHQ7bWFyZ2luLXJpZ2h0OjNweDttYXJnaW4tbGVmdDoxcHh9LnYtc2VsZWN0LnJ0bCAuZHJvcGRvd24tbWVudXt0ZXh0LWFsaWduOnJpZ2h0fS52LXNlbGVjdCAub3Blbi1pbmRpY2F0b3J7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjZweDtyaWdodDoxMHB4O2N1cnNvcjpwb2ludGVyO3BvaW50ZXItZXZlbnRzOmFsbDtvcGFjaXR5OjE7aGVpZ2h0OjIwcHh9LnYtc2VsZWN0IC5vcGVuLWluZGljYXRvciwudi1zZWxlY3QgLm9wZW4taW5kaWNhdG9yOmJlZm9yZXtkaXNwbGF5OmlubGluZS1ibG9jazt0cmFuc2l0aW9uOmFsbCAuMTVzIGN1YmljLWJlemllcigxLC0uMTE1LC45NzUsLjg1NSk7dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKDEsLS4xMTUsLjk3NSwuODU1KTt3aWR0aDoxMHB4fS52LXNlbGVjdCAub3Blbi1pbmRpY2F0b3I6YmVmb3Jle2JvcmRlci1jb2xvcjpyZ2JhKDYwLDYwLDYwLC41KTtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjNweCAzcHggMCAwO2NvbnRlbnQ6XCJcIjtoZWlnaHQ6MTBweDt2ZXJ0aWNhbC1hbGlnbjp0b3A7dHJhbnNmb3JtOnJvdGF0ZSgxMzNkZWcpO2JveC1zaXppbmc6aW5oZXJpdH0udi1zZWxlY3Qub3BlbiAub3Blbi1pbmRpY2F0b3I6YmVmb3Jle3RyYW5zZm9ybTpyb3RhdGUoMzE1ZGVnKX0udi1zZWxlY3QubG9hZGluZyAub3Blbi1pbmRpY2F0b3J7b3BhY2l0eTowfS52LXNlbGVjdC5vcGVuIC5vcGVuLWluZGljYXRvcntib3R0b206MXB4fS52LXNlbGVjdCAuZHJvcGRvd24tdG9nZ2xley13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MDtiYWNrZ3JvdW5kOm5vbmU7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDYwLDYwLDYwLC4yNik7Ym9yZGVyLXJhZGl1czo0cHg7d2hpdGUtc3BhY2U6bm9ybWFsfS52LXNlbGVjdCAuZHJvcGRvd24tdG9nZ2xlOmFmdGVye3Zpc2liaWxpdHk6aGlkZGVuO2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjA7Y29udGVudDpcIiBcIjtjbGVhcjpib3RoO2hlaWdodDowfS52LXNlbGVjdC5zZWFyY2hhYmxlIC5kcm9wZG93bi10b2dnbGV7Y3Vyc29yOnRleHR9LnYtc2VsZWN0LnVuc2VhcmNoYWJsZSAuZHJvcGRvd24tdG9nZ2xle2N1cnNvcjpwb2ludGVyfS52LXNlbGVjdC5vcGVuIC5kcm9wZG93bi10b2dnbGV7Ym9yZGVyLWJvdHRvbS1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjA7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6MH0udi1zZWxlY3QgLmRyb3Bkb3duLW1lbnV7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtsZWZ0OjA7ei1pbmRleDoxMDAwO21pbi13aWR0aDoxNjBweDtwYWRkaW5nOjVweCAwO21hcmdpbjowO3dpZHRoOjEwMCU7b3ZlcmZsb3cteTpzY3JvbGw7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDAsMCwwLC4yNik7Ym94LXNoYWRvdzowIDNweCA2cHggMCByZ2JhKDAsMCwwLC4xNSk7Ym9yZGVyLXRvcDpub25lO2JvcmRlci1yYWRpdXM6MCAwIDRweCA0cHg7dGV4dC1hbGlnbjpsZWZ0O2xpc3Qtc3R5bGU6bm9uZTtiYWNrZ3JvdW5kOiNmZmZ9LnYtc2VsZWN0IC5uby1vcHRpb25ze3RleHQtYWxpZ246Y2VudGVyfS52LXNlbGVjdCAuc2VsZWN0ZWQtdGFne2NvbG9yOiMzMzM7YmFja2dyb3VuZC1jb2xvcjojZjBmMGYwO2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItcmFkaXVzOjRweDtoZWlnaHQ6MjZweDttYXJnaW46NHB4IDFweCAwIDNweDtwYWRkaW5nOjFweCAuMjVlbTtmbG9hdDpsZWZ0O2xpbmUtaGVpZ2h0OjI0cHh9LnYtc2VsZWN0LnNpbmdsZSAuc2VsZWN0ZWQtdGFne2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50fS52LXNlbGVjdC5zaW5nbGUub3BlbiAuc2VsZWN0ZWQtdGFne3Bvc2l0aW9uOmFic29sdXRlO29wYWNpdHk6LjV9LnYtc2VsZWN0LnNpbmdsZS5sb2FkaW5nIC5zZWxlY3RlZC10YWcsLnYtc2VsZWN0LnNpbmdsZS5vcGVuLnNlYXJjaGluZyAuc2VsZWN0ZWQtdGFne2Rpc3BsYXk6bm9uZX0udi1zZWxlY3QgLnNlbGVjdGVkLXRhZyAuY2xvc2V7ZmxvYXQ6bm9uZTttYXJnaW4tcmlnaHQ6MDtmb250LXNpemU6MjBweDthcHBlYXJhbmNlOm5vbmU7cGFkZGluZzowO2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQ6MCAwO2JvcmRlcjowO2ZvbnQtd2VpZ2h0OjcwMDtsaW5lLWhlaWdodDoxO2NvbG9yOiMwMDA7dGV4dC1zaGFkb3c6MCAxcHggMCAjZmZmO2ZpbHRlcjphbHBoYShvcGFjaXR5PTIwKTtvcGFjaXR5Oi4yfS52LXNlbGVjdC5zaW5nbGUuc2VhcmNoaW5nOm5vdCgub3Blbik6bm90KC5sb2FkaW5nKSBpbnB1dFt0eXBlPXNlYXJjaF17b3BhY2l0eTouMn0udi1zZWxlY3QgaW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLC52LXNlbGVjdCBpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24sLnYtc2VsZWN0IGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1idXR0b24sLnYtc2VsZWN0IGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1kZWNvcmF0aW9ue2Rpc3BsYXk6bm9uZX0udi1zZWxlY3QgaW5wdXRbdHlwZT1zZWFyY2hdOjotbXMtY2xlYXJ7ZGlzcGxheTpub25lfS52LXNlbGVjdCBpbnB1dFt0eXBlPXNlYXJjaF0sLnYtc2VsZWN0IGlucHV0W3R5cGU9c2VhcmNoXTpmb2N1c3thcHBlYXJhbmNlOm5vbmU7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mztmb250LXNpemU6MWVtO2hlaWdodDozNHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JvcmRlcjpub25lO291dGxpbmU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjAgLjVlbTt3aWR0aDoxMGVtO21heC13aWR0aDoxMDAlO2JhY2tncm91bmQ6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZTtib3gtc2hhZG93Om5vbmU7ZmxvYXQ6bGVmdDtjbGVhcjpub25lfS52LXNlbGVjdCBsaXtsaW5lLWhlaWdodDoxLjQyODU3MTQzfS52LXNlbGVjdCBsaT5he2Rpc3BsYXk6YmxvY2s7cGFkZGluZzozcHggMjBweDtjbGVhcjpib3RoO2NvbG9yOiMzMzM7d2hpdGUtc3BhY2U6bm93cmFwfS52LXNlbGVjdCBsaTpob3ZlcntjdXJzb3I6cG9pbnRlcn0udi1zZWxlY3QgLmRyb3Bkb3duLW1lbnUgLmFjdGl2ZT5he2NvbG9yOiMzMzM7YmFja2dyb3VuZDpyZ2JhKDUwLDUwLDUwLC4xKX0udi1zZWxlY3QgLmRyb3Bkb3duLW1lbnU+LmhpZ2hsaWdodD5he2JhY2tncm91bmQ6IzU4OTdmYjtjb2xvcjojZmZmfS52LXNlbGVjdCAuaGlnaGxpZ2h0Om5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLWJvdHRvbTowfS52LXNlbGVjdCAuc3Bpbm5lcntvcGFjaXR5OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjVweDtyaWdodDoxMHB4O2ZvbnQtc2l6ZTo1cHg7dGV4dC1pbmRlbnQ6LTk5OTllbTtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyLXRvcDouOWVtIHNvbGlkIGhzbGEoMCwwJSwzOSUsLjEpO2JvcmRlci1yaWdodDouOWVtIHNvbGlkIGhzbGEoMCwwJSwzOSUsLjEpO2JvcmRlci1ib3R0b206LjllbSBzb2xpZCBoc2xhKDAsMCUsMzklLC4xKTtib3JkZXItbGVmdDouOWVtIHNvbGlkIHJnYmEoNjAsNjAsNjAsLjQ1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKTthbmltYXRpb246dlNlbGVjdFNwaW5uZXIgMS4xcyBpbmZpbml0ZSBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IC4xc30udi1zZWxlY3QgLnNwaW5uZXIsLnYtc2VsZWN0IC5zcGlubmVyOmFmdGVye2JvcmRlci1yYWRpdXM6NTAlO3dpZHRoOjVlbTtoZWlnaHQ6NWVtfS52LXNlbGVjdC5sb2FkaW5nIC5zcGlubmVye29wYWNpdHk6MX1ALXdlYmtpdC1rZXlmcmFtZXMgdlNlbGVjdFNwaW5uZXJ7MCV7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKX10b3t0cmFuc2Zvcm06cm90YXRlKDF0dXJuKX19QGtleWZyYW1lcyB2U2VsZWN0U3Bpbm5lcnswJXt0cmFuc2Zvcm06cm90YXRlKDBkZWcpfXRve3RyYW5zZm9ybTpyb3RhdGUoMXR1cm4pfX0uZmFkZS1lbnRlci1hY3RpdmUsLmZhZGUtbGVhdmUtYWN0aXZle3RyYW5zaXRpb246b3BhY2l0eSAuMTVzIGN1YmljLWJlemllcigxLC41LC44LDEpfS5mYWRlLWVudGVyLC5mYWRlLWxlYXZlLXRve29wYWNpdHk6MH0nLFwiXCJdKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt2YXIgdD1bXTtyZXR1cm4gdC50b1N0cmluZz1mdW5jdGlvbigpe2Zvcih2YXIgdD1bXSxlPTA7ZTx0aGlzLmxlbmd0aDtlKyspe3ZhciBuPXRoaXNbZV07blsyXT90LnB1c2goXCJAbWVkaWEgXCIrblsyXStcIntcIituWzFdK1wifVwiKTp0LnB1c2goblsxXSl9cmV0dXJuIHQuam9pbihcIlwiKX0sdC5pPWZ1bmN0aW9uKGUsbil7XCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPVtbbnVsbCxlLFwiXCJdXSk7Zm9yKHZhciByPXt9LG89MDtvPHRoaXMubGVuZ3RoO28rKyl7dmFyIGk9dGhpc1tvXVswXTtcIm51bWJlclwiPT10eXBlb2YgaSYmKHJbaV09ITApfWZvcihvPTA7bzxlLmxlbmd0aDtvKyspe3ZhciBhPWVbb107XCJudW1iZXJcIj09dHlwZW9mIGFbMF0mJnJbYVswXV18fChuJiYhYVsyXT9hWzJdPW46biYmKGFbMl09XCIoXCIrYVsyXStcIikgYW5kIChcIituK1wiKVwiKSx0LnB1c2goYSkpfX0sdH19LGZ1bmN0aW9uKHQsZSxuKXtuKDg3KTt2YXIgcj1uKDg0KShuKDQxKSxuKDg1KSxudWxsLG51bGwpO3QuZXhwb3J0cz1yLmV4cG9ydHN9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHIpe3ZhciBvLGk9dD10fHx7fSxhPXR5cGVvZiB0LmRlZmF1bHQ7XCJvYmplY3RcIiE9PWEmJlwiZnVuY3Rpb25cIiE9PWF8fChvPXQsaT10LmRlZmF1bHQpO3ZhciBzPVwiZnVuY3Rpb25cIj09dHlwZW9mIGk/aS5vcHRpb25zOmk7aWYoZSYmKHMucmVuZGVyPWUucmVuZGVyLHMuc3RhdGljUmVuZGVyRm5zPWUuc3RhdGljUmVuZGVyRm5zKSxuJiYocy5fc2NvcGVJZD1uKSxyKXt2YXIgdT1zLmNvbXB1dGVkfHwocy5jb21wdXRlZD17fSk7T2JqZWN0LmtleXMocikuZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgZT1yW3RdO3VbdF09ZnVuY3Rpb24oKXtyZXR1cm4gZX19KX1yZXR1cm57ZXNNb2R1bGU6byxleHBvcnRzOmksb3B0aW9uczpzfX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLGU9dC4kY3JlYXRlRWxlbWVudCxuPXQuX3NlbGYuX2N8fGU7cmV0dXJuIG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJkcm9wZG93biB2LXNlbGVjdFwiLGNsYXNzOnQuZHJvcGRvd25DbGFzc2VzLGF0dHJzOntkaXI6dC5kaXJ9fSxbbihcImRpdlwiLHtyZWY6XCJ0b2dnbGVcIixjbGFzczpbXCJkcm9wZG93bi10b2dnbGVcIixcImNsZWFyZml4XCIse2Rpc2FibGVkOnQuZGlzYWJsZWR9XSxvbjp7bW91c2Vkb3duOmZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSx0LnRvZ2dsZURyb3Bkb3duKGUpfX19LFt0Ll9sKHQudmFsdWVBc0FycmF5LGZ1bmN0aW9uKGUpe3JldHVybiBuKFwic3BhblwiLHtrZXk6ZS5pbmRleCxzdGF0aWNDbGFzczpcInNlbGVjdGVkLXRhZ1wifSxbdC5fdChcInNlbGVjdGVkLW9wdGlvblwiLFt0Ll92KFwiXFxuICAgICAgICBcIit0Ll9zKHQuZ2V0T3B0aW9uTGFiZWwoZSkpK1wiXFxuICAgICAgXCIpXSxudWxsLGUpLHQuX3YoXCIgXCIpLHQubXVsdGlwbGU/bihcImJ1dHRvblwiLHtzdGF0aWNDbGFzczpcImNsb3NlXCIsYXR0cnM6e3R5cGU6XCJidXR0b25cIixcImFyaWEtbGFiZWxcIjpcIlJlbW92ZSBvcHRpb25cIn0sb246e2NsaWNrOmZ1bmN0aW9uKG4pe3QuZGVzZWxlY3QoZSl9fX0sW24oXCJzcGFuXCIse2F0dHJzOntcImFyaWEtaGlkZGVuXCI6XCJ0cnVlXCJ9fSxbdC5fdihcIsOXXCIpXSldKTp0Ll9lKCldLDIpfSksdC5fdihcIiBcIiksbihcImlucHV0XCIse2RpcmVjdGl2ZXM6W3tuYW1lOlwibW9kZWxcIixyYXdOYW1lOlwidi1tb2RlbFwiLHZhbHVlOnQuc2VhcmNoLGV4cHJlc3Npb246XCJzZWFyY2hcIn1dLHJlZjpcInNlYXJjaFwiLGNsYXNzOlt7ZGlzYWJsZWQ6dC5kaXNhYmxlZH0sXCJmb3JtLWNvbnRyb2xcIl0sc3R5bGU6e3dpZHRoOnQuaXNWYWx1ZUVtcHR5P1wiMTAwJVwiOlwiYXV0b1wifSxhdHRyczp7dHlwZTpcInNlYXJjaFwiLHBsYWNlaG9sZGVyOnQuc2VhcmNoUGxhY2Vob2xkZXIscmVhZG9ubHk6IXQuc2VhcmNoYWJsZSxpZDp0LmlucHV0SWQsXCJhcmlhLWxhYmVsXCI6XCJTZWFyY2ggZm9yIG9wdGlvblwifSxkb21Qcm9wczp7dmFsdWU6dC5zZWFyY2h9LG9uOntrZXlkb3duOltmdW5jdGlvbihlKXtyZXR1cm5cImJ1dHRvblwiaW4gZXx8IXQuX2soZS5rZXlDb2RlLFwiZGVsZXRlXCIsWzgsNDZdKT92b2lkIHQubWF5YmVEZWxldGVWYWx1ZShlKTpudWxsfSxmdW5jdGlvbihlKXtyZXR1cm5cImJ1dHRvblwiaW4gZXx8IXQuX2soZS5rZXlDb2RlLFwidXBcIiwzOCk/KGUucHJldmVudERlZmF1bHQoKSx2b2lkIHQudHlwZUFoZWFkVXAoZSkpOm51bGx9LGZ1bmN0aW9uKGUpe3JldHVyblwiYnV0dG9uXCJpbiBlfHwhdC5fayhlLmtleUNvZGUsXCJkb3duXCIsNDApPyhlLnByZXZlbnREZWZhdWx0KCksdm9pZCB0LnR5cGVBaGVhZERvd24oZSkpOm51bGx9LGZ1bmN0aW9uKGUpe3JldHVyblwiYnV0dG9uXCJpbiBlfHwhdC5fayhlLmtleUNvZGUsXCJlbnRlclwiLDEzKT8oZS5wcmV2ZW50RGVmYXVsdCgpLHZvaWQgdC50eXBlQWhlYWRTZWxlY3QoZSkpOm51bGx9XSxrZXl1cDpmdW5jdGlvbihlKXtyZXR1cm5cImJ1dHRvblwiaW4gZXx8IXQuX2soZS5rZXlDb2RlLFwiZXNjXCIsMjcpP3ZvaWQgdC5vbkVzY2FwZShlKTpudWxsfSxibHVyOnQub25TZWFyY2hCbHVyLGZvY3VzOnQub25TZWFyY2hGb2N1cyxpbnB1dDpmdW5jdGlvbihlKXtlLnRhcmdldC5jb21wb3Npbmd8fCh0LnNlYXJjaD1lLnRhcmdldC52YWx1ZSl9fX0pLHQuX3YoXCIgXCIpLHQubm9Ecm9wP3QuX2UoKTpuKFwiaVwiLHtyZWY6XCJvcGVuSW5kaWNhdG9yXCIsY2xhc3M6W3tkaXNhYmxlZDp0LmRpc2FibGVkfSxcIm9wZW4taW5kaWNhdG9yXCJdLGF0dHJzOntyb2xlOlwicHJlc2VudGF0aW9uXCJ9fSksdC5fdihcIiBcIiksdC5fdChcInNwaW5uZXJcIixbbihcImRpdlwiLHtkaXJlY3RpdmVzOlt7bmFtZTpcInNob3dcIixyYXdOYW1lOlwidi1zaG93XCIsdmFsdWU6dC5tdXRhYmxlTG9hZGluZyxleHByZXNzaW9uOlwibXV0YWJsZUxvYWRpbmdcIn1dLHN0YXRpY0NsYXNzOlwic3Bpbm5lclwifSxbdC5fdihcIkxvYWRpbmcuLi5cIildKV0pXSwyKSx0Ll92KFwiIFwiKSxuKFwidHJhbnNpdGlvblwiLHthdHRyczp7bmFtZTp0LnRyYW5zaXRpb259fSxbdC5kcm9wZG93bk9wZW4/bihcInVsXCIse3JlZjpcImRyb3Bkb3duTWVudVwiLHN0YXRpY0NsYXNzOlwiZHJvcGRvd24tbWVudVwiLHN0eWxlOntcIm1heC1oZWlnaHRcIjp0Lm1heEhlaWdodH19LFt0Ll9sKHQuZmlsdGVyZWRPcHRpb25zLGZ1bmN0aW9uKGUscil7cmV0dXJuIG4oXCJsaVwiLHtrZXk6cixjbGFzczp7YWN0aXZlOnQuaXNPcHRpb25TZWxlY3RlZChlKSxoaWdobGlnaHQ6cj09PXQudHlwZUFoZWFkUG9pbnRlcn0sb246e21vdXNlb3ZlcjpmdW5jdGlvbihlKXt0LnR5cGVBaGVhZFBvaW50ZXI9cn19fSxbbihcImFcIix7b246e21vdXNlZG93bjpmdW5jdGlvbihuKXtuLnByZXZlbnREZWZhdWx0KCksdC5zZWxlY3QoZSl9fX0sW3QuX3QoXCJvcHRpb25cIixbdC5fdihcIlxcbiAgICAgICAgICBcIit0Ll9zKHQuZ2V0T3B0aW9uTGFiZWwoZSkpK1wiXFxuICAgICAgICBcIildLG51bGwsZSldLDIpXSl9KSx0Ll92KFwiIFwiKSx0LmZpbHRlcmVkT3B0aW9ucy5sZW5ndGg/dC5fZSgpOm4oXCJsaVwiLHtcbnN0YXRpY0NsYXNzOlwibm8tb3B0aW9uc1wifSxbdC5fdChcIm5vLW9wdGlvbnNcIixbdC5fdihcIlNvcnJ5LCBubyBtYXRjaGluZyBvcHRpb25zLlwiKV0pXSwyKV0sMik6dC5fZSgpXSldLDEpfSxzdGF0aWNSZW5kZXJGbnM6W119fSxmdW5jdGlvbih0LGUsbil7ZnVuY3Rpb24gcih0LGUpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgcj10W25dLG89ZltyLmlkXTtpZihvKXtvLnJlZnMrKztmb3IodmFyIGk9MDtpPG8ucGFydHMubGVuZ3RoO2krKylvLnBhcnRzW2ldKHIucGFydHNbaV0pO2Zvcig7aTxyLnBhcnRzLmxlbmd0aDtpKyspby5wYXJ0cy5wdXNoKHUoci5wYXJ0c1tpXSxlKSl9ZWxzZXtmb3IodmFyIGE9W10saT0wO2k8ci5wYXJ0cy5sZW5ndGg7aSsrKWEucHVzaCh1KHIucGFydHNbaV0sZSkpO2Zbci5pZF09e2lkOnIuaWQscmVmczoxLHBhcnRzOmF9fX19ZnVuY3Rpb24gbyh0KXtmb3IodmFyIGU9W10sbj17fSxyPTA7cjx0Lmxlbmd0aDtyKyspe3ZhciBvPXRbcl0saT1vWzBdLGE9b1sxXSxzPW9bMl0sdT1vWzNdLGw9e2NzczphLG1lZGlhOnMsc291cmNlTWFwOnV9O25baV0/bltpXS5wYXJ0cy5wdXNoKGwpOmUucHVzaChuW2ldPXtpZDppLHBhcnRzOltsXX0pfXJldHVybiBlfWZ1bmN0aW9uIGkodCxlKXt2YXIgbj1oKCkscj1nW2cubGVuZ3RoLTFdO2lmKFwidG9wXCI9PT10Lmluc2VydEF0KXI/ci5uZXh0U2libGluZz9uLmluc2VydEJlZm9yZShlLHIubmV4dFNpYmxpbmcpOm4uYXBwZW5kQ2hpbGQoZSk6bi5pbnNlcnRCZWZvcmUoZSxuLmZpcnN0Q2hpbGQpLGcucHVzaChlKTtlbHNle2lmKFwiYm90dG9tXCIhPT10Lmluc2VydEF0KXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtuLmFwcGVuZENoaWxkKGUpfX1mdW5jdGlvbiBhKHQpe3QucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0KTt2YXIgZT1nLmluZGV4T2YodCk7ZT49MCYmZy5zcGxpY2UoZSwxKX1mdW5jdGlvbiBzKHQpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtyZXR1cm4gZS50eXBlPVwidGV4dC9jc3NcIixpKHQsZSksZX1mdW5jdGlvbiB1KHQsZSl7dmFyIG4scixvO2lmKGUuc2luZ2xldG9uKXt2YXIgaT12Kys7bj1ifHwoYj1zKGUpKSxyPWwuYmluZChudWxsLG4saSwhMSksbz1sLmJpbmQobnVsbCxuLGksITApfWVsc2Ugbj1zKGUpLHI9Yy5iaW5kKG51bGwsbiksbz1mdW5jdGlvbigpe2Eobil9O3JldHVybiByKHQpLGZ1bmN0aW9uKGUpe2lmKGUpe2lmKGUuY3NzPT09dC5jc3MmJmUubWVkaWE9PT10Lm1lZGlhJiZlLnNvdXJjZU1hcD09PXQuc291cmNlTWFwKXJldHVybjtyKHQ9ZSl9ZWxzZSBvKCl9fWZ1bmN0aW9uIGwodCxlLG4scil7dmFyIG89bj9cIlwiOnIuY3NzO2lmKHQuc3R5bGVTaGVldCl0LnN0eWxlU2hlZXQuY3NzVGV4dD15KGUsbyk7ZWxzZXt2YXIgaT1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShvKSxhPXQuY2hpbGROb2RlczthW2VdJiZ0LnJlbW92ZUNoaWxkKGFbZV0pLGEubGVuZ3RoP3QuaW5zZXJ0QmVmb3JlKGksYVtlXSk6dC5hcHBlbmRDaGlsZChpKX19ZnVuY3Rpb24gYyh0LGUpe3ZhciBuPWUuY3NzLHI9ZS5tZWRpYSxvPWUuc291cmNlTWFwO2lmKHImJnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIixyKSxvJiYobis9XCJcXG4vKiMgc291cmNlVVJMPVwiK28uc291cmNlc1swXStcIiAqL1wiLG4rPVwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIitidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShvKSkpKStcIiAqL1wiKSx0LnN0eWxlU2hlZXQpdC5zdHlsZVNoZWV0LmNzc1RleHQ9bjtlbHNle2Zvcig7dC5maXJzdENoaWxkOyl0LnJlbW92ZUNoaWxkKHQuZmlyc3RDaGlsZCk7dC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuKSl9fXZhciBmPXt9LHA9ZnVuY3Rpb24odCl7dmFyIGU7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUmJihlPXQuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxlfX0sZD1wKGZ1bmN0aW9uKCl7cmV0dXJuL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSl9KSxoPXAoZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuaGVhZHx8ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdfSksYj1udWxsLHY9MCxnPVtdO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe2U9ZXx8e30sXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUuc2luZ2xldG9uJiYoZS5zaW5nbGV0b249ZCgpKSxcInVuZGVmaW5lZFwiPT10eXBlb2YgZS5pbnNlcnRBdCYmKGUuaW5zZXJ0QXQ9XCJib3R0b21cIik7dmFyIG49byh0KTtyZXR1cm4gcihuLGUpLGZ1bmN0aW9uKHQpe2Zvcih2YXIgaT1bXSxhPTA7YTxuLmxlbmd0aDthKyspe3ZhciBzPW5bYV0sdT1mW3MuaWRdO3UucmVmcy0tLGkucHVzaCh1KX1pZih0KXt2YXIgbD1vKHQpO3IobCxlKX1mb3IodmFyIGE9MDthPGkubGVuZ3RoO2ErKyl7dmFyIHU9aVthXTtpZigwPT09dS5yZWZzKXtmb3IodmFyIGM9MDtjPHUucGFydHMubGVuZ3RoO2MrKyl1LnBhcnRzW2NdKCk7ZGVsZXRlIGZbdS5pZF19fX19O3ZhciB5PWZ1bmN0aW9uKCl7dmFyIHQ9W107cmV0dXJuIGZ1bmN0aW9uKGUsbil7cmV0dXJuIHRbZV09bix0LmZpbHRlcihCb29sZWFuKS5qb2luKFwiXFxuXCIpfX0oKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oODEpO1wic3RyaW5nXCI9PXR5cGVvZiByJiYocj1bW3QuaWQscixcIlwiXV0pO24oODYpKHIse30pO3IubG9jYWxzJiYodC5leHBvcnRzPXIubG9jYWxzKX1dKX0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dnVlLXNlbGVjdC5qcy5tYXAiXX0=
