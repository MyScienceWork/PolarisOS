const elasticsearch = require('elasticsearch');
const _ = require('lodash');
const config = require('./config');
const mappings = require('./mappings');
const settings = require('./settings');

const client = new elasticsearch.Client(config.elasticsearch);

function create() {
    _.forEach(mappings, (mapping, name) => {
        const index = _.merge({}, mapping, settings[name]);
        const response = client.indices.create({
            index: `${config.elasticsearch.index_prefix}_${name}`,
            body: index,
        });

        response.then((result) => {
            console.log(`Success when creating index for ${name}`);
            console.log(result);
        }).catch((err) => {
            console.error(`Error when creating index for ${name}`);
            console.error(err);
        });
    });
}

module.exports = {
    create,
};
