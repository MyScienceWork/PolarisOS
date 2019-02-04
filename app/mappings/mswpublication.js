module.exports = {
    msw: {
        mappings: {
            mswpublication: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    id: {
                        type: 'keyword',
                    },
                    master: {
                        type: 'keyword',
                    },
                    state: {
                        type: 'keyword',
                    },
                    version: {
                        type: 'keyword',
                    },
                    volume: {
                        type: 'keyword',
                        index: false,
                    },
                    slug: {
                        type: 'keyword',
                    },
                    description: {
                        type: 'text',
                    },
                    hasBeenMerged: {
                        type: 'boolean',
                    },
                    disciplines: {
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
                    exhaustiveContributorLists: {
                        type: 'nested',
                        properties: {
                            role: {
                                type: 'keyword',
                            },
                            isExhaustiveList: {
                                type: 'boolean',
                            },
                        },
                    },
                    language: {
                        type: 'keyword',
                    },
                    firstPage: {
                        type: 'keyword',
                        index: false,
                    },
                    lastPage: {
                        type: 'keyword',
                        index: false,
                    },
                    pageCount: {
                        type: 'integer',
                        index: false,
                    },
                    license: {
                        type: 'keyword',
                    },
                    source: {
                        type: 'keyword',
                    },
                    publicationType: {
                        type: 'keyword',
                    },
                    publicationSubtype: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    issue: {
                        type: 'keyword',
                        index: false,
                    },
                    copyright: {
                        properties: {
                            holder: {
                                type: 'text',
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
                    institutionContributors: {
                        type: 'nested',
                        properties: {
                            role: {
                                type: 'keyword',
                            },
                            countryCode: {
                                type: 'keyword',
                            },
                            id: {
                                type: 'keyword',
                            },
                            uri: {
                                type: 'keyword',
                                index: false,
                            },
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
                    titles: {
                        type: 'nested',
                        properties: {
                            language: {
                                type: 'keyword',
                            },
                            value: {
                                type: 'text',
                            },
                        },
                    },
                    publicationIds: {
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
                    contributors: {
                        type: 'nested',
                        properties: {
                            contributorIds: {
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
                            firstName: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            middleName: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            lastName: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            fullName: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            role: {
                                type: 'keyword',
                            },
                            suffix: {
                                type: 'text',
                                index: false,
                            },
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
                    publishedDate: {
                        properties: {
                            date: {
                                type: 'date',
                            },
                            precision: {
                                type: 'keyword',
                                index: false,
                            },
                        },
                    },
                    dates: {
                        type: 'nested',
                        properties: {
                            date: {
                                type: 'date',
                            },
                            precision: {
                                type: 'keyword',
                                index: false,
                            },
                            dateType: {
                                type: 'keyword',
                            },
                        },
                    },
                    resources: {
                        type: 'nested',
                        include_in_parent: true,
                        properties: {
                            label: {
                                type: 'text',
                                index: false,
                            },
                            resourceType: {
                                type: 'keyword',
                            },
                            url: {
                                type: 'keyword',
                                index: false,
                            },
                        },
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
                            name: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            publisher: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                        },
                    },
                    hashes: {
                        properties: {
                            hashFunction: {
                                type: 'keyword',
                            },
                            title: {
                                type: 'keyword',
                            },
                            hashedPublication: {
                                type: 'keyword',
                            },
                            parties: {
                                properties: {
                                    affiliations: {
                                        type: 'keyword',
                                    },
                                    identifiers: {
                                        type: 'text',
                                    },
                                    names: {
                                        type: 'keyword',
                                    },
                                    role: {
                                        type: 'keyword',
                                    },
                                },
                                type: 'nested',
                            },
                        },
                        type: 'nested',
                    },
                    keywords: {
                        type: 'nested',
                        properties: {
                            language: {
                                type: 'keyword',
                            },
                            label: {
                                type: 'keyword',
                            },
                            value: {
                                type: 'keyword',
                            },
                        },
                    },
                },
            },
        },
    },
};
