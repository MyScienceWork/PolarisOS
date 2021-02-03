// @flow
const Feed = require('feed').Feed;
const EntitiesUtils = require('../../utils/entities');
const LangUtils = require('../../utils/lang');
const Errors = require('../../exceptions/errors');
const Handlebars = require('../../utils/templating');

function removeXMLInvalidChars(string, removeDiscouragedChars = true)
{
    // remove everything forbidden by XML 1.0 specifications, plus the unicode replacement character U+FFFD
    var regex = /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;
    string = string.replace(regex, "");

    if (removeDiscouragedChars) {
        // remove everything not suggested by XML 1.0 specifications
        regex = new RegExp(
          "([\\x7F-\\x84]|[\\x86-\\x9F]|[\\uFDD0-\\uFDEF]|(?:\\uD83F[\\uDFFE\\uDFFF])|(?:\\uD87F[\\uDF"+
          "FE\\uDFFF])|(?:\\uD8BF[\\uDFFE\\uDFFF])|(?:\\uD8FF[\\uDFFE\\uDFFF])|(?:\\uD93F[\\uDFFE\\uD"+
          "FFF])|(?:\\uD97F[\\uDFFE\\uDFFF])|(?:\\uD9BF[\\uDFFE\\uDFFF])|(?:\\uD9FF[\\uDFFE\\uDFFF])"+
          "|(?:\\uDA3F[\\uDFFE\\uDFFF])|(?:\\uDA7F[\\uDFFE\\uDFFF])|(?:\\uDABF[\\uDFFE\\uDFFF])|(?:\\"+
          "uDAFF[\\uDFFE\\uDFFF])|(?:\\uDB3F[\\uDFFE\\uDFFF])|(?:\\uDB7F[\\uDFFE\\uDFFF])|(?:\\uDBBF"+
          "[\\uDFFE\\uDFFF])|(?:\\uDBFF[\\uDFFE\\uDFFF])(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\"+
          "uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|"+
          "(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))", "g");
        string = string.replace(regex, "");
    }

    return string;
}

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
            title: removeXMLInvalidChars(Handlebars.compile(mapping.title)(item)),
            id: removeXMLInvalidChars(Handlebars.compile(mapping.id)(item)),
            link: removeXMLInvalidChars(Handlebars.compile(mapping.link)(item)),
            description: removeXMLInvalidChars(mapping.description.toString("utf8")) ? removeXMLInvalidChars(Handlebars.compile(mapping.description)(item)) : '',
            content: removeXMLInvalidChars(mapping.content) ? removeXMLInvalidChars(Handlebars.compile(mapping.content)(item)) : '',
        });
    });

    ctx.set('Content-Type', 'application/rss+xml; charset=utf-8');
    ctx.body = feed.rss2();
}

module.exports = {
    generate_rss_feed,
};
