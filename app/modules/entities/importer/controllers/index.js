// @flow
const EntitiesUtils = require('../../../utils/entities');
const request = require('superagent');

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
            ctx.body.dates = { publication: issued.join('-') };
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
