const APIRoutes = require('../api/routes');
const _ = require('lodash');

module.exports = {
    mixins: [],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        author: 'author_read',
                    },
                },
                paths: {
                    reads: {
                        author: APIRoutes.entity('author', 'POST', true),
                    },
                },
            },
        };
    },
    methods: {
        filter_ined_profile_links(html) {
            const authors = this.fcontent(this.state.sinks.reads.author);

            const list_contrib_without_link = html.split(/<\/?a(?:(?= )[^>]*)?>/);
            const list_contrib_with_link = html.split(/(<\/?a(?:(?= )[^>]*)?>.+?<\/?a(?:(?= )[^>]*)?>)/);
            const regex_match_href_link = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;

            const reprocessed_html = list_contrib_with_link.map((contrib, index) => {
                if (contrib === '') {
                    return list_contrib_without_link[index];
                }
                if (contrib[0] !== '<' || contrib[1] !== 'a' || contrib[3] !== 'h' || !(authors instanceof Array)) {
                    return list_contrib_without_link[index];
                }
                const link = contrib.match ( regex_match_href_link )[2];
                const id_author = link.split ( '/' )[2];

                const idx = _.findIndex(authors, author => author._id === id_author);
                if (idx !== -1 && authors[idx].is_ined === true) {
                    return list_contrib_with_link[index];
                }
                return list_contrib_without_link[index];
            });

            return reprocessed_html.join('');
        }
    },
    watch: {
    },
    computed: {
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.author,
            path: this.state.paths.reads.author,
            body: {
                where: {'is_ined': true},
                size: 10000,
            },
        });
    },
};
