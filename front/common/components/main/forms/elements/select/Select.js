const moment = require('moment');
const _ = require('lodash');
const VSelect = require('vue-select').VueSelect;
const InputMixin = require('../../mixins/InputMixin');
const Utils = require('../../../../../utils/utils');
const Messages = require('../../../../../api/messages');
const LangMixin = require('../../../../../mixins/LangMixin');
const ESQueryMixin = require('../../../../../mixins/ESQueryMixin');
const ASCIIFolder = require('fold-to-ascii');
const Handlebars = require('../../../../../../../app/modules/utils/templating');
const ConditionalReadonlyMixin = require('../../mixins/ConditionalReadonlyMixin');

module.exports = {
    props: {
        name: { required: true, type: String },
        label: { default: '', type: String },
        placeholder: { default: '', type: String },
        isRequired: { default: false, type: Boolean },
        // form: { required: true, type: String }, //InputMixin
        multi: { default: false, type: Boolean },
        readonly: { default: false, type: Boolean },
        options: { required: true, type: Array },
        fieldLabel: { required: false, default: 'label', type: String },
        fieldValue: { required: false, default: 'value', type: String },
        hasAddons: { default: false, type: Boolean },
        modal_help: { default: false, type: Boolean },
        help: { required: false, default: '', type: String },
        viewValidationTexts: { required: false, default: true, type: Boolean },
        isAddon: { required: false, default: false, type: Boolean },
        resetOnOptionsChange: { default: false, type: Boolean },
        defaultValue: { default: null, required: false },
        translatable: { default: false, type: Boolean },
        ajax: { default: false, type: Boolean },
        ajaxUrl: { default: '', type: String },
        ajaxValueUrl: { default: '', type: String },
        prefetchInAjax: { default: false, type: Boolean },
        ajaxFilters: { default: () => [], type: Array },
        translateThroughHlang: { default: false, type: Boolean },
        selectFirstValue: { default: false, type: Boolean },
        selectAllValues: { default: false, type: Boolean },
        searchFields: { default: '' },
        searchSize: { default: 10, type: Number },
        flattenList: { default: false, type: Boolean },
        ajaxQuery: { default: '', type: String },
    },
    components: {
        'v-select': VSelect,
    },
    mixins: [InputMixin, LangMixin, ESQueryMixin, ConditionalReadonlyMixin],
    data() {
        return {
            state: {
                selected: null,
                options: [],
                showHelpModal: false,
                form: `${this.name}_${+moment()}`,
                es_query_ids: this.ajaxQuery !== null ? [this.ajaxQuery] : [],
                readonlyValue: '',
            },
        };
    },
    methods: {
        onSearch(search, loading) {
            loading(true);
            this.search(loading, search, this);
        },
        filterFunction(option, label, search) {
            const l = ASCIIFolder.fold(label || '', '').toLowerCase();
            const s = ASCIIFolder.fold(search, '').toLowerCase();
            return l.indexOf(s) > -1;
        },
        merge_options_and_selected(selected, options) {
            if (options.length < selected.length) {
                return this.merge_options_and_selected(options, selected);
            }

            const new_elements = selected.reduce((arr, data) => {
                const elt = _.find(options, o => o.value === data.value);
                if (!elt) {
                    arr.push(data);
                }
                return arr;
            }, []);

            return new_elements.concat(options);
        },
        set_selected(missings) {
            const values = missings.map((m) => {
                if (typeof m === 'string') {
                    return m;
                }
                return m.value;
            }).filter(m => m != null);

            if (this.ajax && values.length > 0) {
                const promise = this.$store.dispatch('search', {
                    form: this.state.form,
                    path: this.ajaxValueUrl,
                    body: {
                        where: {
                            [this.fieldValue]: values,
                        },
                        projection: [this.fieldLabel, this.fieldValue, this.conditionalReadonly],
                        size: values.length,
                    },
                });
                promise.then((res) => {
                    const opts = this.order_options(this.translate_options(this.format_options(res.data)));
                    if (this.multi) {
                        this.state.options = this.merge_options_and_selected(opts, this.state.options);
                        this.state.selected = opts;
                    } else if (res.data.length > 0) {
                        this.state.options = this.merge_options_and_selected(opts, this.state.options);
                        this.state.selected = opts[0];
                    } else {
                        this.state.selected = null;
                    }
                });
                return;
            }

            const data = values.reduce((arr, v) => {
                const elt = _.find(this.state.options, o => o.value === v);
                if (elt) {
                    arr.push(_.cloneDeep(elt));
                }
                return arr;
            }, []);

            if (this.multi) {
                this.state.selected = data;
            } else if (data.length > 0) {
                this.state.selected = data[0];
            } else {
                this.state.selected = null;
            }
        },
        set_selected_readonly(s) {
            if (s instanceof Array) {
                this.state.selected_readonly = s.filter(c => c.readonly === true);
                this.state.selected_not_readonly = s.filter(c => c.readonly === false);
            } else if (s && s.readonly) {
                this.state.selected_readonly = s;
                this.state.selected_not_readonly = null;
            } else if (s && s.readonly === false) {
                this.state.selected_not_readonly = s;
                this.state.selected_readonly = null;
            }
            this.setReadonlyValue(this.state.selected_readonly);
        },
        search: _.debounce((loading, search, self) => {
            const body = {
                projection: [self.fieldLabel, self.fieldValue, self.conditionalReadonly],
                size: self.searchSize + (self.multi ? (self.state.selected ? self.state.selected.length : 1) : 1),
            };

            if (self.searchFields.trim() === '') {
                body.where = {
                    [self.fieldLabel]: { $match: { query: search, minimum_should_match: '100%' } },
                };
            } else {
                const $or = self.searchFields.split(',').map(f => ({ [f.trim()]: search }));
                body.where = { $or };
            }

            if (self.ajaxFilters.length > 0) {
                body.where = {
                    $and: [body.where].concat(self.ajaxFilters),
                };
            }


            const contentQuery = self.fcontent(self.state.sinks.reads.query_grabber);

            if (contentQuery) {
                if (contentQuery && contentQuery instanceof Array
                    && contentQuery.length > 0
                    && contentQuery.find(elm => elm.id === self.ajaxQuery)) {
                    body.where = _.merge(body.where, JSON.parse(Handlebars.compile(contentQuery.find(elm => elm.id === self.ajaxQuery).content)({ search })));
                }
            }

            const promise = self.$store.dispatch('search', {
                form: self.state.form,
                path: self.ajaxUrl,
                body,
            });
            promise.then((res) => {
                loading(false);
                if (self.state.selected) {
                    let selected = self.state.selected instanceof Array ?
                        self.state.selected : [self.state.selected];
                    selected = self.format_options(selected, 'from');
                    self.state.options = self.order_options(self.translate_options(self.format_options(self.merge_options_and_selected(selected, res.data), 'to')));
                } else {
                    self.state.options = self.order_options(self.translate_options(self.format_options(res.data, 'to')));
                }
            });
        }, 350),
        toggleHelpModal(e) {
            e.preventDefault();
            if (this.modal_help) {
                this.state.showHelpModal = !this.state.showHelpModal;
            }
        },
        test_read_only(val, key) {
            if (key === null || key === '') {
                return false;
            }
            if (val[key] && val[key] !== '') {
                return false;
            }
            return true;
        },
        initialize(sink) {
            if (this.form !== sink) {
                return;
            }

            const form = this.$store.state.forms[this.form];

            if (form == null) {
                this.select_default_value();
                return;
            }

            const info = Utils.find_value_with_path(form.content, this.name.split('.'));

            if (info == null) {
                this.set_selected([]);
                return;
            }

            if (info instanceof Array) {
                this.set_selected(info.map(i =>
                    ({ label: i[this.fieldLabel],
                        value: i[this.fieldValue],
                        readonly: this.readonly ? true : this.test_read_only(i, this.conditionalReadonly),
                    })));
                return;
            }

            if (typeof info === 'string') {
                this.set_selected([{ value: info }]);
                return;
            }

            info.label = '';
            info.value = info[this.fieldValue];
            delete info[this.fieldValue];

            this.set_selected([info]);
        },
        /* start_collection() {
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.form,
                name: this.name,
                info: this.extract_values(this.state.selected),
            });
        },*/
        onChange(val) {
            if (!this.readonly && val) {
                this.$emit('select-change', val);
                this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: this.extract_values(val),
                });
                this.state.selected = val;
            }
        },
        extract_values(infos) {
            if (infos == null) {
                if (this.multi) {
                    return [];
                }
                return null;
            }


            if (infos instanceof Array) {
                if (this.flattenList) {
                    return infos.map(o => o.value);
                }
                return infos.map(o => ({ [this.fieldValue]: o.value }));

                // return infos.map(o => o.value);
                // a l'envoie du formulaire, tous mes fselect était refusé
                // car là ou il attendait un String, il recevait un objet {value: ''}
                // avec cette ligne, les fselect sont acceptés.
            }
            return infos.value;
        },
        translate_options(options) {
            if (this.translatable) {
                return options.map((data) => {
                    if (this.translateThroughHlang) {
                        data.label = this.hlang(data.label);
                    } else {
                        data.label = this.lang(data.label);
                    }
                    return data;
                });
            }
            return options;
        },
        order_options(options) {
            return options;
        },
        format_options(options, direction = 'to') {
            // Direction:
            // to -> to vue-select
            // from -> from vue-select

            if (direction === 'to') {
                return options.map(opt => ({
                    label: opt[this.fieldLabel],
                    value: opt[this.fieldValue],
                    readonly: this.readonly ? true : this.test_read_only(opt, this.conditionalReadonly),
                }));
            }

            return options.map(opt => ({
                [this.fieldLabel]: opt.label,
                [this.fieldValue]: opt.value,
                readonly: this.readonly ? true : this.test_read_only(opt, this.conditionalReadonly),
            }));
        },
        select_default_value() {
            if (this.defaultValue == null) {
                if (this.state.options.length === 0) {
                    return;
                }

                if (this.selectFirstValue) {
                    this.set_selected([this.state.options[0]]);
                } else if (this.selectAllValues && this.multi) {
                    this.set_selected(this.state.options);
                }
            } else if (this.defaultValue instanceof Array) {
                this.state.selected = this.set_selected(this.defaultValue);
            } else {
                this.state.selected = this.set_selected([{ value: this.defaultValue }]);
            }
        },
        setReadonlyValue(selected_readonly) {
            if (selected_readonly instanceof Array) {
                this.state.readonlyValue = selected_readonly.map(s => s.label);
            } else if (this.state.selected_readonly) {
                this.state.readonlyValue = selected_readonly.label;
            } else {
                this.state.readonlyValue = '';
            }
        },
    },
    watch: {
        options() {
            if (!this.prefetchInAjax) {
                this.state.options = this.order_options(this.translate_options(this.format_options(this.options, 'to')));
                this.select_default_value();
            }
        },
        current_state(s) {
            this.dispatch(s, this, this.form);
        },
        selected(s) {
            this.set_selected_readonly(s);
        },
    },
    beforeMount() {
        if (!this.prefetchInAjax) {
            this.state.options = this.order_options(this.translate_options(this.format_options(this.options, 'to')));
        }
    },
    mounted() {
        if (this.prefetchInAjax && this.ajax) {
            let where = {};
            if (this.ajaxFilters.length > 0) {
                where = {
                    $and: this.ajaxFilters,
                };
            }

            const promise = this.$store.dispatch('search', {
                form: this.state.form,
                path: this.ajaxUrl,
                body: {
                    where,
                    projection: [this.fieldLabel, this.fieldValue, this.conditionalReadonly],
                    size: this.searchSize,
                },
            });

            promise.then((res) => {
                const opts = this.order_options(this.translate_options(this.format_options(res.data)));
                this.state.options = opts;
            });
        }
        this.initialize(this.form);
    },
    computed: {
        isHidden() {
            return this.readonly && (!this.state.selected ||
            (this.state.selected instanceof Array && this.state.selected.length === 0));
        },
        readonlyValue() {
            return this.state.readonlyValue;
        },
        current_state() {
            return this.fstate(this.form);
        },
        selected() {
            return this.state.selected;
        },
        dynamic_value() {
            if (this.conditionalReadonly === '') {
                return this.state.selected;
            }
            return this.state.selected_not_readonly;
        },
        getReadonly() {
            return this.readonly || this.state.isConditionalReadonly;
        },
    },
};
