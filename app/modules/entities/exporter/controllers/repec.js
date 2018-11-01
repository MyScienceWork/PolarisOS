// @flow
const ConfigUtils = require('../../../utils/config');
const Utils = require('../../../utils/utils');
const EntitiesUtils = require('../../../utils/entities');

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

async function generate_repec_paper_from_publication(publication: Object): Promise<string> {
    return '';
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
                where: { status: ['published', 'unpublished'] },
            };
            const publications = await EntitiesUtils.search_and_get_sources('publication', query);
            if (publications.length === 0) {
                break;
            }
            search_after = [`publication#${publications[publications.length - 1]._id}`];

            publications.reduce((str, pub) => {
                list += `<a href='wpaper/${pub._id}.rdf'>${pub._id}.rdf</a><br />`;
                return list;
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
    ctx.body = await generate_repec_paper_from_publication(publication);
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
        ctx.type = 'html';
        ctx.body = `<html><body><a href='${handle}/${handle}arch.rdf'>${handle}arch.rdf<br /><a href='${handle}/${handle}seri.rdf'>${handle}seri.rdf</a><br /><a href='${handle}/wpaper'>wpaper</a></body></html>`;
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
