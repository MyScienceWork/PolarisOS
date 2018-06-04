const schema = {
    mappings: {
        publication: {
            dynamic: 'strict',
            dynamic_date_formats: [],
            _meta: {
                refs: {
                    type: 'typology',
                    journal: 'journal',
                    conference: 'conference',
                    authors: {
                        _id: 'author',
                    },
                    contributors: {
                        _id: 'contributor',
                    },
                    editor: 'editor',
                    classification: {
                        _id: 'classification',
                    },
                    collection: 'collection',
                    internal_collection: 'internal_collection',
                    keywords: {
                        value: 'keyword',
                    },
                    diffusion: {
                        surveys: {
                            _id: 'survey',
                        },
                        projects: {
                            _id: 'project',
                        },
                        rights: {
                            license: 'license',
                            access: 'publication_access',
                        },
                    },
                    publication_version: 'publication_version',
                },
            },
            properties: {
                titles: {
                    type: 'nested',
                    properties: {
                        content: {
                            type: 'text',
                        },
                        lang: {
                            type: 'keyword',
                        },
                    },
                },
                translated_titles: {
                    type: 'nested',
                    properties: {
                        content: {
                            type: 'text',
                        },
                        lang: {
                            type: 'keyword',
                        },
                    },
                },
                subtitles: {
                    type: 'nested',
                    properties: {
                        content: {
                            type: 'text',
                        },
                        lang: {
                            type: 'keyword',
                        },
                    },
                },
                abstracts: {
                    type: 'nested',
                    properties: {
                        content: {
                            type: 'text',
                        },
                        lang: {
                            type: 'keyword',
                        },
                    },
                },
                lang: {
                    type: 'keyword',
                },
                type: {
                    type: 'keyword',
                },
                publication_title: {
                    type: 'text',
                },
                journal: {
                    type: 'keyword',
                },
                conference: {
                    type: 'keyword',
                },
                authors: {
                    type: 'nested',
                    properties: {
                        _id: {
                            type: 'keyword',
                        },
                    },
                },
                contributors: {
                    type: 'nested',
                    properties: {
                        _id: {
                            type: 'keyword',
                        },
                    },
                },
                dates: {
                    properties: {
                        publication: {
                            type: 'date',
                        },
                        creation: {
                            type: 'date',
                        },
                        update: {
                            type: 'date',
                        },
                        deposit: {
                            type: 'date',
                        },
                    },
                },
                editor: {
                    type: 'keyword',
                },
                delivery_institution: {
                    type: 'keyword',
                },
                classifications: {
                    type: 'nested',
                    properties: {
                        type: {
                            type: 'keyword',
                        },
                        _id: {
                            type: 'keyword',
                        },
                    },
                },
                ids: {
                    type: 'nested',
                    properties: {
                        type: {
                            type: 'keyword',
                        },
                        _id: {
                            type: 'keyword',
                        },
                    },
                },
                volume: {
                    type: 'keyword',
                },
                number: {
                    type: 'keyword',
                },
                pagination: {
                    type: 'keyword',
                },
                collection: {
                    type: 'keyword',
                },
                description: {
                    type: 'text',
                },
                keywords: {
                    type: 'nested',
                    properties: {
                        type: {
                            type: 'keyword',
                        },
                        value: {
                            type: 'keyword',
                        },
                        lang: {
                            type: 'keyword',
                        },
                    },
                },
                resources: {
                    type: 'nested',
                    properties: {
                        type: {
                            type: 'keyword',
                        },
                        url: {
                            type: 'keyword',
                        },
                        description: {
                            type: 'text',
                        },
                    },
                },
                sources: {
                    type: 'nested',
                    properties: {
                        _id: {
                            type: 'keyword',
                        },
                    },
                },
                files: {
                    type: 'nested',
                    properties: {
                        url: {
                            type: 'keyword',
                        },
                        is_master: {
                            type: 'boolean',
                        },
                        name: {
                            type: 'keyword',
                        },
                        format: {
                            type: 'keyword',
                        },
                    },
                },
                diffusion: {
                    properties: {
                        surveys: {
                            type: 'nested',
                            properties: {
                                _id: {
                                    type: 'keyword',
                                },
                            },
                        },
                        projects: {
                            type: 'nested',
                            properties: {
                                _id: {
                                    type: 'keyword',
                                },
                            },
                        },
                        research_team: {
                            properties: {
                                _id: {
                                    type: 'keyword',
                                },
                            },
                        },
                        internal_collection: {
                            properties: {
                                _id: {
                                    type: 'keyword',
                                },
                            },
                        },
                        rights: {
                            properties: {
                                license: {
                                    type: 'keyword',
                                },
                                comment: {
                                    type: 'text',
                                },
                                access: {
                                    type: 'keyword',
                                },
                                embargo: {
                                    type: 'date',
                                },
                                exports: {
                                    properties: {
                                        nowhere: {
                                            type: 'boolean',
                                        },
                                        website: {
                                            type: 'boolean',
                                        },
                                        hal: {
                                            type: 'boolean',
                                        },
                                        openaire: {
                                            type: 'boolean',
                                        },
                                        repec: {
                                            type: 'boolean',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                publication_version: {
                    type: 'keyword',
                },
                version: {
                    type: 'integer',
                },
                parent: {
                    type: 'keyword',
                },
            },
        },
    },
};

console.log(JSON.stringify(schema));
