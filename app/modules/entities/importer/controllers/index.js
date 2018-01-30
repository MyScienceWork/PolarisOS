// @flow
const EntitiesUtils = require('../../../utils/entities');

async function import_information(ctx: Object): Promise<any> {
    const body = ctx.request.body;

    if (body.importer == null) {
        ctx.body = {};
        return;
    }

    const importer_id = body.importer;
}

module.exports = {
    import_information,
};
