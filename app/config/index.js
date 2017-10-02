const baseConfig = require('./all');
const _ = require('lodash');

const env = process.env.NODE_ENV || 'development';
let tmp;
try {
  tmp = require(`./${env}.js`); // eslint-disable-line
} catch (error) {
    process.exit(1);
}

const config = _.merge(baseConfig, tmp);
module.exports = config;
