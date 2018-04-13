const publication_search = {
    $or: [
        { 'title.content': '{{search}}' },
        { 'subtitles.content': '{{search}}' },
        { 'translated_titles.content': '{{search}}' },
        { 'abstracts.content': '{{search}}' },
        { 'denormalization.authors._id.fullname': '{{search}}' },
        { 'denormalization.classifications._id.label': '{{search}}' },
        { 'denormalization.contributors._id.fullname': '{{search}}' },
        { 'denormalization.diffusion.internal_collection': '{{search}}' },
        { 'denormalization.diffusion.projects._id.name': '{{search}}' },
        { 'denormalization.diffusion.research_teams._id.name': '{{search}}' },
        { 'denormalization.diffusion.surveys._id.name': '{{search}}' },
        { 'denormalization.journal': '{{search}}' },
        { 'denormalization.type': '{{search}}' },
        { 'denormalization.subtype': '{{search}}' },
    ],
};

module.exports = {
    publication_search,
    published_publication_search: {
        $and: [
            { has_other_version: false },
            { status: 'published' },
            { $or: publication_search.$or },
        ],
    },
    no_other_version: {
        has_other_version: false,
    },
    published: {
        status: 'published',
    },
    last_deposits: {
        $and: [
            { has_other_version: false },
            { status: 'published' },
        ],
    },
};
