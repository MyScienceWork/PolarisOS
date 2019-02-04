const Config = require('../../config');

function get_current_environment() {
    return Config._env;
}

function is_production() {
    return get_current_environment() === 'production';
}

function is_development() {
    return get_current_environment() === 'development';
}

function is_demo() {
    return get_current_environment() === 'demo';
}

function is_local() {
    return get_current_environment() === 'local';
}

module.exports = {
    get_current_environment,
    is_demo,
    is_local,
    is_production,
    is_development,
};
