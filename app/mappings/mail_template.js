module.exports = {
    msw: {
        mappings: {
            mail_template: {
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
                    id: {
                        type: 'keyword',
                    },
                    trigger: {
                        properties: {
                            entity: {
                                type: 'keyword',
                            },
                            matches: {
                                type: 'nested',
                                properties: {
                                    key: {
                                        type: 'keyword',
                                    },
                                    value: {
                                        type: 'keyword',
                                    },
                                    length: {
                                        type: 'integer',
                                    },
                                },
                            },
                        },
                    },
                    subject: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    body: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                },
            },
        },
    },
};
