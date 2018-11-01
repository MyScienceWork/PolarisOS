const DuplicatesRemover = require('./build/modules/duplicates_remover');
const Utils = require('./build/modules/utils/utils');

const reorganizer = (source, duplicates) => {
    let genuine = Utils.find_value_with_path(source, 'system.valid'.split('.')) === true
        || (!source._id.startsWith('@') && 'is_ined' in source)
        || (source._id.startsWith('@') && Utils.find_value_with_path(source, 'system.valid'.split('.')) === true);
    if (genuine) {
        return { source, duplicates };
    }

    genuine = duplicates.find(d =>
        Utils.find_value_with_path(source, 'system.valid'.split('.')) === true
        || ((!d._id.startsWith('@') && 'is_ined' in d)
        || (d._id.startsWith('@') && Utils.find_value_with_path(d, 'system.valid'.split('.')) === true)));
    if (genuine) {
        duplicates = duplicates.filter(d => d._id !== genuine._id);
        duplicates = duplicates.concat([source]);
        return { source: genuine, duplicates };
    }

    return null;
};

const forger = duplicate => ({
    $or: [
        { 'contributors.label': duplicate.duplicates.map(d => d._id) },
        { 'book_authors._id': duplicate.duplicates.map(d => d._id) },
    ],
});

const replacer = (publication, duplicate) => {
    const source_id = duplicate.source._id;
    const duplicates_id = new Set(duplicate.duplicates.map(d => d._id));
    publication.contributors = publication.contributors.map((c) => {
        if (duplicates_id.has(c.label)) {
            c.label = source_id;
        }
        return c;
    });

    if ('book_authors' in publication) {
        publication.book_authors = publication.book_authors.map((c) => {
            if (duplicates_id.has(c._id)) {
                c._id = source_id;
            }
            return c;
        });
    }
    return publication;
};

const dr = new DuplicatesRemover('author');
dr.find_duplicates(['firstname', 'lastname'], {
    firstname: '90%',
    lastname: '90%',
}, ['firstname', 'lastname', 'system', 'is_ined'])
    .then(results => dr.reorganize_duplicates(results, reorganizer))
    .then(results => dr.deduplicate(results, 'publication', forger, replacer))
    .then(({ duplicates }) => dr.remove_duplicates_after_verification(duplicates, 'publication', forger))
    .then(removals => console.log(JSON.stringify(removals)))
    .catch(err => console.error(err));


/* const dr = new DuplicatesRemover('journal');
dr.find_duplicates(['name'], {
    name: '90%',
}).then((results) => {}).catch(err => console.error(err));*/
