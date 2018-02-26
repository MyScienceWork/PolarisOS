const Minio = require('minio');
const Config = require('../../config');
const Logger = require('../../logger');
const Errors = require('../exceptions/errors');

const minio_client = new Minio.Client({
    endPoint: Config.minio.host,
    port: Config.minio.port,
    secure: Config.minio.secure,
    accessKey: Config.minio.accessKey,
    secretKey: Config.minio.secretKey,
});

async function create_bucket_if_needed(bucket_name) {
    try {
        await new Promise((resolve, reject) => {
            minio_client.makeBucket(bucket_name, 'us-east-1', (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    } catch (err) {
        Logger.error(`Unable to create bucket ${bucket_name} for Minio server`);
        Logger.error(err);
    }
}

async function put_into_bucket(bucket_name, fileinfo) {
    try {
        await (new Promise((resolve, reject) => {
            minio_client.fPutObject(bucket_name, fileinfo.filename, fileinfo.path, fileinfo.mimetype, (err, etag) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        }));
    } catch (err) {
        Logger.error(`Unable to create file ${fileinfo.path} into Minio bucket ${bucket_name}`);
        Logger.error(err);
    }
}

async function retrieve_file(bucket_name, filename) {
    try {
        const object_stream = await (new Promise((resolve, reject) => {
            minio_client.getObject(bucket_name, filename, (error, stream) => {
                if (error) {
                    return reject(error);
                }
                return resolve(stream);
            });
        }));

        return object_stream;
    } catch (err) {
        Logger.error('Error when retrieving file');
        Logger.error(err);
        throw Errors.DownloadDoesNotExist;
    }
}

module.exports = {
    put_into_bucket,
    retrieve_file,
    create_bucket_if_needed,
    default_bucket: Config.minio.default_bucket,
};
