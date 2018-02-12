// @flow
const RouterUtils = require('../../../utils/router');

module.exports = {};

async function create_route(obj: Object, opts: Object) {
    const router = opts.router;
    if (router == null) {
        return;
    }

    console.log('router is OK, looking for obj');
    console.log(obj);
    const name = obj.db.source.type;
    console.log('name is', name);
    if (name == null) {
        return;
    }

    RouterUtils.generate_entity_routes(router, name, []);
}

module.exports.create_route = create_route;
