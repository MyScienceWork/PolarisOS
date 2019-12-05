module.exports = {
    msw: {
        settings: {
            analysis: {
                filter: {
                    french_elision: {
                        type: 'elision',
                        articles_case: true,
                        articles: [
                            'l', 'm', 't', 'qu', 'n', 's',
                            'j', 'd', 'c', 'jusqu', 'quoiqu',
                            'lorsqu', 'puisqu',
                        ],
                    },
                },
                analyzer: {
                    folding: {
                        tokenizer: 'standard',
                        filter: ['french_elision', 'lowercase', 'asciifolding'],
                    },
                },
            },
        },
    },
};
