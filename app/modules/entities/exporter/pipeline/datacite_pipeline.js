const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const Utils = require('../../../utils/utils');
const EntitiesUtils = require('../../../utils/entities');

const mapping = {
    abstracts: {
        __default: {
            transformers: [],
            picker: (abs, pub) => {
                if (abs.length === 0) {
                    return null;
                }
                let a = abs.find(_a => _a.lang === pub.lang);
                if (!a) {
                    a = abs[0];
                }

                return {
                    descriptions: [
                        { description: a.content.replace(/\n+/gim, ' '),
                            attrs: {
                                'xml:lang': pub.lang.toLowerCase(),
                                descriptionType: 'Abstract',
                            } },
                    ],
                };
            },
        },
    },
    type: {
        __default: {
            transformers: [],
            picker: async (t, pub) => {
                const type = await EntitiesUtils.retrieve_and_get_source('typology', t);
                if (!type) {
                    return null;
                }

                const { subtype } = pub;
                const { datacite } = type;
                const resourceType = d => ({
                    resourceType: '',
                    attrs: { resourceTypeGeneral: d },
                });

                if (!subtype) {
                    return resourceType(datacite);
                }

                const subtypeInfo = type.children.find(c => c.name === subtype);
                if (!subtypeInfo) {
                    return resourceType(datacite);
                }


                const { datacite: subDatacite } = subtypeInfo;

                if (!subDatacite) {
                    return resourceType(datacite);
                }
                return resourceType(subDatacite);
            },
        },
    },
    'dates.publication': {
        __default: {
            transformers: [o => ({ publicationYear: moment(o.publicationYear).format('YYYY') })],
            picker: c => ({ publicationYear: c }),
        },
    },
    description: {
        __default: {
            picker: c => ({
                descriptions: [
                    { description: c.replace(/\n+/gim, ' '),
                        attrs: {
                            descriptionType: 'Other',
                        } },
                ],
            }),
        },
    },
    ids: {
        __default: {
            transformers: [],
            picker: (ids) => {
                const DOI = ids.find(id => id.type === 'doi');
                const ISBN = ids.find(id => id.type === 'isbn');
                const handle = ids.find(id => id.type === 'handle');

                if (!DOI && !ISBN && !handle) {
                    return null;
                }

                const all = [];
                const alternates = [];
                if (DOI) {
                    all.push({ identifier: DOI._id, attrs: { identifierType: 'DOI' } });
                    alternates.push({ alternateIdentifier: DOI._id, attrs: { alternateIdentifierType: 'DOI' } });
                }

                if (handle) {
                    alternates.push({ alternateIdentifier: handle._id, attrs: { alternateIdentifierType: 'Handle' } });
                }

                if (ISBN) {
                    alternates.push({ alternateIdentifier: ISBN._id, attrs: { alternateIdentifierType: 'ISBN' } });
                }

                return [...all, { alternateIdentifiers: alternates }];
            },
        },
    },
    keywords: {
        __default: {
            transformers: [],
            picker: (kws, publication) => {
                const all_kws = kws.map(k => k.value);
                const all_dem_kws = (Utils.find_value_with_path(publication,
                    'denormalization.demovoc_keywords'.split('.')) || []).map(k => k._id.label);
                const keywords = [...all_kws, ...all_dem_kws];
                return {
                    subjects: keywords.map(k => ({ subject: k })),
                };
            },
        },
    },
    title: {
        __default: {
            transformers: [],
            picker: async (t, pub) => {
                const info = pub.subtitles || [];
                const subtitles = info.map(st => ({
                    title: st.content, attrs: { titleType: 'Subtitle' },
                }));

                return {
                    titles: [
                        { title: t.content }, ...subtitles,
                    ],
                };
            },
        },
    },
    'denormalization.editor': {
        __default: {
            transformers: [],
            picker: async v => ({ publisher: v }),
        },
    },
    lang: {
        __default: {
            transformers: [],
            picker: async v => ({ language: v.toLowerCase() }),
        },
    },
    dataset_information: {
        __default: {
            transformers: [],
            picker: async (dataset) => {
                const { size, format, version } = dataset;
                const arr = [];

                if (size) {
                    arr.push({ sizes: [{ size }] });
                }

                if (format) {
                    arr.push({ formats: { format } });
                }

                if (version) {
                    arr.push({ version });
                }
                return arr;
            },
        },
    },
    'denormalization.contributors': {
        __default: {
            transformers: [],
            picker: async (contribs, pub) => {
                // AU
                const authors = Utils.filterIndexes(pub.contributors, c => (c.role === 'author' || !c.role));
                const programmers = Utils.filterIndexes(pub.contributors, c => (c.role === 'programmer'));
                const film_directors = Utils.filterIndexes(pub.contributors, c => (c.role === 'film-director'));
                const directors = Utils.filterIndexes(pub.contributors, c => c.role === 'director');
                const editors = Utils.filterIndexes(pub.contributors, c => c.role === 'editor');
                const producers = Utils.filterIndexes(pub.contributors, c => c.role === 'producer');

                const all = authors.concat(programmers).concat(film_directors)
                    .concat(directors).concat(editors).concat(producers);
                const au_contribs = all.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        const obj = [];

                        if (info.firstname) {
                            obj.push({ creatorName: `${contribs[idx].label.firstname} ${contribs[idx].label.lastname}`, attrs: { nameType: 'Personal' } });
                            obj.push({ givenName: contribs[idx].label.firstname });
                        } else {
                            obj.push({ creatorName: contribs[idx].label.lastname, attrs: { nameType: 'Personal' } });
                        }

                        obj.push({ familyName: contribs[idx].label.lastname });
                        return { creator: obj };
                    });
                return { creators: au_contribs };
            },
        },
    },
    'diffusion.rights.license': {
        __default: {
            transformers: [],
            picker: async (lid) => {
                const license = await EntitiesUtils.retrieve_and_get_source('license', lid);
                if (!license) {
                    return null;
                }

                const { link, spdx_id } = license;

                if (!link || !spdx_id) {
                    return null;
                }

                return {
                    rights: [
                        { right: '',
                            attrs: { schemeURI: 'https://spdx.org/licenses/',
                                rightsIdentifier: spdx_id,
                                rightsIdentifierScheme: 'SPDX',
                                rightsURI: link },
                        },
                    ],
                };
            },
        },
    },
    funders: {
        __default: {
            transformers: [],
            picker: async (funding) => {
                const funders = (await
                    Promise.all(funding.map(f => EntitiesUtils.retrieve_and_get_source('funder', f._id)))
                ).filter(f => f != null);

                if (funders.length === 0) {
                    return null;
                }

                return { fundingReferences: funders.map((funder) => {
                    const { name, grant_title, grant_number } = funder;
                    return { fundingReference: [
                        { funderName: name },
                        { awardNumber: grant_number },
                        { awardTitle: grant_title },
                    ] };
                }) };
            },
        },
    },

};

module.exports = { mapping };
