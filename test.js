const Handlebars = require('handlebars');
const MomentHandler = require('handlebars.moment');

MomentHandler.registerHelpers(Handlebars);

console.log(Handlebars.compile('{{moment utc=true}}')({}));
