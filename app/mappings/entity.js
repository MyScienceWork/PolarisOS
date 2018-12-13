module.exports = {
    msw: {
        mappings: {
            entity: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                _meta: {
                    refs: {
                        form: 'form',
                        pipeline: 'pipeline',
                    },
                },
                properties: {
                    type: {
                        type: 'keyword',
                    },
                    form: {
                        type: 'keyword',
                    },
                    pipeline: {
                        type: 'keyword',
                    },
                    search_query: {
                        type: 'keyword',
                    },
                    pipelines: {
                        type: 'nested',
                        properties: {
                            _id: { type: 'keyword' },
                        },
                    },
                    backoffice: {
                        properties: {
                            columns: {
                                type: 'nested',
                                properties: {
                                    field: {
                                        type: 'keyword',
                                    },
                                    title: {
                                        type: 'keyword',
                                    },
                                    sort: {
                                        type: 'keyword',
                                    },
                                    sortable: {
                                        type: 'boolean',
                                    },
                                    centered: {
                                        type: 'boolean',
                                    },
                                    force: {
                                        type: 'boolean',
                                    },
                                    is_tag: {
                                        type: 'boolean',
                                    },
                                    tag_class: {
                                        type: 'keyword',
                                    },
                                    truncate: {
                                        type: 'integer',
                                    },
                                    translate: {
                                        type: 'boolean',
                                    },
                                    show_lang_key: {
                                        type: 'boolean',
                                    },
                                    date_field: {
                                        properties: {
                                            enabled: { type: 'boolean' },
                                            format: { type: 'keyword' },
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
