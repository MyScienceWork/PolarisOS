// @flow
const MinioUtils = require('../../utils/minio');
const Logger = require('../../../logger');

async function generate_sitemap_file(ctx: Object): Promise<*> {
    const final_stream = await MinioUtils.retrieve_file(MinioUtils.sitemap_bucket, 'sitemap.xml');
    ctx.set('Content-Type', 'application/xml; charset=utf-8');
    ctx.statusCode = 200;
    ctx.body = final_stream;
}

module.exports = {
    generate_sitemap_file,
};
