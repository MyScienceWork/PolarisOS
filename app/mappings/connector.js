module.exports = {
    msw: {
        mappings: {
            dynamic: 'strict',
            dynamic_date_formats: [],
            _meta: {
            },
            properties: {
                name: {
                    type: 'text',
                    fields: {
                        raw: {
                            type: 'keyword',
                        },
                    },
                },
                api: {
                    properties: {
                        protocol: { type: 'keyword' },
                        hostname: { type: 'keyword' },
                        port: { type: 'integer' },
                        pathname: { type: 'keyword' },
                        search: { type: 'keyword' },
                        type: { type: 'keyword' },
                        params: {
                            type: 'nested',
                            properties: {
                                key: {
                                    type: 'keyword',
                                },
                                value: {
                                    type: 'text',
                                },
                            },
                        },
                        headers: {
                            type: 'nested',
                            properties: {
                                key: {
                                    type: 'keyword',
                                },
                                value: {
                                    type: 'text',
                                },
                            },
                        },
                        authorization: {
                            properties: {
                                enabled: { type: 'boolean' },
                                key: { type: 'keyword' },
                                secret: { type: 'keyword' },
                                template: { type: 'text' },
                            },
                        },
                        signature: {
                            properties: {
                                enabled: { type: 'boolean' },
                                template: { type: 'text' },
                                method: { type: 'keyword' },
                            },
                        },
                        timestamp: {
                            properties: {
                                enabled: { type: 'boolean' },
                                format: { type: 'keyword' },
                                name: { type: 'keyword' },
                            },
                        },
                    },
                },
            },
        },
    },
};
