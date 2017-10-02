const Citation = require('../build/modules/entities/citation/citation');
const Search = require('../build/modules/entities/crud/search');
const queries = require('../build/modules/entities/crud/query');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
});

const citation = new Citation(client);
const s = new Search();
const q = new queries.Nested()
    .path('publications')
    .query(new queries.Term().term({ 'publications.source': 'HAL-SHS' }));
s.query(q);

/* citation.search(s, { size: 1 }).then((response) => {
    console.log(response.hits);
    }).catch((err) => { console.error(err); });*/

citation.delete('cab37be5ffff43be83fe5a2db71c0451').then((response) => {
    console.log(response);
}).catch((err) => { console.error(err); });
