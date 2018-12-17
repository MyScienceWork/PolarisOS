const Errors = require('../exceptions/errors');

const url_regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
function transform_static_links_to_clickable_links(string) {
    string = string.replace(url_regex, "<a href='$1'>$1</a>");
    return string;
}

function transform_static_links_to_clickable_links_with_offset(string, ostart = '#POS#URLS', oend = '#POS#URLE') {
    let start = string.indexOf(ostart);
    while (start !== -1) {
        const end = string.indexOf(oend);
        if (end === -1) {
            throw Errors.NoEndOffsetForString;
        }

        const keep = string.slice(start + ostart.length, end);

        if (keep.startsWith('http')) {
            string = `${string.substring(0, start)}<a href='${keep}'>${keep}</a>${string.substring(end + oend.length)}`;
        } else {
            string = `${string.substring(0, start)}<a href='https://doi.org/${keep}'>${keep}</a>${string.substring(end + oend.length)}`;
        }

        start = string.indexOf(ostart);
    }
    return string;
}

module.exports = {
    transform_static_links_to_clickable_links,
    transform_static_links_to_clickable_links_with_offset,
};
