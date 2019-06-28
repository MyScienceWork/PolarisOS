const Routes = require('./routes');
const Model = require('./models/caches');
const Cache = require('./cache');
const Controller = require('./controllers');
const Middlewares = require('./middlewares');

module.exports = {
    Controller,
    Routes,
    Model,
    Cache,
    Middlewares,
};
