// @flow
const moment = require('moment');
const request = require('superagent');
const EntitiesUtils = require('../../../utils/entities');

function import_crossref(doi: string): Promise<any> {
    const url = `https://api.crossref.org/works/${doi}`;
    return request.get(url).set('Accept', 'application/json');
}

async function import_information(ctx: Object): Promise<any> {
    const body = ctx.request.body;

    if (!('doi' in body)) {
        ctx.body = {};
        return;
    }

    let doi = body.doi;
    doi = doi.trim();

    if (doi === '') {
        ctx.body = {};
        return;
    }

    const crossref = await import_crossref(doi);
    const information = crossref.body;
    if (information.status && information.status === 'ok') {
        const message = information.message;
        console.log(message);
        console.log(message.issued);
        ctx.body = {
            number: message.issue || '',
            volume: message.volume || '',
            pagination: message.page || '',
            ids: [
                { _id: doi, type: 'doi' },
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
        return;
    }
    ctx.body = {};


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
