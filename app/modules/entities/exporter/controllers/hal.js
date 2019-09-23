// @flow
const moment = require('moment-timezone');
const _ = require('lodash');
const Utils = require('../../../utils/utils');
const EntitiesUtils = require('../../../utils/entities');
const CountriesCodes = require('../../../utils/countries');

// HAL DOMAIN: shs

async function get_hal_type(publication: Object): Promise<string> {
    const type = Utils.find_value_with_path(publication, 'type'.split('.'));
    const subtype = Utils.find_value_with_path(publication, 'subtype'.split('.'));
    const typology = await EntitiesUtils.retrieve_and_get_source('typology', type);

    if (!typology) {
        return 'UNDEFINED';
    }

    if (subtype) {
        const child = typology.children.find(c => c.name === subtype);
        if (child) {
            return child.hal || 'UNDEFINED';
        }
    }
    return typology.hal || 'UNDEFINED';
}

async function get_author_info(author: Object, publication: Object): Promise<string> {
    const author_id = author.label || '__dummy__';
    const author_info = await EntitiesUtils.retrieve_and_get_source('author', author_id);

    if (!author_info) {
        return '';
    }

    let role_info = null;
    const roles_info = await EntitiesUtils.search_and_get_sources('contributor_role', {
        where: { value: author.role }, size: 1,
    });

    if (roles_info.length === 0) {
        role_info = { hal: 'aut', value: 'author' };
    } else {
        role_info = roles_info[0];
    }

    let affiliation = '';
    // TODO do it better (less hackish)
    if (author_info.is_ined) {
        affiliation += '<affiliation ref="#struct-57627" />';
    }

    const forename_ = author_info.firstname && author_info.firstname.trim() !== '' ?
        `<forename type="first">${_.escape(author_info.firstname)}</forename>` : '';

    return `<author role="${_.escape(role_info.hal)}">`
        + `<persName>${forename_}<surname>${_.escape(author_info.lastname)}</surname></persName>${affiliation}</author>`;
}

async function get_title_stmt(publication: Object, tag: string = 'titleStmt'): Promise<string> {
    const lang = Utils.find_value_with_path(publication, 'lang'.split('.')).toLowerCase();

    // Titles
    const title = Utils.find_value_with_path(publication, 'title.content'.split('.'));
    const ttitles = Utils.find_value_with_path(publication, 'translated_titles'.split('.')) || [];

    const ok_ttitles = ttitles.filter(t => t.lang != null && t.lang.trim() !== '');

    let titles_ = [`<title xml:lang="${_.escape(lang)}">${_.escape(title)}</title>`];
    titles_ = titles_.concat(ok_ttitles.map(t => `<title xml:lang="${_.escape(t.lang.toLowerCase())}">${_.escape(t.content)}</title>`));
    //------------------

    // Subtitles
    const subtitles = Utils.find_value_with_path(publication, 'subtitles'.split('.')) || [];

    const ok_subtitles = subtitles.filter(t => t.lang != null && t.lang.trim() !== '');

    const subtitles_ = ok_subtitles.map(t => `<title type="sub" xml:lang="${_.escape(t.lang.toLowerCase())}">${_.escape(t.content)}</title>`);
    //------------------

    const authors = Utils.find_value_with_path(publication, 'contributors'.split('.')) || [];

    const authors_ = await Promise.all(authors.map(a => get_author_info(a, publication)));

    //------------------
    // ANR Projects
    const anr_projects = (Utils.find_value_with_path(publication, 'diffusion.anr_projects'.split('.')) || [])
        .map(ap => EntitiesUtils.retrieve_and_get_source('anr_project', ap._id));
    const anr_projects_info = (await Promise.all(anr_projects)).filter(ap => ap != null);

    // European Projects
    const european_projects = (Utils.find_value_with_path(publication, 'diffusion.european_projects'.split('.')) || [])
        .map(ap => EntitiesUtils.retrieve_and_get_source('european_project', ap._id));
    const european_projects_info = (await Promise.all(european_projects)).filter(ep => ep != null);

    const anr_funders = anr_projects_info.map((p) => {
        if (p.hal) {
            return `<funder ref="#projanr-${_.escape(p.hal)}" />`;
        }
        return null;
    }).filter(p => p != null);

    const european_funders = european_projects_info.map((p) => {
        if (p.hal) {
            return `<funder ref="#projeurop-${_.escape(p.hal)}" />`;
        }
        return null;
    }).filter(p => p != null);

    let enclosure = `<${_.escape(tag)}>`;
    enclosure += titles_.join('\n');
    enclosure += subtitles_.join('\n');
    enclosure += authors_.join('\n');

    if (tag === 'titleStmt') {
        enclosure += anr_funders.join('\n');
        enclosure += european_funders.join('\n');
    }

    enclosure += `</${_.escape(tag)}>`;
    return enclosure;
}

async function get_edition_stmt(publication: Object): Promise<string> {
    const files = Utils.find_value_with_path(publication, 'files'.split('.')) || [];
    const dates = Utils.find_value_with_path(publication, 'dates'.split('.')) || {};

    if (files.length === 0) {
        return '';
    }
    const master = files.find(f => f.is_master) || files[0];
    if ((master.access.restricted || master.access.confidential) && !master.access.delayed) {
        return '';
    }

    let embargo = '';

    if (master.access.delayed) {
        const embargo_date = Utils.find_value_with_path(publication, 'diffusion.rights.embargo'.split('.'));
        embargo = `<date notBefore="${moment(embargo_date).tz('Europe/Paris').format('YYYY-MM-DD')}"/>`;
    }

    const file_version = Utils.find_value_with_path(publication, 'publication_version'.split('.')) || '';
    let subtype = 'author';
    // TODO change this by something more reliable
    if (file_version === 'AWEsYcAafoecpXq21Ja4') {
        subtype = 'publisherAgreement';
    }

    const annexes = files.length === 1 ? [] : files.filter(f => !f.is_master);
    const master_ref = `<ref type="file" subtype="${_.escape(subtype)}" target="${_.escape(master.name)}" n="1">${embargo}</ref>`;
    const annexes_refs = annexes.map((a, i) => `<ref type="annex" subtype="other" target="${_.escape(a.name)}" n="${_.escape(i)}"><desc>Deposited annex</desc>${embargo}</ref>`);
    const written = `<date type="whenWritten">${moment(dates.publication).tz('Europe/Paris').format('YYYY-MM-DD')}</date>`;


    let enclosure = '<editionStmt><edition>';
    enclosure += written;
    enclosure += master_ref;
    enclosure += annexes_refs.join('');
    enclosure += '</edition></editionStmt>';
    return enclosure;
}

async function get_publication_stmt(publication: Object): Promise<string> {
    const license = Utils.find_value_with_path(publication, 'diffusion.rights.license'.split('.'));

    if (!license) {
        return '';
    }
    const license_info = await EntitiesUtils.retrieve_and_get_source('license', license);
    if (!license_info) {
        return '';
    }
    if (!license_info.link_HAL || license_info.link_HAL.trim() === '') {
        return '';
    }

    let enclosure = '<publicationStmt><availability>';

    let license_ = `<licence target="${_.escape(license_info.link_HAL)}">`;
    license_ += '</licence>';
    enclosure += license_;

    enclosure += '</availability></publicationStmt>';
    return enclosure;
}

async function get_series_stmt(publication: Object): Promise<string> {
    let enclosure = '<seriesStmt>';
    enclosure += '<idno type="stamp" n="INED">INED</idno>';
    enclosure += '</seriesStmt>';
    return enclosure;
}

async function get_notes_stmt(publication: Object): Promise<string> {
    const description = Utils.find_value_with_path(publication, 'description'.split('.')) || '.';
    const description_ = `<note type="description">${_.escape(description)}</note>`;
    const hal_type = await get_hal_type(publication);
    let report = '';

    if (hal_type === 'REPORT') {
        const report_subtype = Utils.find_value_with_path(publication, 'subtype'.split('.'));
        if (report_subtype === 'research-report' ) {
            report += `<note type="report">${_.escape('Research Report')}</note>`;
        }
    }

    let enclosure = '<notesStmt>';
    enclosure += description_;
    if (hal_type === 'REPORT' && report !== '') {
        enclosure += report;
    }
    enclosure += '</notesStmt>';
    return enclosure;
}

async function get_monogr(publication: Object): Promise<string> {
    const ids = Utils.find_value_with_path(publication, 'ids'.split('.')) || [];
    const isbns = ids.filter(id => id.type === 'isbn');
    const handles = ids.filter(id => id.type === 'handle');
    const journal = Utils.find_value_with_path(publication, 'journal'.split('.')) || '__dummy__';
    const book_title = Utils.find_value_with_path(publication, 'publication_title'.split('.'));
    const dates = Utils.find_value_with_path(publication, 'dates'.split('.')) || {};
    const conference = Utils.find_value_with_path(publication, 'conference'.split('.')) || '__dummy__';
    const localisation = Utils.find_value_with_path(publication, 'localisation'.split('.')) || {};
    const editor = Utils.find_value_with_path(publication, 'editor'.split('.')) || '__dummy__';
    const institution = Utils.find_value_with_path(publication, 'delivery_institution'.split('.')) || '__dummy__';
    const volume = Utils.find_value_with_path(publication, 'volume'.split('.'));
    const issue = Utils.find_value_with_path(publication, 'number'.split('.'));
    const pagination = Utils.find_value_with_path(publication, 'pagination'.split('.'));
    const serie = Utils.find_value_with_path(publication, 'collection'.split('.'));

    const journal_info = await EntitiesUtils.retrieve_and_get_source('journal', journal);
    const conference_info = await EntitiesUtils.retrieve_and_get_source('conference', conference);
    const country_info = await EntitiesUtils.retrieve_and_get_source('country', localisation.country || '__dummy__');
    const editor_info = await EntitiesUtils.retrieve_and_get_source('editor', editor);
    const institution_info = await EntitiesUtils.retrieve_and_get_source('institution', institution);


    let journal_ = '';
    let isbn_ = '';
    let handle_ = '';
    let book_title_ = '';
    let meeting_ = '';
    let settlement_ = '';
    let country_ = '';
    const editor_ = '';
    // const school_ = '';
    let institution_ = '';
    let imprint_ = '';
    let authorities_ = '';

    if (journal_info) {
        const jids = Utils.find_value_with_path(journal_info, 'ids'.split('.')) || [];
        const jname = Utils.find_value_with_path(journal_info, 'name'.split('.')) || '';
        const issn = jids.find(id => id.type === 'issn');
        const eissn = jids.find(id => id.type === 'eissn');
        if (issn) {
            journal_ += `<idno type="issn">${_.escape(issn.value)}</idno>`;
        }
        if (eissn) {
            journal_ += `<idno type="eissn">${_.escape(eissn.value)}</idno>`;
        }
        journal_ += `<title level="j">${_.escape(jname)}</title>`;
    }

    if (isbns.length > 0) {
        isbn_ = isbns.map(isbn => `<idno type="isbn">${_.escape(isbn._id)}</idno>`).join('\n');
    }

    if (handles.length > 0) {
        handle_ = handles.map(handle => `<idno type="localRef">${_.escape(handle._id)}</idno>`).join('\n');
    }

    if (book_title) {
        book_title_ = `<title level="m">${_.escape(book_title)}</title>`;
    }

    if (localisation.city) {
        settlement_ += `<settlement>${_.escape(localisation.city)}</settlement>`;
    }

    if (country_info) {
        if (country_info.value in CountriesCodes) {
            country_ += `<country key="${_.escape(CountriesCodes[country_info.value])}" />`;
        }
    }

    if (conference_info) {
        meeting_ += `<meeting><title>${_.escape(conference_info.name)}</title>`;
        if (dates.start) {
            meeting_ += `<date type="start">${moment(dates.start).tz('Europe/Paris').format('YYYY-MM-DD')}</date>`;
        }
        if (dates.end) {
            meeting_ += `<date type="end">${moment(dates.end).tz('Europe/Paris').format('YYYY-MM-DD')}</date>`;
        }

        meeting_ += settlement_;
        meeting_ += country_;
        meeting_ += '</meeting>';
    }

    /* if (editor_info) {
        editor_ = `<editor>${_.escape(editor_info.label)}</editor>`;
    }*/

    const hal_type = await get_hal_type(publication);

    if (institution_info && institution_info.name) {
        institution_ = `<authority type="institution">${_.escape(institution_info.name)}</authority>`;
    } else if (hal_type === 'REPORT') {
        institution_ = `<authority type="institution">${_.escape(editor_info.label)}</authority>`;
    }

    if (hal_type === 'HDR' || hal_type === 'THESE') {
        const thesis_director = (Utils.find_value_with_path(publication, 'contributors'.split('.')) || []).find(c => c.role === 'director');
        const thesis_supervisor = (Utils.find_value_with_path(publication, 'contributors'.split('.')) || []).find(c => c.role === 'supervisor-thesis');
        if (thesis_director) {
            const th_director = await EntitiesUtils.retrieve_and_get_source('author', thesis_director.label);
            if (th_director) {
                authorities_ += `<authority type="supervisor">${_.escape(th_director.fullname)}</authority>`;
            }
        }
        if (thesis_supervisor) {
            const th_supervisor = await EntitiesUtils.retrieve_and_get_source('author', thesis_supervisor.label);
            if (th_supervisor) {
                authorities_ += `<authority type="supervisor">${_.escape(th_supervisor.fullname)}</authority>`;
            }
        }
    }


    if (editor_info) {
        imprint_ += `<publisher>${_.escape(editor_info.label)}</publisher>`;
    }

    if (volume) {
        imprint_ += `<biblScope unit="volume">${_.escape(volume)}</biblScope>`;
    }

    if (serie) {
        imprint_ += `<biblScope unit="serie">${_.escape(serie)}</biblScope>`;
    }

    if (issue) {
        imprint_ += `<biblScope unit="issue">${_.escape(issue)}</biblScope>`;
    }

    if (pagination) {
        imprint_ += `<biblScope unit="pp">${_.escape(pagination)}</biblScope>`;
    }

    if (dates.publication) {
        switch (hal_type) {
        case 'COUV':
        case 'DOUV':
        case 'THESE':
        case 'OUV':
            imprint_ += `<date type="datePub">${moment(dates.publication).tz('Europe/Paris').format('YYYY')}</date>`;
            break;
        default:
            imprint_ += `<date type="datePub">${moment(dates.publication).tz('Europe/Paris').format('YYYY-MM-DD')}</date>`;
            break;
        }
    }


    if (imprint_.trim() !== '') {
        imprint_ = `<imprint>${imprint_}</imprint>`;
    }

    return `<monogr>${isbn_}${handle_}${journal_}${book_title_}${meeting_}${settlement_}${country_}${editor_}${imprint_}${institution_}${authorities_}</monogr>`;
}

async function get_source_desc(publication: Object): Promise<string> {
    const ids = Utils.find_value_with_path(publication, 'ids'.split('.')) || [];
    const url = Utils.find_value_with_path(publication, 'url'.split('.'));
    const resources = Utils.find_value_with_path(publication, 'resources'.split('.')) || [];
    const doi = ids.find(id => id.type === 'doi');
    const handle = ids.find(id => id.type === 'handle');


    const analytic_ = await get_title_stmt(publication, 'analytic');
    const monogr_ = await get_monogr(publication);

    const doi_ = doi ? `<idno type="doi">${_.escape(doi._id)}</idno>` : '';
    const handle_ = handle ? `<idno type="uri">${_.escape(handle._id)}</idno>` : '';
    const url_ = url ? `<ref type="publisher">${_.escape(url)}</ref>` : '';
    const resources_ = resources.filter(r => r && r.url != null && r.url.trim() !== '')
        .map(r => `<ref type="seeAlso">${_.escape(r.url)}</ref>`).join('\n');
    const bibl_ = analytic_ + monogr_ + doi_ + handle_ + url_ + resources_;
    const recording_ = '';

    let enclosure = `<sourceDesc><biblStruct>${bibl_}</biblStruct>`;
    enclosure += `<recordingStmt>${_.escape(recording_)}</recordingStmt></sourceDesc>`;
    return enclosure;
}

async function get_profile_desc(publication: Object): Promise<string> {
    const abstracts = Utils.find_value_with_path(publication, 'abstracts'.split('.')) || [];
    const keywords = Utils.find_value_with_path(publication, 'keywords'.split('.')) || [];
    const lang = Utils.find_value_with_path(publication, 'lang'.split('.'));
    const ok_abstracts = abstracts.filter(t => t.lang != null && t.lang.trim() !== '');
    const hal_type = await get_hal_type(publication);
    const user_keywords = keywords.filter(k => k.type === 'user');

    const abstracts_ = ok_abstracts.map(a => `<abstract xml:lang="${_.escape(a.lang.toLowerCase())}">${_.escape(a.content)}</abstract>`).join('\n');

    const lang_usage_ = `<langUsage><language ident="${_.escape(lang.toLowerCase())}" /></langUsage>`;

    let keywords_ = '';

    if (user_keywords.length > 0) {
        keywords_ = '<keywords scheme="author">';
        keywords_ += user_keywords.map(k => `<term xml:lang="en">${_.escape(k.value)}</term>`).join('\n');

        if (hal_type === 'THESE' || hal_type === 'HDR') {
            keywords_ += user_keywords.map(k => `<term xml:lang="fr">${_.escape(k.value)}</term>`).join('\n');
        }

        keywords_ += '</keywords>';
    }

    let text_class_ = '<textClass>';
    text_class_ += keywords_;
    text_class_ += '<classCode scheme="halDomain" n="shs" />';
    text_class_ += `<classCode scheme="halTypology" n="${_.escape(hal_type)}" />`;
    text_class_ += '</textClass>';

    let enclosure = '<profileDesc>';
    enclosure += lang_usage_;
    enclosure += text_class_;
    enclosure += abstracts_;
    enclosure += '</profileDesc>';
    return enclosure;
}

async function generate_back(publication: Object): Promise<string> {
    return '<back></back>';
}

async function transform_publication_to_hal(publication: Object): Promise<string> {
    const title = await get_title_stmt(publication);
    const edition = await get_edition_stmt(publication);
    const publi = await get_publication_stmt(publication);
    const series = await get_series_stmt(publication);
    const notes = await get_notes_stmt(publication);
    const source = await get_source_desc(publication);
    const profile = await get_profile_desc(publication);
    const info = title + edition + publi + series + notes + source + profile;

    let enclosure = '<?xml version="1.0" encoding="UTF-8"?>';
    enclosure += '<TEI xmlns="http://www.tei-c.org/ns/1.0" xmlns:hal="http://hal.archives-ouvertes.fr">';
    enclosure += '<text>';
    enclosure += '<body>';
    enclosure += `<listBibl><biblFull>${info}</biblFull></listBibl>`;
    enclosure += '</body>';
    enclosure += '</text>';
    enclosure += '</TEI>';

    return enclosure;
}

module.exports = {
    transform_publication_to_hal,
};
