const Routes = require('./routes');
const Model = require('./models/apiusers');
const ApiUser = require('./apiuser');
const Controller = require('./controllers');
const Middlewares = require('./middlewares');

module.exports = {
    Controller,
    Routes,
    Model,
    Middlewares,
    ApiUser,
};
