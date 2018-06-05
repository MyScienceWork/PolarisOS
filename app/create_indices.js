const elasticsearch = require('elasticsearch');
const _ = require('lodash');
const config = require('./config');
const mappings = require('./mappings');
// const mappings = require('/Users/Cocophotos/Desktop/mappings');
const settings = require('./settings');

const client = new elasticsearch.Client(config.elasticsearch);
const index_prefix = config.elasticsearch.index_prefix;

function create() {
    /* Object.keys(mappings).forEach((name) => {
        let index = mappings[name];

        if (name in settings) {
            index = _.merge({}, mapping, settings[name]);
        } else {
            console.warn(`No settings for mapping ${name}`);
        }
        const response = client.indices.create({
            index: name, // `${config.elasticsearch.index_prefix}_${name}`,
            body: index,
        });

        response.then((result) => {
            console.log(`Success when creating index for ${name}`);
            console.log(result);
        }).catch((err) => {
            console.error(`Error when creating index for ${name}`);
            console.error(err);
        });
    });*/

    _.forEach(mappings, (mapping, name) => {
        let index = mapping;

        if (name in settings) {
            index = _.merge({}, mapping, settings[name]);
        } else {
            console.warn(`No settings for mapping ${name}`);
        }

        if (['msw', 'uspc'].indexOf(index_prefix) !== -1 && name === 'publication') {
            return;
        }

        if (name === 'mswpublication') {
            index = _.merge({}, { mappings: { publication: mapping.mappings[name] } },
                settings[name]);
            name = 'publication';
        }

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

function update() {
    _.forEach(mappings, (mapping, name) => {
        if (['msw', 'uspc'].indexOf(index_prefix) !== -1 && name === 'publication') {
            return;
        }

        if (name === 'mswpublication') {
            name = 'publication';
        }
        const body = {
            properties: mapping.mappings[name].properties,
        };

        if ('_meta' in mapping.mappings[name]) {
            body._meta = mapping.mappings[name]._meta;
        }

        const response = client.indices.putMapping({
            index: `${config.elasticsearch.index_prefix}_${name}`,
            type: name,
            body,
        });

        response.then((result) => {
            console.log(`Success when updating mapping for index ${name}`);
            console.log(result);
        }).catch((err) => {
            console.error(`Error when updating mapping for index ${name}`);
            console.error(err);
        });
    });
}

module.exports = {
    create,
    update,
};

if (require.main === module) {
    const argv = require('funwithflags')(process.argv.slice(2));
    if ('update' in argv) {
        update();
    } else if ('create' in argv) {
        create();
    } else {
        console.error('Unknonw flags, you should only use --update or --create');
    }
}
