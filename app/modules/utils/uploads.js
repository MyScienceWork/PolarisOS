const FS = require('fs');
const Errors = require('../exceptions/errors');
const MinioUtils = require('./minio');


async function add_single(ctx) {
    const file = ctx.request.file;
    await MinioUtils.create_bucket_if_needed(MinioUtils.default_bucket);
    await MinioUtils.put_into_bucket(MinioUtils.default_bucket, file);

    try {
        FS.unlinkSync(file.path);
    } catch (errfs) {}
    ctx.body = { file: file.filename };
}

async function download(ctx) {
    const entity = ctx.params.entity.trim();
    const eid = ctx.params.eid.trim();
    const filename = ctx.params.filename.trim();

    if (entity === '' || eid === '' || filename === '') {
        throw Errors.DownloadDoesNotExist;
    }

    const stream = await MinioUtils.retrieve_file(MinioUtils.default_bucket, filename);
    ctx.body = stream;
}

module.exports = {
    add_single,
    download,
};
