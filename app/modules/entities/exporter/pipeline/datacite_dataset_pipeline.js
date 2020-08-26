const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const Utils = require('../../../utils/utils');
const EntitiesUtils = require('../../../utils/entities');

const mapping = {
    ids: {
        __default: {
            transformers: [],
            picker: (ids) => {
                const DOI = ids.find(id => id.type === 'doi');

                if (!DOI) {
                    return null;
                }

                const all = [];
                const alternates = [];
                if (DOI) {
                    all.push({ identifier: DOI._id, attrs: { identifierType: 'DOI' } });
                    alternates.push({ alternateIdentifier: DOI._id, attrs: { alternateIdentifierType: 'DOI' } });
                }

                return [...all, { alternateIdentifiers: alternates }];
            },
        },
    },
    description: {
        __default: {
            transformers: [],
            picker: (abs, pub) => {
                if (abs.length === 0) {
                    return null;
                }
                return {
                    descriptions: abs.map(description => ({
                        description: description.description.replace(/\n+/gim, ' '),
                        attrs: {
                            'xml:lang': 'en',
                            descriptionType: 'Abstract',
                        },
                    })),
                };
            },
        },
    },
    title: {
        __default: {
            transformers: [],
            picker: async t => ({
                titles: [
                    { title: t },
                ],
            }),
        },
    },
    type: {
        __default: {
            transformers: [],
            picker: async () => ({
                resourceType: '',
                attrs: { resourceTypeGeneral: 'Dataset' },
            }),
        },
    },
    'denormalization.author': {
        __default: {
            transformers: [],
            picker: async (contribs, pub) => {
                console.log('contribs : ', contribs);
                console.log('pub : ', pub);

                const au_contribs = contribs.map((contrib) => {
                    const info = contrib.label;
                    const obj = [];

                    if (info.firstname) {
                        obj.push({ creatorName: `${info.firstname.trim()} ${info.lastname.trim()}`, attrs: { nameType: 'Personal' } });
                        obj.push({ givenName: info.firstname.trim() });
                    } else {
                        obj.push({ creatorName: info.lastname.trim(), attrs: { nameType: 'Personal' } });
                    }

                    obj.push({ familyName: info.lastname.trim() });
                    return { creator: obj };
                });
                return { creators: au_contribs };
            },
        },
    },
    'denormalization.subject': {
        __default: {
            transformers: [],
            picker: (kws) => {
                const subjects = kws.map(k => k._id.label);
                return {
                    subjects: subjects.map(k => ({
                        attrs: {
                            'xml:lang': 'en',
                        },
                        subject: k })),
                };
            },
        },
    },
};

module.exports = { mapping };
