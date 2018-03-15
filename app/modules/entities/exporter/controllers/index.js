// @flow
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');
const Readable = require('stream').Readable;

async function transform_to_csv(publications: Array<Object>): Promise<string> {
    return '';
}

async function transform_to_json(publications: Array<Object>, ld): Promise<string> {
    if (ld) {
        return publications.map(p => JSON.stringify(p)).join('\n');
    }
    return JSON.stringify(publications, null, 4);
}

async function export_information(ctx: Object): Promise<any> {
    const body = ctx.request.body;

    const type = body.type;
    const ids = body.ids;

    if (type == null) {
        ctx.body = {};
    }

    const infos = await EntitiesUtils.search('publication', {
        where: {
            _id: ids,
        },
    });

    const publications = EntitiesUtils.get_hits(infos);
    console.log(publications);

    let results = '';
    let ext = '.bib';

    switch (type) {
    default:
    case 'bibtex':
        ext = '.bib';
        break;
    case 'ris':
        ext = '.ris';
        break;
    case 'csv':
        results = await transform_to_csv(publications);
        ext = '.csv';
        break;
    case 'endnote':
        ext = '.unk';
        break;
    case 'jsonld':
        results = await transform_to_json(publications, true);
        ext = '.jsonld';
        break;
    case 'json':
        results = await transform_to_json(publications, false);
        ext = '.json';
        break;
    }


    const s = new Readable();
    s.push(results);
    s.push(null);

    ctx.set('Content-disposition', `attachment; filename=pos_exports${ext}`);
    ctx.statusCode = 200;
    ctx.body = s;
}
module.exports = {
    export_information,
};
