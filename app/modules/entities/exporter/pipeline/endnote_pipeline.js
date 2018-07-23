const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const Utils = require('../../../utils/utils');

const types = {
    book: { attrs: { name: 'Book' }, 'ref-type': '28' },
    'other-blog': { attrs: { name: 'Blog' }, 'ref-type': '56' },
    chapter: { attrs: { name: 'Book Section' }, 'ref-type': '5' },
    'other-software': { attrs: { name: 'Computer Program' }, 'ref-type': '9' },
    'book-proceedings': { attrs: { name: 'Book' }, 'ref-type': '28' },
    conference: { attrs: { name: 'Conference Paper' }, 'ref-type': '47' },
    'book-chapter-dictionary-article': { attrs: { name: 'Dictionary' }, 'ref-type': '52' },
    'other-figure': { attrs: { name: 'Artwork' }, 'ref-type': '2' },
    other: { attrs: { name: 'Generic' }, 'ref-type': '13' },
    journal: { attrs: { name: 'Journal Article' }, 'ref-type': '17' },
    'other-maps': { attrs: { name: 'Map' }, 'ref-type': '20' },
    press: { attrs: { name: 'Newspaper Article' }, 'ref-type': '23' },
    report: { attrs: { name: 'Report' }, 'ref-type': '27' },
    'other-audio': { attrs: { name: 'Music' }, 'ref-type': '61' },
    thesis: { attrs: { name: 'Thesis' }, 'ref-type': '32' },
    'working-paper': { attrs: { name: 'Unpublished Work' }, 'ref-type': '34' },
    'other-video': { attrs: { name: 'Audiovisual Material' }, 'ref-type': '3' },
};

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
    subtype: {
        __default: {
            transformers: [],
            picker: async (c, pub, lang) => {
                const type = await LangUtils.string_to_translation(`l_${c.replace(/-/gi, '_')}`, lang);
                return { 'work-type': type };
            },
        },
    },
    abstracts: {
        __default: {
            transformers: [],
            picker: (abs, pub) => {
                if (abs.length === 0) {
                    return null;
                }
                const a = abs.find(_a => _a.lang === pub.lang);
                if (!a) {
                    return { abstract: abs[0].content };
                }
                return { abstract: a.content };
            },
        },
    },
    collection: {
        __default: {
            transformers: [],
            picker: c => ({ 'tertiary-title': c }),
        },
    },
    'dates.publication': {
        __default: {
            transformers: [
                o => ({
                    dates: {
                        'pub-dates': { date: moment(o.dates['pub-dates'].date).format('YYYY') },
                        year: moment(o.dates['pub-dates'].date).format('YYYY'),
                    },
                }),
            ],
            picker: c => ({ dates: { 'pub-dates': { date: c } } }),
        },
        journal: {
            transformers: [
                o => ({
                    dates: {
                        'pub-dates': { date: moment(o.dates['pub-dates'].date).format('MM/YYYY') },
                        year: moment(o.dates['pub-dates'].date).format('YYYY'),
                    },
                }),
            ],
            picker: c => ({ dates: { 'pub-dates': { date: c } } }),
        },
        press: {
            transformers: [
                o => ({
                    dates: {
                        'pub-dates': { date: moment(o.dates['pub-dates'].date).format('DD/MM/YYYY') },
                        year: moment(o.dates['pub-dates'].date).format('YYYY'),
                    },
                }),
            ],
            picker: c => ({ dates: { 'pub-dates': { date: c } } }),
        },
    },
    description: {
        __default: {
            transformers: [],
            picker: c => ({ notes: c }),
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
                    o['electronic-resource-num'] = DOI._id;
                }
                if (ISBN) {
                    o.isbn = ISBN._id;
                }
                if (HANDLE) {
                    o.urls = { 'related-urls': { url: HANDLE._id } };
                }
                return o;
            },
        },
    },
    newspaper: {
        __default: {
            transformers: [],
            picker: c => ({
                titles: { 'secondary-title': c },
            }),
        },
    },
    keywords: {
        __default: {
            transformers: [],
            picker: (kws) => {
                const all = kws.map(k => ({ keyword: k.value }));
                return { keywords: all };
            },
        },
    },
    lang: {
        __default: {
            transformers: [],
            picker: l => ({ language: l }),
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
                    'pub-location': final,
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
                    custom1: final,
                };
            },
        },
    },
    number: {
        __default: {
            transformers: [],
            picker: async n => ({ issue: n }),
        },
    },
    pagination: {
        __default: {
            transformers: [],
            picker: async p => ({ pages: p }),
        },
    },
    publication_title: {
        __default: {
            transformers: [],
            picker: async pt => ({ titles: { 'secondary-title': pt } }),
        },
        conference: {
            transformers: [],
            picker: async pt => ({ custom3: pt }),
        },
    },
    'title.content': {
        __default: {
            transformers: [],
            picker: async t => ({ titles: { title: t } }),
        },
    },
    translated_titles: {
        __default: {
            transformers: [],
            picker: async tts => ({ titles: { 'translated-title': tts[0].content } }),
        },
    },
    volume: {
        __default: {
            transformers: [],
            picker: async v => ({ volume: v }),
        },
    },
    url: {
        __default: {
            transformers: [],
            picker: async v => ({ urls: { 'related-urls': { url: v } } }),
        },
    },
    'denormalization.delivery_institution': {
        __default: {
            transformers: [],
            picker: async () => ({}),
        },
        report: {
            transformers: [],
            picker: async v => ({ publisher: v }),
        },
        thesis: {
            transformers: [],
            picker: async v => ({ publisher: v }),
        },
    },
    'denormalization.editor': {
        __default: {
            transformers: [],
            picker: async v => ({ publisher: v }),
        },
    },
    'denormalization.journal': {
        __default: {
            transformers: [],
            picker: async pt => ({ periodical: { 'full-title': pt } }),
        },
    },
    'denormalization.demovoc_keywords': {
        __default: {
            transformers: [],
            picker: async (kws) => {
                const all = kws.map(k => ({ keyword: k._id.label }));
                return { keywords: all };
            },
        },
    },
    'denormalization.conference': {
        conference: {
            transformers: [],
            picker: async c => ({ titles: { 'secondary-title': c } }),
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

                let all = authors.concat(programmers).concat(film_directors);
                all.sort();
                const au_contribs = all.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        if (info.firstname) {
                            return `${contribs[idx].label.lastname}, ${contribs[idx].label.firstname}`;
                        }
                        return `${contribs[idx].label.lastname}`;
                    });

                if (au_contribs.length > 0) {
                    final.contributors = { authors: au_contribs.map(author => ({ author })) };
                }

                // A2
                const editors = Utils.filterIndexes(pub.contributors, c => c.role === 'editor');
                const directors = Utils.filterIndexes(pub.contributors, c => c.role === 'director');
                all = editors.concat(directors);
                all.sort();
                const a2_contribs = all.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        if (info.firstname) {
                            return `${contribs[idx].label.lastname}, ${contribs[idx].label.firstname}`;
                        }
                        return `${contribs[idx].label.lastname}`;
                    });

                if (a2_contribs.length > 0) {
                    final.contributors = { 'secondary-authors': a2_contribs.map(author => ({ author })) };
                }

                // A3
                const producers = Utils.filterIndexes(pub.contributors, c => c.role === 'producer');
                const a3_contribs = producers.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        if (info.firstname) {
                            return `${contribs[idx].label.lastname}, ${contribs[idx].label.firstname}`;
                        }
                        return `${contribs[idx].label.lastname}`;
                    });

                if (a3_contribs.length > 0) {
                    final.contributors = { 'tertiary-authors': a3_contribs.map(author => ({ author })) };
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
                            return `${info.lastname}, ${info.firstname}`;
                        }
                        return `${info.lastname}`;
                    }).filter(c => c != null);
                final.contributors = { 'secondary-authors': a2_contribs.map(author => ({ author })) };
                return final;
            },
        },
    },
};

module.exports = { types, mapping };
