const moment = require('moment');
const _ = require('lodash');
const VSelect = require('vue-select').VueSelect;
const InputMixin = require('../../mixins/InputMixin');
const Utils = require('../../../../../utils/utils');
const Messages = require('../../../../../api/messages');
const LangMixin = require('../../../../../mixins/LangMixin');
const ASCIIFolder = require('fold-to-ascii');

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
    },
    components: {
        'v-select': VSelect,
    },
    mixins: [InputMixin, LangMixin],
    data() {
        return {
            state: {
                selected: null,
                options: [],
                showHelpModal: false,
                form: `${this.name}_${+moment()}`,
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
                        projection: [this.fieldLabel, this.fieldValue],
                        size: values.length,
                    },
                });
                console.log('fetch selected values', this.state.options);
                promise.then((res) => {
                    const opts = this.translate_options(this.format_options(res.data));
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
        search: _.debounce((loading, search, self) => {
            const body = {
                projection: [self.fieldLabel, self.fieldValue],
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
                    self.state.options = self.translate_options(self.format_options(self.merge_options_and_selected(selected, res.data), 'to'));
                } else {
                    self.state.options = self.translate_options(self.format_options(res.data, 'to'));
                }
            });
        }, 350),
        toggleHelpModal(e) {
            e.preventDefault();
            if (this.modal_help) {
                this.state.showHelpModal = !this.state.showHelpModal;
            }
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
                this.select_default_value();
                return;
            }

            if (info instanceof Array) {
                this.set_selected(info.map(i =>
                    ({ label: i[this.fieldLabel], value: i[this.fieldValue] })));
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
            if (!this.readonly) {
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
        format_options(options, direction = 'to') {
            // Direction:
            // to -> to vue-select
            // from -> from vue-select
            if (direction === 'to') {
                return options.map(opt => ({
                    label: opt[this.fieldLabel],
                    value: opt[this.fieldValue],
                }));
            }

            return options.map(opt => ({
                [this.fieldLabel]: opt.label,
                [this.fieldValue]: opt.value,
            }));
        },
        select_default_value() {
            if (this.defaultValue == null) {
                if (this.state.options.length === 0) {
                    this.state.selected = null;
                    return;
                }

                if (this.selectFirstValue) {
                    this.set_selected([this.state.options[0]]);
                } else if (this.selectAllValues && this.multi) {
                    this.set_selected(this.state.options);
                } else {
                    this.state.selected = null;
                }
            } else if (this.defaultValue instanceof Array) {
                this.state.selected = this.set_selected(this.defaultValue);
            } else {
                this.state.selected = this.set_selected([{ value: this.defaultValue }]);
            }
        },
    },
    watch: {
        options() {
            if (!this.prefetchInAjax) {
                this.state.options = this.translate_options(this.format_options(this.options, 'to'));
                this.select_default_value();
            }
        },
        current_state(s) {
            this.dispatch(s, this, this.form);
        },
    },
    beforeMount() {
        if (!this.prefetchInAjax) {
            this.state.options = this.translate_options(this.format_options(this.options, 'to'));
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
                    projection: [this.fieldLabel, this.fieldValue],
                    size: this.searchSize,
                },
            });

            promise.then((res) => {
                const opts = this.translate_options(this.format_options(res.data));
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
            if (this.state.selected instanceof Array) {
                return this.state.selected.map(s => s.label);
            }
            return this.state.selected ? this.state.selected.label : '';
        },
        current_state() {
            return this.fstate(this.form);
        },
    },
};
