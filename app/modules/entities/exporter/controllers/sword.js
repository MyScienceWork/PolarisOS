// @flow

const Request = require('superagent');
const Config = require('../../../../config');
const ConfigUtils = require('../../../utils/config');
const Utils = require('../../../utils/utils');
const Logger = require('../../../../logger');
const Archiver = require('archiver');
const MinioUtils = require('../../../utils/minio');
const Streams = require('stream');
const Errors = require('../../../exceptions/errors');
const EntitiesUtils = require('../../../utils/entities');
const HalExporter = require('./hal');

async function get_hal_config(): Promise<?Object> {
    const global_config = await ConfigUtils.get_config();
    if (!global_config) {
        Logger.error('Unable to find config in ES');
        return null;
    }

    const hal_config = await Utils.find_value_with_path(global_config, 'api.hal'.split('.'));

    if (!hal_config) {
        Logger.error('Unable to find HAL config in ES');
        return null;
    }

    if (!hal_config.enabled) {
        return null;
    }

    const login = hal_config.login;
    const password = hal_config.password;
    const url = hal_config.url;

    if (!login || !password || !url) {
        Logger.error('Required information for HAL not found in ES');
        return null;
    }

    return { login, password, url, enabled: hal_config.enabled };
}

async function create(pid: string): Promise<any> {
    const hal_config = await get_hal_config();

    if (!hal_config) {
        return false;
    }

    const { url, password, login } = hal_config;

    const publication = await EntitiesUtils.retrieve_and_get_source('publication', pid);
    if (!publication) {
        throw Errors.InvalidEntity;
    }

    const xml_tei = await HalExporter.transform_publication_to_hal(publication);
    const files = Utils.find_value_with_path(publication, 'files'.split('.')) || [];

    console.log(xml_tei);

    let req = Request.post(url)
        .set('Packaging', 'http://purl.org/net/sword-types/AOfr')
        .auth(encodeURIComponent(login), encodeURIComponent(password));

    if (files.length === 0) {
        req = req.set('Content-Type', 'text/xml')
            .send(xml_tei);
    } else {
        const archive = Archiver('zip', {
            zlib: { level: 1 }, // Sets the compression level.
        });

        const xml_stream = new Streams.Readable();
        xml_stream.push(xml_tei);
        xml_stream.push(null);

        archive.append(xml_stream, { name: 'meta.xml' });
        for (const file in files) {
            const stream = await MinioUtils.retrieve_file(MinioUtils.default_bucket, file.url);
            archive.append(stream, { name: file.url });
        }

        req = req.set('Content-Type', 'application/zip')
                .attach('meta.xml', archive.finalize());
    }

    try {
        const result = await req;
        console.log(result.body, result.json, result.text);
        return true;
    } catch (err) {
        Logger.error('Error when sending deposit to HAL');
        Logger.error(err);
        return false;
    }
}

async function update(pid: string): Promise<any> {

}

async function remove(pid: string): Promise<any> {

}

async function create_controller(ctx: Object): Promise<any> {
    const body = ctx.request.body;
    const pid = body.publication;
    const res = await create(pid);
    ctx.body = { ok: res };
}

async function update_controller(ctx: Object): Promise<any> {

}

async function remove_controller(ctx: Object): Promise<any> {

}

module.exports = {
    create_controller,
    remove_controller,
    update_controller,
};
