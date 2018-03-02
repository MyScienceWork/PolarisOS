module.exports = {
    msw: {
        settings: {
            index: {
                mapper: {
                    dynamic: false,
                },
            },
            analysis: {
                filter: {
                    msw_snowball: {
                        type: 'snowball',
                        language: 'English',
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
                    msw_word_delimiter: {
                        type: 'word_delimiter',
                    },
                    text_ngram: {
                        type: 'nGram',
                        min_gram: '2',
                        max_gram: '6',
                    },
                    msw_stopwords_english: {
                        type: 'stop',
                        stopwords: '_english_',
                    },
                    msw_asciifolding: {
                        type: 'asciifolding',
                    },
                },
                char_filter: {
                    omitted_element: {
                        pattern: '\\[omitted <code>\\w+</code> element\\]',
                        type: 'pattern_replace',
                        replacement: ' ',
                    },
                },
                analyzer: {
                    html_analyzer: {
                        filter: [
                            'standard',
                            'lowercase',
                            'stop',
                        ],
                        char_filter: [
                            'omitted_element',
                            'html_strip',
                        ],
                        type: 'custom',
                        tokenizer: 'standard',
                    },
                    raw_analyzer: {
                        filter: [
                            'msw_asciifolding',
                            'lowercase',
                            'text_ngram',
                        ],
                        type: 'custom',
                        tokenizer: 'standard',
                    },
                    raw_search_analyzer: {
                        filter: [
                            'standard',
                            'lowercase',
                            'msw_asciifolding',
                            'msw_word_delimiter',
                            'msw_stopwords_english',
                        ],
                        type: 'custom',
                        stopwords: '_none_',
                        tokenizer: 'standard',
                    },
                    search_analyzer: {
                        filter: [
                            'standard',
                            'lowercase',
                            'msw_asciifolding',
                            'msw_word_delimiter',
                            'msw_elision',
                            'msw_stopwords_english',
                        ],
                        type: 'custom',
                        stopwords: '_english_',
                        tokenizer: 'standard',
                    },
                    text_analyzer: {
                        filter: [
                            'standard',
                            'lowercase',
                            'msw_asciifolding',
                            'msw_word_delimiter',
                            'msw_elision',
                            'msw_stopwords_english',
                        ],
                        type: 'custom',
                        stopwords: '_english_',
                        tokenizer: 'msw_ngram_tokenizer',
                    },
                },
                tokenizer: {
                    msw_ngram_tokenizer: {
                        token_chars: [
                            'letter',
                            'digit',
                        ],
                        min_gram: '2',
                        type: 'edgeNGram',
                        max_gram: '50',
                    },
                },
            },
        },
    },
};
