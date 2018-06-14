const Auth = require('../utils/auth');

module.exports = {
    methods: {
        has_c_access(entity) {
            return Auth.has_access(entity, 'c');
        },
        has_r_access(entity) {
            return Auth.has_access(entity, 'r');
        },
        has_u_access(entity) {
            return Auth.has_access(entity, 'u');
        },
        has_d_access(entity) {
            return Auth.has_access(entity, 'd');
        },
        has_cu_access(entity) {
            return this.has_c_access(entity) || this.has_u_access(entity);
        },
        has_some_access(entity) {
            return this.has_cu_access(entity)
                || this.has_r_access(entity)
                || this.has_d_access(entity);
        },
    },
};
