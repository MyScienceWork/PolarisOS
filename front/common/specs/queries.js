const publication_search = {
    $or: [
        { 'title.content': '{{{search}}}' },
        { 'subtitles.content': '{{{search}}}' },
        { 'translated_titles.content': '{{{search}}}' },
        { 'abstracts.content': '{{{search}}}' },
        { 'denormalization.authors._id.fullname': '{{{search}}}' },
        { 'denormalization.classifications._id.label': '{{{search}}}' },
        { 'denormalization.contributors.label.fullname': '{{{search}}}' },
        { 'denormalization.diffusion.internal_collection': '{{{search}}}' },
        { 'denormalization.diffusion.projects._id.name': '{{{search}}}' },
        { 'denormalization.diffusion.research_teams._id.name': '{{{search}}}' },
        { 'denormalization.diffusion.surveys._id.name': '{{{search}}}' },
        { 'denormalization.journal': '{{{search}}}' },
        { 'denormalization.type': '{{{search}}}' },
        { 'denormalization.subtype': '{{{search}}}' },
    ],
};

const author_name_or_id = {
    $or: [
        { 'denormalization.contributors.label.fullname': '{{{search}}}' },
        { 'contributors.label': '{{{search}}}' },
    ],
};

const filter_out_types_and_subtypes = (types, subtypes) =>
({
    $nfand: [
    { type: types },
    { subtype: subtypes },
    ],
});

function viewable(uid, aid) {
    if (uid && aid) {
        return {
            $or: [{ 'diffusion.rights.exports.nowhere': false },
                { 'contributors.label': aid }, { depositor: uid }],
        };
    } else if (aid) {
        return {
            $or: [{ 'diffusion.rights.exports.nowhere': false },
                { 'contributors.label': aid }],
        };
    } else if (uid) {
        return {
            $or: [{ 'diffusion.rights.exports.nowhere': false }, { depositor: uid }],
        };
    }
    return { $or: [{ 'diffusion.rights.exports.nowhere': false }] };
}

module.exports = {
    publication_search,
    author_name_or_id,
    filter_out_types_and_subtypes,
    published_publication_search: (uid, aid) => ({
        $and: [
            { has_other_version: false },
            { status: 'published' },
            viewable(uid, aid),
            { $or: publication_search.$or },
        ],
    }),
    no_other_version: {
        has_other_version: false,
    },
    published: {
        status: 'published',
    },
    viewable,
    last_deposits: (uid, aid) => ({
        $and: [
            { has_other_version: false },
            { status: 'published' },
            viewable(uid, aid),
        ],
    }),
    form: {
        $or: [
            { name: '{{{search}}}' },
            { label: '{{{search}}}' },
            { 'fields.name': '{{{search}}}' },
            { 'fields.label': '{{{search}}}' },
            { 'fields.type': '{{{search}}}' },
            { 'fields.placeholder': '{{{search}}}' },
            { 'fields.multiple_name': '{{{search}}}' },
            { 'fields.help.content': '{{{search}}}' },
        ],
    },
};
