const Routes = require('./routes');
const Model = require('./models/workflows');
const Workflow = require('./workflow');
const Controller = require('./controllers');
const Middlewares = require('./middlewares');

module.exports = {
    Controller,
    Routes,
    Model,
    Workflow,
    Middlewares,
};
