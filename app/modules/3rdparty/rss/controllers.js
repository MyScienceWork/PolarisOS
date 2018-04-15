// @flow
const Feed = require('feed');
const EntitiesUtils = require('../../utils/entities');
const LangUtils = require('../../utils/lang');
const Errors = require('../../exceptions/errors');
const Handlebars = require('../../utils/templating');


async function generate_rss_feed(ctx: Object): Promise<*> {
    const body = ctx.params;

    const entity = body.entity;
    const lang = body.lang || 'EN';
    let mapping = Buffer.from(body.mapping, 'base64').toString();
    mapping = JSON.parse(mapping);

    let query = {};
    let sort = [];
    let size = 2000;

    if (body.query) {
        query = Buffer.from(body.query, 'base64').toString();
        query = JSON.parse(query);
    }

    if (body.sort) {
        sort = Buffer.from(body.sort, 'base64').toString();
        sort = JSON.parse(sort);
    }

    if (body.size) {
        size = Math.min(parseInt(body.size, 10), size);
    }

    const litems = ['l_rss_title', 'l_rss_description',
        'l_rss_id', 'l_rss_link', 'l_rss_copyright', 'l_p_action'];
    const lang_items = await Promise.all(litems.map(l =>
        LangUtils.get_language_values_from_langs(l, [{ value: lang }])));
    const langs_object = lang_items.reduce((obj, items) => {
        if (items.length > 0) {
            obj[items[0].key] = items[0].value;
        }
        return obj;
    }, {});

    const feed = new Feed({
        title: langs_object.l_rss_title || 'l_rss_title',
        description: langs_object.l_rss_description || 'l_rss_description',
        id: langs_object.l_rss_id || 'l_rss_id',
        link: langs_object.l_rss_link || 'l_rss_link',
        copyright: langs_object.l_rss_copyright || 'l_rss_copyright',
        generator: 'PolarisOS',
    });

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
