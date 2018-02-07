// @flow
const EntitiesUtils = require('../../../utils/entities');


async function import_information(ctx: Object): Promise<any> {
    const body = ctx.request.body;
    let importer = null;
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

    ctx.body = {};
}

module.exports = {
    import_information,
};
