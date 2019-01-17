// @flow
const Readline = require('readline');
const MinioUtils = require('../../../utils/minio');

async function consume_ris_into_json(rl: any): Promise<Array<Object>> {
    const promise = new Promise((resolve) => {
        const ris_publications = [];
        let last_read_key = '';
        let ris_publication = {};

        rl.on('line', (line) => {
            if (line.trim() !== '') {
                const splitting = line.trim().split('  -');

                let key = '';
                let value = '';
                if (splitting.length === 1 && splitting[0].trim() !== 'ER') {
                    key = last_read_key;
                    value = splitting[0].trim();
                } else {
                    key = splitting[0].trim();
                    last_read_key = key;
                    value = splitting[1].trim();
                }
                if (key === 'ER') {
                    ris_publications.push(ris_publication);
                    ris_publication = {};
                } else if (key in ris_publication) {
                    if (splitting.length === 1) {
                        ris_publication[key][ris_publication[key].length - 1] += `\n${value}`;
                    } else {
                        ris_publication[key].push(value);
                    }
                } else {
                    ris_publication[key] = [value];
                }
            }
        });

        rl.on('close', () => {
            resolve(ris_publications);
        });
    });

    return promise;
}

async function read_ris(filepath: string): Promise<Array<Object>> {
    const stream = await MinioUtils.retrieve_file(MinioUtils.default_bucket, filepath);

    const rl = Readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    return await consume_ris_into_json(rl);
}

module.exports = read_ris;
