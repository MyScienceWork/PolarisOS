module.exports = {
    msw: {
        mappings: {
            user: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    created_at: {
                        type: 'date',
                    },
                    emails: {
                        type: 'nested',
                        properties: {
                            email: {
                                type: 'keyword',
                            },
                            master: {
                                type: 'boolean',
                            },
                        },
                    },
                    enabled: {
                        type: 'boolean',
                    },
                    social_ids: {
                        type: 'nested',
                        properties: {
                            type: {
                                type: 'keyword',
                            },
                            value: {
                                type: 'keyword',
                            },
                        },
                    },
                    firstname: {
                        type: 'text',
                        fields: {
                            firstname: {
                                type: 'text',
                                analyzer: 'text_analyzer',
                                search_analyzer: 'search_analyzer',
                            },
                            raw: {
                                type: 'keyword',
                            },
                        },
                        fielddata: true,
                    },
                    fullname: {
                        type: 'text',
                        analyzer: 'text_analyzer',
                        search_analyzer: 'search_analyzer',
                    },
                    lastname: {
                        type: 'text',
                        fields: {
                            lastname: {
                                type: 'text',
                                analyzer: 'text_analyzer',
                                search_analyzer: 'search_analyzer',
                            },
                            raw: {
                                type: 'keyword',
                            },
                        },
                        fielddata: true,
                    },
                    updated_at: {
                        type: 'date',
                    },
                },
            },
        },
    },
};
