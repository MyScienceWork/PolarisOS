const moment = require('moment-timezone');
const _ = require('lodash');
const LangUtils = require('../../../utils/lang');
const CSVPipeline = require('./csv_pipeline');
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');

function get_affiliations(contrib, pub) {
    const affiliations = Utils.find_value_with_path(contrib, 'denormalization.affiliations'.split('.')) || [];
    let publication_date = Utils.find_value_with_path(pub, 'dates.publication'.split('.'));
    if (affiliations.length === 0 || !publication_date) {
        return [];
    }

    publication_date = parseInt(moment(publication_date).tz('Europe/Paris').format('DD/MM/YYYY'), 10);
    const eligible_affiliations = affiliations.filter((aff) => {
        const from = parseInt(aff.from, 10);
        if (aff.to) {
            const to = parseInt(aff.to, 10);
            return from <= publication_date && publication_date <= to;
        }
        return from <= publication_date;
    });

    if (eligible_affiliations.length === 0) {
        return [];
    }

    return eligible_affiliations.map((aff) => {
        const iname = Utils.find_value_with_path(aff, 'institution.name'.split('.'));
        const teams = Utils.find_value_with_path(aff, 'teams'.split('.')) || [];
        if (!iname) {
            aff.full = 'NC';
        } else if (teams instanceof Array) {
            const teams_str = teams.map(t => `#POS#LANG${t._id}`).join('\n');
            aff.full = `${iname}\n${teams_str}`;
        }
        aff.status = aff.ined_status ? `#POS#LANG${aff.ined_status}` : 'NC';
        return aff;
    });
}

const mapping = {
    'denormalization.type.label': CSVPipeline.mapping['denormalization.type.label'],
    subtype: CSVPipeline.mapping.subtype,
    'title.content': CSVPipeline.mapping['title.content'],
    subtitles: CSVPipeline.mapping.subtitles,
    lang: CSVPipeline.mapping.lang,
    'denormalization.journal': CSVPipeline.mapping['denormalization.journal'],
    'denormalization.conference': CSVPipeline.mapping['denormalization.conference'],
    'denormalization.contributors': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key, memoizer) => {
                if (!('authors' in memoizer)) {
                    memoizer.authors = {};
                }
                const arr = [];
                let idx = 0;
                for (const i in c) {
                    const co = c[i];
                    if (!co || !co.label) {
                        continue;
                    }
                    const _id = pub.contributors[i].label;
                    const fullname = co.label.fullname;
                    arr.push({ fullname });

                    let real_contrib = null;
                    if (_id in memoizer.authors) {
                        real_contrib = memoizer.authors[_id];
                    } else {
                        real_contrib = await EntitiesUtils.retrieve_and_get_source('author', _id);
                        memoizer.authors[_id] = real_contrib;
                    }
                    const affiliations = get_affiliations(real_contrib, pub);
                    if (affiliations.length === 0) {
                        arr[idx].aff = 'NC';
                        arr[idx].status = 'NC';
                    } else {
                        const full = affiliations.map(aff => aff.full).join('\n');
                        const status = Array.from(new Set(affiliations.map(aff => aff.status))).join('\n');
                        const translated_A = await LangUtils.strings_to_translation(full, lang);
                        const translated_S = await LangUtils.strings_to_translation(status, lang);
                        arr[idx].aff = translated_A;
                        arr[idx].status = translated_S;
                    }

                    idx += 1;
                }
                return { [key]: arr };
            },
        },
    },
    publication_title: CSVPipeline.mapping.publication_title,
    'dates.publication': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: moment(c).tz('Europe/Paris').format('DD/MM/YYYY') }),
        },
    },
    'localisation.city': CSVPipeline.mapping['localisation.city'],
    'denormalization.localisation.country': CSVPipeline.mapping['denormalization.localisation.country'],
    abstracts: CSVPipeline.mapping.abstracts,
    ids: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({
                [key]: c.filter(id => id.type === 'handle').map(id => id._id).join('\n'),
            }),
        },
    },
    _id: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({
                [key]: c,
            }),
        },
    },
    keywords: CSVPipeline.mapping.keywords,
    'denormalization.demovoc_keywords': CSVPipeline.mapping['denormalization.demovoc_keywords'],
    'diffusion.research_teams': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.map(rt => rt._id);
                const results = await EntitiesUtils.search_and_get_sources('laboratory', {
                    size: all.length,
                    where: {
                        _id: all,
                    },
                    projection: ['name', 'acronym'],
                });

                return { [key]: results.map(r => (r.acronym || r.name)).join('\n') };
            },
        },
    },
    'denormalization.diffusion.surveys': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.map(rt => `#POS#LANG${rt._id.name}`).join('\n');
                const translated = await LangUtils.strings_to_translation(all, lang);
                return { [key]: translated };
            },
        },
    },
    'diffusion.projects': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.map(rt => rt._id);
                const results = await EntitiesUtils.search_and_get_sources('project', {
                    size: all.length,
                    where: {
                        _id: all,
                    },
                    projection: ['name', 'id'],
                });

                return { [key]: results.map(r => (r.id || r.name)).join('\n') };
            },
        },
    },
    'denormalization.diffusion.anr_projects': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.filter(rt => rt && rt._id).map(rt => `#POS#LANG${rt._id.name}`).join('\n');
                const translated = await LangUtils.strings_to_translation(all, lang);
                return { [key]: translated };
            },
        },
    },
    'denormalization.diffusion.european_projects': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.filter(rt => rt && rt._id).map(rt => `#POS#LANG${rt._id.name}`).join('\n');
                const translated = await LangUtils.strings_to_translation(all, lang);
                return { [key]: translated };
            },
        },
    },
    'dates.deposit': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => ({ [key]: moment(c).tz('Europe/Paris').format('DD/MM/YYYY') }),
        },
    },
    'dates.update': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => ({ [key]: moment(c).tz('Europe/Paris').format('DD/MM/YYYY') }),
        },
    },
    'denormalization.depositor': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => ({ [key]: `${c.firstname} ${c.lastname}` }),
        },
    },
    'denormalization.reviewer': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => ({ [key]: `${c.firstname} ${c.lastname}` }),
        },
    },
};

const labels = {
    'denormalization.type.label': {
        label: 'l_typology_type',
        order: 2,
    },
    subtype: {
        label: 'l_typology_subtype',
        order: 3,
    },
    'title.content': {
        label: 'b_title',
        order: 7,
    },
    subtitles: {
        label: 'b_subtitle',
        order: 8,
    },
    lang: {
        label: 'b_lang_publication',
        order: 4,
    },
    'denormalization.journal': {
        label: 'b_journal',
        order: 9,
    },
    'denormalization.conference': {
        label: 'b_conference',
        order: 11,
    },
    'denormalization.contributors': {
        label: 'b_contributor',
        order: 6,
    },
    publication_title: {
        label: 'b_chapter_journal_title',
        order: 10,
    },
    'dates.publication': {
        label: 'b_date_published',
        order: 5,
    },
    'localisation.city': {
        label: 'b_city',
        order: 12,
    },
    'denormalization.localisation.country': {
        label: 'b_country',
        order: 13,
    },
    abstracts: {
        label: 'b_abstract',
        order: 17,
    },
    'denormalization.editor': {
        label: 'b_editor',
        order: 14,
    },
    ids: {
        label: 'b_handle_id',
        order: 0,
    },
    _id: {
        label: 'b_publications_id',
        order: 1,
    },
    keywords: {
        label: 'b_keywords',
        order: 15,
    },
    'denormalization.demovoc_keywords': {
        label: 'b_keywords_thesaurus',
        order: 16,
    },
    'diffusion.research_teams': {
        label: 'b_research_team',
        order: 18,
    },
    'denormalization.diffusion.surveys': {
        label: 'b_survey',
        order: 22,
    },
    'diffusion.projects': {
        label: 'b_project',
        order: 19,
    },
    'denormalization.diffusion.anr_projects': {
        label: 'l_anr_project',
        order: 21,
    },
    'denormalization.diffusion.european_projects': {
        label: 'l_european_project',
        order: 20,
    },
    'dates.deposit': {
        label: 'l_publication_deposit_date',
        order: 23,
    },
    'dates.update': {
        label: 'l_publication_update',
        order: 24,
    },
    'denormalization.depositor': {
        label: 'l_p_depositor',
        order: 25,
    },
    'denormalization.reviewer': {
        label: 'l_p_reviewer',
        order: 26,
    },
};

module.exports = {
    mapping,
    labels,
};
