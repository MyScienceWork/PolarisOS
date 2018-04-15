// @flow
const Feed = require('feed');
const EntitiesUtils = require('../../utils/entities');
const Errors = require('../../exceptions/errors');
const Handlebars = require('../../utils/templating');

const feed = new Feed({
    title: 'l_rss_title',
    description: 'l_rss_description',
    id: 'l_rss_id',
    link: 'l_rss_link',
    copyright: 'l_rss_copyright',
});

async function generate_rss_feed(ctx: Object): Promise<*> {
    const body = ctx.request.params;

    const entity = body.entity;
    const mapping = JSON.parse(Buffer.from(body.mapping, 'base64').toString());

    let query = {};
    let sort = [];
    let size = 2000;

    if (body.query) {
        query = JSON.parse(Buffer.from(body.query, 'base64').toString());
    }

    if (body.sort) {
        sort = JSON.parse(Buffer.from(body.sort, 'base64').toString());
    }

    if (body.size) {
        size = Math.min(parseInt(body.size, 10), size);
    }

    const items = await EntitiesUtils.search_and_get_sources(entity, {
        size,
        sort,
        where: query,
    });

    items.forEach((item) => {
        feed.addItem({
            title: Handlebars.compile(mapping.title)(item),
            id: Handlebars.compile(mapping.id)(item),
            link: Handlebars.compile(mapping.link)(item),
            description: mapping.description ? Handlebars.compile(mapping.description)(item) : '',
            content: mapping.content ? Handlebars.compile(mapping.content)(item) : '',
        });
    });

    ctx.set('Content-Type', 'application/rss+xml');
    ctx.body = feed.rss2();
}

module.exports = {
    generate_rss_feed,
};
