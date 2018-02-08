// @flow
const EntitiesUtils = require('../../../utils/entities');

async function export_information(ctx: Object): Promise<any> {
    const body = ctx.request.body;

    const type = body.type;
    const ids = body.ids;

    if (type == null) {
        ctx.body = {};
    }

    const publications = await EntitiesUtils.search('publication', {
        where: {
            $$ids: { values: ids },
        },
    });

    console.log(publications);

    switch (type) {
    default:
    case 'bibtex':
        break;
    case 'ris':
        break;
    case 'csv':
        break;
    case 'endnote':
        break;
    }
}
module.exports = {
    export_information,
};
