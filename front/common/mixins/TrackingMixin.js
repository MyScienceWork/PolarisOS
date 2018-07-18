const APIRoutes = require('../api/routes');
const OAMixin = require('./ObjectAccessMixin');

module.exports = {
    mixins: [OAMixin],
    mounted() {
        const track = this._oa_find(this, 'state.tracking', {});

        if (track.entity_type && track.eid && track.stat_type) {
            this.$store.dispatch('create', {
                path: APIRoutes.custom('itracking_stat/add'),
                form: 'tracking',
                body: {
                    entity_type: track.entity_type,
                    eid: track.eid,
                    stat_type: track.stat_type,
                },
            });
        }
    },
};
