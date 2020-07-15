const _ = require('lodash');
const APIRoutes = require('../../common/api/routes');
const FormMixin = require('../../common/mixins/FormMixin');

module.exports = {
    mixins: [FormMixin],
    data() {
        return {
            state: {
                selected_files: {
                },
            },
        };
    },
    methods: {
        generate_download_link(status, generic = false) {
            const files = this.content_item.files || [];
            if (files.length === 0) {
                return '#';
            }

            if (status === 'master') {
                const file = _.find(files, f => f.is_master) || files[0];
                return `/${generic ? 'gdownload' : 'download'}/publication/${this.content_item._id}/${file.url}`;
            } else if (status === 'all') {
                return '#';
            }
            return '#';
        },
        select_all_extra_files(s) {
            this.$lodash.forEach(this.state.selected_files, (f) => {
                f.s = s;
            });
        },
        generate_preview_link(status) {
            const files = this.content_item.files || [];
            if (files.length === 0) {
                return null;
            }

            if (status === 'master') {
                const file = _.find(files, f => f.is_master) || files[0];
                if (file.preview_url) {
                    return `/download/${file.preview_url}`;
                }
                return null;
            }
            return null;
        },
        generate_viewer_link(status) {
            const files = this.content_item.files || [];
            if (files.length === 0) {
                return null;
            }

            if (status === 'master') {
                const file = _.find(files, f => f.is_master) || files[0];
                const legitMimeType = ['pdf', 'odp', 'odt', 'ods'].find(ext => file.url.endsWith(ext));
                if (!legitMimeType) {
                    return null;
                }
                return `/public/front/3rdparty/ViewerJS/index.html#${this.generate_download_link('master', true)}`;
            }
            return null;
        },
    },
    computed: {
        is_all_extra_files_selected() {
            return this.$lodash.every(this.state.selected_files, f => f.s);
        },
        last_version_link() {
            const content = this.fcontent(this.state.sinks.reads.last_version) || [];
            if (!(content instanceof Array) || content.length === 0) {
                return null;
            }
            return `/view/${content[0]._id}`;
        },
        multi_download_link() {
            const names = this.$lodash.reduce(this.state.selected_files, (arr, f) => {
                if (f.s) {
                    arr.push(f.name);
                }
                return arr;
            }, []);

            const filenames = this.$lodash.reduce(this.state.selected_files, (arr, f) => {
                if (f.s) {
                    arr.push(f.url);
                }
                return arr;
            }, []);

            if (!this.content_item || names.length === 0 || filenames.length === 0) {
                return '#';
            }

            return APIRoutes.multi_download('publication', this.content_item._id, names, filenames);
        },
    }
};
