async function oarray_to_array(info) {
    const keys = Object.keys(info);
    keys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    return keys.reduce((obj, k) => {
        obj.push(info[k]);
        return obj;
    }, []);
}

module.exports = {
    oarray_to_array,
};
