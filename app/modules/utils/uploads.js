
function add_single(end_of_path) {
    return async function func(ctx) {
        const file = ctx.request.file;
        console.log(ctx.request.file);
        const p = file.path.indexOf(end_of_path);
        const path = file.path.slice(p);
        ctx.body = { file: path };
    };
}

module.exports = {
    add_single,
};
