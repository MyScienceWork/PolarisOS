const publication_search = {
    $or: [
        { 'contributors.affiliations.name': '{{search}}' },
        { 'contributors.affiliations.address': '{{search}}' },
        { 'contributions.affiliations.city': '{{search}}' },
        { 'contributors.firstName': '{{search}}' },
        { 'contributors.lastName': '{{search}}' },
        { 'contributors.fullName': '{{search}}' },
        { 'contributors.middleName': '{{search}}' },
        { 'institutionContributors.name': '{{search}}' },
        { 'journal.name': '{{search}}' },
        { 'journal.publisher': '{{search}}' },
        { 'keywords.label': '{{search}}' },
        { 'publicationIds.value': '{{search}}' },
        { publicationType: '{{search}}' },
        { publicationSubtype: '{{search}}' },
        { 'titles.value': '{{search}}' },
    ],
};

const author_search = id => ({ $and: [{ 'contributors.contributorIds.type': 'msw' }, { 'contributors.contributorIds.value': id }] });

const publication_search_with_author = id => ({
    $and: [
        { $or: publication_search.$or },
        author_search(id),
    ],
});

module.exports = {
    publication_search,
    publication_search_with_author,
    author_search,
};
