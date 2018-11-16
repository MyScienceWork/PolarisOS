const FS = require('fs');
const Path = require('path');
const Config = require('../config');
const Logger = require('../logger');

const resolver = p => Path.resolve(Path.join(Config.root, '../app/csl_styles', p));

const styles = {
    ined_hceres: resolver('styles/hceres.csl'),
    ined_apa: resolver('styles/apa.csl'),
    ined_vancouver: resolver('styles/vancouver.csl'),
    ined_harvard: resolver('styles/harvard.csl'),
    population: resolver('styles/population.csl'),
    chicago: resolver('styles/chicago.csl'),
    iso_690: resolver('styles/iso690.csl'),
    springer_humanities: resolver('styles/springer_humanities.csl'),
};


async function add_styles(Cite, mystyles) {
    for (const key in mystyles) {
        const filename = mystyles[key];
        try {
            const template = await new Promise((resolve, reject) => {
                FS.readFile(filename, 'utf-8', (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(data);
                });
            });
            Cite.CSL.register.addTemplate(key, template);
        } catch (err) {
            Logger.error(`Error when reading ${filename}`);
            Logger.error(err);
        }
    }
    return Cite;
}

module.exports = {
    add_styles,
    styles,
};
