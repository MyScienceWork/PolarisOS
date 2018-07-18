module.exports = {
    msw: {
        mappings: {
            tracking_stat: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    date: {
                        type: 'date',
                    },
                    eid: {
                        type: 'keyword',
                    },
                    entity_type: {
                        type: 'keyword',
                    },
                    stat_type: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
