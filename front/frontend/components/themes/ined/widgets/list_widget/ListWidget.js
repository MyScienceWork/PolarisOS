const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    props: {
        extraClasses: { required: false, default: '', type: String },
        title: { default: '', type: String },
        boxed: { type: Boolean, default: false },
        type: { type: String, default: 'publication' },
        small: { type: Boolean, default: false },
    },
    data() {
        return {
            state: {
                infos: [
                       { master_content: '<p>Olivier Michalon, Corentin Ribeyre, Marie Candito, Alexis Nasr. <b>Deeper Syntax for Better Semantic Parsing. </b><i>Proceedings of the 26th International Conference on Computational Linguistics (COLING)</i>, <i>Osaka, Japan</i>. <b>2016</b></p>' },
                       { master_content: '<p>Olivier Michalon, Corentin Ribeyre, Marie Candito, Alexis Nasr. <b>Deeper Syntax for Better Semantic Parsing. </b><i>Proceedings of the 26th International Conference on Computational Linguistics (COLING)</i>, <i>Osaka, Japan</i>. <b>2016</b></p>' },
                       { master_content: '<p>Olivier Michalon, Corentin Ribeyre, Marie Candito, Alexis Nasr. <b>Deeper Syntax for Better Semantic Parsing. </b><i>Proceedings of the 26th International Conference on Computational Linguistics (COLING)</i>, <i>Osaka, Japan</i>. <b>2016</b></p>' },
                ],
            },
        };
    },
};
