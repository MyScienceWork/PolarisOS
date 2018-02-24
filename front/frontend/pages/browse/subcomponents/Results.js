const LangMixin = require('../../../../common/mixins/LangMixin');
const _ = require('lodash');

module.exports = {
    mixins: [LangMixin],
    props: {
        items: { required: true, type: Array },
        loggedIn: { default: false, type: Boolean },
        user: { required: true, type: Object },
        isSelectable: { default: true, type: Boolean },
        exportSink: { default: 'dummy-export-sink', type: String },
    },
    methods: {
        is_accessable(item) {
            const files = item.files;
            if (!files) {
                return false;
            }

            const file = _.find(files, f => f.is_master) || files[0];
            return file.restricted;
        },
        generate_download_link(item) {
            if (!item.files) {
                return '#';
            }

            if (item.files.length === 0) {
                return '#';
            }

            const file = _.find(item.files, f => f.is_master) || item.files[0];
            return `/download/publication/${item._id}/${file.url}`;
        },
        request_copy() {
            if (this.loggedIn) {
                console.log('email sent');
            } else {
                console.log('open modal');
            }
        },
        can_modify(item) {
            if (!this.loggedIn) {
                return false;
            }

            if (!this.user || !this.user._id) {
                return false;
            }

            return item.depositor === this.user._id;
        },
    },
};
