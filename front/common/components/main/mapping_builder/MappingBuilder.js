const LangMixin = require('../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {
                mapping: {
                    mappings: {
                        publication_version: {
                            dynamic: 'strict',
                            dynamic_date_formats: [],
                            properties: {
                                description: {
                                    type: 'text',
                                    index: false,
                                },
                                label: {
                                    type: 'text',
                                    fields: {
                                        raw: {
                                            type: 'keyword',
                                        },
                                    },
                                },
                                system: {
                                    properties: {
                                        locked: {
                                            type: 'boolean',
                                        },
                                        valid: {
                                            type: 'boolean',
                                        },
                                    },
                                },
                                value: {
                                    type: 'keyword',
                                },
                            },
                        },
                    },
                },
            },
        };
    },
};
