const Router = require('koa-router');
const RouterUtils = require('../modules/utils/router');

function initialize_routes() {
    const router = new Router();
    const entities = ['citation'];

    entities.forEach((e) => {
        RouterUtils.generate_entity_routes(router, e, []);
    });
    return router;
}

module.exports = initialize_routes;
