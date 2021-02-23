const _ = require('lodash');
const Parse = require('csv-parse');
const FS = require('fs');
const GeneratePassword = require('generate-password');
const shortid = require('shortid');
const moment = require('moment');
const Crypto = require('crypto');
const uuid = require('node-uuid');

const ANALYTICS_ROLE_ID = '2ipf6nEBjShZ0-r7xSZP';
const FUNDER_ROLE_ID = 'AWgYSsrCd-JSG1MfLdYB';
const CURATOR_1_ROLE_ID = 'AWgYSj0zd-JSG1MfLdYA';

function generate_key(login) {
    const key = `${uuid.v4() + shortid.generate() + login}`;
    return key;
}

function generate_secret() {
    const key = shortid.generate() + shortid.generate() + shortid.generate();
    const time = +moment();
    const hash = Crypto.createHmac('sha256', `${time}`).update(key).digest('hex');
    return hash;
}

function test_required(flag, argv) {
    if (flag in argv) {
        return;
    }

    console.error(`${flag} is required. Exited...`);
    process.exit(1);
}

function read_csv(filepath) {
    const parser = Parse();
    const input = FS.createReadStream(filepath);
    input.pipe(parser);
    const listPass = [];

    const output = [];
    parser.on('readable', () => {
        while (record = parser.read()) {
            output.push(record);
        }
    });
    parser.on('finish', () => {
        const obj = output.reduce((o, r, i) => {
            if (i === 0) {
                console.log(r);
                return o;
            }

            // console.log('country   r[0] : ', r[0]);
            // console.log('fullname  r[1] : ', r[1]);
            // console.log('email     r[2] : ', r[2]);
            // console.log('analytics r[3] : ', r[3]);
            // console.log('curator_1 r[4] : ', r[4]);
            // console.log('funder    r[5] : ', r[5]);

            r[0] = r[0].trim();
            r[1] = r[1].trim();
            r[2] = r[2].trim().toLowerCase();
            r[3] = r[3].trim();
            r[4] = r[4].trim();
            r[5] = r[5].trim();

            const firstname = r[1].split(' ')[0];
            const lastname = r[1].split(' ').reduce((o, r, i) => { if (i === 0) { return o; } o.push(r); return o; }, []).join(' ');
            const uid = r[1].replace(/\s+/g, '-').toLowerCase();

            const roles = [];
            if (r[3] === 'X') {
                roles.push({ _id: ANALYTICS_ROLE_ID });
            }
            if (r[4] === 'X') {
                roles.push({ _id: CURATOR_1_ROLE_ID });
            }
            if (r[5] === 'X') {
                roles.push({ _id: FUNDER_ROLE_ID });
            }

            // console.log('firstname : ', firstname);
            // console.log('lastname : ', lastname);

            const password = GeneratePassword.generate({
                length: 10,
                numbers: true,
            });

            let hpassword = Crypto.createHash('sha1').update(password).digest('hex');
            hpassword = Crypto.createHash('sha1').update(hpassword).digest('hex');

            listPass.push({
                mail: r[2],
                password,
            });

            const newItem = {
                locked: false,
                enabled: true,
                force_deconnection: true,
                authentication: {
                    key: generate_key(''),
                    secret: generate_secret(),
                },
                firstname,
                lastname,
                preferred_language: 'EN',
                uid,
                emails: [
                    {
                        email: r[2],
                        master: true,
                    },
                ],
                roles,
                fullname: r[1],
                password: hpassword,
            };
            o.push(newItem);

            console.log(JSON.stringify({ index: {} }));
            console.log(JSON.stringify(newItem));

            return o;
        }, []);

        // console.log(JSON.stringify(obj, null, 2));
        console.log();

        listPass.forEach((pass) => {
            console.log(`${pass.mail},${pass.password}`);
        });
        // console.log(JSON.stringify(listPass, null, 2));
    });
}

const argv = require('funwithflags')(process.argv.slice(2));

test_required('input', argv);
read_csv(argv.input);
