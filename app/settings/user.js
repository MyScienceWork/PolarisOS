module.exports = {
    msw: {
        settings: {
            index: {
                mapper: {
                    dynamic: false,
                },
            },
            analysis: {
                analyzer: {
                    text_analyzer: {
                        type: 'custom',
                        tokenizer: 'msw_ngram_tokenizer',
                        stopwords: '_english_',
                        filter: [
                            'standard',
                            'lowercase',
                            'msw_asciifolding',
                            'msw_word_delimiter',
                            'msw_elision',
                            'msw_stopwords_english',
                        ],
                    },
                    raw_analyzer: {
                        type: 'custom',
                        tokenizer: 'standard',
                        filter: [
                            'msw_asciifolding',
                            'lowercase',
                            'text_ngram',
                        ],
                    },
                    search_analyzer: {
                        type: 'custom',
                        tokenizer: 'standard',
                        stopwords: '_english_',
                        filter: [
                            'standard',
                            'lowercase',
                            'msw_asciifolding',
                            'msw_word_delimiter',
                            'msw_elision',
                            'msw_stopwords_english',
                        ],
                    },
                    raw_search_analyzer: {
                        type: 'custom',
                        tokenizer: 'standard',
                        stopwords: '_none_',
                        filter: [
                            'standard',
                            'lowercase',
                            'msw_asciifolding',
                            'msw_word_delimiter',
                            'msw_stopwords_english',
                        ],
                    },
                    html_analyzer: {
                        char_filter: [
                            'omitted_element',
                            'html_strip',
                        ],
                        filter: [
                            'standard',
                            'lowercase',
                            'stop',
                        ],
                        tokenizer: 'standard',
                        type: 'custom',
                    },
                },
                tokenizer: {
                    msw_ngram_tokenizer: {
                        type: 'edgeNGram',
                        min_gram: 2,
                        max_gram: 50,
                        token_chars: [
                            'letter',
                            'digit',
                        ],
                    },
                },
                filter: {
                    text_ngram: {
                        type: 'nGram',
                        min_gram: 2,
                        max_gram: 6,
                    },
                    msw_asciifolding: {
                        type: 'asciifolding',
                    },
                    msw_snowball: {
                        type: 'snowball',
                        language: 'English',
                    },
                    msw_word_delimiter: {
                        type: 'word_delimiter',
                    },
                    msw_elision: {
                        type: 'elision',
                        articles: [
                            'l',
                            'm',
                            't',
                            'qu',
                            'n',
                            's',
                            'j',
                        ],
                    },
                    msw_stopwords_english: {
                        type: 'stop',
                        stopwords: '_english_',
                    },
                },
                char_filter: {
                    omitted_element: {
                        type: 'pattern_replace',
                        pattern: '\\[omitted <code>\\w+</code> element\\]',
                        replacement: ' ',
                    },
                },
            },
        },
    },
};
