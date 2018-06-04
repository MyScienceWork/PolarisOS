module.exports = {
    msw: {
        mappings: {
            chart: {
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
                    title: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    subtitle: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    chart: {
                        type: 'keyword',
                    },
                    entity: {
                        type: 'keyword',
                    },
                    format: {
                        properties: {
                            header: {
                                type: 'keyword',
                            },
                            point: {
                                type: 'keyword',
                            },
                            footer: {
                                type: 'keyword',
                            },

                        },
                    },
                    tooltip: {
                        properties: {
                            use_html: {
                                type: 'boolean',
                            },
                            shared: {
                                type: 'boolean',
                            },
                        },
                    },
                    axis: {
                        properties: {
                            x: {
                                properties: {
                                    title: {
                                        type: 'text',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                            y: {
                                properties: {
                                    title: {
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
                    query: {
                        type: 'keyword',
                    },
                    aggregations: {
                        type: 'nested',
                        properties: {
                            name: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },

                            },
                            color: {
                                type: 'keyword',
                            },
                            aggregation: {
                                type: 'keyword',
                            },
                            entity: {
                                type: 'keyword',
                            },
                            field_entity: {
                                type: 'keyword',
                            },
                        },
                    },
                },
            },
        },
    },
};
