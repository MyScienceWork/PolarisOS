const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const Utils = require('../../../utils/utils');
const Mime = require('mime');
const ConfigUtils = require('../../../utils/config');

const mapping = {
    abstracts: {
        __default: {
            transformers: [],
            picker: (abs, pub) => {
                if (abs.length === 0) {
                    return null;
                }
                const a = abs.find(_a => _a.lang === pub.lang);
                if (!a) {
                    return { Abstract: abs[0].content.replace(/\n+/gim, ' ') };
                }
                return { Abstract: a.content.replace(/\n+/gmi, ' ') };
            },
        },
    },
    'dates.publication': {
        __default: {
            transformers: [o => ({ 'Creation-Date': moment(o['Creation-Date']).format('YYYY') })],
            picker: c => ({ 'Creation-Date': c }),
        },
        journal: {
            transformers: [o => ({ 'Creation-Date': moment(o['Creation-Date']).format('YYYY-MM-DD') })],
            picker: c => ({ 'Creation-Date': c }),
        },
        press: {
            transformers: [o => ({ 'Creation-Date': moment(o['Creation-Date']).format('YYYY-MM-DD') })],
            picker: c => ({ 'Creation-Date': c }),
        },
    },
    description: {
        __default: {
            transformers: [],
            picker: c => ({ Note: c }),
        },
    },
    ids: {
        __default: {
            transformers: [],
            picker: (ids) => {
                const DOI = ids.find(id => id.type === 'doi');
                const o = {};
                if (DOI) {
                    o.DOI = DOI._id;
                }
                return o;
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
                return { Keywords: keywords.join(', ') };
            },
        },
    },
    pagination: {
        __default: {
            transformers: [],
            picker: async p => ({ Length: p }),
        },
    },
    number: {
        __default: {
            transformers: [],
            picker: async number => ({ Number: number }),
        },
    },
    files: {
        __default: {
            transformers: [],
            picker: async (files, pub) => {
                const master = files.find(file => file.is_master);
                if (!master) {
                    return {};
                }

                const mime_type = Mime.getType(master.url);
                if (`${mime_type}` !== 'application/pdf') {
                    return {};
                }

                const my_config = await ConfigUtils.get_config();
                if (!my_config || !my_config.base_url) {
                    return {};
                }


                return {
                    'File-Url': `${my_config.base_url}/download/publication/${pub._id}/${master.url}`,
                    'File-Format': 'Application/pdf',
                    'File-Function': 'Deposited file',
                };
            },
        },
    },
    'title.content': {
        __default: {
            transformers: [],
            picker: async t => ({ Title: t }),
        },
    },
    'denormalization.journal': {
        __default: {
            transformers: [],
            picker: async v => ({ 'Publication-Status': `Published in ${v}` }),
        },
    },
    'denormalization.conference': {
        conference: {
            transformers: [],
            picker: async v => ({ 'Publication-Status': `Published in ${v}` }),
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
                const directors = Utils.filterIndexes(pub.contributors, c => c.role === 'director');
                const editors = Utils.filterIndexes(pub.contributors, c => c.role === 'editor');
                const producers = Utils.filterIndexes(pub.contributors, c => c.role === 'producer');

                const all = authors.concat(programmers).concat(film_directors)
                    .concat(directors).concat(editors).concat(producers);
                all.sort();
                const au_contribs = all.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        const obj = {
                            'Author-Name-Last': contribs[idx].label.lastname,
                        };

                        if (info.firstname) {
                            obj['Author-Name'] = `${contribs[idx].label.firstname} ${contribs[idx].label.lastname}`;
                            obj['Author-Name-First'] = contribs[idx].label.firstname;
                        } else {
                            obj['Author-Name'] = obj['Author-Name-Last'];
                        }

                        return obj;
                    });
                return { Authors: au_contribs };
            },
        },
    },
};

const fields = ['Authors', 'Title', 'Abstract', 'Length', 'Creation-Date', 'Note', 'Publication-Status', 'DOI', 'Keywords', 'File-Url', 'File-Format', 'File-Function', 'Number'];

module.exports = { fields, mapping };
