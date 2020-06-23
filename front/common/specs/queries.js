const publication_search = {
    $or: [
        { 'title.content': '{{{search}}}' },
        { 'subtitles.content': '{{{search}}}' },
        { 'translated_titles.content': '{{{search}}}' },
        { 'abstracts.content': '{{{search}}}' },
        { 'denormalization.authors._id.fullname': '{{{search}}}' },
        { 'denormalization.classifications._id.label': '{{{search}}}' },
        { 'denormalization.contributors.label.fullname': '{{{search}}}' },
        { 'denormalization.diffusion.internal_collection2._id.name': '{{{search}}}' },
        { 'denormalization.diffusion.projects._id.name': '{{{search}}}' },
        { 'denormalization.diffusion.research_teams._id.name': '{{{search}}}' },
        { 'denormalization.diffusion.surveys._id.name': '{{{search}}}' },
        { 'denormalization.journal': '{{{search}}}' },
        { 'denormalization.type': '{{{search}}}' },
        { 'denormalization.subtype': '{{{search}}}' },
    ],
};

const dataset_search = {
    $or: [
        { 'title': '{{{search}}}' },
    ],
};

const author_name_or_id = {
    $or: [
        { 'denormalization.contributors.label.fullname': '{{{search}}}' },
        { 'contributors.label': '{{{search}}}' },
    ],
};

const unpublished_websiteok = {
    $or: [
        { status: 'unpublished' },
        { 'diffusion.rights.exports.website': true },
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
    const base = { $or: [{ 'diffusion.rights.exports.nowhere': false }] };
    if (uid) {
        base.$or.push({ depositor: uid });
    }

    if (aid) {
        base.$or.push({ 'contributors.label': aid });
    }
    return base;
}

module.exports = {
    publication_search,
    dataset_search,
    author_name_or_id,
    filter_out_types_and_subtypes,
    unpublished_websiteok,
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
    viewable,
    last_deposits: (uid, aid) => ({
        $and: [
            { has_other_version: false },
            { status: 'published' },
            viewable(uid, aid),
        ],
    }),
    filter_role(userId, roles, filter) {
        if (roles.funder) {
            filter.$and.push({ depositor: userId });
        }
        return filter;
    },
    last_deposits_submitted(userId, roles) {
        const filter = {
            sort: [{ creation_date: 'desc' }],
            $and: [
                { 'denormalization.state.label': 'Submitted' },
            ],
        };
        return this.filter_role(userId, roles, filter);
    },
    last_deposits_published(userId, roles) {
        const filter = {
            $and: [
                { 'denormalization.state.label': 'Published' },
            ],
        };
        return this.filter_role(userId, roles, filter);
    },
    last_deposits_reviewed_by_curator_1(userId, roles) {
        const filter = {
            $and: [
                { 'denormalization.state.label': 'Reviewed by curator 1' },
            ],
        };
        return this.filter_role(userId, roles, filter);
    },
    last_deposits_reviewed_by_curator_2(userId, roles) {
        const filter = {
            $and: [
                { 'denormalization.state.label': 'Reviewed by curator 2' },
            ],
        };
        return this.filter_role(userId, roles, filter);
    },
    last_deposits_rejected_by_curator_1(userId, roles) {
        const filter = {
            $and: [
                { 'denormalization.state.label': 'Rejected by curator 1' },
            ],
        };
        return this.filter_role(userId, roles, filter);
    },
    last_deposits_rejected_by_curator_2(userId, roles) {
        const filter = {
            $and: [
                { 'denormalization.state.label': 'Rejected by curator 2' },
            ],
        };
        return this.filter_role(userId, roles, filter);
    },

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
