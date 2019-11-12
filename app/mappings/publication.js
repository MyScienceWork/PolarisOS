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
                            label: 'author',
                        },
                        conference: 'conference',
                        delivery_institution: 'institution',
                        depositor: 'user',
                        reviewer: 'user',
                        editor: 'editor',
                        classification: {
                            _id: 'classification',
                        },
                        collection: 'collection',
                        keywords: {
                            value: 'keyword',
                        },
                        demovoc_keywords: {
                            value: 'demovoc_keyword',
                        },
                        diffusion: {
                            internal_collection: 'internal_collection',
                            internal_collection2: {
                                _id: 'internal_collection',
                            },
                            surveys: {
                                _id: 'survey',
                            },
                            research_teams: {
                                _id: 'laboratory',
                            },
                            projects: {
                                _id: 'project',
                            },
                            anr_projects: {
                                _id: 'anr_project',
                            },
                            european_projects: {
                                _id: 'european_project',
                            },
                            rights: {
                                license: 'license',
                                access: 'access_level',
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
                                    _id: {
                                        properties: {
                                            fullname: {
                                                analyzer: 'folding',
                                                type: 'text',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                            _id: {
                                                type: 'keyword',
                                            },
                                            lastname: {
                                                type: 'text',
                                                analyzer: 'folding',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                            firstname: {
                                                type: 'text',
                                                analyzer: 'folding',
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
                            book_authors: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        properties: {
                                            fullname: {
                                                analyzer: 'folding',
                                                type: 'text',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                            _id: {
                                                type: 'keyword',
                                            },
                                            lastname: {
                                                type: 'text',
                                                analyzer: 'folding',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                            firstname: {
                                                type: 'text',
                                                analyzer: 'folding',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    role: {
                                        properties: {
                                            abbreviation: {
                                                type: 'text',
                                                analyzer: 'folding',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                            label: {
                                                type: 'text',
                                                analyzer: 'folding',
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
                                    _id: {
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
                                },
                            },
                            contributors: {
                                type: 'nested',
                                properties: {
                                    label: {
                                        properties: {
                                            fullname: {
                                                type: 'text',
                                                analyzer: 'folding',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                            lastname: {
                                                type: 'text',
                                                analyzer: 'folding',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                            firstname: {
                                                type: 'text',
                                                analyzer: 'folding',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    role: {
                                        properties: {
                                            abbreviation: {
                                                type: 'text',
                                                analyzer: 'folding',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                            label: {
                                                type: 'text',
                                                analyzer: 'folding',
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
                            demovoc_keywords: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        properties: {
                                            label: {
                                                type: 'text',
                                                analyzer: 'folding',
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
                            delivery_institution: {
                                type: 'text',
                                analyzer: 'folding',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            depositor: {
                                properties: {
                                    lastname: {
                                        type: 'text',
                                        analyzer: 'folding',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    firstname: {
                                        type: 'text',
                                        analyzer: 'folding',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    _id: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            reviewer: {
                                properties: {
                                    lastname: {
                                        type: 'text',
                                        analyzer: 'folding',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    firstname: {
                                        type: 'text',
                                        analyzer: 'folding',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    _id: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            journal: {
                                type: 'text',
                                analyzer: 'folding',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            conference: {
                                type: 'text',
                                analyzer: 'folding',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            publication_version: {
                                type: 'text',
                                analyzer: 'folding',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            editor: {
                                type: 'text',
                                analyzer: 'folding',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            subtype: {
                                type: 'text',
                                analyzer: 'folding',
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
                                properties: {
                                    label: {
                                        type: 'text',
                                        analyzer: 'folding',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    template: {
                                        type: 'text',
                                        index: false,
                                    },
                                },
                            },
                            localisation: {
                                properties: {
                                    country: {
                                        type: 'text',
                                        analyzer: 'folding',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                            diffusion: {
                                properties: {
                                    internal_collection: {
                                        type: 'text',
                                        analyzer: 'folding',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    internal_collection2: {
                                        type: 'nested',
                                        properties: {
                                            _id: {
                                                properties: {
                                                    label: {
                                                        type: 'text',
                                                        analyzer: 'folding',
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
                                    research_teams: {
                                        type: 'nested',
                                        properties: {
                                            _id: {
                                                properties: {
                                                    name: {
                                                        type: 'text',
                                                        analyzer: 'folding',
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
                                    projects: {
                                        type: 'nested',
                                        properties: {
                                            _id: {
                                                properties: {
                                                    name: {
                                                        type: 'text',
                                                        analyzer: 'folding',
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
                                    anr_projects: {
                                        type: 'nested',
                                        properties: {
                                            _id: {
                                                properties: {
                                                    name: {
                                                        type: 'text',
                                                        analyzer: 'folding',
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
                                    european_projects: {
                                        type: 'nested',
                                        properties: {
                                            _id: {
                                                properties: {
                                                    name: {
                                                        type: 'text',
                                                        analyzer: 'folding',
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
                                    surveys: {
                                        type: 'nested',
                                        properties: {
                                            _id: {
                                                properties: {
                                                    name: {
                                                        type: 'text',
                                                        analyzer: 'folding',
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
                                    rights: {
                                        properties: {
                                            license: {
                                                type: 'text',
                                                analyzer: 'folding',
                                                fields: {
                                                    raw: {
                                                        type: 'keyword',
                                                    },
                                                },
                                            },
                                            access: {
                                                type: 'text',
                                                analyzer: 'folding',
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
                                analyzer: 'folding',
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
                    book_authors: {
                        type: 'nested',
                        properties: {
                            _id: {
                                type: 'keyword',
                            },
                            role: {
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
                                analyzer: 'folding',
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
                            production: {
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
                            internal_collection2: {
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
                            anr_projects: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            european_projects: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            research_teams: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        type: 'keyword',
                                    },
                                },
                            },
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
                            size: {
                                type: 'float',
                            },
                            access: {
                                properties: {
                                    restricted: {
                                        type: 'boolean',
                                    },
                                    confidential: {
                                        type: 'boolean',
                                    },
                                    delayed: {
                                        type: 'boolean',
                                    },
                                },
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
                    newspaper: {
                        type: 'text',
                        analyzer: 'folding',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
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
                    demovoc_keywords: {
                        type: 'nested',
                        properties: {
                            _id: {
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
                    parents: {
                        type: 'nested',
                        properties: {
                            _id: {
                                type: 'keyword',
                            },
                        },
                    },
                    publication_title: {
                        type: 'text',
                        analyzer: 'folding',
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
                                analyzer: 'folding',
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
                                analyzer: 'folding',
                                fields: {
                                    raw: { type: 'keyword' },
                                },
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
                                analyzer: 'folding',
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
                    has_other_version: {
                        type: 'boolean',
                    },
                    volume: {
                        type: 'keyword',
                    },
                    url: {
                        type: 'keyword',
                    },
                    depositor: {
                        type: 'keyword',
                    },
                    reviewer: {
                        type: 'keyword',
                    },
                    duration: {
                        type: 'integer',
                    },
                    system: {
                        properties: {
                            depositor_comment: {
                                type: 'text',
                            },
                            emails: {
                                type: 'nested',
                                properties: {
                                    body: {
                                        type: 'text',
                                        index: false,
                                    },
                                    reviewer: {
                                        type: 'keyword',
                                    },
                                    created_at: {
                                        type: 'date',
                                    },
                                    sent: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            stats: {
                                properties: {
                                    views: {
                                        type: 'long',
                                    },
                                    downloads: {
                                        type: 'long',
                                    },
                                },
                            },
                            api: {
                                properties: {
                                    handle: {
                                        type: 'boolean',
                                    },
                                    hal: {
                                        type: 'boolean',
                                    },
                                    hal_id: {
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
};
