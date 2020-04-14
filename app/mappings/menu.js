module.exports = {
    msw: {
        mappings: {
            dynamic: 'strict',
            dynamic_date_formats: [],
            properties: {
                name: {
                    type: 'text',
                    fields: {
                        raw: {
                            type: 'keyword',
                        },
                    },
                },
                part: {
                    type: 'keyword',
                },
                elements: {
                    type: 'nested',
                    properties: {
                        name: {
                            type: 'keyword',
                        },
                        icon: {
                            type: 'keyword',
                        },
                        page: {
                            type: 'keyword',
                        },
                        query: {
                            type: 'keyword',
                        },
                        roles: {
                            type: 'nested',
                            properties: {
                                _id: {
                                    type: 'keyword',
                                },
                            },
                        },
                        submenus: {
                            type: 'nested',
                            properties: {
                                name: {
                                    type: 'keyword',
                                },
                                icon: {
                                    type: 'keyword',
                                },
                                page: {
                                    type: 'keyword',
                                },
                                query: {
                                    type: 'keyword',
                                },
                                roles: {
                                    type: 'nested',
                                    properties: {
                                        _id: {
                                            type: 'keyword',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
