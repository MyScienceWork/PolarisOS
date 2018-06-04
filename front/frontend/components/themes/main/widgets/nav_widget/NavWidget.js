const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    data() {
        return {
            state: {
                navigation: [
                    {
                        type: 'authors',
                        text: 'f_browse_by_author',
                        indexer: 'alpha',
                        select: true,
                        template: 'author-template',
                        item_per_row: 3,
                    },
                    {
                        type: 'years',
                        text: 'f_browse_by_year',
                        indexer: undefined,
                        select: true,
                        template: undefined,
                    },
                    {
                        type: 'types',
                        text: 'f_browse_by_type',
                        indexer: undefined,
                        select: true,
                        template: undefined,
                    },
                ],
            },
        };
    },
    methods: {
    },
};
