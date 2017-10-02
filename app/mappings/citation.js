module.exports = {
    msw: {
        mappings: {
            citation: {
                dynamic: 'false',
                _meta: {
                    model: 'MSW\\PublicationBundle\\Entity\\Citation',
                },
                dynamic_date_formats: [],
                properties: {
                    commentCollection: {
                        properties: {
                            id: {
                                type: 'integer',
                            },
                        },
                    },
                    createdAt: {
                        type: 'date',
                        format: 'dateOptionalTime',
                    },
                    id: {
                        type: 'keyword',
                    },
                    master: {
                        type: 'keyword',
                    },
                    mswId: {
                        type: 'integer',
                    },
                    publications: {
                        type: 'nested',
                        include_in_parent: true,
                        properties: {
                            abstracts: {
                                type: 'nested',
                                properties: {
                                    content: {
                                        type: 'text',
                                    },
                                    isMaster: {
                                        type: 'boolean',
                                    },
                                    lang: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                },
                            },
                            acceptedDate: {
                                type: 'date',
                                format: 'yyyy||yyyy-MM||yyyy-MM-dd',
                            },
                            acceptedDatePrecision: {
                                type: 'keyword',
                                index: false,
                            },
                            authors: {
                                type: 'nested',
                                include_in_parent: true,
                                properties: {
                                    affiliations: {
                                        type: 'nested',
                                        properties: {
                                            address: {
                                                type: 'text',
                                            },
                                            city: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                            countryCode: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                            id: {
                                                type: 'integer',
                                            },
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'text',
                                            },
                                        },
                                    },
                                    email: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    firstInitial: {
                                        type: 'text',
                                        index: false,
                                    },
                                    firstName: {
                                        type: 'text',
                                    },
                                    fullName: {
                                        type: 'text',
                                        fields: {
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    lastInitial: {
                                        type: 'text',
                                        index: false,
                                    },
                                    lastName: {
                                        type: 'text',
                                        fields: {
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    middleInitial: {
                                        type: 'text',
                                        index: false,
                                    },
                                    middleName: {
                                        type: 'text',
                                    },
                                    mswId: {
                                        type: 'integer',
                                    },
                                    suffix: {
                                        type: 'text',
                                        index: false,
                                    },
                                    user: {
                                        properties: {
                                            id: {
                                                type: 'integer',
                                            },
                                        },
                                    },
                                },
                            },
                            citationIds: {
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
                            claims: {
                                type: 'text',
                                analyzer: 'html_analyzer',
                            },
                            classifications: {
                                type: 'nested',
                                properties: {
                                    type: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    value: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                },
                            },
                            contributors: {
                                type: 'nested',
                                include_in_parent: true,
                                properties: {
                                    affiliations: {
                                        type: 'nested',
                                        properties: {
                                            address: {
                                                type: 'text',
                                            },
                                            city: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                            countryCode: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                            id: {
                                                type: 'integer',
                                            },
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'text',
                                            },
                                        },
                                    },
                                    email: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    firstInitial: {
                                        type: 'text',
                                        index: false,
                                    },
                                    firstName: {
                                        type: 'text',
                                    },
                                    fullName: {
                                        type: 'text',
                                        fields: {
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    lastInitial: {
                                        type: 'text',
                                        index: false,
                                    },
                                    lastName: {
                                        type: 'text',
                                        fields: {
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    middleInitial: {
                                        type: 'text',
                                        index: false,
                                    },
                                    middleName: {
                                        type: 'text',
                                    },
                                    mswId: {
                                        type: 'integer',
                                    },
                                    role: {
                                        type: 'keyword',
                                    },
                                    suffix: {
                                        type: 'text',
                                        index: false,
                                    },
                                    user: {
                                        type: 'nested',
                                        properties: {
                                            id: {
                                                type: 'integer',
                                            },
                                        },
                                    },
                                },
                            },
                            copyright: {
                                properties: {
                                    holder: {
                                        type: 'text',
                                    },
                                    mswId: {
                                        type: 'integer',
                                    },
                                    statement: {
                                        type: 'text',
                                    },
                                    year: {
                                        type: 'date',
                                        format: 'year',
                                    },
                                },
                            },
                            country: {
                                type: 'text',
                            },
                            createdAt: {
                                type: 'date',
                            },
                            dates: {
                                type: 'nested',
                                include_in_parent: true,
                                properties: {
                                    date: {
                                        type: 'date',
                                        format: 'yyyy||yyyy-MM||yyyy-MM-dd',
                                    },
                                    label: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    precision: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    type: {
                                        type: 'text',
                                    },
                                },
                            },
                            defenseDate: {
                                type: 'date',
                                format: 'yyyy||yyyy-MM||yyyy-MM-dd',
                            },
                            defenseDatePrecision: {
                                type: 'keyword',
                                index: false,
                            },
                            description: {
                                type: 'text',
                            },
                            disciplines: {
                                type: 'text',
                            },
                            embargoDate: {
                                type: 'date',
                                format: 'yyyy-MM-dd',
                            },
                            embargoDetails: {
                                type: 'text',
                            },
                            exhaustiveAuthorList: {
                                type: 'boolean',
                            },
                            filingDate: {
                                type: 'date',
                                format: 'yyyy||yyyy-MM||yyyy-MM-dd',
                            },
                            filingDatePrecision: {
                                type: 'keyword',
                                index: false,
                            },
                            firstPage: {
                                type: 'keyword',
                                index: false,
                            },
                            funders: {
                                type: 'nested',
                                properties: {
                                    id: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    location: {
                                        type: 'text',
                                    },
                                    name: {
                                        type: 'text',
                                    },
                                    uri: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                },
                            },
                            id: {
                                type: 'keyword',
                            },
                            institution: {
                                properties: {
                                    countryCode: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    id: {
                                        type: 'integer',
                                    },
                                    name: {
                                        type: 'text',
                                    },
                                },
                            },
                            isbn: {
                                type: 'keyword',
                            },
                            issue: {
                                type: 'keyword',
                                index: false,
                            },
                            journal: {
                                properties: {
                                    abbreviation: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    copyright: {
                                        type: 'text',
                                        index: false,
                                    },
                                    issn: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    journalIds: {
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
                                    mswId: {
                                        type: 'integer',
                                    },
                                    name: {
                                        type: 'text',
                                        fields: {
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    publisher: {
                                        type: 'text',
                                        fields: {
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                            juryMembers: {
                                type: 'nested',
                                properties: {
                                    affiliations: {
                                        type: 'nested',
                                        properties: {
                                            address: {
                                                type: 'text',
                                            },
                                            city: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                            countryCode: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                            id: {
                                                type: 'integer',
                                            },
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'text',
                                            },
                                        },
                                    },
                                    email: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    firstInitial: {
                                        type: 'text',
                                        index: false,
                                    },
                                    firstName: {
                                        type: 'text',
                                    },
                                    fullName: {
                                        type: 'text',
                                        fields: {
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    lastInitial: {
                                        type: 'text',
                                        index: false,
                                    },
                                    lastName: {
                                        type: 'text',
                                        fields: {
                                            name: {
                                                type: 'text',
                                            },
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    middleInitial: {
                                        type: 'text',
                                        index: false,
                                    },
                                    middleName: {
                                        type: 'text',
                                    },
                                    mswId: {
                                        type: 'integer',
                                    },
                                    suffix: {
                                        type: 'text',
                                        index: false,
                                    },
                                    user: {
                                        properties: {
                                            id: {
                                                type: 'integer',
                                            },
                                        },
                                    },
                                },
                            },
                            keywords: {
                                type: 'nested',
                                include_in_parent: true,
                                properties: {
                                    id: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    label: {
                                        type: 'text',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                            title: {
                                                type: 'text',
                                            },
                                        },
                                    },
                                },
                            },
                            lastPage: {
                                type: 'keyword',
                                index: false,
                            },
                            license: {
                                type: 'keyword',
                            },
                            masterDate: {
                                type: 'date',
                                format: 'yyyy||yyyy-MM||yyyy-MM-dd',
                            },
                            masterDatePrecision: {
                                type: 'keyword',
                                index: false,
                            },
                            mswId: {
                                type: 'integer',
                            },
                            origin: {
                                type: 'keyword',
                            },
                            pageCount: {
                                type: 'integer',
                                index: false,
                            },
                            publishedDate: {
                                type: 'date',
                                format: 'yyyy||yyyy-MM||yyyy-MM-dd',
                            },
                            publishedDatePrecision: {
                                type: 'keyword',
                                index: false,
                            },
                            resources: {
                                type: 'nested',
                                include_in_parent: true,
                                properties: {
                                    label: {
                                        type: 'text',
                                        index: false,
                                    },
                                    mswId: {
                                        type: 'integer',
                                    },
                                    type: {
                                        type: 'keyword',
                                    },
                                    url: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                },
                            },
                            source: {
                                type: 'keyword',
                            },
                            subType: {
                                type: 'keyword',
                            },
                            submittedDate: {
                                type: 'date',
                                format: 'yyyy||yyyy-MM||yyyy-MM-dd',
                            },
                            submittedDatePrecision: {
                                type: 'keyword',
                                index: false,
                            },
                            title: {
                                type: 'text',
                                boost: 1.5,
                                term_vector: 'yes',
                                analyzer: 'text_analyzer',
                                search_analyzer: 'search_analyzer',
                            },
                            titles: {
                                type: 'nested',
                                properties: {
                                    content: {
                                        type: 'text',
                                    },
                                    isMaster: {
                                        type: 'boolean',
                                    },
                                    lang: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                },
                            },
                            type: {
                                type: 'keyword',
                            },
                            updatedAt: {
                                type: 'date',
                            },
                            validated: {
                                type: 'keyword',
                            },
                            vendors: {
                                type: 'keyword',
                            },
                            version: {
                                type: 'keyword',
                            },
                            volume: {
                                type: 'keyword',
                                index: false,
                            },
                        },
                    },
                    slug: {
                        type: 'keyword',
                    },
                    updatedAt: {
                        type: 'date',
                        format: 'dateOptionalTime',
                    },
                },
            },
        },
    },
};
