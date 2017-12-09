
// TODO make it more generic by removing the reference to 'public'
async function add_single(ctx) {
    const file = ctx.request.file;
    console.log(ctx.request.file);
    const p = file.path.indexOf('public');
    const path = file.path.slice(p);
    ctx.body = { file: path };
}

module.exports = {
    add_single,
};
