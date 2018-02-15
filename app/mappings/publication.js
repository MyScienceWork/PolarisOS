module.exports = {
    msw: {
        mappings: {
            publication: {
                dynamic: 'strict',
                _meta: {
                    refs: {
                        type: 'typology',
                        journal: 'journal',
                        authors: {
                            _id: 'author',
                        },
                        contributors: {
                            _id: 'contributor',
                        },
                        conference: 'conference',
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
                        localisation: {
                            country: 'country',
                        },
                    },
                },
                dynamic_date_formats: [],
                properties: {
                    denormalization: {
                        properties: {
                            type: {
                                properties: {
                                    label: {
                                        type: 'text',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                            authors: {
                                type: 'nested',
                                properties: {
                                    fullname: {
                                        type: 'text',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    affiliations: {
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
                                            ined_status: {
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
                            classifications: {
                                type: 'nested',
                                properties: {
                                    label: {
                                        type: 'text',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                            contributors: {
                                type: 'nested',
                                properties: {
                                    fullname: {
                                        type: 'text',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                            journal: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            subtype: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            template: {
                                type: 'text',
                            },
                            type: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            diffusion: {
                                properties: {
                                    internal_collection: {
                                        type: 'text',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    research_team: {
                                        type: 'text',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    projects: {
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
                                        },
                                    },
                                    surveys: {
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
                                        },
                                    },
                                    rights: {
                                        properties: {
                                            license: {
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
                    authors: {
                        type: 'nested',
                        properties: {
                            _id: {
                                type: 'keyword',
                            },
                        },
                    },
                    classifications: {
                        type: 'nested',
                        properties: {
                            _id: {
                                type: 'keyword',
                            },
                            type: {
                                type: 'keyword',
                            },
                        },
                    },
                    collection: {
                        type: 'keyword',
                    },
                    conference: {
                        type: 'keyword',
                    },
                    contributors: {
                        type: 'nested',
                        properties: {
                            label: {
                                type: 'text',
                                fields: {
                                    raw: { type: 'keyword' },
                                },
                            },
                            role: {
                                type: 'keyword',
                            },
                        },
                    },
                    dates: {
                        properties: {
                            creation: {
                                type: 'date',
                            },
                            deposit: {
                                type: 'date',
                            },
                            end: {
                                type: 'date',
                            },
                            publication: {
                                type: 'date',
                            },
                            start: {
                                type: 'date',
                            },
                            update: {
                                type: 'date',
                            },
                        },
                    },
                    delivery_institution: {
                        type: 'keyword',
                    },
                    description: {
                        type: 'text',
                    },
                    diffusion: {
                        properties: {
                            internal_collection: { type: 'keyword' },
                            projects: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            research_team: { type: 'keyword' },
                            rights: {
                                properties: {
                                    access: {
                                        type: 'keyword',
                                    },
                                    comment: {
                                        type: 'text',
                                    },
                                    embargo: {
                                        type: 'date',
                                    },
                                    exports: {
                                        properties: {
                                            hal: {
                                                type: 'boolean',
                                            },
                                            nowhere: {
                                                type: 'boolean',
                                            },
                                            openaire: {
                                                type: 'boolean',
                                            },
                                            repec: {
                                                type: 'boolean',
                                            },
                                            website: {
                                                type: 'boolean',
                                            },
                                        },
                                    },
                                    license: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            surveys: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        type: 'keyword',
                                    },
                                },
                            },
                        },
                    },
                    editor: {
                        type: 'keyword',
                    },
                    files: {
                        type: 'nested',
                        properties: {
                            format: {
                                type: 'keyword',
                            },
                            is_master: {
                                type: 'boolean',
                            },
                            name: {
                                type: 'keyword',
                            },
                            url: {
                                type: 'keyword',
                            },
                        },
                    },
                    ids: {
                        type: 'nested',
                        properties: {
                            _id: {
                                type: 'keyword',
                            },
                            type: {
                                type: 'keyword',
                            },
                        },
                    },
                    journal: {
                        type: 'keyword',
                    },
                    keywords: {
                        type: 'nested',
                        properties: {
                            lang: {
                                type: 'keyword',
                            },
                            type: {
                                type: 'keyword',
                            },
                            value: {
                                type: 'keyword',
                            },
                        },
                    },
                    lang: {
                        type: 'keyword',
                    },
                    localisation: {
                        properties: {
                            city: {
                                type: 'text',
                            },
                            country: {
                                type: 'keyword',
                            },
                        },
                    },
                    number: {
                        type: 'keyword',
                    },
                    pagination: {
                        type: 'keyword',
                    },
                    parent: {
                        type: 'keyword',
                    },
                    publication_title: {
                        type: 'text',
                    },
                    publication_version: {
                        type: 'keyword',
                    },
                    resources: {
                        type: 'nested',
                        properties: {
                            description: {
                                type: 'text',
                            },
                            type: {
                                type: 'keyword',
                            },
                            url: {
                                type: 'keyword',
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
                    status: {
                        type: 'keyword',
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
                    title: {
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
                    type: {
                        type: 'keyword',
                    },
                    subtype: {
                        type: 'keyword',
                    },
                    version: {
                        type: 'integer',
                    },
                    volume: {
                        type: 'keyword',
                    },
                    url: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
