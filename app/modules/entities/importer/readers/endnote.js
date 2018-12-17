// @flow
const XMLUtils = require('../../../utils/xml');
const StreamUtils = require('../../../utils/streams');
const MinioUtils = require('../../../utils/minio');
const Utils = require('../../../utils/utils');

async function read_endnote(filepath: string): Promise<Array<Object>> {
    const stream = await MinioUtils.retrieve_file(MinioUtils.default_bucket, filepath);
    const str = await StreamUtils.to_string(stream);
    const json = await XMLUtils.to_object(str);
    return Utils.find_value_with_path(json, 'xml.records.0.record'.split('.')) || [];
}

module.exports = read_endnote;
