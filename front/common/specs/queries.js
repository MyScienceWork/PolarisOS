module.exports = {
    publication_search: {
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
            { 'denormalization.diffusion.research_team': '{{search}}' },
            { 'denormalization.diffusion.surveys._id.name': '{{search}}' },
            { 'denormalization.journal': '{{search}}' },
            { 'denormalization.type': '{{search}}' },
            { 'denormalization.subtype': '{{search}}' },
        ],
    },
};
