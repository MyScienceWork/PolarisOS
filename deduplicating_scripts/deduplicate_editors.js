const DuplicatesRemover = require('./build/modules/duplicates_remover');
const Utils = require('./build/modules/utils/utils');
const Natural = require('natural');
const ASCIIFolder = require('fold-to-ascii');

const reorganizer = (source, duplicates) => {
    const cond = s => Utils.find_value_with_path(s, 'system.valid'.split('.')) !== null || !s._id.startsWith('@');
    const normalizer = (s) => {
        const Tokenizer = new Natural.WordTokenizer();
        const tokens = new Set(Tokenizer.tokenize(s || '').map(tok => ASCIIFolder.fold(tok, '').toLowerCase()));
        return tokens;
    };


    let genuine = cond(source);
    let new_info = {};
    if (genuine) {
        new_info = { source, duplicates };
    }

    if (Object.keys(new_info).length === 0) {
        genuine = duplicates.find(d => cond(d));
        if (genuine) {
            duplicates = duplicates.filter(d => d._id !== genuine._id);
            duplicates = duplicates.concat([source]);
            new_info = { source: genuine, duplicates };
        }
    }

    if (Object.keys(new_info).length === 0) {
        return null;
    }


    const source_name_tokens = normalizer(new_info.source.label);
    const duplicate_names_tokens = new_info.duplicates.map(d => normalizer(d.label));
    const distances = duplicate_names_tokens.map((s) => {
        const ns = new Set([...s].filter(x => source_name_tokens.has(x)));
        return Math.abs(ns.size - Math.max(source_name_tokens.size, s.size));
    });

    const new_duplicates = new_info.duplicates.filter((d, i) => {
        if (distances[i] > 1) {
            return false;
        }
        return true;
    });

    if (new_duplicates.length === 0) {
        return null;
    }

    return { source: new_info.source, duplicates: new_duplicates };
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

const dr = new DuplicatesRemover('editor');
dr.find_duplicates(['label'], {
    label: '100%',
}, ['label', 'system'])
    .then(results => dr.reorganize_duplicates(results, reorganizer))
    .then((results) => {
        console.log('s/d\t_id\tlabel\tkeep\tremove');
        results.map((result) => {
            console.log(`S\t${result.source._id}\t${result.source.label}`);
            result.duplicates.map((d) => {
                console.log(`D\t${d._id}\t${d.label}\t${d.type}`);
            });
        });
    })
    .catch(err => console.error(err));
// .then(results => dr.deduplicate(results, 'publication', forger, replacer))
// .then(({ duplicates }) => dr.remove_duplicates_after_verification(duplicates, 'publication', forger))
// .then(removals => console.log(JSON.stringify(removals)))
// .catch(err => console.error(err));


/* const dr = new DuplicatesRemover('journal');
dr.find_duplicates(['name'], {
    name: '90%',
}).then((results) => {}).catch(err => console.error(err));*/
