const Handlebars = require('handlebars');
const MomentHandler = require('handlebars.moment');

MomentHandler.registerHelpers(Handlebars);

module.exports = Handlebars;
