const html2pdf = require('phantom-html2pdf');
const PDFMerge = require('pdf-merge');

async function transform_html_to_pdf(html) {
    return new Promise((resolve, reject) => html2pdf.convert({
        html,
        paperSize: { format: 'A4', orientation: 'portrait', border: '1cm' },
    }, (err, result) => {
        if (err) {
            return reject(err);
        }
        result.toFile('/tmp/my_cover_page.pdf', () => {});
        return resolve(result.toStream());
    }));
}

function merge_pdfs(pdfs) {
    return PDFMerge(pdfs, { output: 'stream' });
}

module.exports = {
    transform_html_to_pdf,
    merge_pdfs,
};
