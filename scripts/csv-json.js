const _ = require('lodash');
const Parse = require('csv-parse');
const FS = require('fs');
const Transform = require('stream-transform');
const moment = require('moment');

function test_required(flag, argv) {
    if (flag in argv) {
        return;
    }

    console.error(`${flag} is required. Exited...`);
    process.exit(1);
}

function momentize(info) {
    if (info.trim() === '') {
        return null;
    }

    const slashes = (info.match(/\//g) || []).length;
    let s = null;
    if (slashes === 0) {
        s = moment(info, 'YYYY');
    } else if (slashes === 1) {
        s = moment(info, 'MM/YYYY');
    } else {
        s = moment(info, 'DD/MM/YYYY');
    }
    return s;
}

function grab_start_year(year, begin, olen) {
    year = parseInt(year, 10);

    if (!begin) {
        return year;
    }

    if (!year) {
        return begin;
    }

    if (begin < year) {
        return begin;
    }
    return year;
}

function read_csv(filepath) {
    const parser = Parse();
    const input = FS.createReadStream(filepath);
    input.pipe(parser);

    const output = [];
    parser.on('readable', () => {
        while (record = parser.read()) {
            output.push(record);
        }
    });
    parser.on('finish', () => {
        const obj = output.reduce((o, r, i) => {
            if (i === 0) {
            // console.log(r);
                return o;
            }

            r[0] = r[0].trim();
            r[1] = r[1].trim();
            r[4] = r[4].trim();
            const teams = r.slice(8).map(t => t.trim()).filter(t => t !== '');
            const full = r[0] + r[1];
            const key = r[0] + r[1] + r[4] + teams.join('');

            const current_year = parseInt(r[3].trim(), 10);
            let begin = momentize(r[5]);
            begin = begin ? parseInt(begin.format('YYYY'), 10) : null;
            let end = momentize(r[7]);
            end = end ? parseInt(end.format('YYYY'), 10) : null;

            if (full in o) {
                if (!(key in o[full].affiliations)) {
                    const order = Object.keys(o[full].affiliations).length + 1;
                    const last_affiliations = _.filter(o[full].affiliations, a => (a.order === (order - 1)));
                    last_affiliations[0].to = current_year;
                    o[full].affiliations[key] = {
                        order,
                        from: current_year,
                        teams: teams.map(t => ({ _id: t })),
                        ined_status: r[4] === '' ? null : r[4],
                        institution: 'AWBF7vzUejCLCgctMdm8',
                        to: end,
                    };
                }
            } else {
                o[full] = {
                    firstname: r[1],
                    lastname: r[0],
                    affiliations: { [key]: {
                        order: 1,
                        from: grab_start_year(current_year, begin),
                        teams: teams.map(t => ({ _id: t })),
                        ined_status: r[4] === '' ? null : r[4],
                        institution: 'AWBF7vzUejCLCgctMdm8',
                        to: end,
                    } },
                };
            }
            return o;
        }, {});

        const well_formed = Object.keys(obj).map((k) => {
            const aff = obj[k].affiliations;
            obj[k].affiliations = Object.keys(aff).map((ak) => {
                delete aff[ak].order;
                return aff[ak];
            });
            return obj[k];
        });
        console.log(JSON.stringify(well_formed));
    });
}

const argv = require('funwithflags')(process.argv.slice(2));

test_required('input', argv);
read_csv(argv.input);
