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

},{"path":181}],2:[function(require,module,exports){
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

},{"./messages":4,"babel-runtime/core-js/object/keys":71,"babel-runtime/helpers/asyncToGenerator":75,"babel-runtime/regenerator":80,"superagent":186}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"../../../app/config":2}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./Loader":6,"vue":"vue","vue-hot-reload-api":191}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./ActionButton":8,"vue":"vue","vue-hot-reload-api":191}],10:[function(require,module,exports){
'use strict';

var LangMixin = require('../../../../../../pages/mixins/LangMixin');

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

},{"../../../../../../pages/mixins/LangMixin":52}],11:[function(require,module,exports){
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
    hotAPI.createRecord("data-v-d624b2fe", __vue__options__)
  } else {
    hotAPI.rerender("data-v-d624b2fe", __vue__options__)
  }
})()}

},{"./DynamicForm":10,"vue":"vue","vue-hot-reload-api":191}],12:[function(require,module,exports){
'use strict';

var Messages = require('../../../../../../../api/messages');
var Utils = require('../../../../../../../utils/utils');
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

},{"../../../../../../../api/messages":4,"../../../../../../../utils/utils":65,"../../mixins/InputMixin":20}],13:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Input');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.type === 'text' || _vm.type === 'number' || _vm.type === 'password' || _vm.type === 'email')?_c('div',{staticClass:"field"},[_c('label',{attrs:{"for":_vm.name}},[_vm._v(_vm._s(_vm.label)),(_vm.isRequired)?_c('span',{staticClass:"redify"},[_vm._v("*")]):_vm._e()]),_vm._v(" "),(_vm.type === 'text')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input",attrs:{"type":"text","placeholder":_vm.placeholder,"name":_vm.name},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}}):(_vm.type === 'number')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input",attrs:{"type":"number","placeholder":_vm.placeholder,"name":_vm.name},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}}):(_vm.type === 'password')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input",attrs:{"type":"password","placeholder":_vm.placeholder,"name":_vm.name},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input",attrs:{"type":"email","placeholder":_vm.placeholder,"name":_vm.name},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}}),_vm._v(" "),(_vm.validations.length > 0)?_c('div',_vm._l((_vm.validations),function(text){return _c('p',{staticClass:"redify inline-block"},[_vm._v("\n            "+_vm._s(text)+"\n        ")])})):_vm._e()]):(_vm.type === 'textarea')?_c('div',{staticClass:"field"},[_c('label',{attrs:{"for":"name"}},[_vm._v(_vm._s(_vm.label)),(_vm.isRequired)?_c('span',{staticClass:"redify"},[_vm._v("*")]):_vm._e()]),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],staticClass:"input textarea",attrs:{"placeholder":_vm.placeholder,"name":_vm.name,"rows":_vm.rows},domProps:{"value":(_vm.state.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.state, "value", $event.target.value)}}})]):(_vm.type === 'radio')?_c('div',{staticClass:"field"},[_c('label',{attrs:{"for":_vm.name}},[_vm._v("{{label}"),(_vm.isRequired)?_c('span',{staticClass:"redify"},[_vm._v("*")]):_vm._e()]),_vm._v(" "),_c('div',_vm._l((_vm.radioButtons),function(btn,idx){return _c('label',{staticClass:"radio-inline",attrs:{"for":"btn[0]"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],attrs:{"type":"radio","name":_vm.name},domProps:{"checked":_vm._q(_vm.state.value,null)},on:{"change":function($event){_vm.$set(_vm.state, "value", null)}}}),_vm._v("\n            "+_vm._s(btn[1])+"\n        ")])}))]):(_vm.type === 'checkbox')?_c('div',{staticClass:"field"},[_c('div',{staticClass:"checkbox"},[_c('label',{attrs:{"for":_vm.name}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.state.value),expression:"state.value"}],attrs:{"type":"checkbox","name":_vm.name},domProps:{"checked":Array.isArray(_vm.state.value)?_vm._i(_vm.state.value,null)>-1:(_vm.state.value)},on:{"change":function($event){var $$a=_vm.state.value,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.state.value=$$a.concat([$$v]))}else{$$i>-1&&(_vm.state.value=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.$set(_vm.state, "value", $$c)}}}}),_vm._v("\n            "+_vm._s(_vm.label)+"\n        ")])])]):_vm._e()}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78d43fd6", __vue__options__)
  } else {
    hotAPI.rerender("data-v-78d43fd6", __vue__options__)
  }
})()}

},{"./Input":12,"vue":"vue","vue-hot-reload-api":191}],14:[function(require,module,exports){
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VSelect = require('vue-select').VueSelect;
var InputMixin = require('../../mixins/InputMixin');
var Utils = require('../../../../../../../utils/utils');
var Messages = require('../../../../../../../api/messages');

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

},{"../../../../../../../api/messages":4,"../../../../../../../utils/utils":65,"../../mixins/InputMixin":20,"babel-runtime/helpers/defineProperty":76,"vue-select":192}],15:[function(require,module,exports){
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
    hotAPI.createRecord("data-v-47e7a600", __vue__options__)
  } else {
    hotAPI.rerender("data-v-47e7a600", __vue__options__)
  }
})()}

},{"./Select":14,"vue":"vue","vue-hot-reload-api":191}],16:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var Messages = require('../../../../../../../api/messages');
var Utils = require('../../../../../../../utils/utils');
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

},{"../../../../../../../api/messages":4,"../../../../../../../utils/utils":65,"../../mixins/InputMixin":20,"lodash":"lodash"}],17:[function(require,module,exports){
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
    hotAPI.createRecord("data-v-1968ed29", __vue__options__)
  } else {
    hotAPI.rerender("data-v-1968ed29", __vue__options__)
  }
})()}

},{"./VariadicElement":16,"vue":"vue","vue-hot-reload-api":191}],18:[function(require,module,exports){
'use strict';

var Messages = require('../../../../../../api/messages');
var APIRoutes = require('../../../../../../api/routes');

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

},{"../../../../../../api/messages":4,"../../../../../../api/routes":5}],19:[function(require,module,exports){
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
    hotAPI.createRecord("data-v-25a50356", __vue__options__)
  } else {
    hotAPI.rerender("data-v-25a50356", __vue__options__)
  }
})()}

},{"./Form":18,"vue":"vue","vue-hot-reload-api":191}],20:[function(require,module,exports){
'use strict';

var Messages = require('../../../../../../api/messages');

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

},{"../../../../../../api/messages":4}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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
    hotAPI.createRecord("data-v-d595684c", __vue__options__)
  } else {
    hotAPI.rerender("data-v-d595684c", __vue__options__)
  }
})()}

},{"./Paginator":21,"vue":"vue","vue-hot-reload-api":191}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"./Widget":23,"vue":"vue","vue-hot-reload-api":191}],25:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],26:[function(require,module,exports){
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

},{"./Footer":25,"vue":"vue","vue-hot-reload-api":191}],27:[function(require,module,exports){
'use strict';

var Navbar = require('../navbar/Navbar.vue');

module.exports = {
    components: {
        'navbar': Navbar
    }
};

},{"../navbar/Navbar.vue":30}],28:[function(require,module,exports){
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

},{"./Header":27,"vue":"vue","vue-hot-reload-api":191}],29:[function(require,module,exports){
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

},{"lodash":"lodash"}],30:[function(require,module,exports){
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

},{"./Navbar":29,"vue":"vue","vue-hot-reload-api":191}],31:[function(require,module,exports){
'use strict';

module.exports = [{ label: 'Production', value: 'production' }, { label: 'Development', value: 'development' }, { label: 'Demonstration', value: 'demo' }, { label: 'Localhost', value: 'local' }];

},{}],32:[function(require,module,exports){
'use strict';

module.exports = [{ label: 'Text', value: 'text' }, { label: 'Email', value: 'email' }, { label: 'Password', value: 'password' }, { label: 'Phone', value: 'phone' }, { label: 'Number', value: 'number' }, { label: 'Textarea', value: 'textarea' }, { label: 'Checkbox', value: 'checkbox' }, { label: 'Radio', value: 'radio' }, { label: 'Subform', value: 'subform' }, { label: 'Select', value: 'select' }];

},{}],33:[function(require,module,exports){
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

},{"lodash":"lodash"}],34:[function(require,module,exports){
'use strict';

module.exports = [{ label: 'Zero', value: '0' }, { label: 'One', value: '1' }, { label: 'Two', value: '2' }, { label: 'Few', value: 'few' }, { label: 'Many', value: 'many' }, { label: 'Other', value: 'other' }, { label: 'N/A', value: 'n/a' }];

},{}],35:[function(require,module,exports){
'use strict';

var Vue = require('vue');
var router = require('./router');
var store = require('./store');

var Loader = require('./components/loader/Loader.vue');
var Input = require('./components/themes/ined/components/forms/elements/input/Input.vue');
var Select = require('./components/themes/ined/components/forms/elements/select/Select.vue');
var VariadicElement = require('./components/themes/ined/components/forms/elements/variadic_element/VariadicElement.vue');
var Form = require('./components/themes/ined/components/forms/form/Form.vue');
var ActionButton = require('./components/themes/ined/components/action_button/ActionButton.vue');
var Widget = require('./components/themes/ined/components/widget/Widget.vue');
var Paginator = require('./components/themes/ined/components/paginator/Paginator.vue');
var DynamicForm = require('./components/themes/ined/components/forms/dynamic_form/DynamicForm.vue');

var App = require('./pages/App.vue');

Vue.component('loader', Loader);
Vue.component('fform', Form);
Vue.component('finput', Input);
Vue.component('fselect', Select);
Vue.component('fvariadic-element', VariadicElement);
Vue.component('action-button', ActionButton);
Vue.component('widget', Widget);
Vue.component('paginator', Paginator);
Vue.component('dynamic-form', DynamicForm);

new Vue({
    el: '#app',
    store: store,
    router: router,
    render: function render(h) {
        return h(App);
    }
});

},{"./components/loader/Loader.vue":7,"./components/themes/ined/components/action_button/ActionButton.vue":9,"./components/themes/ined/components/forms/dynamic_form/DynamicForm.vue":11,"./components/themes/ined/components/forms/elements/input/Input.vue":13,"./components/themes/ined/components/forms/elements/select/Select.vue":15,"./components/themes/ined/components/forms/elements/variadic_element/VariadicElement.vue":17,"./components/themes/ined/components/forms/form/Form.vue":19,"./components/themes/ined/components/paginator/Paginator.vue":22,"./components/themes/ined/components/widget/Widget.vue":24,"./pages/App.vue":38,"./router":56,"./store":60,"vue":"vue"}],36:[function(require,module,exports){
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

},{"./pages/config/Config.vue":40,"./pages/datainstance/Datainstance.vue":42,"./pages/datasource/Datasource.vue":44,"./pages/form/Form.vue":46,"./pages/home/Home.vue":48,"./pages/lang/Lang.vue":50,"./pages/user/User.vue":55,"./routes":57}],37:[function(require,module,exports){
'use strict';

var Vue = require('vue');
var Messages = require('../api/messages');
var APIRoutes = require('../api/routes');

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

},{"../api/messages":4,"../api/routes":5,"vue":"vue"}],38:[function(require,module,exports){
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

},{"./App":37,"vue":"vue","vue-hot-reload-api":191}],39:[function(require,module,exports){
'use strict';

var Utils = require('../../utils/utils');
var APIRoutes = require('../../api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../mixins/LangMixin');
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

},{"../../api/routes":5,"../../lists/environments":31,"../../lists/langs":33,"../../utils/utils":65,"../mixins/LangMixin":52,"../mixins/ReaderMixin":53}],40:[function(require,module,exports){
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

},{"./Config":39,"vue":"vue","vue-hot-reload-api":191}],41:[function(require,module,exports){
'use strict';

var Utils = require('../../utils/utils');
var APIRoutes = require('../../api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../mixins/LangMixin');
var FormMixin = require('../mixins/FormMixin');

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

},{"../../api/routes":5,"../../utils/utils":65,"../mixins/FormMixin":51,"../mixins/LangMixin":52,"../mixins/ReaderMixin":53}],42:[function(require,module,exports){
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

},{"./Datainstance":41,"vue":"vue","vue-hot-reload-api":191}],43:[function(require,module,exports){
'use strict';

var Utils = require('../../utils/utils');
var APIRoutes = require('../../api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../mixins/LangMixin');

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

},{"../../api/routes":5,"../../utils/utils":65,"../mixins/LangMixin":52,"../mixins/ReaderMixin":53}],44:[function(require,module,exports){
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

},{"./Datasource":43,"vue":"vue","vue-hot-reload-api":191}],45:[function(require,module,exports){
'use strict';

var Utils = require('../../utils/utils');
var APIRoutes = require('../../api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../mixins/LangMixin');
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

},{"../../api/routes":5,"../../lists/fieldtypes":32,"../../utils/utils":65,"../mixins/LangMixin":52,"../mixins/ReaderMixin":53}],46:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Form');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("List of users")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_vm._l((_vm.readContent),function(row){return _c('div',{staticClass:"columns is-centered"},_vm._l((row),function(content){return _c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_c('action-button',{staticClass:"button is-small button-background-blue",on:{"action-click":function($event){_vm.update(content)}}},[_c('i',{staticClass:"fa fa-pencil"})]),_vm._v(" "),_c('action-button',{staticClass:"button is-small button-background-red",attrs:{"confirmation":"Are you sure?","two-steps":true},on:{"action-click":function($event){_vm.remove(content, 'organization')}}},[_c('i',{staticClass:"fa fa-times"})]),_vm._v("\n                                        "+_vm._s(content.label)+" ("+_vm._s(content.name)+") \n                                    ")],1),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"})])],1)}))}),_vm._v(" "),_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('paginator',{staticClass:"pagination-purple",attrs:{"skip":0,"number-of-items":_vm.contentLength,"items-per-page":_vm.state.itemsPerPage}})],1)])],2)])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("Add or modify a user")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_c('fform',{attrs:{"name":_vm.state.cform,"post_path":_vm.state.path,"put_path":_vm.state.path,"get_path":_vm.state.rpath,"get_form":_vm.state.rform}},[_c('finput',{attrs:{"name":"name","label":_vm.lang('b_form_name'),"is-required":true,"placeholder":_vm.lang('b_form_name'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":"label","label":_vm.lang('b_label'),"placeholder":_vm.lang('b_label'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":"group","label":_vm.lang('b_group'),"placeholder":_vm.lang('b_group'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"rows":"5","name":"description","label":_vm.lang('b_form_description'),"placeholder":_vm.lang('b_form_description_placeholder'),"type":"textarea","form":_vm.state.cform}}),_vm._v(" "),_c('h3',{staticClass:"title is-3 has-no-bottom-margin"},[_vm._v(_vm._s(_vm.lang('b_field', {}, 'other')))]),_vm._v(" "),_c('hr',{staticClass:"has-no-top-margin"}),_vm._v(" "),_c('fvariadic-element',{attrs:{"name":"fields","form":_vm.state.cform,"tabs":true},scopedSlots:_vm._u([{key:"variadic",fn:function(props){return [_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".name"),"label":_vm.lang('b_name'),"is-required":true,"placeholder":_vm.lang('b_name'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".label"),"label":_vm.lang('b_label'),"is-required":true,"placeholder":_vm.lang('b_label'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".order"),"label":_vm.lang('b_field_order'),"is-required":true,"placeholder":_vm.lang('b_field_order'),"type":"number","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".multiple"),"label":_vm.lang('b_field_multiple'),"placeholder":_vm.lang('b_field_multiple'),"type":"checkbox","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".multiple_name"),"label":_vm.lang('b_field_multiple_name'),"placeholder":_vm.lang('b_field_multiple_name'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('fselect',{attrs:{"name":((props.fname) + "." + (props.id) + ".type"),"label":_vm.lang('b_field_type'),"is-required":true,"options":_vm.fieldtypes,"form":_vm.state.cform},on:{"select-change":function (val) {_vm.type_change(val, props.id)}}}),_vm._v(" "),(props.id in _vm.state.selected_types)?_c('div',[(_vm.state.selected_types[props.id] === 'select')?_c('div',[_c('fselect',{attrs:{"name":((props.fname) + "." + (props.id) + ".datasource.name"),"label":_vm.lang('b_datasource_name'),"is-required":true,"options":this.datasources,"fieldLabel":_vm.label,"fieldValue":_vm.name,"form":_vm.state.cform}})],1):(['text', 'phone', 'number', 'email', 'password'].indexOf(_vm.state.selected_types[props.id]) !== -1)?_c('div',[_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".placeholder"),"label":_vm.lang('b_placeholder'),"is-required":true,"placeholder":_vm.lang('b_placeholder'),"type":"text","form":_vm.state.cform}})],1):(['subform'].indexOf(_vm.state.selected_types[props.id]) !== -1)?_c('div',[_c('fselect',{attrs:{"name":((props.fname) + "." + (props.id) + ".subform"),"label":_vm.lang('b_subform'),"is-required":true,"options":_vm.content,"fieldLabel":"label","fieldValue":"name","form":_vm.state.cform}})],1):_vm._e()]):_vm._e(),_vm._v(" "),_c('h3',{staticClass:"title is-3 has-no-bottom-margin"},[_vm._v(_vm._s(_vm.lang('b_form_validation', {}, 'other')))]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('finput',{attrs:{"name":"validations.required","type":"checkbox","label":_vm.lang('b_form_required'),"form":_vm.state.cform}})]}}])})],1)],1)])],1)])])])}
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

},{"./Form":45,"vue":"vue","vue-hot-reload-api":191}],47:[function(require,module,exports){
'use strict';

var Utils = require('../../utils/utils');
var APIRoutes = require('../../api/routes');
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

},{"../../api/routes":5,"../../utils/utils":65,"../mixins/ReaderMixin":53}],48:[function(require,module,exports){
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

},{"./Home":47,"vue":"vue","vue-hot-reload-api":191}],49:[function(require,module,exports){
'use strict';

var Utils = require('../../utils/utils');
var APIRoutes = require('../../api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../mixins/LangMixin');
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

},{"../../api/routes":5,"../../lists/langs":33,"../../lists/quantities":34,"../../utils/utils":65,"../mixins/LangMixin":52,"../mixins/ReaderMixin":53}],50:[function(require,module,exports){
;(function(){
'use strict';

module.exports = require('./Lang');
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"holy-grail-content"},[_c('div',{staticClass:"container is-fluid"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("List of language items")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_vm._l((_vm.readContent),function(row){return _c('div',{staticClass:"columns is-centered"},_vm._l((row),function(content){return _c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_c('action-button',{staticClass:"button is-small button-background-blue",on:{"action-click":function($event){_vm.update(content, 'lang')}}},[_c('i',{staticClass:"fa fa-pencil"})]),_vm._v(" "),_c('action-button',{staticClass:"button is-small button-background-red",attrs:{"confirmation":"Are you sure?","two-steps":true},on:{"action-click":function($event){_vm.remove(content, 'lang')}}},[_c('i',{staticClass:"fa fa-times"})]),_vm._v("\n                                        "+_vm._s(content.key)+" ("+_vm._s(content.lang)+")\n                                    ")],1),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"})])],1)}))}),_vm._v(" "),_c('div',{staticClass:"columns is-centered"},[_c('div',{staticClass:"column"},[_c('paginator',{staticClass:"pagination-purple",attrs:{"skip":0,"number-of-items":_vm.contentLength,"items-per-page":_vm.state.itemsPerPage}})],1)])],2)])],1)]),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('widget',[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v("Add or modify a language item")]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_c('fform',{attrs:{"name":_vm.state.cform,"post_path":_vm.state.path,"put_path":_vm.state.path,"get_path":_vm.state.rpath,"get_form":_vm.state.rform}},[_c('finput',{attrs:{"name":"key","label":_vm.lang('b_key'),"is-required":true,"placeholder":_vm.lang('b_key'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('finput',{attrs:{"name":"part","label":_vm.lang('b_part_of_website'),"is-required":true,"placeholder":_vm.lang('b_part_of_website'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('fselect',{attrs:{"name":"lang","label":_vm.lang('b_lang'),"is-required":true,"options":_vm.state.langs,"form":_vm.state.cform}}),_vm._v(" "),_c('fvariadic-element',{attrs:{"name":"values","form":_vm.state.cform},scopedSlots:_vm._u([{key:"variadic",fn:function(props){return [_c('finput',{attrs:{"name":((props.fname) + "." + (props.id) + ".value"),"label":_vm.lang('b_text'),"is-required":true,"placeholder":_vm.lang('b_text_to_show'),"type":"text","form":_vm.state.cform}}),_vm._v(" "),_c('fselect',{attrs:{"name":((props.fname) + "." + (props.id) + ".quantity"),"label":_vm.lang('b_quantity'),"is-required":true,"options":_vm.state.quantities,"form":_vm.state.cform}})]}}])})],1)],1)])],1)])])])}
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

},{"./Lang":49,"vue":"vue","vue-hot-reload-api":191}],51:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var APIRoutes = require('../../api/routes');

module.exports = {
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

},{"../../api/routes":5,"lodash":"lodash"}],52:[function(require,module,exports){
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringUtils = require('../../utils/strings');

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

},{"../../utils/strings":64,"babel-runtime/core-js/object/keys":71}],53:[function(require,module,exports){
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vue = require('vue');
var APIRoutes = require('../../api/routes');
var Messages = require('../../api/messages');

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

},{"../../api/messages":4,"../../api/routes":5,"babel-runtime/core-js/object/keys":71,"vue":"vue"}],54:[function(require,module,exports){
'use strict';

var Utils = require('../../utils/utils');
var APIRoutes = require('../../api/routes');
var ReaderMixin = require('../mixins/ReaderMixin');
var LangMixin = require('../mixins/LangMixin');
var FormMixin = require('../mixins/FormMixin');

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

},{"../../api/routes":5,"../../utils/utils":65,"../mixins/FormMixin":51,"../mixins/LangMixin":52,"../mixins/ReaderMixin":53}],55:[function(require,module,exports){
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

},{"./User":54,"vue":"vue","vue-hot-reload-api":191}],56:[function(require,module,exports){
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

},{"./components/themes/ined/parts/footer/Footer.vue":26,"./components/themes/ined/parts/header/Header.vue":28,"./components/themes/ined/parts/navbar/Navbar.vue":30,"./menus":36,"babel-runtime/helpers/toConsumableArray":78,"lodash":"lodash","vue":"vue","vue-router":"vue-router"}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{"../api":3,"../api/messages":4,"babel-runtime/helpers/asyncToGenerator":75,"babel-runtime/regenerator":80}],59:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],60:[function(require,module,exports){
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

},{"./actions":58,"./getters":59,"./mutations":61,"./state":62,"vue":"vue","vuex":"vuex"}],61:[function(require,module,exports){
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

},{"../api/messages":4,"../utils/utils":65,"babel-runtime/core-js/object/assign":69,"babel-runtime/helpers/defineProperty":76,"lodash":"lodash"}],62:[function(require,module,exports){
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

},{"../utils/browser":63}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{"lodash":"lodash"}],65:[function(require,module,exports){
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

},{"babel-runtime/core-js/object/keys":71,"babel-runtime/helpers/slicedToArray":77,"babel-runtime/helpers/typeof":79,"lodash":"lodash"}],66:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":82}],67:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":83}],68:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":84}],69:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":85}],70:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":86}],71:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":87}],72:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":88}],73:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":89}],74:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":90}],75:[function(require,module,exports){
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
},{"../core-js/promise":72}],76:[function(require,module,exports){
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
},{"../core-js/object/define-property":70}],77:[function(require,module,exports){
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
},{"../core-js/get-iterator":67,"../core-js/is-iterable":68}],78:[function(require,module,exports){
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
},{"../core-js/array/from":66}],79:[function(require,module,exports){
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
},{"../core-js/symbol":73,"../core-js/symbol/iterator":74}],80:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":183}],81:[function(require,module,exports){

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

},{}],82:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":98,"../../modules/es6.array.from":167,"../../modules/es6.string.iterator":174}],83:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":165,"../modules/es6.string.iterator":174,"../modules/web.dom.iterable":180}],84:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/core.is-iterable":166,"../modules/es6.string.iterator":174,"../modules/web.dom.iterable":180}],85:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":98,"../../modules/es6.object.assign":169}],86:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":98,"../../modules/es6.object.define-property":170}],87:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":98,"../../modules/es6.object.keys":171}],88:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/_core":98,"../modules/es6.object.to-string":172,"../modules/es6.promise":173,"../modules/es6.string.iterator":174,"../modules/es7.promise.finally":176,"../modules/es7.promise.try":177,"../modules/web.dom.iterable":180}],89:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":98,"../../modules/es6.object.to-string":172,"../../modules/es6.symbol":175,"../../modules/es7.symbol.async-iterator":178,"../../modules/es7.symbol.observable":179}],90:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":162,"../../modules/es6.string.iterator":174,"../../modules/web.dom.iterable":180}],91:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],92:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],93:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],94:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":118}],95:[function(require,module,exports){
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

},{"./_to-absolute-index":154,"./_to-iobject":156,"./_to-length":157}],96:[function(require,module,exports){
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

},{"./_cof":97,"./_wks":163}],97:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],98:[function(require,module,exports){
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],99:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":131,"./_property-desc":144}],100:[function(require,module,exports){
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

},{"./_a-function":91}],101:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],102:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":107}],103:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":109,"./_is-object":118}],104:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],105:[function(require,module,exports){
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

},{"./_object-gops":136,"./_object-keys":139,"./_object-pie":140}],106:[function(require,module,exports){
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

},{"./_core":98,"./_ctx":100,"./_global":109,"./_hide":111}],107:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],108:[function(require,module,exports){
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

},{"./_an-object":94,"./_ctx":100,"./_is-array-iter":116,"./_iter-call":119,"./_to-length":157,"./core.get-iterator-method":164}],109:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],110:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],111:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":102,"./_object-dp":131,"./_property-desc":144}],112:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":109}],113:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":102,"./_dom-create":103,"./_fails":107}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":97}],116:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":124,"./_wks":163}],117:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":97}],118:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],119:[function(require,module,exports){
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

},{"./_an-object":94}],120:[function(require,module,exports){
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

},{"./_hide":111,"./_object-create":130,"./_property-desc":144,"./_set-to-string-tag":148,"./_wks":163}],121:[function(require,module,exports){
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

},{"./_export":106,"./_has":110,"./_hide":111,"./_iter-create":120,"./_iterators":124,"./_library":125,"./_object-gpo":137,"./_redefine":146,"./_set-to-string-tag":148,"./_wks":163}],122:[function(require,module,exports){
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

},{"./_wks":163}],123:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],124:[function(require,module,exports){
module.exports = {};

},{}],125:[function(require,module,exports){
module.exports = true;

},{}],126:[function(require,module,exports){
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

},{"./_fails":107,"./_has":110,"./_is-object":118,"./_object-dp":131,"./_uid":160}],127:[function(require,module,exports){
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

},{"./_cof":97,"./_global":109,"./_task":153}],128:[function(require,module,exports){
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

},{"./_a-function":91}],129:[function(require,module,exports){
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

},{"./_fails":107,"./_iobject":115,"./_object-gops":136,"./_object-keys":139,"./_object-pie":140,"./_to-object":158}],130:[function(require,module,exports){
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

},{"./_an-object":94,"./_dom-create":103,"./_enum-bug-keys":104,"./_html":112,"./_object-dps":132,"./_shared-key":149}],131:[function(require,module,exports){
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

},{"./_an-object":94,"./_descriptors":102,"./_ie8-dom-define":113,"./_to-primitive":159}],132:[function(require,module,exports){
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

},{"./_an-object":94,"./_descriptors":102,"./_object-dp":131,"./_object-keys":139}],133:[function(require,module,exports){
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

},{"./_descriptors":102,"./_has":110,"./_ie8-dom-define":113,"./_object-pie":140,"./_property-desc":144,"./_to-iobject":156,"./_to-primitive":159}],134:[function(require,module,exports){
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

},{"./_object-gopn":135,"./_to-iobject":156}],135:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":104,"./_object-keys-internal":138}],136:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],137:[function(require,module,exports){
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

},{"./_has":110,"./_shared-key":149,"./_to-object":158}],138:[function(require,module,exports){
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

},{"./_array-includes":95,"./_has":110,"./_shared-key":149,"./_to-iobject":156}],139:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":104,"./_object-keys-internal":138}],140:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],141:[function(require,module,exports){
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

},{"./_core":98,"./_export":106,"./_fails":107}],142:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],143:[function(require,module,exports){
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

},{"./_an-object":94,"./_is-object":118,"./_new-promise-capability":128}],144:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],145:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":111}],146:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":111}],147:[function(require,module,exports){
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

},{"./_core":98,"./_descriptors":102,"./_global":109,"./_object-dp":131,"./_wks":163}],148:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":110,"./_object-dp":131,"./_wks":163}],149:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":150,"./_uid":160}],150:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":109}],151:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":91,"./_an-object":94,"./_wks":163}],152:[function(require,module,exports){
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

},{"./_defined":101,"./_to-integer":155}],153:[function(require,module,exports){
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

},{"./_cof":97,"./_ctx":100,"./_dom-create":103,"./_global":109,"./_html":112,"./_invoke":114}],154:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":155}],155:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],156:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":101,"./_iobject":115}],157:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":155}],158:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":101}],159:[function(require,module,exports){
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

},{"./_is-object":118}],160:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],161:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":98,"./_global":109,"./_library":125,"./_object-dp":131,"./_wks-ext":162}],162:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":163}],163:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":109,"./_shared":150,"./_uid":160}],164:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":96,"./_core":98,"./_iterators":124,"./_wks":163}],165:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":94,"./_core":98,"./core.get-iterator-method":164}],166:[function(require,module,exports){
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

},{"./_classof":96,"./_core":98,"./_iterators":124,"./_wks":163}],167:[function(require,module,exports){
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

},{"./_create-property":99,"./_ctx":100,"./_export":106,"./_is-array-iter":116,"./_iter-call":119,"./_iter-detect":122,"./_to-length":157,"./_to-object":158,"./core.get-iterator-method":164}],168:[function(require,module,exports){
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

},{"./_add-to-unscopables":92,"./_iter-define":121,"./_iter-step":123,"./_iterators":124,"./_to-iobject":156}],169:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":106,"./_object-assign":129}],170:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":102,"./_export":106,"./_object-dp":131}],171:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":139,"./_object-sap":141,"./_to-object":158}],172:[function(require,module,exports){

},{}],173:[function(require,module,exports){
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

},{"./_a-function":91,"./_an-instance":93,"./_classof":96,"./_core":98,"./_ctx":100,"./_export":106,"./_for-of":108,"./_global":109,"./_is-object":118,"./_iter-detect":122,"./_library":125,"./_microtask":127,"./_new-promise-capability":128,"./_perform":142,"./_promise-resolve":143,"./_redefine-all":145,"./_set-species":147,"./_set-to-string-tag":148,"./_species-constructor":151,"./_task":153,"./_wks":163}],174:[function(require,module,exports){
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

},{"./_iter-define":121,"./_string-at":152}],175:[function(require,module,exports){
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

},{"./_an-object":94,"./_descriptors":102,"./_enum-keys":105,"./_export":106,"./_fails":107,"./_global":109,"./_has":110,"./_hide":111,"./_is-array":117,"./_library":125,"./_meta":126,"./_object-create":130,"./_object-dp":131,"./_object-gopd":133,"./_object-gopn":135,"./_object-gopn-ext":134,"./_object-gops":136,"./_object-keys":139,"./_object-pie":140,"./_property-desc":144,"./_redefine":146,"./_set-to-string-tag":148,"./_shared":150,"./_to-iobject":156,"./_to-primitive":159,"./_uid":160,"./_wks":163,"./_wks-define":161,"./_wks-ext":162}],176:[function(require,module,exports){
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

},{"./_core":98,"./_export":106,"./_global":109,"./_promise-resolve":143,"./_species-constructor":151}],177:[function(require,module,exports){
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

},{"./_export":106,"./_new-promise-capability":128,"./_perform":142}],178:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":161}],179:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":161}],180:[function(require,module,exports){
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

},{"./_global":109,"./_hide":111,"./_iterators":124,"./_wks":163,"./es6.array.iterator":168}],181:[function(require,module,exports){
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

},{"_process":182}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{"./runtime":184}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{"./agent-base":185,"./is-object":187,"./request-base":188,"./response-base":189,"component-emitter":81}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{"./is-object":187}],189:[function(require,module,exports){
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

},{"./utils":190}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueSelect=e():t.VueSelect=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.mixins=e.VueSelect=void 0;var o=n(83),i=r(o),a=n(42),s=r(a);e.default=i.default,e.VueSelect=i.default,e.mixins=s.default},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(10),o=n(33),i=n(25),a=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(4),o=n(14);t.exports=n(2)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(59),o=n(16);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(23)("wks"),o=n(15),i=n(1).Symbol,a="function"==typeof i,s=t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))};s.store=r},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(12);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(1),o=n(5),i=n(56),a=n(6),s="prototype",u=function(t,e,n){var l,c,f,p=t&u.F,d=t&u.G,h=t&u.S,b=t&u.P,v=t&u.B,g=t&u.W,y=d?o:o[e]||(o[e]={}),m=y[s],x=d?r:h?r[e]:(r[e]||{})[s];d&&(n=e);for(l in n)c=!p&&x&&void 0!==x[l],c&&l in y||(f=c?x[l]:n[l],y[l]=d&&"function"!=typeof x[l]?n[l]:v&&c?i(f,r):g&&x[l]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[s]=t[s],e}(f):b&&"function"==typeof f?i(Function.call,f):f,b&&((y.virtual||(y.virtual={}))[l]=f,t&u.R&&m&&!m[l]&&a(m,l,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(38),o=n(17);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(4).f,o=n(3),i=n(8)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(23)("keys"),o=n(15);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(1),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(12);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(1),o=n(5),i=n(19),a=n(27),s=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(8)},function(t,e){"use strict";t.exports={props:{loading:{type:Boolean,default:!1},onSearch:{type:Function,default:function(t,e){}}},data:function(){return{mutableLoading:!1}},watch:{search:function(){this.search.length>0&&(this.onSearch(this.search,this.toggleLoading),this.$emit("search",this.search,this.toggleLoading))},loading:function(t){this.mutableLoading=t}},methods:{toggleLoading:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null==t?this.mutableLoading=!this.mutableLoading:this.mutableLoading=t}}}},function(t,e){"use strict";t.exports={watch:{typeAheadPointer:function(){this.maybeAdjustScroll()}},methods:{maybeAdjustScroll:function(){var t=this.pixelsToPointerTop(),e=this.pixelsToPointerBottom();return t<=this.viewport().top?this.scrollTo(t):e>=this.viewport().bottom?this.scrollTo(this.viewport().top+this.pointerHeight()):void 0},pixelsToPointerTop:function t(){var t=0;if(this.$refs.dropdownMenu)for(var e=0;e<this.typeAheadPointer;e++)t+=this.$refs.dropdownMenu.children[e].offsetHeight;return t},pixelsToPointerBottom:function(){return this.pixelsToPointerTop()+this.pointerHeight()},pointerHeight:function(){var t=!!this.$refs.dropdownMenu&&this.$refs.dropdownMenu.children[this.typeAheadPointer];return t?t.offsetHeight:0},viewport:function(){return{top:this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop:0,bottom:this.$refs.dropdownMenu?this.$refs.dropdownMenu.offsetHeight+this.$refs.dropdownMenu.scrollTop:0}},scrollTo:function(t){return this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop=t:null}}}},function(t,e){"use strict";t.exports={data:function(){return{typeAheadPointer:-1}},watch:{filteredOptions:function(){this.typeAheadPointer=0}},methods:{typeAheadUp:function(){this.typeAheadPointer>0&&(this.typeAheadPointer--,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadDown:function(){this.typeAheadPointer<this.filteredOptions.length-1&&(this.typeAheadPointer++,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadSelect:function(){this.filteredOptions[this.typeAheadPointer]?this.select(this.filteredOptions[this.typeAheadPointer]):this.taggable&&this.search.length&&this.select(this.search),this.clearSearchOnSelect&&(this.search="")}}}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(12),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=!n(2)&&!n(9)(function(){return 7!=Object.defineProperty(n(32)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r=n(19),o=n(11),i=n(39),a=n(6),s=n(3),u=n(18),l=n(61),c=n(21),f=n(67),p=n(8)("iterator"),d=!([].keys&&"next"in[].keys()),h="@@iterator",b="keys",v="values",g=function(){return this};t.exports=function(t,e,n,y,m,x,w){l(n,e,y);var S,O,_,j=function(t){if(!d&&t in M)return M[t];switch(t){case b:return function(){return new n(this,t)};case v:return function(){return new n(this,t)}}return function(){return new n(this,t)}},P=e+" Iterator",k=m==v,A=!1,M=t.prototype,L=M[p]||M[h]||m&&M[m],C=L||j(m),T=m?k?j("entries"):C:void 0,E="Array"==e?M.entries||L:L;if(E&&(_=f(E.call(new t)),_!==Object.prototype&&_.next&&(c(_,P,!0),r||s(_,p)||a(_,p,g))),k&&L&&L.name!==v&&(A=!0,C=function(){return L.call(this)}),r&&!w||!d&&!A&&M[p]||a(M,p,C),u[e]=C,u[P]=g,m)if(S={values:k?C:j(v),keys:x?C:j(b),entries:T},w)for(O in S)O in M||i(M,O,S[O]);else o(o.P+o.F*(d||A),e,S);return S}},function(t,e,n){var r=n(10),o=n(64),i=n(17),a=n(22)("IE_PROTO"),s=function(){},u="prototype",l=function(){var t,e=n(32)("iframe"),r=i.length,o="<",a=">";for(e.style.display="none",n(58).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+a+"document.F=Object"+o+"/script"+a),t.close(),l=t.F;r--;)delete l[u][i[r]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[u]=r(t),n=new s,s[u]=null,n[a]=t):n=l(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(38),o=n(17).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(3),o=n(7),i=n(55)(!1),a=n(22)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),u=0,l=[];for(n in s)n!=a&&r(s,n)&&l.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){t.exports=n(6)},function(t,e,n){var r=n(16);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(44),i=r(o),a=n(47),s=r(a),u=n(48),l=r(u),c=n(29),f=r(c),p=n(30),d=r(p),h=n(28),b=r(h);e.default={mixins:[f.default,d.default,b.default],props:{value:{default:null},options:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},maxHeight:{type:String,default:"400px"},searchable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},placeholder:{type:String,default:""},transition:{type:String,default:"fade"},clearSearchOnSelect:{type:Boolean,default:!0},closeOnSelect:{type:Boolean,default:!0},label:{type:String,default:"label"},getOptionLabel:{type:Function,default:function(t){return"object"===("undefined"==typeof t?"undefined":(0,l.default)(t))&&this.label&&t[this.label]?t[this.label]:t}},onChange:{type:Function,default:function(t){this.$emit("input",t)}},taggable:{type:Boolean,default:!1},pushTags:{type:Boolean,default:!1},createOption:{type:Function,default:function(t){return"object"===(0,l.default)(this.mutableOptions[0])&&(t=(0,s.default)({},this.label,t)),this.$emit("option:created",t),t}},resetOnOptionsChange:{type:Boolean,default:!1},noDrop:{type:Boolean,default:!1},inputId:{type:String},dir:{type:String,default:"auto"}},data:function(){return{search:"",open:!1,mutableValue:null,mutableOptions:[]}},watch:{value:function(t){this.mutableValue=t},mutableValue:function(t,e){this.multiple?this.onChange?this.onChange(t):null:this.onChange&&t!==e?this.onChange(t):null},options:function(t){this.mutableOptions=t},mutableOptions:function(){!this.taggable&&this.resetOnOptionsChange&&(this.mutableValue=this.multiple?[]:null)},multiple:function(t){this.mutableValue=t?[]:null}},created:function(){this.mutableValue=this.value,this.mutableOptions=this.options.slice(0),this.mutableLoading=this.loading,this.$on("option:created",this.maybePushTag)},methods:{select:function(t){this.isOptionSelected(t)?this.deselect(t):(this.taggable&&!this.optionExists(t)&&(t=this.createOption(t)),this.multiple&&!this.mutableValue?this.mutableValue=[t]:this.multiple?this.mutableValue.push(t):this.mutableValue=t),this.onAfterSelect(t)},deselect:function(t){var e=this;if(this.multiple){var n=-1;this.mutableValue.forEach(function(r){(r===t||"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label])&&(n=r)});var r=this.mutableValue.indexOf(n);this.mutableValue.splice(r,1)}else this.mutableValue=null},onAfterSelect:function(t){this.closeOnSelect&&(this.open=!this.open,this.$refs.search.blur()),this.clearSearchOnSelect&&(this.search="")},toggleDropdown:function(t){t.target!==this.$refs.openIndicator&&t.target!==this.$refs.search&&t.target!==this.$refs.toggle&&t.target!==this.$el||(this.open?this.$refs.search.blur():this.disabled||(this.open=!0,this.$refs.search.focus()))},isOptionSelected:function(t){var e=this;if(this.multiple&&this.mutableValue){var n=!1;return this.mutableValue.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label]?n=!0:"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n}return this.mutableValue===t},onEscape:function(){this.search.length?this.search="":this.$refs.search.blur()},onSearchBlur:function(){this.clearSearchOnBlur&&(this.search=""),this.open=!1,this.$emit("search:blur")},onSearchFocus:function(){this.open=!0,this.$emit("search:focus")},maybeDeleteValue:function(){if(!this.$refs.search.value.length&&this.mutableValue)return this.multiple?this.mutableValue.pop():this.mutableValue=null},optionExists:function(t){var e=this,n=!1;return this.mutableOptions.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n},maybePushTag:function(t){this.pushTags&&this.mutableOptions.push(t)}},computed:{dropdownClasses:function(){return{open:this.dropdownOpen,single:!this.multiple,searching:this.searching,searchable:this.searchable,unsearchable:!this.searchable,loading:this.mutableLoading,rtl:"rtl"===this.dir}},clearSearchOnBlur:function(){return this.clearSearchOnSelect&&!this.multiple},searching:function(){return!!this.search},dropdownOpen:function(){return!this.noDrop&&(this.open&&!this.mutableLoading)},searchPlaceholder:function(){if(this.isValueEmpty&&this.placeholder)return this.placeholder},filteredOptions:function(){var t=this,e=this.mutableOptions.filter(function(e){return"object"===("undefined"==typeof e?"undefined":(0,l.default)(e))&&e.hasOwnProperty(t.label)?e[t.label].toLowerCase().indexOf(t.search.toLowerCase())>-1:"object"!==("undefined"==typeof e?"undefined":(0,l.default)(e))||e.hasOwnProperty(t.label)?e.toLowerCase().indexOf(t.search.toLowerCase())>-1:console.warn('[vue-select warn]: Label key "option.'+t.label+'" does not exist in options object.\nhttp://sagalbot.github.io/vue-select/#ex-labels')});return this.taggable&&this.search.length&&!this.optionExists(this.search)&&e.unshift(this.search),e},isValueEmpty:function(){return!this.mutableValue||("object"===(0,l.default)(this.mutableValue)?!(0,i.default)(this.mutableValue).length:!this.mutableValue.length)},valueAsArray:function(){return this.multiple?this.mutableValue:this.mutableValue?[this.mutableValue]:[]}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(28),i=r(o),a=n(30),s=r(a),u=n(29),l=r(u);e.default={ajax:i.default,pointer:s.default,pointerScroll:l.default}},function(t,e,n){t.exports={default:n(49),__esModule:!0}},function(t,e,n){t.exports={default:n(50),__esModule:!0}},function(t,e,n){t.exports={default:n(51),__esModule:!0}},function(t,e,n){t.exports={default:n(52),__esModule:!0}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(43),i=r(o);e.default=function(t,e,n){return e in t?(0,i.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(46),i=r(o),a=n(45),s=r(a),u="function"==typeof s.default&&"symbol"==typeof i.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===u(i.default)?function(t){return"undefined"==typeof t?"undefined":u(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":"undefined"==typeof t?"undefined":u(t)}},function(t,e,n){n(73);var r=n(5).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){n(74),t.exports=n(5).Object.keys},function(t,e,n){n(77),n(75),n(78),n(79),t.exports=n(5).Symbol},function(t,e,n){n(76),n(80),t.exports=n(27).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(7),o=n(71),i=n(70);t.exports=function(t){return function(e,n,a){var s,u=r(e),l=o(u.length),c=i(a,l);if(t&&n!=n){for(;l>c;)if(s=u[c++],s!=s)return!0}else for(;l>c;c++)if((t||c in u)&&u[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var r=n(53);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(13),o=n(37),i=n(20);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,s=n(t),u=i.f,l=0;s.length>l;)u.call(t,a=s[l++])&&e.push(a);return e}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(31);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(31);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(35),o=n(14),i=n(21),a={};n(6)(a,n(8)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(15)("meta"),o=n(12),i=n(3),a=n(4).f,s=0,u=Object.isExtensible||function(){return!0},l=!n(9)(function(){return u(Object.preventExtensions({}))}),c=function(t){a(t,r,{value:{i:"O"+ ++s,w:{}}})},f=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";c(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;c(t)}return t[r].w},d=function(t){return l&&h.NEED&&u(t)&&!i(t,r)&&c(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:p,onFreeze:d}},function(t,e,n){var r=n(4),o=n(10),i=n(13);t.exports=n(2)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),s=a.length,u=0;s>u;)r.f(t,n=a[u++],e[n]);return t}},function(t,e,n){var r=n(20),o=n(14),i=n(7),a=n(25),s=n(3),u=n(33),l=Object.getOwnPropertyDescriptor;e.f=n(2)?l:function(t,e){if(t=i(t),e=a(e,!0),u)try{return l(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(7),o=n(36).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(t){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?s(t):o(r(t))}},function(t,e,n){var r=n(3),o=n(40),i=n(22)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(11),o=n(5),i=n(9);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",a)}},function(t,e,n){var r=n(24),o=n(16);t.exports=function(t){return function(e,n){var i,a,s=String(o(e)),u=r(n),l=s.length;return u<0||u>=l?t?"":void 0:(i=s.charCodeAt(u),i<55296||i>56319||u+1===l||(a=s.charCodeAt(u+1))<56320||a>57343?t?s.charAt(u):i:t?s.slice(u,u+2):(i-55296<<10)+(a-56320)+65536)}}},function(t,e,n){var r=n(24),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(24),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){"use strict";var r=n(54),o=n(62),i=n(18),a=n(7);t.exports=n(34)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(11);r(r.S+r.F*!n(2),"Object",{defineProperty:n(4).f})},function(t,e,n){var r=n(40),o=n(13);n(68)("keys",function(){return function(t){return o(r(t))}})},function(t,e){},function(t,e,n){"use strict";var r=n(69)(!0);n(34)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(1),o=n(3),i=n(2),a=n(11),s=n(39),u=n(63).KEY,l=n(9),c=n(23),f=n(21),p=n(15),d=n(8),h=n(27),b=n(26),v=n(57),g=n(60),y=n(10),m=n(7),x=n(25),w=n(14),S=n(35),O=n(66),_=n(65),j=n(4),P=n(13),k=_.f,A=j.f,M=O.f,L=r.Symbol,C=r.JSON,T=C&&C.stringify,E="prototype",V=d("_hidden"),F=d("toPrimitive"),$={}.propertyIsEnumerable,B=c("symbol-registry"),N=c("symbols"),D=c("op-symbols"),I=Object[E],R="function"==typeof L,z=r.QObject,H=!z||!z[E]||!z[E].findChild,G=i&&l(function(){return 7!=S(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=k(I,e);r&&delete I[e],A(t,e,n),r&&t!==I&&A(I,e,r)}:A,U=function(t){var e=N[t]=S(L[E]);return e._k=t,e},W=R&&"symbol"==typeof L.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof L},J=function(t,e,n){return t===I&&J(D,e,n),y(t),e=x(e,!0),y(n),o(N,e)?(n.enumerable?(o(t,V)&&t[V][e]&&(t[V][e]=!1),n=S(n,{enumerable:w(0,!1)})):(o(t,V)||A(t,V,w(1,{})),t[V][e]=!0),G(t,e,n)):A(t,e,n)},K=function(t,e){y(t);for(var n,r=v(e=m(e)),o=0,i=r.length;i>o;)J(t,n=r[o++],e[n]);return t},Y=function(t,e){return void 0===e?S(t):K(S(t),e)},q=function(t){var e=$.call(this,t=x(t,!0));return!(this===I&&o(N,t)&&!o(D,t))&&(!(e||!o(this,t)||!o(N,t)||o(this,V)&&this[V][t])||e)},Q=function(t,e){if(t=m(t),e=x(e,!0),t!==I||!o(N,e)||o(D,e)){var n=k(t,e);return!n||!o(N,e)||o(t,V)&&t[V][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=M(m(t)),r=[],i=0;n.length>i;)o(N,e=n[i++])||e==V||e==u||r.push(e);return r},X=function(t){for(var e,n=t===I,r=M(n?D:m(t)),i=[],a=0;r.length>a;)!o(N,e=r[a++])||n&&!o(I,e)||i.push(N[e]);return i};R||(L=function(){if(this instanceof L)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===I&&e.call(D,n),o(this,V)&&o(this[V],t)&&(this[V][t]=!1),G(this,t,w(1,n))};return i&&H&&G(I,t,{configurable:!0,set:e}),U(t)},s(L[E],"toString",function(){return this._k}),_.f=Q,j.f=J,n(36).f=O.f=Z,n(20).f=q,n(37).f=X,i&&!n(19)&&s(I,"propertyIsEnumerable",q,!0),h.f=function(t){return U(d(t))}),a(a.G+a.W+a.F*!R,{Symbol:L});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;)d(tt[et++]);for(var nt=P(d.store),rt=0;nt.length>rt;)b(nt[rt++]);a(a.S+a.F*!R,"Symbol",{for:function(t){return o(B,t+="")?B[t]:B[t]=L(t)},keyFor:function(t){if(!W(t))throw TypeError(t+" is not a symbol!");for(var e in B)if(B[e]===t)return e},useSetter:function(){H=!0},useSimple:function(){H=!1}}),a(a.S+a.F*!R,"Object",{create:Y,defineProperty:J,defineProperties:K,getOwnPropertyDescriptor:Q,getOwnPropertyNames:Z,getOwnPropertySymbols:X}),C&&a(a.S+a.F*(!R||l(function(){var t=L();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!W(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!W(e))return e}),r[1]=e,T.apply(C,r)}}}),L[E][F]||n(6)(L[E],F,L[E].valueOf),f(L,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){n(26)("asyncIterator")},function(t,e,n){n(26)("observable")},function(t,e,n){n(72);for(var r=n(1),o=n(6),i=n(18),a=n(8)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),u=0;u<s.length;u++){var l=s[u],c=r[l],f=c&&c.prototype;f&&!f[a]&&o(f,a,l),i[l]=i.Array}},function(t,e,n){e=t.exports=n(82)(),e.push([t.id,'.v-select{position:relative;font-family:sans-serif}.v-select .disabled{cursor:not-allowed!important;background-color:#f8f8f8!important}.v-select,.v-select *{box-sizing:border-box}.v-select.rtl .open-indicator{left:10px;right:auto}.v-select.rtl .selected-tag{float:right;margin-right:3px;margin-left:1px}.v-select.rtl .dropdown-menu{text-align:right}.v-select .open-indicator{position:absolute;bottom:6px;right:10px;cursor:pointer;pointer-events:all;opacity:1;height:20px}.v-select .open-indicator,.v-select .open-indicator:before{display:inline-block;transition:all .15s cubic-bezier(1,-.115,.975,.855);transition-timing-function:cubic-bezier(1,-.115,.975,.855);width:10px}.v-select .open-indicator:before{border-color:rgba(60,60,60,.5);border-style:solid;border-width:3px 3px 0 0;content:"";height:10px;vertical-align:top;transform:rotate(133deg);box-sizing:inherit}.v-select.open .open-indicator:before{transform:rotate(315deg)}.v-select.loading .open-indicator{opacity:0}.v-select.open .open-indicator{bottom:1px}.v-select .dropdown-toggle{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;padding:0;background:none;border:1px solid rgba(60,60,60,.26);border-radius:4px;white-space:normal}.v-select .dropdown-toggle:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}.v-select.searchable .dropdown-toggle{cursor:text}.v-select.unsearchable .dropdown-toggle{cursor:pointer}.v-select.open .dropdown-toggle{border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0}.v-select .dropdown-menu{display:block;position:absolute;top:100%;left:0;z-index:1000;min-width:160px;padding:5px 0;margin:0;width:100%;overflow-y:scroll;border:1px solid rgba(0,0,0,.26);box-shadow:0 3px 6px 0 rgba(0,0,0,.15);border-top:none;border-radius:0 0 4px 4px;text-align:left;list-style:none;background:#fff}.v-select .no-options{text-align:center}.v-select .selected-tag{color:#333;background-color:#f0f0f0;border:1px solid #ccc;border-radius:4px;height:26px;margin:4px 1px 0 3px;padding:1px .25em;float:left;line-height:24px}.v-select.single .selected-tag{background-color:transparent;border-color:transparent}.v-select.single.open .selected-tag{position:absolute;opacity:.5}.v-select.single.loading .selected-tag,.v-select.single.open.searching .selected-tag{display:none}.v-select .selected-tag .close{float:none;margin-right:0;font-size:20px;appearance:none;padding:0;cursor:pointer;background:0 0;border:0;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}.v-select.single.searching:not(.open):not(.loading) input[type=search]{opacity:.2}.v-select input[type=search]::-webkit-search-cancel-button,.v-select input[type=search]::-webkit-search-decoration,.v-select input[type=search]::-webkit-search-results-button,.v-select input[type=search]::-webkit-search-results-decoration{display:none}.v-select input[type=search]::-ms-clear{display:none}.v-select input[type=search],.v-select input[type=search]:focus{appearance:none;-webkit-appearance:none;-moz-appearance:none;line-height:1.42857143;font-size:1em;height:34px;display:inline-block;border:none;outline:none;margin:0;padding:0 .5em;width:10em;max-width:100%;background:none;position:relative;box-shadow:none;float:left;clear:none}.v-select li{line-height:1.42857143}.v-select li>a{display:block;padding:3px 20px;clear:both;color:#333;white-space:nowrap}.v-select li:hover{cursor:pointer}.v-select .dropdown-menu .active>a{color:#333;background:rgba(50,50,50,.1)}.v-select .dropdown-menu>.highlight>a{background:#5897fb;color:#fff}.v-select .highlight:not(:last-child){margin-bottom:0}.v-select .spinner{opacity:0;position:absolute;top:5px;right:10px;font-size:5px;text-indent:-9999em;overflow:hidden;border-top:.9em solid hsla(0,0%,39%,.1);border-right:.9em solid hsla(0,0%,39%,.1);border-bottom:.9em solid hsla(0,0%,39%,.1);border-left:.9em solid rgba(60,60,60,.45);transform:translateZ(0);animation:vSelectSpinner 1.1s infinite linear;transition:opacity .1s}.v-select .spinner,.v-select .spinner:after{border-radius:50%;width:5em;height:5em}.v-select.loading .spinner{opacity:1}@-webkit-keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.fade-enter-active,.fade-leave-active{transition:opacity .15s cubic-bezier(1,.5,.8,1)}.fade-enter,.fade-leave-to{opacity:0}',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){n(87);var r=n(84)(n(41),n(85),null,null);t.exports=r.exports},function(t,e){t.exports=function(t,e,n,r){var o,i=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,i=t.default);var s="function"==typeof i?i.options:i;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),r){var u=s.computed||(s.computed={});Object.keys(r).forEach(function(t){var e=r[t];u[t]=function(){return e}})}return{esModule:o,exports:i,options:s}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown v-select",class:t.dropdownClasses,attrs:{dir:t.dir}},[n("div",{ref:"toggle",class:["dropdown-toggle","clearfix",{disabled:t.disabled}],on:{mousedown:function(e){e.preventDefault(),t.toggleDropdown(e)}}},[t._l(t.valueAsArray,function(e){return n("span",{key:e.index,staticClass:"selected-tag"},[t._t("selected-option",[t._v("\n        "+t._s(t.getOptionLabel(e))+"\n      ")],null,e),t._v(" "),t.multiple?n("button",{staticClass:"close",attrs:{type:"button","aria-label":"Remove option"},on:{click:function(n){t.deselect(e)}}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]):t._e()],2)}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],ref:"search",class:[{disabled:t.disabled},"form-control"],style:{width:t.isValueEmpty?"100%":"auto"},attrs:{type:"search",placeholder:t.searchPlaceholder,readonly:!t.searchable,id:t.inputId,"aria-label":"Search for option"},domProps:{value:t.search},on:{keydown:[function(e){return"button"in e||!t._k(e.keyCode,"delete",[8,46])?void t.maybeDeleteValue(e):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38)?(e.preventDefault(),void t.typeAheadUp(e)):null},function(e){return"button"in e||!t._k(e.keyCode,"down",40)?(e.preventDefault(),void t.typeAheadDown(e)):null},function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?(e.preventDefault(),void t.typeAheadSelect(e)):null}],keyup:function(e){return"button"in e||!t._k(e.keyCode,"esc",27)?void t.onEscape(e):null},blur:t.onSearchBlur,focus:t.onSearchFocus,input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),t.noDrop?t._e():n("i",{ref:"openIndicator",class:[{disabled:t.disabled},"open-indicator"],attrs:{role:"presentation"}}),t._v(" "),t._t("spinner",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.mutableLoading,expression:"mutableLoading"}],staticClass:"spinner"},[t._v("Loading...")])])],2),t._v(" "),n("transition",{attrs:{name:t.transition}},[t.dropdownOpen?n("ul",{ref:"dropdownMenu",staticClass:"dropdown-menu",style:{"max-height":t.maxHeight}},[t._l(t.filteredOptions,function(e,r){return n("li",{key:r,class:{active:t.isOptionSelected(e),highlight:r===t.typeAheadPointer},on:{mouseover:function(e){t.typeAheadPointer=r}}},[n("a",{on:{mousedown:function(n){n.preventDefault(),t.select(e)}}},[t._t("option",[t._v("\n          "+t._s(t.getOptionLabel(e))+"\n        ")],null,e)],2)])}),t._v(" "),t.filteredOptions.length?t._e():n("li",{
staticClass:"no-options"},[t._t("no-options",[t._v("Sorry, no matching options.")])],2)],2):t._e()])],1)},staticRenderFns:[]}},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=f[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(u(r.parts[i],e))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(u(r.parts[i],e));f[r.id]={id:r.id,refs:1,parts:a}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],i=o[0],a=o[1],s=o[2],u=o[3],l={css:a,media:s,sourceMap:u};n[i]?n[i].parts.push(l):e.push(n[i]={id:i,parts:[l]})}return e}function i(t,e){var n=h(),r=g[g.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),g.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=g.indexOf(t);e>=0&&g.splice(e,1)}function s(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function u(t,e){var n,r,o;if(e.singleton){var i=v++;n=b||(b=s(e)),r=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else n=s(e),r=c.bind(null,n),o=function(){a(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}function l(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function c(t,e){var n=e.css,r=e.media,o=e.sourceMap;if(r&&t.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var f={},p=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},d=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,v=0,g=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=d()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],u=f[s.id];u.refs--,i.push(u)}if(t){var l=o(t);r(l,e)}for(var a=0;a<i.length;a++){var u=i[a];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete f[u.id]}}}};var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){var r=n(81);"string"==typeof r&&(r=[[t.id,r,""]]);n(86)(r,{});r.locals&&(t.exports=r.locals)}])});

},{}]},{},[35])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29uZmlnL2FsbC5qcyIsImFwcC9jb25maWcvaW5kZXguanMiLCJmcm9udC9iYWNrb2ZmaWNlL2FwaS9pbmRleC5qcyIsImZyb250L2JhY2tvZmZpY2UvYXBpL21lc3NhZ2VzLmpzIiwiZnJvbnQvYmFja29mZmljZS9hcGkvcm91dGVzLmpzIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL2xvYWRlci9Mb2FkZXIuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvbG9hZGVyL0xvYWRlci52dWU/MDMzMDIyYjQiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvY29tcG9uZW50cy9hY3Rpb25fYnV0dG9uL0FjdGlvbkJ1dHRvbi5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2FjdGlvbl9idXR0b24vQWN0aW9uQnV0dG9uLnZ1ZT8xZDgxNzkwMSIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL2R5bmFtaWNfZm9ybS9EeW5hbWljRm9ybS5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL2R5bmFtaWNfZm9ybS9EeW5hbWljRm9ybS52dWU/ZmU1MDA5ZjIiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvY29tcG9uZW50cy9mb3Jtcy9lbGVtZW50cy9pbnB1dC9JbnB1dC5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL2VsZW1lbnRzL2lucHV0L0lucHV0LnZ1ZT8yOTYwNGRjNiIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL2VsZW1lbnRzL3NlbGVjdC9TZWxlY3QuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvY29tcG9uZW50cy9mb3Jtcy9lbGVtZW50cy9zZWxlY3QvU2VsZWN0LnZ1ZT8zY2JjMjRiYSIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL2VsZW1lbnRzL3ZhcmlhZGljX2VsZW1lbnQvVmFyaWFkaWNFbGVtZW50LmpzIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvZm9ybXMvZWxlbWVudHMvdmFyaWFkaWNfZWxlbWVudC9WYXJpYWRpY0VsZW1lbnQudnVlPzU3NDNmYjZhIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvZm9ybXMvZm9ybS9Gb3JtLmpzIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvZm9ybXMvZm9ybS9Gb3JtLnZ1ZT81ZTdiNWUyOCIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL21peGlucy9JbnB1dE1peGluLmpzIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvcGFnaW5hdG9yL1BhZ2luYXRvci5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL3BhZ2luYXRvci9QYWdpbmF0b3IudnVlPzBjMWE2YzU0IiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvd2lkZ2V0L1dpZGdldC5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL3dpZGdldC9XaWRnZXQudnVlPzIzZTFjNDk5IiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL3BhcnRzL2Zvb3Rlci9Gb290ZXIuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvcGFydHMvZm9vdGVyL0Zvb3Rlci52dWU/NjE4MTM1MTIiLCJmcm9udC9iYWNrb2ZmaWNlL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvcGFydHMvaGVhZGVyL0hlYWRlci5qcyIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9wYXJ0cy9oZWFkZXIvSGVhZGVyLnZ1ZT8zMGMxZjhmOSIsImZyb250L2JhY2tvZmZpY2UvY29tcG9uZW50cy90aGVtZXMvaW5lZC9wYXJ0cy9uYXZiYXIvTmF2YmFyLmpzIiwiZnJvbnQvYmFja29mZmljZS9jb21wb25lbnRzL3RoZW1lcy9pbmVkL3BhcnRzL25hdmJhci9OYXZiYXIudnVlPzEzMWZlYWU5IiwiZnJvbnQvYmFja29mZmljZS9saXN0cy9lbnZpcm9ubWVudHMuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2xpc3RzL2ZpZWxkdHlwZXMuanMiLCJmcm9udC9iYWNrb2ZmaWNlL2xpc3RzL2xhbmdzLmpzIiwiZnJvbnQvYmFja29mZmljZS9saXN0cy9xdWFudGl0aWVzLmpzIiwiZnJvbnQvYmFja29mZmljZS9tYWluLmpzIiwiZnJvbnQvYmFja29mZmljZS9tZW51cy5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvQXBwLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9BcHAudnVlPzUzODNkNWU4IiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9jb25maWcvQ29uZmlnLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9jb25maWcvQ29uZmlnLnZ1ZT83NDM0NDcxNCIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZGF0YWluc3RhbmNlL0RhdGFpbnN0YW5jZS5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZGF0YWluc3RhbmNlL0RhdGFpbnN0YW5jZS52dWU/YjNiZjAxNjgiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL2RhdGFzb3VyY2UvRGF0YXNvdXJjZS5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZGF0YXNvdXJjZS9EYXRhc291cmNlLnZ1ZT80NDdiOTZjOCIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvZm9ybS9Gb3JtLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9mb3JtL0Zvcm0udnVlPzcxYTMyNGE4IiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy9ob21lL0hvbWUuanMiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL2hvbWUvSG9tZS52dWU/NTEyNGIyMWUiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL2xhbmcvTGFuZy5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvbGFuZy9MYW5nLnZ1ZT8wM2QxMWFlYSIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvbWl4aW5zL0Zvcm1NaXhpbi5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvbWl4aW5zL0xhbmdNaXhpbi5qcyIsImZyb250L2JhY2tvZmZpY2UvcGFnZXMvbWl4aW5zL1JlYWRlck1peGluLmpzIiwiZnJvbnQvYmFja29mZmljZS9wYWdlcy91c2VyL1VzZXIuanMiLCJmcm9udC9iYWNrb2ZmaWNlL3BhZ2VzL3VzZXIvVXNlci52dWU/ODRlYjM5MGEiLCJmcm9udC9iYWNrb2ZmaWNlL3JvdXRlci5qcyIsImZyb250L2JhY2tvZmZpY2Uvcm91dGVzLmpzIiwiZnJvbnQvYmFja29mZmljZS9zdG9yZS9hY3Rpb25zLmpzIiwiZnJvbnQvYmFja29mZmljZS9zdG9yZS9nZXR0ZXJzLmpzIiwiZnJvbnQvYmFja29mZmljZS9zdG9yZS9pbmRleC5qcyIsImZyb250L2JhY2tvZmZpY2Uvc3RvcmUvbXV0YXRpb25zLmpzIiwiZnJvbnQvYmFja29mZmljZS9zdG9yZS9zdGF0ZS5qcyIsImZyb250L2JhY2tvZmZpY2UvdXRpbHMvYnJvd3Nlci5qcyIsImZyb250L2JhY2tvZmZpY2UvdXRpbHMvc3RyaW5ncy5qcyIsImZyb250L2JhY2tvZmZpY2UvdXRpbHMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb21wb25lbnQtZW1pdHRlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUtbW9kdWxlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9hZ2VudC1iYXNlLmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVxdWVzdC1iYXNlLmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3Jlc3BvbnNlLWJhc2UuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdnVlLXNlbGVjdC9kaXN0L3Z1ZS1zZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNBQSxJQUFNLE9BQU8sUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTSxNQUFNO0FBQ1IsVUFBTSxLQUFLLE9BQUwsQ0FBYSxLQUFLLElBQUwsQ0FBVSxTQUFWLEVBQXFCLElBQXJCLENBQWIsQ0FERTtBQUVSLG1CQUFlO0FBQ1gsc0JBQWM7QUFESCxLQUZQO0FBS1IsWUFBUTtBQUNKLGlCQUFTO0FBREwsS0FMQTtBQVFSLFNBQUs7QUFDRCxnQkFBUTtBQUNKLHFCQUFTLElBREw7QUFFSixvQkFBUTtBQUZKLFNBRFA7QUFLRCxpQkFBUztBQUNMLHFCQUFTLElBREo7QUFFTCxvQkFBUTtBQUZILFNBTFI7QUFTRCxrQkFBVSxDQUFDLE1BQUQsRUFBUyxNQUFUO0FBVFQsS0FSRztBQW1CUixjQUFVLENBQUM7QUFDUCxjQUFNLFVBREM7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbktBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdDVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TkE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmNvbnN0IGFsbCA9IHtcbiAgICByb290OiBwYXRoLnJlc29sdmUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJykpLFxuICAgIGVsYXN0aWNzZWFyY2g6IHtcbiAgICAgICAgaW5kZXhfcHJlZml4OiAncG9zJyxcbiAgICB9LFxuICAgIGxvZ2dlcjoge1xuICAgICAgICBsb2dGaWxlOiAnbWlkc3RvZC5sb2cnLFxuICAgIH0sXG4gICAgYXBpOiB7XG4gICAgICAgIHB1YmxpYzoge1xuICAgICAgICAgICAgdmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICAgIHByZWZpeDogJy9hcGkvcHVibGljJyxcbiAgICAgICAgfSxcbiAgICAgICAgcHJpdmF0ZToge1xuICAgICAgICAgICAgdmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICAgIHByZWZpeDogJy9hcGkvcHJpdmF0ZScsXG4gICAgICAgIH0sXG4gICAgICAgIGludGVydmFsOiBbMTIwMDAwLCAxMjAwMDBdLFxuICAgIH0sXG4gICAgZW50aXRpZXM6IFt7XG4gICAgICAgIG5hbWU6ICdjaXRhdGlvbicsXG4gICAgICAgIHRleHQ6ICdDaXRhdGlvbicsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdhcGl1c2VyJyxcbiAgICAgICAgdGV4dDogJ1VzZXIgb2YgQVBJJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3VzZXInLFxuICAgICAgICB0ZXh0OiAnVXNlcicsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdpbnN0aXR1dGlvbicsXG4gICAgICAgIHRleHQ6ICdJbnN0aXR1dGlvbicsXG4gICAgfSxcbiAgICBdLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhbGw7XG4iLCJjb25zdCBiYXNlQ29uZmlnID0gcmVxdWlyZSgnLi9hbGwnKTtcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuY29uc3QgZW52ID0gXCJkZXZlbG9wbWVudFwiIHx8ICdkZXZlbG9wbWVudCc7XG5sZXQgdG1wO1xudHJ5IHtcbiAgdG1wID0gcmVxdWlyZShgLi8ke2Vudn0uanNgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxufSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0bXAgPSB7fTtcbiAgICAvLyBwcm9jZXNzLmV4aXQoMSk7XG59XG5cbmNvbnN0IGNvbmZpZyA9IF8ubWVyZ2UoYmFzZUNvbmZpZywgdG1wKTtcbm1vZHVsZS5leHBvcnRzID0gY29uZmlnO1xuIiwiY29uc3QgUmVxdWVzdCA9IHJlcXVpcmUoJ3N1cGVyYWdlbnQnKTtcbmNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi9tZXNzYWdlcycpO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoKG9iamVjdCkge1xuICAgIGNvbnN0IHsgbWV0aG9kLCBwYXRoLCBib2R5LCBjb21taXQgfSA9IG9iamVjdDtcblxuICAgIGxldCBzdXBlcl9yZXF1ZXN0ID0gUmVxdWVzdFttZXRob2QudG9Mb3dlckNhc2UoKV0ocGF0aClcbiAgICAgICAgLnNldCgnQXV0aG9yaXphdGlvbicsICdiZmEzZTgwMy0yMTdlLTRmMDAtOTdlZC01ZjY0MTc0NjQ0ODROMWEtRm1LdFc6dGVzdCcpO1xuICAgIGlmIChib2R5ICE9IG51bGwgJiYgT2JqZWN0LmtleXMoYm9keSkubGVuZ3RoID4gMCkge1xuICAgICAgICBzdXBlcl9yZXF1ZXN0ID0gc3VwZXJfcmVxdWVzdC5zZW5kKG9iamVjdC5ib2R5KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBzdXBlcl9yZXF1ZXN0O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogTWVzc2FnZXMuU1VDQ0VTUyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5ib2R5LFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogTWVzc2FnZXMuRkFJTFVSRSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGVyci5yZXNwb25zZSAhPSBudWxsID8gZXJyLnJlc3BvbnNlLmJvZHkgOiBlcnIsXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmZXRjaCxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBMT0FESU5HOiAnbG9hZGluZycsXG4gICAgU1VDQ0VTUzogJ3N1Y2Nlc3MnLFxuICAgIEZBSUxVUkU6ICdmYWlsdXJlJyxcbiAgICBGRVRDSDogJ2ZldGNoJyxcbiAgICBFUlJPUjogJ2Vycm9yJyxcbiAgICBDUkVBVEVfRk9STTogJ2NyZWF0ZV9mb3JtJyxcbiAgICBDQU5DRUxfRk9STTogJ2NhbmNlbF9mb3JtJyxcbiAgICBSRU1PVkVfRk9STTogJ3JlbW92ZV9mb3JtJyxcbiAgICBSRU1PVkVfQUxMX0ZPUk1TOiAncmVtb3ZlX2FsbF9mb3JtcycsXG4gICAgVVBEQVRFX01PREVfRk9STTogJ3VwZGF0ZV9tb2RlX2Zvcm0nLFxuICAgIFRPR0dMRV9SRUNMQUlNX0ZPUk06ICd0b2dnbGVfcmVjbGFpbV9mb3JtJyxcbiAgICBSRUNMQUlNX0ZPUk1fRUxFTUVOVDogJ3JlY2xhaW1fZm9ybV9lbGVtZW50JyxcbiAgICBBRERfVE9fRk9STV9QT09MOiAnYWRkX3RvX2Zvcm1fcG9vbCcsXG4gICAgUkVNT1ZFX0ZST01fRk9STV9QT09MOiAncmVtb3ZlX2Zyb21fZm9ybV9wb29sJyxcbn07XG4iLCJjb25zdCBDb25maWcgPSByZXF1aXJlKCcuLi8uLi8uLi9hcHAvY29uZmlnJyk7XG5cbmNvbnN0IHByZWZpeCA9IGAke0NvbmZpZy5hcGkucHVibGljLnByZWZpeH0vJHtDb25maWcuYXBpLnB1YmxpYy52ZXJzaW9ufWA7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVudGl0eShlbnRpdHksIG1ldGhvZCwgc2VhcmNoID0gZmFsc2UsIGlkID0gbnVsbCkge1xuICAgICAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICBjYXNlICdHRVQnOiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gYCR7cHJlZml4fS8ke2VudGl0eX1gO1xuICAgICAgICAgICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gJ3MnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdQT1NUJzoge1xuICAgICAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtwcmVmaXh9LyR7ZW50aXR5fXMvc2VhcmNoYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBgJHtwcmVmaXh9LyR7ZW50aXR5fWA7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUFVUJzpcbiAgICAgICAgICAgIHJldHVybiBgJHtwcmVmaXh9LyR7ZW50aXR5fWA7XG4gICAgICAgIGNhc2UgJ0RFTCc6XG4gICAgICAgICAgICByZXR1cm4gYCR7cHJlZml4fS8ke2VudGl0eX0vJHtpZH1gO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuYW1lOiAnTG9hZGVyJyxcbiAgICBwcm9wczogWydwcmltYXJ5Q29sb3InLCAnc2Vjb25kYXJ5Q29sb3InXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJpbWFyeUNvbG9yLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5zZWNvbmRhcnlDb2xvcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJtc3ctbG9hZGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgc2Vjb25kYXJ5LWNvbG9yXCIgOnN0eWxlPVwiY3NzLnNlY29uZGFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgc2Vjb25kYXJ5LWNvbG9yXCIgOnN0eWxlPVwiY3NzLnNlY29uZGFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgc2Vjb25kYXJ5LWNvbG9yIGxvYWRlci1sYXN0XCIgOnN0eWxlPVwiY3NzLnNlY29uZGFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgcHJpbWFyeS1jb2xvciBsb2FkZXItY2xlYXJcIiA6c3R5bGU9XCJjc3MucHJpbWFyeVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1zcXVhcmUgcHJpbWFyeS1jb2xvclwiIDpzdHlsZT1cImNzcy5wcmltYXJ5XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGVyLXNxdWFyZSBwcmltYXJ5LWNvbG9yIGxvYWRlci1sYXN0XCIgOnN0eWxlPVwiY3NzLnByaW1hcnlcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkZXItc3F1YXJlIHNlY29uZGFyeS1jb2xvciBsb2FkZXItY2xlYXJcIiA6c3R5bGU9XCJjc3Muc2Vjb25kYXJ5XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGVyLXNxdWFyZSBzZWNvbmRhcnktY29sb3JcIiA6c3R5bGU9XCJjc3Muc2Vjb25kYXJ5XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGVyLXNxdWFyZSBzZWNvbmRhcnktY29sb3IgbG9hZGVyLWxhc3RcIiA6c3R5bGU9XCJjc3Muc2Vjb25kYXJ5XCIgLz5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Mb2FkZXInKTtcbjwvc2NyaXB0PlxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgICAgdHdvU3RlcHM6IHsgZGVmYXVsdDogZmFsc2UsIHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgICAgY29uZmlybWF0aW9uOiB7IGRlZmF1bHQ6ICdBcmUgeW91IHN1cmU/JywgdHlwZTogU3RyaW5nIH0sXG4gICAgfSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGNsaWNrKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR3b1N0ZXBzICYmICF0aGlzLnN0YXRlLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNvbmZpcm0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLnN0YXRlLmNvbmZpcm0gPSBmYWxzZTsgfSwgMzAwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY29uZmlybSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2FjdGlvbi1jbGljaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuICAgIDxidXR0b24gQGNsaWNrPVwiY2xpY2tcIj5cbiAgICAgICAgPHNsb3Qgdi1pZj1cIiFzdGF0ZS5jb25maXJtXCI+XG5cbiAgICAgICAgPC9zbG90PlxuICAgICAgICA8c3BhbiB2LWVsc2U+XG4gICAgICAgICAgICB7e2NvbmZpcm1hdGlvbn19XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0FjdGlvbkJ1dHRvbicpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBMYW5nTWl4aW4gPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi8uLi9wYWdlcy9taXhpbnMvTGFuZ01peGluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW0xhbmdNaXhpbl0sXG4gICAgcHJvcHM6IHtcbiAgICAgICAgZm9ybTogeyByZXF1aXJlZDogdHJ1ZSB9LFxuICAgICAgICBjZm9ybTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgIHByZWZpeDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICcnIH0sXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGdldF9uYW1lKG5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZWZpeCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5wcmVmaXh9LiR7bmFtZX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cImZpZWxkIGluIGZvcm0uZmllbGRzXCI+XG4gICAgICAgICAgICA8ZnZhcmlhZGljLWVsZW1lbnQgY2xhc3M9XCJmaWVsZFwiIDpuYW1lPVwiZmllbGQubXVsdGlwbGVfbmFtZVwiIDpmb3JtPVwiY2Zvcm1cIiB2LWlmPVwiZmllbGQubXVsdGlwbGVcIj5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInZhcmlhZGljXCIgc2xvdC1zY29wZT1cInByb3BzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgXG4gICAgICAgICAgICAgICAgICAgIHYtaWY9XCJbJ2NoZWNrYm94JywgJ3JhZGlvJywgJ3RleHQnLCAnZW1haWwnLCAncGhvbmUnLCAncGFzc3dvcmQnLCAnbnVtYmVyJywgJ3RleHRhcmVhJ10uaW5kZXhPZihmaWVsZC50eXBlKSAhPT0gLTFcIlxuICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XCJsYW5nKGZpZWxkLmxhYmVsIHx8ICcnKVwiXG4gICAgICAgICAgICAgICAgICAgIDpuYW1lPVwiZ2V0X25hbWUoYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9LiR7ZmllbGQubmFtZX1gKVwiXG4gICAgICAgICAgICAgICAgICAgIDpwbGFjZWhvbGRlcj1cImxhbmcoZmllbGQucGxhY2Vob2xkZXIgfHwgJycpXCJcbiAgICAgICAgICAgICAgICAgICAgOnR5cGU9XCJmaWVsZC50eXBlXCJcbiAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJjZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkeW5hbWljLWZvcm0gXG4gICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cImZpZWxkLnN1YmZvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDpjZm9ybT1cImNmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpwcmVmaXg9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH1gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cImZpZWxkLnR5cGUgPT09ICdzdWJmb3JtJyAmJiBmaWVsZC5zdWJmb3JtICE9IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvZHluYW1pYy1mb3JtPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2Z2YXJpYWRpYy1lbGVtZW50PlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8ZmlucHV0IFxuICAgICAgICAgICAgICAgIHYtaWY9XCJbJ2NoZWNrYm94JywgJ3JhZGlvJywgJ3RleHQnLCAnZW1haWwnLCAncGhvbmUnLCAncGFzc3dvcmQnLCAnbnVtYmVyJywgJ3RleHRhcmVhJ10uaW5kZXhPZihmaWVsZC50eXBlKSAhPT0gLTFcIlxuICAgICAgICAgICAgICAgIDpsYWJlbD1cImxhbmcoZmllbGQubGFiZWwgfHwgJycpXCJcbiAgICAgICAgICAgICAgICA6bmFtZT1cImdldF9uYW1lKGZpZWxkLm5hbWUsIG51bGwpXCJcbiAgICAgICAgICAgICAgICA6cGxhY2Vob2xkZXI9XCJsYW5nKGZpZWxkLnBsYWNlaG9sZGVyIHx8ICcnKVwiXG4gICAgICAgICAgICAgICAgOnR5cGU9XCJmaWVsZC50eXBlXCJcbiAgICAgICAgICAgICAgICA6Zm9ybT1cImNmb3JtXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkeW5hbWljLWZvcm0gXG4gICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZmllbGQuc3ViZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICA6Y2Zvcm09XCJjZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cImZpZWxkLnR5cGUgPT09ICdzdWJmb3JtJyAmJiBmaWVsZC5zdWJmb3JtICE9IG51bGxcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L2R5bmFtaWMtZm9ybT5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9EeW5hbWljRm9ybScpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBNZXNzYWdlcyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9tZXNzYWdlcycpO1xuY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi8uLi8uLi91dGlscy91dGlscycpO1xuY29uc3QgSW5wdXRNaXhpbiA9IHJlcXVpcmUoJy4uLy4uL21peGlucy9JbnB1dE1peGluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW0lucHV0TWl4aW5dLFxuICAgIHByb3BzOiB7XG4gICAgICAgIG5hbWU6IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICBsYWJlbDogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIHBsYWNlaG9sZGVyOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgaXNSZXF1aXJlZDogeyBkZWZhdWx0OiBmYWxzZSwgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgICB0eXBlOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgcmVhZDogeyBkZWZhdWx0OiBmYWxzZSwgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgICBoaWRkZW46IHsgZGVmYXVsdDogZmFsc2UsIHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgICAgZm9ybTogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIHJvd3M6IHsgZGVmYXVsdDogMTAgfSxcbiAgICAgICAgcmFkaW9CdXR0b25zOiB7IGRlZmF1bHQ6ICgpID0+IFtdLCB0eXBlOiBBcnJheSB9LFxuICAgIH0sXG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5kZWZhdWx0VmFsdWUoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgdXBkYXRlKCkge1xuICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuZm9ybV07XG4gICAgICAgICAgICBpZiAoZm9ybS51cGRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnZhbHVlID0gVXRpbHMuZmluZF92YWx1ZV93aXRoX3BhdGgoZm9ybS5jb250ZW50LCB0aGlzLm5hbWUuc3BsaXQoJy4nKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUudmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZWZhdWx0VmFsdWUoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAnY2hlY2tib3gnIHx8IHRoaXMudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIHdhdGNoOiB7XG4gICAgICAgIHJlY2xhaW0obikge1xuICAgICAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuUkVDTEFJTV9GT1JNX0VMRU1FTlQsIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogdGhpcy5mb3JtLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGluZm86IHRoaXMuc3RhdGUudmFsdWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbChuKSB7XG4gICAgICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJmaWVsZFwiXG4gICAgdi1pZj1cInR5cGUgPT09ICd0ZXh0JyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fCB0eXBlID09PSAncGFzc3dvcmQnIHx8IHR5cGUgPT09ICdlbWFpbCdcIlxuICAgID5cbiAgICA8bGFiZWwgOmZvcj1cIm5hbWVcIj57e2xhYmVsfX08c3BhbiB2LWlmPVwiaXNSZXF1aXJlZFwiIGNsYXNzPVwicmVkaWZ5XCI+Kjwvc3Bhbj48L2xhYmVsPlxuICAgIDxpbnB1dCB2LWlmPVwidHlwZSA9PT0gJ3RleHQnXCIgXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgdi1tb2RlbD1cInN0YXRlLnZhbHVlXCJcbiAgICAvPlxuICAgIDxpbnB1dCB2LWVsc2UtaWY9XCJ0eXBlID09PSAnbnVtYmVyJ1wiIFxuICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgdi1tb2RlbD1cInN0YXRlLnZhbHVlXCJcbiAgICAvPlxuICAgIDxpbnB1dCB2LWVsc2UtaWY9XCJ0eXBlID09PSAncGFzc3dvcmQnXCIgXG4gICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgIHYtbW9kZWw9XCJzdGF0ZS52YWx1ZVwiXG4gICAgLz5cbiAgICA8aW5wdXQgdi1lbHNlIFxuICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiXG4gICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICB2LW1vZGVsPVwic3RhdGUudmFsdWVcIlxuICAgIC8+XG4gICAgPGRpdiB2LWlmPVwidmFsaWRhdGlvbnMubGVuZ3RoID4gMFwiPlxuICAgICAgICA8cCB2LWZvcj1cInRleHQgaW4gdmFsaWRhdGlvbnNcIiBjbGFzcz1cInJlZGlmeSBpbmxpbmUtYmxvY2tcIj5cbiAgICAgICAgICAgIHt7dGV4dH19XG4gICAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IHYtZWxzZS1pZj1cInR5cGUgPT09ICd0ZXh0YXJlYSdcIiBjbGFzcz1cImZpZWxkXCI+XG4gICAgPGxhYmVsIGZvcj1cIm5hbWVcIj57e2xhYmVsfX08c3BhbiB2LWlmPVwiaXNSZXF1aXJlZFwiIGNsYXNzPVwicmVkaWZ5XCI+Kjwvc3Bhbj48L2xhYmVsPlxuICAgIDx0ZXh0YXJlYVxuICAgICAgICBjbGFzcz1cImlucHV0IHRleHRhcmVhXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICA6cm93cz1cInJvd3NcIlxuICAgICAgICB2LW1vZGVsPVwic3RhdGUudmFsdWVcIlxuICAgIC8+XG48L2Rpdj5cblxuPGRpdiB2LWVsc2UtaWY9XCJ0eXBlID09PSAncmFkaW8nXCIgY2xhc3M9XCJmaWVsZFwiPlxuICAgIDxsYWJlbCA6Zm9yPVwibmFtZVwiPnt7bGFiZWx9PHNwYW4gdi1pZj1cImlzUmVxdWlyZWRcIiBjbGFzcz1cInJlZGlmeVwiPio8L3NwYW4+PC9sYWJlbD5cbiAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgdi1mb3I9XCIoYnRuLCBpZHgpIGluIHJhZGlvQnV0dG9uc1wiIGNsYXNzPVwicmFkaW8taW5saW5lXCIgZm9yPVwiYnRuWzBdXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInN0YXRlLnZhbHVlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7e2J0blsxXX19XG4gICAgICAgIDwvbGFiZWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cImZpZWxkXCIgdi1lbHNlLWlmPVwidHlwZSA9PT0gJ2NoZWNrYm94J1wiPlxuICAgIDxkaXYgIGNsYXNzPVwiY2hlY2tib3hcIj5cbiAgICAgICAgPGxhYmVsIDpmb3I9XCJuYW1lXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInN0YXRlLnZhbHVlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7e2xhYmVsfX1cbiAgICAgICAgPC9sYWJlbD5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vSW5wdXQnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgVlNlbGVjdCA9IHJlcXVpcmUoJ3Z1ZS1zZWxlY3QnKS5WdWVTZWxlY3Q7XG5jb25zdCBJbnB1dE1peGluID0gcmVxdWlyZSgnLi4vLi4vbWl4aW5zL0lucHV0TWl4aW4nKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL21lc3NhZ2VzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByb3BzOiB7XG4gICAgICAgIG5hbWU6IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IFN0cmluZyB9LFxuICAgICAgICBsYWJlbDogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIGlzUmVxdWlyZWQ6IHsgZGVmYXVsdDogZmFsc2UsIHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgICAgZm9ybTogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIG11bHRpOiB7IGRlZmF1bHQ6IGZhbHNlLCB0eXBlOiBCb29sZWFuIH0sXG4gICAgICAgIG9wdGlvbnM6IHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEFycmF5IH0sXG4gICAgICAgIGZpZWxkTGFiZWw6IHsgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiAnbGFiZWwnLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgZmllbGRWYWx1ZTogeyByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6ICd2YWx1ZScsIHR5cGU6IFN0cmluZyB9LFxuICAgIH0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICAndi1zZWxlY3QnOiBWU2VsZWN0LFxuICAgIH0sXG4gICAgbWl4aW5zOiBbSW5wdXRNaXhpbl0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5mb3JtXTtcbiAgICAgICAgICAgIGlmIChmb3JtLnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmZvID0gVXRpbHMuZmluZF92YWx1ZV93aXRoX3BhdGgoZm9ybS5jb250ZW50LCB0aGlzLm5hbWUuc3BsaXQoJy4nKSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOb29wXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmZvIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IGluZm8ubWFwKChvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWVsZExhYmVsIGluIG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmcgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKG9wID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb1t0aGlzLmZpZWxkVmFsdWVdID09PSBvcFt0aGlzLmZpZWxkVmFsdWVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaXNzaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW3RoaXMuZmllbGRMYWJlbF0gPSBtaXNzaW5nWzBdW3RoaXMuZmllbGRMYWJlbF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKG8gPT4gbyAhPSBudWxsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbmZvID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW5nID0gdGhpcy5vcHRpb25zLmZpbHRlcihvID0+IGluZm8gPT09IG9bdGhpcy5maWVsZFZhbHVlXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtaXNzaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8gPSB7IFt0aGlzLmZpZWxkVmFsdWVdOiBpbmZvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLmZpZWxkTGFiZWxdOiBtaXNzaW5nWzBdW3RoaXMuZmllbGRMYWJlbF0gfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb1t0aGlzLmZpZWxkVmFsdWVdID09PSBvW3RoaXMuZmllbGRWYWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWlzc2luZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0geyBbdGhpcy5maWVsZFZhbHVlXTogaW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5maWVsZExhYmVsXTogbWlzc2luZ1swXVt0aGlzLmZpZWxkTGFiZWxdIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gaW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25DaGFuZ2UodmFsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gdmFsO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0LWNoYW5nZScsIHZhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGV4dHJhY3RfdmFsdWVzKGluZm9zKSB7XG4gICAgICAgICAgICBpZiAoaW5mb3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5mb3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmZvcy5tYXAobyA9PiBvLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmZvcy52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0X29wdGlvbnMoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWVsZFZhbHVlID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKG8gPT5cbiAgICAgICAgICAgICAgICAoeyBsYWJlbDogb1t0aGlzLmZpZWxkTGFiZWxdLCB2YWx1ZTogb1t0aGlzLmZpZWxkVmFsdWVdIH0pKTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICAgIHJlY2xhaW0obikge1xuICAgICAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuUkVDTEFJTV9GT1JNX0VMRU1FTlQsIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogdGhpcy5mb3JtLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGluZm86IHRoaXMuZXh0cmFjdF92YWx1ZXModGhpcy5zdGF0ZS5zZWxlY3RlZCksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbChuKSB7XG4gICAgICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zKCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXRfb3B0aW9ucygpO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgYmVmb3JlTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZm9ybWF0X29wdGlvbnMoKTtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJmaWVsZFwiPlxuICAgIDxsYWJlbCA6Zm9yPVwibmFtZVwiPnt7bGFiZWx9fTxzcGFuIHYtaWY9XCJpc1JlcXVpcmVkXCIgY2xhc3M9XCJyZWRpZnlcIj4qPC9zcGFuPjwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgPHYtc2VsZWN0XG4gICAgICAgICAgICA6bXVsdGlwbGU9XCJtdWx0aVwiXG4gICAgICAgICAgICA6b3B0aW9ucz1cInN0YXRlLm9wdGlvbnNcIlxuICAgICAgICAgICAgOmxhYmVsPVwiZmllbGRMYWJlbFwiXG4gICAgICAgICAgICA6b24tY2hhbmdlPVwib25DaGFuZ2VcIlxuICAgICAgICAgICAgOnZhbHVlPVwic3RhdGUuc2VsZWN0ZWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgID5cbiAgICAgICAgPC92LXNlbGVjdD5cbiAgICA8L2Rpdj4gXG4gICAgPGRpdiB2LWlmPVwidmFsaWRhdGlvbnMubGVuZ3RoID4gMFwiPlxuICAgICAgICA8cCB2LWZvcj1cInRleHQgaW4gdmFsaWRhdGlvbnNcIiBjbGFzcz1cInJlZGlmeSBpbmxpbmUtYmxvY2tcIj5cbiAgICAgICAgICAgIHt7dGV4dH19XG4gICAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9TZWxlY3QnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgTWVzc2FnZXMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvbWVzc2FnZXMnKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdXRpbHMvdXRpbHMnKTtcbmNvbnN0IElucHV0TWl4aW4gPSByZXF1aXJlKCcuLi8uLi9taXhpbnMvSW5wdXRNaXhpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtJbnB1dE1peGluXSxcbiAgICBwcm9wczoge1xuICAgICAgICBuYW1lOiB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBTdHJpbmcgfSxcbiAgICAgICAgZm9ybTogeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIGFycmF5OiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWUgfSxcbiAgICAgICAgaXNSZXF1aXJlZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB0cnVlIH0sXG4gICAgICAgIHRhYnM6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcbiAgICB9LFxuXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHM6IFtdLFxuICAgICAgICAgICAgICAgIHRhYl9hY3RpdmU6IHRoaXMuaXNSZXF1aXJlZCA/IDAgOiAtMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgYWN0aXZhdGVfdGFiKGlkLCBlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRhYl9hY3RpdmUgPSBpZDtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZWxlbWVudHMucHVzaCh0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlKGlkLCBlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmVsZW1lbnRzLnNwbGljZShpZCwgMSwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5mb3JtXTtcbiAgICAgICAgICAgIGlmIChmb3JtLnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9iamVjdCA9IFV0aWxzLmZpbmRfdmFsdWVfd2l0aF9wYXRoKGZvcm0uY29udGVudCwgdGhpcy5uYW1lLnNwbGl0KCcuJykpO1xuICAgICAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVsZW1lbnRzID0gb2JqZWN0Lm1hcCgoKSA9PiB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVsZW1lbnRzID0gXy5tYXAob2JqZWN0LCAoKSA9PiB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZWxlbWVudHMgPSB0aGlzLmlzUmVxdWlyZWQgPyBbdHJ1ZV0gOiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcbiAgICB9LFxuXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgcmVjbGFpbShuKSB7XG4gICAgICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChNZXNzYWdlcy5SRUNMQUlNX0ZPUk1fRUxFTUVOVCwge1xuICAgICAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLmZvcm0sXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaW5mbzogdGhpcy5zdGF0ZS52YWx1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKG4pIHtcbiAgICAgICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1tYXJnaW5sZXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLXBhZGRpbmdsZXNzXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj0nIycgY2xhc3M9XCJpY29uIGhhcy10ZXh0LXN1Y2Nlc3NcIiBAY2xpY2s9XCJhZGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wbHVzXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIiB2LWlmPVwidGFicyAmJiBzdGF0ZS5lbGVtZW50cy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLTFcIj5cbiAgICAgICAgICAgICAgICA8cFxuICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihzaG93LCBpZHgpIGluIHN0YXRlLmVsZW1lbnRzXCIgXG4gICAgICAgICAgICAgICAgICAgIHYtaWY9XCJzaG93XCIgXG4gICAgICAgICAgICAgICAgICAgIDprZXk9XCJpZHhcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGEgQGNsaWNrPVwiYWN0aXZhdGVfdGFiKGlkeCwgJGV2ZW50KVwiIDpjbGFzcz1cImAke3N0YXRlLnRhYl9hY3RpdmUgPT09IGlkeCA/ICdpcy1zdWNjZXNzJzogJyd9IGJ1dHRvbiBpcy1zbWFsbGBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aWR4KzF9fSBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPScjJyBjbGFzcz1cImljb24gaXMtc21hbGwgaGFzLXRleHQtZGFuZ2VyXCIgQGNsaWNrPVwicmVtb3ZlKGlkeCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgdi1mb3I9XCIoc2hvdywgaWR4KSBpbiBzdGF0ZS5lbGVtZW50c1wiIFxuICAgICAgICAgICAgICAgIHYtaWY9XCJzaG93XCJcbiAgICAgICAgICAgICAgICB2LXNob3c9XCJzdGF0ZS50YWJfYWN0aXZlID09PSBpZHhcIlxuICAgICAgICAgICAgICAgIDprZXk9XCJpZHhcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNsb3QgXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidmFyaWFkaWNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDppZD1cImlkeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6Zm5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cIiF0YWJzICYmIHN0YXRlLmVsZW1lbnRzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgIDxkaXYgdi1mb3I9XCIoc2hvdywgaWR4KSBpbiBzdGF0ZS5lbGVtZW50c1wiIGNsYXNzPVwiY29sdW1uc1wiIHYtaWY9XCJzaG93XCIgOmtleT1cImlkeFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlzLXB1bGxlZC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj0nIycgY2xhc3M9XCJpY29uIGhhcy10ZXh0LWRhbmdlclwiIEBjbGljaz1cInJlbW92ZShpZHgsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNsb3QgXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ2YXJpYWRpY1wiIFxuICAgICAgICAgICAgICAgICAgICA6aWQ9XCJpZHhcIlxuICAgICAgICAgICAgICAgICAgICA6Zm5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vVmFyaWFkaWNFbGVtZW50Jyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vLi4vYXBpL21lc3NhZ2VzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi8uLi9hcGkvcm91dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByb3BzOiB7XG4gICAgICAgIG5hbWU6IHsgZGVmYXVsdDogJ2RlZmF1bHRfZm9ybScgfSxcbiAgICAgICAgcG9zdF9wYXRoOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICAgICAgcHV0X3BhdGg6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgICAgICBnZXRfcGF0aDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgIGdldF9mb3JtOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICB9LFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9tb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHN1Ym1pdChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuVE9HR0xFX1JFQ0xBSU1fRk9STSwge1xuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICByZWNsYWltOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuTE9BRElORywge1xuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMubmFtZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLlVQREFURV9NT0RFX0ZPUk0sIHsgZm9ybTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHt9LFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogZmFsc2UgfSk7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuVE9HR0xFX1JFQ0xBSU1fRk9STSwge1xuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICByZWNsYWltOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLkNBTkNFTF9GT1JNLCB7XG4gICAgICAgICAgICAgICAgZm9ybTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBiZWZvcmVNb3VudCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLkNSRUFURV9GT1JNLCB7IGZvcm06IHRoaXMubmFtZSwgY29udGVudDoge30gfSk7XG4gICAgfSxcblxuICAgIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChNZXNzYWdlcy5SRU1PVkVfRk9STSwgeyBmb3JtOiB0aGlzLm5hbWUgfSk7XG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIHVwZGF0ZV9tb2RlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmFtZSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnVwZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMubmFtZV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB9O1xuICAgICAgICB9LFxuICAgICAgICBsb2FkaW5nKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmFtZSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmxvYWRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGNsYWltcygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jbGFpbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmFtZSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnN1Y2Nlc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIHdhdGNoOiB7XG4gICAgICAgIHVwZGF0ZV9tb2RlKG4pIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudXBkYXRlX21vZGUgPSBuO1xuICAgICAgICB9LFxuICAgICAgICBjbGFpbXMobikge1xuICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMubmFtZV07XG4gICAgICAgICAgICBpZiAobiA9PT0gZm9ybS5wb29sKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBycGF0aDogdGhpcy5nZXRfcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcmZvcm06IHRoaXMuZ2V0X2Zvcm0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZvcm0uY29udGVudCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnVwZGF0ZV9tb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucGF0aCA9IHRoaXMucHV0X3BhdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCd1cGRhdGUnLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnBhdGggPSB0aGlzLnBvc3RfcGF0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2NyZWF0ZScsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcyhuKSB7XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48Zm9ybSBAc3VibWl0LnByZXZlbnQ9XCJzdWJtaXRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtaWY9XCJlcnJvci5mb3VuZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cIm1lc3NhZ2UgaXMtcmVkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkFuIGVycm9yIG9jY3VyZWQgLTwvc3Ryb25nPiB7e2Vycm9yLmNvbnRlbnQubWVzc2FnZX19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZWxzZS1pZj1cInN1Y2Nlc3MgIT0gbnVsbCAmJiBzdWNjZXNzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJtZXNzYWdlIGlzLWdyZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD57e3N1Y2Nlc3N9fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHNsb3Q+PC9zbG90PlxuICAgIDxkaXYgY2xhc3M9XCJmaWVsZCBpcy1ncm91cGVkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBmYS1zcGluIG0tcmlnaHQteHNcIj48L2k+XG4gICAgICAgICAgICAgICAgTG9hZGluZ1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHYtZWxzZVxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIiBAY2xpY2s9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIlxuICAgICAgICAgICAgICAgID57e3N0YXRlLnVwZGF0ZV9tb2RlID8gJ01vZGlmeScgOiAnU2F2ZSd9fTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIEBjbGljaz1cImNhbmNlbFwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1iYWNrZ3JvdW5kLXJlZFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtaWY9XCJlcnJvci5mb3VuZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cIm1lc3NhZ2UgaXMtcmVkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkFuIGVycm9yIG9jY3VyZWQgLTwvc3Ryb25nPiB7e2Vycm9yLmNvbnRlbnQubWVzc2FnZX19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZWxzZS1pZj1cInN1Y2Nlc3MgIT0gbnVsbCAmJiBzdWNjZXNzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJtZXNzYWdlIGlzLWdyZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD57e3N1Y2Nlc3N9fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Zvcm0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Gb3JtJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vLi4vYXBpL21lc3NhZ2VzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIHZhbGlkYXRpb25zKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLmZvcm1dO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgaW4gZm9ybS52YWxpZGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS52YWxpZGF0aW9uc1t0aGlzLm5hbWVdLm1hcChvID0+IG8ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlX21vZGUoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuZm9ybV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0udXBkYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICByZWNsYWltKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnJlY2xhaW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5mb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jYW5jZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuQUREX1RPX0ZPUk1fUE9PTCwgeyBmb3JtOiB0aGlzLmZvcm0gfSk7XG4gICAgfSxcbiAgICBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuUkVNT1ZFX0ZST01fRk9STV9QT09MLCB7IGZvcm06IHRoaXMuZm9ybSwgbmFtZTogdGhpcy5uYW1lIH0pO1xuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgdXBkYXRlX21vZGUoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJvcHM6IFsnbnVtYmVyT2ZJdGVtcycsICdpdGVtc1BlclBhZ2UnLCAnc2tpcCddLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIGZpcnN0X3BhZ2U6IDEsXG4gICAgICAgICAgICAgICAgY3VycmVudF9wYWdlOiAxLFxuICAgICAgICAgICAgICAgIGxhc3RfcGFnZTogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGdvdG8ocGFnZSwgZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKHBhZ2UgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhZ2UgPiB0aGlzLnN0YXRlLmxhc3RfcGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudF9wYWdlID0gcGFnZTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUubGFzdF9wYWdlID0gTWF0aC5jZWlsKHRoaXMubnVtYmVyT2ZJdGVtcyAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50X3BhZ2UgPSBwYXJzZUludCgodGhpcy5za2lwICsgdGhpcy5pdGVtc1BlclBhZ2UpIC8gdGhpcy5pdGVtc1BlclBhZ2UsIDEwKTtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxuYXYgdi1pZj1cInN0YXRlLmZpcnN0X3BhZ2UgPCBzdGF0ZS5sYXN0X3BhZ2VcIiBjbGFzcz1cImlzLXNtYWxsIHBhZ2luYXRpb24gaXMtY2VudGVyZWRcIiByb2xlPVwibmF2aWdhdGlvblwiIGFyaWEtbGFiZWw9XCJwYWdpbmF0aW9uXCI+XG4gICAgPHVsIGNsYXNzPVwicGFnaW5hdGlvbi1saXN0XCI+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlID4gMVwiPjxhIEBjbGljaz1cImdvdG8oc3RhdGUuY3VycmVudF9wYWdlLTEsICRldmVudClcIiBjbGFzcz1cInBhZ2luYXRpb24tbGlua1wiPlByZXZpb3VzPC9hPjwvbGk+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlID4gc3RhdGUuZmlyc3RfcGFnZVwiPjxhIEBjbGljaz1cImdvdG8oMSwgJGV2ZW50KVwiIGNsYXNzPVwicGFnaW5hdGlvbi1saW5rXCIgYXJpYS1sYWJlbD1cIkdvdG8gcGFnZSAxXCI+MTwvYT48L2xpPlxuICAgICAgICA8bGkgdi1pZj1cInN0YXRlLmN1cnJlbnRfcGFnZS0xID4gMlwiPjxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbi1lbGxpcHNpc1wiPiZoZWxsaXA7PC9zcGFuPjwvbGk+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlID4gc3RhdGUuZmlyc3RfcGFnZSArIDFcIj48YSBAY2xpY2s9XCJnb3RvKHN0YXRlLmN1cnJlbnRfcGFnZS0xLCAkZXZlbnQpXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWxpbmtcIiA6YXJpYS1sYWJlbD1cImBHb3RvIHBhZ2UgJHtzdGF0ZS5jdXJyZW50X3BhZ2UtMX1gXCI+e3tzdGF0ZS5jdXJyZW50X3BhZ2UtMX19PC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSBjbGFzcz1cInBhZ2luYXRpb24tbGluayBpcy1jdXJyZW50XCIgOmFyaWEtbGFiZWw9XCJgUGFnZSAke3N0YXRlLmN1cnJlbnRfcGFnZX1gXCIgYXJpYS1jdXJyZW50PVwicGFnZVwiPnt7c3RhdGUuY3VycmVudF9wYWdlfX08L2E+PC9saT5cbiAgICAgICAgPGxpIHYtaWY9XCJzdGF0ZS5jdXJyZW50X3BhZ2UgPCBzdGF0ZS5sYXN0X3BhZ2UtMVwiPjxhIEBjbGljaz1cImdvdG8oc3RhdGUuY3VycmVudF9wYWdlKzEsICRldmVudClcIiBjbGFzcz1cInBhZ2luYXRpb24tbGlua1wiIDphcmlhLWxhYmVsPVwiYEdvdG8gcGFnZSAke3N0YXRlLmN1cnJlbnRfcGFnZSsxfWBcIj57e3N0YXRlLmN1cnJlbnRfcGFnZSsxfX08L2E+PC9saT5cbiAgICAgICAgPGxpIHYtaWY9XCJzdGF0ZS5jdXJyZW50X3BhZ2UrMSA8IHN0YXRlLmxhc3RfcGFnZS0xXCI+PHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uLWVsbGlwc2lzXCI+JmhlbGxpcDs8L3NwYW4+PC9saT5cbiAgICAgICAgPGxpIHYtaWY9XCJzdGF0ZS5jdXJyZW50X3BhZ2UgPCBzdGF0ZS5sYXN0X3BhZ2VcIj48YSBAY2xpY2s9XCJnb3RvKHN0YXRlLmxhc3RfcGFnZSwgJGV2ZW50KVwiIGNsYXNzPVwicGFnaW5hdGlvbi1saW5rXCIgOmFyaWEtbGFiZWw9XCJgR290byBwYWdlICR7c3RhdGUubGFzdF9wYWdlfWBcIj57e3N0YXRlLmxhc3RfcGFnZX19PC9hPjwvbGk+XG4gICAgICAgIDxsaSB2LWlmPVwic3RhdGUuY3VycmVudF9wYWdlIDwgc3RhdGUubGFzdF9wYWdlXCI+PGEgQGNsaWNrPVwiZ290byhzdGF0ZS5jdXJyZW50X3BhZ2UrMSwgJGV2ZW50KVwiIGNsYXNzPVwicGFnaW5hdGlvbi1saW5rXCI+TmV4dDwvYT48L2xpPlxuICAgIDwvdWw+XG4gICAgPC9uYXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9QYWdpbmF0b3InKTtcbjwvc2NyaXB0PlxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgICAgaGFzT3B0aW9uczogeyBkZWZhdWx0OiB0cnVlIH0sXG4gICAgICAgIGlzUmVmcmVzaGFibGU6IHsgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgICAgaXNSZW1vdmFibGU6IHsgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgICAgaXNDb2xsYXBzYWJsZTogeyBkZWZhdWx0OiB0cnVlIH0sXG4gICAgICAgIGNvbGxhcHNlZDogeyBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIH0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgb25Db2xsYXBzZShlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNvbGxhcHNlZCA9ICF0aGlzLnN0YXRlLmNvbGxhcHNlZDtcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlZnJlc2goZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVmcmVzaCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uUmVtb3ZlKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVtb3ZlJyk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLnN0YXRlLmNvbGxhcHNlZCA9IHRoaXMuY29sbGFwc2VkO1xuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cInNtYXJ0LXdpZGdldFwiIHYtaWY9XCJzdGF0ZS5zaG93XCI+XG4gICAgPGRpdiBjbGFzcz1cInNtYXJ0LXdpZGdldC1oZWFkZXJcIj5cbiAgICAgICAgPHNsb3QgbmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICBTbG90IHRpdGxlIGlzIHJlcXVpcmVkXG4gICAgICAgIDwvc2xvdD5cbiAgICAgICAgPHNwYW4gdi1pZj1cImhhc09wdGlvbnNcIiBjbGFzcz1cInNtYXJ0LXdpZGdldC1vcHRpb25cIj5cbiAgICAgICAgICAgIDxhIHYtaWY9XCJpc0NvbGxhcHNhYmxlXCIgY2xhc3M9XCJ3aWRnZXQtY29sbGFwc2Utb3B0aW9uXCIgQGNsaWNrPVwib25Db2xsYXBzZVwiIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgPGkgdi1pZj1cInN0YXRlLmNvbGxhcHNlZFwiIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1kb3duXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxpIHYtZWxzZSBjbGFzcz1cImZhIGZhLWNoZXZyb24tdXBcIj48L2k+XG4gICAgICAgICAgICA8L2E+IFxuICAgICAgICAgICAgPGEgdi1pZj1cImlzUmVmcmVzaGFibGVcIiBjbGFzcz1cIndpZGdldC1yZWZyZXNoLW9wdGlvblwiIGhyZWY9XCIjXCIgQGNsaWNrPVwib25SZWZyZXNoXCI+PGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoXCI+PC9pPjwvYT4gXG4gICAgICAgICAgICA8YSB2LWlmPVwiaXNSZW1vdmFibGVcIiBjbGFzcz1cIndpZGdldC1yZW1vdmUtb3B0aW9uXCIgaHJlZj1cIiNcIiBAY2xpY2s9XCJvblJlbW92ZVwiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9hPiBcbiAgICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDx0cmFuc2l0aW9uIG5hbWU9XCJ3aWRnZXQtc2xpZGVcIj5cbiAgICAgICAgPGRpdiB2LWlmPVwiIXN0YXRlLmNvbGxhcHNlZFwiIGNsYXNzPVwic21hcnQtd2lkZ2V0LWlubmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic21hcnQtd2lkZ2V0LWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgIFNsb3QgYm9keSBpcyByZXF1aXJlZFxuICAgICAgICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L3RyYW5zaXRpb24+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vV2lkZ2V0Jyk7IFxuPC9zY3JpcHQ+XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblxufVxuIiwiPHRlbXBsYXRlPlxuPGZvb3RlciBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWNvbnRhaW5lciBjb250YWluZXIgaXMtZmx1aWQgaXMtbWFyZ2lubGVzc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBmb290ZXItZGlzY2xhaW1lclwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb2x1bW5cIj4mY29weTsgSU5FRCAyMDE3PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZm9vdGVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vRm9vdGVyJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IE5hdmJhciA9IHJlcXVpcmUoJy4uL25hdmJhci9OYXZiYXIudnVlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgJ25hdmJhcic6IE5hdmJhcixcbiAgICB9XG59XG4iLCI8dGVtcGxhdGU+XG48aGVhZGVyIGNsYXNzPVwic2VjdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWQgaXMtbWFyZ2lubGVzc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGlsZSBpcy1hbmNlc3RvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbGUgaXMtcGFyZW50IGlzLTIgaXMtdmVydGljYWwgaXMtaGlkZGVuLXRvdWNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlIHRpbGUgaXMtY2hpbGQgaXMtMTZieTlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9Jy9wdWJsaWMvZnJvbnQvaW1ncy9sb2dvL2xvZ28uc3ZnJyBhbHQ9J0xvZ28nIHRpdGxlPSdBcHAgTG9nbycgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbGUgaXMtdmVydGljYWxcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbGUgaXMtcGFyZW50IGlzLTIgaXMtdmVydGljYWxcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRpbGUgaXMtY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPScjJz5Mb2cgSW4gLyBTaWduIEluPC9hPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRpbGUgaXMtY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPScjJz5GUjwvYT4mbmJzcDt8Jm5ic3A7PGEgaHJlZj0nIyc+RU48L2E+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9oZWFkZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9IZWFkZXInKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcm9wczogWydtZW51cyddLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1Nob3duOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgcm91dGVzOiB0aGlzLiRyb3V0ZXIub3B0aW9ucy5yb3V0ZXMuZmlsdGVyKHIgPT4gci5wYXRoICE9PSAnLycpLFxuICAgICAgICAgICAgICAgIGNvbG9yczogWydyZWQnLCAnb3JhbmdlJywgJ3B1cnBsZScsICdicm93bicsICdncmVlbicsICdibHVlJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgYWN0aXZlX2lkeCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gXy5maW5kSW5kZXgodGhpcy4kcm91dGVyLm9wdGlvbnMucm91dGVzLCByID0+IHIucGF0aCAhPT0gJy8nICYmIHRoaXMuJHJvdXRlLnBhdGggPT09IHIucGF0aCkgLSAxO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KC0xLCBpbmRleCk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNob3coZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5pc1Nob3duID0gIXRoaXMuaXNTaG93bjtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1uYXYgaXMtZnVsbGhlaWdodFwiPlxuICAgIDxhc2lkZSBjbGFzcz1cIm1lbnVcIj5cbiAgICAgICAgPGRpdiB2LWZvcj1cIihzZWN0aW9uLCBpZHgpIGluIG1lbnVzXCI+XG4gICAgICAgICAgICA8cCA6Y2xhc3M9XCJgbWVudS1sYWJlbCBtZW51LWxhYmVsLSR7c3RhdGUuY29sb3JzW2lkeF19YFwiPlxuICAgICAgICAgICAgICAgIHt7c2VjdGlvblswXS5zZWN0aW9ufX0gXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8dWwgOmNsYXNzPVwiYG1lbnUtbGlzdCBtZW51LWxpc3QtJHtzdGF0ZS5jb2xvcnNbaWR4XX1gXCI+XG4gICAgICAgICAgICAgICAgPGxpIHYtZm9yPVwiaXRlbSBpbiBzZWN0aW9uXCI+PHJvdXRlci1saW5rIGV4YWN0IGFjdGl2ZS1jbGFzcz1cImlzLWFjdGl2ZVwiIDp0bz1cIml0ZW0ucm91dGVzWzBdXCI+e3tpdGVtLm5hbWV9fTwvcm91dGVyLWxpbms+PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYXNpZGU+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL05hdmJhcicpO1xuPC9zY3JpcHQ+XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbnsgbGFiZWw6ICdQcm9kdWN0aW9uJywgdmFsdWU6ICdwcm9kdWN0aW9uJyB9LFxueyBsYWJlbDogJ0RldmVsb3BtZW50JywgdmFsdWU6ICdkZXZlbG9wbWVudCcgfSxcbnsgbGFiZWw6ICdEZW1vbnN0cmF0aW9uJywgdmFsdWU6ICdkZW1vJyB9LFxueyBsYWJlbDogJ0xvY2FsaG9zdCcsIHZhbHVlOiAnbG9jYWwnIH0sXG5dO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBbeyBsYWJlbDogJ1RleHQnLCB2YWx1ZTogJ3RleHQnIH0sXG4gICAgeyBsYWJlbDogJ0VtYWlsJywgdmFsdWU6ICdlbWFpbCcgfSxcbiAgICB7IGxhYmVsOiAnUGFzc3dvcmQnLCB2YWx1ZTogJ3Bhc3N3b3JkJyB9LFxuICAgIHsgbGFiZWw6ICdQaG9uZScsIHZhbHVlOiAncGhvbmUnIH0sXG4gICAgeyBsYWJlbDogJ051bWJlcicsIHZhbHVlOiAnbnVtYmVyJyB9LFxuICAgIHsgbGFiZWw6ICdUZXh0YXJlYScsIHZhbHVlOiAndGV4dGFyZWEnIH0sXG4gICAgeyBsYWJlbDogJ0NoZWNrYm94JywgdmFsdWU6ICdjaGVja2JveCcgfSxcbiAgICB7IGxhYmVsOiAnUmFkaW8nLCB2YWx1ZTogJ3JhZGlvJyB9LFxuICAgIHsgbGFiZWw6ICdTdWJmb3JtJywgdmFsdWU6ICdzdWJmb3JtJyB9LFxuICAgIHsgbGFiZWw6ICdTZWxlY3QnLCB2YWx1ZTogJ3NlbGVjdCcgfV07XG4iLCJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmNvbnN0IExhbmdzID0ge1xuICAgIEFBOiAnQWZhcicsXG4gICAgQUI6ICdBYmtoYXppYW4nLFxuICAgIEFFOiAnQXZlc3RhbicsXG4gICAgQUY6ICdBZnJpa2FhbnMnLFxuICAgIEFLOiAnQWthbicsXG4gICAgQU06ICdBbWhhcmljJyxcbiAgICBBTjogJ0FyYWdvbmVzZScsXG4gICAgQVI6ICdBcmFiaWMnLFxuICAgIEFTOiAnQXNzYW1lc2UnLFxuICAgIEFWOiAnQXZhcmljJyxcbiAgICBBWTogJ0F5bWFyYScsXG4gICAgQVo6ICdBemVyYmFpamFuaScsXG4gICAgQkE6ICdCYXNoa2lyJyxcbiAgICBCRTogJ0JlbGFydXNpYW4nLFxuICAgIEJHOiAnQnVsZ2FyaWFuJyxcbiAgICBCSDogJ0JpaGFyaScsXG4gICAgQkk6ICdCaXNsYW1hJyxcbiAgICBCTTogJ0JhbWJhcmEnLFxuICAgIEJOOiAnQmVuZ2FsaScsXG4gICAgQk86ICdUaWJldGFuJyxcbiAgICBCUjogJ0JyZXRvbicsXG4gICAgQlM6ICdCb3NuaWFuJyxcbiAgICBDQTogJ0NhdGFsYW4nLFxuICAgIENFOiAnQ2hlY2hlbicsXG4gICAgQ0g6ICdDaGFtb3JybycsXG4gICAgQ086ICdDb3JzaWNhbicsXG4gICAgQ1I6ICdDcmVlJyxcbiAgICBDUzogJ0N6ZWNoJyxcbiAgICBDVTogJ09sZCBDaHVyY2ggU2xhdm9uaWMnLFxuICAgIENWOiAnQ2h1dmFzaCcsXG4gICAgQ1k6ICdXZWxzaCcsXG4gICAgREE6ICdEYW5pc2gnLFxuICAgIERFOiAnR2VybWFuJyxcbiAgICBEVjogJ0RpdmVoaScsXG4gICAgRFo6ICdEem9uZ2toYScsXG4gICAgRUU6ICdFd2UnLFxuICAgIEVMOiAnR3JlZWsnLFxuICAgIEVOOiAnRW5nbGlzaCcsXG4gICAgRU86ICdFc3BlcmFudG8nLFxuICAgIEVTOiAnU3BhbmlzaCcsXG4gICAgRVQ6ICdFc3RvbmlhbicsXG4gICAgRVU6ICdCYXNxdWUnLFxuICAgIEZBOiAnUGVyc2lhbicsXG4gICAgRkY6ICdGdWxhaCcsXG4gICAgRkk6ICdGaW5uaXNoJyxcbiAgICBGSjogJ0ZpamlhbicsXG4gICAgRk86ICdGYXJvZXNlJyxcbiAgICBGUjogJ0ZyZW5jaCcsXG4gICAgRlk6ICdXZXN0ZXJuIEZyaXNpYW4nLFxuICAgIEdBOiAnSXJpc2gnLFxuICAgIEdEOiAnU2NvdHRpc2ggR2FlbGljJyxcbiAgICBHTDogJ0dhbGljaWFuJyxcbiAgICBHTjogJ0d1YXJhbmknLFxuICAgIEdVOiAnR3VqYXJhdGknLFxuICAgIEdWOiAnTWFueCcsXG4gICAgSEE6ICdIYXVzYScsXG4gICAgSEU6ICdIZWJyZXcnLFxuICAgIEhJOiAnSGluZGknLFxuICAgIEhPOiAnSGlyaSBNb3R1JyxcbiAgICBIUjogJ0Nyb2F0aWFuJyxcbiAgICBIVDogJ0hhaXRpYW4nLFxuICAgIEhVOiAnSHVuZ2FyaWFuJyxcbiAgICBIWTogJ0FybWVuaWFuJyxcbiAgICBIWjogJ0hlcmVybycsXG4gICAgSUE6ICdJbnRlcmxpbmd1YScsXG4gICAgSUQ6ICdJbmRvbmVzaWFuJyxcbiAgICBJRTogJ0ludGVybGluZ3VlJyxcbiAgICBJRzogJ0lnYm8nLFxuICAgIElJOiAnU2ljaHVhbiBZaScsXG4gICAgSUs6ICdJbnVwaWFxJyxcbiAgICBJTzogJ0lkbycsXG4gICAgSVM6ICdJY2VsYW5kaWMnLFxuICAgIElUOiAnSXRhbGlhbicsXG4gICAgSVU6ICdJbnVrdGl0dXQnLFxuICAgIEpBOiAnSmFwYW5lc2UnLFxuICAgIEpWOiAnSmF2YW5lc2UnLFxuICAgIEtBOiAnR2VvcmdpYW4nLFxuICAgIEtHOiAnS29uZ28nLFxuICAgIEtJOiAnS2lrdXl1JyxcbiAgICBLSjogJ0t3YW55YW1hJyxcbiAgICBLSzogJ0themFraCcsXG4gICAgS0w6ICdLYWxhYWxsaXN1dCcsXG4gICAgS006ICdLaG1lcicsXG4gICAgS046ICdLYW5uYWRhJyxcbiAgICBLTzogJ0tvcmVhbicsXG4gICAgS1I6ICdLYW51cmknLFxuICAgIEtTOiAnS2FzaG1pcmknLFxuICAgIEtVOiAnS3VyZGlzaCcsXG4gICAgS1Y6ICdLb21pJyxcbiAgICBLVzogJ0Nvcm5pc2gnLFxuICAgIEtZOiAnS2lyZ2hpeicsXG4gICAgTEE6ICdMYXRpbicsXG4gICAgTEI6ICdMdXhlbWJvdXJnaXNoJyxcbiAgICBMRzogJ0dhbmRhJyxcbiAgICBMSTogJ0xpbWJ1cmdpc2gnLFxuICAgIExOOiAnTGluZ2FsYScsXG4gICAgTE86ICdMYW8nLFxuICAgIExUOiAnTGl0aHVhbmlhbicsXG4gICAgTFU6ICdMdWJhLUthdGFuZ2EnLFxuICAgIExWOiAnTGF0dmlhbicsXG4gICAgTUc6ICdNYWxhZ2FzeScsXG4gICAgTUg6ICdNYXJzaGFsbGVzZScsXG4gICAgTUk6ICdNxIFvcmknLFxuICAgIE1LOiAnTWFjZWRvbmlhbicsXG4gICAgTUw6ICdNYWxheWFsYW0nLFxuICAgIE1OOiAnTW9uZ29saWFuJyxcbiAgICBNTzogJ01vbGRhdmlhbicsXG4gICAgTVI6ICdNYXJhdGhpJyxcbiAgICBNUzogJ01hbGF5JyxcbiAgICBNVDogJ01hbHRlc2UnLFxuICAgIE1ZOiAnQnVybWVzZScsXG4gICAgTkE6ICdOYXVydScsXG4gICAgTkI6ICdOb3J3ZWdpYW4gQm9rbcOlbCcsXG4gICAgTkQ6ICdOb3J0aCBOZGViZWxlJyxcbiAgICBORTogJ05lcGFsaScsXG4gICAgTkc6ICdOZG9uZ2EnLFxuICAgIE5MOiAnRHV0Y2gnLFxuICAgIE5OOiAnTm9yd2VnaWFuIE55bm9yc2snLFxuICAgIE5POiAnTm9yd2VnaWFuJyxcbiAgICBOUjogJ1NvdXRoIE5kZWJlbGUnLFxuICAgIE5WOiAnTmF2YWpvJyxcbiAgICBOWTogJ0NoaWNoZXdhJyxcbiAgICBPQzogJ09jY2l0YW4nLFxuICAgIE9KOiAnT2ppYndhJyxcbiAgICBPTTogJ09yb21vJyxcbiAgICBPUjogJ09yaXlhJyxcbiAgICBPUzogJ09zc2V0aWFuJyxcbiAgICBQQTogJ1BhbmphYmknLFxuICAgIFBJOiAnUMSBbGknLFxuICAgIFBMOiAnUG9saXNoJyxcbiAgICBQUzogJ1Bhc2h0bycsXG4gICAgUFQ6ICdQb3J0dWd1ZXNlJyxcbiAgICBRVTogJ1F1ZWNodWEnLFxuICAgIFJDOiAnUmV1bmlvbmVzZScsXG4gICAgUk06ICdSb21hbnNoJyxcbiAgICBSTjogJ0tpcnVuZGknLFxuICAgIFJPOiAnUm9tYW5pYW4nLFxuICAgIFJVOiAnUnVzc2lhbicsXG4gICAgUlc6ICdLaW55YXJ3YW5kYScsXG4gICAgU0E6ICdTYW5za3JpdCcsXG4gICAgU0M6ICdTYXJkaW5pYW4nLFxuICAgIFNEOiAnU2luZGhpJyxcbiAgICBTRTogJ05vcnRoZXJuIFNhbWknLFxuICAgIFNHOiAnU2FuZ28nLFxuICAgIFNIOiAnU2VyYm8tQ3JvYXRpYW4nLFxuICAgIFNJOiAnU2luaGFsZXNlJyxcbiAgICBTSzogJ1Nsb3ZhaycsXG4gICAgU0w6ICdTbG92ZW5lJyxcbiAgICBTTTogJ1NhbW9hbicsXG4gICAgU046ICdTaG9uYScsXG4gICAgU086ICdTb21hbGknLFxuICAgIFNROiAnQWxiYW5pYW4nLFxuICAgIFNSOiAnU2VyYmlhbicsXG4gICAgU1M6ICdTd2F0aScsXG4gICAgU1Q6ICdTb3RobycsXG4gICAgU1U6ICdTdW5kYW5lc2UnLFxuICAgIFNWOiAnU3dlZGlzaCcsXG4gICAgU1c6ICdTd2FoaWxpJyxcbiAgICBUQTogJ1RhbWlsJyxcbiAgICBURTogJ1RlbHVndScsXG4gICAgVEc6ICdUYWppaycsXG4gICAgVEg6ICdUaGFpJyxcbiAgICBUSTogJ1RpZ3JpbnlhJyxcbiAgICBUSzogJ1R1cmttZW4nLFxuICAgIFRMOiAnVGFnYWxvZycsXG4gICAgVE46ICdUc3dhbmEnLFxuICAgIFRPOiAnVG9uZ2EnLFxuICAgIFRSOiAnVHVya2lzaCcsXG4gICAgVFM6ICdUc29uZ2EnLFxuICAgIFRUOiAnVGF0YXInLFxuICAgIFRXOiAnVHdpJyxcbiAgICBUWTogJ1RhaGl0aWFuJyxcbiAgICBVRzogJ1VpZ2h1cicsXG4gICAgVUs6ICdVa3JhaW5pYW4nLFxuICAgIFVSOiAnVXJkdScsXG4gICAgVVo6ICdVemJlaycsXG4gICAgVkU6ICdWZW5kYScsXG4gICAgVkk6ICdWacOqdCBOYW1lc2UnLFxuICAgIFZPOiAnVm9sYXDDvGsnLFxuICAgIFdBOiAnV2FsbG9vbicsXG4gICAgV086ICdXb2xvZicsXG4gICAgWEg6ICdYaG9zYScsXG4gICAgWUk6ICdZaWRkaXNoJyxcbiAgICBZTzogJ1lvcnViYScsXG4gICAgWkE6ICdaaHVhbmcnLFxuICAgIFpIOiAnQ2hpbmVzZScsXG4gICAgWlU6ICdadWx1Jyxcbn07XG5cbmNvbnN0IExhbmdzTGlzdCA9IF8ubWFwKExhbmdzLCAobGFiZWwsIHZhbHVlKSA9PiAoeyBsYWJlbCwgdmFsdWUgfSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBMYW5ncyxcbiAgICBMYW5nc0xpc3QsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBbeyBsYWJlbDogJ1plcm8nLCB2YWx1ZTogJzAnIH0sXG4gICAgeyBsYWJlbDogJ09uZScsIHZhbHVlOiAnMScgfSxcbiAgICB7IGxhYmVsOiAnVHdvJywgdmFsdWU6ICcyJyB9LFxuICAgIHsgbGFiZWw6ICdGZXcnLCB2YWx1ZTogJ2ZldycgfSxcbiAgICB7IGxhYmVsOiAnTWFueScsIHZhbHVlOiAnbWFueScgfSxcbiAgICB7IGxhYmVsOiAnT3RoZXInLCB2YWx1ZTogJ290aGVyJyB9LFxuICAgIHsgbGFiZWw6ICdOL0EnLCB2YWx1ZTogJ24vYScgfV07XG4iLCJjb25zdCBWdWUgPSByZXF1aXJlKCd2dWUnKTtcbmNvbnN0IHJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG5jb25zdCBzdG9yZSA9IHJlcXVpcmUoJy4vc3RvcmUnKTtcblxuY29uc3QgTG9hZGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2xvYWRlci9Mb2FkZXIudnVlJyk7XG5jb25zdCBJbnB1dCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL2VsZW1lbnRzL2lucHV0L0lucHV0LnZ1ZScpO1xuY29uc3QgU2VsZWN0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvZm9ybXMvZWxlbWVudHMvc2VsZWN0L1NlbGVjdC52dWUnKTtcbmNvbnN0IFZhcmlhZGljRWxlbWVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL2VsZW1lbnRzL3ZhcmlhZGljX2VsZW1lbnQvVmFyaWFkaWNFbGVtZW50LnZ1ZScpO1xuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL2Zvcm0vRm9ybS52dWUnKTtcbmNvbnN0IEFjdGlvbkJ1dHRvbiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2FjdGlvbl9idXR0b24vQWN0aW9uQnV0dG9uLnZ1ZScpO1xuY29uc3QgV2lkZ2V0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RoZW1lcy9pbmVkL2NvbXBvbmVudHMvd2lkZ2V0L1dpZGdldC52dWUnKTtcbmNvbnN0IFBhZ2luYXRvciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL3BhZ2luYXRvci9QYWdpbmF0b3IudnVlJyk7XG5jb25zdCBEeW5hbWljRm9ybSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9jb21wb25lbnRzL2Zvcm1zL2R5bmFtaWNfZm9ybS9EeW5hbWljRm9ybS52dWUnKTtcblxuY29uc3QgQXBwID0gcmVxdWlyZSgnLi9wYWdlcy9BcHAudnVlJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2xvYWRlcicsIExvYWRlcik7XG5WdWUuY29tcG9uZW50KCdmZm9ybScsIEZvcm0pO1xuVnVlLmNvbXBvbmVudCgnZmlucHV0JywgSW5wdXQpO1xuVnVlLmNvbXBvbmVudCgnZnNlbGVjdCcsIFNlbGVjdCk7XG5WdWUuY29tcG9uZW50KCdmdmFyaWFkaWMtZWxlbWVudCcsIFZhcmlhZGljRWxlbWVudCk7XG5WdWUuY29tcG9uZW50KCdhY3Rpb24tYnV0dG9uJywgQWN0aW9uQnV0dG9uKTtcblZ1ZS5jb21wb25lbnQoJ3dpZGdldCcsIFdpZGdldCk7XG5WdWUuY29tcG9uZW50KCdwYWdpbmF0b3InLCBQYWdpbmF0b3IpO1xuVnVlLmNvbXBvbmVudCgnZHluYW1pYy1mb3JtJywgRHluYW1pY0Zvcm0pO1xuXG5uZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIHN0b3JlLFxuICAgIHJvdXRlcixcbiAgICByZW5kZXI6IGggPT4gaChBcHApLFxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuY29uc3QgUm91dGVzID0gcmVxdWlyZSgnLi9yb3V0ZXMnKTtcbmNvbnN0IEhvbWUgPSByZXF1aXJlKCcuL3BhZ2VzL2hvbWUvSG9tZS52dWUnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuL3BhZ2VzL3VzZXIvVXNlci52dWUnKTtcbmNvbnN0IENvbmZpZyA9IHJlcXVpcmUoJy4vcGFnZXMvY29uZmlnL0NvbmZpZy52dWUnKTtcbmNvbnN0IExhbmcgPSByZXF1aXJlKCcuL3BhZ2VzL2xhbmcvTGFuZy52dWUnKTtcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuL3BhZ2VzL2Zvcm0vRm9ybS52dWUnKTtcbmNvbnN0IERhdGFzb3VyY2UgPSByZXF1aXJlKCcuL3BhZ2VzL2RhdGFzb3VyY2UvRGF0YXNvdXJjZS52dWUnKTtcbmNvbnN0IERhdGFpbnN0YW5jZSA9IHJlcXVpcmUoJy4vcGFnZXMvZGF0YWluc3RhbmNlL0RhdGFpbnN0YW5jZS52dWUnKTtcblxuXG5tb2R1bGUuZXhwb3J0cy5tZW51ID0gW1xuICAgIFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0dlbmVyYWwnLFxuICAgICAgICAgICAgbmFtZTogJ092ZXJ2aWV3JyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdhZG1pbicsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuYWRtaW5dLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IEhvbWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdHZW5lcmFsJyxcbiAgICAgICAgICAgIG5hbWU6ICdVc2VycycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAndXNlcicsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMudXNlcl0sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogVXNlcixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0dlbmVyYWwnLFxuICAgICAgICAgICAgbmFtZTogJ1Jldmlld3MnLFxuICAgICAgICAgICAgYWNjZXNzOiAnJyxcbiAgICAgICAgICAgIGtleTogJ3JldmlldycsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMucmV2aWV3XSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBIb21lLFxuICAgICAgICB9LFxuICAgIF0sXG5cbiAgICBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZG1pbmlzdHJhdGlvbicsXG4gICAgICAgICAgICBuYW1lOiAnRGF0YSBzb3VyY2VzJyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdkYXRhc291cmNlJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5kYXRhc291cmNlXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBEYXRhc291cmNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWRtaW5pc3RyYXRpb24nLFxuICAgICAgICAgICAgbmFtZTogJ1B1YmxpY2F0aW9ucycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAncHVibGljYXRpb24nLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLnB1YmxpY2F0aW9uXSxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtdLFxuICAgICAgICAgICAgY29tcG9uZW50OiBIb21lLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWRtaW5pc3RyYXRpb24nLFxuICAgICAgICAgICAgbmFtZTogJ0NTTCBNYW5hZ2VtZW50JyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdjc2wnLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmNzbF0sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSG9tZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkbWluaXN0cmF0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6ICdGb3JtcycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnZm9ybScsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuZm9ybV0sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogRm9ybSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkbWluaXN0cmF0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6ICdMYW5ncycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnbGFuZycsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMubGFuZ10sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogTGFuZyxcbiAgICAgICAgfSxcbiAgICBdLFxuXG4gICAgW1xuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiAnQWR2YW5jZWQnLFxuICAgICAgICAgICAgbmFtZTogJ0V4dGVybmFsIHJlcG9zaXRvcmllcycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnZXh0ZXJuYWwtcmVwbycsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuZXh0ZXJuYWxfcmVwb10sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSG9tZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkdmFuY2VkJyxcbiAgICAgICAgICAgIG5hbWU6ICdFeHBvcnQgZm9ybWF0cycsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnZXhwb3J0LWZvcm1hdCcsXG4gICAgICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuZXhwb3J0X2Zvcm1hdF0sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSG9tZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkdmFuY2VkJyxcbiAgICAgICAgICAgIG5hbWU6ICdIYW5kbGUgSUQgTWFuYWdlbWVudCcsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnaGFuZGxlaWQnLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmhhbmRsZV9pZF0sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSG9tZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogJ0FkdmFuY2VkJyxcbiAgICAgICAgICAgIG5hbWU6ICdBUEkgTWFuYWdlbWVudCcsXG4gICAgICAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAgICAgICAga2V5OiAnYXBpJyxcbiAgICAgICAgICAgIHJvdXRlczogW1JvdXRlcy5hcGldLFxuICAgICAgICAgICAgc3VibWVudTogW10sXG4gICAgICAgICAgICBjb21wb25lbnQ6IEhvbWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246ICdBZHZhbmNlZCcsXG4gICAgICAgICAgICBuYW1lOiAnQ29uZmlnJyxcbiAgICAgICAgICAgIGFjY2VzczogJycsXG4gICAgICAgICAgICBrZXk6ICdjb25maWcnLFxuICAgICAgICAgICAgcm91dGVzOiBbUm91dGVzLmNvbmZpZ10sXG4gICAgICAgICAgICBzdWJtZW51OiBbXSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlnLFxuICAgICAgICB9LFxuICAgIF0sXG5dO1xuXG5tb2R1bGUuZXhwb3J0cy5vdGhlciA9IFtcbiAgICB7XG4gICAgICAgIGtleTogJ2RhdGFzb3VyY2VfdHlwb2xvZ3knLFxuICAgICAgICByb3V0ZXM6IFtSb3V0ZXMuZGF0YWluc3RhbmNlXSxcbiAgICAgICAgY29tcG9uZW50OiBEYXRhaW5zdGFuY2UsXG4gICAgfSxcbl07XG4iLCJjb25zdCBWdWUgPSByZXF1aXJlKCd2dWUnKTtcbmNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vYXBpL21lc3NhZ2VzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi9hcGkvcm91dGVzJyk7XG5cbmNvbnN0IEVOViA9IFwiZGV2ZWxvcG1lbnRcIiB8fCAnbG9jYWwnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuYW1lOiAnQXBwJyxcbiAgICBiZWZvcmVNb3VudCgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnX3BhdGggPSBBUElSb3V0ZXMuZW50aXR5KCdjb25maWcnLCAnUE9TVCcsIHRydWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhFTlYpO1xuICAgICAgICBjb25zdCBjb25maWdfYm9keSA9IHtcbiAgICAgICAgICAgIHNpemU6IDEsXG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGVudmlyb25tZW50OiBFTlYsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxhbmdfcGF0aCA9IEFQSVJvdXRlcy5lbnRpdHkoJ2xhbmcnLCAnUE9TVCcsIHRydWUpO1xuICAgICAgICBjb25zdCBsYW5nX2JvZHkgPSB7XG4gICAgICAgICAgICBzaXplOiAxMDAwMCxcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgJGFuZDogW3sgcGFydDogJ2JhY2tvZmZpY2UnIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBwcm9taXNlX2NvbmZpZyA9IHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdncmFiX2NvbmZpZycsIHtcbiAgICAgICAgICAgIHBhdGg6IGNvbmZpZ19wYXRoLFxuICAgICAgICAgICAgYm9keTogY29uZmlnX2JvZHksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb21pc2VfY29uZmlnLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy4kc3RvcmUuc3RhdGUuZ2xvYmFsX2NvbmZpZztcbiAgICAgICAgICAgIGlmICghKCdsYW5ncycgaW4gY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZWZhdWx0X2xhbmcgPSBjb25maWcubGFuZ3MuZmluZChcbiAgICAgICAgICAgICAgICB2ID0+IHYudmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy4kc3RvcmUuc3RhdGUuYnJvd3Nlckxhbmd1YWdlKTtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0X2xhbmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRfbGFuZyA9IGNvbmZpZy5sYW5nc1swXS52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdF9sYW5nID0gZGVmYXVsdF9sYW5nLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYW5nX2JvZHkud2hlcmUuJGFuZC5wdXNoKHsgbGFuZzogZGVmYXVsdF9sYW5nIH0pO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuc3RhdGUuaW50ZXJmYWNlTGFuZyA9IGRlZmF1bHRfbGFuZztcbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdncmFiX2xhbmd1YWdlJywge1xuICAgICAgICAgICAgICAgIHBhdGg6IGxhbmdfcGF0aCxcbiAgICAgICAgICAgICAgICBib2R5OiBsYW5nX2JvZHksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4geyBjb25zb2xlLmxvZyhlcnIpOyB9KTtcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxsb2FkZXIgaWQ9XCJhcHBcIiB2LWlmPVwiT2JqZWN0LmtleXMoJHN0b3JlLnN0YXRlLmxhbmdfY29udGVudCkubGVuZ3RoID09PSAwXCI+PC9sb2FkZXI+XG48ZGl2IHYtZWxzZSBpZD1cImFwcFwiIGNsYXNzPVwiaG9seS1ncmFpbFwiPlxuICAgIDxyb3V0ZXItdmlldyBuYW1lPVwiaGVhZGVyXCI+PC9yb3V0ZXItdmlldz5cbiAgICA8ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1ib2R5XCI+XG4gICAgICAgIDxyb3V0ZXItdmlldz48L3JvdXRlci12aWV3PlxuICAgICAgICA8cm91dGVyLXZpZXcgbmFtZT1cIm5hdmJhclwiPjwvcm91dGVyLXZpZXc+XG4gICAgPC9kaXY+XG4gICAgPHJvdXRlci12aWV3IG5hbWU9XCJmb290ZXJcIj48L3JvdXRlci12aWV3PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0FwcCcpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi9hcGkvcm91dGVzJyk7XG5jb25zdCBSZWFkZXJNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9SZWFkZXJNaXhpbicpO1xuY29uc3QgTGFuZ01peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL0xhbmdNaXhpbicpO1xuY29uc3QgRW52aXJvbm1lbnRzID0gcmVxdWlyZSgnLi4vLi4vbGlzdHMvZW52aXJvbm1lbnRzJyk7XG5jb25zdCBMYW5ncyA9IHJlcXVpcmUoJy4uLy4uL2xpc3RzL2xhbmdzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW1JlYWRlck1peGluLCBMYW5nTWl4aW5dLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2NvbmZpZycsICdQT1NUJyksXG4gICAgICAgICAgICAgICAgcnBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2NvbmZpZycsICdHRVQnKSxcbiAgICAgICAgICAgICAgICBjZm9ybTogJ2NvbmZpZ19jcmVhdGlvbicsXG4gICAgICAgICAgICAgICAgcmZvcm06ICdjb25maWdfcmVhZCcsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiAxMCxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclJvdzogMixcbiAgICAgICAgICAgICAgICBsYW5nczogTGFuZ3MuTGFuZ3NMaXN0LFxuICAgICAgICAgICAgICAgIGVudmlyb25tZW50czogRW52aXJvbm1lbnRzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzaW5nbGVfcmVhZCcsIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICBwYXRoOiB0aGlzLnN0YXRlLnJwYXRoLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIHJlYWRDb250ZW50KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5yZm9ybV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnRvX21hdHJpeChmb3JtLmNvbnRlbnQgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNvbnRlbnQgOiBbXSwgdGhpcy5zdGF0ZS5pdGVtc1BlclJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnRMZW5ndGgoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jb250ZW50Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5HbG9iYWwgY29uZmlndXJhdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIiB2LWZvcj1cInJvdyBpbiByZWFkQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIiB2LWZvcj1cImNvbnRlbnQgaW4gcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLWJsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJ1cGRhdGUoY29udGVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1yZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjb25maXJtYXRpb249XCJsYW5nKCdiX3N1cmUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR3by1zdGVwcz1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJyZW1vdmUoY29udGVudCwgJ2NvbmZpZycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tjb250ZW50LmVudmlyb25tZW50fX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5BZGQgb3IgbW9kaWZ5IHRoZSBnbG9iYWwgY29uZmlndXJhdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZmb3JtIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cG9zdF9wYXRoPVwic3RhdGUucGF0aFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwdXRfcGF0aD1cInN0YXRlLnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfcGF0aD1cInN0YXRlLnJwYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X2Zvcm09XCJzdGF0ZS5yZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZzZWxlY3QgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJlbnZpcm9ubWVudFwiIDpsYWJlbD1cImxhbmcoJ2JfZW52aXJvbm1lbnQnKVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0ZS5lbnZpcm9ubWVudHNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImxhbmdzXCIgOmxhYmVsPVwibGFuZygnYl9sYW5nJyx7fSwgJ290aGVyJylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDptdWx0aT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cInN0YXRlLmxhbmdzXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmZvcm0+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0NvbmZpZycpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi9hcGkvcm91dGVzJyk7XG5jb25zdCBSZWFkZXJNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9SZWFkZXJNaXhpbicpO1xuY29uc3QgTGFuZ01peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL0xhbmdNaXhpbicpO1xuY29uc3QgRm9ybU1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL0Zvcm1NaXhpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtSZWFkZXJNaXhpbiwgTGFuZ01peGluLCBGb3JtTWl4aW5dLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkodGhpcy4kcm91dGUucGFyYW1zLmRhdGFpbnN0YW5jZSwgJ1BPU1QnKSxcbiAgICAgICAgICAgICAgICBycGF0aDogQVBJUm91dGVzLmVudGl0eSh0aGlzLiRyb3V0ZS5wYXJhbXMuZGF0YWluc3RhbmNlLCAnR0VUJyksXG4gICAgICAgICAgICAgICAgY2Zvcm06IGAke3RoaXMuJHJvdXRlLnBhcmFtcy5kYXRhaW5zdGFuY2V9X2NyZWF0aW9uYCxcbiAgICAgICAgICAgICAgICByZm9ybTogYCR7dGhpcy4kcm91dGUucGFyYW1zLmRhdGFpbnN0YW5jZX1fcmVhZGAsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiAyMCxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclJvdzogMixcbiAgICAgICAgICAgICAgICBmb3Jtczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHt0aGlzLiRyb3V0ZS5wYXJhbXMuZGF0YWluc3RhbmNlfV9mb3JtYCxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6ICd0eXBvbG9neScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnc2luZ2xlX3JlYWQnLCB7XG4gICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLnJmb3JtLFxuICAgICAgICAgICAgcGF0aDogdGhpcy5zdGF0ZS5ycGF0aCxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBjb250ZW50KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5yZm9ybV07XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGZvcm0uY29udGVudCB8fCBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5tYXAoKGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYy5sYWJlbCA9IHRoaXMubGFuZyhjLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRDb250ZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnRvX21hdHJpeCh0aGlzLmNvbnRlbnQsIHRoaXMuc3RhdGUuaXRlbXNQZXJSb3cpO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPnt7bGFuZygnYl9saXN0X2RhdGFpbnN0YW5jZXMnKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZm9yPVwicm93IGluIHJlYWRDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cImNvbnRlbnQgaW4gcm93XCIgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtYmx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInVwZGF0ZShjb250ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWN0aW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWN0aW9uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGJ1dHRvbi1iYWNrZ3JvdW5kLXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNvbmZpcm1hdGlvbj1cImxhbmcoJ2JfYXJlX3N1cmUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR3by1zdGVwcz1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBhY3Rpb24tY2xpY2s9XCJyZW1vdmUoY29udGVudCwgJ2RhdGFpbnN0YW5jZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGFnaW5hdG9yIGNsYXNzPVwicGFnaW5hdGlvbi1wdXJwbGVcIiA6c2tpcD1cIjBcIiA6bnVtYmVyLW9mLWl0ZW1zPVwiY29udGVudExlbmd0aFwiIDppdGVtcy1wZXItcGFnZT1cInN0YXRlLml0ZW1zUGVyUGFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj57e2xhbmcoJ2JfYWRkX2RhdGFpbnN0YW5jZScpfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmZm9ybSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnBvc3RfcGF0aD1cInN0YXRlLnBhdGhcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cHV0X3BhdGg9XCJzdGF0ZS5wYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X3BhdGg9XCJzdGF0ZS5ycGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9mb3JtPVwic3RhdGUucmZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZHluYW1pYy1mb3JtIDpmb3JtPVwiZm9ybXNbYCR7JHJvdXRlLnBhcmFtcy5kYXRhaW5zdGFuY2V9X2Zvcm1gXSB8fCB7fVwiIDpjZm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmZvcm0+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9EYXRhaW5zdGFuY2UnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vYXBpL3JvdXRlcycpO1xuY29uc3QgUmVhZGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvUmVhZGVyTWl4aW4nKTtcbmNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9MYW5nTWl4aW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbUmVhZGVyTWl4aW4sIExhbmdNaXhpbl0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eSgnZGF0YXRlbXBsYXRlJywgJ1BPU1QnKSxcbiAgICAgICAgICAgICAgICBycGF0aDogQVBJUm91dGVzLmVudGl0eSgnZGF0YXRlbXBsYXRlJywgJ0dFVCcpLFxuICAgICAgICAgICAgICAgIGNmb3JtOiAnZGF0YXRlbXBsYXRlX2NyZWF0aW9uJyxcbiAgICAgICAgICAgICAgICByZm9ybTogJ2RhdGF0ZW1wbGF0ZV9yZWFkJyxcbiAgICAgICAgICAgICAgICBpdGVtc1BlclBhZ2U6IDIwLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUm93OiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzaW5nbGVfcmVhZCcsIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICBwYXRoOiB0aGlzLnN0YXRlLnJwYXRoLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3NlYXJjaCcsIHtcbiAgICAgICAgICAgIGZvcm06ICdmb3JtX3JlYWQnLFxuICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eSgnZm9ybScsICdQT1NUJywgdHJ1ZSksXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcHJvamVjdGlvbjogWydsYWJlbCcsICduYW1lJ10sXG4gICAgICAgICAgICAgICAgc2l6ZTogMTAwMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGNvbnRlbnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gZm9ybS5jb250ZW50IHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50Lm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjLmxhYmVsID0gdGhpcy5sYW5nKGMubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZENvbnRlbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMudG9fbWF0cml4KHRoaXMuY29udGVudCwgdGhpcy5zdGF0ZS5pdGVtc1BlclJvdyk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1zKCkge1xuICAgICAgICAgICAgaWYgKCdmb3JtX3JlYWQnIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zLmZvcm1fcmVhZC5jb250ZW50Lm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjLmxhYmVsID0gdGhpcy5sYW5nKGMubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJob2x5LWdyYWlsLWNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGlzLWZsdWlkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj57e2xhbmcoJ2JfbGlzdF9kYXRhc291cmNlcycpfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCIgdi1mb3I9XCJyb3cgaW4gcmVhZENvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiY29udGVudCBpbiByb3dcIiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1ibHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwidXBkYXRlKGNvbnRlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wZW5jaWxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y29uZmlybWF0aW9uPVwibGFuZygnYl9hcmVfc3VyZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHdvLXN0ZXBzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInJlbW92ZShjb250ZW50LCAnZGF0YXRlbXBsYXRlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWN0aW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1ncmVlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRvPVwiYC9hZG1pbi9kYXRhc291cmNlLyR7Y29udGVudC5uYW1lfWBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWV5ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3JvdXRlci1saW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7Y29udGVudC5sYWJlbH19ICh7e2NvbnRlbnQubmFtZX19KSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgaXMtY2VudGVyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYWdpbmF0b3IgY2xhc3M9XCJwYWdpbmF0aW9uLXB1cnBsZVwiIDpza2lwPVwiMFwiIDpudW1iZXItb2YtaXRlbXM9XCJjb250ZW50TGVuZ3RoXCIgOml0ZW1zLXBlci1wYWdlPVwic3RhdGUuaXRlbXNQZXJQYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPnt7bGFuZygnYl9hZGRfZGF0YXNvdXJjZScpfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmZm9ybSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnBvc3RfcGF0aD1cInN0YXRlLnBhdGhcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cHV0X3BhdGg9XCJzdGF0ZS5wYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X3BhdGg9XCJzdGF0ZS5ycGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9mb3JtPVwic3RhdGUucmZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IG5hbWU9XCJuYW1lXCIgOmxhYmVsPVwibGFuZygnYl9uYW1lJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9uYW1lJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgbmFtZT1cImxhYmVsXCIgOmxhYmVsPVwibGFuZygnYl9sYWJlbCcpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfbGFiZWwnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCBuYW1lPVwidHlwZVwiIDpsYWJlbD1cImxhbmcoJ2JfdHlwZScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfdHlwZScpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZnNlbGVjdCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImZvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwibGFuZygnYl9mb3JtJylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cImZvcm1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkTGFiZWw9XCJsYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZFZhbHVlPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0RhdGFzb3VyY2UnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vYXBpL3JvdXRlcycpO1xuY29uc3QgUmVhZGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvUmVhZGVyTWl4aW4nKTtcbmNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9MYW5nTWl4aW4nKTtcbmNvbnN0IEZpZWxkVHlwZXMgPSByZXF1aXJlKCcuLi8uLi9saXN0cy9maWVsZHR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW1JlYWRlck1peGluLCBMYW5nTWl4aW5dLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2Zvcm0nLCAnUE9TVCcpLFxuICAgICAgICAgICAgICAgIHJwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdmb3JtJywgJ0dFVCcpLFxuICAgICAgICAgICAgICAgIGNmb3JtOiAnZm9ybV9jcmVhdGlvbicsXG4gICAgICAgICAgICAgICAgcmZvcm06ICdmb3JtX3JlYWQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogMjAsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJSb3c6IDIsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfdHlwZXM6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgdHlwZV9jaGFuZ2UodmFsLCBpZHgpIHtcbiAgICAgICAgICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChpZHggaW4gdGhpcy5zdGF0ZS5zZWxlY3RlZF90eXBlcykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zdGF0ZS5zZWxlY3RlZF90eXBlc1tpZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2V0KHRoaXMuc3RhdGUuc2VsZWN0ZWRfdHlwZXMsIGlkeCwgdmFsLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzaW5nbGVfcmVhZCcsIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICBwYXRoOiB0aGlzLnN0YXRlLnJwYXRoLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3NlYXJjaCcsIHtcbiAgICAgICAgICAgIGZvcm06ICdkYXRhdGVtcGxhdGVfcmVhZCcsXG4gICAgICAgICAgICBwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdkYXRhdGVtcGxhdGUnLCAnUE9TVCcsIHRydWUpLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHByb2plY3Rpb246IFsnbGFiZWwnLCAnbmFtZSddLFxuICAgICAgICAgICAgICAgIHNpemU6IDEwMDAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBjb250ZW50KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5yZm9ybV07XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGZvcm0uY29udGVudCB8fCBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5tYXAoKGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYy5sYWJlbCA9IHRoaXMubGFuZyhjLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgYy5kZXNjcmlwdGlvbiA9IHRoaXMubGFuZyhjLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRDb250ZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnRvX21hdHJpeCh0aGlzLmNvbnRlbnQsIHRoaXMuc3RhdGUuaXRlbXNQZXJSb3cpO1xuICAgICAgICB9LFxuICAgICAgICBmaWVsZHR5cGVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIEZpZWxkVHlwZXMubWFwKGZ0ID0+ICh7IHZhbHVlOiBmdC52YWx1ZSwgbGFiZWw6IHRoaXMubGFuZyhmdC5sYWJlbCkgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBkYXRhc291cmNlcygpIHtcbiAgICAgICAgICAgIGlmICgnZGF0YXRlbXBsYXRlX3JlYWQnIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zLmRhdGF0ZW1wbGF0ZV9yZWFkLmNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1jb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBpcy1mbHVpZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPkxpc3Qgb2YgdXNlcnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCIgdi1mb3I9XCJyb3cgaW4gcmVhZENvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiY29udGVudCBpbiByb3dcIiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1ibHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwidXBkYXRlKGNvbnRlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wZW5jaWxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtYXRpb249XCJBcmUgeW91IHN1cmU/XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHdvLXN0ZXBzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInJlbW92ZShjb250ZW50LCAnb3JnYW5pemF0aW9uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWN0aW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2NvbnRlbnQubGFiZWx9fSAoe3tjb250ZW50Lm5hbWV9fSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGFnaW5hdG9yIGNsYXNzPVwicGFnaW5hdGlvbi1wdXJwbGVcIiA6c2tpcD1cIjBcIiA6bnVtYmVyLW9mLWl0ZW1zPVwiY29udGVudExlbmd0aFwiIDppdGVtcy1wZXItcGFnZT1cInN0YXRlLml0ZW1zUGVyUGFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+QWRkIG9yIG1vZGlmeSBhIHVzZXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmZm9ybSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cInN0YXRlLmNmb3JtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnBvc3RfcGF0aD1cInN0YXRlLnBhdGhcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cHV0X3BhdGg9XCJzdGF0ZS5wYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Z2V0X3BhdGg9XCJzdGF0ZS5ycGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9mb3JtPVwic3RhdGUucmZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IG5hbWU9XCJuYW1lXCIgOmxhYmVsPVwibGFuZygnYl9mb3JtX25hbWUnKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX2Zvcm1fbmFtZScpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IG5hbWU9XCJsYWJlbFwiIDpsYWJlbD1cImxhbmcoJ2JfbGFiZWwnKVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfbGFiZWwnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCBuYW1lPVwiZ3JvdXBcIiA6bGFiZWw9XCJsYW5nKCdiX2dyb3VwJylcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX2dyb3VwJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgcm93cz1cIjVcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiA6bGFiZWw9XCJsYW5nKCdiX2Zvcm1fZGVzY3JpcHRpb24nKVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfZm9ybV9kZXNjcmlwdGlvbl9wbGFjZWhvbGRlcicpXCIgdHlwZT1cInRleHRhcmVhXCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwidGl0bGUgaXMtMyBoYXMtbm8tYm90dG9tLW1hcmdpblwiPnt7bGFuZygnYl9maWVsZCcsIHt9LCAnb3RoZXInKX19PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIgY2xhc3M9XCJoYXMtbm8tdG9wLW1hcmdpblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZ2YXJpYWRpYy1lbGVtZW50IG5hbWU9XCJmaWVsZHNcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgOnRhYnM9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwidmFyaWFkaWNcIiBzbG90LXNjb3BlPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS5uYW1lYFwiIDpsYWJlbD1cImxhbmcoJ2JfbmFtZScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfbmFtZScpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS5sYWJlbGBcIiA6bGFiZWw9XCJsYW5nKCdiX2xhYmVsJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9sYWJlbCcpXCIgdHlwZT1cInRleHRcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpbnB1dCA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS5vcmRlcmBcIiA6bGFiZWw9XCJsYW5nKCdiX2ZpZWxkX29yZGVyJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl9maWVsZF9vcmRlcicpXCIgdHlwZT1cIm51bWJlclwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9Lm11bHRpcGxlYFwiIDpsYWJlbD1cImxhbmcoJ2JfZmllbGRfbXVsdGlwbGUnKVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfZmllbGRfbXVsdGlwbGUnKVwiIHR5cGU9XCJjaGVja2JveFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9Lm11bHRpcGxlX25hbWVgXCIgOmxhYmVsPVwibGFuZygnYl9maWVsZF9tdWx0aXBsZV9uYW1lJylcIiA6cGxhY2Vob2xkZXI9XCJsYW5nKCdiX2ZpZWxkX211bHRpcGxlX25hbWUnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0udHlwZWBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImxhbmcoJ2JfZmllbGRfdHlwZScpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cImZpZWxkdHlwZXNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtb246c2VsZWN0LWNoYW5nZT1cIih2YWwpID0+IHt0eXBlX2NoYW5nZSh2YWwsIHByb3BzLmlkKX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJwcm9wcy5pZCBpbiBzdGF0ZS5zZWxlY3RlZF90eXBlc1wiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cInN0YXRlLnNlbGVjdGVkX3R5cGVzW3Byb3BzLmlkXSA9PT0gJ3NlbGVjdCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZnNlbGVjdCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImAke3Byb3BzLmZuYW1lfS4ke3Byb3BzLmlkfS5kYXRhc291cmNlLm5hbWVgXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwibGFuZygnYl9kYXRhc291cmNlX25hbWUnKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwidGhpcy5kYXRhc291cmNlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkTGFiZWw9XCJsYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkVmFsdWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWVsc2UtaWY9XCJbJ3RleHQnLCAncGhvbmUnLCAnbnVtYmVyJywgJ2VtYWlsJywgJ3Bhc3N3b3JkJ10uaW5kZXhPZihzdGF0ZS5zZWxlY3RlZF90eXBlc1twcm9wcy5pZF0pICE9PSAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0ucGxhY2Vob2xkZXJgXCIgOmxhYmVsPVwibGFuZygnYl9wbGFjZWhvbGRlcicpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfcGxhY2Vob2xkZXInKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1lbHNlLWlmPVwiWydzdWJmb3JtJ10uaW5kZXhPZihzdGF0ZS5zZWxlY3RlZF90eXBlc1twcm9wcy5pZF0pICE9PSAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9LnN1YmZvcm1gXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwibGFuZygnYl9zdWJmb3JtJylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkTGFiZWw9XCJsYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJ0aXRsZSBpcy0zIGhhcy1uby1ib3R0b20tbWFyZ2luXCI+e3tsYW5nKCdiX2Zvcm1fdmFsaWRhdGlvbicsIHt9LCAnb3RoZXInKX19PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGhyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidmFsaWRhdGlvbnMucmVxdWlyZWRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J2NoZWNrYm94JyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImxhbmcoJ2JfZm9ybV9yZXF1aXJlZCcpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cInN0YXRlLmNmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Z2YXJpYWRpYy1lbGVtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vRm9ybScpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi9hcGkvcm91dGVzJyk7XG5jb25zdCBSZWFkZXJNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9SZWFkZXJNaXhpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaXhpbnM6IFtSZWFkZXJNaXhpbl0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1jb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBpcy1mbHVpZFwiPlxuICAgIDwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0hvbWUnKTtcbjwvc2NyaXB0PlxuIiwiY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vYXBpL3JvdXRlcycpO1xuY29uc3QgUmVhZGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvUmVhZGVyTWl4aW4nKTtcbmNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9MYW5nTWl4aW4nKTtcbmNvbnN0IExhbmdzID0gcmVxdWlyZSgnLi4vLi4vbGlzdHMvbGFuZ3MnKTtcbmNvbnN0IFF1YW50aXRpZXMgPSByZXF1aXJlKCcuLi8uLi9saXN0cy9xdWFudGl0aWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1peGluczogW1JlYWRlck1peGluLCBMYW5nTWl4aW5dLFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHBhdGg6IEFQSVJvdXRlcy5lbnRpdHkoJ2xhbmcnLCAnUE9TVCcpLFxuICAgICAgICAgICAgICAgIHJwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdsYW5nJywgJ0dFVCcpLFxuICAgICAgICAgICAgICAgIGNmb3JtOiAnbGFuZ19jcmVhdGlvbicsXG4gICAgICAgICAgICAgICAgcmZvcm06ICdsYW5nX3JlYWQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogNTAsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJSb3c6IDMsXG4gICAgICAgICAgICAgICAgbGFuZ3M6IExhbmdzLkxhbmdzTGlzdCxcbiAgICAgICAgICAgICAgICBxdWFudGl0aWVzOiBRdWFudGl0aWVzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzaW5nbGVfcmVhZCcsIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICBwYXRoOiB0aGlzLnN0YXRlLnJwYXRoLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIHJlYWRDb250ZW50KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmZvcm0gaW4gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy4kc3RvcmUuc3RhdGUuZm9ybXNbdGhpcy5zdGF0ZS5yZm9ybV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnRvX21hdHJpeChmb3JtLmNvbnRlbnQgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNvbnRlbnQgOiBbXSwgdGhpcy5zdGF0ZS5pdGVtc1BlclJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnRMZW5ndGgoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5jb250ZW50Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cImhvbHktZ3JhaWwtY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgaXMtZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwidGl0bGVcIj5MaXN0IG9mIGxhbmd1YWdlIGl0ZW1zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiIHYtZm9yPVwicm93IGluIHJlYWRDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cImNvbnRlbnQgaW4gcm93XCIgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtYmx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInVwZGF0ZShjb250ZW50LCAnbGFuZycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wZW5jaWxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtYXRpb249XCJBcmUgeW91IHN1cmU/XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHdvLXN0ZXBzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInJlbW92ZShjb250ZW50LCAnbGFuZycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FjdGlvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tjb250ZW50LmtleX19ICh7e2NvbnRlbnQubGFuZ319KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBpcy1jZW50ZXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhZ2luYXRvciBjbGFzcz1cInBhZ2luYXRpb24tcHVycGxlXCIgOnNraXA9XCIwXCIgOm51bWJlci1vZi1pdGVtcz1cImNvbnRlbnRMZW5ndGhcIiA6aXRlbXMtcGVyLXBhZ2U9XCJzdGF0ZS5pdGVtc1BlclBhZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvd2lkZ2V0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPkFkZCBvciBtb2RpZnkgYSBsYW5ndWFnZSBpdGVtPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmZvcm0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJzdGF0ZS5jZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwb3N0X3BhdGg9XCJzdGF0ZS5wYXRoXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnB1dF9wYXRoPVwic3RhdGUucGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9wYXRoPVwic3RhdGUucnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfZm9ybT1cInN0YXRlLnJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlucHV0IG5hbWU9XCJrZXlcIiA6bGFiZWw9XCJsYW5nKCdiX2tleScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2Jfa2V5JylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgbmFtZT1cInBhcnRcIiA6bGFiZWw9XCJsYW5nKCdiX3BhcnRfb2Zfd2Vic2l0ZScpXCIgOmlzLXJlcXVpcmVkPVwidHJ1ZVwiIDpwbGFjZWhvbGRlcj1cImxhbmcoJ2JfcGFydF9vZl93ZWJzaXRlJylcIiB0eXBlPVwidGV4dFwiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IG5hbWU9XCJsYW5nXCIgOmxhYmVsPVwibGFuZygnYl9sYW5nJylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOm9wdGlvbnM9XCJzdGF0ZS5sYW5nc1wiIDpmb3JtPVwic3RhdGUuY2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmdmFyaWFkaWMtZWxlbWVudCBuYW1lPVwidmFsdWVzXCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInZhcmlhZGljXCIgc2xvdC1zY29wZT1cInByb3BzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaW5wdXQgOm5hbWU9XCJgJHtwcm9wcy5mbmFtZX0uJHtwcm9wcy5pZH0udmFsdWVgXCIgOmxhYmVsPVwibGFuZygnYl90ZXh0JylcIiA6aXMtcmVxdWlyZWQ9XCJ0cnVlXCIgOnBsYWNlaG9sZGVyPVwibGFuZygnYl90ZXh0X3RvX3Nob3cnKVwiIHR5cGU9XCJ0ZXh0XCIgOmZvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmc2VsZWN0IDpuYW1lPVwiYCR7cHJvcHMuZm5hbWV9LiR7cHJvcHMuaWR9LnF1YW50aXR5YFwiIDpsYWJlbD1cImxhbmcoJ2JfcXVhbnRpdHknKVwiIDppcy1yZXF1aXJlZD1cInRydWVcIiA6b3B0aW9ucz1cInN0YXRlLnF1YW50aXRpZXNcIiA6Zm9ybT1cInN0YXRlLmNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Z2YXJpYWRpYy1lbGVtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vTGFuZycpO1xuPC9zY3JpcHQ+XG4iLCJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBBUElSb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi9hcGkvcm91dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGZvcm1zKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuZm9ybXMubmFtZSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG15Zm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUuZm9ybXMubmFtZV07XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IG15Zm9ybS5jb250ZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1zID0gY29udGVudC5yZWR1Y2UoKG9iaiwgZm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmb3JtLmxhYmVsID0gdGhpcy5sYW5nKGZvcm0ubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICBmb3JtLmRlc2NyaXB0aW9uID0gdGhpcy5sYW5nKGZvcm0uZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICBmb3JtLmZpZWxkcyA9IGZvcm0uZmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLmxhYmVsID0gdGhpcy5sYW5nKGZpZWxkLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9ialtmb3JtLm5hbWVdID0gXy5jbG9uZURlZXAoZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLnJlZHVjZShmb3JtcywgKG9iaiwgZm9ybSwgbmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybS5oYXNfc3ViZm9ybXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmllbGRzID0gZm9ybS5maWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZC50eXBlID09PSAnc3ViZm9ybScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuc3ViZm9ybSA9IGZvcm1zW2ZpZWxkLnN1YmZvcm1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmpbbmFtZV0gPSBmb3JtO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzZWFyY2gnLCB7XG4gICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLmZvcm1zLm5hbWUsXG4gICAgICAgICAgICBwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCdmb3JtJywgJ1BPU1QnLCB0cnVlKSxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBzaXplOiAxMDAwLFxuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB0aGlzLnN0YXRlLmZvcm1zLmdyb3VwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxufTtcbiIsImNvbnN0IFN0cmluZ1V0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvc3RyaW5ncycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGxhbmcoa2V5LCBvYmosIG4pIHtcbiAgICAgICAgICAgIGlmICghKGtleSBpbiB0aGlzLmNsYW5nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLmNsYW5nW2tleV07XG4gICAgICAgICAgICBsZXQgdGV4dCA9IGtleTtcbiAgICAgICAgICAgIC8vIFRPRE8gZmluaXNoIGltcGxlbWVudGF0aW9uIGZvciBmZXcgYW5kIG1hbnlcbiAgICAgICAgICAgIGlmIChuID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoJzEnIGluIGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGluZm9bJzEnXSB8fCBrZXk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGluZm9bJ24vYSddIHx8IGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gaW5mby56ZXJvIHx8IGluZm9bJ24vYSddIHx8IGtleTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRleHQgPSBpbmZvLm9uZSB8fCBpbmZvWyduL2EnXSB8fCBrZXk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gaW5mby50d28gfHwgaW5mb1snbi9hJ10gfHwga2V5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gaW5mby5vdGhlciB8fCBpbmZvWyduL2EnXSB8fCBrZXk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvYmogPT0gbnVsbCB8fCBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nVXRpbHMuZm9ybWF0X3dpdGhfb2JqKHRleHQsIG9iaik7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBjbGFuZygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5sYW5nX2NvbnRlbnRbdGhpcy4kc3RvcmUuc3RhdGUuaW50ZXJmYWNlTGFuZ107XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCJjb25zdCBWdWUgPSByZXF1aXJlKCd2dWUnKTtcbmNvbnN0IEFQSVJvdXRlcyA9IHJlcXVpcmUoJy4uLy4uL2FwaS9yb3V0ZXMnKTtcbmNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vLi4vYXBpL21lc3NhZ2VzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgdXBkYXRlKG9iaiwgZW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuQ0FOQ0VMX0ZPUk0sIHtcbiAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLnN0YXRlLmNmb3JtLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFZ1ZS5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KE1lc3NhZ2VzLlVQREFURV9NT0RFX0ZPUk0sIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5jZm9ybSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBvYmosXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlKG9iaiwgZW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgncmVtb3ZlJywge1xuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICAgICAgcGF0aDogQVBJUm91dGVzLmVudGl0eShlbnRpdHksICdERUwnLCBmYWxzZSwgb2JqLl9pZCksXG4gICAgICAgICAgICAgICAgcnBhdGg6IHRoaXMuc3RhdGUucnBhdGgsXG4gICAgICAgICAgICAgICAgcmZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGJlZm9yZU1vdW50KCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoTWVzc2FnZXMuQ1JFQVRFX0ZPUk0sIHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuc3RhdGUucmZvcm0sXG4gICAgICAgICAgICBjb250ZW50OiBbXSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBlcnJvcigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmNvbnRlbnQgfHwgW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnRMZW5ndGgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50Lmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICAgIGVycm9yKG4pIHtcbiAgICAgICAgICAgIGlmIChuICYmIE9iamVjdC5rZXlzKG4pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG4uY29udGVudC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyB0b2FzdHIuZXJyb3Iobi5jb250ZW50Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG59O1xuIiwiY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscycpO1xuY29uc3QgQVBJUm91dGVzID0gcmVxdWlyZSgnLi4vLi4vYXBpL3JvdXRlcycpO1xuY29uc3QgUmVhZGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvUmVhZGVyTWl4aW4nKTtcbmNvbnN0IExhbmdNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9MYW5nTWl4aW4nKTtcbmNvbnN0IEZvcm1NaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucy9Gb3JtTWl4aW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWl4aW5zOiBbUmVhZGVyTWl4aW4sIExhbmdNaXhpbiwgRm9ybU1peGluXSxcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiBBUElSb3V0ZXMuZW50aXR5KCd1c2VyJywgJ1BPU1QnKSxcbiAgICAgICAgICAgICAgICBycGF0aDogQVBJUm91dGVzLmVudGl0eSgndXNlcicsICdHRVQnKSxcbiAgICAgICAgICAgICAgICBjZm9ybTogJ3VzZXJfY3JlYXRpb24nLFxuICAgICAgICAgICAgICAgIHJmb3JtOiAndXNlcl9yZWFkJyxcbiAgICAgICAgICAgICAgICBmb3Jtczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZm9ybV9yZWFkJyxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogMjAsXG4gICAgICAgICAgICAgICAgaXRlbXNQZXJSb3c6IDIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3NpbmdsZV9yZWFkJywge1xuICAgICAgICAgICAgZm9ybTogdGhpcy5zdGF0ZS5yZm9ybSxcbiAgICAgICAgICAgIHBhdGg6IHRoaXMuc3RhdGUucnBhdGgsXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgcmVhZENvbnRlbnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZm9ybSBpbiB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiRzdG9yZS5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLnJmb3JtXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMudG9fbWF0cml4KGZvcm0uY29udGVudCBpbnN0YW5jZW9mIEFycmF5ID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY29udGVudCA6IFtdLCB0aGlzLnN0YXRlLml0ZW1zUGVyUm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudExlbmd0aCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnJmb3JtIGluIHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuJHN0b3JlLnN0YXRlLmZvcm1zW3RoaXMuc3RhdGUucmZvcm1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmNvbnRlbnQubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCI8dGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiaG9seS1ncmFpbC1jb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBpcy1mbHVpZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDx3aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJ0aXRsZVwiPkxpc3Qgb2YgdXNlcnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCIgdi1mb3I9XCJyb3cgaW4gcmVhZENvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiY29udGVudCBpbiByb3dcIiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8d2lkZ2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFjdGlvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBidXR0b24tYmFja2dyb3VuZC1ibHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYWN0aW9uLWNsaWNrPVwidXBkYXRlKGNvbnRlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wZW5jaWxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hY3Rpb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhY3Rpb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgYnV0dG9uLWJhY2tncm91bmQtcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtYXRpb249XCJBcmUgeW91IHN1cmU/XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHdvLXN0ZXBzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGlvbi1jbGljaz1cInJlbW92ZShjb250ZW50LCAnb3JnYW5pemF0aW9uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWN0aW9uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2NvbnRlbnQuZmlyc3RuYW1lfX0ge3tjb250ZW50Lmxhc3RuYW1lfX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGlzLWNlbnRlcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGFnaW5hdG9yIGNsYXNzPVwicGFnaW5hdGlvbi1wdXJwbGVcIiA6c2tpcD1cIjBcIiA6bnVtYmVyLW9mLWl0ZW1zPVwiY29udGVudExlbmd0aFwiIDppdGVtcy1wZXItcGFnZT1cInN0YXRlLml0ZW1zUGVyUGFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC93aWRnZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPHdpZGdldD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cInRpdGxlXCI+QWRkIG9yIG1vZGlmeSBhIHVzZXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJPYmplY3Qua2V5cyhmb3JtcykubGVuZ3RoID4gMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJzdGF0ZS5jZm9ybVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwb3N0X3BhdGg9XCJzdGF0ZS5wYXRoXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnB1dF9wYXRoPVwic3RhdGUucGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmdldF9wYXRoPVwic3RhdGUucnBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpnZXRfZm9ybT1cInN0YXRlLnJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkeW5hbWljLWZvcm0gOmZvcm09XCJmb3Jtc1sndXNlcl9mb3JtJ10gfHwge31cIiA6Y2Zvcm09XCJzdGF0ZS5jZm9ybVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zmb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3dpZGdldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Vc2VyJyk7XG48L3NjcmlwdD5cbiIsImNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuY29uc3QgVnVlID0gcmVxdWlyZSgndnVlJyk7XG5jb25zdCBSb3V0ZXIgPSByZXF1aXJlKCd2dWUtcm91dGVyJyk7XG5jb25zdCBIZWFkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGhlbWVzL2luZWQvcGFydHMvaGVhZGVyL0hlYWRlci52dWUnKTtcbmNvbnN0IEZvb3RlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90aGVtZXMvaW5lZC9wYXJ0cy9mb290ZXIvRm9vdGVyLnZ1ZScpO1xuY29uc3QgTmF2YmFyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RoZW1lcy9pbmVkL3BhcnRzL25hdmJhci9OYXZiYXIudnVlJyk7XG5jb25zdCBNZW51cyA9IHJlcXVpcmUoJy4vbWVudXMnKTtcblxuVnVlLnVzZShSb3V0ZXIpO1xuXG5jb25zdCBtZW51X3JvdXRlcyA9IF8uZmxhdHRlbihNZW51cy5tZW51KS5tYXAobWVudSA9PiAoe1xuICAgIHBhdGg6IG1lbnUucm91dGVzWzBdLFxuICAgIG5hbWU6IG1lbnUua2V5LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgaGVhZGVyOiBIZWFkZXIsXG4gICAgICAgIGZvb3RlcjogRm9vdGVyLFxuICAgICAgICBuYXZiYXI6IE5hdmJhcixcbiAgICAgICAgZGVmYXVsdDogbWVudS5jb21wb25lbnQsXG4gICAgfSxcbiAgICBwcm9wczogeyBuYXZiYXI6IHsgbWVudXM6IE1lbnVzLm1lbnUgfSB9LFxufSkpO1xuXG5jb25zdCBvdGhlcl9yb3V0ZXMgPSBNZW51cy5vdGhlci5tYXAobWVudSA9PiAoe1xuICAgIHBhdGg6IG1lbnUucm91dGVzWzBdLFxuICAgIG5hbWU6IG1lbnUua2V5LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgaGVhZGVyOiBIZWFkZXIsXG4gICAgICAgIGZvb3RlcjogRm9vdGVyLFxuICAgICAgICBuYXZiYXI6IE5hdmJhcixcbiAgICAgICAgZGVmYXVsdDogbWVudS5jb21wb25lbnQsXG4gICAgfSxcbiAgICBwcm9wczogeyBuYXZiYXI6IHsgbWVudXM6IE1lbnVzLm1lbnUgfSB9LFxufSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBSb3V0ZXIoe1xuICAgIG1vZGU6ICdoaXN0b3J5JyxcbiAgICByb3V0ZXM6IFsuLi5tZW51X3JvdXRlcywgLi4ub3RoZXJfcm91dGVzXSxcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWRtaW46ICcvYWRtaW4nLFxuICAgIHVzZXI6ICcvYWRtaW4vdXNlcicsXG4gICAgcmV2aWV3OiAnL2FkbWluL3JldmlldycsXG4gICAgZGF0YXNvdXJjZTogJy9hZG1pbi9kYXRhc291cmNlJyxcbiAgICBkYXRhaW5zdGFuY2U6ICcvYWRtaW4vZGF0YXNvdXJjZS86ZGF0YWluc3RhbmNlJyxcbiAgICBwdWJsaWNhdGlvbjogJy9hZG1pbi9wdWJsaWNhdGlvbicsXG4gICAgY3NsOiAnL2FkbWluL2NzbCcsXG4gICAgZm9ybTogJy9hZG1pbi9mb3JtJyxcbiAgICBsYW5nOiAnL2FkbWluL2xhbmcnLFxuICAgIGV4dGVybmFsX3JlcG86ICcvYWRtaW4vZXh0ZXJuYWxfcmVwb3NpdG9yeScsXG4gICAgZXhwb3J0X2Zvcm1hdDogJy9hZG1pbi9leHBvcnRfZm9ybWF0JyxcbiAgICBoYW5kbGVfaWQ6ICcvYWRtaW4vaGFuZGxlX2lkJyxcbiAgICBhcGk6ICcvYWRtaW4vYXBpJyxcbiAgICBjb25maWc6ICcvYWRtaW4vY29uZmlnJyxcbn07XG4iLCJjb25zdCBBUEkgPSByZXF1aXJlKCcuLi9hcGknKTtcbmNvbnN0IE1lc3NhZ2VzID0gcmVxdWlyZSgnLi4vYXBpL21lc3NhZ2VzJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZV9vcl91cGRhdGUoY3R4LCB7IHBhdGgsIGJvZHksIGZvcm0sIHJmb3JtLCBycGF0aCB9LCB1cCA9IGZhbHNlKSB7XG4gICAgY29uc3QgbWV0aG9kID0gdXAgPyAnUFVUJyA6ICdQT1NUJztcbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICBwYXRoLFxuICAgICAgICBtZXRob2QsXG4gICAgICAgIGJvZHksXG4gICAgICAgIGNvbW1pdDogY3R4LmNvbW1pdCxcbiAgICB9O1xuXG4gICAgY3R4LmNvbW1pdChNZXNzYWdlcy5MT0FESU5HLCB7IGZvcm0gfSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBBUEkuZmV0Y2gocGF5bG9hZCk7XG4gICAgY3R4LmNvbW1pdChNZXNzYWdlcy5GRVRDSCwgeyBtZXRob2QsIHJlc3BvbnNlLCBmb3JtIH0pO1xuICAgIGN0eC5kaXNwYXRjaCgnc2luZ2xlX3JlYWQnLCB7XG4gICAgICAgIGZvcm06IHJmb3JtLFxuICAgICAgICBwYXRoOiBycGF0aCxcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3JlYXRlOiBhc3luYyAoY3R4LCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGF3YWl0IGNyZWF0ZV9vcl91cGRhdGUoY3R4LCBwYXlsb2FkLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogYXN5bmMgKGN0eCwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBhd2FpdCBjcmVhdGVfb3JfdXBkYXRlKGN0eCwgcGF5bG9hZCwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIHJlbW92ZTogYXN5bmMgKGN0eCwgeyBwYXRoLCBmb3JtLCBycGF0aCwgcmZvcm0gfSkgPT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTCcsXG4gICAgICAgICAgICBjb21taXQ6IGN0eC5jb21taXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgY3R4LmNvbW1pdChNZXNzYWdlcy5MT0FESU5HLCB7IGZvcm0gfSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQVBJLmZldGNoKHBheWxvYWQpO1xuICAgICAgICBjdHguY29tbWl0KE1lc3NhZ2VzLkZFVENILCB7IG1ldGhvZDogJ0RFTCcsIHJlc3BvbnNlLCBmb3JtIH0pO1xuICAgICAgICBjdHguZGlzcGF0Y2goJ3NpbmdsZV9yZWFkJywge1xuICAgICAgICAgICAgZm9ybTogcmZvcm0sXG4gICAgICAgICAgICBwYXRoOiBycGF0aCxcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNpbmdsZV9yZWFkOiBhc3luYyAoY3R4LCB7IGZvcm0sIHBhdGggfSkgPT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBjb21taXQ6IGN0eC5jb21taXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgY3R4LmNvbW1pdChNZXNzYWdlcy5MT0FESU5HLCB7IGZvcm0gfSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQVBJLmZldGNoKHBheWxvYWQpO1xuICAgICAgICBjdHguY29tbWl0KE1lc3NhZ2VzLkZFVENILCB7IG1ldGhvZDogJ0dFVCcsIHJlc3BvbnNlLCBmb3JtIH0pO1xuICAgIH0sXG5cbiAgICBzZWFyY2g6IGFzeW5jIChjdHgsIHsgZm9ybSwgcGF0aCwgYm9keSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBjb21taXQ6IGN0eC5jb21taXQsXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICB9O1xuXG4gICAgICAgIGN0eC5jb21taXQoTWVzc2FnZXMuTE9BRElORywgeyBmb3JtIH0pO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IEFQSS5mZXRjaChwYXlsb2FkKTtcbiAgICAgICAgY3R4LmNvbW1pdChNZXNzYWdlcy5GRVRDSCwgeyBtZXRob2Q6ICdHRVQnLCByZXNwb25zZSwgZm9ybSB9KTtcbiAgICB9LFxuXG4gICAgZ3JhYl9jb25maWc6IGFzeW5jIChjdHgsIHsgcGF0aCwgYm9keSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBjb21taXQ6IGN0eC5jb21taXQsXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQVBJLmZldGNoKHBheWxvYWQpO1xuICAgICAgICAvLyBjb25zdCBzdWNjZXNzID0gcmVzcG9uc2UudHlwZSA9PT0gTWVzc2FnZXMuU1VDQ0VTUztcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzcG9uc2UuY29udGVudCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgY29uc3QgY29udGVudCA9ICdyZXN1bHQnIGluIHJlc3BvbnNlLmNvbnRlbnRcbiAgICAgICAgICAgICYmICdoaXRzJyBpbiByZXNwb25zZS5jb250ZW50LnJlc3VsdCA/IHJlc3BvbnNlLmNvbnRlbnQucmVzdWx0LmhpdHMgOiBbXTtcbiAgICAgICAgaWYgKGNvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY3R4LnN0YXRlLmdsb2JhbF9jb25maWcgPSBjb250ZW50WzBdLnNvdXJjZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBncmFiX2xhbmd1YWdlOiBhc3luYyAoY3R4LCB7IHBhdGgsIGJvZHkgfSkgPT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgY29tbWl0OiBjdHguY29tbWl0LFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IEFQSS5mZXRjaChwYXlsb2FkKTtcbiAgICAgICAgLy8gY29uc3Qgc3VjY2VzcyA9IHJlc3BvbnNlLnR5cGUgPT09IE1lc3NhZ2VzLlNVQ0NFU1M7XG4gICAgICAgIGlmIChyZXNwb25zZS5jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmNvbnRlbnQgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSAncmVzdWx0JyBpbiByZXNwb25zZS5jb250ZW50XG4gICAgICAgICAgICAmJiAnaGl0cycgaW4gcmVzcG9uc2UuY29udGVudC5yZXN1bHQgPyByZXNwb25zZS5jb250ZW50LnJlc3VsdC5oaXRzIDogW107XG4gICAgICAgIGN0eC5zdGF0ZS5sYW5nX2NvbnRlbnQgPSBjb250ZW50LnJlZHVjZSgob2JqLCBzcmMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGwgPSBzcmMuc291cmNlO1xuICAgICAgICAgICAgY29uc3QgbGFuZyA9IG9ialtsLmxhbmddIHx8IHt9O1xuICAgICAgICAgICAgbGFuZ1tsLmtleV0gPSBsLnZhbHVlcy5yZWR1Y2UoKHZhbHVlcywgdikgPT4ge1xuICAgICAgICAgICAgICAgIHZhbHVlc1t2LnF1YW50aXR5XSA9IHYudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIG9ialtsLmxhbmddID0gbGFuZztcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9LFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xufTtcbiIsImNvbnN0IFZ1ZSA9IHJlcXVpcmUoJ3Z1ZScpO1xuY29uc3QgVnVleCA9IHJlcXVpcmUoJ3Z1ZXgnKTtcbmNvbnN0IG11dGF0aW9ucyA9IHJlcXVpcmUoJy4vbXV0YXRpb25zJyk7XG5jb25zdCBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zJyk7XG5jb25zdCBzdGF0ZSA9IHJlcXVpcmUoJy4vc3RhdGUnKTtcbmNvbnN0IGdldHRlcnMgPSByZXF1aXJlKCcuL2dldHRlcnMnKTtcblxuVnVlLnVzZShWdWV4KTtcblxuY29uc3Qgc3RvcmUgPSBuZXcgVnVleC5TdG9yZSh7XG4gICAgc3RhdGUsXG4gICAgZ2V0dGVycyxcbiAgICBhY3Rpb25zLFxuICAgIG11dGF0aW9ucyxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlO1xuIiwiY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgTWVzc2FnZXMgPSByZXF1aXJlKCcuLi9hcGkvbWVzc2FnZXMnKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvdXRpbHMnKTtcblxuZnVuY3Rpb24gY3JlYXRlX2Zvcm0oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcG9vbDogMCxcbiAgICAgICAgY2xhaW1zOiAwLFxuICAgICAgICB2YWxpZGF0aW9uczoge30sXG4gICAgICAgIGVycm9yOiB7fSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIHVwZGF0ZTogZmFsc2UsXG4gICAgICAgIHJlY2xhaW06IGZhbHNlLFxuICAgICAgICBjYW5jZWw6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiAnJyxcbiAgICAgICAgY29udGVudDogW10sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgW01lc3NhZ2VzLkxPQURJTkddOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuICAgICAgICBpZiAoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5GRVRDSF06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gcGF5bG9hZC5yZXNwb25zZS50eXBlID09PSBNZXNzYWdlcy5TVUNDRVNTO1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG5cbiAgICAgICAgaWYgKHBheWxvYWQucmVzcG9uc2UuY29udGVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBwYXlsb2FkLnJlc3BvbnNlLmNvbnRlbnQgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3JtcykpIHtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZm9ybXMsIHsgW2Zvcm1fbmFtZV06IGNyZWF0ZV9mb3JtKCkgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jbGFpbXMgPSAwO1xuICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnJlY2xhaW0gPSBmYWxzZTtcbiAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jYW5jZWwgPSBmYWxzZTtcbiAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS52YWxpZGF0aW9ucyA9IHt9O1xuXG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5tZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHBheWxvYWQucmVzcG9uc2UuY29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAoJ3Jlc3VsdCcgaW4gY29udGVudCAmJiAnaGl0cycgaW4gY29udGVudC5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jb250ZW50ID0gY29udGVudC5yZXN1bHQuaGl0cy5tYXAoaGl0ID0+IF8ubWVyZ2UoeyBfaWQ6IGhpdC5pZCB9LCBoaXQuc291cmNlKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCdjaGFuZ2UnIGluIHBheWxvYWQucmVzcG9uc2UuY29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHBheWxvYWQucmVzcG9uc2UuY29udGVudC5jaGFuZ2UgPT09ICdWYWxpZGF0aW9uJykge1xuICAgICAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0udmFsaWRhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXlsb2FkLnJlc3BvbnNlLmNvbnRlbnQuZXJyb3JzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5zdWNjZXNzID0gcGF5bG9hZC5yZXNwb25zZS5jb250ZW50Lm1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmVycm9yID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmVycm9yID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgICAgIGZvdW5kOiB0cnVlLCBjb250ZW50OiBwYXlsb2FkLnJlc3BvbnNlLmNvbnRlbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0udmFsaWRhdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuRVJST1JdOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgc3RhdGUuZXJyb3IgPSB0cnVlO1xuICAgICAgICBzdGF0ZS5lcnJvcl90eXBlID0gcGF5bG9hZC5lcnJvcl90eXBlO1xuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuQ1JFQVRFX0ZPUk1dOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gcGF5bG9hZC5jb250ZW50IHx8IHt9O1xuICAgICAgICBzdGF0ZS5mb3JtcyA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmZvcm1zLCB7XG4gICAgICAgICAgICBbZm9ybV9uYW1lXTogY3JlYXRlX2Zvcm0oKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY29udGVudCA9IGNvbnRlbnQ7XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5SRU1PVkVfRk9STV06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG4gICAgICAgIGlmIChmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5DQU5DRUxfRk9STV06IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtX25hbWUgPSBwYXlsb2FkLmZvcm07XG4gICAgICAgIGlmIChmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0udXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNvbnRlbnQgPSB7fTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uZXJyb3IgPSB7fTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY2xhaW1zID0gMDtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uc3VjY2VzcyA9ICcnO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS52YWxpZGF0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5SRU1PVkVfQUxMX0ZPUk1TXTogKHN0YXRlKSA9PiB7XG4gICAgICAgIHN0YXRlLmZvcm1zID0ge307XG4gICAgfSxcblxuICAgIFtNZXNzYWdlcy5VUERBVEVfTU9ERV9GT1JNXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcbiAgICAgICAgaWYgKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS51cGRhdGUgPSBwYXlsb2FkLnVwZGF0ZSB8fCBmYWxzZTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY2FuY2VsID0gZmFsc2U7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNvbnRlbnQgPSBPYmplY3QuYXNzaWduKHt9LCBwYXlsb2FkLmNvbnRlbnQgfHwge30pO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5lcnJvciA9IHt9O1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5zdWNjZXNzID0gJyc7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnZhbGlkYXRpb25zID0ge307XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLlRPR0dMRV9SRUNMQUlNX0ZPUk1dOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuICAgICAgICBpZiAoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnJlY2xhaW0gPSAncmVjbGFpbScgaW4gcGF5bG9hZCA/XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5yZWNsYWltIDogIXN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0ucmVjbGFpbTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY2FuY2VsID0gZmFsc2U7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmVycm9yID0ge307XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLlJFQ0xBSU1fRk9STV9FTEVNRU5UXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHBheWxvYWQubmFtZTtcbiAgICAgICAgY29uc3QgaW5mbyA9IHBheWxvYWQuaW5mbztcbiAgICAgICAgaWYgKGZvcm1fbmFtZSBpbiBzdGF0ZS5mb3Jtcykge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLmNvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBvYmplY3QgPSBVdGlscy5tYWtlX25lc3RlZF9vYmplY3RfZnJvbV9wYXRoKHBhdGgsIGluZm8pO1xuICAgICAgICAgICAgc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jb250ZW50ID0gXy5tZXJnZSh7fSwgY29udGVudCwgb2JqZWN0KTtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0uY2xhaW1zICs9IDE7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgW01lc3NhZ2VzLkFERF9UT19GT1JNX1BPT0xdOiAoc3RhdGUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybV9uYW1lID0gcGF5bG9hZC5mb3JtO1xuICAgICAgICBpZiAoZm9ybV9uYW1lIGluIHN0YXRlLmZvcm1zKSB7XG4gICAgICAgICAgICBzdGF0ZS5mb3Jtc1tmb3JtX25hbWVdLnBvb2wgKz0gMTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBbTWVzc2FnZXMuUkVNT1ZFX0ZST01fRk9STV9QT09MXTogKHN0YXRlLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1fbmFtZSA9IHBheWxvYWQuZm9ybTtcbiAgICAgICAgY29uc3QgZWx0X25hbWUgPSBwYXlsb2FkLm5hbWU7XG4gICAgICAgIGlmIChmb3JtX25hbWUgaW4gc3RhdGUuZm9ybXMpIHtcbiAgICAgICAgICAgIHN0YXRlLmZvcm1zW2Zvcm1fbmFtZV0ucG9vbCAtPSAxO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gZWx0X25hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3QgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCBvYmplY3QgPSBVdGlscy5maW5kX29iamVjdF93aXRoX3BhdGgoc3RhdGUuZm9ybXNbZm9ybV9uYW1lXS5jb250ZW50LCBwYXRoKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqZWN0W2xhc3RdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn07XG4iLCJjb25zdCBCcm93c2VyVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9icm93c2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgIGNvbnRlbnQ6IFtdLFxuICAgIGVycm9yOiBmYWxzZSxcbiAgICBlcnJvcl90eXBlOiAnJyxcbiAgICBicm93c2VyTGFuZ3VhZ2U6IEJyb3dzZXJVdGlscy5ub3JtYWxpemVCcm93c2VyTGFuZ3VhZ2UoQnJvd3NlclV0aWxzLmdldEZpcnN0QnJvd3Nlckxhbmd1YWdlKCkpLFxuICAgIGludGVyZmFjZUxhbmc6IG51bGwsXG4gICAgbGFuZ19jb250ZW50OiB7fSxcbiAgICBnbG9iYWxfY29uZmlnOiB7fSxcbiAgICBmb3Jtczoge1xuICAgICAgICAvKiBmb3JtX25hbWU6IHtlcnJvcjoge30sIGNvbnRlbnQ6IHt9LCB1cGRhdGU6IGZhbHNlL3RydWV9Ki9cbiAgICB9LFxufTtcbiIsImZ1bmN0aW9uIGdldEZpcnN0QnJvd3Nlckxhbmd1YWdlKCkge1xuICAgIGNvbnN0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3I7XG4gICAgY29uc3QgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzID0gWydsYW5ndWFnZScsICdicm93c2VyTGFuZ3VhZ2UnLCAnc3lzdGVtTGFuZ3VhZ2UnLCAndXNlckxhbmd1YWdlJ107XG5cbiAgICAvLyBzdXBwb3J0IGZvciBIVE1MIDUuMSBcIm5hdmlnYXRvci5sYW5ndWFnZXNcIlxuICAgIGlmIChBcnJheS5pc0FycmF5KG5hdi5sYW5ndWFnZXMpKSB7XG4gICAgICAgIHJldHVybiBuYXYubGFuZ3VhZ2VzLmZpbmQobGFuZ3VhZ2UgPT4gbGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcbiAgICByZXR1cm4gYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzLmZpbmQoKHZhbCkgPT4ge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IG5hdlt2YWxdO1xuICAgICAgICByZXR1cm4gbGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVCcm93c2VyTGFuZ3VhZ2UobGFuZykge1xuICAgIGlmIChsYW5nID09IG51bGwgfHwgbGFuZyA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBsYW5nLnNwbGl0KCctJylbMF0udG9VcHBlckNhc2UoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Rmlyc3RCcm93c2VyTGFuZ3VhZ2UsXG4gICAgbm9ybWFsaXplQnJvd3Nlckxhbmd1YWdlLFxufTtcbiIsImNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuZnVuY3Rpb24gZm9ybWF0KGZvcm0sIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gZm9ybS5yZXBsYWNlKC97KFxcZCspfS9nLCAobWF0Y2gsIG51bWJlcikgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbbnVtYmVyXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzW251bWJlcl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRfd2l0aF9vYmooZm9ybSwgb2JqKSB7XG4gICAgcmV0dXJuIGZvcm0ucmVwbGFjZSgveyhbQS1aYS16Xy4tXSspfS9nLCAobWF0Y2gsIG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgaW5mbyA9IF8uZ2V0KG9iaiwgbmFtZSk7XG4gICAgICAgIGlmIChpbmZvICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm1hdCxcbiAgICBmb3JtYXRfd2l0aF9vYmosXG59O1xuIiwiLy8gICAgICBcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuZnVuY3Rpb24gdHJ1bmNhdGUoaW5wdXQgICAgICAgICwgc2l6ZSAgICAgICAgID0gMTAsIGVsbGlwc2lzICAgICAgICAgPSAnLi4uJykgICAgICAgICB7XG4gICAgY29uc3QgdG90YWxfc2l6ZSA9IHNpemUgKyBlbGxpcHNpcy5sZW5ndGg7XG4gICAgaWYgKGlucHV0Lmxlbmd0aCA+IHRvdGFsX3NpemUpIHtcbiAgICAgICAgY29uc3QgY2hhcl90b19yZW1vdmUgPSBpbnB1dC5sZW5ndGggLSBzaXplO1xuICAgICAgICBjb25zdCBoYWxmID0gTWF0aC5mbG9vcihpbnB1dC5sZW5ndGggLyAyLjApO1xuICAgICAgICBjb25zdCBmaXJzdF9oYWxmID0gTWF0aC5mbG9vcihjaGFyX3RvX3JlbW92ZSAvIDIuMCk7XG4gICAgICAgIGNvbnN0IGxhc3RfaGFsZiA9IE1hdGguY2VpbChjaGFyX3RvX3JlbW92ZSAvIDIuMCk7XG5cbiAgICAgICAgcmV0dXJuIGlucHV0LnNsaWNlKDAsIGhhbGYgLSBmaXJzdF9oYWxmKVxuICAgICAgICAgICAgKyBlbGxpcHNpc1xuICAgICAgICAgICAgKyBpbnB1dC5zbGljZShoYWxmICsgbGFzdF9oYWxmLCBpbnB1dC5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIF9yZXR1cm5faW5uZXJfb2JqZWN0KG9iamVjdCAgICAgICAgICwgY29weSAgICAgICAgICA9IHRydWUpICAgICAge1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChjb3B5KSB7XG4gICAgICAgICAgICByZXR1cm4gXy5jbG9uZURlZXAob2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBfdGVzdF9pbm5lcl9vYmplY3Qob2JqZWN0ICAgICAgICAgLCBrZXkgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAge1xuICAgIGlmICghaXNOYU4ocGFyc2VJbnQoa2V5LCAxMCkpKSB7XG4gICAgICAgIGtleSA9IHBhcnNlSW50KGtleSwgMTApO1xuICAgIH1cblxuICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW2tleSwgbnVsbF07XG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZiAob2JqZWN0Lmxlbmd0aCA8PSBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBba2V5LCBudWxsXTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShrZXkgaW4gb2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gW2tleSwgbnVsbF07XG4gICAgfVxuICAgIHJldHVybiBba2V5LCBvYmplY3RdO1xufVxuXG5cbmZ1bmN0aW9uIGZpbmRfb2JqZWN0X3dpdGhfcGF0aChvYmplY3QgICAgICAgICAsIHBhdGggICAgICAgICAgICAgICApICAgICAge1xuICAgIGNvbnN0IHAgPSBwYXRoO1xuXG4gICAgaWYgKHAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBfcmV0dXJuX2lubmVyX29iamVjdChvYmplY3QsIGZhbHNlKTsgLy8gRG9uJ3QgY29weVxuICAgIH1cblxuICAgIGlmIChwLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbGV0IGtleSA9IHBbMF07XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBba2V5LCByZXN1bHRdID0gX3Rlc3RfaW5uZXJfb2JqZWN0KG9iamVjdCwga2V5KTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7IHJldHVybiByZXN1bHQ7IH1cbiAgICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7IHJldHVybiBvYmplY3Q7IH1cbiAgICAgICAgcmV0dXJuIGZpbmRfb2JqZWN0X3dpdGhfcGF0aChvYmplY3Rba2V5XSwgcC5zbGljZSgxKSk7XG4gICAgfVxuICAgIHJldHVybiBmaW5kX29iamVjdF93aXRoX3BhdGgob2JqZWN0LCBwLnNsaWNlKDEpKTtcbn1cblxuZnVuY3Rpb24gZmluZF92YWx1ZV93aXRoX3BhdGgob2JqZWN0ICAgICAgICAgLCBwYXRoICAgICAgICAgICAgICAgKSAgICAgIHtcbiAgICBjb25zdCBwID0gcGF0aDtcbiAgICBpZiAocC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIF9yZXR1cm5faW5uZXJfb2JqZWN0KG9iamVjdCk7XG4gICAgfVxuXG4gICAgbGV0IGtleSA9IHBbMF07XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgW2tleSwgcmVzdWx0XSA9IF90ZXN0X2lubmVyX29iamVjdChvYmplY3QsIGtleSk7XG4gICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7IHJldHVybiByZXN1bHQ7IH1cbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHsgcmV0dXJuIG9iamVjdDsgfVxuICAgIHJldHVybiBmaW5kX3ZhbHVlX3dpdGhfcGF0aChvYmplY3Rba2V5XSwgcC5zbGljZSgxKSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VfbmVzdGVkX29iamVjdF9mcm9tX3BhdGgocGF0aCAgICAgICAgICAgICAgICxcbiAgICB2YWx1ZSAgICAgLCBvYmogICAgICAgICA9IHt9KSAgICAgICAgIHtcbiAgICBjb25zdCBycGF0aCA9IF8ucmV2ZXJzZShwYXRoKTtcbiAgICByZXR1cm4gcnBhdGgucmVkdWNlKChhY2MsIGZpZWxkKSA9PiB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhhY2MpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWNjW2ZpZWxkXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBteV9vYmogPSB7fTtcbiAgICAgICAgbXlfb2JqW2ZpZWxkXSA9IGFjYztcbiAgICAgICAgcmV0dXJuIG15X29iajtcbiAgICB9LCBvYmopO1xufVxuXG5mdW5jdGlvbiB0b19tYXRyaXgoY29udGVudCAgICAgICAgICAsIHJvd0xlbmd0aCAgICAgICAgID0gMikge1xuICAgIHJldHVybiBjb250ZW50XG4gICAgICAgIC5yZWR1Y2UoKHJvd3MsIGtleSwgaW5kZXgpID0+IChpbmRleCAlIHJvd0xlbmd0aCA9PT0gMCA/IHJvd3MucHVzaChba2V5XSlcbiAgICAgICAgICAgIDogcm93c1tyb3dzLmxlbmd0aCAtIDFdLnB1c2goa2V5KSkgJiYgcm93cywgW10pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0cnVuY2F0ZSxcbiAgICB0b19tYXRyaXgsXG4gICAgZmluZF92YWx1ZV93aXRoX3BhdGgsXG4gICAgZmluZF9vYmplY3Rfd2l0aF9wYXRoLFxuICAgIG1ha2VfbmVzdGVkX29iamVjdF9mcm9tX3BhdGgsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9wcm9taXNlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvcHJvbWlzZVwiKTtcblxudmFyIF9wcm9taXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb21pc2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2VuID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gbmV3IF9wcm9taXNlMi5kZWZhdWx0KGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIHN0ZXAoa2V5LCBhcmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3Byb21pc2UyLmRlZmF1bHQucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBzdGVwKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RlcChcIm5leHRcIik7XG4gICAgfSk7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiXHJcbi8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XHJcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1peGluKG9iaikge1xyXG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xyXG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub24gPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxyXG4gICAgLnB1c2goZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICBmdW5jdGlvbiBvbigpIHtcclxuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgb24uZm4gPSBmbjtcclxuICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAvLyBhbGxcclxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICB2YXIgY2I7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuXHJcbiAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxufTtcclxuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tO1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gZ2V0S2V5cyhpdCk7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZiAoZ2V0U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdCk7XG4gICAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChzeW1ib2xzLmxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsInZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uICgpIHsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBza2lwQ2xvc2luZykge1xuICBpZiAoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gWzddO1xuICAgIHZhciBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgZG9uZTogc2FmZSA9IHRydWUgfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCJ2YXIgTUVUQSA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBzZXREZXNjID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBpZCA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gKGl0KSB7XG4gIHNldERlc2MoaXQsIE1FVEEsIHsgdmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSkgc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6IE1FVEEsXG4gIE5FRUQ6IGZhbHNlLFxuICBmYXN0S2V5OiBmYXN0S2V5LFxuICBnZXRXZWFrOiBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBPYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKSBwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICBmbiA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKGlzTm9kZSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxuICB9IGVsc2UgaWYgKE9ic2VydmVyKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIFByb21pc2VDYXBhYmlsaXR5KEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG4iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGdPUE4gPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmY7XG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYykge1xuICB2YXIgZm4gPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV07XG4gIHZhciBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbiAoKSB7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG4iLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIEQpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL19odG1sJyk7XG52YXIgY2VsID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBzZXRUYXNrID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhclRhc2sgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9ICt0aGlzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0VGFzayB8fCAhY2xlYXJUYXNrKSB7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcycpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3coY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmIChuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKSBkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7IHZhbHVlOiB3a3NFeHQuZihuYW1lKSB9KTtcbn07XG4iLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0ID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UgLyogLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCAqLykge1xuICAgIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgICB2YXIgQyA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXk7XG4gICAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBtYXBmbiA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oTyk7XG4gICAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZiAobWFwcGluZykgbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZiAoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpIHtcbiAgICAgIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEMoKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yIChyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIga2luZCA9IHRoaXMuX2s7XG4gIHZhciBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYgKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKSB7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG4iLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuIiwiIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChwcm9taXNlLCBpc1JlamVjdCkge1xuICBpZiAocHJvbWlzZS5fbikgcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciBvayA9IHByb21pc2UuX3MgPT0gMTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uIChyZWFjdGlvbikge1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbDtcbiAgICAgIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgICAgIHZhciByZWplY3QgPSByZWFjdGlvbi5yZWplY3Q7XG4gICAgICB2YXIgZG9tYWluID0gcmVhY3Rpb24uZG9tYWluO1xuICAgICAgdmFyIHJlc3VsdCwgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2ggPT0gMikgb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgaWYgKHByb21pc2UuX2ggPT0gMSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9hIHx8IHByb21pc2UuX2M7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlYWN0aW9uO1xuICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkge1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZiAocmVhY3Rpb24uZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3Rpb24ucHJvbWlzZSkpIHJldHVybiBmYWxzZTtcbiAgfSByZXR1cm4gdHJ1ZTtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCkge1xuICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdiB9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZiAoIXByb21pc2UuX2EpIHByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICB2YXIgdGhlbjtcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSkge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAkcmVqZWN0LmNhbGwoeyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX2EpIHRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fcykgbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSAkUHJvbWlzZSB8fCBDID09PSBXcmFwcGVyXG4gICAgICA/IG5ldyBPd25Qcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgOiBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgUHJvbWlzZTogJFByb21pc2UgfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpIHtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpO1xuICAgIHZhciAkJHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShMSUJSQVJZICYmIHRoaXMgPT09IFdyYXBwZXIgPyAkUHJvbWlzZSA6IHRoaXMsIHgpO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgJGluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgdmFyIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgTUVUQSA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVk7XG52YXIgJGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIHdrc0RlZmluZSA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKTtcbnZhciBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL19pcy1hcnJheScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBfY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdPUE5FeHQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKTtcbnZhciAkR09QRCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJyk7XG52YXIgJERQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUEQgPSAkR09QRC5mO1xudmFyIGRQID0gJERQLmY7XG52YXIgZ09QTiA9IGdPUE5FeHQuZjtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkSlNPTiA9IGdsb2JhbC5KU09OO1xudmFyIF9zdHJpbmdpZnkgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgSElEREVOID0gd2tzKCdfaGlkZGVuJyk7XG52YXIgVE9fUFJJTUlUSVZFID0gd2tzKCd0b1ByaW1pdGl2ZScpO1xudmFyIGlzRW51bSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKTtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT1BTeW1ib2xzID0gc2hhcmVkKCdvcC1zeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciBVU0VfTkFUSVZFID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKGl0LCBrZXksIEQpIHtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmIChwcm90b0Rlc2MpIGRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYgKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pIGRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZykge1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCkge1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvKSAkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUQuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoaXQsIEhJRERFTikpIGRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSBpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHsgZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCkge1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSk7XG4gIHZhciBpID0gMDtcbiAgdmFyIGwgPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGwgPiBpKSAkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKSB7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KSB7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICBpdCA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZiAoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSBELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHZhciBuYW1lcyA9IGdPUE4odG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICB2YXIgSVNfT1AgPSBpdCA9PT0gT2JqZWN0UHJvdG87XG4gIHZhciBuYW1lcyA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSkgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpIHRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8pICRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBzZXR0ZXIpIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldCB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSkge1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgU3ltYm9sOiAkU3ltYm9sIH0pO1xuXG5mb3IgKHZhciBlczZTeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGogPSAwOyBlczZTeW1ib2xzLmxlbmd0aCA+IGo7KXdrcyhlczZTeW1ib2xzW2orK10pO1xuXG5mb3IgKHZhciB3ZWxsS25vd25TeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgayA9IDA7IHdlbGxLbm93blN5bWJvbHMubGVuZ3RoID4gazspIHdrc0RlZmluZSh3ZWxsS25vd25TeW1ib2xzW2srK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICAgIGZvciAodmFyIGtleSBpbiBTeW1ib2xSZWdpc3RyeSkgaWYgKFN5bWJvbFJlZ2lzdHJ5W2tleV0gPT09IHN5bSkgcmV0dXJuIGtleTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHsgYTogUyB9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpIHtcbiAgICBpZiAoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpIHJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XTtcbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZiAodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpICRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmICgkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoJHJlcGxhY2VyKSB2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG4iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcbiIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxudmFyIERPTUl0ZXJhYmxlcyA9ICgnQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCwnICtcbiAgJ0RPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsJyArXG4gICdNZWRpYUxpc3QsTWltZVR5cGVBcnJheSxOYW1lZE5vZGVNYXAsTm9kZUxpc3QsUGFpbnRSZXF1ZXN0TGlzdCxQbHVnaW4sUGx1Z2luQXJyYXksU1ZHTGVuZ3RoTGlzdCxTVkdOdW1iZXJMaXN0LCcgK1xuICAnU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsJyArXG4gICdUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdCcpLnNwbGl0KCcsJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgRE9NSXRlcmFibGVzLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBOQU1FID0gRE9NSXRlcmFibGVzW2ldO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyByZXNvbHZlcyAuIGFuZCAuLiBlbGVtZW50cyBpbiBhIHBhdGggYXJyYXkgd2l0aCBkaXJlY3RvcnkgbmFtZXMgdGhlcmVcbi8vIG11c3QgYmUgbm8gc2xhc2hlcywgZW1wdHkgZWxlbWVudHMsIG9yIGRldmljZSBuYW1lcyAoYzpcXCkgaW4gdGhlIGFycmF5XG4vLyAoc28gYWxzbyBubyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzIC0gaXQgZG9lcyBub3QgZGlzdGluZ3Vpc2hcbi8vIHJlbGF0aXZlIGFuZCBhYnNvbHV0ZSBwYXRocylcbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5KHBhcnRzLCBhbGxvd0Fib3ZlUm9vdCkge1xuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgbGFzdCA9IHBhcnRzW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgcGFydHMudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFydHM7XG59XG5cbi8vIFNwbGl0IGEgZmlsZW5hbWUgaW50byBbcm9vdCwgZGlyLCBiYXNlbmFtZSwgZXh0XSwgdW5peCB2ZXJzaW9uXG4vLyAncm9vdCcgaXMganVzdCBhIHNsYXNoLCBvciBub3RoaW5nLlxudmFyIHNwbGl0UGF0aFJlID1cbiAgICAvXihcXC8/fCkoW1xcc1xcU10qPykoKD86XFwuezEsMn18W15cXC9dKz98KShcXC5bXi5cXC9dKnwpKSg/OltcXC9dKikkLztcbnZhciBzcGxpdFBhdGggPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICByZXR1cm4gc3BsaXRQYXRoUmUuZXhlYyhmaWxlbmFtZSkuc2xpY2UoMSk7XG59O1xuXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XG4gICAgdmFyIHBhdGggPSAoaSA+PSAwKSA/IGFyZ3VtZW50c1tpXSA6IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XG4gIH1cblxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICByZXR1cm4gKChyZXNvbHZlZEFic29sdXRlID8gJy8nIDogJycpICsgcmVzb2x2ZWRQYXRoKSB8fCAnLic7XG59O1xuXG4vLyBwYXRoLm5vcm1hbGl6ZShwYXRoKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLFxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBwYXRoID0gJy4nO1xuICB9XG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICBwYXRoICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5qb2luID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0pLmpvaW4oJy8nKSk7XG59O1xuXG5cbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XG4gIHRvID0gZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7XG5cbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xuICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XG4gIH1cblxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xuICB2YXIgdG9QYXJ0cyA9IHRyaW0odG8uc3BsaXQoJy8nKSk7XG5cbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcbiAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcbiAgICAgIHNhbWVQYXJ0c0xlbmd0aCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHNhbWVQYXJ0c0xlbmd0aDsgaSA8IGZyb21QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XG4gIH1cblxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xuXG4gIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJyk7XG59O1xuXG5leHBvcnRzLnNlcCA9ICcvJztcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xuXG5leHBvcnRzLmRpcm5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciByZXN1bHQgPSBzcGxpdFBhdGgocGF0aCksXG4gICAgICByb290ID0gcmVzdWx0WzBdLFxuICAgICAgZGlyID0gcmVzdWx0WzFdO1xuXG4gIGlmICghcm9vdCAmJiAhZGlyKSB7XG4gICAgLy8gTm8gZGlybmFtZSB3aGF0c29ldmVyXG4gICAgcmV0dXJuICcuJztcbiAgfVxuXG4gIGlmIChkaXIpIHtcbiAgICAvLyBJdCBoYXMgYSBkaXJuYW1lLCBzdHJpcCB0cmFpbGluZyBzbGFzaFxuICAgIGRpciA9IGRpci5zdWJzdHIoMCwgZGlyLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgcmV0dXJuIHJvb3QgKyBkaXI7XG59O1xuXG5cbmV4cG9ydHMuYmFzZW5hbWUgPSBmdW5jdGlvbihwYXRoLCBleHQpIHtcbiAgdmFyIGYgPSBzcGxpdFBhdGgocGF0aClbMl07XG4gIC8vIFRPRE86IG1ha2UgdGhpcyBjb21wYXJpc29uIGNhc2UtaW5zZW5zaXRpdmUgb24gd2luZG93cz9cbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gZjtcbn07XG5cblxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gc3BsaXRQYXRoKHBhdGgpWzNdO1xufTtcblxuZnVuY3Rpb24gZmlsdGVyICh4cywgZikge1xuICAgIGlmICh4cy5maWx0ZXIpIHJldHVybiB4cy5maWx0ZXIoZik7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGYoeHNbaV0sIGksIHhzKSkgcmVzLnB1c2goeHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBTdHJpbmcucHJvdG90eXBlLnN1YnN0ciAtIG5lZ2F0aXZlIGluZGV4IGRvbid0IHdvcmsgaW4gSUU4XG52YXIgc3Vic3RyID0gJ2FiJy5zdWJzdHIoLTEpID09PSAnYidcbiAgICA/IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHsgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbikgfVxuICAgIDogZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikge1xuICAgICAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IHN0ci5sZW5ndGggKyBzdGFydDtcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbik7XG4gICAgfVxuO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8vIFRoaXMgbWV0aG9kIG9mIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCBuZWVkcyB0byBiZVxuLy8ga2VwdCBpZGVudGljYWwgdG8gdGhlIHdheSBpdCBpcyBvYnRhaW5lZCBpbiBydW50aW1lLmpzXG52YXIgZyA9IChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMgfSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG5cbi8vIFVzZSBgZ2V0T3duUHJvcGVydHlOYW1lc2AgYmVjYXVzZSBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgY2FsbGluZ1xuLy8gYGhhc093blByb3BlcnR5YCBvbiB0aGUgZ2xvYmFsIGBzZWxmYCBvYmplY3QgaW4gYSB3b3JrZXIuIFNlZSAjMTgzLlxudmFyIGhhZFJ1bnRpbWUgPSBnLnJlZ2VuZXJhdG9yUnVudGltZSAmJlxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnKS5pbmRleE9mKFwicmVnZW5lcmF0b3JSdW50aW1lXCIpID49IDA7XG5cbi8vIFNhdmUgdGhlIG9sZCByZWdlbmVyYXRvclJ1bnRpbWUgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZXN0b3JlZCBsYXRlci5cbnZhciBvbGRSdW50aW1lID0gaGFkUnVudGltZSAmJiBnLnJlZ2VuZXJhdG9yUnVudGltZTtcblxuLy8gRm9yY2UgcmVldmFsdXRhdGlvbiBvZiBydW50aW1lLmpzLlxuZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcblxuaWYgKGhhZFJ1bnRpbWUpIHtcbiAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgcnVudGltZS5cbiAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBvbGRSdW50aW1lO1xufSBlbHNlIHtcbiAgLy8gUmVtb3ZlIHRoZSBnbG9iYWwgcHJvcGVydHkgYWRkZWQgYnkgcnVudGltZS5qcy5cbiAgdHJ5IHtcbiAgICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIH0gY2F0Y2goZSkge1xuICAgIGcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL21hc3Rlci9MSUNFTlNFIGZpbGUuIEFuXG4gKiBhZGRpdGlvbmFsIGdyYW50IG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW5cbiAqIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAvLyByZXN1bHQgZm9yIHRoaXMgaXRlcmF0aW9uIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgc2FtZVxuICAgICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgIC8vIHdoZW4gYW4gYXdhaXRlZCBQcm9taXNlIGlzIHJlamVjdGVkLiBUaGlzIGRpZmZlcmVuY2UgaW5cbiAgICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAvLyByZWplY3Rpb24gKHN3YWxsb3cgaXQgYW5kIGNvbnRpbnVlLCBtYW51YWxseSAudGhyb3cgaXQgYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAvLyByZWplY3Rpb24gcmVhc29uIG91dHNpZGUgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgc28gdGhlXG4gICAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEluIHNsb3BweSBtb2RlLCB1bmJvdW5kIGB0aGlzYCByZWZlcnMgdG8gdGhlIGdsb2JhbCBvYmplY3QsIGZhbGxiYWNrIHRvXG4gIC8vIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlmIHdlJ3JlIGluIGdsb2JhbCBzdHJpY3QgbW9kZS4gVGhhdCBpcyBzYWRseSBhIGZvcm1cbiAgLy8gb2YgaW5kaXJlY3QgZXZhbCB3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeS5cbiAgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcyB9KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKVxuKTtcbiIsImZ1bmN0aW9uIEFnZW50KCkge1xuICB0aGlzLl9kZWZhdWx0cyA9IFtdO1xufVxuXG5bXCJ1c2VcIiwgXCJvblwiLCBcIm9uY2VcIiwgXCJzZXRcIiwgXCJxdWVyeVwiLCBcInR5cGVcIiwgXCJhY2NlcHRcIiwgXCJhdXRoXCIsIFwid2l0aENyZWRlbnRpYWxzXCIsIFwic29ydFF1ZXJ5XCIsIFwicmV0cnlcIiwgXCJva1wiLCBcInJlZGlyZWN0c1wiLFxuIFwidGltZW91dFwiLCBcImJ1ZmZlclwiLCBcInNlcmlhbGl6ZVwiLCBcInBhcnNlXCIsIFwiY2FcIiwgXCJrZXlcIiwgXCJwZnhcIiwgXCJjZXJ0XCJdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgLyoqIERlZmF1bHQgc2V0dGluZyBmb3IgYWxsIHJlcXVlc3RzIGZyb20gdGhpcyBhZ2VudCAqL1xuICBBZ2VudC5wcm90b3R5cGVbZm5dID0gZnVuY3Rpb24oLyp2YXJhcmdzKi8pIHtcbiAgICB0aGlzLl9kZWZhdWx0cy5wdXNoKHtmbjpmbiwgYXJndW1lbnRzOmFyZ3VtZW50c30pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59KTtcblxuQWdlbnQucHJvdG90eXBlLl9zZXREZWZhdWx0cyA9IGZ1bmN0aW9uKHJlcSkge1xuICAgIHRoaXMuX2RlZmF1bHRzLmZvckVhY2goZnVuY3Rpb24oZGVmKSB7XG4gICAgICByZXFbZGVmLmZuXS5hcHBseShyZXEsIGRlZi5hcmd1bWVudHMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBZ2VudDtcbiIsIi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxudmFyIHJvb3Q7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gQnJvd3NlciB3aW5kb3dcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IC8vIFdlYiBXb3JrZXJcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgeyAvLyBPdGhlciBlbnZpcm9ubWVudHNcbiAgY29uc29sZS53YXJuKFwiVXNpbmcgYnJvd3Nlci1vbmx5IHZlcnNpb24gb2Ygc3VwZXJhZ2VudCBpbiBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcbiAgcm9vdCA9IHRoaXM7XG59XG5cbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBSZXF1ZXN0QmFzZSA9IHJlcXVpcmUoJy4vcmVxdWVzdC1iYXNlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xudmFyIFJlc3BvbnNlQmFzZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2UtYmFzZScpO1xudmFyIEFnZW50ID0gcmVxdWlyZSgnLi9hZ2VudC1iYXNlJyk7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBFeHBvc2UgYHJlcXVlc3RgLlxuICovXG5cbnZhciByZXF1ZXN0ID0gZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn1cblxuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbnJlcXVlc3QuZ2V0WEhSID0gZnVuY3Rpb24gKCkge1xuICBpZiAocm9vdC5YTUxIdHRwUmVxdWVzdFxuICAgICAgJiYgKCFyb290LmxvY2F0aW9uIHx8ICdmaWxlOicgIT0gcm9vdC5sb2NhdGlvbi5wcm90b2NvbFxuICAgICAgICAgIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHRocm93IEVycm9yKFwiQnJvd3Nlci1vbmx5IHZlcnNpb24gb2Ygc3VwZXJhZ2VudCBjb3VsZCBub3QgZmluZCBYSFJcIik7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgYWRkZWQgdG8gc3VwcG9ydCBJRS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHRyaW0gPSAnJy50cmltXG4gID8gZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzKSB7IHJldHVybiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpOyB9O1xuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gIHZhciBwYWlycyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgb2JqW2tleV0pO1xuICB9XG4gIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG59XG5cbi8qKlxuICogSGVscHMgJ3NlcmlhbGl6ZScgd2l0aCBzZXJpYWxpemluZyBhcnJheXMuXG4gKiBNdXRhdGVzIHRoZSBwYWlycyBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyc1xuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKi9cblxuZnVuY3Rpb24gcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdmFsKSB7XG4gIGlmICh2YWwgIT0gbnVsbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHZhbC5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdik7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcbiAgICAgIGZvcih2YXIgc3Via2V5IGluIHZhbCkge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5ICsgJ1snICsgc3Via2V5ICsgJ10nLCB2YWxbc3Via2V5XSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSlcbiAgICAgICAgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkpO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbnJlcXVlc3Quc2VyaWFsaXplT2JqZWN0ID0gc2VyaWFsaXplO1xuXG4vKipcbiAgKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAqIEByZXR1cm4ge09iamVjdH1cbiAgKiBAYXBpIHByaXZhdGVcbiAgKi9cblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoc3RyKSB7XG4gIHZhciBvYmogPSB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KCcmJyk7XG4gIHZhciBwYWlyO1xuICB2YXIgcG9zO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYWlycy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHBhaXIgPSBwYWlyc1tpXTtcbiAgICBwb3MgPSBwYWlyLmluZGV4T2YoJz0nKTtcbiAgICBpZiAocG9zID09IC0xKSB7XG4gICAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIpXSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIuc2xpY2UoMCwgcG9zKSldID1cbiAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIuc2xpY2UocG9zICsgMSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogRXhwb3NlIHBhcnNlci5cbiAqL1xuXG5yZXF1ZXN0LnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG5cbi8qKlxuICogRGVmYXVsdCBNSU1FIHR5cGUgbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqL1xuXG5yZXF1ZXN0LnR5cGVzID0ge1xuICBodG1sOiAndGV4dC9odG1sJyxcbiAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB4bWw6ICd0ZXh0L3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybS1kYXRhJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG5yZXF1ZXN0LnNlcmlhbGl6ZSA9IHtcbiAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHNlcmlhbGl6ZSxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeSxcbn07XG5cbi8qKlxuICAqIERlZmF1bHQgcGFyc2Vycy5cbiAgKlxuICAqICAgICBzdXBlcmFnZW50LnBhcnNlWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKHN0cil7XG4gICogICAgICAgcmV0dXJuIHsgb2JqZWN0IHBhcnNlZCBmcm9tIHN0ciB9O1xuICAqICAgICB9O1xuICAqXG4gICovXG5cbnJlcXVlc3QucGFyc2UgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBwYXJzZVN0cmluZyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnBhcnNlLFxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoL1xccj9cXG4vKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgaW5kZXg7XG4gIHZhciBsaW5lO1xuICB2YXIgZmllbGQ7XG4gIHZhciB2YWw7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgeyAvLyBjb3VsZCBiZSBlbXB0eSBsaW5lLCBqdXN0IHNraXAgaXRcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICByZXR1cm4gL1tcXC8rXWpzb25cXGIvLnRlc3QobWltZSk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSkge1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgdmFyIHN0YXR1cyA9IHRoaXMueGhyLnN0YXR1cztcbiAgLy8gaGFuZGxlIElFOSBidWc6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgc3RhdHVzID0gMjA0O1xuICB9XG4gIHRoaXMuX3NldFN0YXR1c1Byb3BlcnRpZXMoc3RhdHVzKTtcbiAgdGhpcy5oZWFkZXIgPSB0aGlzLmhlYWRlcnMgPSBwYXJzZUhlYWRlcih0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gIC8vIGdldEFsbFJlc3BvbnNlSGVhZGVycyBzb21ldGltZXMgZmFsc2VseSByZXR1cm5zIFwiXCIgZm9yIENPUlMgcmVxdWVzdHMsIGJ1dFxuICAvLyBnZXRSZXNwb25zZUhlYWRlciBzdGlsbCB3b3Jrcy4gc28gd2UgZ2V0IGNvbnRlbnQtdHlwZSBldmVuIGlmIGdldHRpbmdcbiAgLy8gb3RoZXIgaGVhZGVycyBmYWlscy5cbiAgdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpO1xuICB0aGlzLl9zZXRIZWFkZXJQcm9wZXJ0aWVzKHRoaXMuaGVhZGVyKTtcblxuICBpZiAobnVsbCA9PT0gdGhpcy50ZXh0ICYmIHJlcS5fcmVzcG9uc2VUeXBlKSB7XG4gICAgdGhpcy5ib2R5ID0gdGhpcy54aHIucmVzcG9uc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5ib2R5ID0gdGhpcy5yZXEubWV0aG9kICE9ICdIRUFEJ1xuICAgICAgPyB0aGlzLl9wYXJzZUJvZHkodGhpcy50ZXh0ID8gdGhpcy50ZXh0IDogdGhpcy54aHIucmVzcG9uc2UpXG4gICAgICA6IG51bGw7XG4gIH1cbn1cblxuUmVzcG9uc2VCYXNlKFJlc3BvbnNlLnByb3RvdHlwZSk7XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGJvZHkgYHN0cmAuXG4gKlxuICogVXNlZCBmb3IgYXV0by1wYXJzaW5nIG9mIGJvZGllcy4gUGFyc2Vyc1xuICogYXJlIGRlZmluZWQgb24gdGhlIGBzdXBlcmFnZW50LnBhcnNlYCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuX3BhcnNlQm9keSA9IGZ1bmN0aW9uKHN0cikge1xuICB2YXIgcGFyc2UgPSByZXF1ZXN0LnBhcnNlW3RoaXMudHlwZV07XG4gIGlmICh0aGlzLnJlcS5fcGFyc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLl9wYXJzZXIodGhpcywgc3RyKTtcbiAgfVxuICBpZiAoIXBhcnNlICYmIGlzSlNPTih0aGlzLnR5cGUpKSB7XG4gICAgcGFyc2UgPSByZXF1ZXN0LnBhcnNlWydhcHBsaWNhdGlvbi9qc29uJ107XG4gIH1cbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9OyAvLyBwcmVzZXJ2ZXMgaGVhZGVyIG5hbWUgY2FzZVxuICB0aGlzLl9oZWFkZXIgPSB7fTsgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVyciA9IG51bGw7XG4gICAgdmFyIHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICAvLyBpc3N1ZSAjNjc1OiByZXR1cm4gdGhlIHJhdyByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICAgIC8vIGllOSBkb2Vzbid0IGhhdmUgJ3Jlc3BvbnNlJyBwcm9wZXJ0eVxuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09ICd1bmRlZmluZWQnID8gc2VsZi54aHIucmVzcG9uc2VUZXh0IDogc2VsZi54aHIucmVzcG9uc2U7XG4gICAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgICBlcnIuc3RhdHVzID0gc2VsZi54aHIuc3RhdHVzID8gc2VsZi54aHIuc3RhdHVzIDogbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgdmFyIG5ld19lcnI7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghc2VsZi5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoKGN1c3RvbV9lcnIpIHtcbiAgICAgIG5ld19lcnIgPSBjdXN0b21fZXJyOyAvLyBvaygpIGNhbGxiYWNrIGNhbiB0aHJvd1xuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyKSB7XG4gICAgICBuZXdfZXJyLm9yaWdpbmFsID0gZXJyO1xuICAgICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICAgIG5ld19lcnIuc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICAgIHNlbGYuY2FsbGJhY2sobmV3X2VyciwgcmVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5jYWxsYmFjayhudWxsLCByZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgIGFuZCBgUmVxdWVzdEJhc2VgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuUmVxdWVzdEJhc2UoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFNldCBDb250ZW50LVR5cGUgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2FwcGxpY2F0aW9uL3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQ29udGVudC1UeXBlJywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBY2NlcHQgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQWNjZXB0JywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbcGFzc10gb3B0aW9uYWwgaW4gY2FzZSBvZiB1c2luZyAnYmVhcmVyJyBhcyB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB3aXRoICd0eXBlJyBwcm9wZXJ0eSAnYXV0bycsICdiYXNpYycgb3IgJ2JlYXJlcicgKGRlZmF1bHQgJ2Jhc2ljJylcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcywgb3B0aW9ucyl7XG4gIGlmICgxID09PSBhcmd1bWVudHMubGVuZ3RoKSBwYXNzID0gJyc7XG4gIGlmICh0eXBlb2YgcGFzcyA9PT0gJ29iamVjdCcgJiYgcGFzcyAhPT0gbnVsbCkgeyAvLyBwYXNzIGlzIG9wdGlvbmFsIGFuZCBjYW4gYmUgcmVwbGFjZWQgd2l0aCBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHBhc3M7XG4gICAgcGFzcyA9ICcnO1xuICB9XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICB0eXBlOiAnZnVuY3Rpb24nID09PSB0eXBlb2YgYnRvYSA/ICdiYXNpYycgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIHZhciBlbmNvZGVyID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBidG9hKSB7XG4gICAgICByZXR1cm4gYnRvYShzdHJpbmcpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgYmFzaWMgYXV0aCwgYnRvYSBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9O1xuXG4gIHJldHVybiB0aGlzLl9hdXRoKHVzZXIsIHBhc3MsIG9wdGlvbnMsIGVuY29kZXIpO1xufTtcblxuLyoqXG4gKiBBZGQgcXVlcnktc3RyaW5nIGB2YWxgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXG4gKiAgICAgLnF1ZXJ5KCdzaXplPTEwJylcbiAqICAgICAucXVlcnkoeyBjb2xvcjogJ2JsdWUnIH0pXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uKHZhbCl7XG4gIGlmICgnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB2YWwgPSBzZXJpYWxpemUodmFsKTtcbiAgaWYgKHZhbCkgdGhpcy5fcXVlcnkucHVzaCh2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUXVldWUgdGhlIGdpdmVuIGBmaWxlYCBhcyBhbiBhdHRhY2htZW50IHRvIHRoZSBzcGVjaWZpZWQgYGZpZWxkYCxcbiAqIHdpdGggb3B0aW9uYWwgYG9wdGlvbnNgIChvciBmaWxlbmFtZSkuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuYXR0YWNoKCdjb250ZW50JywgbmV3IEJsb2IoWyc8YSBpZD1cImFcIj48YiBpZD1cImJcIj5oZXkhPC9iPjwvYT4nXSwgeyB0eXBlOiBcInRleHQvaHRtbFwifSkpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge0Jsb2J8RmlsZX0gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24oZmllbGQsIGZpbGUsIG9wdGlvbnMpe1xuICBpZiAoZmlsZSkge1xuICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICB0aHJvdyBFcnJvcihcInN1cGVyYWdlbnQgY2FuJ3QgbWl4IC5zZW5kKCkgYW5kIC5hdHRhY2goKVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChmaWVsZCwgZmlsZSwgb3B0aW9ucyB8fCBmaWxlLm5hbWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2dldEZvcm1EYXRhID0gZnVuY3Rpb24oKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkge1xuICAgIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZm9ybURhdGE7XG59O1xuXG4vKipcbiAqIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCBgZXJyYCBhbmQgYHJlc2BcbiAqIGFuZCBoYW5kbGUgYXJpdHkgY2hlY2suXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNhbGxiYWNrID0gZnVuY3Rpb24oZXJyLCByZXMpe1xuICBpZiAodGhpcy5fc2hvdWxkUmV0cnkoZXJyLCByZXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JldHJ5KCk7XG4gIH1cblxuICB2YXIgZm4gPSB0aGlzLl9jYWxsYmFjaztcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICBpZiAoZXJyKSB7XG4gICAgaWYgKHRoaXMuX21heFJldHJpZXMpIGVyci5yZXRyaWVzID0gdGhpcy5fcmV0cmllcyAtIDE7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cblxuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdSZXF1ZXN0IGhhcyBiZWVuIHRlcm1pbmF0ZWRcXG5Qb3NzaWJsZSBjYXVzZXM6IHRoZSBuZXR3b3JrIGlzIG9mZmxpbmUsIE9yaWdpbiBpcyBub3QgYWxsb3dlZCBieSBBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4sIHRoZSBwYWdlIGlzIGJlaW5nIHVubG9hZGVkLCBldGMuJyk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG5cbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gIGVyci51cmwgPSB0aGlzLnVybDtcblxuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vLyBUaGlzIG9ubHkgd2FybnMsIGJlY2F1c2UgdGhlIHJlcXVlc3QgaXMgc3RpbGwgbGlrZWx5IHRvIHdvcmtcblJlcXVlc3QucHJvdG90eXBlLmJ1ZmZlciA9IFJlcXVlc3QucHJvdG90eXBlLmNhID0gUmVxdWVzdC5wcm90b3R5cGUuYWdlbnQgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLndhcm4oXCJUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnRcIik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gVGhpcyB0aHJvd3MsIGJlY2F1c2UgaXQgY2FuJ3Qgc2VuZC9yZWNlaXZlIGRhdGEgYXMgZXhwZWN0ZWRcblJlcXVlc3QucHJvdG90eXBlLnBpcGUgPSBSZXF1ZXN0LnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKCl7XG4gIHRocm93IEVycm9yKFwiU3RyZWFtaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnRcIik7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgaG9zdCBvYmplY3QsXG4gKiB3ZSBkb24ndCB3YW50IHRvIHNlcmlhbGl6ZSB0aGVzZSA6KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUuX2lzSG9zdCA9IGZ1bmN0aW9uIF9pc0hvc3Qob2JqKSB7XG4gIC8vIE5hdGl2ZSBvYmplY3RzIHN0cmluZ2lmeSB0byBbb2JqZWN0IEZpbGVdLCBbb2JqZWN0IEJsb2JdLCBbb2JqZWN0IEZvcm1EYXRhXSwgZXRjLlxuICByZXR1cm4gb2JqICYmICdvYmplY3QnID09PSB0eXBlb2Ygb2JqICYmICFBcnJheS5pc0FycmF5KG9iaikgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgIT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG4vKipcbiAqIEluaXRpYXRlIHJlcXVlc3QsIGludm9raW5nIGNhbGxiYWNrIGBmbihyZXMpYFxuICogd2l0aCBhbiBpbnN0YW5jZW9mIGBSZXNwb25zZWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihmbil7XG4gIGlmICh0aGlzLl9lbmRDYWxsZWQpIHtcbiAgICBjb25zb2xlLndhcm4oXCJXYXJuaW5nOiAuZW5kKCkgd2FzIGNhbGxlZCB0d2ljZS4gVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHN1cGVyYWdlbnRcIik7XG4gIH1cbiAgdGhpcy5fZW5kQ2FsbGVkID0gdHJ1ZTtcblxuICAvLyBzdG9yZSBjYWxsYmFja1xuICB0aGlzLl9jYWxsYmFjayA9IGZuIHx8IG5vb3A7XG5cbiAgLy8gcXVlcnlzdHJpbmdcbiAgdGhpcy5fZmluYWxpemVRdWVyeVN0cmluZygpO1xuXG4gIHJldHVybiB0aGlzLl9lbmQoKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9lbmQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgeGhyID0gKHRoaXMueGhyID0gcmVxdWVzdC5nZXRYSFIoKSk7XG4gIHZhciBkYXRhID0gdGhpcy5fZm9ybURhdGEgfHwgdGhpcy5fZGF0YTtcblxuICB0aGlzLl9zZXRUaW1lb3V0cygpO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcmVhZHlTdGF0ZSA9IHhoci5yZWFkeVN0YXRlO1xuICAgIGlmIChyZWFkeVN0YXRlID49IDIgJiYgc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dChzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gICAgfVxuICAgIGlmICg0ICE9IHJlYWR5U3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJbiBJRTksIHJlYWRzIHRvIGFueSBwcm9wZXJ0eSAoZS5nLiBzdGF0dXMpIG9mZiBvZiBhbiBhYm9ydGVkIFhIUiB3aWxsXG4gICAgLy8gcmVzdWx0IGluIHRoZSBlcnJvciBcIkNvdWxkIG5vdCBjb21wbGV0ZSB0aGUgb3BlcmF0aW9uIGR1ZSB0byBlcnJvciBjMDBjMDIzZlwiXG4gICAgdmFyIHN0YXR1cztcbiAgICB0cnkgeyBzdGF0dXMgPSB4aHIuc3RhdHVzIH0gY2F0Y2goZSkgeyBzdGF0dXMgPSAwOyB9XG5cbiAgICBpZiAoIXN0YXR1cykge1xuICAgICAgaWYgKHNlbGYudGltZWRvdXQgfHwgc2VsZi5fYWJvcnRlZCkgcmV0dXJuO1xuICAgICAgcmV0dXJuIHNlbGYuY3Jvc3NEb21haW5FcnJvcigpO1xuICAgIH1cbiAgICBzZWxmLmVtaXQoJ2VuZCcpO1xuICB9O1xuXG4gIC8vIHByb2dyZXNzXG4gIHZhciBoYW5kbGVQcm9ncmVzcyA9IGZ1bmN0aW9uKGRpcmVjdGlvbiwgZSkge1xuICAgIGlmIChlLnRvdGFsID4gMCkge1xuICAgICAgZS5wZXJjZW50ID0gZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwO1xuICAgIH1cbiAgICBlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICBzZWxmLmVtaXQoJ3Byb2dyZXNzJywgZSk7XG4gIH07XG4gIGlmICh0aGlzLmhhc0xpc3RlbmVycygncHJvZ3Jlc3MnKSkge1xuICAgIHRyeSB7XG4gICAgICB4aHIub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ2Rvd25sb2FkJyk7XG4gICAgICBpZiAoeGhyLnVwbG9hZCkge1xuICAgICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICd1cGxvYWQnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIC8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgIC8vIFJlcG9ydGVkIGhlcmU6XG4gICAgICAvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzgzNzI0NS94bWxodHRwcmVxdWVzdC11cGxvYWQtdGhyb3dzLWludmFsaWQtYXJndW1lbnQtd2hlbi11c2VkLWZyb20td2ViLXdvcmtlci1jb250ZXh0XG4gICAgfVxuICB9XG5cbiAgLy8gaW5pdGlhdGUgcmVxdWVzdFxuICB0cnkge1xuICAgIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSwgdGhpcy51c2VybmFtZSwgdGhpcy5wYXNzd29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBzZWUgIzExNDlcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFjayhlcnIpO1xuICB9XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICghdGhpcy5fZm9ybURhdGEgJiYgJ0dFVCcgIT0gdGhpcy5tZXRob2QgJiYgJ0hFQUQnICE9IHRoaXMubWV0aG9kICYmICdzdHJpbmcnICE9IHR5cGVvZiBkYXRhICYmICF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAvLyBzZXJpYWxpemUgc3R1ZmZcbiAgICB2YXIgY29udGVudFR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIHZhciBzZXJpYWxpemUgPSB0aGlzLl9zZXJpYWxpemVyIHx8IHJlcXVlc3Quc2VyaWFsaXplW2NvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKVswXSA6ICcnXTtcbiAgICBpZiAoIXNlcmlhbGl6ZSAmJiBpc0pTT04oY29udGVudFR5cGUpKSB7XG4gICAgICBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgIH1cbiAgICBpZiAoc2VyaWFsaXplKSBkYXRhID0gc2VyaWFsaXplKGRhdGEpO1xuICB9XG5cbiAgLy8gc2V0IGhlYWRlciBmaWVsZHNcbiAgZm9yICh2YXIgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAobnVsbCA9PSB0aGlzLmhlYWRlcltmaWVsZF0pIGNvbnRpbnVlO1xuXG4gICAgaWYgKHRoaXMuaGVhZGVyLmhhc093blByb3BlcnR5KGZpZWxkKSlcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXNwb25zZVR5cGU7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gIHhoci5zZW5kKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJyA/IGRhdGEgOiBudWxsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5yZXF1ZXN0LmFnZW50ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgQWdlbnQoKTtcbn07XG5cbltcIkdFVFwiLCBcIlBPU1RcIiwgXCJPUFRJT05TXCIsIFwiUEFUQ0hcIiwgXCJQVVRcIiwgXCJERUxFVEVcIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgQWdlbnQucHJvdG90eXBlW21ldGhvZC50b0xvd2VyQ2FzZSgpXSA9IGZ1bmN0aW9uKHVybCwgZm4pIHtcbiAgICB2YXIgcmVxID0gbmV3IHJlcXVlc3QuUmVxdWVzdChtZXRob2QsIHVybCk7XG4gICAgdGhpcy5fc2V0RGVmYXVsdHMocmVxKTtcbiAgICBpZiAoZm4pIHtcbiAgICAgIHJlcS5lbmQoZm4pO1xuICAgIH1cbiAgICByZXR1cm4gcmVxO1xuICB9O1xufSk7XG5cbkFnZW50LnByb3RvdHlwZS5kZWwgPSBBZ2VudC5wcm90b3R5cGVbJ2RlbGV0ZSddO1xuXG4vKipcbiAqIEdFVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbikge1xuICB2YXIgcmVxID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBIRUFEIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbikge1xuICB2YXIgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogT1BUSU9OUyBxdWVyeSB0byBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3Qub3B0aW9ucyA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ09QVElPTlMnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogREVMRVRFIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkZWwodXJsLCBkYXRhLCBmbikge1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59XG5cbnJlcXVlc3RbJ2RlbCddID0gZGVsO1xucmVxdWVzdFsnZGVsZXRlJ10gPSBkZWw7XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucGF0Y2ggPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQQVRDSCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQT1NUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBvc3QgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQT1NUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wdXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQVVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG51bGwgIT09IG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgb2YgbWl4ZWQtaW4gZnVuY3Rpb25zIHNoYXJlZCBiZXR3ZWVuIG5vZGUgYW5kIGNsaWVudCBjb2RlXG4gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXF1ZXN0QmFzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0QmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0QmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0QmFzZShvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gUmVxdWVzdEJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXF1ZXN0QmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbiBfY2xlYXJUaW1lb3V0KCl7XG4gIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gIGNsZWFyVGltZW91dCh0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gIGRlbGV0ZSB0aGlzLl90aW1lcjtcbiAgZGVsZXRlIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCByZXNwb25zZSBib2R5IHBhcnNlclxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBpbmNvbWluZyBkYXRhIGludG8gcmVxdWVzdC5ib2R5XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UoZm4pe1xuICB0aGlzLl9wYXJzZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBmb3JtYXQgb2YgYmluYXJ5IHJlc3BvbnNlIGJvZHkuXG4gKiBJbiBicm93c2VyIHZhbGlkIGZvcm1hdHMgYXJlICdibG9iJyBhbmQgJ2FycmF5YnVmZmVyJyxcbiAqIHdoaWNoIHJldHVybiBCbG9iIGFuZCBBcnJheUJ1ZmZlciwgcmVzcGVjdGl2ZWx5LlxuICpcbiAqIEluIE5vZGUgYWxsIHZhbHVlcyByZXN1bHQgaW4gQnVmZmVyLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnJlc3BvbnNlVHlwZSgnYmxvYicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZXNwb25zZVR5cGUgPSBmdW5jdGlvbih2YWwpe1xuICB0aGlzLl9yZXNwb25zZVR5cGUgPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlcXVlc3QgYm9keSBzZXJpYWxpemVyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGRhdGEgc2V0IHZpYSAuc2VuZCBvciAuYXR0YWNoIGludG8gcGF5bG9hZCB0byBzZW5kXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIHNlcmlhbGl6ZShmbil7XG4gIHRoaXMuX3NlcmlhbGl6ZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aW1lb3V0cy5cbiAqXG4gKiAtIHJlc3BvbnNlIHRpbWVvdXQgaXMgdGltZSBiZXR3ZWVuIHNlbmRpbmcgcmVxdWVzdCBhbmQgcmVjZWl2aW5nIHRoZSBmaXJzdCBieXRlIG9mIHRoZSByZXNwb25zZS4gSW5jbHVkZXMgRE5TIGFuZCBjb25uZWN0aW9uIHRpbWUuXG4gKiAtIGRlYWRsaW5lIGlzIHRoZSB0aW1lIGZyb20gc3RhcnQgb2YgdGhlIHJlcXVlc3QgdG8gcmVjZWl2aW5nIHJlc3BvbnNlIGJvZHkgaW4gZnVsbC4gSWYgdGhlIGRlYWRsaW5lIGlzIHRvbyBzaG9ydCBsYXJnZSBmaWxlcyBtYXkgbm90IGxvYWQgYXQgYWxsIG9uIHNsb3cgY29ubmVjdGlvbnMuXG4gKlxuICogVmFsdWUgb2YgMCBvciBmYWxzZSBtZWFucyBubyB0aW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gbXMgb3Ige3Jlc3BvbnNlLCBkZWFkbGluZX1cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uIHRpbWVvdXQob3B0aW9ucyl7XG4gIGlmICghb3B0aW9ucyB8fCAnb2JqZWN0JyAhPT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucztcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9yKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIHN3aXRjaChvcHRpb24pIHtcbiAgICAgIGNhc2UgJ2RlYWRsaW5lJzpcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IG9wdGlvbnMuZGVhZGxpbmU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVzcG9uc2UnOlxuICAgICAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSBvcHRpb25zLnJlc3BvbnNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVua25vd24gdGltZW91dCBvcHRpb25cIiwgb3B0aW9uKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBudW1iZXIgb2YgcmV0cnkgYXR0ZW1wdHMgb24gZXJyb3IuXG4gKlxuICogRmFpbGVkIHJlcXVlc3RzIHdpbGwgYmUgcmV0cmllZCAnY291bnQnIHRpbWVzIGlmIHRpbWVvdXQgb3IgZXJyLmNvZGUgPj0gNTAwLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZXRyeSA9IGZ1bmN0aW9uIHJldHJ5KGNvdW50LCBmbil7XG4gIC8vIERlZmF1bHQgdG8gMSBpZiBubyBjb3VudCBwYXNzZWQgb3IgdHJ1ZVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBjb3VudCA9PT0gdHJ1ZSkgY291bnQgPSAxO1xuICBpZiAoY291bnQgPD0gMCkgY291bnQgPSAwO1xuICB0aGlzLl9tYXhSZXRyaWVzID0gY291bnQ7XG4gIHRoaXMuX3JldHJpZXMgPSAwO1xuICB0aGlzLl9yZXRyeUNhbGxiYWNrID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxudmFyIEVSUk9SX0NPREVTID0gW1xuICAnRUNPTk5SRVNFVCcsXG4gICdFVElNRURPVVQnLFxuICAnRUFERFJJTkZPJyxcbiAgJ0VTT0NLRVRUSU1FRE9VVCdcbl07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgcmVxdWVzdCBzaG91bGQgYmUgcmV0cmllZC5cbiAqIChCb3Jyb3dlZCBmcm9tIHNlZ21lbnRpby9zdXBlcmFnZW50LXJldHJ5KVxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc11cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3Nob3VsZFJldHJ5ID0gZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgaWYgKCF0aGlzLl9tYXhSZXRyaWVzIHx8IHRoaXMuX3JldHJpZXMrKyA+PSB0aGlzLl9tYXhSZXRyaWVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0aGlzLl9yZXRyeUNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBvdmVycmlkZSA9IHRoaXMuX3JldHJ5Q2FsbGJhY2soZXJyLCByZXMpO1xuICAgICAgaWYgKG92ZXJyaWRlID09PSB0cnVlKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChvdmVycmlkZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIHVuZGVmaW5lZCBmYWxscyBiYWNrIHRvIGRlZmF1bHRzXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgfVxuICBpZiAocmVzICYmIHJlcy5zdGF0dXMgJiYgcmVzLnN0YXR1cyA+PSA1MDAgJiYgcmVzLnN0YXR1cyAhPSA1MDEpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyKSB7XG4gICAgaWYgKGVyci5jb2RlICYmIH5FUlJPUl9DT0RFUy5pbmRleE9mKGVyci5jb2RlKSkgcmV0dXJuIHRydWU7XG4gICAgLy8gU3VwZXJhZ2VudCB0aW1lb3V0XG4gICAgaWYgKGVyci50aW1lb3V0ICYmIGVyci5jb2RlID09ICdFQ09OTkFCT1JURUQnKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoZXJyLmNyb3NzRG9tYWluKSByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJldHJ5IHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fcmV0cnkgPSBmdW5jdGlvbigpIHtcblxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIC8vIG5vZGVcbiAgaWYgKHRoaXMucmVxKSB7XG4gICAgdGhpcy5yZXEgPSBudWxsO1xuICAgIHRoaXMucmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIH1cblxuICB0aGlzLl9hYm9ydGVkID0gZmFsc2U7XG4gIHRoaXMudGltZWRvdXQgPSBmYWxzZTtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG4vKipcbiAqIFByb21pc2Ugc3VwcG9ydFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZWplY3RdXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gdGhlbihyZXNvbHZlLCByZWplY3QpIHtcbiAgaWYgKCF0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJXYXJuaW5nOiBzdXBlcmFnZW50IHJlcXVlc3Qgd2FzIHNlbnQgdHdpY2UsIGJlY2F1c2UgYm90aCAuZW5kKCkgYW5kIC50aGVuKCkgd2VyZSBjYWxsZWQuIE5ldmVyIGNhbGwgLmVuZCgpIGlmIHlvdSB1c2UgcHJvbWlzZXNcIik7XG4gICAgfVxuICAgIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24oaW5uZXJSZXNvbHZlLCBpbm5lclJlamVjdCkge1xuICAgICAgc2VsZi5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgICAgaWYgKGVycikgaW5uZXJSZWplY3QoZXJyKTtcbiAgICAgICAgZWxzZSBpbm5lclJlc29sdmUocmVzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbihjYikge1xuICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgY2IpO1xufTtcblxuLyoqXG4gKiBBbGxvdyBmb3IgZXh0ZW5zaW9uXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmbikge1xuICBmbih0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUub2sgPSBmdW5jdGlvbihjYikge1xuICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNiKSB0aHJvdyBFcnJvcihcIkNhbGxiYWNrIHJlcXVpcmVkXCIpO1xuICB0aGlzLl9va0NhbGxiYWNrID0gY2I7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9pc1Jlc3BvbnNlT0sgPSBmdW5jdGlvbihyZXMpIHtcbiAgaWYgKCFyZXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodGhpcy5fb2tDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9va0NhbGxiYWNrKHJlcyk7XG4gIH1cblxuICByZXR1cm4gcmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMDtcbn07XG5cbi8qKlxuICogR2V0IHJlcXVlc3QgaGVhZGVyIGBmaWVsZGAuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICByZXR1cm4gdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBoZWFkZXIgYGZpZWxkYCB2YWx1ZS5cbiAqIFRoaXMgaXMgYSBkZXByZWNhdGVkIGludGVybmFsIEFQSS4gVXNlIGAuZ2V0KGZpZWxkKWAgaW5zdGVhZC5cbiAqXG4gKiAoZ2V0SGVhZGVyIGlzIG5vIGxvbmdlciB1c2VkIGludGVybmFsbHkgYnkgdGhlIHN1cGVyYWdlbnQgY29kZSBiYXNlKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKiBAZGVwcmVjYXRlZFxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXRIZWFkZXIgPSBSZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgYGZpZWxkYCB0byBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLnNldCgnWC1BUEktS2V5JywgJ2Zvb2JhcicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KHsgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsICdYLUFQSS1LZXknOiAnZm9vYmFyJyB9KVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZmllbGRcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oZmllbGQsIHZhbCl7XG4gIGlmIChpc09iamVjdChmaWVsZCkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZmllbGQpIHtcbiAgICAgIHRoaXMuc2V0KGtleSwgZmllbGRba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXSA9IHZhbDtcbiAgdGhpcy5oZWFkZXJbZmllbGRdID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICBkZWxldGUgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xuICBkZWxldGUgdGhpcy5oZWFkZXJbZmllbGRdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIGZpZWxkIGBuYW1lYCBhbmQgYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3RcbiAqIGZvciBcIm11bHRpcGFydC9mb3JtLWRhdGFcIiByZXF1ZXN0IGJvZGllcy5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCgnZm9vJywgJ2JhcicpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCh7IGZvbzogJ2JhcicsIGJhejogJ3F1eCcgfSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfEJsb2J8RmlsZXxCdWZmZXJ8ZnMuUmVhZFN0cmVhbX0gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbCkge1xuICAvLyBuYW1lIHNob3VsZCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gb2JqZWN0LlxuICBpZiAobnVsbCA9PT0gbmFtZSB8fCB1bmRlZmluZWQgPT09IG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIG5hbWUgY2FuIG5vdCBiZSBlbXB0eScpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiLmZpZWxkKCkgY2FuJ3QgYmUgdXNlZCBpZiAuc2VuZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIik7XG4gIH1cblxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgdGhpcy5maWVsZChrZXksIG5hbWVba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIGZvciAodmFyIGkgaW4gdmFsKSB7XG4gICAgICB0aGlzLmZpZWxkKG5hbWUsIHZhbFtpXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gdmFsIHNob3VsZCBiZSBkZWZpbmVkIG5vd1xuICBpZiAobnVsbCA9PT0gdmFsIHx8IHVuZGVmaW5lZCA9PT0gdmFsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSB2YWwgY2FuIG5vdCBiZSBlbXB0eScpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT09IHR5cGVvZiB2YWwpIHtcbiAgICB2YWwgPSAnJyArIHZhbDtcbiAgfVxuICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChuYW1lLCB2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWJvcnQgdGhlIHJlcXVlc3QsIGFuZCBjbGVhciBwb3RlbnRpYWwgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9hYm9ydGVkID0gdHJ1ZTtcbiAgdGhpcy54aHIgJiYgdGhpcy54aHIuYWJvcnQoKTsgLy8gYnJvd3NlclxuICB0aGlzLnJlcSAmJiB0aGlzLnJlcS5hYm9ydCgpOyAvLyBub2RlXG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIHRoaXMuZW1pdCgnYWJvcnQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2F1dGggPSBmdW5jdGlvbih1c2VyLCBwYXNzLCBvcHRpb25zLCBiYXNlNjRFbmNvZGVyKSB7XG4gIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJhc2U2NEVuY29kZXIodXNlciArICc6JyArIHBhc3MpKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYXV0byc6XG4gICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcjtcbiAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdiZWFyZXInOiAvLyB1c2FnZSB3b3VsZCBiZSAuYXV0aChhY2Nlc3NUb2tlbiwgeyB0eXBlOiAnYmVhcmVyJyB9KVxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB1c2VyKTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdHJhbnNtaXNzaW9uIG9mIGNvb2tpZXMgd2l0aCB4LWRvbWFpbiByZXF1ZXN0cy5cbiAqXG4gKiBOb3RlIHRoYXQgZm9yIHRoaXMgdG8gd29yayB0aGUgb3JpZ2luIG11c3Qgbm90IGJlXG4gKiB1c2luZyBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiIHdpdGggYSB3aWxkY2FyZCxcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxuICogdG8gXCJ0cnVlXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUud2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24ob24pIHtcbiAgLy8gVGhpcyBpcyBicm93c2VyLW9ubHkgZnVuY3Rpb25hbGl0eS4gTm9kZSBzaWRlIGlzIG5vLW9wLlxuICBpZiAob24gPT0gdW5kZWZpbmVkKSBvbiA9IHRydWU7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IG9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXggcmVkaXJlY3RzIHRvIGBuYC4gRG9lcyBub3RpbmcgaW4gYnJvd3NlciBYSFIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVkaXJlY3RzID0gZnVuY3Rpb24obil7XG4gIHRoaXMuX21heFJlZGlyZWN0cyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNYXhpbXVtIHNpemUgb2YgYnVmZmVyZWQgcmVzcG9uc2UgYm9keSwgaW4gYnl0ZXMuIENvdW50cyB1bmNvbXByZXNzZWQgc2l6ZS5cbiAqIERlZmF1bHQgMjAwTUIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUubWF4UmVzcG9uc2VTaXplID0gZnVuY3Rpb24obil7XG4gIGlmICgnbnVtYmVyJyAhPT0gdHlwZW9mIG4pIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50XCIpO1xuICB9XG4gIHRoaXMuX21heFJlc3BvbnNlU2l6ZSA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGEgcGxhaW4gamF2YXNjcmlwdCBvYmplY3QgKG5vdCBKU09OIHN0cmluZykgb2Ygc2NhbGFyIHByb3BlcnRpZXMuXG4gKiBOb3RlIGFzIHRoaXMgbWV0aG9kIGlzIGRlc2lnbmVkIHRvIHJldHVybiBhIHVzZWZ1bCBub24tdGhpcyB2YWx1ZSxcbiAqIGl0IGNhbm5vdCBiZSBjaGFpbmVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVzY3JpYmluZyBtZXRob2QsIHVybCwgYW5kIGRhdGEgb2YgdGhpcyByZXF1ZXN0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxuICAgIHVybDogdGhpcy51cmwsXG4gICAgZGF0YTogdGhpcy5fZGF0YSxcbiAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXIsXG4gIH07XG59O1xuXG4vKipcbiAqIFNlbmQgYGRhdGFgIGFzIHRoZSByZXF1ZXN0IGJvZHksIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifScpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoJ25hbWU9dGonKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0cyB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gKiAgICAgICAgLnNlbmQoJ3NwZWNpZXM9ZmVycmV0JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSl7XG4gIHZhciBpc09iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgaWYgKHRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcihcIi5zZW5kKCkgY2FuJ3QgYmUgdXNlZCBpZiAuYXR0YWNoKCkgb3IgLmZpZWxkKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iaiAmJiAhdGhpcy5fZGF0YSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIGlmICghdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuICB9IGVsc2UgaWYgKGRhdGEgJiYgdGhpcy5fZGF0YSAmJiB0aGlzLl9pc0hvc3QodGhpcy5fZGF0YSkpIHtcbiAgICB0aHJvdyBFcnJvcihcIkNhbid0IG1lcmdlIHRoZXNlIHNlbmQgY2FsbHNcIik7XG4gIH1cblxuICAvLyBtZXJnZVxuICBpZiAoaXNPYmogJiYgaXNPYmplY3QodGhpcy5fZGF0YSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZGF0YSkge1xuICAgIC8vIGRlZmF1bHQgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2Zvcm0nKTtcbiAgICB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBpZiAoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgPT0gdHlwZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGFcbiAgICAgICAgPyB0aGlzLl9kYXRhICsgJyYnICsgZGF0YVxuICAgICAgICA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghaXNPYmogfHwgdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBkZWZhdWx0IHRvIGpzb25cbiAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2pzb24nKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNvcnQgYHF1ZXJ5c3RyaW5nYCBieSB0aGUgc29ydCBmdW5jdGlvblxuICpcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0IG9yZGVyXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeSgpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gY3VzdG9taXplZCBzb3J0IGZ1bmN0aW9uXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeShmdW5jdGlvbihhLCBiKXtcbiAqICAgICAgICAgICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAqICAgICAgICAgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc29ydFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zb3J0UXVlcnkgPSBmdW5jdGlvbihzb3J0KSB7XG4gIC8vIF9zb3J0IGRlZmF1bHQgdG8gdHJ1ZSBidXQgb3RoZXJ3aXNlIGNhbiBiZSBhIGZ1bmN0aW9uIG9yIGJvb2xlYW5cbiAgdGhpcy5fc29ydCA9IHR5cGVvZiBzb3J0ID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBzb3J0O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29tcG9zZSBxdWVyeXN0cmluZyB0byBhcHBlbmQgdG8gcmVxLnVybFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2ZpbmFsaXplUXVlcnlTdHJpbmcgPSBmdW5jdGlvbigpe1xuICB2YXIgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JykgKyBxdWVyeTtcbiAgfVxuICB0aGlzLl9xdWVyeS5sZW5ndGggPSAwOyAvLyBNYWtlcyB0aGUgY2FsbCBpZGVtcG90ZW50XG5cbiAgaWYgKHRoaXMuX3NvcnQpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnVybC5pbmRleE9mKCc/Jyk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHZhciBxdWVyeUFyciA9IHRoaXMudXJsLnN1YnN0cmluZyhpbmRleCArIDEpLnNwbGl0KCcmJyk7XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHRoaXMuX3NvcnQpIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCh0aGlzLl9zb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gdGhpcy51cmwuc3Vic3RyaW5nKDAsIGluZGV4KSArICc/JyArIHF1ZXJ5QXJyLmpvaW4oJyYnKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEZvciBiYWNrd2FyZHMgY29tcGF0IG9ubHlcblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fYXBwZW5kUXVlcnlTdHJpbmcgPSBmdW5jdGlvbigpIHtjb25zb2xlLnRyYWNlKFwiVW5zdXBwb3J0ZWRcIik7fVxuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl90aW1lb3V0RXJyb3IgPSBmdW5jdGlvbihyZWFzb24sIHRpbWVvdXQsIGVycm5vKXtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGVyciA9IG5ldyBFcnJvcihyZWFzb24gKyB0aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgZXJyLmNvZGUgPSAnRUNPTk5BQk9SVEVEJztcbiAgZXJyLmVycm5vID0gZXJybm87XG4gIHRoaXMudGltZWRvdXQgPSB0cnVlO1xuICB0aGlzLmFib3J0KCk7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fc2V0VGltZW91dHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIGRlYWRsaW5lXG4gIGlmICh0aGlzLl90aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdUaW1lb3V0IG9mICcsIHNlbGYuX3RpbWVvdXQsICdFVElNRScpO1xuICAgIH0sIHRoaXMuX3RpbWVvdXQpO1xuICB9XG4gIC8vIHJlc3BvbnNlIHRpbWVvdXRcbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVGltZW91dCAmJiAhdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignUmVzcG9uc2UgdGltZW91dCBvZiAnLCBzZWxmLl9yZXNwb25zZVRpbWVvdXQsICdFVElNRURPVVQnKTtcbiAgICB9LCB0aGlzLl9yZXNwb25zZVRpbWVvdXQpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNlQmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZUJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2VCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXNwb25zZUJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXNwb25zZUJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRIZWFkZXJQcm9wZXJ0aWVzID0gZnVuY3Rpb24oaGVhZGVyKXtcbiAgICAvLyBUT0RPOiBtb2FyIVxuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBhIHV0aWxcblxuICAgIC8vIGNvbnRlbnQtdHlwZVxuICAgIHZhciBjdCA9IGhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gICAgdGhpcy50eXBlID0gdXRpbHMudHlwZShjdCk7XG5cbiAgICAvLyBwYXJhbXNcbiAgICB2YXIgcGFyYW1zID0gdXRpbHMucGFyYW1zKGN0KTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcblxuICAgIHRoaXMubGlua3MgPSB7fTtcblxuICAgIC8vIGxpbmtzXG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGhlYWRlci5saW5rKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmtzID0gdXRpbHMucGFyc2VMaW5rcyhoZWFkZXIubGluayk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gaWdub3JlXG4gICAgfVxufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRTdGF0dXNQcm9wZXJ0aWVzID0gZnVuY3Rpb24oc3RhdHVzKXtcbiAgICB2YXIgdHlwZSA9IHN0YXR1cyAvIDEwMCB8IDA7XG5cbiAgICAvLyBzdGF0dXMgLyBjbGFzc1xuICAgIHRoaXMuc3RhdHVzID0gdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xuICAgIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgICAvLyBiYXNpY3NcbiAgICB0aGlzLmluZm8gPSAxID09IHR5cGU7XG4gICAgdGhpcy5vayA9IDIgPT0gdHlwZTtcbiAgICB0aGlzLnJlZGlyZWN0ID0gMyA9PSB0eXBlO1xuICAgIHRoaXMuY2xpZW50RXJyb3IgPSA0ID09IHR5cGU7XG4gICAgdGhpcy5zZXJ2ZXJFcnJvciA9IDUgPT0gdHlwZTtcbiAgICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgICAgID8gdGhpcy50b0Vycm9yKClcbiAgICAgICAgOiBmYWxzZTtcblxuICAgIC8vIHN1Z2FyXG4gICAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub0NvbnRlbnQgPSAyMDQgPT0gc3RhdHVzO1xuICAgIHRoaXMuYmFkUmVxdWVzdCA9IDQwMCA9PSBzdGF0dXM7XG4gICAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90QWNjZXB0YWJsZSA9IDQwNiA9PSBzdGF0dXM7XG4gICAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90Rm91bmQgPSA0MDQgPT0gc3RhdHVzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG1pbWUgdHlwZSBmb3IgdGhlIGdpdmVuIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMudHlwZSA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykuc2hpZnQoKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGhlYWRlciBmaWVsZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyYW1zID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICo7ICovKS5yZWR1Y2UoZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo9ICovKTtcbiAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKTtcbiAgICB2YXIgdmFsID0gcGFydHMuc2hpZnQoKTtcblxuICAgIGlmIChrZXkgJiYgdmFsKSBvYmpba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59O1xuXG4vKipcbiAqIFBhcnNlIExpbmsgaGVhZGVyIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcnNlTGlua3MgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKiwgKi8pLnJlZHVjZShmdW5jdGlvbihvYmosIHN0cil7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKjsgKi8pO1xuICAgIHZhciB1cmwgPSBwYXJ0c1swXS5zbGljZSgxLCAtMSk7XG4gICAgdmFyIHJlbCA9IHBhcnRzWzFdLnNwbGl0KC8gKj0gKi8pWzFdLnNsaWNlKDEsIC0xKTtcbiAgICBvYmpbcmVsXSA9IHVybDtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59O1xuXG4vKipcbiAqIFN0cmlwIGNvbnRlbnQgcmVsYXRlZCBmaWVsZHMgZnJvbSBgaGVhZGVyYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5jbGVhbkhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlciwgc2hvdWxkU3RyaXBDb29raWUpe1xuICBkZWxldGUgaGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC1sZW5ndGgnXTtcbiAgZGVsZXRlIGhlYWRlclsndHJhbnNmZXItZW5jb2RpbmcnXTtcbiAgZGVsZXRlIGhlYWRlclsnaG9zdCddO1xuICBpZiAoc2hvdWxkU3RyaXBDb29raWUpIHtcbiAgICBkZWxldGUgaGVhZGVyWydjb29raWUnXTtcbiAgfVxuICByZXR1cm4gaGVhZGVyO1xufTtcbiIsInZhciBWdWUgLy8gbGF0ZSBiaW5kXG52YXIgdmVyc2lvblxudmFyIG1hcCA9ICh3aW5kb3cuX19WVUVfSE9UX01BUF9fID0gT2JqZWN0LmNyZWF0ZShudWxsKSlcbnZhciBpbnN0YWxsZWQgPSBmYWxzZVxudmFyIGlzQnJvd3NlcmlmeSA9IGZhbHNlXG52YXIgaW5pdEhvb2tOYW1lID0gJ2JlZm9yZUNyZWF0ZSdcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKHZ1ZSwgYnJvd3NlcmlmeSkge1xuICBpZiAoaW5zdGFsbGVkKSB7IHJldHVybiB9XG4gIGluc3RhbGxlZCA9IHRydWVcblxuICBWdWUgPSB2dWUuX19lc01vZHVsZSA/IHZ1ZS5kZWZhdWx0IDogdnVlXG4gIHZlcnNpb24gPSBWdWUudmVyc2lvbi5zcGxpdCgnLicpLm1hcChOdW1iZXIpXG4gIGlzQnJvd3NlcmlmeSA9IGJyb3dzZXJpZnlcblxuICAvLyBjb21wYXQgd2l0aCA8IDIuMC4wLWFscGhhLjdcbiAgaWYgKFZ1ZS5jb25maWcuX2xpZmVjeWNsZUhvb2tzLmluZGV4T2YoJ2luaXQnKSA+IC0xKSB7XG4gICAgaW5pdEhvb2tOYW1lID0gJ2luaXQnXG4gIH1cblxuICBleHBvcnRzLmNvbXBhdGlibGUgPSB2ZXJzaW9uWzBdID49IDJcbiAgaWYgKCFleHBvcnRzLmNvbXBhdGlibGUpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnW0hNUl0gWW91IGFyZSB1c2luZyBhIHZlcnNpb24gb2YgdnVlLWhvdC1yZWxvYWQtYXBpIHRoYXQgaXMgJyArXG4gICAgICAgICdvbmx5IGNvbXBhdGlibGUgd2l0aCBWdWUuanMgY29yZSBeMi4wLjAuJ1xuICAgIClcbiAgICByZXR1cm5cbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHJlY29yZCBmb3IgYSBob3QgbW9kdWxlLCB3aGljaCBrZWVwcyB0cmFjayBvZiBpdHMgY29uc3RydWN0b3JcbiAqIGFuZCBpbnN0YW5jZXNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cblxuZXhwb3J0cy5jcmVhdGVSZWNvcmQgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcbiAgdmFyIEN0b3IgPSBudWxsXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIEN0b3IgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IEN0b3Iub3B0aW9uc1xuICB9XG4gIG1ha2VPcHRpb25zSG90KGlkLCBvcHRpb25zKVxuICBtYXBbaWRdID0ge1xuICAgIEN0b3I6IEN0b3IsXG4gICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICBpbnN0YW5jZXM6IFtdXG4gIH1cbn1cblxuLyoqXG4gKiBNYWtlIGEgQ29tcG9uZW50IG9wdGlvbnMgb2JqZWN0IGhvdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cblxuZnVuY3Rpb24gbWFrZU9wdGlvbnNIb3QoaWQsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMuZnVuY3Rpb25hbCkge1xuICAgIHZhciByZW5kZXIgPSBvcHRpb25zLnJlbmRlclxuICAgIG9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gKGgsIGN0eCkge1xuICAgICAgdmFyIGluc3RhbmNlcyA9IG1hcFtpZF0uaW5zdGFuY2VzXG4gICAgICBpZiAoaW5zdGFuY2VzLmluZGV4T2YoY3R4LnBhcmVudCkgPCAwKSB7XG4gICAgICAgIGluc3RhbmNlcy5wdXNoKGN0eC5wYXJlbnQpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyKGgsIGN0eClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaW5qZWN0SG9vayhvcHRpb25zLCBpbml0SG9va05hbWUsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlY29yZCA9IG1hcFtpZF1cbiAgICAgIGlmICghcmVjb3JkLkN0b3IpIHtcbiAgICAgICAgcmVjb3JkLkN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yXG4gICAgICB9XG4gICAgICByZWNvcmQuaW5zdGFuY2VzLnB1c2godGhpcylcbiAgICB9KVxuICAgIGluamVjdEhvb2sob3B0aW9ucywgJ2JlZm9yZURlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpbnN0YW5jZXMgPSBtYXBbaWRdLmluc3RhbmNlc1xuICAgICAgaW5zdGFuY2VzLnNwbGljZShpbnN0YW5jZXMuaW5kZXhPZih0aGlzKSwgMSlcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogSW5qZWN0IGEgaG9vayB0byBhIGhvdCByZWxvYWRhYmxlIGNvbXBvbmVudCBzbyB0aGF0XG4gKiB3ZSBjYW4ga2VlcCB0cmFjayBvZiBpdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhvb2tcbiAqL1xuXG5mdW5jdGlvbiBpbmplY3RIb29rKG9wdGlvbnMsIG5hbWUsIGhvb2spIHtcbiAgdmFyIGV4aXN0aW5nID0gb3B0aW9uc1tuYW1lXVxuICBvcHRpb25zW25hbWVdID0gZXhpc3RpbmdcbiAgICA/IEFycmF5LmlzQXJyYXkoZXhpc3RpbmcpID8gZXhpc3RpbmcuY29uY2F0KGhvb2spIDogW2V4aXN0aW5nLCBob29rXVxuICAgIDogW2hvb2tdXG59XG5cbmZ1bmN0aW9uIHRyeVdyYXAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpZCwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGZuKGlkLCBhcmcpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcgZHVyaW5nIFZ1ZSBjb21wb25lbnQgaG90LXJlbG9hZC4gRnVsbCByZWxvYWQgcmVxdWlyZWQuJ1xuICAgICAgKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVPcHRpb25zIChvbGRPcHRpb25zLCBuZXdPcHRpb25zKSB7XG4gIGZvciAodmFyIGtleSBpbiBvbGRPcHRpb25zKSB7XG4gICAgaWYgKCEoa2V5IGluIG5ld09wdGlvbnMpKSB7XG4gICAgICBkZWxldGUgb2xkT3B0aW9uc1trZXldXG4gICAgfVxuICB9XG4gIGZvciAodmFyIGtleSQxIGluIG5ld09wdGlvbnMpIHtcbiAgICBvbGRPcHRpb25zW2tleSQxXSA9IG5ld09wdGlvbnNba2V5JDFdXG4gIH1cbn1cblxuZXhwb3J0cy5yZXJlbmRlciA9IHRyeVdyYXAoZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7XG4gIHZhciByZWNvcmQgPSBtYXBbaWRdXG4gIGlmICghb3B0aW9ucykge1xuICAgIHJlY29yZC5pbnN0YW5jZXMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgaW5zdGFuY2UuJGZvcmNlVXBkYXRlKClcbiAgICB9KVxuICAgIHJldHVyblxuICB9XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnNcbiAgfVxuICBpZiAocmVjb3JkLkN0b3IpIHtcbiAgICByZWNvcmQuQ3Rvci5vcHRpb25zLnJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgcmVjb3JkLkN0b3Iub3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSBvcHRpb25zLnN0YXRpY1JlbmRlckZuc1xuICAgIHJlY29yZC5pbnN0YW5jZXMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgaW5zdGFuY2UuJG9wdGlvbnMucmVuZGVyID0gb3B0aW9ucy5yZW5kZXJcbiAgICAgIGluc3RhbmNlLiRvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zXG4gICAgICAvLyByZXNldCBzdGF0aWMgdHJlZXNcbiAgICAgIGlmIChpbnN0YW5jZS5fc3RhdGljVHJlZXMpIHtcbiAgICAgICAgLy8gcHJlIDIuNSBzdGF0aWNUcmVlcyBhcmUgY2FjaGVkIHBlci1pbnN0YW5jZVxuICAgICAgICBpbnN0YW5jZS5fc3RhdGljVHJlZXMgPSBbXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcG9zdCAyLjUgc3RhdGljVHJlZXMgYXJlIGNhY2hlZCBvbiBzaGFyZWQgb3B0aW9uc1xuICAgICAgICByZWNvcmQuQ3Rvci5vcHRpb25zLl9zdGF0aWNUcmVlcyA9IFtdXG4gICAgICB9XG4gICAgICBpbnN0YW5jZS4kZm9yY2VVcGRhdGUoKVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgLy8gZnVuY3Rpb25hbCBvciBubyBpbnN0YW5jZSBjcmVhdGVkIHlldFxuICAgIHJlY29yZC5vcHRpb25zLnJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgcmVjb3JkLm9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnNcblxuICAgIC8vIGhhbmRsZSBmdW5jdGlvbmFsIGNvbXBvbmVudCByZS1yZW5kZXJcbiAgICBpZiAocmVjb3JkLm9wdGlvbnMuZnVuY3Rpb25hbCkge1xuICAgICAgLy8gcmVyZW5kZXIgd2l0aCBmdWxsIG9wdGlvbnNcbiAgICAgIGlmIChPYmplY3Qua2V5cyhvcHRpb25zKS5sZW5ndGggPiAyKSB7XG4gICAgICAgIHVwZGF0ZU9wdGlvbnMocmVjb3JkLm9wdGlvbnMsIG9wdGlvbnMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0ZW1wbGF0ZS1vbmx5IHJlcmVuZGVyLlxuICAgICAgICAvLyBuZWVkIHRvIGluamVjdCB0aGUgc3R5bGUgaW5qZWN0aW9uIGNvZGUgZm9yIENTUyBtb2R1bGVzXG4gICAgICAgIC8vIHRvIHdvcmsgcHJvcGVybHkuXG4gICAgICAgIHZhciBpbmplY3RTdHlsZXMgPSByZWNvcmQub3B0aW9ucy5faW5qZWN0U3R5bGVzXG4gICAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgICB2YXIgcmVuZGVyID0gb3B0aW9ucy5yZW5kZXJcbiAgICAgICAgICByZWNvcmQub3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiAoaCwgY3R4KSB7XG4gICAgICAgICAgICBpbmplY3RTdHlsZXMuY2FsbChjdHgpXG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyKGgsIGN0eClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlY29yZC5vcHRpb25zLl9DdG9yID0gbnVsbFxuICAgICAgcmVjb3JkLm9wdGlvbnMuX3N0YXRpY1RyZWVzID0gW11cbiAgICAgIHJlY29yZC5pbnN0YW5jZXMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBpbnN0YW5jZS4kZm9yY2VVcGRhdGUoKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pXG5cbmV4cG9ydHMucmVsb2FkID0gdHJ5V3JhcChmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcbiAgdmFyIHJlY29yZCA9IG1hcFtpZF1cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnNcbiAgICB9XG4gICAgbWFrZU9wdGlvbnNIb3QoaWQsIG9wdGlvbnMpXG4gICAgaWYgKHJlY29yZC5DdG9yKSB7XG4gICAgICBpZiAodmVyc2lvblsxXSA8IDIpIHtcbiAgICAgICAgLy8gcHJlc2VydmUgcHJlIDIuMiBiZWhhdmlvciBmb3IgZ2xvYmFsIG1peGluIGhhbmRsaW5nXG4gICAgICAgIHJlY29yZC5DdG9yLmV4dGVuZE9wdGlvbnMgPSBvcHRpb25zXG4gICAgICB9XG4gICAgICB2YXIgbmV3Q3RvciA9IHJlY29yZC5DdG9yLnN1cGVyLmV4dGVuZChvcHRpb25zKVxuICAgICAgcmVjb3JkLkN0b3Iub3B0aW9ucyA9IG5ld0N0b3Iub3B0aW9uc1xuICAgICAgcmVjb3JkLkN0b3IuY2lkID0gbmV3Q3Rvci5jaWRcbiAgICAgIHJlY29yZC5DdG9yLnByb3RvdHlwZSA9IG5ld0N0b3IucHJvdG90eXBlXG4gICAgICBpZiAobmV3Q3Rvci5yZWxlYXNlKSB7XG4gICAgICAgIC8vIHRlbXBvcmFyeSBnbG9iYWwgbWl4aW4gc3RyYXRlZ3kgdXNlZCBpbiA8IDIuMC4wLWFscGhhLjZcbiAgICAgICAgbmV3Q3Rvci5yZWxlYXNlKClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlT3B0aW9ucyhyZWNvcmQub3B0aW9ucywgb3B0aW9ucylcbiAgICB9XG4gIH1cbiAgcmVjb3JkLmluc3RhbmNlcy5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlLiR2bm9kZSAmJiBpbnN0YW5jZS4kdm5vZGUuY29udGV4dCkge1xuICAgICAgaW5zdGFuY2UuJHZub2RlLmNvbnRleHQuJGZvcmNlVXBkYXRlKClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnUm9vdCBvciBtYW51YWxseSBtb3VudGVkIGluc3RhbmNlIG1vZGlmaWVkLiBGdWxsIHJlbG9hZCByZXF1aXJlZC4nXG4gICAgICApXG4gICAgfVxuICB9KVxufSlcbiIsIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuVnVlU2VsZWN0PWUoKTp0LlZ1ZVNlbGVjdD1lKCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17ZXhwb3J0czp7fSxpZDpyLGxvYWRlZDohMX07cmV0dXJuIHRbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsZSksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiBlLm09dCxlLmM9bixlLnA9XCIvXCIsZSgwKX0oW2Z1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxlLm1peGlucz1lLlZ1ZVNlbGVjdD12b2lkIDA7dmFyIG89big4MyksaT1yKG8pLGE9big0Mikscz1yKGEpO2UuZGVmYXVsdD1pLmRlZmF1bHQsZS5WdWVTZWxlY3Q9aS5kZWZhdWx0LGUubWl4aW5zPXMuZGVmYXVsdH0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lk1hdGg9PU1hdGg/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiZzZWxmLk1hdGg9PU1hdGg/c2VsZjpGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XCJudW1iZXJcIj09dHlwZW9mIF9fZyYmKF9fZz1uKX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz0hbig5KShmdW5jdGlvbigpe3JldHVybiA3IT1PYmplY3QuZGVmaW5lUHJvcGVydHkoe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pLmF9KX0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS5oYXNPd25Qcm9wZXJ0eTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbi5jYWxsKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMCksbz1uKDMzKSxpPW4oMjUpLGE9T2JqZWN0LmRlZmluZVByb3BlcnR5O2UuZj1uKDIpP09iamVjdC5kZWZpbmVQcm9wZXJ0eTpmdW5jdGlvbih0LGUsbil7aWYocih0KSxlPWkoZSwhMCkscihuKSxvKXRyeXtyZXR1cm4gYSh0LGUsbil9Y2F0Y2godCl7fWlmKFwiZ2V0XCJpbiBufHxcInNldFwiaW4gbil0aHJvdyBUeXBlRXJyb3IoXCJBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCFcIik7cmV0dXJuXCJ2YWx1ZVwiaW4gbiYmKHRbZV09bi52YWx1ZSksdH19LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPXt2ZXJzaW9uOlwiMi41LjFcIn07XCJudW1iZXJcIj09dHlwZW9mIF9fZSYmKF9fZT1uKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCksbz1uKDE0KTt0LmV4cG9ydHM9bigyKT9mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuZih0LGUsbygxLG4pKX06ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0W2VdPW4sdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDU5KSxvPW4oMTYpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gcihvKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIzKShcIndrc1wiKSxvPW4oMTUpLGk9bigxKS5TeW1ib2wsYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpLHM9dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT1hJiZpW3RdfHwoYT9pOm8pKFwiU3ltYm9sLlwiK3QpKX07cy5zdG9yZT1yfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuISF0KCl9Y2F0Y2godCl7cmV0dXJuITB9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTIpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZighcih0KSl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYW4gb2JqZWN0IVwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLG89big1KSxpPW4oNTYpLGE9big2KSxzPVwicHJvdG90eXBlXCIsdT1mdW5jdGlvbih0LGUsbil7dmFyIGwsYyxmLHA9dCZ1LkYsZD10JnUuRyxoPXQmdS5TLGI9dCZ1LlAsdj10JnUuQixnPXQmdS5XLHk9ZD9vOm9bZV18fChvW2VdPXt9KSxtPXlbc10seD1kP3I6aD9yW2VdOihyW2VdfHx7fSlbc107ZCYmKG49ZSk7Zm9yKGwgaW4gbiljPSFwJiZ4JiZ2b2lkIDAhPT14W2xdLGMmJmwgaW4geXx8KGY9Yz94W2xdOm5bbF0seVtsXT1kJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB4W2xdP25bbF06diYmYz9pKGYscik6ZyYmeFtsXT09Zj9mdW5jdGlvbih0KXt2YXIgZT1mdW5jdGlvbihlLG4scil7aWYodGhpcyBpbnN0YW5jZW9mIHQpe3N3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtjYXNlIDA6cmV0dXJuIG5ldyB0O2Nhc2UgMTpyZXR1cm4gbmV3IHQoZSk7Y2FzZSAyOnJldHVybiBuZXcgdChlLG4pfXJldHVybiBuZXcgdChlLG4scil9cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfTtyZXR1cm4gZVtzXT10W3NdLGV9KGYpOmImJlwiZnVuY3Rpb25cIj09dHlwZW9mIGY/aShGdW5jdGlvbi5jYWxsLGYpOmYsYiYmKCh5LnZpcnR1YWx8fCh5LnZpcnR1YWw9e30pKVtsXT1mLHQmdS5SJiZtJiYhbVtsXSYmYShtLGwsZikpKX07dS5GPTEsdS5HPTIsdS5TPTQsdS5QPTgsdS5CPTE2LHUuVz0zMix1LlU9NjQsdS5SPTEyOCx0LmV4cG9ydHM9dX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIHQ/bnVsbCE9PXQ6XCJmdW5jdGlvblwiPT10eXBlb2YgdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDM4KSxvPW4oMTcpO3QuZXhwb3J0cz1PYmplY3Qua2V5c3x8ZnVuY3Rpb24odCl7cmV0dXJuIHIodCxvKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJue2VudW1lcmFibGU6ISgxJnQpLGNvbmZpZ3VyYWJsZTohKDImdCksd3JpdGFibGU6ISg0JnQpLHZhbHVlOmV9fX0sZnVuY3Rpb24odCxlKXt2YXIgbj0wLHI9TWF0aC5yYW5kb20oKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuXCJTeW1ib2woXCIuY29uY2F0KHZvaWQgMD09PXQ/XCJcIjp0LFwiKV9cIiwoKytuK3IpLnRvU3RyaW5nKDM2KSl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZih2b2lkIDA9PXQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiK3QpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9XCJjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2ZcIi5zcGxpdChcIixcIil9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPXt9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz0hMH0sZnVuY3Rpb24odCxlKXtlLmY9e30ucHJvcGVydHlJc0VudW1lcmFibGV9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQpLmYsbz1uKDMpLGk9big4KShcInRvU3RyaW5nVGFnXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dCYmIW8odD1uP3Q6dC5wcm90b3R5cGUsaSkmJnIodCxpLHtjb25maWd1cmFibGU6ITAsdmFsdWU6ZX0pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjMpKFwia2V5c1wiKSxvPW4oMTUpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gclt0XXx8KHJbdF09byh0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxKSxvPVwiX19jb3JlLWpzX3NoYXJlZF9fXCIsaT1yW29dfHwocltvXT17fSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpW3RdfHwoaVt0XT17fSl9fSxmdW5jdGlvbih0LGUpe3ZhciBuPU1hdGguY2VpbCxyPU1hdGguZmxvb3I7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpc05hTih0PSt0KT8wOih0PjA/cjpuKSh0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEyKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighcih0KSlyZXR1cm4gdDt2YXIgbixvO2lmKGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFyKG89bi5jYWxsKHQpKSlyZXR1cm4gbztpZihcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudmFsdWVPZikmJiFyKG89bi5jYWxsKHQpKSlyZXR1cm4gbztpZighZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIXIobz1uLmNhbGwodCkpKXJldHVybiBvO3Rocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLG89big1KSxpPW4oMTkpLGE9bigyNykscz1uKDQpLmY7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPW8uU3ltYm9sfHwoby5TeW1ib2w9aT97fTpyLlN5bWJvbHx8e30pO1wiX1wiPT10LmNoYXJBdCgwKXx8dCBpbiBlfHxzKGUsdCx7dmFsdWU6YS5mKHQpfSl9fSxmdW5jdGlvbih0LGUsbil7ZS5mPW4oOCl9LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPXtwcm9wczp7bG9hZGluZzp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LG9uU2VhcmNoOnt0eXBlOkZ1bmN0aW9uLGRlZmF1bHQ6ZnVuY3Rpb24odCxlKXt9fX0sZGF0YTpmdW5jdGlvbigpe3JldHVybnttdXRhYmxlTG9hZGluZzohMX19LHdhdGNoOntzZWFyY2g6ZnVuY3Rpb24oKXt0aGlzLnNlYXJjaC5sZW5ndGg+MCYmKHRoaXMub25TZWFyY2godGhpcy5zZWFyY2gsdGhpcy50b2dnbGVMb2FkaW5nKSx0aGlzLiRlbWl0KFwic2VhcmNoXCIsdGhpcy5zZWFyY2gsdGhpcy50b2dnbGVMb2FkaW5nKSl9LGxvYWRpbmc6ZnVuY3Rpb24odCl7dGhpcy5tdXRhYmxlTG9hZGluZz10fX0sbWV0aG9kczp7dG9nZ2xlTG9hZGluZzpmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpudWxsO3JldHVybiBudWxsPT10P3RoaXMubXV0YWJsZUxvYWRpbmc9IXRoaXMubXV0YWJsZUxvYWRpbmc6dGhpcy5tdXRhYmxlTG9hZGluZz10fX19fSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz17d2F0Y2g6e3R5cGVBaGVhZFBvaW50ZXI6ZnVuY3Rpb24oKXt0aGlzLm1heWJlQWRqdXN0U2Nyb2xsKCl9fSxtZXRob2RzOnttYXliZUFkanVzdFNjcm9sbDpmdW5jdGlvbigpe3ZhciB0PXRoaXMucGl4ZWxzVG9Qb2ludGVyVG9wKCksZT10aGlzLnBpeGVsc1RvUG9pbnRlckJvdHRvbSgpO3JldHVybiB0PD10aGlzLnZpZXdwb3J0KCkudG9wP3RoaXMuc2Nyb2xsVG8odCk6ZT49dGhpcy52aWV3cG9ydCgpLmJvdHRvbT90aGlzLnNjcm9sbFRvKHRoaXMudmlld3BvcnQoKS50b3ArdGhpcy5wb2ludGVySGVpZ2h0KCkpOnZvaWQgMH0scGl4ZWxzVG9Qb2ludGVyVG9wOmZ1bmN0aW9uIHQoKXt2YXIgdD0wO2lmKHRoaXMuJHJlZnMuZHJvcGRvd25NZW51KWZvcih2YXIgZT0wO2U8dGhpcy50eXBlQWhlYWRQb2ludGVyO2UrKyl0Kz10aGlzLiRyZWZzLmRyb3Bkb3duTWVudS5jaGlsZHJlbltlXS5vZmZzZXRIZWlnaHQ7cmV0dXJuIHR9LHBpeGVsc1RvUG9pbnRlckJvdHRvbTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBpeGVsc1RvUG9pbnRlclRvcCgpK3RoaXMucG9pbnRlckhlaWdodCgpfSxwb2ludGVySGVpZ2h0OmZ1bmN0aW9uKCl7dmFyIHQ9ISF0aGlzLiRyZWZzLmRyb3Bkb3duTWVudSYmdGhpcy4kcmVmcy5kcm9wZG93bk1lbnUuY2hpbGRyZW5bdGhpcy50eXBlQWhlYWRQb2ludGVyXTtyZXR1cm4gdD90Lm9mZnNldEhlaWdodDowfSx2aWV3cG9ydDpmdW5jdGlvbigpe3JldHVybnt0b3A6dGhpcy4kcmVmcy5kcm9wZG93bk1lbnU/dGhpcy4kcmVmcy5kcm9wZG93bk1lbnUuc2Nyb2xsVG9wOjAsYm90dG9tOnRoaXMuJHJlZnMuZHJvcGRvd25NZW51P3RoaXMuJHJlZnMuZHJvcGRvd25NZW51Lm9mZnNldEhlaWdodCt0aGlzLiRyZWZzLmRyb3Bkb3duTWVudS5zY3JvbGxUb3A6MH19LHNjcm9sbFRvOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLiRyZWZzLmRyb3Bkb3duTWVudT90aGlzLiRyZWZzLmRyb3Bkb3duTWVudS5zY3JvbGxUb3A9dDpudWxsfX19fSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz17ZGF0YTpmdW5jdGlvbigpe3JldHVybnt0eXBlQWhlYWRQb2ludGVyOi0xfX0sd2F0Y2g6e2ZpbHRlcmVkT3B0aW9uczpmdW5jdGlvbigpe3RoaXMudHlwZUFoZWFkUG9pbnRlcj0wfX0sbWV0aG9kczp7dHlwZUFoZWFkVXA6ZnVuY3Rpb24oKXt0aGlzLnR5cGVBaGVhZFBvaW50ZXI+MCYmKHRoaXMudHlwZUFoZWFkUG9pbnRlci0tLHRoaXMubWF5YmVBZGp1c3RTY3JvbGwmJnRoaXMubWF5YmVBZGp1c3RTY3JvbGwoKSl9LHR5cGVBaGVhZERvd246ZnVuY3Rpb24oKXt0aGlzLnR5cGVBaGVhZFBvaW50ZXI8dGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoLTEmJih0aGlzLnR5cGVBaGVhZFBvaW50ZXIrKyx0aGlzLm1heWJlQWRqdXN0U2Nyb2xsJiZ0aGlzLm1heWJlQWRqdXN0U2Nyb2xsKCkpfSx0eXBlQWhlYWRTZWxlY3Q6ZnVuY3Rpb24oKXt0aGlzLmZpbHRlcmVkT3B0aW9uc1t0aGlzLnR5cGVBaGVhZFBvaW50ZXJdP3RoaXMuc2VsZWN0KHRoaXMuZmlsdGVyZWRPcHRpb25zW3RoaXMudHlwZUFoZWFkUG9pbnRlcl0pOnRoaXMudGFnZ2FibGUmJnRoaXMuc2VhcmNoLmxlbmd0aCYmdGhpcy5zZWxlY3QodGhpcy5zZWFyY2gpLHRoaXMuY2xlYXJTZWFyY2hPblNlbGVjdCYmKHRoaXMuc2VhcmNoPVwiXCIpfX19fSxmdW5jdGlvbih0LGUpe3ZhciBuPXt9LnRvU3RyaW5nO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gbi5jYWxsKHQpLnNsaWNlKDgsLTEpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTIpLG89bigxKS5kb2N1bWVudCxpPXIobykmJnIoby5jcmVhdGVFbGVtZW50KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGk/by5jcmVhdGVFbGVtZW50KHQpOnt9fX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz0hbigyKSYmIW4oOSkoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KG4oMzIpKFwiZGl2XCIpLFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDE5KSxvPW4oMTEpLGk9bigzOSksYT1uKDYpLHM9bigzKSx1PW4oMTgpLGw9big2MSksYz1uKDIxKSxmPW4oNjcpLHA9big4KShcIml0ZXJhdG9yXCIpLGQ9IShbXS5rZXlzJiZcIm5leHRcImluW10ua2V5cygpKSxoPVwiQEBpdGVyYXRvclwiLGI9XCJrZXlzXCIsdj1cInZhbHVlc1wiLGc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc307dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHksbSx4LHcpe2wobixlLHkpO3ZhciBTLE8sXyxqPWZ1bmN0aW9uKHQpe2lmKCFkJiZ0IGluIE0pcmV0dXJuIE1bdF07c3dpdGNoKHQpe2Nhc2UgYjpyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX07Y2FzZSB2OnJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgbih0aGlzLHQpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX19LFA9ZStcIiBJdGVyYXRvclwiLGs9bT09dixBPSExLE09dC5wcm90b3R5cGUsTD1NW3BdfHxNW2hdfHxtJiZNW21dLEM9THx8aihtKSxUPW0/az9qKFwiZW50cmllc1wiKTpDOnZvaWQgMCxFPVwiQXJyYXlcIj09ZT9NLmVudHJpZXN8fEw6TDtpZihFJiYoXz1mKEUuY2FsbChuZXcgdCkpLF8hPT1PYmplY3QucHJvdG90eXBlJiZfLm5leHQmJihjKF8sUCwhMCkscnx8cyhfLHApfHxhKF8scCxnKSkpLGsmJkwmJkwubmFtZSE9PXYmJihBPSEwLEM9ZnVuY3Rpb24oKXtyZXR1cm4gTC5jYWxsKHRoaXMpfSksciYmIXd8fCFkJiYhQSYmTVtwXXx8YShNLHAsQyksdVtlXT1DLHVbUF09ZyxtKWlmKFM9e3ZhbHVlczprP0M6aih2KSxrZXlzOng/QzpqKGIpLGVudHJpZXM6VH0sdylmb3IoTyBpbiBTKU8gaW4gTXx8aShNLE8sU1tPXSk7ZWxzZSBvKG8uUCtvLkYqKGR8fEEpLGUsUyk7cmV0dXJuIFN9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMCksbz1uKDY0KSxpPW4oMTcpLGE9bigyMikoXCJJRV9QUk9UT1wiKSxzPWZ1bmN0aW9uKCl7fSx1PVwicHJvdG90eXBlXCIsbD1mdW5jdGlvbigpe3ZhciB0LGU9bigzMikoXCJpZnJhbWVcIikscj1pLmxlbmd0aCxvPVwiPFwiLGE9XCI+XCI7Zm9yKGUuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixuKDU4KS5hcHBlbmRDaGlsZChlKSxlLnNyYz1cImphdmFzY3JpcHQ6XCIsdD1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQsdC5vcGVuKCksdC53cml0ZShvK1wic2NyaXB0XCIrYStcImRvY3VtZW50LkY9T2JqZWN0XCIrbytcIi9zY3JpcHRcIithKSx0LmNsb3NlKCksbD10LkY7ci0tOylkZWxldGUgbFt1XVtpW3JdXTtyZXR1cm4gbCgpfTt0LmV4cG9ydHM9T2JqZWN0LmNyZWF0ZXx8ZnVuY3Rpb24odCxlKXt2YXIgbjtyZXR1cm4gbnVsbCE9PXQ/KHNbdV09cih0KSxuPW5ldyBzLHNbdV09bnVsbCxuW2FdPXQpOm49bCgpLHZvaWQgMD09PWU/bjpvKG4sZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzOCksbz1uKDE3KS5jb25jYXQoXCJsZW5ndGhcIixcInByb3RvdHlwZVwiKTtlLmY9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXN8fGZ1bmN0aW9uKHQpe3JldHVybiByKHQsbyl9fSxmdW5jdGlvbih0LGUpe2UuZj1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKSxvPW4oNyksaT1uKDU1KSghMSksYT1uKDIyKShcIklFX1BST1RPXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciBuLHM9byh0KSx1PTAsbD1bXTtmb3IobiBpbiBzKW4hPWEmJnIocyxuKSYmbC5wdXNoKG4pO2Zvcig7ZS5sZW5ndGg+dTspcihzLG49ZVt1KytdKSYmKH5pKGwsbil8fGwucHVzaChuKSk7cmV0dXJuIGx9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPW4oNil9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE2KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIE9iamVjdChyKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDQ0KSxpPXIobyksYT1uKDQ3KSxzPXIoYSksdT1uKDQ4KSxsPXIodSksYz1uKDI5KSxmPXIoYykscD1uKDMwKSxkPXIocCksaD1uKDI4KSxiPXIoaCk7ZS5kZWZhdWx0PXttaXhpbnM6W2YuZGVmYXVsdCxkLmRlZmF1bHQsYi5kZWZhdWx0XSxwcm9wczp7dmFsdWU6e2RlZmF1bHQ6bnVsbH0sb3B0aW9uczp7dHlwZTpBcnJheSxkZWZhdWx0OmZ1bmN0aW9uKCl7cmV0dXJuW119fSxkaXNhYmxlZDp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LG1heEhlaWdodDp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIjQwMHB4XCJ9LHNlYXJjaGFibGU6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxtdWx0aXBsZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LHBsYWNlaG9sZGVyOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiXCJ9LHRyYW5zaXRpb246e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCJmYWRlXCJ9LGNsZWFyU2VhcmNoT25TZWxlY3Q6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxjbG9zZU9uU2VsZWN0Ont0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sbGFiZWw6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCJsYWJlbFwifSxnZXRPcHRpb25MYWJlbDp7dHlwZTpGdW5jdGlvbixkZWZhdWx0OmZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQ/XCJ1bmRlZmluZWRcIjooMCxsLmRlZmF1bHQpKHQpKSYmdGhpcy5sYWJlbCYmdFt0aGlzLmxhYmVsXT90W3RoaXMubGFiZWxdOnR9fSxvbkNoYW5nZTp7dHlwZTpGdW5jdGlvbixkZWZhdWx0OmZ1bmN0aW9uKHQpe3RoaXMuJGVtaXQoXCJpbnB1dFwiLHQpfX0sdGFnZ2FibGU6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxwdXNoVGFnczp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LGNyZWF0ZU9wdGlvbjp7dHlwZTpGdW5jdGlvbixkZWZhdWx0OmZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PT0oMCxsLmRlZmF1bHQpKHRoaXMubXV0YWJsZU9wdGlvbnNbMF0pJiYodD0oMCxzLmRlZmF1bHQpKHt9LHRoaXMubGFiZWwsdCkpLHRoaXMuJGVtaXQoXCJvcHRpb246Y3JlYXRlZFwiLHQpLHR9fSxyZXNldE9uT3B0aW9uc0NoYW5nZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LG5vRHJvcDp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LGlucHV0SWQ6e3R5cGU6U3RyaW5nfSxkaXI6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCJhdXRvXCJ9fSxkYXRhOmZ1bmN0aW9uKCl7cmV0dXJue3NlYXJjaDpcIlwiLG9wZW46ITEsbXV0YWJsZVZhbHVlOm51bGwsbXV0YWJsZU9wdGlvbnM6W119fSx3YXRjaDp7dmFsdWU6ZnVuY3Rpb24odCl7dGhpcy5tdXRhYmxlVmFsdWU9dH0sbXV0YWJsZVZhbHVlOmZ1bmN0aW9uKHQsZSl7dGhpcy5tdWx0aXBsZT90aGlzLm9uQ2hhbmdlP3RoaXMub25DaGFuZ2UodCk6bnVsbDp0aGlzLm9uQ2hhbmdlJiZ0IT09ZT90aGlzLm9uQ2hhbmdlKHQpOm51bGx9LG9wdGlvbnM6ZnVuY3Rpb24odCl7dGhpcy5tdXRhYmxlT3B0aW9ucz10fSxtdXRhYmxlT3B0aW9uczpmdW5jdGlvbigpeyF0aGlzLnRhZ2dhYmxlJiZ0aGlzLnJlc2V0T25PcHRpb25zQ2hhbmdlJiYodGhpcy5tdXRhYmxlVmFsdWU9dGhpcy5tdWx0aXBsZT9bXTpudWxsKX0sbXVsdGlwbGU6ZnVuY3Rpb24odCl7dGhpcy5tdXRhYmxlVmFsdWU9dD9bXTpudWxsfX0sY3JlYXRlZDpmdW5jdGlvbigpe3RoaXMubXV0YWJsZVZhbHVlPXRoaXMudmFsdWUsdGhpcy5tdXRhYmxlT3B0aW9ucz10aGlzLm9wdGlvbnMuc2xpY2UoMCksdGhpcy5tdXRhYmxlTG9hZGluZz10aGlzLmxvYWRpbmcsdGhpcy4kb24oXCJvcHRpb246Y3JlYXRlZFwiLHRoaXMubWF5YmVQdXNoVGFnKX0sbWV0aG9kczp7c2VsZWN0OmZ1bmN0aW9uKHQpe3RoaXMuaXNPcHRpb25TZWxlY3RlZCh0KT90aGlzLmRlc2VsZWN0KHQpOih0aGlzLnRhZ2dhYmxlJiYhdGhpcy5vcHRpb25FeGlzdHModCkmJih0PXRoaXMuY3JlYXRlT3B0aW9uKHQpKSx0aGlzLm11bHRpcGxlJiYhdGhpcy5tdXRhYmxlVmFsdWU/dGhpcy5tdXRhYmxlVmFsdWU9W3RdOnRoaXMubXVsdGlwbGU/dGhpcy5tdXRhYmxlVmFsdWUucHVzaCh0KTp0aGlzLm11dGFibGVWYWx1ZT10KSx0aGlzLm9uQWZ0ZXJTZWxlY3QodCl9LGRlc2VsZWN0OmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXM7aWYodGhpcy5tdWx0aXBsZSl7dmFyIG49LTE7dGhpcy5tdXRhYmxlVmFsdWUuZm9yRWFjaChmdW5jdGlvbihyKXsocj09PXR8fFwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHI/XCJ1bmRlZmluZWRcIjooMCxsLmRlZmF1bHQpKHIpKSYmcltlLmxhYmVsXT09PXRbZS5sYWJlbF0pJiYobj1yKX0pO3ZhciByPXRoaXMubXV0YWJsZVZhbHVlLmluZGV4T2Yobik7dGhpcy5tdXRhYmxlVmFsdWUuc3BsaWNlKHIsMSl9ZWxzZSB0aGlzLm11dGFibGVWYWx1ZT1udWxsfSxvbkFmdGVyU2VsZWN0OmZ1bmN0aW9uKHQpe3RoaXMuY2xvc2VPblNlbGVjdCYmKHRoaXMub3Blbj0hdGhpcy5vcGVuLHRoaXMuJHJlZnMuc2VhcmNoLmJsdXIoKSksdGhpcy5jbGVhclNlYXJjaE9uU2VsZWN0JiYodGhpcy5zZWFyY2g9XCJcIil9LHRvZ2dsZURyb3Bkb3duOmZ1bmN0aW9uKHQpe3QudGFyZ2V0IT09dGhpcy4kcmVmcy5vcGVuSW5kaWNhdG9yJiZ0LnRhcmdldCE9PXRoaXMuJHJlZnMuc2VhcmNoJiZ0LnRhcmdldCE9PXRoaXMuJHJlZnMudG9nZ2xlJiZ0LnRhcmdldCE9PXRoaXMuJGVsfHwodGhpcy5vcGVuP3RoaXMuJHJlZnMuc2VhcmNoLmJsdXIoKTp0aGlzLmRpc2FibGVkfHwodGhpcy5vcGVuPSEwLHRoaXMuJHJlZnMuc2VhcmNoLmZvY3VzKCkpKX0saXNPcHRpb25TZWxlY3RlZDpmdW5jdGlvbih0KXt2YXIgZT10aGlzO2lmKHRoaXMubXVsdGlwbGUmJnRoaXMubXV0YWJsZVZhbHVlKXt2YXIgbj0hMTtyZXR1cm4gdGhpcy5tdXRhYmxlVmFsdWUuZm9yRWFjaChmdW5jdGlvbihyKXtcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiByP1widW5kZWZpbmVkXCI6KDAsbC5kZWZhdWx0KShyKSkmJnJbZS5sYWJlbF09PT10W2UubGFiZWxdP249ITA6XCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2Ygcj9cInVuZGVmaW5lZFwiOigwLGwuZGVmYXVsdCkocikpJiZyW2UubGFiZWxdPT09dD9uPSEwOnI9PT10JiYobj0hMCl9KSxufXJldHVybiB0aGlzLm11dGFibGVWYWx1ZT09PXR9LG9uRXNjYXBlOmZ1bmN0aW9uKCl7dGhpcy5zZWFyY2gubGVuZ3RoP3RoaXMuc2VhcmNoPVwiXCI6dGhpcy4kcmVmcy5zZWFyY2guYmx1cigpfSxvblNlYXJjaEJsdXI6ZnVuY3Rpb24oKXt0aGlzLmNsZWFyU2VhcmNoT25CbHVyJiYodGhpcy5zZWFyY2g9XCJcIiksdGhpcy5vcGVuPSExLHRoaXMuJGVtaXQoXCJzZWFyY2g6Ymx1clwiKX0sb25TZWFyY2hGb2N1czpmdW5jdGlvbigpe3RoaXMub3Blbj0hMCx0aGlzLiRlbWl0KFwic2VhcmNoOmZvY3VzXCIpfSxtYXliZURlbGV0ZVZhbHVlOmZ1bmN0aW9uKCl7aWYoIXRoaXMuJHJlZnMuc2VhcmNoLnZhbHVlLmxlbmd0aCYmdGhpcy5tdXRhYmxlVmFsdWUpcmV0dXJuIHRoaXMubXVsdGlwbGU/dGhpcy5tdXRhYmxlVmFsdWUucG9wKCk6dGhpcy5tdXRhYmxlVmFsdWU9bnVsbH0sb3B0aW9uRXhpc3RzOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMsbj0hMTtyZXR1cm4gdGhpcy5tdXRhYmxlT3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHIpe1wib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHI/XCJ1bmRlZmluZWRcIjooMCxsLmRlZmF1bHQpKHIpKSYmcltlLmxhYmVsXT09PXQ/bj0hMDpyPT09dCYmKG49ITApfSksbn0sbWF5YmVQdXNoVGFnOmZ1bmN0aW9uKHQpe3RoaXMucHVzaFRhZ3MmJnRoaXMubXV0YWJsZU9wdGlvbnMucHVzaCh0KX19LGNvbXB1dGVkOntkcm9wZG93bkNsYXNzZXM6ZnVuY3Rpb24oKXtyZXR1cm57b3Blbjp0aGlzLmRyb3Bkb3duT3BlbixzaW5nbGU6IXRoaXMubXVsdGlwbGUsc2VhcmNoaW5nOnRoaXMuc2VhcmNoaW5nLHNlYXJjaGFibGU6dGhpcy5zZWFyY2hhYmxlLHVuc2VhcmNoYWJsZTohdGhpcy5zZWFyY2hhYmxlLGxvYWRpbmc6dGhpcy5tdXRhYmxlTG9hZGluZyxydGw6XCJydGxcIj09PXRoaXMuZGlyfX0sY2xlYXJTZWFyY2hPbkJsdXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jbGVhclNlYXJjaE9uU2VsZWN0JiYhdGhpcy5tdWx0aXBsZX0sc2VhcmNoaW5nOmZ1bmN0aW9uKCl7cmV0dXJuISF0aGlzLnNlYXJjaH0sZHJvcGRvd25PcGVuOmZ1bmN0aW9uKCl7cmV0dXJuIXRoaXMubm9Ecm9wJiYodGhpcy5vcGVuJiYhdGhpcy5tdXRhYmxlTG9hZGluZyl9LHNlYXJjaFBsYWNlaG9sZGVyOmZ1bmN0aW9uKCl7aWYodGhpcy5pc1ZhbHVlRW1wdHkmJnRoaXMucGxhY2Vob2xkZXIpcmV0dXJuIHRoaXMucGxhY2Vob2xkZXJ9LGZpbHRlcmVkT3B0aW9uczpmdW5jdGlvbigpe3ZhciB0PXRoaXMsZT10aGlzLm11dGFibGVPcHRpb25zLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm5cIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6KDAsbC5kZWZhdWx0KShlKSkmJmUuaGFzT3duUHJvcGVydHkodC5sYWJlbCk/ZVt0LmxhYmVsXS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodC5zZWFyY2gudG9Mb3dlckNhc2UoKSk+LTE6XCJvYmplY3RcIiE9PShcInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOigwLGwuZGVmYXVsdCkoZSkpfHxlLmhhc093blByb3BlcnR5KHQubGFiZWwpP2UudG9Mb3dlckNhc2UoKS5pbmRleE9mKHQuc2VhcmNoLnRvTG93ZXJDYXNlKCkpPi0xOmNvbnNvbGUud2FybignW3Z1ZS1zZWxlY3Qgd2Fybl06IExhYmVsIGtleSBcIm9wdGlvbi4nK3QubGFiZWwrJ1wiIGRvZXMgbm90IGV4aXN0IGluIG9wdGlvbnMgb2JqZWN0Llxcbmh0dHA6Ly9zYWdhbGJvdC5naXRodWIuaW8vdnVlLXNlbGVjdC8jZXgtbGFiZWxzJyl9KTtyZXR1cm4gdGhpcy50YWdnYWJsZSYmdGhpcy5zZWFyY2gubGVuZ3RoJiYhdGhpcy5vcHRpb25FeGlzdHModGhpcy5zZWFyY2gpJiZlLnVuc2hpZnQodGhpcy5zZWFyY2gpLGV9LGlzVmFsdWVFbXB0eTpmdW5jdGlvbigpe3JldHVybiF0aGlzLm11dGFibGVWYWx1ZXx8KFwib2JqZWN0XCI9PT0oMCxsLmRlZmF1bHQpKHRoaXMubXV0YWJsZVZhbHVlKT8hKDAsaS5kZWZhdWx0KSh0aGlzLm11dGFibGVWYWx1ZSkubGVuZ3RoOiF0aGlzLm11dGFibGVWYWx1ZS5sZW5ndGgpfSx2YWx1ZUFzQXJyYXk6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tdWx0aXBsZT90aGlzLm11dGFibGVWYWx1ZTp0aGlzLm11dGFibGVWYWx1ZT9bdGhpcy5tdXRhYmxlVmFsdWVdOltdfX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigyOCksaT1yKG8pLGE9bigzMCkscz1yKGEpLHU9bigyOSksbD1yKHUpO2UuZGVmYXVsdD17YWpheDppLmRlZmF1bHQscG9pbnRlcjpzLmRlZmF1bHQscG9pbnRlclNjcm9sbDpsLmRlZmF1bHR9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oNDkpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oNTApLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oNTEpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oNTIpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZS5fX2VzTW9kdWxlPSEwO3ZhciBvPW4oNDMpLGk9cihvKTtlLmRlZmF1bHQ9ZnVuY3Rpb24odCxlLG4pe3JldHVybiBlIGluIHQ/KDAsaS5kZWZhdWx0KSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTp0W2VdPW4sdH19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1lLl9fZXNNb2R1bGU9ITA7dmFyIG89big0NiksaT1yKG8pLGE9big0NSkscz1yKGEpLHU9XCJmdW5jdGlvblwiPT10eXBlb2Ygcy5kZWZhdWx0JiZcInN5bWJvbFwiPT10eXBlb2YgaS5kZWZhdWx0P2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHMuZGVmYXVsdCYmdC5jb25zdHJ1Y3Rvcj09PXMuZGVmYXVsdCYmdCE9PXMuZGVmYXVsdC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH07ZS5kZWZhdWx0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHMuZGVmYXVsdCYmXCJzeW1ib2xcIj09PXUoaS5kZWZhdWx0KT9mdW5jdGlvbih0KXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgdD9cInVuZGVmaW5lZFwiOnUodCl9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBzLmRlZmF1bHQmJnQuY29uc3RydWN0b3I9PT1zLmRlZmF1bHQmJnQhPT1zLmRlZmF1bHQucHJvdG90eXBlP1wic3ltYm9sXCI6XCJ1bmRlZmluZWRcIj09dHlwZW9mIHQ/XCJ1bmRlZmluZWRcIjp1KHQpfX0sZnVuY3Rpb24odCxlLG4pe24oNzMpO3ZhciByPW4oNSkuT2JqZWN0O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuZGVmaW5lUHJvcGVydHkodCxlLG4pfX0sZnVuY3Rpb24odCxlLG4pe24oNzQpLHQuZXhwb3J0cz1uKDUpLk9iamVjdC5rZXlzfSxmdW5jdGlvbih0LGUsbil7big3Nyksbig3NSksbig3OCksbig3OSksdC5leHBvcnRzPW4oNSkuU3ltYm9sfSxmdW5jdGlvbih0LGUsbil7big3Niksbig4MCksdC5leHBvcnRzPW4oMjcpLmYoXCJpdGVyYXRvclwiKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBmdW5jdGlvbiFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbigpe319LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDcpLG89big3MSksaT1uKDcwKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUsbixhKXt2YXIgcyx1PXIoZSksbD1vKHUubGVuZ3RoKSxjPWkoYSxsKTtpZih0JiZuIT1uKXtmb3IoO2w+YzspaWYocz11W2MrK10scyE9cylyZXR1cm4hMH1lbHNlIGZvcig7bD5jO2MrKylpZigodHx8YyBpbiB1KSYmdVtjXT09PW4pcmV0dXJuIHR8fGN8fDA7cmV0dXJuIXQmJi0xfX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDUzKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe2lmKHIodCksdm9pZCAwPT09ZSlyZXR1cm4gdDtzd2l0Y2gobil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdC5jYWxsKGUsbil9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24obixyKXtyZXR1cm4gdC5jYWxsKGUsbixyKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihuLHIsbyl7cmV0dXJuIHQuY2FsbChlLG4scixvKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkoZSxhcmd1bWVudHMpfX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEzKSxvPW4oMzcpLGk9bigyMCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPXIodCksbj1vLmY7aWYobilmb3IodmFyIGEscz1uKHQpLHU9aS5mLGw9MDtzLmxlbmd0aD5sOyl1LmNhbGwodCxhPXNbbCsrXSkmJmUucHVzaChhKTtyZXR1cm4gZX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLmRvY3VtZW50O3QuZXhwb3J0cz1yJiZyLmRvY3VtZW50RWxlbWVudH0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzEpO3QuZXhwb3J0cz1PYmplY3QoXCJ6XCIpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApP09iamVjdDpmdW5jdGlvbih0KXtyZXR1cm5cIlN0cmluZ1wiPT1yKHQpP3Quc3BsaXQoXCJcIik6T2JqZWN0KHQpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzEpO3QuZXhwb3J0cz1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm5cIkFycmF5XCI9PXIodCl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigzNSksbz1uKDE0KSxpPW4oMjEpLGE9e307big2KShhLG4oOCkoXCJpdGVyYXRvclwiKSxmdW5jdGlvbigpe3JldHVybiB0aGlzfSksdC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXt0LnByb3RvdHlwZT1yKGEse25leHQ6bygxLG4pfSksaSh0LGUrXCIgSXRlcmF0b3JcIil9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybnt2YWx1ZTplLGRvbmU6ISF0fX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE1KShcIm1ldGFcIiksbz1uKDEyKSxpPW4oMyksYT1uKDQpLmYscz0wLHU9T2JqZWN0LmlzRXh0ZW5zaWJsZXx8ZnVuY3Rpb24oKXtyZXR1cm4hMH0sbD0hbig5KShmdW5jdGlvbigpe3JldHVybiB1KE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpfSksYz1mdW5jdGlvbih0KXthKHQscix7dmFsdWU6e2k6XCJPXCIrICsrcyx3Ont9fX0pfSxmPWZ1bmN0aW9uKHQsZSl7aWYoIW8odCkpcmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHQ/dDooXCJzdHJpbmdcIj09dHlwZW9mIHQ/XCJTXCI6XCJQXCIpK3Q7aWYoIWkodCxyKSl7aWYoIXUodCkpcmV0dXJuXCJGXCI7aWYoIWUpcmV0dXJuXCJFXCI7Yyh0KX1yZXR1cm4gdFtyXS5pfSxwPWZ1bmN0aW9uKHQsZSl7aWYoIWkodCxyKSl7aWYoIXUodCkpcmV0dXJuITA7aWYoIWUpcmV0dXJuITE7Yyh0KX1yZXR1cm4gdFtyXS53fSxkPWZ1bmN0aW9uKHQpe3JldHVybiBsJiZoLk5FRUQmJnUodCkmJiFpKHQscikmJmModCksdH0saD10LmV4cG9ydHM9e0tFWTpyLE5FRUQ6ITEsZmFzdEtleTpmLGdldFdlYWs6cCxvbkZyZWV6ZTpkfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCksbz1uKDEwKSxpPW4oMTMpO3QuZXhwb3J0cz1uKDIpP09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzOmZ1bmN0aW9uKHQsZSl7byh0KTtmb3IodmFyIG4sYT1pKGUpLHM9YS5sZW5ndGgsdT0wO3M+dTspci5mKHQsbj1hW3UrK10sZVtuXSk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMCksbz1uKDE0KSxpPW4oNyksYT1uKDI1KSxzPW4oMyksdT1uKDMzKSxsPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7ZS5mPW4oMik/bDpmdW5jdGlvbih0LGUpe2lmKHQ9aSh0KSxlPWEoZSwhMCksdSl0cnl7cmV0dXJuIGwodCxlKX1jYXRjaCh0KXt9aWYocyh0LGUpKXJldHVybiBvKCFyLmYuY2FsbCh0LGUpLHRbZV0pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNyksbz1uKDM2KS5mLGk9e30udG9TdHJpbmcsYT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzP09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdyk6W10scz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuIG8odCl9Y2F0Y2godCl7cmV0dXJuIGEuc2xpY2UoKX19O3QuZXhwb3J0cy5mPWZ1bmN0aW9uKHQpe3JldHVybiBhJiZcIltvYmplY3QgV2luZG93XVwiPT1pLmNhbGwodCk/cyh0KTpvKHIodCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMyksbz1uKDQwKSxpPW4oMjIpKFwiSUVfUFJPVE9cIiksYT1PYmplY3QucHJvdG90eXBlO3QuZXhwb3J0cz1PYmplY3QuZ2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQpe3JldHVybiB0PW8odCkscih0LGkpP3RbaV06XCJmdW5jdGlvblwiPT10eXBlb2YgdC5jb25zdHJ1Y3RvciYmdCBpbnN0YW5jZW9mIHQuY29uc3RydWN0b3I/dC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU6dCBpbnN0YW5jZW9mIE9iamVjdD9hOm51bGx9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMSksbz1uKDUpLGk9big5KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbj0oby5PYmplY3R8fHt9KVt0XXx8T2JqZWN0W3RdLGE9e307YVt0XT1lKG4pLHIoci5TK3IuRippKGZ1bmN0aW9uKCl7bigxKX0pLFwiT2JqZWN0XCIsYSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNCksbz1uKDE2KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUsbil7dmFyIGksYSxzPVN0cmluZyhvKGUpKSx1PXIobiksbD1zLmxlbmd0aDtyZXR1cm4gdTwwfHx1Pj1sP3Q/XCJcIjp2b2lkIDA6KGk9cy5jaGFyQ29kZUF0KHUpLGk8NTUyOTZ8fGk+NTYzMTl8fHUrMT09PWx8fChhPXMuY2hhckNvZGVBdCh1KzEpKTw1NjMyMHx8YT41NzM0Mz90P3MuY2hhckF0KHUpOmk6dD9zLnNsaWNlKHUsdSsyKTooaS01NTI5Njw8MTApKyhhLTU2MzIwKSs2NTUzNil9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjQpLG89TWF0aC5tYXgsaT1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD1yKHQpLHQ8MD9vKHQrZSwwKTppKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNCksbz1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MD9vKHIodCksOTAwNzE5OTI1NDc0MDk5MSk6MH19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDU0KSxvPW4oNjIpLGk9bigxOCksYT1uKDcpO3QuZXhwb3J0cz1uKDM0KShBcnJheSxcIkFycmF5XCIsZnVuY3Rpb24odCxlKXt0aGlzLl90PWEodCksdGhpcy5faT0wLHRoaXMuX2s9ZX0sZnVuY3Rpb24oKXt2YXIgdD10aGlzLl90LGU9dGhpcy5fayxuPXRoaXMuX2krKztyZXR1cm4hdHx8bj49dC5sZW5ndGg/KHRoaXMuX3Q9dm9pZCAwLG8oMSkpOlwia2V5c1wiPT1lP28oMCxuKTpcInZhbHVlc1wiPT1lP28oMCx0W25dKTpvKDAsW24sdFtuXV0pfSxcInZhbHVlc1wiKSxpLkFyZ3VtZW50cz1pLkFycmF5LHIoXCJrZXlzXCIpLHIoXCJ2YWx1ZXNcIikscihcImVudHJpZXNcIil9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDExKTtyKHIuUytyLkYqIW4oMiksXCJPYmplY3RcIix7ZGVmaW5lUHJvcGVydHk6big0KS5mfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQwKSxvPW4oMTMpO24oNjgpKFwia2V5c1wiLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBvKHIodCkpfX0pfSxmdW5jdGlvbih0LGUpe30sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNjkpKCEwKTtuKDM0KShTdHJpbmcsXCJTdHJpbmdcIixmdW5jdGlvbih0KXt0aGlzLl90PVN0cmluZyh0KSx0aGlzLl9pPTB9LGZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLl90LG49dGhpcy5faTtyZXR1cm4gbj49ZS5sZW5ndGg/e3ZhbHVlOnZvaWQgMCxkb25lOiEwfToodD1yKGUsbiksdGhpcy5faSs9dC5sZW5ndGgse3ZhbHVlOnQsZG9uZTohMX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDEpLG89bigzKSxpPW4oMiksYT1uKDExKSxzPW4oMzkpLHU9big2MykuS0VZLGw9big5KSxjPW4oMjMpLGY9bigyMSkscD1uKDE1KSxkPW4oOCksaD1uKDI3KSxiPW4oMjYpLHY9big1NyksZz1uKDYwKSx5PW4oMTApLG09big3KSx4PW4oMjUpLHc9bigxNCksUz1uKDM1KSxPPW4oNjYpLF89big2NSksaj1uKDQpLFA9bigxMyksaz1fLmYsQT1qLmYsTT1PLmYsTD1yLlN5bWJvbCxDPXIuSlNPTixUPUMmJkMuc3RyaW5naWZ5LEU9XCJwcm90b3R5cGVcIixWPWQoXCJfaGlkZGVuXCIpLEY9ZChcInRvUHJpbWl0aXZlXCIpLCQ9e30ucHJvcGVydHlJc0VudW1lcmFibGUsQj1jKFwic3ltYm9sLXJlZ2lzdHJ5XCIpLE49YyhcInN5bWJvbHNcIiksRD1jKFwib3Atc3ltYm9sc1wiKSxJPU9iamVjdFtFXSxSPVwiZnVuY3Rpb25cIj09dHlwZW9mIEwsej1yLlFPYmplY3QsSD0henx8IXpbRV18fCF6W0VdLmZpbmRDaGlsZCxHPWkmJmwoZnVuY3Rpb24oKXtyZXR1cm4gNyE9UyhBKHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQSh0aGlzLFwiYVwiLHt2YWx1ZTo3fSkuYX19KSkuYX0pP2Z1bmN0aW9uKHQsZSxuKXt2YXIgcj1rKEksZSk7ciYmZGVsZXRlIElbZV0sQSh0LGUsbiksciYmdCE9PUkmJkEoSSxlLHIpfTpBLFU9ZnVuY3Rpb24odCl7dmFyIGU9Tlt0XT1TKExbRV0pO3JldHVybiBlLl9rPXQsZX0sVz1SJiZcInN5bWJvbFwiPT10eXBlb2YgTC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBMfSxKPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD09PUkmJkooRCxlLG4pLHkodCksZT14KGUsITApLHkobiksbyhOLGUpPyhuLmVudW1lcmFibGU/KG8odCxWKSYmdFtWXVtlXSYmKHRbVl1bZV09ITEpLG49UyhuLHtlbnVtZXJhYmxlOncoMCwhMSl9KSk6KG8odCxWKXx8QSh0LFYsdygxLHt9KSksdFtWXVtlXT0hMCksRyh0LGUsbikpOkEodCxlLG4pfSxLPWZ1bmN0aW9uKHQsZSl7eSh0KTtmb3IodmFyIG4scj12KGU9bShlKSksbz0wLGk9ci5sZW5ndGg7aT5vOylKKHQsbj1yW28rK10sZVtuXSk7cmV0dXJuIHR9LFk9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdm9pZCAwPT09ZT9TKHQpOksoUyh0KSxlKX0scT1mdW5jdGlvbih0KXt2YXIgZT0kLmNhbGwodGhpcyx0PXgodCwhMCkpO3JldHVybiEodGhpcz09PUkmJm8oTix0KSYmIW8oRCx0KSkmJighKGV8fCFvKHRoaXMsdCl8fCFvKE4sdCl8fG8odGhpcyxWKSYmdGhpc1tWXVt0XSl8fGUpfSxRPWZ1bmN0aW9uKHQsZSl7aWYodD1tKHQpLGU9eChlLCEwKSx0IT09SXx8IW8oTixlKXx8byhELGUpKXt2YXIgbj1rKHQsZSk7cmV0dXJuIW58fCFvKE4sZSl8fG8odCxWKSYmdFtWXVtlXXx8KG4uZW51bWVyYWJsZT0hMCksbn19LFo9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49TShtKHQpKSxyPVtdLGk9MDtuLmxlbmd0aD5pOylvKE4sZT1uW2krK10pfHxlPT1WfHxlPT11fHxyLnB1c2goZSk7cmV0dXJuIHJ9LFg9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49dD09PUkscj1NKG4/RDptKHQpKSxpPVtdLGE9MDtyLmxlbmd0aD5hOykhbyhOLGU9clthKytdKXx8biYmIW8oSSxlKXx8aS5wdXNoKE5bZV0pO3JldHVybiBpfTtSfHwoTD1mdW5jdGlvbigpe2lmKHRoaXMgaW5zdGFuY2VvZiBMKXRocm93IFR5cGVFcnJvcihcIlN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciFcIik7dmFyIHQ9cChhcmd1bWVudHMubGVuZ3RoPjA/YXJndW1lbnRzWzBdOnZvaWQgMCksZT1mdW5jdGlvbihuKXt0aGlzPT09SSYmZS5jYWxsKEQsbiksbyh0aGlzLFYpJiZvKHRoaXNbVl0sdCkmJih0aGlzW1ZdW3RdPSExKSxHKHRoaXMsdCx3KDEsbikpfTtyZXR1cm4gaSYmSCYmRyhJLHQse2NvbmZpZ3VyYWJsZTohMCxzZXQ6ZX0pLFUodCl9LHMoTFtFXSxcInRvU3RyaW5nXCIsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fa30pLF8uZj1RLGouZj1KLG4oMzYpLmY9Ty5mPVosbigyMCkuZj1xLG4oMzcpLmY9WCxpJiYhbigxOSkmJnMoSSxcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIscSwhMCksaC5mPWZ1bmN0aW9uKHQpe3JldHVybiBVKGQodCkpfSksYShhLkcrYS5XK2EuRiohUix7U3ltYm9sOkx9KTtmb3IodmFyIHR0PVwiaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXNcIi5zcGxpdChcIixcIiksZXQ9MDt0dC5sZW5ndGg+ZXQ7KWQodHRbZXQrK10pO2Zvcih2YXIgbnQ9UChkLnN0b3JlKSxydD0wO250Lmxlbmd0aD5ydDspYihudFtydCsrXSk7YShhLlMrYS5GKiFSLFwiU3ltYm9sXCIse2ZvcjpmdW5jdGlvbih0KXtyZXR1cm4gbyhCLHQrPVwiXCIpP0JbdF06Qlt0XT1MKHQpfSxrZXlGb3I6ZnVuY3Rpb24odCl7aWYoIVcodCkpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgc3ltYm9sIVwiKTtmb3IodmFyIGUgaW4gQilpZihCW2VdPT09dClyZXR1cm4gZX0sdXNlU2V0dGVyOmZ1bmN0aW9uKCl7SD0hMH0sdXNlU2ltcGxlOmZ1bmN0aW9uKCl7SD0hMX19KSxhKGEuUythLkYqIVIsXCJPYmplY3RcIix7Y3JlYXRlOlksZGVmaW5lUHJvcGVydHk6SixkZWZpbmVQcm9wZXJ0aWVzOkssZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOlEsZ2V0T3duUHJvcGVydHlOYW1lczpaLGdldE93blByb3BlcnR5U3ltYm9sczpYfSksQyYmYShhLlMrYS5GKighUnx8bChmdW5jdGlvbigpe3ZhciB0PUwoKTtyZXR1cm5cIltudWxsXVwiIT1UKFt0XSl8fFwie31cIiE9VCh7YTp0fSl8fFwie31cIiE9VChPYmplY3QodCkpfSkpLFwiSlNPTlwiLHtzdHJpbmdpZnk6ZnVuY3Rpb24odCl7aWYodm9pZCAwIT09dCYmIVcodCkpe2Zvcih2YXIgZSxuLHI9W3RdLG89MTthcmd1bWVudHMubGVuZ3RoPm87KXIucHVzaChhcmd1bWVudHNbbysrXSk7cmV0dXJuIGU9clsxXSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYobj1lKSwhbiYmZyhlKXx8KGU9ZnVuY3Rpb24odCxlKXtpZihuJiYoZT1uLmNhbGwodGhpcyx0LGUpKSwhVyhlKSlyZXR1cm4gZX0pLHJbMV09ZSxULmFwcGx5KEMscil9fX0pLExbRV1bRl18fG4oNikoTFtFXSxGLExbRV0udmFsdWVPZiksZihMLFwiU3ltYm9sXCIpLGYoTWF0aCxcIk1hdGhcIiwhMCksZihyLkpTT04sXCJKU09OXCIsITApfSxmdW5jdGlvbih0LGUsbil7bigyNikoXCJhc3luY0l0ZXJhdG9yXCIpfSxmdW5jdGlvbih0LGUsbil7bigyNikoXCJvYnNlcnZhYmxlXCIpfSxmdW5jdGlvbih0LGUsbil7big3Mik7Zm9yKHZhciByPW4oMSksbz1uKDYpLGk9bigxOCksYT1uKDgpKFwidG9TdHJpbmdUYWdcIikscz1cIkNTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCxNZWRpYUxpc3QsTWltZVR5cGVBcnJheSxOYW1lZE5vZGVNYXAsTm9kZUxpc3QsUGFpbnRSZXF1ZXN0TGlzdCxQbHVnaW4sUGx1Z2luQXJyYXksU1ZHTGVuZ3RoTGlzdCxTVkdOdW1iZXJMaXN0LFNWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LFRleHRUcmFja0xpc3QsVG91Y2hMaXN0XCIuc3BsaXQoXCIsXCIpLHU9MDt1PHMubGVuZ3RoO3UrKyl7dmFyIGw9c1t1XSxjPXJbbF0sZj1jJiZjLnByb3RvdHlwZTtmJiYhZlthXSYmbyhmLGEsbCksaVtsXT1pLkFycmF5fX0sZnVuY3Rpb24odCxlLG4pe2U9dC5leHBvcnRzPW4oODIpKCksZS5wdXNoKFt0LmlkLCcudi1zZWxlY3R7cG9zaXRpb246cmVsYXRpdmU7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZn0udi1zZWxlY3QgLmRpc2FibGVke2N1cnNvcjpub3QtYWxsb3dlZCFpbXBvcnRhbnQ7YmFja2dyb3VuZC1jb2xvcjojZjhmOGY4IWltcG9ydGFudH0udi1zZWxlY3QsLnYtc2VsZWN0ICp7Ym94LXNpemluZzpib3JkZXItYm94fS52LXNlbGVjdC5ydGwgLm9wZW4taW5kaWNhdG9ye2xlZnQ6MTBweDtyaWdodDphdXRvfS52LXNlbGVjdC5ydGwgLnNlbGVjdGVkLXRhZ3tmbG9hdDpyaWdodDttYXJnaW4tcmlnaHQ6M3B4O21hcmdpbi1sZWZ0OjFweH0udi1zZWxlY3QucnRsIC5kcm9wZG93bi1tZW51e3RleHQtYWxpZ246cmlnaHR9LnYtc2VsZWN0IC5vcGVuLWluZGljYXRvcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NnB4O3JpZ2h0OjEwcHg7Y3Vyc29yOnBvaW50ZXI7cG9pbnRlci1ldmVudHM6YWxsO29wYWNpdHk6MTtoZWlnaHQ6MjBweH0udi1zZWxlY3QgLm9wZW4taW5kaWNhdG9yLC52LXNlbGVjdCAub3Blbi1pbmRpY2F0b3I6YmVmb3Jle2Rpc3BsYXk6aW5saW5lLWJsb2NrO3RyYW5zaXRpb246YWxsIC4xNXMgY3ViaWMtYmV6aWVyKDEsLS4xMTUsLjk3NSwuODU1KTt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoMSwtLjExNSwuOTc1LC44NTUpO3dpZHRoOjEwcHh9LnYtc2VsZWN0IC5vcGVuLWluZGljYXRvcjpiZWZvcmV7Ym9yZGVyLWNvbG9yOnJnYmEoNjAsNjAsNjAsLjUpO2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6M3B4IDNweCAwIDA7Y29udGVudDpcIlwiO2hlaWdodDoxMHB4O3ZlcnRpY2FsLWFsaWduOnRvcDt0cmFuc2Zvcm06cm90YXRlKDEzM2RlZyk7Ym94LXNpemluZzppbmhlcml0fS52LXNlbGVjdC5vcGVuIC5vcGVuLWluZGljYXRvcjpiZWZvcmV7dHJhbnNmb3JtOnJvdGF0ZSgzMTVkZWcpfS52LXNlbGVjdC5sb2FkaW5nIC5vcGVuLWluZGljYXRvcntvcGFjaXR5OjB9LnYtc2VsZWN0Lm9wZW4gLm9wZW4taW5kaWNhdG9ye2JvdHRvbToxcHh9LnYtc2VsZWN0IC5kcm9wZG93bi10b2dnbGV7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lO2Rpc3BsYXk6YmxvY2s7cGFkZGluZzowO2JhY2tncm91bmQ6bm9uZTtib3JkZXI6MXB4IHNvbGlkIHJnYmEoNjAsNjAsNjAsLjI2KTtib3JkZXItcmFkaXVzOjRweDt3aGl0ZS1zcGFjZTpub3JtYWx9LnYtc2VsZWN0IC5kcm9wZG93bi10b2dnbGU6YWZ0ZXJ7dmlzaWJpbGl0eTpoaWRkZW47ZGlzcGxheTpibG9jaztmb250LXNpemU6MDtjb250ZW50OlwiIFwiO2NsZWFyOmJvdGg7aGVpZ2h0OjB9LnYtc2VsZWN0LnNlYXJjaGFibGUgLmRyb3Bkb3duLXRvZ2dsZXtjdXJzb3I6dGV4dH0udi1zZWxlY3QudW5zZWFyY2hhYmxlIC5kcm9wZG93bi10b2dnbGV7Y3Vyc29yOnBvaW50ZXJ9LnYtc2VsZWN0Lm9wZW4gLmRyb3Bkb3duLXRvZ2dsZXtib3JkZXItYm90dG9tLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czowfS52LXNlbGVjdCAuZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6MDt6LWluZGV4OjEwMDA7bWluLXdpZHRoOjE2MHB4O3BhZGRpbmc6NXB4IDA7bWFyZ2luOjA7d2lkdGg6MTAwJTtvdmVyZmxvdy15OnNjcm9sbDtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjI2KTtib3gtc2hhZG93OjAgM3B4IDZweCAwIHJnYmEoMCwwLDAsLjE1KTtib3JkZXItdG9wOm5vbmU7Ym9yZGVyLXJhZGl1czowIDAgNHB4IDRweDt0ZXh0LWFsaWduOmxlZnQ7bGlzdC1zdHlsZTpub25lO2JhY2tncm91bmQ6I2ZmZn0udi1zZWxlY3QgLm5vLW9wdGlvbnN7dGV4dC1hbGlnbjpjZW50ZXJ9LnYtc2VsZWN0IC5zZWxlY3RlZC10YWd7Y29sb3I6IzMzMztiYWNrZ3JvdW5kLWNvbG9yOiNmMGYwZjA7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlci1yYWRpdXM6NHB4O2hlaWdodDoyNnB4O21hcmdpbjo0cHggMXB4IDAgM3B4O3BhZGRpbmc6MXB4IC4yNWVtO2Zsb2F0OmxlZnQ7bGluZS1oZWlnaHQ6MjRweH0udi1zZWxlY3Quc2luZ2xlIC5zZWxlY3RlZC10YWd7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItY29sb3I6dHJhbnNwYXJlbnR9LnYtc2VsZWN0LnNpbmdsZS5vcGVuIC5zZWxlY3RlZC10YWd7cG9zaXRpb246YWJzb2x1dGU7b3BhY2l0eTouNX0udi1zZWxlY3Quc2luZ2xlLmxvYWRpbmcgLnNlbGVjdGVkLXRhZywudi1zZWxlY3Quc2luZ2xlLm9wZW4uc2VhcmNoaW5nIC5zZWxlY3RlZC10YWd7ZGlzcGxheTpub25lfS52LXNlbGVjdCAuc2VsZWN0ZWQtdGFnIC5jbG9zZXtmbG9hdDpub25lO21hcmdpbi1yaWdodDowO2ZvbnQtc2l6ZToyMHB4O2FwcGVhcmFuY2U6bm9uZTtwYWRkaW5nOjA7Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZDowIDA7Ym9yZGVyOjA7Zm9udC13ZWlnaHQ6NzAwO2xpbmUtaGVpZ2h0OjE7Y29sb3I6IzAwMDt0ZXh0LXNoYWRvdzowIDFweCAwICNmZmY7ZmlsdGVyOmFscGhhKG9wYWNpdHk9MjApO29wYWNpdHk6LjJ9LnYtc2VsZWN0LnNpbmdsZS5zZWFyY2hpbmc6bm90KC5vcGVuKTpub3QoLmxvYWRpbmcpIGlucHV0W3R5cGU9c2VhcmNoXXtvcGFjaXR5Oi4yfS52LXNlbGVjdCBpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24sLnYtc2VsZWN0IGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiwudi1zZWxlY3QgaW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWJ1dHRvbiwudi1zZWxlY3QgaW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWRlY29yYXRpb257ZGlzcGxheTpub25lfS52LXNlbGVjdCBpbnB1dFt0eXBlPXNlYXJjaF06Oi1tcy1jbGVhcntkaXNwbGF5Om5vbmV9LnYtc2VsZWN0IGlucHV0W3R5cGU9c2VhcmNoXSwudi1zZWxlY3QgaW5wdXRbdHlwZT1zZWFyY2hdOmZvY3Vze2FwcGVhcmFuY2U6bm9uZTstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZTtsaW5lLWhlaWdodDoxLjQyODU3MTQzO2ZvbnQtc2l6ZToxZW07aGVpZ2h0OjM0cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7Ym9yZGVyOm5vbmU7b3V0bGluZTpub25lO21hcmdpbjowO3BhZGRpbmc6MCAuNWVtO3dpZHRoOjEwZW07bWF4LXdpZHRoOjEwMCU7YmFja2dyb3VuZDpub25lO3Bvc2l0aW9uOnJlbGF0aXZlO2JveC1zaGFkb3c6bm9uZTtmbG9hdDpsZWZ0O2NsZWFyOm5vbmV9LnYtc2VsZWN0IGxpe2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDN9LnYtc2VsZWN0IGxpPmF7ZGlzcGxheTpibG9jaztwYWRkaW5nOjNweCAyMHB4O2NsZWFyOmJvdGg7Y29sb3I6IzMzMzt3aGl0ZS1zcGFjZTpub3dyYXB9LnYtc2VsZWN0IGxpOmhvdmVye2N1cnNvcjpwb2ludGVyfS52LXNlbGVjdCAuZHJvcGRvd24tbWVudSAuYWN0aXZlPmF7Y29sb3I6IzMzMztiYWNrZ3JvdW5kOnJnYmEoNTAsNTAsNTAsLjEpfS52LXNlbGVjdCAuZHJvcGRvd24tbWVudT4uaGlnaGxpZ2h0PmF7YmFja2dyb3VuZDojNTg5N2ZiO2NvbG9yOiNmZmZ9LnYtc2VsZWN0IC5oaWdobGlnaHQ6bm90KDpsYXN0LWNoaWxkKXttYXJnaW4tYm90dG9tOjB9LnYtc2VsZWN0IC5zcGlubmVye29wYWNpdHk6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NXB4O3JpZ2h0OjEwcHg7Zm9udC1zaXplOjVweDt0ZXh0LWluZGVudDotOTk5OWVtO292ZXJmbG93OmhpZGRlbjtib3JkZXItdG9wOi45ZW0gc29saWQgaHNsYSgwLDAlLDM5JSwuMSk7Ym9yZGVyLXJpZ2h0Oi45ZW0gc29saWQgaHNsYSgwLDAlLDM5JSwuMSk7Ym9yZGVyLWJvdHRvbTouOWVtIHNvbGlkIGhzbGEoMCwwJSwzOSUsLjEpO2JvcmRlci1sZWZ0Oi45ZW0gc29saWQgcmdiYSg2MCw2MCw2MCwuNDUpO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApO2FuaW1hdGlvbjp2U2VsZWN0U3Bpbm5lciAxLjFzIGluZmluaXRlIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgLjFzfS52LXNlbGVjdCAuc3Bpbm5lciwudi1zZWxlY3QgLnNwaW5uZXI6YWZ0ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7d2lkdGg6NWVtO2hlaWdodDo1ZW19LnYtc2VsZWN0LmxvYWRpbmcgLnNwaW5uZXJ7b3BhY2l0eToxfUAtd2Via2l0LWtleWZyYW1lcyB2U2VsZWN0U3Bpbm5lcnswJXt0cmFuc2Zvcm06cm90YXRlKDBkZWcpfXRve3RyYW5zZm9ybTpyb3RhdGUoMXR1cm4pfX1Aa2V5ZnJhbWVzIHZTZWxlY3RTcGlubmVyezAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZyl9dG97dHJhbnNmb3JtOnJvdGF0ZSgxdHVybil9fS5mYWRlLWVudGVyLWFjdGl2ZSwuZmFkZS1sZWF2ZS1hY3RpdmV7dHJhbnNpdGlvbjpvcGFjaXR5IC4xNXMgY3ViaWMtYmV6aWVyKDEsLjUsLjgsMSl9LmZhZGUtZW50ZXIsLmZhZGUtbGVhdmUtdG97b3BhY2l0eTowfScsXCJcIl0pfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbigpe3ZhciB0PVtdO3JldHVybiB0LnRvU3RyaW5nPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PVtdLGU9MDtlPHRoaXMubGVuZ3RoO2UrKyl7dmFyIG49dGhpc1tlXTtuWzJdP3QucHVzaChcIkBtZWRpYSBcIituWzJdK1wie1wiK25bMV0rXCJ9XCIpOnQucHVzaChuWzFdKX1yZXR1cm4gdC5qb2luKFwiXCIpfSx0Lmk9ZnVuY3Rpb24oZSxuKXtcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9W1tudWxsLGUsXCJcIl1dKTtmb3IodmFyIHI9e30sbz0wO288dGhpcy5sZW5ndGg7bysrKXt2YXIgaT10aGlzW29dWzBdO1wibnVtYmVyXCI9PXR5cGVvZiBpJiYocltpXT0hMCl9Zm9yKG89MDtvPGUubGVuZ3RoO28rKyl7dmFyIGE9ZVtvXTtcIm51bWJlclwiPT10eXBlb2YgYVswXSYmclthWzBdXXx8KG4mJiFhWzJdP2FbMl09bjpuJiYoYVsyXT1cIihcIithWzJdK1wiKSBhbmQgKFwiK24rXCIpXCIpLHQucHVzaChhKSl9fSx0fX0sZnVuY3Rpb24odCxlLG4pe24oODcpO3ZhciByPW4oODQpKG4oNDEpLG4oODUpLG51bGwsbnVsbCk7dC5leHBvcnRzPXIuZXhwb3J0c30sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4scil7dmFyIG8saT10PXR8fHt9LGE9dHlwZW9mIHQuZGVmYXVsdDtcIm9iamVjdFwiIT09YSYmXCJmdW5jdGlvblwiIT09YXx8KG89dCxpPXQuZGVmYXVsdCk7dmFyIHM9XCJmdW5jdGlvblwiPT10eXBlb2YgaT9pLm9wdGlvbnM6aTtpZihlJiYocy5yZW5kZXI9ZS5yZW5kZXIscy5zdGF0aWNSZW5kZXJGbnM9ZS5zdGF0aWNSZW5kZXJGbnMpLG4mJihzLl9zY29wZUlkPW4pLHIpe3ZhciB1PXMuY29tcHV0ZWR8fChzLmNvbXB1dGVkPXt9KTtPYmplY3Qua2V5cyhyKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBlPXJbdF07dVt0XT1mdW5jdGlvbigpe3JldHVybiBlfX0pfXJldHVybntlc01vZHVsZTpvLGV4cG9ydHM6aSxvcHRpb25zOnN9fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbigpe3ZhciB0PXRoaXMsZT10LiRjcmVhdGVFbGVtZW50LG49dC5fc2VsZi5fY3x8ZTtyZXR1cm4gbihcImRpdlwiLHtzdGF0aWNDbGFzczpcImRyb3Bkb3duIHYtc2VsZWN0XCIsY2xhc3M6dC5kcm9wZG93bkNsYXNzZXMsYXR0cnM6e2Rpcjp0LmRpcn19LFtuKFwiZGl2XCIse3JlZjpcInRvZ2dsZVwiLGNsYXNzOltcImRyb3Bkb3duLXRvZ2dsZVwiLFwiY2xlYXJmaXhcIix7ZGlzYWJsZWQ6dC5kaXNhYmxlZH1dLG9uOnttb3VzZWRvd246ZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpLHQudG9nZ2xlRHJvcGRvd24oZSl9fX0sW3QuX2wodC52YWx1ZUFzQXJyYXksZnVuY3Rpb24oZSl7cmV0dXJuIG4oXCJzcGFuXCIse2tleTplLmluZGV4LHN0YXRpY0NsYXNzOlwic2VsZWN0ZWQtdGFnXCJ9LFt0Ll90KFwic2VsZWN0ZWQtb3B0aW9uXCIsW3QuX3YoXCJcXG4gICAgICAgIFwiK3QuX3ModC5nZXRPcHRpb25MYWJlbChlKSkrXCJcXG4gICAgICBcIildLG51bGwsZSksdC5fdihcIiBcIiksdC5tdWx0aXBsZT9uKFwiYnV0dG9uXCIse3N0YXRpY0NsYXNzOlwiY2xvc2VcIixhdHRyczp7dHlwZTpcImJ1dHRvblwiLFwiYXJpYS1sYWJlbFwiOlwiUmVtb3ZlIG9wdGlvblwifSxvbjp7Y2xpY2s6ZnVuY3Rpb24obil7dC5kZXNlbGVjdChlKX19fSxbbihcInNwYW5cIix7YXR0cnM6e1wiYXJpYS1oaWRkZW5cIjpcInRydWVcIn19LFt0Ll92KFwiw5dcIildKV0pOnQuX2UoKV0sMil9KSx0Ll92KFwiIFwiKSxuKFwiaW5wdXRcIix7ZGlyZWN0aXZlczpbe25hbWU6XCJtb2RlbFwiLHJhd05hbWU6XCJ2LW1vZGVsXCIsdmFsdWU6dC5zZWFyY2gsZXhwcmVzc2lvbjpcInNlYXJjaFwifV0scmVmOlwic2VhcmNoXCIsY2xhc3M6W3tkaXNhYmxlZDp0LmRpc2FibGVkfSxcImZvcm0tY29udHJvbFwiXSxzdHlsZTp7d2lkdGg6dC5pc1ZhbHVlRW1wdHk/XCIxMDAlXCI6XCJhdXRvXCJ9LGF0dHJzOnt0eXBlOlwic2VhcmNoXCIscGxhY2Vob2xkZXI6dC5zZWFyY2hQbGFjZWhvbGRlcixyZWFkb25seTohdC5zZWFyY2hhYmxlLGlkOnQuaW5wdXRJZCxcImFyaWEtbGFiZWxcIjpcIlNlYXJjaCBmb3Igb3B0aW9uXCJ9LGRvbVByb3BzOnt2YWx1ZTp0LnNlYXJjaH0sb246e2tleWRvd246W2Z1bmN0aW9uKGUpe3JldHVyblwiYnV0dG9uXCJpbiBlfHwhdC5fayhlLmtleUNvZGUsXCJkZWxldGVcIixbOCw0Nl0pP3ZvaWQgdC5tYXliZURlbGV0ZVZhbHVlKGUpOm51bGx9LGZ1bmN0aW9uKGUpe3JldHVyblwiYnV0dG9uXCJpbiBlfHwhdC5fayhlLmtleUNvZGUsXCJ1cFwiLDM4KT8oZS5wcmV2ZW50RGVmYXVsdCgpLHZvaWQgdC50eXBlQWhlYWRVcChlKSk6bnVsbH0sZnVuY3Rpb24oZSl7cmV0dXJuXCJidXR0b25cImluIGV8fCF0Ll9rKGUua2V5Q29kZSxcImRvd25cIiw0MCk/KGUucHJldmVudERlZmF1bHQoKSx2b2lkIHQudHlwZUFoZWFkRG93bihlKSk6bnVsbH0sZnVuY3Rpb24oZSl7cmV0dXJuXCJidXR0b25cImluIGV8fCF0Ll9rKGUua2V5Q29kZSxcImVudGVyXCIsMTMpPyhlLnByZXZlbnREZWZhdWx0KCksdm9pZCB0LnR5cGVBaGVhZFNlbGVjdChlKSk6bnVsbH1dLGtleXVwOmZ1bmN0aW9uKGUpe3JldHVyblwiYnV0dG9uXCJpbiBlfHwhdC5fayhlLmtleUNvZGUsXCJlc2NcIiwyNyk/dm9pZCB0Lm9uRXNjYXBlKGUpOm51bGx9LGJsdXI6dC5vblNlYXJjaEJsdXIsZm9jdXM6dC5vblNlYXJjaEZvY3VzLGlucHV0OmZ1bmN0aW9uKGUpe2UudGFyZ2V0LmNvbXBvc2luZ3x8KHQuc2VhcmNoPWUudGFyZ2V0LnZhbHVlKX19fSksdC5fdihcIiBcIiksdC5ub0Ryb3A/dC5fZSgpOm4oXCJpXCIse3JlZjpcIm9wZW5JbmRpY2F0b3JcIixjbGFzczpbe2Rpc2FibGVkOnQuZGlzYWJsZWR9LFwib3Blbi1pbmRpY2F0b3JcIl0sYXR0cnM6e3JvbGU6XCJwcmVzZW50YXRpb25cIn19KSx0Ll92KFwiIFwiKSx0Ll90KFwic3Bpbm5lclwiLFtuKFwiZGl2XCIse2RpcmVjdGl2ZXM6W3tuYW1lOlwic2hvd1wiLHJhd05hbWU6XCJ2LXNob3dcIix2YWx1ZTp0Lm11dGFibGVMb2FkaW5nLGV4cHJlc3Npb246XCJtdXRhYmxlTG9hZGluZ1wifV0sc3RhdGljQ2xhc3M6XCJzcGlubmVyXCJ9LFt0Ll92KFwiTG9hZGluZy4uLlwiKV0pXSldLDIpLHQuX3YoXCIgXCIpLG4oXCJ0cmFuc2l0aW9uXCIse2F0dHJzOntuYW1lOnQudHJhbnNpdGlvbn19LFt0LmRyb3Bkb3duT3Blbj9uKFwidWxcIix7cmVmOlwiZHJvcGRvd25NZW51XCIsc3RhdGljQ2xhc3M6XCJkcm9wZG93bi1tZW51XCIsc3R5bGU6e1wibWF4LWhlaWdodFwiOnQubWF4SGVpZ2h0fX0sW3QuX2wodC5maWx0ZXJlZE9wdGlvbnMsZnVuY3Rpb24oZSxyKXtyZXR1cm4gbihcImxpXCIse2tleTpyLGNsYXNzOnthY3RpdmU6dC5pc09wdGlvblNlbGVjdGVkKGUpLGhpZ2hsaWdodDpyPT09dC50eXBlQWhlYWRQb2ludGVyfSxvbjp7bW91c2VvdmVyOmZ1bmN0aW9uKGUpe3QudHlwZUFoZWFkUG9pbnRlcj1yfX19LFtuKFwiYVwiLHtvbjp7bW91c2Vkb3duOmZ1bmN0aW9uKG4pe24ucHJldmVudERlZmF1bHQoKSx0LnNlbGVjdChlKX19fSxbdC5fdChcIm9wdGlvblwiLFt0Ll92KFwiXFxuICAgICAgICAgIFwiK3QuX3ModC5nZXRPcHRpb25MYWJlbChlKSkrXCJcXG4gICAgICAgIFwiKV0sbnVsbCxlKV0sMildKX0pLHQuX3YoXCIgXCIpLHQuZmlsdGVyZWRPcHRpb25zLmxlbmd0aD90Ll9lKCk6bihcImxpXCIse1xuc3RhdGljQ2xhc3M6XCJuby1vcHRpb25zXCJ9LFt0Ll90KFwibm8tb3B0aW9uc1wiLFt0Ll92KFwiU29ycnksIG5vIG1hdGNoaW5nIG9wdGlvbnMuXCIpXSldLDIpXSwyKTp0Ll9lKCldKV0sMSl9LHN0YXRpY1JlbmRlckZuczpbXX19LGZ1bmN0aW9uKHQsZSxuKXtmdW5jdGlvbiByKHQsZSl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciByPXRbbl0sbz1mW3IuaWRdO2lmKG8pe28ucmVmcysrO2Zvcih2YXIgaT0wO2k8by5wYXJ0cy5sZW5ndGg7aSsrKW8ucGFydHNbaV0oci5wYXJ0c1tpXSk7Zm9yKDtpPHIucGFydHMubGVuZ3RoO2krKylvLnBhcnRzLnB1c2godShyLnBhcnRzW2ldLGUpKX1lbHNle2Zvcih2YXIgYT1bXSxpPTA7aTxyLnBhcnRzLmxlbmd0aDtpKyspYS5wdXNoKHUoci5wYXJ0c1tpXSxlKSk7ZltyLmlkXT17aWQ6ci5pZCxyZWZzOjEscGFydHM6YX19fX1mdW5jdGlvbiBvKHQpe2Zvcih2YXIgZT1bXSxuPXt9LHI9MDtyPHQubGVuZ3RoO3IrKyl7dmFyIG89dFtyXSxpPW9bMF0sYT1vWzFdLHM9b1syXSx1PW9bM10sbD17Y3NzOmEsbWVkaWE6cyxzb3VyY2VNYXA6dX07bltpXT9uW2ldLnBhcnRzLnB1c2gobCk6ZS5wdXNoKG5baV09e2lkOmkscGFydHM6W2xdfSl9cmV0dXJuIGV9ZnVuY3Rpb24gaSh0LGUpe3ZhciBuPWgoKSxyPWdbZy5sZW5ndGgtMV07aWYoXCJ0b3BcIj09PXQuaW5zZXJ0QXQpcj9yLm5leHRTaWJsaW5nP24uaW5zZXJ0QmVmb3JlKGUsci5uZXh0U2libGluZyk6bi5hcHBlbmRDaGlsZChlKTpuLmluc2VydEJlZm9yZShlLG4uZmlyc3RDaGlsZCksZy5wdXNoKGUpO2Vsc2V7aWYoXCJib3R0b21cIiE9PXQuaW5zZXJ0QXQpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO24uYXBwZW5kQ2hpbGQoZSl9fWZ1bmN0aW9uIGEodCl7dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHQpO3ZhciBlPWcuaW5kZXhPZih0KTtlPj0wJiZnLnNwbGljZShlLDEpfWZ1bmN0aW9uIHModCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO3JldHVybiBlLnR5cGU9XCJ0ZXh0L2Nzc1wiLGkodCxlKSxlfWZ1bmN0aW9uIHUodCxlKXt2YXIgbixyLG87aWYoZS5zaW5nbGV0b24pe3ZhciBpPXYrKztuPWJ8fChiPXMoZSkpLHI9bC5iaW5kKG51bGwsbixpLCExKSxvPWwuYmluZChudWxsLG4saSwhMCl9ZWxzZSBuPXMoZSkscj1jLmJpbmQobnVsbCxuKSxvPWZ1bmN0aW9uKCl7YShuKX07cmV0dXJuIHIodCksZnVuY3Rpb24oZSl7aWYoZSl7aWYoZS5jc3M9PT10LmNzcyYmZS5tZWRpYT09PXQubWVkaWEmJmUuc291cmNlTWFwPT09dC5zb3VyY2VNYXApcmV0dXJuO3IodD1lKX1lbHNlIG8oKX19ZnVuY3Rpb24gbCh0LGUsbixyKXt2YXIgbz1uP1wiXCI6ci5jc3M7aWYodC5zdHlsZVNoZWV0KXQuc3R5bGVTaGVldC5jc3NUZXh0PXkoZSxvKTtlbHNle3ZhciBpPWRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG8pLGE9dC5jaGlsZE5vZGVzO2FbZV0mJnQucmVtb3ZlQ2hpbGQoYVtlXSksYS5sZW5ndGg/dC5pbnNlcnRCZWZvcmUoaSxhW2VdKTp0LmFwcGVuZENoaWxkKGkpfX1mdW5jdGlvbiBjKHQsZSl7dmFyIG49ZS5jc3Mscj1lLm1lZGlhLG89ZS5zb3VyY2VNYXA7aWYociYmdC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLHIpLG8mJihuKz1cIlxcbi8qIyBzb3VyY2VVUkw9XCIrby5zb3VyY2VzWzBdK1wiICovXCIsbis9XCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiK2J0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KG8pKSkpK1wiICovXCIpLHQuc3R5bGVTaGVldCl0LnN0eWxlU2hlZXQuY3NzVGV4dD1uO2Vsc2V7Zm9yKDt0LmZpcnN0Q2hpbGQ7KXQucmVtb3ZlQ2hpbGQodC5maXJzdENoaWxkKTt0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG4pKX19dmFyIGY9e30scD1mdW5jdGlvbih0KXt2YXIgZTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgZSYmKGU9dC5hcHBseSh0aGlzLGFyZ3VtZW50cykpLGV9fSxkPXAoZnVuY3Rpb24oKXtyZXR1cm4vbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKX0pLGg9cChmdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5oZWFkfHxkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF19KSxiPW51bGwsdj0wLGc9W107dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7ZT1lfHx7fSxcInVuZGVmaW5lZFwiPT10eXBlb2YgZS5zaW5nbGV0b24mJihlLnNpbmdsZXRvbj1kKCkpLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlLmluc2VydEF0JiYoZS5pbnNlcnRBdD1cImJvdHRvbVwiKTt2YXIgbj1vKHQpO3JldHVybiByKG4sZSksZnVuY3Rpb24odCl7Zm9yKHZhciBpPVtdLGE9MDthPG4ubGVuZ3RoO2ErKyl7dmFyIHM9blthXSx1PWZbcy5pZF07dS5yZWZzLS0saS5wdXNoKHUpfWlmKHQpe3ZhciBsPW8odCk7cihsLGUpfWZvcih2YXIgYT0wO2E8aS5sZW5ndGg7YSsrKXt2YXIgdT1pW2FdO2lmKDA9PT11LnJlZnMpe2Zvcih2YXIgYz0wO2M8dS5wYXJ0cy5sZW5ndGg7YysrKXUucGFydHNbY10oKTtkZWxldGUgZlt1LmlkXX19fX07dmFyIHk9ZnVuY3Rpb24oKXt2YXIgdD1bXTtyZXR1cm4gZnVuY3Rpb24oZSxuKXtyZXR1cm4gdFtlXT1uLHQuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCJcXG5cIil9fSgpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big4MSk7XCJzdHJpbmdcIj09dHlwZW9mIHImJihyPVtbdC5pZCxyLFwiXCJdXSk7big4Nikocix7fSk7ci5sb2NhbHMmJih0LmV4cG9ydHM9ci5sb2NhbHMpfV0pfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12dWUtc2VsZWN0LmpzLm1hcCJdfQ==
