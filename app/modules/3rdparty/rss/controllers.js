// @flow

async function generate_rss_feed(ctx: Object): Promise<*> {
    const body = ctx.request.body;

    const entity = body.entity;
    const size = Math.min(body.size, 2000);
    const mapping = body.mapping;
    const sort = body.sort;

    ctx.set('Content-Type', 'application/rss+xml');
    ctx.body = {};
}

module.exports = {
    generate_rss_feed,
};
