function sort_with_type_and_subtype(types, subtypes, direction = 'asc') {
    return [
        {
            _script: {
                type: 'string',
                script: {
                    lang: 'painless',
                    inline: "params.mapping[doc['type'].value]",
                    params: {
                        mapping: types,
                    },
                },
                order: direction,
            },
        },
        {
            _script: {
                type: 'string',
                script: {
                    lang: 'painless',
                    inline: "if(!doc.containsKey('subtype') || doc['subtype'].empty) { return '0' } else {return params.mapping[doc['subtype'].value] }",
                    params: {
                        mapping: subtypes,
                    },
                },
                order: direction,
            },
        },
    ];
}

module.exports = {
    sort_with_type_and_subtype,
};
