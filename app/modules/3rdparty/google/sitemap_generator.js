// @flow
const FS = require('fs');
const Readable = require('stream').Readable;
const ConfigUtils = require('../../utils/config');
const MinioUtils = require('../../utils/minio');
const Pages = require('../../utils/pages');
const Publications = require('../../utils/publications');
const Logger = require('../../../logger');
const Profiles = require('../../utils/profiles');

async function get_google_config(): Promise<?Object> {
    const myconfig = await ConfigUtils.get_config();
    if (!myconfig || !('api' in myconfig) || !('google' in myconfig.api)) {
        return null;
    }
    return myconfig.api.google.sitemap;
}

async function get_base_url(): Promise<?Object> {
    const myconfig = await ConfigUtils.get_config();
    return myconfig.base_url;
}

async function generate(): Promise<?Object> {
    const pages = await Pages.get_pages();
    const publications = await Publications.get_publications();
    const profiles = await Profiles.get_profiles();
    const base_url = await get_base_url();
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // add pages menu
    pages.forEach((page) => {
        if (page.route.lastIndexOf(':') === -1) {
            sitemap += `<url><loc>${base_url}${page.route}</loc></url>`;
        }
    });

    // add view publications
    publications.forEach((publication) => {
        sitemap += `<url><loc>${base_url}/view/${publication._id}</loc></url>`;
    });

    // add author profile
    profiles.forEach((profile) => {
        if (profile.author && profile.public_profile && profile.public_profile === true) {
            sitemap += `<url><loc>${base_url}/a/${profile.author}/profile</loc></url>`;
        }
    });

    sitemap += '</urlset>';

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
        mimetype: 'application/xml',
    };


    await MinioUtils.create_bucket_if_needed(MinioUtils.sitemap_bucket);
    await MinioUtils.put_into_bucket(MinioUtils.sitemap_bucket, fileinfo);
}

module.exports = {
    get_google_config,
    generate,
};
