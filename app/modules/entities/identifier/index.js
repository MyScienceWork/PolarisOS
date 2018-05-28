const Routes = require('./routes');
const Model = require('./models/users');
const User = require('./user');
const Controller = require('./controllers');
const Middlewares = require('./middlewares');

module.exports = {
    Controller,
    Routes,
    Model,
    User,
    Middlewares,
};
