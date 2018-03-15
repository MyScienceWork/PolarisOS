// @flow
const moment = require('moment');
const Request = require('superagent');
const EntitiesUtils = require('../../../utils/entities');
const Errors = require('../../../exceptions/errors');
const Config = require('../../../../config');
const Logger = require('../../../../logger');
const MinioUtils = require('../../../utils/minio');
const StreamUtils = require('../../../utils/streams');
const XMLUtils = require('../../../utils/xml');
const Utils = require('../../../utils/utils');

function request_crossref(doi: string): Promise<any> {
    const url = `https://api.crossref.org/works/${doi}`;
    return Request.get(url).set('Accept', 'application/json');
}

async function import_crossref(ctx: Object, info: string): Promise<any> {
    const crossref = await request_crossref(info);
    const information = crossref.body;
    if (information.status && information.status === 'ok') {
        const message = information.message;
        ctx.body = {
            number: message.issue || '',
            volume: message.volume || '',
            pagination: message.page || '',
            ids: [
                { _id: info, type: 'doi' },
            ],
        };

        if (message.title && message.title.length > 0) {
            ctx.body.title = { content: message.title[0] };
        }

        if (message.subtitle && message.subtitle.length > 0) {
            ctx.body.subtitles = [{ content: message.subtitle[0] }];
        }

        if (message.issued && message.issued['date-parts']
            && message.issued['date-parts'].length > 0) {
            const issued = message.issued['date-parts'][0].filter(i => i != null);
            let format = 'YYYY';
            if (issued.length >= 2) {
                format += '-MM';
            }
            if (issued.length >= 3) {
                format += '-DD';
            }

            ctx.body.dates = { publication: +moment(issued.join('-'), format) };
        }

        if (message.ISBN) {
            message.ISBN.map(isbn => ctx.body.ids.push({ _id: isbn, type: 'isbn' }));
        }

        if (message['container-title'] && message['container-title'].length > 0) {
            ctx.body.publication_title = message['container-title'][0].trim();
        }

        if (message.ISSN && message.ISSN.length > 0) {
            const journal_search = await EntitiesUtils.search('journal', { where: { 'ids.value': message.ISSN }, projection: [] });
            const hits = EntitiesUtils.get_hits(journal_search);

            if (hits.length > 0) {
                ctx.body.journal = hits[0].id;
            }
        }

        if (message['publisher-location']) {
            ctx.body.localisation = {
                city: message['publisher-location'].trim(),
            };
        }

        if (message.publisher && message.publisher.trim() !== '') {
            const publisher = message.publisher.trim();
            const editor_search = await EntitiesUtils.search('editor',
                { where: { label: { $match: { query: publisher, minimum_should_match: '100%' } } } });
            const hits = EntitiesUtils.get_hits(editor_search);

            if (hits.length > 0) {
                ctx.body.editor = hits[0].id;
            } else {
                const editor_result = await EntitiesUtils.create({ label: publisher }, 'editor');
                if (editor_result) {
                    ctx.body.editor = editor_result.id;
                }
            }
        }

        if (message.author && message.author.length > 0) {
            const author_search_promises = message.author.map((a) => {
                const name = `${a.given} ${a.family}`;
                return EntitiesUtils.search('author',
                        { where: { fullname: { $match: { query: name, minimum_should_match: '100%' } } }, size: 1 });
            });

            let results = await Promise.all(author_search_promises);
            results = results.map(r => EntitiesUtils.get_hits(r))
            .filter(r => r != null && r.length > 0);
            ctx.body.contributors = results.map(r => ({ label: r[0].id }));
        }
        return;
    }
    ctx.body = {};
}

async function extract_relevant_information_from_grobid(information) {
    console.log(information);
    const file_description = Utils.find_value_with_path(information, 'TEI.teiHeader.0.fileDesc.0'.split('.'));
    const profile_description = Utils.find_value_with_path(information, 'TEI.teiHeader.0.profileDesc.0'.split('.'));
    const item = {};

    if (!file_description) {
        return item;
    }

    const title = Utils.find_value_with_path(file_description, 'titleStmt.0.title.0._'.split('.'));
    if (title) {
        item.title = { content: title };
    }

    const authors = [...Utils.find_popvalue_with_path(file_description,
            'sourceDesc.0.biblStruct.0.analytic.0.author.persName.0'.split('.'))];

    const final_authors = authors.reduce((arr, a) => {
        const forename = Utils.find_value_with_path(a, 'forename.0._'.split('.'));
        const surname = Utils.find_value_with_path(a, 'surname.0'.split('.'));
        if (!forename || !surname) {
            return arr;
        }
        arr.push(`${forename} ${surname}`);
        return arr;
    }, []);

    const author_search_promises = final_authors.map(a => EntitiesUtils.search('author',
        { where: { fullname: { $match: { query: a, minimum_should_match: '100%' } } }, size: 1 }));

    let results = await Promise.all(author_search_promises);
    results = results.map(r => EntitiesUtils.get_hits(r))
    .filter(r => r != null && r.length > 0);
    item.contributors = results.map(r => ({ label: r[0].id }));

    if (profile_description) {
        const abstract = Utils.find_value_with_path(profile_description, 'abstract.0.p.0'.split('.'));
        if (abstract) {
            item.abstracts = [{ content: abstract }];
        }
    }
    return item;
}

async function import_grobid(ctx: Object, info: string): Promise<*> {
    try {
        const stream = await MinioUtils.retrieve_file(MinioUtils.default_bucket, info);
        const result = await Request.post(`${Config.grobid.host}:${Config.grobid.port}/api/processFulltextDocument`)
            .attach('input', stream, 'file.pdf').buffer().type('xml');
        const object = await XMLUtils.to_object(result.text);
        const publication = await extract_relevant_information_from_grobid(object);
        ctx.body = publication;
        return;
    } catch (err) {
        Logger.error('Unable to analyse PDF using Grobid');
        Logger.error(err);
    }

    ctx.body = {};
}


async function import_information(ctx: Object): Promise<any> {
    const body = ctx.request.body;

    let info = body.info;
    const type = body.type;

    if (!type || !info) {
        ctx.body = {};
        return;
    }

    info = info.trim();

    if (info === '') {
        ctx.body = {};
        return;
    }

    switch (type) {
    case 'doi':
        await import_crossref(ctx, info);
        break;
    case 'pdf':
        await import_grobid(ctx, info);
        break;
    default:
        break;
    }


    /* let importer = null;
    let importer_id = null;
    let connector_id = null;
    let connector = null;
    let pipeline = null;
    let model = null;

    if (body.importer == null) {
        ctx.body = {};
        return;
    }

    importer_id = body.importer;
    importer = await EntitiesUtils.retrieve(importer_id, 'importer');


    if (!importer) {
        ctx.body = {};
        return;
    }


    connector_id = importer.source.connector;
    if (connector_id) {
        connector = await EntitiesUtils.retrieve(connector_id, 'connector');
    }

    if (connector) {
        console.log(connector.source);
    }

    pipeline = await EntitiesUtils.retrieve(importer.source.pipeline, 'pipeline');

    if (pipeline) {
        console.log(pipeline.source);

        model = await pipeline.generate_model(EntitiesUtils.get_index(pipeline.source.entity),
                pipeline.source.entity);
        console.log(model);
    }

    ctx.body = {};*/
}

module.exports = {
    import_information,
};
