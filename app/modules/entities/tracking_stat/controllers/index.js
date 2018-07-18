// @flow
const moment = require('moment');
const EntitiesUtils = require('../../../utils/entities');
const Errors = require('../../../exceptions/errors');
const Utils = require('../../../utils/utils');

async function add_stat(ctx: Object) {
    const body = ctx.request.body;
    const entity_type = body.entity_type;
    const eid = body.eid;
    const stat_type = body.stat_type;

    if (!entity_type || !eid || !stat_type) {
        throw Errors.InvalidEntity;
    }

    const entity = await EntitiesUtils.retrieve_and_get_source(entity_type, eid);
    if (!entity) {
        throw Errors.InvalidEntity;
    }

    const info = {
        entity_type,
        eid,
        stat_type,
        date: +moment.utc(),
    };

    await EntitiesUtils.create(info, 'tracking_stat');

    try {
        if (entity_type === 'publication' && stat_type === 'view') {
            const stats_object = Utils.find_value_with_path(entity, 'system.stats'.split('.'));
            if (stats_object) {
                if ('views' in stats_object) {
                    entity.system.stats.views += 1;
                } else {
                    entity.system.stats.views = 1;
                }
                await EntitiesUtils.update(entity, entity_type);
            }
        }
    } catch (err) {
        // ...
    }

    ctx.body = { ok: true };
}

module.exports = {
    add_stat,
};
