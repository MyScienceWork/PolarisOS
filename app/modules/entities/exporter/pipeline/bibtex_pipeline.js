const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const Utils = require('../../../utils/utils');
const BibTeXUtils = require('../../../utils/bibtex');

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const types = {
    book: 'book',
    chapter: 'inbook',
    'other-software': 'software',
    'book-proceedings': 'book',
    conference: 'conference',
    'conference-paper-generic': 'inproceedings',
    'book-chapter-dictionary-article': 'DICT',
    'other-figure': 'artwork',
    other: 'report',
    journal: 'article',
    press: 'article',
    report: 'report',
    'other-audio': 'audio',
    thesis: 'phdthesis',
    'working-paper': 'report',
    'other-video': 'movie',
};

const case_protected_fields = ['abstract', 'title', 'booktitle', 'series', 'institution', 'school', 'edition', 'note'];

async function city_country_picker(loc, pub, mylang) {
    if (!loc.country && !loc.city) {
        return {};
    }

    let country = null;
    let city = null;
    if (loc.country) {
        country = await LangUtils
            .string_to_translation(pub.denormalization.localisation.country, mylang);
    }

    if (loc.city) {
        city = loc.city;
    }

    if (country && city) {
        return `${city}, ${country}`;
    } else if (country) {
        return country;
    } else if (city) {
        return city;
    }
    return null;
}

const mapping = {
    abstracts: {
        __default: {
            transformers: [
                o => ({ abstract: o.abstract.replace(/(?:\r\n|\r|\n)/g, ' ') }),
            ],
            picker: (abs, pub) => {
                if (abs.length === 0) {
                    return null;
                }
                const a = abs.find(_a => _a.lang === pub.lang);
                if (!a) {
                    return { abstract: `{${BibTeXUtils.escape_to_bibtex(abs[0].content)}}` };
                }
                return { abstract: `{${BibTeXUtils.escape_to_bibtex(a.content)}}` };
            },
        },
    },
    subtitles: {
        __default: {
            transformers: [],
            picker: () => {},
        },
    },
    collection: {
        __default: {
            transformers: [],
            picker: c => ({ series: `{${BibTeXUtils.escape_to_bibtex(c)}}` }),
        },
    },
    'dates.publication': {
        __default: {
            transformers: [o => ({ year: parseInt(moment(o.date).format('YYYY'), 10) })],
            picker: c => ({ date: c }),
        },
        journal: {
            transformers: [o => ({
                year: parseInt(moment(o.date).format('YYYY'), 10),
                month: months[parseInt(moment(o.date).format('M'), 10) - 1],
            })],
            picker: c => ({ date: c }),
        },
        press: {
            transformers: [o => ({
                year: parseInt(moment(o.date).format('YYYY'), 10),
                month: months[parseInt(moment(o.date).format('M'), 10) - 1],
            })],
            picker: c => ({ date: c }),
        },
    },
    description: {
        __default: {
            transformers: [],
            picker: c => ({ note: `{${BibTeXUtils.escape_to_bibtex(c)}}` }),
        },
    },
    ids: {
        __default: {
            transformers: [],
            picker: (ids) => {
                const DOI = ids.find(id => id.type === 'doi');
                const ISBN = ids.find(id => id.type === 'isbn');
                const HANDLE = ids.find(id => id.type === 'handle');
                const o = {};
                if (DOI) {
                    o.doi = `{${DOI._id.replace(/_/g, '\\_')}}`;
                }
                if (ISBN) {
                    o.isbn = `{${ISBN._id.replace(/_/g, '\\_')}}`;
                }
                if (HANDLE) {
                    o.hdl = `{${HANDLE._id.replace(/_/g, '\\_')}}`;
                }
                return o;
            },
        },
    },
    newspaper: {
        __default: {
            transformers: [],
            picker: c => ({
                journal: `{${BibTeXUtils.escape_to_bibtex(c)}}`,
            }),
        },
    },
    lang: {
        __default: {
            transformers: [],
            picker: l => ({ language: `{${l}}` }),
        },
    },
    localisation: {
        __default: {
            transformers: [],
            picker: async (loc, pub, mylang) => {
                const final = await city_country_picker(loc, pub, mylang);
                if (!final) {
                    return {};
                }
                return {
                    location: `{${BibTeXUtils.escape_to_bibtex(final)}}`,
                };
            },
        },
        conference: {
            transformers: [],
            picker: async (loc, pub, mylang) => {
                const final = await city_country_picker(loc, pub, mylang);
                if (!final) {
                    return {};
                }
                return {
                    address: `{${BibTeXUtils.escape_to_bibtex(final)}}`,
                };
            },
        },
    },
    number: {
        __default: {
            transformers: [],
            picker: async n => ({ issue: `{${BibTeXUtils.escape_to_bibtex(n)}}` }),
        },
    },
    pagination: {
        __default: {
            transformers: [],
            picker: async p => ({ pages: `{${BibTeXUtils.escape_to_bibtex(p)}}` }),
        },
    },
    publication_title: {
        __default: {
            transformers: [],
            picker: async pt => ({ booktitle: `{${BibTeXUtils.escape_to_bibtex(pt)}}` }),
        },
    },
    'title.content': {
        __default: {
            transformers: [],
            picker: async t => ({ title: `{${BibTeXUtils.escape_to_bibtex(t)}}` }),
        },
    },
    volume: {
        __default: {
            transformers: [],
            picker: async v => ({ volume: `{${BibTeXUtils.escape_to_bibtex(v)}}` }),
        },
    },
    url: {
        __default: {
            transformers: [],
            picker: async v => ({ url: `{${v.replace(/_/g, '\\_')}}` }),
        },
    },
    'denormalization.delivery_institution': {
        __default: {
            transformers: [],
            picker: async () => ({}),
        },
        report: {
            transformers: [],
            picker: async v => ({ institution: `{${BibTeXUtils.escape_to_bibtex(v)}}` }),
        },
        'working-paper': {
            transformers: [],
            picker: async v => ({ institution: `{${BibTeXUtils.escape_to_bibtex(v)}}` }),
        },
        thesis: {
            transformers: [],
            picker: async v => ({ school: `{${BibTeXUtils.escape_to_bibtex(v)}}` }),
        },
    },
    'denormalization.editor': {
        __default: {
            transformers: [],
            picker: async v => ({ publisher: `{${BibTeXUtils.escape_to_bibtex(v)}}` }),
        },
    },
    'denormalization.journal': {
        __default: {
            transformers: [],
            picker: async v => ({ journal: `{${BibTeXUtils.escape_to_bibtex(v)}}` }),
        },
    },
    'denormalization.conference': {
        CPAPER: {
            transformers: [],
            picker: async c => ({ booktitle: `{${BibTeXUtils.escape_to_bibtex(c)}}` }),
        },
    },
    'denormalization.contributors': {
        __default: {
            transformers: [],
            picker: async (contribs, pub) => {
                const final = {};

                // AU
                const authors = Utils.filterIndexes(pub.contributors, c => (c.role === 'author' || !c.role));
                const programmers = Utils.filterIndexes(pub.contributors, c => (c.role === 'programmer'));
                const film_directors = Utils.filterIndexes(pub.contributors, c => (c.role === 'film-director'));

                const all = authors.concat(programmers).concat(film_directors);
                all.sort();
                const au_contribs = all.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        if (info.firstname) {
                            return `${BibTeXUtils.escape_to_bibtex(contribs[idx].label.lastname)}, ${BibTeXUtils.escape_to_bibtex(contribs[idx].label.firstname)}`;
                        }
                        return `${BibTeXUtils.escape_to_bibtex(contribs[idx].label.lastname)}`;
                    });

                if (au_contribs.length > 0) {
                    final.author = `"${au_contribs.join(' and ')}"`;
                }

                // A2
                const editors = Utils.filterIndexes(pub.contributors, c => c.role === 'editor');
                const a2_contribs = editors.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        if (info.firstname) {
                            return `${BibTeXUtils.escape_to_bibtex(contribs[idx].label.lastname)}, ${BibTeXUtils.escape_to_bibtex(contribs[idx].label.firstname)}`;
                        }
                        return `${BibTeXUtils.escape_to_bibtex(contribs[idx].label.lastname)}`;
                    });

                if (a2_contribs.length > 0) {
                    final.editor = `"${a2_contribs.join(' and ')}"`;
                }

                return final;
            },
        },
    },
    'denormalization.book_authors': {
        __default: {
            transformers: [],
            picker: async (contribs) => {
                const final = {};
                // A2
                const a2_contribs = contribs
                    .filter(c => c != null)
                    .map((c) => {
                        const info = c._id;
                        if (!info) {
                            return null;
                        }

                        if (info.firstname) {
                            return `${BibTeXUtils.escape_to_bibtex(info.lastname)}, ${BibTeXUtils.escape_to_bibtex(info.firstname)}`;
                        }
                        return `${BibTeXUtils.escape_to_bibtex(info.lastname)}`;
                    }).filter(c => c != null);
                final.editor = `"${a2_contribs.join(' and ')}"`;
                return final;
            },
        },
    },
};

module.exports = { types, mapping, case_protected_fields: new Set(case_protected_fields) };
