// @flow
const FS = require('fs');
const Readable = require('stream').Readable;
const ConfigUtils = require('../../utils/config');
const MinioUtils = require('../../utils/minio');

async function get_google_config(): Promise<?Object> {
    const myconfig = await ConfigUtils.get_config();
    if (!myconfig || !('api' in myconfig) || !('google' in myconfig.api)) {
        return null;
    }
    return myconfig.api.google;
}

async function generate(): Promise<?Object> {
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';

    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
               <url>
                  <loc>http://www.example.com/</loc>
               </url>
            </urlset> `;

    const sitemap_path = '/tmp/sitemap.xml';

    const sitemap_stream = new Readable();
    sitemap_stream.push(sitemap);
    sitemap_stream.push(null);

    await new Promise((resolve, reject) => {
        const writableStream1 = FS.createWriteStream(sitemap_path);
        sitemap_stream.pipe(writableStream1);
        writableStream1.on('error', (err) => {
            writableStream1.close();
            reject(err);
        });
        writableStream1.on('finish', () => {
            writableStream1.close();
            resolve();
        });
    });

    const fileinfo = {
        filename: 'sitemap.xml',
        path: sitemap_path,
        mimetype: {
            'Content-Type': 'application/xml',
        },
    };

    await MinioUtils.create_bucket_if_needed(MinioUtils.sitemap_bucket);
    await MinioUtils.put_into_bucket(MinioUtils.sitemap_bucket, fileinfo);
}

module.exports = {
    get_google_config,
    generate,
};
