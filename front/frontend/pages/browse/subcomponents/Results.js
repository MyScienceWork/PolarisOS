const LangMixin = require('../../../../common/mixins/LangMixin');
const BrowserUtils = require('../../../../common/utils/browser');
const _ = require('lodash');
const moment = require('moment');
const CopyRequester = require('../../view/subcomponents/CopyRequester.vue');

module.exports = {
    mixins: [LangMixin],
    props: {
        items: { required: true, type: Array },
        loggedIn: { default: false, type: Boolean },
        user: { required: true, type: Object },
        isSelectable: { default: true, type: Boolean },
        exportSink: { default: 'dummy-export-sink', type: String },
    },
    data() {
        return {
            state: {
                copyRequest: false,
            },
        };
    },
    components: {
        CopyRequester,
    },
    methods: {
        is_accessable(item) {
            const files = item.files;
            if (!files) {
                return false;
            }

            const file = _.find(files, f => f.is_master) || files[0];
            return !file.access.restricted
                || (file.access.delayed && +moment(item.diffusion.rights.embargo) < +moment());
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
            this.state.copyRequest = !this.state.copyRequest;
        },
        can_modify(item) {
            if (!this.loggedIn) {
                return false;
            }

            if (!this.user || !this.user._id) {
                return false;
            }

            return item.depositor === this.user._id || item.contributors.filter(c => c.label === this.user.author).length > 0;
        },
    },
    computed: {
        host() {
            return BrowserUtils.getURLHost(window.location);
        },
    },
};
