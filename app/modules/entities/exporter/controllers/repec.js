// @flow
const _ = require('lodash');
const ConfigUtils = require('../../../utils/config');
const Utils = require('../../../utils/utils');
const EntitiesUtils = require('../../../utils/entities');
const RepecPipeline = require('../pipeline/repec_pipeline');
const URL = require('url');

async function retrieve_repec_config(): Promise<?Object> {
    const myconfig = await ConfigUtils.get_config();
    if (!myconfig) {
        return null;
    }

    const repec_config = Utils.find_value_with_path(myconfig, 'api.repec'.split('.'));
    if (!repec_config) {
        return null;
    }

    return repec_config;
}

async function generate_repec_paper_from_publication(handle: string,
    publication: Object, typology: ?Object): Promise<string> {
    let template = ['Template-Type: ReDIF-Paper 1.0'];
    const typology_name = typology ? typology.name : '_____dummy_____';
    let obj = {};

    for (const key in RepecPipeline.mapping) {
        const pub_info = Utils.find_value_with_path(publication, key.split('.'));
        if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
            continue;
        }
        const info = RepecPipeline.mapping[key];
        let mapper = null;
        if (typology_name in info) {
            mapper = info[typology_name];
        } else if ('__default' in info) {
            mapper = info.__default;
        }

        if (!mapper) {
            continue;
        }

        let subobj = await mapper.picker(pub_info, publication, 'EN', key);
        if (mapper.transformers.length > 0) {
            subobj = await mapper.transformers.reduce((o, tr) => {
                o = tr(o);
                return o;
            }, subobj);
        }
        obj = _.mergeWith(obj, subobj, (objValue, srcValue) => {
            if (_.isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        });
    }

    template = RepecPipeline.fields.reduce((arr, field) => {
        if (!(field in obj)) {
            return arr;
        }

        if (field === 'Authors') {
            obj.Authors.forEach((a) => {
                arr.push(`Author-Name: ${a['Author-Name']}`);
                if ('Author-Name-First' in a) {
                    arr.push(`Author-Name-First: ${a['Author-Name-First']}`);
                }
                arr.push(`Author-Name-Last: ${a['Author-Name-Last']}`);
            });
        } else {
            arr.push(`${field}: ${obj[field]}`);
        }
        return arr;
    }, template);

    template.push(`Number: ${publication._id}`);
    template.push(`Handle: ${handle}:wpaper:${publication._id}`);
    return template.join('\n');
}

async function export_repec_paper(ctx: Object): Promise<any> {
    const params = ctx.params;
    const paper = params.rdf;
    const handle = params.handle;

    const repec_config = await retrieve_repec_config();

    if (!repec_config || !repec_config.enabled) {
        ctx.status = 404;
        return;
    }

    if (!paper) {
        ctx.type = 'html';
        const htmllist = '<html><body>__PLACEHOLDER__</body></html>';
        let search_after;
        let list = '';
        while (true) {
            const query = {
                size: 1000,
                sort: [{ _uid: 'desc' }],
                search_after,
                projection: [],
                where: {
                    $and: [
                        { status: ['published', 'unpublished'] },
                        { 'diffusion.rights.exports.repec': true },
                    ],
                },
            };
            const publications = await EntitiesUtils.search_and_get_sources('publication', query);
            if (publications.length === 0) {
                break;
            }
            search_after = [`publication#${publications[publications.length - 1]._id}`];

            list = publications.reduce((str, pub) => {
                str += `<a href='wpaper/${pub._id}.rdf'>${pub._id}.rdf</a><br />`;
                return str;
            }, list);
        }

        ctx.body = htmllist.replace('__PLACEHOLDER__', list);
        return;
    }

    ctx.type = 'application/rdf';
    const id = paper.slice(0, paper.length - '.rdf'.length);
    const publication = await EntitiesUtils.retrieve_and_get_source('publication', id);

    if (!publication) {
        ctx.status = 404;
        return;
    }

    const typology = await EntitiesUtils.retrieve_and_get_source('typology', publication.type);
    ctx.body = await generate_repec_paper_from_publication(`RePEc:${handle}`,
    publication, typology);
}

async function export_repec(ctx: Object): Promise<any> {
    const params = ctx.params;
    const rdf = params.rdf;
    const handle = params.handle;

    const repec_config = await retrieve_repec_config();

    if (!repec_config || !repec_config.enabled) {
        ctx.status = 404;
        return;
    }

    if (!rdf) {
        const originalUrl = ctx.request.originalUrl.replace(/\/$/, '');
        const archUrl = URL.resolve('', `${originalUrl}/${handle}arch.rdf`);
        const serieUrl = URL.resolve('', `${originalUrl}/${handle}seri.rdf`);
        const wpaperUrl = URL.resolve('', `${originalUrl}/wpaper`);
        ctx.type = 'html';
        ctx.body = `<html><body><a href='${archUrl}'>${handle}arch.rdf<br /><a href='${serieUrl}'>${handle}seri.rdf</a><br /><a href='${wpaperUrl}'>wpaper</a></body></html>`;
        return;
    }

    ctx.type = 'application/rdf';
    if (rdf.startsWith(`${handle}arch`)) {
        ctx.body = Utils.find_value_with_path(repec_config, 'archive_template'.split('.'));
    } else {
        ctx.body = Utils.find_value_with_path(repec_config, 'series_template.wpaper'.split('.'));
    }
}

module.exports = {
    export_repec,
    export_repec_paper,
};
